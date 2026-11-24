/* LDD English — first-party activity ping used for a single opt-in Zalo reminder.
   Never calls Zalo and never stores student contact details in the browser.
   A visit is counted only while the page is visible and the user is authenticated. */
(function () {
    'use strict';
    if (window.__lddStudentPresenceInstalled) return;
    window.__lddStudentPresenceInstalled = true;

    const PROJECT = 'ywqbaksmmtvwbojcgsdd';
    const API_URL = 'https://' + PROJECT + '.supabase.co/rest/v1/rpc/ldd_touch_student_site_presence';
    const PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const STORAGE_KEY = 'sb-' + PROJECT + '-auth-token';
    const MIN_TOUCH_MS = 10 * 60 * 1000;
    const RETRY_DELAY_MS = 60 * 1000;
    let inFlight = false;
    let lastAttempt = 0;
    let activeUserId = '';

    function sessionToken() {
        for (const storage of [window.localStorage, window.sessionStorage]) {
            try {
                const raw = storage.getItem(STORAGE_KEY);
                if (!raw) continue;
                const parsed = JSON.parse(raw);
                const session = parsed?.access_token ? parsed
                    : parsed?.currentSession?.access_token ? parsed.currentSession
                    : Array.isArray(parsed) ? parsed[0] : null;
                if (session?.access_token) return String(session.access_token);
            } catch (_) {}
        }
        return '';
    }
    function claimsFor(token) {
        try {
            let value = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
            value += '='.repeat((4 - (value.length % 4)) % 4);
            const c = JSON.parse(atob(value));
            return c?.role === 'authenticated' && c?.sub && Number(c.exp) * 1000 > Date.now() + 30000
                ? c : null;
        } catch (_) { return null; }
    }
    function cachedLastSeenKey(uid) {
        return 'ldd-student-presence-last-touch-v1:' + uid;
    }
    function shouldPing(uid, now) {
        try { return now - Number(localStorage.getItem(cachedLastSeenKey(uid)) || 0) >= MIN_TOUCH_MS; }
        catch (_) { return true; }
    }
    const checkedNotices = new Set();
    let checkingNotice = false;
    async function checkScoreNotice() {
        if (document.hidden || checkingNotice) return;
        const token = sessionToken();
        const claims = token && claimsFor(token);
        if (!claims || checkedNotices.has(claims.sub)) return;
        checkingNotice = true;
        try {
            const response = await fetch('https://' + PROJECT + '.supabase.co/rest/v1/rpc/ldd_claim_score_adjustment', {
                method:'POST', mode:'cors', credentials:'omit',
                headers:{'Content-Type':'application/json','apikey':PUBLISHABLE_KEY,'Authorization':'Bearer ' + token},
                body:'{}'
            });
            if (!response.ok) return;
            const notice = await response.json();
            checkedNotices.add(claims.sub);
            if (!notice) return;
            const format = n => Number(n).toLocaleString('vi-VN');
            const lines = [
                'Thông báo điều chỉnh điểm chăm chỉ',
                'Điểm trước: ' + format(notice.old_score) + ' → Điểm sau: ' + format(notice.new_score)
            ];
            if (notice.game_removed) lines.push('Điểm trò chơi vượt 2 lượt/ngày được điều chỉnh: −' + format(notice.game_removed) + ' điểm.');
            if (notice.film_added) lines.push('Bổ sung điểm cho các từ đã điền đúng trong phim: +' + format(notice.film_added) + ' điểm.');
            lines.push('Quy định mới: mỗi trò chỉ tính điểm 2 lượt đầu mỗi ngày, làm mới lúc 00:00 giờ Việt Nam. Lượt sau vẫn chơi được nhưng không cộng hoặc trừ điểm. Phim: tự điền đúng +5 điểm/từ (một lần), dùng gợi ý 0 điểm, sai được thử lại.');
            lines.push('Đây là điều chỉnh do thay đổi cơ chế tính điểm, không phải kết luận gian lận.');
            window.alert(lines.join('\n\n'));
            document.dispatchEvent(new Event('ldd:today-refresh'));
        } catch (_) { /* Retry on the next visible check. */ }
        finally { checkingNotice = false; }
    }
    async function recordVisit() {
        void checkScoreNotice();
        if (document.hidden || inFlight) return;
        const token = sessionToken();
        const claims = token && claimsFor(token);
        if (!claims) return;
        const uid = String(claims.sub);
        if (uid !== activeUserId) { activeUserId = uid; lastAttempt = 0; }
        const now = Date.now();
        if (now - lastAttempt < RETRY_DELAY_MS || !shouldPing(uid,now)) return;
        lastAttempt = now;
        inFlight = true;
        try {
            const response = await fetch(API_URL,{
                method:'POST',
                mode:'cors',
                credentials:'omit',
                headers:{
                    'Content-Type':'application/json',
                    'apikey':PUBLISHABLE_KEY,
                    'Authorization':'Bearer ' + token
                },
                body:'{}'
            });
            if (response.ok) {
                try { localStorage.setItem(cachedLastSeenKey(uid),String(Date.now())); } catch (_) {}
            }
        } catch (_) { /* Offline: retry once connection returns. */ }
        finally { inFlight = false; }
    }
    function init() {
        void recordVisit();
        // No background network traffic: checks return immediately when hidden.
        setInterval(function () { if (!document.hidden) void recordVisit(); }, 60 * 1000);
        // Detect same-tab sign-in without repeatedly making network requests.
        let lastNoticeUser = '';
        setInterval(function () {
            if (document.hidden) return;
            const token = sessionToken();
            const uid = token && claimsFor(token)?.sub || '';
            if (uid !== lastNoticeUser) { lastNoticeUser = uid; if (uid) void checkScoreNotice(); }
        }, 1500);
        document.addEventListener('visibilitychange',function () { if (!document.hidden) void recordVisit(); });
        window.addEventListener('pageshow',function () { void recordVisit(); });
        window.addEventListener('online',function () { void recordVisit(); });
        window.addEventListener('storage',function (event) {
            if (event.key === STORAGE_KEY && !document.hidden) void recordVisit();
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
})();
