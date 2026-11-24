/* Mai Lan Hương 7 – checked word choices on source scan.
   The PDF is authoritative for underlined letters and pictures.
   Only question text individually verified on the scan is added here. */
(function(){
'use strict';
const bank=window.LDDGrade7BookTests;if(!bank)return;
const choices={
3:{
 I:[['exchange','school','teacher','children'],['volunteered','changed','recycled','cooked'],['tutor','volunteer','student','community'],['talked','washed','surprised','helped'],['provide','donate','program','clothes']],
 II:[['donate','program','service','member'],['sick children','volunteer','homeless people','disabled people'],['donating clothes','cleaning streets','providing food','playing games'],['homeless','sick','street','disabled'],['volunteer','graffiti','donor','contributor']],
 III:[
 ['If you want to help the environment, take part ______ a local park cleanup day.',['in','for','on','with']],
 ['Toys of Hope provides toys, books and clothing ______ needy and homeless children.',['from','to','with','against']],
 ['Many people ______ their worn clothing to a local charity shop.',['provide','exchange','donate','recycle']],
 ['The river is heavily polluted. They should ______.',['clean it up','give it away','pick it out','recycle it']],
 ['______ people usually live on the streets, under bridges, or in camps.',['Lonely','Homeless','Elderly','Disabled']],
 ['A(n) ______ is an institution that takes care of children without parents.',['nursing home','hospital','orphanage','community']],
 ['We help families in ______ by providing food, clothing, housing and much more.',['control','case','need','shape']],
 ['Most people volunteer ______ they want to make a difference in their community.',['because','so','but','and']],
 ['We can help to reduce ______ by using public transportation, biking and walking.',['air pollution','water pollution','social problems','community service']],
 ['______ do you like this charity work? – I really like it.',['What','Why','When','How']]
 ]},
4:{
 I:[['actor','painting','anthem','gallery'],['decide','exciting','exhibit','organise'],['educated','played','recycled','changed'],['cello','choose','kitchen','concert'],['sugar','closure','share','anxious']],
 II:[['music','cello','guitar','drums'],['actor','artist','painting','singer'],['cello','violin','saxophone','guitar'],['jazz','pop','rock','anthem'],['The Spice Girls','Gangnam Style','The Beatles','ABBA']],
 III:[
 ['She prefers watching Korean movies ______ listening to K-pop.',['with','to','of','for']],
 ['What do you like to do ______ your spare time?',['in','on','at','from']],
 ['The ______ is rather older now; however, his acting ability has never been better.',['composer','actress','artist','actor']],
 ['“Yeezus” is quite ______ from other hip-hop albums.',['different','like','as','same']],
 ['Juan and Patricia are not the same height. Juan is ______ Patricia.',['as tall as','not as tall as','more tall than','not tall than']],
 ['Thomas Newman ______ music for many Pixar movies including Finding Nemo and WALL-E.',['performed','painted','composed','played']],
 ['I went to the 3D ______ last weekend. The paintings were excellent!',['movie theater','concert hall','opera house','art museum']],
 ['______ I’m not a fan of country music, I thoroughly enjoyed his lively performance.',['Although','Because','As','However']],
 ['______ does a water puppet show take place? ~ In a pool.',['What','When','How','Where']],
 ['Which is the national anthem of Vietnam?',['Tieu Doan 307','Chien si Viet Nam','Tien Quan Ca','Tien ve Ha Noi']]
 ]},
5:{
 I:[['bread','beef','meat','tea'],['audience','sauce','sausage','taught'],['eggs','cups','cartons','noodles'],['soup','salt','sauce','sugar'],['fridge','rice','spinach','milk']],
 II:[['juice','sandwich','lemonade','milk'],['breakfast','lunch','dinner','sauce'],['egg','pork','beef','ham'],['cheese','salt','orange','bread'],['bowl','glass','plate','fork']]
},
6:{I:[['pagoda','blanket','academy','tablet'],['children','scholar','teacher','lunch'],['question','nation','education','recognition'],['visited','founded','decided','developed'],['heritage','historic','recognise','literature']]},
7:{I:[['breaking','great','steak','healthy'],['cycle','bicycle','fly','skyscraper'],['circle','licence','vehicle','centre'],['reversed','walked','stopped','obeyed'],['park','pavement','plane','safety']]},
8:{
 I:[['gripping','fiction','violent','wizard'],['pleasure','really','easily','feature'],['critic','comedy','cartoon','cinema'],['engaged','gripped','laughed','wrecked'],['feature','theatre','screen','must-see']],
 II:[['documentary','fantasy','review','cartoon'],['director','comedy','producer','actress'],['gripping','funny','scary','shock'],['awful','entertaining','fascinating','exciting'],['thrilling','interesting','terrifying','acting']]
},
9:{
 I:[['display','highlight','firework','lively'],['feast','feature','great','seasonal'],['chase','Christmas','choose','cheese'],['called','gathered','played','watched'],['carnival','fascinate','celebrate','exciting']],
 II:[['decorate','festival','holiday','Thanksgiving'],['enjoy','special','culture','worship'],['wonderful','prosperity','seasonal','celebrate'],['lantern','costume','parade','stuffing'],['creative','delicious','musician','disappointing']]
},
10:{
 I:[['solar','fossil','hydro','overheat'],['abundant','consumption','sunlight','pollution'],['certain','carbon','coal','convert'],['heat','cheap','instead','easily'],['replaced','limited','developed','walked']],
 II:[['machine','carbon','harmful','turbine'],['generate','natural','effective','energy'],['limit','replace','panel','hydro'],['recycle','pollution','abundant','plentiful'],['nuclear','solar','resource','shortage']]
},
11:{
 I:[['campsite','driverless','vehicle','autopilot'],['wheel','weather','means','dream'],['balanced','crashed','stopped','travelled'],['traffic','space','transport','jam'],['hyperloop','system','energy','friendly']],
 II:[['driverless','teleport','electric','energy'],['pollute','autopilot','expensive','success'],['electricity','hyperloop','teleporter','solowheel'],['popular','automated','convenient','vehicle'],['power','traffic','metro','appear']]
},
12:{
 I:[['capital','river','site','rich'],['speak','breakfast','beach','peaceful'],['laughed','used','talked','visited'],['picnic','culture','ocean','country'],['land','native','ancient','location']],
 II:[['penguin','unique','landscapes','coastline'],['tattoo','symbol','mountain','sunset'],['traditional','activity','historical','entertainment'],['capital','holiday','kangaroo','wonderful'],['industry','museum','fantastic','amazing']]
}};
let enriched=0;
for(const test of bank.tests){
 const data=choices[test.unit];if(!data||!test.pdfAsset)continue;
 for(const [label,items] of Object.entries(data)){
  const section=test.sections.find(s=>s.label===label);
  if(!section||section.questions.length!==items.length)continue;
  for(let i=0;i<items.length;i++){
   const record=items[i];
   const options=Array.isArray(record[0])?record:record[1];
   if(options.length!==4)continue;
   section.questions[i].options=options;
   if(!Array.isArray(record[0]))
     section.questions[i].text=record[0];
   enriched++;
  }
 }
}
bank.verifiedChoiceWords=enriched;
})();