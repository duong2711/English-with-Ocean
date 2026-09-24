import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') ?? '';
const TEACHER_EMAIL = (Deno.env.get('TEACHER_EMAIL') ?? 'lddbaiu@gmail.com').toLowerCase();
const TEACHER_USER_ID = Deno.env.get('TEACHER_USER_ID') ?? 'b30200bf-9cb9-4d95-93c7-d710545946cd';

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function isUuid(value: unknown) {
  return typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function publicRequest(row: any) {
  return {
    id: row.id,
    student_email: row.student_email,
    status: row.status,
    user_agent: row.user_agent || '',
    ip_at_request: row.ip_at_request || '',
    created_at: row.created_at,
    expires_at: row.expires_at,
    decided_at: row.decided_at,
    decided_by: row.decided_by,
    hash_ready: !!row.device_token_hash,
  };
}

function publicDevice(row: any) {
  return {
    id: row.id,
    student_email: row.student_email,
    verified_gmail: row.verified_gmail,
    ip_at_verification: row.ip_at_verification,
    user_agent: row.user_agent || '',
    verified_at: row.verified_at,
    last_used_at: row.last_used_at,
    last_used_ip: row.last_used_ip,
    revoked: !!row.revoked,
  };
}

async function expireOldRequests(studentUserId?: string) {
  let q = admin
    .from('device_approval_requests')
    .update({ status: 'expired', updated_at: new Date().toISOString() })
    .eq('status', 'pending')
    .lt('expires_at', new Date().toISOString());
  if (studentUserId) q = q.eq('student_user_id', studentUserId);
  await q;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  try {
    const authHeader = req.headers.get('Authorization') || '';
    const jwt = authHeader.replace(/^Bearer\s+/i, '');
    if (!jwt) return json({ error: 'Thiếu access token, vui lòng đăng nhập lại.' }, 401);

    const { data: userData, error: userErr } = await admin.auth.getUser(jwt);
    if (userErr || !userData?.user) {
      return json({ error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' }, 401);
    }

    const user = userData.user;
    const studentEmail = (user.email || '').toLowerCase();
    if (!studentEmail) return json({ error: 'Tài khoản không có email.' }, 400);

    const body = await req.json().catch(() => ({}));
    const mode = String(body?.mode || '');
    const clientIp = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
    const userAgent = req.headers.get('user-agent') || '';
    const isTeacher = user.id === TEACHER_USER_ID && studentEmail === TEACHER_EMAIL;

    // ---------- Existing trusted device check (strict hash-only) ----------
    if (mode === 'check') {
      const deviceToken = String(body?.deviceToken || '').trim();
      if (!deviceToken) return json({ trusted: false });

      const deviceTokenHash = await sha256Hex(deviceToken);
      const { data, error } = await admin
        .from('verified_devices')
        .select('id')
        .eq('student_email', studentEmail)
        .eq('device_token_hash', deviceTokenHash)
        .eq('revoked', false)
        .maybeSingle();

      if (error) return json({ error: error.message }, 500);
      if (!data) return json({ trusted: false });

      admin
        .from('verified_devices')
        .update({
          last_used_at: new Date().toISOString(),
          last_used_ip: clientIp,
        })
        .eq('id', data.id)
        .then(() => {}, () => {});

      return json({ trusted: true });
    }

    // ---------- Student creates/reuses a pending approval request ----------
    if (mode === 'request') {
      if (isTeacher) return json({ error: 'Tài khoản giáo viên không cần xin duyệt thiết bị.' }, 400);

      await expireOldRequests(user.id);

      const suppliedToken = isUuid(body?.requestToken) ? String(body.requestToken) : null;
      const candidateDeviceToken = isUuid(body?.candidateDeviceToken)
        ? String(body.candidateDeviceToken)
        : null;

      if (!candidateDeviceToken) {
        return json({
          error: 'Phiên bản trang quá cũ. Vui lòng tải lại trang để dùng cơ chế duyệt thiết bị mới.',
          status: 'upgrade_required',
        }, 409);
      }

      const candidateHash = await sha256Hex(candidateDeviceToken);

      if (suppliedToken) {
        const { data: existing, error: existingErr } = await admin
          .from('device_approval_requests')
          .select('*')
          .eq('student_user_id', user.id)
          .eq('request_token', suppliedToken)
          .maybeSingle();

        if (existingErr) return json({ error: existingErr.message }, 500);
        if (existing) {
          if (existing.device_token_hash !== candidateHash) {
            // Self-heal only while the request is still pending and belongs to this
            // authenticated student. This fixes stale/cached clients that accidentally
            // kept requestToken A together with candidateToken B, without weakening
            // approved-device security.
            if (existing.status === 'pending') {
              const nowIso = new Date().toISOString();
              const repairedExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
              const { data: repaired, error: repairErr } = await admin
                .from('device_approval_requests')
                .update({
                  device_token_hash: candidateHash,
                  user_agent: userAgent,
                  ip_at_request: clientIp,
                  expires_at: repairedExpiresAt,
                  updated_at: nowIso,
                })
                .eq('id', existing.id)
                .eq('student_user_id', user.id)
                .eq('status', 'pending')
                .select('*')
                .maybeSingle();

              if (repairErr) return json({ error: repairErr.message }, 500);
              if (repaired) {
                return json({
                  status: 'pending',
                  requestToken: repaired.request_token,
                  requestId: repaired.id,
                  createdAt: repaired.created_at,
                  expiresAt: repaired.expires_at,
                  reconciled: true,
                });
              }
            }

            // Never rebind an already approved/rejected/expired request to a new
            // candidate secret. The client must create a fresh approval request.
            return json({
              error: 'Mã thiết bị chờ duyệt không khớp. Vui lòng gửi yêu cầu mới.',
              status: 'candidate_mismatch',
            }, 409);
          }
          return json({
            status: existing.status,
            requestToken: existing.request_token,
            requestId: existing.id,
            createdAt: existing.created_at,
            expiresAt: existing.expires_at,
          });
        }
      }

      // A fresh candidate secret supersedes stale requests from the same account/browser.
      await admin
        .from('device_approval_requests')
        .update({ status: 'expired', updated_at: new Date().toISOString() })
        .eq('student_user_id', user.id)
        .eq('status', 'pending')
        .eq('user_agent', userAgent);

      const requestToken = suppliedToken || crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const { data: created, error: createErr } = await admin
        .from('device_approval_requests')
        .insert({
          student_user_id: user.id,
          student_email: studentEmail,
          request_token: requestToken,
          status: 'pending',
          device_token_hash: candidateHash,
          user_agent: userAgent,
          ip_at_request: clientIp,
          expires_at: expiresAt,
        })
        .select('*')
        .single();

      if (createErr) return json({ error: createErr.message }, 500);
      return json({
        status: 'pending',
        requestToken: created.request_token,
        requestId: created.id,
        createdAt: created.created_at,
        expiresAt: created.expires_at,
      });
    }

    // ---------- Student checks whether teacher has approved ----------
    if (mode === 'poll') {
      const requestToken = String(body?.requestToken || '');
      if (!isUuid(requestToken)) return json({ status: 'missing' }, 400);

      const candidateDeviceToken = isUuid(body?.candidateDeviceToken)
        ? String(body.candidateDeviceToken)
        : null;
      if (!candidateDeviceToken) {
        return json({
          error: 'Thiếu mã thiết bị cục bộ. Vui lòng gửi yêu cầu mới.',
          status: 'upgrade_required',
        }, 409);
      }
      const candidateHash = await sha256Hex(candidateDeviceToken);

      await expireOldRequests(user.id);

      const { data: row, error } = await admin
        .from('device_approval_requests')
        .select('*')
        .eq('student_user_id', user.id)
        .eq('request_token', requestToken)
        .maybeSingle();

      if (error) return json({ error: error.message }, 500);
      if (!row) return json({ status: 'missing' });
      if (row.device_token_hash !== candidateHash) {
        if (row.status === 'pending') {
          const nowIso = new Date().toISOString();
          const repairedExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          const { data: repaired, error: repairErr } = await admin
            .from('device_approval_requests')
            .update({
              device_token_hash: candidateHash,
              user_agent: userAgent,
              ip_at_request: clientIp,
              expires_at: repairedExpiresAt,
              updated_at: nowIso,
            })
            .eq('id', row.id)
            .eq('student_user_id', user.id)
            .eq('status', 'pending')
            .select('id,status,created_at,expires_at')
            .maybeSingle();

          if (repairErr) return json({ error: repairErr.message }, 500);
          if (repaired) {
            return json({
              status: repaired.status,
              requestId: repaired.id,
              createdAt: repaired.created_at,
              expiresAt: repaired.expires_at,
              reconciled: true,
            });
          }
        }

        return json({
          error: 'Mã thiết bị không khớp yêu cầu đang chờ.',
          status: 'candidate_mismatch',
        }, 409);
      }

      return json({
        status: row.status,
        requestId: row.id,
        createdAt: row.created_at,
        expiresAt: row.expires_at,
      });
    }

    // ---------- Lightweight teacher badge count (avoid downloading device list in background) ----------
    if (mode === 'teacher_pending_count') {
      if (!isTeacher) return json({ error: 'teacher_only' }, 403);
      await expireOldRequests();

      const { count, error } = await admin
        .from('device_approval_requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString());

      if (error) return json({ error: error.message }, 500);
      return json({ pendingCount: count || 0 });
    }

    // ---------- Teacher queue + trusted devices ----------
    if (mode === 'teacher_list') {
      if (!isTeacher) return json({ error: 'teacher_only' }, 403);
      await expireOldRequests();

      const [{ data: pending, error: pendingErr }, { data: devices, error: devicesErr }] = await Promise.all([
        admin
          .from('device_approval_requests')
          .select('id,student_email,status,user_agent,ip_at_request,created_at,expires_at,decided_at,decided_by,device_token_hash')
          .eq('status', 'pending')
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: true })
          .limit(200),
        admin
          .from('verified_devices')
          .select('id,student_email,verified_gmail,ip_at_verification,user_agent,verified_at,last_used_at,last_used_ip,revoked')
          .eq('revoked', false)
          .order('last_used_at', { ascending: false })
          .limit(300),
      ]);

      if (pendingErr) return json({ error: pendingErr.message }, 500);
      if (devicesErr) return json({ error: devicesErr.message }, 500);

      return json({
        pending: (pending || []).map(publicRequest),
        devices: (devices || []).map(publicDevice),
      });
    }

    if (mode === 'teacher_approve') {
      if (!isTeacher) return json({ error: 'teacher_only' }, 403);
      const requestId = String(body?.requestId || '');
      if (!isUuid(requestId)) return json({ error: 'Yêu cầu không hợp lệ.' }, 400);

      const { data: current, error: currentErr } = await admin
        .from('device_approval_requests')
        .select('*')
        .eq('id', requestId)
        .maybeSingle();

      if (currentErr) return json({ error: currentErr.message }, 500);
      if (!current) return json({ error: 'Không tìm thấy yêu cầu.' }, 404);
      if (current.status === 'approved') {
        return json({ ok: true, status: 'approved', already: true });
      }
      if (current.status !== 'pending') {
        return json({ error: 'Yêu cầu này không còn ở trạng thái chờ duyệt.', status: current.status }, 409);
      }
      if (!current.device_token_hash) {
        return json({
          error: 'Yêu cầu này được tạo bởi phiên bản cũ. Học viên cần tải lại trang và gửi yêu cầu mới.',
          status: 'upgrade_required',
        }, 409);
      }
      if (new Date(current.expires_at).getTime() <= Date.now()) {
        await admin
          .from('device_approval_requests')
          .update({ status: 'expired', updated_at: new Date().toISOString() })
          .eq('id', requestId)
          .eq('status', 'pending');
        return json({ error: 'Yêu cầu đã hết hạn.', status: 'expired' }, 409);
      }

      const nowIso = new Date().toISOString();
      const { data: claimed, error: claimErr } = await admin
        .from('device_approval_requests')
        .update({
          status: 'approved',
          decided_at: nowIso,
          decided_by: studentEmail,
          updated_at: nowIso,
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select('*')
        .maybeSingle();

      if (claimErr) return json({ error: claimErr.message }, 500);
      if (!claimed) return json({ error: 'Yêu cầu vừa được xử lý ở nơi khác.' }, 409);

      const { error: deviceErr } = await admin.from('verified_devices').insert({
        student_email: claimed.student_email,
        device_token_hash: claimed.device_token_hash,
        verified_gmail: null,
        ip_at_verification: claimed.ip_at_request || null,
        user_agent: claimed.user_agent || null,
      });

      if (deviceErr) {
        await admin
          .from('device_approval_requests')
          .update({
            status: 'pending',
            decided_at: null,
            decided_by: null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', requestId);
        return json({ error: deviceErr.message }, 500);
      }

      return json({ ok: true, status: 'approved', hashOnly: true });
    }

    if (mode === 'teacher_reject') {
      if (!isTeacher) return json({ error: 'teacher_only' }, 403);
      const requestId = String(body?.requestId || '');
      if (!isUuid(requestId)) return json({ error: 'Yêu cầu không hợp lệ.' }, 400);

      const { data, error } = await admin
        .from('device_approval_requests')
        .update({
          status: 'rejected',
          device_token_hash: null,
          decided_at: new Date().toISOString(),
          decided_by: studentEmail,
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .eq('status', 'pending')
        .select('id')
        .maybeSingle();

      if (error) return json({ error: error.message }, 500);
      if (!data) return json({ error: 'Yêu cầu không còn ở trạng thái chờ duyệt.' }, 409);
      return json({ ok: true, status: 'rejected' });
    }

    if (mode === 'teacher_revoke_device') {
      if (!isTeacher) return json({ error: 'teacher_only' }, 403);
      const deviceId = String(body?.deviceId || '');
      if (!isUuid(deviceId)) return json({ error: 'Thiết bị không hợp lệ.' }, 400);

      // Thu hồi là thao tác cuối cùng với chứng nhận này:
      // xóa hẳn bản ghi để thiết bị không còn xuất hiện trong lịch sử quản lý.
      const { data, error } = await admin
        .from('verified_devices')
        .delete()
        .eq('id', deviceId)
        .select('id')
        .maybeSingle();

      if (error) return json({ error: error.message }, 500);
      if (!data) return json({ error: 'Không tìm thấy thiết bị.' }, 404);
      return json({ ok: true, revoked: true, deleted: true });
    }

    // ---------- Legacy Google verification kept for old cached clients ----------
    if (mode === 'verify') {
      const idToken = body?.idToken;
      if (!idToken) return json({ error: 'Thiếu idToken.' }, 400);
      if (!GOOGLE_CLIENT_ID) {
        return json({ error: 'Server chưa được cấu hình GOOGLE_CLIENT_ID.' }, 500);
      }

      const gRes = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
      );
      if (!gRes.ok) return json({ error: 'Token Google không hợp lệ hoặc đã hết hạn, vui lòng thử lại.' }, 400);
      const gData = await gRes.json();

      if (gData.aud !== GOOGLE_CLIENT_ID) {
        return json({ error: 'Token Google không dành cho ứng dụng này.' }, 400);
      }
      if (gData.email_verified !== 'true' && gData.email_verified !== true) {
        return json({ error: 'Gmail vừa đăng nhập chưa được Google xác thực.' }, 400);
      }
      const googleEmail = String(gData.email || '').toLowerCase();

      const { data: allowRow, error: allowErr } = await admin
        .from('allowed_signup_emails')
        .select('linked_gmail')
        .eq('email', studentEmail)
        .maybeSingle();

      if (allowErr) return json({ error: allowErr.message }, 500);
      const expectedGmail = (allowRow?.linked_gmail || '').toLowerCase().trim();

      if (!expectedGmail) {
        return json({ error: 'Tài khoản này chưa được giáo viên gán Gmail liên kết.' }, 400);
      }
      if (expectedGmail !== googleEmail) {
        return json({ error: `Gmail bạn vừa chọn (${gData.email}) không khớp với Gmail liên kết đã đăng ký.` }, 400);
      }

      const deviceToken = crypto.randomUUID();
      const deviceTokenHash = await sha256Hex(deviceToken);
      const { error: insErr } = await admin.from('verified_devices').insert({
        student_email: studentEmail,
        device_token_hash: deviceTokenHash,
        verified_gmail: googleEmail,
        ip_at_verification: clientIp,
        user_agent: userAgent,
      });
      if (insErr) return json({ error: insErr.message }, 500);

      return json({ ok: true, deviceToken });
    }

    return json({ error: 'Tham số "mode" không hợp lệ.' }, 400);
  } catch (err) {
    console.error('verify-device error:', err);
    return json({ error: (err as Error)?.message || 'Lỗi không xác định.' }, 500);
  }
});
