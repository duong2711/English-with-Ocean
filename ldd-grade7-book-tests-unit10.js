/* Mai Lan Hương Test for Unit 10, printed pp141–145 / scan pp143–147,
   checked answers printed p203 / scan p205. */
(function(){'use strict';const b=window.LDDGrade7BookTests;if(!b)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
b.tests.push({id:'mlh7-unit10-test',unit:10,title:'TEST FOR UNIT 10',
bookPages:'141–145',pdfPages:'143–147',verified:true,source:b.source,sections:[
{label:'I',title:'Choose the word that has the underlined part pronounced differently from the rest.',questions:[
c('',['solar','fossil','hydro','overheat'],'b'),
c('',['abundant','consumption','sunlight','pollution'],'d'),
c('',['certain','carbon','coal','convert'],'a'),
c('',['heat','cheap','instead','easily'],'c'),
c('',['replaced','limited','developed','walked'],'b')
],underlines:[['o','o','o','o'],['u','u','u','u'],['c','c','c','c'],['ea','ea','ea','ea'],['ed','ed','ed','ed']]},
{label:'II',title:'Choose the word that has different stress pattern.',questions:[
c('',['machine','carbon','harmful','turbine'],'a'),
c('',['generate','natural','effective','energy'],'c'),
c('',['limit','replace','panel','hydro'],'b'),
c('',['recycle','pollution','abundant','plentiful'],'d'),
c('',['nuclear','solar','resource','shortage'],'c')
]},
{label:'III',title:'Fill in each blank with an appropriate word. The first letter is given.',questions:[
w('N______ energy resources include coal, oil, natural gas and uranium.','Non-renewable'),
w('S______ energy creates clean, renewable power from the sun.','Solar'),
w('Low energy light b______ use less than 20% of the energy of an incandescent one.','bulbs'),
w('Coal is a f______ fuel that was formed millions of years ago.','fossil'),
w('R______ energy sources will never run out because they are easily replenished.','Renewable'),
w('Burning fossil fuels emits a lot of pollutants that are h______ to the environment.','harmful'),
w('Solar p______ are fitted to a building and turn the sun’s rays into energy.','panels'),
w('You should switch the light off when leaving the room to save e______.','electricity / energy')
]},
{label:'IV',title:'Choose the best answer, a, b, c or d to complete the sentence.',questions:[
c('Once non-renewable energy sources are used ______, they are gone forever.',['out','up','for','off'],'b'),
c('Many chemicals have a damaging effect ______ the environment.',['on','in','to','for'],'a'),
c('Renewable energy is also called “______ energy” because it doesn’t pollute the air.',['inexhaustible','available','clean','dangerous'],'c'),
c('______ coal causes air pollution, it still plays an important role in the production of electricity around the world.',['Even though','Due to','Because','However'],'a'),
c('What ______ if carbon dioxide levels continue to increase?',['happen','will happen','happened','is happening'],'b'),
c('The use of wind energy is growing rapidly because it is widely available and ______.',['environmental friendly','environmentally friendly','environment friendly','friendly environmental'],'b'),
c('Using solar panels at home can help ______ your electric bill and your carbon footprint.',['reduce','increase','provide','convert'],'a'),
c('Wind power is the most promising ______ source of energy.',['non-renewable','natural','limited','alternative'],'d'),
c('You can save much water by ______.',['using energy saving light bulbs','using biogas for cooking','taking showers instead of baths','walking or riding a bike to school'],'c'),
c('“Is it difficult to reduce our carbon footprints?” “______”',['It depends on the way you think.','Not at all. Just practicing the 3R’s.','It’s not if we still rely on fossil fuels.','I’m not sure. What will happen?'],'a')
]},
{label:'V',title:'Write the correct form or tense of the verbs in brackets.',questions:[
w('Most non-renewable energy sources ______ (be) fossil fuels: coal, petroleum, and natural gas.','are'),
w('I think alternative energy sources ______ (not replace) coal, oil, and gas soon.','won’t replace'),
w('At present, global demand for energy ______ (increase) rapidly.','is increasing'),
w('Three years ago, we ______ (install) a solar water heating system on our roof.','installed'),
w('If we ______ (reduce) the energy we use, we ______ (save) money.','reduce – will save'),
w('Wind power ______ (not generate) carbon emissions.','doesn’t generate'),
w('______ you ______ (do) a project on energy sources at the moment?','Are … doing'),
w('Burning fossil fuels ______ (emit) gases that are harmful to the environment.','emits'),
w('We decided ______ (invest) our time and effort on this new research project.','to invest'),
w('You should avoid ______ (use) cars or motorbikes for short trips.','using')
]},
{label:'VI',title:'Write the correct form of the words in brackets.',questions:[
w('Solar, wind, and hydro are ______ and inexhaustible. (renew)','renewable'),
w('Coal is also ______; there is a large reserve globally. (plenty)','plentiful'),
w('The movement of waves and tides can be used to generate ______. (electric)','electricity'),
w('Scientists are looking for clean and ______ sources of energy. (effect)','effective'),
w('Non-renewable sources are not ______ friendly and can have serious effect on our health. (environment)','environmentally'),
w('Natural gas is less ______ than coal or crude oil. (pollute)','polluting'),
w('A greenhouse stays warm because the glass traps the ______ of the sun. (hot)','heat'),
w('Turning off electrical appliances when they are not in use is a great way to reduce energy ______. (consume)','consumption')
]},
{label:'VII',title:'There is one mistake in each sentence. Find and correct it.',questions:[
w('The burning of fossil fuels is harmful for the environment and public health.','for → to'),
w('Most households are use natural gas for cooking right now.','use → using'),
w('Solar power is by far the more popular renewable energy source.','more → most'),
w('You should always turn the lights on when you leave the room.','on → off'),
w('Using solar energy instead fossil fuels can help reverse the effects of global warming.','instead → instead of'),
w('Many people living in rural areas use biogas to cook and heating.','to cook → for cooking'),
w('Renewable energy sources are available, clean and safety to use.','safety → safe'),
w('One of the ways you can save energy in your home are to use energy saving light bulbs.','are → is')
]},
{label:'VIII',title:'Write the questions for the answers.',questions:[
w('B: It is the amount of greenhouse gases – primarily carbon dioxide released into the atmosphere by human activities.','What is a carbon footprint?'),
w('B: The burning of fossil fuels in the environment.','What causes carbon emissions?'),
w('B: Carbon emissions contribute to climate change, which can have serious consequences for humans and their environment.','How does carbon footprint affect us?'),
w('B: You need to work out your energy use, water use and waste disposal.','How can I calculate my carbon footprint?'),
w('B: Turn off lights, TVs, computers when you do not need them. Walk or ride your bike instead of using cars. Reduce the amount of trash you create by recycling and reusing items.','How can I reduce my carbon footprint?')
]},
{label:'IX',title:'Choose the correct answers to complete the passage.',
passage:'CARBON FOOTPRINTS\n\nEverybody has a carbon footprint – it’s the (1)______ of carbon dioxide we produce with any action or activity. (2)______ carbon dioxide contributes to ‘greenhouse gases’, our carbon footprints have a direct impact (3)______ the environment. You can estimate your carbon footprint on any number of popular websites: if it’s (4)______, then you’re probably leading a relatively green lifestyle. But (5)______ happens if it’s big?\n\nWell, the answer is that you can (6)______ it. People contribute to balancing the negative effects of their actions by using (7)______ fuels, recycling, reforestation and a number of other activities which are said to contribute to a (8)______ of the carbon dioxide.',
questions:[
c('',['number','quality','amount','period'],'c'),
c('',['As','Although','However','Due to'],'a'),
c('',['for','to','on','in'],'c'),
c('',['small','large','free','fine'],'a'),
c('',['when','what','why','how'],'b'),
c('',['replace','reuse','increase','balance'],'d'),
c('',['fossil','leaded','smoky','green'],'d'),
c('',['moving','lowering','rising','falling'],'b')
]},
{label:'X',title:'Read the text carefully, then do the tasks.',
passage:'SOLAR ENERGY\n\nSunlight carries huge amounts of energy. You can feel the Sun’s energy when sunlight warms your skin on a summer day. To capture the Sun’s energy, scientists have developed solar cells, called photovoltaic cells. These cells convert sunlight into electricity.\n\nWhen sunlight hits a solar cell, some of the light energy is absorbed. This light energy causes the particles in the solar cell move faster, and the movement of these particles creates electricity.\n\nIn some places, large panels of solar cells harvest sunshine to make electricity for homes and businesses. Solar cells have been placed on cars and appliances, too. Since the Sun sends abundant free energy streaming toward Earth 24 hours a day, people in many parts of the world, not just the sunniest places, have fixed solar cells and solar panels on the roofs of their houses or businesses to lower their energy costs.\n\nExperts say that huge installation of solar panels in sunny regions could generate enough electricity to supply an entire country. Capturing this energy can help overcome our diminishing energy supply. New ways to capture this energy are being developed all the time to maximize efficiency.',
questions:[
c('What is the source of solar energy?',['sunlight','photovoltaic cells','solar panels','electricity'],'a'),
c('Solar cells are used ______.',['to collect energy from the sun.','to provide sunlight to houses.','to convert sunlight into electricity.','both a and c are correct.'],'d'),
c('Which of the following statements is true?',['Solar cells absorb all of the light energy from the sun.','The light energy causes the particles to move faster to make electricity.','Solar energy can be used to power homes and businesses only.','Large solar panels have been placed on cars and appliances.'],'b'),
c('As used in line 9, “abundant” most nearly means ______.',['unlimited','dangerous','plentiful','clean'],'c'),
c('Where have people fixed solar panels?',['In the sunniest places','Anywhere outside their houses','Inside their houses','On the roofs of their houses'],'d'),
c('As used in line 14, “diminishing” most nearly means ______.',['decreasing','increasing','unending','restoring'],'a'),
c('According to the passage, all of the following statements are true EXCEPT ______.',['the Sun produces a large amount of energy.','solar energy could provide enough electricity for the whole world.','scientists are constantly developing new ways to capture the Sun’s energy.','people use solar energy to reduce their energy costs.'],'b')
]},
{label:'XI',title:'Make sentences using the provided key words.',questions:[
w('electricity failure/ happen/ if/ fossil fuels/ run out/ one day?','Will electricity failure happen if fossil fuels run out one day?'),
w('Last year/ they/ place/ solar panels/ the roofs of houses/ produce hot water.','Last year, they placed solar panels on the roofs of houses to produce hot water.'),
w('Now/ many countries/ reduce/ energy consumption/ as much as possible.','Now many countries are reducing energy consumption as much as possible.'),
w('Fossil fuels/ limited/ and/ they/ harmful/ the environment.','Fossil fuels are limited and they are harmful to the environment.'),
w('Solar energy/ be/ clean/ and/ emit/ fewer greenhouse gases/ than fossil fuels.','Solar energy is clean and emits fewer greenhouse gases than fossil fuels.'),
w('Last year/ we/ fit/ solar panels/ our house/ provide/ solar electricity.','Last year, we fitted solar panels to our house to provide solar electricity.'),
w('Every day/ we/ rely/ energy/ provide/ us/ electricity, hot water, and fuel.','Every day we rely on energy to provide us with electricity, hot water, and fuel.'),
w('electric cars/ more/ popular/ petrol cars/ the next 15 years?','Will electric cars be more popular than petrol cars within/ in the next 15 years?')
]}
]});
})();