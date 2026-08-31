// Dữ liệu từ vựng lớp 4 (Tiểu học) — trích từ SGK Tiếng Anh 4 Global Success, tập 1
// Mỗi unit gồm: từ vựng (words), bài đọc (story), và bản nháp "câu chuyện Dương & Dung" 4 khung (storyFrames).
// storyFrames: nội dung mẫu ban đầu cho tính năng "Câu chuyện" (mục Tiểu học trong tab Từ vựng) — từ khóa
// (bọc trong <b>...</b>) sẽ bị ẩn thành ô trống cho học viên điền, ảnh minh họa (image_url) để trống, admin
// (giangvien@gmail.com) tải ảnh lên sau qua khung soạn thảo. Giảng viên vẫn có thể ghi đè bất kỳ khung nào
// qua khung soạn thảo đó — nội dung ghi đè sẽ được lưu trên Supabase và ưu tiên hơn bản nháp tĩnh này.
// Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
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
        "img": "https://img.invalid/america.jpg",
        "ex": "Mary is from America.",
        "trVi": "Mary đến từ nước Hoa Kỳ.",
        "trAnswer": "Mary is from America.",
        "trKey": "america"
      },
      {
        "en": "Australia",
        "ipa": "/ɒˈstreɪliə/",
        "vi": "Nước Ô-xtơ-rây-li-a",
        "img": "https://img.invalid/australia.jpg",
        "ex": "Ben is from Australia.",
        "trVi": "Ben đến từ nước Ô-xtơ-rây-li-a.",
        "trAnswer": "Ben is from Australia.",
        "trKey": "australia"
      },
      {
        "en": "Britain",
        "ipa": "/ˈbrɪtn/",
        "vi": "Nước Anh",
        "img": "https://img.invalid/britain.jpg",
        "ex": "Lucy is from Britain.",
        "trVi": "Lucy đến từ nước Anh.",
        "trAnswer": "Lucy is from Britain.",
        "trKey": "britain"
      },
      {
        "en": "Japan",
        "ipa": "/dʒəˈpæn/",
        "vi": "Nước Nhật",
        "img": "https://img.invalid/japan.jpg",
        "ex": "Nam's pen pal is from Japan.",
        "trVi": "Bạn qua thư của Nam đến từ nước Nhật.",
        "trAnswer": "Nam's pen pal is from Japan.",
        "trKey": "japan"
      },
      {
        "en": "Malaysia",
        "ipa": "/məˈleɪziə/",
        "vi": "Nước Ma-lay-xi-a",
        "img": "https://img.invalid/malaysia.jpg",
        "ex": "Linh has a friend from Malaysia.",
        "trVi": "Linh có một người bạn đến từ nước Ma-lay-xi-a.",
        "trAnswer": "Linh has a friend from Malaysia.",
        "trKey": "malaysia"
      },
      {
        "en": "Singapore",
        "ipa": "/ˌsɪŋəˈpɔː/",
        "vi": "Nước Xin-ga-po",
        "img": "https://img.invalid/singapore.jpg",
        "ex": "Bill's cousin lives in Singapore.",
        "trVi": "Anh họ của Bill sống ở nước Xin-ga-po.",
        "trAnswer": "Bill's cousin lives in Singapore.",
        "trKey": "singapore"
      },
      {
        "en": "Thailand",
        "ipa": "/ˈtaɪlænd/",
        "vi": "Nước Thái Lan",
        "img": "https://img.invalid/thailand.jpg",
        "ex": "Mai's teacher is from Thailand.",
        "trVi": "Cô giáo của Mai đến từ nước Thái Lan.",
        "trAnswer": "Mai's teacher is from Thailand.",
        "trKey": "thailand"
      },
      {
        "en": "Viet Nam",
        "ipa": "/ˌviːetˈnæm/",
        "vi": "Nước Việt Nam",
        "img": "https://img.invalid/viet-nam.jpg",
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
        "img": "https://img.invalid/fifteen.jpg",
        "ex": "It's nine fifteen.",
        "trVi": "Bây giờ là chín giờ mười lăm.",
        "trAnswer": "It's nine fifteen.",
        "trKey": "fifteen"
      },
      {
        "en": "Forty-five",
        "ipa": "/ˌfɔːti ˈfaɪv/",
        "vi": "Số 45",
        "img": "https://img.invalid/forty-five.jpg",
        "ex": "It's seven forty-five.",
        "trVi": "Bây giờ là bảy giờ bốn mươi lăm.",
        "trAnswer": "It's seven forty-five.",
        "trKey": "forty-five"
      },
      {
        "en": "O'clock",
        "ipa": "/əˈklɒk/",
        "vi": "Giờ (dùng sau giờ chẵn)",
        "img": "https://img.invalid/oclock.jpg",
        "ex": "It's six o'clock.",
        "trVi": "Bây giờ là sáu giờ.",
        "trAnswer": "It's six o'clock.",
        "trKey": "o'clock"
      },
      {
        "en": "Thirty",
        "ipa": "/ˈθɜːti/",
        "vi": "Số 30",
        "img": "https://img.invalid/thirty.jpg",
        "ex": "It's five thirty.",
        "trVi": "Bây giờ là năm giờ ba mươi.",
        "trAnswer": "It's five thirty.",
        "trKey": "thirty"
      },
      {
        "en": "Get up",
        "ipa": "/ˈget ʌp/",
        "vi": "Thức dậy",
        "img": "https://img.invalid/get-up.jpg",
        "ex": "I get up at six o'clock.",
        "trVi": "Em thức dậy lúc sáu giờ.",
        "trAnswer": "I get up at six o'clock.",
        "trKey": "get up"
      },
      {
        "en": "Go to bed",
        "ipa": "/ˈgəʊ tə bed/",
        "vi": "Đi ngủ",
        "img": "https://img.invalid/go-to-bed.jpg",
        "ex": "Nam goes to bed at nine o'clock.",
        "trVi": "Nam đi ngủ lúc chín giờ.",
        "trAnswer": "Nam goes to bed at nine o'clock.",
        "trKey": "go to bed"
      },
      {
        "en": "Go to school",
        "ipa": "/ˈgəʊ tə skuːl/",
        "vi": "Đi học",
        "img": "https://img.invalid/go-to-school.jpg",
        "ex": "Mai goes to school at six forty-five.",
        "trVi": "Mai đi học lúc sáu giờ bốn mươi lăm.",
        "trAnswer": "Mai goes to school at six forty-five.",
        "trKey": "go to school"
      },
      {
        "en": "Have breakfast",
        "ipa": "/hæv ˈbrekfəst/",
        "vi": "Ăn sáng",
        "img": "https://img.invalid/have-breakfast.jpg",
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
        "img": "https://img.invalid/monday.jpg",
        "ex": "I study at school on Monday.",
        "trVi": "Em học ở trường vào thứ Hai.",
        "trAnswer": "I study at school on Monday.",
        "trKey": "monday"
      },
      {
        "en": "Tuesday",
        "ipa": "/ˈtjuːzdeɪ/",
        "vi": "Thứ Ba",
        "img": "https://img.invalid/tuesday.jpg",
        "ex": "We have English on Tuesday.",
        "trVi": "Chúng em học Tiếng Anh vào thứ Ba.",
        "trAnswer": "We have English on Tuesday.",
        "trKey": "tuesday"
      },
      {
        "en": "Wednesday",
        "ipa": "/ˈwenzdeɪ/",
        "vi": "Thứ Tư",
        "img": "https://img.invalid/wednesday.jpg",
        "ex": "It's Wednesday today.",
        "trVi": "Hôm nay là thứ Tư.",
        "trAnswer": "It's Wednesday today.",
        "trKey": "wednesday"
      },
      {
        "en": "Thursday",
        "ipa": "/ˈθɜːzdeɪ/",
        "vi": "Thứ Năm",
        "img": "https://img.invalid/thursday.jpg",
        "ex": "Minh plays football on Thursday.",
        "trVi": "Minh chơi bóng đá vào thứ Năm.",
        "trAnswer": "Minh plays football on Thursday.",
        "trKey": "thursday"
      },
      {
        "en": "Friday",
        "ipa": "/ˈfraɪdeɪ/",
        "vi": "Thứ Sáu",
        "img": "https://img.invalid/friday.jpg",
        "ex": "I listen to music on Friday.",
        "trVi": "Em nghe nhạc vào thứ Sáu.",
        "trAnswer": "I listen to music on Friday.",
        "trKey": "friday"
      },
      {
        "en": "Saturday",
        "ipa": "/ˈsætədeɪ/",
        "vi": "Thứ Bảy",
        "img": "https://img.invalid/saturday.jpg",
        "ex": "Mai does housework on Saturday.",
        "trVi": "Mai làm việc nhà vào thứ Bảy.",
        "trAnswer": "Mai does housework on Saturday.",
        "trKey": "saturday"
      },
      {
        "en": "Sunday",
        "ipa": "/ˈsʌndeɪ/",
        "vi": "Chủ Nhật",
        "img": "https://img.invalid/sunday.jpg",
        "ex": "We stay at home on Sunday.",
        "trVi": "Chúng em ở nhà vào Chủ Nhật.",
        "trAnswer": "We stay at home on Sunday.",
        "trKey": "sunday"
      },
      {
        "en": "Do housework",
        "ipa": "/duː ˈhaʊswɜːk/",
        "vi": "Làm việc nhà",
        "img": "https://img.invalid/do-housework.jpg",
        "ex": "I do housework on Saturdays.",
        "trVi": "Em làm việc nhà vào các ngày thứ Bảy.",
        "trAnswer": "I do housework on Saturdays.",
        "trKey": "do housework"
      },
      {
        "en": "Listen to music",
        "ipa": "/ˈlɪsn tə ˈmjuːzɪk/",
        "vi": "Nghe nhạc",
        "img": "https://img.invalid/listen-to-music.jpg",
        "ex": "Nam listens to music every Sunday.",
        "trVi": "Nam nghe nhạc vào mỗi Chủ Nhật.",
        "trAnswer": "Nam listens to music every Sunday.",
        "trKey": "listen to music"
      },
      {
        "en": "Study at school",
        "ipa": "/ˈstʌdi ət skuːl/",
        "vi": "Học ở trường",
        "img": "https://img.invalid/study-at-school.jpg",
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
        "img": "https://img.invalid/january.jpg",
        "ex": "Linh's birthday is in January.",
        "trVi": "Sinh nhật của Linh vào tháng Giêng.",
        "trAnswer": "Linh's birthday is in January.",
        "trKey": "january"
      },
      {
        "en": "February",
        "ipa": "/ˈfebruəri/",
        "vi": "Tháng Hai",
        "img": "https://img.invalid/february.jpg",
        "ex": "My birthday is in February.",
        "trVi": "Sinh nhật của em vào tháng Hai.",
        "trAnswer": "My birthday is in February.",
        "trKey": "february"
      },
      {
        "en": "March",
        "ipa": "/mɑːtʃ/",
        "vi": "Tháng Ba",
        "img": "https://img.invalid/march.jpg",
        "ex": "Ben's birthday is in March.",
        "trVi": "Sinh nhật của Ben vào tháng Ba.",
        "trAnswer": "Ben's birthday is in March.",
        "trKey": "march"
      },
      {
        "en": "April",
        "ipa": "/ˈeɪprəl/",
        "vi": "Tháng Tư",
        "img": "https://img.invalid/april.jpg",
        "ex": "Mary's birthday is in April.",
        "trVi": "Sinh nhật của Mary vào tháng Tư.",
        "trAnswer": "Mary's birthday is in April.",
        "trKey": "april"
      },
      {
        "en": "May",
        "ipa": "/meɪ/",
        "vi": "Tháng Năm",
        "img": "https://img.invalid/may.jpg",
        "ex": "Nam's birthday is in May.",
        "trVi": "Sinh nhật của Nam vào tháng Năm.",
        "trAnswer": "Nam's birthday is in May.",
        "trKey": "may"
      },
      {
        "en": "Birthday",
        "ipa": "/ˈbɜːθdeɪ/",
        "vi": "Ngày sinh",
        "img": "https://img.invalid/birthday.jpg",
        "ex": "Happy birthday, Lucy!",
        "trVi": "Chúc mừng sinh nhật, Lucy!",
        "trAnswer": "Happy birthday, Lucy!",
        "trKey": "birthday"
      },
      {
        "en": "Chips",
        "ipa": "/tʃɪps/",
        "vi": "Khoai tây rán",
        "img": "https://img.invalid/chips.jpg",
        "ex": "I want some chips.",
        "trVi": "Em muốn một ít khoai tây rán.",
        "trAnswer": "I want some chips.",
        "trKey": "chips"
      },
      {
        "en": "Grapes",
        "ipa": "/greɪps/",
        "vi": "Quả nho",
        "img": "https://img.invalid/grapes.jpg",
        "ex": "Mai wants some grapes.",
        "trVi": "Mai muốn một ít nho.",
        "trAnswer": "Mai wants some grapes.",
        "trKey": "grapes"
      },
      {
        "en": "Jam",
        "ipa": "/dʒæm/",
        "vi": "Mứt",
        "img": "https://img.invalid/jam.jpg",
        "ex": "Nam wants some jam.",
        "trVi": "Nam muốn một ít mứt.",
        "trAnswer": "Nam wants some jam.",
        "trKey": "jam"
      },
      {
        "en": "Juice",
        "ipa": "/dʒuːs/",
        "vi": "Nước ép",
        "img": "https://img.invalid/juice.jpg",
        "ex": "I want some juice.",
        "trVi": "Em muốn một ít nước ép.",
        "trAnswer": "I want some juice.",
        "trKey": "juice"
      },
      {
        "en": "Lemonade",
        "ipa": "/ˌleməˈneɪd/",
        "vi": "Nước chanh",
        "img": "https://img.invalid/lemonade.jpg",
        "ex": "Can I have some lemonade?",
        "trVi": "Em xin một ít nước chanh được không?",
        "trAnswer": "Can I have some lemonade?",
        "trKey": "lemonade"
      },
      {
        "en": "Party",
        "ipa": "/ˈpɑːti/",
        "vi": "Buổi tiệc",
        "img": "https://img.invalid/party.jpg",
        "ex": "We have a party on Sunday.",
        "trVi": "Chúng em có một buổi tiệc vào Chủ Nhật.",
        "trAnswer": "We have a party on Sunday.",
        "trKey": "party"
      },
      {
        "en": "Water",
        "ipa": "/ˈwɔːtə/",
        "vi": "Nước (uống)",
        "img": "https://img.invalid/water.jpg",
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
        "img": "https://img.invalid/can.jpg",
        "ex": "I can ride a bike.",
        "trVi": "Em có thể đi xe đạp.",
        "trAnswer": "I can ride a bike.",
        "trKey": "can"
      },
      {
        "en": "Cook",
        "ipa": "/kʊk/",
        "vi": "Nấu ăn",
        "img": "https://img.invalid/cook.jpg",
        "ex": "Mai can cook.",
        "trVi": "Mai biết nấu ăn.",
        "trAnswer": "Mai can cook.",
        "trKey": "cook"
      },
      {
        "en": "Draw",
        "ipa": "/drɔː/",
        "vi": "Vẽ",
        "img": "https://img.invalid/draw.jpg",
        "ex": "Nam can draw well.",
        "trVi": "Nam vẽ rất giỏi.",
        "trAnswer": "Nam can draw well.",
        "trKey": "draw"
      },
      {
        "en": "Play the guitar",
        "ipa": "/pleɪ ðə gɪˈtɑː/",
        "vi": "Chơi đàn ghi ta",
        "img": "https://img.invalid/play-the-guitar.jpg",
        "ex": "Ben can play the guitar.",
        "trVi": "Ben biết chơi đàn ghi ta.",
        "trAnswer": "Ben can play the guitar.",
        "trKey": "play the guitar"
      },
      {
        "en": "Play the piano",
        "ipa": "/pleɪ ðə piˈænəʊ/",
        "vi": "Chơi đàn piano",
        "img": "https://img.invalid/play-the-piano.jpg",
        "ex": "Linh can play the piano.",
        "trVi": "Linh biết chơi đàn piano.",
        "trAnswer": "Linh can play the piano.",
        "trKey": "play the piano"
      },
      {
        "en": "Ride a bike",
        "ipa": "/raɪd ə baɪk/",
        "vi": "Đạp xe",
        "img": "https://img.invalid/ride-a-bike.jpg",
        "ex": "Can you ride a bike?",
        "trVi": "Bạn có biết đi xe đạp không?",
        "trAnswer": "Can you ride a bike?",
        "trKey": "ride a bike"
      },
      {
        "en": "Ride a horse",
        "ipa": "/raɪd ə hɔːs/",
        "vi": "Cưỡi ngựa",
        "img": "https://img.invalid/ride-a-horse.jpg",
        "ex": "Mary can ride a horse.",
        "trVi": "Mary biết cưỡi ngựa.",
        "trAnswer": "Mary can ride a horse.",
        "trKey": "ride a horse"
      },
      {
        "en": "Roller skate",
        "ipa": "/ˈrəʊlə skeɪt/",
        "vi": "Trượt patanh",
        "img": "https://img.invalid/roller-skate.jpg",
        "ex": "I can roller skate.",
        "trVi": "Em biết trượt patanh.",
        "trAnswer": "I can roller skate.",
        "trKey": "roller skate"
      },
      {
        "en": "Swim",
        "ipa": "/swɪm/",
        "vi": "Bơi",
        "img": "https://img.invalid/swim.jpg",
        "ex": "Bill can swim very well.",
        "trVi": "Bill bơi rất giỏi.",
        "trAnswer": "Bill can swim very well.",
        "trKey": "swim"
      },
      {
        "en": "But",
        "ipa": "/bʌt/",
        "vi": "Nhưng",
        "img": "https://img.invalid/but.jpg",
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
        "img": "https://img.invalid/city.jpg",
        "ex": "My school is in the city.",
        "trVi": "Trường của em ở thành phố.",
        "trAnswer": "My school is in the city.",
        "trKey": "city"
      },
      {
        "en": "Mountains",
        "ipa": "/ˈmaʊntənz/",
        "vi": "Vùng núi",
        "img": "https://img.invalid/mountains.jpg",
        "ex": "Their school is in the mountains.",
        "trVi": "Trường của các bạn ấy ở vùng núi.",
        "trAnswer": "Their school is in the mountains.",
        "trKey": "mountains"
      },
      {
        "en": "Town",
        "ipa": "/taʊn/",
        "vi": "Thị trấn",
        "img": "https://img.invalid/town.jpg",
        "ex": "Linh's school is in the town.",
        "trVi": "Trường của Linh ở thị trấn.",
        "trAnswer": "Linh's school is in the town.",
        "trKey": "town"
      },
      {
        "en": "Village",
        "ipa": "/ˈvɪlɪdʒ/",
        "vi": "Ngôi làng",
        "img": "https://img.invalid/village.jpg",
        "ex": "Nam's school is in the village.",
        "trVi": "Trường của Nam ở trong làng.",
        "trAnswer": "Nam's school is in the village.",
        "trKey": "village"
      },
      {
        "en": "Building",
        "ipa": "/ˈbɪldɪŋ/",
        "vi": "Toà nhà",
        "img": "https://img.invalid/building.jpg",
        "ex": "There are three buildings at my school.",
        "trVi": "Trường em có ba toà nhà.",
        "trAnswer": "There are three buildings at my school.",
        "trKey": "building"
      },
      {
        "en": "Computer room",
        "ipa": "/kəmˈpjuːtə ruːm/",
        "vi": "Phòng máy tính",
        "img": "https://img.invalid/computer-room.jpg",
        "ex": "There is one computer room.",
        "trVi": "Có một phòng máy tính.",
        "trAnswer": "There is one computer room.",
        "trKey": "computer room"
      },
      {
        "en": "School garden",
        "ipa": "/skuːl ˈgɑːdn/",
        "vi": "Vườn trường",
        "img": "https://img.invalid/school-garden.jpg",
        "ex": "There is a school garden.",
        "trVi": "Có một vườn trường.",
        "trAnswer": "There is a school garden.",
        "trKey": "school garden"
      },
      {
        "en": "Playground",
        "ipa": "/ˈpleɪgraʊnd/",
        "vi": "Sân chơi",
        "img": "https://img.invalid/playground.jpg",
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
        "img": "https://img.invalid/art.jpg",
        "ex": "I have art on Monday.",
        "trVi": "Em học Mĩ thuật vào thứ Hai.",
        "trAnswer": "I have art on Monday.",
        "trKey": "art"
      },
      {
        "en": "English",
        "ipa": "/ˈɪŋglɪʃ/",
        "vi": "Môn Tiếng Anh",
        "img": "https://img.invalid/english.jpg",
        "ex": "I have English and science today.",
        "trVi": "Hôm nay em học Tiếng Anh và Khoa học.",
        "trAnswer": "I have English and science today.",
        "trKey": "english"
      },
      {
        "en": "History and geography",
        "ipa": "/ˈhɪstri ænd dʒiˈɒgrəfi/",
        "vi": "Môn Lịch sử và Địa lí",
        "img": "https://img.invalid/history-and-geography.jpg",
        "ex": "We have history and geography on Tuesday.",
        "trVi": "Chúng em học Lịch sử và Địa lí vào thứ Ba.",
        "trAnswer": "We have history and geography on Tuesday.",
        "trKey": "history and geography"
      },
      {
        "en": "Maths",
        "ipa": "/mæθs/",
        "vi": "Môn Toán, toán học",
        "img": "https://img.invalid/maths.jpg",
        "ex": "I have maths on Wednesday.",
        "trVi": "Em học Toán vào thứ Tư.",
        "trAnswer": "I have maths on Wednesday.",
        "trKey": "maths"
      },
      {
        "en": "Music",
        "ipa": "/ˈmjuːzɪk/",
        "vi": "Môn Âm nhạc",
        "img": "https://img.invalid/music.jpg",
        "ex": "Mai has music on Wednesday.",
        "trVi": "Mai học Âm nhạc vào thứ Tư.",
        "trAnswer": "Mai has music on Wednesday.",
        "trKey": "music"
      },
      {
        "en": "Science",
        "ipa": "/ˈsaɪəns/",
        "vi": "Môn Khoa học",
        "img": "https://img.invalid/science.jpg",
        "ex": "I have science on Monday.",
        "trVi": "Em học Khoa học vào thứ Hai.",
        "trAnswer": "I have science on Monday.",
        "trKey": "science"
      },
      {
        "en": "Vietnamese",
        "ipa": "/ˌviːetnəˈmiːz/",
        "vi": "Môn Tiếng Việt",
        "img": "https://img.invalid/vietnamese.jpg",
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
        "img": "https://img.invalid/it.jpg",
        "ex": "My favourite subject is IT.",
        "trVi": "Môn học em thích nhất là Tin học.",
        "trAnswer": "My favourite subject is IT.",
        "trKey": "it"
      },
      {
        "en": "PE",
        "ipa": "/piː ˈiː/",
        "vi": "Môn Thể dục, môn Giáo dục thể chất",
        "img": "https://img.invalid/pe.jpg",
        "ex": "Nam's favourite subject is PE.",
        "trVi": "Môn học Nam thích nhất là Thể dục.",
        "trAnswer": "Nam's favourite subject is PE.",
        "trKey": "pe"
      },
      {
        "en": "English teacher",
        "ipa": "/ˈɪŋglɪʃ ˈtiːtʃə/",
        "vi": "Giáo viên (dạy Tiếng Anh)",
        "img": "https://img.invalid/english-teacher.jpg",
        "ex": "I want to be an English teacher.",
        "trVi": "Em muốn trở thành giáo viên Tiếng Anh.",
        "trAnswer": "I want to be an English teacher.",
        "trKey": "english teacher"
      },
      {
        "en": "Painter",
        "ipa": "/ˈpeɪntə/",
        "vi": "Hoạ sĩ",
        "img": "https://img.invalid/painter.jpg",
        "ex": "Mai wants to be a painter.",
        "trVi": "Mai muốn trở thành hoạ sĩ.",
        "trAnswer": "Mai wants to be a painter.",
        "trKey": "painter"
      },
      {
        "en": "Maths teacher",
        "ipa": "/mæθs ˈtiːtʃə/",
        "vi": "Giáo viên (dạy Toán)",
        "img": "https://img.invalid/maths-teacher.jpg",
        "ex": "Ben wants to be a maths teacher.",
        "trVi": "Ben muốn trở thành giáo viên Toán.",
        "trAnswer": "Ben wants to be a maths teacher.",
        "trKey": "maths teacher"
      },
      {
        "en": "Because",
        "ipa": "/bɪˈkɒz/",
        "vi": "Bởi vì",
        "img": "https://img.invalid/because.jpg",
        "ex": "I like art because it's fun.",
        "trVi": "Em thích Mĩ thuật vì môn đó rất vui.",
        "trAnswer": "I like art because it's fun.",
        "trKey": "because"
      },
      {
        "en": "Why",
        "ipa": "/waɪ/",
        "vi": "Tại sao",
        "img": "https://img.invalid/why.jpg",
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
        "img": "https://img.invalid/june.jpg",
        "ex": "Our sports day is in June.",
        "trVi": "Ngày hội thể thao của chúng em vào tháng Sáu.",
        "trAnswer": "Our sports day is in June.",
        "trKey": "june"
      },
      {
        "en": "July",
        "ipa": "/dʒʊˈlaɪ/",
        "vi": "Tháng Bảy",
        "img": "https://img.invalid/july.jpg",
        "ex": "Is your sports day in July?",
        "trVi": "Ngày hội thể thao của bạn vào tháng Bảy phải không?",
        "trAnswer": "Is your sports day in July?",
        "trKey": "july"
      },
      {
        "en": "September",
        "ipa": "/sepˈtembə/",
        "vi": "Tháng Chín",
        "img": "https://img.invalid/september.jpg",
        "ex": "Their sports day is in September.",
        "trVi": "Ngày hội thể thao của các bạn ấy vào tháng Chín.",
        "trAnswer": "Their sports day is in September.",
        "trKey": "september"
      },
      {
        "en": "October",
        "ipa": "/ɒkˈtəʊbə/",
        "vi": "Tháng Mười",
        "img": "https://img.invalid/october.jpg",
        "ex": "My sports day is in October.",
        "trVi": "Ngày hội thể thao của em vào tháng Mười.",
        "trAnswer": "My sports day is in October.",
        "trKey": "october"
      },
      {
        "en": "November",
        "ipa": "/nəʊˈvembə/",
        "vi": "Tháng Mười Một",
        "img": "https://img.invalid/november.jpg",
        "ex": "It isn't in November.",
        "trVi": "Nó không phải vào tháng Mười Một.",
        "trAnswer": "It isn't in November.",
        "trKey": "november"
      },
      {
        "en": "December",
        "ipa": "/dɪˈsembə/",
        "vi": "Tháng Mười Hai",
        "img": "https://img.invalid/december.jpg",
        "ex": "Is your sports day in December?",
        "trVi": "Ngày hội thể thao của bạn vào tháng Mười Hai phải không?",
        "trAnswer": "Is your sports day in December?",
        "trKey": "december"
      },
      {
        "en": "Sports day",
        "ipa": "/ˈspɔːts deɪ/",
        "vi": "Ngày hội thể thao",
        "img": "https://img.invalid/sports-day.jpg",
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
        "img": "https://img.invalid/beach.jpg",
        "ex": "I was on the beach yesterday.",
        "trVi": "Hôm qua em ở bãi biển.",
        "trAnswer": "I was on the beach yesterday.",
        "trKey": "beach"
      },
      {
        "en": "Campsite",
        "ipa": "/ˈkæmpsaɪt/",
        "vi": "Địa điểm cắm trại",
        "img": "https://img.invalid/campsite.jpg",
        "ex": "We were at the campsite last weekend.",
        "trVi": "Chúng em đã ở địa điểm cắm trại vào cuối tuần trước.",
        "trAnswer": "We were at the campsite last weekend.",
        "trKey": "campsite"
      },
      {
        "en": "Countryside",
        "ipa": "/ˈkʌntrisaɪd/",
        "vi": "Nông thôn, vùng quê",
        "img": "https://img.invalid/countryside.jpg",
        "ex": "Mai was in the countryside last weekend.",
        "trVi": "Mai đã ở vùng quê vào cuối tuần trước.",
        "trAnswer": "Mai was in the countryside last weekend.",
        "trKey": "countryside"
      },
      {
        "en": "Bangkok",
        "ipa": "/bæŋˈkɒk/",
        "vi": "Băng Cốc (thủ đô của nước Thái Lan)",
        "img": "https://img.invalid/bangkok.jpg",
        "ex": "Nam was in Bangkok last summer.",
        "trVi": "Nam đã ở Băng Cốc vào mùa hè trước.",
        "trAnswer": "Nam was in Bangkok last summer.",
        "trKey": "bangkok"
      },
      {
        "en": "London",
        "ipa": "/ˈlʌndən/",
        "vi": "Luân Đôn (thủ đô của nước Anh)",
        "img": "https://img.invalid/london.jpg",
        "ex": "Were you in London last summer?",
        "trVi": "Bạn đã ở Luân Đôn vào mùa hè trước phải không?",
        "trAnswer": "Were you in London last summer?",
        "trKey": "london"
      },
      {
        "en": "Sydney",
        "ipa": "/ˈsɪdni/",
        "vi": "Xít-ni (thành phố của nước Ô-xtơ-rây-li-a)",
        "img": "https://img.invalid/sydney.jpg",
        "ex": "Lucy was in Sydney last summer.",
        "trVi": "Lucy đã ở Xít-ni vào mùa hè trước.",
        "trAnswer": "Lucy was in Sydney last summer.",
        "trKey": "sydney"
      },
      {
        "en": "Tokyo",
        "ipa": "/ˈtəʊkiəʊ/",
        "vi": "Tô-ki-ô (thủ đô của nước Nhật)",
        "img": "https://img.invalid/tokyo.jpg",
        "ex": "I was in Tokyo last summer.",
        "trVi": "Em đã ở Tô-ki-ô vào mùa hè trước.",
        "trAnswer": "I was in Tokyo last summer.",
        "trKey": "tokyo"
      },
      {
        "en": "Last",
        "ipa": "/lɑːst/",
        "vi": "Trước, lần trước",
        "img": "https://img.invalid/last.jpg",
        "ex": "Where were you last weekend?",
        "trVi": "Cuối tuần trước bạn đã ở đâu?",
        "trAnswer": "Where were you last weekend?",
        "trKey": "last"
      },
      {
        "en": "Yesterday",
        "ipa": "/ˈjestədeɪ/",
        "vi": "Ngày hôm qua",
        "img": "https://img.invalid/yesterday.jpg",
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
  }
];
