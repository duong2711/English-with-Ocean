/* Mai Lan Hương: TEST FOR UNIT 12, printed pp167–172,
   PDF pp169–174; answers printed pp207–208 (PDF pp209–210). */
(function(){'use strict';const b=window.LDDGrade7BookTests;if(!b)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
b.tests.push({id:'mlh7-unit12-test',unit:12,title:'TEST FOR UNIT 12',
bookPages:'167–172',pdfPages:'169–174',verified:true,source:b.source,sections:[
{label:'I',title:'Choose the word that has underlined part pronounced differently from the rest.',questions:[
c('',['capital','river','site','rich'],'c'),
c('',['speak','breakfast','beach','peaceful'],'b'),
c('',['laughed','used','talked','visited'],'d'),
c('',['picnic','culture','ocean','country'],'c'),
c('',['land','native','ancient','location'],'a')
],underlines:[['i','i','i','i'],['ea','ea','ea','ea'],['ed','ed','ed','ed'],['c','c','c','c'],['a','a','a','a']]},
{label:'II',title:'Choose the word that has different stress pattern.',questions:[
c('',['penguin','unique','landscapes','coastline'],'b'),
c('',['tattoo','symbol','mountain','sunset'],'a'),
c('',['traditional','activity','historical','entertainment'],'d'),
c('',['capital','holiday','kangaroo','wonderful'],'c'),
c('',['industry','museum','fantastic','amazing'],'a')
]},
{label:'III',title:'Complete each sentence with an appropriate word in the box.',
passage:'Word box: native · statue · capital · landscapes · rich · royal · palace · sightseeing',
questions:[
w('Washington, D.C. is the ______ city of the United States of America.','capital'),
w('The British ______ family comprises Queen Elizabeth II and her close relations.','royal'),
w('Some people like to lie on the beach, but he prefers to go ______.','sightseeing'),
w('New Zealand is a modern, English speaking country with a ______ culture.','rich'),
w('______ Americans, also known as American Indians, are the indigenous peoples of the United States.','Native'),
w('Buckingham ______ is recognised around the world as the home of the Queen.','Palace'),
w('The Lake District in England is one of the most beautiful ______ in the entire country.','landscapes'),
w('The ______ of Liberty is a colossal sculpture on Liberty Island in New York Harbor, New York City.','Statue')
]},
{label:'IV',title:'Choose the best answer a, b, c or d to complete the sentence.',questions:[
c('Niagara Falls is a natural wonder ______ both the USA and Canada.',['on','with','of','for'],'c'),
c('Tourists cannot reach many cities in Alaska ______ road, sea, or river.',['in','by','at','to'],'b'),
c('The red and white maple leaf flag is officially called the ______ Flag of Canada.',['Local','National','Native','Ancient'],'b'),
c('Do you know that New Zealand has ______ cleanest and safest air on the planet?',['the','an','a','Ø'],'a'),
c('New Zealand is a(n) ______ country in the southwestern Pacific Ocean.',['capital','land','island','coast'],'c'),
c('______ is one of the four countries in the United Kingdom, with England, Scotland and Wales.',['Australia','The USA','Canada','Northern Ireland'],'d'),
c('______ both Australia and New Zealand are former British colonies, they were first discovered by a Dutchman.',['As','Although','Because','While'],'b'),
c('We went penguin ______ in Stewart Island in New Zealand.',['swimming','running','walking','watching'],'d'),
c('______ Statue of Liberty in New York City was ______ present from France.',['Ø/ the','A/ a','The/ a','The/ the'],'c'),
c('“New York City is described as the cultural, financial, and media capital of the world.” “______”',['How is it?','Amazing!','Alright.','Not at all.'],'b')
]},
{label:'V',title:'Write the correct form or tense of verbs in brackets.',questions:[
w('We ______ (make) a two-week tour of Australia right now.','are making'),
w('The Maori people ______ (come) to New Zealand about 1,000 years ago.','came'),
w('Toronto ______ (be) Canada’s largest metropole with over 6 million people.','is'),
w('I ______ (visit) the Museum of Fine arts if I go to study in Montreal.','will visit'),
w('Every year, Quebec City in Canada ______ (have) a hotel made entirely of ice.','has'),
w('Let’s ______ (come) on a Harry Potter themed walking tour across London.','come'),
w('On arrival in Dublin Airport next week, we ______ (meet) our Irish tour guide.','will meet'),
w('Instead of celebrating the New Year at midnight, how about ______ (ring) in it sooner?','ringing'),
w('I’m interested in traveling, and I ______ (read) about travel at the moment.','am reading'),
w('King George V ______ (declare) red and white to be Canada’s national colors in 1921.','declared')
]},
{label:'VI',title:'Write the correct form of the words in brackets.',questions:[
w('The landscape of north west Wales is an area of remarkable ______ and breathtaking beauty. (unique)','uniqueness'),
w('The color white in the Scottish flag ______ peace, and the blue represents the sky. (symbol)','symbolizes'),
w('Modernizing ______ buildings can often do more harm than good. (history)','historic'),
w('The scenery in the USA is ______ to the tourists from the whole world. (attract)','attractive'),
w('______, in England, turkey is eaten on Christmas Day. (tradition)','Traditionally'),
w('The tourists stared at the koala in ______. (amaze)','amazement'),
w('London’s population makes it by far the ______ city in the UK. (large)','largest'),
w('English is the most widely spoken language if we put together native and non-native ______. (speak)','speakers'),
w('Lochness Lake in Scotland is ______ for its unique Nessie monster. (fame)','famous'),
w('My cousin in the US sometimes goes ______ on Lake Michigan. (boat)','boating')
]},
{label:'VII',title:'There is one mistake in each sentence. Find and correct it.',questions:[
w('Nearly everyone in Northern Ireland speak English.','speak → speaks'),
w('Wales has a long coastline that runs along three sides of an country.','an → the'),
w('Australia is home for a variety of unique animals, such as koala and kangaroo.','for → to'),
w('Alexander Graham Bell, invention of the telephone, was born in Edinburgh, Scotland.','invention → inventor'),
w('Winter sports such as ice hockey, skiing and ice skating is very popular in Canada.','is → are'),
w('Wales has more castles per square mile as any other country in the world.','as → than'),
w('Scottish is a country in Europe and is part of the island of Great Britain.','Scottish → Scotland'),
w('Northern Ireland is a popular place to go walking or doing outdoor activities.','doing → do')
]},
{label:'VIII',title:'Match sentences.',type:'match',
choices:[
'Really? How was your journey?',
'Is it the nickname for the Great Bell of Westminster?',
'Do you mean they are located on the border between the two countries?',
'A rose? I didn’t know that.','About two hours.',
'Yes. It’s on the western side of Scotland.','It’s in California.','Let’s go hiking.'
],questions:[
m('The national emblem of England is a rose.','d'),
m('Where is Los Angeles?','g'),
m('I went to Ireland for the summer.','a'),
m('How do we explore this national park?','h'),
m('The Big Ben is famous for its correct time.','b'),
m('How long does it take to travel from Cardiff to London by train?','e'),
m('The Great Lakes link the US and Canada.','c'),
m('Is Glasgow the largest city in Scotland?','f')
]},
{label:'IX',title:'Choose the correct answers to complete the passage.',
passage:'Canada has a very distinctive national flag, with its red and white maple leaf design. This flag became the (1)______ flag of Canada in 1965, after many years of discussion and dispute over various different designs. It was not, however, the first national flag that Canada ever had. The other national flags that were used to (2)______ Canada throughout history displayed the country’s (3)______ ties with Europe. For instance, both before and after Confederation in 1867, which was when the British North American colonies of Nova Scotia, New Brunswick and the Province of Canada joined (4)______ to form the Dominion of Canada, the country used the Union Jack, which is the United Kingdom’s (5)______ Union Flag.\n\nIn 1965, the design of the flag (6)______ again. The search for a new flag began many years before in 1925 with the Privy Council and, in 1946, a parliamentary committee looked over more than 2,600 potential designs. (7)______, it seemed impossible for people to agree on one design. An agreement was finally reached in 1965 and, on the 15th of February of that year, the National Flag of Canada that we know today was (8)______ for the first time over Parliament Hill.',
questions:[
c('',['international','national','global','local'],'b'),
c('',['regard','feature','describe','represent'],'d'),
c('',['historic','history','historian','historically'],'a'),
c('',['together','another','others','each other'],'a'),
c('',['Republic','Democracy','Royal','United'],'c'),
c('',['turned','made','changed','created'],'c'),
c('',['Therefore','However','Although','Moreover'],'b'),
c('',['pushed','praised','pulled','raised'],'d')
]},
{label:'X',title:'Read the passage carefully then do the tasks.',type:'match',
passage:'Kiwi is the nickname used internationally for people from New Zealand, as well as being a relatively common self-reference. The name derives from the kiwi, a flightless bird, which is native to, and the national symbol of, New Zealand. Unlike many demographic labels, its usage is not considered offensive; it is generally viewed as a symbol of pride and endearment for the people of New Zealand.\n\nHistorically, the first New Zealanders to be widely known as Kiwis were the military. The Oxford English Dictionary gives the first use of the “Kiwi” to mean “New Zealander” in 1918. The first official use of the term by a New Zealand sports team was by the New Zealand Rugby League team on its 1938 Tour of Australia.\n\nFollowing World War II the term was gradually attributed to all New Zealanders and today, throughout the world they are referred to as Kiwis, as well as often referring to themselves that way.\n\nSpelling of the word Kiwi, when used to describe the people, is often capitalised, and takes the plural form Kiwis. The bird’s name is spelt with a lower-case k and, being a word of Māori origin, normally stays as kiwi when pluralised. Thus, two Kiwis refers to two people, whereas two kiwi refers to two birds.',
choices:[
'not able to fly','the beginning or cause of something',
'a sign, shape, or object used to represent something else',
'to say or believe something is the result of a particular thing',
'an informal name for someone or something'
],questions:[
m('A. Match the words with their definitions.\n1. nickname','e'),
m('2. flightless','a'),m('3. symbol','c'),m('4. attribute','d'),m('5. origin','b'),
c('B. Choose the best answers.\n1. According to the passage, we can use “kiwi” to call ______.',['the flightless bird of New Zealand','a citizen of New Zealand','both the bird and people of New Zealand','a kind of fruit in New Zealand'],'c'),
c('2. How do New Zealanders most probably feel when they are called “Kiwis”?',['unfriendly','confident','offensive','proud'],'d'),
c('3. When did they officially start to use “Kiwi” to refer to Newzealander?',['long time ago','in 1918','in 1938','today'],'c'),
c('4. To describe a bird and two people of New Zealand, we should write ______.',['“kiwi” for a bird and “Kiwis” for two people','“Kiwi” for a bird and “kiwis” for two people','“kiwis” for a bird and “Kiwi” for two people','“Kiwis” for a bird and “kiwi” for two people'],'a'),
c('5. Which of the following is NOT true according to the passage?',['Kiwi bird is native to and the national symbol of New Zealand.','Using the word “Kiwis” to refer to New Zealanders is offensive.','“Kiwis” was used to mention New Zealanders in the military and a New Zealand sports team.','“Kiwi” is a word of Māori origin.'],'b')
]},
{label:'XI',title:'Make sentences using the provided key words.',questions:[
w('Canada only officially /become/ independent from Britain / 1982.','Canada only officially became independent from Britain in 1982.'),
w('Australia /be/ only continent/ world without / active volcano.','Australia is the only continent in the world without an active volcano.'),
w('political cultures of/ United States/ and/ United Kingdom/ be/ different.','The political cultures of the United States and the United Kingdom are different.'),
w('Why/ Americans/ use/ mile and pound/ instead of/ kilometre and kilogram?','Why do (the) Americans use mile and pound instead of kilometre and kilogram?'),
w('trading relationship between/ UK/ and/ EU/ continue to be important/ future.','The trading relationship between the UK and the EU will continue to be important in the future.'),
w('Instead of sometime/ late November,/ Canada/ celebrate/ Thanksgiving/ middle of October.','Instead of sometime in late November, Canada celebrates Thanksgiving in the middle of October.'),
w('Many Scottish people/ move to/ Canada, Australia, and New Zealand/ 18th and 19th centuries.','Many Scottish people moved to Canada, Australia, and New Zealand in the 18th and 19th centuries.'),
w('Great Britain/ consist of/ Scotland, Wales and England/ and/ United Kingdom/ consist of/ Great Britain and Northern Ireland.','Great Britain consists of Scotland, Wales and England, and the United Kingdom consists of Great Britain and Northern Ireland.')
]}
]});
})();