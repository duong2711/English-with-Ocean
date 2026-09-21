/* =============================================================
   LDD ENGLISH — INDEPENDENT SKILL ROADMAPS v1
   - Keeps all legacy learning activities and Supabase tables intact.
   - Adds five independent stages per skill.
   - Stores only UI preference/progress locally (zero extra egress).
   ============================================================= */
(function () {
    'use strict';

    const STORAGE_PREFIX = 'ldd_skill_roadmap_v1::';
    const SCORE_TO_COMPLETE = 80;

    const AUDIENCES = [
        { id: 'foundation', label: 'Mất gốc', start: 1 },
        { id: 'thcs', label: 'THCS', start: 2 },
        { id: 'exam10', label: 'Ôn thi vào 10', start: 3 },
        { id: 'thpt', label: 'THPT', start: 3 },
        { id: 'work', label: 'Đi làm', start: 3 },
        { id: 'ielts', label: 'IELTS', start: 4 }
    ];

    const SKILLS = {
        listening: {
            tabId: 'tab-luyen-nghe',
            gridId: 'ln-stage-folder-grid',
            icon: 'headphones',
            title: 'Luyện Nghe',
            english: 'Listening Lab',
            description: 'Đi từ nhận diện âm và từ khóa đến hội thoại, nội dung dài và bài nghe học thuật. Trình độ Nghe được lưu độc lập với ba kỹ năng còn lại.',
            stages: [
                {
                    title: 'Nhận diện âm và từ',
                    description: 'Phân biệt âm, nghe đánh vần, nhận ra từ đơn và cụm từ quen thuộc.',
                    audiences: ['Mất gốc', 'THCS'],
                    clicks: ['ln-stage1-folder-card', 'ln-lv1-card'],
                    backIds: ['ln-lv1-back-btn']
                },
                {
                    title: 'Bắt từ khóa trong câu',
                    description: 'Nghe câu hoàn chỉnh, điền từ, sắp xếp câu và chọn thông tin đúng.',
                    audiences: ['Mất gốc', 'THCS', 'Thi vào 10'],
                    clicks: ['ln-stage1-folder-card', 'ln-lv2-card'],
                    backIds: ['ln2-back-btn']
                },
                {
                    title: 'Hiểu hội thoại đời sống',
                    description: 'Theo dõi đoạn hội thoại, xác định người nói, mục đích và chi tiết chính.',
                    audiences: ['THCS', 'Thi vào 10', 'THPT'],
                    clicks: ['ln-stage1-folder-card', 'ln-lv3-card'],
                    backIds: ['ln3-back-btn']
                },
                {
                    title: 'Nghe chi tiết và suy luận',
                    description: 'Xử lý bài nghe dài hơn, ghi chú thông tin và suy luận từ ngữ cảnh.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    clicks: ['ln-stage2-folder-card'],
                    backIds: ['ln-stage2-back-btn']
                },
                {
                    title: 'Nghe học thuật và đề thi',
                    description: 'Luyện nội dung tốc độ tự nhiên, bài học thuật và chiến lược làm bài nâng cao.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    clicks: ['ln-stage3-folder-card'],
                    backIds: ['ln-stage3-back-btn']
                }
            ]
        },
        speaking: {
            tabId: 'tab-luyen-noi',
            gridId: 'ls-stage-folder-grid',
            icon: 'microphone',
            title: 'Luyện Nói',
            english: 'Speaking Studio',
            description: 'Rèn phản xạ từng bước: trả lời câu ngắn, mở lời, shadowing, kể chuyện và trình bày quan điểm. Mỗi giai đoạn tận dụng hệ thống ghi âm hiện có.',
            stages: [
                {
                    title: 'Phản xạ hỏi – đáp',
                    description: 'Nghe câu hỏi quen thuộc, tạo câu trả lời ngắn và ghi âm nói lại.',
                    audiences: ['Mất gốc', 'THCS'],
                    clicks: ['ls-stage1-folder-card', 'ls-hoidap-card'],
                    backIds: ['ls1-back-btn']
                },
                {
                    title: 'Mở lời và duy trì hội thoại',
                    description: 'Chọn cách bắt chuyện phù hợp, phản hồi tự nhiên trong tình huống thường ngày.',
                    audiences: ['Mất gốc', 'THCS', 'Đi làm'],
                    clicks: ['ls-stage1-folder-card', 'ls-modau-card'],
                    backIds: ['ls2-back-btn']
                },
                {
                    title: 'Nhịp điệu và Shadowing',
                    description: 'Nghe – nhại lại theo tốc độ thật để cải thiện nối âm, trọng âm và ngữ điệu.',
                    audiences: ['THCS', 'THPT', 'IELTS'],
                    clicks: ['ls-stage2-folder-card', 'ls-shadow-card'],
                    backIds: ['lssh-back-btn']
                },
                {
                    title: 'Kể chuyện và trình bày',
                    description: 'Sắp xếp ý, dùng liên từ và kể lại một sự việc thành đoạn nói có mạch.',
                    audiences: ['Thi vào 10', 'THPT', 'Đi làm'],
                    clicks: ['ls-stage2-folder-card', 'ls-narrate-card'],
                    backIds: ['lsmt-back-btn']
                },
                {
                    title: 'Nêu quan điểm và tranh luận',
                    description: 'Chuẩn bị ý theo khung A.R.E.A, trình bày dài và bảo vệ quan điểm cá nhân.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    clicks: ['ls-stage3-folder-card'],
                    backIds: ['ls-stage3-back-btn']
                }
            ]
        },
        reading: {
            tabId: 'tab-luyen-doc',
            gridId: 'rd-stage-folder-grid',
            icon: 'book',
            title: 'Luyện Đọc',
            english: 'Reading Path',
            description: 'Mỗi giai đoạn có bài đọc và câu hỏi chấm ngay trên thiết bị: từ câu ngắn đến suy luận, văn bản học thuật và tài liệu thực tế.',
            stages: [
                {
                    title: 'Từ và cấu trúc trong câu',
                    description: 'Nhận biết từ loại, cấu trúc cơ bản và ý nghĩa của câu ngắn.',
                    audiences: ['Mất gốc', 'THCS'],
                    custom: 'reading'
                },
                {
                    title: 'Đọc đoạn văn ngắn',
                    description: 'Tìm thông tin trực tiếp, nhân vật, thời gian, địa điểm và hành động chính.',
                    audiences: ['Mất gốc', 'THCS'],
                    custom: 'reading'
                },
                {
                    title: 'Ý chính và từ trong ngữ cảnh',
                    description: 'Tóm tắt nội dung, đoán nghĩa từ mới và phân biệt thông tin quan trọng.',
                    audiences: ['THCS', 'Thi vào 10', 'THPT'],
                    custom: 'reading'
                },
                {
                    title: 'Suy luận và phân tích',
                    description: 'Nhận ra thái độ, mục đích, quan hệ nguyên nhân – kết quả và hàm ý.',
                    audiences: ['Thi vào 10', 'THPT', 'IELTS'],
                    custom: 'reading'
                },
                {
                    title: 'Văn bản học thuật và thực tế',
                    description: 'Đọc bài dài, tài liệu công việc hoặc học thuật với câu hỏi tổng hợp.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    custom: 'reading'
                }
            ]
        },
        writing: {
            tabId: 'tab-luyen-viet',
            gridId: 'wr-stage-folder-grid',
            icon: 'pen',
            title: 'Luyện Viết',
            english: 'Writing Workshop',
            description: 'Phát triển độc lập từ câu đúng, đoạn văn mạch lạc đến email, báo cáo dữ liệu và bài nghị luận học thuật.',
            stages: [
                {
                    title: 'Xây dựng câu đúng',
                    description: 'Viết câu hoàn chỉnh từ ý tiếng Việt và từ khóa bắt buộc, tránh dịch từng chữ.',
                    audiences: ['Mất gốc', 'THCS'],
                    clicks: ['wr1-folder-card'],
                    backIds: ['wr1-back-btn']
                },
                {
                    title: 'Liên kết câu thành đoạn',
                    description: 'Viết đoạn có câu chủ đề, ý hỗ trợ và từ nối; kiểm tra ngay bằng checklist.',
                    audiences: ['THCS', 'Thi vào 10', 'THPT'],
                    custom: 'writing'
                },
                {
                    title: 'Viết theo tình huống',
                    description: 'Viết email, lời nhắn và phản hồi đúng văn phong formal hoặc informal.',
                    audiences: ['THCS', 'THPT', 'Đi làm'],
                    clicks: ['wr2-folder-card'],
                    afterClick: '[data-wr2-sub="email"]',
                    backIds: ['wr2-back-btn']
                },
                {
                    title: 'Báo cáo và mô tả dữ liệu',
                    description: 'Chọn lọc số liệu, viết overview và mô tả xu hướng rõ ràng.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    clicks: ['wr3-folder-card'],
                    afterClick: '[data-wr3-sub="t1"]',
                    backIds: ['wr3-back-btn']
                },
                {
                    title: 'Nghị luận và viết học thuật',
                    description: 'Lập luận theo bố cục, phát triển ý và hoàn thiện bài viết trong thời gian giới hạn.',
                    audiences: ['THPT', 'Đi làm', 'IELTS'],
                    clicks: ['wr3-folder-card'],
                    afterClick: '[data-wr3-sub="t2"]',
                    backIds: ['wr3-back-btn']
                }
            ]
        }
    };

    const READING_TRACKS = {
        school: [
            {
                title: 'A school morning',
                passage: 'Minh gets up at six o’clock every school day. He eats breakfast with his family and rides his bike to school. His first lesson starts at seven fifteen. Minh likes English because he enjoys learning new words and speaking with his classmates.',
                questions: [
                    ['What time does Minh get up?', ['At 5:00', 'At 6:00', 'At 6:30', 'At 7:15'], 1],
                    ['How does he go to school?', ['By bus', 'On foot', 'By bike', 'By car'], 2],
                    ['The word “enjoys” is a…', ['noun', 'verb', 'adjective', 'adverb'], 1],
                    ['Why does Minh like English?', ['It starts early', 'He likes new words and speaking', 'His family studies it', 'He has no homework'], 1]
                ]
            },
            {
                title: 'The new reading club',
                passage: 'Lan joined her school’s reading club last month. The members meet in the library every Thursday afternoon. They read short stories, share their favourite parts, and recommend books to one another. Lan was quiet during her first meeting, but she now enjoys explaining why she likes a story.',
                questions: [
                    ['When does the club meet?', ['Monday morning', 'Thursday afternoon', 'Friday evening', 'Every weekend'], 1],
                    ['Where do the members meet?', ['In a classroom', 'At Lan’s home', 'In the library', 'In the school yard'], 2],
                    ['What changed about Lan?', ['She stopped reading', 'She became more willing to share', 'She left the club', 'She writes every story'], 1],
                    ['Which title best matches the passage?', ['A difficult exam', 'Lan’s reading club', 'A closed library', 'Thursday sports'], 1]
                ]
            },
            {
                title: 'Reducing plastic at school',
                passage: 'Students at Green Hill School noticed that hundreds of plastic cups were thrown away each week. They started bringing reusable bottles and placed water stations in two school buildings. After one month, the number of plastic cups in the rubbish bins fell sharply. The campaign also encouraged several nearby shops to offer discounts to customers who brought their own cups.',
                questions: [
                    ['What problem did students notice?', ['Too few shops', 'Too much plastic waste', 'Dirty water stations', 'Expensive bottles'], 1],
                    ['What does “reusable” most nearly mean?', ['Able to be used again', 'Easy to throw away', 'Made only at school', 'Full of water'], 0],
                    ['What happened after one month?', ['Plastic waste increased', 'The campaign ended', 'Fewer plastic cups were discarded', 'All shops closed'], 2],
                    ['What is the main idea?', ['Students reduced plastic through practical changes', 'Shops sold more plastic cups', 'The school built new classrooms', 'Customers stopped drinking water'], 0]
                ]
            },
            {
                title: 'Homework and independent learning',
                passage: 'Some students believe homework simply repeats what they have already done in class. However, well-designed homework can serve a different purpose. It gives learners time to apply a new idea without immediate help and to identify the parts they still find confusing. The amount of work matters: a focused twenty-minute task may produce better learning than an unfocused assignment that takes two hours. Therefore, schools should consider quality and purpose rather than quantity alone.',
                questions: [
                    ['What does useful homework help learners identify?', ['Their classmates’ scores', 'Parts they still do not understand', 'The longest assignment', 'The teacher’s schedule'], 1],
                    ['Why does the writer mention twenty minutes?', ['To show that shorter focused work can be effective', 'To ban longer lessons', 'To describe an exam', 'To compare two schools'], 0],
                    ['What is the writer’s attitude?', ['All homework is harmful', 'Homework quality matters more than volume', 'Students need two hours daily', 'Homework should repeat classwork'], 1],
                    ['“Therefore” introduces a…', ['contrast', 'conclusion', 'definition', 'question'], 1]
                ]
            },
            {
                title: 'Why cities need quiet green spaces',
                passage: 'Urban parks are often valued for their trees, sports areas and appearance, but their quieter role may be equally important. Researchers have found that brief contact with natural surroundings can reduce mental fatigue and help people recover their attention after demanding tasks. The benefit does not require a large forest; a small neighbourhood garden can also provide a useful pause from traffic and screens. Yet access is uneven. In many crowded districts, residents have fewer safe green areas within walking distance. City planners therefore need to treat small public gardens as essential infrastructure rather than decoration.',
                questions: [
                    ['What less obvious benefit of parks is emphasized?', ['Higher house prices', 'Recovery from mental fatigue', 'More parking space', 'Faster traffic'], 1],
                    ['What can be inferred about small gardens?', ['They are useless without sports areas', 'They can provide meaningful benefits', 'They must replace forests', 'They are only decorative'], 1],
                    ['What inequality does the writer identify?', ['Different access to nearby green space', 'Unequal screen sizes', 'Different tree colours', 'Unequal sports rules'], 0],
                    ['What is the writer’s main recommendation?', ['Remove neighbourhood gardens', 'Build only very large forests', 'Treat green space as necessary city infrastructure', 'Move residents away from cities'], 2]
                ]
            }
        ],
        exam: [
            {
                title: 'Learning a new language',
                passage: 'Learning a language requires regular practice. A student who studies for fifteen minutes every day often remembers more than someone who studies for several hours only once a week. Short, repeated practice helps the brain strengthen new connections and makes useful words easier to recall.',
                questions: [
                    ['What does the passage recommend?', ['One long session a week', 'Regular short practice', 'Learning without review', 'Avoiding new words'], 1],
                    ['The word “regular” is a…', ['noun', 'verb', 'adjective', 'adverb'], 2],
                    ['What becomes easier to recall?', ['Useful words', 'Long exams', 'School rules', 'Study hours'], 0],
                    ['Which statement is true?', ['Repetition can strengthen learning', 'Daily study always takes hours', 'The brain avoids connections', 'Weekly study is always best'], 0]
                ]
            },
            {
                title: 'A community book exchange',
                passage: 'A group of teenagers created a free book exchange in an unused bus shelter. Residents could take a book and leave another one in its place. At first, the group worried that the books might disappear. Instead, local people donated shelves, repaired damaged covers and visited the exchange regularly. The shelter soon became a small meeting point for the neighbourhood.',
                questions: [
                    ['Where was the exchange created?', ['In a bus shelter', 'Inside a school', 'At a bookshop', 'In a station office'], 0],
                    ['What did the teenagers initially worry about?', ['The shelves were too strong', 'The books might disappear', 'Nobody could read', 'The bus would stop'], 1],
                    ['How did residents respond?', ['They removed the books', 'They supported and used the exchange', 'They built a new bus', 'They closed the shelter'], 1],
                    ['What did the place eventually become?', ['A private library', 'A neighbourhood meeting point', 'A classroom', 'A repair shop'], 1]
                ]
            },
            {
                title: 'The value of productive mistakes',
                passage: 'Mistakes are often treated as evidence that learning has failed. In fact, an error can reveal the exact point at which a learner’s understanding breaks down. When students compare their first answer with a correct explanation, they are more likely to notice the missing rule and remember it. This benefit depends on receiving clear feedback; repeating an error without reflection does not automatically produce improvement.',
                questions: [
                    ['What can an error reveal?', ['A learner’s exact difficulty', 'The final exam date', 'A perfect method', 'The teacher’s opinion'], 0],
                    ['Why is comparison useful?', ['It hides the rule', 'It helps learners notice what was missing', 'It prevents all future errors', 'It removes feedback'], 1],
                    ['What does “This benefit” refer to?', ['Remembering through explained mistakes', 'Taking a final exam', 'Repeating every error', 'Avoiding comparison'], 0],
                    ['Which condition is necessary?', ['Clear feedback and reflection', 'More homework only', 'No correction', 'Faster guessing'], 0]
                ]
            },
            {
                title: 'Digital tools and concentration',
                passage: 'Digital tools can make information easier to find, yet constant notifications divide attention into short fragments. Each interruption may last only a few seconds, but returning to a demanding task requires additional mental effort. Turning off unnecessary alerts does not reject technology; it changes the environment so that technology serves the learner’s goal. The strongest strategy is often not greater self-control, but fewer avoidable interruptions.',
                questions: [
                    ['What is the main problem discussed?', ['Slow internet', 'Fragmented attention', 'Missing information', 'Old devices'], 1],
                    ['Why are short interruptions costly?', ['Devices become heavier', 'Returning to the task takes effort', 'Alerts delete information', 'Learners forget their passwords'], 1],
                    ['What does the author imply about self-control?', ['It is always sufficient', 'It can be supported by changing the environment', 'It should replace technology', 'It creates notifications'], 1],
                    ['What is the central recommendation?', ['Use more applications', 'Keep every alert on', 'Reduce avoidable interruptions', 'Stop studying digitally'], 2]
                ]
            },
            {
                title: 'Public transport and induced demand',
                passage: 'Adding road capacity appears to offer a direct solution to congestion. However, wider roads can encourage people to make trips they previously avoided or to move farther from their workplaces. Over time, the additional traffic may consume much of the new capacity, a pattern known as induced demand. This does not mean that roads should never be improved, but it suggests that expansion alone is unlikely to provide a lasting solution. Reliable public transport, safe walking routes and land-use planning must form part of the same strategy.',
                questions: [
                    ['What is “induced demand”?', ['Traffic created partly by added road capacity', 'Demand for safer footpaths only', 'A reduction in travel', 'A public transport discount'], 0],
                    ['Why may wider roads fail to solve congestion?', ['They always close workplaces', 'New traffic can fill the extra space', 'They prevent long trips', 'They reduce road capacity'], 1],
                    ['What qualification does the writer make?', ['Roads should never change', 'Road improvement can still have a role', 'Public transport is unnecessary', 'Land use cannot be planned'], 1],
                    ['What approach does the writer support?', ['Road expansion alone', 'A combined transport and planning strategy', 'Removing walking routes', 'Moving all workplaces'], 1]
                ]
            }
        ],
        work: [
            {
                title: 'A short workplace message',
                passage: 'Hi Mai, the client meeting has moved from 2 p.m. to 3:30 p.m. Please send me the revised slides before lunch so I can check the figures. Thanks, Nam.',
                questions: [
                    ['What changed?', ['The client', 'The meeting time', 'The lunch menu', 'The figures'], 1],
                    ['When are the slides needed?', ['Before lunch', 'At 2 p.m.', 'Tomorrow', 'After the meeting'], 0],
                    ['The word “revised” is closest to…', ['updated', 'deleted', 'printed', 'hidden'], 0],
                    ['Why does Nam need the slides?', ['To book lunch', 'To check the figures', 'To cancel the meeting', 'To meet Mai'], 1]
                ]
            },
            {
                title: 'Office access notice',
                passage: 'From Monday, employees entering the building after 7 p.m. must use the east entrance and scan their staff card. Visitors are not permitted after this time unless their host has registered them with reception before 5 p.m. The underground car park will remain open as usual.',
                questions: [
                    ['Which entrance must late employees use?', ['North', 'South', 'East', 'Main'], 2],
                    ['What must employees scan?', ['A visitor form', 'Their staff card', 'A parking ticket', 'A phone'], 1],
                    ['How can a late visitor enter?', ['By using the car park', 'If the host registers them in advance', 'By arriving without a host', 'Visitors cannot ever enter'], 1],
                    ['What remains unchanged?', ['Reception hours', 'The east entrance', 'The car park opening', 'Visitor rules'], 2]
                ]
            },
            {
                title: 'A project update',
                passage: 'The website redesign remains on schedule, although the testing phase will begin two days later than planned. The design team completed the new checkout screens early, giving the developers extra time to resolve a payment error. Because that issue affected only the test environment, the launch date has not changed. The project manager will review progress again on Friday.',
                questions: [
                    ['What will start later?', ['The launch', 'The design phase', 'The testing phase', 'The Friday review'], 2],
                    ['Why did developers receive extra time?', ['Testing was cancelled', 'Design work finished early', 'The client changed', 'The launch moved'], 1],
                    ['Why is the launch date unchanged?', ['The error affected only testing', 'The error was ignored', 'Payment is unnecessary', 'Friday was cancelled'], 0],
                    ['What is the main purpose of the passage?', ['To advertise a website', 'To summarize project status', 'To explain a new payment method', 'To recruit designers'], 1]
                ]
            },
            {
                title: 'A flexible-working proposal',
                passage: 'The proposal recommends allowing employees to work remotely for up to two days per week. Supporters argue that the policy could reduce commuting time and improve retention. Managers, however, are concerned that new staff may receive less informal guidance. The report therefore suggests pairing remote work with fixed team days and scheduled mentoring. Rather than presenting flexibility as an automatic benefit, it treats successful implementation as a management task.',
                questions: [
                    ['What benefit do supporters mention?', ['Longer commutes', 'Better retention', 'Fewer managers', 'No mentoring'], 1],
                    ['What concerns managers?', ['New staff may receive less informal help', 'The office is too large', 'Employees want fixed hours', 'Commuting is too short'], 0],
                    ['What compromise is proposed?', ['Fully remote work', 'Fixed team days and mentoring', 'No flexible work', 'Hiring fewer people'], 1],
                    ['What is the writer’s main point?', ['Flexibility needs active management', 'Remote work always succeeds', 'Mentoring is unnecessary', 'Retention cannot improve'], 0]
                ]
            },
            {
                title: 'Service agreement extract',
                passage: 'The Supplier shall deliver the monthly report within five business days after the end of each calendar month. The Client must notify the Supplier of any material error within ten business days of receipt. If no notice is received during that period, the report will be treated as accepted. Either party may terminate the agreement by giving thirty days’ written notice, but fees already due remain payable.',
                questions: [
                    ['Who must deliver the monthly report?', ['The Client', 'The Supplier', 'Either party', 'A third party'], 1],
                    ['How long does the Client have to report a material error?', ['Five calendar days', 'Ten business days', 'Thirty days', 'One month'], 1],
                    ['What happens if the Client sends no notice?', ['The agreement ends', 'The report is treated as accepted', 'All fees are cancelled', 'A new report is automatic'], 1],
                    ['What remains payable after termination?', ['Future optional services', 'Fees already due', 'No fees', 'Only delivery costs'], 1]
                ]
            }
        ]
    };

    const WRITING_TASKS = {
        foundation: {
            title: 'My daily routine',
            brief: 'Write one paragraph about your normal day. Begin with a topic sentence, add at least three activities, and finish with one concluding sentence.',
            prompts: ['usually', 'after that', 'because', 'finally'],
            keywords: ['day', 'morning', 'school', 'work', 'usually'],
            minWords: 45,
            minSentences: 4
        },
        thcs: {
            title: 'A school activity I enjoy',
            brief: 'Write one paragraph about a school subject, club or activity that you enjoy. Explain what it is, what you do and why it is useful or interesting.',
            prompts: ['first', 'also', 'because', 'for example', 'therefore'],
            keywords: ['school', 'club', 'subject', 'activity', 'student'],
            minWords: 60,
            minSentences: 5
        },
        exam10: {
            title: 'Benefits of learning English',
            brief: 'Write a paragraph explaining at least two benefits of learning English for teenagers. Include a clear topic sentence and a concluding sentence.',
            prompts: ['firstly', 'moreover', 'for example', 'as a result', 'in conclusion'],
            keywords: ['english', 'learn', 'student', 'communication', 'future'],
            minWords: 80,
            minSentences: 5
        },
        thpt: {
            title: 'Using social media responsibly',
            brief: 'Write a balanced paragraph about how high-school students can use social media responsibly. Give practical advice and explain why it matters.',
            prompts: ['although', 'however', 'for instance', 'therefore', 'overall'],
            keywords: ['social media', 'students', 'online', 'information', 'responsible'],
            minWords: 90,
            minSentences: 6
        },
        work: {
            title: 'A better way to work',
            brief: 'Write a professional paragraph proposing one practical improvement for your workplace. Explain the current problem, your solution and the expected benefit.',
            prompts: ['currently', 'however', 'I suggest', 'as a result', 'therefore'],
            keywords: ['work', 'team', 'company', 'employee', 'improve'],
            minWords: 100,
            minSentences: 6
        },
        ielts: {
            title: 'Public transport in modern cities',
            brief: 'Write one academic body paragraph explaining why governments should or should not invest more in public transport. Develop one main idea with a reason and an example.',
            prompts: ['one reason is that', 'furthermore', 'for example', 'consequently', 'therefore'],
            keywords: ['public transport', 'government', 'city', 'people', 'traffic'],
            minWords: 110,
            minSentences: 6
        }
    };

    let placementSkill = null;
    let placementIndex = 0;
    let placementAnswers = [];
    let placementModal = null;
    const hubs = {};
    const labs = {};

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    function iconSvg(name) {
        const icons = {
            headphones: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2zM20 14a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2z"/></svg>',
            microphone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>',
            book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22zM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/></svg>',
            pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 10.7-10.7a2.1 2.1 0 0 0-3-3L5.2 16zM14.5 6.7l3 3M4 20h5"/></svg>',
            compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z"/></svg>',
            play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>',
            check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
        };
        return icons[name] || icons.compass;
    }

    function readUserId() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i) || '';
                if (!/^sb-.+-auth-token$/.test(key)) continue;
                const value = JSON.parse(localStorage.getItem(key) || 'null');
                const token = value && (value.access_token ||
                    (value.currentSession && value.currentSession.access_token) ||
                    (Array.isArray(value) && value[0] && value[0].access_token));
                if (!token) continue;
                let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
                while (part.length % 4) part += '=';
                const id = (JSON.parse(atob(part)) || {}).sub;
                if (id) return id;
            }
        } catch (error) {
            // Local progress can still use the anonymous fallback.
        }
        return 'device';
    }

    function defaultSkillState() {
        return { audience: 'thcs', recommended: 2, current: 0, completed: [], assessed: false };
    }

    function loadState() {
        const fallback = { skills: {} };
        try {
            const parsed = JSON.parse(localStorage.getItem(STORAGE_PREFIX + readUserId()) || 'null');
            if (parsed && parsed.skills) return parsed;
        } catch (error) {
            // Ignore corrupt or blocked storage.
        }
        return fallback;
    }

    let appState = loadState();

    function getSkillState(skill) {
        if (!appState.skills) appState.skills = {};
        if (!appState.skills[skill]) appState.skills[skill] = defaultSkillState();
        const state = appState.skills[skill];
        if (!AUDIENCES.some(item => item.id === state.audience)) state.audience = 'thcs';
        if (!Array.isArray(state.completed)) state.completed = [];
        state.completed = state.completed.map(Number).filter(n => n >= 1 && n <= 5);
        state.recommended = Math.min(5, Math.max(1, Number(state.recommended) || 1));
        state.current = Math.min(5, Math.max(0, Number(state.current) || 0));
        return state;
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_PREFIX + readUserId(), JSON.stringify(appState));
        } catch (error) {
            // The roadmap remains usable even without persistence.
        }
    }

    function audienceLabel(id) {
        const item = AUDIENCES.find(audience => audience.id === id);
        return item ? item.label : 'THCS';
    }

    function audienceDefaultStage(id) {
        const item = AUDIENCES.find(audience => audience.id === id);
        return item ? item.start : 1;
    }

    function buildHub(skill) {
        const config = SKILLS[skill];
        const tab = document.getElementById(config.tabId);
        const nativeGrid = document.getElementById(config.gridId);
        if (!tab || !nativeGrid) return;

        tab.classList.add('ldd-roadmap-enabled');
        nativeGrid.classList.add('ldd-skill-native-grid');

        const hub = document.createElement('section');
        hub.className = 'ldd-skill-roadmap';
        hub.dataset.skill = skill;
        nativeGrid.parentNode.insertBefore(hub, nativeGrid);
        hubs[skill] = hub;
        renderHub(skill);
        bindLegacyBackButtons(skill);
    }

    function renderHub(skill) {
        const config = SKILLS[skill];
        const state = getSkillState(skill);
        const hub = hubs[skill];
        if (!hub) return;
        const done = state.completed.length;
        const focusStage = state.current || state.recommended;

        hub.innerHTML =
            '<div class="ldd-skill-hero">' +
                '<div class="ldd-skill-identity">' +
                    '<span class="ldd-skill-icon">' + iconSvg(config.icon) + '</span>' +
                    '<div class="ldd-skill-copy">' +
                        '<span class="ldd-skill-eyebrow">' + config.english + '</span>' +
                        '<h2>' + config.title + '</h2>' +
                        '<p>' + config.description + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="ldd-skill-summary" aria-label="Tóm tắt tiến độ">' +
                    '<div class="ldd-skill-stat"><strong>' + done + '/5</strong><span>giai đoạn hoàn thành</span></div>' +
                    '<div class="ldd-skill-stat"><strong>' + focusStage + '</strong><span>giai đoạn nên học</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="ldd-roadmap-control-panel">' +
                '<div>' +
                    '<span class="ldd-control-label">Mục tiêu học tập</span>' +
                    '<div class="ldd-audience-chips">' + AUDIENCES.map(item =>
                        '<button type="button" class="ldd-audience-chip' + (state.audience === item.id ? ' is-active' : '') + '" data-audience="' + item.id + '">' + item.label + '</button>'
                    ).join('') + '</div>' +
                '</div>' +
                '<div class="ldd-roadmap-actions">' +
                    '<button type="button" class="ldd-roadmap-btn" data-roadmap-assess>' + iconSvg('compass') + '<span>Kiểm tra đầu vào 3 phút</span></button>' +
                    '<button type="button" class="ldd-roadmap-btn is-primary" data-roadmap-continue>' + iconSvg('play') + '<span>' + (state.current ? 'Tiếp tục giai đoạn ' + state.current : 'Bắt đầu giai đoạn ' + state.recommended) + '</span></button>' +
                '</div>' +
            '</div>' +
            '<div class="ldd-roadmap-progress">' +
                '<div class="ldd-progress-copy"><span>Tiến độ riêng của kỹ năng</span><span>' + done + ' / 5 giai đoạn</span></div>' +
                '<div class="ldd-progress-track"><span style="width:' + (done * 20) + '%"></span></div>' +
            '</div>' +
            '<ol class="ldd-stage-list">' + config.stages.map((stage, index) => stageCardHtml(skill, stage, index + 1, state)).join('') + '</ol>';

        hub.querySelectorAll('[data-audience]').forEach(button => {
            button.addEventListener('click', function () {
                const next = this.dataset.audience;
                const skillState = getSkillState(skill);
                skillState.audience = next;
                if (!skillState.assessed) skillState.recommended = audienceDefaultStage(next);
                saveState();
                renderHub(skill);
            });
        });

        hub.querySelector('[data-roadmap-assess]').addEventListener('click', () => openPlacement(skill));
        hub.querySelector('[data-roadmap-continue]').addEventListener('click', () => openStage(skill, state.current || state.recommended));
        hub.querySelectorAll('[data-open-stage]').forEach(button => {
            button.addEventListener('click', () => openStage(skill, Number(button.dataset.openStage)));
        });
    }

    function stageCardHtml(skill, stage, number, state) {
        const complete = state.completed.includes(number);
        const current = state.current === number;
        const recommended = state.recommended === number;
        const classes = ['ldd-stage-card'];
        if (complete) classes.push('is-complete');
        if (current) classes.push('is-current');
        if (recommended) classes.push('is-recommended');
        const badges = [];
        if (complete) badges.push('<span class="ldd-stage-badge is-done">Đã hoàn thành</span>');
        else if (current) badges.push('<span class="ldd-stage-badge">Đang học</span>');
        if (recommended && !complete) badges.push('<span class="ldd-stage-badge">Được đề xuất</span>');
        return '<li class="' + classes.join(' ') + '">' +
            '<span class="ldd-stage-number">' + (complete ? iconSvg('check') : number) + '</span>' +
            '<div class="ldd-stage-copy">' +
                '<div class="ldd-stage-topline"><span class="ldd-stage-kicker">Giai đoạn ' + number + '</span>' + badges.join('') + '</div>' +
                '<h3>' + stage.title + '</h3>' +
                '<p>' + stage.description + '</p>' +
                '<div class="ldd-stage-audiences">' + stage.audiences.map(label => '<span>' + label + '</span>').join('') + '</div>' +
            '</div>' +
            '<button type="button" class="ldd-stage-open" data-open-stage="' + number + '">' + (current ? 'Tiếp tục' : (complete ? 'Luyện lại' : 'Bắt đầu')) + ' →</button>' +
        '</li>';
    }

    function bindLegacyBackButtons(skill) {
        const ids = new Set();
        SKILLS[skill].stages.forEach(stage => (stage.backIds || []).forEach(id => ids.add(id)));
        ids.forEach(id => {
            const button = document.getElementById(id);
            if (!button || button.dataset.lddRoadmapBound === '1') return;
            button.dataset.lddRoadmapBound = '1';
            button.addEventListener('click', () => window.setTimeout(() => showHub(skill), 0));
        });
    }

    function hideSkillPanels(skill) {
        const config = SKILLS[skill];
        const tab = document.getElementById(config.tabId);
        if (!tab) return;
        tab.querySelectorAll('[id$="-panel"]').forEach(panel => {
            if (panel.id === 'speaking-grading-panel') return;
            panel.style.display = 'none';
        });
        if (labs[skill]) labs[skill].hidden = true;
    }

    function openStage(skill, stageNumber) {
        const config = SKILLS[skill];
        const stage = config.stages[stageNumber - 1];
        const hub = hubs[skill];
        if (!stage || !hub) return;

        const state = getSkillState(skill);
        state.current = stageNumber;
        saveState();
        hideSkillPanels(skill);
        hub.hidden = true;

        if (stage.custom === 'reading') {
            openReadingLab(stageNumber);
        } else if (stage.custom === 'writing') {
            openWritingLab();
        } else {
            let opened = true;
            (stage.clicks || []).forEach(id => {
                const target = document.getElementById(id);
                if (target) target.click();
                else opened = false;
            });
            if (opened && stage.afterClick) {
                const target = document.querySelector(stage.afterClick);
                if (target) target.click();
            }
            if (!opened) {
                showHub(skill);
                toast('Chưa mở được bài học này. Vui lòng tải lại trang rồi thử lại.');
                return;
            }
        }

        const tab = document.getElementById(config.tabId);
        if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderHub(skill);
    }

    function showHub(skill) {
        hideSkillPanels(skill);
        const hub = hubs[skill];
        if (!hub) return;
        hub.hidden = false;
        renderHub(skill);
        hub.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function markComplete(skill, stage, score) {
        if (Number(score) < SCORE_TO_COMPLETE) return;
        const state = getSkillState(skill);
        if (!state.completed.includes(stage)) state.completed.push(stage);
        state.completed.sort((a, b) => a - b);
        state.current = stage < 5 ? stage + 1 : stage;
        saveState();
        renderHub(skill);
    }

    function installResultBridge() {
        const resultMap = {
            'ln-result-box': ['listening', 1],
            'ln2-result-box': ['listening', 2],
            'ln3-result-box': ['listening', 3],
            'ln-stage2-result-box': ['listening', 4],
            'ln-stage3-result-box': ['listening', 5],
            'ls1-result-box': ['speaking', 1],
            'ls2-result-box': ['speaking', 2],
            'wr1-result-box': ['writing', 1]
        };

        Object.entries(resultMap).forEach(([id, info]) => {
            const element = document.getElementById(id);
            if (!element) return;
            new MutationObserver(function () {
                const match = String(element.textContent || '').match(/\((\d{1,3})%\)/);
                if (match) markComplete(info[0], info[1], Number(match[1]));
            }).observe(element, { childList: true, subtree: true, characterData: true });
        });

        window.addEventListener('ldd:skill-result', function (event) {
            const detail = event.detail || {};
            if (SKILLS[detail.skill]) markComplete(detail.skill, Number(detail.stage), Number(detail.score));
        });

        window.LDDSkillRoadmap = {
            reportResult: function (skill, stage, score) {
                if (SKILLS[skill]) markComplete(skill, Number(stage), Number(score));
            },
            show: showHub
        };
    }

    function buildPlacementModal() {
        placementModal = document.createElement('div');
        placementModal.className = 'ldd-placement-overlay';
        placementModal.hidden = true;
        placementModal.innerHTML = '<div class="ldd-placement-dialog" role="dialog" aria-modal="true" aria-labelledby="ldd-placement-title">' +
            '<div class="ldd-placement-head"><div><h3 id="ldd-placement-title">Kiểm tra đầu vào</h3><p>Đây là đánh giá nhanh để đề xuất điểm bắt đầu; bạn vẫn có thể mở bất kỳ giai đoạn nào.</p></div><button type="button" class="ldd-placement-close" aria-label="Đóng">×</button></div>' +
            '<div class="ldd-placement-progress"><span></span></div>' +
            '<div class="ldd-placement-body"></div>' +
        '</div>';
        document.body.appendChild(placementModal);
        placementModal.querySelector('.ldd-placement-close').addEventListener('click', closePlacement);
        placementModal.addEventListener('click', event => {
            if (event.target === placementModal) closePlacement();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && placementModal && !placementModal.hidden) closePlacement();
        });
    }

    function openPlacement(skill) {
        placementSkill = skill;
        placementIndex = 0;
        placementAnswers = [];
        placementModal.hidden = false;
        document.body.style.overflow = 'hidden';
        renderPlacementQuestion();
    }

    function closePlacement() {
        if (!placementModal) return;
        placementModal.hidden = true;
        document.body.style.overflow = '';
        placementSkill = null;
    }

    function renderPlacementQuestion() {
        const config = SKILLS[placementSkill];
        const stage = config.stages[placementIndex];
        const body = placementModal.querySelector('.ldd-placement-body');
        const progress = placementModal.querySelector('.ldd-placement-progress span');
        progress.style.width = ((placementIndex + 1) / 5 * 100) + '%';
        placementModal.querySelector('#ldd-placement-title').textContent = 'Kiểm tra đầu vào · ' + config.title;
        body.innerHTML =
            '<div class="ldd-placement-count">Khả năng ' + (placementIndex + 1) + ' / 5</div>' +
            '<h4 class="ldd-placement-question">Bạn tự đánh giá khả năng “' + stage.title + '” của mình như thế nào?</h4>' +
            '<div class="ldd-placement-options">' +
                placementOption(0, 'Chưa làm được', 'Tôi cần được hướng dẫn từ đầu.') +
                placementOption(1, 'Làm được khi có hỗ trợ', 'Tôi hiểu một phần nhưng chưa ổn định.') +
                placementOption(2, 'Có thể tự làm', 'Tôi thực hiện khá chắc mà không cần nhiều gợi ý.') +
            '</div>' +
            '<div class="ldd-placement-actions">' +
                '<button type="button" class="ldd-roadmap-btn" data-placement-back' + (placementIndex === 0 ? ' disabled' : '') + '>← Quay lại</button>' +
                '<button type="button" class="ldd-roadmap-btn is-primary" data-placement-next disabled>' + (placementIndex === 4 ? 'Xem đề xuất' : 'Tiếp theo →') + '</button>' +
            '</div>';

        const saved = placementAnswers[placementIndex];
        body.querySelectorAll('[data-placement-value]').forEach(option => {
            if (Number(option.dataset.placementValue) === saved) {
                option.classList.add('is-selected');
                option.querySelector('input').checked = true;
                body.querySelector('[data-placement-next]').disabled = false;
            }
            option.addEventListener('click', function () {
                body.querySelectorAll('[data-placement-value]').forEach(node => node.classList.remove('is-selected'));
                this.classList.add('is-selected');
                this.querySelector('input').checked = true;
                placementAnswers[placementIndex] = Number(this.dataset.placementValue);
                body.querySelector('[data-placement-next]').disabled = false;
            });
        });
        body.querySelector('[data-placement-back]').addEventListener('click', function () {
            if (placementIndex > 0) {
                placementIndex--;
                renderPlacementQuestion();
            }
        });
        body.querySelector('[data-placement-next]').addEventListener('click', function () {
            if (placementAnswers[placementIndex] === undefined) return;
            if (placementIndex < 4) {
                placementIndex++;
                renderPlacementQuestion();
            } else {
                renderPlacementResult();
            }
        });
    }

    function placementOption(value, title, description) {
        return '<label class="ldd-placement-option" data-placement-value="' + value + '"><input type="radio" name="ldd-placement-answer"><span><strong>' + title + '</strong><br><small>' + description + '</small></span></label>';
    }

    function renderPlacementResult() {
        let recommended = placementAnswers.findIndex(answer => answer < 2) + 1;
        if (recommended <= 0) recommended = 5;
        const config = SKILLS[placementSkill];
        const state = getSkillState(placementSkill);
        state.recommended = recommended;
        state.assessed = true;
        saveState();
        renderHub(placementSkill);

        placementModal.querySelector('.ldd-placement-progress span').style.width = '100%';
        placementModal.querySelector('.ldd-placement-body').innerHTML =
            '<div class="ldd-placement-result">' +
                '<div class="ldd-placement-result-mark">' + recommended + '</div>' +
                '<h4>Đề xuất bắt đầu từ Giai đoạn ' + recommended + '</h4>' +
                '<p><strong>' + config.stages[recommended - 1].title + '</strong> phù hợp nhất với phần bạn đang cần củng cố. Đây chỉ là gợi ý, toàn bộ năm giai đoạn vẫn mở để bạn tự lựa chọn.</p>' +
                '<div class="ldd-placement-actions" style="justify-content:center;">' +
                    '<button type="button" class="ldd-roadmap-btn" data-result-close>Để sau</button>' +
                    '<button type="button" class="ldd-roadmap-btn is-primary" data-result-start>Bắt đầu giai đoạn ' + recommended + '</button>' +
                '</div>' +
            '</div>';
        placementModal.querySelector('[data-result-close]').addEventListener('click', closePlacement);
        placementModal.querySelector('[data-result-start]').addEventListener('click', function () {
            const skill = placementSkill;
            closePlacement();
            openStage(skill, recommended);
        });
    }

    function buildReadingLab() {
        const tab = document.getElementById(SKILLS.reading.tabId);
        if (!tab) return;
        const panel = document.createElement('section');
        panel.id = 'ldd-reading-lab-panel';
        panel.className = 'ldd-stage-lab';
        panel.hidden = true;
        tab.appendChild(panel);
        labs.reading = panel;
    }

    function readingTrackForAudience(audience) {
        if (audience === 'work') return 'work';
        if (audience === 'exam10' || audience === 'thpt' || audience === 'ielts') return 'exam';
        return 'school';
    }

    function openReadingLab(stageNumber) {
        const panel = labs.reading;
        const state = getSkillState('reading');
        const exercise = READING_TRACKS[readingTrackForAudience(state.audience)][stageNumber - 1];
        const selected = new Array(exercise.questions.length).fill(null);
        panel.style.display = '';
        panel.hidden = false;
        panel.innerHTML =
            '<div class="ldd-stage-lab-head">' +
                '<div class="ldd-stage-lab-title-wrap"><span class="ldd-stage-lab-index">' + stageNumber + '</span><div><h3>' + SKILLS.reading.stages[stageNumber - 1].title + '</h3><p class="ldd-stage-lab-subtitle">Bài luyện cho mục tiêu ' + audienceLabel(state.audience) + ' · ' + exercise.title + '</p></div></div>' +
                '<button type="button" class="ldd-roadmap-btn" data-reading-back>← Lộ trình Đọc</button>' +
            '</div>' +
            '<div class="ldd-lab-card">' +
                '<div class="ldd-reading-passage">' + exercise.passage + '</div>' +
                '<div class="ldd-reading-questions">' + exercise.questions.map((question, qIndex) =>
                    '<div class="ldd-reading-question"><h4>Câu ' + (qIndex + 1) + '. ' + question[0] + '</h4><div class="ldd-reading-answers">' +
                    question[1].map((answer, aIndex) => '<button type="button" class="ldd-reading-answer" data-reading-q="' + qIndex + '" data-reading-a="' + aIndex + '">' + answer + '</button>').join('') +
                    '</div></div>'
                ).join('') + '</div>' +
                '<div class="ldd-lab-actions"><button type="button" class="ldd-roadmap-btn is-primary" data-reading-submit>Nộp bài và xem kết quả</button></div>' +
                '<div class="ldd-lab-feedback" data-reading-feedback hidden></div>' +
            '</div>';

        panel.querySelector('[data-reading-back]').addEventListener('click', () => showHub('reading'));
        panel.querySelectorAll('[data-reading-q]').forEach(button => {
            button.addEventListener('click', function () {
                const q = Number(this.dataset.readingQ);
                selected[q] = Number(this.dataset.readingA);
                panel.querySelectorAll('[data-reading-q="' + q + '"]').forEach(item => item.classList.remove('is-selected'));
                this.classList.add('is-selected');
            });
        });
        panel.querySelector('[data-reading-submit]').addEventListener('click', function () {
            if (selected.some(answer => answer === null)) {
                toast('Bạn hãy trả lời đủ các câu trước khi nộp bài.');
                return;
            }
            let correct = 0;
            exercise.questions.forEach((question, qIndex) => {
                if (selected[qIndex] === question[2]) correct++;
                panel.querySelectorAll('[data-reading-q="' + qIndex + '"]').forEach(item => {
                    const answer = Number(item.dataset.readingA);
                    item.disabled = true;
                    if (answer === question[2]) item.classList.add('is-correct');
                    else if (answer === selected[qIndex]) item.classList.add('is-wrong');
                });
            });
            const score = Math.round(correct / exercise.questions.length * 100);
            const feedback = panel.querySelector('[data-reading-feedback]');
            feedback.hidden = false;
            feedback.className = 'ldd-lab-feedback ' + (score >= SCORE_TO_COMPLETE ? 'is-success' : 'is-review');
            feedback.innerHTML = '<span class="ldd-feedback-score">' + score + '% · ' + correct + '/' + exercise.questions.length + ' câu đúng</span>' +
                (score >= SCORE_TO_COMPLETE ? 'Bạn đã đạt yêu cầu của giai đoạn này. Giai đoạn tiếp theo đã được đề xuất trên lộ trình.' : 'Bạn chưa đạt mốc 80%. Hãy xem đáp án được tô xanh, đọc lại bài và thử lại.') +
                '<div class="ldd-lab-actions"><button type="button" class="ldd-roadmap-btn" data-reading-retry>Làm lại</button><button type="button" class="ldd-roadmap-btn is-primary" data-reading-route>Về lộ trình</button></div>';
            window.dispatchEvent(new CustomEvent('ldd:skill-result', { detail: { skill: 'reading', stage: stageNumber, score: score } }));
            feedback.querySelector('[data-reading-retry]').addEventListener('click', () => openReadingLab(stageNumber));
            feedback.querySelector('[data-reading-route]').addEventListener('click', () => showHub('reading'));
            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    function buildWritingLab() {
        const tab = document.getElementById(SKILLS.writing.tabId);
        if (!tab) return;
        const panel = document.createElement('section');
        panel.id = 'ldd-writing-stage2-panel';
        panel.className = 'ldd-stage-lab';
        panel.hidden = true;
        tab.appendChild(panel);
        labs.writing = panel;
    }

    function openWritingLab() {
        const panel = labs.writing;
        const state = getSkillState('writing');
        const task = WRITING_TASKS[state.audience] || WRITING_TASKS.thcs;
        panel.style.display = '';
        panel.hidden = false;
        panel.innerHTML =
            '<div class="ldd-stage-lab-head">' +
                '<div class="ldd-stage-lab-title-wrap"><span class="ldd-stage-lab-index">2</span><div><h3>Liên kết câu thành đoạn</h3><p class="ldd-stage-lab-subtitle">Bài luyện cho mục tiêu ' + audienceLabel(state.audience) + '</p></div></div>' +
                '<button type="button" class="ldd-roadmap-btn" data-writing-back>← Lộ trình Viết</button>' +
            '</div>' +
            '<div class="ldd-lab-card">' +
                '<div class="ldd-writing-brief"><strong>' + task.title + '</strong><br>' + task.brief + '</div>' +
                '<span class="ldd-control-label">Từ nối có thể sử dụng</span>' +
                '<div class="ldd-writing-prompts">' + task.prompts.map(prompt => '<span>' + prompt + '</span>').join('') + '</div>' +
                '<textarea class="ldd-writing-area" data-writing-area placeholder="Write your paragraph here..."></textarea>' +
                '<div class="ldd-writing-live-stats"><span data-writing-words>0 từ</span><span data-writing-sentences>0 câu</span><span data-writing-connectors>0 từ nối</span></div>' +
                '<div class="ldd-lab-actions"><button type="button" class="ldd-roadmap-btn is-primary" data-writing-submit>Kiểm tra đoạn văn</button></div>' +
                '<div class="ldd-lab-feedback" data-writing-feedback hidden></div>' +
            '</div>';

        const textarea = panel.querySelector('[data-writing-area]');
        const updateStats = function () {
            const metrics = writingMetrics(textarea.value, task);
            panel.querySelector('[data-writing-words]').textContent = metrics.words + ' từ / cần ' + task.minWords;
            panel.querySelector('[data-writing-sentences]').textContent = metrics.sentences + ' câu / cần ' + task.minSentences;
            panel.querySelector('[data-writing-connectors]').textContent = metrics.connectors + ' từ nối / cần 2';
        };
        textarea.addEventListener('input', updateStats);
        panel.querySelector('[data-writing-back]').addEventListener('click', () => showHub('writing'));
        panel.querySelector('[data-writing-submit]').addEventListener('click', function () {
            const text = textarea.value.trim();
            if (!text) {
                toast('Bạn hãy viết đoạn văn trước khi kiểm tra.');
                textarea.focus();
                return;
            }
            const metrics = writingMetrics(text, task);
            const checks = [
                { pass: metrics.words >= task.minWords, text: 'Đủ ít nhất ' + task.minWords + ' từ' },
                { pass: metrics.sentences >= task.minSentences, text: 'Có ít nhất ' + task.minSentences + ' câu hoàn chỉnh' },
                { pass: metrics.connectors >= 2, text: 'Dùng ít nhất 2 từ nối phù hợp' },
                { pass: metrics.surface, text: 'Câu bắt đầu bằng chữ hoa và kết thúc bằng dấu câu' },
                { pass: metrics.topicHits >= 2, text: 'Nội dung bám sát chủ đề đã chọn' }
            ];
            const passed = checks.filter(check => check.pass).length;
            const score = passed * 20;
            const feedback = panel.querySelector('[data-writing-feedback]');
            feedback.hidden = false;
            feedback.className = 'ldd-lab-feedback ' + (score >= SCORE_TO_COMPLETE ? 'is-success' : 'is-review');
            feedback.innerHTML = '<span class="ldd-feedback-score">' + score + '/100 · đạt ' + passed + '/5 tiêu chí</span><ul>' +
                checks.map(check => '<li>' + (check.pass ? '✓ ' : '• ') + check.text + '</li>').join('') + '</ul>' +
                (score >= SCORE_TO_COMPLETE ? '<strong>Đoạn văn đạt yêu cầu của Giai đoạn 2.</strong>' : '<strong>Hãy chỉnh những tiêu chí còn thiếu rồi kiểm tra lại.</strong>') +
                '<div class="ldd-lab-actions"><button type="button" class="ldd-roadmap-btn" data-writing-edit>Tiếp tục chỉnh sửa</button><button type="button" class="ldd-roadmap-btn is-primary" data-writing-route>Về lộ trình</button></div>';
            window.dispatchEvent(new CustomEvent('ldd:skill-result', { detail: { skill: 'writing', stage: 2, score: score } }));
            feedback.querySelector('[data-writing-edit]').addEventListener('click', () => textarea.focus());
            feedback.querySelector('[data-writing-route]').addEventListener('click', () => showHub('writing'));
            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        updateStats();
    }

    function writingMetrics(text, task) {
        const clean = String(text || '').trim();
        const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
        const sentenceParts = clean.split(/[.!?]+/).map(item => item.trim()).filter(Boolean);
        const sentences = sentenceParts.length;
        const lower = clean.toLowerCase();
        const connectors = task.prompts.filter(prompt => lower.includes(prompt.toLowerCase())).length;
        const topicHits = task.keywords.filter(keyword => lower.includes(keyword.toLowerCase())).length;
        const surface = sentenceParts.length > 0 && sentenceParts.every(sentence => /^[A-Z]/.test(sentence)) && /[.!?]\s*$/.test(clean);
        return { words, sentences, connectors, topicHits, surface };
    }

    function replaceMenuIcons() {
        const menuItems = {
            'tab-luyen-nghe': 'headphones',
            'tab-luyen-noi': 'microphone',
            'tab-luyen-doc': 'book',
            'tab-luyen-viet': 'pen'
        };
        Object.entries(menuItems).forEach(([target, icon]) => {
            const button = document.querySelector('[data-main-target="' + target + '"]');
            if (!button || button.querySelector('.ldd-menu-skill-icon')) return;
            Array.from(button.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) node.nodeValue = String(node.nodeValue || '').replace(/^\s*[🎧🗣️📖✍️]\s*/u, '');
            });
            const iconNode = document.createElement('span');
            iconNode.className = 'ldd-menu-skill-icon';
            iconNode.setAttribute('aria-hidden', 'true');
            iconNode.innerHTML = iconSvg(icon);
            button.insertBefore(iconNode, button.firstChild);
        });
    }

    function toast(message) {
        if (window.vocabTap && typeof window.vocabTap.toast === 'function') {
            window.vocabTap.toast(message, 'info');
            return;
        }
        const container = document.getElementById('app-toast-container');
        if (!container) return;
        const item = document.createElement('div');
        item.className = 'app-toast';
        item.textContent = message;
        container.appendChild(item);
        window.setTimeout(() => item.remove(), 3200);
    }

    function init() {
        replaceMenuIcons();
        buildPlacementModal();
        buildReadingLab();
        buildWritingLab();
        Object.keys(SKILLS).forEach(buildHub);
        installResultBridge();
    }

    ready(init);
})();
