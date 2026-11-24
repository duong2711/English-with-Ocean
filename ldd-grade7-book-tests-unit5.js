/* Original scan Mai Lan Hương, TEST FOR UNIT 5, printed pp.64–68,
   PDF pp.66–70; checked against answers printed pp.188–189. */
(function(){
'use strict';const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
bank.tests.push({id:'mlh7-unit5-test',unit:5,title:'TEST FOR UNIT 5',
 bookPages:'64–68',pdfPages:'66–70',verified:true,source:bank.source,
 sections:[
 {label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
  c('',['bread','beef','meat','tea'],'a'),
  c('',['audience','sauce','sausage','taught'],'c'),
  c('',['eggs','cups','cartons','noodles'],'b'),
  c('',['soup','salt','sauce','sugar'],'d'),
  c('',['fridge','rice','spinach','milk'],'b')
 ],underlines:[['ea','ee','ea','ea'],['au','au','au','au'],['s','s','s','s'],['s','s','s','s'],['i','i','i','i']]},
 {label:'II',title:'Choose the odd one out.',questions:[
  c('',['juice','sandwich','lemonade','milk'],'b'),
  c('',['breakfast','lunch','dinner','sauce'],'d'),
  c('',['egg','pork','beef','ham'],'a'),
  c('',['cheese','salt','orange','bread'],'c'),
  c('',['bowl','glass','plate','fork'],'d')
 ]},
 {label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
  c('Pho is always served ______ fresh herbs, bean sprouts, sliced-up chilies, and lime.',['for','with','in','on'],'b'),
  c('You need to ______ the meat at a low temperature for three hours.',['order','toast','stew','serve'],'c'),
  c('You don’t need to take ______ food on the trip.',['a','some','any','the'],'c'),
  c('We need a ______ of bread to make the sandwiches for everyone.',['carton','bar','loaf','tube'],'c'),
  c('Fruit and vegetables have ______ vitamins and minerals that help keep us healthy.',['much','a lot','any','lots of'],'d'),
  c('My lemonade is a bit ______. Can you give me some sugar, please?',['sour','sweet','spicy','salty'],'a'),
  c('She had a piece of pie and ______ coffee this morning.',['any','some','a','lots of'],'b'),
  c('______ cheese do we need to make a cheese cake? ~ About 250 grams.',['What','How grams','How much','How many'],'c'),
  c('Coconut is a basic ______ for many curries and other Asian dishes.',['recipe','dish','formulary','ingredient'],'d'),
  c('Alan: ______\nHuan: Pho, bun cha, bun bo, banh mi, com tam, etc.',['What Vietnamese food should I try?','What’s your favourite drink?','How do you cook Vietnamese food?','How much food do you like?'],'a')
 ]},
 {label:'IV',title:'Write the correct tense or form of the verbs in brackets.',questions:[
  w('What ______ you ______ (buy) at the grocery store yesterday?','did … buy'),
  w('This coffee ______ (taste) terrible, but the biscuits ______ (be) great.','tastes – are'),
  w('Fruits and vegetables ______ (contain) important vitamins, minerals and fiber.','contain'),
  w('Last year we ______ (go) on a school trip to Scotland.','went'),
  w('At the moment Joana ______ (learn) to cook some Vietnamese dishes.','is learning'),
  w('I’m very sorry Dr. Jones ______ (not be) back in the clinic until 2pm.','won’t be'),
  w('The chicken meat served with pho ga ______ (cut) into thin slices.','is cut'),
  w('My father ______ (eat) pho almost every morning at the restaurant nearby.','eats'),
  w('The broth is made by ______ (stew) cow bones for a long time.','stewing'),
  w('Would you like anything ______ (drink), Mike?','to drink')
 ]},
 {label:'V',title:'Supply the correct form of the words in brackets.',questions:[
  w('The soup had a very ______ taste. (salt)','salty'),
  w('She covered the cake with a ______ of sugar and whites of eggs. (mix)','mixture'),
  w('Most children enjoy eating ______ chicken and French fries. (fry)','fried'),
  w('The pineapple was sweet and ______. (juice)','juicy'),
  w('Meats and fish are ______ used in all Vietnamese cooking. (common)','commonly'),
  w('The chicken meat is ______ and cut into thin slices. (bone)','boneless'),
  w('It took about 30 minutes of ______ and 40 minutes of baking. (prepare)','preparation'),
  w('The sauce itself was ______ and slightly sweet. (fragrance)','fragrant')
 ]},
 {label:'VI',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
  w('How many orange juice have you had today?','many → much'),
  w('Are there some eggs in the fridge?','some → any'),
  w('Would you like a cheese with your pasta?','a → some'),
  w('Salt is one of important ingredient for almost all dishes.','ingredient → ingredients'),
  w('Can you buy some breads on your way home?','breads → bread'),
  w('What do you usually have in breakfast?','in → for'),
  w('Vietnamese eat more instant noodles to Japanese.','to → than'),
  w('Eating fruit and vegetables have many health benefits.','have → has')
 ]},
 {label:'VII',title:'Match the questions with the answers.',type:'match',
 choices:['Beer, orange juice and mineral water.','Very good.','Two or three.','No, thanks. I’m full.','Yes. I’d like chicken with rice, please.','Just a bottle of mineral water, please.','Bun bo and mien ga.','250 grams.'],
 questions:[
  m('Are you ready to order?','e'),
  m('How much flour do we need?','h'),
  m('What is there to drink?','a'),
  m('What Vietnamese food can you cook?','g'),
  m('How many slices of ham do you want?','c'),
  m('How does this garlic soup taste?','b'),
  m('Would you like another bowl of rice?','d'),
  m('Do you want something to drink?','f')
 ]},
 {label:'VIII',title:'Choose the word which best fits each gap.',
 passage:'Healthy eating is essential for teens’ good health and growth. Healthy eating means they will have (1)______ chance of developing chronic diseases like heart disease, type 2 diabetes, obesity and some cancers. It will also mean they feel better and enjoy life more. To stay healthy and (2)______ a healthy weight, teens need to be physically active and eat the right amount of nutrients to balance the energy they use.\n\nSome foods are not essential in teens’ diets. These are called ‘discretionary foods’ that are generally (3)______ in kilojoules, saturated fat, added sugars or added salt and low in fibre. Discretionary foods and drinks include sweet biscuits, cakes and desserts; processed meats and sausages; ice-cream, chocolate; burgers, pizza, hot chips and fried foods; crisps and other fatty or salty snacks; cream and butter; sweetened condensed milk and (4)______ drinks. While it’s okay to eat small amounts of discretionary foods (5)______ as part of a balanced diet, teens should try to limit these foods in their daily diet. Eating large amounts of discretionary foods can lead (6)______ overweight, obesity and other health conditions like type-2 diabetes.',
 questions:[
  c('',['less','some','much','more'],'a'),
  c('',['lose','gain','maintain','become'],'c'),
  c('',['strong','good','heavy','high'],'d'),
  c('',['iced','delicious','tasty','soft'],'d'),
  c('',['regularly','occasionally','mainly','gradually'],'b'),
  c('',['to','in','on','of'],'a')
 ]},
 {label:'IX',title:'Read the text carefully then choose the correct answers.',
 passage:'Vietnamese food culture varies by regions from the north to the south. In Northern Vietnam, food is characterized by light and balanced. Northern Vietnam is seen to be the cradle of Vietnamese cuisine with many notable dishes like Pho, Bun Rieu, Bun Thang, Bun Cha, Banh Cuon, etc. Then, food culture in Northern Vietnam became popular in Central and Southern Vietnam with suitable flavors in each region.\n\nThe regional cuisine of Central Vietnam is famous for its spicy food. Hue cuisine is typical Central Vietnam’s food culture. Food in the region is often used with chili peppers and shrimp sauces, namely, Bun Bo Hue, Banh Khoai, Banh Beo, etc.\n\nIn Southern Vietnam, the warm weather and fertile soil create an ideal condition for planting a variety of fruit, vegetables and livestock. Thus, food in the region is often added with garlic, shallots and fresh herbs. Particularly, Southerners are favored of sugar; they add sugar in almost all dishes. Some signature dishes from Southern Vietnam include Banh Khot and Bun Mam.',
 questions:[
  c('It is considered that Vietnamese cuisine ______.',['originated from the North','became more and more popular','always combines taste and colour','can be found only in Northern Vietnam'],'a'),
  c('What are the features of Northern Vietnamese food?',['It’s delicious and healthy.','It’s sweet and sour.','It’s light and balanced.','It’s a bit fatty and salty.'],'c'),
  c('Hue cuisine is notable for its ______.',['colorful food','spicy taste','bitter taste','light flavor'],'b'),
  c('In Southern Vietnam, ______.',['the warm weather makes it hard to plant fruit and vegetables','fresh herbs are always used in cooking','people love sweet food','sugar is often added to dishes'],'d'),
  c('Which of the following is NOT true?',['Food in Vietnam changes region to region.','Southerners do not like northern food due to its light flavor.','Chili peppers and shrimp sauces are among the frequently used ingredients.','Bun Bo Hue is a typical dish of the Central Vietnam cuisine.'],'b')
 ]},
 {label:'X',title:'Make questions for the underlined parts.',questions:[
  w('She needs twelve eggs to make two cakes. [twelve eggs]','How many eggs does she need to make two cakes?'),
  w('They drank a lot of wine at the party last night. [a lot of]','How much wine did they drink at the party last night?'),
  w('I often drink coffee in the morning. [in the morning]','When do you often drink coffee?'),
  w('Beef noodle soup is my favourite food. [Beef noodle soup]','What is your favourite food?'),
  w('My lemonade tastes a bit sour. [a bit sour]','How does your lemonade taste?'),
  w('No, there isn’t any milk in the fridge. [No]','Is there any milk in the fridge?'),
  w('No, thanks. I love cookies, but I’m full. [No, thanks]','Would you like some cookies?'),
  w('The beef broth is made by stewing cow bones. [by stewing cow bones]','How is the beef broth made?')
 ]}
]});
})();