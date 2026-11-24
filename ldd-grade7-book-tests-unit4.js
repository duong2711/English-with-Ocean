/* Mai Lan Hương, Test for Unit 4, printed pp.51–55,
   PDF pp.53–57, answer key printed pp.186–187. */
(function(){
'use strict';const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
bank.tests.push({
 id:'mlh7-unit4-test',unit:4,title:'TEST FOR UNIT 4',bookPages:'51–55',
 pdfPages:'53–57',verified:true,source:bank.source,sections:[
 {label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
 c('',['actor','painting','anthem','gallery'],'b'),
 c('',['decide','exciting','exhibit','organise'],'c'),
 c('',['educated','played','recycled','changed'],'a'),
 c('',['cello','choose','kitchen','concert'],'d'),
 c('',['sugar','closure','share','anxious'],'b')
 ],underlines:[['a','a','a','a'],['c','c','c','s'],['ed','ed','ed','ed'],['c','ch','ch','c'],['s','s','s','x']]},
 {label:'II',title:'Choose the odd one out.',questions:[
 c('',['music','cello','guitar','drums'],'a'),
 c('',['actor','artist','painting','singer'],'c'),
 c('',['cello','violin','saxophone','guitar'],'c'),
 c('',['jazz','pop','rock','anthem'],'d'),
 c('',['The Spice Girls','Gangnam Style','The Beatles','ABBA'],'b')
 ]},
 {label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
 c('She prefers watching Korean movies ______ listening to K-pop.',['with','to','of','for'],'b'),
 c('What do you like to do ______ your spare time?',['in','on','at','from'],'a'),
 c('The ______ is rather older now; however, his acting ability has never been better.',['composer','actress','artist','actor'],'d'),
 c('“Yeezus” is quite ______ from other hip-hop albums.',['different','like','as','same'],'a'),
 c('Juan and Patricia are not the same height. Juan is ______ Patricia.',['as tall as','not as tall as','more tall than','not tall than'],'b'),
 c('Thomas Newman ______ music for many Pixar movies including Finding Nemo and WALL-E.',['performed','painted','composed','played'],'c'),
 c('I went to the 3D ______ last weekend. The paintings were excellent!',['movie theater','concert hall','opera house','art museum'],'d'),
 c('______ I’m not a fan of country music, I thoroughly enjoyed his lively performance.',['Although','Because','As','However'],'a'),
 c('______ does a water puppet show take place? ~ In a pool.',['What','When','How','Where'],'d'),
 c('Which is the national anthem of Vietnam?',['Tieu Doan 307','Chien si Viet Nam','Tien Quan Ca','Tien ve Ha Noi'],'c')
 ]},
 {label:'IV',title:'Write the correct tense or form of the verbs in brackets.',questions:[
 w('3D films ______ (be) as common as the 2D ones soon.','will be'),
 w('Please, stop! You ______ (drive) so fast.','are driving'),
 w('Which ______ your brother ______ (prefer), rock or rap?','does … prefer'),
 w('Two days ago I ______ (go) to the centre and ______ (see) an exhibition.','went – saw'),
 w('I ______ (often/ play) the guitar in my spare time.','often play'),
 w('______ the band ______ (tour) the UK at this moment?','Is/ Are … touring'),
 w('The children ______ (not be) at home last Sunday.','weren’t'),
 w('Do you think we ______ (write) a test tomorrow?','will write'),
 w('Are you interested in ______ (watch) the music shows on TV?','watching'),
 w('We can go to an art gallery, but I’d prefer ______ (go) to the music festival.','to go')
 ]},
 {label:'V',title:'Supply the correct form of the words in brackets.',questions:[
 w('Avatar is probably the ______ film I’ve ever seen! (bad)','worst'),
 w('A dancer must throw her heart and soul into every ______. (perform)','performance'),
 w('I think Men in Black 1 was as ______ as Men in Black 3. (excite)','exciting'),
 w('Although John and Andrew look exactly alike, they act quite ______. (different)','differently'),
 w('Dong Ho paintings are made with ______ colours. (nature)','natural'),
 w('His friends are all ______ - they’re painters, musicians, and writers. (art)','artistic'),
 w('He later became a famous jazz ______ playing saxophone. (music)','musician'),
 w('The problems seemed so small and ______. (important)','unimportant')
 ]},
 {label:'VI',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
 w('A lot of people are good artists and they are successfully in life.','successfully → successful'),
 w('Music promote creativity, social development, and personality.','promote → promotes'),
 w('The Mona Lisa is an oil paint by the Italian artist Leonardo da Vinci.','paint → painting'),
 w('To him, art is like breathing, and he can live without it.','can → can’t'),
 w('Rap music, also known as hip-hop music, is different with other styles of music.','with → from'),
 w('My mother don’t like rock music and I don’t either.','don’t like → doesn’t like'),
 w('How long do you go to the movies? - Twice a month.','How long → How often'),
 w('The weather today is not so hot as it is yesterday.','is → was')
 ]},
 {label:'VII',title:'Match the questions with the answers.',type:'match',choices:[
 'Let’s go to the 3D Art Gallery.','Comedy.','No, I don’t.',
 'Gangnam Style.','Pop music.','Jackie Chan.','Yes. I love singing too.',
 'No, I like rock music.'
 ],questions:[
 m('Which do you like better, pop or folk music?','e'),
 m('What shall we do this weekend?','a'),
 m('Who is your favourite actor?','f'),
 m('Do you like country music?','h'),
 m('What kind of show is it?','b'),
 m('You love dancing, don’t you?','g'),
 m('Do you enjoy horror films?','c'),
 m('Which Korean performance do you like?','d')
 ]},
 {label:'VIII',title:'Choose the word which best fits each gap.',
 passage:'While art may not be vital to fulfill our basic needs, it does make life (1)______. When you look at a painting or poster on your living room wall, you feel happy. The sculpture on the kitchen windowsill create a (2)______ of joy. These varieties of art forms that we are surrounded by all come (3)______ to create the atmosphere that we want to live in.\n\nJust like art, music can make life extremely joyful and can have a huge effect (4)______ our mood. If you have something hard or difficult to work on or are feeling tired, an energetic song will likely (5)______ you up and add some enthusiasm to the situation. Similarly, when stress is high, many people find that relaxing to calming music is (6)______ that eases the mind.',
 questions:[
 c('',['boring','hard','joyful','helpful'],'c'),
 c('',['sense','feel','cause','way'],'a'),
 c('',['away','along','down','together'],'d'),
 c('',['on','in','at','of'],'a'),
 c('',['take','wake','pick','bring'],'b'),
 c('',['something','anything','everything','nothing'],'a')
 ]},
 {label:'IX',title:'Read the text carefully, then answer the questions.',
 passage:'Modern graffiti began in big cities in the United States in the 1970s. One of the first ‘taggers’ was a teenager called Demetrius. He wrote his tag TAKI 183 on walls and in subway stations in New York. Other teenagers saw Demetrius’s tag and started writing their own tags on walls, buses and subway trains all over New York.\n\nThen, some teenagers started writing their tags with aerosol paint. Their tags were bigger and more colourful. Aerosol paint graffiti became very popular in the 1970s and 1980s and appeared on trains, buses and walls around the world. In the 1990s and 2000s, a lot of graffiti artists started painting pictures.\n\nIn some countries, writing or painting on walls is a crime and street artists can have problems with the police. In other countries, artists can draw and paint in certain places. For example, in Taiwan, there are ‘graffiti zones’ where artists can paint on walls. In São Paulo in Brazil, street artists can paint pictures on walls and houses. Their pictures are colourful and beautiful. Some tourists visit São Paulo just to see the street art!',
 questions:[
 w('Where did modern graffiti begin?','Modern graffiti began in big cities in the United States.'),
 w('What was Demetrius’s tag?','Demetrius’s tag was TAKI 183.'),
 w('What did young people write on New York walls?','They wrote their own tags on New York walls.'),
 w('When did aerosol paint graffiti become popular?','Aerosol paint graffiti became popular in the 1970s and 1980s.'),
 w('Is graffiti legal in every country in the world?','No, it isn’t. In some countries, it is illegal.'),
 w('Where can artists paint in graffiti zones?','Artists can paint in graffiti zones in Taiwan.')
 ]},
 {label:'X',title:'Write the second sentence so that it has the same meaning as the first one. Use the word in brackets.',questions:[
 w('This show is the same as the show we saw last week. (different)\n→ This show ______','This show isn’t different from the show we saw last week.'),
 w('She is the quickest runner of all. (quick)\n→ No other runner ______','No other runner is as quick as her/she is.'),
 w('Now this channel is running more ads than it did in the past. (fewer)\n→ In the past, this channel ______','In the past, this channel ran fewer ads than it is now.'),
 w('This new version of Spiderman is different from the original. (like)\n→ This new version ______','This new version of Spiderman isn’t like the original.'),
 w('She likes POPS Kids channel most. (favourite)\n→ Her ______','Her favourite channel is POPS Kids.'),
 w('This painting isn’t so expensive as my favourite painting. (than)\n→ My favourite painting ______','My favourite painting is more expensive than this painting.'),
 w('My English is better than my French. (as)\n→ My French ______','My French is not as good as my English.'),
 w('This trailer of the film has the same length as the previous one. (long)\n→ This trailer of the film ______','This trailer of the film is as long as the previous one.')
 ]}
]});
})();