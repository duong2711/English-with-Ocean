/* LDD English — Azure pronunciation assessment (sentence translation only).
   No Azure key in browser. If F0 is absent/exhausted, the original Cloudflare path is unchanged. */
(() => {
  'use strict';
  if (window.__lddAzureSentenceBridge) return;
  window.__lddAzureSentenceBridge = true;

  const EDGE = 'https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/azure-pronounce-sentence';
  const CLOUD_MARKER = '/functions/v1/cloudflare-pronounce-score';
  const originalFetch = window.fetch.bind(window);
  let enabled = false, statusExpires = 0;
  const failover = (ms = 60000) => { enabled = false; statusExpires = Date.now() + ms; };

  function bytesFromBase64(input) {
    const s = String(input || '').replace(/^data:[^,]+,/, '');
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function base64FromBytes(bytes) {
    const pieces = [];
    for (let i = 0; i < bytes.length; i += 8192)
      pieces.push(String.fromCharCode(...bytes.subarray(i, i+8192)));
    return btoa(pieces.join(''));
  }
  async function wav16kMonoFromBase64(recordingBase64) {
    const source = bytesFromBase64(recordingBase64);
    if (source.byteLength < 200 || source.byteLength > 3_000_000) throw new Error('Invalid recording size');
    const Audio = window.AudioContext || window.webkitAudioContext;
    const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!Audio || !Offline) throw new Error('Browser lacks audio decoding');
    const context = new Audio();
    let decoded;
    try {
      const arr = source.buffer.slice(source.byteOffset, source.byteOffset+source.byteLength);
      decoded = await context.decodeAudioData(arr);
    } finally { await context.close().catch(() => {}); }
    if (!decoded || !Number.isFinite(decoded.duration) || decoded.duration < .35 || decoded.duration > 25)
      throw new Error('Recording exceeds sentence limit');
    const count = Math.ceil(decoded.duration * 16000);
    const offline = new Offline(1, count, 16000);
    const node = offline.createBufferSource();
    node.buffer = decoded;
    node.connect(offline.destination);
    node.start();
    const rendered = await offline.startRendering();
    const samples = rendered.getChannelData(0);
    const wav = new Uint8Array(44 + samples.length*2);
    const view = new DataView(wav.buffer);
    function putString(offset, str) { for(let i=0;i<str.length;i++) wav[offset+i] = str.charCodeAt(i); }
    putString(0, 'RIFF'); view.setUint32(4, wav.length-8,true);
    putString(8,'WAVE'); putString(12,'fmt ');
    view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,1,true);
    view.setUint32(24,16000,true); view.setUint32(28,32000,true);
    view.setUint16(32,2,true); view.setUint16(34,16,true);
    putString(36,'data'); view.setUint32(40,samples.length*2,true);
    for(let i=0;i<samples.length;i++) {
      const sample = Math.max(-1,Math.min(1,samples[i]));
      view.setInt16(44+i*2, sample < 0 ? sample*32768 : sample*32767, true);
    }
    return base64FromBytes(wav);
  }
  async function isActive(headers) {
    if (Date.now() < statusExpires) return enabled;
    try {
      const res = await originalFetch(EDGE, {method:'GET',headers,cache:'no-store'});
      if (!res.ok) { failover(); return false; }
      const data = await res.json();
      enabled = data && data.enabled === true;
      statusExpires = Date.now() + (enabled ? 300000 : 60000);
      return enabled;
    } catch (_) { failover(); return false; }
  }
  async function route(input, init, body) {
    const headers = new Headers(init && init.headers ? init.headers : input instanceof Request ? input.headers : {});
    if (!await isActive(headers)) return originalFetch(input,init);
    try {
      const audio = await wav16kMonoFromBase64(body.audio);
      const response = await originalFetch(EDGE, {
        method:'POST', headers, body:JSON.stringify({word:body.word,mode:'sentence',audio})
      });
      if (response.ok) {
        const clone = response.clone();
        clone.json().then(data => {
          window.LDDAzureLastSentencePronunciation = data;
          document.dispatchEvent(new CustomEvent('ldd:azure-sentence-graded',{detail:data}));
        }).catch(()=>{});
        return response;
      }
      if (response.status === 422) return response; // real uncertain recording: ask for retry
      if (response.status === 401) { failover(); return originalFetch(input,init); }
      if (response.status === 429) failover(30*60*1000);
      else failover();
    } catch (error) {
      console.warn('[LDD Azure sentence] Local encoding failed; using existing Whisper:',String(error));
      failover();
    }
    return originalFetch(input,init);
  }
  window.fetch = function (input,init) {
    const url = typeof input === 'string' ? input : input && input.url || '';
    if (!url.includes(CLOUD_MARKER)) return originalFetch(input,init);
    let body = null;
    try {
      if (typeof init?.body === 'string') body = JSON.parse(init.body);
    } catch (_) {}
    if (body?.mode !== 'sentence' || typeof body.audio !== 'string' || typeof body.word !== 'string')
      return originalFetch(input,init);
    return route(input,init,body);
  };
  window.LDDAzureSentenceBridge = {version:'1.0',isEnabled:()=>enabled};
})();
