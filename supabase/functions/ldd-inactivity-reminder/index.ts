// Supabase Edge Function: Zalo reminder dispatch bridge for a self-hosted n8n workflow.
// Intentionally disabled until LDD_REMINDER_BRIDGE_SECRET (>=32 chars) is provisioned.
// Never accepts a user ID or message from n8n: Postgres picks the eligible student.
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });

async function authorized(request: Request, expected: string): Promise<boolean> {
  const received = request.headers.get('x-reminder-secret') || '';
  if (received.length < 32 || received.length > 256) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(expected)),
    crypto.subtle.digest('SHA-256', enc.encode(received))
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i];
  return difference === 0;
}

async function callDatabase(url: string, key: string, fn: string, body: Record<string, unknown>) {
  const response = await fetch(url + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': key,
      'authorization': 'Bearer ' + key
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Database RPC ' + fn + ' rejected');
  return await response.json();
}

Deno.serve(async request => {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const secret = Deno.env.get('LDD_REMINDER_BRIDGE_SECRET') || '';
  if (secret.length < 32) return json({ error: 'bridge_not_configured' }, 503);
  if (!(await authorized(request, secret))) return json({ error: 'unauthorized' }, 401);

  const url = Deno.env.get('SUPABASE_URL') || '';
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  if (!url || !key) return json({ error: 'service_not_configured' }, 503);

  let input: { action?: string; reminder_id?: string; state?: string };
  try {
    input = await request.json();
  } catch (_) { return json({ error: 'invalid_json' }, 400); }
  try {
    if (input.action === 'claim') {
      // Database enforces 24h inactivity, opt-in, one send per absence,
      // global 30-minute spacing and 08:00–20:00 Vietnam quiet hours.
      const data = await callDatabase(url,key,'ldd_claim_single_zalo_inactivity_reminder',{});
      const row = Array.isArray(data) ? data[0] : null;
      if (!row) return json({ ready: false });
      return json({
        ready: true,
        reminder_id: row.reminder_id,
        recipient_uid: row.recipient_uid,
        message_text: row.message_text
      });
    }
    if (input.action === 'report') {
      const id = String(input.reminder_id || '');
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
         || !['sent','failed'].includes(String(input.state || ''))) {
        return json({ error: 'invalid_report' }, 400);
      }
      const updated = await callDatabase(url,key,'ldd_report_single_zalo_reminder',{
        p_reminder_id:id,
        p_state:input.state
      });
      return json({ recorded: updated === true });
    }
    return json({ error: 'unknown_action' }, 400);
  } catch (_) {
    // Never leak private contact details or database error text.
    return json({ error: 'processing_failed' }, 502);
  }
});
