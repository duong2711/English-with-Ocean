/* Source Mai Lan Hương, TEST FOR UNIT 8, printed pp.109–113
   (PDF pp.111–115); answer key printed pp.196–197. */
(function(){'use strict';const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
bank.tests.push({id:'mlh7-unit8-test',unit:8,title:'TEST FOR UNIT 8',
bookPages:'109–113',pdfPages:'111–115',verified:true,source:bank.source,sections:[
{label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
c('',['gripping','fiction','violent','wizard'],'c'),
c('',['pleasure','really','easily','feature'],'a'),
c('',['critic','comedy','cartoon','cinema'],'d'),
c('',['engaged','gripped','laughed','wrecked'],'a'),
c('',['feature','theatre','screen','must-see'],'b')
],underlines:[['i','i','i','i'],['ea','ea','ea','ea'],['c','c','c','c'],['ed','ed','ed','ed'],['ea','ea','ee','ee']]},
{label:'II',title:'Choose the odd one out.',questions:[
c('',['documentary','fantasy','review','cartoon'],'c'),
c('',['director','comedy','producer','actress'],'b'),
c('',['gripping','funny','scary','shock'],'d'),
c('',['awful','entertaining','fascinating','exciting'],'a'),
c('',['thrilling','interesting','terrifying','acting'],'d')
]},
{label:'III',title:'Fill in the gap with the type of the film.',questions:[
w('A movie that makes you laugh is a ______.','comedy'),
w('A movie that makes you scream is a ______ film.','horror'),
w('A story that is exciting with lots of guns and explosions is an ______ movie.','action'),
w('Movies about future, aliens from space or space travel are ______ films.','science fiction'),
w('A movie about real life is a ______.','documentary'),
w('An ______ is a film in which drawings of people and animals seem to move.','animation'),
w('A film that tells an exciting story about murder or crime is a ______.','thriller'),
w('______ film is a genre that incorporates imaginative and fantastic themes.','Fantasy')
]},
{label:'IV',title:'Choose the correct answer a, b, c or d to complete the sentences.',questions:[
c('Colin Firth won his first Oscar for best lead actor ______ England’s King George VI.',['as','with','of','in'],'a'),
c('Twelve Years a Slave is based ______ a true story of Solomon Northup.',['in','by','on','from'],'c'),
c('“What ______ of film is The Matrix?” - “Science fiction.”',['ranking','content','review','kind'],'d'),
c('Critics say Midnight Run is a must-see ______ it is funny and exciting.',['although','because','however','so'],'b'),
c('Vin Diesel ______ in many action films, including The Fast and Furious series.',['starred','made','produced','directed'],'a'),
c('______ Hotel Artemis had an all-star cast, it was a total box-office failure.',['Because','If','Although','However'],'c'),
c('The special effects in Jurassic Park are ______! The dinosaurs look so real and alive.',['visible','incredible','terrible','believable'],'b'),
c('For a ______, that film wasn’t very funny. I didn’t laugh once.',['thriller','romance','documentary','comedy'],'d'),
c('That vampire film was extremely ______. I had my eyes closed half of the time!',['hilarious','moving','gripping','scary'],'d'),
c('“Could I ask you a few questions about your favorite movies?” “______”',['That sounds good.','Not a bad idea.','Sure. Go ahead.','But I don’t want to.'],'c')
]},
{label:'V',title:'Write the correct tense or form of verbs in brackets.',questions:[
w('If you are a fan of alien or sci-fi stories, you ______ (love) Prometheus.','will love'),
w('Tom Hanks ______ (win) an Oscar for playing Forrest Gump in 1994.','won'),
w('I ______ (watch) a very interesting Korean drama at present.','am watching'),
w('Kong: Skull Island ______ (direct) by Jordan Vogt-Roberts.','was directed'),
w('The film was a commercial success although it ______ (not receive) good reviews from critics.','didn’t receive'),
w('______ (your brother/ usually/ watch) movies at home or at the cinema?','Does your brother usually watch'),
w('What ______ (you/ do) tomorrow night? ~ We ______ (go) to Sao Mai Cinema to watch an animated film.','are you doing – are going'),
w('The last film I ______ (see) at the cinema was an action film called Fast and Furious.','saw'),
w('Jolie might return in Tomb Raider movie sequel, but the film ______ (not come) in some months.','won’t come'),
w('My sister is interested in ______ (search) movie trailers on the Internet.','searching')
]},
{label:'VI',title:'Supply the correct form of the words in brackets.',questions:[
w('The director was so ______ with the actors that he fired all of them. (satisfy)','dissatisfied'),
w('La La Land was ______ one of the best-reviewed films of 2016. (famous)','famously'),
w('It was supposed to be a horror film but it wasn’t very ______. (frighten)','frightening'),
w('Emma Watson is an English ______. She played Hermione Granger in the Harry Potter film. (act)','actress'),
w('Jennifer Lawrence became a huge star after her excellent ______ in The Hunger Games. (perform)','performance'),
w('Dungeons And Dragons is incredibly fun and ______. (enjoy)','enjoyable'),
w('The Ring is probably one of the ______ horror films of all time. (scare)','scariest'),
w('Despite ______, Zero becomes the 10th highest grossing film of 2018. (critic)','criticism'),
w('I find nature documentaries very ______. I learn a lot from them. (educate)','educational'),
w('Released in September 2018, The Nun ______ at the box office despite bad reviews. (success)','succeeded')
]},
{label:'VII',title:'Each sentence has a mistake. Find and correct it.',questions:[
w('Two days ago, I see a movie on Netflix with my parents.','see → saw'),
w('The final Lord of the Rings film is a good example of a made-well action film.','made-well → well-made'),
w('I read a review of that film and it sounds really interest.','interest → interesting'),
w('Let’s to go to the cinema to watch a fantasy or a comedy.','to go → go'),
w('Frozen is one of the most popular animation of all time.','animation → animations'),
w('My brother likes watching action films although they are fast and exciting.','although → because'),
w('Kate Winslet and Leonardo DiCaprio play ill-fated lovers of the romance “Titanic”.','of → in'),
w('Although Sue was quite young, but she showed a lot of talent in acting.','Although → [remove Although] / but → [remove but]')
]},
{label:'VIII',title:'Match the answers with the correct questions.',type:'match',
choices:['Fast and Furious.','Yes, why not?','Robert Downey Jr., Chris Hemsworth and Mark Ruffalo.','Because they’re too predictable.','No, I don’t like the feeling of being scared.','It’s a superhero film.','Vin Diesel','Action and science fiction.'],
questions:[
m('Have you ever watched a horror movie?','e'),
m('What kind of movies do you like?','h'),
m('What is the best movie you’ve seen so far?','a'),
m('Who is your favourite actor?','g'),
m('Why don’t you like romantic comedies?','d'),
m('Let’s go see Avengers: Infinity War tonight.','b'),
m('What kind of film is it?','f'),
m('Who does the film star?','c')
]},
{label:'IX',title:'Choose the word which best fits each gap.',
passage:'We all know Katniss Everdeen in The Hunger Games, but (1)______ is the actress who plays her, Jennifer Lawrence?\n\nJennifer Lawrence was (2)______ on August 15, 1990 in Kentucky, U.S. When she was a child, Lawrence knew that she wanted to act, and she began performing in school plays and local theatre. (3)______ the age of 14, hoping to break into acting and modeling, she went with her mother to New York City to look for work. She (4)______ in advertisements for MTV and the fashion company H&M and got work as an actress on TV. Her family moved to Los Angeles to allow her to further her career.\n\nIn 2010, Lawrence played the (5)______ in the film Winter’s Bone and she was nominated for many awards including an Oscar. In 2012 she starred in the film The Hunger Games (6)______ Katniss Everdeen. Lawrence also starred in another (7)______ film in 2012, director David O. Russell’s Silver Linings Playbook and at the age of 22 she became the second (8)______ woman to win the Academy Award for Best Actress for her performance in Silver Linings Playbook.',
questions:[
c('',['what','who','which','whom'],'b'),
c('',['bear','beared','born','bore'],'c'),
c('',['Of','In','By','At'],'d'),
c('',['appeared','attended','starred','made'],'a'),
c('',['acting','lead','performance','scenery'],'b'),
c('',['as','for','with','of'],'a'),
c('',['complicated','ordinary','delicious','notable'],'d'),
c('',['young','younger','youngest','youth'],'c')
]},
{label:'X',title:'Read the text carefully, then do the tasks.',type:'match',
passage:'Skyfall is one of the best action films in recent years. Released in 2012, it stars Daniel Craig as secret agent James Bond and Spanish actor Javier Bardem in the role of Raoul Silva, the villain in this film.\n\nThe plot involves a genius computer hacker who is an ex-spy. He wants to take revenge on the organisation he used to work for and James Bond has to prevent this from happening. There are a lot of exciting action scenes as Bond pursues him around the world. Can he stop him before it is too late?\n\nThe film is set in a variety of locations including Istanbul, Shanghai, Macau, London and Scotland, which gives it a very international atmosphere. The soundtrack is impressive and includes the theme song “Skyfall”, performed by English singer Adele. The acting is also of a very high standard and Bardem brings his character to life with a dazzling and memorable performance.',
choices:['soundtrack','dazzling','scene','villain','genius','plot'],
questions:[
m('A. Match the words to their definitions.\n1. the main bad character in a film','d'),
m('2. very intelligent and skilful','e'),
m('3. the story of a film','f'),
m('4. a part of a film in which the action happens in one place','c'),
m('5. the recorded music from a film','a'),
m('6. extremely impressive','b'),
w('B. Answer the questions.\n1. What kind of film is Skyfall?','Skyfall is an action film.'),
w('2. When did the film come out in cinemas?','The film came out in cinemas in 2012.'),
w('3. Who are the main characters?','The main characters are James Bond and Raoul Silva.'),
w('4. Who plays the baddie in the film?','Javier Bardem plays the baddie in the film.'),
w('5. What is Skyfall about?','Skyfall is about an ex-spy who wants to take revenge on the organisation he used to work for and James Bond has to prevent this from happening.'),
w('6. Where is the film set in?','The film is set in Istanbul, Shanghai, Macau, London and Scotland.'),
w('7. Who sang the theme song for Skyfall?','English singer Adele sang the theme song for Skyfall.'),
w('8. What does the writer say about Javier Bardem’s performance?','He says Javier Bardem’s performance is dazzling and memorable.')
]},
{label:'XI',title:'Rewrite the sentences using the words in brackets, without changing the meaning.',questions:[
w('I’d like to know the price of a child ticket. (is)\nI’d like to know how ______','I’d like to know how much a child ticket is.'),
w('Watching science fiction movies is one of my interests. (interested)\nI ______','I am interested in watching science fiction movies.'),
w('How long is it since you went to the cinema? (last)\nWhen ______','When did you last go to the cinema?'),
w('Although she was scared, she enjoyed watching horror movies. (spite)\nIn ______','In spite of being scared, she enjoyed watching horror movies.'),
w('Why don’t we go out for dinner and a movie? (suggested)\nShe ______','She suggested going out for dinner and a movie.'),
w('Despite the heavy rain, they still went hiking. (it)\nAlthough ______','Although it was raining heavily, they still went hiking.'),
w('It was such a gripping movie that I watched it three times. (so)\nThe movie ______','The movie was so gripping that I watched it three times.'),
w('Edward Norton is a talented actor, but he has never won an Oscar. (although)\nEdward Norton ______','Edward Norton has never won an Oscar although he is a talented actor.')
]}
]});
})();