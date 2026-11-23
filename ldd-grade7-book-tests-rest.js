/* Mai Lan Hương / Hà Thanh Uyên — scanned TEST FOR UNIT 3–12.
   Source pages are embedded as original monochrome PDF facsimiles (lazy loaded).
   Answer sheets align to numbered sections in the printed book.
   Only objective keys checked against the printed answer appendix are marked
   automatically. Written answers require the teacher's review. */
(function(){
'use strict';
const bank=window.LDDGrade7BookTests;if(!bank)return;
const parts={
 I:'Pronunciation',II:'Word choice / matching',III:'Vocabulary and grammar',
 IV:'Grammar and sentence completion',V:'Word forms',VI:'Spot the mistake',
 VII:'Matching / sentence practice',VIII:'Cloze / reading / matching',
 IX:'Reading comprehension',X:'Writing / reading comprehension',XI:'Writing'
};
const q=(type,label,index,answer,options)=>({
 type,text:(label==='IX'&&index>8?'Câu '+index+' (xem tiểu mục trong đề gốc)':'Câu '+index+' · xem trang sách gốc'),
 options:type==='choice'?(options||['A','B','C','D']):undefined,
 answer:answer||''
});
const section=(label,subsets,description)=>{
 const questions=[];
 for(const sub of subsets){
  const values=typeof sub.keys==='string'?sub.keys.trim().split(/\s+/):sub.keys||[];
  for(let i=0;i<sub.count;i++){
   const raw=values[i]||'';
   let type=sub.type||'written',answer=raw;
   if(type==='truefalse'){type='choice';answer=raw==='T'?'a':raw==='F'?'b':'';}
   const opt=type==='choice'&&sub.type==='truefalse'?['True','False']:undefined;
   const item=q(type,label,questions.length+1,answer,opt);
   if(sub.prefix)item.text=sub.prefix+' · Câu '+(i+1)+' (xem trang đề gốc)';
   if(type==='match')item.options=undefined;
   questions.push(item);
  }
 }
 const result={label,title:description||parts[label]||'Bài tập trong sách',questions};
 // Match question letters to the exact source choice list when provided.
 const match=subsets.find(sub=>sub.type==='match');
 if(match)result.choices=match.choices||
    Array.from({length:Math.max(8,match.count)},(_,i)=>'Phương án '+String.fromCharCode(65+i)+' (xem đề gốc)');
 return result;
};
const objective=(label,keys,title)=>section(label,[{count:keys.trim().split(/\s+/).length,type:'choice',keys}],title);
const written=(label,count,title)=>section(label,[{count,type:'written'}],title);
const matching=(label,keys,title,choices)=>section(label,[{count:keys.trim().split(/\s+/).length,type:'match',keys,choices}],title);
const compound=(label,subsets,title)=>section(label,subsets,title);
const reviews=[
 {unit:3,pages:'35–38',pdf:[37,40],sections:[
  objective('I','b d b c a','Choose the word with a different underlined sound'),
  objective('II','a b d c b','Choose the odd one out'),
  objective('III','a b c a b c c a a d','Choose the best answer'),
  written('IV',10,'Verb forms and tenses'),written('V',8,'Word forms'),written('VI',8,'Find and correct the mistakes'),
  matching('VII','d h b a g c e f','Match the questions and answers'),
  objective('VIII','c b b c a d','Choose the best word for each gap'),
  compound('IX',[{prefix:'A',count:6,type:'truefalse',keys:'T T F F T F'},{prefix:'B',count:5,type:'written'}],'Read the text and complete both tasks'),
  written('X',6,'Make sentences using the given cues')
 ]},
 {unit:4,pages:'51–55',pdf:[53,57],sections:[
  objective('I','b c a d b','Pronunciation'),objective('II','a c c d b','Odd one out'),
  objective('III','b a d a b c d a d c','Choose the best answer'),
  written('IV',10,'Correct verb forms'),written('V',8,'Word forms'),written('VI',8,'Correct mistakes'),
  matching('VII','e a f h b g c d','Match the questions with the answers'),
  objective('VIII','c a d a b a','Choose the word for each gap'),
  written('IX',6,'Answer questions from the reading'),
  written('X',8,'Rewrite the sentences')
 ]},
 {unit:5,pages:'64–68',pdf:[66,70],sections:[
  objective('I','a c b d b','Pronunciation'),objective('II','b d a c d','Odd one out'),
  objective('III','b d c c d a b c d a','Choose the best answer'),
  written('IV',10,'Correct verb forms'),written('V',8,'Word forms'),written('VI',8,'Correct mistakes'),
  matching('VII','e h a g c b d f','Match the questions with the answers'),
  objective('VIII','a c d d b a','Choose the word for each gap'),
  objective('IX','a c b d b','Read and choose the correct answers'),
  written('X',8,'Make questions for the underlined parts')
 ]},
 {unit:6,pages:'76–79',pdf:[78,81],sections:[
  objective('I','a b a d c','Pronunciation'),
  written('II',8,'Complete with the first letter given'),
  objective('III','a d c c b c a d d b','Choose the best answer'),
  written('IV',10,'Correct verb forms'),written('V',8,'Word forms'),written('VI',8,'Correct mistakes'),
  matching('VII','c d a b f h e g','Match the questions with the answers'),
  objective('VIII','a b c d a c','Complete the passage'),
  written('IX',7,'Read and answer the questions'),written('X',8,'Write sentences using the cues')
 ]},
 {unit:7,pages:'94–98',pdf:[96,100],sections:[
  objective('I','d b c d a','Pronunciation'),
  matching('II','i d g j a f e b h c','Match the road signs with their meanings',[
    'No Overtaking','No Left Turn','Pedestrian Crossing','Slippery Road',
    'Crossroads','No Parking','Go Ahead Only','Turn Right','Railway Crossing','Hospital Ahead'
  ]),
  objective('III','b a d c c a b d d c','Choose the best answer'),
  written('IV',10,'Correct verb forms'),written('V',10,'Word forms'),written('VI',8,'Correct mistakes'),
  matching('VII','f a e b h c d g','Match the questions with the answers'),
  objective('VIII','a c b d c b a b','Complete the passage'),
  compound('IX',[{prefix:'A',count:5,type:'match',keys:'d c a e b'},
                 {prefix:'B',count:5,type:'choice',keys:'c b d c a'}],'Read the passage and do both tasks'),
  written('X',8,'Make sentences using the cues')
 ]},
 {unit:8,pages:'109–113',pdf:[111,115],sections:[
  objective('I','c a d a b','Pronunciation'),objective('II','c b d a d','Odd one out'),
  written('III',8,'Types of films'),objective('IV','a c d b a c b d d c','Choose the best answer'),
  written('V',10,'Correct verb forms'),written('VI',10,'Word forms'),written('VII',8,'Correct mistakes'),
  matching('VIII','e h a g d b f c','Match the questions with the answers'),
  objective('IX','b c d a b a d c','Complete the passage'),
  compound('X',[{prefix:'A',count:6,type:'match',keys:'d e f c a b'},
                {prefix:'B',count:8,type:'written'}],'Read and do both tasks'),
  written('XI',8,'Rewrite the sentences')
 ]},
 {unit:9,pages:'123–128',pdf:[125,130],sections:[
  objective('I','a c b d a','Pronunciation'),objective('II','d a b c d','Word stress'),
  written('III',6,'Complete the passage with the first letter'),
  objective('IV','a c d b d a b c a c','Choose the best answer'),
  written('V',10,'Correct verb forms'),written('VI',10,'Word forms'),written('VII',8,'Correct mistakes'),
  matching('VIII','b f a g d e h c','Match the questions and answers'),
  objective('IX','b d c a c b a c','Complete the passage'),
  compound('X',[{prefix:'A',count:5,type:'match',keys:'d c a e b'},
                {prefix:'B',count:5,type:'choice',keys:'b d a c d'}],'Read the text and complete both tasks'),
  written('XI',8,'Make sentences using the cues')
 ]},
 {unit:10,pages:'141–145',pdf:[143,147],sections:[
  objective('I','b d a c b','Pronunciation'),objective('II','a c b d c','Word stress'),
  written('III',8,'Fill in the gaps with first letters'),
  objective('IV','b a c a b b a d c a','Choose the best answer'),
  written('V',10,'Correct verb forms'),written('VI',8,'Word forms'),written('VII',8,'Correct mistakes'),
  written('VIII',5,'Write questions for the answers'),
  objective('IX','c a c a b d d b','Complete the passage'),
  objective('X','a d b c d a b','Read and choose the correct answers'),
  written('XI',8,'Make sentences using the cues')
 ]},
 {unit:11,pages:'155–159',pdf:[157,161],sections:[
  objective('I','c b a b a','Pronunciation'),objective('II','c b a c d','Word stress'),
  written('III',8,'Complete the sentences'),
  objective('IV','d a b c a c b d a b','Choose the best answer'),
  written('V',10,'Correct verb forms'),written('VI',8,'Word forms'),written('VII',8,'Correct mistakes'),
  matching('VIII','c e a g h f d b','Match the questions with the answers'),
  objective('IX','d c b c d a b c','Complete the passage'),
  compound('X',[{prefix:'A',count:5,type:'match',keys:'b e d a c'},
                {prefix:'B',count:6,type:'truefalse',keys:'T F F F F T'}],'Read and complete both tasks'),
  written('XI',6,'Make sentences using the cues')
 ]},
 {unit:12,pages:'167–171',pdf:[169,173],sections:[
  objective('I','c b d c a','Pronunciation'),objective('II','b a d c a','Word stress'),
  written('III',8,'Complete the sentences with words in the box'),
  objective('IV','c b b a c d b d c b','Choose the best answer'),
  written('V',10,'Correct verb forms'),written('VI',10,'Word forms'),written('VII',8,'Correct mistakes'),
  matching('VIII','d g a h b e c f','Match the sentences'),
  objective('IX','b d a a c c b d','Complete the passage'),
  compound('X',[{prefix:'A',count:5,type:'match',keys:'e a c d b'},
                {prefix:'B',count:5,type:'choice',keys:'c d c a b'}],'Read the text and complete both tasks'),
  written('XI',8,'Write sentences from the cues')
 ]}
];
for(const info of reviews){
 bank.tests.push({
  id:'mlh7-unit'+info.unit+'-test',unit:info.unit,title:'TEST FOR UNIT '+info.unit,
  source:bank.source,bookPages:info.pages,pdfPages:info.pdf.join('–'),
  verified:true,sourceFormat:'scanned-original',
  pdfAsset:'assets/mlh7/u'+String(info.unit).padStart(2,'0')+'-test-pdf.js',
  sections:info.sections
 });
}
})();