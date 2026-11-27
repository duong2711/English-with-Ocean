/* LDD English — Facebook workspace cloud sync.
   Persists teacher-owned groups, leads, smart-comment settings and posting history.
   User-provided image files remain local to the current browser.
*/
(function () {
  'use strict';
  if (window.LDDFacebookCloud) return;

  var SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
  var SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  var TEACHER_EMAIL = 'lddbaiu@gmail.com';
  var TABLE_URL = SUPABASE_URL + '/rest/v1/ldd_facebook_workspace';
  var KEY_MAP = {
    'ldd-facebook-lead-groups-v1': 'groups',
    'ldd-facebook-leads-v1': 'leads',
    'ldd-facebook-smart-comment-v1': 'smart_settings',
    'ldd-facebook-smart-comment-history-v1': 'posting_history'
  };
  var loaded = false;
  var loading = null;
  var flushing = false;
  var flushTimer = 0;
  var currentUser = null;
  var pending = {};

  function getToken() {
    try {
      var value = JSON.parse(localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token') || 'null');
      if (!value) return '';
      if (value.access_token) return value.access_token;
      if (value.currentSession && value.currentSession.access_token) return value.currentSession.access_token;
      if (Array.isArray(value) && value[0] && value[0].access_token) return value[0].access_token;
    } catch (_) {}
    return '';
  }

  function parseLocal(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || 'null');
      return value == null ? fallback : value;
    } catch (_) { return fallback; }
  }

  function headers(token, extra) {
    var result = { apikey: SUPABASE_ANON, Authorization: 'Bearer ' + token };
    Object.keys(extra || {}).forEach(function (key) { result[key] = extra[key]; });
    return result;
  }

  async function authenticate() {
    var token = getToken();
    if (!token) throw new Error('Bạn chưa đăng nhập.');
    var response = await fetch(SUPABASE_URL + '/auth/v1/user', {
      method: 'GET',
      cache: 'no-store',
      headers: headers(token)
    });
    if (!response.ok) throw new Error('Không xác minh được tài khoản Supabase.');
    var user = await response.json();
    if (!user || !user.id || String(user.email || '').trim().toLowerCase() !== TEACHER_EMAIL) {
      throw new Error('Tài khoản này không có quyền dùng kho Facebook của giảng viên.');
    }
    currentUser = { id: user.id, token: token };
    return currentUser;
  }

  function scheduleFlush() {
    if (flushTimer) window.clearTimeout(flushTimer);
    flushTimer = window.setTimeout(function () { flush(); }, 700);
  }

  async function flush() {
    if (flushing) return false;
    var keys = Object.keys(pending);
    if (!keys.length) return true;
    if (!currentUser) {
      try { await authenticate(); } catch (_) { return false; }
    }
    var batch = pending;
    pending = {};
    var body = { owner_id: currentUser.id, updated_at: new Date().toISOString() };
    Object.keys(batch).forEach(function (key) { body[key] = batch[key]; });
    flushing = true;
    try {
      var response = await fetch(TABLE_URL + '?on_conflict=owner_id', {
        method: 'POST',
        headers: headers(currentUser.token, {
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal'
        }),
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        Object.keys(batch).forEach(function (key) {
          if (!(key in pending)) pending[key] = batch[key];
        });
        return false;
      }
      return true;
    } catch (_) {
      Object.keys(batch).forEach(function (key) {
        if (!(key in pending)) pending[key] = batch[key];
      });
      return false;
    } finally {
      flushing = false;
      if (Object.keys(pending).length) scheduleFlush();
    }
  }

  async function load() {
    if (loaded) return true;
    if (loading) return loading;
    loading = (async function () {
      try {
        var user = await authenticate();
        var url = TABLE_URL + '?select=groups,leads,smart_settings,posting_history&owner_id=eq.' + encodeURIComponent(user.id);
        var response = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: headers(user.token, { Accept: 'application/json' })
        });
        if (!response.ok) throw new Error('Không tải được dữ liệu Facebook từ Supabase.');
        var rows = await response.json();
        var mapping = [
          ['groups', 'ldd-facebook-lead-groups-v1', []],
          ['leads', 'ldd-facebook-leads-v1', []],
          ['smart_settings', 'ldd-facebook-smart-comment-v1', {}],
          ['posting_history', 'ldd-facebook-smart-comment-history-v1', []]
        ];

        if (rows && rows.length) {
          mapping.forEach(function (item) {
            var value = rows[0][item[0]];
            localStorage.setItem(item[1], JSON.stringify(value == null ? item[2] : value));
          });
        } else {
          var seed = {};
          mapping.forEach(function (item) {
            seed[item[0]] = parseLocal(item[1], item[2]);
          });
          var createResponse = await fetch(TABLE_URL + '?on_conflict=owner_id', {
            method: 'POST',
            headers: headers(user.token, {
              'Content-Type': 'application/json',
              Prefer: 'resolution=merge-duplicates,return=minimal'
            }),
            body: JSON.stringify({
              owner_id: user.id,
              groups: seed.groups,
              leads: seed.leads,
              smart_settings: seed.smart_settings,
              posting_history: seed.posting_history,
              updated_at: new Date().toISOString()
            })
          });
          if (!createResponse.ok) throw new Error('Không khởi tạo được kho dữ liệu Facebook.');
        }
        loaded = true;
        if (Object.keys(pending).length) scheduleFlush();
        return true;
      } catch (error) {
        console.warn('[LDD Facebook] Cloud sync unavailable; local data remains available.', error);
        return false;
      } finally {
        loading = null;
      }
    })();
    return loading;
  }

  function save(localKey, value) {
    var column = KEY_MAP[localKey];
    if (!column) return;
    pending[column] = value;
    if (loaded) scheduleFlush();
  }

  window.LDDFacebookCloud = {
    load: load,
    save: save,
    flush: flush,
    isLoaded: function () { return loaded; }
  };
})();
