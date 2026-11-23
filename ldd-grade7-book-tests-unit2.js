/* Verified from Mai Lan Hương / Hà Thanh Uyên TEST FOR UNIT 2,
   printed pp.24–27, scan PDF pp.26–29, answer key p.181. */
(function(){
'use strict';const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const m=(text,answer)=>({type:'match',text,answer});
const w=(text,answer)=>({type:'written',text,answer});
bank.tests.push({id:'mlh7-unit2-test',unit:2,title:'TEST FOR UNIT 2',bookPages:'24–27',pdfPages:'26–29',verified:true,source:bank.source,
sections:[
{label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
 c('', ['myth','cycling','itchy','allergy'],'b'),
 c('', ['headache','spread','health','weak'],'d'),
 c('', ['fat','leaf','of','safe'],'c'),
 c('', ['flu','sunburn','junk','much'],'a'),
 c('', ['wash','wear','wake','wrap'],'d')
],underlines:[['y','y','y','y'],['ea','ea','ea','ea'],['f','f','f','f'],['u','u','u','u'],['w','w','w','w']]},
{label:'II',title:'Choose the odd one out.',questions:[
 c('', ['running','coughing','cycling','swimming'],'b'),
 c('', ['vegetables','fish','fried chicken','fruits'],'c'),
 c('', ['cold','cough','stuffy nose','sunburn'],'d'),
 c('', ['tofu','milk','fruit juice','soda'],'a'),
 c('', ['fever','health','obesity','headache'],'b')
]},
{label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
 c('Eating fruits and vegetables provides you ______ nutrients.',['with','for','of','in'],'a'),
 c('If you want to ______ weight, you should follow a low-carb diet.',['lose','gain','put on','take'],'a'),
 c('Junk foods are high in ______ and sugar, which can lead to obesity.',['vitamin','protein','fat','salt'],'c'),
 c('He looks so ______. He can’t keep his eyes open!',['happy','tired','healthy','fit'],'b'),
 c('If you want to stay healthy, eat ______ vegetables, whole grains, fruit and fish.',['much','fewer','more','less'],'c'),
 c('Fruit tastes good ______ it’s healthy for your body.',['so','but','or','and'],'d'),
 c('You are ______ you eat, so don’t eat unhealthy foods.',['what','who','which','that'],'a'),
 c('SPF ______ protects our skin from the sun’s harmful rays.',['lip balm','suncream','soap','eye drop'],'b'),
 c('She tries to keep ______ by exercising daily and eating well.',['health','shape','size','fit'],'d'),
 c('“I think I have the flu.” “______”',['Apply suncream every 2 hours.','Don’t read in dim light.','Get rest and drink plenty of water.','Do more exercise and eat less fatty food.'],'c')
]},
{label:'IV',title:'Write the correct form or tense of the verbs in brackets.',questions:[
 w('______ (you/ eat) fried chicken last night?','Did you eat'),
 w('Stop eating burgers and fries – you ______ (put) on weight.','are putting'),
 w('I often ______ (drink) coca cola when I was a child.','drank'),
 w('Joana ______ (wash) her face regularly to prevent spots.','washes'),
 w('I think he ______ (not pass) the exam. He hasn’t studied at all.','won’t pass'),
 w('She ______ (have) a sore throat, and she ______ (cough) terribly now.','has – is coughing'),
 w('You should try ______ (exercise) a couple times a week.','to exercise'),
 w('He keeps ______ (sneeze), so I think he’s got a cold.','sneezing'),
 w('Alex spent all morning in the bookstore, but he ______ (not buy) anything.','didn’t buy'),
 w('Avoid ______ (eat) potato chips if you want to lose weight.','eating')
]},
{label:'V',title:'Supply the correct form of the words in brackets.',questions:[
 w('The Japanese eat ______, so they have high life expectancy. (health)','healthily'),
 w('Drinking ______ water can cause numerous health concerns. (dirt)','dirty'),
 w('My uncle is a ______. He doesn’t eat meat or fish. (vegetable)','vegetarian'),
 w('Walking is good for health and ______. (fit)','fitness'),
 w('Your lips can become ______ when they’re exposed to the sun or cold air. (chap)','chapped'),
 w('I got ______ during my beach vacation. (sunburn)','sunburnt / sunburned'),
 w('Lack of vitamin E can cause skin diseases and ______. (tired)','tiredness'),
 w('Add just enough sugar to ______ the fruit slightly. (sweet)','sweeten')
]},
{label:'VI',title:'Match the questions to the answers.',type:'match',
choices:[
 'A little better, but still feel tired.',
 'Wash your face daily and use gentle skin care products.',
 'Eat less junk food and do more exercise.',
 'Count me out. I prefer to stay home.',
 'We’ll feel tired and weak.',
 'Between 1,600 and 2,500.',
 'I think it’s running.',
 'Because it can help prevent cancer.'
],questions:[
 m('How many calories should I eat in a day?','f'),
 m('Shall we go and play basketball?','d'),
 m('What activity uses a lot of calories?','g'),
 m('What should I do to prevent spots?','b'),
 m('How do you feel now?','a'),
 m('What happens when we don’t have enough calories?','e'),
 m('Why should people drink green tea?','h'),
 m('What should I do to lose weight?','c')
]},
{label:'VII',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
 w('Sitting close to the laptop’s screen hurt your eyes.','hurt → hurts'),
 w('You can avoid many diseases by eat healthy food.','eat → eating'),
 w('You look so bad! How’s wrong with you?','How’s → What’s'),
 w('Eating lots of fast food can make you fatty.','fatty → fat'),
 w('Eating more fruit and vegetables to get vitamins, minerals and fiber.','Eating → Eat'),
 w('Good nutrition is a important part of leading a healthy lifestyle.','a important → an important'),
 w('If you eat more than your body needs, you’ll put weight.','put → put on'),
 w('Soft and fizzy drinks are high in calories and they’re bad for your tooth.','tooth → teeth')
]},
{label:'VIII',title:'Choose the word which best fits each gap.',
passage:'Breakfast is the (1)______ important meal of the day. It provides the nutrients your body needs for good health, the calories it needs for (2)______ and helps to maintain your blood sugar level. Studies have shown that people who don’t have breakfast have a low blood sugar level and are often slow, tired, hungry and (3)______ to concentrate. Surprisingly, breakfast actually plays a part in weight control. It’s easier to (4)______ weight if you eat in the morning rather than later in the day. Dividing the day’s calories (5)______ three meals helps take off weight more efficiently than (6)______ breakfast and having two larger meals a day does.',
questions:[
 c('', ['healthy','tasty','main','most'],'d'),
 c('', ['strength','power','energy','effort'],'c'),
 c('', ['able','enable','unable','capable'],'c'),
 c('', ['lose','put','gain','drop'],'a'),
 c('', ['in','into','up','for'],'b'),
 c('', ['skipping','making','buying','serving'],'a')
]},
{label:'IX',title:'Read the text carefully, then choose the correct answers.',
passage:'The island of Okinawa in Japan has some of the oldest people in the world. It’s famous for its high number of centenarians – men and women who live beyond 100 years of age. There have been many scientific studies of their lifestyle and you can even buy cookery books based on their diets. Some of the reasons for their good health are that they ...\n\n• go fishing and eat what they catch.\n• regularly do gardening and grow their own fruit and vegetables.\n• go cycling and never drive when they can walk.\n• often spend time with friends. They meet at people’s houses and play games.\n• rarely buy food from a supermarket.\n• do regular exercise, go swimming and lead active lives.',
questions:[
 c('According to the passage, Okinawa is well known for ______.',['its beauty','its centenarians','its subtropical climate','its cuisine'],'b'),
 c('The people of Okinawa ______.',['cook very well','eat a lot of meat','have an unhealthy diet','have the longest lifespan'],'d'),
 c('Which of the following is NOT true about the Okinawans?',['They eat what they fish and grow.','They often buy food at the supermarket.','They do exercise regularly.','They enjoy socializing with friends.'],'b'),
 c('A centenarian is a person who ______.',['is 100 years old','is almost 100 years old','is 100 years old or more','is 100 years old or less'],'c'),
 c('The Okinawans live a long life because ______.',['they have healthy diets and living habits','they walk as much as they can','they love gardening and going fishing','they only eat fruit and vegetables'],'a')
]},
{label:'X',title:'Write sentences, using the words given.',questions:[
 w('Phong/ eat/ lots of/ junk food/ so/ he/ putting/ weight','Phong eats lots of junk food, so he is putting on weight.'),
 w('I/ exercise/ daily/ because/ I/ want/ stay/ healthy','I exercise daily because I want to stay healthy.'),
 w('Sitting/ too/ close/ the TV/ hurt/ your eyes','Sitting too close to the TV hurts your eyes.'),
 w('She/ often/ take/ paracetamol/ if/ she/ get/ bad/ headache','She often takes paracetamol if she gets a bad headache.'),
 w('How many calories/ you/ burn/ do/ aerobics/ 2 hours?','How many calories do you burn doing aerobics for 2 hours?'),
 w('Getting enough sleep/ help/ students/ do/ their best/ the classroom','Getting enough sleep helps students (to) do their best in the classroom.')
]}
]});
})();