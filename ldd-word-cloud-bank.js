/* LDD English: cloud of words cloze-question bank. */
(function(){
 'use strict';
 if(window.LDDCloudBank)return;
 const COUNT=30,CHOICES=16;
 const norm=s=>String(s||'').trim().toLowerCase().replace(/\s+/g,' ');
 const shuffle=list=>{const a=list.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const word=s=>/^[A-Za-z]+(?:[-'][A-Za-z]+)?$/.test(String(s||'').trim());
 const clean=s=>String(s||'').trim();
 async function topics(){
   for(let i=0;i<30;i++){
     if(window.kidTopicsAPI&&typeof window.kidTopicsAPI.getTopics==='function')return window.kidTopicsAPI.getTopics()||[];
     await new Promise(resolve=>setTimeout(resolve,110));
   }
   throw Error('Chưa đọc được kho từ vựng Vận dụng.');
 }
 function fromTopic(t){
   const m=new Map();
   (t&&t.words||[]).forEach(item=>{
     const en=clean(item.en||item.word),vi=clean(item.vi||item.meaning);
     if(!word(en)||!vi||en.length>45||m.has(norm(en)))return;
     m.set(norm(en),{en,vi,ex:clean(item.ex||item.trAnswer),trVi:clean(item.trVi)});
   });
   return [...m.values()];
 }
 function vocabulary(list){const m=new Map();list.flatMap(fromTopic).forEach(w=>{if(!m.has(norm(w.en)))m.set(norm(w.en),w);});return [...m.values()];}
 function choices(answer,pool){
   const map=new Map([[norm(answer),answer]]);
   for(const value of shuffle(pool)){
     const name=clean(value.en||value);
     if(word(name)&&!map.has(norm(name))){map.set(norm(name),name);if(map.size===CHOICES)break;}
   }
   if(map.size!==CHOICES)throw Error('Không có đủ 16 từ khác nhau để tạo đám mây.');
   return shuffle([...map.values()]);
 }
 function promptFor(w){
   if(w.ex&&w.ex.length<=190&&!/[<>]/.test(w.ex)){
     const re=new RegExp('(^|[^A-Za-z])('+w.en+')(?=$|[^A-Za-z])','i');
     if(re.test(w.ex))return w.ex.replace(re,(_all,pre)=>pre+'____');
   }
   return 'Từ tiếng Anh tương ứng với "'+w.vi.slice(0,65)+'" là ____.';
 }
 function makeVocabulary(topicsList,id){
   const all=vocabulary(topicsList),topic=id==='__mixed'?null:topicsList.find(t=>String(t.id)===String(id));
   const pool=topic?fromTopic(topic):all;
   if(pool.length<COUNT)throw Error('Chủ đề không đủ 30 từ đơn. Hãy chọn Tổng hợp.');
   const selected=shuffle(pool).slice(0,COUNT);
   return {topic:'Từ vựng · '+(topic?String(topic.title||'Theo chủ đề'):'Tổng hợp các chủ đề'),
     words:selected.map(w=>({en:w.en,vi:w.vi.slice(0,120),prompt:promptFor(w).slice(0,230),
       hint:(w.trVi?'Dịch: '+w.trVi:'Nghĩa: '+w.vi).slice(0,160),
       choices:choices(w.en,pool),cloud_mode:'vocabulary'}))};
 }
 const FORM_WORDS=('am is are was were be been being have has had do does did can cannot could will would should must might may '+
 'not never already just used because although so if when while who which whose whom where than as since for '+
 'go goes went gone going playing played reading under behind more most less only hardly sooner '+
 'standing sitting written invited').split(' ');
 const FORMS=new Set(FORM_WORDS);
 const PRIORITY=new Set(('am is are was were have has had do does did can cannot could will would should must might '+
  'because although if when while who which whose where than since used been be just never only hardly sooner').split(' '));
 const D={
   am:'is are has have can did does do will should must be had being gone we they she',
   is:'am are do does has have did can be will should must their her my',
   are:'am is do does has have did can be will should must your my us',
   was:'were are am is have has had do did been be would should must',
   were:'was are am is have has had do did been be would should must',
   has:'have had having is are was were do does did can should must',
   have:'has had having is are was were do does did can should must',
   do:'does did done doing has have are is am will would can should',
   does:'do did doing done have has is are am will would can should',
   did:'do does done doing had have has is are am will would can',
   can:'cans canned could should must is are do does did has have',
   will:'would could should must can do does did has have are is',
   should:'must can could will would do does has have are is',
   to:'for of at in on with from by into under over behind',
   than:'as then that when where which because although until after',
   as:'than then that when where because although until if',
   because:'although however so and or if but than unless while',
   although:'because however so and or if but than unless while',
   if:'because although when while where unless since that who and',
   who:'which where when whose whom that how if while because',
   which:'who where when whose whom that how if while because',
   this:'these those they it we he she here there that',
   these:'this those they it we he she here there that',
   those:'this these they it we he she here there that'
 };
 const FILLER=('am is are was were do does did have has had can could will would should must not this these those '+
  'who which where when because although so if than as since for to of in on at my your his her our their '+
  'a an the many some few little been being be more most gone going went not never just still already either yet until unless').split(' ');
 const LOCATION_HINTS={
  'The cat is under the table.':'Con mèo ở dưới bàn.',
  'My bag is on the chair.':'Cặp của tôi ở trên ghế.',
  'The ball is behind the door.':'Quả bóng ở sau cánh cửa.'
 };
 function target(sentence,topic){
   if(/Mệnh lệnh/.test(topic||'')){
     const m=/^(?:Please\s+)?([A-Za-z]+)/.exec(sentence);
     if(m)return{value:m[1],start:m.index+m[0].lastIndexOf(m[1]),low:m[1].toLowerCase()};
   }
   const matches=[...sentence.matchAll(/[A-Za-z]+(?:'[A-Za-z]+)?/g)].map(m=>({value:m[0],start:m.index,low:m[0].toLowerCase()})).filter(m=>FORMS.has(m.low));
   if(/Giới từ chỉ nơi chốn/.test(topic||'')&&LOCATION_HINTS[sentence]){
     const preps=matches.filter(m=>['under','on','behind'].includes(m.low));if(preps.length)return preps[0];
     if(sentence.includes(' on ')){const m=sentence.indexOf(' on ');return{value:'on',start:m+1,low:'on'};}
   }
   if(/Mệnh đề quan hệ rút gọn/.test(topic||'')){
     const form=matches.filter(m=>['standing','sitting','written','invited'].includes(m.low));
     if(form.length)return form[0];
   }
   if(/So sánh/.test(topic||'')){
     const compare=matches.filter(m=>['than','as','more','most'].includes(m.low));
     if(compare.length)return compare[0];
   }
   const priority=matches.filter(m=>PRIORITY.has(m.low));
   if(priority.length)return priority[0];
   return matches[0]||null;
 }
 function grammarChoices(answer){
   const m=new Map([[norm(answer),answer]]),preferred=(D[norm(answer)]||'').split(' ').filter(Boolean);
   for(const name of [...shuffle(preferred),...shuffle(FILLER)]){
     if(['am','is','are'].includes(norm(answer))&&['was','were'].includes(norm(name)))continue;
     if(['has','have'].includes(norm(answer))&&norm(name)==='had')continue;
     if(word(name)&&!m.has(norm(name))){m.set(norm(name),name);if(m.size===CHOICES)break;}
   }
   if(m.size!==CHOICES)throw Error('Không đủ lựa chọn ngữ pháp.');
   return shuffle([...m.values()]);
 }
 function questionFromGrammar(entry){
   const s=clean(entry.sentence);if(s.length<9||s.length>210||/[<>]/.test(s))return null;
   const t=target(s,entry.topic);if(!t)return null;
   const prompt=s.slice(0,t.start)+'____'+s.slice(t.start+t.value.length);
   return {en:t.value,vi:clean(entry.topic).slice(0,120),prompt,
     hint:(LOCATION_HINTS[s]?'Nghĩa: '+LOCATION_HINTS[s]+' · ':'')+'Ngữ pháp lớp '+entry.grade+' · '+entry.topic,choices:grammarChoices(t.value),
     cloud_mode:'grammar',grammar_grade:entry.grade};
 }
 function makeGrammar(grade){
   const api=window.LDDGameGrammar;
   if(!api||typeof api.examples!=='function')throw Error('Chưa tải ngân hàng ngữ pháp.');
   const group=new Map();
   shuffle(api.examples(grade)).forEach(entry=>{
     const q=questionFromGrammar(entry);if(!q)return;
     if(!group.has(entry.grade))group.set(entry.grade,[]);
     group.get(entry.grade).push(q);
   });
   const picked=[],seen=new Set();
   function add(q){if(q&&!seen.has(q.prompt.toLowerCase())){seen.add(q.prompt.toLowerCase());picked.push(q);}}
   for(let i=1;i<=grade;i++)add((group.get(i)||[])[0]);
   for(const q of shuffle([...group.values()].flat())){if(picked.length>=COUNT)break;add(q);}
   if(picked.length!==COUNT)throw Error('Không đủ 30 câu ngữ pháp.');
   return {topic:'Ngữ pháp · Lớp 1–'+grade,words:shuffle(picked)};
 }
 function markRoom(bank){
   if(!bank||bank.words.length!==COUNT)throw Error('Bộ câu hỏi không đủ 30 lượt.');
   const words=bank.words.map((w,i)=>i?{...w}:{...w,sequence_mode:'one_by_one',game_mode:'word_cloud'});
   for(const w of words){
     if(!word(w.en)||w.en.length>55||!w.vi||w.vi.length>120||!w.prompt.includes('____')||
       w.prompt.length>240||!Array.isArray(w.choices)||w.choices.length!==CHOICES||
       new Set(w.choices.map(norm)).size!==CHOICES||
       w.choices.filter(x=>norm(x)===norm(w.en)).length!==1)throw Error('Câu hỏi chưa hợp lệ.');
   }
   return {topic:bank.topic,words};
 }
 window.LDDCloudBank={COUNT,CHOICES,topics,fromTopic,vocabulary,makeVocabulary,makeGrammar,markRoom};
})();