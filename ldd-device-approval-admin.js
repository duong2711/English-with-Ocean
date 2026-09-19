(() => {
  'use strict';

  const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
  const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  const VERIFY_DEVICE_FUNCTION_URL = SUPABASE_URL + '/functions/v1/verify-device';
  const TEACHER_EMAIL = 'lddbaiu@gmail.com';

  let menuBtn = null;
  let badge = null;
  let modal = null;
  let pending = [];
  let devices = [];
  let lastListFetchAt = 0;
  let loading = false;
  let lastTeacherState = false;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function getStoredSession() {
    try {
      const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.access_token) return parsed;
      if (parsed && parsed.currentSession && parsed.currentSession.access_token) return parsed.currentSession;
      if (Array.isArray(parsed) && parsed[0] && parsed[0].access_token) return parsed[0];
    } catch (_) {}
    return null;
  }

  function jwtEmail(token) {
    try {
      const part = token.split('.')[1];
      const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(escape(atob(normalized))));
      return String(payload.email || '').toLowerCase();
    } catch (_) {
      return '';
    }
  }

  function currentTeacherSession() {
    const session = getStoredSession();
    if (!session || !session.access_token) return null;
    const email = (session.user && session.user.email ? session.user.email : jwtEmail(session.access_token)).toLowerCase();
    return email === TEACHER_EMAIL ? session : null;
  }

  async function callDeviceAdmin(mode, extra) {
    const session = currentTeacherSession();
    if (!session) return { error: 'teacher_only' };
    try {
      const resp = await fetch(VERIFY_DEVICE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.access_token,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify(Object.assign({ mode }, extra || {}))
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) return { error: data.error || 'Có lỗi xảy ra.', status: data.status };
      return data;
    } catch (err) {
      return { error: 'Không thể kết nối máy chủ: ' + (err && err.message ? err.message : err) };
    }
  }

  function deviceLabel(ua) {
    ua = String(ua || '');
    let browser = 'Trình duyệt';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\//.test(ua)) browser = 'Opera';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome';
    else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';

    let os = 'Thiết bị';
    if (/Windows NT 10\.0/.test(ua)) os = 'Windows';
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iPhone/iPad';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    return browser + ' · ' + os;
  }

  function fmtDate(value) {
    if (!value) return '—';
    const d = new Date(value);
    if (!Number.isFinite(d.getTime())) return '—';
    try {
      return d.toLocaleString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
    } catch (_) {
      return d.toLocaleString();
    }
  }

  function ensureUI() {
    if (menuBtn) return;
    const accountMenu = document.getElementById('account-menu');
    const logoutBtn = document.getElementById('logout-btn');
    if (!accountMenu || !logoutBtn) return;

    menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.id = 'device-approval-menu-btn';
    menuBtn.className = 'account-menu-item account-menu-item-teacher';
    menuBtn.style.display = 'none';
    menuBtn.innerHTML = '🔐 Duyệt thiết bị <span id="device-approval-badge" style="display:none; margin-left:auto; min-width:20px; height:20px; padding:0 6px; align-items:center; justify-content:center; border-radius:999px; background:#e74c3c; color:#fff; font-size:11px; font-weight:800;">0</span>';
    accountMenu.insertBefore(menuBtn, logoutBtn);
    badge = menuBtn.querySelector('#device-approval-badge');

    modal = document.createElement('div');
    modal.id = 'device-approval-modal';
    modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:1000000; background:rgba(0,0,0,.58); align-items:center; justify-content:center; padding:14px;';
    modal.innerHTML = `
      <div style="background:#fff; color:#222; width:min(920px,96vw); max-height:88vh; overflow:hidden; border-radius:16px; box-shadow:0 18px 60px rgba(0,0,0,.35); display:flex; flex-direction:column;">
        <div style="display:flex; align-items:center; gap:10px; padding:18px 20px 12px; border-bottom:1px solid #eee;">
          <div style="flex:1;">
            <h3 style="margin:0 0 3px;">🔐 Quản lý thiết bị học viên</h3>
            <div style="font-size:12.5px; color:#777;">Duyệt máy mới, xem các máy đã được tin cậy và thu hồi khi cần.</div>
          </div>
          <button type="button" id="device-admin-refresh" class="kid-btn">↻ Làm mới</button>
          <button type="button" id="device-admin-close" class="kid-btn">✕</button>
        </div>
        <div style="display:flex; gap:8px; padding:12px 20px 0; flex-wrap:wrap;">
          <button type="button" class="kid-btn kid-btn-primary device-admin-tab" data-tab="pending">⏳ Chờ duyệt <span id="device-admin-pending-count">0</span></button>
          <button type="button" class="kid-btn device-admin-tab" data-tab="devices">✅ Thiết bị đã duyệt</button>
        </div>
        <div style="padding:14px 20px 20px; overflow:auto;">
          <p id="device-admin-status" style="margin:0 0 10px; min-height:18px; font-size:13px;"></p>
          <section id="device-admin-panel-pending"></section>
          <section id="device-admin-panel-devices" style="display:none;">
            <input id="device-admin-search" type="search" placeholder="Tìm theo email học viên..." style="width:100%; padding:9px 11px; border:1px solid #ccc; border-radius:9px; margin-bottom:12px;">
            <div id="device-admin-devices-list"></div>
          </section>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    menuBtn.addEventListener('click', () => {
      const menu = document.getElementById('account-menu');
      if (menu) menu.classList.remove('open');
      modal.style.display = 'flex';
      loadList(true);
    });
    document.getElementById('device-admin-close').addEventListener('click', () => { modal.style.display = 'none'; });
    document.getElementById('device-admin-refresh').addEventListener('click', () => loadList(true));
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    modal.querySelectorAll('.device-admin-tab').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    document.getElementById('device-admin-search').addEventListener('input', renderDevices);

    modal.addEventListener('click', async e => {
      const btn = e.target.closest('[data-device-action]');
      if (!btn || btn.disabled) return;
      const action = btn.dataset.deviceAction;
      const id = btn.dataset.id;
      if (!id) return;

      if (action === 'revoke' && !confirm('Thu hồi thiết bị này? Lần đăng nhập sau trên máy đó sẽ phải xin duyệt lại.')) return;

      btn.disabled = true;
      setStatus('Đang xử lý...', false);
      let result;
      if (action === 'approve') result = await callDeviceAdmin('teacher_approve', { requestId:id });
      else if (action === 'reject') result = await callDeviceAdmin('teacher_reject', { requestId:id });
      else if (action === 'revoke') result = await callDeviceAdmin('teacher_revoke_device', { deviceId:id });

      if (!result || result.error) {
        setStatus((result && result.error) || 'Có lỗi xảy ra.', true);
        btn.disabled = false;
        return;
      }
      setStatus(action === 'approve' ? '✅ Đã duyệt thiết bị.' : action === 'reject' ? 'Đã từ chối yêu cầu.' : '✅ Đã thu hồi thiết bị.', false);
      await loadList(true);
    });
  }

  function switchTab(tab) {
    const pendingPanel = document.getElementById('device-admin-panel-pending');
    const devicePanel = document.getElementById('device-admin-panel-devices');
    if (!pendingPanel || !devicePanel) return;
    pendingPanel.style.display = tab === 'pending' ? '' : 'none';
    devicePanel.style.display = tab === 'devices' ? '' : 'none';
    modal.querySelectorAll('.device-admin-tab').forEach(btn => {
      btn.classList.toggle('kid-btn-primary', btn.dataset.tab === tab);
    });
  }

  function setStatus(message, isError) {
    const el = document.getElementById('device-admin-status');
    if (!el) return;
    el.style.color = isError ? '#c0392b' : '#555';
    el.textContent = message || '';
  }

  function renderPending() {
    const host = document.getElementById('device-admin-panel-pending');
    const count = document.getElementById('device-admin-pending-count');
    if (count) count.textContent = String(pending.length);
    if (badge) {
      badge.textContent = String(pending.length);
      badge.style.display = pending.length ? 'inline-flex' : 'none';
    }
    if (!host) return;

    if (!pending.length) {
      host.innerHTML = '<div style="padding:26px 12px; text-align:center; color:#777;">✅ Không có thiết bị nào đang chờ duyệt.</div>';
      return;
    }

    host.innerHTML = pending.map(row => `
      <div style="border:1px solid #e5e5e5; border-radius:12px; padding:13px 14px; margin-bottom:10px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
        <div style="min-width:0; flex:1 1 430px;">
          <div style="font-weight:800; overflow-wrap:anywhere;">${esc(row.student_email)}</div>
          <div style="font-size:13px; margin-top:3px;">💻 ${esc(deviceLabel(row.user_agent))}</div>
          <div style="font-size:12px; color:#777; margin-top:4px;">Yêu cầu: ${esc(fmtDate(row.created_at))} · IP: ${esc(row.ip_at_request || '—')}</div>
          <div style="font-size:12px; color:#999; margin-top:2px;">Hết hạn: ${esc(fmtDate(row.expires_at))}</div>
          ${row.hash_ready ? '' : '<div style="font-size:12px; color:#b26a00; margin-top:5px; font-weight:700;">⚠️ Yêu cầu từ bản cũ — học viên cần tải lại trang trước khi duyệt.</div>'}
        </div>
        <div style="display:flex; gap:7px; flex-wrap:wrap;">
          ${row.hash_ready
            ? `<button type="button" class="kid-btn kid-btn-primary" data-device-action="approve" data-id="${esc(row.id)}">✓ Duyệt</button>`
            : '<button type="button" class="kid-btn" disabled title="Học viên cần tải lại trang để tạo mã hash an toàn">Chờ học viên tải lại</button>'}
          <button type="button" class="kid-btn" data-device-action="reject" data-id="${esc(row.id)}">✕ Từ chối</button>
        </div>
      </div>
    `).join('');
  }

  function renderDevices() {
    const host = document.getElementById('device-admin-devices-list');
    if (!host) return;
    const input = document.getElementById('device-admin-search');
    const q = String(input && input.value || '').trim().toLowerCase();
    const filtered = devices.filter(row => !q || String(row.student_email || '').toLowerCase().includes(q));

    if (!filtered.length) {
      host.innerHTML = '<div style="padding:24px 10px; text-align:center; color:#777;">Không có thiết bị phù hợp.</div>';
      return;
    }

    const groups = new Map();
    filtered.forEach(row => {
      const key = String(row.student_email || '').toLowerCase();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    });

    host.innerHTML = Array.from(groups.entries()).map(([email, rows]) => `
      <div style="border:1px solid #e7e7e7; border-radius:12px; margin-bottom:12px; overflow:hidden;">
        <div style="padding:10px 13px; background:#f7f7f8; font-weight:800;">${esc(email)} <span style="font-weight:500; color:#777; font-size:12px;">· ${rows.filter(x=>!x.revoked).length} đang hoạt động</span></div>
        ${rows.map(row => `
          <div style="padding:11px 13px; border-top:1px solid #eee; display:flex; gap:10px; align-items:center; flex-wrap:wrap; opacity:${row.revoked ? '.58' : '1'};">
            <div style="flex:1 1 420px; min-width:0;">
              <div style="font-weight:700;">${row.revoked ? '🚫' : '✅'} ${esc(deviceLabel(row.user_agent))}</div>
              <div style="font-size:12px; color:#777; margin-top:3px;">Duyệt: ${esc(fmtDate(row.verified_at))} · Dùng gần nhất: ${esc(fmtDate(row.last_used_at))}</div>
              <div style="font-size:12px; color:#999; margin-top:2px;">IP gần nhất: ${esc(row.last_used_ip || row.ip_at_verification || '—')}</div>
            </div>
            ${row.revoked ? '<span style="font-size:12px; font-weight:700; color:#a33;">Đã thu hồi</span>' : `<button type="button" class="kid-btn" data-device-action="revoke" data-id="${esc(row.id)}">Thu hồi</button>`}
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  async function loadList(force) {
    if (loading) return;
    const now = Date.now();
    if (!force && now - lastListFetchAt < 30000) return;
    loading = true;
    setStatus('Đang tải...', false);
    const result = await callDeviceAdmin('teacher_list');
    loading = false;
    if (!result || result.error) {
      setStatus((result && result.error) || 'Không tải được danh sách thiết bị.', true);
      return;
    }
    lastListFetchAt = Date.now();
    pending = Array.isArray(result.pending) ? result.pending : [];
    devices = Array.isArray(result.devices) ? result.devices : [];
    renderPending();
    renderDevices();
    setStatus('', false);
  }

  async function loadPendingCount() {
    if (!currentTeacherSession()) return;
    const result = await callDeviceAdmin('teacher_pending_count');
    if (!result || result.error) return;
    const count = Math.max(0, Number(result.pendingCount) || 0);
    if (badge) {
      badge.textContent = String(count);
      badge.style.display = count ? 'inline-flex' : 'none';
    }
  }

  function syncTeacherUI() {
    ensureUI();
    if (!menuBtn) return;
    const teacher = !!currentTeacherSession();
    menuBtn.style.display = teacher ? 'flex' : 'none';
    if (teacher && !lastTeacherState) loadPendingCount();
    if (!teacher) {
      pending = [];
      devices = [];
      if (badge) badge.style.display = 'none';
      if (modal) modal.style.display = 'none';
    }
    lastTeacherState = teacher;
  }

  // Local-only identity check; no network polling here.
  setInterval(syncTeacherUI, 2000);
  // Background chỉ hỏi SỐ LƯỢNG yêu cầu; danh sách thiết bị chỉ tải khi giáo viên mở modal.
  setInterval(() => {
    if (currentTeacherSession() && document.visibilityState === 'visible') loadPendingCount();
  }, 5 * 60 * 1000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncTeacherUI();
  });
  document.addEventListener('DOMContentLoaded', syncTeacherUI);
  setTimeout(syncTeacherUI, 0);
})();
