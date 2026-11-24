/* Source: Mai Lan Hương / Hà Thanh Uyên, Test for Unit 3, printed
   pages 35–39 (PDF pages 37–41), answer key printed pages 183–184.
   Transcribed from the supplied scan and checked against the answer key. */
(function(){
'use strict';
const bank=window.LDDGrade7BookTests;if(!bank)return;
const c=(text,options,answer)=>({type:'choice',text,options,answer});
const w=(text,answer)=>({type:'written',text,answer});
const m=(text,answer)=>({type:'match',text,answer});
const f=(text,answer)=>c(text,['True','False'],answer?'a':'b');
bank.tests.push({
  id:'mlh7-unit3-test',unit:3,title:'TEST FOR UNIT 3',
  bookPages:'35–39',pdfPages:'37–41',verified:true,source:bank.source,
  sections:[
    {label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
      c('',['exchange','school','teacher','children'],'b'),
      c('',['volunteered','changed','recycled','cooked'],'d'),
      c('',['tutor','volunteer','student','community'],'b'),
      c('',['talked','washed','surprised','helped'],'c'),
      c('',['provide','donate','program','clothes'],'a')
    ],underlines:[['ch','ch','ch','ch'],['ed','ed','ed','ed'],['u','u','u','u'],['ed','ed','ed','ed'],['o','o','o','o']]},
    {label:'II',title:'Choose the odd one out.',questions:[
      c('',['donate','program','service','member'],'a'),
      c('',['sick children','volunteer','homeless people','disabled people'],'b'),
      c('',['donating clothes','cleaning streets','providing food','playing games'],'d'),
      c('',['homeless','sick','street','disabled'],'c'),
      c('',['volunteer','graffiti','donor','contributor'],'b')
    ]},
    {label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
      c('If you want to help the environment, take part ______ a local park cleanup day.',['in','for','on','with'],'a'),
      c('Toys of Hope provides toys, books and clothing ______ needy and homeless children.',['from','to','with','against'],'b'),
      c('Many people ______ their worn clothing to a local charity shop.',['provide','exchange','donate','recycle'],'c'),
      c('The river is heavily polluted. They should ______.',['clean it up','give it away','pick it out','recycle it'],'a'),
      c('______ people usually live on the streets, under bridges, or in camps.',['Lonely','Homeless','Elderly','Disabled'],'b'),
      c('A(n) ______ is an institution that takes care of children without parents.',['nursing home','hospital','orphanage','community'],'c'),
      c('We help families in ______ by providing food, clothing, housing and much more.',['control','case','need','shape'],'c'),
      c('Most people volunteer ______ they want to make a difference in their community.',['because','so','but','and'],'a'),
      c('We can help to reduce ______ by using public transportation, biking and walking.',['air pollution','water pollution','social problems','community service'],'a'),
      c('______ do you like this charity work? – I really like it.',['What','Why','When','How'],'d')
    ]},
    {label:'IV',title:'Write the correct form or tense of the verbs in brackets.',questions:[
      w('Our school ______ (have) a number of volunteer activities every summer.','has'),
      w('They ______ (establish) the Viet Nam Red Cross Society in 1946.','established'),
      w('How long have they lived here? ~ They ______ (move) here two years ago.','moved'),
      w('James ______ (not do) any volunteer work last summer vacation.','didn’t do'),
      w('I’m really busy now. I ______ (study) for the final exam.','am studying'),
      w('When ______ (you/ buy) these shirts? ~ I ______ (buy) them yesterday.','did you buy – bought'),
      w('Volunteers ______ (work) to save the lives of the earthquake victims at present.','are working'),
      w('Claire ______ (volunteer) at the homeless shelter once a week.','volunteers'),
      w('We volunteer ______ (help) the elderly in a nursing home.','to help'),
      w('Jane suggested ______ (donate) old books and toys to needy children.','donating')
    ]},
    {label:'V',title:'Supply the correct form of the words in brackets.',questions:[
      w('Community ______ have a lot of positive effects on students. (serve)','services'),
      w('They opened a shelter to provide housing for ______ people. (home)','homeless'),
      w('I’d like to work as a volunteer for a charity ______. (organise)','organisation'),
      w('He made a £5000 ______ to charity. (donate)','donation'),
      w('Volunteering makes students feel ______ and more connected to others. (pride)','proud'),
      w('The charity relies entirely on ______ contributions. (volunteer)','voluntary'),
      w('The organization is funded by ______ donations. (charity)','charitable'),
      w('We help the ______ with housework and gardening. (old)','elderly')
    ]},
    {label:'VI',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
      w('They sell bamboo products to raise funds for a orphanage.','a → an'),
      w('He is actively and tidy and likes to work with different people.','actively → active'),
      w('Matha is a great cooker and she often cooks dinner for homeless people.','cooker → cook'),
      w('He didn’t wanted to receive anything in return for his donation.','wanted → want'),
      w('She donated a lot of money for local charities.','for → to'),
      w('Before donate a book, make sure that it is in good condition.','donate → donating'),
      w('We should encourage people recycle glass, cans, plastic and paper.','recycle → to recycle'),
      w('Do you live in Vancouver when you were young?','Do → Did')
    ]},
    {label:'VII',title:'Match the questions with the answers.',type:'match',choices:[
      'Because it will help make a difference to millions of children’s lives.',
      'We can provide them with food, clothes and other necessities.',
      'I’d love to. But I don’t have much free time.',
      'It’s voluntary work that someone does to help their community.',
      'I learned a lot of new skills.',
      'Because they want to help other people.',
      'We can bring fun and enjoyment to them.',
      'No, I have never done it.'
    ],questions:[
      m('What is community service?','d'),
      m('Have you ever done any volunteer work?','h'),
      m('What can we do to help people in a flooded area?','b'),
      m('Why should we donate to UNICEF?','a'),
      m('How do you think we can help sick children?','g'),
      m('Would you like to work as a volunteer?','c'),
      m('What did you learn from volunteering?','e'),
      m('Why do people enjoy doing volunteer work?','f')
    ]},
    {label:'VIII',title:'Choose the word which best fits each gap.',
      passage:'Doing some form of voluntary work has (1)______ been more popular with British people. Over 20 million people were engaged (2)______ voluntary activities in 2013. Volunteering means giving up time to do work of (3)______ to the community. It can be based in the UK or overseas. Volunteering can take many forms, from working with children with (4)______ difficulties, in an animal hospital, or planting trees. (5)______ London won its bid to host the 2012 Olympics, up to 70,000 (6)______ were needed to help ensure the games were a success.',
      questions:[
        c('',['ever','any','never','before'],'c'),
        c('',['with','in','to','for'],'b'),
        c('',['comfort','benefit','contribute','profit'],'b'),
        c('',['learn','learned','learning','learnt'],'c'),
        c('',['When','While','Where','What'],'a'),
        c('',['donors','visitors','foreigners','volunteers'],'d')
      ]},
    {label:'IX',title:'Read the text carefully, then do the tasks.',
      passage:'The Soup Kitchen, founded in 1986, is a resource for the homeless, elderly, lonely and poor in Central London, providing free hot meals, clothes and toiletries, and creating a sense of belonging and community. Serving around 70 people a day from 10 am - 12 noon on Monday, Tuesday, Thursday, Friday and Saturday, with the Clothes Closet open on alternate Mondays, four to five volunteers are required each morning to carry out this vital work.\n\nThe Soup Kitchen is run by a Board of Trustees, a part-time Director and Kitchen Manager, three more staff and a team of volunteers. Support for The Soup Kitchen comes from individuals, corporations and trusts. Volunteers and donations (both financial and in-kind) are vital to support our work and enable us to continue this service to the community.',
      questions:[
        f('A. Decide whether the following statements are true (T) or false (F).\n1. The Soup Kitchen is a non-profit organization.',true),
        f('2. It provides free meals for people in need.',true),
        f('3. It opens five days a week from 10am to 12pm.',false),
        f('4. Clothing is provided every Monday morning.',false),
        f('5. The organization is funded by donations from individuals, corporations and trusts.',true),
        f('6. People can only donate money to the Soup Kitchen.',false),
        w('B. Answer the questions.\n1. When was the Soup Kitchen founded?','The Soup Kitchen was founded in 1986.'),
        w('2. What does the Soup Kitchen provide?','The Soup Kitchen provides free hot meals, clothes and toiletries.'),
        w('3. Is the Clothes Closet open every Monday?','No, it isn’t. It is open on alternate Mondays.'),
        w('4. How many volunteers help in the Soup Kitchen each morning?','Four to five volunteers help in the Soup Kitchen each morning.'),
        w('5. By whom is the Soup Kitchen run?','The Soup Kitchen is run by a Board of Trustees, a part-time Director and Kitchen Manager, three more staff and a team of volunteers.')
      ]},
    {label:'X',title:'Make sentences using the cues given.',questions:[
      w('last year/ we/ start/ community garden/ project','Last year we started a community garden project.'),
      w('they/ often/ donate/ textbooks and clothes/ the poor children/ rural areas','They often donate textbooks and clothes to the poor children in rural areas.'),
      w('because/ the lake/ be/ full/ rubbish/ they/ decide/ clean it up/ last Sunday','Because the lake was full of rubbish, they decided to clean it up last Sunday.'),
      w('the local council/ organize/ two-kilometer fun run/ for charity/ a week ago','The local council organized a two-kilometer fun run for charity a week ago.'),
      w('Go Green/ non-profit/ organization/ that/ protect/ environment','Go Green is a non-profit organization that protects the environment.'),
      w('when/ you/ start/ work/ this charitable organization?','When did you start working/ to work for this charitable organization?')
    ]}
  ]
});
})();