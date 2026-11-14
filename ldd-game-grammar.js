/* LDD Entertainment — grade-bounded grammar questions for vocabulary games.
 * Local, reviewed sentence-order bank. No AI requests or new database tables.
 * Every room stores its immutable question set, so all players see the same prompts.
 */
(function () {
  'use strict';
  if (window.LDDGameGrammar) return;

  // The highest class allowed comes from the site's authoritative grade assignment,
  // not a user-editable profile label. Tracks without grade may pick classes 1–12.
  const assignedGrade = () => {
    const n = Number(window.LDDStudentGrade && window.LDDStudentGrade.getGrade());
    return Number.isInteger(n) && n >= 1 && n <= 12 ? n : null;
  };
  const CATALOG = [
    {grade:1, topics:[
      ['Đại từ nhân xưng và to be', [
        'I am a pupil.', 'I am at school.', 'I am very happy.', 'You are my friend.',
        'You are in class.', 'He is my brother.', 'He is a student.', 'She is my sister.',
        'She is at home.', 'We are good friends.', 'We are in class.', 'They are happy today.'
      ]],
      ['This, that và giới thiệu đồ vật', [
        'This is my pencil.', 'This is a ruler.', 'This is my classroom.',
        'This is a blue pen.', 'That is my school.', 'That is a big bag.',
        'That is my teacher.', 'That is a red book.'
      ]],
      ['Tính từ sở hữu và tính từ miêu tả', [
        'My bag is blue.', 'My pen is red.', 'My name is Lan.', 'His hat is green.',
        'Her dress is yellow.', 'Your book is new.', 'Our class is big.', 'Their dog is small.'
      ]],
      ['Câu đơn khẳng định và phủ định', [
        'I like my school.', 'I like green apples.', 'I like cold milk.',
        'I like my new bag.', 'You like red flowers.', 'We like English songs.',
        'We like our school.', 'I have two books.'
      ]],
      ['Mệnh lệnh đơn giản', [
        'Open your English book.', 'Close the classroom door.', 'Look at the board.',
        'Listen to your teacher.', 'Please sit down here.', 'Please stand up now.',
        'Put your bag here.', 'Show me your pen.'
      ]]
    ]},
    {grade:2, topics:[
      ['Can / cannot và khả năng', [
        'I can ride a bike.', 'She can sing a song.', 'He cannot swim today.',
        'Can you play football?', 'We can draw a picture.', 'They cannot fly a kite.'
      ]],
      ['Have / has và câu hỏi ngắn', [
        'He has two pencils.', 'She has a new dress.', 'I have a little cat.',
        'Do you have a ruler?', 'What is your name?', 'Where is your school?'
      ]],
      ['Danh từ số nhiều và từ chỉ số lượng', [
        'These are my pencils.', 'Those are your books.', 'I have three apples.',
        'There are two cats.', 'These flowers are red.', 'Those bags are heavy.'
      ]]
    ]},
    {grade:3, topics:[
      ['Hiện tại đơn và thói quen', [
        'She goes to school early.', 'He plays football on Sundays.',
        'I get up at six.', 'They go home after school.', 'My mother cooks dinner.'
      ]],
      ['Hiện tại tiếp diễn', [
        'She is reading a book.', 'They are playing football.', 'I am doing my homework.',
        'We are watching a film.', 'He is drawing a picture.'
      ]],
      ['Giới từ chỉ nơi chốn', [
        'The cat is under the table.', 'My bag is on the chair.',
        'The ball is behind the door.', 'The shop is next to the school.'
      ]]
    ]},
    {grade:4, topics:[
      ['Quá khứ đơn cơ bản', [
        'I visited my grandma yesterday.', 'She watched TV last night.',
        'He went to school yesterday.', 'We played chess last Sunday.',
        'They were at home yesterday.', 'I did my homework yesterday.'
      ]],
      ['So sánh hơn', [
        'My brother is taller than me.', 'This book is cheaper than that book.',
        'The blue bag is bigger than mine.', 'Today is colder than yesterday.'
      ]],
      ['Trạng từ tần suất', [
        'I usually go to school early.', 'She often reads after dinner.',
        'We sometimes play badminton.', 'He never goes to bed late.'
      ]]
    ]},
    {grade:5, topics:[
      ['Tương lai đơn với will', [
        'I will visit Ha Noi tomorrow.', 'She will study English tonight.',
        'We will go shopping on Sunday.', 'They will help us tomorrow.'
      ]],
      ['So sánh nhất', [
        'Lan is the tallest in class.', 'This is the biggest room.',
        'He is the youngest student.', 'It is the most beautiful picture.'
      ]],
      ['Lời khuyên với should và must', [
        'You should drink more water.', 'We must wear school uniforms.',
        'He should go to bed early.', 'You must stop at red lights.'
      ]]
    ]},
    {grade:6, topics:[
      ['Danh từ đếm được và lượng từ', [
        'There is some milk in the fridge.', 'There are many books on the shelf.',
        'We need a little sugar.', 'She has a few oranges.'
      ]],
      ['Hiện tại đơn và hiện tại tiếp diễn', [
        'My father usually drives to work.', 'She is studying English now.',
        'They do not watch TV every day.', 'Are you doing your homework?'
      ]],
      ['So sánh và cấu trúc there is / are', [
        'This street is narrower than ours.', 'My city is busier than yours.',
        'There are two parks near my home.', 'There is a lake behind the school.'
      ]]
    ]},
    {grade:7, topics:[
      ['Quá khứ đơn và động từ bất quy tắc', [
        'We saw a film last night.', 'She bought a new notebook yesterday.',
        'They did not go to the museum.', 'Did you visit your grandparents?'
      ]],
      ['Liên từ because, although, so', [
        'I stayed home because it rained.', 'Although it rained we went out.',
        'She was tired so she went home.', 'He studies hard because he loves science.'
      ]],
      ['So sánh và cấu trúc giống / khác', [
        'My hobby is different from yours.', 'This song is as good as that one.',
        'His picture is more colorful than mine.', 'She prefers tea to coffee.'
      ]]
    ]},
    {grade:8, topics:[
      ['Câu điều kiện loại một', [
        'If it rains we will stay home.', 'If you study hard you will pass.',
        'We will go out if it stops raining.', 'If she calls I will answer.'
      ]],
      ['Mệnh đề phức với when / while', [
        'When I arrived she was cooking.', 'While he was reading I was writing.',
        'I was sleeping when the phone rang.', 'She smiled when she saw me.'
      ]],
      ['Câu hỏi gián tiếp cơ bản', [
        'Can you tell me where he lives?', 'I wonder why she is absent.',
        'Do you know what time it starts?', 'Please tell me how it works.'
      ]]
    ]},
    {grade:9, topics:[
      ['Câu bị động', [
        'English is spoken in many countries.', 'This bridge was built last year.',
        'The room is cleaned every morning.', 'The homework has been finished.'
      ]],
      ['Mệnh đề quan hệ', [
        'The girl who won is my friend.', 'This is the book that I bought.',
        'The house where I live is small.', 'The man who called is my uncle.'
      ]],
      ['Câu ước và used to', [
        'I wish I had more free time.', 'She wishes she could swim.',
        'He used to ride a bicycle.', 'We did not use to live here.'
      ]]
    ]},
    {grade:10, topics:[
      ['Hiện tại hoàn thành và quá khứ', [
        'I have lived here for five years.', 'She has already finished her work.',
        'We have not seen him since Monday.', 'He has just arrived at school.'
      ]],
      ['Động từ nguyên mẫu và V-ing', [
        'She enjoys listening to music.', 'I want to learn English.',
        'They decided to leave early.', 'He avoids eating too much sugar.'
      ]],
      ['Bị động với động từ khuyết thiếu', [
        'The rules must be followed.', 'This problem can be solved.',
        'The books should be returned.', 'The project will be completed soon.'
      ]]
    ]},
    {grade:11, topics:[
      ['Câu chẻ và nhấn mạnh', [
        'It was Lan who called me.', 'It is music that helps me relax.',
        'It was yesterday that we met.', 'It is my brother who loves chess.'
      ]],
      ['Mệnh đề quan hệ rút gọn', [
        'The boy standing there is my cousin.', 'The book written by her is popular.',
        'Students invited to the event arrived early.', 'The woman sitting near me is kind.'
      ]],
      ['Đảo ngữ cơ bản', [
        'Never have I seen such a view.', 'Rarely does he arrive late.',
        'Only then did I understand her.', 'Not until Monday did he return.'
      ]]
    ]},
    {grade:12, topics:[
      ['Câu điều kiện hỗn hợp', [
        'If I had studied harder I would be ready.', 'If she were careful she would not have fallen.',
        'If he had saved money he would be rich.', 'If I knew French I would have applied.'
      ]],
      ['Đảo ngữ nâng cao', [
        'Hardly had I arrived when it started raining.', 'No sooner had he left than she called.',
        'Under no circumstances should you give up.', 'Not only did she sing but she also danced.'
      ]],
      ['Cấu trúc giả định và nâng cao', [
        'It is essential that he be present.', 'I would rather you stayed here.',
        'She suggested that he take a break.', 'It is time we went home.'
      ]]
    ]}
  ];

  const $ = id => document.getElementById(id);
  const shuffle = input => {
    const a=input.slice();
    for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  };
  const itemsThrough = grade => CATALOG.filter(c=>c.grade<=grade).flatMap(c=>
    c.topics.flatMap(([topic,sentences])=>sentences.map(answer=>({grade:c.grade,topic,answer})))
  ).filter(item => item.answer.length>=2 && item.answer.length<=55 && item.answer.replace(/[.!?]$/,'').trim().split(/\s+/).length>=3);
  const normalize = s => String(s||'').trim().toLowerCase().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
  function splitSentence(sentence) {
    const punctuation = /[.!?]$/.exec(sentence);
    return {words:sentence.replace(/[.!?]$/,'').trim().split(/\s+/), end:punctuation?punctuation[0]:'.'};
  }
  function makePrompt(sentence) {
    const parts = splitSentence(sentence);
    let words = shuffle(parts.words);
    for(let i=0;i<8 && words.join(' ')===parts.words.join(' ');i++) words=shuffle(parts.words);
    if(words.join(' ')===parts.words.join(' ')) words=parts.words.slice().reverse();
    return 'Sắp xếp câu: '+words.join(' / ');
  }
  function makeOptions(sentence) {
    const parts=splitSentence(sentence), original=parts.words.join(' ');
    const seen=new Set([original]);
    const wrong=[];
    for(let attempt=0;attempt<200 && wrong.length<4;attempt++){
      const shuffled=shuffle(parts.words), variant=shuffled.join(' ');
      if(!seen.has(variant)){seen.add(variant);wrong.push(variant+parts.end);}
    }
    if(wrong.length<4) throw Error('Chưa tạo đủ phương án phân biệt cho câu ngữ pháp.');
    const options=shuffle([sentence,...wrong]);
    return {options,correct_index:options.indexOf(sentence)};
  }
  function poolFor(grade) {
    const unique=new Map();
    itemsThrough(grade).forEach(item=>{const key=normalize(item.answer);if(!unique.has(key))unique.set(key,item);});
    return shuffle([...unique.values()]);
  }
  function selectedGrade(game) {
    const fixed=assignedGrade();
    if(fixed) return fixed;
    const field=$('ldd-grammar-grade-'+game);
    const g=Number(field && field.value);
    if(!Number.isInteger(g)||g<1||g>12) throw Error('Hãy chọn lớp ngữ pháp từ 1 đến 12 trước khi tạo phòng.');
    return g;
  }
  function isGrammar(game) {
    const select=$('ldd-game-mode-'+game);
    return !!select && select.value==='grammar';
  }
  function buildRace(game) {
    const grade=selectedGrade(game), selected=poolFor(grade).slice(0,20);
    if(selected.length!==20) throw Error('Kho ngữ pháp không đủ 20 câu.');
    return {
      questions:selected.map((item,i)=>{
        const picks=makeOptions(item.answer);
        return {no:i+1,vi:makePrompt(item.answer),answer:item.answer,options:picks.options,correct_index:picks.correct_index,grammar_grade:item.grade};
      }),
      topicId:'grammar:'+grade,topicTitle:'Ngữ pháp · Lớp 1–'+grade
    };
  }
  function buildShooter(game) {
    const grade=selectedGrade(game), selected=poolFor(grade).filter(item=>
      makePrompt(item.answer).length<=120).slice(0,30);
    if(selected.length!==30) throw Error('Kho ngữ pháp không đủ 30 câu.');
    return {words:selected.map(item=>({en:item.answer,vi:makePrompt(item.answer)})),topic:'Ngữ pháp · Lớp 1–'+grade};
  }
  function mount(game, topicSelectId) {
    if($('ldd-game-mode-'+game)) return;
    const topicSelect=$(topicSelectId);
    if(!topicSelect) return;
    const topicLabel=topicSelect.closest('label');
    if(!topicLabel || !topicLabel.parentNode) return;
    const settings=document.createElement('div');
    settings.className='ldd-game-grammar-settings';
    settings.innerHTML='<label class="ldd-game-grammar-field">Nội dung chơi '+
      '<select id="ldd-game-mode-'+game+'" aria-label="Chọn từ vựng hoặc ngữ pháp">'+
      '<option value="vocabulary">📚 Từ vựng</option><option value="grammar">✏️ Ngữ pháp</option></select></label>'+
      '<div class="ldd-game-grammar-options" hidden>'+
      '<label class="ldd-game-grammar-field ldd-game-grammar-manual">Chọn lớp '+
      '<select id="ldd-grammar-grade-'+game+'" aria-label="Chọn lớp ngữ pháp">'+
      '<option value="">— Chọn lớp 1–12 —</option>'+
      Array.from({length:12},(_,i)=>'<option value="'+(i+1)+'">Lớp '+(i+1)+'</option>').join('')+
      '</select></label><p class="ldd-game-grammar-assigned"></p>'+
      '<details class="ldd-game-grammar-preview"><summary>📋 Xem tóm tắt các điểm ngữ pháp sẽ ra</summary>'+
      '<div class="ldd-game-grammar-preview-body"></div></details></div>';
    topicLabel.parentNode.insertBefore(settings,topicLabel);
    const mode=$('ldd-game-mode-'+game), manual=$('ldd-grammar-grade-'+game);
    const options=settings.querySelector('.ldd-game-grammar-options');
    const assign=settings.querySelector('.ldd-game-grammar-assigned');
    const manualWrap=settings.querySelector('.ldd-game-grammar-manual');
    const preview=settings.querySelector('.ldd-game-grammar-preview-body');
    const render=()=>{
      const isOn=mode.value==='grammar', assigned=assignedGrade();
      topicLabel.style.display=isOn?'none':'';
      options.hidden=!isOn;
      manualWrap.hidden=!!assigned;
      assign.textContent=assigned
        ? 'Học viên lớp '+assigned+': đề tự động lấy ngữ pháp từ lớp 1 đến lớp '+assigned+'.'
        : 'Vai trò không gắn lớp: chọn một lớp từ 1 đến 12 để giới hạn phạm vi đề.';
      preview.replaceChildren();
      const grade=assigned||Number(manual.value);
      if(!grade||grade<1||grade>12){
        preview.textContent='Chọn lớp để xem các chủ điểm sẽ có trong đề.';
        return;
      }
      const heading=document.createElement('p');
      heading.className='ldd-game-grammar-range';
      heading.textContent='Phạm vi câu hỏi: lớp 1 đến lớp '+grade+'. Đề chọn ngẫu nhiên trong các chủ điểm dưới đây.';
      preview.append(heading);
      CATALOG.filter(g=>g.grade<=grade).forEach(group=>{
        const div=document.createElement('div');div.className='ldd-game-grammar-grade-group';
        const name=document.createElement('strong');name.textContent='Lớp '+group.grade;
        const list=document.createElement('ul');
        group.topics.forEach(([topic])=>{const li=document.createElement('li');li.textContent=topic;list.append(li);});
        div.append(name,list);preview.append(div);
      });
    };
    mode.addEventListener('change',render);
    manual.addEventListener('change',render);
    document.addEventListener('ldd:student-grade-changed',render);
    render();
  }
  window.LDDGameGrammar={mount,isGrammar,selectedGrade,buildRace,buildShooter,
    topics:grade=>CATALOG.filter(group=>group.grade<=grade).map(group=>({grade:group.grade,topics:group.topics.map(([title])=>title)}))};
})();