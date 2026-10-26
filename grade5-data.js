// Global Success: vocabulary by textbook Unit. New examples and practice sentences.
const GRADE5_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "📘",
    "title": "ALL ABOUT ME!",
    "titleVi": "Tất cả về em",
    "words": [
      {
        "en": "city",
        "ipa": "/ˈsɪti/",
        "vi": "thành phố",
        "img": "assets/vocab/grade4/u6/city.webp",
        "ex": "I live in the city.",
        "trVi": "Tôi sống ở thành phố.",
        "trAnswer": "I live in the city.",
        "trKey": "city"
      },
      {
        "en": "class",
        "ipa": "/klɑːs/",
        "vi": "lớp học",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am in Class 5A.",
        "trVi": "Tôi học lớp 5A.",
        "trAnswer": "I am in Class 5A.",
        "trKey": "class"
      },
      {
        "en": "countryside",
        "ipa": "/ˈkʌntrisaɪd/",
        "vi": "nông thôn",
        "img": "assets/vocab/grade4/u10/countryside.webp",
        "ex": "I live in the countryside.",
        "trVi": "Tôi sống ở nông thôn.",
        "trAnswer": "I live in the countryside.",
        "trKey": "countryside"
      },
      {
        "en": "dolphin",
        "ipa": "/ˈdɒlfɪn/",
        "vi": "cá heo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%AC%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My favourite animal is the dolphin.",
        "trVi": "Con vật yêu thích của tôi là cá heo.",
        "trAnswer": "My favourite animal is the dolphin.",
        "trKey": "dolphin"
      },
      {
        "en": "pink",
        "ipa": "/pɪŋk/",
        "vi": "màu hồng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My favourite colour is pink.",
        "trVi": "Màu yêu thích của tôi là màu hồng.",
        "trAnswer": "My favourite colour is pink.",
        "trKey": "pink"
      },
      {
        "en": "sandwich",
        "ipa": "/ˈsænwɪtʃ/",
        "vi": "bánh mì kẹp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My favourite food is a sandwich.",
        "trVi": "Món ăn yêu thích của tôi là bánh mì kẹp.",
        "trAnswer": "My favourite food is a sandwich.",
        "trKey": "sandwich"
      },
      {
        "en": "table tennis",
        "ipa": "/ˈteɪbl̩ ˈtenɪs/",
        "vi": "bóng bàn",
        "img": "assets/vocab/grade6/u8/table-tennis.webp",
        "ex": "My favourite sport is table tennis.",
        "trVi": "Môn thể thao yêu thích của tôi là bóng bàn.",
        "trAnswer": "My favourite sport is table tennis.",
        "trKey": "table tennis"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 1
    },
    "story": {
      "title": "All About Me!",
      "titleVi": "Tất cả về em",
      "text": "I live in the city.<br>I am in Class 5A.<br>I live in the countryside.<br>My favourite animal is the dolphin.<br>My favourite colour is pink.<br>My favourite food is a sandwich.<br>My favourite sport is table tennis.",
      "textVi": "Tôi sống ở thành phố.<br>Tôi học lớp 5A.<br>Tôi sống ở nông thôn.<br>Con vật yêu thích của tôi là cá heo.<br>Màu yêu thích của tôi là màu hồng.<br>Món ăn yêu thích của tôi là bánh mì kẹp.<br>Môn thể thao yêu thích của tôi là bóng bàn.",
      "used": [
        "city",
        "class",
        "countryside",
        "dolphin",
        "pink",
        "sandwich",
        "table tennis"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I live in the <b>city</b>.",
        "keywords": [
          {
            "key": "city",
            "meaningVi": "thành phố"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am in <b>Class</b> 5A. I live in the <b>countryside</b>.",
        "keywords": [
          {
            "key": "class",
            "meaningVi": "lớp học"
          },
          {
            "key": "countryside",
            "meaningVi": "nông thôn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My favourite animal is the <b>dolphin</b>. My favourite colour is <b>pink</b>.",
        "keywords": [
          {
            "key": "dolphin",
            "meaningVi": "cá heo"
          },
          {
            "key": "pink",
            "meaningVi": "màu hồng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My favourite food is a <b>sandwich</b>. My favourite sport is <b>table tennis</b>.",
        "keywords": [
          {
            "key": "sandwich",
            "meaningVi": "bánh mì kẹp"
          },
          {
            "key": "table tennis",
            "meaningVi": "bóng bàn"
          }
        ]
      }
    ]
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🏫",
    "title": "OUR HOMES",
    "titleVi": "Nhà của chúng mình",
    "words": [
      {
        "en": "building",
        "ipa": "/ˈbɪldɪŋ/",
        "vi": "tòa nhà",
        "img": "assets/vocab/grade4/u6/building.webp",
        "ex": "I live in this building.",
        "trVi": "Tôi sống trong tòa nhà này.",
        "trAnswer": "I live in this building.",
        "trKey": "building"
      },
      {
        "en": "flat",
        "ipa": "/flæt/",
        "vi": "căn hộ",
        "img": "assets/vocab/grade6/u2/flat.webp",
        "ex": "I live in a small flat.",
        "trVi": "Tôi sống trong một căn hộ nhỏ.",
        "trAnswer": "I live in a small flat.",
        "trKey": "flat"
      },
      {
        "en": "house",
        "ipa": "/haʊs/",
        "vi": "ngôi nhà",
        "img": "assets/vocab/grade12/u8/house.webp",
        "ex": "I live in that house.",
        "trVi": "Tôi sống trong ngôi nhà kia.",
        "trAnswer": "I live in that house.",
        "trKey": "house"
      },
      {
        "en": "tower",
        "ipa": "/ˈtaʊər/",
        "vi": "tòa tháp",
        "img": "assets/vocab/grade6/u9/tower.webp",
        "ex": "My flat is in that tower.",
        "trVi": "Căn hộ của tôi ở trong tòa tháp kia.",
        "trAnswer": "My flat is in that tower.",
        "trKey": "tower"
      },
      {
        "en": "address",
        "ipa": "/əˈdres/",
        "vi": "địa chỉ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What is your address?",
        "trVi": "Địa chỉ của bạn là gì?",
        "trAnswer": "What is your address?",
        "trKey": "address"
      },
      {
        "en": "twenty-three",
        "ipa": "/ˈtwenti θriː/",
        "vi": "hai mươi ba",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My address is twenty-three Hoa Binh Road.",
        "trVi": "Địa chỉ của tôi là số hai mươi ba đường Hòa Bình.",
        "trAnswer": "My address is twenty-three Hoa Binh Road.",
        "trKey": "twenty-three"
      },
      {
        "en": "thirty-eight",
        "ipa": "/ˈθɜːti eɪt/",
        "vi": "ba mươi tám",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I live at thirty-eight Le Loi Street.",
        "trVi": "Tôi sống ở số ba mươi tám phố Lê Lợi.",
        "trAnswer": "I live at thirty-eight Le Loi Street.",
        "trKey": "thirty-eight"
      },
      {
        "en": "ninety-three",
        "ipa": "/ˈnaɪnti θriː/",
        "vi": "chín mươi ba",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I live at ninety-three Tran Phu Street.",
        "trVi": "Tôi sống ở số chín mươi ba phố Trần Phú.",
        "trAnswer": "I live at ninety-three Tran Phu Street.",
        "trKey": "ninety-three"
      },
      {
        "en": "one hundred and sixteen",
        "ipa": "/wʌn ˈhʌndrəd ənd ˌsɪksˈtiːn/",
        "vi": "một trăm mười sáu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I live at one hundred and sixteen Le Loi Street.",
        "trVi": "Tôi sống ở số một trăm mười sáu phố Lê Lợi.",
        "trAnswer": "I live at one hundred and sixteen Le Loi Street.",
        "trKey": "one hundred and sixteen"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 2
    },
    "story": {
      "title": "Our Homes",
      "titleVi": "Nhà của chúng mình",
      "text": "I live in this building.<br>I live in a small flat.<br>I live in that house.<br>My flat is in that tower.<br>What is your address?<br>My address is twenty-three Hoa Binh Road.<br>I live at thirty-eight Le Loi Street.<br>I live at ninety-three Tran Phu Street.<br>I live at one hundred and sixteen Le Loi Street.",
      "textVi": "Tôi sống trong tòa nhà này.<br>Tôi sống trong một căn hộ nhỏ.<br>Tôi sống trong ngôi nhà kia.<br>Căn hộ của tôi ở trong tòa tháp kia.<br>Địa chỉ của bạn là gì?<br>Địa chỉ của tôi là số hai mươi ba đường Hòa Bình.<br>Tôi sống ở số ba mươi tám phố Lê Lợi.<br>Tôi sống ở số chín mươi ba phố Trần Phú.<br>Tôi sống ở số một trăm mười sáu phố Lê Lợi.",
      "used": [
        "building",
        "flat",
        "house",
        "tower",
        "address",
        "twenty-three",
        "thirty-eight",
        "ninety-three",
        "one hundred and sixteen"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I live in this <b>building</b>. I live in a small <b>flat</b>.",
        "keywords": [
          {
            "key": "building",
            "meaningVi": "tòa nhà"
          },
          {
            "key": "flat",
            "meaningVi": "căn hộ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I live in that <b>house</b>. My flat is in that <b>tower</b>.",
        "keywords": [
          {
            "key": "house",
            "meaningVi": "ngôi nhà"
          },
          {
            "key": "tower",
            "meaningVi": "tòa tháp"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "What is your <b>address</b>? My address is <b>twenty-three</b> Hoa Binh Road.",
        "keywords": [
          {
            "key": "address",
            "meaningVi": "địa chỉ"
          },
          {
            "key": "twenty-three",
            "meaningVi": "hai mươi ba"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I live at <b>thirty-eight</b> Le Loi Street. I live at <b>ninety-three</b> Tran Phu Street. I live at <b>one hundred and sixteen</b> Le Loi Street.",
        "keywords": [
          {
            "key": "thirty-eight",
            "meaningVi": "ba mươi tám"
          },
          {
            "key": "ninety-three",
            "meaningVi": "chín mươi ba"
          },
          {
            "key": "one hundred and sixteen",
            "meaningVi": "một trăm mười sáu"
          }
        ]
      }
    ]
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🌈",
    "title": "MY FOREIGN FRIENDS",
    "titleVi": "Bạn bè nước ngoài của em",
    "words": [
      {
        "en": "American",
        "ipa": "/əˈmerɪkən/",
        "vi": "người Mỹ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "He is American.",
        "trVi": "Bạn ấy là người Mỹ.",
        "trAnswer": "He is American.",
        "trKey": "american"
      },
      {
        "en": "Australian",
        "ipa": "/ɒˈstreɪliən/",
        "vi": "người Úc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "She is Australian.",
        "trVi": "Bạn ấy là người Úc.",
        "trAnswer": "She is Australian.",
        "trKey": "australian"
      },
      {
        "en": "Japanese",
        "ipa": "/ˌdʒæpəˈniːz/",
        "vi": "người Nhật",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "He is Japanese.",
        "trVi": "Bạn ấy là người Nhật.",
        "trAnswer": "He is Japanese.",
        "trKey": "japanese"
      },
      {
        "en": "Malaysian",
        "ipa": "/məˈleɪziən/",
        "vi": "người Malaysia",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "She is Malaysian.",
        "trVi": "Bạn ấy là người Malaysia.",
        "trAnswer": "She is Malaysian.",
        "trKey": "malaysian"
      },
      {
        "en": "active",
        "ipa": "/ˈæktɪv/",
        "vi": "năng động",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My friend is active.",
        "trVi": "Bạn của tôi năng động.",
        "trAnswer": "My friend is active.",
        "trKey": "active"
      },
      {
        "en": "clever",
        "ipa": "/ˈklevər/",
        "vi": "thông minh",
        "img": "assets/vocab/grade6/u3/clever.webp",
        "ex": "My friend is clever.",
        "trVi": "Bạn của tôi thông minh.",
        "trAnswer": "My friend is clever.",
        "trKey": "clever"
      },
      {
        "en": "friendly",
        "ipa": "/ˈfrendli/",
        "vi": "thân thiện",
        "img": "assets/vocab/grade6/u3/friendly.webp",
        "ex": "My friend is friendly.",
        "trVi": "Bạn của tôi thân thiện.",
        "trAnswer": "My friend is friendly.",
        "trKey": "friendly"
      },
      {
        "en": "helpful",
        "ipa": "/ˈhelpfl/",
        "vi": "hay giúp đỡ",
        "img": "assets/vocab/grade6/u9/helpful.webp",
        "ex": "My friend is helpful.",
        "trVi": "Bạn của tôi hay giúp đỡ.",
        "trAnswer": "My friend is helpful.",
        "trKey": "helpful"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 3
    },
    "story": {
      "title": "My Foreign Friends",
      "titleVi": "Bạn bè nước ngoài của em",
      "text": "He is American.<br>She is Australian.<br>He is Japanese.<br>She is Malaysian.<br>My friend is active.<br>My friend is clever.<br>My friend is friendly.<br>My friend is helpful.",
      "textVi": "Bạn ấy là người Mỹ.<br>Bạn ấy là người Úc.<br>Bạn ấy là người Nhật.<br>Bạn ấy là người Malaysia.<br>Bạn của tôi năng động.<br>Bạn của tôi thông minh.<br>Bạn của tôi thân thiện.<br>Bạn của tôi hay giúp đỡ.",
      "used": [
        "American",
        "Australian",
        "Japanese",
        "Malaysian",
        "active",
        "clever",
        "friendly",
        "helpful"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "He is <b>American</b>. She is <b>Australian</b>.",
        "keywords": [
          {
            "key": "american",
            "meaningVi": "người Mỹ"
          },
          {
            "key": "australian",
            "meaningVi": "người Úc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "He is <b>Japanese</b>. She is <b>Malaysian</b>.",
        "keywords": [
          {
            "key": "japanese",
            "meaningVi": "người Nhật"
          },
          {
            "key": "malaysian",
            "meaningVi": "người Malaysia"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My friend is <b>active</b>. My friend is <b>clever</b>.",
        "keywords": [
          {
            "key": "active",
            "meaningVi": "năng động"
          },
          {
            "key": "clever",
            "meaningVi": "thông minh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My friend is <b>friendly</b>. My friend is <b>helpful</b>.",
        "keywords": [
          {
            "key": "friendly",
            "meaningVi": "thân thiện"
          },
          {
            "key": "helpful",
            "meaningVi": "hay giúp đỡ"
          }
        ]
      }
    ]
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🌳",
    "title": "OUR FREE-TIME ACTIVITIES",
    "titleVi": "Hoạt động lúc rảnh của chúng mình",
    "words": [
      {
        "en": "go for a walk",
        "ipa": "/ɡəʊ fə ə wɔːk/",
        "vi": "đi dạo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I go for a walk at the weekend.",
        "trVi": "Tôi đi dạo vào cuối tuần.",
        "trAnswer": "I go for a walk at the weekend.",
        "trKey": "go for a walk"
      },
      {
        "en": "play the violin",
        "ipa": "/pleɪ ðə ˌvaɪəˈlɪn/",
        "vi": "chơi đàn vi-ô-lông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play the violin at the weekend.",
        "trVi": "Tôi chơi đàn vi-ô-lông vào cuối tuần.",
        "trAnswer": "I play the violin at the weekend.",
        "trKey": "play the violin"
      },
      {
        "en": "surf the Internet",
        "ipa": "/sɜːf ðə ˈɪntənet/",
        "vi": "lướt mạng Internet",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I surf the Internet in my free time.",
        "trVi": "Tôi lướt mạng Internet lúc rảnh.",
        "trAnswer": "I surf the Internet in my free time.",
        "trKey": "surf the internet"
      },
      {
        "en": "water the flowers",
        "ipa": "/ˈwɔːtə(r) ðə ˈflaʊəz/",
        "vi": "tưới hoa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I water the flowers at the weekend.",
        "trVi": "Tôi tưới hoa vào cuối tuần.",
        "trAnswer": "I water the flowers at the weekend.",
        "trKey": "water the flowers"
      },
      {
        "en": "always",
        "ipa": "/ˈɔːlweɪz/",
        "vi": "luôn luôn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I always water the flowers in the morning.",
        "trVi": "Tôi luôn tưới hoa vào buổi sáng.",
        "trAnswer": "I always water the flowers in the morning.",
        "trKey": "always"
      },
      {
        "en": "often",
        "ipa": "/ˈɒfən/",
        "vi": "thường xuyên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I often go for a walk.",
        "trVi": "Tôi thường xuyên đi dạo.",
        "trAnswer": "I often go for a walk.",
        "trKey": "often"
      },
      {
        "en": "sometimes",
        "ipa": "/ˈsʌmtaɪmz/",
        "vi": "thỉnh thoảng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I sometimes play the violin.",
        "trVi": "Tôi thỉnh thoảng chơi đàn vi-ô-lông.",
        "trAnswer": "I sometimes play the violin.",
        "trKey": "sometimes"
      },
      {
        "en": "usually",
        "ipa": "/ˈjuːʒuəli/",
        "vi": "thường thường",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I usually read books at the weekend.",
        "trVi": "Tôi thường đọc sách vào cuối tuần.",
        "trAnswer": "I usually read books at the weekend.",
        "trKey": "usually"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 4
    },
    "story": {
      "title": "Our Free-Time Activities",
      "titleVi": "Hoạt động lúc rảnh của chúng mình",
      "text": "I go for a walk at the weekend.<br>I play the violin at the weekend.<br>I surf the Internet in my free time.<br>I water the flowers at the weekend.<br>I always water the flowers in the morning.<br>I often go for a walk.<br>I sometimes play the violin.<br>I usually read books at the weekend.",
      "textVi": "Tôi đi dạo vào cuối tuần.<br>Tôi chơi đàn vi-ô-lông vào cuối tuần.<br>Tôi lướt mạng Internet lúc rảnh.<br>Tôi tưới hoa vào cuối tuần.<br>Tôi luôn tưới hoa vào buổi sáng.<br>Tôi thường xuyên đi dạo.<br>Tôi thỉnh thoảng chơi đàn vi-ô-lông.<br>Tôi thường đọc sách vào cuối tuần.",
      "used": [
        "go for a walk",
        "play the violin",
        "surf the Internet",
        "water the flowers",
        "always",
        "often",
        "sometimes",
        "usually"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I <b>go for a walk</b> at the weekend. I <b>play the violin</b> at the weekend.",
        "keywords": [
          {
            "key": "go for a walk",
            "meaningVi": "đi dạo"
          },
          {
            "key": "play the violin",
            "meaningVi": "chơi đàn vi-ô-lông"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>surf the Internet</b> in my free time. I <b>water the flowers</b> at the weekend.",
        "keywords": [
          {
            "key": "surf the internet",
            "meaningVi": "lướt mạng Internet"
          },
          {
            "key": "water the flowers",
            "meaningVi": "tưới hoa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>always</b> water the flowers in the morning. I <b>often</b> go for a walk.",
        "keywords": [
          {
            "key": "always",
            "meaningVi": "luôn luôn"
          },
          {
            "key": "often",
            "meaningVi": "thường xuyên"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>sometimes</b> play the violin. I <b>usually</b> read books at the weekend.",
        "keywords": [
          {
            "key": "sometimes",
            "meaningVi": "thỉnh thoảng"
          },
          {
            "key": "usually",
            "meaningVi": "thường thường"
          }
        ]
      }
    ]
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "⭐",
    "title": "MY FUTURE JOB",
    "titleVi": "Nghề nghiệp tương lai của em",
    "words": [
      {
        "en": "firefighter",
        "ipa": "/ˈfaɪəˌfaɪtə/",
        "vi": "lính cứu hỏa",
        "img": "assets/vocab/grade9/u1/firefighter.webp",
        "ex": "I would like to be a firefighter.",
        "trVi": "Tôi muốn trở thành lính cứu hỏa.",
        "trAnswer": "I would like to be a firefighter.",
        "trKey": "firefighter"
      },
      {
        "en": "gardener",
        "ipa": "/ˈɡɑːdənə/",
        "vi": "người làm vườn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to be a gardener.",
        "trVi": "Tôi muốn trở thành người làm vườn.",
        "trAnswer": "I would like to be a gardener.",
        "trKey": "gardener"
      },
      {
        "en": "reporter",
        "ipa": "/rɪˈpɔːtə(r)/",
        "vi": "phóng viên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to be a reporter.",
        "trVi": "Tôi muốn trở thành phóng viên.",
        "trAnswer": "I would like to be a reporter.",
        "trKey": "reporter"
      },
      {
        "en": "writer",
        "ipa": "/ˈraɪtə/",
        "vi": "nhà văn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to be a writer.",
        "trVi": "Tôi muốn trở thành nhà văn.",
        "trAnswer": "I would like to be a writer.",
        "trKey": "writer"
      },
      {
        "en": "grow flowers",
        "ipa": "/ɡrəʊ ˈflaʊəz/",
        "vi": "trồng hoa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to grow flowers.",
        "trVi": "Tôi muốn trồng hoa.",
        "trAnswer": "I would like to grow flowers.",
        "trKey": "grow flowers"
      },
      {
        "en": "report the news",
        "ipa": "/rɪˈpɔːt ðə njuːz/",
        "vi": "đưa tin",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to report the news.",
        "trVi": "Tôi muốn đưa tin.",
        "trAnswer": "I would like to report the news.",
        "trKey": "report the news"
      },
      {
        "en": "teach children",
        "ipa": "/tiːtʃ ˈtʃɪldrən/",
        "vi": "dạy trẻ em",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to teach children.",
        "trVi": "Tôi muốn dạy trẻ em.",
        "trAnswer": "I would like to teach children.",
        "trKey": "teach children"
      },
      {
        "en": "write stories",
        "ipa": "/raɪt ˈstɔːriz/",
        "vi": "viết truyện",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like to write stories.",
        "trVi": "Tôi muốn viết truyện.",
        "trAnswer": "I would like to write stories.",
        "trKey": "write stories"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 5
    },
    "story": {
      "title": "My Future Job",
      "titleVi": "Nghề nghiệp tương lai của em",
      "text": "I would like to be a firefighter.<br>I would like to be a gardener.<br>I would like to be a reporter.<br>I would like to be a writer.<br>I would like to grow flowers.<br>I would like to report the news.<br>I would like to teach children.<br>I would like to write stories.",
      "textVi": "Tôi muốn trở thành lính cứu hỏa.<br>Tôi muốn trở thành người làm vườn.<br>Tôi muốn trở thành phóng viên.<br>Tôi muốn trở thành nhà văn.<br>Tôi muốn trồng hoa.<br>Tôi muốn đưa tin.<br>Tôi muốn dạy trẻ em.<br>Tôi muốn viết truyện.",
      "used": [
        "firefighter",
        "gardener",
        "reporter",
        "writer",
        "grow flowers",
        "report the news",
        "teach children",
        "write stories"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I would like to be a <b>firefighter</b>. I would like to be a <b>gardener</b>.",
        "keywords": [
          {
            "key": "firefighter",
            "meaningVi": "lính cứu hỏa"
          },
          {
            "key": "gardener",
            "meaningVi": "người làm vườn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like to be a <b>reporter</b>. I would like to be a <b>writer</b>.",
        "keywords": [
          {
            "key": "reporter",
            "meaningVi": "phóng viên"
          },
          {
            "key": "writer",
            "meaningVi": "nhà văn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like to <b>grow flowers</b>. I would like to <b>report the news</b>.",
        "keywords": [
          {
            "key": "grow flowers",
            "meaningVi": "trồng hoa"
          },
          {
            "key": "report the news",
            "meaningVi": "đưa tin"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like to <b>teach children</b>. I would like to <b>write stories</b>.",
        "keywords": [
          {
            "key": "teach children",
            "meaningVi": "dạy trẻ em"
          },
          {
            "key": "write stories",
            "meaningVi": "viết truyện"
          }
        ]
      }
    ]
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "📘",
    "title": "OUR SCHOOL ROOMS",
    "titleVi": "Các phòng trong trường của chúng mình",
    "words": [
      {
        "en": "first floor",
        "ipa": "/fɜːst flɔː(r)/",
        "vi": "tầng thứ nhất trên tầng trệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The art room is on the first floor.",
        "trVi": "Phòng mĩ thuật ở tầng thứ nhất trên tầng trệt.",
        "trAnswer": "The art room is on the first floor.",
        "trKey": "first floor"
      },
      {
        "en": "ground floor",
        "ipa": "/ɡraʊnd flɔː(r)/",
        "vi": "tầng trệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The music room is on the ground floor.",
        "trVi": "Phòng âm nhạc ở tầng trệt.",
        "trAnswer": "The music room is on the ground floor.",
        "trKey": "ground floor"
      },
      {
        "en": "second floor",
        "ipa": "/ˈsekənd flɔː(r)/",
        "vi": "tầng thứ hai trên tầng trệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The computer room is on the second floor.",
        "trVi": "Phòng máy tính ở tầng thứ hai trên tầng trệt.",
        "trAnswer": "The computer room is on the second floor.",
        "trKey": "second floor"
      },
      {
        "en": "third floor",
        "ipa": "/θɜːd flɔː(r)/",
        "vi": "tầng thứ ba trên tầng trệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The library is on the third floor.",
        "trVi": "Thư viện ở tầng thứ ba trên tầng trệt.",
        "trAnswer": "The library is on the third floor.",
        "trKey": "third floor"
      },
      {
        "en": "go along",
        "ipa": "/ɡəʊ əˈlɒŋ/",
        "vi": "đi dọc theo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Go along the corridor.",
        "trVi": "Hãy đi dọc theo hành lang.",
        "trAnswer": "Go along the corridor.",
        "trKey": "go along"
      },
      {
        "en": "go downstairs",
        "ipa": "/ɡəʊ ˌdaʊnˈsteəz/",
        "vi": "đi xuống cầu thang",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Go downstairs to the music room.",
        "trVi": "Hãy đi xuống cầu thang đến phòng âm nhạc.",
        "trAnswer": "Go downstairs to the music room.",
        "trKey": "go downstairs"
      },
      {
        "en": "go past",
        "ipa": "/ɡəʊ pɑːst/",
        "vi": "đi qua",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Go past the library.",
        "trVi": "Hãy đi qua thư viện.",
        "trAnswer": "Go past the library.",
        "trKey": "go past"
      },
      {
        "en": "go upstairs",
        "ipa": "/ɡəʊ ˌʌpˈsteəz/",
        "vi": "đi lên cầu thang",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Go upstairs to the art room.",
        "trVi": "Hãy đi lên cầu thang đến phòng mĩ thuật.",
        "trAnswer": "Go upstairs to the art room.",
        "trKey": "go upstairs"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 6
    },
    "story": {
      "title": "Our School Rooms",
      "titleVi": "Các phòng trong trường của chúng mình",
      "text": "The art room is on the first floor.<br>The music room is on the ground floor.<br>The computer room is on the second floor.<br>The library is on the third floor.<br>Go along the corridor.<br>Go downstairs to the music room.<br>Go past the library.<br>Go upstairs to the art room.",
      "textVi": "Phòng mĩ thuật ở tầng thứ nhất trên tầng trệt.<br>Phòng âm nhạc ở tầng trệt.<br>Phòng máy tính ở tầng thứ hai trên tầng trệt.<br>Thư viện ở tầng thứ ba trên tầng trệt.<br>Hãy đi dọc theo hành lang.<br>Hãy đi xuống cầu thang đến phòng âm nhạc.<br>Hãy đi qua thư viện.<br>Hãy đi lên cầu thang đến phòng mĩ thuật.",
      "used": [
        "first floor",
        "ground floor",
        "second floor",
        "third floor",
        "go along",
        "go downstairs",
        "go past",
        "go upstairs"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "The art room is on the <b>first floor</b>. The music room is on the <b>ground floor</b>.",
        "keywords": [
          {
            "key": "first floor",
            "meaningVi": "tầng thứ nhất trên tầng trệt"
          },
          {
            "key": "ground floor",
            "meaningVi": "tầng trệt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The computer room is on the <b>second floor</b>. The library is on the <b>third floor</b>.",
        "keywords": [
          {
            "key": "second floor",
            "meaningVi": "tầng thứ hai trên tầng trệt"
          },
          {
            "key": "third floor",
            "meaningVi": "tầng thứ ba trên tầng trệt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Go along</b> the corridor. <b>Go downstairs</b> to the music room.",
        "keywords": [
          {
            "key": "go along",
            "meaningVi": "đi dọc theo"
          },
          {
            "key": "go downstairs",
            "meaningVi": "đi xuống cầu thang"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Go past</b> the library. <b>Go upstairs</b> to the art room.",
        "keywords": [
          {
            "key": "go past",
            "meaningVi": "đi qua"
          },
          {
            "key": "go upstairs",
            "meaningVi": "đi lên cầu thang"
          }
        ]
      }
    ]
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🏫",
    "title": "OUR FAVOURITE SCHOOL ACTIVITIES",
    "titleVi": "Hoạt động ở trường yêu thích",
    "words": [
      {
        "en": "do projects",
        "ipa": "/duː ˈprɒdʒekts/",
        "vi": "làm dự án",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We do projects at school.",
        "trVi": "Chúng tôi làm dự án ở trường.",
        "trAnswer": "We do projects at school.",
        "trKey": "do projects"
      },
      {
        "en": "play games",
        "ipa": "/pleɪ ɡeɪmz/",
        "vi": "chơi trò chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We play games at break time.",
        "trVi": "Chúng tôi chơi trò chơi vào giờ ra chơi.",
        "trAnswer": "We play games at break time.",
        "trKey": "play games"
      },
      {
        "en": "read books",
        "ipa": "/riːd bʊks/",
        "vi": "đọc sách",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We read books in the library.",
        "trVi": "Chúng tôi đọc sách ở thư viện.",
        "trAnswer": "We read books in the library.",
        "trKey": "read books"
      },
      {
        "en": "solve maths problems",
        "ipa": "/sɒlv mæθs ˈprɒbləmz/",
        "vi": "giải các bài toán",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We solve maths problems in class.",
        "trVi": "Chúng tôi giải các bài toán trong lớp.",
        "trAnswer": "We solve maths problems in class.",
        "trKey": "solve maths problems"
      },
      {
        "en": "fun",
        "ipa": "/fʌn/",
        "vi": "vui",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Playing games is fun.",
        "trVi": "Chơi trò chơi rất vui.",
        "trAnswer": "Playing games is fun.",
        "trKey": "fun"
      },
      {
        "en": "good for group work",
        "ipa": "/ɡʊd fə ɡruːp wɜːk/",
        "vi": "tốt cho làm việc nhóm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Doing projects is good for group work.",
        "trVi": "Làm dự án tốt cho làm việc nhóm.",
        "trAnswer": "Doing projects is good for group work.",
        "trKey": "good for group work"
      },
      {
        "en": "interesting",
        "ipa": "/ˈɪntrəstɪŋ/",
        "vi": "thú vị",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Reading books is interesting.",
        "trVi": "Đọc sách rất thú vị.",
        "trAnswer": "Reading books is interesting.",
        "trKey": "interesting"
      },
      {
        "en": "useful",
        "ipa": "/ˈjuːsfəl/",
        "vi": "hữu ích",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Solving maths problems is useful.",
        "trVi": "Giải toán rất hữu ích.",
        "trAnswer": "Solving maths problems is useful.",
        "trKey": "useful"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 7
    },
    "story": {
      "title": "Our Favourite School Activities",
      "titleVi": "Hoạt động ở trường yêu thích",
      "text": "We do projects at school.<br>We play games at break time.<br>We read books in the library.<br>We solve maths problems in class.<br>Playing games is fun.<br>Doing projects is good for group work.<br>Reading books is interesting.<br>Solving maths problems is useful.",
      "textVi": "Chúng tôi làm dự án ở trường.<br>Chúng tôi chơi trò chơi vào giờ ra chơi.<br>Chúng tôi đọc sách ở thư viện.<br>Chúng tôi giải các bài toán trong lớp.<br>Chơi trò chơi rất vui.<br>Làm dự án tốt cho làm việc nhóm.<br>Đọc sách rất thú vị.<br>Giải toán rất hữu ích.",
      "used": [
        "do projects",
        "play games",
        "read books",
        "solve maths problems",
        "fun",
        "good for group work",
        "interesting",
        "useful"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "We <b>do projects</b> at school. We <b>play games</b> at break time.",
        "keywords": [
          {
            "key": "do projects",
            "meaningVi": "làm dự án"
          },
          {
            "key": "play games",
            "meaningVi": "chơi trò chơi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>read books</b> in the library. We <b>solve maths problems</b> in class.",
        "keywords": [
          {
            "key": "read books",
            "meaningVi": "đọc sách"
          },
          {
            "key": "solve maths problems",
            "meaningVi": "giải các bài toán"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Playing games is <b>fun</b>. Doing projects is <b>good for group work</b>.",
        "keywords": [
          {
            "key": "fun",
            "meaningVi": "vui"
          },
          {
            "key": "good for group work",
            "meaningVi": "tốt cho làm việc nhóm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Reading books is <b>interesting</b>. Solving maths problems is <b>useful</b>.",
        "keywords": [
          {
            "key": "interesting",
            "meaningVi": "thú vị"
          },
          {
            "key": "useful",
            "meaningVi": "hữu ích"
          }
        ]
      }
    ]
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🌈",
    "title": "IN OUR CLASSROOM",
    "titleVi": "Trong lớp học của chúng mình",
    "words": [
      {
        "en": "above",
        "ipa": "/əˈbʌv/",
        "vi": "ở phía trên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The picture is above the board.",
        "trVi": "Bức tranh ở phía trên bảng.",
        "trAnswer": "The picture is above the board.",
        "trKey": "above"
      },
      {
        "en": "beside",
        "ipa": "/bɪˈsaɪd/",
        "vi": "ở bên cạnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The crayon is beside the notebook.",
        "trVi": "Bút sáp màu ở bên cạnh quyển vở.",
        "trAnswer": "The crayon is beside the notebook.",
        "trKey": "beside"
      },
      {
        "en": "in front of",
        "ipa": "/ɪn frʌnt əv/",
        "vi": "ở phía trước",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The glue stick is in front of the pencil case.",
        "trVi": "Thỏi keo ở phía trước hộp bút.",
        "trAnswer": "The glue stick is in front of the pencil case.",
        "trKey": "in front of"
      },
      {
        "en": "under",
        "ipa": "/ˈʌndə/",
        "vi": "ở phía dưới",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The school bag is under the desk.",
        "trVi": "Cặp sách ở dưới bàn học.",
        "trAnswer": "The school bag is under the desk.",
        "trKey": "under"
      },
      {
        "en": "crayon",
        "ipa": "/ˈkreɪɒn/",
        "vi": "bút sáp màu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my crayon.",
        "trVi": "Đây là bút sáp màu của tôi.",
        "trAnswer": "This is my crayon.",
        "trKey": "crayon"
      },
      {
        "en": "glue stick",
        "ipa": "/ɡluː stɪk/",
        "vi": "thỏi keo khô",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my glue stick.",
        "trVi": "Đây là thỏi keo khô của tôi.",
        "trAnswer": "This is my glue stick.",
        "trKey": "glue stick"
      },
      {
        "en": "pencil sharpener",
        "ipa": "/ˈpensl ˈʃɑːpənə/",
        "vi": "cái gọt bút chì",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my pencil sharpener.",
        "trVi": "Đây là cái gọt bút chì của tôi.",
        "trAnswer": "This is my pencil sharpener.",
        "trKey": "pencil sharpener"
      },
      {
        "en": "set square",
        "ipa": "/set skweə(r)/",
        "vi": "thước ê ke",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my set square.",
        "trVi": "Đây là thước ê ke của tôi.",
        "trAnswer": "This is my set square.",
        "trKey": "set square"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 8
    },
    "story": {
      "title": "In Our Classroom",
      "titleVi": "Trong lớp học của chúng mình",
      "text": "The picture is above the board.<br>The crayon is beside the notebook.<br>The glue stick is in front of the pencil case.<br>The school bag is under the desk.<br>This is my crayon.<br>This is my glue stick.<br>This is my pencil sharpener.<br>This is my set square.",
      "textVi": "Bức tranh ở phía trên bảng.<br>Bút sáp màu ở bên cạnh quyển vở.<br>Thỏi keo ở phía trước hộp bút.<br>Cặp sách ở dưới bàn học.<br>Đây là bút sáp màu của tôi.<br>Đây là thỏi keo khô của tôi.<br>Đây là cái gọt bút chì của tôi.<br>Đây là thước ê ke của tôi.",
      "used": [
        "above",
        "beside",
        "in front of",
        "under",
        "crayon",
        "glue stick",
        "pencil sharpener",
        "set square"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "The picture is <b>above</b> the board. The crayon is <b>beside</b> the notebook.",
        "keywords": [
          {
            "key": "above",
            "meaningVi": "ở phía trên"
          },
          {
            "key": "beside",
            "meaningVi": "ở bên cạnh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The glue stick is <b>in front of</b> the pencil case. The school bag is <b>under</b> the desk.",
        "keywords": [
          {
            "key": "in front of",
            "meaningVi": "ở phía trước"
          },
          {
            "key": "under",
            "meaningVi": "ở phía dưới"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is my <b>crayon</b>. This is my <b>glue stick</b>.",
        "keywords": [
          {
            "key": "crayon",
            "meaningVi": "bút sáp màu"
          },
          {
            "key": "glue stick",
            "meaningVi": "thỏi keo khô"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is my <b>pencil sharpener</b>. This is my <b>set square</b>.",
        "keywords": [
          {
            "key": "pencil sharpener",
            "meaningVi": "cái gọt bút chì"
          },
          {
            "key": "set square",
            "meaningVi": "thước ê ke"
          }
        ]
      }
    ]
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🌳",
    "title": "OUR OUTDOOR ACTIVITIES",
    "titleVi": "Hoạt động ngoài trời của chúng mình",
    "words": [
      {
        "en": "aquarium",
        "ipa": "/əˈkweəriəm/",
        "vi": "thủy cung",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We were at the aquarium yesterday.",
        "trVi": "Hôm qua chúng tôi ở thủy cung.",
        "trAnswer": "We were at the aquarium yesterday.",
        "trKey": "aquarium"
      },
      {
        "en": "campsite",
        "ipa": "/ˈkæmpsaɪt/",
        "vi": "khu cắm trại",
        "img": "assets/vocab/grade4/u10/campsite.webp",
        "ex": "We were at the campsite yesterday.",
        "trVi": "Hôm qua chúng tôi ở khu cắm trại.",
        "trAnswer": "We were at the campsite yesterday.",
        "trKey": "campsite"
      },
      {
        "en": "funfair",
        "ipa": "/ˈfʌnfeə/",
        "vi": "hội chợ vui chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We were at the funfair yesterday.",
        "trVi": "Hôm qua chúng tôi ở hội chợ vui chơi.",
        "trAnswer": "We were at the funfair yesterday.",
        "trKey": "funfair"
      },
      {
        "en": "theatre",
        "ipa": "/ˈθɪətə/",
        "vi": "nhà hát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We were at the theatre yesterday.",
        "trVi": "Hôm qua chúng tôi ở nhà hát.",
        "trAnswer": "We were at the theatre yesterday.",
        "trKey": "theatre"
      },
      {
        "en": "dance around the campfire",
        "ipa": "/dɑːns əˈraʊnd ðə ˈkæmpfaɪə/",
        "vi": "nhảy múa quanh lửa trại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We danced around the campfire yesterday.",
        "trVi": "Hôm qua chúng tôi nhảy múa quanh lửa trại.",
        "trAnswer": "We danced around the campfire yesterday.",
        "trKey": "danced around the campfire"
      },
      {
        "en": "listen to music",
        "ipa": "/ˈlɪsən tə ˈmjuːzɪk/",
        "vi": "nghe nhạc",
        "img": "assets/vocab/grade4/u3/listen-to-music.webp",
        "ex": "We listened to music yesterday.",
        "trVi": "Hôm qua chúng tôi nghe nhạc.",
        "trAnswer": "We listened to music yesterday.",
        "trKey": "listened to music"
      },
      {
        "en": "play chess",
        "ipa": "/pleɪ tʃes/",
        "vi": "chơi cờ vua",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We played chess yesterday.",
        "trVi": "Hôm qua chúng tôi chơi cờ vua.",
        "trAnswer": "We played chess yesterday.",
        "trKey": "played chess"
      },
      {
        "en": "watch the fish",
        "ipa": "/wɒtʃ ðə fɪʃ/",
        "vi": "ngắm cá",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We watched the fish yesterday.",
        "trVi": "Hôm qua chúng tôi ngắm cá.",
        "trAnswer": "We watched the fish yesterday.",
        "trKey": "watched the fish"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 9
    },
    "story": {
      "title": "Our Outdoor Activities",
      "titleVi": "Hoạt động ngoài trời của chúng mình",
      "text": "We were at the aquarium yesterday.<br>We were at the campsite yesterday.<br>We were at the funfair yesterday.<br>We were at the theatre yesterday.<br>We danced around the campfire yesterday.<br>We listened to music yesterday.<br>We played chess yesterday.<br>We watched the fish yesterday.",
      "textVi": "Hôm qua chúng tôi ở thủy cung.<br>Hôm qua chúng tôi ở khu cắm trại.<br>Hôm qua chúng tôi ở hội chợ vui chơi.<br>Hôm qua chúng tôi ở nhà hát.<br>Hôm qua chúng tôi nhảy múa quanh lửa trại.<br>Hôm qua chúng tôi nghe nhạc.<br>Hôm qua chúng tôi chơi cờ vua.<br>Hôm qua chúng tôi ngắm cá.",
      "used": [
        "aquarium",
        "campsite",
        "funfair",
        "theatre",
        "dance around the campfire",
        "listen to music",
        "play chess",
        "watch the fish"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "We were at the <b>aquarium</b> yesterday. We were at the <b>campsite</b> yesterday.",
        "keywords": [
          {
            "key": "aquarium",
            "meaningVi": "thủy cung"
          },
          {
            "key": "campsite",
            "meaningVi": "khu cắm trại"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We were at the <b>funfair</b> yesterday. We were at the <b>theatre</b> yesterday.",
        "keywords": [
          {
            "key": "funfair",
            "meaningVi": "hội chợ vui chơi"
          },
          {
            "key": "theatre",
            "meaningVi": "nhà hát"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>danced around the campfire</b> yesterday. We <b>listened to music</b> yesterday.",
        "keywords": [
          {
            "key": "danced around the campfire",
            "meaningVi": "nhảy múa quanh lửa trại"
          },
          {
            "key": "listened to music",
            "meaningVi": "nghe nhạc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>played chess</b> yesterday. We <b>watched the fish</b> yesterday.",
        "keywords": [
          {
            "key": "played chess",
            "meaningVi": "chơi cờ vua"
          },
          {
            "key": "watched the fish",
            "meaningVi": "ngắm cá"
          }
        ]
      }
    ]
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "⭐",
    "title": "OUR SCHOOL TRIP",
    "titleVi": "Chuyến tham quan của trường",
    "words": [
      {
        "en": "Ba Na Hills",
        "ipa": "/bɑː nɑː hɪlz/",
        "vi": "Bà Nà Hills",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We went to Ba Na Hills last weekend.",
        "trVi": "Cuối tuần trước chúng tôi đến Bà Nà Hills.",
        "trAnswer": "We went to Ba Na Hills last weekend.",
        "trKey": "ba na hills"
      },
      {
        "en": "Bai Dinh Pagoda",
        "ipa": "/baɪ dɪn pəˈɡəʊdə/",
        "vi": "chùa Bái Đính",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We visited Bai Dinh Pagoda last weekend.",
        "trVi": "Cuối tuần trước chúng tôi thăm chùa Bái Đính.",
        "trAnswer": "We visited Bai Dinh Pagoda last weekend.",
        "trKey": "bai dinh pagoda"
      },
      {
        "en": "Hoan Kiem Lake",
        "ipa": "/hwɑːn kiːem leɪk/",
        "vi": "hồ Hoàn Kiếm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We went to Hoan Kiem Lake last weekend.",
        "trVi": "Cuối tuần trước chúng tôi đến hồ Hoàn Kiếm.",
        "trAnswer": "We went to Hoan Kiem Lake last weekend.",
        "trKey": "hoan kiem lake"
      },
      {
        "en": "Suoi Tien Theme Park",
        "ipa": "/suːəɪ tiːen θiːm pɑːk/",
        "vi": "khu du lịch Suối Tiên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We went to Suoi Tien Theme Park last weekend.",
        "trVi": "Cuối tuần trước chúng tôi đến khu du lịch Suối Tiên.",
        "trAnswer": "We went to Suoi Tien Theme Park last weekend.",
        "trKey": "suoi tien theme park"
      },
      {
        "en": "plant trees",
        "ipa": "/plɑːnt triːz/",
        "vi": "trồng cây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We planted trees on our school trip.",
        "trVi": "Chúng tôi trồng cây trong chuyến tham quan của trường.",
        "trAnswer": "We planted trees on our school trip.",
        "trKey": "planted trees"
      },
      {
        "en": "play games",
        "ipa": "/pleɪ ɡeɪmz/",
        "vi": "chơi trò chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We played games on our school trip.",
        "trVi": "Chúng tôi chơi trò chơi trong chuyến tham quan của trường.",
        "trAnswer": "We played games on our school trip.",
        "trKey": "played games"
      },
      {
        "en": "visit the old buildings",
        "ipa": "/ˈvɪzɪt ðə əʊld ˈbɪldɪŋz/",
        "vi": "tham quan các tòa nhà cổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We visited the old buildings.",
        "trVi": "Chúng tôi tham quan các tòa nhà cổ.",
        "trAnswer": "We visited the old buildings.",
        "trKey": "visited the old buildings"
      },
      {
        "en": "walk around the lake",
        "ipa": "/wɔːk əˈraʊnd ðə leɪk/",
        "vi": "đi bộ quanh hồ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We walked around the lake.",
        "trVi": "Chúng tôi đi bộ quanh hồ.",
        "trAnswer": "We walked around the lake.",
        "trKey": "walked around the lake"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 1,
      "unit": 10
    },
    "story": {
      "title": "Our School Trip",
      "titleVi": "Chuyến tham quan của trường",
      "text": "We went to Ba Na Hills last weekend.<br>We visited Bai Dinh Pagoda last weekend.<br>We went to Hoan Kiem Lake last weekend.<br>We went to Suoi Tien Theme Park last weekend.<br>We planted trees on our school trip.<br>We played games on our school trip.<br>We visited the old buildings.<br>We walked around the lake.",
      "textVi": "Cuối tuần trước chúng tôi đến Bà Nà Hills.<br>Cuối tuần trước chúng tôi thăm chùa Bái Đính.<br>Cuối tuần trước chúng tôi đến hồ Hoàn Kiếm.<br>Cuối tuần trước chúng tôi đến khu du lịch Suối Tiên.<br>Chúng tôi trồng cây trong chuyến tham quan của trường.<br>Chúng tôi chơi trò chơi trong chuyến tham quan của trường.<br>Chúng tôi tham quan các tòa nhà cổ.<br>Chúng tôi đi bộ quanh hồ.",
      "used": [
        "Ba Na Hills",
        "Bai Dinh Pagoda",
        "Hoan Kiem Lake",
        "Suoi Tien Theme Park",
        "plant trees",
        "play games",
        "visit the old buildings",
        "walk around the lake"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "We went to <b>Ba Na Hills</b> last weekend. We visited <b>Bai Dinh Pagoda</b> last weekend.",
        "keywords": [
          {
            "key": "ba na hills",
            "meaningVi": "Bà Nà Hills"
          },
          {
            "key": "bai dinh pagoda",
            "meaningVi": "chùa Bái Đính"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We went to <b>Hoan Kiem Lake</b> last weekend. We went to <b>Suoi Tien Theme Park</b> last weekend.",
        "keywords": [
          {
            "key": "hoan kiem lake",
            "meaningVi": "hồ Hoàn Kiếm"
          },
          {
            "key": "suoi tien theme park",
            "meaningVi": "khu du lịch Suối Tiên"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>planted trees</b> on our school trip. We <b>played games</b> on our school trip.",
        "keywords": [
          {
            "key": "planted trees",
            "meaningVi": "trồng cây"
          },
          {
            "key": "played games",
            "meaningVi": "chơi trò chơi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>visited the old buildings</b>. We <b>walked around the lake</b>.",
        "keywords": [
          {
            "key": "visited the old buildings",
            "meaningVi": "tham quan các tòa nhà cổ"
          },
          {
            "key": "walked around the lake",
            "meaningVi": "đi bộ quanh hồ"
          }
        ]
      }
    ]
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "📘",
    "title": "FAMILY TIME",
    "titleVi": "Thời gian bên gia đình",
    "words": [
      {
        "en": "buy souvenirs",
        "ipa": "/baɪ ˌsuːvəˈnɪəz/",
        "vi": "mua quà lưu niệm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We bought souvenirs in Ha Long.",
        "trVi": "Chúng tôi mua quà lưu niệm ở Hạ Long.",
        "trAnswer": "We bought souvenirs in Ha Long.",
        "trKey": "bought souvenirs"
      },
      {
        "en": "collect seashells",
        "ipa": "/kəˈlekt ˈsiːʃelz/",
        "vi": "nhặt vỏ sò",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We collected seashells on the beach.",
        "trVi": "Chúng tôi nhặt vỏ sò trên bãi biển.",
        "trAnswer": "We collected seashells on the beach.",
        "trKey": "collected seashells"
      },
      {
        "en": "eat seafood",
        "ipa": "/iːt ˈsiːfuːd/",
        "vi": "ăn hải sản",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We ate seafood in Ha Long.",
        "trVi": "Chúng tôi ăn hải sản ở Hạ Long.",
        "trAnswer": "We ate seafood in Ha Long.",
        "trKey": "ate seafood"
      },
      {
        "en": "see some interesting places",
        "ipa": "/siː sʌm ˈɪntrəstɪŋ ˈpleɪsɪz/",
        "vi": "tham quan một số địa điểm thú vị",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We saw some interesting places.",
        "trVi": "Chúng tôi tham quan một số địa điểm thú vị.",
        "trAnswer": "We saw some interesting places.",
        "trKey": "saw some interesting places"
      },
      {
        "en": "take a boat trip around the bay",
        "ipa": "/teɪk ə bəʊt trɪp əˈraʊnd ðə beɪ/",
        "vi": "đi thuyền quanh vịnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We took a boat trip around the bay.",
        "trVi": "Chúng tôi đi thuyền quanh vịnh.",
        "trAnswer": "We took a boat trip around the bay.",
        "trKey": "took a boat trip around the bay"
      },
      {
        "en": "walk on the beach",
        "ipa": "/wɔːk ɒn ðə biːtʃ/",
        "vi": "đi dạo trên bãi biển",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We walked on the beach.",
        "trVi": "Chúng tôi đi dạo trên bãi biển.",
        "trAnswer": "We walked on the beach.",
        "trKey": "walked on the beach"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 11
    },
    "story": {
      "title": "Family Time",
      "titleVi": "Thời gian bên gia đình",
      "text": "We bought souvenirs in Ha Long.<br>We collected seashells on the beach.<br>We ate seafood in Ha Long.<br>We saw some interesting places.<br>We took a boat trip around the bay.<br>We walked on the beach.",
      "textVi": "Chúng tôi mua quà lưu niệm ở Hạ Long.<br>Chúng tôi nhặt vỏ sò trên bãi biển.<br>Chúng tôi ăn hải sản ở Hạ Long.<br>Chúng tôi tham quan một số địa điểm thú vị.<br>Chúng tôi đi thuyền quanh vịnh.<br>Chúng tôi đi dạo trên bãi biển.",
      "used": [
        "buy souvenirs",
        "collect seashells",
        "eat seafood",
        "see some interesting places",
        "take a boat trip around the bay",
        "walk on the beach"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "We <b>bought souvenirs</b> in Ha Long.",
        "keywords": [
          {
            "key": "bought souvenirs",
            "meaningVi": "mua quà lưu niệm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>collected seashells</b> on the beach. We <b>ate seafood</b> in Ha Long.",
        "keywords": [
          {
            "key": "collected seashells",
            "meaningVi": "nhặt vỏ sò"
          },
          {
            "key": "ate seafood",
            "meaningVi": "ăn hải sản"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>saw some interesting places</b>.",
        "keywords": [
          {
            "key": "saw some interesting places",
            "meaningVi": "tham quan một số địa điểm thú vị"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We <b>took a boat trip around the bay</b>. We <b>walked on the beach</b>.",
        "keywords": [
          {
            "key": "took a boat trip around the bay",
            "meaningVi": "đi thuyền quanh vịnh"
          },
          {
            "key": "walked on the beach",
            "meaningVi": "đi dạo trên bãi biển"
          }
        ]
      }
    ]
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "🏫",
    "title": "OUR TET HOLIDAY",
    "titleVi": "Kì nghỉ Tết của chúng mình",
    "words": [
      {
        "en": "buy roses",
        "ipa": "/baɪ ˈrəʊzɪz/",
        "vi": "mua hoa hồng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will buy roses for Tet.",
        "trVi": "Tôi sẽ mua hoa hồng cho Tết.",
        "trAnswer": "I will buy roses for Tet.",
        "trKey": "buy roses"
      },
      {
        "en": "buy a branch of peach blossoms",
        "ipa": "/baɪ ə brɑːntʃ əv piːtʃ ˈblɒsəmz/",
        "vi": "mua một cành hoa đào",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will buy a branch of peach blossoms for Tet.",
        "trVi": "Tôi sẽ mua một cành hoa đào cho Tết.",
        "trAnswer": "I will buy a branch of peach blossoms for Tet.",
        "trKey": "buy a branch of peach blossoms"
      },
      {
        "en": "decorate the house",
        "ipa": "/ˈdekəreɪt ðə haʊs/",
        "vi": "trang trí nhà",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will decorate the house for Tet.",
        "trVi": "Tôi sẽ trang trí nhà cho Tết.",
        "trAnswer": "I will decorate the house for Tet.",
        "trKey": "decorate the house"
      },
      {
        "en": "do the shopping",
        "ipa": "/duː ðə ˈʃɒpɪŋ/",
        "vi": "đi mua sắm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will do the shopping for Tet.",
        "trVi": "Tôi sẽ đi mua sắm cho Tết.",
        "trAnswer": "I will do the shopping for Tet.",
        "trKey": "do the shopping"
      },
      {
        "en": "make banh chung",
        "ipa": "/meɪk bɑːn tʃʊŋ/",
        "vi": "làm bánh chưng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will make banh chung for Tet.",
        "trVi": "Tôi sẽ làm bánh chưng cho Tết.",
        "trAnswer": "I will make banh chung for Tet.",
        "trKey": "make banh chung"
      },
      {
        "en": "make spring rolls",
        "ipa": "/meɪk sprɪŋ rəʊlz/",
        "vi": "làm nem rán",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will make spring rolls for Tet.",
        "trVi": "Tôi sẽ làm nem rán cho Tết.",
        "trAnswer": "I will make spring rolls for Tet.",
        "trKey": "make spring rolls"
      },
      {
        "en": "fireworks show",
        "ipa": "/ˈfaɪəwɜːks ʃəʊ/",
        "vi": "màn trình diễn pháo hoa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will go to a fireworks show at Tet.",
        "trVi": "Tôi sẽ đi xem trình diễn pháo hoa vào dịp Tết.",
        "trAnswer": "I will go to a fireworks show at Tet.",
        "trKey": "fireworks show"
      },
      {
        "en": "flower festival",
        "ipa": "/ˈflaʊə ˈfestɪvl/",
        "vi": "lễ hội hoa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will go to a flower festival at Tet.",
        "trVi": "Tôi sẽ đến lễ hội hoa vào dịp Tết.",
        "trAnswer": "I will go to a flower festival at Tet.",
        "trKey": "flower festival"
      },
      {
        "en": "New Year party",
        "ipa": "/njuː jɪə ˈpɑːti/",
        "vi": "tiệc năm mới",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I will go to a New Year party.",
        "trVi": "Tôi sẽ đến tiệc năm mới.",
        "trAnswer": "I will go to a New Year party.",
        "trKey": "new year party"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 12
    },
    "story": {
      "title": "Our Tet Holiday",
      "titleVi": "Kì nghỉ Tết của chúng mình",
      "text": "I will buy roses for Tet.<br>I will buy a branch of peach blossoms for Tet.<br>I will decorate the house for Tet.<br>I will do the shopping for Tet.<br>I will make banh chung for Tet.<br>I will make spring rolls for Tet.<br>I will go to a fireworks show at Tet.<br>I will go to a flower festival at Tet.<br>I will go to a New Year party.",
      "textVi": "Tôi sẽ mua hoa hồng cho Tết.<br>Tôi sẽ mua một cành hoa đào cho Tết.<br>Tôi sẽ trang trí nhà cho Tết.<br>Tôi sẽ đi mua sắm cho Tết.<br>Tôi sẽ làm bánh chưng cho Tết.<br>Tôi sẽ làm nem rán cho Tết.<br>Tôi sẽ đi xem trình diễn pháo hoa vào dịp Tết.<br>Tôi sẽ đến lễ hội hoa vào dịp Tết.<br>Tôi sẽ đến tiệc năm mới.",
      "used": [
        "buy roses",
        "buy a branch of peach blossoms",
        "decorate the house",
        "do the shopping",
        "make banh chung",
        "make spring rolls",
        "fireworks show",
        "flower festival",
        "New Year party"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I will <b>buy roses</b> for Tet. I will <b>buy a branch of peach blossoms</b> for Tet.",
        "keywords": [
          {
            "key": "buy roses",
            "meaningVi": "mua hoa hồng"
          },
          {
            "key": "buy a branch of peach blossoms",
            "meaningVi": "mua một cành hoa đào"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I will <b>decorate the house</b> for Tet. I will <b>do the shopping</b> for Tet.",
        "keywords": [
          {
            "key": "decorate the house",
            "meaningVi": "trang trí nhà"
          },
          {
            "key": "do the shopping",
            "meaningVi": "đi mua sắm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I will <b>make banh chung</b> for Tet. I will <b>make spring rolls</b> for Tet.",
        "keywords": [
          {
            "key": "make banh chung",
            "meaningVi": "làm bánh chưng"
          },
          {
            "key": "make spring rolls",
            "meaningVi": "làm nem rán"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I will go to a <b>fireworks show</b> at Tet. I will go to a <b>flower festival</b> at Tet. I will go to a <b>New Year party</b>.",
        "keywords": [
          {
            "key": "fireworks show",
            "meaningVi": "màn trình diễn pháo hoa"
          },
          {
            "key": "flower festival",
            "meaningVi": "lễ hội hoa"
          },
          {
            "key": "new year party",
            "meaningVi": "tiệc năm mới"
          }
        ]
      }
    ]
  },
  {
    "id": "u13",
    "number": 13,
    "icon": "🌈",
    "title": "OUR SPECIAL DAYS",
    "titleVi": "Những ngày đặc biệt",
    "words": [
      {
        "en": "Mid-Autumn Festival",
        "ipa": "/mɪd ˈɔːtəm ˈfestɪvl/",
        "vi": "Tết Trung thu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will have a party at Mid-Autumn Festival.",
        "trVi": "Chúng tôi sẽ tổ chức tiệc vào Tết Trung thu.",
        "trAnswer": "We will have a party at Mid-Autumn Festival.",
        "trKey": "mid-autumn festival"
      },
      {
        "en": "Children's Day",
        "ipa": "/ˈtʃɪldrənz deɪ/",
        "vi": "Ngày Quốc tế Thiếu nhi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will play games on Children's Day.",
        "trVi": "Chúng tôi sẽ chơi trò chơi vào Ngày Quốc tế Thiếu nhi.",
        "trAnswer": "We will play games on Children's Day.",
        "trKey": "children's day"
      },
      {
        "en": "Sports Day",
        "ipa": "/ˈspɔːts deɪ/",
        "vi": "ngày hội thể thao",
        "img": "assets/vocab/grade4/u9/sports-day.webp",
        "ex": "We will play football on Sports Day.",
        "trVi": "Chúng tôi sẽ chơi bóng đá vào ngày hội thể thao.",
        "trAnswer": "We will play football on Sports Day.",
        "trKey": "sports day"
      },
      {
        "en": "Teachers' Day",
        "ipa": "/ˈtiːtʃəz deɪ/",
        "vi": "Ngày Nhà giáo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will sing songs on Teachers' Day.",
        "trVi": "Chúng tôi sẽ hát vào Ngày Nhà giáo.",
        "trAnswer": "We will sing songs on Teachers' Day.",
        "trKey": "teachers' day"
      },
      {
        "en": "apple juice",
        "ipa": "/ˈæpl dʒuːs/",
        "vi": "nước ép táo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%83%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will have apple juice at the party.",
        "trVi": "Chúng tôi sẽ uống nước ép táo ở bữa tiệc.",
        "trAnswer": "We will have apple juice at the party.",
        "trKey": "apple juice"
      },
      {
        "en": "burgers",
        "ipa": "/ˈbɜːɡəz/",
        "vi": "bánh mì kẹp thịt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will have burgers at the party.",
        "trVi": "Chúng tôi sẽ ăn bánh mì kẹp thịt ở bữa tiệc.",
        "trAnswer": "We will have burgers at the party.",
        "trKey": "burgers"
      },
      {
        "en": "milk tea",
        "ipa": "/mɪlk tiː/",
        "vi": "trà sữa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%8B%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will have milk tea at the party.",
        "trVi": "Chúng tôi sẽ uống trà sữa ở bữa tiệc.",
        "trAnswer": "We will have milk tea at the party.",
        "trKey": "milk tea"
      },
      {
        "en": "pizza",
        "ipa": "/ˈpiːtsə/",
        "vi": "bánh pizza",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8D%95%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "We will have pizza at the party.",
        "trVi": "Chúng tôi sẽ ăn bánh pizza ở bữa tiệc.",
        "trAnswer": "We will have pizza at the party.",
        "trKey": "pizza"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 13
    },
    "story": {
      "title": "Our Special Days",
      "titleVi": "Những ngày đặc biệt",
      "text": "We will have a party at Mid-Autumn Festival.<br>We will play games on Children's Day.<br>We will play football on Sports Day.<br>We will sing songs on Teachers' Day.<br>We will have apple juice at the party.<br>We will have burgers at the party.<br>We will have milk tea at the party.<br>We will have pizza at the party.",
      "textVi": "Chúng tôi sẽ tổ chức tiệc vào Tết Trung thu.<br>Chúng tôi sẽ chơi trò chơi vào Ngày Quốc tế Thiếu nhi.<br>Chúng tôi sẽ chơi bóng đá vào ngày hội thể thao.<br>Chúng tôi sẽ hát vào Ngày Nhà giáo.<br>Chúng tôi sẽ uống nước ép táo ở bữa tiệc.<br>Chúng tôi sẽ ăn bánh mì kẹp thịt ở bữa tiệc.<br>Chúng tôi sẽ uống trà sữa ở bữa tiệc.<br>Chúng tôi sẽ ăn bánh pizza ở bữa tiệc.",
      "used": [
        "Mid-Autumn Festival",
        "Children's Day",
        "Sports Day",
        "Teachers' Day",
        "apple juice",
        "burgers",
        "milk tea",
        "pizza"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "We will have a party at <b>Mid-Autumn Festival</b>. We will play games on <b>Children&#x27;s Day</b>.",
        "keywords": [
          {
            "key": "mid-autumn festival",
            "meaningVi": "Tết Trung thu"
          },
          {
            "key": "children's day",
            "meaningVi": "Ngày Quốc tế Thiếu nhi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We will play football on <b>Sports Day</b>. We will sing songs on <b>Teachers&#x27; Day</b>.",
        "keywords": [
          {
            "key": "sports day",
            "meaningVi": "ngày hội thể thao"
          },
          {
            "key": "teachers' day",
            "meaningVi": "Ngày Nhà giáo"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We will have <b>apple juice</b> at the party. We will have <b>burgers</b> at the party.",
        "keywords": [
          {
            "key": "apple juice",
            "meaningVi": "nước ép táo"
          },
          {
            "key": "burgers",
            "meaningVi": "bánh mì kẹp thịt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "We will have <b>milk tea</b> at the party. We will have <b>pizza</b> at the party.",
        "keywords": [
          {
            "key": "milk tea",
            "meaningVi": "trà sữa"
          },
          {
            "key": "pizza",
            "meaningVi": "bánh pizza"
          }
        ]
      }
    ]
  },
  {
    "id": "u14",
    "number": 14,
    "icon": "🌳",
    "title": "STAYING HEALTHY",
    "titleVi": "Giữ gìn sức khỏe",
    "words": [
      {
        "en": "do morning exercise",
        "ipa": "/duː ˈmɔːnɪŋ ˈeksəsaɪz/",
        "vi": "tập thể dục buổi sáng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I do morning exercise every day.",
        "trVi": "Tôi tập thể dục buổi sáng hằng ngày.",
        "trAnswer": "I do morning exercise every day.",
        "trKey": "do morning exercise"
      },
      {
        "en": "do yoga",
        "ipa": "/duː ˈjəʊɡə/",
        "vi": "tập yoga",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I do yoga twice a week.",
        "trVi": "Tôi tập yoga hai lần một tuần.",
        "trAnswer": "I do yoga twice a week.",
        "trKey": "do yoga"
      },
      {
        "en": "drink fresh juice",
        "ipa": "/drɪŋk freʃ dʒuːs/",
        "vi": "uống nước ép tươi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I drink fresh juice every day.",
        "trVi": "Tôi uống nước ép tươi hằng ngày.",
        "trAnswer": "I drink fresh juice every day.",
        "trKey": "drink fresh juice"
      },
      {
        "en": "eat healthy food",
        "ipa": "/iːt ˈhelθi fuːd/",
        "vi": "ăn thức ăn lành mạnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I eat healthy food every day.",
        "trVi": "Tôi ăn thức ăn lành mạnh hằng ngày.",
        "trAnswer": "I eat healthy food every day.",
        "trKey": "eat healthy food"
      },
      {
        "en": "eat vegetables",
        "ipa": "/iːt ˈvedʒtəbəlz/",
        "vi": "ăn rau",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I eat vegetables every day.",
        "trVi": "Tôi ăn rau hằng ngày.",
        "trAnswer": "I eat vegetables every day.",
        "trKey": "eat vegetables"
      },
      {
        "en": "play sports",
        "ipa": "/pleɪ spɔːts/",
        "vi": "chơi thể thao",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play sports three times a week.",
        "trVi": "Tôi chơi thể thao ba lần một tuần.",
        "trAnswer": "I play sports three times a week.",
        "trKey": "play sports"
      },
      {
        "en": "every day",
        "ipa": "/ˈevri deɪ/",
        "vi": "hằng ngày",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I drink milk every day.",
        "trVi": "Tôi uống sữa hằng ngày.",
        "trAnswer": "I drink milk every day.",
        "trKey": "every day"
      },
      {
        "en": "once a week",
        "ipa": "/wʌns ə wiːk/",
        "vi": "một lần một tuần",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I swim once a week.",
        "trVi": "Tôi bơi một lần một tuần.",
        "trAnswer": "I swim once a week.",
        "trKey": "once a week"
      },
      {
        "en": "twice a week",
        "ipa": "/twaɪs ə wiːk/",
        "vi": "hai lần một tuần",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play badminton twice a week.",
        "trVi": "Tôi chơi cầu lông hai lần một tuần.",
        "trAnswer": "I play badminton twice a week.",
        "trKey": "twice a week"
      },
      {
        "en": "three times a week",
        "ipa": "/θriː taɪmz ə wiːk/",
        "vi": "ba lần một tuần",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play football three times a week.",
        "trVi": "Tôi chơi bóng đá ba lần một tuần.",
        "trAnswer": "I play football three times a week.",
        "trKey": "three times a week"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 14
    },
    "story": {
      "title": "Staying Healthy",
      "titleVi": "Giữ gìn sức khỏe",
      "text": "I do morning exercise every day.<br>I do yoga twice a week.<br>I drink fresh juice every day.<br>I eat healthy food every day.<br>I eat vegetables every day.<br>I play sports three times a week.<br>I drink milk every day.<br>I swim once a week.<br>I play badminton twice a week.<br>I play football three times a week.",
      "textVi": "Tôi tập thể dục buổi sáng hằng ngày.<br>Tôi tập yoga hai lần một tuần.<br>Tôi uống nước ép tươi hằng ngày.<br>Tôi ăn thức ăn lành mạnh hằng ngày.<br>Tôi ăn rau hằng ngày.<br>Tôi chơi thể thao ba lần một tuần.<br>Tôi uống sữa hằng ngày.<br>Tôi bơi một lần một tuần.<br>Tôi chơi cầu lông hai lần một tuần.<br>Tôi chơi bóng đá ba lần một tuần.",
      "used": [
        "do morning exercise",
        "do yoga",
        "drink fresh juice",
        "eat healthy food",
        "eat vegetables",
        "play sports",
        "every day",
        "once a week",
        "twice a week",
        "three times a week"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I <b>do morning exercise</b> every day. I <b>do yoga</b> twice a week.",
        "keywords": [
          {
            "key": "do morning exercise",
            "meaningVi": "tập thể dục buổi sáng"
          },
          {
            "key": "do yoga",
            "meaningVi": "tập yoga"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>drink fresh juice</b> every day. I <b>eat healthy food</b> every day. I <b>eat vegetables</b> every day.",
        "keywords": [
          {
            "key": "drink fresh juice",
            "meaningVi": "uống nước ép tươi"
          },
          {
            "key": "eat healthy food",
            "meaningVi": "ăn thức ăn lành mạnh"
          },
          {
            "key": "eat vegetables",
            "meaningVi": "ăn rau"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I <b>play sports</b> three times a week. I drink milk <b>every day</b>.",
        "keywords": [
          {
            "key": "play sports",
            "meaningVi": "chơi thể thao"
          },
          {
            "key": "every day",
            "meaningVi": "hằng ngày"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I swim <b>once a week</b>. I play badminton <b>twice a week</b>. I play football <b>three times a week</b>.",
        "keywords": [
          {
            "key": "once a week",
            "meaningVi": "một lần một tuần"
          },
          {
            "key": "twice a week",
            "meaningVi": "hai lần một tuần"
          },
          {
            "key": "three times a week",
            "meaningVi": "ba lần một tuần"
          }
        ]
      }
    ]
  },
  {
    "id": "u15",
    "number": 15,
    "icon": "⭐",
    "title": "OUR HEALTH",
    "titleVi": "Sức khỏe của chúng mình",
    "words": [
      {
        "en": "headache",
        "ipa": "/ˈhedeɪk/",
        "vi": "đau đầu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a headache.",
        "trVi": "Tôi bị đau đầu.",
        "trAnswer": "I have a headache.",
        "trKey": "headache"
      },
      {
        "en": "sore throat",
        "ipa": "/sɔː θrəʊt/",
        "vi": "đau họng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a sore throat.",
        "trVi": "Tôi bị đau họng.",
        "trAnswer": "I have a sore throat.",
        "trKey": "sore throat"
      },
      {
        "en": "stomach ache",
        "ipa": "/ˈstʌmək eɪk/",
        "vi": "đau bụng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a stomach ache.",
        "trVi": "Tôi bị đau bụng.",
        "trAnswer": "I have a stomach ache.",
        "trKey": "stomach ache"
      },
      {
        "en": "toothache",
        "ipa": "/ˈtuːθeɪk/",
        "vi": "đau răng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%B7%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a toothache.",
        "trVi": "Tôi bị đau răng.",
        "trAnswer": "I have a toothache.",
        "trKey": "toothache"
      },
      {
        "en": "drink warm water",
        "ipa": "/drɪŋk wɔːm ˈwɔːtə(r)/",
        "vi": "uống nước ấm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You should drink warm water.",
        "trVi": "Bạn nên uống nước ấm.",
        "trAnswer": "You should drink warm water.",
        "trKey": "drink warm water"
      },
      {
        "en": "go to the dentist",
        "ipa": "/ɡəʊ tə ðə ˈdentɪst/",
        "vi": "đến nha sĩ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You should go to the dentist.",
        "trVi": "Bạn nên đến nha sĩ.",
        "trAnswer": "You should go to the dentist.",
        "trKey": "go to the dentist"
      },
      {
        "en": "have a rest",
        "ipa": "/hæv ə rest/",
        "vi": "nghỉ ngơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You should have a rest.",
        "trVi": "Bạn nên nghỉ ngơi.",
        "trAnswer": "You should have a rest.",
        "trKey": "have a rest"
      },
      {
        "en": "take some medicine",
        "ipa": "/teɪk sʌm ˈmedsn/",
        "vi": "uống thuốc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You should take some medicine.",
        "trVi": "Bạn nên uống thuốc.",
        "trAnswer": "You should take some medicine.",
        "trKey": "take some medicine"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 15
    },
    "story": {
      "title": "Our Health",
      "titleVi": "Sức khỏe của chúng mình",
      "text": "I have a headache.<br>I have a sore throat.<br>I have a stomach ache.<br>I have a toothache.<br>You should drink warm water.<br>You should go to the dentist.<br>You should have a rest.<br>You should take some medicine.",
      "textVi": "Tôi bị đau đầu.<br>Tôi bị đau họng.<br>Tôi bị đau bụng.<br>Tôi bị đau răng.<br>Bạn nên uống nước ấm.<br>Bạn nên đến nha sĩ.<br>Bạn nên nghỉ ngơi.<br>Bạn nên uống thuốc.",
      "used": [
        "headache",
        "sore throat",
        "stomach ache",
        "toothache",
        "drink warm water",
        "go to the dentist",
        "have a rest",
        "take some medicine"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I have a <b>headache</b>. I have a <b>sore throat</b>.",
        "keywords": [
          {
            "key": "headache",
            "meaningVi": "đau đầu"
          },
          {
            "key": "sore throat",
            "meaningVi": "đau họng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>stomach ache</b>. I have a <b>toothache</b>.",
        "keywords": [
          {
            "key": "stomach ache",
            "meaningVi": "đau bụng"
          },
          {
            "key": "toothache",
            "meaningVi": "đau răng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "You should <b>drink warm water</b>. You should <b>go to the dentist</b>.",
        "keywords": [
          {
            "key": "drink warm water",
            "meaningVi": "uống nước ấm"
          },
          {
            "key": "go to the dentist",
            "meaningVi": "đến nha sĩ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "You should <b>have a rest</b>. You should <b>take some medicine</b>.",
        "keywords": [
          {
            "key": "have a rest",
            "meaningVi": "nghỉ ngơi"
          },
          {
            "key": "take some medicine",
            "meaningVi": "uống thuốc"
          }
        ]
      }
    ]
  },
  {
    "id": "u16",
    "number": 16,
    "icon": "📘",
    "title": "SEASONS AND THE WEATHER",
    "titleVi": "Các mùa và thời tiết",
    "words": [
      {
        "en": "spring",
        "ipa": "/sprɪŋ/",
        "vi": "mùa xuân",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is warm in spring.",
        "trVi": "Trời ấm vào mùa xuân.",
        "trAnswer": "It is warm in spring.",
        "trKey": "spring"
      },
      {
        "en": "summer",
        "ipa": "/ˈsʌmə(r)/",
        "vi": "mùa hè",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is hot in summer.",
        "trVi": "Trời nóng vào mùa hè.",
        "trAnswer": "It is hot in summer.",
        "trKey": "summer"
      },
      {
        "en": "autumn",
        "ipa": "/ˈɔːtəm/",
        "vi": "mùa thu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is cool in autumn.",
        "trVi": "Trời mát vào mùa thu.",
        "trAnswer": "It is cool in autumn.",
        "trKey": "autumn"
      },
      {
        "en": "winter",
        "ipa": "/ˈwɪntə(r)/",
        "vi": "mùa đông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is cold in winter.",
        "trVi": "Trời lạnh vào mùa đông.",
        "trAnswer": "It is cold in winter.",
        "trKey": "winter"
      },
      {
        "en": "dry season",
        "ipa": "/draɪ ˈsiːzn/",
        "vi": "mùa khô",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is sunny in the dry season.",
        "trVi": "Trời nắng vào mùa khô.",
        "trAnswer": "It is sunny in the dry season.",
        "trKey": "dry season"
      },
      {
        "en": "rainy season",
        "ipa": "/ˈreɪni ˈsiːzn/",
        "vi": "mùa mưa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is wet in the rainy season.",
        "trVi": "Trời ẩm ướt vào mùa mưa.",
        "trAnswer": "It is wet in the rainy season.",
        "trKey": "rainy season"
      },
      {
        "en": "humid",
        "ipa": "/ˈhjuːmɪd/",
        "vi": "ẩm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is humid in spring.",
        "trVi": "Trời ẩm vào mùa xuân.",
        "trAnswer": "It is humid in spring.",
        "trKey": "humid"
      },
      {
        "en": "cold",
        "ipa": "/kəʊld/",
        "vi": "lạnh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is cold in winter.",
        "trVi": "Trời lạnh vào mùa đông.",
        "trAnswer": "It is cold in winter.",
        "trKey": "cold"
      },
      {
        "en": "cool",
        "ipa": "/kuːl/",
        "vi": "mát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is cool in autumn.",
        "trVi": "Trời mát vào mùa thu.",
        "trAnswer": "It is cool in autumn.",
        "trKey": "cool"
      },
      {
        "en": "hot",
        "ipa": "/hɒt/",
        "vi": "nóng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is hot in summer.",
        "trVi": "Trời nóng vào mùa hè.",
        "trAnswer": "It is hot in summer.",
        "trKey": "hot"
      },
      {
        "en": "warm",
        "ipa": "/wɔːm/",
        "vi": "ấm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is warm in spring.",
        "trVi": "Trời ấm vào mùa xuân.",
        "trAnswer": "It is warm in spring.",
        "trKey": "warm"
      },
      {
        "en": "blouse",
        "ipa": "/blaʊz/",
        "vi": "áo kiểu nữ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wear a blouse in spring.",
        "trVi": "Tôi mặc áo kiểu vào mùa xuân.",
        "trAnswer": "I wear a blouse in spring.",
        "trKey": "blouse"
      },
      {
        "en": "jeans",
        "ipa": "/dʒiːnz/",
        "vi": "quần bò",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wear jeans in winter.",
        "trVi": "Tôi mặc quần bò vào mùa đông.",
        "trAnswer": "I wear jeans in winter.",
        "trKey": "jeans"
      },
      {
        "en": "jumper",
        "ipa": "/ˈdʒʌmpə/",
        "vi": "áo len",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wear a jumper in winter.",
        "trVi": "Tôi mặc áo len vào mùa đông.",
        "trAnswer": "I wear a jumper in winter.",
        "trKey": "jumper"
      },
      {
        "en": "trousers",
        "ipa": "/ˈtraʊzəz/",
        "vi": "quần dài",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I wear trousers in winter.",
        "trVi": "Tôi mặc quần dài vào mùa đông.",
        "trAnswer": "I wear trousers in winter.",
        "trKey": "trousers"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 16
    },
    "story": {
      "title": "Seasons And The Weather",
      "titleVi": "Các mùa và thời tiết",
      "text": "It is warm in spring.<br>It is hot in summer.<br>It is cool in autumn.<br>It is cold in winter.<br>It is sunny in the dry season.<br>It is wet in the rainy season.<br>It is humid in spring.<br>It is cold in winter.<br>It is cool in autumn.<br>It is hot in summer.<br>It is warm in spring.<br>I wear a blouse in spring.<br>I wear jeans in winter.<br>I wear a jumper in winter.<br>I wear trousers in winter.",
      "textVi": "Trời ấm vào mùa xuân.<br>Trời nóng vào mùa hè.<br>Trời mát vào mùa thu.<br>Trời lạnh vào mùa đông.<br>Trời nắng vào mùa khô.<br>Trời ẩm ướt vào mùa mưa.<br>Trời ẩm vào mùa xuân.<br>Trời lạnh vào mùa đông.<br>Trời mát vào mùa thu.<br>Trời nóng vào mùa hè.<br>Trời ấm vào mùa xuân.<br>Tôi mặc áo kiểu vào mùa xuân.<br>Tôi mặc quần bò vào mùa đông.<br>Tôi mặc áo len vào mùa đông.<br>Tôi mặc quần dài vào mùa đông.",
      "used": [
        "spring",
        "summer",
        "autumn",
        "winter",
        "dry season",
        "rainy season",
        "humid",
        "cold",
        "cool",
        "hot",
        "warm",
        "blouse",
        "jeans",
        "jumper",
        "trousers"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "It is warm in <b>spring</b>. It is hot in <b>summer</b>. It is cool in <b>autumn</b>.",
        "keywords": [
          {
            "key": "spring",
            "meaningVi": "mùa xuân"
          },
          {
            "key": "summer",
            "meaningVi": "mùa hè"
          },
          {
            "key": "autumn",
            "meaningVi": "mùa thu"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It is cold in <b>winter</b>. It is sunny in the <b>dry season</b>. It is wet in the <b>rainy season</b>. It is <b>humid</b> in spring.",
        "keywords": [
          {
            "key": "winter",
            "meaningVi": "mùa đông"
          },
          {
            "key": "dry season",
            "meaningVi": "mùa khô"
          },
          {
            "key": "rainy season",
            "meaningVi": "mùa mưa"
          },
          {
            "key": "humid",
            "meaningVi": "ẩm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It is <b>cold</b> in winter. It is <b>cool</b> in autumn. It is <b>hot</b> in summer. It is <b>warm</b> in spring.",
        "keywords": [
          {
            "key": "cold",
            "meaningVi": "lạnh"
          },
          {
            "key": "cool",
            "meaningVi": "mát"
          },
          {
            "key": "hot",
            "meaningVi": "nóng"
          },
          {
            "key": "warm",
            "meaningVi": "ấm"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I wear a <b>blouse</b> in spring. I wear <b>jeans</b> in winter. I wear a <b>jumper</b> in winter. I wear <b>trousers</b> in winter.",
        "keywords": [
          {
            "key": "blouse",
            "meaningVi": "áo kiểu nữ"
          },
          {
            "key": "jeans",
            "meaningVi": "quần bò"
          },
          {
            "key": "jumper",
            "meaningVi": "áo len"
          },
          {
            "key": "trousers",
            "meaningVi": "quần dài"
          }
        ]
      }
    ]
  },
  {
    "id": "u17",
    "number": 17,
    "icon": "🏫",
    "title": "STORIES FOR CHILDREN",
    "titleVi": "Truyện dành cho thiếu nhi",
    "words": [
      {
        "en": "ant",
        "ipa": "/ænt/",
        "vi": "con kiến",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%9C%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The ant works hard.",
        "trVi": "Con kiến làm việc chăm chỉ.",
        "trAnswer": "The ant works hard.",
        "trKey": "ant"
      },
      {
        "en": "crow",
        "ipa": "/krəʊ/",
        "vi": "con quạ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The crow is in the story.",
        "trVi": "Con quạ ở trong câu chuyện.",
        "trAnswer": "The crow is in the story.",
        "trKey": "crow"
      },
      {
        "en": "dwarfs",
        "ipa": "/dwɔːfs/",
        "vi": "những chú lùn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The dwarfs work hard.",
        "trVi": "Những chú lùn làm việc chăm chỉ.",
        "trAnswer": "The dwarfs work hard.",
        "trKey": "dwarfs"
      },
      {
        "en": "fox",
        "ipa": "/fɒks/",
        "vi": "con cáo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%8A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The fox is in the story.",
        "trVi": "Con cáo ở trong câu chuyện.",
        "trAnswer": "The fox is in the story.",
        "trKey": "fox"
      },
      {
        "en": "grasshopper",
        "ipa": "/ˈɡrɑːshɒpə/",
        "vi": "con châu chấu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%97%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The grasshopper sings beautifully.",
        "trVi": "Con châu chấu hát hay.",
        "trAnswer": "The grasshopper sings beautifully.",
        "trKey": "grasshopper"
      },
      {
        "en": "hare",
        "ipa": "/heə/",
        "vi": "con thỏ rừng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%87%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The hare runs fast.",
        "trVi": "Con thỏ rừng chạy nhanh.",
        "trAnswer": "The hare runs fast.",
        "trKey": "hare"
      },
      {
        "en": "Snow White",
        "ipa": "/snəʊ waɪt/",
        "vi": "Bạch Tuyết",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Snow White cooks well.",
        "trVi": "Bạch Tuyết nấu ăn giỏi.",
        "trAnswer": "Snow White cooks well.",
        "trKey": "snow white"
      },
      {
        "en": "tortoise",
        "ipa": "/ˈtɔːtəs/",
        "vi": "con rùa cạn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%A2%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The tortoise walks slowly.",
        "trVi": "Con rùa cạn đi chậm.",
        "trAnswer": "The tortoise walks slowly.",
        "trKey": "tortoise"
      },
      {
        "en": "cook well",
        "ipa": "/kʊk wel/",
        "vi": "nấu ăn giỏi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Snow White can cook well.",
        "trVi": "Bạch Tuyết có thể nấu ăn giỏi.",
        "trAnswer": "Snow White can cook well.",
        "trKey": "cook well"
      },
      {
        "en": "run fast",
        "ipa": "/rʌn fɑːst/",
        "vi": "chạy nhanh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The hare can run fast.",
        "trVi": "Con thỏ rừng có thể chạy nhanh.",
        "trAnswer": "The hare can run fast.",
        "trKey": "run fast"
      },
      {
        "en": "sing beautifully",
        "ipa": "/sɪŋ ˈbjuːtɪfəli/",
        "vi": "hát hay",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The grasshopper can sing beautifully.",
        "trVi": "Con châu chấu có thể hát hay.",
        "trAnswer": "The grasshopper can sing beautifully.",
        "trKey": "sing beautifully"
      },
      {
        "en": "work hard",
        "ipa": "/wɜːk hɑːd/",
        "vi": "làm việc chăm chỉ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The ant has to work hard.",
        "trVi": "Con kiến phải làm việc chăm chỉ.",
        "trAnswer": "The ant has to work hard.",
        "trKey": "work hard"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 17
    },
    "story": {
      "title": "Stories For Children",
      "titleVi": "Truyện dành cho thiếu nhi",
      "text": "The ant works hard.<br>The crow is in the story.<br>The dwarfs work hard.<br>The fox is in the story.<br>The grasshopper sings beautifully.<br>The hare runs fast.<br>Snow White cooks well.<br>The tortoise walks slowly.<br>Snow White can cook well.<br>The hare can run fast.<br>The grasshopper can sing beautifully.<br>The ant has to work hard.",
      "textVi": "Con kiến làm việc chăm chỉ.<br>Con quạ ở trong câu chuyện.<br>Những chú lùn làm việc chăm chỉ.<br>Con cáo ở trong câu chuyện.<br>Con châu chấu hát hay.<br>Con thỏ rừng chạy nhanh.<br>Bạch Tuyết nấu ăn giỏi.<br>Con rùa cạn đi chậm.<br>Bạch Tuyết có thể nấu ăn giỏi.<br>Con thỏ rừng có thể chạy nhanh.<br>Con châu chấu có thể hát hay.<br>Con kiến phải làm việc chăm chỉ.",
      "used": [
        "ant",
        "crow",
        "dwarfs",
        "fox",
        "grasshopper",
        "hare",
        "Snow White",
        "tortoise",
        "cook well",
        "run fast",
        "sing beautifully",
        "work hard"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "The <b>ant</b> works hard. The <b>crow</b> is in the story. The <b>dwarfs</b> work hard.",
        "keywords": [
          {
            "key": "ant",
            "meaningVi": "con kiến"
          },
          {
            "key": "crow",
            "meaningVi": "con quạ"
          },
          {
            "key": "dwarfs",
            "meaningVi": "những chú lùn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The <b>fox</b> is in the story. The <b>grasshopper</b> sings beautifully. The <b>hare</b> runs fast.",
        "keywords": [
          {
            "key": "fox",
            "meaningVi": "con cáo"
          },
          {
            "key": "grasshopper",
            "meaningVi": "con châu chấu"
          },
          {
            "key": "hare",
            "meaningVi": "con thỏ rừng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Snow White</b> cooks well. The <b>tortoise</b> walks slowly. Snow White can <b>cook well</b>.",
        "keywords": [
          {
            "key": "snow white",
            "meaningVi": "Bạch Tuyết"
          },
          {
            "key": "tortoise",
            "meaningVi": "con rùa cạn"
          },
          {
            "key": "cook well",
            "meaningVi": "nấu ăn giỏi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The hare can <b>run fast</b>. The grasshopper can <b>sing beautifully</b>. The ant has to <b>work hard</b>.",
        "keywords": [
          {
            "key": "run fast",
            "meaningVi": "chạy nhanh"
          },
          {
            "key": "sing beautifully",
            "meaningVi": "hát hay"
          },
          {
            "key": "work hard",
            "meaningVi": "làm việc chăm chỉ"
          }
        ]
      }
    ]
  },
  {
    "id": "u18",
    "number": 18,
    "icon": "🌈",
    "title": "MEANS OF TRANSPORT",
    "titleVi": "Phương tiện giao thông",
    "words": [
      {
        "en": "Dragon Bridge",
        "ipa": "/ˈdræɡən brɪdʒ/",
        "vi": "cầu Rồng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I want to visit Dragon Bridge.",
        "trVi": "Tôi muốn tham quan cầu Rồng.",
        "trAnswer": "I want to visit Dragon Bridge.",
        "trKey": "dragon bridge"
      },
      {
        "en": "Ha Noi Opera House",
        "ipa": "/hɑː nɔɪ ˈɒpərə haʊs/",
        "vi": "Nhà hát Lớn Hà Nội",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I want to visit Ha Noi Opera House.",
        "trVi": "Tôi muốn tham quan Nhà hát Lớn Hà Nội.",
        "trAnswer": "I want to visit Ha Noi Opera House.",
        "trKey": "ha noi opera house"
      },
      {
        "en": "Ho Chi Minh City Museum",
        "ipa": "/həʊ tʃiː mɪn ˈsɪti mjuˈziːəm/",
        "vi": "Bảo tàng Thành phố Hồ Chí Minh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I want to visit Ho Chi Minh City Museum.",
        "trVi": "Tôi muốn tham quan Bảo tàng Thành phố Hồ Chí Minh.",
        "trAnswer": "I want to visit Ho Chi Minh City Museum.",
        "trKey": "ho chi minh city museum"
      },
      {
        "en": "Ngo Mon Square",
        "ipa": "/ŋəʊ mɒn skweə(r)/",
        "vi": "Quảng trường Ngọ Môn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I want to visit Ngo Mon Square.",
        "trVi": "Tôi muốn tham quan Quảng trường Ngọ Môn.",
        "trAnswer": "I want to visit Ngo Mon Square.",
        "trKey": "ngo mon square"
      },
      {
        "en": "by bicycle",
        "ipa": "/baɪ ˈbaɪsɪkl/",
        "vi": "bằng xe đạp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You can get there by bicycle.",
        "trVi": "Bạn có thể đến đó bằng xe đạp.",
        "trAnswer": "You can get there by bicycle.",
        "trKey": "by bicycle"
      },
      {
        "en": "by bus",
        "ipa": "/baɪ bʌs/",
        "vi": "bằng xe buýt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You can get there by bus.",
        "trVi": "Bạn có thể đến đó bằng xe buýt.",
        "trAnswer": "You can get there by bus.",
        "trKey": "by bus"
      },
      {
        "en": "by taxi",
        "ipa": "/baɪ ˈtæksi/",
        "vi": "bằng taxi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You can get there by taxi.",
        "trVi": "Bạn có thể đến đó bằng taxi.",
        "trAnswer": "You can get there by taxi.",
        "trKey": "by taxi"
      },
      {
        "en": "on foot",
        "ipa": "/ɒn fʊt/",
        "vi": "đi bộ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "You can get there on foot.",
        "trVi": "Bạn có thể đi bộ đến đó.",
        "trAnswer": "You can get there on foot.",
        "trKey": "on foot"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 18
    },
    "story": {
      "title": "Means Of Transport",
      "titleVi": "Phương tiện giao thông",
      "text": "I want to visit Dragon Bridge.<br>I want to visit Ha Noi Opera House.<br>I want to visit Ho Chi Minh City Museum.<br>I want to visit Ngo Mon Square.<br>You can get there by bicycle.<br>You can get there by bus.<br>You can get there by taxi.<br>You can get there on foot.",
      "textVi": "Tôi muốn tham quan cầu Rồng.<br>Tôi muốn tham quan Nhà hát Lớn Hà Nội.<br>Tôi muốn tham quan Bảo tàng Thành phố Hồ Chí Minh.<br>Tôi muốn tham quan Quảng trường Ngọ Môn.<br>Bạn có thể đến đó bằng xe đạp.<br>Bạn có thể đến đó bằng xe buýt.<br>Bạn có thể đến đó bằng taxi.<br>Bạn có thể đi bộ đến đó.",
      "used": [
        "Dragon Bridge",
        "Ha Noi Opera House",
        "Ho Chi Minh City Museum",
        "Ngo Mon Square",
        "by bicycle",
        "by bus",
        "by taxi",
        "on foot"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I want to visit <b>Dragon Bridge</b>. I want to visit <b>Ha Noi Opera House</b>.",
        "keywords": [
          {
            "key": "dragon bridge",
            "meaningVi": "cầu Rồng"
          },
          {
            "key": "ha noi opera house",
            "meaningVi": "Nhà hát Lớn Hà Nội"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I want to visit <b>Ho Chi Minh City Museum</b>. I want to visit <b>Ngo Mon Square</b>.",
        "keywords": [
          {
            "key": "ho chi minh city museum",
            "meaningVi": "Bảo tàng Thành phố Hồ Chí Minh"
          },
          {
            "key": "ngo mon square",
            "meaningVi": "Quảng trường Ngọ Môn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "You can get there <b>by bicycle</b>. You can get there <b>by bus</b>.",
        "keywords": [
          {
            "key": "by bicycle",
            "meaningVi": "bằng xe đạp"
          },
          {
            "key": "by bus",
            "meaningVi": "bằng xe buýt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "You can get there <b>by taxi</b>. You can get there <b>on foot</b>.",
        "keywords": [
          {
            "key": "by taxi",
            "meaningVi": "bằng taxi"
          },
          {
            "key": "on foot",
            "meaningVi": "đi bộ"
          }
        ]
      }
    ]
  },
  {
    "id": "u19",
    "number": 19,
    "icon": "🌳",
    "title": "PLACES OF INTEREST",
    "titleVi": "Những địa điểm tham quan",
    "words": [
      {
        "en": "beautiful",
        "ipa": "/ˈbjuːtɪfəl/",
        "vi": "đẹp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I think Ha Long Bay is beautiful.",
        "trVi": "Tôi nghĩ vịnh Hạ Long đẹp.",
        "trAnswer": "I think Ha Long Bay is beautiful.",
        "trKey": "beautiful"
      },
      {
        "en": "exciting",
        "ipa": "/ɪkˈsaɪtɪŋ/",
        "vi": "thú vị; hào hứng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I think Ba Na Hills is exciting.",
        "trVi": "Tôi nghĩ Bà Nà Hills thú vị.",
        "trAnswer": "I think Ba Na Hills is exciting.",
        "trKey": "exciting"
      },
      {
        "en": "fantastic",
        "ipa": "/fænˈtæstɪk/",
        "vi": "tuyệt vời",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I think Da Lat is fantastic.",
        "trVi": "Tôi nghĩ Đà Lạt tuyệt vời.",
        "trAnswer": "I think Da Lat is fantastic.",
        "trKey": "fantastic"
      },
      {
        "en": "peaceful",
        "ipa": "/ˈpiːsfl/",
        "vi": "yên bình",
        "img": "assets/vocab/grade6/u4/peaceful.webp",
        "ex": "I think Hoan Kiem Lake is peaceful.",
        "trVi": "Tôi nghĩ hồ Hoàn Kiếm yên bình.",
        "trAnswer": "I think Hoan Kiem Lake is peaceful.",
        "trKey": "peaceful"
      },
      {
        "en": "kilometre",
        "ipa": "/kɪˈlɒmɪtə/",
        "vi": "ki-lô-mét",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is about one kilometre from here.",
        "trVi": "Cách đây khoảng một ki-lô-mét.",
        "trAnswer": "It is about one kilometre from here.",
        "trKey": "kilometre"
      },
      {
        "en": "twenty-nine",
        "ipa": "/ˈtwenti naɪn/",
        "vi": "hai mươi chín",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is about twenty-nine kilometres.",
        "trVi": "Khoảng cách là khoảng hai mươi chín ki-lô-mét.",
        "trAnswer": "It is about twenty-nine kilometres.",
        "trKey": "twenty-nine"
      },
      {
        "en": "forty",
        "ipa": "/ˈfɔːti/",
        "vi": "bốn mươi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is about forty kilometres.",
        "trVi": "Khoảng cách là khoảng bốn mươi ki-lô-mét.",
        "trAnswer": "It is about forty kilometres.",
        "trKey": "forty"
      },
      {
        "en": "one hundred",
        "ipa": "/wʌn ˈhʌndrəd/",
        "vi": "một trăm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is about one hundred kilometres.",
        "trVi": "Khoảng cách là khoảng một trăm ki-lô-mét.",
        "trAnswer": "It is about one hundred kilometres.",
        "trKey": "one hundred"
      },
      {
        "en": "one hundred and twenty-nine",
        "ipa": "/wʌn ˈhʌndrəd ənd ˈtwenti naɪn/",
        "vi": "một trăm hai mươi chín",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "It is about one hundred and twenty-nine kilometres.",
        "trVi": "Khoảng cách là khoảng một trăm hai mươi chín ki-lô-mét.",
        "trAnswer": "It is about one hundred and twenty-nine kilometres.",
        "trKey": "one hundred and twenty-nine"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 19
    },
    "story": {
      "title": "Places Of Interest",
      "titleVi": "Những địa điểm tham quan",
      "text": "I think Ha Long Bay is beautiful.<br>I think Ba Na Hills is exciting.<br>I think Da Lat is fantastic.<br>I think Hoan Kiem Lake is peaceful.<br>It is about one kilometre from here.<br>It is about twenty-nine kilometres.<br>It is about forty kilometres.<br>It is about one hundred kilometres.<br>It is about one hundred and twenty-nine kilometres.",
      "textVi": "Tôi nghĩ vịnh Hạ Long đẹp.<br>Tôi nghĩ Bà Nà Hills thú vị.<br>Tôi nghĩ Đà Lạt tuyệt vời.<br>Tôi nghĩ hồ Hoàn Kiếm yên bình.<br>Cách đây khoảng một ki-lô-mét.<br>Khoảng cách là khoảng hai mươi chín ki-lô-mét.<br>Khoảng cách là khoảng bốn mươi ki-lô-mét.<br>Khoảng cách là khoảng một trăm ki-lô-mét.<br>Khoảng cách là khoảng một trăm hai mươi chín ki-lô-mét.",
      "used": [
        "beautiful",
        "exciting",
        "fantastic",
        "peaceful",
        "kilometre",
        "twenty-nine",
        "forty",
        "one hundred",
        "one hundred and twenty-nine"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I think Ha Long Bay is <b>beautiful</b>. I think Ba Na Hills is <b>exciting</b>.",
        "keywords": [
          {
            "key": "beautiful",
            "meaningVi": "đẹp"
          },
          {
            "key": "exciting",
            "meaningVi": "thú vị; hào hứng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I think Da Lat is <b>fantastic</b>. I think Hoan Kiem Lake is <b>peaceful</b>.",
        "keywords": [
          {
            "key": "fantastic",
            "meaningVi": "tuyệt vời"
          },
          {
            "key": "peaceful",
            "meaningVi": "yên bình"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It is about one <b>kilometre</b> from here. It is about <b>twenty-nine</b> kilometres.",
        "keywords": [
          {
            "key": "kilometre",
            "meaningVi": "ki-lô-mét"
          },
          {
            "key": "twenty-nine",
            "meaningVi": "hai mươi chín"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "It is about <b>forty</b> kilometres. It is about <b>one hundred</b> kilometres. It is about <b>one hundred and twenty-nine</b> kilometres.",
        "keywords": [
          {
            "key": "forty",
            "meaningVi": "bốn mươi"
          },
          {
            "key": "one hundred",
            "meaningVi": "một trăm"
          },
          {
            "key": "one hundred and twenty-nine",
            "meaningVi": "một trăm hai mươi chín"
          }
        ]
      }
    ]
  },
  {
    "id": "u20",
    "number": 20,
    "icon": "⭐",
    "title": "OUR SUMMER HOLIDAYS",
    "titleVi": "Kì nghỉ hè của chúng mình",
    "words": [
      {
        "en": "Dam Sen Aquarium",
        "ipa": "/dæm sen əˈkweəriəm/",
        "vi": "Thủy cung Đầm Sen",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to visit Dam Sen Aquarium.",
        "trVi": "Tôi dự định tham quan Thủy cung Đầm Sen.",
        "trAnswer": "I am going to visit Dam Sen Aquarium.",
        "trKey": "dam sen aquarium"
      },
      {
        "en": "Huong River",
        "ipa": "/hʊəŋ ˈrɪvə(r)/",
        "vi": "sông Hương",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to visit Huong River.",
        "trVi": "Tôi dự định tham quan sông Hương.",
        "trAnswer": "I am going to visit Huong River.",
        "trKey": "huong river"
      },
      {
        "en": "Phong Nha Cave",
        "ipa": "/fɒŋ njɑː keɪv/",
        "vi": "động Phong Nha",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to visit Phong Nha Cave.",
        "trVi": "Tôi dự định tham quan động Phong Nha.",
        "trAnswer": "I am going to visit Phong Nha Cave.",
        "trKey": "phong nha cave"
      },
      {
        "en": "Phu Quoc Island",
        "ipa": "/fuː kwɒk ˈaɪlənd/",
        "vi": "đảo Phú Quốc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to visit Phu Quoc Island.",
        "trVi": "Tôi dự định tham quan đảo Phú Quốc.",
        "trAnswer": "I am going to visit Phu Quoc Island.",
        "trKey": "phu quoc island"
      },
      {
        "en": "go camping",
        "ipa": "/ɡəʊ ˈkæmpɪŋ/",
        "vi": "đi cắm trại",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to go camping this summer.",
        "trVi": "Tôi dự định đi cắm trại mùa hè này.",
        "trAnswer": "I am going to go camping this summer.",
        "trKey": "go camping"
      },
      {
        "en": "join a music club",
        "ipa": "/dʒɔɪn ə ˈmjuːzɪk klʌb/",
        "vi": "tham gia câu lạc bộ âm nhạc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to join a music club.",
        "trVi": "Tôi dự định tham gia câu lạc bộ âm nhạc.",
        "trAnswer": "I am going to join a music club.",
        "trKey": "join a music club"
      },
      {
        "en": "practise swimming",
        "ipa": "/ˈpræktɪs ˈswɪmɪŋ/",
        "vi": "luyện tập bơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to practise swimming this summer.",
        "trVi": "Tôi dự định luyện tập bơi mùa hè này.",
        "trAnswer": "I am going to practise swimming this summer.",
        "trKey": "practise swimming"
      },
      {
        "en": "visit an eco-farm",
        "ipa": "/ˈvɪzɪt ən ˈiːkəʊ fɑːm/",
        "vi": "tham quan nông trại sinh thái",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am going to visit an eco-farm.",
        "trVi": "Tôi dự định tham quan một nông trại sinh thái.",
        "trAnswer": "I am going to visit an eco-farm.",
        "trKey": "visit an eco-farm"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 5,
      "volume": 2,
      "unit": 20
    },
    "story": {
      "title": "Our Summer Holidays",
      "titleVi": "Kì nghỉ hè của chúng mình",
      "text": "I am going to visit Dam Sen Aquarium.<br>I am going to visit Huong River.<br>I am going to visit Phong Nha Cave.<br>I am going to visit Phu Quoc Island.<br>I am going to go camping this summer.<br>I am going to join a music club.<br>I am going to practise swimming this summer.<br>I am going to visit an eco-farm.",
      "textVi": "Tôi dự định tham quan Thủy cung Đầm Sen.<br>Tôi dự định tham quan sông Hương.<br>Tôi dự định tham quan động Phong Nha.<br>Tôi dự định tham quan đảo Phú Quốc.<br>Tôi dự định đi cắm trại mùa hè này.<br>Tôi dự định tham gia câu lạc bộ âm nhạc.<br>Tôi dự định luyện tập bơi mùa hè này.<br>Tôi dự định tham quan một nông trại sinh thái.",
      "used": [
        "Dam Sen Aquarium",
        "Huong River",
        "Phong Nha Cave",
        "Phu Quoc Island",
        "go camping",
        "join a music club",
        "practise swimming",
        "visit an eco-farm"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I am going to visit <b>Dam Sen Aquarium</b>. I am going to visit <b>Huong River</b>.",
        "keywords": [
          {
            "key": "dam sen aquarium",
            "meaningVi": "Thủy cung Đầm Sen"
          },
          {
            "key": "huong river",
            "meaningVi": "sông Hương"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am going to visit <b>Phong Nha Cave</b>. I am going to visit <b>Phu Quoc Island</b>.",
        "keywords": [
          {
            "key": "phong nha cave",
            "meaningVi": "động Phong Nha"
          },
          {
            "key": "phu quoc island",
            "meaningVi": "đảo Phú Quốc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am going to <b>go camping</b> this summer. I am going to <b>join a music club</b>.",
        "keywords": [
          {
            "key": "go camping",
            "meaningVi": "đi cắm trại"
          },
          {
            "key": "join a music club",
            "meaningVi": "tham gia câu lạc bộ âm nhạc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am going to <b>practise swimming</b> this summer. I am going to <b>visit an eco-farm</b>.",
        "keywords": [
          {
            "key": "practise swimming",
            "meaningVi": "luyện tập bơi"
          },
          {
            "key": "visit an eco-farm",
            "meaningVi": "tham quan nông trại sinh thái"
          }
        ]
      }
    ]
  }
];
