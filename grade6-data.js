// Dữ liệu từ vựng lớp 6 (THCS/THPT) — trích từ SGK Tiếng Anh 6 Global Success, tập 1 và tập 2
// Mỗi unit gồm: từ vựng (words), bài đọc (story). Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE6_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🏫",
    "title": "MY NEW SCHOOL",
    "titleVi": "Ngôi trường mới của em",
    "words": [
      {
        "en": "School bag",
        "ipa": "/ˈskuːl bæg/",
        "vi": "Cặp sách",
        "img": "https://img.invalid/school-bag.jpg",
        "ex": "Your school bag looks heavy, Duy.",
        "trVi": "Cặp sách của bạn trông nặng đấy, Duy.",
        "trAnswer": "Your school bag looks heavy, Duy.",
        "trKey": "school bag"
      },
      {
        "en": "Uniform",
        "ipa": "/ˈjuːnɪfɔːm/",
        "vi": "Đồng phục",
        "img": "https://img.invalid/uniform.jpg",
        "ex": "We always look smart in our uniforms.",
        "trVi": "Chúng tôi luôn trông thật bảnh bao trong bộ đồng phục của mình.",
        "trAnswer": "We always look smart in our uniforms.",
        "trKey": "uniform"
      },
      {
        "en": "Subject",
        "ipa": "/ˈsʌbdʒɪkt/",
        "vi": "Môn học",
        "img": "https://img.invalid/subject.jpg",
        "ex": "We have new subjects to study this year.",
        "trVi": "Chúng tôi có những môn học mới để học trong năm nay.",
        "trAnswer": "We have new subjects to study this year.",
        "trKey": "subject"
      },
      {
        "en": "Homework",
        "ipa": "/ˈhəʊmwɜːk/",
        "vi": "Bài tập về nhà",
        "img": "https://img.invalid/homework.jpg",
        "ex": "Vy and I often do our homework after school.",
        "trVi": "Vy và tôi thường làm bài tập về nhà sau giờ học.",
        "trAnswer": "Vy and I often do our homework after school.",
        "trKey": "homework"
      },
      {
        "en": "Football",
        "ipa": "/ˈfʊtbɔːl/",
        "vi": "Bóng đá",
        "img": "https://img.invalid/football.jpg",
        "ex": "Nick plays football for the school team.",
        "trVi": "Nick chơi bóng đá cho đội của trường.",
        "trAnswer": "Nick plays football for the school team.",
        "trKey": "football"
      },
      {
        "en": "History",
        "ipa": "/ˈhɪstri/",
        "vi": "Môn lịch sử",
        "img": "https://img.invalid/history.jpg",
        "ex": "Mrs Nguyen teaches all my history lessons.",
        "trVi": "Cô Nguyễn dạy tất cả các tiết lịch sử của tôi.",
        "trAnswer": "Mrs Nguyen teaches all my history lessons.",
        "trKey": "history"
      },
      {
        "en": "Exercise",
        "ipa": "/ˈeksəsaɪz/",
        "vi": "Bài tập thể dục",
        "img": "https://img.invalid/exercise.jpg",
        "ex": "They are healthy because they do exercise every day.",
        "trVi": "Họ khỏe mạnh vì họ tập thể dục mỗi ngày.",
        "trAnswer": "They are healthy because they do exercise every day.",
        "trKey": "exercise"
      },
      {
        "en": "Science",
        "ipa": "/ˈsaɪəns/",
        "vi": "Môn khoa học",
        "img": "https://img.invalid/science.jpg",
        "ex": "I study maths, English and science on Mondays.",
        "trVi": "Tôi học toán, tiếng Anh và khoa học vào các ngày thứ Hai.",
        "trAnswer": "I study maths, English and science on Mondays.",
        "trKey": "science"
      },
      {
        "en": "Compass",
        "ipa": "/ˈkʌmpəs/",
        "vi": "Com-pa",
        "img": "https://img.invalid/compass.jpg",
        "ex": "My brother has a new compass for his maths class.",
        "trVi": "Anh trai tôi có một cái com-pa mới cho lớp toán.",
        "trAnswer": "My brother has a new compass for his maths class.",
        "trKey": "compass"
      },
      {
        "en": "Classmate",
        "ipa": "/ˈklɑːsmeɪt/",
        "vi": "Bạn cùng lớp",
        "img": "https://img.invalid/classmate.jpg",
        "ex": "Do you share things with your classmates?",
        "trVi": "Bạn có chia sẻ đồ dùng với các bạn cùng lớp không?",
        "trAnswer": "Do you share things with your classmates?",
        "trKey": "classmate"
      },
      {
        "en": "Pencil case",
        "ipa": "/ˈpensl keɪs/",
        "vi": "Hộp bút",
        "img": "https://img.invalid/pencil-case.jpg",
        "ex": "I have a red pencil case for my pens.",
        "trVi": "Tôi có một hộp bút màu đỏ để đựng bút.",
        "trAnswer": "I have a red pencil case for my pens.",
        "trKey": "pencil case"
      },
      {
        "en": "Lesson",
        "ipa": "/ˈlesn/",
        "vi": "Tiết học",
        "img": "https://img.invalid/lesson.jpg",
        "ex": "The art lesson starts at nine o'clock.",
        "trVi": "Tiết học mỹ thuật bắt đầu lúc chín giờ.",
        "trAnswer": "The art lesson starts at nine o'clock.",
        "trKey": "lesson"
      }
    ],
    "story": {
      "title": "Three schools in Viet Nam and Australia",
      "titleVi": "Ba ngôi trường ở Việt Nam và Úc",
      "text": "Sunrise is a boarding school in Sydney. Students study and live there. About 1,200 boys and girls go to Sunrise. It has students from all over Australia. They study subjects like maths, science and English.<br><br>An Son is a lower secondary school in Bac Giang. It has only 8 classes. There are mountains and green fields around the school. There is a computer room and a library. There is also a school garden and a playground.<br><br>Dream is an international school. Here students learn English with English-speaking teachers. In the afternoon, they join many interesting clubs. They play sports and games. Some students do paintings in the art club.",
      "textVi": "Sunrise là một trường nội trú ở Sydney. Học sinh học tập và sinh sống tại trường. Có khoảng 1.200 học sinh nam và nữ theo học tại Sunrise. Trường có học sinh đến từ khắp nước Úc. Các em học những môn như toán, khoa học và tiếng Anh.<br><br>An Sơn là một trường trung học cơ sở ở Bắc Giang. Trường chỉ có 8 lớp học. Xung quanh trường là núi non và những cánh đồng xanh mát. Trường có một phòng máy tính và một thư viện. Trường cũng có một khu vườn và một sân chơi.<br><br>Dream là một trường quốc tế. Ở đây học sinh học tiếng Anh với giáo viên bản ngữ. Vào buổi chiều, các em tham gia nhiều câu lạc bộ thú vị. Các em chơi thể thao và trò chơi. Một số học sinh vẽ tranh trong câu lạc bộ mỹ thuật.",
      "used": [
        "Science"
      ]
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🏠",
    "title": "MY HOUSE",
    "titleVi": "Ngôi nhà của em",
    "words": [
      {
        "en": "Town house",
        "ipa": "/taʊn haʊs/",
        "vi": "Nhà phố",
        "img": "https://img.invalid/town-house.jpg",
        "ex": "I live in a town house, and my friend lives in a country house.",
        "trVi": "Tôi sống trong một căn nhà phố, còn bạn tôi sống trong một ngôi nhà ở nông thôn.",
        "trAnswer": "I live in a town house, and my friend lives in a country house.",
        "trKey": "town house"
      },
      {
        "en": "Flat",
        "ipa": "/flæt/",
        "vi": "Căn hộ chung cư",
        "img": "https://img.invalid/flat.jpg",
        "ex": "We're moving to a new flat next month.",
        "trVi": "Chúng tôi sẽ chuyển đến một căn hộ mới vào tháng sau.",
        "trAnswer": "We're moving to a new flat next month.",
        "trKey": "flat"
      },
      {
        "en": "Living room",
        "ipa": "/ˈlɪvɪŋ ruːm/",
        "vi": "Phòng khách",
        "img": "https://img.invalid/living-room.jpg",
        "ex": "There's a living room, three bedrooms, a kitchen and two bathrooms in our new flat.",
        "trVi": "Căn hộ mới của chúng tôi có một phòng khách, ba phòng ngủ, một nhà bếp và hai phòng tắm.",
        "trAnswer": "There's a living room, three bedrooms, a kitchen and two bathrooms in our new flat.",
        "trKey": "living room"
      },
      {
        "en": "Bathroom",
        "ipa": "/ˈbɑːθruːm/",
        "vi": "Phòng tắm",
        "img": "https://img.invalid/bathroom.jpg",
        "ex": "The tiger is between the bathroom door and the window.",
        "trVi": "Con hổ nằm giữa cửa phòng tắm và cửa sổ.",
        "trAnswer": "The tiger is between the bathroom door and the window.",
        "trKey": "bathroom"
      },
      {
        "en": "Wardrobe",
        "ipa": "/ˈwɔːdrəʊb/",
        "vi": "Tủ quần áo",
        "img": "https://img.invalid/wardrobe.jpg",
        "ex": "There's a lamp, a wardrobe and a desk in the Tiger Room.",
        "trVi": "Trong Phòng Con Hổ có một chiếc đèn, một tủ quần áo và một chiếc bàn học.",
        "trAnswer": "There's a lamp, a wardrobe and a desk in the Tiger Room.",
        "trKey": "wardrobe"
      },
      {
        "en": "Lamp",
        "ipa": "/læmp/",
        "vi": "Đèn",
        "img": "https://img.invalid/lamp.jpg",
        "ex": "Don't forget we need two lamps for my bedroom, Mum.",
        "trVi": "Đừng quên là chúng ta cần hai chiếc đèn cho phòng ngủ của con nhé, Mẹ.",
        "trAnswer": "Don't forget we need two lamps for my bedroom, Mum.",
        "trKey": "lamp"
      },
      {
        "en": "Cupboard",
        "ipa": "/ˈkʌbəd/",
        "vi": "Tủ đựng đồ",
        "img": "https://img.invalid/cupboard.jpg",
        "ex": "There's a cupboard and a fridge in the kitchen.",
        "trVi": "Trong bếp có một tủ đựng đồ và một tủ lạnh.",
        "trAnswer": "There's a cupboard and a fridge in the kitchen.",
        "trKey": "cupboard"
      },
      {
        "en": "Fridge",
        "ipa": "/frɪdʒ/",
        "vi": "Tủ lạnh",
        "img": "https://img.invalid/fridge.jpg",
        "ex": "My mother keeps the vegetables in the fridge.",
        "trVi": "Mẹ tôi cất rau củ trong tủ lạnh.",
        "trAnswer": "My mother keeps the vegetables in the fridge.",
        "trKey": "fridge"
      },
      {
        "en": "Sofa",
        "ipa": "/ˈsəʊfə/",
        "vi": "Ghế sofa",
        "img": "https://img.invalid/sofa.jpg",
        "ex": "There's a sofa and a television in the living room.",
        "trVi": "Trong phòng khách có một chiếc ghế sofa và một chiếc ti vi.",
        "trAnswer": "There's a sofa and a television in the living room.",
        "trKey": "sofa"
      },
      {
        "en": "Picture",
        "ipa": "/ˈpɪktʃər/",
        "vi": "Bức tranh",
        "img": "https://img.invalid/picture.jpg",
        "ex": "How about putting a picture on the wall?",
        "trVi": "Con thấy sao nếu treo một bức tranh lên tường?",
        "trAnswer": "How about putting a picture on the wall?",
        "trKey": "picture"
      },
      {
        "en": "Chest of drawers",
        "ipa": "/tʃest əv drɔːz/",
        "vi": "Tủ ngăn kéo",
        "img": "https://img.invalid/chest-of-drawers.jpg",
        "ex": "I keep my clothes in the chest of drawers.",
        "trVi": "Tôi cất quần áo trong tủ ngăn kéo.",
        "trAnswer": "I keep my clothes in the chest of drawers.",
        "trKey": "chest of drawers"
      }
    ],
    "story": {
      "title": "A room at the Crazy House Hotel",
      "titleVi": "Một căn phòng tại khách sạn Crazy House",
      "text": "Hi Phong and Mi,<br>How are you? I'm in Da Lat with my parents. We're staying at the Crazy House Hotel. Wow! It really is crazy. There are ten rooms in the hotel. There's a Kangaroo Room, an Eagle Room, and even an Ant Room. I'm staying in the Tiger Room. It's called the Tiger Room because there's a big tiger on the wall.<br><br>The tiger is between the bathroom door and the window. The bed is next to the window, but the window is a strange shape. I put my bag under the bed. There's a lamp, a wardrobe and a desk. You should stay here when you visit Da Lat. It's great.<br><br>See you soon!<br>Nick",
      "textVi": "Chào Phong và Mi,<br>Các bạn khỏe không? Mình đang ở Đà Lạt cùng bố mẹ. Chúng mình đang ở tại khách sạn Crazy House. Chà! Nó thật sự rất điên rồ. Khách sạn có mười phòng. Có Phòng Chuột Túi, Phòng Đại Bàng, và cả Phòng Kiến nữa. Mình đang ở Phòng Con Hổ. Nó được gọi là Phòng Con Hổ vì có một con hổ to trên tường.<br><br>Con hổ nằm giữa cửa phòng tắm và cửa sổ. Chiếc giường thì ở cạnh cửa sổ, nhưng cửa sổ lại có hình dáng kỳ lạ. Mình để ba lô dưới gầm giường. Trong phòng có một chiếc đèn, một tủ quần áo và một chiếc bàn học. Các bạn nên đến đây ở khi ghé thăm Đà Lạt. Nó tuyệt lắm.<br><br>Hẹn gặp lại sớm nhé!<br>Nick",
      "used": [
        "Lamp",
        "Wardrobe",
        "Bathroom"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "👫",
    "title": "MY FRIENDS",
    "titleVi": "Bạn bè của em",
    "words": [
      {
        "en": "Hair",
        "ipa": "/heər/",
        "vi": "Tóc",
        "img": "https://img.invalid/hair.jpg",
        "ex": "She has glasses and long black hair.",
        "trVi": "Cô ấy đeo kính và có mái tóc đen dài.",
        "trAnswer": "She has glasses and long black hair.",
        "trKey": "hair"
      },
      {
        "en": "Eyes",
        "ipa": "/aɪz/",
        "vi": "Đôi mắt",
        "img": "https://img.invalid/eyes.jpg",
        "ex": "She has bright brown eyes.",
        "trVi": "Cô ấy có đôi mắt nâu sáng.",
        "trAnswer": "She has bright brown eyes.",
        "trKey": "eyes"
      },
      {
        "en": "Shoulder",
        "ipa": "/ˈʃəʊldər/",
        "vi": "Vai",
        "img": "https://img.invalid/shoulder.jpg",
        "ex": "Put your hand on your shoulder.",
        "trVi": "Hãy đặt tay lên vai của bạn.",
        "trAnswer": "Put your hand on your shoulder.",
        "trKey": "shoulder"
      },
      {
        "en": "Confident",
        "ipa": "/ˈkɒnfɪdənt/",
        "vi": "Tự tin",
        "img": "https://img.invalid/confident.jpg",
        "ex": "Minh Duc is confident. He likes meeting new people.",
        "trVi": "Minh Đức rất tự tin. Cậu ấy thích gặp gỡ những người bạn mới.",
        "trAnswer": "Minh Duc is confident. He likes meeting new people.",
        "trKey": "confident"
      },
      {
        "en": "Creative",
        "ipa": "/kriˈeɪtɪv/",
        "vi": "Sáng tạo",
        "img": "https://img.invalid/creative.jpg",
        "ex": "Mina is very creative. She likes drawing pictures.",
        "trVi": "Mina rất sáng tạo. Cô bé thích vẽ tranh.",
        "trAnswer": "Mina is very creative. She likes drawing pictures.",
        "trKey": "creative"
      },
      {
        "en": "Hard-working",
        "ipa": "/hɑːd ˈwɜːkɪŋ/",
        "vi": "Chăm chỉ",
        "img": "https://img.invalid/hard-working.jpg",
        "ex": "Nam is hard-working. He likes helping his friends.",
        "trVi": "Nam rất chăm chỉ. Cậu ấy thích giúp đỡ bạn bè.",
        "trAnswer": "Nam is hard-working. He likes helping his friends.",
        "trKey": "hard-working"
      },
      {
        "en": "Careful",
        "ipa": "/ˈkeəfl/",
        "vi": "Cẩn thận",
        "img": "https://img.invalid/careful.jpg",
        "ex": "Kim is very careful. She pays attention to what she's doing.",
        "trVi": "Kim rất cẩn thận. Cô bé chú ý đến những gì mình đang làm.",
        "trAnswer": "Kim is very careful. She pays attention to what she's doing.",
        "trKey": "careful"
      },
      {
        "en": "Clever",
        "ipa": "/ˈklevər/",
        "vi": "Thông minh",
        "img": "https://img.invalid/clever.jpg",
        "ex": "Mai is clever. She learns things quickly and easily.",
        "trVi": "Mai rất thông minh. Cô bé học mọi thứ nhanh và dễ dàng.",
        "trAnswer": "Mai is clever. She learns things quickly and easily.",
        "trKey": "clever"
      },
      {
        "en": "Friendly",
        "ipa": "/ˈfrendli/",
        "vi": "Thân thiện",
        "img": "https://img.invalid/friendly.jpg",
        "ex": "Nhung is kind and friendly.",
        "trVi": "Nhung tốt bụng và thân thiện.",
        "trAnswer": "Nhung is kind and friendly.",
        "trKey": "friendly"
      },
      {
        "en": "Blonde",
        "ipa": "/blɒnd/",
        "vi": "Tóc vàng hoe",
        "img": "https://img.invalid/blonde.jpg",
        "ex": "Jimmy has blonde hair and blue eyes.",
        "trVi": "Jimmy có mái tóc vàng hoe và đôi mắt xanh.",
        "trAnswer": "Jimmy has blonde hair and blue eyes.",
        "trKey": "blonde"
      },
      {
        "en": "Curly",
        "ipa": "/ˈkɜːli/",
        "vi": "Xoăn",
        "img": "https://img.invalid/curly.jpg",
        "ex": "Nhung has curly black hair.",
        "trVi": "Nhung có mái tóc đen xoăn.",
        "trAnswer": "Nhung has curly black hair.",
        "trKey": "curly"
      }
    ],
    "story": {
      "title": "My first day at summer camp",
      "titleVi": "Ngày đầu tiên ở trại hè",
      "text": "Hi Mum and Dad,<br>Here I am at the Superb Summer Camp. Mr Black asked us to write emails in English! Wow, everything here is in English!<br><br>I have some new friends: Jimmy, Phong, and Nhung. They're in the photo. Jimmy has blonde hair and blue eyes. He's clever and creative. He likes taking photos. Phong is the tall boy. He's sporty and plays basketball very well. Nhung has curly black hair. She's kind. She shared her lunch with me today.<br><br>We're having fun. Jimmy's taking photos of me. Phong's reading a comic book, and Nhung's playing the violin. I must go now.<br>Please write soon.<br>Love,<br>Nam",
      "textVi": "Bố mẹ thân mến,<br>Con đang ở Trại hè Superb đây. Thầy Black bảo chúng con viết email bằng tiếng Anh! Chà, ở đây mọi thứ đều bằng tiếng Anh!<br><br>Con có vài người bạn mới: Jimmy, Phong và Nhung. Họ có trong bức ảnh này. Jimmy có mái tóc vàng hoe và đôi mắt xanh. Cậu ấy thông minh và sáng tạo. Cậu ấy thích chụp ảnh. Phong là cậu bé cao. Cậu ấy chơi thể thao giỏi và chơi bóng rổ rất hay. Nhung có mái tóc đen xoăn. Cô bé tốt bụng. Hôm nay cô ấy đã chia sẻ bữa trưa của mình với con.<br><br>Chúng con đang chơi rất vui. Jimmy đang chụp ảnh con. Phong đang đọc truyện tranh, còn Nhung đang chơi vi-ô-lông. Con phải đi bây giờ.<br>Bố mẹ viết thư cho con sớm nhé.<br>Yêu bố mẹ,<br>Nam",
      "used": [
        "Blonde",
        "Creative",
        "Curly",
        "Friendly",
        "Clever"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🏘️",
    "title": "MY NEIGHBOURHOOD",
    "titleVi": "Khu phố của em",
    "words": [
      {
        "en": "Square",
        "ipa": "/skweər/",
        "vi": "Quảng trường",
        "img": "https://img.invalid/square.jpg",
        "ex": "Is there a square in your neighbourhood?",
        "trVi": "Khu phố của bạn có quảng trường không?",
        "trAnswer": "Is there a square in your neighbourhood?",
        "trKey": "square"
      },
      {
        "en": "Art gallery",
        "ipa": "/ɑːt ˈɡæləri/",
        "vi": "Phòng trưng bày nghệ thuật",
        "img": "https://img.invalid/art-gallery.jpg",
        "ex": "There's a new art gallery near my house.",
        "trVi": "Có một phòng trưng bày nghệ thuật mới gần nhà tôi.",
        "trAnswer": "There's a new art gallery near my house.",
        "trKey": "art gallery"
      },
      {
        "en": "Cathedral",
        "ipa": "/kəˈθiːdrəl/",
        "vi": "Nhà thờ lớn",
        "img": "https://img.invalid/cathedral.jpg",
        "ex": "The cathedral in our town is very old.",
        "trVi": "Nhà thờ lớn ở thị trấn của chúng tôi rất cổ kính.",
        "trAnswer": "The cathedral in our town is very old.",
        "trKey": "cathedral"
      },
      {
        "en": "Temple",
        "ipa": "/ˈtempl/",
        "vi": "Ngôi đền",
        "img": "https://img.invalid/temple.jpg",
        "ex": "There's a beautiful temple near the river.",
        "trVi": "Có một ngôi đền đẹp gần bờ sông.",
        "trAnswer": "There's a beautiful temple near the river.",
        "trKey": "temple"
      },
      {
        "en": "Railway station",
        "ipa": "/ˈreɪlweɪ ˈsteɪʃn/",
        "vi": "Ga tàu hỏa",
        "img": "https://img.invalid/railway-station.jpg",
        "ex": "Go straight and turn left at the railway station.",
        "trVi": "Đi thẳng rồi rẽ trái ở ga tàu hỏa.",
        "trAnswer": "Go straight and turn left at the railway station.",
        "trKey": "railway station"
      },
      {
        "en": "Noisy",
        "ipa": "/ˈnɔɪzi/",
        "vi": "Ồn ào",
        "img": "https://img.invalid/noisy.jpg",
        "ex": "My city is very noisy, but the people here are friendly.",
        "trVi": "Thành phố của tôi rất ồn ào, nhưng người dân ở đây rất thân thiện.",
        "trAnswer": "My city is very noisy, but the people here are friendly.",
        "trKey": "noisy"
      },
      {
        "en": "Peaceful",
        "ipa": "/ˈpiːsfl/",
        "vi": "Yên bình",
        "img": "https://img.invalid/peaceful.jpg",
        "ex": "Living in the countryside is more peaceful than living in a city.",
        "trVi": "Sống ở vùng quê thì yên bình hơn sống ở thành phố.",
        "trAnswer": "Living in the countryside is more peaceful than living in a city.",
        "trKey": "peaceful"
      },
      {
        "en": "Crowded",
        "ipa": "/ˈkraʊdɪd/",
        "vi": "Đông đúc",
        "img": "https://img.invalid/crowded.jpg",
        "ex": "The streets are busy and crowded in the city centre.",
        "trVi": "Các con phố ở trung tâm thành phố rất nhộn nhịp và đông đúc.",
        "trAnswer": "The streets are busy and crowded in the city centre.",
        "trKey": "crowded"
      },
      {
        "en": "Modern",
        "ipa": "/ˈmɒdən/",
        "vi": "Hiện đại",
        "img": "https://img.invalid/modern.jpg",
        "ex": "There are many modern buildings and offices near my house.",
        "trVi": "Có nhiều tòa nhà và văn phòng hiện đại gần nhà tôi.",
        "trAnswer": "There are many modern buildings and offices near my house.",
        "trKey": "modern"
      },
      {
        "en": "Convenient",
        "ipa": "/kənˈviːniənt/",
        "vi": "Tiện lợi",
        "img": "https://img.invalid/convenient.jpg",
        "ex": "It's convenient to live near the market and the school.",
        "trVi": "Sống gần chợ và trường học thì rất tiện lợi.",
        "trAnswer": "It's convenient to live near the market and the school.",
        "trKey": "convenient"
      },
      {
        "en": "Suburbs",
        "ipa": "/ˈsʌbɜːbz/",
        "vi": "Ngoại ô",
        "img": "https://img.invalid/suburbs.jpg",
        "ex": "I live in the suburbs of Da Nang City.",
        "trVi": "Tôi sống ở vùng ngoại ô thành phố Đà Nẵng.",
        "trAnswer": "I live in the suburbs of Da Nang City.",
        "trKey": "suburbs"
      }
    ],
    "story": {
      "title": "Khang's blog: My neighbourhood",
      "titleVi": "Nhật ký của Khang: Khu phố của tôi",
      "text": "MY NEIGHBOURHOOD<br>I live in the suburbs of Da Nang City. There are many things I like about my neighbourhood.<br><br>It's great for outdoor activities because it has beautiful parks, sandy beaches and fine weather. There's almost everything I need here: shops, restaurants, and markets. The people here are friendlier, and the food is better than in other places.<br><br>However, there are two things I dislike about it: there are many modern buildings and offices; and the streets are busy and crowded.<br>Posted by Khang at 4.55 PM",
      "textVi": "KHU PHỐ CỦA TÔI<br>Tôi sống ở vùng ngoại ô thành phố Đà Nẵng. Có rất nhiều điều tôi thích về khu phố của mình.<br><br>Nơi đây rất tuyệt cho các hoạt động ngoài trời vì có những công viên đẹp, những bãi biển đầy cát và thời tiết đẹp. Ở đây gần như có mọi thứ tôi cần: cửa hàng, nhà hàng và chợ. Người dân ở đây thân thiện hơn, và đồ ăn cũng ngon hơn so với những nơi khác.<br><br>Tuy nhiên, có hai điều tôi không thích: có nhiều tòa nhà và văn phòng hiện đại; và các con đường thì nhộn nhịp và đông đúc.<br>Đăng bởi Khang lúc 4:55 chiều",
      "used": [
        "Suburbs",
        "Modern",
        "Crowded"
      ]
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🏞️",
    "title": "NATURAL WONDERS OF VIET NAM",
    "titleVi": "Kỳ quan thiên nhiên Việt Nam",
    "words": [
      {
        "en": "Mountain",
        "ipa": "/ˈmaʊntɪn/",
        "vi": "Núi",
        "img": "https://img.invalid/mountain.jpg",
        "ex": "My grandparents live in a mountain village.",
        "trVi": "Ông bà tôi sống ở một ngôi làng trên núi.",
        "trAnswer": "My grandparents live in a mountain village.",
        "trKey": "mountain"
      },
      {
        "en": "River",
        "ipa": "/ˈrɪvər/",
        "vi": "Dòng sông",
        "img": "https://img.invalid/river.jpg",
        "ex": "There is a long river near Ha Long Bay.",
        "trVi": "Có một dòng sông dài gần Vịnh Hạ Long.",
        "trAnswer": "There is a long river near Ha Long Bay.",
        "trKey": "river"
      },
      {
        "en": "Waterfall",
        "ipa": "/ˈwɔːtəfɔːl/",
        "vi": "Thác nước",
        "img": "https://img.invalid/waterfall.jpg",
        "ex": "Ban Gioc is a famous waterfall in Cao Bang.",
        "trVi": "Bản Giốc là một thác nước nổi tiếng ở Cao Bằng.",
        "trAnswer": "Ban Gioc is a famous waterfall in Cao Bang.",
        "trKey": "waterfall"
      },
      {
        "en": "Forest",
        "ipa": "/ˈfɒrɪst/",
        "vi": "Rừng",
        "img": "https://img.invalid/forest.jpg",
        "ex": "Cuc Phuong is a beautiful forest with many old trees.",
        "trVi": "Cúc Phương là một khu rừng đẹp với nhiều cây cổ thụ.",
        "trAnswer": "Cuc Phuong is a beautiful forest with many old trees.",
        "trKey": "forest"
      },
      {
        "en": "Cave",
        "ipa": "/keɪv/",
        "vi": "Hang động",
        "img": "https://img.invalid/cave.jpg",
        "ex": "Phong Nha is a famous cave in Quang Binh.",
        "trVi": "Phong Nha là một hang động nổi tiếng ở Quảng Bình.",
        "trAnswer": "Phong Nha is a famous cave in Quang Binh.",
        "trKey": "cave"
      },
      {
        "en": "Desert",
        "ipa": "/ˈdezət/",
        "vi": "Sa mạc",
        "img": "https://img.invalid/desert.jpg",
        "ex": "Mui Ne is popular for its desert-like sand dunes.",
        "trVi": "Mũi Né nổi tiếng với những đồi cát giống sa mạc.",
        "trAnswer": "Mui Ne is popular for its desert-like sand dunes.",
        "trKey": "desert"
      },
      {
        "en": "Island",
        "ipa": "/ˈaɪlənd/",
        "vi": "Hòn đảo",
        "img": "https://img.invalid/island.jpg",
        "ex": "Ha Long Bay has thousands of big and small islands.",
        "trVi": "Vịnh Hạ Long có hàng nghìn hòn đảo lớn nhỏ.",
        "trAnswer": "Ha Long Bay has thousands of big and small islands.",
        "trKey": "island"
      },
      {
        "en": "Backpack",
        "ipa": "/ˈbækpæk/",
        "vi": "Ba lô",
        "img": "https://img.invalid/backpack.jpg",
        "ex": "A backpack is very useful when you go camping overnight.",
        "trVi": "Một chiếc ba lô rất hữu ích khi bạn đi cắm trại qua đêm.",
        "trAnswer": "A backpack is very useful when you go camping overnight.",
        "trKey": "backpack"
      },
      {
        "en": "Suncream",
        "ipa": "/ˈsʌnkriːm/",
        "vi": "Kem chống nắng",
        "img": "https://img.invalid/suncream.jpg",
        "ex": "It's so sunny today, I need to put on some suncream.",
        "trVi": "Hôm nay nắng quá, tôi cần thoa kem chống nắng.",
        "trAnswer": "It's so sunny today, I need to put on some suncream.",
        "trKey": "suncream"
      },
      {
        "en": "Sleeping bag",
        "ipa": "/ˈsliːpɪŋ bæg/",
        "vi": "Túi ngủ",
        "img": "https://img.invalid/sleeping-bag.jpg",
        "ex": "I put my sleeping bag in my backpack before the trip.",
        "trVi": "Tôi cho túi ngủ vào ba lô trước chuyến đi.",
        "trAnswer": "I put my sleeping bag in my backpack before the trip.",
        "trKey": "sleeping bag"
      },
      {
        "en": "Scenery",
        "ipa": "/ˈsiːnəri/",
        "vi": "Phong cảnh",
        "img": "https://img.invalid/scenery.jpg",
        "ex": "Ha Long Bay is charming and the scenery is wonderful.",
        "trVi": "Vịnh Hạ Long rất quyến rũ và phong cảnh thì tuyệt đẹp.",
        "trAnswer": "Ha Long Bay is charming and the scenery is wonderful.",
        "trKey": "scenery"
      }
    ],
    "story": {
      "title": "Ha Long Bay and Mui Ne",
      "titleVi": "Vịnh Hạ Long và Mũi Né",
      "text": "Ha Long Bay is in Quang Ninh. It has many islands and caves. Tuan Chau, with its beautiful beaches, is a popular tourist attraction in Ha Long Bay. There you can enjoy great seafood, and you can join in exciting activities. Ha Long Bay is Viet Nam's best natural wonder.<br><br>Mui Ne is popular for its amazing landscapes. The sand has different colours: white, yellow, red. It's like a desert here. You can ride a bike down the slopes. You can also fly kites, or have a picnic by the beach. The best time to visit the Mui Ne Sand Dunes is early morning or late afternoon. Remember to wear suncream and bring water.",
      "textVi": "Vịnh Hạ Long nằm ở Quảng Ninh. Nơi đây có rất nhiều hòn đảo và hang động. Tuần Châu, với những bãi biển xinh đẹp, là một điểm du lịch nổi tiếng ở Vịnh Hạ Long. Ở đó bạn có thể thưởng thức hải sản tuyệt vời và tham gia các hoạt động thú vị. Vịnh Hạ Long là kỳ quan thiên nhiên đẹp nhất của Việt Nam.<br><br>Mũi Né nổi tiếng với phong cảnh tuyệt đẹp. Cát ở đây có nhiều màu sắc khác nhau: trắng, vàng, đỏ... Nơi đây giống như một sa mạc. Bạn có thể đạp xe xuống các triền cát. Bạn cũng có thể thả diều hoặc đi dã ngoại bên bãi biển. Thời điểm tốt nhất để thăm Đồi Cát Mũi Né là vào sáng sớm hoặc chiều muộn. Hãy nhớ thoa kem chống nắng và mang theo nước.",
      "used": [
        "Island",
        "Desert",
        "Scenery",
        "Suncream"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🧧",
    "title": "OUR TET HOLIDAY",
    "titleVi": "Ngày Tết của chúng em",
    "words": [
      {
        "en": "Lucky money",
        "ipa": "/ˈlʌki ˈmʌni/",
        "vi": "Tiền lì xì",
        "img": "https://img.invalid/lucky-money.jpg",
        "ex": "Children get lucky money at Tet.",
        "trVi": "Trẻ em được nhận tiền lì xì vào dịp Tết.",
        "trAnswer": "Children get lucky money at Tet.",
        "trKey": "lucky money"
      },
      {
        "en": "Peach flowers",
        "ipa": "/piːtʃ ˈflaʊəz/",
        "vi": "Hoa đào",
        "img": "https://img.invalid/peach-flowers.jpg",
        "ex": "We decorate our houses with peach flowers.",
        "trVi": "Chúng tôi trang trí nhà cửa bằng hoa đào.",
        "trAnswer": "We decorate our houses with peach flowers.",
        "trKey": "peach flowers"
      },
      {
        "en": "Family gathering",
        "ipa": "/ˈfæməli ˈɡæðərɪŋ/",
        "vi": "Sum họp gia đình",
        "img": "https://img.invalid/family-gathering.jpg",
        "ex": "Tet is a time for family gatherings.",
        "trVi": "Tết là dịp để gia đình sum họp.",
        "trAnswer": "Tet is a time for family gatherings.",
        "trKey": "family gathering"
      },
      {
        "en": "Fireworks",
        "ipa": "/ˈfaɪəwɜːks/",
        "vi": "Pháo hoa",
        "img": "https://img.invalid/fireworks.jpg",
        "ex": "We watch fireworks at midnight on New Year's Eve.",
        "trVi": "Chúng tôi xem pháo hoa vào lúc nửa đêm giao thừa.",
        "trAnswer": "We watch fireworks at midnight on New Year's Eve.",
        "trKey": "fireworks"
      },
      {
        "en": "Special food",
        "ipa": "/ˈspeʃl fuːd/",
        "vi": "Món ăn đặc biệt",
        "img": "https://img.invalid/special-food.jpg",
        "ex": "My mother usually cooks special food during Tet.",
        "trVi": "Mẹ tôi thường nấu những món ăn đặc biệt vào dịp Tết.",
        "trAnswer": "My mother usually cooks special food during Tet.",
        "trKey": "special food"
      },
      {
        "en": "Wish",
        "ipa": "/wɪʃ/",
        "vi": "Lời chúc",
        "img": "https://img.invalid/wish.jpg",
        "ex": "We make a wish for the new year.",
        "trVi": "Chúng tôi ước một điều gì đó cho năm mới.",
        "trAnswer": "We make a wish for the new year.",
        "trKey": "wish"
      },
      {
        "en": "Celebrate",
        "ipa": "/ˈselɪbreɪt/",
        "vi": "Ăn mừng, đón",
        "img": "https://img.invalid/celebrate.jpg",
        "ex": "In Viet Nam, we celebrate Tet in January or February.",
        "trVi": "Ở Việt Nam, chúng tôi đón Tết vào tháng Một hoặc tháng Hai.",
        "trAnswer": "In Viet Nam, we celebrate Tet in January or February.",
        "trKey": "celebrate"
      },
      {
        "en": "Relatives",
        "ipa": "/ˈrelətɪvz/",
        "vi": "Họ hàng",
        "img": "https://img.invalid/relatives.jpg",
        "ex": "At Tet, we visit our relatives and give them our best wishes.",
        "trVi": "Vào dịp Tết, chúng tôi đi thăm họ hàng và gửi những lời chúc tốt đẹp.",
        "trAnswer": "At Tet, we visit our relatives and give them our best wishes.",
        "trKey": "relatives"
      },
      {
        "en": "Banh chung",
        "ipa": "/baɪn tʃʊŋ/",
        "vi": "Bánh chưng",
        "img": "https://img.invalid/banh-chung.jpg",
        "ex": "Banh chung is special food for Tet.",
        "trVi": "Bánh chưng là món ăn đặc biệt của ngày Tết.",
        "trAnswer": "Banh chung is special food for Tet.",
        "trKey": "banh chung"
      },
      {
        "en": "Decorate",
        "ipa": "/ˈdekəreɪt/",
        "vi": "Trang trí",
        "img": "https://img.invalid/decorate.jpg",
        "ex": "Children should help their parents to clean and decorate their houses.",
        "trVi": "Trẻ em nên giúp bố mẹ dọn dẹp và trang trí nhà cửa.",
        "trAnswer": "Children should help their parents to clean and decorate their houses.",
        "trKey": "decorate"
      }
    ],
    "story": {
      "title": "New Year around the world",
      "titleVi": "Năm mới trên khắp thế giới",
      "text": "I often go to Times Square with my parents to welcome the New Year. When the clock strikes midnight, colourful fireworks light up the sky. Everybody cheers and sings.<br><br>On New Year's Day, we dress beautifully and go to our grandparents' houses. We wish them Happy New Year and they give us lucky money. Then we go out and have a day full of fun.<br><br>I learn some customs about Tet from my parents. People give rice to wish for enough food and buy salt to wish for good luck. Dogs are lucky animals but cats are not. A cat's cry sounds like \"poor\" in Vietnamese.",
      "textVi": "Tôi thường cùng bố mẹ đến Quảng trường Thời Đại để đón năm mới. Khi đồng hồ điểm nửa đêm, pháo hoa rực rỡ sắc màu thắp sáng bầu trời. Mọi người cùng reo hò và ca hát.<br><br>Vào ngày mùng Một Tết, chúng tôi mặc quần áo thật đẹp và đến nhà ông bà. Chúng tôi chúc ông bà năm mới và được ông bà lì xì. Sau đó chúng tôi đi chơi và có một ngày thật vui vẻ.<br><br>Tôi học được vài phong tục về Tết từ bố mẹ mình. Người ta cho nhau gạo để cầu mong đủ đầy lương thực và mua muối để cầu may mắn. Chó là con vật may mắn nhưng mèo thì không. Tiếng mèo kêu nghe giống từ \"nghèo\" trong tiếng Việt.",
      "used": [
        "Fireworks",
        "Lucky money"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "📺",
    "title": "TELEVISION",
    "titleVi": "Ti vi",
    "words": [
      {
        "en": "Talent show",
        "ipa": "/ˈtælənt ʃəʊ/",
        "vi": "Cuộc thi tài năng",
        "img": "https://img.invalid/talent-show.jpg",
        "ex": "The Voice Kids is a music talent show.",
        "trVi": "The Voice Kids là một cuộc thi tài năng âm nhạc.",
        "trAnswer": "The Voice Kids is a music talent show.",
        "trKey": "talent show"
      },
      {
        "en": "Viewer",
        "ipa": "/ˈvjuːər/",
        "vi": "Người xem",
        "img": "https://img.invalid/viewer.jpg",
        "ex": "A popular programme has a lot of viewers.",
        "trVi": "Một chương trình phổ biến có rất nhiều người xem.",
        "trAnswer": "A popular programme has a lot of viewers.",
        "trKey": "viewer"
      },
      {
        "en": "Comedy",
        "ipa": "/ˈkɒmədi/",
        "vi": "Phim hài",
        "img": "https://img.invalid/comedy.jpg",
        "ex": "Comedies are funny. People laugh a lot when they watch them.",
        "trVi": "Phim hài rất vui. Mọi người cười rất nhiều khi xem chúng.",
        "trAnswer": "Comedies are funny. People laugh a lot when they watch them.",
        "trKey": "comedy"
      },
      {
        "en": "Character",
        "ipa": "/ˈkærəktər/",
        "vi": "Nhân vật",
        "img": "https://img.invalid/character.jpg",
        "ex": "Jerry is a clever character in the cartoon.",
        "trVi": "Jerry là một nhân vật thông minh trong bộ phim hoạt hình.",
        "trAnswer": "Jerry is a clever character in the cartoon.",
        "trKey": "character"
      },
      {
        "en": "Educational programme",
        "ipa": "/ˌedʒʊˈkeɪʃənl ˈprəʊɡræm/",
        "vi": "Chương trình giáo dục",
        "img": "https://img.invalid/educational-programme.jpg",
        "ex": "English in a Minute is an educational programme for children.",
        "trVi": "English in a Minute là một chương trình giáo dục dành cho trẻ em.",
        "trAnswer": "English in a Minute is an educational programme for children.",
        "trKey": "educational programme"
      },
      {
        "en": "Animated film",
        "ipa": "/ˈænɪmeɪtɪd fɪlm/",
        "vi": "Phim hoạt hình",
        "img": "https://img.invalid/animated-film.jpg",
        "ex": "I like animated films like The Lion King.",
        "trVi": "Tôi thích những bộ phim hoạt hình như The Lion King.",
        "trAnswer": "I like animated films like The Lion King.",
        "trKey": "animated film"
      },
      {
        "en": "Cartoon",
        "ipa": "/kɑːˈtuːn/",
        "vi": "Phim hoạt hình",
        "img": "https://img.invalid/cartoon.jpg",
        "ex": "Phong's little brother prefers cartoons like Tom and Jerry.",
        "trVi": "Em trai của Phong thích xem phim hoạt hình như Tom và Jerry hơn.",
        "trAnswer": "Phong's little brother prefers cartoons like Tom and Jerry.",
        "trKey": "cartoon"
      },
      {
        "en": "Channel",
        "ipa": "/ˈtʃænl/",
        "vi": "Kênh truyền hình",
        "img": "https://img.invalid/channel.jpg",
        "ex": "VTV7 is a channel with many educational programmes.",
        "trVi": "VTV7 là kênh có nhiều chương trình giáo dục.",
        "trAnswer": "VTV7 is a channel with many educational programmes.",
        "trKey": "channel"
      },
      {
        "en": "Game show",
        "ipa": "/ɡeɪm ʃəʊ/",
        "vi": "Chương trình trò chơi",
        "img": "https://img.invalid/game-show.jpg",
        "ex": "Children Are Always Right is a fun game show for kids.",
        "trVi": "Children Are Always Right là một chương trình trò chơi vui nhộn dành cho trẻ em.",
        "trAnswer": "Children Are Always Right is a fun game show for kids.",
        "trKey": "game show"
      },
      {
        "en": "Popular",
        "ipa": "/ˈpɒpjələr/",
        "vi": "Phổ biến",
        "img": "https://img.invalid/popular.jpg",
        "ex": "The most popular channel for children is the Cartoon Network.",
        "trVi": "Kênh phổ biến nhất dành cho trẻ em là Cartoon Network.",
        "trAnswer": "The most popular channel for children is the Cartoon Network.",
        "trKey": "popular"
      },
      {
        "en": "Live",
        "ipa": "/laɪv/",
        "vi": "Trực tiếp",
        "img": "https://img.invalid/live.jpg",
        "ex": "You can watch this programme live, at the same time it happens.",
        "trVi": "Bạn có thể xem chương trình này trực tiếp, ngay khi nó diễn ra.",
        "trAnswer": "You can watch this programme live, at the same time it happens.",
        "trKey": "live"
      }
    ],
    "story": {
      "title": "Two popular TV programmes",
      "titleVi": "Hai chương trình truyền hình nổi tiếng",
      "text": "Let's Learn is an educational TV programme. It makes learning fun. Children love it. It has cute characters and fun songs. People in 80 countries watch it today. Both children and their parents like it.<br><br>Hello Fatty is a popular cartoon. It's about a clever fox called Fatty and his friend. Together they go to different places. Children around the world enjoy this programme. It's funny and educational.",
      "textVi": "Let's Learn là một chương trình truyền hình giáo dục. Chương trình khiến việc học trở nên thú vị. Trẻ em rất yêu thích chương trình này. Nó có những nhân vật đáng yêu và những bài hát vui nhộn. Người xem ở 80 quốc gia hiện đang theo dõi chương trình này. Cả trẻ em và cha mẹ đều yêu thích nó.<br><br>Hello Fatty là một bộ phim hoạt hình nổi tiếng. Phim kể về một chú cáo thông minh tên là Fatty và người bạn của nó. Cùng nhau, họ đi đến nhiều nơi khác nhau. Trẻ em trên khắp thế giới đều yêu thích chương trình này. Nó vừa vui nhộn vừa mang tính giáo dục.",
      "used": [
        "Educational programme",
        "Cartoon",
        "Character",
        "Popular"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "⚽",
    "title": "SPORTS AND GAMES",
    "titleVi": "Thể thao và trò chơi",
    "words": [
      {
        "en": "Champion",
        "ipa": "/ˈtʃæmpiən/",
        "vi": "Nhà vô địch",
        "img": "https://img.invalid/champion.jpg",
        "ex": "He became the world tennis champion when he was very young.",
        "trVi": "Anh ấy trở thành nhà vô địch quần vợt thế giới khi còn rất trẻ.",
        "trAnswer": "He became the world tennis champion when he was very young.",
        "trKey": "champion"
      },
      {
        "en": "Competition",
        "ipa": "/ˌkɒmpəˈtɪʃn/",
        "vi": "Cuộc thi",
        "img": "https://img.invalid/competition.jpg",
        "ex": "She won an international sports competition.",
        "trVi": "Cô ấy đã giành chiến thắng trong một cuộc thi thể thao quốc tế.",
        "trAnswer": "She won an international sports competition.",
        "trKey": "competition"
      },
      {
        "en": "Sporty",
        "ipa": "/ˈspɔːti/",
        "vi": "Đam mê thể thao",
        "img": "https://img.invalid/sporty.jpg",
        "ex": "My friend David is very sporty. He does exercise every day.",
        "trVi": "Bạn tôi, David, rất đam mê thể thao. Cậu ấy tập thể dục mỗi ngày.",
        "trAnswer": "My friend David is very sporty. He does exercise every day.",
        "trKey": "sporty"
      },
      {
        "en": "Marathon",
        "ipa": "/ˈmærəθən/",
        "vi": "Cuộc thi chạy marathon",
        "img": "https://img.invalid/marathon.jpg",
        "ex": "The first marathon took place in 1896.",
        "trVi": "Cuộc thi marathon đầu tiên diễn ra vào năm 1896.",
        "trAnswer": "The first marathon took place in 1896.",
        "trKey": "marathon"
      },
      {
        "en": "Racket",
        "ipa": "/ˈrækɪt/",
        "vi": "Cây vợt",
        "img": "https://img.invalid/racket.jpg",
        "ex": "Please get the racket for me. We're playing badminton.",
        "trVi": "Hãy lấy cây vợt giúp tôi. Chúng ta sắp chơi cầu lông.",
        "trAnswer": "Please get the racket for me. We're playing badminton.",
        "trKey": "racket"
      },
      {
        "en": "Goggles",
        "ipa": "/ˈɡɒɡlz/",
        "vi": "Kính bơi",
        "img": "https://img.invalid/goggles.jpg",
        "ex": "You need goggles when you go swimming.",
        "trVi": "Bạn cần kính bơi khi đi bơi.",
        "trAnswer": "You need goggles when you go swimming.",
        "trKey": "goggles"
      },
      {
        "en": "Chess",
        "ipa": "/tʃes/",
        "vi": "Cờ vua",
        "img": "https://img.invalid/chess.jpg",
        "ex": "We play chess every Saturday.",
        "trVi": "Chúng tôi chơi cờ vua vào mỗi thứ Bảy.",
        "trAnswer": "We play chess every Saturday.",
        "trKey": "chess"
      },
      {
        "en": "Karate",
        "ipa": "/kəˈrɑːti/",
        "vi": "Võ karate",
        "img": "https://img.invalid/karate.jpg",
        "ex": "Duong does karate, and he is very good at it.",
        "trVi": "Duong tập karate, và cậu ấy rất giỏi môn này.",
        "trAnswer": "Duong does karate, and he is very good at it.",
        "trKey": "karate"
      },
      {
        "en": "Table tennis",
        "ipa": "/ˈteɪbl ˈtenɪs/",
        "vi": "Bóng bàn",
        "img": "https://img.invalid/table-tennis.jpg",
        "ex": "Duong played table tennis with Duy yesterday, and he won.",
        "trVi": "Hôm qua Duong chơi bóng bàn với Duy, và cậu ấy đã thắng.",
        "trAnswer": "Duong played table tennis with Duy yesterday, and he won.",
        "trKey": "table tennis"
      },
      {
        "en": "Congratulations",
        "ipa": "/kənˌɡrætʃʊˈleɪʃnz/",
        "vi": "Lời chúc mừng",
        "img": "https://img.invalid/congratulations.jpg",
        "ex": "Congratulations! You look fit!",
        "trVi": "Chúc mừng bạn! Bạn trông thật khỏe khoắn!",
        "trAnswer": "Congratulations! You look fit!",
        "trKey": "congratulations"
      }
    ],
    "story": {
      "title": "Pelé, the King of Football",
      "titleVi": "Pelé, Vua bóng đá",
      "text": "Pelé was born in 1940 in Brazil. His father taught him to play football at a very young age. At 15, he started playing for Santos Football Club. In 1958, he won his first World Cup.<br><br>In his career, Pelé scored 1,281 goals in total. He became \"Football Player of the Century\" in 1999. Pelé is a national hero in Brazil, and he's known around the world as \"The King of Football\".",
      "textVi": "Pelé sinh năm 1940 tại Brazil. Cha ông đã dạy ông chơi bóng đá từ khi còn rất nhỏ. Năm 15 tuổi, ông bắt đầu chơi cho câu lạc bộ bóng đá Santos. Năm 1958, ông giành chức vô địch World Cup đầu tiên của mình.<br><br>Trong sự nghiệp của mình, Pelé đã ghi tổng cộng 1.281 bàn thắng. Ông trở thành \"Cầu thủ bóng đá của thế kỷ\" vào năm 1999. Pelé là người hùng dân tộc của Brazil, và ông được biết đến trên khắp thế giới với biệt danh \"Vua bóng đá\".",
      "used": [
        "Champion"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🌆",
    "title": "CITIES OF THE WORLD",
    "titleVi": "Các thành phố trên thế giới",
    "words": [
      {
        "en": "Rainy",
        "ipa": "/ˈreɪni/",
        "vi": "Có mưa",
        "img": "https://img.invalid/rainy.jpg",
        "ex": "London is famous for its rainy weather.",
        "trVi": "London nổi tiếng với thời tiết có mưa.",
        "trAnswer": "London is famous for its rainy weather.",
        "trKey": "rainy"
      },
      {
        "en": "Sunny",
        "ipa": "/ˈsʌni/",
        "vi": "Có nắng",
        "img": "https://img.invalid/sunny.jpg",
        "ex": "Sydney is sunny and dry in the summer.",
        "trVi": "Sydney có nắng và khô ráo vào mùa hè.",
        "trAnswer": "Sydney is sunny and dry in the summer.",
        "trKey": "sunny"
      },
      {
        "en": "Delicious",
        "ipa": "/dɪˈlɪʃəs/",
        "vi": "Ngon",
        "img": "https://img.invalid/delicious.jpg",
        "ex": "Ha Noi is famous for its delicious street food.",
        "trVi": "Hà Nội nổi tiếng với những món ăn đường phố ngon.",
        "trAnswer": "Ha Noi is famous for its delicious street food.",
        "trKey": "delicious"
      },
      {
        "en": "Landmark",
        "ipa": "/ˈlændmɑːk/",
        "vi": "Địa danh nổi tiếng",
        "img": "https://img.invalid/landmark.jpg",
        "ex": "Big Ben is a famous landmark of London.",
        "trVi": "Big Ben là một địa danh nổi tiếng của London.",
        "trAnswer": "Big Ben is a famous landmark of London.",
        "trKey": "landmark"
      },
      {
        "en": "Palace",
        "ipa": "/ˈpæləs/",
        "vi": "Cung điện",
        "img": "https://img.invalid/palace.jpg",
        "ex": "We visited the Royal Palace first. What a beautiful place!",
        "trVi": "Chúng tôi đã đến thăm Cung điện Hoàng gia đầu tiên. Thật là một nơi tuyệt đẹp!",
        "trAnswer": "We visited the Royal Palace first. What a beautiful place!",
        "trKey": "palace"
      },
      {
        "en": "Floating market",
        "ipa": "/ˈfləʊtɪŋ ˈmɑːkɪt/",
        "vi": "Chợ nổi",
        "img": "https://img.invalid/floating-market.jpg",
        "ex": "There's a famous floating market near the river.",
        "trVi": "Có một khu chợ nổi nổi tiếng gần bờ sông.",
        "trAnswer": "There's a famous floating market near the river.",
        "trKey": "floating market"
      },
      {
        "en": "Street food",
        "ipa": "/striːt fuːd/",
        "vi": "Món ăn đường phố",
        "img": "https://img.invalid/street-food.jpg",
        "ex": "Ha Noi is famous for its delicious street food.",
        "trVi": "Hà Nội nổi tiếng với các món ăn đường phố ngon.",
        "trAnswer": "Ha Noi is famous for its delicious street food.",
        "trKey": "street food"
      },
      {
        "en": "Postcard",
        "ipa": "/ˈpəʊstkɑːd/",
        "vi": "Bưu thiếp",
        "img": "https://img.invalid/postcard.jpg",
        "ex": "I'm writing a postcard to my grandparents about my holiday.",
        "trVi": "Tôi đang viết một tấm bưu thiếp cho ông bà kể về kỳ nghỉ của mình.",
        "trAnswer": "I'm writing a postcard to my grandparents about my holiday.",
        "trKey": "postcard"
      },
      {
        "en": "Tower",
        "ipa": "/ˈtaʊər/",
        "vi": "Tòa tháp",
        "img": "https://img.invalid/tower.jpg",
        "ex": "The Eiffel Tower is a famous tower in Paris.",
        "trVi": "Tháp Eiffel là một tòa tháp nổi tiếng ở Paris.",
        "trAnswer": "The Eiffel Tower is a famous tower in Paris.",
        "trKey": "tower"
      },
      {
        "en": "Helpful",
        "ipa": "/ˈhelpfl/",
        "vi": "Tốt bụng, hay giúp đỡ",
        "img": "https://img.invalid/helpful.jpg",
        "ex": "The people in my city are friendly and helpful.",
        "trVi": "Người dân ở thành phố của tôi thân thiện và tốt bụng.",
        "trAnswer": "The people in my city are friendly and helpful.",
        "trKey": "helpful"
      }
    ],
    "story": {
      "title": "Love from Sweden",
      "titleVi": "Yêu thương từ Thụy Điển",
      "text": "Dear Grandpa and Grandma,<br>Stockholm is fantastic! Its weather is perfect, sunny all the time! Our hotel is good. It has a swimming pool and a gym. It offers delicious breakfast.<br><br>Yesterday Mum, Dad and I rented three bikes and cycled to the Old Town. My parents wore their helmets and I wore mine. We visited the Royal Palace first. What a beautiful place! Mum loved it. She said, \"Swedish art is amazing.\" After that, we had \"fika\", a coffee break, in a traditional caf&eacute;. Everything is so wonderful!<br><br>Wish you were here!<br>Love,<br>Mai",
      "textVi": "Ông bà kính mến,<br>Stockholm tuyệt vời lắm ạ! Thời tiết ở đây thật hoàn hảo, lúc nào cũng nắng! Khách sạn của chúng con rất tốt. Khách sạn có hồ bơi và phòng tập gym. Ở đây còn phục vụ bữa sáng rất ngon.<br><br>Hôm qua, mẹ, bố và con đã thuê ba chiếc xe đạp và đạp xe đến Phố Cổ. Bố mẹ đội mũ bảo hiểm của họ và con cũng đội mũ của mình. Chúng con đã đến thăm Cung điện Hoàng gia trước tiên. Thật là một nơi tuyệt đẹp! Mẹ rất thích nơi đó. Mẹ nói: \"Nghệ thuật Thụy Điển thật tuyệt vời.\" Sau đó, chúng con đã có buổi \"fika\", một khoảng nghỉ uống cà phê, tại một quán cà phê truyền thống. Mọi thứ thật là tuyệt vời!<br><br>Ước gì ông bà cũng ở đây!<br>Yêu ông bà,<br>Mai",
      "used": [
        "Palace",
        "Sunny"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🚀",
    "title": "OUR HOUSES IN THE FUTURE",
    "titleVi": "Ngôi nhà tương lai của chúng em",
    "words": [
      {
        "en": "Electric cooker",
        "ipa": "/ɪˌlektrɪk ˈkʊkər/",
        "vi": "Nồi cơm điện",
        "img": "https://img.invalid/electric-cooker.jpg",
        "ex": "An electric cooker can help us to cook rice.",
        "trVi": "Nồi cơm điện có thể giúp chúng ta nấu cơm.",
        "trAnswer": "An electric cooker can help us to cook rice.",
        "trKey": "electric cooker"
      },
      {
        "en": "Dishwasher",
        "ipa": "/ˈdɪʃwɒʃər/",
        "vi": "Máy rửa bát",
        "img": "https://img.invalid/dishwasher.jpg",
        "ex": "The dishwasher can wash and dry the dishes.",
        "trVi": "Máy rửa bát có thể rửa và làm khô bát đĩa.",
        "trAnswer": "The dishwasher can wash and dry the dishes.",
        "trKey": "dishwasher"
      },
      {
        "en": "Washing machine",
        "ipa": "/ˈwɒʃɪŋ məˈʃiːn/",
        "vi": "Máy giặt",
        "img": "https://img.invalid/washing-machine.jpg",
        "ex": "The washing machine can wash and dry our clothes.",
        "trVi": "Máy giặt có thể giặt và làm khô quần áo của chúng ta.",
        "trAnswer": "The washing machine can wash and dry our clothes.",
        "trKey": "washing machine"
      },
      {
        "en": "Wireless TV",
        "ipa": "/ˈwaɪələs tiː viː/",
        "vi": "Ti vi không dây",
        "img": "https://img.invalid/wireless-tv.jpg",
        "ex": "In the future, we might have a wireless TV.",
        "trVi": "Trong tương lai, chúng ta có thể sẽ có một chiếc ti vi không dây.",
        "trAnswer": "In the future, we might have a wireless TV.",
        "trKey": "wireless tv"
      },
      {
        "en": "Smart clock",
        "ipa": "/smɑːt klɒk/",
        "vi": "Đồng hồ thông minh",
        "img": "https://img.invalid/smart-clock.jpg",
        "ex": "My house might have a smart clock that wakes me up.",
        "trVi": "Nhà tôi có thể sẽ có một chiếc đồng hồ thông minh đánh thức tôi dậy.",
        "trAnswer": "My house might have a smart clock that wakes me up.",
        "trKey": "smart clock"
      },
      {
        "en": "Robot",
        "ipa": "/ˈrəʊbɒt/",
        "vi": "Người máy",
        "img": "https://img.invalid/robot.jpg",
        "ex": "My house might have some smart TVs and ten robots.",
        "trVi": "Nhà tôi có thể sẽ có vài chiếc ti vi thông minh và mười người máy.",
        "trAnswer": "My house might have some smart TVs and ten robots.",
        "trKey": "robot"
      },
      {
        "en": "Solar energy",
        "ipa": "/ˈsəʊlər ˈenədʒi/",
        "vi": "Năng lượng mặt trời",
        "img": "https://img.invalid/solar-energy.jpg",
        "ex": "It'll have solar energy in the future.",
        "trVi": "Nó sẽ sử dụng năng lượng mặt trời trong tương lai.",
        "trAnswer": "It'll have solar energy in the future.",
        "trKey": "solar energy"
      },
      {
        "en": "UFO",
        "ipa": "/ˌjuː ef ˈəʊ/",
        "vi": "Vật thể bay không xác định",
        "img": "https://img.invalid/ufo.jpg",
        "ex": "Phong's house looks like a UFO.",
        "trVi": "Ngôi nhà của Phong trông giống như một vật thể bay không xác định.",
        "trAnswer": "Phong's house looks like a UFO.",
        "trKey": "ufo"
      },
      {
        "en": "Helicopter",
        "ipa": "/ˈhelɪkɒptər/",
        "vi": "Trực thăng",
        "img": "https://img.invalid/helicopter.jpg",
        "ex": "There will be a helicopter on the roof. I can fly to school in it.",
        "trVi": "Sẽ có một chiếc trực thăng trên mái nhà. Tôi có thể bay đến trường bằng nó.",
        "trAnswer": "There will be a helicopter on the roof. I can fly to school in it.",
        "trKey": "helicopter"
      },
      {
        "en": "Appliance",
        "ipa": "/əˈplaɪəns/",
        "vi": "Thiết bị gia dụng",
        "img": "https://img.invalid/appliance.jpg",
        "ex": "What appliances might the house have?",
        "trVi": "Ngôi nhà có thể sẽ có những thiết bị nào?",
        "trAnswer": "What appliances might the house have?",
        "trKey": "appliance"
      }
    ],
    "story": {
      "title": "My future house",
      "titleVi": "Ngôi nhà tương lai của tôi",
      "text": "My future house will be on an island. It will be surrounded by tall trees and the blue sea. There will be a swimming pool in front of the house. There will be a helicopter on the roof. I can fly to school in it.<br><br>There will be some robots in the house. They will help me to clean the floors, cook meals, wash clothes and water the flowers. They will also help me to feed the dogs and cats.<br><br>There will be a super smart TV. It will help me to send and receive emails, and contact my friends on other planets. It will also help me to buy food from the supermarket.",
      "textVi": "Ngôi nhà tương lai của tôi sẽ nằm trên một hòn đảo. Nó sẽ được bao quanh bởi những hàng cây cao và biển xanh. Sẽ có một hồ bơi ở phía trước ngôi nhà. Sẽ có một chiếc trực thăng trên mái nhà. Tôi có thể bay đến trường bằng nó.<br><br>Sẽ có vài người máy trong nhà. Chúng sẽ giúp tôi lau sàn nhà, nấu ăn, giặt quần áo và tưới hoa. Chúng cũng sẽ giúp tôi cho chó mèo ăn.<br><br>Sẽ có một chiếc ti vi siêu thông minh. Nó sẽ giúp tôi gửi và nhận email, và liên lạc với bạn bè trên các hành tinh khác. Nó cũng sẽ giúp tôi mua thức ăn từ siêu thị.",
      "used": [
        "Robot",
        "Helicopter"
      ]
    }
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "🌱",
    "title": "OUR GREENER WORLD",
    "titleVi": "Thế giới xanh hơn",
    "words": [
      {
        "en": "Rubbish",
        "ipa": "/ˈrʌbɪʃ/",
        "vi": "Rác",
        "img": "https://img.invalid/rubbish.jpg",
        "ex": "Let's pick up rubbish in the park this weekend.",
        "trVi": "Chúng ta hãy nhặt rác ở công viên vào cuối tuần này nhé.",
        "trAnswer": "Let's pick up rubbish in the park this weekend.",
        "trKey": "rubbish"
      },
      {
        "en": "Plastic bag",
        "ipa": "/ˈplæstɪk bæɡ/",
        "vi": "Túi ni lông",
        "img": "https://img.invalid/plastic-bag.jpg",
        "ex": "A reusable bag is better than a plastic one.",
        "trVi": "Một chiếc túi có thể tái sử dụng thì tốt hơn một chiếc túi ni lông.",
        "trAnswer": "A reusable bag is better than a plastic one.",
        "trKey": "plastic bag"
      },
      {
        "en": "Plastic bottle",
        "ipa": "/ˈplæstɪk ˈbɒtl/",
        "vi": "Chai nhựa",
        "img": "https://img.invalid/plastic-bottle.jpg",
        "ex": "We should recycle plastic bottles instead of throwing them away.",
        "trVi": "Chúng ta nên tái chế chai nhựa thay vì vứt chúng đi.",
        "trAnswer": "We should recycle plastic bottles instead of throwing them away.",
        "trKey": "plastic bottle"
      },
      {
        "en": "Reusable",
        "ipa": "/riˈjuːzəbl/",
        "vi": "Có thể tái sử dụng",
        "img": "https://img.invalid/reusable.jpg",
        "ex": "It's a reusable shopping bag. I always use it.",
        "trVi": "Đây là một chiếc túi mua sắm có thể tái sử dụng. Tôi luôn dùng nó.",
        "trAnswer": "It's a reusable shopping bag. I always use it.",
        "trKey": "reusable"
      },
      {
        "en": "Reduce",
        "ipa": "/rɪˈdjuːs/",
        "vi": "Giảm thiểu",
        "img": "https://img.invalid/reduce.jpg",
        "ex": "If we reduce the plastic we use, we will help the environment.",
        "trVi": "Nếu chúng ta giảm lượng nhựa sử dụng, chúng ta sẽ giúp ích cho môi trường.",
        "trAnswer": "If we reduce the plastic we use, we will help the environment.",
        "trKey": "reduce"
      },
      {
        "en": "Recycle",
        "ipa": "/riːˈsaɪkl/",
        "vi": "Tái chế",
        "img": "https://img.invalid/recycle.jpg",
        "ex": "We put recycling bins in every classroom.",
        "trVi": "Chúng tôi đặt thùng tái chế ở mỗi lớp học.",
        "trAnswer": "We put recycling bins in every classroom.",
        "trKey": "recycle"
      },
      {
        "en": "Environment",
        "ipa": "/ɪnˈvaɪrənmənt/",
        "vi": "Môi trường",
        "img": "https://img.invalid/environment.jpg",
        "ex": "If more people cycle, it'll help the environment.",
        "trVi": "Nếu nhiều người đạp xe hơn, điều đó sẽ giúp ích cho môi trường.",
        "trAnswer": "If more people cycle, it'll help the environment.",
        "trKey": "environment"
      },
      {
        "en": "Charity",
        "ipa": "/ˈtʃærəti/",
        "vi": "Từ thiện",
        "img": "https://img.invalid/charity.jpg",
        "ex": "We give our old clothes to charity instead of throwing them away.",
        "trVi": "Chúng tôi cho quần áo cũ vào việc từ thiện thay vì vứt chúng đi.",
        "trAnswer": "We give our old clothes to charity instead of throwing them away.",
        "trKey": "charity"
      },
      {
        "en": "Exchange",
        "ipa": "/ɪksˈtʃeɪndʒ/",
        "vi": "Trao đổi",
        "img": "https://img.invalid/exchange.jpg",
        "ex": "We exchange our old books and uniforms with our friends.",
        "trVi": "Chúng tôi trao đổi sách và đồng phục cũ với bạn bè.",
        "trAnswer": "We exchange our old books and uniforms with our friends.",
        "trKey": "exchange"
      },
      {
        "en": "Glass",
        "ipa": "/ɡlɑːs/",
        "vi": "Thủy tinh",
        "img": "https://img.invalid/glass.jpg",
        "ex": "You can recycle glass, paper and plastic bottles.",
        "trVi": "Bạn có thể tái chế thủy tinh, giấy và chai nhựa.",
        "trAnswer": "You can recycle glass, paper and plastic bottles.",
        "trKey": "glass"
      }
    ],
    "story": {
      "title": "Making our school greener",
      "titleVi": "Biến trường học của chúng em xanh hơn",
      "text": "A reporter interviewed Nam, a member of the 3Rs Club, about how to make their school greener.<br><br>Firstly, they put recycling bins in every classroom. For old books and uniforms, they exchange them with friends or give them to charity - they don't throw them away. They also borrow books from the school library instead of buying new ones, so they can save a lot of paper.<br><br>Another tip is that they bring reusable water bottles to school. They also plant a lot of trees, which makes their school greener. Finally, they usually find creative ways to reuse old items before throwing them away.",
      "textVi": "Một phóng viên đã phỏng vấn Nam, một thành viên của Câu lạc bộ 3Rs, về cách làm cho trường học của họ xanh hơn.<br><br>Đầu tiên, họ đặt các thùng tái chế ở mỗi lớp học. Đối với sách và đồng phục cũ, họ trao đổi với bạn bè hoặc tặng cho các tổ chức từ thiện - họ không vứt chúng đi. Họ cũng mượn sách từ thư viện trường thay vì mua sách mới, nhờ đó tiết kiệm được rất nhiều giấy.<br><br>Một mẹo khác là họ mang theo bình nước có thể tái sử dụng đến trường. Họ cũng trồng rất nhiều cây xanh, giúp trường học xanh hơn. Cuối cùng, họ thường tìm những cách sáng tạo để tái sử dụng đồ cũ trước khi vứt bỏ chúng.",
      "used": [
        "Recycle",
        "Charity",
        "Exchange",
        "Reusable"
      ]
    }
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "🤖",
    "title": "ROBOTS",
    "titleVi": "Người máy",
    "words": [
      {
        "en": "Home robot",
        "ipa": "/həʊm ˈrəʊbɒt/",
        "vi": "Người máy gia đình",
        "img": "https://img.invalid/home-robot.jpg",
        "ex": "H8 is a home robot. It can do the dishes and iron clothes.",
        "trVi": "H8 là một người máy gia đình. Nó có thể rửa bát và ủi quần áo.",
        "trAnswer": "H8 is a home robot. It can do the dishes and iron clothes.",
        "trKey": "home robot"
      },
      {
        "en": "Worker robot",
        "ipa": "/ˈwɜːkər ˈrəʊbɒt/",
        "vi": "Người máy công nhân",
        "img": "https://img.invalid/worker-robot.jpg",
        "ex": "WB2 is a worker robot. It's the strongest and fastest robot here.",
        "trVi": "WB2 là một người máy công nhân. Nó là người máy khỏe nhất và nhanh nhất ở đây.",
        "trAnswer": "WB2 is a worker robot. It's the strongest and fastest robot here.",
        "trKey": "worker robot"
      },
      {
        "en": "Repair",
        "ipa": "/rɪˈpeər/",
        "vi": "Sửa chữa",
        "img": "https://img.invalid/repair.jpg",
        "ex": "It can move heavy things or repair broken machines.",
        "trVi": "Nó có thể di chuyển những vật nặng hoặc sửa chữa các cỗ máy bị hỏng.",
        "trAnswer": "It can move heavy things or repair broken machines.",
        "trKey": "repair"
      },
      {
        "en": "Understand",
        "ipa": "/ˌʌndəˈstænd/",
        "vi": "Hiểu, thấu hiểu",
        "img": "https://img.invalid/understand.jpg",
        "ex": "Shifa can help sick people and understand many things like humans.",
        "trVi": "Shifa có thể giúp đỡ người bệnh và hiểu nhiều thứ giống như con người.",
        "trAnswer": "Shifa can help sick people and understand many things like humans.",
        "trKey": "understand"
      },
      {
        "en": "Iron",
        "ipa": "/ˈaɪən/",
        "vi": "Ủi (quần áo)",
        "img": "https://img.invalid/iron.jpg",
        "ex": "The home robot can iron clothes and put toys away.",
        "trVi": "Người máy gia đình có thể ủi quần áo và cất đồ chơi đi.",
        "trAnswer": "The home robot can iron clothes and put toys away.",
        "trKey": "iron"
      },
      {
        "en": "Guard",
        "ipa": "/ɡɑːd/",
        "vi": "Người bảo vệ",
        "img": "https://img.invalid/guard.jpg",
        "ex": "This robot can work as a guard at night.",
        "trVi": "Người máy này có thể làm bảo vệ vào ban đêm.",
        "trAnswer": "This robot can work as a guard at night.",
        "trKey": "guard"
      },
      {
        "en": "Household chores",
        "ipa": "/ˈhaʊshəʊld tʃɔːz/",
        "vi": "Việc nhà",
        "img": "https://img.invalid/household-chores.jpg",
        "ex": "My home robot helps me to do many household chores.",
        "trVi": "Người máy gia đình của tôi giúp tôi làm nhiều việc nhà.",
        "trAnswer": "My home robot helps me to do many household chores.",
        "trKey": "household chores"
      },
      {
        "en": "Space robot",
        "ipa": "/speɪs ˈrəʊbɒt/",
        "vi": "Người máy vũ trụ",
        "img": "https://img.invalid/space-robot.jpg",
        "ex": "Space robots can build space stations on the Moon.",
        "trVi": "Người máy vũ trụ có thể xây dựng các trạm không gian trên Mặt Trăng.",
        "trAnswer": "Space robots can build space stations on the Moon.",
        "trKey": "space robot"
      },
      {
        "en": "Doctor robot",
        "ipa": "/ˈdɒktər ˈrəʊbɒt/",
        "vi": "Người máy bác sĩ",
        "img": "https://img.invalid/doctor-robot.jpg",
        "ex": "Doctor robots can look after sick people.",
        "trVi": "Người máy bác sĩ có thể chăm sóc người bệnh.",
        "trAnswer": "Doctor robots can look after sick people.",
        "trKey": "doctor robot"
      },
      {
        "en": "Teacher robot",
        "ipa": "/ˈtiːtʃər ˈrəʊbɒt/",
        "vi": "Người máy giáo viên",
        "img": "https://img.invalid/teacher-robot.jpg",
        "ex": "Teacher robots can help children to study and improve their pronunciation.",
        "trVi": "Người máy giáo viên có thể giúp trẻ em học tập và cải thiện phát âm.",
        "trAnswer": "Teacher robots can help children to study and improve their pronunciation.",
        "trKey": "teacher robot"
      }
    ],
    "story": {
      "title": "An international robot show",
      "titleVi": "Triển lãm người máy quốc tế",
      "text": "Today there is an international robot show in Ha Noi. People can see many types of robots there.<br><br>Home robots are useful for housework. They can do most of the housework: cook meals, clean the house, do the washing, and iron clothes.<br><br>Teacher robots are the best choice for children. They can help them to study. They can teach them English, literature, maths and other subjects. They can also help children to improve their English pronunciation.<br><br>People are also interested in other types of robots at the show. Worker robots can build houses and move heavy things; doctor robots can look after sick people; and space robots can build space stations on the Moon and on other planets.",
      "textVi": "Hôm nay có một buổi triển lãm người máy quốc tế ở Hà Nội. Mọi người có thể thấy nhiều loại người máy khác nhau ở đó.<br><br>Người máy gia đình rất hữu ích cho việc nhà. Chúng có thể làm hầu hết các việc nhà: nấu ăn, dọn dẹp nhà cửa, giặt giũ và ủi quần áo.<br><br>Người máy giáo viên là lựa chọn tốt nhất cho trẻ em. Chúng có thể giúp trẻ học tập. Chúng có thể dạy tiếng Anh, văn học, toán và các môn học khác. Chúng cũng có thể giúp trẻ em cải thiện phát âm tiếng Anh.<br><br>Mọi người cũng rất thích thú với các loại người máy khác tại triển lãm. Người máy công nhân có thể xây nhà và di chuyển đồ vật nặng; người máy bác sĩ có thể chăm sóc người bệnh; và người máy vũ trụ có thể xây dựng các trạm không gian trên Mặt Trăng và các hành tinh khác.",
      "used": [
        "Home robot",
        "Worker robot",
        "Doctor robot",
        "Space robot",
        "Teacher robot"
      ]
    }
  }
];
