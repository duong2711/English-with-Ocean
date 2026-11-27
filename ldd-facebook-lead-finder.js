/* LDD English — Facebook Lead Finder (teacher-only, semi-automatic).
   Opens user-visible searches and stores manually reviewed leads.
   No scraping, session-cookie access, auto-joining, auto-commenting, or auto-posting.
*/
(function () {
  'use strict';
  if (window.LDDFacebookLeadFinder) return;

  var SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
  var SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  var TEACHER_EMAIL = 'lddbaiu@gmail.com';
  var GROUPS_KEY = 'ldd-facebook-lead-groups-v1';
  var LEADS_KEY = 'ldd-facebook-leads-v1';
  var tokenSeen = '';
  var teacherVerified = false;
  var verifiedAt = 0;
  var overlay = null;

  var categories = [
    {id:'basic',name:'Học sinh mất gốc',search:'"tìm gia sư tiếng Anh" mất gốc OR "học lại từ đầu"',keywords:['mất gốc','hổng kiến thức','học lại từ đầu','không biết tiếng anh','yếu tiếng anh','củng cố nền tảng']},
    {id:'parent',name:'Phụ huynh tìm gia sư',search:'"tìm gia sư tiếng Anh" OR "cần gia sư tiếng Anh" OR "tìm giáo viên tiếng Anh"',keywords:['tìm gia sư','cần gia sư','tìm giáo viên','học thêm tiếng anh','lớp 6','lớp 7','lớp 8','lớp 9','ôn thi vào 10','con học tiếng anh']},
    {id:'speaking',name:'Người cần giao tiếp',search:'"tiếng Anh giao tiếp" "tìm lớp" OR "cần người luyện nói"',keywords:['tiếng anh giao tiếp','luyện nói','mất phản xạ','phản xạ tiếng anh','giao tiếp công việc','speaking']},
    {id:'worker',name:'Người đi làm bận rộn',search:'"tiếng Anh cho người đi làm" OR "học tiếng Anh online"',keywords:['người đi làm','tiếng anh công việc','phỏng vấn','lịch bận','học online','học tại nhà']},
    {id:'longterm',name:'Người cần lộ trình dài hạn',search:'"lộ trình học tiếng Anh" OR "cải thiện trình độ tiếng Anh"',keywords:['lộ trình','tự học','cải thiện tiếng anh','nâng cao tiếng anh','học theo năng lực']}
  ];
  var intentTerms = ['tìm gia sư','cần gia sư','tìm giáo viên','cần giáo viên','tìm người dạy','cần người dạy','ai dạy','tìm lớp học','cần học','muốn học','học thêm','tư vấn học','đăng ký học','luyện thi','tìm lớp','tìm thầy','tìm cô','xin học phí'];
  var excludedTerms = ['tuyển dụng giáo viên','tuyển giáo viên','tuyển gia sư','chia sẻ tài liệu','tài liệu miễn phí','bán khóa học','tuyển nhân viên','tìm việc gia sư'];

  function getToken() {
    try {
      var x = JSON.parse(localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token') || 'null');
      if (!x) return '';
      if (x.access_token) return x.access_token;
      if (x.currentSession && x.currentSession.access_token) return x.currentSession.access_token;
      if (Array.isArray(x) && x[0] && x[0].access_token) return x[0].access_token;
    } catch (_) {}
    return '';
  }
  async function verifyTeacher(force) {
    var token = getToken();
    if (!token) { tokenSeen = ''; teacherVerified = false; verifiedAt = 0; return false; }
    if (!force && token === tokenSeen && Date.now() - verifiedAt < 45000) return teacherVerified;
    tokenSeen = token;
    verifiedAt = Date.now();
    teacherVerified = false;
    try {
      var response = await fetch(SUPABASE_URL + '/auth/v1/user', {
        method:'GET', cache:'no-store',
        headers:{apikey:SUPABASE_ANON,Authorization:'Bearer ' + token}
      });
      if (!response.ok) return false;
      var user = await response.json();
      teacherVerified = String(user && user.email || '').trim().toLowerCase() === TEACHER_EMAIL;
    } catch (_) { teacherVerified = false; }
    return teacherVerified;
  }
  function read(key, fallback) {
    try { var value = JSON.parse(localStorage.getItem(key) || 'null'); return value == null ? fallback : value; }
    catch (_) { return fallback; }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (window.LDDFacebookCloud) window.LDDFacebookCloud.save(key, value);
      return true;
    } catch (_) { return false; }
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
  }
  function savedGroups() { return read(GROUPS_KEY, []); }
  function savedLeads() { return read(LEADS_KEY, []); }
  function catById(id) { return categories.find(function (x) { return x.id === id; }) || categories[1]; }

  function ensureMenuButton() {
    var menu = document.getElementById('account-menu');
    if (!menu) return;
    var button = document.getElementById('teacher-facebook-lead-finder-btn');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.id = 'teacher-facebook-lead-finder-btn';
      button.className = 'account-menu-item account-menu-item-teacher';
      button.textContent = '🧭 Dò bài trong hội nhóm';
      button.style.display = 'none';
      button.addEventListener('click', async function () {
        if (!(await verifyTeacher(true))) { button.style.display = 'none'; return; }
        menu.classList.remove('open');
        open();
      });
      var smart = document.getElementById('teacher-facebook-smart-comment-btn');
      if (smart && smart.parentNode === menu) smart.after(button);
      else {
        var zalo = document.getElementById('teacher-zalo-manager-btn');
        if (zalo && zalo.parentNode === menu) zalo.after(button);
        else menu.appendChild(button);
      }
    }
    button.style.display = teacherVerified && getToken() ? '' : 'none';
  }

  function addStyles() {
    if (document.getElementById('ldd-fblf-style')) return;
    var style = document.createElement('style');
    style.id = 'ldd-fblf-style';
    style.textContent = [
      '#ldd-fblf-overlay{position:fixed;inset:0;z-index:2147482600;background:rgba(12,22,40,.62);display:none;align-items:center;justify-content:center;padding:14px;box-sizing:border-box}',
      '#ldd-fblf-overlay.is-open{display:flex}',
      '#ldd-fblf-panel{width:min(1100px,100%);height:min(850px,94dvh);display:flex;flex-direction:column;overflow:hidden;background:#f7f9ff;color:#17243d;border:1px solid #dbe4f7;border-radius:20px;box-shadow:0 24px 90px #0005;font-family:inherit}',
      '#ldd-fblf-panel *{box-sizing:border-box}',
      '.fblf-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:17px 21px;background:linear-gradient(120deg,#173d68,#236f87);color:#fff}',
      '.fblf-head h2{margin:0 0 3px;font-size:1.14rem}.fblf-head p{margin:0;font-size:.8rem;opacity:.85}',
      '.fblf-close{width:38px;height:38px;border:1px solid #ffffff55;border-radius:11px;background:#ffffff18;color:#fff;font-size:1.3rem;cursor:pointer}',
      '.fblf-tabs{display:flex;gap:8px;padding:10px 16px 0;background:#fff;border-bottom:1px solid #e2e9f5}',
      '.fblf-tab{border:0;border-bottom:3px solid transparent;padding:10px 13px;background:transparent;color:#61728c;font:inherit;font-weight:800;cursor:pointer}.fblf-tab.active{color:#285db7;border-color:#376bd0}',
      '.fblf-body{flex:1;min-height:0;overflow:auto;padding:16px}',
      '.fblf-page{display:none}.fblf-page.active{display:block}',
      '.fblf-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}',
      '.fblf-card{min-width:0;background:#fff;border:1px solid #e0e7f4;border-radius:15px;padding:15px;box-shadow:0 5px 18px #203d6b0b}',
      '.fblf-card h3{margin:0 0 8px;font-size:.96rem;color:#203b60}',
      '.fblf-label{display:block;margin:10px 0 5px;font-size:.77rem;font-weight:800;color:#536782}',
      '.fblf-input,.fblf-select,.fblf-area{display:block;width:100%;border:1px solid #ccd7e8;border-radius:10px;background:#fff;color:#1b2b45;padding:10px 11px;font:inherit;font-size:.86rem;outline:none}',
      '.fblf-area{min-height:105px;resize:vertical;line-height:1.45}.fblf-area.small{min-height:82px}',
      '.fblf-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:9px}',
      '.fblf-btn{border:1px solid #d0dbed;border-radius:10px;background:#fff;color:#28496f;padding:9px 12px;font:inherit;font-size:.8rem;font-weight:800;cursor:pointer}',
      '.fblf-btn.primary{background:#285cb5;border-color:#285cb5;color:#fff}.fblf-btn:disabled{opacity:.45}',
      '.fblf-muted{font-size:.76rem;line-height:1.45;color:#74849a}',
      '.fblf-status{min-height:20px;margin-top:8px;font-size:.79rem;color:#276b53}',
      '.fblf-note{margin-top:10px;padding:10px 12px;border:1px solid #f0dda9;border-radius:10px;background:#fff8e9;color:#75591f;font-size:.75rem;line-height:1.45}',
      '.fblf-list{display:grid;gap:8px;margin-top:11px}',
      '.fblf-item{padding:10px;border:1px solid #e0e7f4;border-radius:11px;background:#fff;font-size:.8rem}',
      '.fblf-item a{color:#2d5fb4;overflow-wrap:anywhere}.fblf-item p{margin:6px 0}',
      '.fblf-score{display:inline-flex;padding:4px 8px;border-radius:999px;background:#eef4ff;color:#315fa8;font-weight:850;font-size:.74rem}',
      '.fblf-score.high{background:#e8f7ef;color:#236a4c}.fblf-score.low{background:#fff3df;color:#77561c}',
      '@media(max-width:760px){#ldd-fblf-panel{height:96dvh;border-radius:14px}.fblf-grid{grid-template-columns:1fr}.fblf-head{padding:13px}.fblf-body{padding:10px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensurePanel() {
    if (overlay) return;
    addStyles();
    overlay = document.createElement('div');
    overlay.id = 'ldd-fblf-overlay';
    overlay.innerHTML =
      '<section id="ldd-fblf-panel" role="dialog" aria-modal="true" aria-labelledby="fblf-title">' +
        '<header class="fblf-head"><div><h2 id="fblf-title">🧭 LDD Facebook Lead Finder</h2><p>Quản lý hội nhóm · Tạo truy vấn · Lọc bài tiềm năng</p></div><button type="button" id="fblf-close" class="fblf-close" aria-label="Đóng">×</button></header>' +
        '<nav class="fblf-tabs"><button type="button" class="fblf-tab active" data-tab="groups">Hội nhóm & tìm kiếm</button><button type="button" class="fblf-tab" data-tab="leads">Bài tiềm năng</button></nav>' +
        '<div class="fblf-body">' +
          '<div class="fblf-page active" data-page="groups">' +
            '<div class="fblf-grid">' +
              '<div class="fblf-card"><h3>Danh sách hội nhóm theo dõi</h3><p class="fblf-muted">Lưu các nhóm bạn tham gia hoặc được phép xem để mở lại nhanh chóng.</p>' +
                '<label class="fblf-label" for="fblf-group-name">Tên hội nhóm</label><input id="fblf-group-name" class="fblf-input" placeholder="Ví dụ: Hội phụ huynh tìm gia sư">' +
                '<label class="fblf-label" for="fblf-group-url">Link hội nhóm</label><input id="fblf-group-url" class="fblf-input" type="url" placeholder="https://www.facebook.com/groups/…">' +
                '<div class="fblf-row"><button type="button" id="fblf-add-group" class="fblf-btn primary">Lưu hội nhóm</button><span id="fblf-group-status" class="fblf-muted"></span></div>' +
                '<div id="fblf-group-list" class="fblf-list"></div></div>' +
              '<div class="fblf-card"><h3>Tạo lượt tìm kiếm</h3><p class="fblf-muted">Chọn nhóm nhu cầu, chỉnh từ khóa và mở kết quả trong tài khoản Facebook của bạn.</p>' +
                '<label class="fblf-label" for="fblf-category">Đối tượng muốn tìm</label><select id="fblf-category" class="fblf-select"></select>' +
                '<label class="fblf-label" for="fblf-query">Từ khóa tìm kiếm</label><textarea id="fblf-query" class="fblf-area small"></textarea>' +
                '<label class="fblf-label" for="fblf-target-group">Hội nhóm muốn mở</label><select id="fblf-target-group" class="fblf-select"></select>' +
                '<div class="fblf-row"><button type="button" id="fblf-facebook-search" class="fblf-btn primary">Tìm toàn Facebook</button><button type="button" id="fblf-google-search" class="fblf-btn">Tìm bài công khai trên Google</button></div>' +
                '<div class="fblf-row"><button type="button" id="fblf-open-group" class="fblf-btn">Tìm trong nhóm đã chọn</button></div>' +
                '<div id="fblf-search-status" class="fblf-status"></div>' +
                '<div class="fblf-note">Tìm kiếm mở trực tiếp trong Facebook/Google; công cụ không tự đọc hay thu thập bài đăng. Chọn bài bạn có quyền xem, kiểm tra nội quy nhóm rồi dán link và nội dung vào danh sách để phân loại.</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="fblf-page" data-page="leads">' +
            '<div class="fblf-card"><h3>Lưu và chấm điểm bài đăng</h3><p class="fblf-muted">Điểm là ước tính dựa trên từ khóa liên quan và dấu hiệu người đăng đang tìm người dạy. Hãy tự đọc lại ngữ cảnh trước khi liên hệ.</p>' +
              '<label class="fblf-label" for="fblf-lead-link">Link bài đăng Facebook</label><input id="fblf-lead-link" class="fblf-input" type="url" placeholder="https://www.facebook.com/…">' +
              '<label class="fblf-label" for="fblf-lead-text">Nội dung bài đăng (phần liên quan)</label><textarea id="fblf-lead-text" class="fblf-area" placeholder="Dán phần nội dung công khai có liên quan đến nhu cầu học tiếng Anh…"></textarea>' +
              '<div class="fblf-row"><button type="button" id="fblf-score-lead" class="fblf-btn primary">Chấm điểm & lưu</button><span id="fblf-lead-status" class="fblf-status"></span></div>' +
              '<div id="fblf-lead-list" class="fblf-list"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (event) { if (event.target === overlay) close(); });
    overlay.querySelector('#fblf-close').addEventListener('click', close);
    overlay.querySelectorAll('.fblf-tab').forEach(function (button) {
      button.addEventListener('click', function () { showTab(button.getAttribute('data-tab')); });
    });
    overlay.querySelector('#fblf-add-group').addEventListener('click', addGroup);
    overlay.querySelector('#fblf-category').addEventListener('change', setSuggestedQuery);
    overlay.querySelector('#fblf-facebook-search').addEventListener('click', openFacebookSearch);
    overlay.querySelector('#fblf-google-search').addEventListener('click', openGoogleSearch);
    overlay.querySelector('#fblf-open-group').addEventListener('click', openGroupAndCopy);
    overlay.querySelector('#fblf-score-lead').addEventListener('click', scoreAndSaveLead);
    renderCategoryOptions();
    renderGroups();
    renderLeads();
  }

  function showTab(tab) {
    overlay.querySelectorAll('.fblf-tab').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-tab') === tab); });
    overlay.querySelectorAll('.fblf-page').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-page') === tab); });
    if (tab === 'leads') renderLeads();
  }
  function renderCategoryOptions() {
    var select = overlay.querySelector('#fblf-category');
    var current = select.value || 'parent';
    select.innerHTML = categories.map(function (x) { return '<option value="' + x.id + '">' + esc(x.name) + '</option>'; }).join('');
    select.value = categories.some(function (x) { return x.id === current; }) ? current : 'parent';
    var target = overlay.querySelector('#fblf-target-group');
    var list = savedGroups();
    target.innerHTML = '<option value="">— Tìm toàn Facebook —</option>' + list.map(function (x, i) {
      return '<option value="' + i + '">' + esc(x.name) + '</option>';
    }).join('');
    if (!overlay.querySelector('#fblf-query').value.trim()) setSuggestedQuery();
  }
  function setSuggestedQuery() {
    var category = catById(overlay.querySelector('#fblf-category').value);
    overlay.querySelector('#fblf-query').value = category.search;
  }
  function queryValue() { return overlay.querySelector('#fblf-query').value.trim(); }
  function openFacebookSearch() {
    var query = queryValue();
    if (!query) { overlay.querySelector('#fblf-search-status').textContent = 'Nhập từ khóa tìm kiếm trước.'; return; }
    window.open('https://www.facebook.com/search/posts/?q=' + encodeURIComponent(query), '_blank', 'noopener');
    overlay.querySelector('#fblf-search-status').textContent = 'Đã mở tìm kiếm Facebook. Hãy đọc từng kết quả và kiểm tra nội quy nhóm.';
  }
  function openGoogleSearch() {
    var query = queryValue();
    if (!query) { overlay.querySelector('#fblf-search-status').textContent = 'Nhập từ khóa tìm kiếm trước.'; return; }
    var q = 'site:facebook.com/groups/ (' + query.replace(/[;；]/g,' OR ') + ')';
    window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank', 'noopener');
    overlay.querySelector('#fblf-search-status').textContent = 'Đã mở kết quả cho các trang nhóm công khai được Google lập chỉ mục.';
  }
  function groupIdFromUrl(url) {
    try {
      var u = new URL(url);
      if (!/(^|\.)facebook\.com$/i.test(u.hostname)) return '';
      var m = u.pathname.match(/\/groups\/([^/]+)/i);
      return m ? m[1] : '';
    } catch (_) { return ''; }
  }
  function addGroup() {
    var name = overlay.querySelector('#fblf-group-name').value.trim();
    var url = overlay.querySelector('#fblf-group-url').value.trim();
    var status = overlay.querySelector('#fblf-group-status');
    if (!name || !groupIdFromUrl(url)) {
      status.textContent = 'Nhập tên và link dạng facebook.com/groups/...';
      return;
    }
    var list = savedGroups();
    if (list.some(function (x) { return x.url.replace(/\/+$/,'') === url.replace(/\/+$/,''); })) {
      status.textContent = 'Hội nhóm này đã được lưu.';
      return;
    }
    list.unshift({name:name,url:url,addedAt:new Date().toISOString()});
    if (!write(GROUPS_KEY,list.slice(0,100))) { status.textContent = 'Không lưu được trong trình duyệt này.'; return; }
    overlay.querySelector('#fblf-group-name').value = '';
    overlay.querySelector('#fblf-group-url').value = '';
    status.textContent = 'Đã lưu hội nhóm; sẽ đồng bộ với kho dữ liệu LDD.';
    renderGroups();
    renderCategoryOptions();
  }
  function renderGroups() {
    var host = overlay.querySelector('#fblf-group-list');
    var list = savedGroups();
    if (!list.length) { host.innerHTML = '<p class="fblf-muted">Chưa có hội nhóm nào trong danh sách.</p>'; return; }
    host.innerHTML = list.map(function (item,index) {
      return '<div class="fblf-item"><strong>' + esc(item.name) + '</strong><div class="fblf-row"><a href="' + esc(item.url) + '" target="_blank" rel="noopener">Mở hội nhóm</a><button type="button" class="fblf-btn" data-remove-group="' + index + '">Xóa</button></div></div>';
    }).join('');
    host.querySelectorAll('[data-remove-group]').forEach(function (button) {
      button.addEventListener('click', function () {
        var rows = savedGroups();
        rows.splice(Number(button.getAttribute('data-remove-group')),1);
        write(GROUPS_KEY,rows);
        renderGroups();
        renderCategoryOptions();
      });
    });
  }
  function openGroupAndCopy() {
    var index = overlay.querySelector('#fblf-target-group').value;
    var group = index === '' ? null : savedGroups()[Number(index)];
    var query = queryValue();
    if (!group) { overlay.querySelector('#fblf-search-status').textContent = 'Hãy chọn một hội nhóm đã lưu.'; return; }
    if (!query) { overlay.querySelector('#fblf-search-status').textContent = 'Nhập từ khóa tìm kiếm trước.'; return; }
    var groupId = groupIdFromUrl(group.url);
    if (!groupId) { overlay.querySelector('#fblf-search-status').textContent = 'Không nhận diện được mã hội nhóm. Hãy kiểm tra lại link nhóm.'; return; }
    var searchUrl = 'https://www.facebook.com/groups/' + encodeURIComponent(groupId) + '/search/?q=' + encodeURIComponent(query);
    window.open(searchUrl, '_blank', 'noopener');
    overlay.querySelector('#fblf-search-status').textContent = 'Đã mở kết quả tìm kiếm trong nhóm “' + group.name + '”. Hãy kiểm tra từng bài trước khi lưu.';
  }
  function scoreText(text) {
    var normalized = normalize(text);
    var result = categories.map(function (category) {
      var hits = [];
      var points = 0;
      category.keywords.forEach(function (keyword) {
        var k = normalize(keyword);
        if (k && normalized.indexOf(k) >= 0) {
          hits.push(keyword);
          points += Math.min(3, Math.max(1,k.split(' ').length));
        }
      });
      return {category:category,hits:hits,points:points};
    }).sort(function (a,b) { return b.points-a.points; });
    var intents = intentTerms.filter(function (term) { return normalized.indexOf(normalize(term)) >= 0; });
    var excluded = excludedTerms.filter(function (term) { return normalized.indexOf(normalize(term)) >= 0; });
    var top = result[0] || {category:categories[1],hits:[],points:0};
    var score = Math.min(100,top.points*9 + Math.min(intents.length,3)*18);
    if (!intents.length) score = Math.min(score,54);
    if (excluded.length) score = Math.max(0,score-35);
    return {score:score,category:top.category,hits:top.hits,intents:intents,excluded:excluded,secondary:result[1] && result[1].points ? result[1].category.name : ''};
  }
  function scoreAndSaveLead() {
    var link = overlay.querySelector('#fblf-lead-link').value.trim();
    var text = overlay.querySelector('#fblf-lead-text').value.trim();
    var status = overlay.querySelector('#fblf-lead-status');
    if (!/^https:\/\/(www\.|m\.)?facebook\.com\//i.test(link)) { status.textContent = 'Nhập link Facebook hợp lệ trước.'; return; }
    if (text.length < 12) { status.textContent = 'Dán thêm nội dung liên quan để chấm điểm.'; return; }
    var result = scoreText(text);
    var list = savedLeads();
    if (list.some(function (x) { return x.link.replace(/\/+$/,'') === link.replace(/\/+$/,''); })) {
      status.textContent = 'Bài đăng này đã có trong danh sách.';
      return;
    }
    var item = {
      id:Date.now().toString(36) + Math.random().toString(36).slice(2,7),
      link:link,text:text.slice(0,2500),score:result.score,categoryId:result.category.id,
      category:result.category.name,hits:result.hits.slice(0,8),intents:result.intents,
      excluded:result.excluded,secondary:result.secondary,createdAt:new Date().toISOString(),state:'Mới'
    };
    list.unshift(item);
    if (!write(LEADS_KEY,list.slice(0,200))) { status.textContent = 'Không lưu được, bộ nhớ trình duyệt có thể đã đầy.'; return; }
    status.textContent = 'Đã lưu · ' + result.score + '/100 · ' + result.category.name + (result.excluded.length ? ' · Có từ khóa loại trừ, hãy kiểm tra kỹ.' : '');
    overlay.querySelector('#fblf-lead-link').value = '';
    overlay.querySelector('#fblf-lead-text').value = '';
    renderLeads();
  }
  function renderLeads() {
    var host = overlay.querySelector('#fblf-lead-list');
    var list = savedLeads().sort(function (a,b) { return b.score-a.score; });
    if (!list.length) { host.innerHTML = '<p class="fblf-muted">Chưa có bài đăng tiềm năng nào được lưu.</p>'; return; }
    host.innerHTML = list.map(function (item) {
      var badgeClass = item.score >= 75 ? 'high' : 'low';
      return '<article class="fblf-item">' +
        '<span class="fblf-score ' + badgeClass + '">' + item.score + '/100</span> <strong>' + esc(item.category) + '</strong> · ' + esc(item.state) +
        '<p><a href="' + esc(item.link) + '" target="_blank" rel="noopener">Mở bài đăng Facebook</a></p>' +
        '<p class="fblf-muted">' + esc((item.text || '').slice(0,260)) + ((item.text || '').length > 260 ? '…' : '') + '</p>' +
        '<p class="fblf-muted">Khớp: ' + esc((item.hits || []).slice(0,5).join(', ') || 'Chưa có từ khóa rõ') +
          ((item.intents || []).length ? ' · Nhu cầu: ' + esc(item.intents.join(', ')) : '') +
          (item.secondary ? ' · Nhóm phụ: ' + esc(item.secondary) : '') + '</p>' +
        ((item.excluded || []).length ? '<p class="fblf-muted">Cần đọc kỹ: ' + esc(item.excluded.join(', ')) + '</p>' : '') +
        '<div class="fblf-row"><button type="button" class="fblf-btn primary" data-compose-lead="' + esc(item.id) + '">Duyệt & soạn bình luận</button><button type="button" class="fblf-btn" data-delete-lead="' + esc(item.id) + '">Xóa</button></div>' +
      '</article>';
    }).join('');
    host.querySelectorAll('[data-compose-lead]').forEach(function (button) {
      button.addEventListener('click', async function () {
        var item = savedLeads().find(function (x) { return x.id === button.getAttribute('data-compose-lead'); });
        if (!item) return;
        close();
        if (!window.LDDFacebookSmartComment || typeof window.LDDFacebookSmartComment.open !== 'function') {
          alert('Chưa tải xong công cụ soạn bình luận. Hãy tải lại website rồi thử lại.');
          return;
        }
        await window.LDDFacebookSmartComment.open();
        var linkField = document.getElementById('fbsc-link');
        var postField = document.getElementById('fbsc-post');
        var classifyButton = document.getElementById('fbsc-classify');
        if (linkField && postField && classifyButton) {
          linkField.value = item.link;
          postField.value = item.text || '';
          classifyButton.click();
          var state = document.getElementById('fbsc-classify-result');
          if (state) state.textContent += ' · Điểm tiềm năng: ' + item.score + '/100. Hãy kiểm tra ngữ cảnh trước khi đăng.';
          var rows = savedLeads();
          var index = rows.findIndex(function (x) { return x.id === item.id; });
          if (index >= 0) { rows[index].state = 'Đã duyệt – chờ bạn đăng'; write(LEADS_KEY,rows); }
        }
      });
    });
    host.querySelectorAll('[data-delete-lead]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-delete-lead');
        write(LEADS_KEY,savedLeads().filter(function (x) { return x.id !== id; }));
        renderLeads();
      });
    });
  }
  async function open() {
    if (!(await verifyTeacher(true))) return;
    var cloudReady = window.LDDFacebookCloud ? await window.LDDFacebookCloud.load() : false;
    ensurePanel();
    renderGroups();
    renderCategoryOptions();
    renderLeads();
    var cloudStatus = overlay.querySelector('#fblf-search-status');
    if (cloudStatus) cloudStatus.textContent = cloudReady
      ? 'Đã đồng bộ hội nhóm và bài tiềm năng với kho dữ liệu LDD.'
      : 'Chưa kết nối được kho dữ liệu; hiện chỉ dùng dữ liệu trên trình duyệt này.';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  async function sync() {
    var token = getToken();
    if (token !== tokenSeen || Date.now() - verifiedAt > 45000) await verifyTeacher(true);
    ensureMenuButton();
    if (!teacherVerified && overlay && overlay.classList.contains('is-open')) close();
  }
  function start() {
    sync();
    window.setInterval(sync,3000);
    window.addEventListener('storage',sync);
    document.addEventListener('visibilitychange',function () { if (!document.hidden) sync(); });
    document.addEventListener('keydown',function (event) { if (event.key === 'Escape' && overlay && overlay.classList.contains('is-open')) close(); });
    var menu = document.getElementById('account-menu');
    if (menu && window.MutationObserver) new MutationObserver(ensureMenuButton).observe(menu,{childList:true});
  }
  window.LDDFacebookLeadFinder = {open:open,close:close,isTeacher:function () { return teacherVerified; }};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();