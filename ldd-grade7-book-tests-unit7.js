/* Source Mai Lan Hương: TEST FOR UNIT 7, printed pp.94–98
   (PDF pp.96–100), answers printed p.194 (PDF p.196). */
(function(){'use strict';const b=window.LDDGrade7BookTests;if(!b)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
const signs=['No Overtaking','No Left Turn','Pedestrian Crossing','Slippery Road',
'Crossroads','No Parking','Go Ahead Only','Turn Right','Railway Crossing','Hospital Ahead'];
b.tests.push({id:'mlh7-unit7-test',unit:7,title:'TEST FOR UNIT 7',
 bookPages:'94–98',pdfPages:'96–100',verified:true,source:b.source,sections:[
{label:'I',title:'Choose the word whose underlined part is pronounced differently from the rest.',questions:[
 c('',['breaking','great','steak','healthy'],'d'),
 c('',['cycle','bicycle','fly','skyscraper'],'b'),
 c('',['circle','licence','vehicle','centre'],'c'),
 c('',['reversed','walked','stopped','obeyed'],'d'),
 c('',['park','pavement','plane','safety'],'a')
],underlines:[['ea','ea','ea','ea'],['y','y','y','y'],['c','c','c','c'],['ed','ed','ed','ed'],['a','a','a','a']]},
{label:'II',title:'Match the road signs with their meanings.',type:'match',
 choices:signs,questions:[
  {...m('Road sign 1','i'),signIndex:1},{...m('Road sign 2','d'),signIndex:2},
  {...m('Road sign 3','g'),signIndex:3},{...m('Road sign 4','j'),signIndex:4},
  {...m('Road sign 5','a'),signIndex:5},{...m('Road sign 6','f'),signIndex:6},
  {...m('Road sign 7','e'),signIndex:7},{...m('Road sign 8','b'),signIndex:8},
  {...m('Road sign 9','h'),signIndex:9},{...m('Road sign 10','c'),signIndex:10}
 ]},
{label:'III',title:'Choose the best answer a, b, c or d to complete the sentence.',questions:[
 c('You should walk across the street ______ the zebra crossing.',['on','at','in','from'],'b'),
 c('My house is not far from my school, so I usually go ______.',['on foot','by foot','by car','by air'],'a'),
 c('You ______ ride on the pavements. It’s dangerous not only for you, but for pedestrians.',['won’t','must','should','shouldn’t'],'d'),
 c('Bicycle riders must give a hand ______ when turning right.',['sign','direction','signal','crossing'],'c'),
 c('It is ______ to use a hand-held mobile phone while driving or riding.',['safe','important','illegal','careful'],'c'),
 c('______ does it take you to ride to school? - About 30 minutes.',['How long','How far','How often','How much'],'a'),
 c('A ______ is a part of a road that only bicycles are allowed to use.',['cycle cross','cycle lane','cycle line','cycle race'],'b'),
 c('You ______ cross the street when the light is red.',['should','don’t have to','can','mustn’t'],'d'),
 c('Drivers should always ______ the traffic laws to avoid traffic accidents.',['make','provide','allow','obey'],'d'),
 c('“How far is Vung Tau from Ho Chi Minh City?” - “______”',['It’s not very far.','It takes about two hours or more.','It’s about 120km.','You can get to Vung Tau by boat or bus.'],'c')
]},
{label:'IV',title:'Write the correct form or tense of the verbs in brackets.',questions:[
 w('The train ______ (leave) at 6.30, so we’ll be in your place by noon.','leaves'),
 w('My family ______ (fly) back from our Hong Kong holiday two days ago.','flew'),
 w('Right now, the students ______ (learn) road signs in the schoolyard.','are learning'),
 w('Usually Oanh ______ (walk) to school, but this week she ______ (ride) her bike.','walks – is riding'),
 w('The driver was so drunk that he ______ (lose) control of his car.','lost'),
 w('If I have enough money, I ______ (buy) a racing car.','will buy'),
 w('My father ______ (teach) me to ride a bike when I was seven.','taught'),
 w('She would like ______ (take) a priority seat, but the bus driver refused it.','to take'),
 w('Saudi women weren’t allowed ______ (drive) a car until recently.','to drive'),
 w('In South Africa, you have to let animals ______ (go) first.','go')
]},
{label:'V',title:'Supply the correct form of the words in brackets.',questions:[
 w('Young children are expected to show ______ to their parents. (obey)','obedience'),
 w('When cycling on the roads, remember: ______ first. (safe)','safety'),
 w('Children should avoid ______ foods such as hamburger and chips. (health)','unhealthy'),
 w('Most road accidents happen because the motorists drive ______. (care)','carelessly'),
 w('It is unsafe and ______ to pass another vehicle on the left. (legal)','illegal'),
 w('My ______ was delayed for over two hours due to bad weather. (fly)','flight'),
 w('Everyone should ______ obey traffic rules for their own safety. (strict)','strictly'),
 w('The policeman ______ the car to stop with a flashlight. (sign)','signaled'),
 w('Signs with red circles are mostly ______ – that means you can’t do something. (prohibit)','prohibitive'),
 w('This ______ sign indicates that traffic lights are ahead. (warn)','warning')
]},
{label:'VI',title:'There is one mistake in each sentence. Find and correct it.',questions:[
 w('You should careful look both ways before crossing the road.','careful → carefully'),
 w('He can drive a bicycle with his hands off the handlebars.','drive → ride'),
 w('How far does it take you to cycle to school? ~ About 20 minutes.','far → long'),
 w('You are not allowed to drive faster than the number on a limit speed sign.','limit speed → speed limit'),
 w('It about 1137 kilometres from Hanoi to Ho Chi Minh City.','It → It’s'),
 w('Bicycles are a cheap and efficient mean of transport.','mean → means'),
 w('A sign within a red triangle will warn people for something.','for → of'),
 w('Be careful when you are on roads. You must drive fast or carelessly!','must → mustn’t')
]},
{label:'VII',title:'Match the questions with the correct answers.',type:'match',choices:[
 'Oh, sorry sir, I don’t have it on me.','I was stuck in a traffic jam.',
 'Not very far. Just about 2 km.','Go straight ahead, then turn right at the crossroads.',
 'Yes, sir. You ran through the stop sign.','By motorbike.','Twenty minutes.','The plane, I think.'
],questions:[
 m('How does your father travel to work?','f'),
 m('May I see your driving license, please?','a'),
 m('Sir, did I do anything wrong?','e'),
 m('What took you so long?','b'),
 m('What is the fastest means of transport?','h'),
 m('How far is it from here to the railway station?','c'),
 m('Could you tell me how to get to the nearest bus stop, please?','d'),
 m('How long will it take to get there?','g')
]},
{label:'VIII',title:'Choose the word which best fits each gap.',
 passage:'Staying safe on foot and bike\n\nLook out for yourself and your friends when out (1)______ foot and bike. Choose the (2)______ routes you can, like quieter, slower roads, with pavements if you’re walking or (3)______ if you’re going by bike.\n\nIt’s easy to get distracted by your phone or by friends, but you need to be (4)______ to traffic. Put your phone away and take your earphones (5)______ when crossing the road. Don’t trust that drivers (6)______ spot you and be able to stop in time – many drivers go too fast and don’t (7)______ enough attention, (8)______ anything you can do to protect yourself is a good thing.',
 questions:[
 c('',['on','in','by','with'],'a'),
 c('',['safe','safer','safest','safely'],'c'),
 c('',['zebra crossings','cycle paths','footpaths','bumpy roads'],'b'),
 c('',['risky','warning','serious','alert'],'d'),
 c('',['off','over','out','down'],'c'),
 c('',['must','will','could','should'],'b'),
 c('',['pay','make','turn','take'],'a'),
 c('',['but','so','though','because'],'b')
]},
{label:'IX',title:'Read the text carefully, then do the tasks.',type:'match',
 passage:'Large cities often have problems that small towns and rural areas do not have. Two of the biggest problems are heavy traffic and the pollution that cars create. Of course, traffic problems and pollution are not only found in big cities. However, the higher populations and larger number of cars on the roads in cities can make the problems happen more often and with more noticeable effects.\n\nOne of the most common traffic problems that large cities have is congestion. As the population of a city increases, so does the number of cars on the road. Cities cannot always improve the number and size of their roads and highways to keep up with the number of cars. The result is traffic congestion, or traffic jams.\n\nWhen traffic jams happen, cars that are stuck in the congestion continue to run their engines. This creates pollution and is a big problem. Pollution causes health problems for the people in cities and also hurts the environment.',
 choices:['being too crowded or too full','unable to move','easy to see or recognise','in the countryside, not in the city','too many vehicles in one place prevents movement'],
 questions:[
 m('A. Match the words with their meanings.\n1. rural','d'),
 m('2. noticeable','c'),
 m('3. congestion','a'),
 m('4. traffic jam','e'),
 m('5. stuck','b'),
 c('B. Choose the correct answers.\n1. Where do traffic problems and pollution frequently happen?',['small towns','rural areas','big cities','remote villages'],'c'),
 c('2. According to the passage, what causes traffic congestion in big cities?',['A lot of city dwellers','Too many cars on the roads','Careless drivers','Less traffic signs on the streets'],'b'),
 c('3. The high number of cars is caused by ______.',['urban planning','traffic congestion','environmental pollution','the population'],'d'),
 c('4. The highway and road network is ______ of meeting the requirement of increasing number of vehicles.',['full','aware','incapable','uncertain'],'c'),
 c('5. Which of the following is NOT true?',['Only big cities have the problem of pollution.','Traffic jams cause pollution.','Pollution is a major problem in big cities.','Pollution causes health and environmental problems.'],'a')
]},
{label:'X',title:'Make sentences using the words given.',questions:[
 w('The roads/ Vietnam/ too/ narrow/ travel/ easily.','The roads in Vietnam are too narrow to travel easily.'),
 w('How far/ it/ your house/ the bookstore?','How far is it from your house to the bookstore?'),
 w('There/ be/ several crossroads/ the way/ to school.','There are several crossroads on the way to school.'),
 w('It/ very important/ obey/ traffic rules/ when/ use/ road.','It is very important to obey traffic rules when you use the road.'),
 w('It/ ten kilometres/ the town/ the airport.','It is (about) ten kilometres from the town to the airport.'),
 w('Two days ago/ we/ stuck/ traffic jam/ over two hours.','Two days ago, we were stuck in a traffic jam for over two hours.'),
 w('Most streets/ city centre/ congested/ rush hour.','Most streets in the city centre are congested in/ during the rush hour.'),
 w('Moscow/ police/ find/ you/ if/ you/ drive/ dirty car.','In Moscow, police will find you if you drive a dirty car.')
]}
]});
})();