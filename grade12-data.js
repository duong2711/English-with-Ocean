// Dữ liệu từ vựng lớp 12 (THPT) — trích từ SGK Tiếng Anh 12 Global Success, tập 1 và tập 2
// Mỗi unit gồm: từ vựng (words), bài đọc (story). Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE12_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "📖",
    "title": "LIFE STORIES WE ADMIRE",
    "titleVi": "Những câu chuyện cuộc đời đáng ngưỡng mộ",
    "words": [
      {
        "en": "Account",
        "ipa": "/əˈkaʊnt/",
        "vi": "Câu chuyện, bản tường thuật",
        "img": "https://img.invalid/account.jpg",
        "ex": "She gave a moving account of her grandfather's life during the war.",
        "trVi": "Cô ấy đã kể một câu chuyện cảm động về cuộc đời ông mình trong chiến tranh.",
        "trAnswer": "She gave a moving account of her grandfather's life during the war.",
        "trKey": "account"
      },
      {
        "en": "Achievement",
        "ipa": "/əˈtʃiːvmənt/",
        "vi": "Thành tích, thành tựu",
        "img": "https://img.invalid/achievement.jpg",
        "ex": "Winning the national science prize was his greatest achievement.",
        "trVi": "Giành giải thưởng khoa học quốc gia là thành tựu lớn nhất của anh ấy.",
        "trAnswer": "Winning the national science prize was his greatest achievement.",
        "trKey": "achievement"
      },
      {
        "en": "Admire",
        "ipa": "/ədˈmaɪər/",
        "vi": "Ngưỡng mộ, chiêm ngưỡng",
        "img": "https://img.invalid/admire.jpg",
        "ex": "Many young people admire her courage and determination.",
        "trVi": "Nhiều bạn trẻ ngưỡng mộ lòng dũng cảm và sự quyết tâm của cô ấy.",
        "trAnswer": "Many young people admire her courage and determination.",
        "trKey": "admire"
      },
      {
        "en": "Adopt",
        "ipa": "/əˈdɒpt/",
        "vi": "Nhận con nuôi",
        "img": "https://img.invalid/adopt.jpg",
        "ex": "The couple decided to adopt a baby girl from the orphanage.",
        "trVi": "Cặp vợ chồng quyết định nhận nuôi một bé gái từ trại trẻ mồ côi.",
        "trAnswer": "The couple decided to adopt a baby girl from the orphanage.",
        "trKey": "adopt"
      },
      {
        "en": "Animated",
        "ipa": "/ˈænɪmeɪtɪd/",
        "vi": "Thuộc hoạt hình",
        "img": "https://img.invalid/animated.jpg",
        "ex": "Walt Disney created some of the world's first animated films.",
        "trVi": "Walt Disney đã tạo ra một số bộ phim hoạt hình đầu tiên trên thế giới.",
        "trAnswer": "Walt Disney created some of the world's first animated films.",
        "trKey": "animated"
      },
      {
        "en": "Attack",
        "ipa": "/əˈtæk/",
        "vi": "Cuộc tấn công, tấn công",
        "img": "https://img.invalid/attack.jpg",
        "ex": "The soldiers defended the village bravely during the enemy's attack.",
        "trVi": "Các chiến sĩ đã dũng cảm bảo vệ ngôi làng trong cuộc tấn công của kẻ thù.",
        "trAnswer": "The soldiers defended the village bravely during the enemy's attack.",
        "trKey": "attack"
      },
      {
        "en": "Attend school",
        "ipa": "/əˈtend skuːl/",
        "vi": "Đi học (trường, đại học, cao đẳng)",
        "img": "https://img.invalid/attend-school.jpg",
        "ex": "Because her family was poor, she could not attend school every day.",
        "trVi": "Vì gia đình nghèo nên cô ấy không thể đến trường mỗi ngày.",
        "trAnswer": "Because her family was poor, she could not attend school every day.",
        "trKey": "attend"
      },
      {
        "en": "Battle",
        "ipa": "/ˈbætl/",
        "vi": "Trận chiến",
        "img": "https://img.invalid/battle.jpg",
        "ex": "He was wounded in a fierce battle but survived.",
        "trVi": "Anh ấy bị thương trong một trận chiến ác liệt nhưng đã sống sót.",
        "trAnswer": "He was wounded in a fierce battle but survived.",
        "trKey": "battle"
      },
      {
        "en": "Biography",
        "ipa": "/baɪˈɒɡrəfi/",
        "vi": "Tiểu sử",
        "img": "https://img.invalid/biography.jpg",
        "ex": "The teacher asked us to write a short biography of a famous scientist.",
        "trVi": "Giáo viên yêu cầu chúng tôi viết một bản tiểu sử ngắn về một nhà khoa học nổi tiếng.",
        "trAnswer": "The teacher asked us to write a short biography of a famous scientist.",
        "trKey": "biography"
      },
      {
        "en": "Biological",
        "ipa": "/ˌbaɪəˈlɒdʒɪkl/",
        "vi": "Thuộc quan hệ ruột thịt",
        "img": "https://img.invalid/biological.jpg",
        "ex": "He grew up not knowing who his biological parents were.",
        "trVi": "Anh ấy lớn lên mà không biết cha mẹ ruột của mình là ai.",
        "trAnswer": "He grew up not knowing who his biological parents were.",
        "trKey": "biological"
      },
      {
        "en": "Bond",
        "ipa": "/bɒnd/",
        "vi": "Kết thân (với ai)",
        "img": "https://img.invalid/bond.jpg",
        "ex": "The two soldiers bonded over their shared love of music.",
        "trVi": "Hai người lính đã kết thân với nhau qua niềm đam mê âm nhạc chung.",
        "trAnswer": "The two soldiers bonded over their shared love of music.",
        "trKey": "bond"
      },
      {
        "en": "Cancer",
        "ipa": "/ˈkænsər/",
        "vi": "Ung thư",
        "img": "https://img.invalid/cancer.jpg",
        "ex": "He was diagnosed with cancer, but he kept working with a positive spirit.",
        "trVi": "Anh ấy được chẩn đoán mắc bệnh ung thư, nhưng vẫn tiếp tục làm việc với tinh thần lạc quan.",
        "trAnswer": "He was diagnosed with cancer, but he kept working with a positive spirit.",
        "trKey": "cancer"
      },
      {
        "en": "Carry out",
        "ipa": "/ˈkæri aʊt/",
        "vi": "Tiến hành",
        "img": "https://img.invalid/carry-out.jpg",
        "ex": "The scientist carried out many experiments before making the discovery.",
        "trVi": "Nhà khoa học đã tiến hành nhiều thí nghiệm trước khi có được phát hiện đó.",
        "trAnswer": "The scientist carried out many experiments before making the discovery.",
        "trKey": "carry out"
      },
      {
        "en": "Childhood",
        "ipa": "/ˈtʃaɪldhʊd/",
        "vi": "Tuổi thơ",
        "img": "https://img.invalid/childhood.jpg",
        "ex": "She spent her childhood in a small village in the countryside.",
        "trVi": "Cô ấy đã trải qua tuổi thơ ở một ngôi làng nhỏ ở vùng quê.",
        "trAnswer": "She spent her childhood in a small village in the countryside.",
        "trKey": "childhood"
      },
      {
        "en": "Communist Party of Viet Nam",
        "ipa": "/ˈkɒmjənɪst ˈpɑːti əv ˌvjetˈnæm/",
        "vi": "Đảng Cộng sản Việt Nam",
        "img": "https://img.invalid/communist-party-of-viet-nam.jpg",
        "ex": "He joined the Communist Party of Viet Nam when he was a young soldier.",
        "trVi": "Ông gia nhập Đảng Cộng sản Việt Nam khi còn là một người lính trẻ.",
        "trAnswer": "He joined the Communist Party of Viet Nam when he was a young soldier.",
        "trKey": "communist party"
      },
      {
        "en": "Death",
        "ipa": "/deθ/",
        "vi": "Cái chết",
        "img": "https://img.invalid/death.jpg",
        "ex": "His death was a great loss to the whole nation.",
        "trVi": "Cái chết của ông là một mất mát lớn đối với cả dân tộc.",
        "trAnswer": "His death was a great loss to the whole nation.",
        "trKey": "death"
      },
      {
        "en": "Defeat",
        "ipa": "/dɪˈfiːt/",
        "vi": "Đánh bại",
        "img": "https://img.invalid/defeat.jpg",
        "ex": "The Vietnamese army defeated the enemy after a long and hard battle.",
        "trVi": "Quân đội Việt Nam đã đánh bại kẻ thù sau một trận chiến dài và gian khổ.",
        "trAnswer": "The Vietnamese army defeated the enemy after a long and hard battle.",
        "trKey": "defeat"
      },
      {
        "en": "Devote to",
        "ipa": "/dɪˈvəʊt tuː/",
        "vi": "Cống hiến cho",
        "img": "https://img.invalid/devote-to.jpg",
        "ex": "She devoted her whole life to helping poor children get an education.",
        "trVi": "Bà đã cống hiến cả cuộc đời mình để giúp trẻ em nghèo được đi học.",
        "trAnswer": "She devoted her whole life to helping poor children get an education.",
        "trKey": "devote"
      },
      {
        "en": "Drop out",
        "ipa": "/drɒp aʊt/",
        "vi": "Bỏ học",
        "img": "https://img.invalid/drop-out.jpg",
        "ex": "He dropped out of college but later became a successful businessman.",
        "trVi": "Anh ấy đã bỏ học đại học nhưng sau đó trở thành một doanh nhân thành đạt.",
        "trAnswer": "He dropped out of college but later became a successful businessman.",
        "trKey": "drop out"
      },
      {
        "en": "Enemy",
        "ipa": "/ˈenəmi/",
        "vi": "Kẻ thù",
        "img": "https://img.invalid/enemy.jpg",
        "ex": "The soldiers fought bravely against the enemy to protect their homeland.",
        "trVi": "Các chiến sĩ đã chiến đấu dũng cảm chống lại kẻ thù để bảo vệ quê hương.",
        "trAnswer": "The soldiers fought bravely against the enemy to protect their homeland.",
        "trKey": "enemy"
      },
      {
        "en": "Genius",
        "ipa": "/ˈdʒiːniəs/",
        "vi": "Thiên tài",
        "img": "https://img.invalid/genius.jpg",
        "ex": "Many people consider Albert Einstein to be a genius.",
        "trVi": "Nhiều người coi Albert Einstein là một thiên tài.",
        "trAnswer": "Many people consider Albert Einstein to be a genius.",
        "trKey": "genius"
      },
      {
        "en": "Hero",
        "ipa": "/ˈhɪərəʊ/",
        "vi": "Anh hùng",
        "img": "https://img.invalid/hero.jpg",
        "ex": "She is remembered today as a national hero.",
        "trVi": "Ngày nay bà được nhớ đến như một anh hùng dân tộc.",
        "trAnswer": "She is remembered today as a national hero.",
        "trKey": "hero"
      },
      {
        "en": "Marriage",
        "ipa": "/ˈmærɪdʒ/",
        "vi": "Cuộc hôn nhân",
        "img": "https://img.invalid/marriage.jpg",
        "ex": "Their marriage lasted for more than fifty happy years.",
        "trVi": "Cuộc hôn nhân của họ kéo dài hơn năm mươi năm hạnh phúc.",
        "trAnswer": "Their marriage lasted for more than fifty happy years.",
        "trKey": "marriage"
      },
      {
        "en": "Military",
        "ipa": "/ˈmɪlətri/",
        "vi": "Quân đội",
        "img": "https://img.invalid/military.jpg",
        "ex": "He joined the military at the age of eighteen.",
        "trVi": "Anh ấy gia nhập quân đội năm mười tám tuổi.",
        "trAnswer": "He joined the military at the age of eighteen.",
        "trKey": "military"
      },
      {
        "en": "On cloud nine",
        "ipa": "/ɒn klaʊd naɪn/",
        "vi": "Rất vui sướng, hạnh phúc",
        "img": "https://img.invalid/on-cloud-nine.jpg",
        "ex": "When she won the scholarship, she was on cloud nine.",
        "trVi": "Khi giành được học bổng, cô ấy vui sướng như trên mây.",
        "trAnswer": "When she won the scholarship, she was on cloud nine.",
        "trKey": "cloud nine"
      },
      {
        "en": "Pancreatic",
        "ipa": "/ˌpæŋkriˈætɪk/",
        "vi": "Liên quan tới tuyến tụy",
        "img": "https://img.invalid/pancreatic.jpg",
        "ex": "He passed away after a long battle with pancreatic cancer.",
        "trVi": "Ông qua đời sau một thời gian dài chống chọi với bệnh ung thư tuyến tụy.",
        "trAnswer": "He passed away after a long battle with pancreatic cancer.",
        "trKey": "pancreatic"
      },
      {
        "en": "Pass away",
        "ipa": "/pɑːs əˈweɪ/",
        "vi": "Qua đời",
        "img": "https://img.invalid/pass-away.jpg",
        "ex": "The famous writer passed away peacefully at the age of ninety.",
        "trVi": "Nhà văn nổi tiếng đã qua đời thanh thản ở tuổi chín mươi.",
        "trAnswer": "The famous writer passed away peacefully at the age of ninety.",
        "trKey": "pass away"
      },
      {
        "en": "Poem",
        "ipa": "/ˈpəʊɪm/",
        "vi": "Bài thơ",
        "img": "https://img.invalid/poem.jpg",
        "ex": "She wrote a poem about her hometown before she died.",
        "trVi": "Bà đã viết một bài thơ về quê hương trước khi qua đời.",
        "trAnswer": "She wrote a poem about her hometown before she died.",
        "trKey": "poem"
      },
      {
        "en": "Poetry",
        "ipa": "/ˈpəʊətri/",
        "vi": "Thơ ca",
        "img": "https://img.invalid/poetry.jpg",
        "ex": "He is famous not only as a soldier but also for his poetry.",
        "trVi": "Ông không chỉ nổi tiếng là một người lính mà còn bởi những vần thơ ca của mình.",
        "trAnswer": "He is famous not only as a soldier but also for his poetry.",
        "trKey": "poetry"
      },
      {
        "en": "Resign",
        "ipa": "/rɪˈzaɪn/",
        "vi": "Từ chức",
        "img": "https://img.invalid/resign.jpg",
        "ex": "The manager decided to resign after twenty years in the company.",
        "trVi": "Vị quản lí quyết định từ chức sau hai mươi năm làm việc tại công ty.",
        "trAnswer": "The manager decided to resign after twenty years in the company.",
        "trKey": "resign"
      },
      {
        "en": "Resistance war",
        "ipa": "/rɪˈzɪstəns wɔːr/",
        "vi": "Cuộc kháng chiến",
        "img": "https://img.invalid/resistance-war.jpg",
        "ex": "She worked as a surgeon in a field hospital during the resistance war.",
        "trVi": "Bà làm bác sĩ phẫu thuật tại một bệnh viện dã chiến trong cuộc kháng chiến.",
        "trAnswer": "She worked as a surgeon in a field hospital during the resistance war.",
        "trKey": "resistance war"
      },
      {
        "en": "Rule",
        "ipa": "/ruːl/",
        "vi": "Sự trị vì, trị vì",
        "img": "https://img.invalid/rule.jpg",
        "ex": "The queen ruled the country wisely for over sixty years.",
        "trVi": "Nữ hoàng đã trị vì đất nước một cách khôn ngoan trong hơn sáu mươi năm.",
        "trAnswer": "The queen ruled the country wisely for over sixty years.",
        "trKey": "rule"
      },
      {
        "en": "Youth",
        "ipa": "/juːθ/",
        "vi": "Tuổi trẻ",
        "img": "https://img.invalid/youth.jpg",
        "ex": "In his youth, he dreamed of becoming a doctor to help the poor.",
        "trVi": "Thời trẻ, ông từng mơ ước trở thành bác sĩ để giúp đỡ người nghèo.",
        "trAnswer": "In his youth, he dreamed of becoming a doctor to help the poor.",
        "trKey": "youth"
      }
    ],
    "story": {
      "title": "The diary that touched a nation",
      "titleVi": "Cuốn nhật kí đã chạm đến trái tim cả một dân tộc",
      "text": "Among the many life stories people admire in Viet Nam, few are as moving as that of Dang Thuy Tram. In her youth, she studied medicine in Ha Noi and later volunteered to join the army as a surgeon.<br><br>During the resistance war, she worked in a small field hospital, treating wounded soldiers every day. She also devoted her free time to writing a diary about her hopes, her fears, and her love for her country. Her writing was later carried out into a book that touched millions of readers.<br><br>Tram passed away when she was still young, but her diary survived the war. Today, people admire her not for a battle she fought alone, but for the quiet courage of her everyday life. She is remembered as one of Viet Nam's most beloved heroes.",
      "textVi": "Trong số nhiều câu chuyện cuộc đời được người Việt Nam ngưỡng mộ, ít câu chuyện nào cảm động như câu chuyện của Đặng Thùy Trâm. Thời trẻ, bà học ngành y ở Hà Nội và sau đó tình nguyện gia nhập quân đội với vai trò bác sĩ phẫu thuật.<br><br>Trong cuộc kháng chiến, bà làm việc tại một bệnh viện dã chiến nhỏ, hằng ngày điều trị cho các thương binh. Bà cũng dành thời gian rảnh để viết nhật kí về những hi vọng, nỗi sợ hãi và tình yêu quê hương của mình. Những trang viết ấy sau này được biên soạn thành một cuốn sách chạm đến trái tim hàng triệu độc giả.<br><br>Trâm qua đời khi còn rất trẻ, nhưng cuốn nhật kí của bà đã sống sót qua chiến tranh. Ngày nay, mọi người ngưỡng mộ bà không phải vì một trận chiến bà chiến đấu một mình, mà vì sự dũng cảm thầm lặng trong cuộc sống thường nhật của bà. Bà được nhớ đến như một trong những anh hùng được yêu mến nhất của Việt Nam.",
      "used": [
        "Youth",
        "Devote to",
        "Resistance war",
        "Carry out",
        "Pass away",
        "Battle",
        "Admire",
        "Hero"
      ]
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🌏",
    "title": "A MULTICULTURAL WORLD",
    "titleVi": "Một thế giới đa văn hóa",
    "words": [
      {
        "en": "Admire",
        "ipa": "/ədˈmaɪər/",
        "vi": "Ngắm nhìn, chiêm ngưỡng",
        "img": "https://img.invalid/admire.jpg",
        "ex": "Tourists come from all over the world to admire the ancient temple.",
        "trVi": "Du khách từ khắp nơi trên thế giới đến chiêm ngưỡng ngôi đền cổ.",
        "trAnswer": "Tourists come from all over the world to admire the ancient temple.",
        "trKey": "admire"
      },
      {
        "en": "Anxiety",
        "ipa": "/æŋˈzaɪəti/",
        "vi": "Sự bồn chồn, lo lắng",
        "img": "https://img.invalid/anxiety.jpg",
        "ex": "She felt a little anxiety before performing the traditional dance on stage.",
        "trVi": "Cô ấy cảm thấy hơi bồn chồn trước khi biểu diễn điệu múa truyền thống trên sân khấu.",
        "trAnswer": "She felt a little anxiety before performing the traditional dance on stage.",
        "trKey": "anxiety"
      },
      {
        "en": "Appreciate",
        "ipa": "/əˈpriːʃieɪt/",
        "vi": "Thưởng thức, trân trọng",
        "img": "https://img.invalid/appreciate.jpg",
        "ex": "Living abroad helped him appreciate his own culture even more.",
        "trVi": "Sống ở nước ngoài giúp anh ấy càng trân trọng nền văn hóa của chính mình hơn.",
        "trAnswer": "Living abroad helped him appreciate his own culture even more.",
        "trKey": "appreciate"
      },
      {
        "en": "Bamboo dancing",
        "ipa": "/bæmˈbuː dɑːnsɪŋ/",
        "vi": "Nhảy sạp",
        "img": "https://img.invalid/bamboo-dancing.jpg",
        "ex": "Visitors were invited to try bamboo dancing at the festival.",
        "trVi": "Du khách được mời thử nhảy sạp tại lễ hội.",
        "trAnswer": "Visitors were invited to try bamboo dancing at the festival.",
        "trKey": "bamboo dancing"
      },
      {
        "en": "Captivate",
        "ipa": "/ˈkæptɪveɪt/",
        "vi": "Thu hút, cuốn hút",
        "img": "https://img.invalid/captivate.jpg",
        "ex": "The colourful costumes captivated everyone at the parade.",
        "trVi": "Những bộ trang phục sặc sỡ đã thu hút mọi người tại buổi diễu hành.",
        "trAnswer": "The colourful costumes captivated everyone at the parade.",
        "trKey": "captivate"
      },
      {
        "en": "Celebrate",
        "ipa": "/ˈselɪbreɪt/",
        "vi": "Tổ chức mừng",
        "img": "https://img.invalid/celebrate.jpg",
        "ex": "Families in Viet Nam celebrate Tet with special food and customs.",
        "trVi": "Các gia đình ở Việt Nam tổ chức mừng Tết với những món ăn và phong tục đặc biệt.",
        "trAnswer": "Families in Viet Nam celebrate Tet with special food and customs.",
        "trKey": "celebrate"
      },
      {
        "en": "Confusion",
        "ipa": "/kənˈfjuːʒn/",
        "vi": "Sự khó hiểu, sự hỗn độn",
        "img": "https://img.invalid/confusion.jpg",
        "ex": "The new student felt confusion about some of the local customs.",
        "trVi": "Học sinh mới cảm thấy khó hiểu về một số phong tục địa phương.",
        "trAnswer": "The new student felt confusion about some of the local customs.",
        "trKey": "confusion"
      },
      {
        "en": "Costume",
        "ipa": "/ˈkɒstjuːm/",
        "vi": "Trang phục",
        "img": "https://img.invalid/costume.jpg",
        "ex": "Each region of Viet Nam has its own traditional costume.",
        "trVi": "Mỗi vùng miền của Việt Nam có trang phục truyền thống riêng.",
        "trAnswer": "Each region of Viet Nam has its own traditional costume.",
        "trKey": "costume"
      },
      {
        "en": "Cuisine",
        "ipa": "/kwɪˈziːn/",
        "vi": "Ẩm thực",
        "img": "https://img.invalid/cuisine.jpg",
        "ex": "Vietnamese cuisine is famous for its fresh ingredients and balanced flavours.",
        "trVi": "Ẩm thực Việt Nam nổi tiếng với nguyên liệu tươi và hương vị cân bằng.",
        "trAnswer": "Vietnamese cuisine is famous for its fresh ingredients and balanced flavours.",
        "trKey": "cuisine"
      },
      {
        "en": "Cultural",
        "ipa": "/ˈkʌltʃərəl/",
        "vi": "Thuộc về văn hóa",
        "img": "https://img.invalid/cultural.jpg",
        "ex": "The exchange programme gives students a valuable cultural experience.",
        "trVi": "Chương trình trao đổi mang lại cho học sinh trải nghiệm văn hóa quý giá.",
        "trAnswer": "The exchange programme gives students a valuable cultural experience.",
        "trKey": "cultural"
      },
      {
        "en": "Culture shock",
        "ipa": "/ˈkʌltʃə ʃɒk/",
        "vi": "Sốc văn hóa",
        "img": "https://img.invalid/culture-shock.jpg",
        "ex": "Many students experience culture shock during their first weeks abroad.",
        "trVi": "Nhiều học sinh trải qua sốc văn hóa trong những tuần đầu ở nước ngoài.",
        "trAnswer": "Many students experience culture shock during their first weeks abroad.",
        "trKey": "culture shock"
      },
      {
        "en": "Custom",
        "ipa": "/ˈkʌstəm/",
        "vi": "Phong tục",
        "img": "https://img.invalid/custom.jpg",
        "ex": "It is a custom in many countries to remove your shoes before entering a house.",
        "trVi": "Việc cởi giày trước khi vào nhà là một phong tục ở nhiều quốc gia.",
        "trAnswer": "It is a custom in many countries to remove your shoes before entering a house.",
        "trKey": "custom"
      },
      {
        "en": "Diversity",
        "ipa": "/daɪˈvɜːsəti/",
        "vi": "Sự đa dạng",
        "img": "https://img.invalid/diversity.jpg",
        "ex": "The festival celebrates the diversity of cultures in South East Asia.",
        "trVi": "Lễ hội tôn vinh sự đa dạng văn hóa ở Đông Nam Á.",
        "trAnswer": "The festival celebrates the diversity of cultures in South East Asia.",
        "trKey": "diversity"
      },
      {
        "en": "Extracurricular",
        "ipa": "/ˌekstrəkəˈrɪkjələ/",
        "vi": "Ngoại khóa",
        "img": "https://img.invalid/extracurricular.jpg",
        "ex": "Joining extracurricular clubs helps students learn about other cultures.",
        "trVi": "Tham gia các câu lạc bộ ngoại khóa giúp học sinh tìm hiểu về các nền văn hóa khác.",
        "trAnswer": "Joining extracurricular clubs helps students learn about other cultures.",
        "trKey": "extracurricular"
      },
      {
        "en": "Festivity",
        "ipa": "/feˈstɪvəti/",
        "vi": "Ngày hội",
        "img": "https://img.invalid/festivity.jpg",
        "ex": "The whole town takes part in the festivity every spring.",
        "trVi": "Cả thị trấn tham gia vào ngày hội mỗi mùa xuân.",
        "trAnswer": "The whole town takes part in the festivity every spring.",
        "trKey": "festivity"
      },
      {
        "en": "Globalisation",
        "ipa": "/ˌɡləʊbəlaɪˈzeɪʃn/",
        "vi": "Sự toàn cầu hóa",
        "img": "https://img.invalid/globalisation.jpg",
        "ex": "Globalisation has made it easier for people to learn about other cultures.",
        "trVi": "Toàn cầu hóa đã giúp mọi người dễ dàng tìm hiểu về các nền văn hóa khác hơn.",
        "trAnswer": "Globalisation has made it easier for people to learn about other cultures.",
        "trKey": "globalisation"
      },
      {
        "en": "Identity",
        "ipa": "/aɪˈdentəti/",
        "vi": "Bản sắc, đặc điểm nhận dạng",
        "img": "https://img.invalid/identity.jpg",
        "ex": "Traditional festivals help young people keep their cultural identity.",
        "trVi": "Các lễ hội truyền thống giúp giới trẻ giữ gìn bản sắc văn hóa của mình.",
        "trAnswer": "Traditional festivals help young people keep their cultural identity.",
        "trKey": "identity"
      },
      {
        "en": "Keep up with",
        "ipa": "/kiːp ʌp wɪð/",
        "vi": "Bắt kịp với, theo kịp",
        "img": "https://img.invalid/keep-up-with.jpg",
        "ex": "It can be hard to keep up with the customs of a new country at first.",
        "trVi": "Ban đầu có thể khó bắt kịp với phong tục của một đất nước mới.",
        "trAnswer": "It can be hard to keep up with the customs of a new country at first.",
        "trKey": "keep up"
      },
      {
        "en": "Lifestyle",
        "ipa": "/ˈlaɪfstaɪl/",
        "vi": "Lối sống",
        "img": "https://img.invalid/lifestyle.jpg",
        "ex": "Moving to a big city completely changed her lifestyle.",
        "trVi": "Chuyển đến một thành phố lớn đã thay đổi hoàn toàn lối sống của cô ấy.",
        "trAnswer": "Moving to a big city completely changed her lifestyle.",
        "trKey": "lifestyle"
      },
      {
        "en": "Multicultural",
        "ipa": "/ˌmʌltiˈkʌltʃərəl/",
        "vi": "Có tính đa văn hóa",
        "img": "https://img.invalid/multicultural.jpg",
        "ex": "Singapore is well known as a multicultural country.",
        "trVi": "Singapore nổi tiếng là một quốc gia đa văn hóa.",
        "trAnswer": "Singapore is well known as a multicultural country.",
        "trKey": "multicultural"
      },
      {
        "en": "Origin",
        "ipa": "/ˈɒrɪdʒɪn/",
        "vi": "Nguồn gốc",
        "img": "https://img.invalid/origin.jpg",
        "ex": "The dish has its origin in a small village in central Viet Nam.",
        "trVi": "Món ăn này có nguồn gốc từ một ngôi làng nhỏ ở miền Trung Việt Nam.",
        "trAnswer": "The dish has its origin in a small village in central Viet Nam.",
        "trKey": "origin"
      },
      {
        "en": "Popularity",
        "ipa": "/ˌpɒpjuˈlærəti/",
        "vi": "Sự phổ biến, sự thông dụng",
        "img": "https://img.invalid/popularity.jpg",
        "ex": "Vietnamese street food has grown in popularity around the world.",
        "trVi": "Ẩm thực đường phố Việt Nam ngày càng phổ biến trên khắp thế giới.",
        "trAnswer": "Vietnamese street food has grown in popularity around the world.",
        "trKey": "popularity"
      },
      {
        "en": "Speciality",
        "ipa": "/ˌspeʃiˈæləti/",
        "vi": "Đặc sản",
        "img": "https://img.invalid/speciality.jpg",
        "ex": "Pho is one of the best-known specialities of Vietnamese cuisine.",
        "trVi": "Phở là một trong những đặc sản nổi tiếng nhất của ẩm thực Việt Nam.",
        "trAnswer": "Pho is one of the best-known specialities of Vietnamese cuisine.",
        "trKey": "speciality"
      },
      {
        "en": "Staple",
        "ipa": "/ˈsteɪpl/",
        "vi": "Cơ bản, chủ yếu",
        "img": "https://img.invalid/staple.jpg",
        "ex": "Rice is a staple food in most South East Asian countries.",
        "trVi": "Gạo là lương thực chủ yếu ở hầu hết các nước Đông Nam Á.",
        "trAnswer": "Rice is a staple food in most South East Asian countries.",
        "trKey": "staple"
      },
      {
        "en": "Tasty",
        "ipa": "/ˈteɪsti/",
        "vi": "Ngon",
        "img": "https://img.invalid/tasty.jpg",
        "ex": "The street vendor sells extremely tasty spring rolls.",
        "trVi": "Người bán hàng rong bán những chiếc nem rán vô cùng ngon.",
        "trAnswer": "The street vendor sells extremely tasty spring rolls.",
        "trKey": "tasty"
      },
      {
        "en": "Traditional",
        "ipa": "/trəˈdɪʃənl/",
        "vi": "Truyền thống",
        "img": "https://img.invalid/traditional.jpg",
        "ex": "Wearing the traditional ao dai makes her feel proud of her culture.",
        "trVi": "Mặc áo dài truyền thống khiến cô ấy cảm thấy tự hào về văn hóa của mình.",
        "trAnswer": "Wearing the traditional ao dai makes her feel proud of her culture.",
        "trKey": "traditional"
      },
      {
        "en": "Trend",
        "ipa": "/trend/",
        "vi": "Xu hướng",
        "img": "https://img.invalid/trend.jpg",
        "ex": "There is a growing trend among young people to explore other cultures.",
        "trVi": "Ngày càng có xu hướng giới trẻ khám phá các nền văn hóa khác.",
        "trAnswer": "There is a growing trend among young people to explore other cultures.",
        "trKey": "trend"
      },
      {
        "en": "Tug of war",
        "ipa": "/tʌɡ əv wɔːr/",
        "vi": "Trò chơi kéo co",
        "img": "https://img.invalid/tug-of-war.jpg",
        "ex": "Villagers of all ages joined the tug of war competition during Tet.",
        "trVi": "Dân làng ở mọi lứa tuổi cùng tham gia cuộc thi kéo co trong dịp Tết.",
        "trAnswer": "Villagers of all ages joined the tug of war competition during Tet.",
        "trKey": "tug of war"
      }
    ],
    "story": {
      "title": "Cultural Diversity Day at Nam's school",
      "titleVi": "Ngày Đa dạng Văn hóa tại trường của Nam",
      "text": "Every year, Nam's school organises a Cultural Diversity Day to celebrate the identity of students from different backgrounds. Each class prepares a traditional costume, a speciality dish, and a short performance from a different country.<br><br>This year, Nam's class chose Viet Nam's own culture. They cooked tasty spring rolls, explained the origin of ao dai, and taught their classmates how to play tug of war and try bamboo dancing. Visitors from other classes were captivated by the colours and the sounds of traditional music.<br><br>By the end of the day, everyone agreed that the event helped them appreciate the diversity around them. In a world shaped by globalisation, Nam believes events like this help students keep up with new ideas without losing their own identity.",
      "textVi": "Hằng năm, trường của Nam tổ chức Ngày Đa dạng Văn hóa để tôn vinh bản sắc của học sinh đến từ nhiều nền tảng khác nhau. Mỗi lớp chuẩn bị một trang phục truyền thống, một món ăn đặc sản và một tiết mục biểu diễn ngắn từ một quốc gia khác nhau.<br><br>Năm nay, lớp của Nam chọn văn hóa Việt Nam. Các bạn nấu những chiếc nem rán ngon lành, giải thích về nguồn gốc của áo dài, và dạy các bạn cùng lớp chơi kéo co cũng như thử nhảy sạp. Khách tham quan từ các lớp khác bị cuốn hút bởi màu sắc và âm thanh của âm nhạc truyền thống.<br><br>Đến cuối ngày, mọi người đều đồng ý rằng sự kiện này đã giúp họ trân trọng hơn sự đa dạng xung quanh mình. Trong một thế giới bị định hình bởi toàn cầu hóa, Nam tin rằng những sự kiện như thế này giúp học sinh bắt kịp những ý tưởng mới mà không đánh mất bản sắc của chính mình.",
      "used": [
        "Identity",
        "Speciality",
        "Tasty",
        "Origin",
        "Tug of war",
        "Bamboo dancing",
        "Captivate",
        "Appreciate",
        "Globalisation",
        "Keep up with"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🌱",
    "title": "GREEN LIVING",
    "titleVi": "Lối sống xanh",
    "words": [
      {
        "en": "Carbon footprint",
        "ipa": "/ˈkɑːbən fʊtprɪnt/",
        "vi": "Tổng lượng phát thải khí nhà kính",
        "img": "https://img.invalid/carbon-footprint.jpg",
        "ex": "Riding a bike to school helps reduce your carbon footprint.",
        "trVi": "Đi xe đạp đến trường giúp giảm tổng lượng phát thải khí nhà kính của bạn.",
        "trAnswer": "Riding a bike to school helps reduce your carbon footprint.",
        "trKey": "carbon footprint"
      },
      {
        "en": "Cardboard",
        "ipa": "/ˈkɑːdbɔːd/",
        "vi": "Bìa cứng, làm bằng bìa cứng",
        "img": "https://img.invalid/cardboard.jpg",
        "ex": "We collect old cardboard boxes and take them to the recycling centre.",
        "trVi": "Chúng tôi thu gom các hộp bìa cứng cũ và mang đến trung tâm tái chế.",
        "trAnswer": "We collect old cardboard boxes and take them to the recycling centre.",
        "trKey": "cardboard"
      },
      {
        "en": "Clean up",
        "ipa": "/kliːn ʌp/",
        "vi": "Dọn dẹp",
        "img": "https://img.invalid/clean-up.jpg",
        "ex": "Volunteers cleaned up the beach and collected several bags of rubbish.",
        "trVi": "Các tình nguyện viên đã dọn dẹp bãi biển và thu gom được nhiều túi rác.",
        "trAnswer": "Volunteers cleaned up the beach and collected several bags of rubbish.",
        "trKey": "clean up"
      },
      {
        "en": "Compost",
        "ipa": "/ˈkɒmpɒst/",
        "vi": "Phân hữu cơ",
        "img": "https://img.invalid/compost.jpg",
        "ex": "We turn our fruit peel and vegetable scraps into compost for the garden.",
        "trVi": "Chúng tôi biến vỏ hoa quả và rau thừa thành phân hữu cơ cho khu vườn.",
        "trAnswer": "We turn our fruit peel and vegetable scraps into compost for the garden.",
        "trKey": "compost"
      },
      {
        "en": "Container",
        "ipa": "/kənˈteɪnə/",
        "vi": "Thùng, hộp, gói",
        "img": "https://img.invalid/container.jpg",
        "ex": "Bring a reusable container to the market instead of a plastic bag.",
        "trVi": "Hãy mang theo hộp có thể tái sử dụng đến chợ thay vì túi ni lông.",
        "trAnswer": "Bring a reusable container to the market instead of a plastic bag.",
        "trKey": "container"
      },
      {
        "en": "Contaminated",
        "ipa": "/kənˈtæmɪneɪtɪd/",
        "vi": "Nhiễm độc, nhiễm khuẩn",
        "img": "https://img.invalid/contaminated.jpg",
        "ex": "The river became contaminated after years of untreated waste being dumped into it.",
        "trVi": "Con sông bị nhiễm độc sau nhiều năm rác thải chưa qua xử lí bị đổ vào.",
        "trAnswer": "The river became contaminated after years of untreated waste being dumped into it.",
        "trKey": "contaminated"
      },
      {
        "en": "Decompose",
        "ipa": "/ˌdiːkəmˈpəʊz/",
        "vi": "Phân hủy",
        "img": "https://img.invalid/decompose.jpg",
        "ex": "Food scraps decompose quickly and turn into rich compost.",
        "trVi": "Rác thải thực phẩm phân hủy nhanh chóng và biến thành phân hữu cơ giàu dinh dưỡng.",
        "trAnswer": "Food scraps decompose quickly and turn into rich compost.",
        "trKey": "decompose"
      },
      {
        "en": "Eco-friendly",
        "ipa": "/ˌiːkəʊ ˈfrendli/",
        "vi": "Thân thiện với môi trường",
        "img": "https://img.invalid/eco-friendly.jpg",
        "ex": "More shops are now offering eco-friendly paper bags instead of plastic ones.",
        "trVi": "Ngày càng nhiều cửa hàng cung cấp túi giấy thân thiện với môi trường thay vì túi nhựa.",
        "trAnswer": "More shops are now offering eco-friendly paper bags instead of plastic ones.",
        "trKey": "eco-friendly"
      },
      {
        "en": "Fruit peel",
        "ipa": "/fruːt piːl/",
        "vi": "Vỏ hoa quả",
        "img": "https://img.invalid/fruit-peel.jpg",
        "ex": "Don't throw away fruit peel; put it in the compost bin instead.",
        "trVi": "Đừng vứt vỏ hoa quả đi; hãy bỏ vào thùng ủ phân thay vào đó.",
        "trAnswer": "Don't throw away fruit peel; put it in the compost bin instead.",
        "trKey": "fruit peel"
      },
      {
        "en": "Household waste",
        "ipa": "/ˈhaʊshəʊld weɪst/",
        "vi": "Rác thải sinh hoạt",
        "img": "https://img.invalid/household-waste.jpg",
        "ex": "Households should sort their household waste before throwing it away.",
        "trVi": "Các hộ gia đình nên phân loại rác thải sinh hoạt trước khi vứt bỏ.",
        "trAnswer": "Households should sort their household waste before throwing it away.",
        "trKey": "household waste"
      },
      {
        "en": "In the long run",
        "ipa": "/ɪn ðə lɒŋ rʌn/",
        "vi": "Về lâu dài",
        "img": "https://img.invalid/in-the-long-run.jpg",
        "ex": "Recycling may take more effort now, but it saves resources in the long run.",
        "trVi": "Tái chế có thể tốn công sức hơn bây giờ, nhưng về lâu dài nó tiết kiệm tài nguyên.",
        "trAnswer": "Recycling may take more effort now, but it saves resources in the long run.",
        "trKey": "in the long run"
      },
      {
        "en": "Landfill",
        "ipa": "/ˈlændfɪl/",
        "vi": "Bãi chôn rác",
        "img": "https://img.invalid/landfill.jpg",
        "ex": "Most of our plastic waste ends up in a landfill.",
        "trVi": "Hầu hết rác thải nhựa của chúng ta cuối cùng đều nằm ở bãi chôn rác.",
        "trAnswer": "Most of our plastic waste ends up in a landfill.",
        "trKey": "landfill"
      },
      {
        "en": "Layer",
        "ipa": "/ˈleɪə/",
        "vi": "Lớp",
        "img": "https://img.invalid/layer.jpg",
        "ex": "Add a layer of dry leaves on top of the compost pile.",
        "trVi": "Thêm một lớp lá khô lên trên đống ủ phân.",
        "trAnswer": "Add a layer of dry leaves on top of the compost pile.",
        "trKey": "layer"
      },
      {
        "en": "Leftover",
        "ipa": "/ˈleftəʊvə/",
        "vi": "Thức ăn thừa",
        "img": "https://img.invalid/leftover.jpg",
        "ex": "We store any leftover food in the fridge instead of throwing it away.",
        "trVi": "Chúng tôi bảo quản thức ăn thừa trong tủ lạnh thay vì vứt bỏ.",
        "trAnswer": "We store any leftover food in the fridge instead of throwing it away.",
        "trKey": "leftover"
      },
      {
        "en": "Packaging",
        "ipa": "/ˈpækɪdʒɪŋ/",
        "vi": "Bao bì",
        "img": "https://img.invalid/packaging.jpg",
        "ex": "Choosing products with less packaging can reduce a lot of waste.",
        "trVi": "Chọn sản phẩm với ít bao bì hơn có thể giảm rất nhiều rác thải.",
        "trAnswer": "Choosing products with less packaging can reduce a lot of waste.",
        "trKey": "packaging"
      },
      {
        "en": "Pile",
        "ipa": "/paɪl/",
        "vi": "Chồng, đống",
        "img": "https://img.invalid/pile.jpg",
        "ex": "She built a compost pile at the bottom of the garden.",
        "trVi": "Cô ấy dựng một đống ủ phân ở cuối khu vườn.",
        "trAnswer": "She built a compost pile at the bottom of the garden.",
        "trKey": "pile"
      },
      {
        "en": "Reusable",
        "ipa": "/riˈjuːzəbl/",
        "vi": "Có thể tái sử dụng",
        "img": "https://img.invalid/reusable.jpg",
        "ex": "Bringing a reusable water bottle to school reduces plastic waste.",
        "trVi": "Mang theo bình nước có thể tái sử dụng đến trường giúp giảm rác thải nhựa.",
        "trAnswer": "Bringing a reusable water bottle to school reduces plastic waste.",
        "trKey": "reusable"
      },
      {
        "en": "Reuse",
        "ipa": "/riˈjuːz/",
        "vi": "Tái sử dụng",
        "img": "https://img.invalid/reuse.jpg",
        "ex": "We reuse old jars to store rice and beans.",
        "trVi": "Chúng tôi tái sử dụng những chiếc lọ cũ để đựng gạo và đậu.",
        "trAnswer": "We reuse old jars to store rice and beans.",
        "trKey": "reuse"
      },
      {
        "en": "Rinse out",
        "ipa": "/rɪns aʊt/",
        "vi": "Xối nước, rửa sạch",
        "img": "https://img.invalid/rinse-out.jpg",
        "ex": "Rinse out plastic bottles before putting them in the recycling bin.",
        "trVi": "Rửa sạch chai nhựa trước khi bỏ vào thùng tái chế.",
        "trAnswer": "Rinse out plastic bottles before putting them in the recycling bin.",
        "trKey": "rinse out"
      },
      {
        "en": "Single-use",
        "ipa": "/ˌsɪŋɡl ˈjuːs/",
        "vi": "Dùng một lần",
        "img": "https://img.invalid/single-use.jpg",
        "ex": "Many countries are trying to reduce single-use plastic bags.",
        "trVi": "Nhiều quốc gia đang cố gắng giảm túi ni lông dùng một lần.",
        "trAnswer": "Many countries are trying to reduce single-use plastic bags.",
        "trKey": "single-use"
      },
      {
        "en": "Waste",
        "ipa": "/weɪst/",
        "vi": "Rác thải",
        "img": "https://img.invalid/waste.jpg",
        "ex": "The 3Rs Club encourages students to reduce, reuse, and recycle waste.",
        "trVi": "Câu lạc bộ 3Rs khuyến khích học sinh giảm thiểu, tái sử dụng và tái chế rác thải.",
        "trAnswer": "The 3Rs Club encourages students to reduce, reuse, and recycle waste.",
        "trKey": "waste"
      }
    ],
    "story": {
      "title": "Making our school greener",
      "titleVi": "Biến trường học của chúng em xanh hơn",
      "text": "Nam is a member of the 3Rs Club at his school, a group of students who want to reduce their carbon footprint and encourage green living among their classmates.<br><br>Firstly, the club placed containers around the school so students could sort their household waste properly. Fruit peel and leftover food go into a pile that will decompose into compost for the school garden, while cardboard and bottles are rinsed out and reused or recycled.<br><br>The club also asked students to avoid single-use plastic and choose eco-friendly packaging whenever possible. Nam believes that although small habits take effort now, they will make a big difference for the environment in the long run.",
      "textVi": "Nam là thành viên của Câu lạc bộ 3Rs tại trường, một nhóm học sinh muốn giảm lượng phát thải khí nhà kính và khuyến khích lối sống xanh trong các bạn cùng lớp.<br><br>Đầu tiên, câu lạc bộ đặt các thùng chứa quanh trường để học sinh có thể phân loại rác thải sinh hoạt đúng cách. Vỏ hoa quả và thức ăn thừa được đưa vào một đống sẽ phân hủy thành phân hữu cơ cho khu vườn của trường, trong khi bìa cứng và chai lọ được rửa sạch để tái sử dụng hoặc tái chế.<br><br>Câu lạc bộ cũng yêu cầu học sinh tránh dùng đồ nhựa dùng một lần và chọn bao bì thân thiện với môi trường bất cứ khi nào có thể. Nam tin rằng dù những thói quen nhỏ tốn công sức bây giờ, chúng sẽ tạo ra sự khác biệt lớn cho môi trường về lâu dài.",
      "used": [
        "Carbon footprint",
        "Container",
        "Household waste",
        "Fruit peel",
        "Leftover",
        "Pile",
        "Decompose",
        "Cardboard",
        "Rinse out",
        "Reuse",
        "Single-use",
        "Eco-friendly",
        "In the long run"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🏙️",
    "title": "URBANISATION",
    "titleVi": "Đô thị hóa",
    "words": [
      {
        "en": "Afford",
        "ipa": "/əˈfɔːd/",
        "vi": "Có đủ tiền, có khả năng chi trả",
        "img": "https://img.invalid/afford.jpg",
        "ex": "Many young families cannot afford to buy a flat in the city centre.",
        "trVi": "Nhiều gia đình trẻ không đủ khả năng mua căn hộ ở trung tâm thành phố.",
        "trAnswer": "Many young families cannot afford to buy a flat in the city centre.",
        "trKey": "afford"
      },
      {
        "en": "Colonial",
        "ipa": "/kəˈləʊniəl/",
        "vi": "Thuộc địa, thuộc thời thuộc địa",
        "img": "https://img.invalid/colonial.jpg",
        "ex": "The old quarter still has many buildings with colonial architecture.",
        "trVi": "Khu phố cổ vẫn còn nhiều tòa nhà mang kiến trúc thời thuộc địa.",
        "trAnswer": "The old quarter still has many buildings with colonial architecture.",
        "trKey": "colonial"
      },
      {
        "en": "Concern",
        "ipa": "/kənˈsɜːn/",
        "vi": "Sự lo lắng",
        "img": "https://img.invalid/concern.jpg",
        "ex": "Traffic congestion is a growing concern for city residents.",
        "trVi": "Tình trạng ùn tắc giao thông là mối lo ngày càng lớn đối với cư dân thành phố.",
        "trAnswer": "Traffic congestion is a growing concern for city residents.",
        "trKey": "concern"
      },
      {
        "en": "Decrease",
        "ipa": "/dɪˈkriːs/",
        "vi": "Giảm, hạ xuống",
        "img": "https://img.invalid/decrease.jpg",
        "ex": "The number of people living in rural areas continues to decrease.",
        "trVi": "Số người sống ở vùng nông thôn tiếp tục giảm.",
        "trAnswer": "The number of people living in rural areas continues to decrease.",
        "trKey": "decrease"
      },
      {
        "en": "Expand",
        "ipa": "/ɪkˈspænd/",
        "vi": "Mở rộng (về diện tích)",
        "img": "https://img.invalid/expand.jpg",
        "ex": "The city has expanded rapidly over the past two decades.",
        "trVi": "Thành phố đã mở rộng nhanh chóng trong hai thập kỉ qua.",
        "trAnswer": "The city has expanded rapidly over the past two decades.",
        "trKey": "expand"
      },
      {
        "en": "Gradually",
        "ipa": "/ˈɡrædʒuəli/",
        "vi": "Dần dần, từ từ",
        "img": "https://img.invalid/gradually.jpg",
        "ex": "Farmland on the edge of the city is gradually being replaced by housing.",
        "trVi": "Đất nông nghiệp ở rìa thành phố đang dần dần bị thay thế bằng nhà ở.",
        "trAnswer": "Farmland on the edge of the city is gradually being replaced by housing.",
        "trKey": "gradually"
      },
      {
        "en": "Housing",
        "ipa": "/ˈhaʊzɪŋ/",
        "vi": "Nhà ở",
        "img": "https://img.invalid/housing.jpg",
        "ex": "The government is building more affordable housing for low-income workers.",
        "trVi": "Chính phủ đang xây dựng thêm nhà ở giá rẻ cho người lao động thu nhập thấp.",
        "trAnswer": "The government is building more affordable housing for low-income workers.",
        "trKey": "housing"
      },
      {
        "en": "Leisure",
        "ipa": "/ˈleʒə/",
        "vi": "Sự giải trí, thư giãn",
        "img": "https://img.invalid/leisure.jpg",
        "ex": "New parks give city residents more space for leisure activities.",
        "trVi": "Các công viên mới mang lại cho cư dân thành phố nhiều không gian giải trí hơn.",
        "trAnswer": "New parks give city residents more space for leisure activities.",
        "trKey": "leisure"
      },
      {
        "en": "Proportion",
        "ipa": "/prəˈpɔːʃn/",
        "vi": "Tỉ lệ",
        "img": "https://img.invalid/proportion.jpg",
        "ex": "A large proportion of the population now lives in urban areas.",
        "trVi": "Một tỉ lệ lớn dân số hiện đang sống ở khu vực đô thị.",
        "trAnswer": "A large proportion of the population now lives in urban areas.",
        "trKey": "proportion"
      },
      {
        "en": "Rapidly",
        "ipa": "/ˈræpɪdli/",
        "vi": "Rất nhanh, với tốc độ cao",
        "img": "https://img.invalid/rapidly.jpg",
        "ex": "The city's population has grown rapidly since the new factories opened.",
        "trVi": "Dân số thành phố đã tăng rất nhanh kể từ khi các nhà máy mới mở.",
        "trAnswer": "The city's population has grown rapidly since the new factories opened.",
        "trKey": "rapidly"
      },
      {
        "en": "Reliable",
        "ipa": "/rɪˈlaɪəbl/",
        "vi": "Đáng tin cậy",
        "img": "https://img.invalid/reliable.jpg",
        "ex": "A reliable public transport system can reduce traffic in big cities.",
        "trVi": "Một hệ thống giao thông công cộng đáng tin cậy có thể giảm ùn tắc ở các thành phố lớn.",
        "trAnswer": "A reliable public transport system can reduce traffic in big cities.",
        "trKey": "reliable"
      },
      {
        "en": "Resident",
        "ipa": "/ˈrezɪdənt/",
        "vi": "Người dân",
        "img": "https://img.invalid/resident.jpg",
        "ex": "Local residents complained about the noise from the new construction site.",
        "trVi": "Người dân địa phương phàn nàn về tiếng ồn từ công trường xây dựng mới.",
        "trAnswer": "Local residents complained about the noise from the new construction site.",
        "trKey": "resident"
      },
      {
        "en": "Rush hour",
        "ipa": "/rʌʃ aʊə/",
        "vi": "Giờ cao điểm",
        "img": "https://img.invalid/rush-hour.jpg",
        "ex": "Roads in the city centre are always crowded during rush hour.",
        "trVi": "Các con đường ở trung tâm thành phố luôn đông đúc vào giờ cao điểm.",
        "trAnswer": "Roads in the city centre are always crowded during rush hour.",
        "trKey": "rush hour"
      },
      {
        "en": "Seek",
        "ipa": "/siːk/",
        "vi": "Tìm kiếm",
        "img": "https://img.invalid/seek.jpg",
        "ex": "Many people move to cities to seek better job opportunities.",
        "trVi": "Nhiều người chuyển đến thành phố để tìm kiếm cơ hội việc làm tốt hơn.",
        "trAnswer": "Many people move to cities to seek better job opportunities.",
        "trKey": "seek"
      },
      {
        "en": "Unemployment",
        "ipa": "/ˌʌnɪmˈplɔɪmənt/",
        "vi": "Tình trạng thất nghiệp",
        "img": "https://img.invalid/unemployment.jpg",
        "ex": "Unemployment can rise quickly if a city grows faster than its job market.",
        "trVi": "Tình trạng thất nghiệp có thể tăng nhanh nếu thành phố phát triển nhanh hơn thị trường việc làm.",
        "trAnswer": "Unemployment can rise quickly if a city grows faster than its job market.",
        "trKey": "unemployment"
      },
      {
        "en": "Urban",
        "ipa": "/ˈɜːbən/",
        "vi": "Thuộc về đô thị",
        "img": "https://img.invalid/urban.jpg",
        "ex": "Urban areas often have better schools and hospitals than rural ones.",
        "trVi": "Khu vực đô thị thường có trường học và bệnh viện tốt hơn khu vực nông thôn.",
        "trAnswer": "Urban areas often have better schools and hospitals than rural ones.",
        "trKey": "urban"
      }
    ],
    "story": {
      "title": "A city that grew too fast",
      "titleVi": "Một thành phố phát triển quá nhanh",
      "text": "Twenty years ago, Minh's hometown was a quiet rural area surrounded by rice fields. As factories opened nearby, the population grew rapidly, and the city gradually expanded into what used to be farmland.<br><br>Today, a large proportion of residents work in the city rather than in agriculture. New housing estates have replaced old colonial buildings, and rush hour traffic has become a real concern for people trying to get to work on time. Many families cannot afford a home in the centre and have to seek cheaper housing further away.<br><br>Local leaders are now trying to solve these problems by building a more reliable transport system and creating urban parks for leisure. Minh hopes that with better planning, his city can decrease traffic and unemployment while still growing.",
      "textVi": "Hai mươi năm trước, quê hương của Minh là một vùng nông thôn yên tĩnh bao quanh bởi những cánh đồng lúa. Khi các nhà máy mở gần đó, dân số tăng rất nhanh, và thành phố dần dần mở rộng vào những vùng từng là đất nông nghiệp.<br><br>Ngày nay, một tỉ lệ lớn cư dân làm việc trong thành phố thay vì làm nông nghiệp. Các khu nhà ở mới đã thay thế những tòa nhà kiểu thuộc địa cũ, và giao thông giờ cao điểm đã trở thành mối lo thực sự đối với những người cố gắng đi làm đúng giờ. Nhiều gia đình không đủ khả năng mua nhà ở trung tâm và phải tìm kiếm nhà ở rẻ hơn xa hơn.<br><br>Các lãnh đạo địa phương hiện đang cố gắng giải quyết những vấn đề này bằng cách xây dựng một hệ thống giao thông đáng tin cậy hơn và tạo ra các công viên đô thị để giải trí. Minh hi vọng rằng với quy hoạch tốt hơn, thành phố của anh có thể giảm ùn tắc giao thông và thất nghiệp trong khi vẫn tiếp tục phát triển.",
      "used": [
        "Rapidly",
        "Gradually",
        "Expand",
        "Proportion",
        "Housing",
        "Colonial",
        "Rush hour",
        "Concern",
        "Afford",
        "Seek",
        "Reliable",
        "Leisure",
        "Decrease",
        "Unemployment"
      ]
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "💼",
    "title": "THE WORLD OF WORK",
    "titleVi": "Thế giới công việc",
    "words": [
      {
        "en": "Application letter",
        "ipa": "/ˌæplɪˈkeɪʃn ˈletə/",
        "vi": "Thư xin việc",
        "img": "https://img.invalid/application-letter.jpg",
        "ex": "She wrote a careful application letter to apply for the summer job.",
        "trVi": "Cô ấy viết một lá thư xin việc cẩn thận để ứng tuyển công việc mùa hè.",
        "trAnswer": "She wrote a careful application letter to apply for the summer job.",
        "trKey": "application letter"
      },
      {
        "en": "Bonus",
        "ipa": "/ˈbəʊnəs/",
        "vi": "Tiền thưởng",
        "img": "https://img.invalid/bonus.jpg",
        "ex": "Staff who work extra shifts receive a small bonus at the end of the month.",
        "trVi": "Nhân viên làm thêm ca sẽ nhận được một khoản tiền thưởng nhỏ vào cuối tháng.",
        "trAnswer": "Staff who work extra shifts receive a small bonus at the end of the month.",
        "trKey": "bonus"
      },
      {
        "en": "Casual",
        "ipa": "/ˈkæʒuəl/",
        "vi": "Theo thời vụ, tạm thời",
        "img": "https://img.invalid/casual.jpg",
        "ex": "He took a casual job at a coffee shop during the summer holiday.",
        "trVi": "Anh ấy nhận một công việc thời vụ tại một quán cà phê trong kì nghỉ hè.",
        "trAnswer": "He took a casual job at a coffee shop during the summer holiday.",
        "trKey": "casual"
      },
      {
        "en": "Challenging",
        "ipa": "/ˈtʃælɪndʒɪŋ/",
        "vi": "Thách thức",
        "img": "https://img.invalid/challenging.jpg",
        "ex": "Being a doctor is challenging, but it is also very rewarding.",
        "trVi": "Làm bác sĩ là một công việc thách thức, nhưng cũng rất xứng đáng.",
        "trAnswer": "Being a doctor is challenging, but it is also very rewarding.",
        "trKey": "challenging"
      },
      {
        "en": "Flexible",
        "ipa": "/ˈfleksəbl/",
        "vi": "Linh hoạt",
        "img": "https://img.invalid/flexible.jpg",
        "ex": "Many students prefer part-time jobs with flexible working hours.",
        "trVi": "Nhiều học sinh thích các công việc bán thời gian với giờ làm việc linh hoạt.",
        "trAnswer": "Many students prefer part-time jobs with flexible working hours.",
        "trKey": "flexible"
      },
      {
        "en": "Footstep",
        "ipa": "/ˈfʊtstep/",
        "vi": "Bước chân; truyền thống gia đình",
        "img": "https://img.invalid/footstep.jpg",
        "ex": "She decided to follow in her mother's footsteps and become a teacher.",
        "trVi": "Cô ấy quyết định nối tiếp truyền thống của mẹ mình và trở thành giáo viên.",
        "trAnswer": "She decided to follow in her mother's footsteps and become a teacher.",
        "trKey": "footstep"
      },
      {
        "en": "Employ",
        "ipa": "/ɪmˈplɔɪ/",
        "vi": "Tuyển dụng",
        "img": "https://img.invalid/employ.jpg",
        "ex": "The restaurant employs several students as part-time waiters.",
        "trVi": "Nhà hàng tuyển dụng vài học sinh làm nhân viên phục vụ bán thời gian.",
        "trAnswer": "The restaurant employs several students as part-time waiters.",
        "trKey": "employ"
      },
      {
        "en": "Nine-to-five",
        "ipa": "/ˌnaɪn tə ˈfaɪv/",
        "vi": "Giờ hành chính",
        "img": "https://img.invalid/nine-to-five.jpg",
        "ex": "He gave up his nine-to-five job to start his own small business.",
        "trVi": "Anh ấy từ bỏ công việc giờ hành chính để bắt đầu công việc kinh doanh nhỏ của riêng mình.",
        "trAnswer": "He gave up his nine-to-five job to start his own small business.",
        "trKey": "nine-to-five"
      },
      {
        "en": "On-the-job",
        "ipa": "/ɒn ðə ˈdʒɒb/",
        "vi": "Trong công việc, khi đang làm việc",
        "img": "https://img.invalid/on-the-job.jpg",
        "ex": "New staff receive on-the-job training during their first month.",
        "trVi": "Nhân viên mới được đào tạo trong công việc trong tháng đầu tiên.",
        "trAnswer": "New staff receive on-the-job training during their first month.",
        "trKey": "on-the-job"
      },
      {
        "en": "Overtime",
        "ipa": "/ˈəʊvətaɪm/",
        "vi": "Ngoài giờ",
        "img": "https://img.invalid/overtime.jpg",
        "ex": "She often works overtime to finish an important project.",
        "trVi": "Cô ấy thường làm việc ngoài giờ để hoàn thành một dự án quan trọng.",
        "trAnswer": "She often works overtime to finish an important project.",
        "trKey": "overtime"
      },
      {
        "en": "Part-time",
        "ipa": "/ˌpɑːt ˈtaɪm/",
        "vi": "Bán thời gian",
        "img": "https://img.invalid/part-time.jpg",
        "ex": "Many students take a part-time job to earn some extra money.",
        "trVi": "Nhiều học sinh nhận một công việc bán thời gian để kiếm thêm tiền.",
        "trAnswer": "Many students take a part-time job to earn some extra money.",
        "trKey": "part-time"
      },
      {
        "en": "Repetitive",
        "ipa": "/rɪˈpetətɪv/",
        "vi": "Lặp đi lặp lại",
        "img": "https://img.invalid/repetitive.jpg",
        "ex": "Some factory jobs can be repetitive and tiring.",
        "trVi": "Một số công việc trong nhà máy có thể lặp đi lặp lại và mệt mỏi.",
        "trAnswer": "Some factory jobs can be repetitive and tiring.",
        "trKey": "repetitive"
      },
      {
        "en": "Rewarding",
        "ipa": "/rɪˈwɔːdɪŋ/",
        "vi": "Xứng đáng",
        "img": "https://img.invalid/rewarding.jpg",
        "ex": "Helping other people makes volunteer work very rewarding.",
        "trVi": "Giúp đỡ người khác khiến công việc tình nguyện trở nên rất xứng đáng.",
        "trAnswer": "Helping other people makes volunteer work very rewarding.",
        "trKey": "rewarding"
      },
      {
        "en": "Shift",
        "ipa": "/ʃɪft/",
        "vi": "Ca làm việc",
        "img": "https://img.invalid/shift.jpg",
        "ex": "He works the night shift at the hospital three times a week.",
        "trVi": "Anh ấy làm ca đêm ở bệnh viện ba lần một tuần.",
        "trAnswer": "He works the night shift at the hospital three times a week.",
        "trKey": "shift"
      },
      {
        "en": "Stressful",
        "ipa": "/ˈstresfl/",
        "vi": "Áp lực, căng thẳng",
        "img": "https://img.invalid/stressful.jpg",
        "ex": "Working two jobs at the same time can be very stressful.",
        "trVi": "Làm hai công việc cùng lúc có thể rất áp lực.",
        "trAnswer": "Working two jobs at the same time can be very stressful.",
        "trKey": "stressful"
      },
      {
        "en": "Unpaid",
        "ipa": "/ʌnˈpeɪd/",
        "vi": "Không được trả lương",
        "img": "https://img.invalid/unpaid.jpg",
        "ex": "She did unpaid work at the animal shelter every weekend.",
        "trVi": "Cô ấy làm công việc không lương tại trung tâm cứu hộ động vật vào mỗi cuối tuần.",
        "trAnswer": "She did unpaid work at the animal shelter every weekend.",
        "trKey": "unpaid"
      },
      {
        "en": "Wage",
        "ipa": "/weɪdʒ/",
        "vi": "Tiền công",
        "img": "https://img.invalid/wage.jpg",
        "ex": "The company decided to increase the wages of its part-time staff.",
        "trVi": "Công ty quyết định tăng tiền công cho nhân viên bán thời gian của mình.",
        "trAnswer": "The company decided to increase the wages of its part-time staff.",
        "trKey": "wage"
      },
      {
        "en": "Wait on tables",
        "ipa": "/weɪt ɒn ˈteɪblz/",
        "vi": "Phục vụ bàn ăn",
        "img": "https://img.invalid/wait-on-tables.jpg",
        "ex": "During the summer, he waited on tables at a small local restaurant.",
        "trVi": "Vào mùa hè, anh ấy đã phục vụ bàn ăn tại một nhà hàng nhỏ ở địa phương.",
        "trAnswer": "During the summer, he waited on tables at a small local restaurant.",
        "trKey": "wait on tables"
      },
      {
        "en": "Well-paid",
        "ipa": "/ˌwel ˈpeɪd/",
        "vi": "Được trả lương cao",
        "img": "https://img.invalid/well-paid.jpg",
        "ex": "Engineering is often considered a well-paid career.",
        "trVi": "Kĩ thuật thường được coi là một nghề được trả lương cao.",
        "trAnswer": "Engineering is often considered a well-paid career.",
        "trKey": "well-paid"
      },
      {
        "en": "Vacancy",
        "ipa": "/ˈveɪkənsi/",
        "vi": "Vị trí công việc còn trống",
        "img": "https://img.invalid/vacancy.jpg",
        "ex": "The shop has a vacancy for a part-time sales assistant.",
        "trVi": "Cửa hàng có một vị trí công việc còn trống cho nhân viên bán hàng bán thời gian.",
        "trAnswer": "The shop has a vacancy for a part-time sales assistant.",
        "trKey": "vacancy"
      }
    ],
    "story": {
      "title": "My first part-time job",
      "titleVi": "Công việc bán thời gian đầu tiên của em",
      "text": "Last summer, Lan saw a vacancy for a part-time waitress at a small café near her house. She wrote an application letter and was employed the following week.<br><br>At first, the job seemed simple, but waiting on tables during busy hours could be stressful and repetitive. However, the manager offered flexible shifts, and Lan sometimes worked overtime to earn a small bonus. It was not a well-paid job, but the wage was enough for her personal expenses.<br><br>By the end of the summer, Lan realised the experience was actually quite rewarding. She learned how to stay calm under pressure and manage her own money, and she now understands why so many students choose a casual, part-time job before starting a nine-to-five career.",
      "textVi": "Mùa hè năm ngoái, Lan thấy có một vị trí phục vụ bán thời gian còn trống tại một quán cà phê nhỏ gần nhà. Cô viết một lá thư xin việc và được tuyển dụng vào tuần sau đó.<br><br>Ban đầu, công việc có vẻ đơn giản, nhưng phục vụ bàn trong giờ đông khách có thể gây áp lực và lặp đi lặp lại. Tuy nhiên, người quản lí sắp xếp ca làm việc linh hoạt, và đôi khi Lan làm thêm giờ để kiếm một khoản tiền thưởng nhỏ. Đây không phải là công việc được trả lương cao, nhưng tiền công đủ để trang trải chi tiêu cá nhân của cô.<br><br>Đến cuối mùa hè, Lan nhận ra trải nghiệm này thực ra khá xứng đáng. Cô học được cách giữ bình tĩnh dưới áp lực và quản lí tiền của chính mình, và giờ cô hiểu vì sao nhiều học sinh chọn một công việc bán thời gian, thời vụ trước khi bắt đầu sự nghiệp giờ hành chính.",
      "used": [
        "Vacancy",
        "Application letter",
        "Employ",
        "Wait on tables",
        "Stressful",
        "Repetitive",
        "Flexible",
        "Overtime",
        "Bonus",
        "Well-paid",
        "Wage",
        "Rewarding",
        "Casual",
        "Part-time",
        "Nine-to-five"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🤖",
    "title": "ARTIFICIAL INTELLIGENCE",
    "titleVi": "Trí tuệ nhân tạo",
    "words": [
      {
        "en": "Activate",
        "ipa": "/ˈæktɪveɪt/",
        "vi": "Kích hoạt, khởi động",
        "img": "https://img.invalid/activate.jpg",
        "ex": "You can activate the robot simply by saying its name.",
        "trVi": "Bạn có thể kích hoạt robot chỉ bằng cách gọi tên nó.",
        "trAnswer": "You can activate the robot simply by saying its name.",
        "trKey": "activate"
      },
      {
        "en": "Advanced",
        "ipa": "/ədˈvɑːnst/",
        "vi": "Tiên tiến, trình độ cao",
        "img": "https://img.invalid/advanced.jpg",
        "ex": "The hospital uses advanced AI systems to help doctors diagnose diseases.",
        "trVi": "Bệnh viện sử dụng các hệ thống AI tiên tiến để giúp bác sĩ chẩn đoán bệnh.",
        "trAnswer": "The hospital uses advanced AI systems to help doctors diagnose diseases.",
        "trKey": "advanced"
      },
      {
        "en": "Analyse",
        "ipa": "/ˈænəlaɪz/",
        "vi": "Phân tích",
        "img": "https://img.invalid/analyse.jpg",
        "ex": "The programme can analyse thousands of images in just a few seconds.",
        "trVi": "Chương trình có thể phân tích hàng nghìn bức ảnh chỉ trong vài giây.",
        "trAnswer": "The programme can analyse thousands of images in just a few seconds.",
        "trKey": "analyse"
      },
      {
        "en": "Application",
        "ipa": "/ˌæplɪˈkeɪʃn/",
        "vi": "Sự ứng dụng, sự áp dụng",
        "img": "https://img.invalid/application.jpg",
        "ex": "There are many applications of AI in education, from grading to tutoring.",
        "trVi": "Có nhiều ứng dụng của AI trong giáo dục, từ chấm điểm đến gia sư.",
        "trAnswer": "There are many applications of AI in education, from grading to tutoring.",
        "trKey": "application"
      },
      {
        "en": "Artificial intelligence",
        "ipa": "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/",
        "vi": "Trí thông minh nhân tạo",
        "img": "https://img.invalid/artificial-intelligence.jpg",
        "ex": "Artificial intelligence is changing the way students learn English.",
        "trVi": "Trí thông minh nhân tạo đang thay đổi cách học sinh học tiếng Anh.",
        "trAnswer": "Artificial intelligence is changing the way students learn English.",
        "trKey": "artificial intelligence"
      },
      {
        "en": "Capable",
        "ipa": "/ˈkeɪpəbl/",
        "vi": "Có khả năng",
        "img": "https://img.invalid/capable.jpg",
        "ex": "This robot is capable of understanding simple voice commands.",
        "trVi": "Robot này có khả năng hiểu các lệnh giọng nói đơn giản.",
        "trAnswer": "This robot is capable of understanding simple voice commands.",
        "trKey": "capable"
      },
      {
        "en": "Chatbot",
        "ipa": "/ˈtʃætbɒt/",
        "vi": "Hộp trò chuyện",
        "img": "https://img.invalid/chatbot.jpg",
        "ex": "The website uses a chatbot to answer customers' questions instantly.",
        "trVi": "Trang web sử dụng một hộp trò chuyện để trả lời câu hỏi của khách hàng ngay lập tức.",
        "trAnswer": "The website uses a chatbot to answer customers' questions instantly.",
        "trKey": "chatbot"
      },
      {
        "en": "Data",
        "ipa": "/ˈdeɪtə/",
        "vi": "Dữ liệu",
        "img": "https://img.invalid/data.jpg",
        "ex": "AI systems need a huge amount of data to learn from.",
        "trVi": "Các hệ thống AI cần một lượng dữ liệu khổng lồ để học hỏi.",
        "trAnswer": "AI systems need a huge amount of data to learn from.",
        "trKey": "data"
      },
      {
        "en": "Digital",
        "ipa": "/ˈdɪdʒɪtl/",
        "vi": "Thuộc kĩ thuật số",
        "img": "https://img.invalid/digital.jpg",
        "ex": "Schools are introducing more digital tools to support learning.",
        "trVi": "Các trường học đang giới thiệu nhiều công cụ kĩ thuật số hơn để hỗ trợ việc học.",
        "trAnswer": "Schools are introducing more digital tools to support learning.",
        "trKey": "digital"
      },
      {
        "en": "Evolution",
        "ipa": "/ˌiːvəˈluːʃn/",
        "vi": "Sự tiến hóa, sự phát triển",
        "img": "https://img.invalid/evolution.jpg",
        "ex": "The evolution of AI over the past decade has been remarkable.",
        "trVi": "Sự phát triển của AI trong thập kỉ qua thực sự đáng chú ý.",
        "trAnswer": "The evolution of AI over the past decade has been remarkable.",
        "trKey": "evolution"
      },
      {
        "en": "Facial recognition",
        "ipa": "/ˈfeɪʃl ˌrekəɡˈnɪʃn/",
        "vi": "Khả năng nhận diện khuôn mặt",
        "img": "https://img.invalid/facial-recognition.jpg",
        "ex": "The phone uses facial recognition to unlock the screen.",
        "trVi": "Điện thoại sử dụng khả năng nhận diện khuôn mặt để mở khóa màn hình.",
        "trAnswer": "The phone uses facial recognition to unlock the screen.",
        "trKey": "facial recognition"
      },
      {
        "en": "Function",
        "ipa": "/ˈfʌŋkʃn/",
        "vi": "Chức năng, nhiệm vụ",
        "img": "https://img.invalid/function.jpg",
        "ex": "One useful function of this app is translating text instantly.",
        "trVi": "Một chức năng hữu ích của ứng dụng này là dịch văn bản ngay lập tức.",
        "trAnswer": "One useful function of this app is translating text instantly.",
        "trKey": "function"
      },
      {
        "en": "Hands-on",
        "ipa": "/ˌhændz ˈɒn/",
        "vi": "Thực tiễn, trực tiếp",
        "img": "https://img.invalid/hands-on.jpg",
        "ex": "Students got hands-on experience programming a small robot.",
        "trVi": "Học sinh đã có trải nghiệm thực tiễn khi lập trình một robot nhỏ.",
        "trAnswer": "Students got hands-on experience programming a small robot.",
        "trKey": "hands-on"
      },
      {
        "en": "Human-like",
        "ipa": "/ˈhjuːmən laɪk/",
        "vi": "Giống con người",
        "img": "https://img.invalid/human-like.jpg",
        "ex": "Some modern robots can move and speak in a human-like way.",
        "trVi": "Một số robot hiện đại có thể di chuyển và nói chuyện theo cách giống con người.",
        "trAnswer": "Some modern robots can move and speak in a human-like way.",
        "trKey": "human-like"
      },
      {
        "en": "Interact",
        "ipa": "/ˌɪntərˈækt/",
        "vi": "Tương tác",
        "img": "https://img.invalid/interact.jpg",
        "ex": "Children enjoy interacting with the friendly classroom robot.",
        "trVi": "Trẻ em thích tương tác với chú robot thân thiện trong lớp học.",
        "trAnswer": "Children enjoy interacting with the friendly classroom robot.",
        "trKey": "interact"
      },
      {
        "en": "Personalised",
        "ipa": "/ˈpɜːsənəlaɪzd/",
        "vi": "Được cá nhân hóa",
        "img": "https://img.invalid/personalised.jpg",
        "ex": "The app offers a personalised study plan for each student.",
        "trVi": "Ứng dụng cung cấp một kế hoạch học tập được cá nhân hóa cho mỗi học sinh.",
        "trAnswer": "The app offers a personalised study plan for each student.",
        "trKey": "personalised"
      },
      {
        "en": "Platform",
        "ipa": "/ˈplætfɔːm/",
        "vi": "Nền tảng (công nghệ)",
        "img": "https://img.invalid/platform.jpg",
        "ex": "The school uses an online learning platform powered by AI.",
        "trVi": "Trường học sử dụng một nền tảng học trực tuyến được vận hành bởi AI.",
        "trAnswer": "The school uses an online learning platform powered by AI.",
        "trKey": "platform"
      },
      {
        "en": "Portfolio",
        "ipa": "/pɔːtˈfəʊliəʊ/",
        "vi": "Hồ sơ",
        "img": "https://img.invalid/portfolio.jpg",
        "ex": "The AI tool helps students build an online portfolio of their work.",
        "trVi": "Công cụ AI giúp học sinh xây dựng hồ sơ trực tuyến về bài làm của mình.",
        "trAnswer": "The AI tool helps students build an online portfolio of their work.",
        "trKey": "portfolio"
      },
      {
        "en": "Programme",
        "ipa": "/ˈprəʊɡræm/",
        "vi": "Lập trình",
        "img": "https://img.invalid/programme.jpg",
        "ex": "He learned to programme a simple robot during his summer course.",
        "trVi": "Anh ấy đã học cách lập trình một robot đơn giản trong khóa học hè của mình.",
        "trAnswer": "He learned to programme a simple robot during his summer course.",
        "trKey": "programme"
      },
      {
        "en": "Robotic",
        "ipa": "/rəʊˈbɒtɪk/",
        "vi": "Thuộc rô bốt",
        "img": "https://img.invalid/robotic.jpg",
        "ex": "The factory now uses robotic arms to assemble the products.",
        "trVi": "Nhà máy hiện sử dụng cánh tay robot để lắp ráp sản phẩm.",
        "trAnswer": "The factory now uses robotic arms to assemble the products.",
        "trKey": "robotic"
      },
      {
        "en": "Upgrade",
        "ipa": "/ʌpˈɡreɪd/",
        "vi": "Nâng cấp",
        "img": "https://img.invalid/upgrade.jpg",
        "ex": "The company plans to upgrade its AI software next year.",
        "trVi": "Công ty dự định nâng cấp phần mềm AI của mình vào năm sau.",
        "trAnswer": "The company plans to upgrade its AI software next year.",
        "trKey": "upgrade"
      },
      {
        "en": "Virtual reality",
        "ipa": "/ˌvɜːtʃuəl riˈæləti/",
        "vi": "Thực tế ảo",
        "img": "https://img.invalid/virtual-reality.jpg",
        "ex": "Students used virtual reality to explore the human body in biology class.",
        "trVi": "Học sinh đã sử dụng thực tế ảo để khám phá cơ thể con người trong giờ sinh học.",
        "trAnswer": "Students used virtual reality to explore the human body in biology class.",
        "trKey": "virtual reality"
      },
      {
        "en": "Voice command",
        "ipa": "/vɔɪs kəˈmɑːnd/",
        "vi": "Ra lệnh bằng giọng nói",
        "img": "https://img.invalid/voice-command.jpg",
        "ex": "You can turn on the lights at home using a simple voice command.",
        "trVi": "Bạn có thể bật đèn trong nhà bằng một câu lệnh giọng nói đơn giản.",
        "trAnswer": "You can turn on the lights at home using a simple voice command.",
        "trKey": "voice command"
      }
    ],
    "story": {
      "title": "AI applications in education",
      "titleVi": "Ứng dụng của AI trong giáo dục",
      "text": "Artificial intelligence is no longer just a topic in science fiction; it is quietly changing classrooms today. Many schools now use a learning platform that can analyse a student's answers and create a personalised study plan for them.<br><br>Some classrooms also use chatbots capable of answering simple questions any time of day, and voice command tools that help students practise pronunciation. In technology classes, students get hands-on experience trying to programme a small robot, learning first-hand how these advanced systems work.<br><br>Of course, AI still cannot fully interact with students the way a real teacher can, and it depends heavily on the data it is given. Even so, most teachers agree that as this technology continues its rapid evolution, it will only become more useful in classrooms in the future.",
      "textVi": "Trí tuệ nhân tạo không còn chỉ là chủ đề trong khoa học viễn tưởng; nó đang âm thầm thay đổi các lớp học ngày nay. Nhiều trường học hiện sử dụng một nền tảng học tập có thể phân tích câu trả lời của học sinh và tạo ra một kế hoạch học tập được cá nhân hóa cho các em.<br><br>Một số lớp học cũng sử dụng hộp trò chuyện có khả năng trả lời các câu hỏi đơn giản bất cứ lúc nào trong ngày, và các công cụ ra lệnh bằng giọng nói giúp học sinh luyện phát âm. Trong giờ công nghệ, học sinh có trải nghiệm thực tiễn khi thử lập trình một robot nhỏ, tự mình tìm hiểu cách các hệ thống tiên tiến này hoạt động.<br><br>Tất nhiên, AI vẫn chưa thể tương tác hoàn toàn với học sinh theo cách một giáo viên thật có thể làm, và nó phụ thuộc rất nhiều vào dữ liệu được cung cấp. Dù vậy, hầu hết giáo viên đều đồng ý rằng khi công nghệ này tiếp tục phát triển nhanh chóng, nó sẽ ngày càng hữu ích hơn trong lớp học ở tương lai.",
      "used": [
        "Platform",
        "Analyse",
        "Personalised",
        "Chatbot",
        "Capable",
        "Voice command",
        "Hands-on",
        "Programme",
        "Interact",
        "Data",
        "Evolution",
        "Advanced"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "📰",
    "title": "THE WORLD OF MASS MEDIA",
    "titleVi": "Thế giới truyền thông đại chúng",
    "words": [
      {
        "en": "Accessible",
        "ipa": "/əkˈsesəbl/",
        "vi": "Có thể tiếp cận được",
        "img": "https://img.invalid/accessible.jpg",
        "ex": "Online news is accessible to almost everyone with a smartphone.",
        "trVi": "Tin tức trực tuyến có thể tiếp cận được với hầu hết mọi người có điện thoại thông minh.",
        "trAnswer": "Online news is accessible to almost everyone with a smartphone.",
        "trKey": "accessible"
      },
      {
        "en": "Account for",
        "ipa": "/əˈkaʊnt fɔː/",
        "vi": "Chiếm (tỉ lệ)",
        "img": "https://img.invalid/account-for.jpg",
        "ex": "Social media now accounts for a large share of how people get news.",
        "trVi": "Mạng xã hội hiện chiếm một phần lớn trong cách mọi người tiếp nhận tin tức.",
        "trAnswer": "Social media now accounts for a large share of how people get news.",
        "trKey": "account for"
      },
      {
        "en": "Advert",
        "ipa": "/ˈædvɜːt/",
        "vi": "Quảng cáo",
        "img": "https://img.invalid/advert.jpg",
        "ex": "The company placed an advert on several popular websites.",
        "trVi": "Công ty đã đăng một quảng cáo trên vài trang web phổ biến.",
        "trAnswer": "The company placed an advert on several popular websites.",
        "trKey": "advert"
      },
      {
        "en": "As opposed to",
        "ipa": "/əz əˈpəʊzd tuː/",
        "vi": "Khác với, đối lập với",
        "img": "https://img.invalid/as-opposed-to.jpg",
        "ex": "Many young people now read news online, as opposed to buying a newspaper.",
        "trVi": "Nhiều bạn trẻ hiện đọc tin tức trực tuyến, khác với việc mua báo giấy.",
        "trAnswer": "Many young people now read news online, as opposed to buying a newspaper.",
        "trKey": "as opposed to"
      },
      {
        "en": "Audio",
        "ipa": "/ˈɔːdiəʊ/",
        "vi": "Bằng/có âm thanh",
        "img": "https://img.invalid/audio.jpg",
        "ex": "The radio station also shares its programmes as audio files online.",
        "trVi": "Đài phát thanh cũng chia sẻ các chương trình của mình dưới dạng tệp âm thanh trực tuyến.",
        "trAnswer": "The radio station also shares its programmes as audio files online.",
        "trKey": "audio"
      },
      {
        "en": "Bias",
        "ipa": "/ˈbaɪəs/",
        "vi": "Thiên kiến, thiên vị",
        "img": "https://img.invalid/bias.jpg",
        "ex": "A good journalist tries to report the news without bias.",
        "trVi": "Một nhà báo giỏi cố gắng đưa tin mà không có thiên kiến.",
        "trAnswer": "A good journalist tries to report the news without bias.",
        "trKey": "bias"
      },
      {
        "en": "Broadcast",
        "ipa": "/ˈbrɔːdkɑːst/",
        "vi": "Chương trình phát sóng, phát sóng",
        "img": "https://img.invalid/broadcast.jpg",
        "ex": "The national news is broadcast every evening at seven o'clock.",
        "trVi": "Bản tin quốc gia được phát sóng mỗi tối lúc bảy giờ.",
        "trAnswer": "The national news is broadcast every evening at seven o'clock.",
        "trKey": "broadcast"
      },
      {
        "en": "By contrast",
        "ipa": "/baɪ ˈkɒntrɑːst/",
        "vi": "Ngược lại",
        "img": "https://img.invalid/by-contrast.jpg",
        "ex": "Traditional media checks facts carefully; by contrast, social media often spreads news quickly without checking.",
        "trVi": "Truyền thông truyền thống kiểm tra thông tin cẩn thận; ngược lại, mạng xã hội thường lan truyền tin nhanh mà không kiểm chứng.",
        "trAnswer": "Traditional media checks facts carefully; by contrast, social media often spreads news quickly without checking.",
        "trKey": "by contrast"
      },
      {
        "en": "Credible",
        "ipa": "/ˈkredəbl/",
        "vi": "Đáng tin cậy",
        "img": "https://img.invalid/credible.jpg",
        "ex": "It is important to get information from a credible source.",
        "trVi": "Điều quan trọng là lấy thông tin từ một nguồn đáng tin cậy.",
        "trAnswer": "It is important to get information from a credible source.",
        "trKey": "credible"
      },
      {
        "en": "Digital billboard",
        "ipa": "/ˈdɪdʒɪtl ˈbɪlbɔːd/",
        "vi": "Bằng quảng cáo kĩ thuật số",
        "img": "https://img.invalid/digital-billboard.jpg",
        "ex": "The company advertised its new product on a digital billboard downtown.",
        "trVi": "Công ty đã quảng cáo sản phẩm mới của mình trên bảng quảng cáo kĩ thuật số ở trung tâm thành phố.",
        "trAnswer": "The company advertised its new product on a digital billboard downtown.",
        "trKey": "digital billboard"
      },
      {
        "en": "Discount",
        "ipa": "/ˈdɪskaʊnt/",
        "vi": "Sự hạ giá",
        "img": "https://img.invalid/discount.jpg",
        "ex": "The shop announced a big discount on social media to attract customers.",
        "trVi": "Cửa hàng thông báo giảm giá lớn trên mạng xã hội để thu hút khách hàng.",
        "trAnswer": "The shop announced a big discount on social media to attract customers.",
        "trKey": "discount"
      },
      {
        "en": "Distribute",
        "ipa": "/dɪˈstrɪbjuːt/",
        "vi": "Phân phát, phân phối",
        "img": "https://img.invalid/distribute.jpg",
        "ex": "The magazine is distributed to schools all over the country.",
        "trVi": "Tạp chí được phân phối đến các trường học trên khắp cả nước.",
        "trAnswer": "The magazine is distributed to schools all over the country.",
        "trKey": "distribute"
      },
      {
        "en": "Fact-check",
        "ipa": "/ˈfækt tʃek/",
        "vi": "Kiểm chứng thông tin",
        "img": "https://img.invalid/fact-check.jpg",
        "ex": "Before sharing a story, you should always fact-check it first.",
        "trVi": "Trước khi chia sẻ một câu chuyện, bạn nên luôn kiểm chứng thông tin trước.",
        "trAnswer": "Before sharing a story, you should always fact-check it first.",
        "trKey": "fact-check"
      },
      {
        "en": "Fake news",
        "ipa": "/ˌfeɪk ˈnjuːz/",
        "vi": "Tin giả, tin bịa đặt",
        "img": "https://img.invalid/fake-news.jpg",
        "ex": "Fake news can spread on social media faster than real news.",
        "trVi": "Tin giả có thể lan truyền trên mạng xã hội nhanh hơn tin thật.",
        "trAnswer": "Fake news can spread on social media faster than real news.",
        "trKey": "fake news"
      },
      {
        "en": "Instant",
        "ipa": "/ˈɪnstənt/",
        "vi": "Nhanh chóng, ngay lập tức",
        "img": "https://img.invalid/instant.jpg",
        "ex": "Social media gives people instant access to breaking news.",
        "trVi": "Mạng xã hội mang lại cho mọi người khả năng tiếp cận tin nóng ngay lập tức.",
        "trAnswer": "Social media gives people instant access to breaking news.",
        "trKey": "instant"
      },
      {
        "en": "Interactive",
        "ipa": "/ˌɪntərˈæktɪv/",
        "vi": "Có thể tương tác được",
        "img": "https://img.invalid/interactive.jpg",
        "ex": "The news website has an interactive map showing weather across the country.",
        "trVi": "Trang web tin tức có một bản đồ tương tác cho thấy thời tiết trên khắp cả nước.",
        "trAnswer": "The news website has an interactive map showing weather across the country.",
        "trKey": "interactive"
      },
      {
        "en": "Loudspeaker",
        "ipa": "/ˌlaʊdˈspiːkə/",
        "vi": "Loa phát thanh",
        "img": "https://img.invalid/loudspeaker.jpg",
        "ex": "The village used a loudspeaker to announce important news to residents.",
        "trVi": "Ngôi làng sử dụng loa phát thanh để thông báo tin tức quan trọng cho cư dân.",
        "trAnswer": "The village used a loudspeaker to announce important news to residents.",
        "trKey": "loudspeaker"
      },
      {
        "en": "Mass media",
        "ipa": "/ˌmæs ˈmiːdiə/",
        "vi": "Phương tiện truyền thông đại chúng",
        "img": "https://img.invalid/mass-media.jpg",
        "ex": "Mass media plays an important role in shaping public opinion.",
        "trVi": "Phương tiện truyền thông đại chúng đóng vai trò quan trọng trong việc định hình dư luận.",
        "trAnswer": "Mass media plays an important role in shaping public opinion.",
        "trKey": "mass media"
      },
      {
        "en": "Meanwhile",
        "ipa": "/ˈmiːnwaɪl/",
        "vi": "Trong khi đó",
        "img": "https://img.invalid/meanwhile.jpg",
        "ex": "Traditional newspapers are losing readers; meanwhile, online news is growing fast.",
        "trVi": "Báo giấy truyền thống đang mất độc giả; trong khi đó, tin tức trực tuyến đang phát triển nhanh chóng.",
        "trAnswer": "Traditional newspapers are losing readers; meanwhile, online news is growing fast.",
        "trKey": "meanwhile"
      },
      {
        "en": "Place",
        "ipa": "/pleɪs/",
        "vi": "Đặt, rao, đăng (tin, quảng cáo)",
        "img": "https://img.invalid/place.jpg",
        "ex": "The company placed an advert in the local newspaper.",
        "trVi": "Công ty đã đăng một quảng cáo trên tờ báo địa phương.",
        "trAnswer": "The company placed an advert in the local newspaper.",
        "trKey": "place"
      },
      {
        "en": "Presence",
        "ipa": "/ˈprezns/",
        "vi": "Sức thu hút, sức ảnh hưởng",
        "img": "https://img.invalid/presence.jpg",
        "ex": "Having a strong presence on social media helps a business reach more customers.",
        "trVi": "Có sức ảnh hưởng mạnh trên mạng xã hội giúp doanh nghiệp tiếp cận nhiều khách hàng hơn.",
        "trAnswer": "Having a strong presence on social media helps a business reach more customers.",
        "trKey": "presence"
      },
      {
        "en": "Profit-making",
        "ipa": "/ˈprɒfɪt ˌmeɪkɪŋ/",
        "vi": "Tạo lợi nhuận",
        "img": "https://img.invalid/profit-making.jpg",
        "ex": "Some online news sites are more focused on profit-making than on accuracy.",
        "trVi": "Một số trang tin trực tuyến chú trọng tạo lợi nhuận hơn là tính chính xác.",
        "trAnswer": "Some online news sites are more focused on profit-making than on accuracy.",
        "trKey": "profit-making"
      },
      {
        "en": "Publicity",
        "ipa": "/pʌbˈlɪsəti/",
        "vi": "Sự quan tâm, chú ý của công chúng",
        "img": "https://img.invalid/publicity.jpg",
        "ex": "The event received a lot of publicity on television and social media.",
        "trVi": "Sự kiện nhận được rất nhiều sự chú ý của công chúng trên truyền hình và mạng xã hội.",
        "trAnswer": "The event received a lot of publicity on television and social media.",
        "trKey": "publicity"
      },
      {
        "en": "Reliable",
        "ipa": "/rɪˈlaɪəbl/",
        "vi": "Đáng tin cậy",
        "img": "https://img.invalid/reliable.jpg",
        "ex": "It is important to check whether a website is a reliable source of news.",
        "trVi": "Điều quan trọng là kiểm tra xem một trang web có phải là nguồn tin đáng tin cậy hay không.",
        "trAnswer": "It is important to check whether a website is a reliable source of news.",
        "trKey": "reliable"
      },
      {
        "en": "Source",
        "ipa": "/sɔːs/",
        "vi": "Nguồn tin",
        "img": "https://img.invalid/source.jpg",
        "ex": "Always check your source before believing a piece of news.",
        "trVi": "Luôn kiểm tra nguồn tin trước khi tin vào một tin tức nào đó.",
        "trAnswer": "Always check your source before believing a piece of news.",
        "trKey": "source"
      },
      {
        "en": "Spread",
        "ipa": "/spred/",
        "vi": "Lan truyền",
        "img": "https://img.invalid/spread.jpg",
        "ex": "News about the discovery spread quickly across social media.",
        "trVi": "Tin tức về phát hiện này lan truyền nhanh chóng trên mạng xã hội.",
        "trAnswer": "News about the discovery spread quickly across social media.",
        "trKey": "spread"
      },
      {
        "en": "The press",
        "ipa": "/ðə pres/",
        "vi": "Báo chí",
        "img": "https://img.invalid/the-press.jpg",
        "ex": "The press plays an important role in keeping the public informed.",
        "trVi": "Báo chí đóng vai trò quan trọng trong việc giúp công chúng nắm bắt thông tin.",
        "trAnswer": "The press plays an important role in keeping the public informed.",
        "trKey": "the press"
      },
      {
        "en": "Update",
        "ipa": "/ʌpˈdeɪt/",
        "vi": "Cập nhật",
        "img": "https://img.invalid/update.jpg",
        "ex": "The app updates its news feed every few minutes.",
        "trVi": "Ứng dụng cập nhật bảng tin của mình sau mỗi vài phút.",
        "trAnswer": "The app updates its news feed every few minutes.",
        "trKey": "update"
      },
      {
        "en": "Viewer",
        "ipa": "/ˈvjuːə/",
        "vi": "Người xem",
        "img": "https://img.invalid/viewer.jpg",
        "ex": "Millions of viewers watched the live broadcast of the football match.",
        "trVi": "Hàng triệu người xem đã theo dõi buổi phát sóng trực tiếp trận đấu bóng đá.",
        "trAnswer": "Millions of viewers watched the live broadcast of the football match.",
        "trKey": "viewer"
      },
      {
        "en": "Visual",
        "ipa": "/ˈvɪʒuəl/",
        "vi": "Bằng/có hình ảnh",
        "img": "https://img.invalid/visual.jpg",
        "ex": "The report used visual charts to make the data easier to understand.",
        "trVi": "Bản báo cáo sử dụng biểu đồ hình ảnh để giúp dữ liệu dễ hiểu hơn.",
        "trAnswer": "The report used visual charts to make the data easier to understand.",
        "trKey": "visual"
      }
    ],
    "story": {
      "title": "Traditional media versus digital media",
      "titleVi": "Truyền thông truyền thống và truyền thông kĩ thuật số",
      "text": "In the past, most people got their news from the press, the radio, or television broadcasts. Today, digital media such as websites and social media apps have become just as important, if not more so.<br><br>Digital media offers instant, interactive content that is accessible almost anywhere, and news can spread across the world within minutes. By contrast, traditional media usually takes longer to produce a story, but it often relies on more credible and reliable sources, since journalists are trained to fact-check information carefully.<br><br>The biggest danger of digital media is fake news, which can be shared before anyone checks whether it is true. Meanwhile, some profit-making websites care more about publicity and adverts than accuracy. For this reason, many teachers now encourage students to always check the source of any news they read.",
      "textVi": "Trước đây, hầu hết mọi người tiếp nhận tin tức từ báo chí, đài phát thanh hoặc các chương trình truyền hình. Ngày nay, truyền thông kĩ thuật số như trang web và ứng dụng mạng xã hội đã trở nên quan trọng không kém, thậm chí còn hơn.<br><br>Truyền thông kĩ thuật số mang lại nội dung nhanh chóng, có thể tương tác và có thể tiếp cận được ở hầu như mọi nơi, và tin tức có thể lan truyền khắp thế giới chỉ trong vài phút. Ngược lại, truyền thông truyền thống thường mất nhiều thời gian hơn để tạo ra một bài viết, nhưng nó thường dựa vào các nguồn tin đáng tin cậy hơn, vì các nhà báo được đào tạo để kiểm chứng thông tin cẩn thận.<br><br>Nguy cơ lớn nhất của truyền thông kĩ thuật số là tin giả, thứ có thể được chia sẻ trước khi ai đó kiểm tra xem nó có đúng hay không. Trong khi đó, một số trang web chỉ chú trọng tạo lợi nhuận lại quan tâm đến sự chú ý của công chúng và quảng cáo hơn là tính chính xác. Vì lí do này, nhiều giáo viên hiện khuyến khích học sinh luôn kiểm tra nguồn tin của bất kì tin tức nào các em đọc được.",
      "used": [
        "The press",
        "Broadcast",
        "Instant",
        "Interactive",
        "Accessible",
        "Spread",
        "By contrast",
        "Credible",
        "Reliable",
        "Fact-check",
        "Fake news",
        "Meanwhile",
        "Profit-making",
        "Publicity",
        "Source"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🐾",
    "title": "WILDLIFE CONSERVATION",
    "titleVi": "Bảo tồn động vật hoang dã",
    "words": [
      {
        "en": "Body part",
        "ipa": "/ˈbɒdi pɑːt/",
        "vi": "Bộ phận cơ thể",
        "img": "https://img.invalid/body-part.jpg",
        "ex": "Some animals are hunted illegally for their body parts.",
        "trVi": "Một số động vật bị săn bắt trái phép để lấy bộ phận cơ thể.",
        "trAnswer": "Some animals are hunted illegally for their body parts.",
        "trKey": "body part"
      },
      {
        "en": "Captivity",
        "ipa": "/kæpˈtɪvəti/",
        "vi": "Sự nuôi nhốt",
        "img": "https://img.invalid/captivity.jpg",
        "ex": "Animals born in captivity often struggle to survive if released into the wild.",
        "trVi": "Động vật sinh ra trong điều kiện nuôi nhốt thường gặp khó khăn để sống sót nếu được thả về tự nhiên.",
        "trAnswer": "Animals born in captivity often struggle to survive if released into the wild.",
        "trKey": "captivity"
      },
      {
        "en": "Conservation",
        "ipa": "/ˌkɒnsəˈveɪʃn/",
        "vi": "Sự bảo vệ, sự bảo tồn",
        "img": "https://img.invalid/conservation.jpg",
        "ex": "The conservation of endangered species requires international cooperation.",
        "trVi": "Việc bảo tồn các loài có nguy cơ tuyệt chủng đòi hỏi sự hợp tác quốc tế.",
        "trAnswer": "The conservation of endangered species requires international cooperation.",
        "trKey": "conservation"
      },
      {
        "en": "Conserve",
        "ipa": "/kənˈsɜːv/",
        "vi": "Bảo vệ, bảo tồn",
        "img": "https://img.invalid/conserve.jpg",
        "ex": "The national park was created to conserve rare plants and animals.",
        "trVi": "Vườn quốc gia được thành lập để bảo tồn các loài thực vật và động vật quý hiếm.",
        "trAnswer": "The national park was created to conserve rare plants and animals.",
        "trKey": "conserve"
      },
      {
        "en": "Coral",
        "ipa": "/ˈkɒrəl/",
        "vi": "San hô",
        "img": "https://img.invalid/coral.jpg",
        "ex": "Rising sea temperatures are damaging coral reefs around the world.",
        "trVi": "Nhiệt độ nước biển tăng đang gây hại cho các rạn san hô trên toàn thế giới.",
        "trAnswer": "Rising sea temperatures are damaging coral reefs around the world.",
        "trKey": "coral"
      },
      {
        "en": "Critically endangered",
        "ipa": "/ˈkrɪtɪkli ɪnˈdeɪndʒəd/",
        "vi": "Bị đe dọa nghiêm trọng",
        "img": "https://img.invalid/critically-endangered.jpg",
        "ex": "The Saola is considered a critically endangered species in Viet Nam.",
        "trVi": "Sao la được coi là loài bị đe dọa nghiêm trọng ở Việt Nam.",
        "trAnswer": "The Saola is considered a critically endangered species in Viet Nam.",
        "trKey": "critically endangered"
      },
      {
        "en": "Debris",
        "ipa": "/ˈdebriː/",
        "vi": "Mảnh vỡ, mảnh vụn",
        "img": "https://img.invalid/debris.jpg",
        "ex": "Sea turtles sometimes mistake plastic debris in the ocean for food.",
        "trVi": "Rùa biển đôi khi nhầm mảnh vụn nhựa trong đại dương là thức ăn.",
        "trAnswer": "Sea turtles sometimes mistake plastic debris in the ocean for food.",
        "trKey": "debris"
      },
      {
        "en": "Degrade",
        "ipa": "/dɪˈɡreɪd/",
        "vi": "Xuống cấp",
        "img": "https://img.invalid/degrade.jpg",
        "ex": "Pollution has degraded the quality of water in the coastal area.",
        "trVi": "Ô nhiễm đã làm xuống cấp chất lượng nước ở khu vực ven biển.",
        "trAnswer": "Pollution has degraded the quality of water in the coastal area.",
        "trKey": "degrade"
      },
      {
        "en": "Enclosure",
        "ipa": "/ɪnˈkləʊʒə/",
        "vi": "Chuồng thú",
        "img": "https://img.invalid/enclosure.jpg",
        "ex": "The zoo built a larger enclosure to give the elephants more space.",
        "trVi": "Sở thú đã xây một chuồng thú lớn hơn để cho voi có thêm không gian.",
        "trAnswer": "The zoo built a larger enclosure to give the elephants more space.",
        "trKey": "enclosure"
      },
      {
        "en": "Endangered",
        "ipa": "/ɪnˈdeɪndʒəd/",
        "vi": "Bị đe dọa, gặp nguy hiểm",
        "img": "https://img.invalid/endangered.jpg",
        "ex": "Poaching has pushed many endangered species closer to extinction.",
        "trVi": "Nạn săn bắt trái phép đã đẩy nhiều loài bị đe dọa đến gần bờ vực tuyệt chủng hơn.",
        "trAnswer": "Poaching has pushed many endangered species closer to extinction.",
        "trKey": "endangered"
      },
      {
        "en": "Extinct",
        "ipa": "/ɪkˈstɪŋkt/",
        "vi": "Tuyệt chủng",
        "img": "https://img.invalid/extinct.jpg",
        "ex": "Without protection, this species of rhino could soon become extinct.",
        "trVi": "Nếu không được bảo vệ, loài tê giác này có thể sớm tuyệt chủng.",
        "trAnswer": "Without protection, this species of rhino could soon become extinct.",
        "trKey": "extinct"
      },
      {
        "en": "Forest clearance",
        "ipa": "/ˈfɒrɪst ˈklɪərəns/",
        "vi": "Sự chặt, phá rừng",
        "img": "https://img.invalid/forest-clearance.jpg",
        "ex": "Forest clearance has destroyed the natural habitat of many animals.",
        "trVi": "Việc chặt phá rừng đã hủy hoại môi trường sống tự nhiên của nhiều loài động vật.",
        "trAnswer": "Forest clearance has destroyed the natural habitat of many animals.",
        "trKey": "forest clearance"
      },
      {
        "en": "House",
        "ipa": "/haʊz/",
        "vi": "Cung cấp nơi ở",
        "img": "https://img.invalid/house.jpg",
        "ex": "The rescue centre houses more than fifty injured animals.",
        "trVi": "Trung tâm cứu hộ cung cấp nơi ở cho hơn năm mươi con động vật bị thương.",
        "trAnswer": "The rescue centre houses more than fifty injured animals.",
        "trKey": "house"
      },
      {
        "en": "Mammal",
        "ipa": "/ˈmæml/",
        "vi": "Động vật có vú",
        "img": "https://img.invalid/mammal.jpg",
        "ex": "Whales are the largest mammals living in the ocean.",
        "trVi": "Cá voi là loài động vật có vú lớn nhất sống trong đại dương.",
        "trAnswer": "Whales are the largest mammals living in the ocean.",
        "trKey": "mammal"
      },
      {
        "en": "Marine",
        "ipa": "/məˈriːn/",
        "vi": "Thuộc về biển",
        "img": "https://img.invalid/marine.jpg",
        "ex": "Marine life in this bay includes coral reefs and sea turtles.",
        "trVi": "Sinh vật biển trong vịnh này bao gồm rạn san hô và rùa biển.",
        "trAnswer": "Marine life in this bay includes coral reefs and sea turtles.",
        "trKey": "marine"
      },
      {
        "en": "Monitor",
        "ipa": "/ˈmɒnɪtə/",
        "vi": "Giám sát",
        "img": "https://img.invalid/monitor.jpg",
        "ex": "Rangers monitor the movement of elephants using cameras and trackers.",
        "trVi": "Các kiểm lâm viên giám sát sự di chuyển của voi bằng máy quay và thiết bị theo dõi.",
        "trAnswer": "Rangers monitor the movement of elephants using cameras and trackers.",
        "trKey": "monitor"
      },
      {
        "en": "Nursery",
        "ipa": "/ˈnɜːsəri/",
        "vi": "Vườn ươm",
        "img": "https://img.invalid/nursery.jpg",
        "ex": "The centre has a nursery where baby sea turtles are cared for safely.",
        "trVi": "Trung tâm có một khu vườn ươm nơi rùa biển con được chăm sóc an toàn.",
        "trAnswer": "The centre has a nursery where baby sea turtles are cared for safely.",
        "trKey": "nursery"
      },
      {
        "en": "Poach",
        "ipa": "/pəʊtʃ/",
        "vi": "Săn bắn bất hợp pháp",
        "img": "https://img.invalid/poach.jpg",
        "ex": "Rangers work day and night to stop hunters from poaching rhinos.",
        "trVi": "Các kiểm lâm viên làm việc ngày đêm để ngăn chặn thợ săn săn bắn tê giác trái phép.",
        "trAnswer": "Rangers work day and night to stop hunters from poaching rhinos.",
        "trKey": "poach"
      },
      {
        "en": "Primate",
        "ipa": "/ˈpraɪmeɪt/",
        "vi": "Bộ (họ) linh trưởng",
        "img": "https://img.invalid/primate.jpg",
        "ex": "This forest is home to several rare species of primate.",
        "trVi": "Khu rừng này là nơi sinh sống của một số loài linh trưởng quý hiếm.",
        "trAnswer": "This forest is home to several rare species of primate.",
        "trKey": "primate"
      },
      {
        "en": "Rare",
        "ipa": "/reə/",
        "vi": "Hiếm, quý hiếm",
        "img": "https://img.invalid/rare.jpg",
        "ex": "The Saola is such a rare animal that few people have ever seen one.",
        "trVi": "Sao la là loài động vật hiếm đến mức ít người từng nhìn thấy nó.",
        "trAnswer": "The Saola is such a rare animal that few people have ever seen one.",
        "trKey": "rare"
      },
      {
        "en": "Release",
        "ipa": "/rɪˈliːs/",
        "vi": "Thả",
        "img": "https://img.invalid/release.jpg",
        "ex": "After treatment, the injured turtle was released back into the sea.",
        "trVi": "Sau khi được điều trị, con rùa bị thương đã được thả về biển.",
        "trAnswer": "After treatment, the injured turtle was released back into the sea.",
        "trKey": "release"
      },
      {
        "en": "Rescue",
        "ipa": "/ˈreskjuː/",
        "vi": "Giải cứu",
        "img": "https://img.invalid/rescue.jpg",
        "ex": "Volunteers helped rescue the whale that was stuck near the shore.",
        "trVi": "Các tình nguyện viên đã giúp giải cứu con cá voi bị mắc kẹt gần bờ.",
        "trAnswer": "Volunteers helped rescue the whale that was stuck near the shore.",
        "trKey": "rescue"
      },
      {
        "en": "Sea turtle",
        "ipa": "/siː ˈtɜːtl/",
        "vi": "Rùa biển",
        "img": "https://img.invalid/sea-turtle.jpg",
        "ex": "Sea turtles often lay their eggs on quiet, protected beaches.",
        "trVi": "Rùa biển thường đẻ trứng trên những bãi biển yên tĩnh, được bảo vệ.",
        "trAnswer": "Sea turtles often lay their eggs on quiet, protected beaches.",
        "trKey": "sea turtle"
      },
      {
        "en": "Sign language",
        "ipa": "/saɪn ˈlæŋɡwɪdʒ/",
        "vi": "Ngôn ngữ kí hiệu",
        "img": "https://img.invalid/sign-language.jpg",
        "ex": "Some trainers use a kind of sign language to communicate with dolphins.",
        "trVi": "Một số huấn luyện viên sử dụng một loại ngôn ngữ kí hiệu để giao tiếp với cá heo.",
        "trAnswer": "Some trainers use a kind of sign language to communicate with dolphins.",
        "trKey": "sign language"
      },
      {
        "en": "Spawning ground",
        "ipa": "/ˈspɔːnɪŋ ɡraʊnd/",
        "vi": "Nơi đẻ trứng",
        "img": "https://img.invalid/spawning-ground.jpg",
        "ex": "The coastal area is an important spawning ground for many fish species.",
        "trVi": "Khu vực ven biển là nơi đẻ trứng quan trọng đối với nhiều loài cá.",
        "trAnswer": "The coastal area is an important spawning ground for many fish species.",
        "trKey": "spawning ground"
      },
      {
        "en": "Survive",
        "ipa": "/səˈvaɪv/",
        "vi": "Tồn tại",
        "img": "https://img.invalid/survive.jpg",
        "ex": "Without protection, many species will not survive the next few decades.",
        "trVi": "Nếu không được bảo vệ, nhiều loài sẽ không thể tồn tại trong vài thập kỉ tới.",
        "trAnswer": "Without protection, many species will not survive the next few decades.",
        "trKey": "survive"
      },
      {
        "en": "Threatened",
        "ipa": "/ˈθretnd/",
        "vi": "Bị đe dọa",
        "img": "https://img.invalid/threatened.jpg",
        "ex": "Habitat loss has left many marine species threatened.",
        "trVi": "Mất môi trường sống đã khiến nhiều loài sinh vật biển bị đe dọa.",
        "trAnswer": "Habitat loss has left many marine species threatened.",
        "trKey": "threatened"
      },
      {
        "en": "Vulnerable",
        "ipa": "/ˈvʌlnərəbl/",
        "vi": "Dễ bị tổn thương",
        "img": "https://img.invalid/vulnerable.jpg",
        "ex": "Baby sea turtles are extremely vulnerable when they first reach the ocean.",
        "trVi": "Rùa biển con cực kì dễ bị tổn thương khi chúng lần đầu ra biển.",
        "trAnswer": "Baby sea turtles are extremely vulnerable when they first reach the ocean.",
        "trKey": "vulnerable"
      }
    ],
    "story": {
      "title": "Saving sea turtles at Con Dao",
      "titleVi": "Cứu hộ rùa biển tại Côn Đảo",
      "text": "Every year, rangers at Con Dao National Park work hard to protect sea turtles, a species that is now considered vulnerable due to poaching and forest clearance along the coast.<br><br>The park runs a small nursery where eggs are collected from the beach and kept safe until they hatch. Rangers monitor the young turtles closely before they are released back into the sea, giving them a much better chance to survive than if they had been left on an unprotected spawning ground.<br><br>Marine life at Con Dao also includes coral reefs, which provide food and shelter for many other species. Without conservation programmes like this one, experts warn that some marine mammals and reptiles here could eventually become endangered or even extinct.",
      "textVi": "Hằng năm, các kiểm lâm viên tại Vườn quốc gia Côn Đảo làm việc chăm chỉ để bảo vệ rùa biển, một loài hiện được coi là dễ bị tổn thương do nạn săn bắt trái phép và việc phá rừng dọc bờ biển.<br><br>Vườn quốc gia vận hành một khu vườn ươm nhỏ, nơi trứng được thu gom từ bãi biển và giữ an toàn cho đến khi nở. Các kiểm lâm viên giám sát chặt chẽ những chú rùa con trước khi chúng được thả về biển, giúp chúng có cơ hội sống sót tốt hơn nhiều so với việc bị bỏ lại ở một nơi đẻ trứng không được bảo vệ.<br><br>Sinh vật biển ở Côn Đảo cũng bao gồm các rạn san hô, cung cấp thức ăn và nơi trú ẩn cho nhiều loài khác. Nếu không có các chương trình bảo tồn như thế này, các chuyên gia cảnh báo rằng một số loài động vật có vú và bò sát biển ở đây cuối cùng có thể bị đe dọa hoặc thậm chí tuyệt chủng.",
      "used": [
        "Vulnerable",
        "Poach",
        "Forest clearance",
        "Nursery",
        "Monitor",
        "Release",
        "Survive",
        "Spawning ground",
        "Marine",
        "Coral",
        "Endangered",
        "Extinct"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🎯",
    "title": "CAREER PATHS",
    "titleVi": "Con đường sự nghiệp",
    "words": [
      {
        "en": "Automate",
        "ipa": "/ˈɔːtəmeɪt/",
        "vi": "Tự động hóa",
        "img": "https://img.invalid/automate.jpg",
        "ex": "Many factories have automated tasks that used to be done by hand.",
        "trVi": "Nhiều nhà máy đã tự động hóa các công việc từng được làm bằng tay.",
        "trAnswer": "Many factories have automated tasks that used to be done by hand.",
        "trKey": "automate"
      },
      {
        "en": "Adapt",
        "ipa": "/əˈdæpt/",
        "vi": "Thay đổi cho phù hợp, thích ứng",
        "img": "https://img.invalid/adapt.jpg",
        "ex": "Workers need to adapt quickly to new technology in the workplace.",
        "trVi": "Người lao động cần thích ứng nhanh với công nghệ mới tại nơi làm việc.",
        "trAnswer": "Workers need to adapt quickly to new technology in the workplace.",
        "trKey": "adapt"
      },
      {
        "en": "Character",
        "ipa": "/ˈkærəktə/",
        "vi": "Phẩm chất, đặc điểm tính cách",
        "img": "https://img.invalid/character.jpg",
        "ex": "Employers often look for character traits such as honesty and patience.",
        "trVi": "Nhà tuyển dụng thường tìm kiếm những phẩm chất như trung thực và kiên nhẫn.",
        "trAnswer": "Employers often look for character traits such as honesty and patience.",
        "trKey": "character"
      },
      {
        "en": "Childminder",
        "ipa": "/ˈtʃaɪldmaɪndə/",
        "vi": "Người trông trẻ",
        "img": "https://img.invalid/childminder.jpg",
        "ex": "She works as a childminder while she studies for her teaching degree.",
        "trVi": "Cô ấy làm người trông trẻ trong khi học lấy bằng sư phạm.",
        "trAnswer": "She works as a childminder while she studies for her teaching degree.",
        "trKey": "childminder"
      },
      {
        "en": "Cut down on",
        "ipa": "/kʌt daʊn ɒn/",
        "vi": "Cắt giảm, giảm bớt",
        "img": "https://img.invalid/cut-down-on.jpg",
        "ex": "He decided to cut down on overtime to spend more time with his family.",
        "trVi": "Anh ấy quyết định cắt giảm giờ làm thêm để dành nhiều thời gian hơn cho gia đình.",
        "trAnswer": "He decided to cut down on overtime to spend more time with his family.",
        "trKey": "cut down"
      },
      {
        "en": "CV",
        "ipa": "/ˌsiː ˈviː/",
        "vi": "Sơ yếu lí lịch",
        "img": "https://img.invalid/cv.jpg",
        "ex": "She updated her CV before applying for the new job.",
        "trVi": "Cô ấy đã cập nhật sơ yếu lí lịch trước khi ứng tuyển công việc mới.",
        "trAnswer": "She updated her CV before applying for the new job.",
        "trKey": "cv"
      },
      {
        "en": "Fascinating",
        "ipa": "/ˈfæsɪneɪtɪŋ/",
        "vi": "Cực kì thú vị và hấp dẫn",
        "img": "https://img.invalid/fascinating.jpg",
        "ex": "He finds the career of a marine biologist absolutely fascinating.",
        "trVi": "Anh ấy thấy nghề nhà sinh vật học biển vô cùng thú vị và hấp dẫn.",
        "trAnswer": "He finds the career of a marine biologist absolutely fascinating.",
        "trKey": "fascinating"
      },
      {
        "en": "In demand",
        "ipa": "/ɪn dɪˈmɑːnd/",
        "vi": "Có nhu cầu, được mọi người mong muốn",
        "img": "https://img.invalid/in-demand.jpg",
        "ex": "Skills in computer programming are highly in demand these days.",
        "trVi": "Kĩ năng lập trình máy tính hiện đang rất được săn đón.",
        "trAnswer": "Skills in computer programming are highly in demand these days.",
        "trKey": "in demand"
      },
      {
        "en": "Get on with",
        "ipa": "/ɡet ɒn wɪð/",
        "vi": "Hòa hợp với, có mối quan hệ tốt với",
        "img": "https://img.invalid/get-on-with.jpg",
        "ex": "It is important to get on with your colleagues at work.",
        "trVi": "Điều quan trọng là hòa hợp tốt với đồng nghiệp tại nơi làm việc.",
        "trAnswer": "It is important to get on with your colleagues at work.",
        "trKey": "get on with"
      },
      {
        "en": "Go in for",
        "ipa": "/ɡəʊ ɪn fɔː/",
        "vi": "Đam mê, theo đuổi một sở thích",
        "img": "https://img.invalid/go-in-for.jpg",
        "ex": "She has always gone in for creative jobs like design and writing.",
        "trVi": "Cô ấy luôn theo đuổi những công việc mang tính sáng tạo như thiết kế và viết lách.",
        "trAnswer": "She has always gone in for creative jobs like design and writing.",
        "trKey": "go in for"
      },
      {
        "en": "Live up to",
        "ipa": "/lɪv ʌp tuː/",
        "vi": "Làm theo sự mong muốn, kì vọng của ai đó",
        "img": "https://img.invalid/live-up-to.jpg",
        "ex": "He worked hard to live up to his parents' expectations.",
        "trVi": "Anh ấy đã làm việc chăm chỉ để đáp ứng kì vọng của cha mẹ.",
        "trAnswer": "He worked hard to live up to his parents' expectations.",
        "trKey": "live up to"
      },
      {
        "en": "Look down on",
        "ipa": "/lʊk daʊn ɒn/",
        "vi": "Coi thường người khác",
        "img": "https://img.invalid/look-down-on.jpg",
        "ex": "You should never look down on any job, no matter how simple it seems.",
        "trVi": "Bạn không bao giờ nên coi thường bất kì công việc nào, dù nó có vẻ đơn giản đến đâu.",
        "trAnswer": "You should never look down on any job, no matter how simple it seems.",
        "trKey": "look down on"
      },
      {
        "en": "Obsolete",
        "ipa": "/ˈɒbsəliːt/",
        "vi": "Lỗi thời, không còn được sử dụng",
        "img": "https://img.invalid/obsolete.jpg",
        "ex": "Some traditional jobs have become obsolete because of new technology.",
        "trVi": "Một số nghề truyền thống đã trở nên lỗi thời vì công nghệ mới.",
        "trAnswer": "Some traditional jobs have become obsolete because of new technology.",
        "trKey": "obsolete"
      },
      {
        "en": "Passion",
        "ipa": "/ˈpæʃn/",
        "vi": "Niềm đam mê, say mê",
        "img": "https://img.invalid/passion.jpg",
        "ex": "Her passion for animals led her to become a veterinarian.",
        "trVi": "Niềm đam mê động vật đã dẫn cô ấy trở thành bác sĩ thú y.",
        "trAnswer": "Her passion for animals led her to become a veterinarian.",
        "trKey": "passion"
      },
      {
        "en": "Passionate",
        "ipa": "/ˈpæʃənət/",
        "vi": "Có niềm đam mê với/dành cho",
        "img": "https://img.invalid/passionate.jpg",
        "ex": "He is passionate about teaching and helping students improve.",
        "trVi": "Anh ấy có niềm đam mê với việc dạy học và giúp học sinh tiến bộ.",
        "trAnswer": "He is passionate about teaching and helping students improve.",
        "trKey": "passionate"
      },
      {
        "en": "Position",
        "ipa": "/pəˈzɪʃn/",
        "vi": "Vị trí việc làm",
        "img": "https://img.invalid/position.jpg",
        "ex": "She applied for a position as a junior software engineer.",
        "trVi": "Cô ấy đã ứng tuyển vào vị trí kĩ sư phần mềm cấp thấp.",
        "trAnswer": "She applied for a position as a junior software engineer.",
        "trKey": "position"
      },
      {
        "en": "Pursue",
        "ipa": "/pəˈsjuː/",
        "vi": "Theo đuổi",
        "img": "https://img.invalid/pursue.jpg",
        "ex": "He decided to pursue a career in medicine after volunteering at a hospital.",
        "trVi": "Anh ấy quyết định theo đuổi sự nghiệp y khoa sau khi tình nguyện tại một bệnh viện.",
        "trAnswer": "He decided to pursue a career in medicine after volunteering at a hospital.",
        "trKey": "pursue"
      },
      {
        "en": "Put up with",
        "ipa": "/pʊt ʌp wɪð/",
        "vi": "Chịu đựng",
        "img": "https://img.invalid/put-up-with.jpg",
        "ex": "Some jobs require you to put up with long hours and stress.",
        "trVi": "Một số công việc đòi hỏi bạn phải chịu đựng giờ làm dài và căng thẳng.",
        "trAnswer": "Some jobs require you to put up with long hours and stress.",
        "trKey": "put up with"
      },
      {
        "en": "Soft skills",
        "ipa": "/sɒft skɪlz/",
        "vi": "Các kĩ năng mềm",
        "img": "https://img.invalid/soft-skills.jpg",
        "ex": "Communication and teamwork are important soft skills for any career.",
        "trVi": "Giao tiếp và làm việc nhóm là những kĩ năng mềm quan trọng cho bất kì sự nghiệp nào.",
        "trAnswer": "Communication and teamwork are important soft skills for any career.",
        "trKey": "soft skills"
      },
      {
        "en": "Specialty",
        "ipa": "/ˈspeʃəlti/",
        "vi": "Chuyên ngành",
        "img": "https://img.invalid/specialty.jpg",
        "ex": "Her specialty is paediatric medicine, which focuses on treating children.",
        "trVi": "Chuyên ngành của cô ấy là nhi khoa, tập trung vào việc điều trị cho trẻ em.",
        "trAnswer": "Her specialty is paediatric medicine, which focuses on treating children.",
        "trKey": "specialty"
      },
      {
        "en": "Take into account",
        "ipa": "/teɪk ˈɪntə əˈkaʊnt/",
        "vi": "Cân nhắc, xem xét",
        "img": "https://img.invalid/take-into-account.jpg",
        "ex": "You should take into account your own interests when choosing a career.",
        "trVi": "Bạn nên cân nhắc sở thích của bản thân khi chọn nghề nghiệp.",
        "trAnswer": "You should take into account your own interests when choosing a career.",
        "trKey": "take into account"
      },
      {
        "en": "Tutor",
        "ipa": "/ˈtjuːtə/",
        "vi": "Gia sư, giáo viên dạy kèm",
        "img": "https://img.invalid/tutor.jpg",
        "ex": "He works as a maths tutor for secondary school students.",
        "trVi": "Anh ấy làm gia sư môn toán cho học sinh trung học.",
        "trAnswer": "He works as a maths tutor for secondary school students.",
        "trKey": "tutor"
      },
      {
        "en": "Work experience",
        "ipa": "/wɜːk ɪkˈspɪəriəns/",
        "vi": "Kinh nghiệm làm việc",
        "img": "https://img.invalid/work-experience.jpg",
        "ex": "Getting some work experience during the holidays can help you choose a career.",
        "trVi": "Có được một số kinh nghiệm làm việc trong kì nghỉ có thể giúp bạn chọn nghề nghiệp.",
        "trAnswer": "Getting some work experience during the holidays can help you choose a career.",
        "trKey": "work experience"
      }
    ],
    "story": {
      "title": "Choosing the right career path",
      "titleVi": "Chọn con đường sự nghiệp phù hợp",
      "text": "Before choosing a career, Hoa's teacher advised her to take into account both her passion and the skills that are currently in demand. Hoa was always passionate about children, so she began working part-time as a childminder to gain some real work experience.<br><br>At the same time, she updated her CV and asked a family friend, a career tutor, for advice. He reminded her that soft skills such as knowing how to get on with people are just as important as academic knowledge, and warned her that some traditional jobs are becoming obsolete as technology continues to automate simple tasks.<br><br>In the end, Hoa decided to pursue a career in early childhood education. She admits it will not always be easy - she may have to put up with long hours - but she believes that following her true passion is far better than choosing a position just to live up to other people's expectations.",
      "textVi": "Trước khi chọn nghề, giáo viên của Hoa khuyên cô nên cân nhắc cả niềm đam mê lẫn những kĩ năng hiện đang được săn đón. Hoa luôn có niềm đam mê với trẻ em, nên cô bắt đầu làm bán thời gian với vai trò người trông trẻ để có được kinh nghiệm làm việc thực tế.<br><br>Đồng thời, cô cập nhật sơ yếu lí lịch của mình và nhờ một người bạn của gia đình, một gia sư hướng nghiệp, tư vấn. Ông nhắc cô rằng các kĩ năng mềm như biết cách hòa hợp với mọi người cũng quan trọng không kém kiến thức học thuật, và cảnh báo rằng một số nghề truyền thống đang trở nên lỗi thời khi công nghệ tiếp tục tự động hóa các công việc đơn giản.<br><br>Cuối cùng, Hoa quyết định theo đuổi sự nghiệp trong lĩnh vực giáo dục mầm non. Cô thừa nhận rằng không phải lúc nào cũng dễ dàng - cô có thể phải chịu đựng giờ làm dài - nhưng cô tin rằng theo đuổi đam mê thực sự của mình tốt hơn nhiều so với việc chọn một vị trí chỉ để đáp ứng kì vọng của người khác.",
      "used": [
        "Take into account",
        "Passionate",
        "Childminder",
        "Work experience",
        "CV",
        "Tutor",
        "Soft skills",
        "Get on with",
        "Obsolete",
        "Automate",
        "Pursue",
        "Put up with",
        "Position",
        "Live up to",
        "In demand"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🎓",
    "title": "LIFELONG LEARNING",
    "titleVi": "Học tập suốt đời",
    "words": [
      {
        "en": "Acquire",
        "ipa": "/əˈkwaɪə/",
        "vi": "Có được, đạt được",
        "img": "https://img.invalid/acquire.jpg",
        "ex": "He acquired excellent computer skills by taking free online courses.",
        "trVi": "Anh ấy đã có được những kĩ năng máy tính xuất sắc nhờ tham gia các khóa học trực tuyến miễn phí.",
        "trAnswer": "He acquired excellent computer skills by taking free online courses.",
        "trKey": "acquire"
      },
      {
        "en": "Adult education",
        "ipa": "/ˈædʌlt ˌedʒuˈkeɪʃn/",
        "vi": "Giáo dục cho người lớn",
        "img": "https://img.invalid/adult-education.jpg",
        "ex": "The community centre offers adult education classes in the evening.",
        "trVi": "Trung tâm cộng đồng cung cấp các lớp giáo dục cho người lớn vào buổi tối.",
        "trAnswer": "The community centre offers adult education classes in the evening.",
        "trKey": "adult education"
      },
      {
        "en": "Boost",
        "ipa": "/buːst/",
        "vi": "Tăng cường, cải thiện",
        "img": "https://img.invalid/boost.jpg",
        "ex": "Learning a new language can boost your confidence and career opportunities.",
        "trVi": "Học một ngôn ngữ mới có thể tăng cường sự tự tin và cơ hội nghề nghiệp của bạn.",
        "trAnswer": "Learning a new language can boost your confidence and career opportunities.",
        "trKey": "boost"
      },
      {
        "en": "Broaden",
        "ipa": "/ˈbrɔːdn/",
        "vi": "Mở mang, mở rộng",
        "img": "https://img.invalid/broaden.jpg",
        "ex": "Travelling to new places helps broaden your understanding of the world.",
        "trVi": "Đi đến những nơi mới giúp mở mang hiểu biết của bạn về thế giới.",
        "trAnswer": "Travelling to new places helps broaden your understanding of the world.",
        "trKey": "broaden"
      },
      {
        "en": "Brush up",
        "ipa": "/brʌʃ ʌp/",
        "vi": "Ôn lại, học lại",
        "img": "https://img.invalid/brush-up.jpg",
        "ex": "She took a short course to brush up her English before the interview.",
        "trVi": "Cô ấy đã tham gia một khóa học ngắn để ôn lại tiếng Anh trước buổi phỏng vấn.",
        "trAnswer": "She took a short course to brush up her English before the interview.",
        "trKey": "brush up"
      },
      {
        "en": "Complex",
        "ipa": "/ˈkɒmpleks/",
        "vi": "Phức tạp",
        "img": "https://img.invalid/complex.jpg",
        "ex": "Lifelong learners are often better at solving complex problems.",
        "trVi": "Người học suốt đời thường giỏi hơn trong việc giải quyết các vấn đề phức tạp.",
        "trAnswer": "Lifelong learners are often better at solving complex problems.",
        "trKey": "complex"
      },
      {
        "en": "Determination",
        "ipa": "/dɪˌtɜːmɪˈneɪʃn/",
        "vi": "Sự quyết tâm",
        "img": "https://img.invalid/determination.jpg",
        "ex": "With determination, she finished her degree while working full time.",
        "trVi": "Với sự quyết tâm, cô ấy đã hoàn thành bằng cấp trong khi vẫn làm việc toàn thời gian.",
        "trAnswer": "With determination, she finished her degree while working full time.",
        "trKey": "determination"
      },
      {
        "en": "Distance learning",
        "ipa": "/ˈdɪstəns ˈlɜːnɪŋ/",
        "vi": "Học từ xa",
        "img": "https://img.invalid/distance-learning.jpg",
        "ex": "Distance learning allows people to study without attending classes in person.",
        "trVi": "Học từ xa cho phép mọi người học tập mà không cần đến lớp trực tiếp.",
        "trAnswer": "Distance learning allows people to study without attending classes in person.",
        "trKey": "distance learning"
      },
      {
        "en": "Distraction",
        "ipa": "/dɪˈstrækʃn/",
        "vi": "Sự phân tâm, sự sao lãng",
        "img": "https://img.invalid/distraction.jpg",
        "ex": "It can be hard to study online without the distraction of social media.",
        "trVi": "Có thể khó học trực tuyến mà không bị phân tâm bởi mạng xã hội.",
        "trAnswer": "It can be hard to study online without the distraction of social media.",
        "trKey": "distraction"
      },
      {
        "en": "Hardship",
        "ipa": "/ˈhɑːdʃɪp/",
        "vi": "Sự khó khăn, vất vả",
        "img": "https://img.invalid/hardship.jpg",
        "ex": "Despite many hardships, he never gave up on his studies.",
        "trVi": "Bất chấp nhiều khó khăn, anh ấy chưa bao giờ từ bỏ việc học.",
        "trAnswer": "Despite many hardships, he never gave up on his studies.",
        "trKey": "hardship"
      },
      {
        "en": "Governess",
        "ipa": "/ˈɡʌvənəs/",
        "vi": "Gia sư, giáo viên dạy kèm tại nhà",
        "img": "https://img.invalid/governess.jpg",
        "ex": "In the past, wealthy families often hired a governess to teach their children at home.",
        "trVi": "Trong quá khứ, các gia đình giàu có thường thuê một gia sư để dạy con cái tại nhà.",
        "trAnswer": "In the past, wealthy families often hired a governess to teach their children at home.",
        "trKey": "governess"
      },
      {
        "en": "Imprison",
        "ipa": "/ɪmˈprɪzn/",
        "vi": "Giam cầm, cầm tù",
        "img": "https://img.invalid/imprison.jpg",
        "ex": "Even while imprisoned, he continued to study and write poetry.",
        "trVi": "Ngay cả khi bị giam cầm, ông vẫn tiếp tục học tập và viết thơ.",
        "trAnswer": "Even while imprisoned, he continued to study and write poetry.",
        "trKey": "imprison"
      },
      {
        "en": "Informed",
        "ipa": "/ɪnˈfɔːmd/",
        "vi": "Có kiến thức về, có hiểu biết",
        "img": "https://img.invalid/informed.jpg",
        "ex": "Lifelong learning helps people stay informed about the world around them.",
        "trVi": "Học tập suốt đời giúp con người luôn có hiểu biết về thế giới xung quanh.",
        "trAnswer": "Lifelong learning helps people stay informed about the world around them.",
        "trKey": "informed"
      },
      {
        "en": "Intelligence",
        "ipa": "/ɪnˈtelɪdʒəns/",
        "vi": "Trí tuệ",
        "img": "https://img.invalid/intelligence.jpg",
        "ex": "True intelligence includes the ability to keep learning throughout life.",
        "trVi": "Trí tuệ thực sự bao gồm khả năng tiếp tục học hỏi suốt cuộc đời.",
        "trAnswer": "True intelligence includes the ability to keep learning throughout life.",
        "trKey": "intelligence"
      },
      {
        "en": "Learning community",
        "ipa": "/ˈlɜːnɪŋ kəˈmjuːnəti/",
        "vi": "Cộng đồng học tập",
        "img": "https://img.invalid/learning-community.jpg",
        "ex": "The online course created a learning community for students all over the country.",
        "trVi": "Khóa học trực tuyến đã tạo ra một cộng đồng học tập cho học sinh trên khắp cả nước.",
        "trAnswer": "The online course created a learning community for students all over the country.",
        "trKey": "learning community"
      },
      {
        "en": "Maintain",
        "ipa": "/meɪnˈteɪn/",
        "vi": "Duy trì, giữ được",
        "img": "https://img.invalid/maintain.jpg",
        "ex": "Reading regularly helps you maintain a good level of English.",
        "trVi": "Đọc sách thường xuyên giúp bạn duy trì trình độ tiếng Anh tốt.",
        "trAnswer": "Reading regularly helps you maintain a good level of English.",
        "trKey": "maintain"
      },
      {
        "en": "Martial art",
        "ipa": "/ˌmɑːʃl ˈɑːt/",
        "vi": "Võ thuật",
        "img": "https://img.invalid/martial-art.jpg",
        "ex": "He has practised a traditional martial art since he was a child.",
        "trVi": "Anh ấy đã luyện tập một môn võ thuật truyền thống từ khi còn nhỏ.",
        "trAnswer": "He has practised a traditional martial art since he was a child.",
        "trKey": "martial art"
      },
      {
        "en": "Molecular Biology",
        "ipa": "/məˈlekjələ baɪˈɒlədʒi/",
        "vi": "Ngành sinh học phân tử",
        "img": "https://img.invalid/molecular-biology.jpg",
        "ex": "She decided to study Molecular Biology after retiring from her first career.",
        "trVi": "Bà quyết định học ngành sinh học phân tử sau khi nghỉ hưu từ sự nghiệp đầu tiên.",
        "trAnswer": "She decided to study Molecular Biology after retiring from her first career.",
        "trKey": "molecular biology"
      },
      {
        "en": "Night school",
        "ipa": "/naɪt skuːl/",
        "vi": "Lớp học buổi tối",
        "img": "https://img.invalid/night-school.jpg",
        "ex": "He attended night school to finish his high school diploma while working.",
        "trVi": "Anh ấy theo học lớp học buổi tối để hoàn thành bằng tốt nghiệp trung học trong khi vẫn đi làm.",
        "trAnswer": "He attended night school to finish his high school diploma while working.",
        "trKey": "night school"
      },
      {
        "en": "Psychology",
        "ipa": "/saɪˈkɒlədʒi/",
        "vi": "Ngành tâm lí học",
        "img": "https://img.invalid/psychology.jpg",
        "ex": "She became interested in psychology after reading about how the brain learns.",
        "trVi": "Cô ấy trở nên hứng thú với ngành tâm lí học sau khi đọc về cách bộ não học hỏi.",
        "trAnswer": "She became interested in psychology after reading about how the brain learns.",
        "trKey": "psychology"
      },
      {
        "en": "Relevant",
        "ipa": "/ˈreləvənt/",
        "vi": "Phù hợp, thích hợp",
        "img": "https://img.invalid/relevant.jpg",
        "ex": "Choosing courses that are relevant to your goals makes learning more meaningful.",
        "trVi": "Chọn những khóa học phù hợp với mục tiêu của bạn khiến việc học trở nên ý nghĩa hơn.",
        "trAnswer": "Choosing courses that are relevant to your goals makes learning more meaningful.",
        "trKey": "relevant"
      },
      {
        "en": "Well-rounded",
        "ipa": "/ˌwel ˈraʊndɪd/",
        "vi": "Được phát triển một cách toàn diện",
        "img": "https://img.invalid/well-rounded.jpg",
        "ex": "Taking part in different activities helps students become well-rounded individuals.",
        "trVi": "Tham gia vào các hoạt động khác nhau giúp học sinh trở thành những cá nhân phát triển toàn diện.",
        "trAnswer": "Taking part in different activities helps students become well-rounded individuals.",
        "trKey": "well-rounded"
      },
      {
        "en": "Widen",
        "ipa": "/ˈwaɪdn/",
        "vi": "Mở rộng, tăng thêm",
        "img": "https://img.invalid/widen.jpg",
        "ex": "Learning new skills can widen your career opportunities.",
        "trVi": "Học các kĩ năng mới có thể mở rộng cơ hội nghề nghiệp của bạn.",
        "trAnswer": "Learning new skills can widen your career opportunities.",
        "trKey": "widen"
      },
      {
        "en": "Wonder",
        "ipa": "/ˈwʌndə/",
        "vi": "Thắc mắc, băn khoăn",
        "img": "https://img.invalid/wonder.jpg",
        "ex": "She often wonders what she could achieve if she kept learning her whole life.",
        "trVi": "Cô ấy thường thắc mắc mình có thể đạt được điều gì nếu tiếp tục học tập suốt đời.",
        "trAnswer": "She often wonders what she could achieve if she kept learning her whole life.",
        "trKey": "wonder"
      }
    ],
    "story": {
      "title": "It's never too late to learn",
      "titleVi": "Học không bao giờ là quá muộn",
      "text": "At the age of sixty, Mrs Lien decided to enrol in a night school class to brush up her English. Some of her friends wondered why she still wanted to study, but she believed that learning keeps the mind active at any age.<br><br>With great determination, she attended class twice a week, despite the hardship of also caring for her grandchildren. She avoided the distraction of her phone during lessons and slowly built a small learning community with classmates who were also returning to education later in life.<br><br>A year later, Mrs Lien could hold a simple conversation in English and felt more informed about the world than ever before. Her story reminds everyone that lifelong learning can boost confidence, broaden the mind, and help people stay well-rounded at every stage of life.",
      "textVi": "Ở tuổi sáu mươi, bà Liên quyết định đăng kí một lớp học buổi tối để ôn lại tiếng Anh. Một số bạn bè của bà thắc mắc tại sao bà vẫn muốn học, nhưng bà tin rằng việc học giúp trí óc luôn hoạt động ở bất kì độ tuổi nào.<br><br>Với sự quyết tâm lớn, bà đến lớp hai lần một tuần, bất chấp khó khăn khi vẫn phải chăm sóc các cháu. Bà tránh bị phân tâm bởi điện thoại trong giờ học và dần dần xây dựng một cộng đồng học tập nhỏ với các bạn học cũng quay lại việc học ở độ tuổi muộn hơn.<br><br>Một năm sau, bà Liên đã có thể trò chuyện đơn giản bằng tiếng Anh và cảm thấy hiểu biết về thế giới hơn bao giờ hết. Câu chuyện của bà nhắc nhở mọi người rằng học tập suốt đời có thể tăng cường sự tự tin, mở mang tâm trí, và giúp con người phát triển toàn diện ở mọi giai đoạn của cuộc đời.",
      "used": [
        "Night school",
        "Brush up",
        "Wonder",
        "Determination",
        "Hardship",
        "Distraction",
        "Learning community",
        "Informed",
        "Boost",
        "Broaden",
        "Well-rounded"
      ]
    }
  }
];
