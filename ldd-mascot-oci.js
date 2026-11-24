/* Oci dolphin mascot. Image is a tiny self-contained transparent WebP (5 KB),
   so displaying it never opens an extra network connection. */
(function () {
    'use strict';
    if (window.__LDDMascotOci) return;
    window.__LDDMascotOci = true;
    const image = 'data:image/webp;base64,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';
    // Three grounded recommendations only: unread news, unplayed podcast, IPA.
    // The dashboard sends minimal authenticated progress via ldd:oci-candidates.
    const IPA = [
        { sounds: ['/ɪ/', '/iː/'], keys: ['i', 'i:'], words: ['live', 'leave'], hint: 'Cùng nghe sự khác nhau giữa âm ngắn và âm dài.' },
        { sounds: ['/ʊ/', '/uː/'], keys: ['u', 'u:'], words: ['put', 'pool'], hint: 'Hai âm này đều tròn môi, nhưng không giống nhau.' },
        { sounds: ['/e/', '/æ/'], keys: ['e', 'æ'], words: ['pen', 'pan'], hint: 'Bạn có mở miệng đủ rộng cho /æ/ không?' },
        { sounds: ['/s/', '/ʃ/'], keys: ['s', 'ʃ'], words: ['see', 'she'], hint: 'Đừng nhầm luồng hơi của hai âm này.' },
        { sounds: ['/θ/', '/ð/'], keys: ['θ', 'ð'], words: ['thin', 'this'], hint: 'Đặt lưỡi đúng vị trí và kiểm tra độ rung.' },
        { sounds: ['/tʃ/', '/dʒ/'], keys: ['tʃ', 'dʒ'], words: ['cheap', 'jeep'], hint: 'Chú ý độ rung của âm hữu thanh.' }
    ];
    const PODCAST_HOOKS = {
        1: 'Công việc nhà tưởng đơn giản, nhưng làm sao trao đổi bằng tiếng Anh cho tự nhiên?',
        2: 'Một cuộc trò chuyện về cà phê: bạn sẽ diễn tả thói quen của mình thế nào?',
        3: 'Không hài lòng về một việc? Thử nghe cách phàn nàn mà vẫn lịch sự.',
        4: 'Nếu được hỏi về chuyện ra nước ngoài trong IELTS Speaking, bạn sẽ trả lời ra sao?',
        5: 'Kiên nhẫn là dễ hay khó? Nghe cách người nói diễn đạt trải nghiệm của mình.',
        6: 'Đang đọc sách mà mất tập trung? Chủ đề rất quen thuộc này cũng là bài luyện IELTS.',
        7: 'Vì sao đồ ngọt hấp dẫn đến thế? Thử trả lời một câu hỏi Speaking về khẩu vị.',
        8: 'Thích nhà riêng hay căn hộ? Khám phá cách trình bày lựa chọn trong phần Speaking.',
        9: 'Nói về môn thể thao yêu thích mà không chỉ trả lời một câu ngắn: thử nghe xem!',
        10: 'Sau một hành trình dài, bạn cần nói gì để nhận phòng khách sạn bằng tiếng Anh?',
        11: 'Vào quán cà phê, gọi đúng thức uống mình muốn bằng tiếng Anh có dễ không?',
        12: 'Nếu bị lạc ở thành phố xa lạ, bạn sẽ hỏi đường như thế nào?',
        13: 'Chuyến bay bị hủy và phải tìm người hỗ trợ: bạn sẽ nói gì tại quầy hãng bay?',
        14: 'Một chuyến đi thang máy im lặng đến ngượng ngùng: bắt chuyện ở nơi làm việc thế nào?',
        15: 'Bạn có ý tưởng hay nhưng lại ngại lên tiếng? Học cách ngắt lời và phản biện lịch sự.'
    };
    const state = { uid:null, articles:[], podcasts:[], turn:0, articleOffset:0, podcastOffset:0, ipaOffset:0, request:0, current:null };
    let nodes = null;

    function el(tag, cls, text) {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    }
    function short(text, max) {
        const t = String(text || '').replace(/\s+/g, ' ').trim();
        return t.length <= max ? t : t.slice(0,max).replace(/\s+\S*$/, '').trimEnd() + '…';
    }
    function plain(html) {
        if (window.LDDNewsContent && typeof window.LDDNewsContent.toPlainText === 'function') {
            return window.LDDNewsContent.toPlainText(String(html || ''));
        }
        const node = document.createElement('div');
        node.innerHTML = String(html || '');
        node.querySelectorAll('script,style,figure,figcaption,footer,nav').forEach(x => x.remove());
        return String(node.textContent || '').replace(/\s+/g, ' ').trim();
    }
    function factFromArticle(content) {
        const text = plain(content);
        const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(x => x.trim())
            .filter(x => x.split(/\s+/).length >= 7 && x.split(/\s+/).length <= 37);
        const factual = sentences.find(x => /\b(can|could|because|scientists?|researchers?|people|years?|study|found|first|some|many|more|less|than|percent|important)\b|\d/i.test(x));
        const sentence = factual || sentences[0] || text;
        // Only quote the existing content; never invent a fact about the article.
        return sentence ? 'Một chi tiết đáng chú ý: ' + short(sentence, 190) : 'Khám phá điều thú vị trong bài báo tiếng Anh này.';
    }
    function bookCover(label) {
        const cover = el('div','ldd-oci-illustration');
        const symbol = el('span','ldd-oci-cover-icon',label);
        symbol.setAttribute('aria-hidden','true');
        cover.appendChild(symbol);
        return cover;
    }
    function podcastCover(title) {
        const t = String(title || '').toLowerCase();
        const symbol = /coffee/.test(t) ? '☕' : /flight|abroad|hotel/.test(t) ? '✈️' :
            /city|directions/.test(t) ? '🗺️' : /work|meeting|complain/.test(t) ? '💬' :
            /sweet|food/.test(t) ? '🍰' : /sport/.test(t) ? '⚽' :
            /books?/.test(t) ? '📚' : /house|apartment/.test(t) ? '🏠' : '🎧';
        const cover=bookCover(symbol);
        cover.classList.add('ldd-oci-podcast-art');
        cover.setAttribute('role','img');
        cover.setAttribute('aria-label','Hình minh họa chủ đề podcast');
        return cover;
    }
    function newsCover(row) {
        const url=String(row?.thumb || '');
        if (!/^https:\/\//i.test(url)) return bookCover('📰');
        const pic=el('img','ldd-oci-news-img');
        pic.src=url; pic.alt='Hình minh họa bài báo';
        pic.loading='lazy'; pic.decoding='async';
        pic.referrerPolicy='no-referrer';
        pic.addEventListener('error',function () { pic.replaceWith(bookCover('📰')); },{once:true});
        return pic;
    }
    function mount() {
        const intro=document.querySelector('#tab-trang-chu .ldd-home-intro');
        if(!intro) return false;
        if(document.getElementById('ldd-oci-welcome')) return true;
        const welcome=el('section','ldd-oci-welcome');
        welcome.id='ldd-oci-welcome';
        const mascot=el('img','ldd-oci-portrait');
        mascot.src=image; mascot.width=128; mascot.height=138;
        mascot.decoding='async'; mascot.alt='Oci, linh vật cá heo của LDD English';
        const body=el('div','ldd-oci-content');
        const heading=el('strong','ldd-oci-name','🐬 Oci gợi ý cho bạn');
        const preview=el('div','ldd-oci-preview');
        preview.setAttribute('aria-live','polite');
        const controls=el('div','ldd-oci-controls');
        const primary=el('button','ldd-oci-go','');
        primary.type='button'; primary.disabled=true;
        const next=el('button','ldd-oci-next','Gợi ý khác');
        next.type='button';
        next.addEventListener('click',function(){void showNext();});
        primary.addEventListener('click',function(){void openCurrent();});
        controls.append(primary,next);
        body.append(heading,preview,controls);
        welcome.append(mascot,body);
        intro.appendChild(welcome);
        nodes={welcome,preview,primary,next};
        return true;
    }
    function paint(kind,title,desc,art,action) {
        if (!nodes) return;
        const details=el('div','ldd-oci-preview-copy');
        const category=el('span','ldd-oci-kind',kind);
        const strong=el('strong','ldd-oci-headline',short(title,110));
        const summary=el('p','ldd-oci-tip',short(desc,218));
        details.append(category,strong,summary);
        const wrap=el('div','ldd-oci-preview-row');
        wrap.append(art,details);
        nodes.preview.replaceChildren(wrap);
        nodes.primary.disabled=false;
        nodes.primary.textContent=action;
    }
    function choose() {
        const types=['news','podcast','ipa'];
        for(let tries=0;tries<3;tries++) {
            const type=types[(state.turn++) % types.length];
            if(type==='news' && state.articles.length) {
                const id=state.articles[state.articleOffset++ % state.articles.length];
                return {type:'news',id,uid:state.uid};
            }
            if(type==='podcast' && state.podcasts.length) {
                const pod=state.podcasts[state.podcastOffset++ % state.podcasts.length];
                return {type:'podcast',pod,uid:state.uid};
            }
            if(type==='ipa') {
                return {type:'ipa',pair:IPA[state.ipaOffset++ % IPA.length],uid:state.uid};
            }
        }
        return {type:'ipa',pair:IPA[state.ipaOffset++ % IPA.length],uid:state.uid};
    }
    async function showNext() {
        if(!nodes)return;
        const seq=++state.request;
        const selected=choose();
        state.current=selected;
        nodes.primary.disabled=true;
        if(selected.type==='news') {
            nodes.preview.textContent='Đang tìm một bài báo bạn chưa đọc…';
            const getter=window.LDDOciNewsPreview;
            const row=typeof getter==='function' && selected.uid
                ? await getter(selected.id,selected.uid) : null;
            if(seq!==state.request || selected.uid!==state.uid) return;
            if(!row) {
                // No fabricated source or broken CTA if data is temporarily unavailable.
                const pair=IPA[state.ipaOffset++ % IPA.length];
                state.current={type:'ipa',pair,uid:state.uid};
                showIpa(pair);
                return;
            }
            selected.row=row;
            paint('📰 BÀI BÁO CHƯA ĐỌC',row.title,factFromArticle(row.content),
                newsCover(row),'Đọc bài này');
        } else if(selected.type==='podcast') {
            const p=selected.pod;
            const opening=Array.isArray(p.opening) ? p.opening : [];
            const excerpt=opening.map(x=>x.vi).find(x=>String(x||'').length>30);
            const description=PODCAST_HOOKS[Number(p.id)] ||
                (excerpt ? 'Nghe một cuộc hội thoại bắt đầu bằng: “'+short(excerpt,115)+'”' : 'Khám phá tình huống giao tiếp và thử nghe hiểu bằng tiếng Anh.');
            paint('🎧 PODCAST CHƯA NGHE',p.title,description,podcastCover(p.title),'Nghe podcast này');
        } else {
            showIpa(selected.pair);
        }
    }
    function showIpa(pair) {
        const tile=el('div','ldd-oci-ipa-art');
        tile.setAttribute('aria-label','Cặp âm IPA cần phân biệt');
        pair.sounds.forEach(function(sound){
            tile.appendChild(el('span','ldd-oci-ipa-sound',sound));
        });
        paint('🔊 THỬ THÁCH IPA','Phân biệt ' + pair.sounds.join(' và '),
            pair.words.join(' – ') + '. ' + pair.hint,tile,'Luyện âm này');
    }
    function visitMain(target) {
        if(window.LDDNavigation && typeof window.LDDNavigation.goToTab==='function') {
            window.LDDNavigation.goToTab(target);
        } else {
            const button=document.querySelector('.main-tab-btn[data-main-target="'+target+'"]');
            if(button) button.click();
        }
    }
    function visitVocabulary(cardId) {
        visitMain('tab-tu-vung');
        if(window.LDDVocabNavigation && typeof window.LDDVocabNavigation.openFolder==='function') {
            if(window.LDDVocabNavigation.openFolder(cardId))return;
        }
        document.getElementById(cardId)?.click();
    }
    function findCard(container,id,title,selector) {
        const root=document.getElementById(container);
        if(!root)return null;
        const wanted=String(id);
        const cards=Array.from(root.querySelectorAll(selector));
        return cards.find(c=>[c.dataset?.id,c.dataset?.articleId,c.getAttribute('data-news-id')].some(v=>String(v||'')===wanted)) ||
            cards.find(c=>String(c.querySelector('.news-card-title')?.textContent || c.textContent || '').trim().toLowerCase()===String(title||'').trim().toLowerCase()) || null;
    }
    function openWhenLoaded(container,id,title,selector) {
        const root=document.getElementById(container);
        if(!root)return;
        const open=()=>{
            const card=findCard(container,id,title,selector);
            if(!card)return false;
            card.click(); return true;
        };
        if(open())return;
        const observer=new MutationObserver(()=>{if(open())observer.disconnect();});
        observer.observe(root,{childList:true,subtree:true});
        setTimeout(()=>observer.disconnect(),10000);
    }
    async function openCurrent() {
        const current=state.current;
        if(!current)return;
        if(current.type==='news') {
            visitVocabulary('news-folder-card');
            openWhenLoaded('news-cards-grid',current.id,current.row?.title,'.news-card');
        } else if(current.type==='podcast') {
            visitVocabulary('podcast-folder-card');
            openWhenLoaded('podcast-grid',current.pod.id,current.pod.title,'.folder-card');
        } else {
            visitMain('tab-phien-am');
            const firstKey=current.pair.keys[0];
            setTimeout(function(){
                const tile=Array.from(document.querySelectorAll('#tab-phien-am .ipa-symbol'))
                    .find(x=>x.dataset.symbol===firstKey);
                if(!tile)return;
                const panel=tile.closest('.ipa-tab-content');
                if(panel)document.querySelector('.tab-button[data-target="'+panel.id+'"]')?.click();
                tile.click();
                tile.scrollIntoView({block:'center',behavior:'smooth'});
            },150);
        }
    }
    function onCandidates(event) {
        const input=event.detail;
        if(!input || !input.uid) {
            state.uid=null;state.articles=[];state.podcasts=[];
            state.current=null;state.turn=2;void showNext();
            return;
        }
        const changed=String(input.uid)!==state.uid;
        state.uid=String(input.uid);
        state.articles=Array.isArray(input.articles) ? input.articles.map(String) : [];
        state.podcasts=Array.isArray(input.podcasts) ? input.podcasts.filter(x=>x&&x.id&&x.title) : [];
        if(changed) {
            state.turn=0;state.articleOffset=0;state.podcastOffset=0;
            void showNext();
        } else {
            const shown=state.current;
            if(shown && ((shown.type==='news'&&!state.articles.includes(String(shown.id))) ||
                (shown.type==='podcast'&&!state.podcasts.some(p=>String(p.id)===String(shown.pod.id)))))void showNext();
        }
    }
    window.addEventListener('ldd:oci-candidates',onCandidates);
    function init() {
        const ready=()=> {
            if(!mount()) return false;
            if(window.LDDOciCandidateSnapshot?.uid) {
                onCandidates({detail:window.LDDOciCandidateSnapshot});
            } else {
                void showNext();
            }
            return true;
        };
        if(ready())return;
        const observer=new MutationObserver(()=>{
            if(ready())observer.disconnect();
        });
        observer.observe(document.body,{childList:true,subtree:true});
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
})();
