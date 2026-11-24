/* Source: Mai Lan Hương, Test for Unit 6, printed pp.76–80,
   PDF pp.78–82. Answers: printed pp.190–191. */
(function(){
'use strict';const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
bank.tests.push({id:'mlh7-unit6-test',unit:6,title:'TEST FOR UNIT 6',
 bookPages:'76–80',pdfPages:'78–82',verified:true,source:bank.source,
 sections:[
 {label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
  c('',['pagoda','blanket','academy','tablet'],'a'),
  c('',['children','scholar','teacher','lunch'],'b'),
  c('',['question','nation','education','recognition'],'a'),
  c('',['visited','founded','decided','developed'],'d'),
  c('',['heritage','historic','recognise','literature'],'c')
 ],underlines:[['a','a','a','a'],['ch','ch','ch','ch'],['tion','tion','tion','tion'],['ed','ed','ed','ed'],['i','i','i','i']]},
 {label:'II',title:'Complete the sentence with a suitable word. The first letter is given.',questions:[
  w('G___________ students need special educational programs that meet their abilities and needs.','Gifted'),
  w('J. K. Rowling is a w___________ British author. People around the world love reading her Harry Potter series.','well-known'),
  w('There will be two m___________ tests during the semester.','midterm'),
  w('Rebecca always loves hiking, biking and other o___________ activities.','outdoor'),
  w('The school will upgrade the school f___________, with new computers and projectors.','facilities'),
  w('The school has well-equipped science l___________ for Physics, Chemistry and Biology.','laboratories'),
  w('After primary school, children usually transfer to s___________ school at 11 or 12.','secondary'),
  w('Students must take an e___________ exam before they begin attending school here.','entrance')
 ]},
 {label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
  c('Oxford University is regarded as the oldest university ______ the UK.',['in','on','at','of'],'a'),
  c('The school is famous ______ high qualified teachers and modern school facilities.',['in','with','of','for'],'d'),
  c('Teachers always try to make their lessons fun and ______, so students will like the classes.',['modern','suitable','enjoyable','talented'],'c'),
  c('The teacher used an overhead ______ to illustrate her lesson.',['computer','textbook','projector','equipment'],'c'),
  c('Children should ______ outdoor activities for physical and mental health benefits.',['take place','take part in','look at','build up'],'b'),
  c('When students finish secondary school, they ______ take a 10th grade entrance exam.',['could','shall','have to','shouldn’t'],'c'),
  c('Some students are playing volleyball in the school ______.',['gym','library','garden','laboratory'],'a'),
  c('______ was the University of Cambridge formed? - In 1209.',['What','Where','How','When'],'d'),
  c('The girls like skipping rope or playing hopscotch ______.',['break time','time break','in time break','at break time'],'d'),
  c('“Would you like to go to the Westminster High School with us?” “______ When will we leave?”',['Not really.','Sounds great!','Why not?','That’s great work.'],'b')
 ]},
 {label:'IV',title:'Write the correct form or tense of the verbs in brackets.',questions:[
  w('We ______ (not take) part in a green campaign last summer.','didn’t take'),
  w('When ______ Sue ______ (have) English? - At 9 p.m. on Tuesday and Friday.','does … have'),
  w('They ______ (install) the latest software in all computers soon.','will install'),
  w('The students learn how ______ (use) the Internet in the computer room.','to use'),
  w('I ______ (study) in this elementary school ten years ago.','studied'),
  w('Wait a minute, he ______ (speak) to someone on his mobile.','is speaking'),
  w('The students ______ (not be) in their classroom at the moment. They ______ (have) lunch in the school canteen.','aren’t – are having'),
  w('I don’t want to go to Wilson High School. How about ______ (visit) Trinity School?','visiting'),
  w('The academic year in England ______ (start) at the beginning of September.','starts'),
  w('I think I ______ (visit) my old teachers in Hoa Mai Lower Secondary School this week.','will visit')
 ]},
 {label:'V',title:'Supply the correct form of the words in brackets.',questions:[
  w('The ______ is replacing the books correctly on the shelves. (library)','librarian'),
  w('The students are well prepared for their final ______. (examine)','examinations'),
  w('Outdoor ______ are a lot of fun, especially for young children. (act)','activities'),
  w('Quoc Hoc - Hue is one of the ______ schools in Viet Nam. (old)','oldest'),
  w('We need to ______ young people about the importance of a healthy diet. (education)','educate'),
  w('The kids at this school are all ______ in some way. (talent)','talented'),
  w('Regular tests are ______ for monitoring progress. (use)','useful'),
  w('Le Hong Phong High School is one of the most ______ schools in Ho Chi Minh City. (fame)','famous')
 ]},
 {label:'VI',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
  w('My parents came to stay with us on Christmas.','on → at'),
  w('Don’t forget taking your camera for the school trip.','taking → to take'),
  w('What types of outdoor activities do you like to take part?','take part → take part in'),
  w('The students were not interested in history because it was bored.','bored → boring'),
  w('You should to add Tesla STEM High School to your visiting list in the United States.','to add → add'),
  w('The hotel has a large indoor pool, sauna and many other modern facility.','facility → facilities'),
  w('The weather now is more colder than it was in the Middle Ages.','more colder → colder/ much colder'),
  w('In order to study at the school, students have to pass a entrance exam.','a → an')
 ]},
 {label:'VII',title:'Match the questions with the answers.',type:'match',choices:[
  'In the school science laboratory.','In February.','Phu Quoc Island.',
  'Cycling, hiking and football.','The French.',
  'A library, computer room, science lab and a gym.',
  'Three.','On the bank of Huong River.'
 ],questions:[
  m('Where would you like to go on your vacation?','c'),
  m('What outdoor activities do you most like to do?','d'),
  m('Where can students perform experiments?','a'),
  m('When does the midterm test take place?','b'),
  m('What kind of facilities does your school have?','f'),
  m('Where is Quoc Hoc-Hue located?','h'),
  m('Who established Chu Van An High School?','e'),
  m('How many English labs does your school have?','g')
 ]},
 {label:'VIII',title:'Choose the word which best fits each gap.',
  passage:'Australian International School (AIS) (1)______ an educational experience that will enable and inspire students from Kindergarten to Year 13 to succeed. It’s one of the top IB World Schools in Vietnam offering an international (2)______ that starts with IB’s Primary Years Programme, then continues in the Middle Years with Cambridge’s IGCSEs and culminates in the Senior School with the IB Diploma Programme. All these allow students (3)______ critically and develop self-confidence to reach their academic potential.\n\nIn addition to the focus (4)______ academic excellence, AIS offers opportunities for sports, arts, and music. The students are taught at three open and spacious campuses in Ho Chi Minh City. There is plenty of room for children to grow, while providing a safe environment so they can (5)______ in active learning and exploration. Students have access to very modern (6)______ like the IB Centre, libraries, music suites, technology and science labs, indoor gymnasium, football fields and pools provide space for students to build their knowledge and abilities.',
  questions:[
    c('',['provides','donates','designs','sends'],'a'),
    c('',['lesson','curriculum','subject','schedule'],'b'),
    c('',['think','thinking','to think','to thinking'],'c'),
    c('',['to','at','in','on'],'d'),
    c('',['participate','support','share','encourage'],'a'),
    c('',['equipment','buildings','facilities','services'],'c')
  ]},
 {label:'IX',title:'Read the text carefully, then answer the questions.',
  passage:'Harvard University, established in 1636, is one of the world’s most famous universities. This private Ivy League school is located in Cambridge, just a few miles north of Boston. Harvard was named after the first benefactor, John Harvard. In front of University Hall, you will find a bronze statue of John Harvard. Tourists rub his left foot as it is supposed to bring good luck (this is why the foot is still shiny compared to the rest of the statue).\n\nHarvard University is one of the most visited places in Boston. Recent visitors called the buildings “stunning,” adding that a stop at Harvard was one of the highlights of their time in Cambridge. While visitors may not go into campus buildings, they can tag along on a free guided tour of the grounds. Tours provide an overview of campus history and offer fun tidbits. For instance, the 1884 statue of John Harvard by Daniel Chester French is not actually a depiction of Harvard himself, but rather Sherman Hoar, a Harvard graduate who acted as the model for this sculpture.\n\nFree one-hour guided tours – led by Harvard students – are available at various times of the day and year, depending on the university’s schedule. Visit the school’s website for more information. You can also purchase a guide to go on your own or download a free audio guide from the website.',
  questions:[
    w('Where is Harvard University located?','Harvard University is located in Cambridge, just a few miles north of Boston.'),
    w('When was Harvard University founded?','Harvard University was founded in 1636.'),
    w('What stands in front of University Hall?','A bronze statue of John Harvard stands in front of University Hall.'),
    w('Why do people touch the statue’s left foot?','People touch the statue’s left foot as/ because it is supposed to bring good luck.'),
    w('May visitors go into campus buildings?','No, they may not.'),
    w('Are student-led tours throughout the year?','Yes, they are.'),
    w('How long does a free student-led tour last?','A free student-led tour lasts (for) an hour/ 60 minutes.')
  ]},
 {label:'X',title:'Write complete sentences, using the words or phrases given.',questions:[
    w('She/ usually/ visit/ school garden/ once/ week','She usually visits the school garden once a week.'),
    w('There/ be/ big traffic jam/ road/ to/ city’s airport/ now','There is a big traffic jam on the road to the city’s airport now.'),
    w('He/ like/ biology/ but/ he/ not be/ too keen on physics','He likes biology, but he is not too keen on physics.'),
    w('We/ see/ our new teacher/ school gate/ a few days ago','We saw our new teacher at the school gate a few days ago.'),
    w('If/ weather/ be/ wet or cold/ teacher/ choose/ indoor activity','If the weather is wet or cold, the teacher will choose an indoor activity.'),
    w('school/ have/ special facilities/ for/ teach/ disabled students','The school has special facilities for teaching disabled students.'),
    w('Would/ you/ like/ go/ us/ Nguyen Khuyen Lower Secondary School?','Would you like to go with us to Nguyen Khuyen Lower Secondary School?'),
    w('There/ be/ chess competition/ school/ next Saturday','There will be a chess competition in the school next Saturday.')
 ]}
]});
})();