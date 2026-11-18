/* LDD English: staged re-entry quiz after >72 hours without a recorded study session.
 * SQL: reentry_revision_gate_setup.sql. Server scores and stores all attempts.
 * Do not rely on a localStorage timestamp or expose correct answers to the browser.
 */
(function () {
  'use strict';
  const REF = 'ywqbaksmmtvwbojcgsdd';
  const URL = 'https://' + REF + '.supabase.co';
  const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  const STORAGE = 'sb-' + REF + '-auth-token';
  let currentUser = null;
  let latestRequest = 0;
  let blocked = false;
  let checking = false;
  let overlay = null;
  let adminButton = null;
  let adminModal = null;
  let lastMode = null;
  let lastEnabled = false;

  function token() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || 'null');
      return saved?.access_token || saved?.currentSession?.access_token || (Array.isArray(saved) ? saved[0]?.access_token : '') || '';
    } catch (_) { return ''; }
  }
  function tokenUser(value) {
    if (!value) return '';
    try {
      let s = value.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      s += '='.repeat((4 - s.length % 4) % 4);
      return String(JSON.parse(atob(s)).sub || '');
    } catch (_) { return ''; }
  }
  async function rpc(name, payload) {
    const bearer = token();
    if (!bearer) throw new Error('Phiên đăng nhập đã hết hạn.');
    const response = await fetch(URL + '/rest/v1/rpc/' + name, {
      method: 'POST',
      headers: {
        apikey: ANON,
        Authorization: 'Bearer ' + bearer,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload || {})
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || 'Không thể kết nối hệ thống kiểm tra.');
    return body;
  }
  function node(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = String(content);
    return el;
  }
  function plain(text) {
    const div = node('div');
    // Text-only questions: never insert question markup as live HTML.
    div.textContent = String(text || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ');
    return div.textContent;
  }
  function clearOverlay() {
    if (overlay) { overlay.remove(); overlay = null; }
    document.body.classList.remove('ldd-reentry-locked-ui');
    blocked = false;
    lastMode = null;
  }
  function renderShell(heading, intro) {
    if (!overlay) {
      overlay = node('div','ldd-reentry-backdrop');
      overlay.id = 'ldd-reentry-gate';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');
      overlay.setAttribute('aria-labelledby','ldd-reentry-title');
      document.body.appendChild(overlay);
    }
    document.body.classList.add('ldd-reentry-locked-ui');
    blocked = true;
    overlay.replaceChildren();
    const card = node('main','ldd-reentry-card');
    const title = node('h2','',heading); title.id = 'ldd-reentry-title';
    card.append(title,node('p','ldd-reentry-intro',intro));
    overlay.appendChild(card);
    title.tabIndex = -1;
    title.focus();
    return card;
  }
  function renderLocked(correct, total) {
    lastMode = 'locked';
    const card = renderShell('Tài khoản đang tạm khóa',
      'Để được mở khóa, em hãy chủ động nhắn tin cho cậu để hẹn gọi Zalo dò bài và nhận một bài kiểm tra giấy.');
    if (Number.isFinite(correct) && total) {
      card.appendChild(node('p','ldd-reentry-score','Điểm kiểm tra: ' + correct + '/' + total + ' — chưa đạt yêu cầu 6/10.'));
    }
    card.appendChild(node('p','ldd-reentry-note',
      'Trong thời gian chờ cậu kiểm tra và mở khóa, em chưa thể vào phần học trên website.'));
    const btn = node('button','ldd-reentry-recheck','Kiểm tra trạng thái mở khóa');
    btn.type = 'button';
    btn.addEventListener('click', () => refresh(true));
    card.appendChild(btn);
  }
  function renderQuiz(questions) {
    if (!Array.isArray(questions) || questions.length !== 10) {
      renderShell('Chưa thể mở bài kiểm tra','Số câu hợp lệ chưa đủ. Hãy thông báo cho giáo viên.');
      return;
    }
    lastMode = 'quiz';
    const card = renderShell('Kiểm tra ôn tập sau thời gian nghỉ học',
      'Em đã không ghi nhận buổi học trên 3 ngày. Hãy làm 10 câu tổng hợp từ những lỗi từng xuất hiện ở nhóm học cùng trình độ. Cần ít nhất 6/10 để được tiếp tục học.');
    const form = node('form','ldd-reentry-form');
    const fields = [];
    questions.forEach((q,i) => {
      const field = node('fieldset','ldd-reentry-question');
      const legend = node('legend','',String(i+1) + '. ' + plain(q.prompt)); field.appendChild(legend);
      if (q.skill?.category || q.skill?.topic) {
        field.appendChild(node('small','ldd-reentry-skill',
          [q.skill.category,q.skill.topic].filter(Boolean).join(' · ')));
      }
      const inputs = [];
      (q.options || []).forEach((option,j) => {
        const label = node('label','ldd-reentry-choice');
        const input = document.createElement('input'); input.type='radio'; input.name='reentry-'+i; input.value=String(j);
        label.append(input,node('span','',plain(option)));
        field.appendChild(label); inputs.push(input);
      });
      fields.push(inputs);
      form.appendChild(field);
    });
    const feedback = node('p','ldd-reentry-feedback');
    feedback.setAttribute('aria-live','polite');
    const submit = node('button','ldd-reentry-submit','Nộp bài kiểm tra'); submit.type='submit';
    form.append(feedback,submit);
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const values = fields.map(inputs => inputs.find(input => input.checked));
      const missing = values.indexOf(undefined);
      if (missing !== -1) {
        feedback.textContent = 'Em chưa trả lời câu ' + (missing+1) + '.';
        fields[missing][0]?.focus();
        return;
      }
      submit.disabled = true;
      feedback.textContent = 'Đang chấm bài...';
      try {
        const result = await rpc('ldd_reentry_submit',{p_answers:values.map(v=>Number(v.value))});
        if (result.mode==='passed') {
          clearOverlay();
          window.dispatchEvent(new CustomEvent('ldd:today-refresh'));
          window.alert('Em đạt ' + result.correct + '/' + result.total + ' và đã được tiếp tục học.');
        } else if (result.mode==='locked') {
          renderLocked(result.correct,result.total);
        } else throw new Error('Kết quả không hợp lệ.');
      } catch(e) {
        feedback.textContent = 'Nộp bài chưa thành công: ' + e.message + '. Bài làm chưa bị mất, em có thể thử lại.';
        submit.disabled=false;
      }
    });
    card.appendChild(form);
  }
  function closeAdmin() {
    if (adminModal) { adminModal.remove(); adminModal=null; }
  }
  async function showAdmin() {
    closeAdmin();
    adminModal = node('div','ldd-reentry-admin-backdrop');
    const card = node('section','ldd-reentry-admin');
    card.appendChild(node('h2','','Quản lý kiểm tra sau 3 ngày'));
    const description = node('p','',
      'Chế độ mới mặc định tắt cho đến khi giáo viên chủ động bật. Các em dưới 6/10 được mở khóa thủ công sau khi dò bài Zalo và nhận đề giấy.');
    card.appendChild(description);
    const toggle = node('button','ldd-reentry-recheck',lastEnabled ? 'Tắt cơ chế kiểm tra' : 'Bật cơ chế kiểm tra');
    toggle.type='button';
    toggle.addEventListener('click',async () => {
      if (!window.confirm(lastEnabled ? 'Tắt kiểm tra tự động cho toàn bộ học viên?' :
        'Bật kiểm tra bắt buộc sau hơn 72 giờ không học cho toàn bộ học viên?')) return;
      toggle.disabled=true;
      try {
        lastEnabled=await rpc('ldd_reentry_admin_set_enabled',{p_enabled:!lastEnabled});
        toggle.textContent=lastEnabled ? 'Tắt cơ chế kiểm tra' : 'Bật cơ chế kiểm tra';
      } catch(e){ window.alert(e.message); }
      toggle.disabled=false;
    });
    card.appendChild(toggle);
    const list=node('div','ldd-reentry-admin-list');
    card.appendChild(node('h3','','Học viên đang khóa'));
    card.appendChild(list);
    const close=node('button','ldd-reentry-admin-close','Đóng');
    close.type='button';close.addEventListener('click',closeAdmin);card.appendChild(close);
    adminModal.appendChild(card);document.body.appendChild(adminModal);
    list.textContent='Đang tải danh sách...';
    try {
      const students=await rpc('ldd_reentry_admin_list');
      list.replaceChildren();
      const locked=Array.isArray(students)?students.filter(s=>s.status==='locked'):[];
      if (!locked.length) list.textContent='Không có học viên nào đang bị khóa.';
      for (const student of locked) {
        const row=node('div','ldd-reentry-admin-row');
        const email=node('span','',student.email || 'Tài khoản học viên');
        const unlock=node('button','','Mở khóa');
        unlock.type='button';
        unlock.addEventListener('click',async () => {
          if (!window.confirm('Chỉ mở khóa sau khi đã dò bài qua Zalo và giao bài kiểm tra giấy cho ' + student.email + '. Tiếp tục?')) return;
          unlock.disabled=true;
          try {
            const ok=await rpc('ldd_reentry_admin_unlock',{p_user_id:student.user_id});
            if (!ok) throw new Error('Tài khoản không còn ở trạng thái khóa.');
            row.remove();
            if (!list.children.length) list.textContent='Không có học viên nào đang bị khóa.';
          } catch(e){ unlock.disabled=false;window.alert(e.message); }
        });
        row.append(email,unlock);list.appendChild(row);
      }
    }catch(e){list.textContent='Không tải được danh sách: '+e.message;}
  }
  function showTeacher(enabled) {
    lastEnabled=!!enabled;
    if (!adminButton) {
      adminButton=node('button','ldd-reentry-admin-trigger','Quản lý kiểm tra 3 ngày');
      adminButton.type='button';
      adminButton.addEventListener('click',showAdmin);
      document.body.appendChild(adminButton);
    }
    adminButton.hidden=false;
  }
  function hideTeacher() {
    if(adminButton) adminButton.hidden=true;
    closeAdmin();
  }
  async function refresh(force) {
    const jwt = token();
    const uid = tokenUser(jwt);
    if (!uid) {
      currentUser=null;latestRequest++;clearOverlay();hideTeacher();return;
    }
    if (!force && uid===currentUser && (checking || lastMode==='quiz' || lastMode==='locked')) return;
    if (!force && uid===currentUser && lastMode==='clear') return;
    currentUser=uid;
    const request=++latestRequest;
    checking=true;
    if (lastMode!=='quiz' && lastMode!=='locked') {
      renderShell('Đang kiểm tra trạng thái học tập','Đang kiểm tra lịch học và bài ôn tập của em...');
    }
    try {
      const status=await rpc('ldd_reentry_status');
      if(request!==latestRequest)return;
      if(status.mode==='teacher'){
        clearOverlay();showTeacher(status.enabled);lastMode='clear';
      }else{
        hideTeacher();
        if(status.mode==='quiz')renderQuiz(status.questions);
        else if(status.mode==='locked')renderLocked();
        else {clearOverlay();lastMode='clear';}
      }
    }catch(e){
      if(request!==latestRequest)return;
      // A missing migration/network outage must not lock out the whole school.
      console.warn('LDD re-entry gate could not verify status:',e.message);
      clearOverlay();hideTeacher();lastMode='clear';
    }finally { if(request===latestRequest)checking=false; }
  }
  function init() {
    refresh(false);
    const account=document.getElementById('account-area');
    if(account) new MutationObserver(() => setTimeout(() => refresh(false),100)).observe(account,{attributes:true,attributeFilter:['style','class']});
    window.addEventListener('storage',e=>{if(e.key===STORAGE)refresh(true);});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden && (lastMode==='locked' || lastMode==='clear'))refresh(true);});
    window.addEventListener('focus',()=>{if(lastMode==='locked')refresh(true);});
    // Supabase Auth returns from OAuth and writes the session asynchronously.
    setTimeout(()=>refresh(false),1600);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.LDDReentryGate={refresh:()=>refresh(true)};
})();
