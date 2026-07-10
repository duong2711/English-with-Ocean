// Dữ liệu từ vựng lớp 11 (THPT) — trích từ SGK Tiếng Anh 11 Global Success
// Mỗi unit gồm: từ vựng (words), bài đọc (story). Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE11_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🩺",
    "title": "A LONG AND HEALTHY LIFE",
    "titleVi": "Một cuộc sống dài và khỏe mạnh",
    "words": [
      {
        "en": "Balanced",
        "ipa": "/ˈbælənst/",
        "vi": "Cân đối, điều độ",
        "img": "https://img.invalid/balanced.jpg",
        "ex": "A balanced diet gives your body all the nutrients it needs.",
        "trVi": "Một chế độ ăn cân đối cung cấp cho cơ thể bạn mọi chất dinh dưỡng nó cần.",
        "trAnswer": "A balanced diet gives your body all the nutrients it needs.",
        "trKey": "balanced"
      },
      {
        "en": "Disease",
        "ipa": "/dɪˈziːz/",
        "vi": "Bệnh",
        "img": "https://img.invalid/disease.jpg",
        "ex": "Regular exercise can help prevent heart disease.",
        "trVi": "Tập thể dục đều đặn có thể giúp phòng ngừa bệnh tim.",
        "trAnswer": "Regular exercise can help prevent heart disease.",
        "trKey": "disease"
      },
      {
        "en": "Energy",
        "ipa": "/ˈenədʒi/",
        "vi": "Năng lượng",
        "img": "https://img.invalid/energy.jpg",
        "ex": "Nam felt full of energy after his morning run.",
        "trVi": "Nam cảm thấy tràn đầy năng lượng sau khi chạy bộ buổi sáng.",
        "trAnswer": "Nam felt full of energy after his morning run.",
        "trKey": "energy"
      },
      {
        "en": "Examine",
        "ipa": "/ɪɡˈzæmɪn/",
        "vi": "Khám, kiểm tra",
        "img": "https://img.invalid/examine.jpg",
        "ex": "The doctor examined Vy carefully but found nothing serious.",
        "trVi": "Bác sĩ khám cho Vy cẩn thận nhưng không phát hiện điều gì nghiêm trọng.",
        "trAnswer": "The doctor examined Vy carefully but found nothing serious.",
        "trKey": "examine"
      },
      {
        "en": "Fitness",
        "ipa": "/ˈfɪtnəs/",
        "vi": "Sự khỏe khoắn, thể lực",
        "img": "https://img.invalid/fitness.jpg",
        "ex": "Duy joined a fitness club to improve his health.",
        "trVi": "Duy tham gia một câu lạc bộ thể hình để cải thiện sức khỏe.",
        "trAnswer": "Duy joined a fitness club to improve his health.",
        "trKey": "fitness"
      },
      {
        "en": "Germ",
        "ipa": "/dʒɜːm/",
        "vi": "Vi trùng",
        "img": "https://img.invalid/germ.jpg",
        "ex": "Washing your hands helps to kill germs.",
        "trVi": "Rửa tay giúp tiêu diệt vi trùng.",
        "trAnswer": "Washing your hands helps to kill germs.",
        "trKey": "germ"
      },
      {
        "en": "Illness",
        "ipa": "/ˈɪlnəs/",
        "vi": "Sự ốm đau, bệnh tật",
        "img": "https://img.invalid/illness.jpg",
        "ex": "Mi stayed home from school because of a sudden illness.",
        "trVi": "Mi ở nhà không đi học vì một cơn ốm bất ngờ.",
        "trAnswer": "Mi stayed home from school because of a sudden illness.",
        "trKey": "illness"
      },
      {
        "en": "Infection",
        "ipa": "/ɪnˈfekʃn/",
        "vi": "Sự lây nhiễm, nhiễm trùng",
        "img": "https://img.invalid/infection.jpg",
        "ex": "The nurse cleaned the wound to prevent infection.",
        "trVi": "Y tá đã làm sạch vết thương để ngăn ngừa nhiễm trùng.",
        "trAnswer": "The nurse cleaned the wound to prevent infection.",
        "trKey": "infection"
      },
      {
        "en": "Muscle",
        "ipa": "/ˈmʌsl/",
        "vi": "Cơ bắp",
        "img": "https://img.invalid/muscle.jpg",
        "ex": "Lifting weights can help you build muscle.",
        "trVi": "Tập tạ có thể giúp bạn xây dựng cơ bắp.",
        "trAnswer": "Lifting weights can help you build muscle.",
        "trKey": "muscle"
      },
      {
        "en": "Nutrient",
        "ipa": "/ˈnjuːtriənt/",
        "vi": "Chất dinh dưỡng",
        "img": "https://img.invalid/nutrient.jpg",
        "ex": "Fruit and vegetables are rich in nutrients.",
        "trVi": "Trái cây và rau củ giàu chất dinh dưỡng.",
        "trAnswer": "Fruit and vegetables are rich in nutrients.",
        "trKey": "nutrient"
      },
      {
        "en": "Strength",
        "ipa": "/streŋθ/",
        "vi": "Sức mạnh",
        "img": "https://img.invalid/strength.jpg",
        "ex": "Daily press-ups will increase your strength.",
        "trVi": "Hít đất hằng ngày sẽ tăng sức mạnh của bạn.",
        "trAnswer": "Daily press-ups will increase your strength.",
        "trKey": "strength"
      },
      {
        "en": "Treatment",
        "ipa": "/ˈtriːtmənt/",
        "vi": "Cách điều trị",
        "img": "https://img.invalid/treatment.jpg",
        "ex": "Early treatment can stop the disease from spreading.",
        "trVi": "Điều trị sớm có thể ngăn bệnh lây lan.",
        "trAnswer": "Early treatment can stop the disease from spreading.",
        "trKey": "treatment"
      }
    ],
    "story": {
      "title": "A balanced life",
      "titleVi": "Một cuộc sống cân bằng",
      "text": "Last year, Nam often felt tired and had little energy for his classes. His doctor examined him and said he needed a more balanced diet and regular exercise.<br><br>Nam decided to join a fitness club near his house. Every morning, he did press-ups and star jumps to build muscle and strength.<br><br>After three months, Nam's illness disappeared, and he felt healthier than ever. Now he always tells his friends: \"A balanced life keeps germs away!\"",
      "textVi": "Năm ngoái, Nam thường cảm thấy mệt mỏi và có rất ít năng lượng cho các tiết học. Bác sĩ khám cho cậu và nói rằng cậu cần một chế độ ăn cân đối hơn cùng với việc tập thể dục đều đặn.<br><br>Nam quyết định tham gia một câu lạc bộ thể hình gần nhà. Mỗi sáng, cậu tập hít đất và nhảy dang tay chân để xây dựng cơ bắp và sức mạnh.<br><br>Sau ba tháng, bệnh của Nam biến mất, và cậu cảm thấy khỏe mạnh hơn bao giờ hết. Giờ đây cậu luôn nói với bạn bè: \"Một cuộc sống cân bằng giữ vi trùng tránh xa!\"",
      "used": [
        "Balanced",
        "Energy",
        "Examine",
        "Fitness",
        "Muscle",
        "Strength",
        "Illness",
        "Germ"
      ]
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "👨‍👩‍👧",
    "title": "THE GENERATION GAP",
    "titleVi": "Khoảng cách thế hệ",
    "words": [
      {
        "en": "Generation gap",
        "ipa": "/ˌdʒenəˈreɪʃn ɡæp/",
        "vi": "Khoảng cách giữa các thế hệ",
        "img": "https://img.invalid/generation-gap.jpg",
        "ex": "The generation gap often causes misunderstandings between parents and children.",
        "trVi": "Khoảng cách thế hệ thường gây ra những hiểu lầm giữa cha mẹ và con cái.",
        "trAnswer": "The generation gap often causes misunderstandings between parents and children.",
        "trKey": "generation gap"
      },
      {
        "en": "Conflict",
        "ipa": "/ˈkɒnflɪkt/",
        "vi": "Sự xung đột, va chạm",
        "img": "https://img.invalid/conflict.jpg",
        "ex": "Linh and her mother sometimes have conflicts about screen time.",
        "trVi": "Linh và mẹ đôi khi có những xung đột về thời gian dùng thiết bị.",
        "trAnswer": "Linh and her mother sometimes have conflicts about screen time.",
        "trKey": "conflict"
      },
      {
        "en": "Adapt",
        "ipa": "/əˈdæpt/",
        "vi": "Thích nghi",
        "img": "https://img.invalid/adapt.jpg",
        "ex": "Grandparents have to adapt to new technology every year.",
        "trVi": "Ông bà phải thích nghi với công nghệ mới mỗi năm.",
        "trAnswer": "Grandparents have to adapt to new technology every year.",
        "trKey": "adapt"
      },
      {
        "en": "Characteristic",
        "ipa": "/ˌkærəktəˈrɪstɪk/",
        "vi": "Đặc điểm, đặc tính",
        "img": "https://img.invalid/characteristic.jpg",
        "ex": "Curiosity is a common characteristic of teenagers.",
        "trVi": "Tính tò mò là một đặc điểm phổ biến của thanh thiếu niên.",
        "trAnswer": "Curiosity is a common characteristic of teenagers.",
        "trKey": "characteristic"
      },
      {
        "en": "Curious",
        "ipa": "/ˈkjʊəriəs/",
        "vi": "Tò mò",
        "img": "https://img.invalid/curious.jpg",
        "ex": "Duy is curious about how his grandfather grew up.",
        "trVi": "Duy tò mò về việc ông của cậu đã lớn lên như thế nào.",
        "trAnswer": "Duy is curious about how his grandfather grew up.",
        "trKey": "curious"
      },
      {
        "en": "Digital native",
        "ipa": "/ˌdɪdʒɪtl ˈneɪtɪv/",
        "vi": "Người sinh ra trong thời đại công nghệ",
        "img": "https://img.invalid/digital-native.jpg",
        "ex": "As a digital native, Vy learnt to use a tablet before she could read.",
        "trVi": "Là một người sinh ra trong thời đại công nghệ, Vy học cách dùng máy tính bảng trước khi biết đọc.",
        "trAnswer": "As a digital native, Vy learnt to use a tablet before she could read.",
        "trKey": "digital native"
      },
      {
        "en": "Extended family",
        "ipa": "/ɪkˈstendɪd ˈfæməli/",
        "vi": "Đại gia đình",
        "img": "https://img.invalid/extended-family.jpg",
        "ex": "Nam's extended family gets together every Lunar New Year.",
        "trVi": "Đại gia đình của Nam sum họp vào mỗi dịp Tết Nguyên đán.",
        "trAnswer": "Nam's extended family gets together every Lunar New Year.",
        "trKey": "extended family"
      },
      {
        "en": "Freedom",
        "ipa": "/ˈfriːdəm/",
        "vi": "Sự tự do",
        "img": "https://img.invalid/freedom.jpg",
        "ex": "Teenagers often want more freedom to make their own choices.",
        "trVi": "Thanh thiếu niên thường muốn có nhiều tự do hơn để tự đưa ra lựa chọn.",
        "trAnswer": "Teenagers often want more freedom to make their own choices.",
        "trKey": "freedom"
      },
      {
        "en": "Individualism",
        "ipa": "/ˌɪndɪˈvɪdʒuəlɪzəm/",
        "vi": "Chủ nghĩa cá nhân",
        "img": "https://img.invalid/individualism.jpg",
        "ex": "Young people today value individualism more than their grandparents did.",
        "trVi": "Giới trẻ ngày nay coi trọng chủ nghĩa cá nhân hơn ông bà của họ.",
        "trAnswer": "Young people today value individualism more than their grandparents did.",
        "trKey": "individualism"
      },
      {
        "en": "Limit",
        "ipa": "/ˈlɪmɪt/",
        "vi": "Giới hạn, hạn chế",
        "img": "https://img.invalid/limit.jpg",
        "ex": "Mi's parents try to limit her screen time on school nights.",
        "trVi": "Bố mẹ Mi cố gắng hạn chế thời gian dùng thiết bị của cô vào các tối đi học.",
        "trAnswer": "Mi's parents try to limit her screen time on school nights.",
        "trKey": "limit"
      },
      {
        "en": "Screen time",
        "ipa": "/ˈskriːn taɪm/",
        "vi": "Thời gian sử dụng thiết bị",
        "img": "https://img.invalid/screen-time.jpg",
        "ex": "Too much screen time can affect your sleep.",
        "trVi": "Quá nhiều thời gian dùng thiết bị có thể ảnh hưởng đến giấc ngủ của bạn.",
        "trAnswer": "Too much screen time can affect your sleep.",
        "trKey": "screen time"
      },
      {
        "en": "Social media",
        "ipa": "/ˌsəʊʃl ˈmiːdiə/",
        "vi": "Phương tiện truyền thông mạng xã hội",
        "img": "https://img.invalid/social-media.jpg",
        "ex": "Older generations did not grow up with social media.",
        "trVi": "Các thế hệ trước không lớn lên cùng với mạng xã hội.",
        "trAnswer": "Older generations did not grow up with social media.",
        "trKey": "social media"
      }
    ],
    "story": {
      "title": "Two generations, one house",
      "titleVi": "Hai thế hệ, một mái nhà",
      "text": "Vy lives with her parents and her grandmother in the same house. Sometimes there is conflict between them, especially about screen time.<br><br>Vy is a digital native. She spends hours on social media every day, but her grandmother thinks she should read more books instead.<br><br>To close the generation gap, the family now has a rule: no phones during dinner. Vy still enjoys some freedom, but she has learnt to adapt to her grandmother's habits too.",
      "textVi": "Vy sống cùng bố mẹ và bà trong cùng một ngôi nhà. Đôi khi giữa họ xảy ra xung đột, đặc biệt là về thời gian dùng thiết bị.<br><br>Vy là một người sinh ra trong thời đại công nghệ. Cô dành hàng giờ mỗi ngày cho mạng xã hội, nhưng bà của cô lại nghĩ rằng cô nên đọc sách nhiều hơn.<br><br>Để thu hẹp khoảng cách thế hệ, gia đình giờ đây có một quy định: không dùng điện thoại trong bữa tối. Vy vẫn được hưởng một chút tự do, nhưng cô cũng đã học cách thích nghi với thói quen của bà.",
      "used": [
        "Conflict",
        "Screen time",
        "Digital native",
        "Social media",
        "Generation gap",
        "Freedom",
        "Adapt"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🏙️",
    "title": "CITIES OF THE FUTURE",
    "titleVi": "Những thành phố tương lai",
    "words": [
      {
        "en": "Smart city",
        "ipa": "/ˈsmɑːt ˈsɪti/",
        "vi": "Thành phố thông minh",
        "img": "https://img.invalid/smart-city.jpg",
        "ex": "In a smart city, traffic lights can change automatically to reduce jams.",
        "trVi": "Trong một thành phố thông minh, đèn giao thông có thể tự động thay đổi để giảm ùn tắc.",
        "trAnswer": "In a smart city, traffic lights can change automatically to reduce jams.",
        "trKey": "smart city"
      },
      {
        "en": "Skyscraper",
        "ipa": "/ˈskaɪskreɪpə/",
        "vi": "Tòa nhà chọc trời",
        "img": "https://img.invalid/skyscraper.jpg",
        "ex": "The new skyscraper in the city centre has 80 floors.",
        "trVi": "Tòa nhà chọc trời mới ở trung tâm thành phố có 80 tầng.",
        "trAnswer": "The new skyscraper in the city centre has 80 floors.",
        "trKey": "skyscraper"
      },
      {
        "en": "High-rise",
        "ipa": "/ˈhaɪraɪz/",
        "vi": "Cao tầng",
        "img": "https://img.invalid/high-rise.jpg",
        "ex": "Many city dwellers now live in high-rise apartments.",
        "trVi": "Nhiều cư dân thành phố hiện sống trong các căn hộ cao tầng.",
        "trAnswer": "Many city dwellers now live in high-rise apartments.",
        "trKey": "high-rise"
      },
      {
        "en": "Infrastructure",
        "ipa": "/ˈɪnfrəstrʌktʃə/",
        "vi": "Cơ sở hạ tầng",
        "img": "https://img.invalid/infrastructure.jpg",
        "ex": "The government is investing in infrastructure like roads and bridges.",
        "trVi": "Chính phủ đang đầu tư vào cơ sở hạ tầng như đường sá và cầu cống.",
        "trAnswer": "The government is investing in infrastructure like roads and bridges.",
        "trKey": "infrastructure"
      },
      {
        "en": "Sensor",
        "ipa": "/ˈsensə/",
        "vi": "Cảm biến",
        "img": "https://img.invalid/sensor.jpg",
        "ex": "A sensor in the roof garden checks the soil every hour.",
        "trVi": "Một cảm biến trong khu vườn trên sân thượng kiểm tra đất mỗi giờ.",
        "trAnswer": "A sensor in the roof garden checks the soil every hour.",
        "trKey": "sensor"
      },
      {
        "en": "Sustainable",
        "ipa": "/səˈsteɪnəbl/",
        "vi": "Bền vững",
        "img": "https://img.invalid/sustainable.jpg",
        "ex": "Cities of the future need sustainable sources of energy.",
        "trVi": "Những thành phố tương lai cần các nguồn năng lượng bền vững.",
        "trAnswer": "Cities of the future need sustainable sources of energy.",
        "trKey": "sustainable"
      },
      {
        "en": "Traffic jam",
        "ipa": "/ˈtræfɪk dʒæm/",
        "vi": "Tắc nghẽn giao thông",
        "img": "https://img.invalid/traffic-jam.jpg",
        "ex": "Phong was late for school because of a traffic jam.",
        "trVi": "Phong đến trường muộn vì tắc đường.",
        "trAnswer": "Phong was late for school because of a traffic jam.",
        "trKey": "traffic jam"
      },
      {
        "en": "Liveable",
        "ipa": "/ˈlɪvəbl/",
        "vi": "Đáng sống",
        "img": "https://img.invalid/liveable.jpg",
        "ex": "Planners want to make the city more liveable for everyone.",
        "trVi": "Các nhà quy hoạch muốn biến thành phố trở nên đáng sống hơn cho mọi người.",
        "trAnswer": "Planners want to make the city more liveable for everyone.",
        "trKey": "liveable"
      },
      {
        "en": "Neighbourhood",
        "ipa": "/ˈneɪbəhʊd/",
        "vi": "Khu dân cư",
        "img": "https://img.invalid/neighbourhood.jpg",
        "ex": "Our neighbourhood has a small park where children can play.",
        "trVi": "Khu dân cư của chúng tôi có một công viên nhỏ để trẻ em vui chơi.",
        "trAnswer": "Our neighbourhood has a small park where children can play.",
        "trKey": "neighbourhood"
      },
      {
        "en": "Pedestrian",
        "ipa": "/pəˈdestriən/",
        "vi": "Dành cho người đi bộ",
        "img": "https://img.invalid/pedestrian.jpg",
        "ex": "The city built a new pedestrian street near the lake.",
        "trVi": "Thành phố đã xây một phố đi bộ mới gần hồ.",
        "trAnswer": "The city built a new pedestrian street near the lake.",
        "trKey": "pedestrian"
      },
      {
        "en": "Interact",
        "ipa": "/ˌɪntərˈækt/",
        "vi": "Tương tác",
        "img": "https://img.invalid/interact.jpg",
        "ex": "Smart buildings can interact with residents through an app.",
        "trVi": "Các tòa nhà thông minh có thể tương tác với cư dân qua một ứng dụng.",
        "trAnswer": "Smart buildings can interact with residents through an app.",
        "trKey": "interact"
      },
      {
        "en": "City dweller",
        "ipa": "/ˈsɪti ˈdwelə/",
        "vi": "Người dân thành phố",
        "img": "https://img.invalid/city-dweller.jpg",
        "ex": "Many city dwellers use bicycles to avoid traffic jams.",
        "trVi": "Nhiều người dân thành phố sử dụng xe đạp để tránh tắc đường.",
        "trAnswer": "Many city dwellers use bicycles to avoid traffic jams.",
        "trKey": "city dweller"
      }
    ],
    "story": {
      "title": "A day in a smart city",
      "titleVi": "Một ngày ở thành phố thông minh",
      "text": "In 2045, Nam lives in a smart city full of skyscrapers and high-rise buildings.<br><br>Every morning, sensors in his neighbourhood tell him the fastest way to avoid a traffic jam. He walks to the pedestrian street and takes a solar bus to work.<br><br>Nam believes that with good infrastructure, cities can become more sustainable and liveable for every city dweller.",
      "textVi": "Vào năm 2045, Nam sống trong một thành phố thông minh với đầy những tòa nhà chọc trời và cao tầng.<br><br>Mỗi sáng, các cảm biến trong khu dân cư của cậu cho cậu biết cách nhanh nhất để tránh tắc đường. Cậu đi bộ ra phố đi bộ và bắt xe buýt năng lượng mặt trời đi làm.<br><br>Nam tin rằng với cơ sở hạ tầng tốt, các thành phố có thể trở nên bền vững và đáng sống hơn cho mọi cư dân thành phố.",
      "used": [
        "Smart city",
        "Skyscraper",
        "High-rise",
        "Sensor",
        "Traffic jam",
        "Pedestrian",
        "Infrastructure",
        "Sustainable",
        "Liveable",
        "City dweller",
        "Neighbourhood"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🌏",
    "title": "ASEAN AND VIET NAM",
    "titleVi": "ASEAN và Việt Nam",
    "words": [
      {
        "en": "Community",
        "ipa": "/kəˈmjuːnəti/",
        "vi": "Cộng đồng",
        "img": "https://img.invalid/community.jpg",
        "ex": "ASEAN is a community of ten countries in Southeast Asia.",
        "trVi": "ASEAN là một cộng đồng gồm mười quốc gia ở Đông Nam Á.",
        "trAnswer": "ASEAN is a community of ten countries in Southeast Asia.",
        "trKey": "community"
      },
      {
        "en": "Cultural exchange",
        "ipa": "/ˈkʌltʃərəl ɪksˈtʃeɪndʒ/",
        "vi": "Trao đổi văn hóa",
        "img": "https://img.invalid/cultural-exchange.jpg",
        "ex": "The ASEAN Youth Programme offers students a chance for cultural exchange.",
        "trVi": "Chương trình Thanh niên ASEAN mang đến cho học sinh cơ hội trao đổi văn hóa.",
        "trAnswer": "The ASEAN Youth Programme offers students a chance for cultural exchange.",
        "trKey": "cultural exchange"
      },
      {
        "en": "Celebration",
        "ipa": "/ˌselɪˈbreɪʃn/",
        "vi": "Lễ kỷ niệm",
        "img": "https://img.invalid/celebration.jpg",
        "ex": "There will be a big celebration for ASEAN Day this year.",
        "trVi": "Sẽ có một lễ kỷ niệm lớn cho Ngày ASEAN năm nay.",
        "trAnswer": "There will be a big celebration for ASEAN Day this year.",
        "trKey": "celebration"
      },
      {
        "en": "Volunteer",
        "ipa": "/ˌvɒlənˈtɪə/",
        "vi": "Làm tình nguyện, tình nguyện viên",
        "img": "https://img.invalid/volunteer.jpg",
        "ex": "Ha decided to volunteer for the ASEAN school tour programme.",
        "trVi": "Hà quyết định làm tình nguyện viên cho chương trình tham quan trường học ASEAN.",
        "trAnswer": "Ha decided to volunteer for the ASEAN school tour programme.",
        "trKey": "volunteer"
      },
      {
        "en": "Youth",
        "ipa": "/juːθ/",
        "vi": "Tuổi trẻ, giới trẻ",
        "img": "https://img.invalid/youth.jpg",
        "ex": "The youth of ASEAN countries share many common interests.",
        "trVi": "Giới trẻ của các nước ASEAN có nhiều điểm chung.",
        "trAnswer": "The youth of ASEAN countries share many common interests.",
        "trKey": "youth"
      },
      {
        "en": "Take part in",
        "ipa": "/ˌteɪk ˈpɑːt ɪn/",
        "vi": "Tham gia",
        "img": "https://img.invalid/take-part-in.jpg",
        "ex": "Our school will take part in the ASEAN Youth Programme next month.",
        "trVi": "Trường chúng tôi sẽ tham gia Chương trình Thanh niên ASEAN vào tháng tới.",
        "trAnswer": "Our school will take part in the ASEAN Youth Programme next month.",
        "trKey": "take part in"
      },
      {
        "en": "Represent",
        "ipa": "/ˌreprɪˈzent/",
        "vi": "Đại diện",
        "img": "https://img.invalid/represent.jpg",
        "ex": "An was chosen to represent Viet Nam at the ASEAN forum.",
        "trVi": "An được chọn để đại diện cho Việt Nam tại diễn đàn ASEAN.",
        "trAnswer": "An was chosen to represent Viet Nam at the ASEAN forum.",
        "trKey": "represent"
      },
      {
        "en": "Strengthen",
        "ipa": "/ˈstreŋθn/",
        "vi": "Tăng cường",
        "img": "https://img.invalid/strengthen.jpg",
        "ex": "The two countries want to strengthen their relationship through trade.",
        "trVi": "Hai nước muốn tăng cường mối quan hệ của mình thông qua thương mại.",
        "trAnswer": "The two countries want to strengthen their relationship through trade.",
        "trKey": "strengthen"
      },
      {
        "en": "Contribution",
        "ipa": "/ˌkɒntrɪˈbjuːʃn/",
        "vi": "Sự đóng góp",
        "img": "https://img.invalid/contribution.jpg",
        "ex": "Viet Nam has made an important contribution to ASEAN's development.",
        "trVi": "Việt Nam đã có những đóng góp quan trọng cho sự phát triển của ASEAN.",
        "trAnswer": "Viet Nam has made an important contribution to ASEAN's development.",
        "trKey": "contribution"
      },
      {
        "en": "Region",
        "ipa": "/ˈriːdʒən/",
        "vi": "Khu vực, vùng",
        "img": "https://img.invalid/region.jpg",
        "ex": "Southeast Asia is a fast-growing region of the world.",
        "trVi": "Đông Nam Á là một khu vực phát triển nhanh trên thế giới.",
        "trAnswer": "Southeast Asia is a fast-growing region of the world.",
        "trKey": "region"
      },
      {
        "en": "Leadership skills",
        "ipa": "/ˈliːdəʃɪp skɪlz/",
        "vi": "Kỹ năng lãnh đạo",
        "img": "https://img.invalid/leadership-skills.jpg",
        "ex": "The programme helps students develop leadership skills.",
        "trVi": "Chương trình giúp học sinh phát triển kỹ năng lãnh đạo.",
        "trAnswer": "The programme helps students develop leadership skills.",
        "trKey": "leadership skills"
      },
      {
        "en": "Qualify",
        "ipa": "/ˈkwɒlɪfaɪ/",
        "vi": "Đủ điều kiện, đủ tiêu chuẩn",
        "img": "https://img.invalid/qualify.jpg",
        "ex": "Students must qualify for an interview before joining the ASEAN tour.",
        "trVi": "Học sinh phải đủ điều kiện phỏng vấn trước khi tham gia chuyến tham quan ASEAN.",
        "trAnswer": "Students must qualify for an interview before joining the ASEAN tour.",
        "trKey": "qualify"
      }
    ],
    "story": {
      "title": "An ASEAN adventure",
      "titleVi": "Một chuyến phiêu lưu ASEAN",
      "text": "This year, Ha's school took part in the ASEAN Youth Programme, a cultural exchange between students from ten countries.<br><br>To qualify, Ha had to represent her class in an interview about ASEAN. She was so happy when she was chosen!<br><br>During the trip, Ha met young people from the whole region and joined a celebration of ASEAN Day. She realised that small contributions from young volunteers can help strengthen the ASEAN community.",
      "textVi": "Năm nay, trường của Hà đã tham gia Chương trình Thanh niên ASEAN, một chương trình trao đổi văn hóa giữa học sinh mười quốc gia.<br><br>Để đủ điều kiện, Hà phải đại diện cho lớp mình trong một buổi phỏng vấn về ASEAN. Cô rất vui khi được chọn!<br><br>Trong chuyến đi, Hà đã gặp những người trẻ đến từ khắp khu vực và tham gia một lễ kỷ niệm Ngày ASEAN. Cô nhận ra rằng những đóng góp nhỏ từ các tình nguyện viên trẻ có thể giúp tăng cường cộng đồng ASEAN.",
      "used": [
        "Take part in",
        "Cultural exchange",
        "Qualify",
        "Represent",
        "Region",
        "Celebration",
        "Contribution",
        "Volunteer",
        "Strengthen",
        "Community"
      ]
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🌡️",
    "title": "GLOBAL WARMING",
    "titleVi": "Sự nóng lên toàn cầu",
    "words": [
      {
        "en": "Global warming",
        "ipa": "/ˌɡləʊbl ˈwɔːmɪŋ/",
        "vi": "Sự nóng lên toàn cầu",
        "img": "https://img.invalid/global-warming.jpg",
        "ex": "Global warming is making summers hotter every year.",
        "trVi": "Sự nóng lên toàn cầu đang khiến mùa hè ngày càng nóng hơn.",
        "trAnswer": "Global warming is making summers hotter every year.",
        "trKey": "global warming"
      },
      {
        "en": "Atmosphere",
        "ipa": "/ˈætməsfɪə/",
        "vi": "Khí quyển",
        "img": "https://img.invalid/atmosphere.jpg",
        "ex": "Greenhouse gases trap heat in the Earth's atmosphere.",
        "trVi": "Khí nhà kính giữ nhiệt trong khí quyển của Trái Đất.",
        "trAnswer": "Greenhouse gases trap heat in the Earth's atmosphere.",
        "trKey": "atmosphere"
      },
      {
        "en": "Fossil fuel",
        "ipa": "/ˈfɒsl fjuːəl/",
        "vi": "Nhiên liệu hóa thạch",
        "img": "https://img.invalid/fossil-fuel.jpg",
        "ex": "Burning fossil fuels releases a lot of carbon dioxide.",
        "trVi": "Việc đốt nhiên liệu hóa thạch thải ra rất nhiều khí carbonic.",
        "trAnswer": "Burning fossil fuels releases a lot of carbon dioxide.",
        "trKey": "fossil fuel"
      },
      {
        "en": "Carbon dioxide",
        "ipa": "/ˌkɑːbən daɪˈɒksaɪd/",
        "vi": "Khí carbonic",
        "img": "https://img.invalid/carbon-dioxide.jpg",
        "ex": "Cars and factories produce large amounts of carbon dioxide.",
        "trVi": "Ô tô và nhà máy thải ra một lượng lớn khí carbonic.",
        "trAnswer": "Cars and factories produce large amounts of carbon dioxide.",
        "trKey": "carbon dioxide"
      },
      {
        "en": "Renewable",
        "ipa": "/rɪˈnjuːəbl/",
        "vi": "Có thể tái tạo",
        "img": "https://img.invalid/renewable.jpg",
        "ex": "Wind and solar power are renewable sources of energy.",
        "trVi": "Năng lượng gió và mặt trời là những nguồn năng lượng có thể tái tạo.",
        "trAnswer": "Wind and solar power are renewable sources of energy.",
        "trKey": "renewable"
      },
      {
        "en": "Sea level",
        "ipa": "/ˈsiː levl/",
        "vi": "Mực nước biển",
        "img": "https://img.invalid/sea-level.jpg",
        "ex": "Melting ice is causing the sea level to rise.",
        "trVi": "Băng tan đang khiến mực nước biển dâng cao.",
        "trAnswer": "Melting ice is causing the sea level to rise.",
        "trKey": "sea level"
      },
      {
        "en": "Human activity",
        "ipa": "/ˈhjuːmən ækˈtɪvəti/",
        "vi": "Hoạt động của con người",
        "img": "https://img.invalid/human-activity.jpg",
        "ex": "Scientists say human activity is the main cause of climate change.",
        "trVi": "Các nhà khoa học cho rằng hoạt động của con người là nguyên nhân chính gây biến đổi khí hậu.",
        "trAnswer": "Scientists say human activity is the main cause of climate change.",
        "trKey": "human activity"
      },
      {
        "en": "Impact",
        "ipa": "/ˈɪmpækt/",
        "vi": "Tác động",
        "img": "https://img.invalid/impact.jpg",
        "ex": "Global warming has a serious impact on farming and food supply.",
        "trVi": "Sự nóng lên toàn cầu có tác động nghiêm trọng đến nông nghiệp và nguồn cung thực phẩm.",
        "trAnswer": "Global warming has a serious impact on farming and food supply.",
        "trKey": "impact"
      },
      {
        "en": "Pollutant",
        "ipa": "/pəˈluːtənt/",
        "vi": "Chất gây ô nhiễm",
        "img": "https://img.invalid/pollutant.jpg",
        "ex": "Factories should reduce the pollutants they release into the air.",
        "trVi": "Các nhà máy nên giảm lượng chất gây ô nhiễm thải ra không khí.",
        "trAnswer": "Factories should reduce the pollutants they release into the air.",
        "trKey": "pollutant"
      },
      {
        "en": "Environment",
        "ipa": "/ɪnˈvaɪrənmənt/",
        "vi": "Môi trường",
        "img": "https://img.invalid/environment.jpg",
        "ex": "We all have a responsibility to protect the environment.",
        "trVi": "Tất cả chúng ta đều có trách nhiệm bảo vệ môi trường.",
        "trAnswer": "We all have a responsibility to protect the environment.",
        "trKey": "environment"
      },
      {
        "en": "Consequence",
        "ipa": "/ˈkɒnsɪkwəns/",
        "vi": "Hậu quả",
        "img": "https://img.invalid/consequence.jpg",
        "ex": "Cutting down forests can have a serious consequence for the climate.",
        "trVi": "Việc chặt phá rừng có thể gây ra hậu quả nghiêm trọng cho khí hậu.",
        "trAnswer": "Cutting down forests can have a serious consequence for the climate.",
        "trKey": "consequence"
      },
      {
        "en": "Methane",
        "ipa": "/ˈmiːθeɪn/",
        "vi": "Khí methane",
        "img": "https://img.invalid/methane.jpg",
        "ex": "Farm animals produce methane, a powerful heat-trapping gas.",
        "trVi": "Gia súc trong trang trại thải ra khí methane, một loại khí giữ nhiệt mạnh.",
        "trAnswer": "Farm animals produce methane, a powerful heat-trapping gas.",
        "trKey": "methane"
      }
    ],
    "story": {
      "title": "Small actions, big impact",
      "titleVi": "Hành động nhỏ, tác động lớn",
      "text": "In Geography class, Mrs Nguyen explained that global warming is caused mainly by human activity, especially burning fossil fuels.<br><br>She showed pictures of factories releasing carbon dioxide and other pollutants into the atmosphere. Students learnt that this has a serious impact on the environment, from rising sea levels to extreme weather.<br><br>At the end of the lesson, the class agreed to use more renewable energy at home and to walk to school instead of asking their parents to drive.",
      "textVi": "Trong tiết Địa lý, cô Nguyễn giải thích rằng sự nóng lên toàn cầu chủ yếu do hoạt động của con người, đặc biệt là việc đốt nhiên liệu hóa thạch gây ra.<br><br>Cô cho học sinh xem những bức ảnh nhà máy thải khí carbonic và các chất gây ô nhiễm khác vào khí quyển. Học sinh biết được rằng điều này gây tác động nghiêm trọng đến môi trường, từ mực nước biển dâng cho đến thời tiết cực đoan.<br><br>Cuối tiết học, cả lớp đồng ý sẽ sử dụng nhiều năng lượng tái tạo hơn ở nhà và đi bộ đến trường thay vì nhờ bố mẹ chở.",
      "used": [
        "Global warming",
        "Human activity",
        "Fossil fuel",
        "Carbon dioxide",
        "Pollutant",
        "Atmosphere",
        "Impact",
        "Environment",
        "Sea level",
        "Renewable"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🏛️",
    "title": "PRESERVING OUR HERITAGE",
    "titleVi": "Bảo tồn di sản",
    "words": [
      {
        "en": "Heritage",
        "ipa": "/ˈherɪtɪdʒ/",
        "vi": "Di sản",
        "img": "https://img.invalid/heritage.jpg",
        "ex": "Ha Long Bay is a famous natural heritage site in Viet Nam.",
        "trVi": "Vịnh Hạ Long là một di sản thiên nhiên nổi tiếng của Việt Nam.",
        "trAnswer": "Ha Long Bay is a famous natural heritage site in Viet Nam.",
        "trKey": "heritage"
      },
      {
        "en": "Preserve",
        "ipa": "/prɪˈzɜːv/",
        "vi": "Bảo tồn",
        "img": "https://img.invalid/preserve.jpg",
        "ex": "It is important to preserve old buildings for future generations.",
        "trVi": "Việc bảo tồn các công trình cổ cho các thế hệ tương lai là rất quan trọng.",
        "trAnswer": "It is important to preserve old buildings for future generations.",
        "trKey": "preserve"
      },
      {
        "en": "Ancient",
        "ipa": "/ˈeɪnʃənt/",
        "vi": "Cổ kính, cổ xưa",
        "img": "https://img.invalid/ancient.jpg",
        "ex": "Tourists love walking through the ancient streets of Hoi An.",
        "trVi": "Khách du lịch rất thích đi dạo qua những con phố cổ kính của Hội An.",
        "trAnswer": "Tourists love walking through the ancient streets of Hoi An.",
        "trKey": "ancient"
      },
      {
        "en": "Monument",
        "ipa": "/ˈmɒnjumənt/",
        "vi": "Đài kỷ niệm, di tích",
        "img": "https://img.invalid/monument.jpg",
        "ex": "The city built a monument to remember its national heroes.",
        "trVi": "Thành phố đã xây một đài kỷ niệm để tưởng nhớ những anh hùng dân tộc.",
        "trAnswer": "The city built a monument to remember its national heroes.",
        "trKey": "monument"
      },
      {
        "en": "Temple",
        "ipa": "/ˈtempl/",
        "vi": "Đền, miếu",
        "img": "https://img.invalid/temple.jpg",
        "ex": "Many visitors light incense at the temple during the festival.",
        "trVi": "Nhiều du khách thắp hương tại ngôi đền trong dịp lễ hội.",
        "trAnswer": "Many visitors light incense at the temple during the festival.",
        "trKey": "temple"
      },
      {
        "en": "Restore",
        "ipa": "/rɪˈstɔː/",
        "vi": "Hồi phục, sửa lại",
        "img": "https://img.invalid/restore.jpg",
        "ex": "The old citadel was restored using traditional materials.",
        "trVi": "Thành cổ đã được phục hồi bằng các vật liệu truyền thống.",
        "trAnswer": "The old citadel was restored using traditional materials.",
        "trKey": "restore"
      },
      {
        "en": "Appreciate",
        "ipa": "/əˈpriːʃieɪt/",
        "vi": "Hiểu rõ giá trị, đánh giá cao",
        "img": "https://img.invalid/appreciate.jpg",
        "ex": "Young people should appreciate the value of their local heritage.",
        "trVi": "Người trẻ nên hiểu rõ giá trị của di sản địa phương mình.",
        "trAnswer": "Young people should appreciate the value of their local heritage.",
        "trKey": "appreciate"
      },
      {
        "en": "Citadel",
        "ipa": "/ˈsɪtədel/",
        "vi": "Thành trì, thành cổ",
        "img": "https://img.invalid/citadel.jpg",
        "ex": "The Imperial Citadel of Thang Long is a UNESCO World Heritage Site.",
        "trVi": "Hoàng thành Thăng Long là Di sản Thế giới được UNESCO công nhận.",
        "trAnswer": "The Imperial Citadel of Thang Long is a UNESCO World Heritage Site.",
        "trKey": "citadel"
      },
      {
        "en": "Complex",
        "ipa": "/ˈkɒmpleks/",
        "vi": "Quần thể, tổ hợp",
        "img": "https://img.invalid/complex.jpg",
        "ex": "The temple complex includes over ten small buildings.",
        "trVi": "Quần thể đền thờ này bao gồm hơn mười công trình nhỏ.",
        "trAnswer": "The temple complex includes over ten small buildings.",
        "trKey": "complex"
      },
      {
        "en": "Crowdfunding",
        "ipa": "/ˈkraʊdfʌndɪŋ/",
        "vi": "Huy động vốn từ cộng đồng",
        "img": "https://img.invalid/crowdfunding.jpg",
        "ex": "The village used crowdfunding to repair its old communal house.",
        "trVi": "Ngôi làng đã dùng hình thức huy động vốn từ cộng đồng để sửa lại đình làng cổ.",
        "trAnswer": "The village used crowdfunding to repair its old communal house.",
        "trKey": "crowdfunding"
      },
      {
        "en": "Valley",
        "ipa": "/ˈvæli/",
        "vi": "Thung lũng",
        "img": "https://img.invalid/valley.jpg",
        "ex": "The ancient ruins lie hidden in a quiet valley.",
        "trVi": "Những tàn tích cổ nằm ẩn mình trong một thung lũng yên tĩnh.",
        "trAnswer": "The ancient ruins lie hidden in a quiet valley.",
        "trKey": "valley"
      },
      {
        "en": "Performing arts",
        "ipa": "/pəˈfɔːmɪŋ ɑːts/",
        "vi": "Nghệ thuật biểu diễn",
        "img": "https://img.invalid/performing-arts.jpg",
        "ex": "Ca tru is a traditional Vietnamese performing art.",
        "trVi": "Ca trù là một loại hình nghệ thuật biểu diễn truyền thống của Việt Nam.",
        "trAnswer": "Ca tru is a traditional Vietnamese performing art.",
        "trKey": "performing arts"
      }
    ],
    "story": {
      "title": "Saving the old citadel",
      "titleVi": "Cứu lấy thành cổ",
      "text": "In Mai's hometown, there is an ancient citadel that has stood in the valley for over five hundred years.<br><br>Last year, part of the temple complex began to fall down. The local people wanted to preserve it, so they used crowdfunding to collect money to restore it.<br><br>Now Mai and her friends often visit the monument on weekends. They appreciate the heritage their ancestors left behind, and they even started a small performing arts club to keep local folk songs alive.",
      "textVi": "Ở quê hương của Mai, có một thành cổ đã đứng vững trong thung lũng hơn năm trăm năm.<br><br>Năm ngoái, một phần của quần thể đền thờ bắt đầu xuống cấp. Người dân địa phương muốn bảo tồn nó, vì vậy họ đã dùng hình thức huy động vốn từ cộng đồng để quyên góp tiền phục hồi.<br><br>Giờ đây Mai và bạn bè thường đến thăm di tích vào cuối tuần. Họ hiểu rõ giá trị di sản mà tổ tiên để lại, và thậm chí còn lập một câu lạc bộ nghệ thuật biểu diễn nhỏ để gìn giữ các bài dân ca địa phương.",
      "used": [
        "Ancient",
        "Citadel",
        "Valley",
        "Complex",
        "Preserve",
        "Crowdfunding",
        "Restore",
        "Monument",
        "Appreciate",
        "Heritage",
        "Performing arts"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🎓",
    "title": "EDUCATION OPTIONS FOR SCHOOL-LEAVERS",
    "titleVi": "Lựa chọn học tập cho học sinh tốt nghiệp THPT",
    "words": [
      {
        "en": "School-leaver",
        "ipa": "/ˈskuːl liːvə/",
        "vi": "Học sinh vừa tốt nghiệp THPT",
        "img": "https://img.invalid/school-leaver.jpg",
        "ex": "Many school-leavers are not sure which career path to choose.",
        "trVi": "Nhiều học sinh vừa tốt nghiệp THPT không chắc chắn nên chọn con đường sự nghiệp nào.",
        "trAnswer": "Many school-leavers are not sure which career path to choose.",
        "trKey": "school-leaver"
      },
      {
        "en": "Higher education",
        "ipa": "/ˈhaɪər ˌedʒuˈkeɪʃn/",
        "vi": "Giáo dục đại học",
        "img": "https://img.invalid/higher-education.jpg",
        "ex": "Not every school-leaver decides to continue with higher education.",
        "trVi": "Không phải học sinh nào vừa tốt nghiệp cũng quyết định học tiếp lên đại học.",
        "trAnswer": "Not every school-leaver decides to continue with higher education.",
        "trKey": "higher education"
      },
      {
        "en": "Apprenticeship",
        "ipa": "/əˈprentɪʃɪp/",
        "vi": "Thời gian học nghề, học việc",
        "img": "https://img.invalid/apprenticeship.jpg",
        "ex": "Duy chose an apprenticeship instead of going to university.",
        "trVi": "Duy chọn học nghề thay vì vào đại học.",
        "trAnswer": "Duy chose an apprenticeship instead of going to university.",
        "trKey": "apprenticeship"
      },
      {
        "en": "Bachelor's degree",
        "ipa": "/ˈbætʃələz dɪˈɡriː/",
        "vi": "Bằng cử nhân",
        "img": "https://img.invalid/bachelors-degree.jpg",
        "ex": "It usually takes four years to get a bachelor's degree.",
        "trVi": "Thường mất bốn năm để lấy được bằng cử nhân.",
        "trAnswer": "It usually takes four years to get a bachelor's degree.",
        "trKey": "bachelor's degree"
      },
      {
        "en": "Master's degree",
        "ipa": "/ˈmɑːstəz dɪˈɡriː/",
        "vi": "Bằng thạc sĩ",
        "img": "https://img.invalid/masters-degree.jpg",
        "ex": "Ha plans to get a master's degree after she finishes university.",
        "trVi": "Hà dự định lấy bằng thạc sĩ sau khi học xong đại học.",
        "trAnswer": "Ha plans to get a master's degree after she finishes university.",
        "trKey": "master's degree"
      },
      {
        "en": "Doctorate",
        "ipa": "/ˈdɒktərət/",
        "vi": "Bằng tiến sĩ",
        "img": "https://img.invalid/doctorate.jpg",
        "ex": "Her professor spent seven years earning his doctorate.",
        "trVi": "Giáo sư của cô đã mất bảy năm để lấy bằng tiến sĩ.",
        "trAnswer": "Her professor spent seven years earning his doctorate.",
        "trKey": "doctorate"
      },
      {
        "en": "Qualification",
        "ipa": "/ˌkwɒlɪfɪˈkeɪʃn/",
        "vi": "Bằng cấp, chuyên môn",
        "img": "https://img.invalid/qualification.jpg",
        "ex": "You need the right qualification to become a doctor.",
        "trVi": "Bạn cần có bằng cấp phù hợp để trở thành bác sĩ.",
        "trAnswer": "You need the right qualification to become a doctor.",
        "trKey": "qualification"
      },
      {
        "en": "Entrance exam",
        "ipa": "/ˈentrəns ɪɡˈzæm/",
        "vi": "Kỳ thi tuyển sinh, thi đầu vào",
        "img": "https://img.invalid/entrance-exam.jpg",
        "ex": "Nam is studying hard for the university entrance exam.",
        "trVi": "Nam đang học chăm chỉ cho kỳ thi tuyển sinh đại học.",
        "trAnswer": "Nam is studying hard for the university entrance exam.",
        "trKey": "entrance exam"
      },
      {
        "en": "Graduation",
        "ipa": "/ˌɡrædʒuˈeɪʃn/",
        "vi": "Lễ tốt nghiệp",
        "img": "https://img.invalid/graduation.jpg",
        "ex": "Vy's whole family came to her graduation ceremony.",
        "trVi": "Cả gia đình Vy đã đến dự lễ tốt nghiệp của cô.",
        "trAnswer": "Vy's whole family came to her graduation ceremony.",
        "trKey": "graduation"
      },
      {
        "en": "Institution",
        "ipa": "/ˌɪnstɪˈtjuːʃn/",
        "vi": "Cơ sở đào tạo",
        "img": "https://img.invalid/institution.jpg",
        "ex": "This institution offers both academic and vocational courses.",
        "trVi": "Cơ sở đào tạo này cung cấp cả các khóa học hàn lâm lẫn dạy nghề.",
        "trAnswer": "This institution offers both academic and vocational courses.",
        "trKey": "institution"
      },
      {
        "en": "Professional",
        "ipa": "/prəˈfeʃənl/",
        "vi": "Chuyên nghiệp",
        "img": "https://img.invalid/professional.jpg",
        "ex": "An apprenticeship helps you develop professional skills quickly.",
        "trVi": "Học nghề giúp bạn phát triển kỹ năng chuyên nghiệp một cách nhanh chóng.",
        "trAnswer": "An apprenticeship helps you develop professional skills quickly.",
        "trKey": "professional"
      },
      {
        "en": "Academic",
        "ipa": "/ˌækəˈdemɪk/",
        "vi": "Có tính học thuật",
        "img": "https://img.invalid/academic.jpg",
        "ex": "Some students prefer practical training to academic study.",
        "trVi": "Một số học sinh thích đào tạo thực hành hơn là học thuật.",
        "trAnswer": "Some students prefer practical training to academic study.",
        "trKey": "academic"
      }
    ],
    "story": {
      "title": "Choosing a path",
      "titleVi": "Chọn một con đường",
      "text": "After the entrance exam, Nam had to choose between higher education and an apprenticeship.<br><br>His sister had a bachelor's degree and was now studying for a master's degree, but Nam preferred working with his hands. He decided to join an apprenticeship at a car repair institution instead.<br><br>On the day of his graduation from vocational training, Nam felt proud. He had gained a professional qualification, and he knew that both academic and practical paths could lead to success.",
      "textVi": "Sau kỳ thi tuyển sinh, Nam phải chọn giữa việc học lên cao hơn và học nghề.<br><br>Chị gái của cậu có bằng cử nhân và hiện đang học để lấy bằng thạc sĩ, nhưng Nam lại thích làm việc bằng tay hơn. Cậu quyết định tham gia học nghề tại một cơ sở đào tạo sửa chữa ô tô.<br><br>Vào ngày lễ tốt nghiệp khóa đào tạo nghề, Nam cảm thấy rất tự hào. Cậu đã có được bằng cấp chuyên môn, và cậu hiểu rằng cả con đường học thuật lẫn thực hành đều có thể dẫn đến thành công.",
      "used": [
        "Entrance exam",
        "Higher education",
        "Apprenticeship",
        "Bachelor's degree",
        "Master's degree",
        "Institution",
        "Graduation",
        "Professional",
        "Qualification",
        "Academic"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🧳",
    "title": "BECOMING INDEPENDENT",
    "titleVi": "Trở nên độc lập",
    "words": [
      {
        "en": "Independence",
        "ipa": "/ˌɪndɪˈpendəns/",
        "vi": "Sự độc lập",
        "img": "https://img.invalid/independence.jpg",
        "ex": "Going to university far from home taught Vy real independence.",
        "trVi": "Việc học đại học xa nhà đã dạy cho Vy sự độc lập thực sự.",
        "trAnswer": "Going to university far from home taught Vy real independence.",
        "trKey": "independence"
      },
      {
        "en": "Responsibility",
        "ipa": "/rɪˌspɒnsəˈbɪləti/",
        "vi": "Trách nhiệm",
        "img": "https://img.invalid/responsibility.jpg",
        "ex": "Cooking your own meals is a small responsibility that builds character.",
        "trVi": "Tự nấu ăn cho mình là một trách nhiệm nhỏ giúp rèn luyện tính cách.",
        "trAnswer": "Cooking your own meals is a small responsibility that builds character.",
        "trKey": "responsibility"
      },
      {
        "en": "Self-motivated",
        "ipa": "/ˌself ˈməʊtɪveɪtɪd/",
        "vi": "Có động lực, chủ động",
        "img": "https://img.invalid/self-motivated.jpg",
        "ex": "Self-motivated students finish their homework without being told.",
        "trVi": "Những học sinh chủ động hoàn thành bài tập mà không cần ai nhắc nhở.",
        "trAnswer": "Self-motivated students finish their homework without being told.",
        "trKey": "self-motivated"
      },
      {
        "en": "Time-management skills",
        "ipa": "/ˈtaɪm ˈmænɪdʒmənt skɪlz/",
        "vi": "Kỹ năng quản lý thời gian",
        "img": "https://img.invalid/time-management-skills.jpg",
        "ex": "Living alone helped Duy improve his time-management skills.",
        "trVi": "Việc sống một mình đã giúp Duy cải thiện kỹ năng quản lý thời gian.",
        "trAnswer": "Living alone helped Duy improve his time-management skills.",
        "trKey": "time-management skills"
      },
      {
        "en": "Money-management skills",
        "ipa": "/ˈmʌni ˈmænɪdʒmənt skɪlz/",
        "vi": "Kỹ năng quản lý tiền bạc",
        "img": "https://img.invalid/money-management-skills.jpg",
        "ex": "Students need money-management skills before they leave home.",
        "trVi": "Học sinh cần kỹ năng quản lý tiền bạc trước khi rời khỏi nhà.",
        "trAnswer": "Students need money-management skills before they leave home.",
        "trKey": "money-management skills"
      },
      {
        "en": "Decision-making skills",
        "ipa": "/dɪˈsɪʒn ˈmeɪkɪŋ skɪlz/",
        "vi": "Kỹ năng ra quyết định",
        "img": "https://img.invalid/decision-making-skills.jpg",
        "ex": "Choosing your own subjects at university tests your decision-making skills.",
        "trVi": "Việc tự chọn môn học ở đại học thử thách kỹ năng ra quyết định của bạn.",
        "trAnswer": "Choosing your own subjects at university tests your decision-making skills.",
        "trKey": "decision-making skills"
      },
      {
        "en": "Confidence",
        "ipa": "/ˈkɒnfɪdəns/",
        "vi": "Sự tự tin",
        "img": "https://img.invalid/confidence.jpg",
        "ex": "Living independently gave Mi more confidence in herself.",
        "trVi": "Việc sống tự lập đã mang lại cho Mi nhiều sự tự tin hơn vào bản thân.",
        "trAnswer": "Living independently gave Mi more confidence in herself.",
        "trKey": "confidence"
      },
      {
        "en": "Achieve",
        "ipa": "/əˈtʃiːv/",
        "vi": "Đạt được",
        "img": "https://img.invalid/achieve.jpg",
        "ex": "It takes discipline to achieve your goals when living alone.",
        "trVi": "Cần có kỷ luật để đạt được mục tiêu của mình khi sống một mình.",
        "trAnswer": "It takes discipline to achieve your goals when living alone.",
        "trKey": "achieve"
      },
      {
        "en": "Carry out",
        "ipa": "/ˈkæri aʊt/",
        "vi": "Tiến hành, thực hiện",
        "img": "https://img.invalid/carry-out.jpg",
        "ex": "Nam had to carry out all his daily chores by himself.",
        "trVi": "Nam phải tự mình thực hiện mọi việc nhà hằng ngày.",
        "trAnswer": "Nam had to carry out all his daily chores by himself.",
        "trKey": "carry out"
      },
      {
        "en": "Deal with",
        "ipa": "/ˈdiːl wɪð/",
        "vi": "Giải quyết, đối phó với",
        "img": "https://img.invalid/deal-with.jpg",
        "ex": "Learning to deal with problems alone is part of growing up.",
        "trVi": "Học cách tự mình giải quyết vấn đề là một phần của việc trưởng thành.",
        "trAnswer": "Learning to deal with problems alone is part of growing up.",
        "trKey": "deal with"
      },
      {
        "en": "Motivate",
        "ipa": "/ˈməʊtɪveɪt/",
        "vi": "Thúc đẩy, động viên",
        "img": "https://img.invalid/motivate.jpg",
        "ex": "A part-time job can motivate teenagers to manage their money better.",
        "trVi": "Một công việc bán thời gian có thể thúc đẩy thanh thiếu niên quản lý tiền bạc tốt hơn.",
        "trAnswer": "A part-time job can motivate teenagers to manage their money better.",
        "trKey": "motivate"
      },
      {
        "en": "Self-study",
        "ipa": "/ˈself ˌstʌdi/",
        "vi": "Sự tự học",
        "img": "https://img.invalid/self-study.jpg",
        "ex": "Self-study helps students become more independent learners.",
        "trVi": "Tự học giúp học sinh trở thành những người học độc lập hơn.",
        "trAnswer": "Self-study helps students become more independent learners.",
        "trKey": "self-study"
      }
    ],
    "story": {
      "title": "Living alone for the first time",
      "titleVi": "Lần đầu sống một mình",
      "text": "When Duy moved to the city for university, he had to learn independence quickly.<br><br>At first, it was hard to deal with cooking, cleaning, and paying bills all by himself. But he practised his time-management skills and money-management skills every week.<br><br>By the end of the term, Duy felt proud. He had used his decision-making skills to carry out a daily routine, and this new confidence motivated him to keep improving.",
      "textVi": "Khi Duy chuyển đến thành phố để học đại học, cậu phải học cách sống độc lập rất nhanh.<br><br>Ban đầu, thật khó để tự mình giải quyết việc nấu ăn, dọn dẹp và trả hóa đơn. Nhưng cậu đã luyện tập kỹ năng quản lý thời gian và kỹ năng quản lý tiền bạc mỗi tuần.<br><br>Đến cuối học kỳ, Duy cảm thấy rất tự hào. Cậu đã dùng kỹ năng ra quyết định của mình để thực hiện một lịch trình hằng ngày, và sự tự tin mới này đã thúc đẩy cậu tiếp tục tiến bộ.",
      "used": [
        "Independence",
        "Deal with",
        "Time-management skills",
        "Money-management skills",
        "Decision-making skills",
        "Carry out",
        "Confidence",
        "Motivate"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🤝",
    "title": "SOCIAL ISSUES",
    "titleVi": "Các vấn đề xã hội",
    "words": [
      {
        "en": "Peer pressure",
        "ipa": "/ˈpɪə ˈpreʃə/",
        "vi": "Áp lực từ bạn bè",
        "img": "https://img.invalid/peer-pressure.jpg",
        "ex": "Peer pressure sometimes makes teenagers do things they don't want to.",
        "trVi": "Áp lực từ bạn bè đôi khi khiến thanh thiếu niên làm những điều mình không muốn.",
        "trAnswer": "Peer pressure sometimes makes teenagers do things they don't want to.",
        "trKey": "peer pressure"
      },
      {
        "en": "Cyberbullying",
        "ipa": "/ˈsaɪbəbʊliɪŋ/",
        "vi": "Bắt nạt qua mạng",
        "img": "https://img.invalid/cyberbullying.jpg",
        "ex": "Cyberbullying can hurt people just as much as bullying in person.",
        "trVi": "Bắt nạt qua mạng có thể gây tổn thương cho con người không kém gì bắt nạt trực tiếp.",
        "trAnswer": "Cyberbullying can hurt people just as much as bullying in person.",
        "trKey": "cyberbullying"
      },
      {
        "en": "Bully",
        "ipa": "/ˈbʊli/",
        "vi": "Bắt nạt",
        "img": "https://img.invalid/bully.jpg",
        "ex": "No one should be allowed to bully a classmate at school.",
        "trVi": "Không ai được phép bắt nạt bạn cùng lớp ở trường.",
        "trAnswer": "No one should be allowed to bully a classmate at school.",
        "trKey": "bully"
      },
      {
        "en": "Body shaming",
        "ipa": "/ˈbɒdi ʃeɪmɪŋ/",
        "vi": "Sự chê bai ngoại hình",
        "img": "https://img.invalid/body-shaming.jpg",
        "ex": "Body shaming on social media can seriously affect someone's mental health.",
        "trVi": "Sự chê bai ngoại hình trên mạng xã hội có thể ảnh hưởng nghiêm trọng đến sức khỏe tinh thần của ai đó.",
        "trAnswer": "Body shaming on social media can seriously affect someone's mental health.",
        "trKey": "body shaming"
      },
      {
        "en": "Victim",
        "ipa": "/ˈvɪktɪm/",
        "vi": "Nạn nhân",
        "img": "https://img.invalid/victim.jpg",
        "ex": "The school offered support to every victim of bullying.",
        "trVi": "Nhà trường đã hỗ trợ mọi nạn nhân của nạn bắt nạt.",
        "trAnswer": "The school offered support to every victim of bullying.",
        "trKey": "victim"
      },
      {
        "en": "Self-confidence",
        "ipa": "/ˌself ˈkɒnfɪdəns/",
        "vi": "Sự tự tin vào bản thân",
        "img": "https://img.invalid/self-confidence.jpg",
        "ex": "Being teased online can damage a teenager's self-confidence.",
        "trVi": "Việc bị trêu chọc trên mạng có thể làm tổn hại đến sự tự tin của thanh thiếu niên.",
        "trAnswer": "Being teased online can damage a teenager's self-confidence.",
        "trKey": "self-confidence"
      },
      {
        "en": "Awareness",
        "ipa": "/əˈweənəs/",
        "vi": "Nhận thức",
        "img": "https://img.invalid/awareness.jpg",
        "ex": "The poster campaign aims to raise awareness of cyberbullying.",
        "trVi": "Chiến dịch áp phích nhằm nâng cao nhận thức về nạn bắt nạt qua mạng.",
        "trAnswer": "The poster campaign aims to raise awareness of cyberbullying.",
        "trKey": "awareness"
      },
      {
        "en": "Campaign",
        "ipa": "/kæmˈpeɪn/",
        "vi": "Chiến dịch",
        "img": "https://img.invalid/campaign.jpg",
        "ex": "Our class started a campaign against body shaming at school.",
        "trVi": "Lớp chúng tôi đã phát động một chiến dịch chống lại việc chê bai ngoại hình trong trường.",
        "trAnswer": "Our class started a campaign against body shaming at school.",
        "trKey": "campaign"
      },
      {
        "en": "Depression",
        "ipa": "/dɪˈpreʃn/",
        "vi": "Sự trầm cảm",
        "img": "https://img.invalid/depression.jpg",
        "ex": "Long-term bullying can sometimes lead to depression.",
        "trVi": "Việc bị bắt nạt lâu dài đôi khi có thể dẫn đến trầm cảm.",
        "trAnswer": "Long-term bullying can sometimes lead to depression.",
        "trKey": "depression"
      },
      {
        "en": "Stand up to",
        "ipa": "/ˌstænd ˈʌp tuː/",
        "vi": "Đứng lên chống lại",
        "img": "https://img.invalid/stand-up-to.jpg",
        "ex": "Linh finally decided to stand up to the students who teased her.",
        "trVi": "Cuối cùng Linh quyết định đứng lên chống lại những bạn học đã trêu chọc mình.",
        "trAnswer": "Linh finally decided to stand up to the students who teased her.",
        "trKey": "stand up to"
      },
      {
        "en": "Poverty",
        "ipa": "/ˈpɒvəti/",
        "vi": "Sự nghèo đói",
        "img": "https://img.invalid/poverty.jpg",
        "ex": "Some families still live below the poverty line in rural areas.",
        "trVi": "Một số gia đình ở vùng nông thôn vẫn sống dưới mức nghèo.",
        "trAnswer": "Some families still live below the poverty line in rural areas.",
        "trKey": "poverty"
      },
      {
        "en": "Offensive",
        "ipa": "/əˈfensɪv/",
        "vi": "Gây xúc phạm",
        "img": "https://img.invalid/offensive.jpg",
        "ex": "You should never post offensive comments about someone's appearance.",
        "trVi": "Bạn không bao giờ nên đăng những bình luận gây xúc phạm về ngoại hình của ai đó.",
        "trAnswer": "You should never post offensive comments about someone's appearance.",
        "trKey": "offensive"
      }
    ],
    "story": {
      "title": "Speaking up",
      "titleVi": "Lên tiếng",
      "text": "Linh was often the victim of cyberbullying. Some classmates posted offensive comments about her online, and it felt like body shaming every day.<br><br>At first, she lost her self-confidence and felt something close to depression. But her friends helped her stand up to the bullies and report the messages.<br><br>Later, Linh joined a school campaign to raise awareness about peer pressure and online bullying, so other students would never feel as alone as she once did.",
      "textVi": "Linh thường là nạn nhân của nạn bắt nạt qua mạng. Một số bạn học đã đăng những bình luận gây xúc phạm về cô trên mạng, và điều đó giống như việc bị chê bai ngoại hình mỗi ngày.<br><br>Lúc đầu, cô mất đi sự tự tin vào bản thân và cảm thấy gần như trầm cảm. Nhưng bạn bè đã giúp cô đứng lên chống lại những kẻ bắt nạt và báo cáo các tin nhắn đó.<br><br>Sau đó, Linh đã tham gia một chiến dịch của trường nhằm nâng cao nhận thức về áp lực từ bạn bè và bắt nạt trên mạng, để những học sinh khác sẽ không bao giờ cảm thấy cô đơn như cô đã từng.",
      "used": [
        "Victim",
        "Cyberbullying",
        "Offensive",
        "Body shaming",
        "Self-confidence",
        "Depression",
        "Stand up to",
        "Campaign",
        "Awareness",
        "Peer pressure"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🌿",
    "title": "THE ECOSYSTEM",
    "titleVi": "Hệ sinh thái",
    "words": [
      {
        "en": "Ecosystem",
        "ipa": "/ˈiːkəʊˌsɪstəm/",
        "vi": "Hệ sinh thái",
        "img": "https://img.invalid/ecosystem.jpg",
        "ex": "A national park protects the whole ecosystem, not just one species.",
        "trVi": "Một vườn quốc gia bảo vệ toàn bộ hệ sinh thái, chứ không chỉ một loài.",
        "trAnswer": "A national park protects the whole ecosystem, not just one species.",
        "trKey": "ecosystem"
      },
      {
        "en": "Biodiversity",
        "ipa": "/ˌbaɪəʊdaɪˈvɜːsəti/",
        "vi": "Đa dạng sinh học",
        "img": "https://img.invalid/biodiversity.jpg",
        "ex": "Tropical forests have the highest biodiversity on Earth.",
        "trVi": "Rừng nhiệt đới có mức độ đa dạng sinh học cao nhất trên Trái Đất.",
        "trAnswer": "Tropical forests have the highest biodiversity on Earth.",
        "trKey": "biodiversity"
      },
      {
        "en": "Endangered",
        "ipa": "/ɪnˈdeɪndʒəd/",
        "vi": "Có nguy cơ tuyệt chủng",
        "img": "https://img.invalid/endangered.jpg",
        "ex": "The pangolin is now an endangered species in Viet Nam.",
        "trVi": "Con tê tê hiện là một loài có nguy cơ tuyệt chủng ở Việt Nam.",
        "trAnswer": "The pangolin is now an endangered species in Viet Nam.",
        "trKey": "endangered"
      },
      {
        "en": "Habitat",
        "ipa": "/ˈhæbɪtæt/",
        "vi": "Môi trường sống, khu vực sống",
        "img": "https://img.invalid/habitat.jpg",
        "ex": "Cutting down forests destroys the habitat of many wild animals.",
        "trVi": "Việc chặt phá rừng phá hủy môi trường sống của nhiều loài động vật hoang dã.",
        "trAnswer": "Cutting down forests destroys the habitat of many wild animals.",
        "trKey": "habitat"
      },
      {
        "en": "Wildlife",
        "ipa": "/ˈwaɪldlaɪf/",
        "vi": "Động vật hoang dã",
        "img": "https://img.invalid/wildlife.jpg",
        "ex": "The national park was created to protect local wildlife.",
        "trVi": "Vườn quốc gia được lập ra để bảo vệ động vật hoang dã địa phương.",
        "trAnswer": "The national park was created to protect local wildlife.",
        "trKey": "wildlife"
      },
      {
        "en": "Species",
        "ipa": "/ˈspiːʃiːz/",
        "vi": "Loài",
        "img": "https://img.invalid/species.jpg",
        "ex": "Scientists discovered a new species of fish in the coral reef.",
        "trVi": "Các nhà khoa học đã phát hiện một loài cá mới trong rặng san hô.",
        "trAnswer": "Scientists discovered a new species of fish in the coral reef.",
        "trKey": "species"
      },
      {
        "en": "Conservation",
        "ipa": "/ˌkɒnsəˈveɪʃn/",
        "vi": "Sự bảo tồn",
        "img": "https://img.invalid/conservation.jpg",
        "ex": "The conservation project aims to protect endangered animals.",
        "trVi": "Dự án bảo tồn nhằm bảo vệ các loài động vật có nguy cơ tuyệt chủng.",
        "trAnswer": "The conservation project aims to protect endangered animals.",
        "trKey": "conservation"
      },
      {
        "en": "Coral reef",
        "ipa": "/ˈkɒrəl riːf/",
        "vi": "Rạn san hô",
        "img": "https://img.invalid/coral-reef.jpg",
        "ex": "Warmer seawater is damaging coral reefs around the world.",
        "trVi": "Nước biển ấm lên đang gây hại cho các rạn san hô trên khắp thế giới.",
        "trAnswer": "Warmer seawater is damaging coral reefs around the world.",
        "trKey": "coral reef"
      },
      {
        "en": "National park",
        "ipa": "/ˌnæʃnəl ˈpɑːk/",
        "vi": "Vườn quốc gia",
        "img": "https://img.invalid/national-park.jpg",
        "ex": "Cuc Phuong is the oldest national park in Viet Nam.",
        "trVi": "Cúc Phương là vườn quốc gia lâu đời nhất ở Việt Nam.",
        "trAnswer": "Cuc Phuong is the oldest national park in Viet Nam.",
        "trKey": "national park"
      },
      {
        "en": "Natural resources",
        "ipa": "/ˌnætʃrəl rɪˈsɔːsɪz/",
        "vi": "Tài nguyên thiên nhiên",
        "img": "https://img.invalid/natural-resources.jpg",
        "ex": "We must use natural resources carefully to protect the ecosystem.",
        "trVi": "Chúng ta phải sử dụng tài nguyên thiên nhiên một cách cẩn trọng để bảo vệ hệ sinh thái.",
        "trAnswer": "We must use natural resources carefully to protect the ecosystem.",
        "trKey": "natural resources"
      },
      {
        "en": "Food chain",
        "ipa": "/ˈfuːd tʃeɪn/",
        "vi": "Chuỗi thức ăn",
        "img": "https://img.invalid/food-chain.jpg",
        "ex": "Every animal has its place in the food chain.",
        "trVi": "Mọi loài động vật đều có vị trí của mình trong chuỗi thức ăn.",
        "trAnswer": "Every animal has its place in the food chain.",
        "trKey": "food chain"
      },
      {
        "en": "Tropical forest",
        "ipa": "/ˈtrɒpɪkl ˈfɒrɪst/",
        "vi": "Rừng nhiệt đới",
        "img": "https://img.invalid/tropical-forest.jpg",
        "ex": "A tropical forest is home to millions of different species.",
        "trVi": "Một khu rừng nhiệt đới là nơi sinh sống của hàng triệu loài khác nhau.",
        "trAnswer": "A tropical forest is home to millions of different species.",
        "trKey": "tropical forest"
      }
    ],
    "story": {
      "title": "Protecting the park",
      "titleVi": "Bảo vệ vườn quốc gia",
      "text": "Every summer, Phong's family visits a national park with a huge tropical forest.<br><br>His father, a conservation officer, explained that the park protects an entire ecosystem, from tiny insects to endangered mammals. Phong learnt that every species has a place in the food chain, and losing one can affect the whole habitat.<br><br>On this trip, Phong also saw a coral reef nearby and understood why protecting biodiversity and natural resources matters for the wildlife of the future.",
      "textVi": "Mỗi mùa hè, gia đình Phong đến thăm một vườn quốc gia với một khu rừng nhiệt đới rộng lớn.<br><br>Bố cậu, một nhân viên bảo tồn, giải thích rằng vườn quốc gia bảo vệ cả một hệ sinh thái, từ những loài côn trùng nhỏ bé đến các loài thú có nguy cơ tuyệt chủng. Phong biết được rằng mỗi loài đều có một vị trí trong chuỗi thức ăn, và việc mất đi một loài có thể ảnh hưởng đến toàn bộ môi trường sống.<br><br>Trong chuyến đi này, Phong còn nhìn thấy một rạn san hô gần đó và hiểu được vì sao việc bảo vệ đa dạng sinh học và tài nguyên thiên nhiên lại quan trọng đối với động vật hoang dã trong tương lai.",
      "used": [
        "National park",
        "Tropical forest",
        "Conservation",
        "Ecosystem",
        "Endangered",
        "Species",
        "Food chain",
        "Habitat",
        "Coral reef",
        "Biodiversity",
        "Natural resources",
        "Wildlife"
      ]
    }
  }
];
