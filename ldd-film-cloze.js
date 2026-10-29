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
  const knownDurations = new Map();
  const filmTiming = window.LDDFilmTiming;
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
  function parseSubtitles(source, keepCues = false) {
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
      const sentences = keepCues ? [text] : (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(s => s.trim()).filter(Boolean);
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
  function close() {
    generation++;
    stopPlayer();
    document.getElementById('tab-giai-tri')?.classList.remove('ldd-film-is-watching');
  }

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
      let captionsInitialized = false;
      const disableInitialCaptions = player => {
        if (captionsInitialized) return;
        try {
          if (!player.getOptions?.().includes('captions')) return;
          // Best effort: track selection is not a guaranteed public API option.
          // Do this only on initial module load, allowing later manual CC changes.
          player.setOption('captions', 'track', {});
          captionsInitialized = true;
        } catch (_) { /* Caption preferences must never prevent playback. */ }
      };
      const player = await new Promise((resolve, reject) => {
        const p = new window.YT.Player(host, {
          videoId: parsed.videoId,
          width: '100%', height: '100%',
          playerVars: { playsinline: 1, rel: 0, cc_load_policy: 0, origin: location.origin },
          events: {
            onReady: e => { disableInitialCaptions(e.target); resolve(p); },
            onApiChange: e => disableInitialCaptions(e.target),
            onError: e => { onError('YouTube không cho phép phát video này (' + e.data + ').'); reject(Error('Video unavailable')); }
          }
        });
      });
      return { getTime: () => player.getCurrentTime(), getDuration: () => player.getDuration(), pause: () => player.pauseVideo(),
        play: () => player.playVideo(), seek: t => player.seekTo(t, true), destroy: () => player.destroy() };
    }
    if (parsed.provider === 'mp4') {
      const video = $el('video', 'ldd-film-video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = parsed.url;
      container.append(video);
      return { getTime: () => video.currentTime, getDuration: () => video.duration, pause: () => video.pause(),
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
    return { getTime: () => instance.getCurrentPosition(), getDuration: () => Number(instance.getDuration?.()) || NaN, pause: () => instance.pause(),
      play: () => instance.play(), seek: t => instance.seek(t), destroy: () => { try { instance.pause(); } catch (_) {} widget.remove(); } };
  }

  async function mount(body, legacyMovies) {
    close();
    const seq = generation;
    body.replaceChildren();

    const editor = $el('section', 'ldd-film-editor');
    editor.hidden = true;

    // YouTube-style watch page: player and questions on the left, real library
    // recommendations on the right. In narrow viewports CSS stacks the sidebar last.
    const watch = $el('div', 'ldd-film-watch-layout');
    watch.hidden = true;
    const primary = $el('div', 'ldd-film-watch-primary');
    const browse = button('← Tất cả video', 'ldd-film-browse');
    browse.hidden = true;
    const panel = body.closest('#ldd-ent-movies-panel');
    const panelHeader = panel?.querySelector('.ldd-ent-panel-heading');
    panelHeader?.querySelector('.ldd-film-browse')?.remove();
    if (panelHeader) panelHeader.append(browse);
    else primary.append(browse);
    const playerWrap = $el('div', 'ldd-film-lesson');
    primary.append(playerWrap);

    const suggestions = $el('aside', 'ldd-film-recommendations');
    suggestions.setAttribute('aria-label', 'Video đề xuất');
    const recHeading = $el('h3', 'ldd-film-rec-heading', 'Xem tiếp');
    const recList = $el('div', 'ldd-film-rec-list');
    suggestions.append(recHeading, recList);
    watch.append(primary, suggestions);

    const library = $el('section', 'ldd-film-library');
    const status = $el('p', 'ldd-film-status', 'Đang tải thư viện phim…');
    const grid = $el('div', 'ldd-ent-media-grid');
    library.append(status, grid);
    body.append(editor, watch, library);

    browse.addEventListener('click', () => {
      close();
      playerWrap.replaceChildren();
      browse.hidden = true;
      watch.hidden = true;
      library.hidden = false;
      library.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });

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
        ? 'Chọn video để xem và luyện nghe. Các video khác được đề xuất bên cạnh trình phát.'
        : 'Thư viện chưa có video. Giáo viên có thể dán link YouTube hoặc Facebook để thêm.';

      const catalog = [];
      const seen = new Set();
      const put = lesson => {
        if (!lesson?.video_url) return;
        const info = providerOf(lesson.video_url);
        if (!info) return;
        const id = info.url;
        if (seen.has(id)) return;
        seen.add(id);
        catalog.push(lesson);
      };
      lessons.forEach(put);
      (legacyMovies || []).forEach(put);

      const coverOf = lesson => {
        const cover = $el('div', 'ldd-ent-media-cover ldd-ent-film-cover');
        const info = providerOf(lesson.video_url);
        const thumbnail = lesson.thumbnail_url || info?.thumbnail;
        if (thumbnail) {
          const img = $el('img', 'ldd-ent-thumb-image');
          img.src = thumbnail;
          img.loading = 'lazy';
          img.alt = 'Ảnh bìa ' + (lesson.title || 'video');
          img.onerror = () => img.replaceWith($el('div', 'ldd-ent-cover-fallback', '🎬'));
          cover.append(img);
        } else cover.append($el('div', 'ldd-ent-cover-fallback', '🎬'));
        return cover;
      };
      const labelOf = lesson =>
        Array.isArray(lesson.segments) && lesson.segments.length
          ? lesson.segments.length + ' câu luyện nghe'
          : 'Xem video';
      const select = lesson => {
        if (!providerOf(lesson.video_url)) return;
        library.hidden = true;
        watch.hidden = false;
        watch.classList.remove('ldd-film-focus-mode');
        browse.hidden = false;
        document.getElementById('tab-giai-tri')?.classList.add('ldd-film-is-watching');
        playerWrap.classList.remove('ldd-film-paused');
        recList.replaceChildren();
        const current = providerOf(lesson.video_url).url;
        const other = catalog.filter(item => providerOf(item.video_url)?.url !== current);
        if (!other.length) {
          recList.append($el('p', 'ldd-film-rec-empty',
            'Thư viện chưa có video khác. Video mới sẽ xuất hiện tại đây khi được thêm vào.'));
        } else {
          other.forEach(item => {
            const card = button('', 'ldd-film-rec-card');
            const desc = $el('span', 'ldd-film-rec-description');
            desc.append($el('strong', 'ldd-film-rec-title', item.title || 'Video'));
            desc.append($el('small', 'ldd-film-rec-subtitle',
              labelOf(item) + ' · ' + (providerOf(item.video_url)?.provider || 'video')));
            card.append(coverOf(item), desc);
            card.addEventListener('click', () => select(item));
            recList.append(card);
          });
        }
        if (Array.isArray(lesson.segments) && lesson.segments.length) {
          void openLesson(lesson, playerWrap);
        } else {
          openStandalone(lesson, playerWrap);
        }
      };
      catalog.forEach(item => {
        const card = button('', 'ldd-ent-media-card');
        card.append(coverOf(item), $el('strong', '', item.title || 'Video'),
          $el('small', '', labelOf(item)));
        card.addEventListener('click', () => select(item));
        grid.append(card);
      });

      // Start in watch mode, just as YouTube does. Switching recommendations
      // replaces the same player rather than starting multiple videos.
      if (catalog.length) select(catalog[0]);
    } catch (e) {
      status.textContent = 'Không tải được danh sách phim: ' + (e.message || 'Lỗi kết nối');
    }
  }

  async function openStandalone(lesson, wrap) {
    stopPlayer();
    const seq = ++generation;
    wrap.replaceChildren();
    const parsed = providerOf(lesson.video_url);
    if (!parsed) {
      wrap.append($el('p', 'ldd-film-feedback', 'Link video không hợp lệ.'));
      return;
    }
    const title = $el('h3', 'ldd-film-title', lesson.title);
    const stage = $el('div', 'ldd-film-stage');
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
        ? 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(parsed.videoId) + '?rel=0&cc_load_policy=0'
        : 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(parsed.url) + '&show_text=false';
    } else {
      media = $el('video', 'ldd-film-video');
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      media.src = parsed.url;
    }
    screen.append(media);
    const description = $el('p', 'ldd-film-source-note', 'Xem video · Bài luyện nghe sẽ xuất hiện sau khi có script.');
    stage.append(screen, title, description);
    wrap.append(stage);
    cleanup = () => {
      if (media.tagName === 'VIDEO') {
        media.pause();
        media.removeAttribute('src');
        media.load();
      } else media.removeAttribute('src');
    };
    if (parsed.provider === 'youtube') {
      // Use the same caption defaults for videos with and without exercises.
      media.removeAttribute('src');
      screen.replaceChildren();
      try {
        const adapter = await makePlayer(screen, lesson, message => { description.textContent = message; });
        if (seq !== generation) { adapter.destroy(); return; }
        cleanup = adapter.destroy;
      } catch (error) {
        if (seq !== generation) return;
        description.textContent = 'Không tải được video: ' + (error.message || 'Lỗi trình phát');
      }
    }
    const watchTop = wrap.closest('#ldd-ent-movies-panel') || stage;
    watchTop.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  async function openLesson(lesson, wrap, parentSeq) {
    stopPlayer();
    const seq = ++generation;
    wrap.replaceChildren();
    const stage = $el('div', 'ldd-film-stage');
    const screen = $el('div', 'ldd-film-screen');
    const heading = $el('h3', 'ldd-film-title', lesson.title);
    const controls = $el('div', 'ldd-film-controls');
    const progress = $el('span', 'ldd-film-progress');
    const meter = $el('progress', 'ldd-film-meter');
    meter.setAttribute('aria-label', 'Tiến độ bài luyện nghe');
    meter.max = 1;
    meter.value = 0;
    const focusMode = button('Tập trung', 'ldd-film-focus');
    focusMode.setAttribute('aria-pressed', 'false');
    focusMode.addEventListener('click', () => {
      const layout = wrap.closest('.ldd-film-watch-layout');
      const enabled = layout.classList.toggle('ldd-film-focus-mode');
      focusMode.setAttribute('aria-pressed', String(enabled));
      focusMode.textContent = enabled ? 'Hiện video đề xuất' : 'Tập trung';
      fitPlayer();
    });
    const question = $el('section', 'ldd-film-question');
    question.setAttribute('aria-label', 'Câu hỏi luyện nghe');
    const questionHeader = $el('div', 'ldd-film-question-header');
    questionHeader.append(
      $el('strong', 'ldd-film-question-title', 'Nghe & hoàn thành câu'),
      $el('span', 'ldd-film-question-help', 'Video tự dừng sau từng câu thoại')
    );
    const questionBody = $el('div', 'ldd-film-question-body', 'Đang khởi tạo video…');
    const feedback = $el('p', 'ldd-film-feedback');
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    controls.append(progress, focusMode);
    progress.append(meter);
    question.append(questionHeader, questionBody, feedback);
    stage.append(screen, heading, controls, question);
    wrap.append(stage);
    const answers = new Map();
    const drafts = new Map();
    const incoming = Array.isArray(lesson.segments) ? lesson.segments : [];
    const check = filmTiming?.check(incoming, { allowEmpty: true });
    if (!check || !check.ok) {
      questionBody.textContent = 'Script chưa đạt kiểm tra thời gian. Giáo viên cần sửa trước khi học viên làm bài.';
      return;
    }
    const segments = incoming.filter(s => blanksIn(s.text).length);
    if (!segments.length) { questionBody.textContent = 'Bài phim chưa có câu hỏi.'; return; }
    try {
      const { data, error } = await client.from('movie_cloze_progress')
        .select('segment_index,blank_index,status,score_change').eq('movie_id', lesson.id);
      if (error) throw error;
      if (seq !== generation) return;
      for (const row of data || []) answers.set(keyOf(row.segment_index, row.blank_index), row);
    } catch (e) {
      questionBody.textContent = 'Không tải được tiến độ của bạn: ' + e.message;
      return;
    }
    function complete(idx) {
      return blanksIn(segments[idx]?.text).every((_, i) => answers.has(keyOf(idx, i)));
    }
    function tally() {
      const total = segments.reduce((n, s) => n + blanksIn(s.text).length, 0);
      progress.textContent = answers.size + '/' + total + ' từ hoàn thành · ' +
        [...answers.values()].reduce((n, a) => n + (Number(a.score_change) || 0), 0) + ' điểm';
      meter.max = total || 1;
      meter.value = answers.size;
      progress.append(meter);
    }
    tally();
    let adapter;
    let active = -1;
    let busy = false;
    let manualHold = false;
    let displayedIndex = -1;
    // CSS owns the video dimensions: at most 720px wide and always 16:9.
    // Keep the exercise and translation at full column width below the player.
    const fitPlayer = () => screen.style.removeProperty('height');
    const releaseLayout = () => screen.style.removeProperty('height');
    cleanup = releaseLayout;
    fitPlayer();
    function questionAt(idx) {
      if (idx < 0 || idx >= segments.length || idx === active) return;
      active = idx;
      displayedIndex = idx;
      manualHold = true;
      try { adapter?.pause(); } catch (_) {}
      feedback.textContent = '';
      wrap.classList.add('ldd-film-paused');
      const questionTop = $el('div', 'ldd-film-question-top');
      questionTop.append(
        $el('span', 'ldd-film-question-count', 'Câu ' + (idx + 1) + ' / ' + segments.length),
        $el('span', 'ldd-film-cue-time', 'Đoạn ' +
          [segments[idx].start, segments[idx].end].map(seconds =>
            Math.floor(Number(seconds) / 60) + ':' +
            String(Math.floor(Number(seconds) % 60)).padStart(2, '0')
          ).join('–'))
      );
      questionBody.replaceChildren(questionTop);
      const sentence = $el('div', 'ldd-film-sentence');
      const actions = $el('div', 'ldd-film-actions');
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
        input.value = drafts.get(itemKey) || '';
        input.addEventListener('input', () => drafts.set(itemKey, input.value));
        input.setAttribute('aria-label', 'Từ còn trống ' + (blankIndex + 1));
        const check = button('Kiểm tra', 'ldd-film-check');
        const hint = button('Gợi ý', 'ldd-film-hint');
        if (done) {
          input.value = done.word || drafts.get(itemKey) || '✓';
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
                  word: data.word || input.value,
                  score_change: data.already_done ? Number(data.total_delta) || 0 : Number(data.delta) || 0 };
                answers.set(itemKey, row);
                input.value = data.word || (data.status === 'correct' ? input.value : '✓');
                input.disabled = true;
                check.hidden = hint.hidden = true;
                field.classList.add('done');
                group.remove();
                feedback.textContent = data.status === 'hint_new' ? 'Đã thêm “' + part + '” vào kho từ vựng.' :
                  data.status === 'hint_known' ? '“' + part + '” đã có trong kho: −1 điểm.' :
                  'Chính xác! +1 điểm.';
                tally();
                document.dispatchEvent(new Event('ldd:today-refresh'));
                document.dispatchEvent(new Event('ldd:vocab-senses-updated'));
                if (complete(idx)) {
                  manualHold = false;
                  const completedMessage = $el('p', 'ldd-film-completed',
                    'Hoàn thành câu! Video sẽ tiếp tục phát.');
                  questionBody.append(completedMessage);
                  setTimeout(() => {
                    if (seq !== generation || active !== idx) return;
                    active = -1;
                    if (segments.every((_, i) => complete(i))) {
                      completedMessage.textContent = 'Đã hoàn thành toàn bộ bài phim!';
                    } else {
                      // Keep the entire sentence and its Vietnamese translation
                      // in view while the next piece of video plays.
                      completedMessage.textContent = 'Hoàn thành! Đang phát câu tiếp theo…';
                      wrap.classList.remove('ldd-film-paused');
                      adapter.play();
                    }
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
        const group = $el('div', 'ldd-film-action-group');
        if (blanksIn(segments[idx].text).length > 1) {
          group.append($el('span', 'ldd-film-action-label', 'Từ trống ' + (blankIndex + 1)));
        }
        group.append(check, hint);
        field.append(input);
        sentence.append(field);
        if (!done) actions.append(group);
      });
      questionBody.append(sentence);
      if (segments[idx].translation_vi) {
        // The complete Vietnamese translation is visible without any action.
        // No accordions, text clamps or nested scrolling.
        const translation = $el('div', 'ldd-film-translation');
        translation.append(
          $el('span', 'ldd-film-translation-label', 'Bản dịch tiếng Việt'),
          $el('p', 'ldd-film-translation-text', segments[idx].translation_vi)
        );
        questionBody.append(translation);
      }
      if (actions.childElementCount) questionBody.append(actions);
      // Keep the native mobile keyboard closed until the student taps the input.
      if (focus[0] && window.matchMedia?.('(pointer: fine) and (min-width: 740px)').matches) {
        focus[0].focus({ preventScroll: true });
      }
      fitPlayer();
    }
    try {
      adapter = await makePlayer(screen, lesson, message => { feedback.textContent = message; });
      if (seq !== generation) { adapter.destroy(); return; }
      cleanup = () => { releaseLayout(); adapter.destroy(); };
      const firstPending = segments.findIndex((_, i) => !complete(i));
      questionAt(firstPending >= 0 ? firstPending : 0);
      active = -1;
      manualHold = false;
      wrap.classList.remove('ldd-film-paused');
      let durationWarningShown = false;
      timer = setInterval(() => {
        if (seq !== generation || manualHold || !adapter) return;
        const t = Number(adapter.getTime());
        if (!Number.isFinite(t)) return;
        const duration = Number(adapter.getDuration?.());
        if (Number.isFinite(duration) && duration > 0) {
          knownDurations.set(providerOf(lesson.video_url)?.url, duration);
          if (!durationWarningShown) {
            const checked = filmTiming?.check(segments, { duration });
            if (!checked || !checked.ok) {
              durationWarningShown = true;
              manualHold = true;
              adapter.pause();
              questionBody.textContent = 'Script không khớp thời lượng video. Đã dừng phần luyện tập để tránh chấm sai.';
              feedback.textContent = (checked?.errors || ['Không thể kiểm tra thời gian.']).join(' ');
              return;
            }
          }
        }
        // Only pause at the end of the cue actually being played, not at a
        // stale unfinished cue after the learner jumps forwards in the video.
        const idx = filmTiming?.cueAtTime(segments, t, complete) ?? -1;
        if (idx !== -1) questionAt(idx);
      }, 120);
      const replay = button('↻ Nghe lại', 'ldd-film-replay');
      replay.addEventListener('click', () => {
        const index = displayedIndex >= 0 ? displayedIndex : segments.findIndex((_, i) => !complete(i));
        if (index < 0) return;
        manualHold = false;
        active = -1;
        wrap.classList.remove('ldd-film-paused');
        feedback.textContent = 'Đang nghe lại câu ' + (index + 1) + '…';
        adapter.seek(Math.max(0, Number(segments[index].start) - 0.4));
        adapter.play();
      });
      questionHeader.append(replay);
    } catch (e) {
      questionBody.textContent = 'Không thể điều khiển video: ' + (e.message || 'Lỗi trình phát') +
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
    const watchTop = wrap.closest('#ldd-ent-movies-panel') || stage;
    watchTop.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
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
    const editable = lessons || [];
    editable.forEach(m => {
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
      'Dán link YouTube rồi bấm Tạo script + dịch tự động. Hoặc tải SRT/VTT thủ công. Kiểm tra nội dung trước khi lưu để học viên không bị chấm sai.');
    const preview = $el('p', 'ldd-film-editor-help');
    const save = button('Lưu video / script', 'ldd-film-save');
    save.type = 'submit';
    const timingConfirmRow = $el('label', 'ldd-film-editor-help');
    timingConfirmRow.style.display = 'none';
    const timingConfirm = $el('input');
    timingConfirm.type = 'checkbox';
    timingConfirmRow.append(timingConfirm, document.createTextNode(
      ' Đã đối chiếu khoảng trống thời gian bất thường với video.'
    ));
    const generate = button('✨ Tạo script + dịch tự động từ YouTube', 'ldd-film-generate');
    let generated = null;
    let generatedCaption = '';
    let generatedTranslation = '';
    const toSrtTime = seconds => {
      const ms = Math.max(0, Math.round(seconds * 1000));
      return [Math.floor(ms / 3600000), Math.floor(ms / 60000) % 60, Math.floor(ms / 1000) % 60]
        .map(n => String(n).padStart(2, '0')).join(':') + ',' + String(ms % 1000).padStart(3, '0');
    };
    const notice = $el('p', 'ldd-film-feedback');
    const noticePreview = () => {
      const s = parseSubtitles(captions.value, true);
      const t = translations.value.trim().split(/\n/).map(x => x.trim()).filter(Boolean);
      const valid = filmTiming?.check(s, { allowEmpty: true,
        duration: knownDurations.get(providerOf(link.value)?.url) });
      const dropped = (captions.value.match(/-->/g) || []).length - s.length;
      const notes = valid ? [...valid.errors, ...valid.warnings] :
        ['Không thể chạy bộ kiểm tra thời gian.'];
      if (dropped > 0) notes.unshift(dropped + ' đoạn phụ đề có lỗi định dạng.');
      preview.textContent = s.length + ' câu tiếng Anh, ' +
        (translations.value.trim() ? t.length : 0) + ' dòng dịch.' +
        (notes.length ? '\n⚠ ' + notes.join('\n⚠ ') : ' · Thời gian hợp lệ về cấu trúc.');
      preview.style.whiteSpace = 'pre-wrap';
      timingConfirmRow.style.display = valid?.warnings.length ? 'block' : 'none';
      timingConfirm.checked = false;
    };
    existing.addEventListener('change', async () => {
      const selectedId = existing.value;
      const selected = editable.find(m => String(m.id) === selectedId);
      generated = null;
      generatedCaption = '';
      generatedTranslation = '';
      captions.value = '';
      translations.value = '';
      timingConfirm.checked = false;
      title.value = selected?.title || '';
      link.value = selected?.video_url || '';
      title.readOnly = Boolean(selected);
      link.readOnly = Boolean(selected);
      save.textContent = selected ? 'Cập nhật script và thời gian' : 'Lưu video / script';
      notice.textContent = '';
      noticePreview();
      if (!selected) return;
      save.disabled = true;
      notice.textContent = 'Đang tải mốc thời gian gốc…';
      try {
        const { data, error } = await client.from('movie_lessons')
          .select('segments').eq('id', Number(selectedId)).single();
        if (error) throw error;
        if (existing.value !== selectedId) return;
        const cues = Array.isArray(data?.segments) ? data.segments : [];
        captions.value = cues.map((s, i) =>
          (i + 1) + '\n' + toSrtTime(Number(s.start)) + ' --> ' +
          toSrtTime(Number(s.end)) + '\n' + String(s.text || '')
        ).join('\n\n');
        translations.value = cues.map(s => String(s.translation_vi || '')).join('\n');
        noticePreview();
        notice.textContent = 'Đã tải ' + cues.length + ' câu; có thể sửa thời gian rồi lưu.';
      } catch (error) {
        notice.textContent = 'Không tải được script gốc: ' + (error.message || 'Lỗi mạng');
      } finally {
        if (existing.value === selectedId) save.disabled = false;
      }
    });
    toggle.addEventListener('click', () => {
      form.hidden = !form.hidden;
      toggle.setAttribute('aria-expanded', String(!form.hidden));
      if (!form.hidden) (editable.length ? existing : title).focus();
    });
    generate.addEventListener('click', async () => {
      const info = providerOf(link.value.trim());
      if (!info || info.provider !== 'youtube') {
        notice.textContent = 'Tự động nhận dạng hiện hỗ trợ YouTube công khai. Facebook/MP4 cần nhập phụ đề.';
        return;
      }
      generate.disabled = true;
      save.disabled = true;
      notice.textContent = 'AI đang nghe video, xác định thời gian từng câu và dịch sang tiếng Việt…';
      try {
        const { data, error } = await client.functions.invoke('movie-transcribe-youtube', {
          body: { videoId: info.videoId }
        });
        if (error) throw Error(data?.error || error.message || 'Không thể tạo script.');
        const raw = Array.isArray(data?.segments) ? data.segments : [];
        const segments = raw.map(item => {
          const start = Number(item.start), end = Number(item.end);
          const text = String(item.text || '').replace(/\s+/g, ' ').trim();
          const translation_vi = String(item.translation_vi || '').replace(/[\r\n]+/g, ' ').trim();
          if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start || end > 14400 ||
              text.length < 2 || text.length > 400) return null;
          const marked = markBlank(text);
          return marked && blanksIn(marked).length ? {
            start: Math.round(start * 100) / 100,
            end: Math.round(end * 100) / 100,
            text: marked, ...(translation_vi ? { translation_vi } : {})
          } : null;
        }).filter(Boolean);
        if (segments.length !== raw.length) throw Error('AI trả về câu không hợp lệ, không lưu script.');
        if (!filmTiming?.check(segments, { duration: knownDurations.get(info.url) }).ok) {
          throw Error('Mốc thời gian AI không hợp lệ. Kiểm tra và tạo lại script.');
        }
        if (segments.length < 3) throw Error('Không nhận diện đủ câu nói. Video có thể hạn chế truy cập âm thanh.');
        generated = segments;
        captions.value = segments.map((segment, i) =>
          (i + 1) + '\n' + toSrtTime(segment.start) + ' --> ' + toSrtTime(segment.end) + '\n' +
          segment.text.replace(/\{([^{}]+)\}/g, '$1')
        ).join('\n\n');
        translations.value = segments.map(s => s.translation_vi || '').join('\n');
        generatedCaption = captions.value;
        generatedTranslation = translations.value;
        noticePreview();
        notice.textContent = 'AI đã tạo ' + segments.length +
          ' câu. Kiểm tra lại lời thoại, mốc dừng và bản dịch trước khi lưu vì AI có thể nghe nhầm.';
      } catch (error) {
        generated = null;
        notice.textContent = 'Không tạo được script: ' + (error.message || 'Lỗi xử lý video');
      } finally {
        generate.disabled = false;
        save.disabled = false;
      }
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
      const useGenerated = generated && captions.value === generatedCaption &&
        translations.value === generatedTranslation;
      const segments = useGenerated ? generated : captions.value.trim() ? parseSubtitles(captions.value, true) : [];
      if (!useGenerated && captions.value.trim() &&
          (captions.value.match(/-->/g) || []).length !== segments.length) {
        notice.textContent = 'Có đoạn phụ đề bị mất hoặc lỗi định dạng. Không lưu cho đến khi sửa.';
        return;
      }
      if (captions.value.trim() && !segments.length) {
        notice.textContent = 'Script không có mốc thời gian SRT/VTT hợp lệ.'; return;
      }
      if (existing.value && !segments.length) {
        notice.textContent = 'Hãy nhập script để gắn vào video đã có.'; return;
      }
      const translated = !useGenerated && translations.value.trim()
        ? translations.value.trim().replace(/\r/g, '').split(/\n/).map(x => x.trim()).filter(Boolean)
        : [];
      if (translated.length && translated.length !== segments.length) {
        notice.textContent = 'Số dòng bản dịch phải khớp số câu: ' + segments.length + '.'; return;
      }
      const withTranslations = segments.map((segment, i) => ({
        ...segment, ...(translated.length ? { translation_vi: translated[i] } : {})
      }));
      const checked = filmTiming?.check(withTranslations, {
        allowEmpty: !captions.value.trim() && !existing.value,
        duration: knownDurations.get(info.url)
      });
      if (!checked || !checked.ok) {
        notice.textContent = 'Không lưu script: ' +
          (checked?.errors || ['Không tải được bộ kiểm tra.']).join(' ');
        return;
      }
      if (checked.warnings.length && !timingConfirm.checked) {
        notice.textContent = 'Có khoảng trống thời gian bất thường: ' +
          checked.warnings.join(' ') + ' Kiểm tra video và xác nhận trước khi lưu.';
        timingConfirmRow.style.display = 'block';
        return;
      }
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
      generate,
      $el('label', '', 'Script tiếng Anh (SRT/VTT)'), upload, captions,
      $el('label', '', 'Bản dịch tiếng Việt (mỗi câu một dòng)'), translationUpload, translations,
      sample, description, preview, timingConfirmRow, save, notice
    );
    wrap.append(toggle, form);
  }

  window.LDDFilmCloze = { mount, close, parseSubtitles, providerOf };
})();
