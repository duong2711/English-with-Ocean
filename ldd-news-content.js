/* LDD English — canonical news content cleaner.
 * The stored article may include editorial metadata for attribution/word lists.
 * Only meaningful article paragraphs are ever used for translation practice.
 * Safe to call repeatedly: no content changes when already normalized. */
(function(){
  'use strict';
  if(window.LDDNewsContent)return;

  const FOOTER=/^(?:sources?|references?|further reading|read more|related articles?|external links?|photo(?:graph)?\s*(?:credits?|by)|image\s*(?:credits?|source)|picture\s*(?:credits?|source)|credits?|attribution|subscribe|advertisement|quảng cáo)\s*[:：]|^(?:ảnh|hình)(?:\s+[^:：]{0,140})?\s*[:：]|^(?:©|copyright\b)/iu;
  const GLOSSARY=/^(?:difficult\s+words?|hard\s+words?|vocabulary\s*(?:list)?|từ\s+khó)\s*[:：]/iu;
  const CLUTTER=/^(?:share\s+this|follow\s+us|back\s+to\s+top|more\s+news|click\s+here|watch\s+the\s+video|listen\s+to\s+the\s+audio)(?:\s*[:：.!]|$)/iu;
  const MAX_META=16000;

  function normalizeText(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function listWords(text){
    return String(text||'').replace(GLOSSARY,'').replace(/[.;\s]+$/,'').split(/\s*;\s*/)
      .map(piece=>{
        const m=piece.trim().match(/^(.+?)\s*\(([^()]+)\)\s*\.?$/);
        return m?{word:normalizeText(m[1]),meaning:normalizeText(m[2])}:null;
      }).filter(x=>x&&x.word&&x.meaning);
  }
  function mergeMeta(base,next){
    if(!next||typeof next!=='object'||Array.isArray(next))return base;
    for(const [k,v] of Object.entries(next)){
      if(v==null||v==='')continue;
      if(k==='difficultWords'){
        if(Array.isArray(v)&&v.length)base.difficultWords=v;
      }else if(!Object.prototype.hasOwnProperty.call(base,k)||!base[k])base[k]=v;
    }
    return base;
  }
  function unpack(el){
    try{return JSON.parse(decodeURIComponent(el.getAttribute('data-meta')||''));}
    catch(_){return null;}
  }
  function clean(html){
    const container=document.createElement('div');
    container.innerHTML=String(html||'');
    const meta={};
    container.querySelectorAll('.ldd-news-meta-anchor[data-meta]').forEach(el=>{
      mergeMeta(meta,unpack(el));el.remove();
    });

    // Remove non-article HTML rather than hiding it with CSS: it must not
    // reach the text-to-sentences pipeline or student word-tap handlers.
    container.querySelectorAll('script,style,iframe,noscript,svg,canvas,form,nav,[data-news-no-translate],.ldd-news-nontranslate-meta').forEach(el=>el.remove());
    const candidates=Array.from(container.querySelectorAll('p,figcaption,details,small,aside,footer,div,li,h4,h5,h6'));
    for(const el of candidates){
      if(!el.isConnected||!container.contains(el))continue;
      if(el.matches('.ldd-news-image-attribution,figcaption,footer,[class*="image-credit"],[class*="photo-credit"],[class*="caption"]')){
        const credit=normalizeText(el.textContent);
        if(credit&&!meta.imageCredit)meta.imageCredit=credit;
        el.remove();continue;
      }
      // A wrapper containing genuine paragraphs is not itself a footer.
      if(el.matches('div,aside')&&el.querySelector('p,li'))continue;
      const value=normalizeText(el.textContent);
      if(!value)continue;
      if(GLOSSARY.test(value)){
        if(!Array.isArray(meta.difficultWords)||!meta.difficultWords.length)
          meta.difficultWords=listWords(value);
        el.remove();continue;
      }
      const hasMedia=!!el.querySelector('a[href],small');
      if(FOOTER.test(value)||CLUTTER.test(value)){
        if(/^sources?\s*[:：]/iu.test(value)&&!meta.editorialSources)meta.editorialSources=value.slice(0,1500);
        else if((/^\s*(?:ảnh|hình|image|photo|picture|credit)/iu.test(value)||hasMedia)&&!meta.imageCredit)
          meta.imageCredit=value.slice(0,1500);
        el.remove();continue;
      }
      // Some older articles have a standalone small credit with no colon.
      if(el.matches('small')&&/wikimedia|commons|creative\s+commons|cc\s+by|public\s+domain|ảnh\s+minh\s+họa/iu.test(value)){
        if(!meta.imageCredit)meta.imageCredit=value.slice(0,1500);
        const parent=el.parentElement;
        el.remove();
        if(parent&&parent.matches('p')&&!normalizeText(parent.textContent))parent.remove();
      }
    }
    container.querySelectorAll('p,div').forEach(el=>{
      if(!el.querySelector('img,video,figure,br')&&!normalizeText(el.textContent))el.remove();
    });
    if(Object.keys(meta).length){
      const anchor=document.createElement('span');
      anchor.className='ldd-news-meta-anchor';
      anchor.setAttribute('aria-hidden','true');
      anchor.setAttribute('data-meta',encodeURIComponent(JSON.stringify(meta).slice(0,MAX_META)));
      container.appendChild(anchor);
    }
    return container.innerHTML.trim();
  }
  function toPlainText(html){
    const node=document.createElement('div');
    node.innerHTML=clean(html);
    node.querySelectorAll('.ldd-news-meta-anchor,[aria-hidden="true"],[hidden],script,style,figure,figcaption,[data-news-no-translate]').forEach(el=>el.remove());
    // Preserve paragraph boundaries so words from unrelated blocks do not run together.
    node.querySelectorAll('p,div,li,blockquote,h1,h2,h3,br').forEach(el=>{
      if(el.parentNode)el.after(document.createTextNode(' '));
    });
    return normalizeText(node.textContent);
  }
  window.LDDNewsContent={clean,toPlainText,listWords};
})();
