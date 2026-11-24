/* Mai Lan Hương, TEST FOR UNIT 11, printed pp155–159, scan pp157–161.
   Answer key printed pp205–206, scan pp207–208. */
(function(){'use strict';const b=window.LDDGrade7BookTests;if(!b)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
b.tests.push({id:'mlh7-unit11-test',unit:11,title:'TEST FOR UNIT 11',
bookPages:'155–159',pdfPages:'157–161',verified:true,source:b.source,sections:[
{label:'I',title:'Choose the word that has underlined part pronounced differently from the rest.',questions:[
c('',['campsite','driverless','vehicle','autopilot'],'c'),
c('',['wheel','weather','means','dream'],'b'),
c('',['balanced','crashed','stopped','travelled'],'d'),
c('',['traffic','space','transport','jam'],'b'),
c('',['hyperloop','system','energy','friendly'],'a')
],underlines:[['i','i','i','i'],['ea','ea','ea','ea'],['ed','ed','ed','ed'],['a','a','a','a'],['y','y','y','y']]},
{label:'II',title:'Choose the word that has different stress pattern.',questions:[
c('',['driverless','teleport','electric','energy'],'c'),
c('',['pollute','autopilot','expensive','success'],'b'),
c('',['electricity','hyperloop','teleporter','solowheel'],'a'),
c('',['popular','automated','convenient','vehicle'],'c'),
c('',['power','traffic','metro','appear'],'d')
]},
{label:'III',title:'Complete the sentences with an appropriate word.',questions:[
w('I think teleportation will be used as a ______ of transport.','means'),
w('Google Maps will help you to avoid ______ jams.','traffic'),
w('98.3% of trucks in the Europe ______ on diesel, while petrol fuels take only 1%.','run'),
w('To teleport is to ______ and then reappear at a different place.','disappear'),
w('Will we travel in ______ cars in the near future? ~ Yes, sure. Cars without drivers will come soon.','driverless / self-driving'),
w('Electric cars are more environmentally ______ than petrol cars.','friendly'),
w('The ______ is a one-wheeled vehicle and the rider stands on it and rides it.','solowheel'),
w('Can I borrow your pen? ______ won’t work.','Mine')
]},
{label:'IV',title:'Choose the best answer a, b, c or d to complete the sentences.',questions:[
c('You must wear a helmet when getting ______ a motorbike.',['in','at','to','on'],'d'),
c('Will self-driving cars be normal ______ ten years?',['in','by','for','to'],'a'),
c('I didn’t have my textbook for English class, so Brian lent me ______.',['her','his','mine','your'],'b'),
c('The girl is too short to reach the ______ on her father’s bike.',['wheels','brakes','pedals','seats'],'c'),
c('______ cars emit low emissions and make the environment safer.',['Eco-friendly','High-speed','Automated','Self-balancing'],'a'),
c('Self-driving vehicles could make driving more ______, especially in cities.',['popular','efficient','convenient','economical'],'c'),
c('______ will we travel in the future? - By flying car, I think.',['What','How','When','Which'],'b'),
c('I’d prefer to have a ______ and I’ll use it to fly everywhere.',['self-driving car','skytran','hyperloop','bamboo-copter'],'d'),
c('There will be no drivers in the future ______ all cars, buses and trucks will be driverless.',['because','so','but','although'],'a'),
c('“When will we have flying cars?” “______”',['As soon as possible.','Maybe sooner than you think.','Always on its way, I guess.','I don’t think much about it.'],'b')
]},
{label:'V',title:'Write the correct form or tense of the verbs in brackets.',questions:[
w('I ______ (read) an article about flying cars yesterday.','read'),
w('______ (flying cars/ be) a reality in 30 years’ time?','Will flying cars be'),
w('I think autonomous cars ______ (not work) until we have 5G.','won’t work'),
w('Cities all over the world ______ (face) serious traffic problems these days.','are facing'),
w('Transportation ______ (change) dramatically in the next 30 years.','will change'),
w('Three commercial ventures ______ (carry) rich passengers into space in 2021.','carried'),
w('At present petrol-powered cars ______ (still/ pollute) the environment.','are still polluting'),
w('Let me ______ (give) you a detailed explanation of the autopilot function.','give'),
w('I would prefer ______ (go) on a pilotless plane.','to go'),
w('Safety features help the driver avoid ______ (have) a crash.','having')
]},
{label:'VI',title:'Supply the correct form of the word in brackets.',questions:[
w('When cycling on the road, remember: ______ first. (safe)','safety'),
w('Will we have personal ______ in the future? (teleport)','teleportation'),
w('______ need a good sense of balance when riding this solowheel. (ride)','Riders'),
w('______ cars will make it easier for people who can’t drive. (Drive)','Driverless'),
w('Who is the ______ of the flying car? (invent)','inventor'),
w('These cars have the most ______ seats you can find. (comfort)','comfortable'),
w('Teleporters make you ______ and then reappear at your destination. (appear)','disappear'),
w('We can ______ travel between cities using the inter-city buses. (convenient)','conveniently')
]},
{label:'VII',title:'There is one mistake in each sentence. Find and correct it.',questions:[
w('What mean of transport are you using?','mean → means'),
w('I’d like to use the walkcar because it runs on electric.','electric → electricity'),
w('The system will stop everyone from crash and help them avoid traffic jams.','crash → crashing'),
w('My dog wagged it’s tail when it saw the girl next to my door.','it’s → its'),
w('Will flying cars to help us solve the traffic jam problem?','to help → help'),
w('A amazing new train will speed along at 800 miles per hour.','A → An'),
w('Your cat is adorable, but not as adorable as me.','me → mine'),
w('His paintings were very colorful, but I liked hers paintings better.','hers → her')
]},
{label:'VIII',title:'Match the sentences in column A to the sentences in column B to make a complete dialogue.',type:'match',
choices:[
'We can’t travel far in that short time. How can it run?',
'Oh my God! USD 20,000 for 6 minutes? It’s too expensive.',
'What is it? A board?',
'Really? I’d prefer to have an Arcaboard. How much does it cost?',
'Sounds great! Does it look like Aladdin’s magic carpet?',
'Oh, I think it’s not easy to ride the ArcaBoard safely.',
'That’s so simple! Why don’t we make one?',
'Right. How much does the hoverboard weigh?'
],questions:[
m('Did you hear about Arcaboard?','c'),
m('Yes. It’s an electric hoverboard that can fly.','e'),
m('No, it doesn’t. It can hover just about one foot above the ground... for six minutes, actually.','a'),
m('It runs on 36 electric ducted fans, powered by battery packs.','g'),
m('It’s not simple because you need a strong battery system to lift the heavy board.','h'),
m('About 180 lbs. And it can be steered by its rider’s body.','f'),
m('Not difficult at all! There is a stabilization system built into the ArcaBoard to ensure a safe ride.','d'),
m('USD 20,000.','b')
]},
{label:'IX',title:'Choose the word which best fits each gap.',
passage:'Teleportation – A Faster-than-Light Transportation Method\n\nTeleportation is one of those sci-fi technologies which at once (1)______ us to a fictional world where one can easily transport from a location to another at a blink of an eye, no matter how (2)______ the distance between them is.\n\nYou have seen the teleportation (3)______ sci-fi movies like Star Trek, X-Men, Jumper, and Dr. Strange etc. where people stand in a portal or create a portal and (4)______ reach to the other side of the earth or the universe.\n\nThe technology has been known for many years and many great (5)______ had researched on it. But it is too futuristic that even in the 21st century people take it (6)______ as a magic or a fiction.\n\nHowever, that doesn’t mean it can’t be possible (7)______ scientists successfully teleported a light particle photon. And since then, many experiments took (8)______ where they got success. It’s just a beginning to get this faster-than-light transportation technology. There still needs a long way to travel.',
questions:[
c('',['rides','gets','makes','takes'],'d'),
c('',['much','long','far','old'],'c'),
c('',['on','in','of','from'],'b'),
c('',['certainly','directly','immediately','suddenly'],'c'),
c('',['sciences','scientific','scientism','scientists'],'d'),
c('',['either','neither','both','also'],'a'),
c('',['although','because','so','but'],'b'),
c('',['part','charge','place','control'],'c')
]},
{label:'X',title:'Read the passage carefully then do the tasks.',type:'match',
passage:'WHEN WILL WE HAVE FLYING CARS?\n\nPeople have been trying to build a flying car for a long time. So far, no one has been able to get a car off the ground safely. But engineers keep trying!\n\nOne problem is that flying cars need wings. The wings must be designed so they will not stick out into other lanes of the road. Engineers are looking for solutions to that problem.\n\nTwo kinds of flying cars are being developed that may solve the problem. One type is called the Transition. It has blades that spin and lift the car. Those blades fold against the car’s sides when the car is on the ground. Another kind is named the Skycar. It has wings with big propellers. These propeller wings fold up and can be packed in the car’s trunk.\n\nFlying cars will not just fly up from the road. They will have to take off from an airport runway. Still, some people are eager to have one of their own. When will people be able to buy flying cars? Nobody knows. But one company already has a hundred customers waiting for one.\n\nSo fasten your seat belts, and get ready for takeoff. Someday, cars may be on the road and in the air!',
choices:[
'the covered space at the back of a car','planned and built','wanting very much',
'turn round and round quickly','leave the ground and start flying'
],questions:[
m('A. Match the words with their meanings.\n1. designed','b'),
m('2. take off','e'),m('3. spin','d'),m('4. trunk','a'),m('5. eager','c'),
c('B. Decide whether the following statements are true (T) or false (F).\n1. Up to now, there has been no flying car that is used safely.',['True','False'],'a'),
c('2. One problem for flying cars is designing the car’s wings.',['True','False'],'a'),
c('3. Manufacturers are trying to solve the problem.',['True','False'],'b'),
c('4. The Skycar has wings that fold flat against the sides.',['True','False'],'b'),
c('5. Flying cars will be able to fly up into the air straight from the road.',['True','False'],'b'),
c('6. Many people are excited about flying cars.',['True','False'],'a')
]},
{label:'XI',title:'Make sentences using the cues given.',questions:[
w('you/ ready/ fly/ a pilotless plane?','Are you ready to fly on a pilotless plane?'),
w('I think/ electric cars/ replace/ gasoline cars/ twenty years.','I think electric cars will replace gasoline cars in twenty years.'),
w('I/ would prefer/ have/ jetpack/ fly/ the moon/ someday.','I’d prefer to have a jetpack to fly to the moon someday.'),
w('many people/ travel/ work/ flying car/ 2050.','Many people will travel to work by flying car in/ by 2050.'),
w('at present/ inventors/ constantly/ work/ on/ improve/ transportation.','At present, inventors are constantly working on improving transportation.'),
w('we/ have/ driverless vehicles/ near future?','Will we have driverless vehicles in the near future?'),
w('Teleporter/ take/ very little time/ to travel/ from one country/ another.','A teleporter takes very little time to travel from one country to another.'),
w('Although/ electric cars/ can/ help/ reduce/ air pollution/ they/ still/ cause/ traffic congestion.','Although electric cars can help reduce air pollution, they still cause traffic congestion.')
]}
]});
})();