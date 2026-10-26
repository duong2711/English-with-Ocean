// Global Success: vocabulary by textbook Unit. New examples and practice sentences.
const GRADE4_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🌍",
    "title": "MY FRIENDS",
    "titleVi": "Bạn bè của em",
    "words": [
      {
        "en": "America",
        "ipa": "/əˈmerɪkə/",
        "vi": "Nước Hoa Kỳ",
        "img": "assets/vocab/grade4/u1/america.webp",
        "ex": "Mary is from America.",
        "trVi": "Mary đến từ nước Hoa Kỳ.",
        "trAnswer": "Mary is from America.",
        "trKey": "america"
      },
      {
        "en": "Australia",
        "ipa": "/ɒˈstreɪliə/",
        "vi": "Nước Ô-xtơ-rây-li-a",
        "img": "assets/vocab/grade4/u1/australia.webp",
        "ex": "Ben is from Australia.",
        "trVi": "Ben đến từ nước Ô-xtơ-rây-li-a.",
        "trAnswer": "Ben is from Australia.",
        "trKey": "australia"
      },
      {
        "en": "Britain",
        "ipa": "/ˈbrɪtn/",
        "vi": "Nước Anh",
        "img": "assets/vocab/grade4/u1/britain.webp",
        "ex": "Lucy is from Britain.",
        "trVi": "Lucy đến từ nước Anh.",
        "trAnswer": "Lucy is from Britain.",
        "trKey": "britain"
      },
      {
        "en": "Japan",
        "ipa": "/dʒəˈpæn/",
        "vi": "Nước Nhật",
        "img": "assets/vocab/grade4/u1/japan.webp",
        "ex": "Nam's pen pal is from Japan.",
        "trVi": "Bạn qua thư của Nam đến từ nước Nhật.",
        "trAnswer": "Nam's pen pal is from Japan.",
        "trKey": "japan"
      },
      {
        "en": "Malaysia",
        "ipa": "/məˈleɪziə/",
        "vi": "Nước Ma-lay-xi-a",
        "img": "assets/vocab/grade4/u1/malaysia.webp",
        "ex": "Linh has a friend from Malaysia.",
        "trVi": "Linh có một người bạn đến từ nước Ma-lay-xi-a.",
        "trAnswer": "Linh has a friend from Malaysia.",
        "trKey": "malaysia"
      },
      {
        "en": "Singapore",
        "ipa": "/ˌsɪŋəˈpɔː/",
        "vi": "Nước Xin-ga-po",
        "img": "assets/vocab/grade4/u1/singapore.webp",
        "ex": "Bill's cousin lives in Singapore.",
        "trVi": "Anh họ của Bill sống ở nước Xin-ga-po.",
        "trAnswer": "Bill's cousin lives in Singapore.",
        "trKey": "singapore"
      },
      {
        "en": "Thailand",
        "ipa": "/ˈtaɪlænd/",
        "vi": "Nước Thái Lan",
        "img": "assets/vocab/grade4/u1/thailand.webp",
        "ex": "Mai's teacher is from Thailand.",
        "trVi": "Cô giáo của Mai đến từ nước Thái Lan.",
        "trAnswer": "Mai's teacher is from Thailand.",
        "trKey": "thailand"
      },
      {
        "en": "Viet Nam",
        "ipa": "/ˌviːetˈnæm/",
        "vi": "Nước Việt Nam",
        "img": "assets/vocab/grade4/u1/viet-nam.webp",
        "ex": "Minh is from Viet Nam.",
        "trVi": "Minh đến từ nước Việt Nam.",
        "trAnswer": "Minh is from Viet Nam.",
        "trKey": "viet nam"
      }
    ],
    "story": {
      "title": "New friends around the world",
      "titleVi": "Những người bạn mới trên khắp thế giới",
      "text": "Minh is a student in Viet Nam. Today he has three new pen pals.<br><br>The first is Mary. She is from America. The second is Ben. He is from Australia. The third is Lucy. She is from Britain.<br><br>Minh is very happy. He wants to write letters to Mary, Ben and Lucy about Viet Nam.",
      "textVi": "Minh là một học sinh ở Việt Nam. Hôm nay bạn ấy có ba người bạn qua thư mới.<br><br>Người đầu tiên là Mary. Bạn ấy đến từ nước Hoa Kỳ. Người thứ hai là Ben. Bạn ấy đến từ nước Ô-xtơ-rây-li-a. Người thứ ba là Lucy. Bạn ấy đến từ nước Anh.<br><br>Minh rất vui. Bạn ấy muốn viết thư cho Mary, Ben và Lucy kể về Việt Nam.",
      "used": [
        "Viet Nam",
        "America",
        "Australia",
        "Britain"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương has a new pen pal! Her name is Mary and she is from <b>america</b>. Dung is excited too — her pen pal is from <b>britain</b>.",
        "keywords": [
          {
            "key": "america",
            "meaningVi": "Nước Hoa Kỳ"
          },
          {
            "key": "britain",
            "meaningVi": "Nước Anh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Where are you from?\" Dương asks another new friend. \"I'm from <b>australia</b>,\" says Ben. Dung's friend is from <b>japan</b>.",
        "keywords": [
          {
            "key": "australia",
            "meaningVi": "Nước Ô-xtơ-rây-li-a"
          },
          {
            "key": "japan",
            "meaningVi": "Nước Nhật"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương shows a map. \"This is <b>singapore</b>, and this is <b>thailand</b>,\" he says. Dung points to another country, \"And this is <b>malaysia</b>!\"",
        "keywords": [
          {
            "key": "singapore",
            "meaningVi": "Nước Xin-ga-po"
          },
          {
            "key": "thailand",
            "meaningVi": "Nước Thái Lan"
          },
          {
            "key": "malaysia",
            "meaningVi": "Nước Ma-lay-xi-a"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Where are you from?\" all the new friends ask Dương and Dung. \"We're from <b>viet nam</b>!\" they answer proudly.",
        "keywords": [
          {
            "key": "viet nam",
            "meaningVi": "Nước Việt Nam"
          }
        ]
      }
    ]
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "⏰",
    "title": "TIME AND DAILY ROUTINES",
    "titleVi": "Thời gian và sinh hoạt hằng ngày",
    "words": [
      {
        "en": "Fifteen",
        "ipa": "/ˌfɪfˈtiːn/",
        "vi": "Số 15",
        "img": "assets/vocab/grade4/u2/fifteen.webp",
        "ex": "It's nine fifteen.",
        "trVi": "Bây giờ là chín giờ mười lăm.",
        "trAnswer": "It's nine fifteen.",
        "trKey": "fifteen"
      },
      {
        "en": "Forty-five",
        "ipa": "/ˌfɔːti ˈfaɪv/",
        "vi": "Số 45",
        "img": "assets/vocab/grade4/u2/forty-five.webp",
        "ex": "It's seven forty-five.",
        "trVi": "Bây giờ là bảy giờ bốn mươi lăm.",
        "trAnswer": "It's seven forty-five.",
        "trKey": "forty-five"
      },
      {
        "en": "O'clock",
        "ipa": "/əˈklɒk/",
        "vi": "Giờ (dùng sau giờ chẵn)",
        "img": "assets/vocab/grade4/u2/o-clock.webp",
        "ex": "It's six o'clock.",
        "trVi": "Bây giờ là sáu giờ.",
        "trAnswer": "It's six o'clock.",
        "trKey": "o'clock"
      },
      {
        "en": "Thirty",
        "ipa": "/ˈθɜːti/",
        "vi": "Số 30",
        "img": "assets/vocab/grade4/u2/thirty.webp",
        "ex": "It's five thirty.",
        "trVi": "Bây giờ là năm giờ ba mươi.",
        "trAnswer": "It's five thirty.",
        "trKey": "thirty"
      },
      {
        "en": "Get up",
        "ipa": "/ˈget ʌp/",
        "vi": "Thức dậy",
        "img": "assets/vocab/grade4/u2/get-up.webp",
        "ex": "I get up at six o'clock.",
        "trVi": "Em thức dậy lúc sáu giờ.",
        "trAnswer": "I get up at six o'clock.",
        "trKey": "get up"
      },
      {
        "en": "Go to bed",
        "ipa": "/ˈgəʊ tə bed/",
        "vi": "Đi ngủ",
        "img": "assets/vocab/grade4/u2/go-to-bed.webp",
        "ex": "Nam goes to bed at nine o'clock.",
        "trVi": "Nam đi ngủ lúc chín giờ.",
        "trAnswer": "Nam goes to bed at nine o'clock.",
        "trKey": "go to bed"
      },
      {
        "en": "Go to school",
        "ipa": "/ˈgəʊ tə skuːl/",
        "vi": "Đi học",
        "img": "assets/vocab/grade4/u2/go-to-school.webp",
        "ex": "Mai goes to school at six forty-five.",
        "trVi": "Mai đi học lúc sáu giờ bốn mươi lăm.",
        "trAnswer": "Mai goes to school at six forty-five.",
        "trKey": "go to school"
      },
      {
        "en": "Have breakfast",
        "ipa": "/hæv ˈbrekfəst/",
        "vi": "Ăn sáng",
        "img": "assets/vocab/grade4/u2/have-breakfast.webp",
        "ex": "I have breakfast at six fifteen.",
        "trVi": "Em ăn sáng lúc sáu giờ mười lăm.",
        "trAnswer": "I have breakfast at six fifteen.",
        "trKey": "have breakfast"
      }
    ],
    "story": {
      "title": "A busy morning",
      "titleVi": "Một buổi sáng bận rộn",
      "text": "Every morning, Mai gets up at six o'clock. Then she has breakfast at six fifteen.<br><br>She goes to school at six forty-five. Her brother Nam gets up a little later, at six thirty.<br><br>At night, Mai and Nam go to bed at nine o'clock. They always have a good sleep!",
      "textVi": "Mỗi buổi sáng, Mai thức dậy lúc sáu giờ. Sau đó bạn ấy ăn sáng lúc sáu giờ mười lăm.<br><br>Bạn ấy đi học lúc sáu giờ bốn mươi lăm. Em trai của Mai, Nam, thức dậy muộn hơn một chút, lúc sáu giờ ba mươi.<br><br>Vào buổi tối, Mai và Nam đi ngủ lúc chín giờ. Hai bạn luôn ngủ ngon!",
      "used": [
        "Get up",
        "Have breakfast",
        "Go to school",
        "Go to bed"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương wakes up early. \"What time do you <b>get up</b>?\" Dung asks. \"At five <b>forty-five</b>,\" says Dương.",
        "keywords": [
          {
            "key": "get up",
            "meaningVi": "Thức dậy"
          },
          {
            "key": "forty-five",
            "meaningVi": "Số 45"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"What time do you <b>have breakfast</b>?\" \"At six <b>fifteen</b>,\" Dương says, eating quickly.",
        "keywords": [
          {
            "key": "have breakfast",
            "meaningVi": "Ăn sáng"
          },
          {
            "key": "fifteen",
            "meaningVi": "Số 15"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương and Dung <b>go to school</b> together at six <b>thirty</b>. They never want to be late!",
        "keywords": [
          {
            "key": "go to school",
            "meaningVi": "Đi học"
          },
          {
            "key": "thirty",
            "meaningVi": "Số 30"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "At nine <b>o'clock</b> at night, Dương and Dung <b>go to bed</b>. \"Goodnight!\" they say to each other.",
        "keywords": [
          {
            "key": "o'clock",
            "meaningVi": "Giờ (dùng sau giờ chẵn)"
          },
          {
            "key": "go to bed",
            "meaningVi": "Đi ngủ"
          }
        ]
      }
    ]
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "📅",
    "title": "MY WEEK",
    "titleVi": "Tuần lễ của em",
    "words": [
      {
        "en": "Monday",
        "ipa": "/ˈmʌndeɪ/",
        "vi": "Thứ Hai",
        "img": "assets/vocab/grade4/u3/monday.webp",
        "ex": "I study at school on Monday.",
        "trVi": "Em học ở trường vào thứ Hai.",
        "trAnswer": "I study at school on Monday.",
        "trKey": "monday"
      },
      {
        "en": "Tuesday",
        "ipa": "/ˈtjuːzdeɪ/",
        "vi": "Thứ Ba",
        "img": "assets/vocab/grade4/u3/tuesday.webp",
        "ex": "We have English on Tuesday.",
        "trVi": "Chúng em học Tiếng Anh vào thứ Ba.",
        "trAnswer": "We have English on Tuesday.",
        "trKey": "tuesday"
      },
      {
        "en": "Wednesday",
        "ipa": "/ˈwenzdeɪ/",
        "vi": "Thứ Tư",
        "img": "assets/vocab/grade4/u3/wednesday.webp",
        "ex": "It's Wednesday today.",
        "trVi": "Hôm nay là thứ Tư.",
        "trAnswer": "It's Wednesday today.",
        "trKey": "wednesday"
      },
      {
        "en": "Thursday",
        "ipa": "/ˈθɜːzdeɪ/",
        "vi": "Thứ Năm",
        "img": "assets/vocab/grade4/u3/thursday.webp",
        "ex": "Minh plays football on Thursday.",
        "trVi": "Minh chơi bóng đá vào thứ Năm.",
        "trAnswer": "Minh plays football on Thursday.",
        "trKey": "thursday"
      },
      {
        "en": "Friday",
        "ipa": "/ˈfraɪdeɪ/",
        "vi": "Thứ Sáu",
        "img": "assets/vocab/grade4/u3/friday.webp",
        "ex": "I listen to music on Friday.",
        "trVi": "Em nghe nhạc vào thứ Sáu.",
        "trAnswer": "I listen to music on Friday.",
        "trKey": "friday"
      },
      {
        "en": "Saturday",
        "ipa": "/ˈsætədeɪ/",
        "vi": "Thứ Bảy",
        "img": "assets/vocab/grade4/u3/saturday.webp",
        "ex": "Mai does housework on Saturday.",
        "trVi": "Mai làm việc nhà vào thứ Bảy.",
        "trAnswer": "Mai does housework on Saturday.",
        "trKey": "saturday"
      },
      {
        "en": "Sunday",
        "ipa": "/ˈsʌndeɪ/",
        "vi": "Chủ Nhật",
        "img": "assets/vocab/grade4/u3/sunday.webp",
        "ex": "We stay at home on Sunday.",
        "trVi": "Chúng em ở nhà vào Chủ Nhật.",
        "trAnswer": "We stay at home on Sunday.",
        "trKey": "sunday"
      },
      {
        "en": "Do housework",
        "ipa": "/duː ˈhaʊswɜːk/",
        "vi": "Làm việc nhà",
        "img": "assets/vocab/grade4/u3/do-housework.webp",
        "ex": "I do housework on Saturdays.",
        "trVi": "Em làm việc nhà vào các ngày thứ Bảy.",
        "trAnswer": "I do housework on Saturdays.",
        "trKey": "do housework"
      },
      {
        "en": "Listen to music",
        "ipa": "/ˈlɪsn tə ˈmjuːzɪk/",
        "vi": "Nghe nhạc",
        "img": "assets/vocab/grade4/u3/listen-to-music.webp",
        "ex": "Nam listens to music every Sunday.",
        "trVi": "Nam nghe nhạc vào mỗi Chủ Nhật.",
        "trAnswer": "Nam listens to music every Sunday.",
        "trKey": "listen to music"
      },
      {
        "en": "Study at school",
        "ipa": "/ˈstʌdi ət skuːl/",
        "vi": "Học ở trường",
        "img": "assets/vocab/grade4/u3/study-at-school.webp",
        "ex": "I study at school from Monday to Friday.",
        "trVi": "Em học ở trường từ thứ Hai đến thứ Sáu.",
        "trAnswer": "I study at school from Monday to Friday.",
        "trKey": "study at school"
      }
    ],
    "story": {
      "title": "My favourite week",
      "titleVi": "Tuần lễ em thích nhất",
      "text": "Linh studies at school from Monday to Friday. On Thursday, she has music. On Friday, she has art.<br><br>On Saturday, Linh does housework with her mother in the morning. In the afternoon, she listens to music.<br><br>On Sunday, Linh's family stays at home and plays games together. It's her favourite day of the week!",
      "textVi": "Linh học ở trường từ thứ Hai đến thứ Sáu. Vào thứ Năm, bạn ấy học Âm nhạc. Vào thứ Sáu, bạn ấy học Mĩ thuật.<br><br>Vào thứ Bảy, Linh làm việc nhà cùng mẹ vào buổi sáng. Buổi chiều, bạn ấy nghe nhạc.<br><br>Vào Chủ Nhật, gia đình Linh ở nhà và cùng nhau chơi trò chơi. Đó là ngày bạn ấy thích nhất trong tuần!",
      "used": [
        "Study at school",
        "Do housework",
        "Listen to music",
        "Saturday",
        "Sunday"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"What do you do on <b>mondays</b>?\" Dung asks. \"I <b>study at school</b>,\" says Dương.",
        "keywords": [
          {
            "key": "mondays",
            "meaningVi": "Các ngày thứ Hai"
          },
          {
            "key": "study at school",
            "meaningVi": "Học ở trường"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "On <b>tuesday</b> and <b>wednesday</b>, Dương and Dung have art and music at school.",
        "keywords": [
          {
            "key": "tuesday",
            "meaningVi": "Thứ Ba"
          },
          {
            "key": "wednesday",
            "meaningVi": "Thứ Tư"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"What do you do on <b>thursdays</b>?\" \"I play football!\" On <b>fridays</b>, Dung likes to <b>listen to music</b>.",
        "keywords": [
          {
            "key": "thursdays",
            "meaningVi": "Các ngày thứ Năm"
          },
          {
            "key": "fridays",
            "meaningVi": "Các ngày thứ Sáu"
          },
          {
            "key": "listen to music",
            "meaningVi": "Nghe nhạc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "On <b>saturday</b>, Dương and Dung <b>do housework</b>. On <b>sunday</b>, they rest at home.",
        "keywords": [
          {
            "key": "saturday",
            "meaningVi": "Thứ Bảy"
          },
          {
            "key": "do housework",
            "meaningVi": "Làm việc nhà"
          },
          {
            "key": "sunday",
            "meaningVi": "Chủ Nhật"
          }
        ]
      }
    ]
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🎂",
    "title": "MY BIRTHDAY PARTY",
    "titleVi": "Buổi tiệc sinh nhật của em",
    "words": [
      {
        "en": "January",
        "ipa": "/ˈdʒænjuəri/",
        "vi": "Tháng Giêng",
        "img": "assets/vocab/grade4/u4/january.webp",
        "ex": "Linh's birthday is in January.",
        "trVi": "Sinh nhật của Linh vào tháng Giêng.",
        "trAnswer": "Linh's birthday is in January.",
        "trKey": "january"
      },
      {
        "en": "February",
        "ipa": "/ˈfebruəri/",
        "vi": "Tháng Hai",
        "img": "assets/vocab/grade4/u4/february.webp",
        "ex": "My birthday is in February.",
        "trVi": "Sinh nhật của em vào tháng Hai.",
        "trAnswer": "My birthday is in February.",
        "trKey": "february"
      },
      {
        "en": "March",
        "ipa": "/mɑːtʃ/",
        "vi": "Tháng Ba",
        "img": "assets/vocab/grade4/u4/march.webp",
        "ex": "Ben's birthday is in March.",
        "trVi": "Sinh nhật của Ben vào tháng Ba.",
        "trAnswer": "Ben's birthday is in March.",
        "trKey": "march"
      },
      {
        "en": "April",
        "ipa": "/ˈeɪprəl/",
        "vi": "Tháng Tư",
        "img": "assets/vocab/grade4/u4/april.webp",
        "ex": "Mary's birthday is in April.",
        "trVi": "Sinh nhật của Mary vào tháng Tư.",
        "trAnswer": "Mary's birthday is in April.",
        "trKey": "april"
      },
      {
        "en": "May",
        "ipa": "/meɪ/",
        "vi": "Tháng Năm",
        "img": "assets/vocab/grade4/u4/may.webp",
        "ex": "Nam's birthday is in May.",
        "trVi": "Sinh nhật của Nam vào tháng Năm.",
        "trAnswer": "Nam's birthday is in May.",
        "trKey": "may"
      },
      {
        "en": "Birthday",
        "ipa": "/ˈbɜːθdeɪ/",
        "vi": "Ngày sinh",
        "img": "assets/vocab/grade4/u4/birthday.webp",
        "ex": "Happy birthday, Lucy!",
        "trVi": "Chúc mừng sinh nhật, Lucy!",
        "trAnswer": "Happy birthday, Lucy!",
        "trKey": "birthday"
      },
      {
        "en": "Chips",
        "ipa": "/tʃɪps/",
        "vi": "Khoai tây rán",
        "img": "assets/vocab/grade4/u4/chips.webp",
        "ex": "I want some chips.",
        "trVi": "Em muốn một ít khoai tây rán.",
        "trAnswer": "I want some chips.",
        "trKey": "chips"
      },
      {
        "en": "Grapes",
        "ipa": "/greɪps/",
        "vi": "Quả nho",
        "img": "assets/vocab/grade4/u4/grapes.webp",
        "ex": "Mai wants some grapes.",
        "trVi": "Mai muốn một ít nho.",
        "trAnswer": "Mai wants some grapes.",
        "trKey": "grapes"
      },
      {
        "en": "Jam",
        "ipa": "/dʒæm/",
        "vi": "Mứt",
        "img": "assets/vocab/grade4/u4/jam.webp",
        "ex": "Nam wants some jam.",
        "trVi": "Nam muốn một ít mứt.",
        "trAnswer": "Nam wants some jam.",
        "trKey": "jam"
      },
      {
        "en": "Juice",
        "ipa": "/dʒuːs/",
        "vi": "Nước ép",
        "img": "assets/vocab/grade4/u4/juice.webp",
        "ex": "I want some juice.",
        "trVi": "Em muốn một ít nước ép.",
        "trAnswer": "I want some juice.",
        "trKey": "juice"
      },
      {
        "en": "Lemonade",
        "ipa": "/ˌleməˈneɪd/",
        "vi": "Nước chanh",
        "img": "assets/vocab/grade4/u4/lemonade.webp",
        "ex": "Can I have some lemonade?",
        "trVi": "Em xin một ít nước chanh được không?",
        "trAnswer": "Can I have some lemonade?",
        "trKey": "lemonade"
      },
      {
        "en": "Party",
        "ipa": "/ˈpɑːti/",
        "vi": "Buổi tiệc",
        "img": "assets/vocab/grade4/u4/party.webp",
        "ex": "We have a party on Sunday.",
        "trVi": "Chúng em có một buổi tiệc vào Chủ Nhật.",
        "trAnswer": "We have a party on Sunday.",
        "trKey": "party"
      },
      {
        "en": "Water",
        "ipa": "/ˈwɔːtə/",
        "vi": "Nước (uống)",
        "img": "assets/vocab/grade4/u4/water.webp",
        "ex": "I want some water.",
        "trVi": "Em muốn một ít nước.",
        "trAnswer": "I want some water.",
        "trKey": "water"
      }
    ],
    "story": {
      "title": "Lucy's birthday party",
      "titleVi": "Buổi tiệc sinh nhật của Lucy",
      "text": "Lucy's birthday is in April. Today, her friends come to her birthday party.<br><br>\"Happy birthday, Lucy!\" says Minh. There are lots of things to eat and drink: chips, grapes, jam, juice, lemonade and water.<br><br>Everyone is happy at the party. Nam's birthday is in May, so Lucy says, \"See you at your party next month!\"",
      "textVi": "Sinh nhật của Lucy vào tháng Tư. Hôm nay, các bạn của Lucy đến dự tiệc sinh nhật của bạn ấy.<br><br>\"Chúc mừng sinh nhật, Lucy!\" Minh nói. Có rất nhiều món ăn và đồ uống: khoai tây rán, nho, mứt, nước ép, nước chanh và nước lọc.<br><br>Mọi người đều vui vẻ trong buổi tiệc. Sinh nhật của Nam vào tháng Năm, vì vậy Lucy nói, \"Hẹn gặp lại ở buổi tiệc của bạn vào tháng sau nhé!\"",
      "used": [
        "April",
        "Birthday",
        "Chips",
        "Grapes",
        "Jam",
        "Juice",
        "Lemonade",
        "Water",
        "May"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "It's Dung's <b>birthday</b> in <b>march</b>! Dương plans a surprise <b>party</b> for her.",
        "keywords": [
          {
            "key": "birthday",
            "meaningVi": "Ngày sinh"
          },
          {
            "key": "march",
            "meaningVi": "Tháng Ba"
          },
          {
            "key": "party",
            "meaningVi": "Buổi tiệc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"What do you want to eat?\" Dương asks. \"I want some <b>chips</b> and some <b>grapes</b>,\" says Dung.",
        "keywords": [
          {
            "key": "chips",
            "meaningVi": "Khoai tây rán"
          },
          {
            "key": "grapes",
            "meaningVi": "Quả nho"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"What do you want to drink?\" \"I want some <b>juice</b> and some <b>lemonade</b>, please. Not <b>water</b>!\" Dung laughs.",
        "keywords": [
          {
            "key": "juice",
            "meaningVi": "Nước ép"
          },
          {
            "key": "lemonade",
            "meaningVi": "Nước chanh"
          },
          {
            "key": "water",
            "meaningVi": "Nước (uống)"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "There is also some <b>jam</b> for the bread. \"My birthday is in <b>january</b> — you can come to my party too!\" Dương says. \"Mine is in <b>february</b>!\" adds a friend.",
        "keywords": [
          {
            "key": "jam",
            "meaningVi": "Mứt"
          },
          {
            "key": "january",
            "meaningVi": "Tháng Giêng"
          },
          {
            "key": "february",
            "meaningVi": "Tháng Hai"
          }
        ]
      }
    ]
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🎨",
    "title": "THINGS WE CAN DO",
    "titleVi": "Những điều em có thể làm",
    "words": [
      {
        "en": "Can",
        "ipa": "/kən/, /kæn/",
        "vi": "Có thể, biết (làm gì)",
        "img": "assets/vocab/grade4/u5/can.webp",
        "ex": "I can ride a bike.",
        "trVi": "Em có thể đi xe đạp.",
        "trAnswer": "I can ride a bike.",
        "trKey": "can"
      },
      {
        "en": "Cook",
        "ipa": "/kʊk/",
        "vi": "Nấu ăn",
        "img": "assets/vocab/grade4/u5/cook.webp",
        "ex": "Mai can cook.",
        "trVi": "Mai biết nấu ăn.",
        "trAnswer": "Mai can cook.",
        "trKey": "cook"
      },
      {
        "en": "Draw",
        "ipa": "/drɔː/",
        "vi": "Vẽ",
        "img": "assets/vocab/grade4/u5/draw.webp",
        "ex": "Nam can draw well.",
        "trVi": "Nam vẽ rất giỏi.",
        "trAnswer": "Nam can draw well.",
        "trKey": "draw"
      },
      {
        "en": "Play the guitar",
        "ipa": "/pleɪ ðə gɪˈtɑː/",
        "vi": "Chơi đàn ghi ta",
        "img": "assets/vocab/grade4/u5/play-the-guitar.webp",
        "ex": "Ben can play the guitar.",
        "trVi": "Ben biết chơi đàn ghi ta.",
        "trAnswer": "Ben can play the guitar.",
        "trKey": "play the guitar"
      },
      {
        "en": "Play the piano",
        "ipa": "/pleɪ ðə piˈænəʊ/",
        "vi": "Chơi đàn piano",
        "img": "assets/vocab/grade4/u5/play-the-piano.webp",
        "ex": "Linh can play the piano.",
        "trVi": "Linh biết chơi đàn piano.",
        "trAnswer": "Linh can play the piano.",
        "trKey": "play the piano"
      },
      {
        "en": "Ride a bike",
        "ipa": "/raɪd ə baɪk/",
        "vi": "Đạp xe",
        "img": "assets/vocab/grade4/u5/ride-a-bike.webp",
        "ex": "Can you ride a bike?",
        "trVi": "Bạn có biết đi xe đạp không?",
        "trAnswer": "Can you ride a bike?",
        "trKey": "ride a bike"
      },
      {
        "en": "Ride a horse",
        "ipa": "/raɪd ə hɔːs/",
        "vi": "Cưỡi ngựa",
        "img": "assets/vocab/grade4/u5/ride-a-horse.webp",
        "ex": "Mary can ride a horse.",
        "trVi": "Mary biết cưỡi ngựa.",
        "trAnswer": "Mary can ride a horse.",
        "trKey": "ride a horse"
      },
      {
        "en": "Roller skate",
        "ipa": "/ˈrəʊlə skeɪt/",
        "vi": "Trượt patanh",
        "img": "assets/vocab/grade4/u5/roller-skate.webp",
        "ex": "I can roller skate.",
        "trVi": "Em biết trượt patanh.",
        "trAnswer": "I can roller skate.",
        "trKey": "roller skate"
      },
      {
        "en": "Swim",
        "ipa": "/swɪm/",
        "vi": "Bơi",
        "img": "assets/vocab/grade4/u5/swim.webp",
        "ex": "Bill can swim very well.",
        "trVi": "Bill bơi rất giỏi.",
        "trAnswer": "Bill can swim very well.",
        "trKey": "swim"
      },
      {
        "en": "But",
        "ipa": "/bʌt/",
        "vi": "Nhưng",
        "img": "assets/vocab/grade4/u5/but.webp",
        "ex": "She can't swim, but she can ride a bike.",
        "trVi": "Bạn ấy không biết bơi, nhưng biết đi xe đạp.",
        "trAnswer": "She can't swim, but she can ride a bike.",
        "trKey": "but"
      }
    ],
    "story": {
      "title": "Our talent show",
      "titleVi": "Buổi trình diễn tài năng của chúng em",
      "text": "Our class has a talent show today. Ben can play the guitar, and Linh can play the piano.<br><br>Mai can cook and draw very well. Bill can swim, and Mary can ride a horse.<br><br>\"Can you roller skate?\" Nam asks me. \"No, I can't roller skate, but I can ride a bike,\" I say. Everyone claps for their friends.",
      "textVi": "Lớp em có buổi trình diễn tài năng hôm nay. Ben biết chơi đàn ghi ta, còn Linh biết chơi đàn piano.<br><br>Mai biết nấu ăn và vẽ rất giỏi. Bill biết bơi, còn Mary biết cưỡi ngựa.<br><br>\"Bạn có biết trượt patanh không?\" Nam hỏi em. \"Không, mình không biết trượt patanh, nhưng mình biết đi xe đạp,\" em nói. Mọi người vỗ tay cho các bạn của mình.",
      "used": [
        "Play the guitar",
        "Play the piano",
        "Cook",
        "Draw",
        "Swim",
        "Ride a horse",
        "Roller skate",
        "Ride a bike",
        "But"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"<b>Can</b> you <b>play the guitar</b>?\" Dung asks. \"Yes, I can!\" says Dương proudly.",
        "keywords": [
          {
            "key": "Can",
            "meaningVi": "Có thể, biết (làm gì)"
          },
          {
            "key": "play the guitar",
            "meaningVi": "Chơi đàn ghi ta"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Can you <b>play the piano</b>?\" \"No, I can't, <b>but</b> I can <b>cook</b>!\" Dung laughs.",
        "keywords": [
          {
            "key": "play the piano",
            "meaningVi": "Chơi đàn piano"
          },
          {
            "key": "but",
            "meaningVi": "Nhưng"
          },
          {
            "key": "cook",
            "meaningVi": "Nấu ăn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương can <b>draw</b> and <b>swim</b> very well. Dung can <b>ride a horse</b> too!",
        "keywords": [
          {
            "key": "draw",
            "meaningVi": "Vẽ"
          },
          {
            "key": "swim",
            "meaningVi": "Bơi"
          },
          {
            "key": "ride a horse",
            "meaningVi": "Cưỡi ngựa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Can you <b>roller skate</b>?\" \"No, but I can <b>ride a bike</b>!\" Dương says, and they ride together.",
        "keywords": [
          {
            "key": "roller skate",
            "meaningVi": "Trượt patanh"
          },
          {
            "key": "ride a bike",
            "meaningVi": "Đạp xe"
          }
        ]
      }
    ]
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🏫",
    "title": "OUR SCHOOL FACILITIES",
    "titleVi": "Cơ sở vật chất của trường em",
    "words": [
      {
        "en": "City",
        "ipa": "/ˈsɪti/",
        "vi": "Thành phố",
        "img": "assets/vocab/grade4/u6/city.webp",
        "ex": "My school is in the city.",
        "trVi": "Trường của em ở thành phố.",
        "trAnswer": "My school is in the city.",
        "trKey": "city"
      },
      {
        "en": "Mountains",
        "ipa": "/ˈmaʊntənz/",
        "vi": "Vùng núi",
        "img": "assets/vocab/grade4/u6/mountains.webp",
        "ex": "Their school is in the mountains.",
        "trVi": "Trường của các bạn ấy ở vùng núi.",
        "trAnswer": "Their school is in the mountains.",
        "trKey": "mountains"
      },
      {
        "en": "Town",
        "ipa": "/taʊn/",
        "vi": "Thị trấn",
        "img": "assets/vocab/grade4/u6/town.webp",
        "ex": "Linh's school is in the town.",
        "trVi": "Trường của Linh ở thị trấn.",
        "trAnswer": "Linh's school is in the town.",
        "trKey": "town"
      },
      {
        "en": "Village",
        "ipa": "/ˈvɪlɪdʒ/",
        "vi": "Ngôi làng",
        "img": "assets/vocab/grade4/u6/village.webp",
        "ex": "Nam's school is in the village.",
        "trVi": "Trường của Nam ở trong làng.",
        "trAnswer": "Nam's school is in the village.",
        "trKey": "village"
      },
      {
        "en": "Building",
        "ipa": "/ˈbɪldɪŋ/",
        "vi": "Toà nhà",
        "img": "assets/vocab/grade4/u6/building.webp",
        "ex": "There are three buildings at my school.",
        "trVi": "Trường em có ba toà nhà.",
        "trAnswer": "There are three buildings at my school.",
        "trKey": "building"
      },
      {
        "en": "Computer room",
        "ipa": "/kəmˈpjuːtə ruːm/",
        "vi": "Phòng máy tính",
        "img": "assets/vocab/grade4/u6/computer-room.webp",
        "ex": "There is one computer room.",
        "trVi": "Có một phòng máy tính.",
        "trAnswer": "There is one computer room.",
        "trKey": "computer room"
      },
      {
        "en": "School garden",
        "ipa": "/skuːl ˈgɑːdn/",
        "vi": "Vườn trường",
        "img": "assets/vocab/grade4/u6/school-garden.webp",
        "ex": "There is a school garden.",
        "trVi": "Có một vườn trường.",
        "trAnswer": "There is a school garden.",
        "trKey": "school garden"
      },
      {
        "en": "Playground",
        "ipa": "/ˈpleɪgraʊnd/",
        "vi": "Sân chơi",
        "img": "assets/vocab/grade4/u6/playground.webp",
        "ex": "There is one playground.",
        "trVi": "Có một sân chơi.",
        "trAnswer": "There is one playground.",
        "trKey": "playground"
      }
    ],
    "story": {
      "title": "Four schools, four places",
      "titleVi": "Bốn ngôi trường, bốn địa điểm",
      "text": "My school is in the city. It has three tall buildings and two computer rooms.<br><br>Linh's school is in the town. Nam's school is in a small village, and Mai's school is in the mountains.<br><br>Every school has a playground and a school garden. We all love our schools!",
      "textVi": "Trường của em ở thành phố. Trường có ba toà nhà cao và hai phòng máy tính.<br><br>Trường của Linh ở thị trấn. Trường của Nam ở một ngôi làng nhỏ, còn trường của Mai ở vùng núi.<br><br>Trường nào cũng có một sân chơi và một vườn trường. Chúng em đều yêu quý ngôi trường của mình!",
      "used": [
        "City",
        "Building",
        "Computer room",
        "Town",
        "Village",
        "Mountains",
        "Playground",
        "School garden"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"Where's your school, Dương?\" \"It's in the <b>city</b>. It has three <b>buildings</b>,\" he says.",
        "keywords": [
          {
            "key": "city",
            "meaningVi": "Thành phố"
          },
          {
            "key": "buildings",
            "meaningVi": "Các toà nhà"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"My school is in the <b>town</b>,\" says Dung. \"It has one <b>computer room</b>.\"",
        "keywords": [
          {
            "key": "town",
            "meaningVi": "Thị trấn"
          },
          {
            "key": "computer room",
            "meaningVi": "Phòng máy tính"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Their friend's school is in a <b>village</b> near the <b>mountains</b>. It's small but very beautiful.",
        "keywords": [
          {
            "key": "village",
            "meaningVi": "Ngôi làng"
          },
          {
            "key": "mountains",
            "meaningVi": "Vùng núi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Every school has a <b>playground</b> and a <b>school garden</b> for the students to enjoy.",
        "keywords": [
          {
            "key": "playground",
            "meaningVi": "Sân chơi"
          },
          {
            "key": "school garden",
            "meaningVi": "Vườn trường"
          }
        ]
      }
    ]
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🗓️",
    "title": "OUR TIMETABLES",
    "titleVi": "Thời khoá biểu của chúng em",
    "words": [
      {
        "en": "Art",
        "ipa": "/ɑːt/",
        "vi": "Môn Mĩ thuật",
        "img": "assets/vocab/grade4/u7/art.webp",
        "ex": "I have art on Monday.",
        "trVi": "Em học Mĩ thuật vào thứ Hai.",
        "trAnswer": "I have art on Monday.",
        "trKey": "art"
      },
      {
        "en": "English",
        "ipa": "/ˈɪŋglɪʃ/",
        "vi": "Môn Tiếng Anh",
        "img": "assets/vocab/grade4/u7/english.webp",
        "ex": "I have English and science today.",
        "trVi": "Hôm nay em học Tiếng Anh và Khoa học.",
        "trAnswer": "I have English and science today.",
        "trKey": "english"
      },
      {
        "en": "History and geography",
        "ipa": "/ˈhɪstri ænd dʒiˈɒgrəfi/",
        "vi": "Môn Lịch sử và Địa lí",
        "img": "assets/vocab/grade4/u7/history-and-geography.webp",
        "ex": "We have history and geography on Tuesday.",
        "trVi": "Chúng em học Lịch sử và Địa lí vào thứ Ba.",
        "trAnswer": "We have history and geography on Tuesday.",
        "trKey": "history and geography"
      },
      {
        "en": "Maths",
        "ipa": "/mæθs/",
        "vi": "Môn Toán, toán học",
        "img": "assets/vocab/grade4/u7/maths.webp",
        "ex": "I have maths on Wednesday.",
        "trVi": "Em học Toán vào thứ Tư.",
        "trAnswer": "I have maths on Wednesday.",
        "trKey": "maths"
      },
      {
        "en": "Music",
        "ipa": "/ˈmjuːzɪk/",
        "vi": "Môn Âm nhạc",
        "img": "assets/vocab/grade4/u7/music.webp",
        "ex": "Mai has music on Wednesday.",
        "trVi": "Mai học Âm nhạc vào thứ Tư.",
        "trAnswer": "Mai has music on Wednesday.",
        "trKey": "music"
      },
      {
        "en": "Science",
        "ipa": "/ˈsaɪəns/",
        "vi": "Môn Khoa học",
        "img": "assets/vocab/grade4/u7/science.webp",
        "ex": "I have science on Monday.",
        "trVi": "Em học Khoa học vào thứ Hai.",
        "trAnswer": "I have science on Monday.",
        "trKey": "science"
      },
      {
        "en": "Vietnamese",
        "ipa": "/ˌviːetnəˈmiːz/",
        "vi": "Môn Tiếng Việt",
        "img": "assets/vocab/grade4/u7/vietnamese.webp",
        "ex": "We have Vietnamese every day.",
        "trVi": "Chúng em học Tiếng Việt mỗi ngày.",
        "trAnswer": "We have Vietnamese every day.",
        "trKey": "vietnamese"
      }
    ],
    "story": {
      "title": "My timetable",
      "titleVi": "Thời khoá biểu của em",
      "text": "I have a busy timetable this year. On Monday, I have Vietnamese, maths, science and English.<br><br>On Wednesday, I have science, maths, Vietnamese and history and geography. I have art and music too!<br><br>\"When do you have maths?\" Linh asks me. \"I have it on Monday and Wednesday,\" I say.",
      "textVi": "Năm nay em có thời khoá biểu khá bận rộn. Vào thứ Hai, em học Tiếng Việt, Toán, Khoa học và Tiếng Anh.<br><br>Vào thứ Tư, em học Khoa học, Toán, Tiếng Việt và Lịch sử và Địa lí. Em cũng học Mĩ thuật và Âm nhạc nữa!<br><br>\"Bạn học Toán khi nào?\" Linh hỏi em. \"Mình học vào thứ Hai và thứ Tư,\" em nói.",
      "used": [
        "Vietnamese",
        "Maths",
        "Science",
        "English",
        "History and geography",
        "Art",
        "Music"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"What subjects do you have today?\" Dung asks. \"I have <b>vietnamese</b> and <b>science</b>,\" says Dương.",
        "keywords": [
          {
            "key": "vietnamese",
            "meaningVi": "Môn Tiếng Việt"
          },
          {
            "key": "science",
            "meaningVi": "Môn Khoa học"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"When do you have <b>maths</b>?\" \"I have it on Monday. I also have <b>english</b> today,\" Dương replies.",
        "keywords": [
          {
            "key": "maths",
            "meaningVi": "Môn Toán, toán học"
          },
          {
            "key": "english",
            "meaningVi": "Môn Tiếng Anh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "On Tuesday, Dung has <b>history and geography</b>. She loves learning about the world.",
        "keywords": [
          {
            "key": "history and geography",
            "meaningVi": "Môn Lịch sử và Địa lí"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "On Friday, Dương and Dung have <b>art</b> and <b>music</b>. It's their favourite day!",
        "keywords": [
          {
            "key": "art",
            "meaningVi": "Môn Mĩ thuật"
          },
          {
            "key": "music",
            "meaningVi": "Môn Âm nhạc"
          }
        ]
      }
    ]
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "📚",
    "title": "MY FAVOURITE SUBJECTS",
    "titleVi": "Môn học em thích nhất",
    "words": [
      {
        "en": "IT",
        "ipa": "/aɪ ˈtiː/",
        "vi": "Môn Tin học, môn Công nghệ thông tin",
        "img": "assets/vocab/grade4/u8/it.webp",
        "ex": "My favourite subject is IT.",
        "trVi": "Môn học em thích nhất là Tin học.",
        "trAnswer": "My favourite subject is IT.",
        "trKey": "it"
      },
      {
        "en": "PE",
        "ipa": "/piː ˈiː/",
        "vi": "Môn Thể dục, môn Giáo dục thể chất",
        "img": "assets/vocab/grade4/u8/pe.webp",
        "ex": "Nam's favourite subject is PE.",
        "trVi": "Môn học Nam thích nhất là Thể dục.",
        "trAnswer": "Nam's favourite subject is PE.",
        "trKey": "pe"
      },
      {
        "en": "English teacher",
        "ipa": "/ˈɪŋglɪʃ ˈtiːtʃə/",
        "vi": "Giáo viên (dạy Tiếng Anh)",
        "img": "assets/vocab/grade4/u8/english-teacher.webp",
        "ex": "I want to be an English teacher.",
        "trVi": "Em muốn trở thành giáo viên Tiếng Anh.",
        "trAnswer": "I want to be an English teacher.",
        "trKey": "english teacher"
      },
      {
        "en": "Painter",
        "ipa": "/ˈpeɪntə/",
        "vi": "Hoạ sĩ",
        "img": "assets/vocab/grade4/u8/painter.webp",
        "ex": "Mai wants to be a painter.",
        "trVi": "Mai muốn trở thành hoạ sĩ.",
        "trAnswer": "Mai wants to be a painter.",
        "trKey": "painter"
      },
      {
        "en": "Maths teacher",
        "ipa": "/mæθs ˈtiːtʃə/",
        "vi": "Giáo viên (dạy Toán)",
        "img": "assets/vocab/grade4/u8/maths-teacher.webp",
        "ex": "Ben wants to be a maths teacher.",
        "trVi": "Ben muốn trở thành giáo viên Toán.",
        "trAnswer": "Ben wants to be a maths teacher.",
        "trKey": "maths teacher"
      },
      {
        "en": "Because",
        "ipa": "/bɪˈkɒz/",
        "vi": "Bởi vì",
        "img": "assets/vocab/grade4/u8/because.webp",
        "ex": "I like art because it's fun.",
        "trVi": "Em thích Mĩ thuật vì môn đó rất vui.",
        "trAnswer": "I like art because it's fun.",
        "trKey": "because"
      },
      {
        "en": "Why",
        "ipa": "/waɪ/",
        "vi": "Tại sao",
        "img": "assets/vocab/grade4/u8/why.webp",
        "ex": "Why do you like English?",
        "trVi": "Tại sao bạn thích Tiếng Anh?",
        "trAnswer": "Why do you like English?",
        "trKey": "why"
      }
    ],
    "story": {
      "title": "What do you want to be?",
      "titleVi": "Bạn muốn trở thành gì?",
      "text": "\"What's your favourite subject?\" Ms Hoa asks the class. \"My favourite subject is IT,\" says Minh.<br><br>\"Why do you like it?\" \"Because I want to be a computer scientist,\" he answers.<br><br>Mai likes art because she wants to be a painter. Linh likes English because she wants to be an English teacher. Nam likes PE, and Ben wants to be a maths teacher!",
      "textVi": "\"Môn học em thích nhất là gì?\" cô Hoa hỏi cả lớp. \"Môn học em thích nhất là Tin học,\" Minh nói.<br><br>\"Tại sao em thích môn đó?\" \"Vì em muốn trở thành một nhà khoa học máy tính,\" bạn ấy trả lời.<br><br>Mai thích Mĩ thuật vì bạn ấy muốn trở thành hoạ sĩ. Linh thích Tiếng Anh vì bạn ấy muốn trở thành giáo viên Tiếng Anh. Nam thích Thể dục, còn Ben muốn trở thành giáo viên Toán!",
      "used": [
        "IT",
        "Why",
        "Because",
        "Painter",
        "English teacher",
        "PE",
        "Maths teacher"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"What's your favourite subject?\" Dung asks. \"It's <b>it</b>,\" says Dương. \"<b>why</b> do you like it?\"",
        "keywords": [
          {
            "key": "it",
            "meaningVi": "Môn Tin học"
          },
          {
            "key": "why",
            "meaningVi": "Tại sao"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"<b>because</b> I want to be a scientist! What about you?\" \"My favourite subject is <b>pe</b>,\" says Dung.",
        "keywords": [
          {
            "key": "because",
            "meaningVi": "Bởi vì"
          },
          {
            "key": "pe",
            "meaningVi": "Môn Thể dục"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"I want to be a <b>painter</b>,\" says their friend, holding a paintbrush.",
        "keywords": [
          {
            "key": "painter",
            "meaningVi": "Hoạ sĩ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"I want to be an <b>english teacher</b>,\" says Dung. \"And I want to be a <b>maths teacher</b>!\" says Dương.",
        "keywords": [
          {
            "key": "english teacher",
            "meaningVi": "Giáo viên (dạy Tiếng Anh)"
          },
          {
            "key": "maths teacher",
            "meaningVi": "Giáo viên (dạy Toán)"
          }
        ]
      }
    ]
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🏅",
    "title": "OUR SPORTS DAY",
    "titleVi": "Ngày hội thể thao của chúng em",
    "words": [
      {
        "en": "June",
        "ipa": "/dʒuːn/",
        "vi": "Tháng Sáu",
        "img": "assets/vocab/grade4/u9/june.webp",
        "ex": "Our sports day is in June.",
        "trVi": "Ngày hội thể thao của chúng em vào tháng Sáu.",
        "trAnswer": "Our sports day is in June.",
        "trKey": "june"
      },
      {
        "en": "July",
        "ipa": "/dʒʊˈlaɪ/",
        "vi": "Tháng Bảy",
        "img": "assets/vocab/grade4/u9/july.webp",
        "ex": "Is your sports day in July?",
        "trVi": "Ngày hội thể thao của bạn vào tháng Bảy phải không?",
        "trAnswer": "Is your sports day in July?",
        "trKey": "july"
      },
      {
        "en": "September",
        "ipa": "/sepˈtembə/",
        "vi": "Tháng Chín",
        "img": "assets/vocab/grade4/u9/september.webp",
        "ex": "Their sports day is in September.",
        "trVi": "Ngày hội thể thao của các bạn ấy vào tháng Chín.",
        "trAnswer": "Their sports day is in September.",
        "trKey": "september"
      },
      {
        "en": "October",
        "ipa": "/ɒkˈtəʊbə/",
        "vi": "Tháng Mười",
        "img": "assets/vocab/grade4/u9/october.webp",
        "ex": "My sports day is in October.",
        "trVi": "Ngày hội thể thao của em vào tháng Mười.",
        "trAnswer": "My sports day is in October.",
        "trKey": "october"
      },
      {
        "en": "November",
        "ipa": "/nəʊˈvembə/",
        "vi": "Tháng Mười Một",
        "img": "assets/vocab/grade4/u9/november.webp",
        "ex": "It isn't in November.",
        "trVi": "Nó không phải vào tháng Mười Một.",
        "trAnswer": "It isn't in November.",
        "trKey": "november"
      },
      {
        "en": "December",
        "ipa": "/dɪˈsembə/",
        "vi": "Tháng Mười Hai",
        "img": "assets/vocab/grade4/u9/december.webp",
        "ex": "Is your sports day in December?",
        "trVi": "Ngày hội thể thao của bạn vào tháng Mười Hai phải không?",
        "trAnswer": "Is your sports day in December?",
        "trKey": "december"
      },
      {
        "en": "Sports day",
        "ipa": "/ˈspɔːts deɪ/",
        "vi": "Ngày hội thể thao",
        "img": "assets/vocab/grade4/u9/sports-day.webp",
        "ex": "When's your sports day?",
        "trVi": "Ngày hội thể thao của bạn khi nào vậy?",
        "trAnswer": "When's your sports day?",
        "trKey": "sports day"
      }
    ],
    "story": {
      "title": "Sports day around the country",
      "titleVi": "Ngày hội thể thao khắp mọi nơi",
      "text": "My school's sports day is in October. \"Is your sports day in October too?\" I ask Linh.<br><br>\"No, it isn't. My sports day is in September,\" she says. Nam's sports day is in June, and Mai's is in July.<br><br>\"When's your sports day?\" Ben asks Bill. \"It's in November,\" says Bill. \"Mine is in December!\" says Ben.",
      "textVi": "Ngày hội thể thao của trường em vào tháng Mười. \"Ngày hội thể thao của bạn cũng vào tháng Mười à?\" em hỏi Linh.<br><br>\"Không phải đâu. Ngày hội thể thao của mình vào tháng Chín,\" bạn ấy nói. Ngày hội thể thao của Nam vào tháng Sáu, còn của Mai vào tháng Bảy.<br><br>\"Ngày hội thể thao của bạn khi nào vậy?\" Ben hỏi Bill. \"Vào tháng Mười Một,\" Bill nói. \"Của mình vào tháng Mười Hai!\" Ben nói.",
      "used": [
        "Sports day",
        "October",
        "September",
        "June",
        "July",
        "November",
        "December"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"When's your <b>sports day</b>?\" Dung asks. \"It's in <b>june</b>,\" says Dương.",
        "keywords": [
          {
            "key": "sports day",
            "meaningVi": "Ngày hội thể thao"
          },
          {
            "key": "june",
            "meaningVi": "Tháng Sáu"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Is your sports day in <b>july</b>?\" \"No, it isn't. It's in <b>september</b>,\" says Dung.",
        "keywords": [
          {
            "key": "july",
            "meaningVi": "Tháng Bảy"
          },
          {
            "key": "september",
            "meaningVi": "Tháng Chín"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Is it in <b>october</b>?\" \"Yes, it is! And Bill's sports day is in <b>november</b>.\"",
        "keywords": [
          {
            "key": "october",
            "meaningVi": "Tháng Mười"
          },
          {
            "key": "november",
            "meaningVi": "Tháng Mười Một"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Mine is in <b>december</b>,\" says Dương. They mark all the dates on their calendar together.",
        "keywords": [
          {
            "key": "december",
            "meaningVi": "Tháng Mười Hai"
          }
        ]
      }
    ]
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🏖️",
    "title": "OUR SUMMER HOLIDAYS",
    "titleVi": "Kỳ nghỉ hè của chúng em",
    "words": [
      {
        "en": "Beach",
        "ipa": "/biːtʃ/",
        "vi": "Bãi biển",
        "img": "assets/vocab/grade4/u10/beach.webp",
        "ex": "I was on the beach yesterday.",
        "trVi": "Hôm qua em ở bãi biển.",
        "trAnswer": "I was on the beach yesterday.",
        "trKey": "beach"
      },
      {
        "en": "Campsite",
        "ipa": "/ˈkæmpsaɪt/",
        "vi": "Địa điểm cắm trại",
        "img": "assets/vocab/grade4/u10/campsite.webp",
        "ex": "We were at the campsite last weekend.",
        "trVi": "Chúng em đã ở địa điểm cắm trại vào cuối tuần trước.",
        "trAnswer": "We were at the campsite last weekend.",
        "trKey": "campsite"
      },
      {
        "en": "Countryside",
        "ipa": "/ˈkʌntrisaɪd/",
        "vi": "Nông thôn, vùng quê",
        "img": "assets/vocab/grade4/u10/countryside.webp",
        "ex": "Mai was in the countryside last weekend.",
        "trVi": "Mai đã ở vùng quê vào cuối tuần trước.",
        "trAnswer": "Mai was in the countryside last weekend.",
        "trKey": "countryside"
      },
      {
        "en": "Bangkok",
        "ipa": "/bæŋˈkɒk/",
        "vi": "Băng Cốc (thủ đô của nước Thái Lan)",
        "img": "assets/vocab/grade4/u10/bangkok.webp",
        "ex": "Nam was in Bangkok last summer.",
        "trVi": "Nam đã ở Băng Cốc vào mùa hè trước.",
        "trAnswer": "Nam was in Bangkok last summer.",
        "trKey": "bangkok"
      },
      {
        "en": "London",
        "ipa": "/ˈlʌndən/",
        "vi": "Luân Đôn (thủ đô của nước Anh)",
        "img": "assets/vocab/grade4/u10/london.webp",
        "ex": "Were you in London last summer?",
        "trVi": "Bạn đã ở Luân Đôn vào mùa hè trước phải không?",
        "trAnswer": "Were you in London last summer?",
        "trKey": "london"
      },
      {
        "en": "Sydney",
        "ipa": "/ˈsɪdni/",
        "vi": "Xít-ni (thành phố của nước Ô-xtơ-rây-li-a)",
        "img": "assets/vocab/grade4/u10/sydney.webp",
        "ex": "Lucy was in Sydney last summer.",
        "trVi": "Lucy đã ở Xít-ni vào mùa hè trước.",
        "trAnswer": "Lucy was in Sydney last summer.",
        "trKey": "sydney"
      },
      {
        "en": "Tokyo",
        "ipa": "/ˈtəʊkiəʊ/",
        "vi": "Tô-ki-ô (thủ đô của nước Nhật)",
        "img": "assets/vocab/grade4/u10/tokyo.webp",
        "ex": "I was in Tokyo last summer.",
        "trVi": "Em đã ở Tô-ki-ô vào mùa hè trước.",
        "trAnswer": "I was in Tokyo last summer.",
        "trKey": "tokyo"
      },
      {
        "en": "Last",
        "ipa": "/lɑːst/",
        "vi": "Trước, lần trước",
        "img": "assets/vocab/grade4/u10/last.webp",
        "ex": "Where were you last weekend?",
        "trVi": "Cuối tuần trước bạn đã ở đâu?",
        "trAnswer": "Where were you last weekend?",
        "trKey": "last"
      },
      {
        "en": "Yesterday",
        "ipa": "/ˈjestədeɪ/",
        "vi": "Ngày hôm qua",
        "img": "assets/vocab/grade4/u10/yesterday.webp",
        "ex": "I was at home yesterday.",
        "trVi": "Hôm qua em ở nhà.",
        "trAnswer": "I was at home yesterday.",
        "trKey": "yesterday"
      }
    ],
    "story": {
      "title": "Where were you last summer?",
      "titleVi": "Mùa hè trước bạn đã ở đâu?",
      "text": "\"Where were you last summer, Mary?\" Minh asks. \"I was in London,\" she says.<br><br>\"Were you in Sydney, Ben?\" \"No, I wasn't. I was in Tokyo with my family,\" he says. Lucy was in Bangkok, and she visited many temples.<br><br>\"Where were you last weekend?\" Minh asks Nam. \"I was on the beach yesterday, and at the campsite in the countryside last weekend,\" Nam says.",
      "textVi": "\"Mùa hè trước bạn đã ở đâu, Mary?\" Minh hỏi. \"Mình đã ở Luân Đôn,\" bạn ấy nói.<br><br>\"Bạn đã ở Xít-ni phải không, Ben?\" \"Không phải đâu. Mình đã ở Tô-ki-ô cùng gia đình,\" bạn ấy nói. Lucy đã ở Băng Cốc, và bạn ấy đã thăm rất nhiều ngôi đền.<br><br>\"Cuối tuần trước bạn đã ở đâu?\" Minh hỏi Nam. \"Hôm qua mình đã ở bãi biển, và cuối tuần trước mình đã ở địa điểm cắm trại trong vùng quê,\" Nam nói.",
      "used": [
        "London",
        "Sydney",
        "Tokyo",
        "Bangkok",
        "Beach",
        "Yesterday",
        "Campsite",
        "Countryside",
        "Last"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "\"Where were you <b>last</b> summer?\" Dung asks. \"I was in <b>london</b>,\" says Dương.",
        "keywords": [
          {
            "key": "last",
            "meaningVi": "Trước, lần trước"
          },
          {
            "key": "london",
            "meaningVi": "Luân Đôn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Were you in <b>sydney</b>?\" \"No, I wasn't. I was in <b>tokyo</b>,\" says Dương.",
        "keywords": [
          {
            "key": "sydney",
            "meaningVi": "Xít-ni"
          },
          {
            "key": "tokyo",
            "meaningVi": "Tô-ki-ô"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung was in <b>bangkok</b>. \"I was on the <b>beach</b> <b>yesterday</b> too!\" she says happily.",
        "keywords": [
          {
            "key": "bangkok",
            "meaningVi": "Băng Cốc"
          },
          {
            "key": "beach",
            "meaningVi": "Bãi biển"
          },
          {
            "key": "yesterday",
            "meaningVi": "Ngày hôm qua"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "\"Last weekend, I was at the <b>campsite</b> in the <b>countryside</b>,\" Dương says. What a wonderful summer!",
        "keywords": [
          {
            "key": "campsite",
            "meaningVi": "Địa điểm cắm trại"
          },
          {
            "key": "countryside",
            "meaningVi": "Nông thôn, vùng quê"
          }
        ]
      }
    ]
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "📘",
    "title": "MY HOME",
    "titleVi": "Nhà của em",
    "words": [
      {
        "en": "road",
        "ipa": "/rəʊd/",
        "vi": "con đường",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9B%A3%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I live on Hoa Binh Road.",
        "trVi": "Tôi sống trên đường Hòa Bình.",
        "trAnswer": "I live on Hoa Binh Road.",
        "trKey": "road"
      },
      {
        "en": "street",
        "ipa": "/striːt/",
        "vi": "phố",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9B%A3%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My street is quiet.",
        "trVi": "Phố của tôi yên tĩnh.",
        "trAnswer": "My street is quiet.",
        "trKey": "street"
      },
      {
        "en": "big",
        "ipa": "/bɪɡ/",
        "vi": "lớn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My house is big.",
        "trVi": "Nhà của tôi lớn.",
        "trAnswer": "My house is big.",
        "trKey": "big"
      },
      {
        "en": "busy",
        "ipa": "/ˈbɪzi/",
        "vi": "đông đúc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The street is busy.",
        "trVi": "Con phố đông đúc.",
        "trAnswer": "The street is busy.",
        "trKey": "busy"
      },
      {
        "en": "noisy",
        "ipa": "/ˈnɔɪzi/",
        "vi": "ồn ào",
        "img": "assets/vocab/grade6/u4/noisy.webp",
        "ex": "The road is noisy.",
        "trVi": "Con đường ồn ào.",
        "trAnswer": "The road is noisy.",
        "trKey": "noisy"
      },
      {
        "en": "quiet",
        "ipa": "/ˈkwaɪət/",
        "vi": "yên tĩnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My street is quiet.",
        "trVi": "Phố của tôi yên tĩnh.",
        "trAnswer": "My street is quiet.",
        "trKey": "quiet"
      },
      {
        "en": "live",
        "ipa": "/laɪv/",
        "vi": "sống",
        "img": "assets/vocab/grade6/u7/live.webp",
        "ex": "I live in a small house.",
        "trVi": "Tôi sống trong một ngôi nhà nhỏ.",
        "trAnswer": "I live in a small house.",
        "trKey": "live"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 11
    },
    "story": {
      "title": "My Home",
      "titleVi": "Nhà của em",
      "text": "I live on Hoa Binh Road.<br>My street is quiet.<br>My house is big.<br>The street is busy.<br>The road is noisy.<br>My street is quiet.<br>I live in a small house.",
      "textVi": "Tôi sống trên đường Hòa Bình.<br>Phố của tôi yên tĩnh.<br>Nhà của tôi lớn.<br>Con phố đông đúc.<br>Con đường ồn ào.<br>Phố của tôi yên tĩnh.<br>Tôi sống trong một ngôi nhà nhỏ.",
      "used": [
        "road",
        "street",
        "big",
        "busy",
        "noisy",
        "quiet",
        "live"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I live on Hoa Binh <b>Road</b>.",
        "keywords": [
          {
            "key": "road",
            "meaningVi": "con đường"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My <b>street</b> is quiet. My house is <b>big</b>.",
        "keywords": [
          {
            "key": "street",
            "meaningVi": "phố"
          },
          {
            "key": "big",
            "meaningVi": "lớn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The street is <b>busy</b>. The road is <b>noisy</b>.",
        "keywords": [
          {
            "key": "busy",
            "meaningVi": "đông đúc"
          },
          {
            "key": "noisy",
            "meaningVi": "ồn ào"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My street is <b>quiet</b>. I <b>live</b> in a small house.",
        "keywords": [
          {
            "key": "quiet",
            "meaningVi": "yên tĩnh"
          },
          {
            "key": "live",
            "meaningVi": "sống"
          }
        ]
      }
    ]
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "🏫",
    "title": "JOBS",
    "titleVi": "Nghề nghiệp",
    "words": [
      {
        "en": "actor",
        "ipa": "/ˈæktə(r)/",
        "vi": "diễn viên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is an actor.",
        "trVi": "Mẹ tôi là diễn viên.",
        "trAnswer": "My mother is an actor.",
        "trKey": "actor"
      },
      {
        "en": "farmer",
        "ipa": "/ˈfɑːmə(r)/",
        "vi": "nông dân",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%91%E2%80%8D%F0%9F%8C%BE%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a farmer.",
        "trVi": "Mẹ tôi là nông dân.",
        "trAnswer": "My mother is a farmer.",
        "trKey": "farmer"
      },
      {
        "en": "nurse",
        "ipa": "/nɜːs/",
        "vi": "y tá",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%91%E2%80%8D%E2%9A%95%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a nurse.",
        "trVi": "Mẹ tôi là y tá.",
        "trAnswer": "My mother is a nurse.",
        "trKey": "nurse"
      },
      {
        "en": "office worker",
        "ipa": "/ˈɒfɪs ˈwɜːkə/",
        "vi": "nhân viên văn phòng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is an office worker.",
        "trVi": "Mẹ tôi là nhân viên văn phòng.",
        "trAnswer": "My mother is an office worker.",
        "trKey": "office worker"
      },
      {
        "en": "policeman",
        "ipa": "/pəˈliːsmən/",
        "vi": "cảnh sát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My father is a policeman.",
        "trVi": "Bố tôi là cảnh sát.",
        "trAnswer": "My father is a policeman.",
        "trKey": "policeman"
      },
      {
        "en": "factory",
        "ipa": "/ˈfæktəri/",
        "vi": "nhà máy",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My father works at a factory.",
        "trVi": "Bố tôi làm việc ở nhà máy.",
        "trAnswer": "My father works at a factory.",
        "trKey": "factory"
      },
      {
        "en": "farm",
        "ipa": "/fɑːm/",
        "vi": "nông trại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother works on a farm.",
        "trVi": "Mẹ tôi làm việc ở nông trại.",
        "trAnswer": "My mother works on a farm.",
        "trKey": "farm"
      },
      {
        "en": "hospital",
        "ipa": "/ˈhɒspɪtl/",
        "vi": "bệnh viện",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%91%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother works at a hospital.",
        "trVi": "Mẹ tôi làm việc ở bệnh viện.",
        "trAnswer": "My mother works at a hospital.",
        "trKey": "hospital"
      },
      {
        "en": "nursing home",
        "ipa": "/ˈnɜːsɪŋ həʊm/",
        "vi": "viện dưỡng lão",
        "img": "assets/vocab/grade7/u3/nursing-home.webp",
        "ex": "My aunt works at a nursing home.",
        "trVi": "Dì tôi làm việc ở viện dưỡng lão.",
        "trAnswer": "My aunt works at a nursing home.",
        "trKey": "nursing home"
      },
      {
        "en": "police station",
        "ipa": "/pəˈliːs ˈsteɪʃən/",
        "vi": "đồn cảnh sát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My father works at a police station.",
        "trVi": "Bố tôi làm việc ở đồn cảnh sát.",
        "trAnswer": "My father works at a police station.",
        "trKey": "police station"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 12
    },
    "story": {
      "title": "Jobs",
      "titleVi": "Nghề nghiệp",
      "text": "My mother is an actor.<br>My mother is a farmer.<br>My mother is a nurse.<br>My mother is an office worker.<br>My father is a policeman.<br>My father works at a factory.<br>My mother works on a farm.<br>My mother works at a hospital.<br>My aunt works at a nursing home.<br>My father works at a police station.",
      "textVi": "Mẹ tôi là diễn viên.<br>Mẹ tôi là nông dân.<br>Mẹ tôi là y tá.<br>Mẹ tôi là nhân viên văn phòng.<br>Bố tôi là cảnh sát.<br>Bố tôi làm việc ở nhà máy.<br>Mẹ tôi làm việc ở nông trại.<br>Mẹ tôi làm việc ở bệnh viện.<br>Dì tôi làm việc ở viện dưỡng lão.<br>Bố tôi làm việc ở đồn cảnh sát.",
      "used": [
        "actor",
        "farmer",
        "nurse",
        "office worker",
        "policeman",
        "factory",
        "farm",
        "hospital",
        "nursing home",
        "police station"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My mother is an <b>actor</b>. My mother is a <b>farmer</b>.",
        "keywords": [
          {
            "key": "actor",
            "meaningVi": "diễn viên"
          },
          {
            "key": "farmer",
            "meaningVi": "nông dân"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My mother is a <b>nurse</b>. My mother is an <b>office worker</b>. My father is a <b>policeman</b>.",
        "keywords": [
          {
            "key": "nurse",
            "meaningVi": "y tá"
          },
          {
            "key": "office worker",
            "meaningVi": "nhân viên văn phòng"
          },
          {
            "key": "policeman",
            "meaningVi": "cảnh sát"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My father works at a <b>factory</b>. My mother works on a <b>farm</b>.",
        "keywords": [
          {
            "key": "factory",
            "meaningVi": "nhà máy"
          },
          {
            "key": "farm",
            "meaningVi": "nông trại"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My mother works at a <b>hospital</b>. My aunt works at a <b>nursing home</b>. My father works at a <b>police station</b>.",
        "keywords": [
          {
            "key": "hospital",
            "meaningVi": "bệnh viện"
          },
          {
            "key": "nursing home",
            "meaningVi": "viện dưỡng lão"
          },
          {
            "key": "police station",
            "meaningVi": "đồn cảnh sát"
          }
        ]
      }
    ]
  },
  {
    "id": "u13",
    "number": 13,
    "icon": "🌈",
    "title": "APPEARANCE",
    "titleVi": "Ngoại hình",
    "words": [
      {
        "en": "big",
        "ipa": "/bɪɡ/",
        "vi": "to",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "He has big eyes.",
        "trVi": "Bạn ấy có đôi mắt to.",
        "trAnswer": "He has big eyes.",
        "trKey": "big"
      },
      {
        "en": "short",
        "ipa": "/ʃɔːt/",
        "vi": "thấp; ngắn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother is short.",
        "trVi": "Em trai tôi thấp.",
        "trAnswer": "My brother is short.",
        "trKey": "short"
      },
      {
        "en": "slim",
        "ipa": "/slɪm/",
        "vi": "mảnh mai",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is slim.",
        "trVi": "Chị gái tôi mảnh mai.",
        "trAnswer": "My sister is slim.",
        "trKey": "slim"
      },
      {
        "en": "tall",
        "ipa": "/tɔːl/",
        "vi": "cao",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My father is tall.",
        "trVi": "Bố tôi cao.",
        "trAnswer": "My father is tall.",
        "trKey": "tall"
      },
      {
        "en": "eyes",
        "ipa": "/aɪz/",
        "vi": "đôi mắt",
        "img": "assets/vocab/grade6/u3/eyes.webp",
        "ex": "She has big eyes.",
        "trVi": "Bạn ấy có đôi mắt to.",
        "trAnswer": "She has big eyes.",
        "trKey": "eyes"
      },
      {
        "en": "face",
        "ipa": "/feɪs/",
        "vi": "khuôn mặt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A4%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "He has a round face.",
        "trVi": "Bạn ấy có khuôn mặt tròn.",
        "trAnswer": "He has a round face.",
        "trKey": "face"
      },
      {
        "en": "hair",
        "ipa": "/heə(r)/",
        "vi": "tóc",
        "img": "assets/vocab/grade6/u3/hair.webp",
        "ex": "She has long hair.",
        "trVi": "Bạn ấy có mái tóc dài.",
        "trAnswer": "She has long hair.",
        "trKey": "hair"
      },
      {
        "en": "long",
        "ipa": "/lɒŋ/",
        "vi": "dài",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother has long hair.",
        "trVi": "Mẹ tôi có mái tóc dài.",
        "trAnswer": "My mother has long hair.",
        "trKey": "long"
      },
      {
        "en": "round",
        "ipa": "/raʊnd/",
        "vi": "tròn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister has a round face.",
        "trVi": "Em gái tôi có khuôn mặt tròn.",
        "trAnswer": "My sister has a round face.",
        "trKey": "round"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 13
    },
    "story": {
      "title": "Appearance",
      "titleVi": "Ngoại hình",
      "text": "He has big eyes.<br>My brother is short.<br>My sister is slim.<br>My father is tall.<br>She has big eyes.<br>He has a round face.<br>She has long hair.<br>My mother has long hair.<br>My sister has a round face.",
      "textVi": "Bạn ấy có đôi mắt to.<br>Em trai tôi thấp.<br>Chị gái tôi mảnh mai.<br>Bố tôi cao.<br>Bạn ấy có đôi mắt to.<br>Bạn ấy có khuôn mặt tròn.<br>Bạn ấy có mái tóc dài.<br>Mẹ tôi có mái tóc dài.<br>Em gái tôi có khuôn mặt tròn.",
      "used": [
        "big",
        "short",
        "slim",
        "tall",
        "eyes",
        "face",
        "hair",
        "long",
        "round"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "He has <b>big</b> eyes. My brother is <b>short</b>.",
        "keywords": [
          {
            "key": "big",
            "meaningVi": "to"
          },
          {
            "key": "short",
            "meaningVi": "thấp; ngắn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My sister is <b>slim</b>. My father is <b>tall</b>.",
        "keywords": [
          {
            "key": "slim",
            "meaningVi": "mảnh mai"
          },
          {
            "key": "tall",
            "meaningVi": "cao"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "She has big <b>eyes</b>. He has a round <b>face</b>.",
        "keywords": [
          {
            "key": "eyes",
            "meaningVi": "đôi mắt"
          },
          {
            "key": "face",
            "meaningVi": "khuôn mặt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "She has long <b>hair</b>. My mother has <b>long</b> hair. My sister has a <b>round</b> face.",
        "keywords": [
          {
            "key": "hair",
            "meaningVi": "tóc"
          },
          {
            "key": "long",
            "meaningVi": "dài"
          },
          {
            "key": "round",
            "meaningVi": "tròn"
          }
        ]
      }
    ]
  },
  {
    "id": "u14",
    "number": 14,
    "icon": "🌳",
    "title": "DAILY ACTIVITIES",
    "titleVi": "Hoạt động hằng ngày",
    "words": [
      {
        "en": "at noon",
        "ipa": "/æt nuːn/",
        "vi": "vào buổi trưa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have lunch at noon.",
        "trVi": "Tôi ăn trưa vào buổi trưa.",
        "trAnswer": "I have lunch at noon.",
        "trKey": "at noon"
      },
      {
        "en": "in the afternoon",
        "ipa": "/ɪn ðə ˌɑːftəˈnuːn/",
        "vi": "vào buổi chiều",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play football in the afternoon.",
        "trVi": "Tôi chơi bóng đá vào buổi chiều.",
        "trAnswer": "I play football in the afternoon.",
        "trKey": "in the afternoon"
      },
      {
        "en": "in the evening",
        "ipa": "/ɪn ðə ˈiːvnɪŋ/",
        "vi": "vào buổi tối",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I watch TV in the evening.",
        "trVi": "Tôi xem ti vi vào buổi tối.",
        "trAnswer": "I watch TV in the evening.",
        "trKey": "in the evening"
      },
      {
        "en": "in the morning",
        "ipa": "/ɪn ðə ˈmɔːnɪŋ/",
        "vi": "vào buổi sáng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I go to school in the morning.",
        "trVi": "Tôi đi học vào buổi sáng.",
        "trAnswer": "I go to school in the morning.",
        "trKey": "in the morning"
      },
      {
        "en": "clean the floor",
        "ipa": "/kliːn ðə flɔː(r)/",
        "vi": "lau sàn nhà",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I clean the floor in the afternoon.",
        "trVi": "Tôi lau sàn nhà vào buổi chiều.",
        "trAnswer": "I clean the floor in the afternoon.",
        "trKey": "clean the floor"
      },
      {
        "en": "help with the cooking",
        "ipa": "/help wɪð ðə ˈkʊkɪŋ/",
        "vi": "giúp nấu ăn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I help with the cooking in the evening.",
        "trVi": "Tôi giúp nấu ăn vào buổi tối.",
        "trAnswer": "I help with the cooking in the evening.",
        "trKey": "help with the cooking"
      },
      {
        "en": "wash the clothes",
        "ipa": "/wɒʃ ðə kləʊðz/",
        "vi": "giặt quần áo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wash the clothes in the morning.",
        "trVi": "Tôi giặt quần áo vào buổi sáng.",
        "trAnswer": "I wash the clothes in the morning.",
        "trKey": "wash the clothes"
      },
      {
        "en": "wash the dishes",
        "ipa": "/wɒʃ ðə ˈdɪʃɪz/",
        "vi": "rửa bát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wash the dishes in the evening.",
        "trVi": "Tôi rửa bát vào buổi tối.",
        "trAnswer": "I wash the dishes in the evening.",
        "trKey": "wash the dishes"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 14
    },
    "story": {
      "title": "Daily Activities",
      "titleVi": "Hoạt động hằng ngày",
      "text": "I have lunch at noon.<br>I play football in the afternoon.<br>I watch TV in the evening.<br>I go to school in the morning.<br>I clean the floor in the afternoon.<br>I help with the cooking in the evening.<br>I wash the clothes in the morning.<br>I wash the dishes in the evening.",
      "textVi": "Tôi ăn trưa vào buổi trưa.<br>Tôi chơi bóng đá vào buổi chiều.<br>Tôi xem ti vi vào buổi tối.<br>Tôi đi học vào buổi sáng.<br>Tôi lau sàn nhà vào buổi chiều.<br>Tôi giúp nấu ăn vào buổi tối.<br>Tôi giặt quần áo vào buổi sáng.<br>Tôi rửa bát vào buổi tối.",
      "used": [
        "at noon",
        "in the afternoon",
        "in the evening",
        "in the morning",
        "clean the floor",
        "help with the cooking",
        "wash the clothes",
        "wash the dishes"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I have lunch <b>at noon</b>. I play football <b>in the afternoon</b>.",
        "keywords": [
          {
            "key": "at noon",
            "meaningVi": "vào buổi trưa"
          },
          {
            "key": "in the afternoon",
            "meaningVi": "vào buổi chiều"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I watch TV <b>in the evening</b>. I go to school <b>in the morning</b>.",
        "keywords": [
          {
            "key": "in the evening",
            "meaningVi": "vào buổi tối"
          },
          {
            "key": "in the morning",
            "meaningVi": "vào buổi sáng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>clean the floor</b> in the afternoon. I <b>help with the cooking</b> in the evening.",
        "keywords": [
          {
            "key": "clean the floor",
            "meaningVi": "lau sàn nhà"
          },
          {
            "key": "help with the cooking",
            "meaningVi": "giúp nấu ăn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>wash the clothes</b> in the morning. I <b>wash the dishes</b> in the evening.",
        "keywords": [
          {
            "key": "wash the clothes",
            "meaningVi": "giặt quần áo"
          },
          {
            "key": "wash the dishes",
            "meaningVi": "rửa bát"
          }
        ]
      }
    ]
  },
  {
    "id": "u15",
    "number": 15,
    "icon": "⭐",
    "title": "MY FAMILY'S WEEKENDS",
    "titleVi": "Cuối tuần của gia đình em",
    "words": [
      {
        "en": "cinema",
        "ipa": "/ˈsɪnəmə/",
        "vi": "rạp chiếu phim",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister goes to the cinema on Sundays.",
        "trVi": "Chị tôi đến rạp chiếu phim vào Chủ nhật.",
        "trAnswer": "My sister goes to the cinema on Sundays.",
        "trKey": "cinema"
      },
      {
        "en": "shopping centre",
        "ipa": "/ˈʃɒpɪŋ ˈsentə/",
        "vi": "trung tâm mua sắm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother goes to the shopping centre on Saturdays.",
        "trVi": "Mẹ tôi đến trung tâm mua sắm vào thứ Bảy.",
        "trAnswer": "My mother goes to the shopping centre on Saturdays.",
        "trKey": "shopping centre"
      },
      {
        "en": "sports centre",
        "ipa": "/spɔːts ˈsentə/",
        "vi": "trung tâm thể thao",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%9F%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother goes to the sports centre on Sundays.",
        "trVi": "Anh tôi đến trung tâm thể thao vào Chủ nhật.",
        "trAnswer": "My brother goes to the sports centre on Sundays.",
        "trKey": "sports centre"
      },
      {
        "en": "swimming pool",
        "ipa": "/ˈswɪmɪŋ puːl/",
        "vi": "bể bơi",
        "img": "assets/vocab/grade7/u6/swimming-pool.webp",
        "ex": "My father goes to the swimming pool on Saturdays.",
        "trVi": "Bố tôi đến bể bơi vào thứ Bảy.",
        "trAnswer": "My father goes to the swimming pool on Saturdays.",
        "trKey": "swimming pool"
      },
      {
        "en": "cook meals",
        "ipa": "/kʊk miːlz/",
        "vi": "nấu các bữa ăn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I cook meals with my mother on Sundays.",
        "trVi": "Tôi nấu ăn cùng mẹ vào Chủ nhật.",
        "trAnswer": "I cook meals with my mother on Sundays.",
        "trKey": "cook meals"
      },
      {
        "en": "do yoga",
        "ipa": "/duː ˈjəʊɡə/",
        "vi": "tập yoga",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I do yoga on Sundays.",
        "trVi": "Tôi tập yoga vào Chủ nhật.",
        "trAnswer": "I do yoga on Sundays.",
        "trKey": "do yoga"
      },
      {
        "en": "play tennis",
        "ipa": "/pleɪ ˈtenɪs/",
        "vi": "chơi quần vợt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play tennis on Saturdays.",
        "trVi": "Tôi chơi quần vợt vào thứ Bảy.",
        "trAnswer": "I play tennis on Saturdays.",
        "trKey": "play tennis"
      },
      {
        "en": "watch films",
        "ipa": "/wɒtʃ fɪlmz/",
        "vi": "xem phim",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I watch films on Sundays.",
        "trVi": "Tôi xem phim vào Chủ nhật.",
        "trAnswer": "I watch films on Sundays.",
        "trKey": "watch films"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 15
    },
    "story": {
      "title": "My Family'S Weekends",
      "titleVi": "Cuối tuần của gia đình em",
      "text": "My sister goes to the cinema on Sundays.<br>My mother goes to the shopping centre on Saturdays.<br>My brother goes to the sports centre on Sundays.<br>My father goes to the swimming pool on Saturdays.<br>I cook meals with my mother on Sundays.<br>I do yoga on Sundays.<br>I play tennis on Saturdays.<br>I watch films on Sundays.",
      "textVi": "Chị tôi đến rạp chiếu phim vào Chủ nhật.<br>Mẹ tôi đến trung tâm mua sắm vào thứ Bảy.<br>Anh tôi đến trung tâm thể thao vào Chủ nhật.<br>Bố tôi đến bể bơi vào thứ Bảy.<br>Tôi nấu ăn cùng mẹ vào Chủ nhật.<br>Tôi tập yoga vào Chủ nhật.<br>Tôi chơi quần vợt vào thứ Bảy.<br>Tôi xem phim vào Chủ nhật.",
      "used": [
        "cinema",
        "shopping centre",
        "sports centre",
        "swimming pool",
        "cook meals",
        "do yoga",
        "play tennis",
        "watch films"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My sister goes to the <b>cinema</b> on Sundays. My mother goes to the <b>shopping centre</b> on Saturdays.",
        "keywords": [
          {
            "key": "cinema",
            "meaningVi": "rạp chiếu phim"
          },
          {
            "key": "shopping centre",
            "meaningVi": "trung tâm mua sắm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My brother goes to the <b>sports centre</b> on Sundays. My father goes to the <b>swimming pool</b> on Saturdays.",
        "keywords": [
          {
            "key": "sports centre",
            "meaningVi": "trung tâm thể thao"
          },
          {
            "key": "swimming pool",
            "meaningVi": "bể bơi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>cook meals</b> with my mother on Sundays. I <b>do yoga</b> on Sundays.",
        "keywords": [
          {
            "key": "cook meals",
            "meaningVi": "nấu các bữa ăn"
          },
          {
            "key": "do yoga",
            "meaningVi": "tập yoga"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>play tennis</b> on Saturdays. I <b>watch films</b> on Sundays.",
        "keywords": [
          {
            "key": "play tennis",
            "meaningVi": "chơi quần vợt"
          },
          {
            "key": "watch films",
            "meaningVi": "xem phim"
          }
        ]
      }
    ]
  },
  {
    "id": "u16",
    "number": 16,
    "icon": "📘",
    "title": "WEATHER",
    "titleVi": "Thời tiết",
    "words": [
      {
        "en": "cloudy",
        "ipa": "/ˈklaʊdi/",
        "vi": "nhiều mây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%98%81%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It was cloudy yesterday.",
        "trVi": "Hôm qua trời nhiều mây.",
        "trAnswer": "It was cloudy yesterday.",
        "trKey": "cloudy"
      },
      {
        "en": "rainy",
        "ipa": "/ˈreɪni/",
        "vi": "có mưa",
        "img": "assets/vocab/grade6/u9/rainy.webp",
        "ex": "It was rainy last weekend.",
        "trVi": "Cuối tuần trước trời có mưa.",
        "trAnswer": "It was rainy last weekend.",
        "trKey": "rainy"
      },
      {
        "en": "sunny",
        "ipa": "/ˈsʌni/",
        "vi": "có nắng",
        "img": "assets/vocab/grade6/u9/sunny.webp",
        "ex": "It was sunny yesterday.",
        "trVi": "Hôm qua trời có nắng.",
        "trAnswer": "It was sunny yesterday.",
        "trKey": "sunny"
      },
      {
        "en": "weather",
        "ipa": "/ˈweðə(r)/",
        "vi": "thời tiết",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%A6%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What was the weather like yesterday?",
        "trVi": "Hôm qua thời tiết thế nào?",
        "trAnswer": "What was the weather like yesterday?",
        "trKey": "weather"
      },
      {
        "en": "windy",
        "ipa": "/ˈwɪndi/",
        "vi": "có gió",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%92%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It was windy yesterday.",
        "trVi": "Hôm qua trời có gió.",
        "trAnswer": "It was windy yesterday.",
        "trKey": "windy"
      },
      {
        "en": "bakery",
        "ipa": "/ˈbeɪkəri/",
        "vi": "tiệm bánh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A5%96%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Do you want to go to the bakery?",
        "trVi": "Bạn có muốn đến tiệm bánh không?",
        "trAnswer": "Do you want to go to the bakery?",
        "trKey": "bakery"
      },
      {
        "en": "bookshop",
        "ipa": "/ˈbʊkʃɒp/",
        "vi": "hiệu sách",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Do you want to go to the bookshop?",
        "trVi": "Bạn có muốn đến hiệu sách không?",
        "trAnswer": "Do you want to go to the bookshop?",
        "trKey": "bookshop"
      },
      {
        "en": "food stall",
        "ipa": "/fuːd stɔːl/",
        "vi": "quầy đồ ăn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Let's go to the food stall.",
        "trVi": "Chúng ta hãy đến quầy đồ ăn.",
        "trAnswer": "Let's go to the food stall.",
        "trKey": "food stall"
      },
      {
        "en": "water park",
        "ipa": "/ˈwɔːtə(r) pɑːk/",
        "vi": "công viên nước",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Let's go to the water park.",
        "trVi": "Chúng ta hãy đến công viên nước.",
        "trAnswer": "Let's go to the water park.",
        "trKey": "water park"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 16
    },
    "story": {
      "title": "Weather",
      "titleVi": "Thời tiết",
      "text": "It was cloudy yesterday.<br>It was rainy last weekend.<br>It was sunny yesterday.<br>What was the weather like yesterday?<br>It was windy yesterday.<br>Do you want to go to the bakery?<br>Do you want to go to the bookshop?<br>Let's go to the food stall.<br>Let's go to the water park.",
      "textVi": "Hôm qua trời nhiều mây.<br>Cuối tuần trước trời có mưa.<br>Hôm qua trời có nắng.<br>Hôm qua thời tiết thế nào?<br>Hôm qua trời có gió.<br>Bạn có muốn đến tiệm bánh không?<br>Bạn có muốn đến hiệu sách không?<br>Chúng ta hãy đến quầy đồ ăn.<br>Chúng ta hãy đến công viên nước.",
      "used": [
        "cloudy",
        "rainy",
        "sunny",
        "weather",
        "windy",
        "bakery",
        "bookshop",
        "food stall",
        "water park"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "It was <b>cloudy</b> yesterday. It was <b>rainy</b> last weekend.",
        "keywords": [
          {
            "key": "cloudy",
            "meaningVi": "nhiều mây"
          },
          {
            "key": "rainy",
            "meaningVi": "có mưa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It was <b>sunny</b> yesterday. What was the <b>weather</b> like yesterday?",
        "keywords": [
          {
            "key": "sunny",
            "meaningVi": "có nắng"
          },
          {
            "key": "weather",
            "meaningVi": "thời tiết"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It was <b>windy</b> yesterday. Do you want to go to the <b>bakery</b>?",
        "keywords": [
          {
            "key": "windy",
            "meaningVi": "có gió"
          },
          {
            "key": "bakery",
            "meaningVi": "tiệm bánh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Do you want to go to the <b>bookshop</b>? Let&#x27;s go to the <b>food stall</b>. Let&#x27;s go to the <b>water park</b>.",
        "keywords": [
          {
            "key": "bookshop",
            "meaningVi": "hiệu sách"
          },
          {
            "key": "food stall",
            "meaningVi": "quầy đồ ăn"
          },
          {
            "key": "water park",
            "meaningVi": "công viên nước"
          }
        ]
      }
    ]
  },
  {
    "id": "u17",
    "number": 17,
    "icon": "🏫",
    "title": "IN THE CITY",
    "titleVi": "Ở thành phố",
    "words": [
      {
        "en": "go straight",
        "ipa": "/ɡəʊ streɪt/",
        "vi": "đi thẳng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Go straight to the bookshop.",
        "trVi": "Hãy đi thẳng đến hiệu sách.",
        "trAnswer": "Go straight to the bookshop.",
        "trKey": "go straight"
      },
      {
        "en": "left",
        "ipa": "/left/",
        "vi": "bên trái",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The bookshop is on the left.",
        "trVi": "Hiệu sách ở bên trái.",
        "trAnswer": "The bookshop is on the left.",
        "trKey": "left"
      },
      {
        "en": "right",
        "ipa": "/raɪt/",
        "vi": "bên phải",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The bakery is on the right.",
        "trVi": "Tiệm bánh ở bên phải.",
        "trAnswer": "The bakery is on the right.",
        "trKey": "right"
      },
      {
        "en": "stop",
        "ipa": "/stɒp/",
        "vi": "dừng lại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Stop here, please.",
        "trVi": "Xin hãy dừng lại ở đây.",
        "trAnswer": "Stop here, please.",
        "trKey": "stop"
      },
      {
        "en": "turn left",
        "ipa": "/tɜːn left/",
        "vi": "rẽ trái",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Turn left at the bookshop.",
        "trVi": "Hãy rẽ trái ở hiệu sách.",
        "trAnswer": "Turn left at the bookshop.",
        "trKey": "turn left"
      },
      {
        "en": "turn right",
        "ipa": "/tɜːn raɪt/",
        "vi": "rẽ phải",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Turn right at the bakery.",
        "trVi": "Hãy rẽ phải ở tiệm bánh.",
        "trAnswer": "Turn right at the bakery.",
        "trKey": "turn right"
      },
      {
        "en": "turn round",
        "ipa": "/tɜːn raʊnd/",
        "vi": "quay lại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Turn round, please.",
        "trVi": "Xin hãy quay lại.",
        "trAnswer": "Turn round, please.",
        "trKey": "turn round"
      },
      {
        "en": "get",
        "ipa": "/ɡet/",
        "vi": "đến",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "How can I get to the bookshop?",
        "trVi": "Tôi có thể đến hiệu sách bằng cách nào?",
        "trAnswer": "How can I get to the bookshop?",
        "trKey": "get"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 17
    },
    "story": {
      "title": "In The City",
      "titleVi": "Ở thành phố",
      "text": "Go straight to the bookshop.<br>The bookshop is on the left.<br>The bakery is on the right.<br>Stop here, please.<br>Turn left at the bookshop.<br>Turn right at the bakery.<br>Turn round, please.<br>How can I get to the bookshop?",
      "textVi": "Hãy đi thẳng đến hiệu sách.<br>Hiệu sách ở bên trái.<br>Tiệm bánh ở bên phải.<br>Xin hãy dừng lại ở đây.<br>Hãy rẽ trái ở hiệu sách.<br>Hãy rẽ phải ở tiệm bánh.<br>Xin hãy quay lại.<br>Tôi có thể đến hiệu sách bằng cách nào?",
      "used": [
        "go straight",
        "left",
        "right",
        "stop",
        "turn left",
        "turn right",
        "turn round",
        "get"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "<b>Go straight</b> to the bookshop. The bookshop is on the <b>left</b>.",
        "keywords": [
          {
            "key": "go straight",
            "meaningVi": "đi thẳng"
          },
          {
            "key": "left",
            "meaningVi": "bên trái"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The bakery is on the <b>right</b>. <b>Stop</b> here, please.",
        "keywords": [
          {
            "key": "right",
            "meaningVi": "bên phải"
          },
          {
            "key": "stop",
            "meaningVi": "dừng lại"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Turn left</b> at the bookshop. <b>Turn right</b> at the bakery.",
        "keywords": [
          {
            "key": "turn left",
            "meaningVi": "rẽ trái"
          },
          {
            "key": "turn right",
            "meaningVi": "rẽ phải"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Turn round</b>, please. How can I <b>get</b> to the bookshop?",
        "keywords": [
          {
            "key": "turn round",
            "meaningVi": "quay lại"
          },
          {
            "key": "get",
            "meaningVi": "đến"
          }
        ]
      }
    ]
  },
  {
    "id": "u18",
    "number": 18,
    "icon": "🌈",
    "title": "AT THE SHOPPING CENTRE",
    "titleVi": "Ở trung tâm mua sắm",
    "words": [
      {
        "en": "behind",
        "ipa": "/bɪˈhaɪnd/",
        "vi": "ở phía sau",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The bakery is behind the bookshop.",
        "trVi": "Tiệm bánh ở phía sau hiệu sách.",
        "trAnswer": "The bakery is behind the bookshop.",
        "trKey": "behind"
      },
      {
        "en": "between",
        "ipa": "/bɪˈtwiːn/",
        "vi": "ở giữa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The gift shop is between the bakery and the bookshop.",
        "trVi": "Cửa hàng quà tặng ở giữa tiệm bánh và hiệu sách.",
        "trAnswer": "The gift shop is between the bakery and the bookshop.",
        "trKey": "between"
      },
      {
        "en": "near",
        "ipa": "/nɪə/",
        "vi": "ở gần",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The gift shop is near the bakery.",
        "trVi": "Cửa hàng quà tặng ở gần tiệm bánh.",
        "trAnswer": "The gift shop is near the bakery.",
        "trKey": "near"
      },
      {
        "en": "opposite",
        "ipa": "/ˈɒpəzɪt/",
        "vi": "đối diện",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The bakery is opposite the bookshop.",
        "trVi": "Tiệm bánh đối diện hiệu sách.",
        "trAnswer": "The bakery is opposite the bookshop.",
        "trKey": "opposite"
      },
      {
        "en": "gift shop",
        "ipa": "/ɡɪft ʃɒp/",
        "vi": "cửa hàng quà tặng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The gift shop is near the bookshop.",
        "trVi": "Cửa hàng quà tặng ở gần hiệu sách.",
        "trAnswer": "The gift shop is near the bookshop.",
        "trKey": "gift shop"
      },
      {
        "en": "skirt",
        "ipa": "/skɜːt/",
        "vi": "cái váy",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This skirt is sixty thousand dong.",
        "trVi": "Cái váy này giá sáu mươi nghìn đồng.",
        "trAnswer": "This skirt is sixty thousand dong.",
        "trKey": "skirt"
      },
      {
        "en": "T-shirt",
        "ipa": "/tiː ʃɜːt/",
        "vi": "áo phông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%95%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This T-shirt is fifty thousand dong.",
        "trVi": "Áo phông này giá năm mươi nghìn đồng.",
        "trAnswer": "This T-shirt is fifty thousand dong.",
        "trKey": "t-shirt"
      },
      {
        "en": "dong",
        "ipa": "/dɒŋ/",
        "vi": "đồng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The skirt is sixty thousand dong.",
        "trVi": "Cái váy giá sáu mươi nghìn đồng.",
        "trAnswer": "The skirt is sixty thousand dong.",
        "trKey": "dong"
      },
      {
        "en": "thousand",
        "ipa": "/ˈθaʊzənd/",
        "vi": "nghìn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The T-shirt is fifty thousand dong.",
        "trVi": "Áo phông giá năm mươi nghìn đồng.",
        "trAnswer": "The T-shirt is fifty thousand dong.",
        "trKey": "thousand"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 18
    },
    "story": {
      "title": "At The Shopping Centre",
      "titleVi": "Ở trung tâm mua sắm",
      "text": "The bakery is behind the bookshop.<br>The gift shop is between the bakery and the bookshop.<br>The gift shop is near the bakery.<br>The bakery is opposite the bookshop.<br>The gift shop is near the bookshop.<br>This skirt is sixty thousand dong.<br>This T-shirt is fifty thousand dong.<br>The skirt is sixty thousand dong.<br>The T-shirt is fifty thousand dong.",
      "textVi": "Tiệm bánh ở phía sau hiệu sách.<br>Cửa hàng quà tặng ở giữa tiệm bánh và hiệu sách.<br>Cửa hàng quà tặng ở gần tiệm bánh.<br>Tiệm bánh đối diện hiệu sách.<br>Cửa hàng quà tặng ở gần hiệu sách.<br>Cái váy này giá sáu mươi nghìn đồng.<br>Áo phông này giá năm mươi nghìn đồng.<br>Cái váy giá sáu mươi nghìn đồng.<br>Áo phông giá năm mươi nghìn đồng.",
      "used": [
        "behind",
        "between",
        "near",
        "opposite",
        "gift shop",
        "skirt",
        "T-shirt",
        "dong",
        "thousand"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "The bakery is <b>behind</b> the bookshop. The gift shop is <b>between</b> the bakery and the bookshop.",
        "keywords": [
          {
            "key": "behind",
            "meaningVi": "ở phía sau"
          },
          {
            "key": "between",
            "meaningVi": "ở giữa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The gift shop is <b>near</b> the bakery. The bakery is <b>opposite</b> the bookshop.",
        "keywords": [
          {
            "key": "near",
            "meaningVi": "ở gần"
          },
          {
            "key": "opposite",
            "meaningVi": "đối diện"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The <b>gift shop</b> is near the bookshop. This <b>skirt</b> is sixty thousand dong.",
        "keywords": [
          {
            "key": "gift shop",
            "meaningVi": "cửa hàng quà tặng"
          },
          {
            "key": "skirt",
            "meaningVi": "cái váy"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This <b>T-shirt</b> is fifty thousand dong. The skirt is sixty thousand <b>dong</b>. The T-shirt is fifty <b>thousand</b> dong.",
        "keywords": [
          {
            "key": "t-shirt",
            "meaningVi": "áo phông"
          },
          {
            "key": "dong",
            "meaningVi": "đồng"
          },
          {
            "key": "thousand",
            "meaningVi": "nghìn"
          }
        ]
      }
    ]
  },
  {
    "id": "u19",
    "number": 19,
    "icon": "🌳",
    "title": "THE ANIMAL WORLD",
    "titleVi": "Thế giới động vật",
    "words": [
      {
        "en": "crocodiles",
        "ipa": "/ˈkrɒkədaɪlz/",
        "vi": "những con cá sấu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%8A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see crocodiles.",
        "trVi": "Tôi có thể nhìn thấy những con cá sấu.",
        "trAnswer": "I can see crocodiles.",
        "trKey": "crocodiles"
      },
      {
        "en": "giraffes",
        "ipa": "/dʒəˈrɑːfs/",
        "vi": "những con hươu cao cổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%92%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see giraffes.",
        "trVi": "Tôi có thể nhìn thấy những con hươu cao cổ.",
        "trAnswer": "I can see giraffes.",
        "trKey": "giraffes"
      },
      {
        "en": "hippos",
        "ipa": "/ˈhɪpəʊz/",
        "vi": "những con hà mã",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%9B%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see hippos.",
        "trVi": "Tôi có thể nhìn thấy những con hà mã.",
        "trAnswer": "I can see hippos.",
        "trKey": "hippos"
      },
      {
        "en": "lions",
        "ipa": "/ˈlaɪənz/",
        "vi": "những con sư tử",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%81%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see lions.",
        "trVi": "Tôi có thể nhìn thấy những con sư tử.",
        "trAnswer": "I can see lions.",
        "trKey": "lions"
      },
      {
        "en": "dance beautifully",
        "ipa": "/dɑːns ˈbjuːtɪfəli/",
        "vi": "múa đẹp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The peacocks dance beautifully.",
        "trVi": "Những con công múa đẹp.",
        "trAnswer": "The peacocks dance beautifully.",
        "trKey": "dance beautifully"
      },
      {
        "en": "roar loudly",
        "ipa": "/rɔː ˈlaʊdli/",
        "vi": "gầm to",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The lions roar loudly.",
        "trVi": "Những con sư tử gầm to.",
        "trAnswer": "The lions roar loudly.",
        "trKey": "roar loudly"
      },
      {
        "en": "run quickly",
        "ipa": "/rʌn ˈkwɪkli/",
        "vi": "chạy nhanh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The giraffes run quickly.",
        "trVi": "Những con hươu cao cổ chạy nhanh.",
        "trAnswer": "The giraffes run quickly.",
        "trKey": "run quickly"
      },
      {
        "en": "sing merrily",
        "ipa": "/sɪŋ ˈmerəli/",
        "vi": "hót vui vẻ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The birds sing merrily.",
        "trVi": "Những con chim hót vui vẻ.",
        "trAnswer": "The birds sing merrily.",
        "trKey": "sing merrily"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 19
    },
    "story": {
      "title": "The Animal World",
      "titleVi": "Thế giới động vật",
      "text": "I can see crocodiles.<br>I can see giraffes.<br>I can see hippos.<br>I can see lions.<br>The peacocks dance beautifully.<br>The lions roar loudly.<br>The giraffes run quickly.<br>The birds sing merrily.",
      "textVi": "Tôi có thể nhìn thấy những con cá sấu.<br>Tôi có thể nhìn thấy những con hươu cao cổ.<br>Tôi có thể nhìn thấy những con hà mã.<br>Tôi có thể nhìn thấy những con sư tử.<br>Những con công múa đẹp.<br>Những con sư tử gầm to.<br>Những con hươu cao cổ chạy nhanh.<br>Những con chim hót vui vẻ.",
      "used": [
        "crocodiles",
        "giraffes",
        "hippos",
        "lions",
        "dance beautifully",
        "roar loudly",
        "run quickly",
        "sing merrily"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I can see <b>crocodiles</b>. I can see <b>giraffes</b>.",
        "keywords": [
          {
            "key": "crocodiles",
            "meaningVi": "những con cá sấu"
          },
          {
            "key": "giraffes",
            "meaningVi": "những con hươu cao cổ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I can see <b>hippos</b>. I can see <b>lions</b>.",
        "keywords": [
          {
            "key": "hippos",
            "meaningVi": "những con hà mã"
          },
          {
            "key": "lions",
            "meaningVi": "những con sư tử"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The peacocks <b>dance beautifully</b>. The lions <b>roar loudly</b>.",
        "keywords": [
          {
            "key": "dance beautifully",
            "meaningVi": "múa đẹp"
          },
          {
            "key": "roar loudly",
            "meaningVi": "gầm to"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The giraffes <b>run quickly</b>. The birds <b>sing merrily</b>.",
        "keywords": [
          {
            "key": "run quickly",
            "meaningVi": "chạy nhanh"
          },
          {
            "key": "sing merrily",
            "meaningVi": "hót vui vẻ"
          }
        ]
      }
    ]
  },
  {
    "id": "u20",
    "number": 20,
    "icon": "⭐",
    "title": "AT SUMMER CAMP",
    "titleVi": "Ở trại hè",
    "words": [
      {
        "en": "building a campfire",
        "ipa": "/ˈbɪldɪŋ ə ˈkæmpfaɪə/",
        "vi": "nhóm lửa trại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am building a campfire.",
        "trVi": "Tôi đang nhóm lửa trại.",
        "trAnswer": "I am building a campfire.",
        "trKey": "building a campfire"
      },
      {
        "en": "dancing around the campfire",
        "ipa": "/ˈdɑːnsɪŋ əˈraʊnd ðə ˈkæmpfaɪə/",
        "vi": "nhảy múa quanh lửa trại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am dancing around the campfire.",
        "trVi": "Tôi đang nhảy múa quanh lửa trại.",
        "trAnswer": "I am dancing around the campfire.",
        "trKey": "dancing around the campfire"
      },
      {
        "en": "playing card games",
        "ipa": "/ˈpleɪɪŋ kɑːd ɡeɪmz/",
        "vi": "chơi bài",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am playing card games.",
        "trVi": "Tôi đang chơi bài.",
        "trAnswer": "I am playing card games.",
        "trKey": "playing card games"
      },
      {
        "en": "playing tug of war",
        "ipa": "/ˈpleɪɪŋ tʌɡ əv wɔː/",
        "vi": "chơi kéo co",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am playing tug of war.",
        "trVi": "Tôi đang chơi kéo co.",
        "trAnswer": "I am playing tug of war.",
        "trKey": "playing tug of war"
      },
      {
        "en": "putting up a tent",
        "ipa": "/ˈpʊtɪŋ ʌp ə tent/",
        "vi": "dựng lều",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am putting up a tent.",
        "trVi": "Tôi đang dựng lều.",
        "trAnswer": "I am putting up a tent.",
        "trKey": "putting up a tent"
      },
      {
        "en": "singing songs",
        "ipa": "/ˈsɪŋɪŋ sɒŋz/",
        "vi": "hát các bài hát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am singing songs.",
        "trVi": "Tôi đang hát các bài hát.",
        "trAnswer": "I am singing songs.",
        "trKey": "singing songs"
      },
      {
        "en": "taking a photo",
        "ipa": "/ˈteɪkɪŋ ə ˈfəʊtəʊ/",
        "vi": "chụp ảnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am taking a photo.",
        "trVi": "Tôi đang chụp ảnh.",
        "trAnswer": "I am taking a photo.",
        "trKey": "taking a photo"
      },
      {
        "en": "telling a story",
        "ipa": "/ˈtelɪŋ ə ˈstɔːri/",
        "vi": "kể chuyện",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am telling a story.",
        "trVi": "Tôi đang kể chuyện.",
        "trAnswer": "I am telling a story.",
        "trKey": "telling a story"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 4,
      "volume": 2,
      "unit": 20
    },
    "story": {
      "title": "At Summer Camp",
      "titleVi": "Ở trại hè",
      "text": "I am building a campfire.<br>I am dancing around the campfire.<br>I am playing card games.<br>I am playing tug of war.<br>I am putting up a tent.<br>I am singing songs.<br>I am taking a photo.<br>I am telling a story.",
      "textVi": "Tôi đang nhóm lửa trại.<br>Tôi đang nhảy múa quanh lửa trại.<br>Tôi đang chơi bài.<br>Tôi đang chơi kéo co.<br>Tôi đang dựng lều.<br>Tôi đang hát các bài hát.<br>Tôi đang chụp ảnh.<br>Tôi đang kể chuyện.",
      "used": [
        "building a campfire",
        "dancing around the campfire",
        "playing card games",
        "playing tug of war",
        "putting up a tent",
        "singing songs",
        "taking a photo",
        "telling a story"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I am <b>building a campfire</b>. I am <b>dancing around the campfire</b>.",
        "keywords": [
          {
            "key": "building a campfire",
            "meaningVi": "nhóm lửa trại"
          },
          {
            "key": "dancing around the campfire",
            "meaningVi": "nhảy múa quanh lửa trại"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>playing card games</b>. I am <b>playing tug of war</b>.",
        "keywords": [
          {
            "key": "playing card games",
            "meaningVi": "chơi bài"
          },
          {
            "key": "playing tug of war",
            "meaningVi": "chơi kéo co"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>putting up a tent</b>. I am <b>singing songs</b>.",
        "keywords": [
          {
            "key": "putting up a tent",
            "meaningVi": "dựng lều"
          },
          {
            "key": "singing songs",
            "meaningVi": "hát các bài hát"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>taking a photo</b>. I am <b>telling a story</b>.",
        "keywords": [
          {
            "key": "taking a photo",
            "meaningVi": "chụp ảnh"
          },
          {
            "key": "telling a story",
            "meaningVi": "kể chuyện"
          }
        ]
      }
    ]
  }
];
