// Dữ liệu từ vựng lớp 10 (THPT) — biên soạn theo chủ đề của SGK Tiếng Anh 10 Global Success (10 units)
// Mỗi unit gồm: từ vựng (words), bài đọc (story) do soạn mới theo chủ đề bài học (không sao chép nguyên văn sách giáo khoa).
// Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE10_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "👪",
    "title": "FAMILY LIFE",
    "titleVi": "Đời sống gia đình",
    "words": [
      {
        "en": "Breadwinner",
        "ipa": "/ˈbredwɪnə/",
        "vi": "Người trụ cột kiếm tiền trong gia đình",
        "img": "https://img.invalid/breadwinner.jpg",
        "ex": "My father is the breadwinner in our family.",
        "trVi": "Bố tôi là người trụ cột kiếm tiền trong gia đình tôi.",
        "trAnswer": "My father is the breadwinner in our family.",
        "trKey": "breadwinner"
      },
      {
        "en": "Homemaker",
        "ipa": "/ˈhəʊmmeɪkə/",
        "vi": "Người nội trợ",
        "img": "https://img.invalid/homemaker.jpg",
        "ex": "My mother is a homemaker who takes care of the whole family.",
        "trVi": "Mẹ tôi là người nội trợ chăm lo cho cả gia đình.",
        "trAnswer": "My mother is a homemaker who takes care of the whole family.",
        "trKey": "homemaker"
      },
      {
        "en": "Grocery",
        "ipa": "/ˈɡrəʊsəri/",
        "vi": "Thực phẩm, hàng tạp hóa",
        "img": "https://img.invalid/grocery.jpg",
        "ex": "Dad goes to the market to buy groceries every weekend.",
        "trVi": "Bố đi chợ mua thực phẩm và đồ tạp hóa vào mỗi cuối tuần.",
        "trAnswer": "Dad goes to the market to buy groceries every weekend.",
        "trKey": "grocery"
      },
      {
        "en": "Heavy lifting",
        "ipa": "/ˌhevi ˈlɪftɪŋ/",
        "vi": "Việc mang vác nặng",
        "img": "https://img.invalid/heavy-lifting.jpg",
        "ex": "My brother always does the heavy lifting when we move furniture.",
        "trVi": "Anh trai tôi luôn làm việc mang vác nặng khi chúng tôi chuyển đồ đạc.",
        "trAnswer": "My brother always does the heavy lifting when we move furniture.",
        "trKey": "heavy lifting"
      },
      {
        "en": "Household chores",
        "ipa": "/ˌhaʊshəʊld ˈtʃɔːz/",
        "vi": "Việc nhà",
        "img": "https://img.invalid/household-chores.jpg",
        "ex": "Every member of my family shares the household chores equally.",
        "trVi": "Mọi thành viên trong gia đình tôi đều chia sẻ việc nhà như nhau.",
        "trAnswer": "Every member of my family shares the household chores equally.",
        "trKey": "household chores"
      },
      {
        "en": "Laundry",
        "ipa": "/ˈlɔːndri/",
        "vi": "Quần áo cần giặt, việc giặt giũ",
        "img": "https://img.invalid/laundry.jpg",
        "ex": "My sister does the laundry twice a week.",
        "trVi": "Chị gái tôi giặt quần áo hai lần một tuần.",
        "trAnswer": "My sister does the laundry twice a week.",
        "trKey": "laundry"
      },
      {
        "en": "Washing-up",
        "ipa": "/ˌwɒʃɪŋ ˈʌp/",
        "vi": "Việc rửa bát đĩa",
        "img": "https://img.invalid/washing-up.jpg",
        "ex": "I always do the washing-up after dinner.",
        "trVi": "Tôi luôn rửa bát sau bữa tối.",
        "trAnswer": "I always do the washing-up after dinner.",
        "trKey": "washing-up"
      },
      {
        "en": "Responsibility",
        "ipa": "/rɪˌspɒnsəˈbɪləti/",
        "vi": "Trách nhiệm",
        "img": "https://img.invalid/responsibility.jpg",
        "ex": "Doing chores teaches children a sense of responsibility.",
        "trVi": "Làm việc nhà dạy cho trẻ em ý thức về trách nhiệm.",
        "trAnswer": "Doing chores teaches children a sense of responsibility.",
        "trKey": "responsibility"
      },
      {
        "en": "Gratitude",
        "ipa": "/ˈɡrætɪtjuːd/",
        "vi": "Lòng biết ơn",
        "img": "https://img.invalid/gratitude.jpg",
        "ex": "Helping with housework fills children with gratitude for their parents.",
        "trVi": "Giúp làm việc nhà khiến trẻ tràn đầy lòng biết ơn đối với cha mẹ.",
        "trAnswer": "Helping with housework fills children with gratitude for their parents.",
        "trKey": "gratitude"
      },
      {
        "en": "Strengthen",
        "ipa": "/ˈstreŋθn/",
        "vi": "Củng cố, làm bền chặt hơn",
        "img": "https://img.invalid/strengthen.jpg",
        "ex": "Sharing housework can strengthen the bonds between family members.",
        "trVi": "Cùng nhau làm việc nhà có thể củng cố sự gắn kết giữa các thành viên trong gia đình.",
        "trAnswer": "Sharing housework can strengthen the bonds between family members.",
        "trKey": "strengthen"
      },
      {
        "en": "Character",
        "ipa": "/ˈkærəktə/",
        "vi": "Tính cách",
        "img": "https://img.invalid/character.jpg",
        "ex": "Doing housework from a young age helps build a child's character.",
        "trVi": "Làm việc nhà từ nhỏ giúp hình thành tính cách của trẻ.",
        "trAnswer": "Doing housework from a young age helps build a child's character.",
        "trKey": "character"
      },
      {
        "en": "Value",
        "ipa": "/ˈvæljuː/",
        "vi": "Giá trị",
        "img": "https://img.invalid/value.jpg",
        "ex": "Respecting older people is an important family value.",
        "trVi": "Tôn trọng người lớn tuổi là một giá trị gia đình quan trọng.",
        "trAnswer": "Respecting older people is an important family value.",
        "trKey": "value"
      }
    ],
    "story": {
      "title": "A Fair Share at Home",
      "titleVi": "Chia sẻ công bằng trong nhà",
      "text": "In the Pham family, everyone helps with the household chores. Mr Pham is the breadwinner, but he never thinks doing housework is only his wife's job. Mrs Pham is a homemaker, yet she does not do everything alone.<br><br>Every Saturday morning, the whole family makes a plan. Mr Pham buys groceries and does the heavy lifting when they clean the garage. Mrs Pham cooks, and the children take turns doing the washing-up and the laundry.<br><br>At first, Nam and his sister complained about the chores. But their parents explained that sharing responsibility at home was part of growing up. Over time, the children felt gratitude for what their parents did every day. The family routine also helped strengthen their bonds and build good character. Now, doing housework together has become one of the most important values in the Pham family.",
      "textVi": "Trong gia đình nhà Phạm, mọi người đều giúp làm việc nhà. Ông Phạm là người trụ cột kiếm tiền, nhưng ông không bao giờ nghĩ rằng làm việc nhà chỉ là việc của vợ mình. Bà Phạm là người nội trợ, nhưng bà không làm mọi việc một mình.<br><br>Mỗi sáng thứ Bảy, cả nhà cùng lên kế hoạch. Ông Phạm đi mua thực phẩm và mang vác đồ nặng khi họ dọn dẹp nhà để xe. Bà Phạm nấu ăn, còn các con thay phiên nhau rửa bát và giặt quần áo.<br><br>Lúc đầu, Nam và em gái phàn nàn về việc nhà. Nhưng bố mẹ giải thích rằng chia sẻ trách nhiệm trong nhà là một phần của việc trưởng thành. Dần dần, các con cảm thấy biết ơn những gì bố mẹ đã làm mỗi ngày. Thói quen này của gia đình cũng giúp củng cố sự gắn kết và xây dựng tính cách tốt. Giờ đây, cùng nhau làm việc nhà đã trở thành một trong những giá trị quan trọng nhất của gia đình nhà Phạm.",
      "used": [
        "Breadwinner",
        "Homemaker",
        "Grocery",
        "Heavy lifting",
        "Household chores",
        "Washing-up",
        "Laundry",
        "Responsibility",
        "Gratitude",
        "Strengthen",
        "Character",
        "Value"
      ]
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🌎",
    "title": "HUMANS AND THE ENVIRONMENT",
    "titleVi": "Con người và môi trường",
    "words": [
      {
        "en": "Carbon footprint",
        "ipa": "/ˌkɑːbən ˈfʊtprɪnt/",
        "vi": "Dấu chân carbon (lượng khí thải carbon)",
        "img": "https://img.invalid/carbon-footprint.jpg",
        "ex": "Taking shorter showers can help reduce your carbon footprint.",
        "trVi": "Tắm nhanh hơn có thể giúp giảm dấu chân carbon của bạn.",
        "trAnswer": "Taking shorter showers can help reduce your carbon footprint.",
        "trKey": "carbon footprint"
      },
      {
        "en": "Household appliances",
        "ipa": "/ˌhaʊshəʊld əˈplaɪənsɪz/",
        "vi": "Thiết bị gia dụng",
        "img": "https://img.invalid/household-appliances.jpg",
        "ex": "Remember to turn off household appliances when they are not in use.",
        "trVi": "Hãy nhớ tắt các thiết bị gia dụng khi không sử dụng.",
        "trAnswer": "Remember to turn off household appliances when they are not in use.",
        "trKey": "household appliances"
      },
      {
        "en": "Eco-friendly",
        "ipa": "/ˌiːkəʊ ˈfrendli/",
        "vi": "Thân thiện với môi trường",
        "img": "https://img.invalid/eco-friendly.jpg",
        "ex": "Riding a bike to school is an eco-friendly habit.",
        "trVi": "Đi xe đạp đến trường là một thói quen thân thiện với môi trường.",
        "trAnswer": "Riding a bike to school is an eco-friendly habit.",
        "trKey": "eco-friendly"
      },
      {
        "en": "Adopt",
        "ipa": "/əˈdɒpt/",
        "vi": "Áp dụng, làm theo",
        "img": "https://img.invalid/adopt.jpg",
        "ex": "More and more people are adopting a green lifestyle.",
        "trVi": "Ngày càng có nhiều người áp dụng lối sống xanh.",
        "trAnswer": "More and more people are adopting a green lifestyle.",
        "trKey": "adopt"
      },
      {
        "en": "Energy",
        "ipa": "/ˈenədʒi/",
        "vi": "Năng lượng",
        "img": "https://img.invalid/energy.jpg",
        "ex": "Turning off the lights saves a lot of energy.",
        "trVi": "Tắt đèn giúp tiết kiệm rất nhiều năng lượng.",
        "trAnswer": "Turning off the lights saves a lot of energy.",
        "trKey": "energy"
      },
      {
        "en": "Lifestyle",
        "ipa": "/ˈlaɪfstaɪl/",
        "vi": "Lối sống",
        "img": "https://img.invalid/lifestyle.jpg",
        "ex": "A green lifestyle is good for both people and the planet.",
        "trVi": "Lối sống xanh tốt cho cả con người và hành tinh.",
        "trAnswer": "A green lifestyle is good for both people and the planet.",
        "trKey": "lifestyle"
      },
      {
        "en": "Litter",
        "ipa": "/ˈlɪtə/",
        "vi": "Rác thải",
        "img": "https://img.invalid/litter.jpg",
        "ex": "Volunteers picked up litter along the riverbank.",
        "trVi": "Các tình nguyện viên đã nhặt rác dọc theo bờ sông.",
        "trAnswer": "Volunteers picked up litter along the riverbank.",
        "trKey": "litter"
      },
      {
        "en": "Organic",
        "ipa": "/ɔːˈɡænɪk/",
        "vi": "Hữu cơ",
        "img": "https://img.invalid/organic.jpg",
        "ex": "My mother only buys organic vegetables for the family.",
        "trVi": "Mẹ tôi chỉ mua rau hữu cơ cho gia đình.",
        "trAnswer": "My mother only buys organic vegetables for the family.",
        "trKey": "organic"
      },
      {
        "en": "Recyclable",
        "ipa": "/ˌriːˈsaɪkləbl/",
        "vi": "Có thể tái chế",
        "img": "https://img.invalid/recyclable.jpg",
        "ex": "Glass bottles and paper are recyclable materials.",
        "trVi": "Chai thủy tinh và giấy là những vật liệu có thể tái chế.",
        "trAnswer": "Glass bottles and paper are recyclable materials.",
        "trKey": "recyclable"
      },
      {
        "en": "Resource",
        "ipa": "/rɪˈsɔːs/",
        "vi": "Tài nguyên",
        "img": "https://img.invalid/resource.jpg",
        "ex": "We should protect natural resources such as water and forests.",
        "trVi": "Chúng ta nên bảo vệ tài nguyên thiên nhiên như nước và rừng.",
        "trAnswer": "We should protect natural resources such as water and forests.",
        "trKey": "resource"
      },
      {
        "en": "Sustainable",
        "ipa": "/səˈsteɪnəbl/",
        "vi": "Bền vững",
        "img": "https://img.invalid/sustainable.jpg",
        "ex": "Using public transport is part of a sustainable lifestyle.",
        "trVi": "Sử dụng phương tiện công cộng là một phần của lối sống bền vững.",
        "trAnswer": "Using public transport is part of a sustainable lifestyle.",
        "trKey": "sustainable"
      },
      {
        "en": "Awareness",
        "ipa": "/əˈweənəs/",
        "vi": "Nhận thức",
        "img": "https://img.invalid/awareness.jpg",
        "ex": "Our club wants to raise awareness of environmental problems.",
        "trVi": "Câu lạc bộ của chúng tôi muốn nâng cao nhận thức về các vấn đề môi trường.",
        "trAnswer": "Our club wants to raise awareness of environmental problems.",
        "trKey": "awareness"
      }
    ],
    "story": {
      "title": "The Go Green Club",
      "titleVi": "Câu lạc bộ Sống Xanh",
      "text": "Last month, Mai joined the Go Green Club at her school. The club encourages students to adopt an eco-friendly lifestyle and reduce their carbon footprint.<br><br>Every weekend, the members meet to clean up litter around the neighbourhood. They also remind their families to turn off household appliances to save energy, and to buy organic food whenever possible.<br><br>One of the club's projects is collecting recyclable materials such as bottles and paper instead of throwing them away. Mai says protecting natural resources is everyone's responsibility, not just the government's. She believes that if more people choose a sustainable lifestyle, the environment will become cleaner for future generations.<br><br>The club also organises small events to raise awareness among students. Thanks to their work, many students at Mai's school now think more carefully about the environment before they act.",
      "textVi": "Tháng trước, Mai đã tham gia Câu lạc bộ Sống Xanh ở trường. Câu lạc bộ khuyến khích học sinh áp dụng lối sống thân thiện với môi trường và giảm dấu chân carbon của mình.<br><br>Mỗi cuối tuần, các thành viên gặp nhau để dọn rác quanh khu phố. Họ cũng nhắc gia đình tắt các thiết bị gia dụng để tiết kiệm năng lượng, và mua thực phẩm hữu cơ bất cứ khi nào có thể.<br><br>Một trong những dự án của câu lạc bộ là thu gom các vật liệu có thể tái chế như chai lọ và giấy thay vì vứt bỏ chúng. Mai nói rằng bảo vệ tài nguyên thiên nhiên là trách nhiệm của tất cả mọi người, không chỉ của chính phủ. Cô tin rằng nếu nhiều người lựa chọn lối sống bền vững hơn, môi trường sẽ trở nên trong lành hơn cho các thế hệ tương lai.<br><br>Câu lạc bộ cũng tổ chức các sự kiện nhỏ để nâng cao nhận thức trong học sinh. Nhờ những việc làm của họ, nhiều học sinh ở trường Mai giờ đây suy nghĩ kỹ hơn về môi trường trước khi hành động.",
      "used": [
        "Adopt",
        "Eco-friendly",
        "Carbon footprint",
        "Litter",
        "Household appliances",
        "Energy",
        "Organic",
        "Recyclable",
        "Resource",
        "Sustainable",
        "Awareness",
        "Lifestyle"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🎵",
    "title": "MUSIC",
    "titleVi": "Âm nhạc",
    "words": [
      {
        "en": "Talented",
        "ipa": "/ˈtæləntɪd/",
        "vi": "Tài năng",
        "img": "https://img.invalid/talented.jpg",
        "ex": "She is a talented singer who can also play the guitar.",
        "trVi": "Cô ấy là một ca sĩ tài năng và cũng có thể chơi ghi-ta.",
        "trAnswer": "She is a talented singer who can also play the guitar.",
        "trKey": "talented"
      },
      {
        "en": "Judge",
        "ipa": "/dʒʌdʒ/",
        "vi": "Giám khảo",
        "img": "https://img.invalid/judge.jpg",
        "ex": "The judges praised his beautiful voice.",
        "trVi": "Các giám khảo khen ngợi giọng hát tuyệt vời của cậu ấy.",
        "trAnswer": "The judges praised his beautiful voice.",
        "trKey": "judge"
      },
      {
        "en": "Audience",
        "ipa": "/ˈɔːdiəns/",
        "vi": "Khán giả",
        "img": "https://img.invalid/audience.jpg",
        "ex": "The audience cheered loudly after the final song.",
        "trVi": "Khán giả reo hò lớn sau bài hát cuối cùng.",
        "trAnswer": "The audience cheered loudly after the final song.",
        "trKey": "audience"
      },
      {
        "en": "Single",
        "ipa": "/ˈsɪŋɡl/",
        "vi": "Đĩa đơn",
        "img": "https://img.invalid/single.jpg",
        "ex": "Her new single became popular within a few days.",
        "trVi": "Đĩa đơn mới của cô ấy trở nên nổi tiếng chỉ trong vài ngày.",
        "trAnswer": "Her new single became popular within a few days.",
        "trKey": "single"
      },
      {
        "en": "Perform",
        "ipa": "/pəˈfɔːm/",
        "vi": "Biểu diễn",
        "img": "https://img.invalid/perform.jpg",
        "ex": "The band will perform at the music festival this weekend.",
        "trVi": "Ban nhạc sẽ biểu diễn tại lễ hội âm nhạc cuối tuần này.",
        "trAnswer": "The band will perform at the music festival this weekend.",
        "trKey": "perform"
      },
      {
        "en": "Festival",
        "ipa": "/ˈfestɪvl/",
        "vi": "Lễ hội, liên hoan",
        "img": "https://img.invalid/festival.jpg",
        "ex": "Thousands of fans went to the music festival last summer.",
        "trVi": "Hàng nghìn người hâm mộ đã đến lễ hội âm nhạc vào mùa hè năm ngoái.",
        "trAnswer": "Thousands of fans went to the music festival last summer.",
        "trKey": "festival"
      },
      {
        "en": "Instrument",
        "ipa": "/ˈɪnstrəmənt/",
        "vi": "Nhạc cụ",
        "img": "https://img.invalid/instrument.jpg",
        "ex": "He taught himself to play several musical instruments.",
        "trVi": "Cậu ấy tự học chơi nhiều loại nhạc cụ.",
        "trAnswer": "He taught himself to play several musical instruments.",
        "trKey": "instrument"
      },
      {
        "en": "Eliminate",
        "ipa": "/ɪˈlɪmɪneɪt/",
        "vi": "Loại (khỏi cuộc thi)",
        "img": "https://img.invalid/eliminate.jpg",
        "ex": "The singer with the fewest votes will be eliminated.",
        "trVi": "Ca sĩ có ít phiếu bầu nhất sẽ bị loại.",
        "trAnswer": "The singer with the fewest votes will be eliminated.",
        "trKey": "eliminate"
      },
      {
        "en": "Participant",
        "ipa": "/pɑːˈtɪsɪpənt/",
        "vi": "Người tham dự, thí sinh",
        "img": "https://img.invalid/participant.jpg",
        "ex": "Every participant in the show has a chance to become famous.",
        "trVi": "Mỗi thí sinh trong chương trình đều có cơ hội trở nên nổi tiếng.",
        "trAnswer": "Every participant in the show has a chance to become famous.",
        "trKey": "participant"
      },
      {
        "en": "Upload",
        "ipa": "/ʌpˈləʊd/",
        "vi": "Tải lên",
        "img": "https://img.invalid/upload.jpg",
        "ex": "His mother uploaded his cover song to social media.",
        "trVi": "Mẹ cậu ấy đã tải video hát cover của cậu lên mạng xã hội.",
        "trAnswer": "His mother uploaded his cover song to social media.",
        "trKey": "upload"
      },
      {
        "en": "Reach",
        "ipa": "/riːtʃ/",
        "vi": "Đạt được (số lượng, thành tựu)",
        "img": "https://img.invalid/reach.jpg",
        "ex": "The video has reached more than one million views.",
        "trVi": "Video đã đạt hơn một triệu lượt xem.",
        "trAnswer": "The video has reached more than one million views.",
        "trKey": "reach"
      },
      {
        "en": "Attract",
        "ipa": "/əˈtrækt/",
        "vi": "Thu hút",
        "img": "https://img.invalid/attract.jpg",
        "ex": "Good music can attract fans of all ages.",
        "trVi": "Âm nhạc hay có thể thu hút người hâm mộ ở mọi lứa tuổi.",
        "trAnswer": "Good music can attract fans of all ages.",
        "trKey": "attract"
      }
    ],
    "story": {
      "title": "From Bedroom to Stage",
      "titleVi": "Từ căn phòng nhỏ đến sân khấu lớn",
      "text": "Long is a talented boy who loves playing musical instruments. Two years ago, his sister uploaded a video of him singing at home, and it quickly began to attract many viewers.<br><br>Soon, a local music festival invited him to perform. Long felt nervous walking in front of the audience for the first time, but he sang confidently and everyone clapped loudly.<br><br>Later, Long joined a singing competition on television. In the first round, the judges gave him positive comments, but many participants were eliminated each week. Long practised every day, and his popularity continued to reach new fans across the country.<br><br>After the competition, Long released his first single. It became a hit within a few weeks. Looking back, Long says he never expected that one small video would change his life and help him become a real artist.",
      "textVi": "Long là một cậu bé tài năng, yêu thích chơi các loại nhạc cụ. Hai năm trước, chị gái cậu đã tải lên một video cậu hát ở nhà, và video đó nhanh chóng thu hút nhiều người xem.<br><br>Chẳng bao lâu sau, một lễ hội âm nhạc địa phương đã mời cậu biểu diễn. Long cảm thấy hồi hộp khi lần đầu đứng trước khán giả, nhưng cậu đã hát rất tự tin và mọi người vỗ tay vang dội.<br><br>Sau đó, Long tham gia một cuộc thi hát trên truyền hình. Ở vòng đầu tiên, các giám khảo dành cho cậu những lời nhận xét tích cực, nhưng nhiều thí sinh bị loại mỗi tuần. Long chăm chỉ luyện tập mỗi ngày, và sự nổi tiếng của cậu tiếp tục đạt tới nhiều người hâm mộ mới trên khắp cả nước.<br><br>Sau cuộc thi, Long phát hành đĩa đơn đầu tay. Nó nhanh chóng trở thành bản hit chỉ trong vài tuần. Nhìn lại chặng đường đã qua, Long nói cậu chưa bao giờ nghĩ rằng một video nhỏ lại có thể thay đổi cuộc đời mình và giúp cậu trở thành một nghệ sĩ thực thụ.",
      "used": [
        "Talented",
        "Upload",
        "Attract",
        "Festival",
        "Perform",
        "Audience",
        "Judge",
        "Participant",
        "Eliminate",
        "Reach",
        "Single",
        "Instrument"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🤝",
    "title": "FOR A BETTER COMMUNITY",
    "titleVi": "Vì một cộng đồng tốt đẹp hơn",
    "words": [
      {
        "en": "Volunteer",
        "ipa": "/ˌvɒlənˈtɪə/",
        "vi": "Tình nguyện viên; làm tình nguyện",
        "img": "https://img.invalid/volunteer.jpg",
        "ex": "Kim decided to volunteer at the community centre every weekend.",
        "trVi": "Kim quyết định làm tình nguyện viên tại trung tâm cộng đồng vào mỗi cuối tuần.",
        "trAnswer": "Kim decided to volunteer at the community centre every weekend.",
        "trKey": "volunteer"
      },
      {
        "en": "Generous",
        "ipa": "/ˈdʒenərəs/",
        "vi": "Hào phóng",
        "img": "https://img.invalid/generous.jpg",
        "ex": "The local people were very generous and gave a lot of donations.",
        "trVi": "Người dân địa phương rất hào phóng và đã quyên góp rất nhiều.",
        "trAnswer": "The local people were very generous and gave a lot of donations.",
        "trKey": "generous"
      },
      {
        "en": "Remote",
        "ipa": "/rɪˈməʊt/",
        "vi": "Xa xôi, hẻo lánh",
        "img": "https://img.invalid/remote.jpg",
        "ex": "The volunteers brought books to children in a remote village.",
        "trVi": "Các tình nguyện viên mang sách đến cho trẻ em ở một ngôi làng xa xôi.",
        "trAnswer": "The volunteers brought books to children in a remote village.",
        "trKey": "remote"
      },
      {
        "en": "Benefit",
        "ipa": "/ˈbenɪfɪt/",
        "vi": "Lợi ích; mang lại lợi ích",
        "img": "https://img.invalid/benefit.jpg",
        "ex": "Volunteering activities benefit both the community and the volunteers themselves.",
        "trVi": "Các hoạt động tình nguyện mang lại lợi ích cho cả cộng đồng và chính các tình nguyện viên.",
        "trAnswer": "Volunteering activities benefit both the community and the volunteers themselves.",
        "trKey": "benefit"
      },
      {
        "en": "Donate",
        "ipa": "/dəʊˈneɪt/",
        "vi": "Quyên góp, hiến tặng",
        "img": "https://img.invalid/donate.jpg",
        "ex": "Many families donated clothes and books to the flooded areas.",
        "trVi": "Nhiều gia đình đã quyên góp quần áo và sách cho vùng bị lũ lụt.",
        "trAnswer": "Many families donated clothes and books to the flooded areas.",
        "trKey": "donate"
      },
      {
        "en": "Donation",
        "ipa": "/dəʊˈneɪʃn/",
        "vi": "Đồ quyên góp, sự quyên góp",
        "img": "https://img.invalid/donation.jpg",
        "ex": "The centre received generous donations from local people.",
        "trVi": "Trung tâm đã nhận được sự quyên góp hào phóng từ người dân địa phương.",
        "trAnswer": "The centre received generous donations from local people.",
        "trKey": "donation"
      },
      {
        "en": "Community",
        "ipa": "/kəˈmjuːnəti/",
        "vi": "Cộng đồng",
        "img": "https://img.invalid/community.jpg",
        "ex": "Our club always looks for ways to help the local community.",
        "trVi": "Câu lạc bộ của chúng tôi luôn tìm cách giúp đỡ cộng đồng địa phương.",
        "trAnswer": "Our club always looks for ways to help the local community.",
        "trKey": "community"
      },
      {
        "en": "Various",
        "ipa": "/ˈveəriəs/",
        "vi": "Khác nhau, đa dạng",
        "img": "https://img.invalid/various.jpg",
        "ex": "The club organised various activities for children at the orphanage.",
        "trVi": "Câu lạc bộ đã tổ chức nhiều hoạt động khác nhau cho trẻ em ở trại trẻ mồ côi.",
        "trAnswer": "The club organised various activities for children at the orphanage.",
        "trKey": "various"
      },
      {
        "en": "Participate",
        "ipa": "/pɑːˈtɪsɪpeɪt/",
        "vi": "Tham gia",
        "img": "https://img.invalid/participate.jpg",
        "ex": "Hundreds of students participated in the charity event.",
        "trVi": "Hàng trăm học sinh đã tham gia sự kiện từ thiện.",
        "trAnswer": "Hundreds of students participated in the charity event.",
        "trKey": "participate"
      },
      {
        "en": "Raise",
        "ipa": "/reɪz/",
        "vi": "Quyên góp, gây quỹ",
        "img": "https://img.invalid/raise.jpg",
        "ex": "The Volunteer Club raised money to help people in flooded areas.",
        "trVi": "Câu lạc bộ Tình nguyện đã quyên góp tiền để giúp đỡ người dân ở vùng lũ lụt.",
        "trAnswer": "The Volunteer Club raised money to help people in flooded areas.",
        "trKey": "raise"
      },
      {
        "en": "Deliver",
        "ipa": "/dɪˈlɪvə/",
        "vi": "Phân phát, giao",
        "img": "https://img.invalid/deliver.jpg",
        "ex": "Volunteers deliver free meals to old people every week.",
        "trVi": "Các tình nguyện viên phân phát bữa ăn miễn phí cho người già mỗi tuần.",
        "trAnswer": "Volunteers deliver free meals to old people every week.",
        "trKey": "deliver"
      },
      {
        "en": "Confidence",
        "ipa": "/ˈkɒnfɪdəns/",
        "vi": "Sự tự tin",
        "img": "https://img.invalid/confidence.jpg",
        "ex": "Volunteering activities can help teenagers build more confidence.",
        "trVi": "Các hoạt động tình nguyện có thể giúp thanh thiếu niên xây dựng thêm sự tự tin.",
        "trAnswer": "Volunteering activities can help teenagers build more confidence.",
        "trKey": "confidence"
      }
    ],
    "story": {
      "title": "The Volunteer Club",
      "titleVi": "Câu lạc bộ Tình nguyện",
      "text": "Every Saturday, Kim and her friends volunteer at a centre for community development. The centre helps people in remote areas and welcomes generous donations from anyone who wants to participate.<br><br>Last month, the club organised various activities to raise money for children in flooded areas. Some members donated their old books and clothes, while others helped deliver food and clean water to families in need.<br><br>Kim says that volunteering does more than benefit other people. Community work has also given her more confidence and taught her many useful skills. She has learnt how to work with different people and solve problems quickly.<br><br>At the end of each project, the club members always feel proud. They know that even a small donation can make a big difference to someone's life, and that a caring community starts with simple actions like these.",
      "textVi": "Mỗi thứ Bảy, Kim và các bạn của mình làm tình nguyện tại một trung tâm phát triển cộng đồng. Trung tâm này giúp đỡ người dân ở những khu vực xa xôi và luôn chào đón sự quyên góp hào phóng từ bất kỳ ai muốn tham gia.<br><br>Tháng trước, câu lạc bộ đã tổ chức nhiều hoạt động khác nhau để quyên góp tiền cho trẻ em ở vùng lũ lụt. Một số thành viên quyên góp sách và quần áo cũ, trong khi những người khác giúp phân phát thức ăn và nước sạch cho các gia đình cần giúp đỡ.<br><br>Kim nói rằng làm tình nguyện không chỉ mang lại lợi ích cho người khác. Công việc cộng đồng còn giúp cô tự tin hơn và dạy cho cô nhiều kỹ năng hữu ích. Cô đã học được cách làm việc với nhiều kiểu người khác nhau và giải quyết vấn đề nhanh chóng.<br><br>Sau mỗi dự án, các thành viên câu lạc bộ luôn cảm thấy tự hào. Họ biết rằng ngay cả một khoản quyên góp nhỏ cũng có thể tạo ra sự khác biệt lớn trong cuộc sống của ai đó, và một cộng đồng biết quan tâm luôn bắt đầu từ những hành động giản dị như thế.",
      "used": [
        "Volunteer",
        "Remote",
        "Generous",
        "Participate",
        "Various",
        "Raise",
        "Donate",
        "Deliver",
        "Benefit",
        "Confidence",
        "Community"
      ]
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "💡",
    "title": "INVENTIONS",
    "titleVi": "Những phát minh",
    "words": [
      {
        "en": "Invention",
        "ipa": "/ɪnˈvenʃn/",
        "vi": "Phát minh",
        "img": "https://img.invalid/invention.jpg",
        "ex": "The smartphone is one of the most useful inventions of our time.",
        "trVi": "Điện thoại thông minh là một trong những phát minh hữu ích nhất của thời đại chúng ta.",
        "trAnswer": "The smartphone is one of the most useful inventions of our time.",
        "trKey": "invention"
      },
      {
        "en": "Device",
        "ipa": "/dɪˈvaɪs/",
        "vi": "Thiết bị",
        "img": "https://img.invalid/device.jpg",
        "ex": "This small device can measure your heart rate.",
        "trVi": "Thiết bị nhỏ này có thể đo nhịp tim của bạn.",
        "trAnswer": "This small device can measure your heart rate.",
        "trKey": "device"
      },
      {
        "en": "Hardware",
        "ipa": "/ˈhɑːdweə/",
        "vi": "Phần cứng (máy tính)",
        "img": "https://img.invalid/hardware.jpg",
        "ex": "You should understand basic hardware before buying a new computer.",
        "trVi": "Bạn nên hiểu về phần cứng cơ bản trước khi mua một chiếc máy tính mới.",
        "trAnswer": "You should understand basic hardware before buying a new computer.",
        "trKey": "hardware"
      },
      {
        "en": "Software",
        "ipa": "/ˈsɒftweə/",
        "vi": "Phần mềm",
        "img": "https://img.invalid/software.jpg",
        "ex": "The school installed new software to help students learn maths.",
        "trVi": "Trường đã cài đặt phần mềm mới để giúp học sinh học toán.",
        "trAnswer": "The school installed new software to help students learn maths.",
        "trKey": "software"
      },
      {
        "en": "Laboratory",
        "ipa": "/ləˈbɒrətəri/",
        "vi": "Phòng thí nghiệm",
        "img": "https://img.invalid/laboratory.jpg",
        "ex": "Scientists tested the new invention in the laboratory.",
        "trVi": "Các nhà khoa học đã thử nghiệm phát minh mới trong phòng thí nghiệm.",
        "trAnswer": "Scientists tested the new invention in the laboratory.",
        "trKey": "laboratory"
      },
      {
        "en": "Experiment",
        "ipa": "/ɪkˈsperɪmənt/",
        "vi": "Thí nghiệm",
        "img": "https://img.invalid/experiment.jpg",
        "ex": "The students did an experiment to see how the machine worked.",
        "trVi": "Các học sinh đã làm một thí nghiệm để xem cỗ máy hoạt động như thế nào.",
        "trAnswer": "The students did an experiment to see how the machine worked.",
        "trKey": "experiment"
      },
      {
        "en": "Processor",
        "ipa": "/ˈprəʊsesə/",
        "vi": "Bộ xử lý",
        "img": "https://img.invalid/processor.jpg",
        "ex": "A faster processor helps the computer run more smoothly.",
        "trVi": "Bộ xử lý nhanh hơn giúp máy tính chạy mượt mà hơn.",
        "trAnswer": "A faster processor helps the computer run more smoothly.",
        "trKey": "processor"
      },
      {
        "en": "Artificial intelligence",
        "ipa": "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/",
        "vi": "Trí tuệ nhân tạo",
        "img": "https://img.invalid/artificial-intelligence.jpg",
        "ex": "Artificial intelligence can help robots understand human language.",
        "trVi": "Trí tuệ nhân tạo có thể giúp người máy hiểu ngôn ngữ con người.",
        "trAnswer": "Artificial intelligence can help robots understand human language.",
        "trKey": "artificial intelligence"
      },
      {
        "en": "Install",
        "ipa": "/ɪnˈstɔːl/",
        "vi": "Cài đặt",
        "img": "https://img.invalid/install.jpg",
        "ex": "Please install this app before the lesson starts.",
        "trVi": "Hãy cài đặt ứng dụng này trước khi buổi học bắt đầu.",
        "trAnswer": "Please install this app before the lesson starts.",
        "trKey": "install"
      },
      {
        "en": "Valuable",
        "ipa": "/ˈvæljuəbl/",
        "vi": "Có giá trị",
        "img": "https://img.invalid/valuable.jpg",
        "ex": "The Internet gives us access to valuable information every day.",
        "trVi": "Internet cho chúng ta tiếp cận với thông tin có giá trị mỗi ngày.",
        "trAnswer": "The Internet gives us access to valuable information every day.",
        "trKey": "valuable"
      },
      {
        "en": "Suitable",
        "ipa": "/ˈsjuːtəbl/",
        "vi": "Phù hợp",
        "img": "https://img.invalid/suitable.jpg",
        "ex": "This laptop is suitable for students who need a cheap, light device.",
        "trVi": "Chiếc laptop này phù hợp với học sinh cần một thiết bị rẻ và nhẹ.",
        "trAnswer": "This laptop is suitable for students who need a cheap, light device.",
        "trKey": "suitable"
      },
      {
        "en": "Application",
        "ipa": "/ˌæplɪˈkeɪʃn/",
        "vi": "Ứng dụng",
        "img": "https://img.invalid/application.jpg",
        "ex": "There are many educational applications for learning English.",
        "trVi": "Có rất nhiều ứng dụng giáo dục để học tiếng Anh.",
        "trAnswer": "There are many educational applications for learning English.",
        "trKey": "application"
      }
    ],
    "story": {
      "title": "Choosing the Right Invention",
      "titleVi": "Lựa chọn phát minh phù hợp",
      "text": "Phong has saved some money and wants to buy a new device for his studies. He cannot decide between a laptop and a smartphone.<br><br>His father explains that a laptop is often more suitable for typing long essays because it has better hardware and a full keyboard. However, a smartphone is smaller and allows Phong to install useful applications for learning anywhere.<br><br>At school, Phong's teacher shows the class an experiment in the science laboratory. She explains that many inventions today use artificial intelligence and powerful processors to solve problems faster than before. She adds that every invention, whether it is hardware or software, can be valuable if people use it wisely.<br><br>After thinking carefully, Phong decides to buy a laptop first, since it will help him with many subjects. He believes that as long as he chooses the invention that best fits his needs, he will make good progress in his studies.",
      "textVi": "Phong đã tiết kiệm được một ít tiền và muốn mua một thiết bị mới cho việc học. Cậu không thể quyết định nên mua một chiếc laptop hay một chiếc điện thoại thông minh.<br><br>Bố cậu giải thích rằng laptop thường phù hợp hơn để gõ những bài luận dài vì nó có phần cứng tốt hơn và bàn phím đầy đủ. Tuy nhiên, điện thoại thông minh thì nhỏ gọn hơn và cho phép Phong cài đặt các ứng dụng hữu ích để học ở bất cứ đâu.<br><br>Ở trường, giáo viên của Phong cho cả lớp xem một thí nghiệm trong phòng thí nghiệm khoa học. Cô giải thích rằng nhiều phát minh ngày nay sử dụng trí tuệ nhân tạo và bộ xử lý mạnh mẽ để giải quyết vấn đề nhanh hơn trước kia. Cô nói thêm rằng mọi phát minh, dù là phần cứng hay phần mềm, đều có thể trở nên có giá trị nếu con người biết sử dụng một cách khôn ngoan.<br><br>Sau khi suy nghĩ kỹ, Phong quyết định mua một chiếc laptop trước, vì nó sẽ giúp cậu học nhiều môn học khác nhau. Cậu tin rằng chỉ cần chọn được phát minh phù hợp nhất với nhu cầu của mình, cậu sẽ tiến bộ tốt trong việc học.",
      "used": [
        "Device",
        "Invention",
        "Hardware",
        "Install",
        "Application",
        "Experiment",
        "Laboratory",
        "Artificial intelligence",
        "Processor",
        "Valuable",
        "Suitable",
        "Software"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "⚖️",
    "title": "GENDER EQUALITY",
    "titleVi": "Bình đẳng giới",
    "words": [
      {
        "en": "Equal",
        "ipa": "/ˈiːkwəl/",
        "vi": "Bình đẳng, ngang nhau",
        "img": "https://img.invalid/equal.jpg",
        "ex": "Boys and girls should be given equal opportunities at school.",
        "trVi": "Con trai và con gái nên được trao cơ hội bình đẳng ở trường.",
        "trAnswer": "Boys and girls should be given equal opportunities at school.",
        "trKey": "equal"
      },
      {
        "en": "Equality",
        "ipa": "/iˈkwɒləti/",
        "vi": "Sự bình đẳng",
        "img": "https://img.invalid/equality.jpg",
        "ex": "Many organisations are working to promote gender equality.",
        "trVi": "Nhiều tổ chức đang nỗ lực thúc đẩy bình đẳng giới.",
        "trAnswer": "Many organisations are working to promote gender equality.",
        "trKey": "equality"
      },
      {
        "en": "Kindergarten",
        "ipa": "/ˈkɪndəɡɑːtn/",
        "vi": "Trường mẫu giáo",
        "img": "https://img.invalid/kindergarten.jpg",
        "ex": "My cousin works as a teacher at a kindergarten.",
        "trVi": "Anh họ tôi làm giáo viên ở một trường mẫu giáo.",
        "trAnswer": "My cousin works as a teacher at a kindergarten.",
        "trKey": "kindergarten"
      },
      {
        "en": "Surgeon",
        "ipa": "/ˈsɜːdʒən/",
        "vi": "Bác sĩ phẫu thuật",
        "img": "https://img.invalid/surgeon.jpg",
        "ex": "Both men and women can become excellent surgeons.",
        "trVi": "Cả nam và nữ đều có thể trở thành những bác sĩ phẫu thuật giỏi.",
        "trAnswer": "Both men and women can become excellent surgeons.",
        "trKey": "surgeon"
      },
      {
        "en": "Domestic violence",
        "ipa": "/dəˌmestɪk ˈvaɪələns/",
        "vi": "Bạo lực gia đình",
        "img": "https://img.invalid/domestic-violence.jpg",
        "ex": "Governments should take stronger action against domestic violence.",
        "trVi": "Chính phủ nên có hành động mạnh mẽ hơn để chống lại bạo lực gia đình.",
        "trAnswer": "Governments should take stronger action against domestic violence.",
        "trKey": "domestic violence"
      },
      {
        "en": "Uneducated",
        "ipa": "/ʌnˈedʒukeɪtɪd/",
        "vi": "Ít được học hành",
        "img": "https://img.invalid/uneducated.jpg",
        "ex": "More than half of the uneducated people in the world are women.",
        "trVi": "Hơn một nửa số người ít được học hành trên thế giới là phụ nữ.",
        "trAnswer": "More than half of the uneducated people in the world are women.",
        "trKey": "uneducated"
      },
      {
        "en": "Victim",
        "ipa": "/ˈvɪktɪm/",
        "vi": "Nạn nhân",
        "img": "https://img.invalid/victim.jpg",
        "ex": "Education can help protect girls from becoming victims of early marriage.",
        "trVi": "Giáo dục có thể giúp bảo vệ các bé gái khỏi trở thành nạn nhân của việc kết hôn sớm.",
        "trAnswer": "Education can help protect girls from becoming victims of early marriage.",
        "trKey": "victim"
      },
      {
        "en": "Pilot",
        "ipa": "/ˈpaɪlət/",
        "vi": "Phi công",
        "img": "https://img.invalid/pilot.jpg",
        "ex": "Lan dreams of becoming an airline pilot in the future.",
        "trVi": "Lan mơ ước trở thành phi công hàng không trong tương lai.",
        "trAnswer": "Lan dreams of becoming an airline pilot in the future.",
        "trKey": "pilot"
      },
      {
        "en": "Physical",
        "ipa": "/ˈfɪzɪkl/",
        "vi": "(thuộc) thể chất",
        "img": "https://img.invalid/physical.jpg",
        "ex": "This job requires both physical strength and patience.",
        "trVi": "Công việc này đòi hỏi cả sức mạnh thể chất lẫn sự kiên nhẫn.",
        "trAnswer": "This job requires both physical strength and patience.",
        "trKey": "physical"
      },
      {
        "en": "Skilful",
        "ipa": "/ˈskɪlfl/",
        "vi": "Khéo léo, lành nghề",
        "img": "https://img.invalid/skilful.jpg",
        "ex": "A skilful surgeon needs steady hands and excellent eyesight.",
        "trVi": "Một bác sĩ phẫu thuật khéo léo cần có đôi tay vững vàng và thị lực tốt.",
        "trAnswer": "A skilful surgeon needs steady hands and excellent eyesight.",
        "trKey": "skilful"
      },
      {
        "en": "Career",
        "ipa": "/kəˈrɪə/",
        "vi": "Sự nghiệp, nghề nghiệp",
        "img": "https://img.invalid/career.jpg",
        "ex": "She chose a career in medicine because she wants to help people.",
        "trVi": "Cô ấy chọn sự nghiệp trong ngành y vì muốn giúp đỡ mọi người.",
        "trAnswer": "She chose a career in medicine because she wants to help people.",
        "trKey": "career"
      },
      {
        "en": "Mental",
        "ipa": "/ˈmentl/",
        "vi": "(thuộc) tinh thần",
        "img": "https://img.invalid/mental.jpg",
        "ex": "Firefighters need both physical and mental strength for their job.",
        "trVi": "Lính cứu hỏa cần cả sức mạnh thể chất lẫn tinh thần cho công việc của mình.",
        "trAnswer": "Firefighters need both physical and mental strength for their job.",
        "trKey": "mental"
      }
    ],
    "story": {
      "title": "Equal Dreams",
      "titleVi": "Những ước mơ bình đẳng",
      "text": "At an international summer camp, Lan, Mark, and Linda are talking about their future careers. Mark wants to work at a kindergarten, while Linda dreams of becoming a surgeon.<br><br>Lan says that in some countries, girls are not allowed to become pilots or work in certain jobs because of old ideas about gender roles. She believes this is unfair, since both men and women can be skilful at almost any job if they are given equal opportunities.<br><br>Linda agrees. She explains that a surgeon needs physical and mental strength, but gender does not decide who has these qualities. Mark adds that gender equality also means fighting against problems such as domestic violence and helping uneducated girls, especially those who may become victims of unfair treatment, go to school.<br><br>By the end of the camp, the three friends agree that every person, boy or girl, deserves the same chance to follow their dream career.",
      "textVi": "Tại một trại hè quốc tế, Lan, Mark và Linda đang nói chuyện về nghề nghiệp tương lai của mình. Mark muốn làm việc ở một trường mẫu giáo, còn Linda thì mơ ước trở thành bác sĩ phẫu thuật.<br><br>Lan nói rằng ở một số quốc gia, các bé gái không được phép trở thành phi công hay làm một số công việc nhất định vì những quan niệm cũ về vai trò giới. Cô cho rằng điều này không công bằng, vì cả nam và nữ đều có thể khéo léo trong hầu hết mọi công việc nếu được trao cơ hội bình đẳng.<br><br>Linda đồng ý. Cô giải thích rằng một bác sĩ phẫu thuật cần có sức mạnh thể chất và tinh thần, nhưng giới tính không quyết định ai có những phẩm chất này. Mark nói thêm rằng bình đẳng giới cũng có nghĩa là đấu tranh chống lại những vấn đề như bạo lực gia đình và giúp những bé gái ít được học hành, đặc biệt là những em có thể trở thành nạn nhân của sự đối xử bất công, được đến trường.<br><br>Đến cuối trại hè, ba người bạn đều đồng ý rằng mỗi người, dù là con trai hay con gái, đều xứng đáng có cơ hội như nhau để theo đuổi sự nghiệp mơ ước của mình.",
      "used": [
        "Kindergarten",
        "Surgeon",
        "Pilot",
        "Skilful",
        "Equal",
        "Physical",
        "Mental",
        "Domestic violence",
        "Uneducated",
        "Victim",
        "Career"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🌐",
    "title": "VIET NAM AND INTERNATIONAL ORGANISATIONS",
    "titleVi": "Việt Nam và các tổ chức quốc tế",
    "words": [
      {
        "en": "Aim",
        "ipa": "/eɪm/",
        "vi": "Mục tiêu; đặt mục tiêu",
        "img": "https://img.invalid/aim.jpg",
        "ex": "The organisation's main aim is to reduce poverty.",
        "trVi": "Mục tiêu chính của tổ chức này là giảm nghèo đói.",
        "trAnswer": "The organisation's main aim is to reduce poverty.",
        "trKey": "aim"
      },
      {
        "en": "Commit",
        "ipa": "/kəˈmɪt/",
        "vi": "Cam kết",
        "img": "https://img.invalid/commit.jpg",
        "ex": "Viet Nam has committed to protecting children's rights.",
        "trVi": "Việt Nam đã cam kết bảo vệ quyền trẻ em.",
        "trAnswer": "Viet Nam has committed to protecting children's rights.",
        "trKey": "commit"
      },
      {
        "en": "Economic",
        "ipa": "/ˌiːkəˈnɒmɪk/",
        "vi": "Thuộc về kinh tế",
        "img": "https://img.invalid/economic.jpg",
        "ex": "Joining the WTO has helped Viet Nam's economic growth.",
        "trVi": "Việc gia nhập WTO đã giúp thúc đẩy tăng trưởng kinh tế của Việt Nam.",
        "trAnswer": "Joining the WTO has helped Viet Nam's economic growth.",
        "trKey": "economic"
      },
      {
        "en": "Essential",
        "ipa": "/ɪˈsenʃl/",
        "vi": "Cần thiết, thiết yếu",
        "img": "https://img.invalid/essential.jpg",
        "ex": "Life skills are essential for young people entering the job market.",
        "trVi": "Kỹ năng sống là điều cần thiết đối với thanh niên bước vào thị trường lao động.",
        "trAnswer": "Life skills are essential for young people entering the job market.",
        "trKey": "essential"
      },
      {
        "en": "Export",
        "ipa": "/ɪkˈspɔːt/",
        "vi": "Xuất khẩu",
        "img": "https://img.invalid/export.jpg",
        "ex": "Viet Nam exports a lot of rice and coffee to other countries.",
        "trVi": "Việt Nam xuất khẩu rất nhiều gạo và cà phê sang các nước khác.",
        "trAnswer": "Viet Nam exports a lot of rice and coffee to other countries.",
        "trKey": "export"
      },
      {
        "en": "Invest",
        "ipa": "/ɪnˈvest/",
        "vi": "Đầu tư",
        "img": "https://img.invalid/invest.jpg",
        "ex": "Foreign companies want to invest in Viet Nam's growing economy.",
        "trVi": "Các công ty nước ngoài muốn đầu tư vào nền kinh tế đang phát triển của Việt Nam.",
        "trAnswer": "Foreign companies want to invest in Viet Nam's growing economy.",
        "trKey": "invest"
      },
      {
        "en": "Peacekeeping",
        "ipa": "/ˈpiːskiːpɪŋ/",
        "vi": "Gìn giữ hòa bình",
        "img": "https://img.invalid/peacekeeping.jpg",
        "ex": "Viet Nam has sent officers to join UN peacekeeping activities.",
        "trVi": "Việt Nam đã cử sĩ quan tham gia các hoạt động gìn giữ hòa bình của Liên Hợp Quốc.",
        "trAnswer": "Viet Nam has sent officers to join UN peacekeeping activities.",
        "trKey": "peacekeeping"
      },
      {
        "en": "Poverty",
        "ipa": "/ˈpɒvəti/",
        "vi": "Sự nghèo đói",
        "img": "https://img.invalid/poverty.jpg",
        "ex": "The UN works with member countries to reduce poverty.",
        "trVi": "Liên Hợp Quốc hợp tác với các nước thành viên để giảm nghèo đói.",
        "trAnswer": "The UN works with member countries to reduce poverty.",
        "trKey": "poverty"
      },
      {
        "en": "Promote",
        "ipa": "/prəˈməʊt/",
        "vi": "Quảng bá, thúc đẩy",
        "img": "https://img.invalid/promote.jpg",
        "ex": "This organisation aims to promote education for children.",
        "trVi": "Tổ chức này nhằm mục đích thúc đẩy giáo dục cho trẻ em.",
        "trAnswer": "This organisation aims to promote education for children.",
        "trKey": "promote"
      },
      {
        "en": "Respect",
        "ipa": "/rɪˈspekt/",
        "vi": "Tôn trọng",
        "img": "https://img.invalid/respect.jpg",
        "ex": "Countries should respect each other to build good relationships.",
        "trVi": "Các quốc gia nên tôn trọng lẫn nhau để xây dựng mối quan hệ tốt đẹp.",
        "trAnswer": "Countries should respect each other to build good relationships.",
        "trKey": "respect"
      },
      {
        "en": "Technical",
        "ipa": "/ˈteknɪkl/",
        "vi": "Thuộc về kỹ thuật",
        "img": "https://img.invalid/technical.jpg",
        "ex": "UNDP provides technical support to help improve people's lives.",
        "trVi": "UNDP cung cấp hỗ trợ kỹ thuật để giúp cải thiện đời sống người dân.",
        "trAnswer": "UNDP provides technical support to help improve people's lives.",
        "trKey": "technical"
      },
      {
        "en": "Disadvantaged",
        "ipa": "/ˌdɪsədˈvɑːntɪdʒd/",
        "vi": "Thiệt thòi, kém may mắn",
        "img": "https://img.invalid/disadvantaged.jpg",
        "ex": "UNICEF helps disadvantaged children go to school.",
        "trVi": "UNICEF giúp đỡ trẻ em thiệt thòi được đến trường.",
        "trAnswer": "UNICEF helps disadvantaged children go to school.",
        "trKey": "disadvantaged"
      }
    ],
    "story": {
      "title": "Working Together with the World",
      "titleVi": "Cùng nhau hợp tác với thế giới",
      "text": "Since joining the United Nations in 1977, Viet Nam has become an active member of the international community. The country has committed to many important aims, such as reducing poverty and protecting the environment.<br><br>Organisations like UNICEF help disadvantaged children get access to education, while UNDP provides technical support to improve people's lives in rural areas. Viet Nam has also sent officers to take part in peacekeeping activities, showing respect for other nations and a desire for a peaceful world.<br><br>At the same time, joining international organisations has helped Viet Nam's economic growth. The country now exports goods to many markets and welcomes companies that want to invest here. These partnerships promote both cultural exchange and essential skills for Vietnamese workers.<br><br>Thanks to these efforts, Viet Nam continues to build stronger relationships with countries and organisations around the world, bringing benefits to people at home and abroad.",
      "textVi": "Kể từ khi gia nhập Liên Hợp Quốc vào năm 1977, Việt Nam đã trở thành một thành viên tích cực của cộng đồng quốc tế. Đất nước đã cam kết thực hiện nhiều mục tiêu quan trọng, như giảm nghèo đói và bảo vệ môi trường.<br><br>Các tổ chức như UNICEF giúp trẻ em thiệt thòi được tiếp cận giáo dục, trong khi UNDP cung cấp hỗ trợ kỹ thuật để cải thiện đời sống người dân ở vùng nông thôn. Việt Nam cũng đã cử sĩ quan tham gia các hoạt động gìn giữ hòa bình, thể hiện sự tôn trọng đối với các quốc gia khác và mong muốn về một thế giới hòa bình.<br><br>Đồng thời, việc gia nhập các tổ chức quốc tế đã giúp thúc đẩy tăng trưởng kinh tế của Việt Nam. Đất nước hiện xuất khẩu hàng hóa sang nhiều thị trường và chào đón các công ty muốn đầu tư tại đây. Những mối hợp tác này thúc đẩy cả giao lưu văn hóa lẫn các kỹ năng thiết yếu cho người lao động Việt Nam.<br><br>Nhờ những nỗ lực này, Việt Nam tiếp tục xây dựng mối quan hệ bền chặt hơn với các quốc gia và tổ chức trên khắp thế giới, mang lại lợi ích cho người dân trong và ngoài nước.",
      "used": [
        "Commit",
        "Aim",
        "Poverty",
        "Disadvantaged",
        "Technical",
        "Peacekeeping",
        "Respect",
        "Economic",
        "Export",
        "Invest",
        "Promote",
        "Essential"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "💻",
    "title": "NEW WAYS TO LEARN",
    "titleVi": "Những cách học mới",
    "words": [
      {
        "en": "Blended learning",
        "ipa": "/ˌblendɪd ˈlɜːnɪŋ/",
        "vi": "Học tập kết hợp",
        "img": "https://img.invalid/blended-learning.jpg",
        "ex": "Blended learning combines online videos with classroom lessons.",
        "trVi": "Học tập kết hợp là sự kết hợp giữa video trực tuyến và bài học trên lớp.",
        "trAnswer": "Blended learning combines online videos with classroom lessons.",
        "trKey": "blended learning"
      },
      {
        "en": "Face-to-face",
        "ipa": "/ˌfeɪs tə ˈfeɪs/",
        "vi": "Trực tiếp",
        "img": "https://img.invalid/face-to-face.jpg",
        "ex": "Kim prefers face-to-face learning because she can ask questions immediately.",
        "trVi": "Kim thích học trực tiếp hơn vì cô có thể đặt câu hỏi ngay lập tức.",
        "trAnswer": "Kim prefers face-to-face learning because she can ask questions immediately.",
        "trKey": "face-to-face"
      },
      {
        "en": "Online learning",
        "ipa": "/ˌɒnlaɪn ˈlɜːnɪŋ/",
        "vi": "Học trực tuyến",
        "img": "https://img.invalid/online-learning.jpg",
        "ex": "Online learning allows students to study anytime and anywhere.",
        "trVi": "Học trực tuyến cho phép học sinh học ở bất cứ đâu và bất cứ khi nào.",
        "trAnswer": "Online learning allows students to study anytime and anywhere.",
        "trKey": "online learning"
      },
      {
        "en": "Distraction",
        "ipa": "/dɪˈstrækʃn/",
        "vi": "Sự xao nhãng",
        "img": "https://img.invalid/distraction.jpg",
        "ex": "A quiet room helps reduce distractions while studying.",
        "trVi": "Một căn phòng yên tĩnh giúp giảm bớt sự xao nhãng khi học.",
        "trAnswer": "A quiet room helps reduce distractions while studying.",
        "trKey": "distraction"
      },
      {
        "en": "Strategy",
        "ipa": "/ˈstrætədʒi/",
        "vi": "Chiến lược",
        "img": "https://img.invalid/strategy.jpg",
        "ex": "Good teachers use different strategies to keep students focused.",
        "trVi": "Những giáo viên giỏi sử dụng nhiều chiến lược khác nhau để giúp học sinh tập trung.",
        "trAnswer": "Good teachers use different strategies to keep students focused.",
        "trKey": "strategy"
      },
      {
        "en": "Teamwork",
        "ipa": "/ˈtiːmwɜːk/",
        "vi": "Hoạt động nhóm, làm việc nhóm",
        "img": "https://img.invalid/teamwork.jpg",
        "ex": "Group projects help students develop good teamwork skills.",
        "trVi": "Các dự án nhóm giúp học sinh phát triển kỹ năng làm việc nhóm tốt.",
        "trAnswer": "Group projects help students develop good teamwork skills.",
        "trKey": "teamwork"
      },
      {
        "en": "Schedule",
        "ipa": "/ˈʃedjuːl/",
        "vi": "Lịch trình",
        "img": "https://img.invalid/schedule.jpg",
        "ex": "My brother made a study schedule to prepare for his exams.",
        "trVi": "Anh trai tôi đã lập một lịch trình học tập để chuẩn bị cho kỳ thi.",
        "trAnswer": "My brother made a study schedule to prepare for his exams.",
        "trKey": "schedule"
      },
      {
        "en": "Focus",
        "ipa": "/ˈfəʊkəs/",
        "vi": "Tập trung",
        "img": "https://img.invalid/focus.jpg",
        "ex": "It is hard to focus on lessons when there is too much noise.",
        "trVi": "Thật khó để tập trung vào bài học khi có quá nhiều tiếng ồn.",
        "trAnswer": "It is hard to focus on lessons when there is too much noise.",
        "trKey": "focus"
      },
      {
        "en": "Original",
        "ipa": "/əˈrɪdʒənl/",
        "vi": "Sáng tạo, độc đáo",
        "img": "https://img.invalid/original.jpg",
        "ex": "My classmates often share original ideas during group discussions.",
        "trVi": "Các bạn cùng lớp của tôi thường chia sẻ những ý tưởng độc đáo trong các buổi thảo luận nhóm.",
        "trAnswer": "My classmates often share original ideas during group discussions.",
        "trKey": "original"
      },
      {
        "en": "Exchange",
        "ipa": "/ɪksˈtʃeɪndʒ/",
        "vi": "Trao đổi",
        "img": "https://img.invalid/exchange.jpg",
        "ex": "Students can exchange comments and ideas on the online discussion board.",
        "trVi": "Học sinh có thể trao đổi bình luận và ý tưởng trên diễn đàn thảo luận trực tuyến.",
        "trAnswer": "Students can exchange comments and ideas on the online discussion board.",
        "trKey": "exchange"
      },
      {
        "en": "Digital",
        "ipa": "/ˈdɪdʒɪtl/",
        "vi": "Kỹ thuật số",
        "img": "https://img.invalid/digital.jpg",
        "ex": "Many schools now use digital technology to support learning.",
        "trVi": "Nhiều trường học hiện nay sử dụng công nghệ kỹ thuật số để hỗ trợ việc học.",
        "trAnswer": "Many schools now use digital technology to support learning.",
        "trKey": "digital"
      },
      {
        "en": "Connection",
        "ipa": "/kəˈnekʃn/",
        "vi": "Kết nối",
        "img": "https://img.invalid/connection.jpg",
        "ex": "You need a fast Internet connection to join an online class.",
        "trVi": "Bạn cần một kết nối Internet nhanh để tham gia lớp học trực tuyến.",
        "trAnswer": "You need a fast Internet connection to join an online class.",
        "trKey": "connection"
      }
    ],
    "story": {
      "title": "Two Ways to Learn",
      "titleVi": "Hai cách học khác nhau",
      "text": "Nick prefers face-to-face learning. He says that discussing with classmates in person, without any distraction, helps him focus better on each lesson. His teachers also use interesting strategies and teamwork activities to keep the class active.<br><br>Long, on the other hand, enjoys online learning. Since his school started using digital devices and blended learning, he can watch video lessons at home and follow his own schedule. He only needs a good Internet connection to join a class or exchange ideas with his classmates on a discussion board.<br><br>One day, the two friends talked about their different experiences. Nick admitted that online lessons can be convenient, while Long agreed that meeting teachers face-to-face sometimes helps him understand difficult topics faster.<br><br>In the end, both boys realised that no single way of learning is perfect. By combining original ideas from both online and face-to-face methods, students today have more chances than ever to learn in the way that suits them best.",
      "textVi": "Nick thích học trực tiếp hơn. Cậu nói rằng việc thảo luận trực tiếp với các bạn cùng lớp, không bị xao nhãng, giúp cậu tập trung tốt hơn vào từng bài học. Các giáo viên của cậu cũng sử dụng những chiến lược thú vị và hoạt động làm việc nhóm để giữ cho lớp học luôn sôi nổi.<br><br>Ngược lại, Long lại thích học trực tuyến. Kể từ khi trường cậu bắt đầu sử dụng các thiết bị kỹ thuật số và học tập kết hợp, cậu có thể xem các bài giảng video ở nhà và theo lịch trình riêng của mình. Cậu chỉ cần một kết nối Internet tốt để tham gia lớp học hoặc trao đổi ý tưởng với các bạn cùng lớp trên diễn đàn thảo luận.<br><br>Một ngày nọ, hai người bạn đã nói chuyện về những trải nghiệm khác nhau của mình. Nick thừa nhận rằng các bài học trực tuyến có thể rất tiện lợi, còn Long đồng ý rằng việc gặp giáo viên trực tiếp đôi khi giúp cậu hiểu những chủ đề khó nhanh hơn.<br><br>Cuối cùng, cả hai cậu bé đều nhận ra rằng không có cách học nào là hoàn hảo. Bằng cách kết hợp những ý tưởng độc đáo từ cả phương pháp trực tuyến và trực tiếp, học sinh ngày nay có nhiều cơ hội hơn bao giờ hết để học theo cách phù hợp nhất với mình.",
      "used": [
        "Face-to-face",
        "Distraction",
        "Focus",
        "Strategy",
        "Teamwork",
        "Online learning",
        "Digital",
        "Blended learning",
        "Schedule",
        "Connection",
        "Exchange",
        "Original"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🌳",
    "title": "PROTECTING THE ENVIRONMENT",
    "titleVi": "Bảo vệ môi trường",
    "words": [
      {
        "en": "Biodiversity",
        "ipa": "/ˌbaɪəʊdaɪˈvɜːsəti/",
        "vi": "Đa dạng sinh học",
        "img": "https://img.invalid/biodiversity.jpg",
        "ex": "Protecting forests helps maintain the biodiversity of our planet.",
        "trVi": "Bảo vệ rừng giúp duy trì sự đa dạng sinh học của hành tinh chúng ta.",
        "trAnswer": "Protecting forests helps maintain the biodiversity of our planet.",
        "trKey": "biodiversity"
      },
      {
        "en": "Habitat",
        "ipa": "/ˈhæbɪtæt/",
        "vi": "Môi trường sống",
        "img": "https://img.invalid/habitat.jpg",
        "ex": "Deforestation destroys the natural habitat of many wild animals.",
        "trVi": "Nạn phá rừng phá hủy môi trường sống tự nhiên của nhiều loài động vật hoang dã.",
        "trAnswer": "Deforestation destroys the natural habitat of many wild animals.",
        "trKey": "habitat"
      },
      {
        "en": "Climate change",
        "ipa": "/ˈklaɪmət tʃeɪndʒ/",
        "vi": "Sự thay đổi khí hậu, biến đổi khí hậu",
        "img": "https://img.invalid/climate-change.jpg",
        "ex": "Climate change is causing more extreme weather events around the world.",
        "trVi": "Biến đổi khí hậu đang gây ra nhiều hiện tượng thời tiết cực đoan hơn trên khắp thế giới.",
        "trAnswer": "Climate change is causing more extreme weather events around the world.",
        "trKey": "climate change"
      },
      {
        "en": "Ecosystem",
        "ipa": "/ˈiːkəʊˌsɪstəm/",
        "vi": "Hệ sinh thái",
        "img": "https://img.invalid/ecosystem.jpg",
        "ex": "Losing too many species can upset the balance of an ecosystem.",
        "trVi": "Mất đi quá nhiều loài có thể làm mất cân bằng hệ sinh thái.",
        "trAnswer": "Losing too many species can upset the balance of an ecosystem.",
        "trKey": "ecosystem"
      },
      {
        "en": "Deforestation",
        "ipa": "/ˌdiːfɒrɪˈsteɪʃn/",
        "vi": "Nạn phá rừng",
        "img": "https://img.invalid/deforestation.jpg",
        "ex": "Deforestation is one of the main causes of climate change.",
        "trVi": "Nạn phá rừng là một trong những nguyên nhân chính gây ra biến đổi khí hậu.",
        "trAnswer": "Deforestation is one of the main causes of climate change.",
        "trKey": "deforestation"
      },
      {
        "en": "Endangered",
        "ipa": "/ɪnˈdeɪndʒəd/",
        "vi": "Có nguy cơ tuyệt chủng",
        "img": "https://img.invalid/endangered.jpg",
        "ex": "Many endangered animals are disappearing because of illegal hunting.",
        "trVi": "Nhiều loài động vật có nguy cơ tuyệt chủng đang biến mất vì nạn săn bắt trái phép.",
        "trAnswer": "Many endangered animals are disappearing because of illegal hunting.",
        "trKey": "endangered"
      },
      {
        "en": "Wildlife",
        "ipa": "/ˈwaɪldlaɪf/",
        "vi": "Động vật hoang dã",
        "img": "https://img.invalid/wildlife.jpg",
        "ex": "The organisation works hard to protect wildlife around the world.",
        "trVi": "Tổ chức này nỗ lực hết mình để bảo vệ động vật hoang dã trên khắp thế giới.",
        "trAnswer": "The organisation works hard to protect wildlife around the world.",
        "trKey": "wildlife"
      },
      {
        "en": "Consequence",
        "ipa": "/ˈkɒnsɪkwəns/",
        "vi": "Hậu quả",
        "img": "https://img.invalid/consequence.jpg",
        "ex": "Air pollution can have serious consequences for our health.",
        "trVi": "Ô nhiễm không khí có thể gây ra những hậu quả nghiêm trọng cho sức khỏe của chúng ta.",
        "trAnswer": "Air pollution can have serious consequences for our health.",
        "trKey": "consequence"
      },
      {
        "en": "Balance",
        "ipa": "/ˈbæləns/",
        "vi": "Sự cân bằng",
        "img": "https://img.invalid/balance.jpg",
        "ex": "Protecting endangered species helps keep the balance of nature.",
        "trVi": "Bảo vệ các loài có nguy cơ tuyệt chủng giúp giữ gìn sự cân bằng của tự nhiên.",
        "trAnswer": "Protecting endangered species helps keep the balance of nature.",
        "trKey": "balance"
      },
      {
        "en": "Environmental protection",
        "ipa": "/ɪnˌvaɪrənˈmentl prəˈtekʃn/",
        "vi": "Bảo vệ môi trường",
        "img": "https://img.invalid/environmental-protection.jpg",
        "ex": "Nam is preparing a presentation about environmental protection.",
        "trVi": "Nam đang chuẩn bị một bài thuyết trình về bảo vệ môi trường.",
        "trAnswer": "Nam is preparing a presentation about environmental protection.",
        "trKey": "environmental protection"
      },
      {
        "en": "Global warming",
        "ipa": "/ˌɡləʊbl ˈwɔːmɪŋ/",
        "vi": "Sự nóng lên toàn cầu",
        "img": "https://img.invalid/global-warming.jpg",
        "ex": "Global warming is causing polar ice to melt faster than before.",
        "trVi": "Sự nóng lên toàn cầu đang khiến băng ở hai cực tan nhanh hơn trước.",
        "trAnswer": "Global warming is causing polar ice to melt faster than before.",
        "trKey": "global warming"
      },
      {
        "en": "Pollution",
        "ipa": "/pəˈluːʃn/",
        "vi": "Sự ô nhiễm",
        "img": "https://img.invalid/pollution.jpg",
        "ex": "Factories should reduce pollution to protect people's health.",
        "trVi": "Các nhà máy nên giảm ô nhiễm để bảo vệ sức khỏe con người.",
        "trAnswer": "Factories should reduce pollution to protect people's health.",
        "trKey": "pollution"
      }
    ],
    "story": {
      "title": "A Presentation on the Environment",
      "titleVi": "Bài thuyết trình về môi trường",
      "text": "Nam is preparing a presentation on environmental protection for his geography class. His father suggests that he should first identify some serious problems, such as global warming, deforestation, and pollution.<br><br>While doing research, Nam learns that climate change is affecting the habitat of many endangered animals. When forests disappear, the biodiversity of the whole ecosystem can be damaged, and this can bring serious consequences for both wildlife and people.<br><br>Nam's father advises him to focus on one issue and explain its causes and solutions clearly, instead of trying to cover everything at once. Nam decides to talk mainly about deforestation and its effect on the balance of nature.<br><br>In his presentation, Nam explains that protecting forests is one of the simplest ways to fight global warming and pollution. He hopes his classmates will understand that everyone has a responsibility to help maintain a healthy environment for future generations.",
      "textVi": "Nam đang chuẩn bị một bài thuyết trình về bảo vệ môi trường cho lớp địa lý của mình. Bố cậu gợi ý rằng trước tiên cậu nên xác định một số vấn đề nghiêm trọng, chẳng hạn như sự nóng lên toàn cầu, nạn phá rừng và ô nhiễm.<br><br>Trong khi tìm hiểu, Nam biết rằng biến đổi khí hậu đang ảnh hưởng đến môi trường sống của nhiều loài động vật có nguy cơ tuyệt chủng. Khi rừng biến mất, sự đa dạng sinh học của cả hệ sinh thái có thể bị tổn hại, và điều này có thể gây ra những hậu quả nghiêm trọng cho cả động vật hoang dã lẫn con người.<br><br>Bố Nam khuyên cậu nên tập trung vào một vấn đề và giải thích rõ nguyên nhân cũng như giải pháp, thay vì cố gắng đề cập đến mọi thứ cùng lúc. Nam quyết định nói chủ yếu về nạn phá rừng và ảnh hưởng của nó đến sự cân bằng của tự nhiên.<br><br>Trong bài thuyết trình của mình, Nam giải thích rằng bảo vệ rừng là một trong những cách đơn giản nhất để chống lại sự nóng lên toàn cầu và ô nhiễm. Cậu hy vọng các bạn cùng lớp sẽ hiểu rằng mọi người đều có trách nhiệm giúp duy trì một môi trường trong lành cho các thế hệ tương lai.",
      "used": [
        "Global warming",
        "Deforestation",
        "Pollution",
        "Climate change",
        "Habitat",
        "Endangered",
        "Biodiversity",
        "Ecosystem",
        "Consequence",
        "Wildlife",
        "Balance",
        "Environmental protection"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🌿",
    "title": "ECOTOURISM",
    "titleVi": "Du lịch sinh thái",
    "words": [
      {
        "en": "Ecotourism",
        "ipa": "/ˌiːkəʊˈtʊərɪzəm/",
        "vi": "Du lịch sinh thái",
        "img": "https://img.invalid/ecotourism.jpg",
        "ex": "Ecotourism allows tourists to explore nature without harming it.",
        "trVi": "Du lịch sinh thái cho phép du khách khám phá thiên nhiên mà không gây hại cho nó.",
        "trAnswer": "Ecotourism allows tourists to explore nature without harming it.",
        "trKey": "ecotourism"
      },
      {
        "en": "Explore",
        "ipa": "/ɪkˈsplɔː/",
        "vi": "Khám phá",
        "img": "https://img.invalid/explore.jpg",
        "ex": "The students were excited to explore Phong Nha Cave.",
        "trVi": "Các học sinh rất phấn khích khi được khám phá hang Phong Nha.",
        "trAnswer": "The students were excited to explore Phong Nha Cave.",
        "trKey": "explore"
      },
      {
        "en": "Protect",
        "ipa": "/prəˈtekt/",
        "vi": "Bảo vệ",
        "img": "https://img.invalid/protect.jpg",
        "ex": "Visitors should protect the cave and not take any stalactites.",
        "trVi": "Du khách nên bảo vệ hang động và không lấy bất kỳ nhũ đá nào.",
        "trAnswer": "Visitors should protect the cave and not take any stalactites.",
        "trKey": "protect"
      },
      {
        "en": "Souvenir",
        "ipa": "/ˌsuːvəˈnɪə/",
        "vi": "Quà lưu niệm",
        "img": "https://img.invalid/souvenir.jpg",
        "ex": "Mai bought a small souvenir to remember her trip to the Mekong Delta.",
        "trVi": "Mai đã mua một món quà lưu niệm nhỏ để nhớ về chuyến đi đến Đồng bằng sông Cửu Long.",
        "trAnswer": "Mai bought a small souvenir to remember her trip to the Mekong Delta.",
        "trKey": "souvenir"
      },
      {
        "en": "Impact",
        "ipa": "/ˈɪmpækt/",
        "vi": "Tác động",
        "img": "https://img.invalid/impact.jpg",
        "ex": "Tourism can have both a positive and a negative impact on the environment.",
        "trVi": "Du lịch có thể có cả tác động tích cực lẫn tiêu cực đến môi trường.",
        "trAnswer": "Tourism can have both a positive and a negative impact on the environment.",
        "trKey": "impact"
      },
      {
        "en": "Responsible",
        "ipa": "/rɪˈspɒnsəbl/",
        "vi": "Có trách nhiệm",
        "img": "https://img.invalid/responsible.jpg",
        "ex": "Responsible tourists always try to protect the places they visit.",
        "trVi": "Những du khách có trách nhiệm luôn cố gắng bảo vệ những nơi họ đến thăm.",
        "trAnswer": "Responsible tourists always try to protect the places they visit.",
        "trKey": "responsible"
      },
      {
        "en": "Culture",
        "ipa": "/ˈkʌltʃə/",
        "vi": "Văn hóa",
        "img": "https://img.invalid/culture.jpg",
        "ex": "Staying with local people helps tourists learn about their culture.",
        "trVi": "Ở lại với người dân địa phương giúp du khách tìm hiểu về văn hóa của họ.",
        "trAnswer": "Staying with local people helps tourists learn about their culture.",
        "trKey": "culture"
      },
      {
        "en": "Local",
        "ipa": "/ˈləʊkl/",
        "vi": "Tại địa phương",
        "img": "https://img.invalid/local.jpg",
        "ex": "Buying local products helps support the local community.",
        "trVi": "Mua sản phẩm địa phương giúp hỗ trợ cộng đồng địa phương.",
        "trAnswer": "Buying local products helps support the local community.",
        "trKey": "local"
      },
      {
        "en": "Sustainable tourism",
        "ipa": "/səˌsteɪnəbl ˈtʊərɪzəm/",
        "vi": "Du lịch bền vững",
        "img": "https://img.invalid/sustainable-tourism.jpg",
        "ex": "Sustainable tourism protects the environment while helping local people earn money.",
        "trVi": "Du lịch bền vững bảo vệ môi trường trong khi giúp người dân địa phương kiếm tiền.",
        "trAnswer": "Sustainable tourism protects the environment while helping local people earn money.",
        "trKey": "sustainable tourism"
      },
      {
        "en": "Litter",
        "ipa": "/ˈlɪtə/",
        "vi": "Xả rác",
        "img": "https://img.invalid/litter.jpg",
        "ex": "Tourists shouldn't litter on the beach or in the forest.",
        "trVi": "Du khách không nên xả rác trên bãi biển hoặc trong rừng.",
        "trAnswer": "Tourists shouldn't litter on the beach or in the forest.",
        "trKey": "litter"
      },
      {
        "en": "Trail",
        "ipa": "/treɪl/",
        "vi": "Đường mòn",
        "img": "https://img.invalid/trail.jpg",
        "ex": "We followed a quiet trail through the mountains near Sa Pa.",
        "trVi": "Chúng tôi đã đi theo một con đường mòn yên tĩnh xuyên qua những ngọn núi gần Sa Pa.",
        "trAnswer": "We followed a quiet trail through the mountains near Sa Pa.",
        "trKey": "trail"
      },
      {
        "en": "Profit",
        "ipa": "/ˈprɒfɪt/",
        "vi": "Lợi nhuận",
        "img": "https://img.invalid/profit.jpg",
        "ex": "Some of the tour's profit is used to protect the national park.",
        "trVi": "Một phần lợi nhuận của tour du lịch được dùng để bảo vệ vườn quốc gia.",
        "trAnswer": "Some of the tour's profit is used to protect the national park.",
        "trKey": "profit"
      }
    ],
    "story": {
      "title": "An Eco-friendly Fieldtrip",
      "titleVi": "Chuyến dã ngoại thân thiện với môi trường",
      "text": "Nam's class is going on a fieldtrip to explore Phong Nha Cave. Their teacher, Ms Hoa, explains that this year the trip will focus on ecotourism, so students must learn to protect the cave instead of just having fun.<br><br>Nam wants to take a small stalactite home as a souvenir, but Ms Hoa reminds him that it takes hundreds of years for one to form, so removing it would have a serious impact on the cave. Nam promises to be a more responsible visitor.<br><br>During the trip, the class stays on the marked trail, avoids littering, and learns about the local culture from a guide who grew up nearby. Ms Hoa explains that sustainable tourism like this helps local people earn a fair profit while protecting nature for future visitors.<br><br>By the end of the day, Nam understands that a truly memorable trip does not need to damage the environment. Instead, respecting nature and local culture can make an ecotour even more special.",
      "textVi": "Lớp của Nam sẽ có một chuyến dã ngoại để khám phá hang Phong Nha. Cô giáo Hoa giải thích rằng năm nay chuyến đi sẽ tập trung vào du lịch sinh thái, vì vậy học sinh phải học cách bảo vệ hang động thay vì chỉ vui chơi.<br><br>Nam muốn mang một mẩu nhũ đá nhỏ về nhà làm quà lưu niệm, nhưng cô Hoa nhắc cậu rằng phải mất hàng trăm năm để một nhũ đá hình thành, vì vậy việc lấy nó đi sẽ gây tác động nghiêm trọng đến hang động. Nam hứa sẽ trở thành một du khách có trách nhiệm hơn.<br><br>Trong suốt chuyến đi, cả lớp đi theo con đường mòn đã được đánh dấu, tránh xả rác, và tìm hiểu về văn hóa địa phương từ một hướng dẫn viên lớn lên gần đó. Cô Hoa giải thích rằng du lịch bền vững như thế này giúp người dân địa phương kiếm được lợi nhuận công bằng trong khi vẫn bảo vệ thiên nhiên cho những du khách trong tương lai.<br><br>Đến cuối ngày, Nam hiểu rằng một chuyến đi thực sự đáng nhớ không cần phải gây hại cho môi trường. Thay vào đó, việc tôn trọng thiên nhiên và văn hóa địa phương có thể khiến một chuyến du lịch sinh thái trở nên đặc biệt hơn.",
      "used": [
        "Ecotourism",
        "Explore",
        "Protect",
        "Souvenir",
        "Impact",
        "Responsible",
        "Trail",
        "Litter",
        "Local",
        "Culture",
        "Sustainable tourism",
        "Profit"
      ]
    }
  }
];
