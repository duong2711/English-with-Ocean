/* Mai Lan Hương – Hà Thanh Uyên: Bài tập Tiếng Anh 7 (Global Success).
   Verbatim transcription checked against uploaded scanned book, TEST FOR UNIT 1,
   printed pages 12–15 (PDF pages 14–17); answers against printed pp. 178–179.
   Do not publish unverified OCR as exercises for the remaining units. */
(function () {
  'use strict';
  const c=(text,options,answer)=>({text,options,answer,type:'choice'});
  const t=(text,answer='')=>({text,answer,type:'written'});
  const m=(text,answer)=>({text,answer,type:'match'});
  const units=[
    'HOBBIES','HEALTHY LIVING','COMMUNITY SERVICE','MUSIC AND ARTS',
    'FOOD AND DRINK','A VISIT TO A SCHOOL','TRAFFIC','FILMS',
    'FESTIVALS AROUND THE WORLD','ENERGY SOURCES',
    'TRAVELLING IN THE FUTURE','ENGLISH-SPEAKING COUNTRIES'
  ];
  const tests=[{
    id:'mlh7-unit1-test',unit:1,title:'TEST FOR UNIT 1',bookPages:'12–15',
    pdfPages:'14–17',verified:true,
    source:'Bài tập Tiếng Anh 7 – Mai Lan Hương, Hà Thanh Uyên',
    sections:[
      {label:'I',title:'Choose the word whose underlined part is pronounced differently from the others.',questions:[
        c('', ['exciting','excellent','experience','expensive'],'b'),
        c('', ['hobby','cycle','bye','why'],'a'),
        c('', ['pottery','collect','melody','monopoly'],'a'),
        c('', ['heard','bird','world','picture'],'d'),
        c('', ['bird-watching','children','school','challenge'],'c')
      ],underlines:[['ex','ex','ex','ex'],['y','y','y','y'],['o','o','o','o'],['ear','ir','or','ure'],['ch','ch','ch','ch']]},
      {label:'II',title:'Match the word(s) in A with the rest in B to make a complete sentence.',type:'match',
        choices:[
          'helps you learn about different countries and their currencies.',
          'needs a pattern, a needle and threads.',
          'is the process of cutting a piece of wood to make decorative objects.',
          'means making very small replicas of real objects.',
          'is the practice of growing and cultivating plants.',
          'develops your imagination and widens your knowledge.'
        ],
        questions:[m('Model making','d'),m('Coin collecting','a'),m('Reading','f'),m('Sewing','b'),m('Woodcarving','c'),m('Gardening','e')]},
      {label:'III',title:'Choose the best answer a, b, c, or d to complete the sentence.',questions:[
        c('My father can make beautiful pieces of art ______ empty eggshells.',['of','from','in','into'],'b'),
        c('Why don’t you take ______ a new hobby?',['up','in','over','after'],'a'),
        c('Collecting cars is a(n) ______ hobby. It costs a lot of money.',['interesting','cheap','expensive','unusual'],'c'),
        c('More people are ______ birds today than ever before.',['seeing','looking','hearing','watching'],'d'),
        c('Do you enjoy ______ board games?',['play','to play','playing','played'],'c'),
        c('Be careful not to drop it; it’s very ______.',['unique','fragile','difficult','unusual'],'b'),
        c('Sam and I ______ the same hobby. We both like playing computer games.',['share','play','do','work'],'a'),
        c('I hope he’ll teach me ______ to do eggshell carving.',['what','where','how','when'],'c'),
        c('______ have you had your hobby? ~ For three years.',['How much','How long','How often','When'],'b'),
        c('“I think model making is an expensive hobby.” “______. It’s incredibly cheap.”',['You’re right','Certainly','No matter','Not at all'],'d')
      ]},
      {label:'IV',title:'Complete the sentences with the correct form or tense of the verb play, go, do or collect.',questions:[
        t('______ Alex ______ computer games at the weekend?','Does ... play'),
        t('We ______ camping in Dam Sen Park yesterday.','went'),
        t('______ you ______ coins some day in the future?','Will ... collect'),
        t('Do you want ______ mountain biking with me this weekend?','to go'),
        t('My grandpa enjoys ______ gardening in his free time.','doing'),
        t('My uncle ______ karate when he was young.','did'),
        t('The children ______ volleyball on the beach at the moment.','are playing'),
        t('When I’m waiting for the train, I usually ______ Sudoku puzzles.','do'),
        t('She dislikes ______ chess because she finds it boring.','playing'),
        t('Nick’s hobby is ______ postcards. He has postcards from countries all over the world.','collecting')
      ]},
      {label:'V',title:'Supply the correct form of the words in brackets.',questions:[
        t('Rossie has a large ______ of dolls. (collect)','collection'),
        t('A ______ is someone who enjoys watching birds. (birdwatch)','birdwatcher'),
        t('My sister’s hobby is ______. She took a lot of nice photos. (photo)','photography'),
        t('I find woodcarving ______ because it’s a creative activity. (interest)','interesting'),
        t('______ eggshells are unique gifts for family and friends. (carve)','Carved'),
        t('A hobby is an ______ that you do for pleasure. (act)','activity'),
        t('I think collecting glass bottles is ______. (usual)','unusual'),
        t('Susan is very ______ and she paints very well. (create)','creative')
      ]},
      {label:'VI',title:'There is one mistake in each sentence. Underline and correct the mistake.',questions:[
        t('Nam is my classmates. He watches TV every night.','classmates → classmate'),
        t('I think collecting stamps are interesting.','are → is'),
        t('My dad cooks very good. He loves preparing meals for our family.','good → well'),
        t('I enjoy to ride my bike to school.','to ride → riding'),
        t('We usually go in a small lake out of the city at weekends.','in → to'),
        t('I don’t collecting anything for a hobby.','collecting → collect'),
        t('We like doing fishing because it is relaxing.','doing → going'),
        t('Do your sister find bird-watching interesting?','Do → Does')
      ]},
      {label:'VII',title:'Match the questions with the answers.',type:'match',
        choices:[
          'I think it is dangerous.',
          'Nope, I have another plan.',
          'Maybe. I find it really interesting.',
          'Yes, she enjoys mountain biking.',
          'No, she loves going to the cinema.',
          'About three years ago.',
          'Because it takes too much time.',
          'Swimming and playing chess.'
        ],questions:[
          m('Will you go swimming tomorrow?','b'),
          m('Does your mother like watching films on TV?','e'),
          m('What do you think about windsurfing?','a'),
          m('Will you take up carving eggshells someday?','c'),
          m('Why do you find making models boring?','g'),
          m('What are your hobbies?','h'),
          m('When did your brother start painting?','f'),
          m('Does she have any difficult hobby?','d')
        ]},
      {label:'VIII',title:'Choose the word which best fits each gap.',
        passage:'Many people (1)______ crafting with paper. The materials are readily available and don’t cost much; and no super special talents are needed. Anyone (2)______ be a paper crafter.\n\nThere are many different paper craft techniques. Origami is one of ancient techniques developed in Japan where squares of paper are (3)______ and formed into various objects such as flowers, animals, and boxes. Card (4)______ is also a favourite paper craft technique. Birthday cards are the most popular greeting cards, followed by Christmas cards. Receiving a (5)______ card is a special gift, because of the time and effort someone spent making it. It lets the recipient know just how much you care (6)______ them.',
        questions:[
          c('', ['enjoy','decide','want','learn'],'a'),
          c('', ['must','should','can','will'],'c'),
          c('', ['wrapped','folded','torn','taken'],'b'),
          c('', ['making','doing','changing','receiving'],'a'),
          c('', ['handmake','handmaking','handmade','making hand'],'c'),
          c('', ['in','on','over','about'],'d')
        ]},
      {label:'IX',title:'Read the text carefully, then answer the questions.',
        passage:'My name’s Susan. I have two favourite hobbies. My first hobby is reading. I started to do it when I was four years old. The first time I did it, I felt interested. So I kept reading. I enjoy reading because it can make me relaxed and calm. Moreover, it can give me an imagination, so I can write books in the future. I can learn the different cultures and customs of other countries in the world, too.\n\nMy second hobby is gardening. I have made a small garden and planted many beds of flowers. In the spring season, my garden is full of beautiful flowers. I have a separate plot for vegetables – carrots, potatoes, etc. In the evening, I water the plants and remove the weeds. I love sitting in my garden and reading my books. It is very pleasant to be there!',
        questions:[
          t('What are Susan’s hobbies?','Her hobbies are reading and gardening.'),
          t('When did she start reading?','She started reading when she was four years old.'),
          t('How did she feel when she first read a book?','She felt interested when she first read a book.'),
          t('Why does she enjoy reading?','She enjoys reading because it can make her relaxed and calm.'),
          t('What has she planted in her garden?','She has planted flowers, carrots, potatoes, etc. in her garden.'),
          t('When does she water the plants?','She waters the plants in the evening.')
        ]},
      {label:'X',title:'Write sentences, using the cues given.',questions:[
        t('I/ enjoy/ play/ sports/ because/ it/ good/ health','I enjoy playing sports because it’s good for my health.'),
        t('your children/ go/ camp/ every summer holiday?','Do your children go camping every summer holiday?'),
        t('I/ think/ photography/ can/ expensive hobby','I think (that) photography can be an expensive hobby.'),
        t('My cousin/ give/ me/ book/ gift/ next birthday','My cousin will give me a book as a gift on my next birthday.'),
        t('He/ find/ mountain climbing/ dangerous/ so/ he/ not take/ it','He finds mountain climbing dangerous so he doesn’t take it up.'),
        t('James/ always/ wear/ knee support/ when/ he/ go/ running','James always wears a knee support when he goes running.')
      ]}
    ]
  }];
  window.LDDGrade7BookTests={source:'Bài tập Tiếng Anh 7 – Mai Lan Hương, Hà Thanh Uyên (Global Success)',units,tests};
})();