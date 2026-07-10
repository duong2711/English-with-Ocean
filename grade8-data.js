// Dữ liệu từ vựng lớp 8 (THCS/THPT) — trích từ SGK Tiếng Anh 8 Global Success
// Mỗi unit gồm: từ vựng (words), bài đọc (story). Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE8_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🎨",
    "title": "LEISURE TIME",
    "titleVi": "Thời gian rảnh rỗi",
    "words": [
      {
        "en": "Knitting",
        "ipa": "/ˈnɪtɪŋ/",
        "vi": "Đan len",
        "img": "https://img.invalid/knitting.jpg",
        "ex": "I love knitting, building dollhouses, and making paper flowers.",
        "trVi": "Tôi thích đan len, làm nhà búp bê và làm hoa giấy.",
        "trAnswer": "I love knitting, building dollhouses, and making paper flowers.",
        "trKey": "knitting"
      },
      {
        "en": "DIY",
        "ipa": "/ˌdiː aɪ ˈwaɪ/",
        "vi": "Tự làm, tự chế",
        "img": "https://img.invalid/diy.jpg",
        "ex": "I'm keen on doing DIY.",
        "trVi": "Tôi rất thích tự tay làm đồ (DIY).",
        "trAnswer": "I'm keen on doing DIY.",
        "trKey": "diy"
      },
      {
        "en": "Keen on",
        "ipa": "/kiːn ɒn/",
        "vi": "Rất thích, đam mê",
        "img": "https://img.invalid/keen-on.jpg",
        "ex": "I'm keen on many DIY activities.",
        "trVi": "Tôi rất thích nhiều hoạt động tự làm đồ (DIY).",
        "trAnswer": "I'm keen on many DIY activities.",
        "trKey": "keen on"
      },
      {
        "en": "Crazy about",
        "ipa": "/ˈkreɪzi əˈbaʊt/",
        "vi": "Rất mê, cuồng nhiệt",
        "img": "https://img.invalid/crazy-about.jpg",
        "ex": "I'm crazy about taking photos.",
        "trVi": "Tôi rất mê chụp ảnh.",
        "trAnswer": "I'm crazy about taking photos.",
        "trKey": "crazy about"
      },
      {
        "en": "Fond of",
        "ipa": "/fɒnd ɒv/",
        "vi": "Thích, ưa thích",
        "img": "https://img.invalid/fond-of.jpg",
        "ex": "My sister is fond of cooking.",
        "trVi": "Chị tôi thích nấu ăn.",
        "trAnswer": "My sister is fond of cooking.",
        "trKey": "fond of"
      },
      {
        "en": "Surfing the net",
        "ipa": "/ˈsɜːfɪŋ ðə net/",
        "vi": "Lướt mạng",
        "img": "https://img.invalid/surfing-the-net.jpg",
        "ex": "My brother spends lots of time surfing the net.",
        "trVi": "Anh trai tôi dành nhiều thời gian lướt mạng.",
        "trAnswer": "My brother spends lots of time surfing the net.",
        "trKey": "surfing the net"
      },
      {
        "en": "Doing puzzles",
        "ipa": "/ˈduːɪŋ ˈpʌzlz/",
        "vi": "Giải câu đố",
        "img": "https://img.invalid/doing-puzzles.jpg",
        "ex": "Tom enjoys doing puzzles, especially Sudoku.",
        "trVi": "Tom thích giải câu đố, đặc biệt là Sudoku.",
        "trAnswer": "Tom enjoys doing puzzles, especially Sudoku.",
        "trKey": "doing puzzles"
      },
      {
        "en": "Building dollhouses",
        "ipa": "/ˈbɪldɪŋ ˈdɒlhaʊzɪz/",
        "vi": "Làm nhà búp bê",
        "img": "https://img.invalid/building-dollhouses.jpg",
        "ex": "I love knitting, building dollhouses, and making paper flowers.",
        "trVi": "Tôi thích đan len, làm nhà búp bê và làm hoa giấy.",
        "trAnswer": "I love knitting, building dollhouses, and making paper flowers.",
        "trKey": "building dollhouses"
      },
      {
        "en": "Messaging friends",
        "ipa": "/ˈmesɪdʒɪŋ frendz/",
        "vi": "Nhắn tin cho bạn bè",
        "img": "https://img.invalid/messaging-friends.jpg",
        "ex": "Messaging is a popular way for teens to spend their free time.",
        "trVi": "Nhắn tin là một cách phổ biến để thanh thiếu niên dành thời gian rảnh.",
        "trAnswer": "Messaging is a popular way for teens to spend their free time.",
        "trKey": "messaging friends"
      },
      {
        "en": "Detest",
        "ipa": "/dɪˈtest/",
        "vi": "Rất ghét, căm ghét",
        "img": "https://img.invalid/detest.jpg",
        "ex": "I detest hunting. I think it's cruel to harm animals.",
        "trVi": "Tôi rất ghét săn bắn. Tôi nghĩ điều đó thật tàn nhẫn với động vật.",
        "trAnswer": "I detest hunting. I think it's cruel to harm animals.",
        "trKey": "detest"
      },
      {
        "en": "Hang out",
        "ipa": "/hæŋ aʊt/",
        "vi": "Đi chơi, giao lưu",
        "img": "https://img.invalid/hang-out.jpg",
        "ex": "I usually hang out with my friends.",
        "trVi": "Tôi thường đi chơi cùng bạn bè.",
        "trAnswer": "I usually hang out with my friends.",
        "trKey": "hang out"
      }
    ],
    "story": {
      "title": "Leisure activities with family",
      "titleVi": "Hoạt động giải trí cùng gia đình",
      "text": "Some teenagers enjoy spending free time with their friends. Others prefer doing leisure activities with their family members. I love spending time with my family because it's a great way to connect with them.<br><br>At the weekend, we usually go for a bike ride. We cycle to some nearby villages to enjoy the fresh air. We take photos and look at them later. My big brother and I are also into cooking. My brother looks for easy recipes. After that, we prepare the ingredients and cook. Sometimes the food is good, but sometimes it isn't; nevertheless, we love whatever we cook. The leisure activity I like the most is doing DIY projects with my mum. She teaches me to make my own dresses and doll clothes. On special occasions, we make special dresses together. Once I won the first prize in a costume contest at my school.",
      "textVi": "Một số bạn thanh thiếu niên thích dành thời gian rảnh với bạn bè. Những bạn khác lại thích làm các hoạt động giải trí cùng người thân trong gia đình. Tôi thích dành thời gian với gia đình vì đó là một cách tuyệt vời để gắn kết với họ.<br><br>Vào cuối tuần, chúng tôi thường đi đạp xe. Chúng tôi đạp xe đến một vài ngôi làng gần đó để tận hưởng không khí trong lành. Chúng tôi chụp ảnh và xem lại sau đó. Anh trai tôi và tôi cũng rất thích nấu ăn. Anh tôi tìm những công thức nấu ăn đơn giản. Sau đó, chúng tôi chuẩn bị nguyên liệu và nấu. Đôi khi món ăn ngon, nhưng đôi khi lại không; dù vậy, chúng tôi vẫn thích bất cứ món gì mình nấu. Hoạt động giải trí tôi thích nhất là làm đồ thủ công (DIY) cùng mẹ. Mẹ dạy tôi cách tự may váy và quần áo cho búp bê. Vào những dịp đặc biệt, chúng tôi cùng nhau may những chiếc váy đặc biệt. Có lần tôi đã giành giải nhất trong một cuộc thi trang phục ở trường.",
      "used": []
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🌾",
    "title": "LIFE IN THE COUNTRYSIDE",
    "titleVi": "Cuộc sống ở nông thôn",
    "words": [
      {
        "en": "Paddy field",
        "ipa": "/ˈpædi fiːld/",
        "vi": "Ruộng lúa",
        "img": "https://img.invalid/paddy-field.jpg",
        "ex": "A place in which people grow rice is called a paddy field.",
        "trVi": "Nơi người ta trồng lúa được gọi là ruộng lúa.",
        "trAnswer": "A place in which people grow rice is called a paddy field.",
        "trKey": "paddy field"
      },
      {
        "en": "Combine harvester",
        "ipa": "/ˈkɒmbaɪn ˈhɑːvɪstər/",
        "vi": "Máy gặt đập liên hợp",
        "img": "https://img.invalid/combine-harvester.jpg",
        "ex": "People in my village use a combine harvester to harvest their rice.",
        "trVi": "Người dân trong làng tôi dùng máy gặt đập liên hợp để thu hoạch lúa.",
        "trAnswer": "People in my village use a combine harvester to harvest their rice.",
        "trKey": "combine harvester"
      },
      {
        "en": "Herd",
        "ipa": "/hɜːd/",
        "vi": "Chăn (gia súc)",
        "img": "https://img.invalid/herd.jpg",
        "ex": "Today it is my turn to herd the cows.",
        "trVi": "Hôm nay đến lượt tôi chăn bò.",
        "trAnswer": "Today it is my turn to herd the cows.",
        "trKey": "herd"
      },
      {
        "en": "Harvest time",
        "ipa": "/ˈhɑːvɪst taɪm/",
        "vi": "Mùa thu hoạch",
        "img": "https://img.invalid/harvest-time.jpg",
        "ex": "A busy time when people cut and gather their crops is called harvest time.",
        "trVi": "Khoảng thời gian bận rộn khi người ta cắt và thu gom mùa màng được gọi là mùa thu hoạch.",
        "trAnswer": "A busy time when people cut and gather their crops is called harvest time.",
        "trKey": "harvest time"
      },
      {
        "en": "Hospitable",
        "ipa": "/hɒˈspɪtəbl/",
        "vi": "Hiếu khách",
        "img": "https://img.invalid/hospitable.jpg",
        "ex": "The local people are kind and hospitable to visitors.",
        "trVi": "Người dân địa phương tốt bụng và hiếu khách với du khách.",
        "trAnswer": "The local people are kind and hospitable to visitors.",
        "trKey": "hospitable"
      },
      {
        "en": "Vast",
        "ipa": "/vɑːst/",
        "vi": "Rộng lớn, bao la",
        "img": "https://img.invalid/vast.jpg",
        "ex": "The scenery here is beautiful and picturesque with vast fields stretching long distances.",
        "trVi": "Phong cảnh ở đây đẹp và nên thơ với những cánh đồng bao la trải dài.",
        "trAnswer": "The scenery here is beautiful and picturesque with vast fields stretching long distances.",
        "trKey": "vast"
      },
      {
        "en": "Picturesque",
        "ipa": "/ˌpɪktʃəˈresk/",
        "vi": "Nên thơ, đẹp như tranh",
        "img": "https://img.invalid/picturesque.jpg",
        "ex": "The area around the village is famous for its picturesque landscape.",
        "trVi": "Khu vực xung quanh làng nổi tiếng với phong cảnh nên thơ.",
        "trAnswer": "The area around the village is famous for its picturesque landscape.",
        "trKey": "picturesque"
      },
      {
        "en": "Well-trained",
        "ipa": "/wel treɪnd/",
        "vi": "Được đào tạo bài bản",
        "img": "https://img.invalid/well-trained.jpg",
        "ex": "The workers in our factory are very well-trained because they took a lot of good training courses.",
        "trVi": "Công nhân trong nhà máy của chúng tôi rất lành nghề vì họ đã tham gia nhiều khóa đào tạo tốt.",
        "trAnswer": "The workers in our factory are very well-trained because they took a lot of good training courses.",
        "trKey": "well-trained"
      },
      {
        "en": "Cultivate",
        "ipa": "/ˈkʌltɪveɪt/",
        "vi": "Trồng trọt, canh tác",
        "img": "https://img.invalid/cultivate.jpg",
        "ex": "They grow vegetables, cultivate rice, and raise cattle.",
        "trVi": "Họ trồng rau, trồng lúa và chăn nuôi gia súc.",
        "trAnswer": "They grow vegetables, cultivate rice, and raise cattle.",
        "trKey": "cultivate"
      },
      {
        "en": "Orchard",
        "ipa": "/ˈɔːtʃəd/",
        "vi": "Vườn cây ăn trái",
        "img": "https://img.invalid/orchard.jpg",
        "ex": "Many families live by growing fruit trees in the orchards.",
        "trVi": "Nhiều gia đình sống bằng nghề trồng cây ăn trái trong vườn.",
        "trAnswer": "Many families live by growing fruit trees in the orchards.",
        "trKey": "orchard"
      },
      {
        "en": "Surrounded",
        "ipa": "/səˈraʊndɪd/",
        "vi": "Được bao quanh",
        "img": "https://img.invalid/surrounded.jpg",
        "ex": "The houses are surrounded by green trees.",
        "trVi": "Những ngôi nhà được bao quanh bởi cây xanh.",
        "trAnswer": "The houses are surrounded by green trees.",
        "trKey": "surrounded"
      }
    ],
    "story": {
      "title": "Life in a peaceful village",
      "titleVi": "Cuộc sống ở một ngôi làng yên bình",
      "text": "I feel fortunate that I am living in a peaceful village in southern Viet Nam. The scenery here is beautiful and picturesque with vast fields stretching long distances. The houses are surrounded by green trees. There are lakes, ponds, and canals here and there. The air is fresh and cool. Life here seems to move more slowly than in cities. The people work very hard. They grow vegetables, cultivate rice, and raise cattle. At harvest time, they use combine harvesters to harvest their crops. Many families live by growing fruit trees in the orchards. Others live by fishing in lakes, ponds, and canals.<br><br>Life in the village is very comfortable for children. They play traditional games. Sometimes they help their parents pick fruit and herd cattle.<br><br>People in my village know each other well. They are friendly and hospitable. They often meet each other in the evening, eating fruit, playing chess, singing folk songs, and chatting about everyday activities.",
      "textVi": "Tôi cảm thấy may mắn khi được sống ở một ngôi làng yên bình tại miền Nam Việt Nam. Phong cảnh ở đây đẹp và nên thơ với những cánh đồng bao la trải dài. Những ngôi nhà được bao quanh bởi cây xanh. Có những hồ, ao và kênh rạch rải rác khắp nơi. Không khí trong lành và mát mẻ. Cuộc sống ở đây dường như chậm rãi hơn so với ở thành phố. Người dân làm việc rất chăm chỉ. Họ trồng rau, trồng lúa và chăn nuôi gia súc. Vào mùa thu hoạch, họ dùng máy gặt đập liên hợp để thu hoạch mùa màng. Nhiều gia đình sống bằng nghề trồng cây ăn trái trong vườn. Những gia đình khác sống bằng nghề đánh bắt cá ở hồ, ao và kênh rạch.<br><br>Cuộc sống trong làng rất thoải mái đối với trẻ em. Các em chơi những trò chơi truyền thống. Đôi khi các em giúp bố mẹ hái trái cây và chăn gia súc.<br><br>Người dân trong làng tôi biết rõ về nhau. Họ thân thiện và hiếu khách. Họ thường gặp nhau vào buổi tối, ăn trái cây, chơi cờ, hát dân ca, và trò chuyện về những sinh hoạt thường ngày.",
      "used": [
        "Vast",
        "Picturesque",
        "Cultivate",
        "Orchard",
        "Surrounded",
        "Hospitable"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🎸",
    "title": "TEENAGERS",
    "titleVi": "Thanh thiếu niên",
    "words": [
      {
        "en": "Forum",
        "ipa": "/ˈfɔːrəm/",
        "vi": "Diễn đàn",
        "img": "https://img.invalid/forum.jpg",
        "ex": "We use Facebook for our class forum.",
        "trVi": "Chúng tôi dùng Facebook làm diễn đàn của lớp.",
        "trAnswer": "We use Facebook for our class forum.",
        "trKey": "forum"
      },
      {
        "en": "Stressful",
        "ipa": "/ˈstresfl/",
        "vi": "Căng thẳng",
        "img": "https://img.invalid/stressful.jpg",
        "ex": "We're preparing for the midterm tests. It's really stressful.",
        "trVi": "Chúng tôi đang chuẩn bị cho kỳ thi giữa kỳ. Việc đó thực sự rất căng thẳng.",
        "trAnswer": "We're preparing for the midterm tests. It's really stressful.",
        "trKey": "stressful"
      },
      {
        "en": "User-friendly",
        "ipa": "/ˈjuːzər ˈfrendli/",
        "vi": "Dễ sử dụng",
        "img": "https://img.invalid/user-friendly.jpg",
        "ex": "We chose Facebook because it's user-friendly.",
        "trVi": "Chúng tôi chọn Facebook vì nó dễ sử dụng.",
        "trAnswer": "We chose Facebook because it's user-friendly.",
        "trKey": "user-friendly"
      },
      {
        "en": "Upload",
        "ipa": "/ʌpˈləʊd/",
        "vi": "Tải lên",
        "img": "https://img.invalid/upload.jpg",
        "ex": "I upload videos and watch other people's videos.",
        "trVi": "Tôi tải video lên và xem video của người khác.",
        "trAnswer": "I upload videos and watch other people's videos.",
        "trKey": "upload"
      },
      {
        "en": "Notification",
        "ipa": "/ˌnəʊtɪfɪˈkeɪʃn/",
        "vi": "Thông báo",
        "img": "https://img.invalid/notification.jpg",
        "ex": "Tom checked the notifications and saw some new posts.",
        "trVi": "Tom kiểm tra các thông báo và thấy có vài bài đăng mới.",
        "trAnswer": "Tom checked the notifications and saw some new posts.",
        "trKey": "notification"
      },
      {
        "en": "Concentrate",
        "ipa": "/ˈkɒnsəntreɪt/",
        "vi": "Tập trung",
        "img": "https://img.invalid/concentrate.jpg",
        "ex": "Now I find that I can concentrate better.",
        "trVi": "Giờ tôi thấy mình có thể tập trung tốt hơn.",
        "trAnswer": "Now I find that I can concentrate better.",
        "trKey": "concentrate"
      },
      {
        "en": "Pressure",
        "ipa": "/ˈpreʃər/",
        "vi": "Áp lực",
        "img": "https://img.invalid/pressure.jpg",
        "ex": "We have pressure from our exams, peers, and parents.",
        "trVi": "Chúng tôi chịu áp lực từ kỳ thi, bạn bè và bố mẹ.",
        "trAnswer": "We have pressure from our exams, peers, and parents.",
        "trKey": "pressure"
      },
      {
        "en": "Community",
        "ipa": "/kəˈmjuːnəti/",
        "vi": "Cộng đồng",
        "img": "https://img.invalid/community.jpg",
        "ex": "The art teacher will help us connect with the community.",
        "trVi": "Cô giáo dạy mỹ thuật sẽ giúp chúng tôi kết nối với cộng đồng.",
        "trAnswer": "The art teacher will help us connect with the community.",
        "trKey": "community"
      },
      {
        "en": "Log on",
        "ipa": "/lɒɡ ɒn/",
        "vi": "Đăng nhập",
        "img": "https://img.invalid/log-on.jpg",
        "ex": "I log on to YouTube daily.",
        "trVi": "Tôi đăng nhập vào YouTube mỗi ngày.",
        "trAnswer": "I log on to YouTube daily.",
        "trKey": "log on"
      },
      {
        "en": "Coach",
        "ipa": "/kəʊtʃ/",
        "vi": "Huấn luyện viên, huấn luyện",
        "img": "https://img.invalid/coach.jpg",
        "ex": "Who will coach the guitar club? Mr Quang, a professional guitarist, will.",
        "trVi": "Ai sẽ huấn luyện câu lạc bộ đàn guitar? Thầy Quang, một nghệ sĩ guitar chuyên nghiệp, sẽ đảm nhận.",
        "trAnswer": "Who will coach the guitar club? Mr Quang, a professional guitarist, will.",
        "trKey": "coach"
      }
    ],
    "story": {
      "title": "Choosing school clubs",
      "titleVi": "Chọn câu lạc bộ ở trường",
      "text": "Tom is interested in two clubs: chess and badminton. Mai likes badminton because it's relaxing, and Tom plays it to keep fit, so they decide to join that club together. The badminton club meets on Tuesdays and Fridays, from 5:00 p.m. to 6:30 p.m.<br><br>Tom also likes chess. He started playing chess five years ago. His mum first sent him to a chess club because she wanted him to be more focused. Now he finds that he can concentrate better.<br><br>This year, there is a new arts and crafts club, and Mai wants to join it. Members can do art projects and also improve their practical skills and teamwork skills. Ms Hoa, the school art teacher, will coach the club and help students connect with the community.",
      "textVi": "Tom quan tâm đến hai câu lạc bộ: cờ vua và cầu lông. Mai thích cầu lông vì nó giúp thư giãn, còn Tom chơi để giữ dáng khỏe mạnh, vì vậy họ quyết định cùng tham gia câu lạc bộ đó. Câu lạc bộ cầu lông sinh hoạt vào thứ Ba và thứ Sáu, từ 5:00 chiều đến 6:30 chiều.<br><br>Tom cũng thích cờ vua. Cậu bắt đầu chơi cờ vua từ năm năm trước. Mẹ cậu đã gửi cậu đến câu lạc bộ cờ vua lúc đầu vì bà muốn cậu tập trung hơn. Giờ đây cậu nhận ra mình có thể tập trung tốt hơn.<br><br>Năm nay, có một câu lạc bộ mỹ thuật và thủ công mới, và Mai muốn tham gia. Các thành viên có thể thực hiện các dự án nghệ thuật và cũng cải thiện kỹ năng thực hành cũng như kỹ năng làm việc nhóm. Cô Hoa, giáo viên mỹ thuật của trường, sẽ huấn luyện câu lạc bộ này và giúp học sinh kết nối với cộng đồng.",
      "used": [
        "Concentrate",
        "Community"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🏘️",
    "title": "ETHNIC GROUPS OF VIET NAM",
    "titleVi": "Các dân tộc Việt Nam",
    "words": [
      {
        "en": "Stilt house",
        "ipa": "/stɪlt haʊs/",
        "vi": "Nhà sàn",
        "img": "https://img.invalid/stilt-house.jpg",
        "ex": "We call it a 'stilt house'. Our house overlooks terraced fields.",
        "trVi": "Chúng tôi gọi đó là 'nhà sàn'. Nhà chúng tôi nhìn ra những thửa ruộng bậc thang.",
        "trAnswer": "We call it a 'stilt house'. Our house overlooks terraced fields.",
        "trKey": "stilt house"
      },
      {
        "en": "Terraced fields",
        "ipa": "/ˈterəst fiːldz/",
        "vi": "Ruộng bậc thang",
        "img": "https://img.invalid/terraced-fields.jpg",
        "ex": "Our stilt house overlooks terraced fields.",
        "trVi": "Nhà sàn của chúng tôi nhìn ra những thửa ruộng bậc thang.",
        "trAnswer": "Our stilt house overlooks terraced fields.",
        "trKey": "terraced fields"
      },
      {
        "en": "Ethnic group",
        "ipa": "/ˈeθnɪk ɡruːp/",
        "vi": "Dân tộc",
        "img": "https://img.invalid/ethnic-group.jpg",
        "ex": "I'm from the Tay ethnic group. We are the second largest ethnic group in Viet Nam.",
        "trVi": "Tôi là người dân tộc Tày. Chúng tôi là dân tộc lớn thứ hai ở Việt Nam.",
        "trAnswer": "I'm from the Tay ethnic group. We are the second largest ethnic group in Viet Nam.",
        "trKey": "ethnic group"
      },
      {
        "en": "Musical instrument",
        "ipa": "/ˈmjuːzɪkl ˈɪnstrəmənt/",
        "vi": "Nhạc cụ",
        "img": "https://img.invalid/musical-instrument.jpg",
        "ex": "Minority groups have their own musical instruments like the dan tinh, gong, t'rung.",
        "trVi": "Các dân tộc thiểu số có những nhạc cụ riêng như đàn tính, cồng chiêng, đàn t'rưng.",
        "trAnswer": "Minority groups have their own musical instruments like the dan tinh, gong, t'rung.",
        "trKey": "musical instrument"
      },
      {
        "en": "Sticky rice",
        "ipa": "/ˈstɪki raɪs/",
        "vi": "Xôi, gạo nếp",
        "img": "https://img.invalid/sticky-rice.jpg",
        "ex": "We have our own five-colour sticky rice.",
        "trVi": "Chúng tôi có món xôi ngũ sắc riêng của mình.",
        "trAnswer": "We have our own five-colour sticky rice.",
        "trKey": "sticky rice"
      },
      {
        "en": "Weave",
        "ipa": "/wiːv/",
        "vi": "Dệt vải",
        "img": "https://img.invalid/weave.jpg",
        "ex": "Most mountain girls know how to weave clothing.",
        "trVi": "Hầu hết các cô gái vùng núi đều biết dệt vải.",
        "trAnswer": "Most mountain girls know how to weave clothing.",
        "trKey": "weave"
      },
      {
        "en": "Communal house",
        "ipa": "/kəˈmjuːnl haʊs/",
        "vi": "Nhà cộng đồng, nhà rông",
        "img": "https://img.invalid/communal-house.jpg",
        "ex": "A communal house is for community meetings and events.",
        "trVi": "Nhà cộng đồng là nơi diễn ra các cuộc họp và sự kiện chung của cộng đồng.",
        "trAnswer": "A communal house is for community meetings and events.",
        "trKey": "communal house"
      },
      {
        "en": "Raise livestock",
        "ipa": "/reɪz ˈlaɪvstɒk/",
        "vi": "Chăn nuôi gia súc",
        "img": "https://img.invalid/raise-livestock.jpg",
        "ex": "Children in both the lowlands and highlands help raise their family's livestock.",
        "trVi": "Trẻ em ở cả vùng thấp lẫn vùng cao đều giúp gia đình chăn nuôi gia súc.",
        "trAnswer": "Children in both the lowlands and highlands help raise their family's livestock.",
        "trKey": "raise livestock"
      },
      {
        "en": "Staircase",
        "ipa": "/ˈsteəkeɪs/",
        "vi": "Cầu thang",
        "img": "https://img.invalid/staircase.jpg",
        "ex": "People climb a seven- or nine-step staircase to enter the house.",
        "trVi": "Người ta leo qua cầu thang bảy hoặc chín bậc để vào nhà.",
        "trAnswer": "People climb a seven- or nine-step staircase to enter the house.",
        "trKey": "staircase"
      },
      {
        "en": "Minority",
        "ipa": "/maɪˈnɒrəti/",
        "vi": "Dân tộc thiểu số",
        "img": "https://img.invalid/minority.jpg",
        "ex": "There are fewer Nung than Kinh, so they are an ethnic minority.",
        "trVi": "Người Nùng ít hơn người Kinh, nên họ là một dân tộc thiểu số.",
        "trAnswer": "There are fewer Nung than Kinh, so they are an ethnic minority.",
        "trKey": "minority"
      }
    ],
    "story": {
      "title": "Stilt houses",
      "titleVi": "Nhà sàn",
      "text": "Stilt houses are popular among different ethnic minority groups, from the Thai in the Northern Highlands to the Khmer in the Mekong Delta. The houses come in different sizes and styles, and show the traditional culture of their owners.<br><br>Stilt houses are made from natural materials like wood, bamboo, and leaves. They stand on strong posts, about two or three metres above the ground. This allows them to keep people safe from wild animals. People climb a seven- or nine-step staircase to enter the house. The most important place in the house is the kitchen. It has an open fire in the middle of the house. It is the place for family gatherings and receiving guests.<br><br>The stilt houses of the Tay and Nung usually overlook a field. The stilt houses of the Thai, however, face mountains or a forest. The Bahnar and Ede have a communal house (called a Rong house) as the heart of their village. These communal houses are the largest and tallest ones in the village.",
      "textVi": "Nhà sàn phổ biến trong nhiều dân tộc thiểu số khác nhau, từ người Thái ở vùng núi phía Bắc đến người Khmer ở đồng bằng sông Cửu Long. Những ngôi nhà này có nhiều kích cỡ và kiểu dáng khác nhau, thể hiện nền văn hóa truyền thống của chủ nhân.<br><br>Nhà sàn được làm từ các vật liệu tự nhiên như gỗ, tre và lá. Chúng đứng trên những cột trụ chắc chắn, cao khoảng hai đến ba mét so với mặt đất. Điều này giúp con người an toàn trước thú dữ. Người ta leo qua cầu thang bảy hoặc chín bậc để vào nhà. Nơi quan trọng nhất trong nhà là gian bếp. Nơi đây có bếp lửa ở giữa nhà. Đây là nơi diễn ra các buổi sum họp gia đình và tiếp đón khách.<br><br>Nhà sàn của người Tày và người Nùng thường nhìn ra cánh đồng. Trong khi đó, nhà sàn của người Thái lại quay mặt về phía núi hoặc rừng. Người Bahnar và Ê Đê có một ngôi nhà cộng đồng (gọi là nhà Rông) là trung tâm của buôn làng. Những ngôi nhà cộng đồng này là những ngôi nhà lớn nhất và cao nhất trong làng.",
      "used": [
        "Stilt house",
        "Staircase",
        "Communal house"
      ]
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🎊",
    "title": "OUR CUSTOMS AND TRADITIONS",
    "titleVi": "Phong tục và truyền thống",
    "words": [
      {
        "en": "Custom",
        "ipa": "/ˈkʌstəm/",
        "vi": "Phong tục",
        "img": "https://img.invalid/custom.jpg",
        "ex": "It is becoming a custom for many families in Viet Nam to celebrate Women's Day and Family Day.",
        "trVi": "Việc tổ chức Ngày Phụ nữ và Ngày Gia đình đang trở thành một phong tục của nhiều gia đình Việt Nam.",
        "trAnswer": "It is becoming a custom for many families in Viet Nam to celebrate Women's Day and Family Day.",
        "trKey": "custom"
      },
      {
        "en": "Tradition",
        "ipa": "/trəˈdɪʃn/",
        "vi": "Truyền thống",
        "img": "https://img.invalid/tradition.jpg",
        "ex": "Janet is from a family of doctors, but she broke with tradition when she went to an art college.",
        "trVi": "Janet xuất thân từ một gia đình có truyền thống làm bác sĩ, nhưng cô đã phá vỡ truyền thống khi theo học trường nghệ thuật.",
        "trAnswer": "Janet is from a family of doctors, but she broke with tradition when she went to an art college.",
        "trKey": "tradition"
      },
      {
        "en": "Ornamental tree",
        "ipa": "/ˌɔːnəˈmentl triː/",
        "vi": "Cây cảnh",
        "img": "https://img.invalid/ornamental-tree.jpg",
        "ex": "My dad bought an ornamental kumquat tree for Tet.",
        "trVi": "Bố tôi đã mua một cây quất cảnh cho dịp Tết.",
        "trAnswer": "My dad bought an ornamental kumquat tree for Tet.",
        "trKey": "ornamental tree"
      },
      {
        "en": "Blooming flowers",
        "ipa": "/ˈbluːmɪŋ ˈflaʊəz/",
        "vi": "Hoa nở rộ",
        "img": "https://img.invalid/blooming-flowers.jpg",
        "ex": "Many people visit flower villages to take pictures with the blooming flowers.",
        "trVi": "Nhiều người đến các làng hoa để chụp ảnh cùng những bông hoa đang nở rộ.",
        "trAnswer": "Many people visit flower villages to take pictures with the blooming flowers.",
        "trKey": "blooming flowers"
      },
      {
        "en": "Family reunion",
        "ipa": "/ˈfæməli riˈjuːniən/",
        "vi": "Đoàn tụ gia đình",
        "img": "https://img.invalid/family-reunion.jpg",
        "ex": "We have a tradition of holding a family reunion on the first day of Tet.",
        "trVi": "Chúng tôi có truyền thống tổ chức đoàn tụ gia đình vào ngày đầu tiên của Tết.",
        "trAnswer": "We have a tradition of holding a family reunion on the first day of Tet.",
        "trKey": "family reunion"
      },
      {
        "en": "Worship",
        "ipa": "/ˈwɜːʃɪp/",
        "vi": "Thờ cúng",
        "img": "https://img.invalid/worship.jpg",
        "ex": "Traditionally, the Vietnamese prepare offerings to worship their ancestors during Tet.",
        "trVi": "Theo truyền thống, người Việt chuẩn bị đồ cúng để thờ cúng tổ tiên vào dịp Tết.",
        "trAnswer": "Traditionally, the Vietnamese prepare offerings to worship their ancestors during Tet.",
        "trKey": "worship"
      },
      {
        "en": "Offering",
        "ipa": "/ˈɒfərɪŋ/",
        "vi": "Đồ cúng, lễ vật",
        "img": "https://img.invalid/offering.jpg",
        "ex": "My mum puts in a lot of effort to prepare offerings to worship our ancestors.",
        "trVi": "Mẹ tôi bỏ ra rất nhiều công sức để chuẩn bị đồ cúng thờ cúng tổ tiên.",
        "trAnswer": "My mum puts in a lot of effort to prepare offerings to worship our ancestors.",
        "trKey": "offering"
      },
      {
        "en": "Martial arts",
        "ipa": "/ˈmɑːʃl ɑːts/",
        "vi": "Võ thuật",
        "img": "https://img.invalid/martial-arts.jpg",
        "ex": "She broke with family tradition by not practising martial arts.",
        "trVi": "Cô ấy đã phá vỡ truyền thống gia đình khi không luyện tập võ thuật.",
        "trAnswer": "She broke with family tradition by not practising martial arts.",
        "trKey": "martial arts"
      },
      {
        "en": "Longevity",
        "ipa": "/lɒnˈdʒevəti/",
        "vi": "Trường thọ",
        "img": "https://img.invalid/longevity.jpg",
        "ex": "Holding a party to wish our grandparents longevity is one of the customs we practise at Tet.",
        "trVi": "Tổ chức tiệc để chúc ông bà trường thọ là một trong những phong tục chúng tôi thực hiện vào dịp Tết.",
        "trAnswer": "Holding a party to wish our grandparents longevity is one of the customs we practise at Tet.",
        "trKey": "longevity"
      },
      {
        "en": "Festival goers",
        "ipa": "/ˈfestɪvl ˈɡəʊəz/",
        "vi": "Người tham dự lễ hội",
        "img": "https://img.invalid/festival-goers.jpg",
        "ex": "The atmosphere becomes loud with the sound of drums and cheers of festival goers.",
        "trVi": "Không khí trở nên náo nhiệt với tiếng trống và tiếng reo hò của những người tham dự lễ hội.",
        "trAnswer": "The atmosphere becomes loud with the sound of drums and cheers of festival goers.",
        "trKey": "festival goers"
      }
    ],
    "story": {
      "title": "A village festival",
      "titleVi": "Lễ hội làng",
      "text": "I live in a small village in northern Viet Nam. Every year, people in my village look forward to the third day of Tet. It is one of our most important festival days.<br><br>In the morning, we gather along the riverside to watch some competitions. First, there is a special boat race. Some team members cook rice on the boat, others row the boat as fast as they can. The fastest team with well-cooked rice wins the race. Then, the referee releases a duck into the middle of the river. Contestants jump into the river to catch it. The atmosphere becomes loud with the sound of drums and cheers of festival goers.<br><br>At noon, there is a village party at the communal house for the elders. Each family also holds a home party. We enjoy traditional dishes like sticky rice and steamed chicken. Sometimes, we also have food that children love, such as burgers and even pizzas!<br><br>The village festival helps us maintain our traditions, connect with other people, and strengthen our family bonds.",
      "textVi": "Tôi sống ở một ngôi làng nhỏ tại miền Bắc Việt Nam. Hằng năm, người dân trong làng tôi đều mong chờ đến ngày mùng Ba Tết. Đây là một trong những ngày lễ hội quan trọng nhất của chúng tôi.<br><br>Vào buổi sáng, chúng tôi tụ tập dọc theo bờ sông để xem một số cuộc thi. Đầu tiên là cuộc đua thuyền đặc biệt. Một số thành viên trong đội nấu cơm ngay trên thuyền, những người khác thì chèo thuyền thật nhanh. Đội nào về đích nhanh nhất với cơm chín ngon sẽ thắng cuộc. Sau đó, trọng tài thả một con vịt xuống giữa sông. Những người tham gia sẽ nhảy xuống sông để bắt nó. Không khí trở nên náo nhiệt với tiếng trống và tiếng reo hò của những người tham dự lễ hội.<br><br>Vào buổi trưa, có một bữa tiệc làng tại nhà cộng đồng dành cho người cao tuổi. Mỗi gia đình cũng tổ chức một bữa tiệc tại nhà. Chúng tôi thưởng thức những món ăn truyền thống như xôi và gà luộc. Đôi khi, chúng tôi cũng có những món ăn mà trẻ em yêu thích như bánh burger và thậm chí cả pizza!<br><br>Lễ hội làng giúp chúng tôi gìn giữ truyền thống, kết nối với mọi người, và thắt chặt tình cảm gia đình.",
      "used": [
        "Festival goers"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🏔️",
    "title": "LIFESTYLES",
    "titleVi": "Lối sống",
    "words": [
      {
        "en": "Lifestyle",
        "ipa": "/ˈlaɪfstaɪl/",
        "vi": "Lối sống",
        "img": "https://img.invalid/lifestyle.jpg",
        "ex": "The lifestyle is interesting and different from that in my country.",
        "trVi": "Lối sống ở đây thú vị và khác với lối sống ở đất nước tôi.",
        "trAnswer": "The lifestyle is interesting and different from that in my country.",
        "trKey": "lifestyle"
      },
      {
        "en": "Dogsled",
        "ipa": "/ˈdɒɡsled/",
        "vi": "Xe trượt tuyết do chó kéo",
        "img": "https://img.invalid/dogsled.jpg",
        "ex": "The dogsled is still used as a means of transport in Alaska today.",
        "trVi": "Xe trượt tuyết do chó kéo vẫn được dùng như một phương tiện di chuyển ở Alaska ngày nay.",
        "trAnswer": "The dogsled is still used as a means of transport in Alaska today.",
        "trKey": "dogsled"
      },
      {
        "en": "Native art",
        "ipa": "/ˈneɪtɪv ɑːt/",
        "vi": "Nghệ thuật bản địa",
        "img": "https://img.invalid/native-art.jpg",
        "ex": "The gallery in the city centre has an excellent collection of native art.",
        "trVi": "Phòng trưng bày ở trung tâm thành phố có một bộ sưu tập nghệ thuật bản địa tuyệt vời.",
        "trAnswer": "The gallery in the city centre has an excellent collection of native art.",
        "trKey": "native art"
      },
      {
        "en": "Tribal dance",
        "ipa": "/ˈtraɪbl dɑːns/",
        "vi": "Điệu múa của bộ tộc",
        "img": "https://img.invalid/tribal-dance.jpg",
        "ex": "We all joined in the tribal dances when we attended the local festival.",
        "trVi": "Tất cả chúng tôi đều tham gia các điệu múa của bộ tộc khi đến dự lễ hội địa phương.",
        "trAnswer": "We all joined in the tribal dances when we attended the local festival.",
        "trKey": "tribal dance"
      },
      {
        "en": "Weaving",
        "ipa": "/ˈwiːvɪŋ/",
        "vi": "Dệt vải, đan lát",
        "img": "https://img.invalid/weaving.jpg",
        "ex": "Hoa is very keen on weaving. She loves to knit gloves after school.",
        "trVi": "Hoa rất thích dệt/đan lát. Cô bé thích đan găng tay sau giờ học.",
        "trAnswer": "Hoa is very keen on weaving. She loves to knit gloves after school.",
        "trKey": "weaving"
      },
      {
        "en": "Making crafts",
        "ipa": "/ˈmeɪkɪŋ krɑːfts/",
        "vi": "Làm đồ thủ công",
        "img": "https://img.invalid/making-crafts.jpg",
        "ex": "The traditional craft of the villagers is making crafts like bamboo baskets.",
        "trVi": "Nghề thủ công truyền thống của dân làng là làm các đồ thủ công như giỏ tre.",
        "trAnswer": "The traditional craft of the villagers is making crafts like bamboo baskets.",
        "trKey": "making crafts"
      },
      {
        "en": "Means of transport",
        "ipa": "/miːnz əv ˈtrænspɔːt/",
        "vi": "Phương tiện di chuyển",
        "img": "https://img.invalid/means-of-transport.jpg",
        "ex": "Dog sledding is more of a sport than a true means of transport now.",
        "trVi": "Trượt tuyết bằng chó ngày nay giống một môn thể thao hơn là một phương tiện di chuyển thực sự.",
        "trAnswer": "Dog sledding is more of a sport than a true means of transport now.",
        "trKey": "means of transport"
      },
      {
        "en": "Maintain traditions",
        "ipa": "/meɪnˈteɪn trəˈdɪʃnz/",
        "vi": "Gìn giữ truyền thống",
        "img": "https://img.invalid/maintain-traditions.jpg",
        "ex": "The native peoples in Alaska still maintain many of their traditions.",
        "trVi": "Người bản địa ở Alaska vẫn gìn giữ nhiều truyền thống của họ.",
        "trAnswer": "The native peoples in Alaska still maintain many of their traditions.",
        "trKey": "maintain traditions"
      },
      {
        "en": "Population",
        "ipa": "/ˌpɒpjuˈleɪʃn/",
        "vi": "Dân số",
        "img": "https://img.invalid/population.jpg",
        "ex": "Alaska has a small population of about 730,000.",
        "trVi": "Alaska có dân số nhỏ, khoảng 730.000 người.",
        "trAnswer": "Alaska has a small population of about 730,000.",
        "trKey": "population"
      },
      {
        "en": "In the habit of",
        "ipa": "/ɪn ðə ˈhæbɪt əv/",
        "vi": "Có thói quen",
        "img": "https://img.invalid/in-the-habit-of.jpg",
        "ex": "Many adults are in the habit of having breakfast outside of their homes.",
        "trVi": "Nhiều người lớn có thói quen ăn sáng bên ngoài nhà.",
        "trAnswer": "Many adults are in the habit of having breakfast outside of their homes.",
        "trKey": "in the habit of"
      }
    ],
    "story": {
      "title": "Traditional lifestyle in Alaska",
      "titleVi": "Lối sống truyền thống ở Alaska",
      "text": "If you go to the American state of Alaska, you might find the traditional lifestyle there interesting. Although Alaska is quite large, with nearly 1.7 million square kilometres, it has a small population of about 730,000.<br><br>The native peoples in Alaska still maintain many of their traditions. They keep their old ways of making arts and crafts alive. Various native groups have their own special styles of carving or weaving as well as their unique tribal dances and drumming. Therefore, visitors to Alaska may experience some of their culture in their villages. They may see performances of traditional music and native art in galleries and museums.<br><br>Alaska is also known for its unusual method of transport - the dogsled. Today, dog sledding (= mushing) is more of a sport than a true means of transport. The best-known race is the Iditarod Trail Sled Dog Race, a 1,510 km race from Anchorage to Nome. Mushers from all over the world come to Anchorage each March to compete for cash and prizes.",
      "textVi": "Nếu bạn đến bang Alaska của Mỹ, bạn có thể thấy lối sống truyền thống ở đó rất thú vị. Mặc dù Alaska khá rộng lớn, với diện tích gần 1,7 triệu km vuông, nhưng dân số ở đây chỉ khoảng 730.000 người.<br><br>Người bản địa ở Alaska vẫn gìn giữ nhiều truyền thống của họ. Họ vẫn duy trì những cách làm đồ thủ công mỹ nghệ truyền thống. Các nhóm bản địa khác nhau có phong cách chạm khắc hoặc dệt vải riêng, cũng như những điệu múa và nhịp trống đặc trưng của bộ tộc mình. Vì vậy, du khách đến Alaska có thể trải nghiệm một phần văn hóa của họ ngay tại các bản làng. Du khách cũng có thể xem các buổi biểu diễn âm nhạc truyền thống và nghệ thuật bản địa tại các phòng trưng bày và bảo tàng.<br><br>Alaska cũng nổi tiếng với phương tiện di chuyển độc đáo - xe trượt tuyết do chó kéo. Ngày nay, môn trượt tuyết bằng chó mang tính chất một môn thể thao nhiều hơn là một phương tiện di chuyển thực thụ. Cuộc đua nổi tiếng nhất là giải Iditarod Trail Sled Dog Race, một cuộc đua dài 1.510 km từ Anchorage đến Nome. Những người đua xe trượt tuyết từ khắp nơi trên thế giới đến Anchorage vào tháng Ba hằng năm để tranh tài giành tiền thưởng và giải thưởng.",
      "used": [
        "Dogsled",
        "Population",
        "Maintain traditions"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🌳",
    "title": "ENVIRONMENTAL PROTECTION",
    "titleVi": "Bảo vệ môi trường",
    "words": [
      {
        "en": "Carbon footprint",
        "ipa": "/ˈkɑːbən ˈfʊtprɪnt/",
        "vi": "Lượng khí thải carbon",
        "img": "https://img.invalid/carbon-footprint.jpg",
        "ex": "We can reduce our carbon footprint even in our homes.",
        "trVi": "Chúng ta có thể giảm lượng khí thải carbon của mình ngay tại nhà.",
        "trAnswer": "We can reduce our carbon footprint even in our homes.",
        "trKey": "carbon footprint"
      },
      {
        "en": "Endangered species",
        "ipa": "/ɪnˈdeɪndʒəd ˈspiːʃiːz/",
        "vi": "Loài có nguy cơ tuyệt chủng",
        "img": "https://img.invalid/endangered-species.jpg",
        "ex": "We can volunteer at some local environment programmes to save endangered species.",
        "trVi": "Chúng ta có thể tham gia tình nguyện tại một số chương trình môi trường địa phương để bảo vệ các loài có nguy cơ tuyệt chủng.",
        "trAnswer": "We can volunteer at some local environment programmes to save endangered species.",
        "trKey": "endangered species"
      },
      {
        "en": "Ecosystem",
        "ipa": "/ˈiːkəʊsɪstəm/",
        "vi": "Hệ sinh thái",
        "img": "https://img.invalid/ecosystem.jpg",
        "ex": "The ecosystem here is very diverse with thousands of species.",
        "trVi": "Hệ sinh thái ở đây rất đa dạng với hàng nghìn loài.",
        "trAnswer": "The ecosystem here is very diverse with thousands of species.",
        "trKey": "ecosystem"
      },
      {
        "en": "Habitat",
        "ipa": "/ˈhæbɪtæt/",
        "vi": "Môi trường sống",
        "img": "https://img.invalid/habitat.jpg",
        "ex": "The panda's natural habitat is the bamboo forest.",
        "trVi": "Môi trường sống tự nhiên của gấu trúc là rừng tre.",
        "trAnswer": "The panda's natural habitat is the bamboo forest.",
        "trKey": "habitat"
      },
      {
        "en": "Global warming",
        "ipa": "/ˈɡləʊbl ˈwɔːmɪŋ/",
        "vi": "Sự nóng lên toàn cầu",
        "img": "https://img.invalid/global-warming.jpg",
        "ex": "I can think of some environmental problems like global warming, endangered species loss.",
        "trVi": "Tôi có thể nghĩ ra một số vấn đề môi trường như sự nóng lên toàn cầu, mất mát các loài có nguy cơ tuyệt chủng.",
        "trAnswer": "I can think of some environmental problems like global warming, endangered species loss.",
        "trKey": "global warming"
      },
      {
        "en": "Single-use products",
        "ipa": "/ˈsɪŋɡl juːs ˈprɒdʌkts/",
        "vi": "Sản phẩm dùng một lần",
        "img": "https://img.invalid/single-use-products.jpg",
        "ex": "We should reduce the consumption of single-use products like plastic bottles and bags.",
        "trVi": "Chúng ta nên giảm việc tiêu thụ các sản phẩm dùng một lần như chai và túi nhựa.",
        "trAnswer": "We should reduce the consumption of single-use products like plastic bottles and bags.",
        "trKey": "single-use products"
      },
      {
        "en": "National park",
        "ipa": "/ˈnæʃnəl pɑːk/",
        "vi": "Vườn quốc gia",
        "img": "https://img.invalid/national-park.jpg",
        "ex": "In Viet Nam, there are now 34 national parks.",
        "trVi": "Ở Việt Nam hiện nay có 34 vườn quốc gia.",
        "trAnswer": "In Viet Nam, there are now 34 national parks.",
        "trKey": "national park"
      },
      {
        "en": "Marine life",
        "ipa": "/məˈriːn laɪf/",
        "vi": "Sinh vật biển",
        "img": "https://img.invalid/marine-life.jpg",
        "ex": "Con Dao National Park provides a rich ecosystem for marine life.",
        "trVi": "Vườn quốc gia Côn Đảo cung cấp một hệ sinh thái phong phú cho các sinh vật biển.",
        "trAnswer": "Con Dao National Park provides a rich ecosystem for marine life.",
        "trKey": "marine life"
      },
      {
        "en": "Pollution",
        "ipa": "/pəˈluːʃn/",
        "vi": "Ô nhiễm",
        "img": "https://img.invalid/pollution.jpg",
        "ex": "Pollution is a serious problem everywhere.",
        "trVi": "Ô nhiễm là một vấn đề nghiêm trọng ở khắp mọi nơi.",
        "trAnswer": "Pollution is a serious problem everywhere.",
        "trKey": "pollution"
      },
      {
        "en": "Wildlife",
        "ipa": "/ˈwaɪldlaɪf/",
        "vi": "Động vật hoang dã",
        "img": "https://img.invalid/wildlife.jpg",
        "ex": "A national park is a special area for the protection of the environment and wildlife.",
        "trVi": "Vườn quốc gia là một khu vực đặc biệt để bảo vệ môi trường và động vật hoang dã.",
        "trAnswer": "A national park is a special area for the protection of the environment and wildlife.",
        "trKey": "wildlife"
      }
    ],
    "story": {
      "title": "Con Dao National Park",
      "titleVi": "Vườn quốc gia Côn Đảo",
      "text": "Today, there are national parks all over the world, and the number is rising all the time. A national park is a special area for the protection of the environment and wildlife.<br><br>In Viet Nam, there are now 34 national parks. Con Dao National Park is one of them. It became a national park in 1993. The park is in Con Dao District, Ba Ria-Vung Tau Province. It contains 16 small islands covering 20,000 hectares. The ecosystem here is very diverse with thousands of species, including marine animals. Many species of corals as well as sea turtles, dolphins, and endangered dugongs live here as well. The park is also home to a lot of valuable kinds of woods and medicinal plants. Three ancient trees in the park were named 'Vietnamese Heritage Trees'.<br><br>Con Dao National Park, like other national parks, plays a key role in saving endangered species as well as protecting the environment and natural resources. It also helps raise the awareness of local residents about the importance of nature.",
      "textVi": "Ngày nay, có các vườn quốc gia trên khắp thế giới, và số lượng này vẫn đang không ngừng tăng lên. Vườn quốc gia là một khu vực đặc biệt dành để bảo vệ môi trường và động vật hoang dã.<br><br>Ở Việt Nam, hiện nay có 34 vườn quốc gia. Vườn quốc gia Côn Đảo là một trong số đó. Nó trở thành vườn quốc gia vào năm 1993. Vườn nằm ở huyện Côn Đảo, tỉnh Bà Rịa - Vũng Tàu. Nó bao gồm 16 hòn đảo nhỏ với tổng diện tích 20.000 héc-ta. Hệ sinh thái ở đây rất đa dạng với hàng nghìn loài, bao gồm cả các loài sinh vật biển. Nhiều loài san hô cũng như rùa biển, cá heo, và loài dugong (bò biển) đang có nguy cơ tuyệt chủng cũng sinh sống ở đây. Vườn quốc gia còn là nơi có nhiều loại gỗ quý và cây thuốc quý giá. Ba cây cổ thụ trong vườn đã được công nhận là 'Cây Di sản Việt Nam'.<br><br>Vườn quốc gia Côn Đảo, cũng như các vườn quốc gia khác, đóng vai trò quan trọng trong việc bảo vệ các loài có nguy cơ tuyệt chủng cũng như bảo vệ môi trường và tài nguyên thiên nhiên. Nó cũng giúp nâng cao nhận thức của người dân địa phương về tầm quan trọng của thiên nhiên.",
      "used": [
        "Ecosystem",
        "Marine life",
        "National park"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🛍️",
    "title": "SHOPPING",
    "titleVi": "Mua sắm",
    "words": [
      {
        "en": "Open-air market",
        "ipa": "/ˈəʊpən eər ˈmɑːkɪt/",
        "vi": "Chợ ngoài trời",
        "img": "https://img.invalid/open-air-market.jpg",
        "ex": "Bac Ha Fair is an open-air market in Lao Cai.",
        "trVi": "Chợ phiên Bắc Hà là một khu chợ ngoài trời ở Lào Cai.",
        "trAnswer": "Bac Ha Fair is an open-air market in Lao Cai.",
        "trKey": "open-air market"
      },
      {
        "en": "Home-made",
        "ipa": "/həʊm meɪd/",
        "vi": "Tự làm tại nhà",
        "img": "https://img.invalid/home-made.jpg",
        "ex": "Most of the products sold at the market were home-grown and home-made.",
        "trVi": "Hầu hết các sản phẩm bán ở chợ đều được tự trồng và tự làm tại nhà.",
        "trAnswer": "Most of the products sold at the market were home-grown and home-made.",
        "trKey": "home-made"
      },
      {
        "en": "Bargain",
        "ipa": "/ˈbɑːɡɪn/",
        "vi": "Mặc cả, trả giá",
        "img": "https://img.invalid/bargain.jpg",
        "ex": "I don't have to bargain. All the items have fixed prices.",
        "trVi": "Tôi không cần phải mặc cả. Tất cả các mặt hàng đều có giá cố định.",
        "trAnswer": "I don't have to bargain. All the items have fixed prices.",
        "trKey": "bargain"
      },
      {
        "en": "Price tag",
        "ipa": "/praɪs tæɡ/",
        "vi": "Nhãn giá",
        "img": "https://img.invalid/price-tag.jpg",
        "ex": "How much is this T-shirt? I cannot see the price tag.",
        "trVi": "Chiếc áo phông này giá bao nhiêu? Tôi không thấy nhãn giá.",
        "trAnswer": "How much is this T-shirt? I cannot see the price tag.",
        "trKey": "price tag"
      },
      {
        "en": "Convenience store",
        "ipa": "/kənˈviːniəns stɔːr/",
        "vi": "Cửa hàng tiện lợi",
        "img": "https://img.invalid/convenience-store.jpg",
        "ex": "I want to go to a convenience store on the way.",
        "trVi": "Tôi muốn ghé qua cửa hàng tiện lợi trên đường đi.",
        "trAnswer": "I want to go to a convenience store on the way.",
        "trKey": "convenience store"
      },
      {
        "en": "Shopaholic",
        "ipa": "/ˌʃɒpəˈhɒlɪk/",
        "vi": "Người nghiện mua sắm",
        "img": "https://img.invalid/shopaholic.jpg",
        "ex": "She's a shopaholic. She spends too much time and money shopping.",
        "trVi": "Cô ấy là một người nghiện mua sắm. Cô ấy dành quá nhiều thời gian và tiền bạc để mua sắm.",
        "trAnswer": "She's a shopaholic. She spends too much time and money shopping.",
        "trKey": "shopaholic"
      },
      {
        "en": "Wide range of products",
        "ipa": "/waɪd reɪndʒ əv ˈprɒdʌkts/",
        "vi": "Đa dạng sản phẩm",
        "img": "https://img.invalid/wide-range-of-products.jpg",
        "ex": "Both online and offline supermarkets offer a wide range of products.",
        "trVi": "Cả siêu thị trực tuyến và siêu thị truyền thống đều cung cấp đa dạng sản phẩm.",
        "trAnswer": "Both online and offline supermarkets offer a wide range of products.",
        "trKey": "wide range of products"
      },
      {
        "en": "Entertainment",
        "ipa": "/ˌentəˈteɪnmənt/",
        "vi": "Sự giải trí",
        "img": "https://img.invalid/entertainment.jpg",
        "ex": "Shopping centres often offer year-round free entertainment for customers of all ages.",
        "trVi": "Các trung tâm mua sắm thường cung cấp dịch vụ giải trí miễn phí quanh năm cho khách hàng ở mọi lứa tuổi.",
        "trAnswer": "Shopping centres often offer year-round free entertainment for customers of all ages.",
        "trKey": "entertainment"
      },
      {
        "en": "Shopping mall",
        "ipa": "/ˈʃɒpɪŋ mɔːl/",
        "vi": "Trung tâm mua sắm",
        "img": "https://img.invalid/shopping-mall.jpg",
        "ex": "They go there and chat while walking through the shopping malls.",
        "trVi": "Họ đến đó và trò chuyện trong khi dạo qua các trung tâm mua sắm.",
        "trAnswer": "They go there and chat while walking through the shopping malls.",
        "trKey": "shopping mall"
      },
      {
        "en": "Well-lit",
        "ipa": "/wel lɪt/",
        "vi": "Đủ ánh sáng, sáng sủa",
        "img": "https://img.invalid/well-lit.jpg",
        "ex": "They enjoy walking for one or two hours in clean and well-lit areas.",
        "trVi": "Họ thích đi bộ trong một hoặc hai giờ ở những khu vực sạch sẽ và đủ ánh sáng.",
        "trAnswer": "They enjoy walking for one or two hours in clean and well-lit areas.",
        "trKey": "well-lit"
      }
    ],
    "story": {
      "title": "Shopping centres",
      "titleVi": "Trung tâm mua sắm",
      "text": "Shopping centres attract a lot of customers, especially at the weekend, on holidays, or during sales. People go there to shop. Shopping centres offer a wide range of products to choose from. Customers can touch the products and try on clothes and shoes. This makes them feel more comfortable when they decide to buy something.<br><br>However, people also go to shopping centres for many other reasons. Some people go there for entertainment. These centres often offer year-round free entertainment for customers of all ages such as live music and special performances. During holidays, shoppers join in the holiday excitement. It's a good way to relax. Some people go there just to hang out with friends. They go there and chat while walking through the shopping malls. Others visit shopping centres to get exercise. They enjoy walking for one or two hours in clean and well-lit areas. Some people even go there to avoid the heat or cold outside. Shopping centres offer free air conditioning and heating.",
      "textVi": "Các trung tâm mua sắm thu hút rất nhiều khách hàng, đặc biệt là vào cuối tuần, các ngày lễ, hoặc trong các đợt giảm giá. Mọi người đến đó để mua sắm. Các trung tâm mua sắm cung cấp đa dạng sản phẩm để lựa chọn. Khách hàng có thể chạm vào sản phẩm và thử quần áo, giày dép. Điều này khiến họ cảm thấy thoải mái hơn khi quyết định mua một món đồ nào đó.<br><br>Tuy nhiên, mọi người cũng đến các trung tâm mua sắm vì nhiều lý do khác. Một số người đến đó để giải trí. Các trung tâm này thường cung cấp dịch vụ giải trí miễn phí quanh năm cho khách hàng ở mọi lứa tuổi như nhạc sống và các buổi biểu diễn đặc biệt. Vào các dịp lễ, người mua sắm hòa mình vào không khí lễ hội. Đây là một cách hay để thư giãn. Một số người đến đó chỉ để gặp gỡ bạn bè. Họ đến đó và trò chuyện trong khi dạo bước qua các trung tâm mua sắm. Những người khác ghé thăm trung tâm mua sắm để tập thể dục. Họ thích đi bộ trong một hoặc hai giờ ở những khu vực sạch sẽ và đủ ánh sáng. Một số người thậm chí đến đó để tránh nóng hoặc tránh lạnh bên ngoài. Các trung tâm mua sắm cung cấp máy điều hòa và sưởi ấm miễn phí.",
      "used": [
        "Entertainment",
        "Shopping mall",
        "Well-lit"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🌪️",
    "title": "NATURAL DISASTERS",
    "titleVi": "Thiên tai",
    "words": [
      {
        "en": "Tornado",
        "ipa": "/tɔːˈneɪdəʊ/",
        "vi": "Lốc xoáy",
        "img": "https://img.invalid/tornado.jpg",
        "ex": "It's a violent storm that moves in a circle with very strong winds.",
        "trVi": "Đó là một cơn bão dữ dội di chuyển theo vòng tròn với sức gió rất mạnh.",
        "trAnswer": "It's a violent storm that moves in a circle with very strong winds.",
        "trKey": "tornado"
      },
      {
        "en": "Flood",
        "ipa": "/flʌd/",
        "vi": "Lũ lụt",
        "img": "https://img.invalid/flood.jpg",
        "ex": "Our home town has been affected by a flood.",
        "trVi": "Quê hương chúng tôi đã bị ảnh hưởng bởi một trận lũ lụt.",
        "trAnswer": "Our home town has been affected by a flood.",
        "trKey": "flood"
      },
      {
        "en": "Landslide",
        "ipa": "/ˈlændslaɪd/",
        "vi": "Lở đất",
        "img": "https://img.invalid/landslide.jpg",
        "ex": "We were travelling on the road near a mountain. Suddenly, a lot of rocks and mud came down the mountain.",
        "trVi": "Chúng tôi đang di chuyển trên con đường gần núi. Bỗng nhiên, rất nhiều đá và bùn đổ xuống từ núi.",
        "trAnswer": "We were travelling on the road near a mountain. Suddenly, a lot of rocks and mud came down the mountain.",
        "trKey": "landslide"
      },
      {
        "en": "Earthquake",
        "ipa": "/ˈɜːθkweɪk/",
        "vi": "Động đất",
        "img": "https://img.invalid/earthquake.jpg",
        "ex": "Oh, the house is shaking! I think we're having an earthquake.",
        "trVi": "Ôi, nhà đang rung lắc! Tôi nghĩ chúng ta đang gặp động đất.",
        "trAnswer": "Oh, the house is shaking! I think we're having an earthquake.",
        "trKey": "earthquake"
      },
      {
        "en": "Volcanic eruption",
        "ipa": "/vɒlˈkænɪk ɪˈrʌpʃn/",
        "vi": "Núi lửa phun trào",
        "img": "https://img.invalid/volcanic-eruption.jpg",
        "ex": "A volcano in the South Pacific erupted violently last Saturday.",
        "trVi": "Một ngọn núi lửa ở Nam Thái Bình Dương đã phun trào dữ dội vào thứ Bảy tuần trước.",
        "trAnswer": "A volcano in the South Pacific erupted violently last Saturday.",
        "trKey": "volcanic eruption"
      },
      {
        "en": "Tsunami",
        "ipa": "/tsuːˈnɑːmi/",
        "vi": "Sóng thần",
        "img": "https://img.invalid/tsunami.jpg",
        "ex": "The eruption also caused a tsunami which flooded properties in Tonga's capital.",
        "trVi": "Vụ phun trào cũng gây ra một trận sóng thần làm ngập lụt tài sản ở thủ đô của Tonga.",
        "trAnswer": "The eruption also caused a tsunami which flooded properties in Tonga's capital.",
        "trKey": "tsunami"
      },
      {
        "en": "Trembling",
        "ipa": "/ˈtremblɪŋ/",
        "vi": "Rung chuyển",
        "img": "https://img.invalid/trembling.jpg",
        "ex": "My building started trembling. Books, lights, and other things also moved.",
        "trVi": "Tòa nhà của tôi bắt đầu rung chuyển. Sách, đèn và các đồ vật khác cũng bị xê dịch.",
        "trAnswer": "My building started trembling. Books, lights, and other things also moved.",
        "trKey": "trembling"
      },
      {
        "en": "Victim",
        "ipa": "/ˈvɪktɪm/",
        "vi": "Nạn nhân",
        "img": "https://img.invalid/victim.jpg",
        "ex": "We are donating money and food to help the victims of the landslide.",
        "trVi": "Chúng tôi đang quyên góp tiền và thực phẩm để giúp đỡ các nạn nhân của vụ lở đất.",
        "trAnswer": "We are donating money and food to help the victims of the landslide.",
        "trKey": "victim"
      },
      {
        "en": "Rescue worker",
        "ipa": "/ˈreskjuː ˈwɜːkər/",
        "vi": "Nhân viên cứu hộ",
        "img": "https://img.invalid/rescue-worker.jpg",
        "ex": "Rescue workers are trying hard to save people in the flooded area.",
        "trVi": "Các nhân viên cứu hộ đang cố gắng hết sức để cứu người trong khu vực bị ngập lụt.",
        "trAnswer": "Rescue workers are trying hard to save people in the flooded area.",
        "trKey": "rescue worker"
      },
      {
        "en": "Damage",
        "ipa": "/ˈdæmɪdʒ/",
        "vi": "Thiệt hại, gây thiệt hại",
        "img": "https://img.invalid/damage.jpg",
        "ex": "It damaged the roof of our house and pulled up some trees in our yard.",
        "trVi": "Nó đã làm hỏng mái nhà của chúng tôi và làm bật gốc một số cây trong sân.",
        "trAnswer": "It damaged the roof of our house and pulled up some trees in our yard.",
        "trKey": "damage"
      }
    ],
    "story": {
      "title": "Recent natural disasters in the news",
      "titleVi": "Thiên tai gần đây trên bản tin",
      "text": "A volcano in the South Pacific erupted violently last Saturday. It hit Tonga, an island country in the area. The eruption sent a cloud of ash and gas into the air. People could see this cloud from 20 kilometres away. The eruption also caused a tsunami which flooded properties in Tonga's capital. Besides, it destroyed hundreds of homes on some small islands. More than twenty people on these islands are still missing. New Zealand sent two big ships to Tonga to help the victims.<br><br>Residents in tall buildings in Ha Noi were frightened when they felt a slight shaking for about 30 seconds. 'I was watching TV when my building started trembling. Books, lights, and other things also moved,' Ms Nguyen Ha, a resident in the Sunshine Building, shared. Many people living in the building ran out of their homes in fear. According to scientists, a strong earthquake in China caused this shaking. Luckily, there was no damage.",
      "textVi": "Một ngọn núi lửa ở Nam Thái Bình Dương đã phun trào dữ dội vào thứ Bảy tuần trước. Nó ảnh hưởng đến Tonga, một quốc đảo trong khu vực. Vụ phun trào đã tạo ra một đám mây tro bụi và khí bốc lên không trung. Người ta có thể nhìn thấy đám mây này từ khoảng cách 20 km. Vụ phun trào cũng gây ra một trận sóng thần làm ngập lụt tài sản ở thủ đô của Tonga. Ngoài ra, nó còn phá hủy hàng trăm ngôi nhà trên một số hòn đảo nhỏ. Hơn hai mươi người trên những hòn đảo này vẫn còn mất tích. New Zealand đã gửi hai con tàu lớn đến Tonga để giúp đỡ các nạn nhân.<br><br>Cư dân sống trong các tòa nhà cao tầng ở Hà Nội đã hoảng sợ khi cảm nhận một đợt rung lắc nhẹ trong khoảng 30 giây. 'Tôi đang xem ti vi thì tòa nhà của tôi bắt đầu rung chuyển. Sách, đèn và các đồ vật khác cũng bị xê dịch,' bà Nguyễn Hà, một cư dân sống tại tòa nhà Sunshine, chia sẻ. Nhiều người sống trong tòa nhà đã chạy ra ngoài trong sợ hãi. Theo các nhà khoa học, một trận động đất mạnh ở Trung Quốc đã gây ra đợt rung lắc này. May mắn thay, không có thiệt hại nào xảy ra.",
      "used": [
        "Volcanic eruption",
        "Tsunami",
        "Trembling"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "📡",
    "title": "COMMUNICATION IN THE FUTURE",
    "titleVi": "Giao tiếp trong tương lai",
    "words": [
      {
        "en": "Video conference",
        "ipa": "/ˈvɪdiəʊ ˈkɒnfərəns/",
        "vi": "Hội nghị truyền hình",
        "img": "https://img.invalid/video-conference.jpg",
        "ex": "We're having a video conference with Tech Savvy next Thursday.",
        "trVi": "Chúng ta sẽ có một cuộc họp trực tuyến qua video với Tech Savvy vào thứ Năm tới.",
        "trAnswer": "We're having a video conference with Tech Savvy next Thursday.",
        "trKey": "video conference"
      },
      {
        "en": "Webcam",
        "ipa": "/ˈwebkæm/",
        "vi": "Camera web",
        "img": "https://img.invalid/webcam.jpg",
        "ex": "How can I adjust this webcam? It's focusing on my forehead.",
        "trVi": "Làm sao để tôi chỉnh camera web này? Nó đang chĩa vào trán tôi.",
        "trAnswer": "How can I adjust this webcam? It's focusing on my forehead.",
        "trKey": "webcam"
      },
      {
        "en": "High-speed Internet connection",
        "ipa": "/haɪ spiːd ˈɪntənet kəˈnekʃn/",
        "vi": "Kết nối Internet tốc độ cao",
        "img": "https://img.invalid/high-speed-internet-connection.jpg",
        "ex": "We have a high-speed Internet connection here.",
        "trVi": "Ở đây chúng tôi có kết nối Internet tốc độ cao.",
        "trAnswer": "We have a high-speed Internet connection here.",
        "trKey": "high-speed internet connection"
      },
      {
        "en": "Emoji",
        "ipa": "/ɪˈməʊdʒi/",
        "vi": "Biểu tượng cảm xúc",
        "img": "https://img.invalid/emoji.jpg",
        "ex": "Many people add emojis to their text messages to express their feelings.",
        "trVi": "Nhiều người thêm biểu tượng cảm xúc vào tin nhắn để thể hiện cảm xúc của mình.",
        "trAnswer": "Many people add emojis to their text messages to express their feelings.",
        "trKey": "emoji"
      },
      {
        "en": "Voice message",
        "ipa": "/vɔɪs ˈmesɪdʒ/",
        "vi": "Tin nhắn thoại",
        "img": "https://img.invalid/voice-message.jpg",
        "ex": "Do you often send voice messages to your friends?",
        "trVi": "Bạn có thường gửi tin nhắn thoại cho bạn bè không?",
        "trAnswer": "Do you often send voice messages to your friends?",
        "trKey": "voice message"
      },
      {
        "en": "Language barrier",
        "ipa": "/ˈlæŋɡwɪdʒ ˈbæriər/",
        "vi": "Rào cản ngôn ngữ",
        "img": "https://img.invalid/language-barrier.jpg",
        "ex": "Can learning English help you overcome the language barrier when living abroad?",
        "trVi": "Việc học tiếng Anh có giúp bạn vượt qua rào cản ngôn ngữ khi sống ở nước ngoài không?",
        "trAnswer": "Can learning English help you overcome the language barrier when living abroad?",
        "trKey": "language barrier"
      },
      {
        "en": "Holography",
        "ipa": "/hɒˈlɒɡrəfi/",
        "vi": "Công nghệ ảnh ba chiều",
        "img": "https://img.invalid/holography.jpg",
        "ex": "By using holography, you can attend a meeting with your 3D image instead of being there in person.",
        "trVi": "Bằng cách sử dụng công nghệ ảnh ba chiều, bạn có thể tham dự cuộc họp bằng hình ảnh 3D của mình thay vì có mặt trực tiếp.",
        "trAnswer": "By using holography, you can attend a meeting with your 3D image instead of being there in person.",
        "trKey": "holography"
      },
      {
        "en": "Telepathy",
        "ipa": "/təˈlepəθi/",
        "vi": "Thần giao cách cảm",
        "img": "https://img.invalid/telepathy.jpg",
        "ex": "We'll use more advanced ways, like telepathy. We'll pass our thoughts to another person without talking.",
        "trVi": "Chúng ta sẽ dùng những cách tiên tiến hơn, như thần giao cách cảm. Chúng ta sẽ truyền suy nghĩ của mình cho người khác mà không cần nói.",
        "trAnswer": "We'll use more advanced ways, like telepathy. We'll pass our thoughts to another person without talking.",
        "trKey": "telepathy"
      },
      {
        "en": "Translation machine",
        "ipa": "/trænsˈleɪʃn məˈʃiːn/",
        "vi": "Máy phiên dịch",
        "img": "https://img.invalid/translation-machine.jpg",
        "ex": "In the future, everyone can carry a translation machine with them whenever they go abroad.",
        "trVi": "Trong tương lai, mọi người có thể mang theo một chiếc máy phiên dịch mỗi khi ra nước ngoài.",
        "trAnswer": "In the future, everyone can carry a translation machine with them whenever they go abroad.",
        "trKey": "translation machine"
      },
      {
        "en": "Chatbot",
        "ipa": "/ˈtʃætbɒt/",
        "vi": "Trợ lý ảo, chatbot",
        "img": "https://img.invalid/chatbot.jpg",
        "ex": "A chatbot can instantly reply to customers in all languages.",
        "trVi": "Một chatbot có thể trả lời khách hàng ngay lập tức bằng mọi ngôn ngữ.",
        "trAnswer": "A chatbot can instantly reply to customers in all languages.",
        "trKey": "chatbot"
      }
    ],
    "story": {
      "title": "Telepathy - communication of the future?",
      "titleVi": "Thần giao cách cảm - giao tiếp của tương lai?",
      "text": "Today, the Technology Club interviewed Minh and Tom to find out how people will communicate in the future.<br><br>At the moment, Minh and Tom mostly text each other or send voice messages. Sometimes they see their friends in person, but sometimes they call via the Internet.<br><br>However, they don't think these ways of communication will still be popular in 50 years. They believe people will use more advanced ways, like telepathy. People will pass their thoughts to another person without talking. Everyone will wear a tiny device to catch their thoughts and send them to other people.<br><br>Still, telepathy may cause some problems. Since telepathy devices can 'read' one's mind, bad people might take advantage of it to control someone else. Also, some people may become too lazy to even talk anymore.",
      "textVi": "Hôm nay, Câu lạc bộ Công nghệ đã phỏng vấn Minh và Tom để tìm hiểu xem con người sẽ giao tiếp như thế nào trong tương lai.<br><br>Hiện tại, Minh và Tom chủ yếu nhắn tin hoặc gửi tin nhắn thoại cho nhau. Đôi khi họ gặp bạn bè trực tiếp, nhưng cũng có lúc gọi điện qua Internet.<br><br>Tuy nhiên, họ không nghĩ rằng những cách giao tiếp này sẽ vẫn còn phổ biến trong 50 năm nữa. Họ tin rằng con người sẽ sử dụng những cách tiên tiến hơn, như thần giao cách cảm. Con người sẽ truyền suy nghĩ của mình cho người khác mà không cần nói. Mọi người sẽ đeo một thiết bị nhỏ để thu lại suy nghĩ và gửi chúng đến người khác.<br><br>Tuy vậy, thần giao cách cảm có thể gây ra một số vấn đề. Vì các thiết bị thần giao cách cảm có thể 'đọc' được suy nghĩ của con người, những kẻ xấu có thể lợi dụng nó để điều khiển người khác. Ngoài ra, một số người có thể trở nên quá lười biếng để nói chuyện nữa.",
      "used": [
        "Telepathy"
      ]
    }
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "🔬",
    "title": "SCIENCE AND TECHNOLOGY",
    "titleVi": "Khoa học và công nghệ",
    "words": [
      {
        "en": "Invent",
        "ipa": "/ɪnˈvent/",
        "vi": "Phát minh, sáng chế",
        "img": "https://img.invalid/invent.jpg",
        "ex": "Alexander Graham Bell invented the telephone in 1876.",
        "trVi": "Alexander Graham Bell đã phát minh ra điện thoại vào năm 1876.",
        "trAnswer": "Alexander Graham Bell invented the telephone in 1876.",
        "trKey": "invent"
      },
      {
        "en": "Discover",
        "ipa": "/dɪˈskʌvər/",
        "vi": "Khám phá, phát hiện",
        "img": "https://img.invalid/discover.jpg",
        "ex": "Marie Curie and Pierre Curie discovered radium and polonium.",
        "trVi": "Marie Curie và Pierre Curie đã khám phá ra radium và polonium.",
        "trAnswer": "Marie Curie and Pierre Curie discovered radium and polonium.",
        "trKey": "discover"
      },
      {
        "en": "Vaccine",
        "ipa": "/ˈvæksiːn/",
        "vi": "Vắc-xin",
        "img": "https://img.invalid/vaccine.jpg",
        "ex": "Sarah Gilbert is the creator of a vaccine. She created it in 2020.",
        "trVi": "Sarah Gilbert là người tạo ra một loại vắc-xin. Bà đã tạo ra nó vào năm 2020.",
        "trAnswer": "Sarah Gilbert is the creator of a vaccine. She created it in 2020.",
        "trKey": "vaccine"
      },
      {
        "en": "Fingerprint scanner",
        "ipa": "/ˈfɪŋɡəprɪnt ˈskænər/",
        "vi": "Máy quét vân tay",
        "img": "https://img.invalid/fingerprint-scanner.jpg",
        "ex": "With fingerprint scanners, or facial or voice recognition technologies, schools will be able to check students' attendance.",
        "trVi": "Với máy quét vân tay, hoặc công nghệ nhận diện khuôn mặt hoặc giọng nói, các trường học sẽ có thể điểm danh học sinh.",
        "trAnswer": "With fingerprint scanners, or facial or voice recognition technologies, schools will be able to check students' attendance.",
        "trKey": "fingerprint scanner"
      },
      {
        "en": "Facial recognition",
        "ipa": "/ˈfeɪʃl ˌrekəɡˈnɪʃn/",
        "vi": "Nhận diện khuôn mặt",
        "img": "https://img.invalid/facial-recognition.jpg",
        "ex": "Facial recognition technology can check students' attendance quickly.",
        "trVi": "Công nghệ nhận diện khuôn mặt có thể điểm danh học sinh một cách nhanh chóng.",
        "trAnswer": "Facial recognition technology can check students' attendance quickly.",
        "trKey": "facial recognition"
      },
      {
        "en": "Eye-tracking",
        "ipa": "/aɪ ˈtrækɪŋ/",
        "vi": "Theo dõi chuyển động mắt",
        "img": "https://img.invalid/eye-tracking.jpg",
        "ex": "Teachers can use the eye-tracking application to check students' understanding of a lesson.",
        "trVi": "Giáo viên có thể sử dụng ứng dụng theo dõi chuyển động mắt để kiểm tra mức độ hiểu bài của học sinh.",
        "trAnswer": "Teachers can use the eye-tracking application to check students' understanding of a lesson.",
        "trKey": "eye-tracking"
      },
      {
        "en": "Attendance",
        "ipa": "/əˈtendəns/",
        "vi": "Việc điểm danh",
        "img": "https://img.invalid/attendance.jpg",
        "ex": "Teachers will no longer need to call students' names to check attendance.",
        "trVi": "Giáo viên sẽ không cần gọi tên học sinh để điểm danh nữa.",
        "trAnswer": "Teachers will no longer need to call students' names to check attendance.",
        "trKey": "attendance"
      },
      {
        "en": "Effortless",
        "ipa": "/ˈefətləs/",
        "vi": "Dễ dàng, không tốn sức",
        "img": "https://img.invalid/effortless.jpg",
        "ex": "Nanolearning provides you with small amounts of information over a short period of time. Your learning will become effortless.",
        "trVi": "Nanolearning cung cấp cho bạn những lượng thông tin nhỏ trong khoảng thời gian ngắn. Việc học của bạn sẽ trở nên dễ dàng hơn.",
        "trAnswer": "Nanolearning provides you with small amounts of information over a short period of time. Your learning will become effortless.",
        "trKey": "effortless"
      },
      {
        "en": "Truancy",
        "ipa": "/ˈtruːənsi/",
        "vi": "Trốn học",
        "img": "https://img.invalid/truancy.jpg",
        "ex": "No more worries about truancy and cheating!",
        "trVi": "Không còn phải lo lắng về việc trốn học và gian lận nữa!",
        "trAnswer": "No more worries about truancy and cheating!",
        "trKey": "truancy"
      },
      {
        "en": "Biometric application",
        "ipa": "/ˌbaɪəʊˈmetrɪk ˌæplɪˈkeɪʃn/",
        "vi": "Ứng dụng sinh trắc học",
        "img": "https://img.invalid/biometric-application.jpg",
        "ex": "Just introduce biometric applications at your school.",
        "trVi": "Chỉ cần đưa các ứng dụng sinh trắc học vào trường học của bạn.",
        "trAnswer": "Just introduce biometric applications at your school.",
        "trKey": "biometric application"
      }
    ],
    "story": {
      "title": "New technologies: Biometrics and Nanolearning",
      "titleVi": "Công nghệ mới: Sinh trắc học và Nanolearning",
      "text": "Biometrics<br>No more worries about truancy and cheating! Just introduce biometric applications at your school. With fingerprint scanners, or facial or voice recognition technologies, schools will be able to check students' attendance. Teachers will no longer need to call students' names to find out who is absent. This will make more time for activities!<br><br>Schools can also use these biometric applications for students who borrow books and equipment. Even more amazing: teachers can even use the eye-tracking applications to check students' understanding of a lesson and to motivate students to learn.<br><br>Nanolearning<br>Tired of sitting in front of a computer all day long? Unable to concentrate for very long in your classes? Or frequently forgetting large amounts of information? The solution to these is Nanolearning, created by Junglemap in 2006.<br><br>Nanolearning provides you with small amounts of information over a short period of time. Your learning will become effortless. Believe us! Receive bits of information within two to five minutes via our platform, and you will increase your learning attention and ability. Our app also reports your study activities and results to your teacher.",
      "textVi": "Sinh trắc học<br>Không còn phải lo lắng về việc trốn học và gian lận nữa! Chỉ cần đưa các ứng dụng sinh trắc học vào trường học của bạn. Với máy quét vân tay, hoặc công nghệ nhận diện khuôn mặt hay giọng nói, các trường học sẽ có thể điểm danh học sinh. Giáo viên sẽ không còn cần gọi tên học sinh để biết ai vắng mặt nữa. Điều này sẽ tạo thêm thời gian cho các hoạt động khác!<br><br>Trường học cũng có thể sử dụng các ứng dụng sinh trắc học này cho học sinh khi mượn sách và thiết bị. Thậm chí đáng kinh ngạc hơn: giáo viên còn có thể sử dụng ứng dụng theo dõi chuyển động mắt để kiểm tra mức độ hiểu bài của học sinh và tạo động lực học tập cho các em.<br><br>Nanolearning<br>Mệt mỏi vì phải ngồi trước máy tính cả ngày? Không thể tập trung lâu trong các tiết học? Hay thường xuyên quên đi một lượng lớn thông tin? Giải pháp cho những vấn đề này chính là Nanolearning, được tạo ra bởi Junglemap vào năm 2006.<br><br>Nanolearning cung cấp cho bạn những lượng thông tin nhỏ trong khoảng thời gian ngắn. Việc học của bạn sẽ trở nên dễ dàng hơn. Hãy tin chúng tôi! Nhận các mẩu thông tin trong vòng hai đến năm phút qua nền tảng của chúng tôi, và bạn sẽ tăng khả năng tập trung và học tập của mình. Ứng dụng của chúng tôi cũng báo cáo hoạt động và kết quả học tập của bạn cho giáo viên.",
      "used": [
        "Effortless",
        "Truancy",
        "Attendance"
      ]
    }
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "🪐",
    "title": "LIFE ON OTHER PLANETS",
    "titleVi": "Sự sống trên các hành tinh khác",
    "words": [
      {
        "en": "Outer space",
        "ipa": "/ˈaʊtər speɪs/",
        "vi": "Không gian vũ trụ",
        "img": "https://img.invalid/outer-space.jpg",
        "ex": "Nowadays humans are still wondering what planets in outer space might sustain life.",
        "trVi": "Ngày nay con người vẫn đang tự hỏi những hành tinh nào trong vũ trụ có thể duy trì sự sống.",
        "trAnswer": "Nowadays humans are still wondering what planets in outer space might sustain life.",
        "trKey": "outer space"
      },
      {
        "en": "Habitable planet",
        "ipa": "/ˈhæbɪtəbl ˈplænɪt/",
        "vi": "Hành tinh có thể sinh sống được",
        "img": "https://img.invalid/habitable-planet.jpg",
        "ex": "Scientists are using space telescopes to find habitable planets.",
        "trVi": "Các nhà khoa học đang sử dụng kính viễn vọng không gian để tìm các hành tinh có thể sinh sống được.",
        "trAnswer": "Scientists are using space telescopes to find habitable planets.",
        "trKey": "habitable planet"
      },
      {
        "en": "Gravity",
        "ipa": "/ˈɡrævəti/",
        "vi": "Trọng lực",
        "img": "https://img.invalid/gravity.jpg",
        "ex": "The gravity of the Earth makes things fall to the ground when we drop them.",
        "trVi": "Trọng lực của Trái Đất khiến mọi vật rơi xuống đất khi ta thả chúng.",
        "trAnswer": "The gravity of the Earth makes things fall to the ground when we drop them.",
        "trKey": "gravity"
      },
      {
        "en": "Atmosphere",
        "ipa": "/ˈætməsfɪər/",
        "vi": "Bầu khí quyển",
        "img": "https://img.invalid/atmosphere.jpg",
        "ex": "The planets need to have the correct amount of air so that they can hold an atmosphere around.",
        "trVi": "Các hành tinh cần có lượng không khí phù hợp để có thể giữ được một bầu khí quyển xung quanh.",
        "trAnswer": "The planets need to have the correct amount of air so that they can hold an atmosphere around.",
        "trKey": "atmosphere"
      },
      {
        "en": "Telescope",
        "ipa": "/ˈtelɪskəʊp/",
        "vi": "Kính viễn vọng",
        "img": "https://img.invalid/telescope.jpg",
        "ex": "We need to use a telescope to clearly see the surface of the moon.",
        "trVi": "Chúng ta cần dùng kính viễn vọng để nhìn rõ bề mặt của mặt trăng.",
        "trAnswer": "We need to use a telescope to clearly see the surface of the moon.",
        "trKey": "telescope"
      },
      {
        "en": "Rocket",
        "ipa": "/ˈrɒkɪt/",
        "vi": "Tên lửa",
        "img": "https://img.invalid/rocket.jpg",
        "ex": "We use a rocket, which is in the shape of a big tube, for travelling or carrying things into space.",
        "trVi": "Chúng ta dùng tên lửa, có hình dạng như một ống lớn, để di chuyển hoặc chở đồ vào không gian.",
        "trAnswer": "We use a rocket, which is in the shape of a big tube, for travelling or carrying things into space.",
        "trKey": "rocket"
      },
      {
        "en": "Galaxy",
        "ipa": "/ˈɡæləksi/",
        "vi": "Thiên hà",
        "img": "https://img.invalid/galaxy.jpg",
        "ex": "The Milky Way is the galaxy that includes our solar system.",
        "trVi": "Dải Ngân Hà là thiên hà bao gồm hệ mặt trời của chúng ta.",
        "trAnswer": "The Milky Way is the galaxy that includes our solar system.",
        "trKey": "galaxy"
      },
      {
        "en": "Creature",
        "ipa": "/ˈkriːtʃər/",
        "vi": "Sinh vật",
        "img": "https://img.invalid/creature.jpg",
        "ex": "It's about four creatures Titu, Kaku, Hub, and Barb.",
        "trVi": "Truyện kể về bốn sinh vật tên là Titu, Kaku, Hub và Barb.",
        "trAnswer": "It's about four creatures Titu, Kaku, Hub, and Barb.",
        "trKey": "creature"
      },
      {
        "en": "Possibility",
        "ipa": "/ˌpɒsəˈbɪləti/",
        "vi": "Khả năng, tính khả thi",
        "img": "https://img.invalid/possibility.jpg",
        "ex": "There is a possibility that we might visit Mars in the near future.",
        "trVi": "Có khả năng là chúng ta có thể đến thăm Sao Hỏa trong tương lai gần.",
        "trAnswer": "There is a possibility that we might visit Mars in the near future.",
        "trKey": "possibility"
      },
      {
        "en": "Alien",
        "ipa": "/ˈeɪliən/",
        "vi": "Người ngoài hành tinh",
        "img": "https://img.invalid/alien.jpg",
        "ex": "The main character in the film is a boy who makes friends with some aliens from a planet.",
        "trVi": "Nhân vật chính trong phim là một cậu bé kết bạn với vài người ngoài hành tinh đến từ một hành tinh khác.",
        "trAnswer": "The main character in the film is a boy who makes friends with some aliens from a planet.",
        "trKey": "alien"
      }
    ],
    "story": {
      "title": "Is there life on other planets?",
      "titleVi": "Có sự sống trên các hành tinh khác không?",
      "text": "Nowadays humans are still wondering what planets in outer space might sustain life.<br><br>Scientists say planets need to meet three main conditions to support life. Firstly, they must have liquid water, so their temperature must not be too high or too low. Secondly, the planets need to have the correct amount of air so that they can hold an atmosphere around. Finally, their size is also important. If a planet is too small, its gravity is not strong enough to hold an enough amount of air. If it is too big, its gravity will be so strong that it will hold too much air.<br><br>Scientists are using space telescopes to find habitable planets. According to them, Mars is one of the closest planets to a planet like Earth. Its days last for 24.5 hours and its seasons are similar to Earth's. Although scientists have not found actual water on Mars, there seems to be traces of it on the planet's surface. However, the climate on Mars is unsuitable for human life because it is too cold and Mars lacks oxygen to support human life.",
      "textVi": "Ngày nay con người vẫn đang tự hỏi những hành tinh nào trong vũ trụ có thể duy trì sự sống.<br><br>Các nhà khoa học cho rằng các hành tinh cần đáp ứng ba điều kiện chính để có thể hỗ trợ sự sống. Thứ nhất, chúng phải có nước ở dạng lỏng, vì vậy nhiệt độ của chúng không được quá cao hoặc quá thấp. Thứ hai, các hành tinh cần có lượng không khí phù hợp để có thể giữ được một bầu khí quyển xung quanh. Cuối cùng, kích thước của chúng cũng rất quan trọng. Nếu một hành tinh quá nhỏ, trọng lực của nó sẽ không đủ mạnh để giữ lại một lượng không khí đủ dùng. Nếu nó quá lớn, trọng lực của nó sẽ quá mạnh đến mức giữ lại quá nhiều không khí.<br><br>Các nhà khoa học đang sử dụng kính viễn vọng không gian để tìm các hành tinh có thể sinh sống được. Theo họ, Sao Hỏa là một trong những hành tinh gần giống Trái Đất nhất. Một ngày trên Sao Hỏa kéo dài 24,5 giờ và các mùa của nó cũng tương tự như Trái Đất. Mặc dù các nhà khoa học chưa tìm thấy nước thực sự trên Sao Hỏa, nhưng dường như có dấu vết của nó trên bề mặt hành tinh này. Tuy nhiên, khí hậu trên Sao Hỏa không phù hợp cho sự sống của con người vì nó quá lạnh và Sao Hỏa thiếu oxy để duy trì sự sống của con người.",
      "used": [
        "Habitable planet",
        "Atmosphere",
        "Gravity"
      ]
    }
  }
];
