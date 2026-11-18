/**
 * LDD English re-entry Auth lock, called only after the server-side exam marks
 * the learner locked, or by the teacher after the Zalo/paper reassessment.
 *
 * The service-role key NEVER leaves this Edge Function.
 * Deploy with JWT verification enabled (Supabase Edge default).
 */
import { createClient } from 'npm:@supabase/supabase-js@2.57.0';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
function json(body: unknown, code = 200): Response {
  return new Response(JSON.stringify(body), {
    status: code, headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const url = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceKey) return json({ error: 'Server setup incomplete' }, 503);
  const jwt = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return json({ error: 'Authentication required' }, 401);
  const scoped = createClient(url, anonKey, {
    global: { headers: { Authorization: 'Bearer ' + jwt } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error: authError } = await scoped.auth.getUser(jwt);
  if (authError || !data.user) return json({ error: 'Authentication failed' }, 401);
  const user = data.user;
  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  let body: { action?: string; user_id?: string };
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  if (body.action === 'ban-self') {
    if (user.email?.toLowerCase() === 'lddbaiu@gmail.com') return json({ error: 'Teacher cannot be banned' }, 403);
    // Critical authorization: the signed-in learner cannot request a ban on anyone
    // and can only be banned AFTER the Postgres exam grading locked that user.
    const { data: state, error: stateError } = await scoped.rpc('ldd_reentry_status');
    if (stateError || state?.mode !== 'locked') return json({ error: 'Account is not locked' }, 403);
    const { error } = await admin.auth.admin.updateUserById(user.id, { ban_duration: '876000h' });
    if (error) return json({ error: 'Could not suspend sign-in' }, 500);
    return json({ banned: true });
  }

  if (body.action === 'teacher-unlock') {
    if (user.email?.toLowerCase() !== 'lddbaiu@gmail.com') return json({ error: 'Teacher only' }, 403);
    const target = String(body.user_id || '');
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(target) || target === user.id) {
      return json({ error: 'Invalid student ID' }, 400);
    }
    const { data: canUnlock, error: permissionError } = await scoped.rpc('ldd_reentry_admin_can_unlock', { p_user_id: target });
    if (permissionError || canUnlock !== true) return json({ error: 'This learner is not locked by the re-entry test' }, 403);
    // Restore sign-in first; if the database update fails, its locked gate
    // still denies website access and the teacher can retry safely.
    const { error: unbanError } = await admin.auth.admin.updateUserById(target, { ban_duration: 'none' });
    if (unbanError) return json({ error: 'Could not restore sign-in' }, 500);
    const { data: unlocked, error: unlockError } = await scoped.rpc('ldd_reentry_admin_unlock', { p_user_id: target });
    if (unlockError) return json({ error: 'Could not clear the learning lock' }, 500);
    return json({ unlocked: !!unlocked });
  }

  return json({ error: 'Unknown action' }, 400);
});
