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
      // Keep the clean preview during load. Choosing a film triggers play()
      // automatically; only show a play button if the browser blocks autoplay.
      const poster = button('', 'ldd-film-youtube-poster');
      poster.setAttribute('aria-label', 'Phát video ' + (lesson.title || 'bài luyện nghe'));
      const thumbnail = $el('img', 'ldd-film-youtube-poster-image');
      thumbnail.src = parsed.thumbnail;
      thumbnail.alt = '';
      thumbnail.loading = 'eager';
      thumbnail.decoding = 'async';
      const playIcon = $el('span', 'ldd-film-youtube-poster-play', '▶');
      playIcon.setAttribute('aria-hidden', 'true');
      poster.append(thumbnail, playIcon);
      container.append(poster);

      let player = null;
      let loadingPlayer = null;
      let startPromise = null;
      let destroyed = false;
      let wantsPlay = false;
      let pendingSeek = NaN;
      let captionsInitialized = false;
      let blockedPlayButton = null;
      const clearPlayFallback = () => {
        blockedPlayButton?.remove();
        blockedPlayButton = null;
      };
      const showPlayFallback = () => {
        if (destroyed || !wantsPlay || !player || blockedPlayButton) return;
        blockedPlayButton = button('▶ Nhấn để phát video', 'ldd-film-autoplay-fallback');
        blockedPlayButton.setAttribute('aria-label', 'Trình duyệt chặn tự phát: nhấn để bắt đầu video');
        blockedPlayButton.addEventListener('click', () => {
          clearPlayFallback();
          if (!destroyed) player?.playVideo();
        });
        container.append(blockedPlayButton);
      };
      const disableInitialCaptions = p => {
        if (captionsInitialized) return;
        try {
          if (!p.getOptions?.().includes('captions')) return;
          p.setOption('captions', 'track', {});
          captionsInitialized = true;
        } catch (_) { /* Caption preferences must never prevent playback. */ }
      };
      const start = () => {
        if (destroyed || player || startPromise) return;
        startPromise = (async () => {
          await loadYT();
          if (destroyed) return;
          const host = $el('div', 'ldd-film-video');
          container.replaceChildren(host);
          const readyPlayer = await new Promise((resolve, reject) => {
            loadingPlayer = new window.YT.Player(host, {
              videoId: parsed.videoId,
              width: '100%', height: '100%',
              // Only the video is visible after play; the guided replay and
              // transcript controls belong to LDD, not YouTube's timeline.
              playerVars: {
                playsinline:1, autoplay:1, controls:0, fs:0, disablekb:1,
                iv_load_policy:3, rel:0, cc_load_policy:0, origin:location.origin
              },
              events: {
                onReady: e => {
                  if (destroyed) {
                    try { e.target.destroy(); } catch (_) {}
                    resolve(null);
                    return;
                  }
                  disableInitialCaptions(e.target);
                  resolve(e.target);
                },
                onApiChange: e => disableInitialCaptions(e.target),
                onAutoplayBlocked: () => showPlayFallback(),
                onStateChange: e => {
                  if (e.data === window.YT.PlayerState.PLAYING) clearPlayFallback();
                },
                onError: e => reject(Error('YouTube không cho phép phát video này (' + e.data + ').'))
              }
            });
          });
          if (!readyPlayer || destroyed) return;
          player = readyPlayer;
          if (Number.isFinite(pendingSeek)) player.seekTo(pendingSeek, true);
          if (wantsPlay) {
            player.playVideo();
            // Some browsers do not dispatch onAutoplayBlocked. Leave a
            // one-tap fallback only if playback has not actually started.
            setTimeout(() => {
              if (destroyed || !wantsPlay || !player) return;
              const state = player.getPlayerState();
              if (state !== window.YT.PlayerState.PLAYING &&
                  state !== window.YT.PlayerState.BUFFERING) showPlayFallback();
            }, 2500);
          } else player.pauseVideo();
        })().catch(error => {
          if (destroyed) return;
          try { loadingPlayer?.destroy(); } catch (_) {}
          loadingPlayer = null;
          container.replaceChildren(poster);
          onError(error?.message || 'Không tải được YouTube Player.');
        }).finally(() => { startPromise = null; });
      };
      poster.addEventListener('click', () => {
        wantsPlay = true;
        start();
      });
      return {
        getTime: () => player ? player.getCurrentTime() : NaN,
        getDuration: () => player ? player.getDuration() : NaN,
        isPlaying: () => !!player && player.getPlayerState() === window.YT.PlayerState.PLAYING,
        pause: () => { wantsPlay = false; clearPlayFallback(); player?.pauseVideo(); },
        play: () => { wantsPlay = true; if (player) player.playVideo(); else start(); },
        seek: t => {
          if (!Number.isFinite(Number(t))) return;
          pendingSeek = Number(t);
          player?.seekTo(pendingSeek, true);
        },
        destroy: () => {
          destroyed = true;
          wantsPlay = false;
          clearPlayFallback();
          try { player?.destroy(); } catch (_) {}
          if (loadingPlayer && loadingPlayer !== player) {
            try { loadingPlayer.destroy(); } catch (_) {}
          }
          player = null;
          loadingPlayer = null;
          poster.remove();
        }
      };
    }
    if (parsed.provider === 'mp4') {
      const video = $el('video', 'ldd-film-video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = parsed.url;
      container.append(video);
      return { getTime: () => video.currentTime, getDuration: () => video.duration,
        isPlaying: () => !video.paused, pause: () => video.pause(),
        play: () => video.play().catch(() => onError('Trình duyệt yêu cầu nhấn phát để bắt đầu video.')),
        seek: t => { video.currentTime = t; },
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

    // Tablet/desktop: video left, exercise and translation right, suggestions below.
    // On phones all sections stack vertically in their natural reading order.
    const watch = $el('div', 'ldd-film-watch-layout');
    watch.hidden = true;
    const primary = $el('div', 'ldd-film-watch-primary');
    const browse = button('← Tất cả video', 'grammar-back-btn ldd-film-browse');
    browse.hidden = true;
    const panel = body.closest('#ldd-ent-movies-panel');
    const panelHeader = panel?.querySelector('.ldd-ent-panel-heading');
    // Reuse the exact back-to-entertainment slot for this in-video action.
    // On the movie library itself the original “Giải trí” button remains.
    panelHeader?.querySelector('.ldd-film-browse')?.remove();
    const entertainmentBack = panelHeader?.querySelector('[data-ent-back]');
    if (entertainmentBack) entertainmentBack.before(browse);
    else if (panelHeader) panelHeader.prepend(browse);
    else primary.prepend(browse);
    let editScriptButton = null;
    let renameVideoButton = null;
    let editorController = null;
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
      if (editScriptButton) editScriptButton.hidden = true;
      if (renameVideoButton) renameVideoButton.hidden = true;
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
      if (isTeacher) {
        editorController = setupEditor(editor, async () => { await mount(body, legacyMovies); }, lessons);
        editScriptButton = button('✎ Sửa script', 'ldd-film-edit-current');
        editScriptButton.hidden = true;
        editScriptButton.setAttribute('aria-label', 'Sửa script của video đang xem');
        browse.after(editScriptButton);
        renameVideoButton = button('✎ Đổi tên', 'ldd-film-rename-current');
        renameVideoButton.hidden = true;
        renameVideoButton.setAttribute('aria-label', 'Đổi tên video đang xem');
        editScriptButton.after(renameVideoButton);
      }
      status.textContent = lessons.length
        ? 'Chọn video để xem và luyện nghe. Các video đề xuất nằm bên dưới bài học.'
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
        if (editScriptButton) {
          const isSavedLesson = lessons.some(item => String(item.id) === String(lesson.id));
          editScriptButton.hidden = !isSavedLesson;
          editScriptButton.onclick = isSavedLesson ? () => editorController?.openFor(lesson.id) : null;
          renameVideoButton.hidden = !isSavedLesson;
          renameVideoButton.onclick = isSavedLesson
            ? () => editorController?.openFor(lesson.id, true) : null;
        }
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
            if (item.id != null) card.dataset.filmId = String(item.id);
            const desc = $el('span', 'ldd-film-rec-description');
            desc.append($el('strong', 'ldd-film-rec-title', item.title || 'Video'));
            desc.append($el('small', 'ldd-film-rec-subtitle',
              labelOf(item) + ' · ' + (providerOf(item.video_url)?.provider || 'video')));
            card.append(coverOf(item), desc);
            card.addEventListener('click', () => select(item));
            recList.append(card);
          });
        }
        // One shared watch template for all video providers and every lesson.
        // Saved scripts use the scrollable, sentence-level practice layout.
        // Missing scripts get an honest empty state rather than a fake quiz.
        void openStandalone(lesson, playerWrap, isTeacher);
      };
      catalog.forEach(item => {
        const card = button('', 'ldd-ent-media-card');
        if (item.id != null) card.dataset.filmId = String(item.id);
        card.append(coverOf(item), $el('strong', 'ldd-film-card-title', item.title || 'Video'),
          $el('small', '', labelOf(item)));
        card.addEventListener('click', () => select(item));
        grid.append(card);
      });

      // Enter Phim ảnh at the complete video library.
      // Open the player only after a learner explicitly selects a video.
      // Recommendation clicks also call select(), but never on initial mount.
      library.hidden = false;
      watch.hidden = true;
      browse.hidden = true;
    } catch (e) {
      status.textContent = 'Không tải được danh sách phim: ' + (e.message || 'Lỗi kết nối');
    }
  }


  async function renderCaptionExercise(lesson, panel, adapter, seq, teacherPreview = false) {
    const raw = Array.isArray(lesson.segments) ? lesson.segments : [];
    const checkTiming = filmTiming?.check(raw);
    if (!raw.length || !checkTiming?.ok) {
      throw Error('Dữ liệu thời gian bài tập chưa hợp lệ.');
    }
    if (!client) throw Error('Bạn cần đăng nhập để làm bài.');
    const { data: saved, error } = await client.from('movie_cloze_progress')
      .select('segment_index,blank_index,status,score_change')
      .eq('movie_id', lesson.id);
    if (error) throw error;
    if (seq !== generation) return;

    const answers = new Map((saved || []).map(item =>
      [keyOf(item.segment_index, item.blank_index), item]));
    const drafts = new Map();
    // Only the earliest unfinished sentence is unlocked. Previously answered
    // sentences remain replayable, but later subtitles cannot skip the exercise.
    const gradedIndices = raw.map((cue, idx) => blanksIn(cue?.text).length ? idx : -1)
      .filter(idx => idx >= 0);
    const gradedBlanks = gradedIndices.reduce((total, idx) => total + blanksIn(raw[idx].text).length, 0);
    const isComplete = idx => {
      const blanks = blanksIn(raw[idx]?.text);
      return blanks.length > 0 && blanks.every((_, j) => answers.has(keyOf(idx, j)));
    };
    // Some scripts mix spoken captions with scene headings or narration.
    // Display non-graded lines, but never block the lesson on an empty cue.
    let gateIndex = gradedIndices.find(idx => !isComplete(idx)) ?? -1;
    let playbackIndex = -1;
    let waitingForAnswer = false;
    let heardGate = false;
    let seekPendingUntil = 0;
    let resumeAt = 0;
    let updateRowStates = () => {};
    let playCue = () => {};
    let showCue = () => {};
    const tally = $el('p', 'ldd-film-caption-progress');
    tally.setAttribute('aria-live', 'polite');
    const count = () => {
      const currentKeys = gradedIndices.flatMap(idx =>
        blanksIn(raw[idx].text).map((_, j) => keyOf(idx, j)));
      const completed = currentKeys.map(key => answers.get(key)).filter(Boolean);
      const earned = completed.reduce((sum, row) => sum + Number(row.score_change || 0), 0);
      tally.textContent = completed.length + ' / ' + gradedBlanks + ' từ đã làm · ' + earned + ' điểm';
    };
    count();

    const list = $el('ol', 'ldd-film-caption-list ldd-film-caption-practice-list');
    list.tabIndex = 0;
    list.setAttribute('aria-label', 'Bài luyện nghe: cuộn danh sách câu hỏi mà không cuộn video');
    let manualScrollUntil = 0;
    let activeIndex = -1;
    const holdScroll = () => { manualScrollUntil = Date.now() + 7000; };
    list.addEventListener('wheel', holdScroll, { passive: true });
    list.addEventListener('touchstart', holdScroll, { passive: true });
    list.addEventListener('keydown', holdScroll);
    const padTime = seconds => Math.floor(seconds / 60) + ':' +
      String(Math.floor(seconds % 60)).padStart(2, '0');
    const items = [];

    raw.forEach((cue, idx) => {
      const item = $el('li', 'ldd-film-caption-item ldd-film-caption-exercise');
      const heading = $el('div', 'ldd-film-caption-line-heading');
      const seek = button('▶ Nghe lại · ' + padTime(Number(cue.start)), 'ldd-film-caption-seek');
      seek.title = 'Chỉ phát lại đoạn câu ' + (idx + 1) + ' rồi tự dừng';
      seek.setAttribute('aria-label', 'Nghe lại câu ' + (idx + 1));
      seek.addEventListener('click', () => playCue(idx));
      const number = $el('span', 'ldd-film-caption-number', 'Câu ' + (idx + 1));
      heading.append(number, seek);

      const sentence = $el('div', 'ldd-film-caption-sentence');
      const parts = String(cue.text || '').split(/\{([^{}]+)\}/g);
      let blanks = 0;
      const inputs = [];
      const actionRow = $el('div', 'ldd-film-caption-actions');
      const fields = [];
      const feedback = $el('p', 'ldd-film-caption-feedback');
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');

      parts.forEach((part, i) => {
        if (i % 2 === 0) {
          sentence.append(document.createTextNode(part));
          return;
        }
        const blankIndex = blanks++;
        const key = keyOf(idx, blankIndex);
        const input = $el('input', 'ldd-film-answer ldd-film-caption-input');
        input.type = 'text';
        input.maxLength = 64;
        input.autocomplete = 'off';
        input.autocapitalize = 'off';
        input.spellcheck = false;
        input.placeholder = 'Điền từ';
        input.setAttribute('aria-label', 'Câu ' + (idx + 1) + ': từ còn thiếu');
        input.value = drafts.get(key) || '';
        input.addEventListener('input', () => drafts.set(key, input.value));
        if (answers.has(key)) {
          input.value = '✓';
          input.disabled = true;
          input.classList.add('done');
        } else if (idx !== gateIndex) {
          input.disabled = true;
        }
        sentence.append(input);
        inputs.push({ input, blankIndex, key });
      });

      // Always show the Vietnamese translation below its English cloze line.
      // Learners can listen and type without having to reveal a second panel.
      const translation = $el('p', 'ldd-film-caption-translation',
        cue.translation_vi || 'Bản dịch chưa có.');

      for (const field of inputs) {
        const check = button('Kiểm tra', 'ldd-film-check ldd-film-caption-check');
        const hint = button('Gợi ý', 'ldd-film-hint ldd-film-caption-hint');
        if (answers.has(field.key)) {
          check.hidden = true;
          hint.hidden = true;
          feedback.textContent = 'Đã hoàn thành';
        } else if (idx !== gateIndex) {
          check.disabled = hint.disabled = true;
        }
        fields.push({ ...field, check, hint });
        let busy = false;
        const submit = async askHint => {
          if (busy || answers.has(field.key) || idx !== gateIndex) return;
          if (!heardGate) {
            feedback.textContent = 'Hãy nghe hết đoạn này trước khi kiểm tra hoặc dùng Gợi ý.';
            return;
          }
          if (!askHint && !field.input.value.trim()) {
            feedback.textContent = 'Hãy điền từ trước khi kiểm tra.';
            field.input.focus();
            return;
          }
          busy = true;
          check.disabled = hint.disabled = true;
          feedback.textContent = 'Đang kiểm tra…';
          try {
            const { data, error } = await client.rpc('movie_cloze_answer', {
              p_movie_id: lesson.id,
              p_segment_index: idx,
              p_blank_index: field.blankIndex,
              p_answer: askHint ? null : field.input.value.trim(),
              p_hint: askHint
            });
            if (error) throw error;
            if (seq !== generation) return;
            if (data?.status === 'wrong') {
              feedback.textContent = 'Chưa đúng. Nghe lại rồi thử tiếp nhé.';
              return;
            }
            if (!data || !(['correct','hint_new','hint_known','already_done'].includes(data.status) || data.already_done)) {
              throw Error('Không nhận được kết quả hợp lệ.');
            }
            answers.set(field.key, {
              score_change: data.already_done ? Number(data.total_delta) || 0 : Number(data.delta) || 0,
              status: data.status
            });
            field.input.value = data.word || (askHint ? '✓' : field.input.value);
            field.input.disabled = true;
            field.input.classList.add('done');
            check.hidden = hint.hidden = true;
            feedback.textContent = data.status === 'correct' ? 'Chính xác! +1 điểm' :
              data.status === 'hint_known' ? 'Từ đã có trong kho: −1 điểm.' :
              data.status === 'hint_new' ? 'Đã lưu từ gợi ý vào kho từ vựng.' :
              'Đáp án này đã được ghi nhận.';
            count();
            document.dispatchEvent(new Event('ldd:today-refresh'));
            document.dispatchEvent(new Event('ldd:vocab-senses-updated'));
            if (isComplete(idx) && idx === gateIndex) {
              gateIndex = gradedIndices.find(i => !isComplete(i)) ?? -1;
              waitingForAnswer = false;
              heardGate = false;
              updateRowStates();
              playbackIndex = -1;
              // Continue from the end of the answered line, including any
              // intervening dialogue or music: never jump to the next cue.
              try {
                if (Math.abs(Number(adapter.getTime()) - resumeAt) > 0.35)
                  adapter.seek(resumeAt);
                adapter.play();
              } catch (_) {
                state.textContent = 'Nhấn phát để tiếp tục video.';
              }
              if (gateIndex >= 0) {
                showCue(gateIndex);
                state.textContent = 'Đang phát tiếp đến câu có ô trống tiếp theo.';
              } else {
                state.textContent = 'Đã hoàn thành bài luyện nghe. Video tiếp tục đến hết.';
              }
            }
          } catch (err) {
            if (seq === generation) feedback.textContent = 'Chưa lưu được: ' + (err.message || 'Lỗi kết nối');
          } finally {
            busy = false;
            if (seq === generation && !answers.has(field.key)) check.disabled = hint.disabled = false;
          }
        };
        check.addEventListener('click', () => void submit(false));
        hint.addEventListener('click', () => void submit(true));
        field.input.addEventListener('keydown', e => {
          if (e.key === 'Enter') { e.preventDefault(); void submit(false); }
        });
        actionRow.append(check, hint);
      }

      item.append(heading, sentence, translation, actionRow, feedback);
      list.append(item);
      items.push({ start: Number(cue.start), end: Number(cue.end), item, seek, fields });
    });

    // A script with no cloze targets is still a valid read-only transcript.
    // Listeners can replay each caption, but no answer/score is recorded.
    const state = panel.querySelector('.ldd-film-caption-state');
    state.setAttribute('aria-live', 'polite');
    panel.append(tally, list);

    // Keep all controls locked ahead of the earliest unanswered cue.
    updateRowStates = () => {
      items.forEach((row, idx) => {
        const locked = !teacherPreview && gateIndex >= 0 && idx > gateIndex;
        row.item.classList.toggle('is-locked', locked);
        row.item.classList.toggle('is-next', idx === gateIndex);
        row.seek.disabled = locked;
        row.fields.forEach(({ input, key, check, hint }) => {
          if (answers.has(key)) return;
          const enabled = idx === gateIndex;
          input.disabled = !enabled;
          check.disabled = hint.disabled = !enabled || !heardGate;
        });
      });
    };
    // Scroll only inside the transcript container, even if the learner had
    // manually scrolled earlier. Finishing a question is an explicit request
    // to advance; it takes priority over the usual 7-second scroll hold.
    showCue = idx => {
      if (seq !== generation || idx < 0 || idx >= items.length) return;
      manualScrollUntil = 0;
      const row = items[idx].item;
      const rowRect = row.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      list.scrollTop += rowRect.top - listRect.top - 8;
      if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].item.classList.remove('is-current');
      }
      activeIndex = idx;
      row.classList.add('is-current');
    };
    playCue = idx => {
      if (seq !== generation || idx < 0 || idx >= items.length) return;
      // Only teachers can preview future segments without unlocking their answers.
      // Students must still complete each line in order.
      if (!teacherPreview && gateIndex >= 0 && idx > gateIndex) return;
      playbackIndex = idx;
      waitingForAnswer = false;
      // YouTube seeks can be asynchronous, especially after long music gaps.
      // Don't mistake the previous timecode for an attempt to skip this cue.
      seekPendingUntil = Date.now() + 2800;
      try {
        adapter.pause();
        adapter.seek(items[idx].start);
        adapter.play();
        state.textContent = 'Đang nghe câu ' + (idx + 1) + '. Hết câu video sẽ tự dừng để bạn điền từ.';
      } catch (_) {
        playbackIndex = -1;
        state.textContent = 'Không phát lại được câu này. Hãy thử nút Nghe lại.';
      }
    };
    updateRowStates();

    // On opening a lesson, play from the very beginning. Non-graded dialogue
    // and music are part of the video and should not be skipped.
    if (gateIndex >= 0) showCue(gateIndex);
    state.textContent = gateIndex >= 0
      ? 'Video đang phát. Hết câu có ô trống, video sẽ dừng để bạn điền.'
      : 'Video đang phát. Bạn đã hoàn thành các ô trống, vẫn có thể nghe lại.';

    timer = setInterval(() => {
      if (seq !== generation) return;
      const t = Number(adapter.getTime());
      if (!Number.isFinite(t)) return;

      if (playbackIndex >= 0) {
        // The teacher/student explicitly chose a single line to replay.
        const index = playbackIndex;
        const cue = items[index];
        const outside = t < cue.start - 0.45 || t > cue.end + 0.25;
        const finished = !outside && t >= cue.end - 0.055;
        if ((outside && Date.now() >= seekPendingUntil) || finished) {
          try {
            adapter.pause();
            if (outside) adapter.seek(cue.start);
          } catch (_) {}
          playbackIndex = -1;
          if (index === gateIndex && finished && !outside) {
            heardGate = true;
            waitingForAnswer = true;
            resumeAt = cue.end;
            updateRowStates();
            showCue(gateIndex);
            state.textContent = 'Đã dừng. Điền từ rồi bấm Kiểm tra hoặc Gợi ý.';
          } else {
            state.textContent = waitingForAnswer
              ? 'Nghe lại câu có ô trống hoặc điền đáp án để tiếp tục.'
              : 'Đã nghe lại đoạn này. Nhấn phát để tiếp tục video.';
          }
        }
      } else if (gateIndex >= 0) {
        // Normal playback: allow everything from the video beginning through
        // the current graded sentence, including every non-graded cue and gap.
        const cue = items[gateIndex];
        if (waitingForAnswer) {
          // Learners must not bypass a question by restarting the player.
          if (adapter.isPlaying?.()) {
            try { adapter.pause(); } catch (_) {}
          }
        } else if (t >= cue.end - 0.055) {
          try {
            adapter.pause();
            if (t > cue.end + 0.25) adapter.seek(cue.end);
          } catch (_) {}
          heardGate = true;
          waitingForAnswer = true;
          resumeAt = cue.end;
          updateRowStates();
          showCue(gateIndex);
          state.textContent = 'Đã dừng. Điền từ rồi bấm Kiểm tra hoặc Gợi ý.';
        } else if (t >= cue.start && activeIndex !== gateIndex) {
          showCue(gateIndex);
        }
      }

      // Highlight the current exercise without moving the document or video.
      const current = playbackIndex >= 0 ? playbackIndex : gateIndex;
      if (current === activeIndex) return;
      if (activeIndex >= 0) items[activeIndex].item.classList.remove('is-current');
      activeIndex = current;
      if (current < 0) return;
      const row = items[current].item;
      row.classList.add('is-current');
      if (Date.now() <= manualScrollUntil) return;
      const rect = row.getBoundingClientRect();
      const view = list.getBoundingClientRect();
      if (rect.top < view.top + 8 || rect.bottom > view.bottom - 8)
        list.scrollTop += rect.top - view.top - 12;
    }, 100);
    // The gate and timer are ready before the first playback frame.
    // This also starts the YouTube iframe directly from the selected card.
    try { adapter.seek(0); adapter.play(); }
    catch (_) { state.textContent = 'Nhấn phát để bắt đầu video.'; }
  }

  // Shared watch layout for all saved and legacy film entries. A saved script
  // renders the same independent listening panel on desktop and mobile.
  async function openStandalone(lesson, wrap, teacherPreview = false) {
    stopPlayer();
    const seq = ++generation;
    wrap.replaceChildren();
    const parsed = providerOf(lesson.video_url);
    if (!parsed) {
      wrap.append($el('p', 'ldd-film-feedback', 'Link video không hợp lệ.'));
      return;
    }

    const hasScript = Array.isArray(lesson.segments) && lesson.segments.length > 0;
    const stage = $el('div', 'ldd-film-stage ldd-film-stage--video-only ldd-film-stage--with-transcript');
    stage.setAttribute('aria-label', 'Video và bài luyện nghe: ' + (lesson.title || 'Phim ảnh'));
    const screen = $el('div', 'ldd-film-screen');
    const captionPanel = $el('section', 'ldd-film-caption-panel');
    captionPanel.setAttribute('aria-label', 'Bài luyện nghe hoặc phụ đề của video');
    const state = $el('p', 'ldd-film-caption-state', 'Đang chuẩn bị bài luyện nghe…');
    captionPanel.append(state);
    stage.append(screen, captionPanel);
    wrap.append(stage);

    const emptyNote = message => {
      // An empty video has no answerable blanks. Never attempt server grading.
      if (seq !== generation) return;
      captionPanel.querySelector('.ldd-film-caption-empty')?.remove();
      captionPanel.classList.add('is-empty');
      const empty = $el('div', 'ldd-film-caption-empty');
      empty.append(
        $el('strong', 'ldd-film-caption-empty-title', 'Chưa có bài luyện nghe'),
        $el('p', 'ldd-film-caption-empty-desc', message ||
          'Giáo viên đang chuẩn bị script và bản dịch cho video này. Bạn vẫn có thể xem video.')
      );
      captionPanel.append(empty);
      state.textContent = 'Video chưa có bài luyện nghe.';
    };

    const showPlaybackError = message => {
      if (seq !== generation) return;
      state.classList.add('is-error');
      state.textContent = message;
    };

    const sizeCaptionPanel = () => {
      const height = screen.getBoundingClientRect().height;
      if (height > 0) captionPanel.style.setProperty('--ldd-film-video-height', Math.round(height) + 'px');
    };
    const observer = typeof ResizeObserver === 'function'
      ? new ResizeObserver(sizeCaptionPanel) : null;
    observer?.observe(screen);
    sizeCaptionPanel();

    let playerCleanup = () => {};
    const usePlayer = adapter => {
      playerCleanup = adapter.destroy;
      cleanup = () => { observer?.disconnect(); playerCleanup(); };
    };
    const fallbackVideo = () => {
      screen.replaceChildren();
      if (parsed.provider === 'mp4') {
        const video = $el('video', 'ldd-film-video');
        video.controls = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.autoplay = true;
        video.src = parsed.url;
        screen.append(video);
        video.play().catch(() => {
          // The native play control remains available if the browser blocks it.
          showPlaybackError('Trình duyệt yêu cầu chạm Phát để bắt đầu video.');
        });
        playerCleanup = () => { video.pause(); video.removeAttribute('src'); video.load(); };
      } else {
        const iframe = $el('iframe', 'ldd-film-video');
        iframe.title = lesson.title || 'Video';
        iframe.loading = 'eager';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.src = parsed.provider === 'youtube'
          ? 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(parsed.videoId) + '?rel=0&cc_load_policy=0&controls=0&fs=0&disablekb=1&iv_load_policy=3&playsinline=1'
          : 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(parsed.url) + '&show_text=false';
        screen.append(iframe);
        playerCleanup = () => { iframe.removeAttribute('src'); };
      }
      cleanup = () => { observer?.disconnect(); playerCleanup(); };
    };

    try {
      if (hasScript || parsed.provider === 'youtube') {
        const adapter = await makePlayer(screen, lesson, showPlaybackError);
        if (seq !== generation) { adapter.destroy(); observer?.disconnect(); return; }
        usePlayer(adapter);
        if (hasScript) {
          await renderCaptionExercise(lesson, captionPanel, adapter, seq, teacherPreview);
        } else {
          // A video without a graded script also starts on selection.
          adapter.play();
          // Source captions may be useful for video-only YouTube entries, but
          // must never be treated as graded exercises without a verified script.
          if (!client) {
            emptyNote();
          } else {
            try {
              const result = await client.functions.invoke('movie-caption-reader', {
                body: { videoId: parsed.videoId }
              });
              if (seq !== generation) return;
              if (result.error || result.data?.error) throw Error(
                result.data?.error || result.error?.message || 'Nguồn phụ đề chưa sẵn sàng.');
              const cues = Array.isArray(result.data?.segments) ? result.data.segments : [];
              const transcriptList = $el('ol', 'ldd-film-caption-list');
              transcriptList.tabIndex = 0;
              transcriptList.setAttribute('aria-label', 'Phụ đề tiếng Anh, cuộn độc lập với video');
              const rows = [];
              const stamp = n => Math.floor(n / 60) + ':' +
                String(Math.floor(n % 60)).padStart(2, '0');
              cues.forEach(cue => {
                const first = Number(cue.start);
                const last = Number(cue.end);
                if (!Number.isFinite(first) || !Number.isFinite(last) || last <= first ||
                    !String(cue.text || '').trim()) return;
                const item = $el('li', 'ldd-film-caption-item');
                const jump = button('', 'ldd-film-caption-jump');
                jump.append($el('time', 'ldd-film-caption-clock', stamp(first)),
                  $el('span', 'ldd-film-caption-text', String(cue.text)));
                jump.addEventListener('click', () => {
                  try { adapter.seek(first); adapter.play(); }
                  catch (_) { showPlaybackError('Không thể phát đoạn này.'); }
                });
                item.append(jump);
                transcriptList.append(item);
                rows.push({ start:first, end:last, jump });
              });
              if (!rows.length) throw Error('Chưa có phụ đề phù hợp.');
              captionPanel.append(transcriptList);
              state.textContent = 'Chạm vào một câu phụ đề để phát từ thời điểm đó.';
              let manualHoldUntil = 0;
              const hold = () => { manualHoldUntil = Date.now() + 7000; };
              transcriptList.addEventListener('wheel', hold, { passive:true });
              transcriptList.addEventListener('touchstart', hold, { passive:true });
              transcriptList.addEventListener('keydown', hold);
              let active = -1;
              timer = setInterval(() => {
                if (seq !== generation) return;
                const now = Number(adapter.getTime());
                if (!Number.isFinite(now)) return;
                const idx = rows.findIndex(row => now >= row.start && now <= row.end);
                if (idx === active) return;
                if (active >= 0) rows[active].jump.classList.remove('is-current');
                active = idx;
                if (idx < 0) return;
                rows[idx].jump.classList.add('is-current');
                if (Date.now() < manualHoldUntil) return;
                const rect = rows[idx].jump.getBoundingClientRect();
                const view = transcriptList.getBoundingClientRect();
                if (rect.top < view.top + 10 || rect.bottom > view.bottom - 10) {
                  transcriptList.scrollTop += rect.top - view.top - 10;
                }
              }, 350);
            } catch (_) {
              emptyNote('Giáo viên chưa thêm script và bản dịch cho video này. Bạn vẫn có thể xem video.');
            }
          }
        }
      } else {
        // Facebook/MP4 without a script should still be watchable and use the
        // same responsive two-column layout, without a nonfunctional quiz.
        fallbackVideo();
        emptyNote();
      }
    } catch (error) {
      if (seq !== generation) return;
      // The native/provider iframe fallback keeps playback available even
      // when an external player blocks the controls required for a quiz.
      fallbackVideo();
      showPlaybackError(hasScript
        ? 'Không thể đồng bộ bài luyện nghe với video: ' + (error.message || 'Lỗi trình phát') +
          '. Bạn vẫn có thể xem video.'
        : 'Không thể điều khiển video. Bạn vẫn có thể xem video.');
      if (!hasScript) emptyNote();
    }

    if (seq === generation) {
      (wrap.closest('#ldd-ent-movies-panel') || stage).scrollIntoView({
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
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
    // Preserve source indices: progress and grading are keyed by segment_index.
    // Non-spoken scene headings carry no blanks and must never be graded.
    const segments = check?.ok ? incoming : [];
    const exerciseIndices = segments.map((segment, i) => blanksIn(segment.text).length ? i : -1).filter(i => i >= 0);
    if (!exerciseIndices.length) {
      questionHeader.textContent = 'Xem video';
      questionBody.textContent = check?.ok
        ? 'Bài luyện nghe đang được chuẩn bị. Bạn vẫn có thể xem video.'
        : 'Script đang được kiểm tra lại. Video vẫn xem được; phần câu hỏi tạm khóa để tránh chấm sai.';
      progress.remove();
      try {
        const viewOnly = await makePlayer(screen, lesson, message => {
          feedback.textContent = message;
        });
        if (seq !== generation) {
          viewOnly.destroy();
          return;
        }
        cleanup = viewOnly.destroy;
      } catch (error) {
        feedback.textContent = 'Không thể tải video: ' + (error.message || 'Lỗi trình phát');
      }
      return;
    }
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
      const applicable = exerciseIndices.flatMap(i =>
        blanksIn(segments[i].text).map((_, j) => keyOf(i, j))
      );
      const currentAnswers = applicable.map(key => answers.get(key)).filter(Boolean);
      progress.textContent = currentAnswers.length + '/' + total + ' từ hoàn thành · ' +
        currentAnswers.reduce((n, a) => n + (Number(a.score_change) || 0), 0) + ' điểm';
      meter.max = total || 1;
      meter.value = currentAnswers.length;
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
      if (idx < 0 || idx >= segments.length || idx === active ||
          !blanksIn(segments[idx].text).length) return;
      active = idx;
      displayedIndex = idx;
      manualHold = true;
      try { adapter?.pause(); } catch (_) {}
      feedback.textContent = '';
      wrap.classList.add('ldd-film-paused');
      const questionTop = $el('div', 'ldd-film-question-top');
      questionTop.append(
        $el('span', 'ldd-film-question-count', 'Câu ' + (exerciseIndices.indexOf(idx) + 1) + ' / ' + exerciseIndices.length),
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
      const firstPending = exerciseIndices.find(i => !complete(i));
      questionAt(firstPending ?? exerciseIndices[0]);
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
        const index = displayedIndex >= 0 ? displayedIndex :
          (exerciseIndices.find(i => !complete(i)) ?? -1);
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
    const toggle = button('＋ Quản lý video / Đổi tên / Sửa script', 'ldd-film-editor-toggle');
    const form = $el('form', 'ldd-film-editor-form');
    form.hidden = true;
    const existing = $el('select');
    const fresh = $el('option', '', 'Thêm video mới (script có thể nhập sau)');
    fresh.value = '';
    existing.append(fresh);
    const editable = lessons || [];
    editable.forEach(m => {
      const option = $el('option', '', 'Chỉnh sửa: ' + m.title);
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
      'Có thể dùng transcript với timestamp từ YouTubeToTranscript. Những mốc chỉ có thời điểm bắt đầu vẫn cần đối chiếu lại với âm thanh.');
    const transcriptSite = $el('a', 'ldd-film-editor-help', 'Mở YouTubeToTranscript để sao chép transcript');
    const updateTranscriptSiteLink = () => {
      const info = providerOf(link.value.trim());
      transcriptSite.href = info?.provider === 'youtube'
        ? 'https://youtubetotranscript.com/transcript?current_language_code=en&v=' +
          encodeURIComponent(info.videoId)
        : 'https://youtubetotranscript.com/';
    };
    updateTranscriptSiteLink();
    link.addEventListener('input', updateTranscriptSiteLink);
    transcriptSite.target = '_blank';
    transcriptSite.rel = 'noopener noreferrer';
    const copiedTranscript = $el('textarea');
    copiedTranscript.rows = 5;
    copiedTranscript.placeholder = '[00:01] At four, we say, Mommy, I love you.\n[00:06] At fourteen, we say...';
    const copiedDuration = $el('input');
    copiedDuration.type = 'text';
    copiedDuration.placeholder = 'Thời lượng video (ví dụ 02:24)';
    const importTimestamp = button('Đọc timestamp và căn lại script', 'ldd-film-import');
    const preview = $el('p', 'ldd-film-editor-help');
    const verifiedRow = $el('label', 'ldd-film-editor-help');
    verifiedRow.style.display = 'block';
    const verifiedCheckbox = $el('input');
    verifiedCheckbox.type = 'checkbox';
    verifiedRow.append(verifiedCheckbox, document.createTextNode(
      ' Tôi đã nghe và đối chiếu trực tiếp TỪNG câu với âm thanh của video (không dựa vào mốc AI ước lượng).'
    ));
    let pendingAudioReview = false;
    const save = button('Lưu video / script', 'ldd-film-save');
    save.type = 'submit';
    const saveDraft = button('Lưu bản nháp', 'ldd-film-save');
    saveDraft.hidden = true;
    const renameSave = button('Lưu tên', 'ldd-film-save ldd-film-rename-save');
    renameSave.type = 'button';
    renameSave.hidden = true;
    const titleRow = $el('div', 'ldd-film-title-row');
    titleRow.append(title, renameSave);
    const titleNotice = $el('p', 'ldd-film-title-status');
    titleNotice.setAttribute('role', 'status');
    titleNotice.setAttribute('aria-live', 'polite');
    const scriptDetails = $el('details', 'ldd-film-script-details');
    scriptDetails.open = true;
    const scriptSummary = $el('summary', 'ldd-film-script-summary',
      'Chỉnh sửa link, script và bản dịch (nâng cao)');
    const scriptFields = $el('div', 'ldd-film-script-fields');
    title.addEventListener('keydown', event => {
      if (event.key === 'Enter' && existing.value) {
        event.preventDefault();
        renameSave.click();
      }
    });
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
      const t = translations.value.trim() ? translations.value.replace(/\r/g, '').split(/\n/).map(x => x.trim()) : [];
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
      verifiedCheckbox.checked = false;
      verifiedRow.style.display = 'block';
      pendingAudioReview = false;
      titleNotice.textContent = '';
      title.value = selected?.title || '';
      // Renaming never needs the lengthy script editor.
      scriptDetails.open = !selected;
      link.value = selected?.video_url || '';
      updateTranscriptSiteLink();
      copiedDuration.value = '';
      const rememberedDuration = knownDurations.get(providerOf(link.value)?.url);
      if (rememberedDuration) {
        const mm = Math.floor(rememberedDuration / 60);
        const ss = Math.floor(rememberedDuration % 60);
        copiedDuration.value = mm + ':' + String(ss).padStart(2, '0');
      }
      title.readOnly = false;
      renameSave.hidden = !selected;
      link.readOnly = Boolean(selected);
      save.textContent = selected ? 'Xuất bản script đã kiểm chứng' : 'Lưu video / script';
      saveDraft.hidden = !selected;
      notice.textContent = '';
      noticePreview();
      if (!selected) return;
      save.disabled = true;
      notice.textContent = 'Đang tải mốc thời gian gốc…';
      try {
        const { data, error } = await client.from('movie_lessons')
          .select('segments,draft_segments').eq('id', Number(selectedId)).single();
        if (error) throw error;
        if (existing.value !== selectedId) return;
        const publishedCues = Array.isArray(data?.segments) ? data.segments : [];
        const savedCues = Array.isArray(data?.draft_segments) ? data.draft_segments : [];
        pendingAudioReview = savedCues.length > 0;
        verifiedRow.style.display = 'block';
        verifiedCheckbox.checked = false;
        // Editing always starts from the latest draft; students continue to use published segments.
        const cues = savedCues.length ? savedCues : publishedCues;
        captions.value = cues.map((s, i) =>
          (i + 1) + '\n' + toSrtTime(Number(s.start)) + ' --> ' +
          toSrtTime(Number(s.end)) + '\n' + String(s.text || '')
        ).join('\n\n');
        translations.value = cues.map(s => String(s.translation_vi || '')).join('\n');
        noticePreview();
        notice.textContent = pendingAudioReview
          ? 'BẢN NHÁP CHƯA XÁC MINH: Đã tải ' + cues.length +
            ' câu từ bản gộp. Mốc kết thúc chỉ là dự kiến; cần đối chiếu từng câu với âm thanh trước khi xuất bản. Bài và điểm học viên hiện tại không thay đổi.'
          : 'Đã tải ' + cues.length + ' câu; có thể sửa thời gian rồi lưu.';
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
    importTimestamp.addEventListener('click', () => {
      const parsed = filmTiming?.parseTimestampedTranscript(
        copiedTranscript.value, copiedDuration.value
      );
      if (!parsed || parsed.errors.length) {
        notice.textContent = 'Không thể nhập timestamp: ' +
          (parsed?.errors || ['Bộ đọc transcript chưa tải.']).join(' ');
        return;
      }
      const existingCues = parseSubtitles(captions.value, true);
      const sourceCues = parsed.segments;
      const normalize = line => String(line || '').toLowerCase()
        .replace(/\\{([^{}]+)\\}/g, '$1')
        .replace(/[^a-z0-9]+/g, ' ').trim();
      let nextCues;
      if (existing.value && existingCues.length) {
        if (sourceCues.length !== existingCues.length) {
          notice.textContent = 'Transcript gốc có ' + sourceCues.length +
            ' đoạn, bản nháp có ' + existingCues.length +
            ' câu. Không thể gán mốc theo số thứ tự vì sẽ lệch lời thoại. ' +
            'Cần đối chiếu và tách/gộp các đoạn theo từng câu trước khi nhập.';
          return;
        }
        const mismatched = sourceCues.map((line, i) => {
          const a = normalize(line.text).split(' ').filter(Boolean);
          const b = new Set(normalize(existingCues[i].text).split(' ').filter(Boolean));
          const overlap = a.filter(word => b.has(word)).length / Math.max(1, a.length);
          return overlap < 0.65 ? i + 1 : null;
        }).filter(Boolean);
        if (mismatched.length) {
          notice.textContent = 'Không áp mốc: lời thoại không khớp tại câu ' +
            mismatched.slice(0, 12).join(', ') +
            '. Cần đối chiếu lại transcript và thứ tự câu, không tự căn bằng cách đoán.';
          return;
        }
        nextCues = existingCues.map((cue, i) => ({
          ...cue, start: sourceCues[i].start, end: sourceCues[i].end
        }));
      } else {
        nextCues = sourceCues.map(cue => ({
          ...cue, text: markBlank(cue.text)
        }));
        if (translations.value.trim()) {
          notice.textContent = 'Không thay script mới khi đang có bản dịch chưa ghép câu. Hãy đối chiếu trước.';
          return;
        }
      }
      const quality = filmTiming?.check(nextCues, {
        duration: filmTiming.parseClock(copiedDuration.value)
      });
      if (!quality?.ok) {
        notice.textContent = 'Transcript chưa thể áp dụng: ' + (quality?.errors || []).join(' ');
        return;
      }
      captions.value = nextCues.map((cue, i) =>
        (i + 1) + '\n' + toSrtTime(cue.start) + ' --> ' +
        toSrtTime(cue.end) + '\n' + cue.text
      ).join('\n\n');
      generated = null;
      generatedCaption = '';
      generatedTranslation = '';
      verifiedCheckbox.checked = false;
      noticePreview();
      notice.textContent = 'Đã ghép ' + nextCues.length +
        ' đoạn theo timestamp sao chép. Đây chưa phải xác nhận âm thanh: hãy nghe từng câu trước khi lưu. ' +
        parsed.warnings.join(' ');
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
    saveDraft.addEventListener('click', async () => {
      const selectedId = Number(existing.value);
      const info = providerOf(link.value.trim());
      if (!selectedId || !info) {
        notice.textContent = 'Chọn video đã lưu để chỉnh sửa bản nháp.';
        return;
      }
      const segments = parseSubtitles(captions.value, true);
      if (!segments.length || (captions.value.match(/-->/g) || []).length !== segments.length) {
        notice.textContent = 'Bản nháp có câu thiếu timestamp hoặc sai định dạng SRT/VTT.';
        return;
      }
      const translated = translations.value.trim()
        ? translations.value.replace(/\\r/g, '').split(/\\n/).map(x => x.trim())
        : [];
      if (translated.length && translated.length !== segments.length) {
        notice.textContent = 'Số dòng dịch phải bằng số câu trong script: ' + segments.length + '.';
        return;
      }
      const nextDraft = segments.map((segment, i) => ({
        ...segment, ...(translated.length ? { translation_vi: translated[i] } : {})
      }));
      const checked = filmTiming?.check(nextDraft, { duration: knownDurations.get(info.url) });
      if (!checked?.ok) {
        notice.textContent = 'Chưa lưu bản nháp: ' + (checked?.errors || ['Lỗi kiểm tra mốc.']).join(' ');
        return;
      }
      saveDraft.disabled = true;
      notice.textContent = 'Đang lưu bản nháp…';
      try {
        const { data: auth, error: userError } = await client.auth.getUser();
        if (userError || String(auth?.user?.email || '').toLowerCase() !== TEACHER)
          throw Error('Chỉ giáo viên được chỉnh sửa bản nháp.');
        const { data, error } = await client.from('movie_lessons')
          .update({ draft_segments: nextDraft })
          .eq('id', selectedId).eq('video_url', info.url).select('id').single();
        if (error || !data) throw error || Error('Không tìm thấy bài học để cập nhật.');
        pendingAudioReview = true;
        verifiedCheckbox.checked = false;
        notice.textContent = 'Đã lưu ' + nextDraft.length +
          ' câu vào bản nháp. Học viên vẫn dùng script đã xuất bản; cần nghe kiểm tra từng câu trước khi phát hành.' +
          (checked.warnings.length ? ' Lưu ý: ' + checked.warnings.join(' ') : '');
      } catch (error) {
        notice.textContent = 'Không lưu được bản nháp: ' + (error.message || 'Lỗi kết nối');
      } finally {
        saveDraft.disabled = false;
      }
    });
    // Renaming is intentionally separate from script publishing: it must not
    // rewrite captions, clear draft work, or affect any student's answers.
    renameSave.addEventListener('click', async () => {
      const selected = editable.find(item => String(item.id) === existing.value);
      if (!selected) {
        titleNotice.textContent = 'Hãy chọn một video đã đăng.';
        return;
      }
      const nextTitle = title.value.replace(/\s+/g, ' ').trim();
      if (!nextTitle || nextTitle.length > 160) {
        titleNotice.textContent = 'Tên video phải có từ 1 đến 160 ký tự.';
        title.focus();
        return;
      }
      if (nextTitle === selected.title) {
        titleNotice.textContent = 'Tên video không thay đổi.';
        return;
      }
      renameSave.disabled = true;
      titleNotice.textContent = 'Đang lưu tên video…';
      try {
        const { data: auth, error: authError } = await client.auth.getUser();
        if (authError || String(auth?.user?.email || '').toLowerCase() !== TEACHER)
          throw Error('Chỉ giáo viên được đổi tên video.');
        const { data, error } = await client.from('movie_lessons')
          .update({ title: nextTitle })
          .eq('id', Number(selected.id))
          .eq('video_url', selected.video_url)
          .select('id,title').single();
        if (error || !data) throw error || Error('Không tìm thấy video để đổi tên.');
        title.value = data.title;
        selected.title = data.title;
        existing.selectedOptions[0].textContent = 'Chỉnh sửa: ' + data.title;
        // Update both library and recommendation cards immediately.
        const panel = wrap.closest('#ldd-ent-movies-panel');
        if (panel) {
          panel.querySelectorAll('[data-film-id="' + String(selected.id) + '"] .ldd-film-card-title, ' +
            '[data-film-id="' + String(selected.id) + '"] .ldd-film-rec-title')
            .forEach(node => { node.textContent = data.title; });
        }
        titleNotice.textContent = '✓ Đã lưu tên mới. Script và tiến độ học viên giữ nguyên.';
      } catch (error) {
        titleNotice.textContent = 'Không đổi được tên: ' + (error.message || 'Lỗi kết nối');
      } finally {
        renameSave.disabled = false;
      }
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
        ? translations.value.replace(/\r/g, '').split(/\n/).map(x => x.trim())
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
      if (withTranslations.length && !verifiedCheckbox.checked) {
        notice.textContent = 'Chưa thể đăng script: cần nghe và đối chiếu TỪNG câu với âm thanh thực tế, sau đó xác nhận. Mốc thời gian có thứ tự không đồng nghĩa đã đồng bộ.';
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
          ? await client.from('movie_lessons').update({ title: title.value.trim(), segments: withTranslations })
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
      'Với video đã đăng, bạn có thể đổi tên riêng bằng nút “Lưu tên video”; không cần kiểm tra lại script. Link, thumbnail và bài làm học viên được giữ nguyên.');
    const titleLabel = $el('label', '', 'Tên video');
    title.id = 'ldd-film-title-field';
    titleLabel.htmlFor = title.id;
    scriptFields.append(
      $el('label', '', 'Đường dẫn video'), link,
      generate,
      transcriptSite,
      $el('label', '', 'Transcript đã bật Copy Timestamp ON'), copiedTranscript,
      $el('label', '', 'Thời lượng của video'), copiedDuration, importTimestamp,
      $el('label', '', 'Script tiếng Anh (SRT/VTT)'), upload, captions,
      $el('label', '', 'Bản dịch tiếng Việt (mỗi câu một dòng)'), translationUpload, translations,
      sample, description, preview, timingConfirmRow, verifiedRow, saveDraft, save, notice
    );
    scriptDetails.append(scriptSummary, scriptFields);
    form.append(
      $el('label', '', 'Chọn video / thao tác'), existing,
      titleLabel, titleRow, titleNotice, scriptDetails
    );
    wrap.append(toggle, form);
    return {
      openFor(lessonId, focusTitle = false) {
        const selectedId = String(lessonId);
        if (!editable.some(item => String(item.id) === selectedId)) return false;
        form.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        existing.value = selectedId;
        // Fetch the stored subtitles and translations before enabling Save.
        existing.dispatchEvent(new Event('change'));
        scriptDetails.open = !focusTitle;
        wrap.scrollIntoView({
          behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
        const focusTarget = focusTitle ? title : existing;
        focusTarget.focus({ preventScroll: true });
        if (focusTitle) title.select();
        return true;
      }
    };
  }

  window.LDDFilmCloze = { mount, close, parseSubtitles, providerOf };
})();
