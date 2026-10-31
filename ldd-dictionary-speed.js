/* LDD English — fast contextual dictionary lookup v1.
   Reuses the existing AI popup, pronunciation gate and vocabulary saver.
   Only intercepts authenticated dictionary requests, never other AI tasks. */
(function () {
  'use strict';
  if (window.__lddFastDictionaryV1) return;
  window.__lddFastDictionaryV1 = true;

  var nativeFetch = window.fetch.bind(window);
  var endpoint = '/functions/v1/ai-proxy';
  var prefix = 'Bạn là từ điển Anh-Việt dành cho học viên Việt Nam mới bắt đầu học tiếng Anh.';
  var wordMarker = 'Học viên muốn tra từ hoặc cụm từ "';
  var contextMarker = '" trong ngữ cảnh tiếng Anh sau: "';
  var memory = new Map();
  var inflight = new Map();
  var maxEntries = 180;
  var ttlMs = 30 * 24 * 60 * 60 * 1000;
  var version = 'ldd-dictionary-v1:';

  function norm(v) { return String(v || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function readPrompt(prompt) {
    if (typeof prompt !== 'string' || !prompt.startsWith(prefix) ||
        !prompt.includes('Chỉ trả lời bằng JSON hợp lệ, không thêm chữ nào khác, đúng định dạng:')) return null;
    var start = prompt.indexOf(wordMarker, prefix.length);
    if (start < 0) return null;
    start += wordMarker.length;
    var end = prompt.indexOf(contextMarker, start);
    if (end < 0) return null;
    var word = prompt.slice(start, end);
    var contextStart = end + contextMarker.length;
    var contextEnd = prompt.indexOf('". ', contextStart);
    if (contextEnd < 0) return null;
    var context = prompt.slice(contextStart, contextEnd);
    if (!word || !context || word.length > 100 || context.length > 1600) return null;
    return { word: norm(word), context: norm(context), strict: prompt.includes('Hãy kiểm tra nghiêm ngặt') };
  }

  // Existing textbook data already loads before this enhancement.
  var grades = [
    typeof GRADE1_UNITS !== 'undefined' ? GRADE1_UNITS : [],
    typeof GRADE2_UNITS !== 'undefined' ? GRADE2_UNITS : [],
    typeof GRADE3_UNITS !== 'undefined' ? GRADE3_UNITS : [],
    typeof GRADE4_UNITS !== 'undefined' ? GRADE4_UNITS : [],
    typeof GRADE5_UNITS !== 'undefined' ? GRADE5_UNITS : [],
    typeof GRADE6_UNITS !== 'undefined' ? GRADE6_UNITS : [],
    typeof GRADE7_UNITS !== 'undefined' ? GRADE7_UNITS : [],
    typeof GRADE8_UNITS !== 'undefined' ? GRADE8_UNITS : [],
    typeof GRADE9_UNITS !== 'undefined' ? GRADE9_UNITS : [],
    typeof GRADE10_UNITS !== 'undefined' ? GRADE10_UNITS : [],
    typeof GRADE11_UNITS !== 'undefined' ? GRADE11_UNITS : [],
    typeof GRADE12_UNITS !== 'undefined' ? GRADE12_UNITS : []
  ];
  var lexicon = new Map();
  grades.forEach(function (units) {
    if (!Array.isArray(units)) return;
    units.forEach(function (unit) {
      (Array.isArray(unit.words) ? unit.words : []).forEach(function (w) {
        var key = norm(w.en);
        var vi = String(w.vi || '').trim();
        if (!/^[a-z]+(?:['’-][a-z]+)*(?: [a-z]+(?:['’-][a-z]+)*)*$/.test(key) ||
            !vi || vi.length > 120) return;
        var old = lexicon.get(key);
        if (!old) {
          lexicon.set(key, { vi: vi, ipa: String(w.ipa || '').replace(/^\/|\/$/g, ''),
            exampleEn: String(w.ex || ''), exampleVi: String(w.trVi || ''), ambiguous: false });
        } else if (norm(old.vi) !== norm(vi)) {
          old.ambiguous = true;
        }
      });
    });
  });
  grades.length = 0;

  // Allow instant final results only for carefully selected unambiguous nouns.
  // Other textbook entries are a clearly labelled preview while contextual AI runs.
  var safeNouns = new Set([
    'apple','banana','elephant','giraffe','butterfly','penguin','tiger','lion',
    'teacher','student','classroom','homework','dictionary','hospital',
    'museum','airport','restaurant','library','bedroom','bathroom','kitchen',
    'computer','keyboard','refrigerator','television','umbrella','backpack',
    'bicycle','motorcycle','football','basketball','volleyball','badminton',
    'mountain','island','river','ocean','planet','moon','sunflower','sandwich',
    'breakfast','lunch','dinner','pencil','eraser','notebook','raincoat',
    'uniform','neighbourhood','neighborhood','supermarket','playground',
    'grandmother','grandfather','daughter','son','toothbrush','headache',
    'toothache','headphones','newspaper','magazine','waterfall','snowman',
    'desert','aquarium','dolphin','whale','octopus'
  ]);

  function preview(info) {
    var entry = lexicon.get(info.word);
    if (!entry || entry.ambiguous) return;
    var displayedWord = document.getElementById('word-lookup-word');
    var loading = document.querySelector('#word-lookup-body .word-lookup-loading');
    if (!loading || !displayedWord || norm(displayedWord.textContent) !== info.word) return;
    // This is only a provisional school-book gloss, NOT a contextual answer.
    loading.textContent = '📘 Nghĩa thường gặp trong SGK: ' + entry.vi +
      ' — đang kiểm tra nghĩa phù hợp với ngữ cảnh…';
  }

  function validate(value) {
    return !!(value && value.found === true &&
      typeof value.meaning === 'string' && value.meaning.trim() &&
      typeof value.wordType === 'string' && value.wordType.trim() &&
      value.meaning.length <= 1200 && value.wordType.length <= 200);
  }

  function userFromHeaders(headers) {
    try {
      var bearer = new Headers(headers || {}).get('authorization') || '';
      var token = bearer.replace(/^Bearer\s+/i, '');
      var parts = token.split('.');
      if (parts.length !== 3) return null;
      var payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (!/^[0-9a-f-]{36}$/i.test(payload.sub || '')) return null;
      if (!Number.isFinite(payload.exp) || payload.exp <= Date.now() / 1000 + 10) return null;
      return payload.sub;
    } catch (_) { return null; }
  }

  async function hashedKey(user, prompt) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) return null;
    var data = new TextEncoder().encode(prompt);
    var bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
    return version + user + ':' +
      Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  function saved(key) {
    if (memory.has(key)) return memory.get(key);
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      var item = JSON.parse(raw);
      if (!item || !validate(item.result) || !Number.isFinite(item.at) ||
          Date.now() - item.at > ttlMs) {
        localStorage.removeItem(key);
        return null;
      }
      memory.set(key, item.result);
      return item.result;
    } catch (_) { return null; }
  }

  function remember(key, result) {
    if (!validate(result)) return;
    memory.set(key, result);
    if (memory.size > maxEntries) memory.delete(memory.keys().next().value);
    try {
      localStorage.setItem(key, JSON.stringify({ at: Date.now(), result: result }));
      // Keep bounded storage, without inspecting or storing raw lesson text.
      var namespace = key.slice(0, key.lastIndexOf(':') + 1);
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.startsWith(namespace)) {
          var row = JSON.parse(localStorage.getItem(k) || '{}');
          keys.push({ key: k, at: Number(row.at) || 0 });
        }
      }
      keys.sort(function (a,b) { return b.at-a.at; });
      keys.slice(maxEntries).forEach(function (item) { localStorage.removeItem(item.key); });
    } catch (_) { /* quota or private browsing: RAM cache remains available */ }
  }

  function response(result, provider) {
    return new Response(JSON.stringify({ result: result, provider: provider, cached: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  window.fetch = async function (input, init) {
    var url = typeof input === 'string' ? input : '';
    if (!url.includes(endpoint) || !init || init.method !== 'POST' ||
        typeof init.body !== 'string') return nativeFetch(input, init);

    var prompt;
    try { prompt = JSON.parse(init.body).prompt; } catch (_) { return nativeFetch(input, init); }
    var query = readPrompt(prompt);
    if (!query) return nativeFetch(input, init);
    var user = userFromHeaders(init.headers);
    if (!user) return nativeFetch(input, init);

    // Fast provisional gloss from the existing curriculum, never overrides
    // the model's interpretation of a word within a different sentence.
    preview(query);

    // No-context search: highly conservative, curriculum-backed noun lookup.
    if (query.word === query.context && safeNouns.has(query.word)) {
      var entry = lexicon.get(query.word);
      if (entry && !entry.ambiguous) {
        return response({
          found: true,
          phonetic: entry.ipa,
          wordType: 'Danh từ',
          meaning: entry.vi,
          usage: 'Nghĩa thông dụng trong chương trình tiếng Anh.',
          exampleEn: entry.exampleEn,
          exampleVi: entry.exampleVi
        }, 'TextbookLexicon');
      }
    }

    var key;
    try { key = await hashedKey(user, prompt); } catch (_) { key = null; }
    if (!key) return nativeFetch(input, init);
    var cached = saved(key);
    if (cached) return response(cached, 'BrowserDictionaryCache');

    if (inflight.has(key)) return (await inflight.get(key)).clone();
    var task = nativeFetch(input, init).then(async function (res) {
      if (res.ok) {
        try {
          var data = await res.clone().json();
          if (data && validate(data.result)) remember(key, data.result);
        } catch (_) { /* never alter an original server response */ }
      }
      return res;
    });
    inflight.set(key, task);
    try { return (await task).clone(); }
    finally { inflight.delete(key); }
  };

  // Diagnostic counters for browser console; no prompts or personal data logged.
  window.lddDictionarySpeed = { textbookEntries: lexicon.size, cacheVersion: 'v1' };
})();