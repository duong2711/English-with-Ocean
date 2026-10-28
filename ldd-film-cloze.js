/* LDD Film Listening Cloze — video links, sentence-level playback, server-graded hints */
(function () {
  'use strict';
  if (window.LDDFilmCloze) return;

  const PROJECT = 'ywqbaksmmtvwbojcgsdd';
  const KEY = 'sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_';
  const TEACHER = 'lddbaiu@gmail.com';
  const client = window.supabase && window.supabase.createClient
    ? window.supabase.createClient('https://' + PROJECT + '.supabase.co', KEY, { auth: { detectSessionInUrl: false } })
    : null;
  let generation = 0;
  let cleanup = null;
  let timer = null;
  const $el = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = String(text);
    return el;
  };
  const button = (label, className) => {
    const el = $el('button', className, label);
    el.type = 'button';
    return el;
  };
  const safeText = value => String(value || '').trim();
  const scoreLabel = number => (number > 0 ? '+' : '') + number + ' điểm';
  const keyOf = (segment, blank) => segment + ':' + blank;
  const blanksIn = text => Array.from(String(text || '').matchAll(/\{([^{}]+)\}/g), m => m[1]);
  const stopWords = new Set(['about','after','again','always','because','before','could','every','first','going','great','hello','there','their','these','thing','those','under','where','which','while','would','should','really','right','still','thank','thanks','today','tomorrow','something','someone','other','maybe']);
  function providerOf(raw) {
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:') return null;
      const host = url.hostname.toLowerCase();
      if (host === 'youtu.be' || host === 'www.youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com')) {
        const id = host.endsWith('youtu.be') ? url.pathname.split('/')[1] :
          (url.searchParams.get('v') || url.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1]);
        if (!/^[\w-]{11}$/.test(id || '')) return null;
        return { provider: 'youtube', videoId: id, url: 'https://www.youtube.com/watch?v=' + id,
          thumbnail: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg' };
      }
      if (host === 'fb.watch' || host === 'www.fb.watch' || host === 'facebook.com' || host.endsWith('.facebook.com') || host === 'fb.com' || host === 'www.fb.com') {
        return { provider: 'facebook', url: url.href, thumbnail: '' };
      }
      if (url.pathname.match(/\.(mp4|webm)(?:$)/i)) return { provider: 'mp4', url: url.href, thumbnail: '' };
      return null;
    } catch (_) { return null; }
  }
  function toSeconds(value) {
    const m = String(value || '').trim().match(/^(\d{1,2}:)?(\d{2}):(\d{2})[,.](\d{1,3})$/);
    if (!m) return NaN;
    const hours = m[1] ? Number(m[1].slice(0, -1)) : 0;
    return hours * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4].padEnd(3, '0')) / 1000;
  }
  function markBlank(line) {
    if (blanksIn(line).length) return line;
    const matches = [...line.matchAll(/[A-Za-z][A-Za-z'’-]{3,}/g)]
      .filter(match => !stopWords.has(match[0].toLowerCase()));
    if (!matches.length) {
      const fallback = [...line.matchAll(/[A-Za-z]+/g)];
      if (!fallback.length) return '';
      const last = fallback[fallback.length - 1];
      return line.slice(0, last.index) + '{' + last[0] + '}' + line.slice(last.index + last[0].length);
    }
    // Deterministic so editing/reopening subtitles keeps the same targets.
    const picked = matches[Math.floor(matches.length / 2)];
    return line.slice(0, picked.index) + '{' + picked[0] + '}' + line.slice(picked.index + picked[0].length);
  }
  function parseSubtitles(source) {
    const blocks = safeText(source).replace(/^\uFEFF/, '').replace(/\r/g, '').split(/\n\s*\n/);
    const result = [];
    for (const block of blocks) {
      const lines = block.split('\n').map(x => x.trim()).filter(Boolean);
      const i = lines.findIndex(x => x.includes('-->'));
      if (i < 0) continue;
      const times = lines[i].split('-->');
      const start = toSeconds(times[0]);
      const end = toSeconds(times[1].trim().split(/\s/)[0]);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;
      const text = lines.slice(i + 1).join(' ').replace(/<[^>]*>/g, '').replace(/\[[^\]]{1,40}\]/g, '').trim();
      if (!text) continue;
      const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim()).filter(Boolean);
      const totalSize = sentences.reduce((n, s) => n + s.length, 0) || 1;
      let elapsed = 0;
      for (const sentence of sentences) {
        const segStart = start + (end - start) * elapsed / totalSize;
        elapsed += sentence.length;
        const segEnd = start + (end - start) * elapsed / totalSize;
        const marked = markBlank(sentence);
        if (marked && blanksIn(marked).length) result.push({
          start: Math.round(segStart * 100) / 100,
          end: Math.round(segEnd * 100) / 100,
          text: marked
        });
      }
    }
    return result.sort((a, b) => a.end - b.end).slice(0, 1000);
  }
  function stopPlayer() {
    if (timer) { clearInterval(timer); timer = null; }
    if (cleanup) { try { cleanup(); } catch (_) {} cleanup = null; }
  }
  function close() { generation++; stopPlayer(); }

  async function loadYT() {
    if (window.YT && window.YT.Player) return;
    if (!window.__lddYouTubeApiPromise) {
      window.__lddYouTubeApiPromise = new Promise((resolve, reject) => {
        const prior = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          if (typeof prior === 'function') prior();
          resolve();
        };
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onerror = () => reject(Error('Không tải được YouTube Player API'));
        document.head.appendChild(script);
      });
    }
    return window.__lddYouTubeApiPromise;
  }
  async function makePlayer(container, lesson, onError) {
    const parsed = providerOf(lesson.video_url);
    if (!parsed) throw Error('Liên kết video không hợp lệ');
    if (parsed.provider === 'youtube') {
      await loadYT();
      const host = $el('div', 'ldd-film-video');
      container.append(host);
      const player = await new Promise((resolve, reject) => {
        const p = new window.YT.Player(host, {
          videoId: parsed.videoId,
          width: '100%', height: '100%',
          playerVars: { playsinline: 1, rel: 0, origin: location.origin },
          events: {
            onReady: () => resolve(p),
            onError: e => { onError('YouTube không cho phép phát video này (' + e.data + ').'); reject(Error('Video unavailable')); }
          }
        });
      });
      return { getTime: () => player.getCurrentTime(), pause: () => player.pauseVideo(),
        play: () => player.playVideo(), seek: t => player.seekTo(t, true), destroy: () => player.destroy() };
    }
    if (parsed.provider === 'mp4') {
      const video = $el('video', 'ldd-film-video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = parsed.url;
      container.append(video);
      return { getTime: () => video.currentTime, pause: () => video.pause(),
        play: () => video.play().catch(() => {}), seek: t => { video.currentTime = t; },
        destroy: () => { video.pause(); video.removeAttribute('src'); video.load(); video.remove(); } };
    }
    // FB SDK provides controls for supported public embedded videos only.
    if (!window.FB) {
      await new Promise((resolve, reject) => {
        const old = window.fbAsyncInit;
        window.fbAsyncInit = function () {
          if (typeof old === 'function') old();
          try { window.FB.init({ xfbml: false, version: 'v24.0' }); resolve(); }
          catch (e) { reject(e); }
        };
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.onerror = () => reject(Error('Không tải được Facebook SDK'));
        document.head.append(script);
      });
    }
    const widget = $el('div', 'fb-video');
    widget.setAttribute('data-href', parsed.url);
    widget.setAttribute('data-width', '640');
    widget.setAttribute('data-allowfullscreen', 'true');
    container.append(widget);
    const instance = await new Promise((resolve, reject) => {
      let settled = false;
      const timeout = setTimeout(() => { if (!settled) { settled = true; reject(Error('Video Facebook không hỗ trợ điều khiển tự động.')); } }, 12000);
      window.FB.Event.subscribe('xfbml.ready', function handler(msg) {
        if (!settled && msg?.type === 'video' && msg.instance) {
          settled = true; clearTimeout(timeout); resolve(msg.instance);
        }
      });
      window.FB.XFBML.parse(container);
    });
    if (typeof instance.getCurrentPosition !== 'function' || typeof instance.pause !== 'function')
      throw Error('Facebook không cung cấp điều khiển tạm dừng cho video này.');
    return { getTime: () => instance.getCurrentPosition(), pause: () => instance.pause(),
      play: () => instance.play(), seek: t => instance.seek(t), destroy: () => { try { instance.pause(); } catch (_) {} widget.remove(); } };
  }

  async function mount(body, legacyMovies) {
    close();
    const seq = generation;
    body.replaceChildren();
    const status = $el('p', 'ldd-film-status', 'Đang tải thư viện phim…');
    const grid = $el('div', 'ldd-ent-media-grid');
    const playerWrap = $el('div', 'ldd-film-lesson');
    const editor = $el('section', 'ldd-film-editor');
    editor.hidden = true;
    body.append(status, editor, playerWrap, grid);
    if (!client) { status.textContent = 'Không thể kết nối hệ thống học tập.'; return; }
    let user = null;
    try {
      const auth = await client.auth.getUser();
      user = auth.data?.user || null;
      if (auth.error) throw auth.error;
    } catch (_) {
      if (seq === generation) status.textContent = 'Vui lòng đăng nhập để học phim và lưu từ vựng.';
      return;
    }
    if (seq !== generation) return;
    const isTeacher = String(user?.email || '').toLowerCase() === TEACHER;
    try {
      const { data, error } = await client.rpc('movie_list_lessons');
      if (error) throw error;
      if (seq !== generation) return;
      const lessons = Array.isArray(data) ? data : [];
      if (isTeacher) setupEditor(editor, async () => { await mount(body, legacyMovies); }, lessons);
      status.textContent = lessons.length
        ? 'Chọn video để xem. Video có script sẽ tự dừng ở từng câu để luyện nghe; video chưa có script vẫn phát bình thường.'
        : 'Thư viện chưa có video. Giáo viên có thể dán link YouTube hoặc Facebook để thêm ngay, rồi nhập script sau.';
      lessons.forEach(lesson => {
        const card = button('', 'ldd-ent-media-card');
        const cover = $el('div', 'ldd-ent-media-cover ldd-ent-film-cover');
        const info = providerOf(lesson.video_url);
        const thumbnail = lesson.thumbnail_url || info?.thumbnail;
        if (thumbnail) {
          const img = $el('img', 'ldd-ent-thumb-image');
          img.src = thumbnail;
          img.loading = 'lazy';
          img.alt = '';
          img.onerror = () => img.replaceWith($el('div', 'ldd-ent-cover-fallback', '🎬'));
          cover.append(img);
        } else cover.append($el('div', 'ldd-ent-cover-fallback', '🎬'));
        const hasTranscript = Array.isArray(lesson.segments) && lesson.segments.length > 0;
        card.append(cover, $el('strong', '', lesson.title),
          $el('small', '', hasTranscript ? lesson.segments.length + ' câu luyện nghe · ' + lesson.provider : 'Xem video · Chưa có script'));
        card.addEventListener('click', () => {
          if (hasTranscript) void openLesson(lesson, playerWrap, seq);
          else openStandalone(lesson, playerWrap);
        });
        grid.append(card);
      });
      // Honor old hardcoded MP4 catalog entries as regular (non-graded) videos.
      (legacyMovies || []).forEach(item => {
        if (!item?.video_url || !providerOf(item.video_url)) return;
        const card = button(item.title || 'Video', 'ldd-ent-media-card');
        card.addEventListener('click', async () => {
          stopPlayer();
          playerWrap.replaceChildren();
          playerWrap.append($el('h4', '', item.title || 'Video'));
          try {
            const adapter = await makePlayer(playerWrap, item, msg => { status.textContent = msg; });
            cleanup = adapter.destroy;
          } catch (e) { playerWrap.append($el('p', 'ldd-film-error', e.message)); }
        });
        grid.append(card);
      });
    } catch (e) {
      status.textContent = 'Không tải được danh sách phim: ' + (e.message || 'Lỗi kết nối');
    }
  }


  function openStandalone(lesson, wrap) {
    stopPlayer();
    generation++;
    wrap.replaceChildren();
    const parsed = providerOf(lesson.video_url);
    if (!parsed) {
      wrap.append($el('p', 'ldd-film-feedback', 'Link video không hợp lệ.'));
      return;
    }
    const title = $el('h3', '', lesson.title);
    const screen = $el('div', 'ldd-film-screen');
    let media;
    if (parsed.provider === 'youtube' || parsed.provider === 'facebook') {
      media = $el('iframe', 'ldd-film-video');
      media.title = lesson.title;
      media.loading = 'eager';
      media.allowFullscreen = true;
      media.referrerPolicy = 'strict-origin-when-cross-origin';
      media.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      media.src = parsed.provider === 'youtube'
        ? 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(parsed.videoId) + '?rel=0'
        : 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(parsed.url) + '&show_text=false';
    } else {
      media = $el('video', 'ldd-film-video');
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      media.src = parsed.url;
    }
    screen.append(media);
    wrap.append(title, screen,
      $el('p', 'ldd-film-status', 'Video đã được thêm vào thư viện. Script và bản dịch sẽ được gắn vào sau khi giáo viên nhập phụ đề.'));
    cleanup = () => {
      if (media.tagName === 'VIDEO') {
        media.pause();
        media.removeAttribute('src');
        media.load();
      } else media.removeAttribute('src');
    };
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function openLesson(lesson, wrap, parentSeq) {
    stopPlayer();
    const seq = ++generation;
    wrap.replaceChildren();
    const heading = $el('h3', '', lesson.title);
    const screen = $el('div', 'ldd-film-screen');
    const progress = $el('div', 'ldd-film-progress');
    const question = $el('div', 'ldd-film-question', 'Đang khởi tạo video…');
    const feedback = $el('p', 'ldd-film-feedback');
    wrap.append(heading, screen, progress, question, feedback);
    const answers = new Map();
    const segments = (lesson.segments || []).filter(s => Number.isFinite(+s.end) && blanksIn(s.text).length);
    if (!segments.length) { question.textContent = 'Bài phim chưa có câu hỏi.'; return; }
    try {
      const { data, error } = await client.from('movie_cloze_progress')
        .select('segment_index,blank_index,status,score_change').eq('movie_id', lesson.id);
      if (error) throw error;
      if (seq !== generation) return;
      for (const row of data || []) answers.set(keyOf(row.segment_index, row.blank_index), row);
    } catch (e) {
      question.textContent = 'Không tải được tiến độ của bạn: ' + e.message;
      return;
    }
    function complete(idx) {
      return blanksIn(segments[idx]?.text).every((_, i) => answers.has(keyOf(idx, i)));
    }
    function tally() {
      const total = segments.reduce((n, s) => n + blanksIn(s.text).length, 0);
      progress.textContent = 'Đã làm ' + answers.size + '/' + total + ' từ · Điểm phim: ' +
        [...answers.values()].reduce((n, a) => n + (Number(a.score_change) || 0), 0);
    }
    tally();
    let adapter;
    let active = -1;
    let busy = false;
    let manualHold = false;
    function questionAt(idx) {
      if (idx < 0 || idx >= segments.length || idx === active) return;
      active = idx;
      manualHold = true;
      try { adapter?.pause(); } catch (_) {}
      feedback.textContent = '';
      question.replaceChildren($el('div', 'ldd-film-question-count', 'Câu ' + (idx + 1) + '/' + segments.length));
      const sentence = $el('div', 'ldd-film-sentence');
      const parts = segments[idx].text.split(/\{([^{}]+)\}/g);
      const focus = [];
      parts.forEach((part, j) => {
        if (j % 2 === 0) { sentence.append(document.createTextNode(part)); return; }
        const blankIndex = (j - 1) / 2;
        const itemKey = keyOf(idx, blankIndex);
        const done = answers.get(itemKey);
        const field = $el('span', 'ldd-film-blank');
        const input = $el('input', 'ldd-film-answer');
        input.type = 'text';
        input.maxLength = 64;
        input.autocapitalize = 'off';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.placeholder = 'Điền từ';
        input.setAttribute('aria-label', 'Từ còn trống ' + (blankIndex + 1));
        const check = button('Kiểm tra', 'ldd-film-check');
        const hint = button('Gợi ý', 'ldd-film-hint');
        if (done) {
          input.value = '✓';
          input.disabled = true;
          check.hidden = hint.hidden = true;
          field.classList.add('done');
        } else {
          focus.push(input);
          const submit = async (askHint) => {
            if (busy || answers.has(itemKey)) return;
            if (!askHint && !input.value.trim()) { feedback.textContent = 'Hãy điền từ hoặc chọn Gợi ý.'; return; }
            busy = true;
            check.disabled = hint.disabled = true;
            feedback.textContent = '';
            try {
              const { data, error } = await client.rpc('movie_cloze_answer', {
                p_movie_id: lesson.id, p_segment_index: idx, p_blank_index: blankIndex,
                p_answer: askHint ? null : input.value.trim(), p_hint: askHint
              });
              if (error) throw error;
              if (seq !== generation || active !== idx) return;
              if (data.status === 'wrong') {
                feedback.textContent = 'Chưa chính xác, hãy nghe lại và thử tiếp.';
              } else if (data.status === 'correct' || data.status === 'hint_new' || data.status === 'hint_known' || data.already_done) {
                const row = { segment_index: idx, blank_index: blankIndex, status: data.status,
                  score_change: data.already_done ? Number(data.total_delta) || 0 : Number(data.delta) || 0 };
                answers.set(itemKey, row);
                input.value = data.word || (data.status === 'correct' ? input.value : '✓');
                input.disabled = true;
                check.hidden = hint.hidden = true;
                field.classList.add('done');
                feedback.textContent = data.status === 'hint_new' ? 'Đã thêm “' + part + '” vào kho từ vựng.' :
                  data.status === 'hint_known' ? '“' + part + '” đã có trong kho: −1 điểm.' :
                  'Chính xác! +1 điểm.';
                tally();
                document.dispatchEvent(new Event('ldd:today-refresh'));
                document.dispatchEvent(new Event('ldd:vocab-senses-updated'));
                if (complete(idx)) {
                  manualHold = false;
                  question.append($el('p', 'ldd-film-completed', 'Hoàn thành câu! Video tiếp tục phát.'));
                  setTimeout(() => {
                    if (seq !== generation || active !== idx) return;
                    active = -1;
                    if (segments.every((_, i) => complete(i))) {
                      question.replaceChildren($el('p', 'ldd-film-completed', 'Đã hoàn thành toàn bộ bài phim!'));
                    } else { question.replaceChildren(); adapter.play(); }
                  }, 600);
                }
              } else feedback.textContent = 'Phản hồi chưa được ghi nhận, thử lại.';
            } catch (e) { feedback.textContent = 'Không lưu được câu trả lời: ' + (e.message || 'Lỗi mạng'); }
            finally { busy = false; if (!input.disabled) check.disabled = hint.disabled = false; }
          };
          check.addEventListener('click', () => void submit(false));
          hint.addEventListener('click', () => void submit(true));
          input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); void submit(false); } });
        }
        field.append(input, check, hint);
        sentence.append(field);
      });
      question.append(sentence);
      if (segments[idx].translation_vi) {
        const translationToggle = button('Xem bản dịch', 'ldd-film-translate-toggle');
        const translationContent = $el('p', 'ldd-film-translation', segments[idx].translation_vi);
        translationContent.hidden = true;
        translationToggle.addEventListener('click', () => {
          translationContent.hidden = !translationContent.hidden;
          translationToggle.textContent = translationContent.hidden ? 'Xem bản dịch' : 'Ẩn bản dịch';
        });
        question.append(translationToggle, translationContent);
      }
      if (focus[0]) focus[0].focus({ preventScroll: true });
    }
    try {
      adapter = await makePlayer(screen, lesson, message => { feedback.textContent = message; });
      if (seq !== generation) { adapter.destroy(); return; }
      cleanup = adapter.destroy;
      question.textContent = 'Nhấn Play để bắt đầu nghe phim.';
      let lastTime = 0;
      timer = setInterval(() => {
        if (seq !== generation || manualHold || !adapter) return;
        const t = Number(adapter.getTime());
        if (!Number.isFinite(t)) return;
        // A user may seek backwards or forwards: stop at the first unseen cue reached.
        const idx = segments.findIndex((s, i) => !complete(i) && t >= Number(s.end) - 0.08 && t >= Number(s.start) - 0.2);
        if (idx !== -1) questionAt(idx);
        lastTime = t;
      }, 120);
      const replay = button('Nghe lại câu', 'ldd-film-replay');
      replay.addEventListener('click', () => {
        const index = active >= 0 ? active : segments.findIndex((_, i) => !complete(i));
        if (index < 0) return;
        manualHold = false;
        active = -1;
        adapter.seek(Math.max(0, Number(segments[index].start) - 0.4));
        adapter.play();
      });
      wrap.insertBefore(replay, progress);
    } catch (e) {
      question.textContent = 'Không thể điều khiển video: ' + (e.message || 'Lỗi trình phát') +
        '. Với Facebook, cần video công khai và hỗ trợ nhúng; hãy thử video khác.';
      const p = providerOf(lesson.video_url);
      if (p?.provider === 'facebook') {
        const fallback = $el('iframe', 'ldd-film-video');
        fallback.title = 'Xem video Facebook';
        fallback.loading = 'lazy';
        fallback.allowFullscreen = true;
        fallback.src = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(lesson.video_url) + '&show_text=false';
        screen.replaceChildren(fallback);
      }
    }
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  function setupEditor(wrap, refresh, lessons) {
    wrap.hidden = false;
    const toggle = button('＋ Thêm video / Nhập script', 'ldd-film-editor-toggle');
    const form = $el('form', 'ldd-film-editor-form');
    form.hidden = true;
    const existing = $el('select');
    const fresh = $el('option', '', 'Thêm video mới (script có thể nhập sau)');
    fresh.value = '';
    existing.append(fresh);
    const pending = (lessons || []).filter(m => !Array.isArray(m.segments) || !m.segments.length);
    pending.forEach(m => {
      const option = $el('option', '', 'Nhập script cho: ' + m.title);
      option.value = String(m.id);
      existing.append(option);
    });
    const title = $el('input');
    title.required = true;
    title.maxLength = 160;
    title.placeholder = 'Tên video / đoạn phim';
    const link = $el('input');
    link.required = true;
    link.type = 'url';
    link.placeholder = 'https://youtu.be/... hoặc Facebook / MP4';
    const captions = $el('textarea');
    captions.rows = 8;
    captions.placeholder = 'Script tiếng Anh dạng SRT/VTT có mốc thời gian. Có thể bỏ trống khi chỉ thêm video.\n00:00:01,000 --> 00:00:03,000\nI like this movie.';
    const upload = $el('input');
    upload.type = 'file';
    upload.accept = '.srt,.vtt,.txt,text/plain';
    const translations = $el('textarea');
    translations.rows = 6;
    translations.placeholder = 'Bản dịch tiếng Việt (tùy chọn): mỗi dòng tương ứng một câu script, không cần mốc thời gian.';
    const translationUpload = $el('input');
    translationUpload.type = 'file';
    translationUpload.accept = '.txt,.srt,.vtt,text/plain';
    const sample = $el('p', 'ldd-film-editor-help',
      'Bước 1: Dán link để video xuất hiện ngay. Bước 2: Dùng công cụ tạo script bên ngoài rồi nhập SRT/VTT và bản dịch tại đây. Mỗi câu có script sẽ được tự tạo một ô điền từ.');
    const preview = $el('p', 'ldd-film-editor-help');
    const save = button('Lưu video / script', 'ldd-film-save');
    save.type = 'submit';
    const notice = $el('p', 'ldd-film-feedback');
    const noticePreview = () => {
      const s = parseSubtitles(captions.value);
      const t = translations.value.trim().split(/\n/).map(x => x.trim()).filter(Boolean);
      preview.textContent = s.length + ' câu tiếng Anh, ' + (translations.value.trim() ? t.length : 0) + ' dòng dịch.';
    };
    existing.addEventListener('change', () => {
      const selected = pending.find(m => String(m.id) === existing.value);
      if (selected) {
        title.value = selected.title;
        link.value = selected.video_url;
        title.readOnly = true;
        link.readOnly = true;
        save.textContent = 'Gắn script vào video';
      } else {
        title.value = '';
        link.value = '';
        title.readOnly = false;
        link.readOnly = false;
        save.textContent = 'Lưu video / script';
      }
      notice.textContent = '';
    });
    toggle.addEventListener('click', () => {
      form.hidden = !form.hidden;
      toggle.setAttribute('aria-expanded', String(!form.hidden));
      if (!form.hidden) (pending.length ? existing : title).focus();
    });
    captions.addEventListener('input', noticePreview);
    translations.addEventListener('input', noticePreview);
    upload.addEventListener('change', async () => {
      const file = upload.files?.[0];
      if (file) { captions.value = await file.text(); noticePreview(); }
    });
    translationUpload.addEventListener('change', async () => {
      const file = translationUpload.files?.[0];
      if (file) { translations.value = await file.text(); noticePreview(); }
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const info = providerOf(link.value.trim());
      if (!info) { notice.textContent = 'Link phải là YouTube, Facebook công khai hoặc video MP4 HTTPS.'; return; }
      if (!title.value.trim()) { notice.textContent = 'Vui lòng nhập tên video.'; return; }
      const segments = captions.value.trim() ? parseSubtitles(captions.value) : [];
      if (captions.value.trim() && !segments.length) {
        notice.textContent = 'Script không có mốc thời gian SRT/VTT hợp lệ.'; return;
      }
      if (existing.value && !segments.length) {
        notice.textContent = 'Hãy nhập script để gắn vào video đã có.'; return;
      }
      const translated = translations.value.trim()
        ? translations.value.trim().replace(/\r/g, '').split(/\n/).map(x => x.trim()).filter(Boolean)
        : [];
      if (translated.length && translated.length !== segments.length) {
        notice.textContent = 'Số dòng bản dịch phải khớp số câu: ' + segments.length + '.'; return;
      }
      const withTranslations = segments.map((segment, i) => ({
        ...segment, ...(translated.length ? { translation_vi: translated[i] } : {})
      }));
      save.disabled = true;
      notice.textContent = 'Đang lưu dữ liệu…';
      try {
        const { data: auth, error: userError } = await client.auth.getUser();
        if (userError || String(auth?.user?.email || '').toLowerCase() !== TEACHER)
          throw Error('Chỉ giáo viên được thêm video và script.');
        const { error } = existing.value
          ? await client.from('movie_lessons').update({ segments: withTranslations })
              .eq('id', Number(existing.value)).eq('video_url', info.url)
          : await client.from('movie_lessons').insert({
              title: title.value.trim(), video_url: info.url, provider: info.provider,
              thumbnail_url: info.thumbnail || null, segments: withTranslations, created_by: auth.user.id
            });
        if (error) throw error;
        notice.textContent = 'Đã lưu trên website.';
        await refresh();
      } catch (error) {
        notice.textContent = 'Không lưu được: ' + (error.message || 'Lỗi mạng');
      } finally { save.disabled = false; }
    });
    const description = $el('p', 'ldd-film-editor-help',
      'Nếu chọn video có sẵn, chỉ cập nhật script, giữ nguyên video YouTube và thumbnail. Không cần tải lại video.');
    form.append(
      $el('label', '', 'Chọn thao tác'), existing,
      $el('label', '', 'Tên video'), title,
      $el('label', '', 'Đường dẫn video'), link,
      $el('label', '', 'Script tiếng Anh (SRT/VTT)'), upload, captions,
      $el('label', '', 'Bản dịch tiếng Việt (mỗi câu một dòng)'), translationUpload, translations,
      sample, description, preview, save, notice
    );
    wrap.append(toggle, form);
  }

  window.LDDFilmCloze = { mount, close, parseSubtitles, providerOf };
})();
