/* LDD English — Facebook Smart Comment, teacher-only profile workflow.
   This tool prepares comments and image packs. It does not scrape Facebook or auto-post.
*/
(function () {
  'use strict';
  if (window.LDDFacebookSmartComment) return;

  var SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
  var SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  var TEACHER_EMAIL = 'lddbaiu@gmail.com';
  var STORE_KEY = 'ldd-facebook-smart-comment-v1';
  var IMAGES_KEY = 'ldd-facebook-smart-comment-images-v1';
  var HISTORY_KEY = 'ldd-facebook-smart-comment-history-v1';
  var tokenSeen = '';
  var teacherVerified = false;
  var verifiedAt = 0;
  var modal = null;
  var currentGroup = 'parent';
  var currentImages = [];

  var groups = [
    {id:'basic',name:'Học sinh mất gốc',keywords:['mất gốc','hổng kiến thức','học lại từ đầu','không biết tiếng anh','yếu tiếng anh'],images:['cv','website','zalo1']},
    {id:'parent',name:'Phụ huynh tìm gia sư',keywords:['tìm gia sư','cần gia sư','tìm giáo viên','học thêm tiếng anh','lớp 6','lớp 7','lớp 8','lớp 9','ôn thi vào 10','con học tiếng anh'],images:['cv','teaching','website']},
    {id:'speaking',name:'Người cần giao tiếp',keywords:['tiếng anh giao tiếp','luyện nói','mất phản xạ','phản xạ tiếng anh','giao tiếp công việc','speaking'],images:['teaching','website']},
    {id:'worker',name:'Người đi làm bận rộn',keywords:['người đi làm','tiếng anh công việc','phỏng vấn','lịch bận','học online','học tại nhà'],images:['website','zalo1','teaching']},
    {id:'longterm',name:'Người cần lộ trình dài hạn',keywords:['lộ trình','tự học','cải thiện tiếng anh','nâng cao tiếng anh','học theo năng lực'],images:['website','zalo1','zalo2']}
  ];

  var imageCatalog = [
    {id:'cv',name:'CV gia sư',caption:'Hồ sơ, kinh nghiệm và quyền lợi học viên'},
    {id:'website',name:'Website tự học',caption:'Trang chủ Web tự học LDD English'},
    {id:'teaching',name:'Dạy học & giao tiếp',caption:'Hình ảnh dạy online và dẫn học viên luyện giao tiếp'},
    {id:'zalo1',name:'Bot Zalo – nhắc học',caption:'Tin nhắn nhắc học viên quay lại website'},
    {id:'zalo2',name:'Bot Zalo – nhắc tiếp',caption:'Hình minh họa lượt nhắc học tiếp theo'}
  ];

  var templates = {
    basic: {
      main:'Chào bạn, mình là Dương, gia sư tiếng Anh. Mình có nhận hỗ trợ học viên mất gốc hoặc hổng kiến thức từ nền tảng. Trước khi học, mình có thể trao đổi khoảng 30 phút và làm bài test đầu vào để xác định phần đang yếu. Học viên có website tự học theo năng lực, bài tập sau mỗi buổi, bài kiểm tra theo từng chương và hệ thống Zalo tự động nhắc học. Bạn có thể nhắn Zalo 0988007529 để trao đổi nhé!',
      reply:'Mình gửi thêm một số hình ảnh về hồ sơ gia sư, website tự học và hệ thống hỗ trợ học viên bên ngoài giờ học để bạn tham khảo.'
    },
    parent: {
      main:'Chào bạn, mình là Dương, gia sư tiếng Anh. Mình có thể hỗ trợ học sinh tiểu học, THCS và ôn tập theo tình hình trên lớp. Mỗi học viên được theo dõi năng lực để điều chỉnh lộ trình; có bài tập sau mỗi buổi và bài kiểm tra sau từng chương. Mình cũng xây dựng website tự học riêng để các em luyện tập ngoài giờ, kèm hệ thống Zalo tự động nhắc học. Phụ huynh có thể nhắn Zalo 0988007529 để trao đổi khoảng 30 phút và cho con làm bài test đầu vào nhé!',
      reply:'Mình gửi bạn xem thêm CV, hình ảnh dạy học thực tế và giao diện website tự học LDD English.'
    },
    speaking: {
      main:'Chào bạn, mình là Dương, gia sư tiếng Anh. Với nhu cầu giao tiếp, mình ưu tiên xác định trình độ và mục đích sử dụng tiếng Anh trước, sau đó điều chỉnh nội dung học theo khả năng và công việc thực tế. Ngoài buổi học, bạn có thể luyện tập trên website tự học và nhận nhắc nhở tự động qua Zalo. Bạn có thể nhắn 0988007529 để trao đổi khoảng 30 phút và làm bài test đầu vào nhé!',
      reply:'Mình gửi thêm hình ảnh hoạt động luyện giao tiếp thực tế, dạy online và hệ thống tự học để bạn tham khảo.'
    },
    worker: {
      main:'Chào bạn, mình là Dương, gia sư tiếng Anh. Nếu lịch làm việc bận, mình có thể điều chỉnh lộ trình theo mục tiêu, thời gian và năng lực hiện tại của bạn. Website tự học giúp bạn luyện thêm ngoài giờ; bài tập và nội dung ôn tập được theo dõi, kèm hệ thống Zalo tự động nhắc học. Bạn có thể nhắn 0988007529 để trao đổi khoảng 30 phút và làm bài test đầu vào nhé!',
      reply:'Mình gửi bạn xem giao diện website tự học, hình ảnh dạy online và tin nhắn nhắc học qua Zalo.'
    },
    longterm: {
      main:'Chào bạn, mình là Dương, gia sư tiếng Anh. Mình chú trọng xây dựng lộ trình có thể thay đổi theo năng lực và kết quả học tập thực tế, thay vì cố định một chương trình cho tất cả. Học viên có website tự học, bài tập sau mỗi buổi, bài kiểm tra sau từng chương và hệ thống Zalo tự động nhắc học. Bạn có thể nhắn 0988007529 để trao đổi khoảng 30 phút và làm bài test đầu vào nhé!',
      reply:'Mình gửi kèm hình ảnh website tự học và hệ thống nhắc học Zalo để bạn hình dung cách học viên được hỗ trợ ngoài giờ.'
    }
  };

  function getToken() {
    try {
      var raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
      var x = JSON.parse(raw || 'null');
      if (!x) return '';
      if (x.access_token) return x.access_token;
      if (x.currentSession && x.currentSession.access_token) return x.currentSession.access_token;
      if (Array.isArray(x) && x[0] && x[0].access_token) return x[0].access_token;
    } catch (_) {}
    return '';
  }

  async function validateTeacher(force) {
    var token = getToken();
    if (!token) {
      tokenSeen = '';
      teacherVerified = false;
      verifiedAt = 0;
      return false;
    }
    if (!force && token === tokenSeen && Date.now() - verifiedAt < 45000) return teacherVerified;
    tokenSeen = token;
    teacherVerified = false;
    verifiedAt = Date.now();
    try {
      var res = await fetch(SUPABASE_URL + '/auth/v1/user', {
        method:'GET',
        cache:'no-store',
        headers:{apikey:SUPABASE_ANON, Authorization:'Bearer ' + token}
      });
      if (!res.ok) return false;
      var user = await res.json();
      teacherVerified = String(user && user.email || '').trim().toLowerCase() === TEACHER_EMAIL;
    } catch (_) {
      teacherVerified = false;
    }
    return teacherVerified;
  }

  function readJSON(key, fallback) {
    try { var value = JSON.parse(localStorage.getItem(key) || 'null'); return value == null ? fallback : value; }
    catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (window.LDDFacebookCloud) window.LDDFacebookCloud.save(key, value);
      return true;
    } catch (_) { return false; }
  }
  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
  }
  function groupById(id) { return groups.find(function (g) { return g.id === id; }) || groups[1]; }
  function currentTemplate() { return templates[currentGroup] || templates.parent; }

  function ensureMenuButton() {
    var menu = document.getElementById('account-menu');
    if (!menu) return;
    var btn = document.getElementById('teacher-facebook-smart-comment-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'teacher-facebook-smart-comment-btn';
      btn.className = 'account-menu-item account-menu-item-teacher';
      btn.textContent = '🔎 Tìm học viên Facebook';
      btn.style.display = 'none';
      btn.addEventListener('click', async function () {
        if (!(await validateTeacher(true))) { btn.style.display = 'none'; return; }
        menu.classList.remove('open');
        open();
      });
      var zalo = document.getElementById('teacher-zalo-manager-btn');
      var impersonate = document.getElementById('teacher-impersonate-btn');
      if (zalo && zalo.parentNode === menu) zalo.after(btn);
      else if (impersonate && impersonate.parentNode === menu) impersonate.after(btn);
      else menu.appendChild(btn);
    }
    btn.style.display = teacherVerified && getToken() ? '' : 'none';
  }

  function addStyles() {
    if (document.getElementById('ldd-fbsc-style')) return;
    var style = document.createElement('style');
    style.id = 'ldd-fbsc-style';
    style.textContent = [
      '#ldd-fbsc-overlay{position:fixed;inset:0;z-index:2147482500;background:rgba(13,23,42,.62);display:none;align-items:center;justify-content:center;padding:14px;box-sizing:border-box}',
      '#ldd-fbsc-overlay.is-open{display:flex}',
      '#ldd-fbsc-panel{width:min(1240px,100%);height:min(900px,94dvh);background:#f7f9ff;color:#17243d;border-radius:22px;box-shadow:0 24px 90px #0005;display:flex;flex-direction:column;overflow:hidden;border:1px solid #dbe4f7;font-family:inherit}',
      '#ldd-fbsc-panel *{box-sizing:border-box}',
      '.fbsc-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:19px 22px;background:linear-gradient(120deg,#173d68,#236f87);color:#fff}',
      '.fbsc-head h2{font-size:1.18rem;margin:0 0 3px;font-weight:850}.fbsc-head p{margin:0;font-size:.82rem;opacity:.85}',
      '.fbsc-close{width:38px;height:38px;border:1px solid #ffffff55;border-radius:12px;background:#ffffff18;color:#fff;font-size:1.35rem;cursor:pointer}',
      '.fbsc-tabs{display:flex;gap:8px;padding:12px 18px 0;background:#fff;border-bottom:1px solid #e3e9f5}',
      '.fbsc-tab{border:0;background:transparent;color:#60718c;padding:10px 13px;border-bottom:3px solid transparent;font:inherit;font-weight:750;cursor:pointer}',
      '.fbsc-tab.active{color:#2557a6;border-color:#3767d6}',
      '.fbsc-body{padding:16px 18px;overflow:auto;flex:1;min-height:0}',
      '.fbsc-page{display:none}.fbsc-page.active{display:block}',
      '.fbsc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:15px;align-items:start}',
      '.fbsc-card{background:#fff;border:1px solid #e0e7f4;border-radius:16px;padding:15px;box-shadow:0 5px 18px #203d6b0b;min-width:0}',
      '.fbsc-card h3{font-size:.98rem;margin:0 0 10px;color:#203a5f}',
      '.fbsc-label{display:block;font-size:.78rem;font-weight:800;color:#536782;margin:11px 0 6px}',
      '.fbsc-input,.fbsc-textarea,.fbsc-select{display:block;width:100%;border:1px solid #ccd7e8;background:#fff;border-radius:10px;padding:10px 11px;font:inherit;font-size:.88rem;color:#1d2d48;outline:none}',
      '.fbsc-input:focus,.fbsc-textarea:focus,.fbsc-select:focus{border-color:#4a76d9;box-shadow:0 0 0 3px #4a76d91a}',
      '.fbsc-textarea{min-height:115px;resize:vertical;line-height:1.5}',
      '.fbsc-textarea.fbsc-small{min-height:88px}',
      '.fbsc-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
      '.fbsc-btn{border:1px solid #d0dbed;background:#fff;color:#26466f;border-radius:10px;padding:9px 12px;font:inherit;font-size:.82rem;font-weight:800;cursor:pointer}',
      '.fbsc-btn.primary{background:#285cb5;border-color:#285cb5;color:#fff}.fbsc-btn.gold{background:#fff0c3;border-color:#ffe29a;color:#523d08}',
      '.fbsc-muted{font-size:.77rem;color:#73839a;line-height:1.45}',
      '.fbsc-status{min-height:20px;margin-top:8px;font-size:.8rem;color:#246b55}',
      '.fbsc-pickgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:10px}',
      '.fbsc-pick{border:1px solid #dce5f2;border-radius:12px;padding:8px;display:flex;gap:9px;align-items:flex-start;background:#fff;cursor:pointer}',
      '.fbsc-pick input{margin-top:4px}.fbsc-pick img{width:70px;height:68px;object-fit:cover;border-radius:8px;background:#eef2f8;flex-shrink:0}',
      '.fbsc-pick strong{display:block;font-size:.78rem;color:#263e5f}.fbsc-pick small{display:block;font-size:.68rem;color:#77869a;line-height:1.35;margin-top:3px}',
      '.fbsc-pick .fbsc-missing{width:70px;height:68px;display:grid;place-items:center;background:#f0f4fa;border-radius:8px;color:#8b9bb1;font-size:1.2rem;flex-shrink:0}',
      '.fbsc-upload{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px}.fbsc-upload input{font-size:.73rem;max-width:100%}',
      '.fbsc-setting-row{border:1px solid #e1e8f3;border-radius:12px;padding:12px;margin:10px 0;background:#fff}',
      '.fbsc-history{display:grid;gap:8px}.fbsc-history-item{border:1px solid #e0e7f4;border-radius:12px;padding:10px;background:#fff;font-size:.8rem}',
      '.fbsc-history-item a{color:#2c5db0;overflow-wrap:anywhere}',
      '.fbsc-warning{padding:10px 12px;border-radius:10px;background:#fff7e7;border:1px solid #f4dfad;color:#73551d;font-size:.77rem;line-height:1.45}',
      '.fbsc-success{padding:10px 12px;border-radius:10px;background:#eaf8f2;border:1px solid #b7e5d1;color:#1e6047;font-size:.77rem;line-height:1.45}',
      '@media(max-width:800px){#ldd-fbsc-panel{height:96dvh;border-radius:15px}.fbsc-grid{grid-template-columns:1fr}.fbsc-head{padding:14px}.fbsc-body{padding:11px}.fbsc-pickgrid{grid-template-columns:1fr 1fr}}',
      '@media(max-width:480px){#ldd-fbsc-overlay{padding:5px}.fbsc-pickgrid{grid-template-columns:1fr}.fbsc-pick img,.fbsc-pick .fbsc-missing{width:62px;height:62px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureModal() {
    if (modal) return;
    addStyles();
    modal = document.createElement('div');
    modal.id = 'ldd-fbsc-overlay';
    modal.innerHTML =
      '<section id="ldd-fbsc-panel" role="dialog" aria-modal="true" aria-labelledby="fbsc-title">' +
        '<header class="fbsc-head"><div><h2 id="fbsc-title">🔎 LDD Facebook Smart Comment</h2><p>Phân loại nhu cầu · Soạn bình luận · Chọn ảnh minh chứng</p></div><button type="button" class="fbsc-close" id="fbsc-close" aria-label="Đóng">×</button></header>' +
        '<nav class="fbsc-tabs"><button class="fbsc-tab active" data-tab="compose">Soạn bình luận</button><button class="fbsc-tab" data-tab="settings">Từ khóa & hình ảnh</button><button class="fbsc-tab" data-tab="history">Lịch sử</button></nav>' +
        '<div class="fbsc-body">' +
          '<div class="fbsc-page active" data-page="compose">' +
            '<div class="fbsc-grid">' +
              '<div class="fbsc-card">' +
                '<h3>1. Bài đăng cần phản hồi</h3>' +
                '<label class="fbsc-label" for="fbsc-link">Link bài đăng Facebook</label><input class="fbsc-input" id="fbsc-link" type="url" placeholder="https://www.facebook.com/…">' +
                '<label class="fbsc-label" for="fbsc-post">Dán nội dung bài đăng</label><textarea class="fbsc-textarea" id="fbsc-post" placeholder="Dán nội dung bài viết hoặc đoạn có nhu cầu tìm gia sư / học tiếng Anh…"></textarea>' +
                '<div class="fbsc-row" style="margin-top:9px"><button class="fbsc-btn primary" id="fbsc-classify">Phân loại theo từ khóa</button><select class="fbsc-select" id="fbsc-group" style="flex:1;min-width:190px"></select></div>' +
                '<div id="fbsc-classify-result" class="fbsc-status">Dán nội dung rồi chọn “Phân loại theo từ khóa”.</div>' +
                '<div class="fbsc-warning" style="margin-top:9px">Công cụ chỉ phân tích nội dung bạn dán vào. Nó không tự quét Facebook, không lấy dữ liệu nhóm và không tự đăng bình luận.</div>' +
                '<label class="fbsc-label" for="fbsc-main">2. Bình luận chính</label><textarea class="fbsc-textarea" id="fbsc-main"></textarea>' +
                '<div class="fbsc-row" style="margin-top:8px"><button class="fbsc-btn" id="fbsc-copy-main">Sao chép bình luận chính</button><button class="fbsc-btn" id="fbsc-refresh-template">Tạo lại theo nhóm</button></div>' +
              '</div>' +
              '<div class="fbsc-card">' +
                '<h3>3. Bình luận phụ và ảnh đính kèm</h3>' +
                '<label class="fbsc-label" for="fbsc-reply">Nội dung trả lời bình luận chính</label><textarea class="fbsc-textarea fbsc-small" id="fbsc-reply"></textarea>' +
                '<div class="fbsc-row" style="margin-top:8px"><button class="fbsc-btn" id="fbsc-copy-reply">Sao chép bình luận phụ</button></div>' +
                '<label class="fbsc-label">Chọn hình minh chứng</label><div id="fbsc-images" class="fbsc-pickgrid"></div>' +
                '<div class="fbsc-row" style="margin-top:10px"><button class="fbsc-btn" id="fbsc-download-images">Tải ảnh đã chọn</button><button class="fbsc-btn" id="fbsc-open-post">Mở bài đăng Facebook</button></div>' +
                '<div class="fbsc-row" style="margin-top:8px"><button class="fbsc-btn gold" id="fbsc-mark-posted">Đánh dấu đã đăng</button></div>' +
                '<div id="fbsc-compose-status" class="fbsc-status"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="fbsc-page" data-page="settings">' +
            '<div class="fbsc-grid"><div class="fbsc-card"><h3>Nhóm đối tượng và từ khóa</h3><p class="fbsc-muted">Chỉnh sửa từ khóa, phân cách bằng dấu phẩy. Công cụ sẽ dùng các từ khóa này để chấm điểm mức độ phù hợp.</p><div id="fbsc-keyword-settings"></div><button class="fbsc-btn primary" id="fbsc-save-keywords">Lưu bộ từ khóa</button><div id="fbsc-settings-status" class="fbsc-status"></div></div>' +
            '<div class="fbsc-card"><h3>Thư viện ảnh minh chứng</h3><p class="fbsc-muted">Tải từng ảnh đã cắt riêng từ máy tính. Ảnh được nén và lưu cục bộ trong trình duyệt này, không tải lên máy chủ.</p><div id="fbsc-image-settings"></div><div class="fbsc-success" style="margin-top:10px">Gợi ý: dùng ảnh CV cho phụ huynh; ảnh giao tiếp cho người cần luyện nói; ảnh website và Zalo cho người tự học hoặc đi làm.</div></div></div>' +
          '</div>' +
          '<div class="fbsc-page" data-page="history"><div class="fbsc-card"><h3>Các bài đã xử lý</h3><p class="fbsc-muted">Lịch sử chỉ lưu link, nhóm đối tượng và thời điểm; không lưu toàn văn bài đăng bạn dán vào.</p><div id="fbsc-history" class="fbsc-history"></div></div></div>' +
        '</div>' +
      '</section>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
    modal.querySelector('#fbsc-close').addEventListener('click', close);
    modal.querySelectorAll('.fbsc-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { showTab(tab.getAttribute('data-tab')); });
    });
    modal.querySelector('#fbsc-classify').addEventListener('click', classifyPost);
    modal.querySelector('#fbsc-group').addEventListener('change', function () {
      currentGroup = this.value;
      currentImages = [];
      fillTemplate();
      renderImages();
    });
    modal.querySelector('#fbsc-refresh-template').addEventListener('click', fillTemplate);
    modal.querySelector('#fbsc-copy-main').addEventListener('click', function () { copyText('fbsc-main','Đã sao chép bình luận chính.'); });
    modal.querySelector('#fbsc-copy-reply').addEventListener('click', function () { copyText('fbsc-reply','Đã sao chép bình luận phụ.'); });
    modal.querySelector('#fbsc-open-post').addEventListener('click', openPost);
    modal.querySelector('#fbsc-mark-posted').addEventListener('click', markPosted);
    modal.querySelector('#fbsc-download-images').addEventListener('click', downloadSelectedImages);
    modal.querySelector('#fbsc-save-keywords').addEventListener('click', saveKeywords);
    renderGroupOptions();
    renderKeywordSettings();
    renderImageSettings();
    renderImages();
    fillTemplate();
    renderHistory();
  }

  function showTab(tab) {
    if (!modal) return;
    modal.querySelectorAll('.fbsc-tab').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-tab') === tab); });
    modal.querySelectorAll('.fbsc-page').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-page') === tab); });
    if (tab === 'history') renderHistory();
  }

  function renderGroupOptions() {
    var select = modal.querySelector('#fbsc-group');
    select.innerHTML = groups.map(function (g) { return '<option value="' + g.id + '">' + escapeHTML(g.name) + '</option>'; }).join('');
    select.value = currentGroup;
  }

  function readCustomKeywords() {
    var saved = readJSON(STORE_KEY, {});
    return saved && saved.keywords ? saved.keywords : {};
  }
  function keywordsFor(group) {
    var custom = readCustomKeywords();
    return Array.isArray(custom[group.id]) ? custom[group.id] : group.keywords;
  }

  function classifyPost() {
    var text = modal.querySelector('#fbsc-post').value.trim();
    if (!text) {
      modal.querySelector('#fbsc-classify-result').textContent = 'Bạn hãy dán nội dung bài đăng trước.';
      return;
    }
    var normalized = normalize(text);
    var scored = groups.map(function (g) {
      var score = 0;
      var matched = [];
      keywordsFor(g).forEach(function (keyword) {
        var k = normalize(keyword);
        if (k && normalized.indexOf(k) >= 0) { score += Math.max(1, k.split(' ').length); matched.push(keyword); }
      });
      return {group:g,score:score,matched:matched};
    }).sort(function (a,b) { return b.score - a.score; });
    if (!scored[0].score) {
      modal.querySelector('#fbsc-classify-result').textContent = 'Chưa tìm thấy từ khóa đủ rõ. Hãy chọn nhóm thủ công để soạn nội dung.';
      return;
    }
    currentGroup = scored[0].group.id;
    currentImages = [];
    renderGroupOptions();
    fillTemplate();
    renderImages();
    var matchedText = scored[0].matched.slice(0,5).join(', ');
    var extra = scored[1] && scored[1].score ? ' · Nhóm phụ: ' + scored[1].group.name : '';
    modal.querySelector('#fbsc-classify-result').textContent =
      'Phù hợp nhất: ' + scored[0].group.name + ' (điểm từ khóa: ' + scored[0].score + ') · Khớp: ' + matchedText + extra;
  }

  function fillTemplate() {
    var t = currentTemplate();
    modal.querySelector('#fbsc-main').value = t.main;
    modal.querySelector('#fbsc-reply').value = t.reply;
  }

  function imageStore() { return readJSON(IMAGES_KEY, {}); }
  function renderImages() {
    var saved = imageStore();
    var selected = currentImages.length ? currentImages.slice() : (groupById(currentGroup).images || []).slice();
    currentImages = selected;
    var host = modal.querySelector('#fbsc-images');
    host.innerHTML = imageCatalog.map(function (item) {
      var data = saved[item.id];
      return '<label class="fbsc-pick"><input type="checkbox" data-image="' + item.id + '"' + (selected.indexOf(item.id) >= 0 ? ' checked' : '') + '>' +
        (data ? '<img src="' + data + '" alt="">' : '<span class="fbsc-missing">＋</span>') +
        '<span><strong>' + escapeHTML(item.name) + '</strong><small>' + (data ? 'Đã có ảnh · ' : 'Chưa tải ảnh · ') + escapeHTML(item.caption) + '</small></span></label>';
    }).join('');
    host.querySelectorAll('input[type=checkbox]').forEach(function (input) {
      input.addEventListener('change', function () {
        var id = input.getAttribute('data-image');
        if (input.checked && currentImages.indexOf(id) < 0) currentImages.push(id);
        if (!input.checked) currentImages = currentImages.filter(function (x) { return x !== id; });
      });
    });
  }

  function renderKeywordSettings() {
    var custom = readCustomKeywords();
    var host = modal.querySelector('#fbsc-keyword-settings');
    host.innerHTML = groups.map(function (g) {
      var values = Array.isArray(custom[g.id]) ? custom[g.id] : g.keywords;
      return '<div class="fbsc-setting-row"><strong>' + escapeHTML(g.name) + '</strong><label class="fbsc-label">Từ khóa</label><textarea class="fbsc-textarea fbsc-small" data-keywords="' + g.id + '">' + escapeHTML(values.join(', ')) + '</textarea></div>';
    }).join('');
  }

  function saveKeywords() {
    var current = readJSON(STORE_KEY, {});
    current.keywords = {};
    modal.querySelectorAll('[data-keywords]').forEach(function (field) {
      current.keywords[field.getAttribute('data-keywords')] = field.value.split(/[,\n;]/).map(function (x) { return x.trim(); }).filter(Boolean);
    });
    var ok = writeJSON(STORE_KEY, current);
    modal.querySelector('#fbsc-settings-status').textContent = ok ? 'Đã lưu; bộ từ khóa sẽ đồng bộ với kho dữ liệu LDD.' : 'Không thể lưu. Có thể bộ nhớ trình duyệt đã đầy.';
  }

  function renderImageSettings() {
    var saved = imageStore();
    var host = modal.querySelector('#fbsc-image-settings');
    host.innerHTML = imageCatalog.map(function (item) {
      var has = !!saved[item.id];
      return '<div class="fbsc-setting-row"><strong>' + escapeHTML(item.name) + '</strong><p class="fbsc-muted">' + escapeHTML(item.caption) + '</p><div class="fbsc-upload"><input type="file" accept="image/*" data-upload-image="' + item.id + '"><span class="fbsc-muted">' + (has ? 'Đã lưu ảnh' : 'Chưa có ảnh') + '</span>' +
        (has ? '<button type="button" class="fbsc-btn" data-remove-image="' + item.id + '">Xóa ảnh</button>' : '') + '</div></div>';
    }).join('');
    host.querySelectorAll('[data-upload-image]').forEach(function (input) {
      input.addEventListener('change', function () { if (input.files && input.files[0]) saveImage(input.getAttribute('data-upload-image'), input.files[0]); });
    });
    host.querySelectorAll('[data-remove-image]').forEach(function (button) {
      button.addEventListener('click', function () {
        var data = imageStore();
        delete data[button.getAttribute('data-remove-image')];
        writeJSON(IMAGES_KEY, data);
        renderImageSettings();
        renderImages();
      });
    });
  }

  function saveImage(id, file) {
    if (!file || !/^image\//.test(file.type)) return;
    var status = modal.querySelector('#fbsc-settings-status');
    status.textContent = 'Đang tối ưu ảnh…';
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1400;
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.78);
        var data = imageStore();
        data[id] = dataUrl;
        var ok = writeJSON(IMAGES_KEY, data);
        status.textContent = ok ? 'Đã lưu ảnh ' + imageCatalog.find(function (x) { return x.id === id; }).name + ' trong trình duyệt này.' : 'Không lưu được ảnh; hãy dùng ảnh nhỏ hơn.';
        renderImageSettings();
        renderImages();
      };
      img.onerror = function () { status.textContent = 'Không đọc được ảnh này.'; };
      img.src = reader.result;
    };
    reader.onerror = function () { status.textContent = 'Không đọc được tệp ảnh.'; };
    reader.readAsDataURL(file);
  }

  function copyText(id, success) {
    var value = modal.querySelector('#' + id).value.trim();
    if (!value) return;
    var status = modal.querySelector('#fbsc-compose-status');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () { status.textContent = success; }).catch(function () { fallbackCopy(value, status, success); });
    } else fallbackCopy(value, status, success);
  }
  function fallbackCopy(value, status, success) {
    var input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed'; input.style.opacity = '0';
    document.body.appendChild(input); input.select();
    try { document.execCommand('copy'); status.textContent = success; }
    catch (_) { status.textContent = 'Không thể sao chép tự động; hãy chọn và sao chép nội dung.'; }
    input.remove();
  }

  function openPost() {
    var link = modal.querySelector('#fbsc-link').value.trim();
    if (!/^https:\/\/(www\.|m\.)?facebook\.com\//i.test(link)) {
      modal.querySelector('#fbsc-compose-status').textContent = 'Hãy nhập link Facebook hợp lệ trước.';
      return;
    }
    window.open(link, '_blank', 'noopener');
  }

  function downloadSelectedImages() {
    var saved = imageStore();
    var chosen = currentImages.filter(function (id) { return !!saved[id]; });
    if (!chosen.length) {
      modal.querySelector('#fbsc-compose-status').textContent = 'Bạn chưa tải ảnh hoặc chưa chọn ảnh nào.';
      return;
    }
    chosen.forEach(function (id, index) {
      var a = document.createElement('a');
      a.href = saved[id];
      a.download = 'ldd-facebook-' + id + '.jpg';
      document.body.appendChild(a);
      setTimeout(function () { a.click(); a.remove(); }, index * 250);
    });
    modal.querySelector('#fbsc-compose-status').textContent = 'Đã tạo lệnh tải ' + chosen.length + ' ảnh đã chọn. Bạn đính kèm ảnh thủ công trong Facebook.';
  }

  function markPosted() {
    var link = modal.querySelector('#fbsc-link').value.trim();
    var list = readJSON(HISTORY_KEY, []);
    list.unshift({link:link,group:groupById(currentGroup).name,at:new Date().toISOString(),status:'Đã đánh dấu đã đăng'});
    writeJSON(HISTORY_KEY, list.slice(0,60));
    modal.querySelector('#fbsc-compose-status').textContent = 'Đã lưu vào lịch sử. Hãy chỉ đánh dấu sau khi bạn đã tự đăng bình luận.';
    renderHistory();
  }

  function renderHistory() {
    var host = modal.querySelector('#fbsc-history');
    var list = readJSON(HISTORY_KEY, []);
    if (!list.length) {
      host.innerHTML = '<p class="fbsc-muted">Chưa có bài đăng nào được ghi nhận.</p>';
      return;
    }
    host.innerHTML = list.map(function (item) {
      var date = new Date(item.at).toLocaleString('vi-VN');
      return '<div class="fbsc-history-item"><strong>' + escapeHTML(item.group) + '</strong> · ' + escapeHTML(date) + '<br>' +
        (item.link ? '<a href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener">Mở bài Facebook đã xử lý</a>' : '<span class="fbsc-muted">Không lưu link</span>') +
        '<br><span class="fbsc-muted">' + escapeHTML(item.status) + '</span></div>';
    }).join('');
  }

  async function open() {
    if (!(await validateTeacher(true))) return;
    var cloudReady = window.LDDFacebookCloud ? await window.LDDFacebookCloud.load() : false;
    ensureModal();
    renderImages();
    renderHistory();
    var cloudStatus = modal.querySelector('#fbsc-compose-status');
    if (cloudStatus) cloudStatus.textContent = cloudReady
      ? 'Đã đồng bộ bộ từ khóa và lịch sử với kho dữ liệu LDD. Thư viện ảnh vẫn lưu trên thiết bị này.'
      : 'Chưa kết nối được kho dữ liệu; bộ từ khóa và lịch sử chỉ dùng trên trình duyệt này.';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  async function sync() {
    var token = getToken();
    if (token !== tokenSeen) teacherVerified = await validateTeacher(true);
    else if (Date.now() - verifiedAt > 45000) teacherVerified = await validateTeacher(true);
    ensureMenuButton();
    if (!teacherVerified && modal && modal.classList.contains('is-open')) close();
  }
  function start() {
    sync();
    window.setInterval(sync, 3000);
    window.addEventListener('storage', sync);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) close(); });
    var menu = document.getElementById('account-menu');
    if (menu && window.MutationObserver) new MutationObserver(ensureMenuButton).observe(menu, {childList:true});
  }

  window.LDDFacebookSmartComment = {open:open,close:close,isTeacher:function () { return teacherVerified; }};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();