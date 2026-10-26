// Global Success: vocabulary by textbook Unit. New examples and practice sentences.
const GRADE3_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "📘",
    "title": "HELLO",
    "titleVi": "Xin chào",
    "words": [
      {
        "en": "hello",
        "ipa": "/həˈləʊ/",
        "vi": "xin chào",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Hello, I am Mai.",
        "trVi": "Xin chào, tôi là Mai.",
        "trAnswer": "Hello, I am Mai.",
        "trKey": "hello"
      },
      {
        "en": "hi",
        "ipa": "/haɪ/",
        "vi": "chào",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Hi, Nam!",
        "trVi": "Chào Nam!",
        "trAnswer": "Hi, Nam!",
        "trKey": "hi"
      },
      {
        "en": "fine",
        "ipa": "/faɪn/",
        "vi": "khỏe",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am fine, thank you.",
        "trVi": "Tôi khỏe, cảm ơn bạn.",
        "trAnswer": "I am fine, thank you.",
        "trKey": "fine"
      },
      {
        "en": "thank you",
        "ipa": "/θæŋk juː/",
        "vi": "cảm ơn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Thank you, Ben.",
        "trVi": "Cảm ơn bạn, Ben.",
        "trAnswer": "Thank you, Ben.",
        "trKey": "thank you"
      },
      {
        "en": "goodbye",
        "ipa": "/ˌɡʊdˈbaɪ/",
        "vi": "tạm biệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Goodbye, Lucy.",
        "trVi": "Tạm biệt Lucy.",
        "trAnswer": "Goodbye, Lucy.",
        "trKey": "goodbye"
      },
      {
        "en": "bye",
        "ipa": "/baɪ/",
        "vi": "chào tạm biệt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Bye, Mai!",
        "trVi": "Tạm biệt Mai!",
        "trAnswer": "Bye, Mai!",
        "trKey": "bye"
      },
      {
        "en": "I",
        "ipa": "/aɪ/",
        "vi": "tôi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am Nam.",
        "trVi": "Tôi là Nam.",
        "trAnswer": "I am Nam.",
        "trKey": "i"
      },
      {
        "en": "you",
        "ipa": "/juː/",
        "vi": "bạn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "How are you?",
        "trVi": "Bạn khỏe không?",
        "trAnswer": "How are you?",
        "trKey": "you"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 1
    },
    "story": {
      "title": "Hello",
      "titleVi": "Xin chào",
      "text": "Hello, I am Mai.<br>Hi, Nam!<br>I am fine, thank you.<br>Thank you, Ben.<br>Goodbye, Lucy.<br>Bye, Mai!<br>I am Nam.<br>How are you?",
      "textVi": "Xin chào, tôi là Mai.<br>Chào Nam!<br>Tôi khỏe, cảm ơn bạn.<br>Cảm ơn bạn, Ben.<br>Tạm biệt Lucy.<br>Tạm biệt Mai!<br>Tôi là Nam.<br>Bạn khỏe không?",
      "used": [
        "hello",
        "hi",
        "fine",
        "thank you",
        "goodbye",
        "bye",
        "I",
        "you"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "<b>Hello</b>, I am Mai. <b>Hi</b>, Nam!",
        "keywords": [
          {
            "key": "hello",
            "meaningVi": "xin chào"
          },
          {
            "key": "hi",
            "meaningVi": "chào"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>fine</b>, thank you. <b>Thank you</b>, Ben.",
        "keywords": [
          {
            "key": "fine",
            "meaningVi": "khỏe"
          },
          {
            "key": "thank you",
            "meaningVi": "cảm ơn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Goodbye</b>, Lucy. <b>Bye</b>, Mai!",
        "keywords": [
          {
            "key": "goodbye",
            "meaningVi": "tạm biệt"
          },
          {
            "key": "bye",
            "meaningVi": "chào tạm biệt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>I</b> am Nam. How are <b>you</b>?",
        "keywords": [
          {
            "key": "i",
            "meaningVi": "tôi"
          },
          {
            "key": "you",
            "meaningVi": "bạn"
          }
        ]
      }
    ]
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🏫",
    "title": "OUR NAMES",
    "titleVi": "Tên của chúng mình",
    "words": [
      {
        "en": "name",
        "ipa": "/neɪm/",
        "vi": "tên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My name is Mai.",
        "trVi": "Tên tôi là Mai.",
        "trAnswer": "My name is Mai.",
        "trKey": "name"
      },
      {
        "en": "my",
        "ipa": "/maɪ/",
        "vi": "của tôi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my book.",
        "trVi": "Đây là sách của tôi.",
        "trAnswer": "This is my book.",
        "trKey": "my"
      },
      {
        "en": "your",
        "ipa": "/jɔː/",
        "vi": "của bạn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What is your name?",
        "trVi": "Tên bạn là gì?",
        "trAnswer": "What is your name?",
        "trKey": "your"
      },
      {
        "en": "what",
        "ipa": "/wɒt/",
        "vi": "gì",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What is this?",
        "trVi": "Đây là cái gì?",
        "trAnswer": "What is this?",
        "trKey": "what"
      },
      {
        "en": "how",
        "ipa": "/haʊ/",
        "vi": "như thế nào",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "How are you?",
        "trVi": "Bạn khỏe không?",
        "trAnswer": "How are you?",
        "trKey": "how"
      },
      {
        "en": "old",
        "ipa": "/əʊld/",
        "vi": "tuổi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am eight years old.",
        "trVi": "Tôi tám tuổi.",
        "trAnswer": "I am eight years old.",
        "trKey": "old"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 2
    },
    "story": {
      "title": "Our Names",
      "titleVi": "Tên của chúng mình",
      "text": "My name is Mai.<br>This is my book.<br>What is your name?<br>What is this?<br>How are you?<br>I am eight years old.",
      "textVi": "Tên tôi là Mai.<br>Đây là sách của tôi.<br>Tên bạn là gì?<br>Đây là cái gì?<br>Bạn khỏe không?<br>Tôi tám tuổi.",
      "used": [
        "name",
        "my",
        "your",
        "what",
        "how",
        "old"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My <b>name</b> is Mai.",
        "keywords": [
          {
            "key": "name",
            "meaningVi": "tên"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is <b>my</b> book. What is <b>your</b> name?",
        "keywords": [
          {
            "key": "my",
            "meaningVi": "của tôi"
          },
          {
            "key": "your",
            "meaningVi": "của bạn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>What</b> is this?",
        "keywords": [
          {
            "key": "what",
            "meaningVi": "gì"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>How</b> are you? I am eight years <b>old</b>.",
        "keywords": [
          {
            "key": "how",
            "meaningVi": "như thế nào"
          },
          {
            "key": "old",
            "meaningVi": "tuổi"
          }
        ]
      }
    ]
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🌈",
    "title": "OUR FRIENDS",
    "titleVi": "Bạn bè của chúng mình",
    "words": [
      {
        "en": "friend",
        "ipa": "/frend/",
        "vi": "người bạn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my friend.",
        "trVi": "Đây là bạn của tôi.",
        "trAnswer": "This is my friend.",
        "trKey": "friend"
      },
      {
        "en": "teacher",
        "ipa": "/ˈtiːtʃə(r)/",
        "vi": "giáo viên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "She is my teacher.",
        "trVi": "Cô ấy là giáo viên của tôi.",
        "trAnswer": "She is my teacher.",
        "trKey": "teacher"
      },
      {
        "en": "Mr",
        "ipa": "/ˈmɪstə/",
        "vi": "ông; thầy",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is Mr Long.",
        "trVi": "Đây là thầy Long.",
        "trAnswer": "This is Mr Long.",
        "trKey": "mr"
      },
      {
        "en": "Ms",
        "ipa": "/mɪz/",
        "vi": "cô; bà",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is Ms Hoa.",
        "trVi": "Đây là cô Hoa.",
        "trAnswer": "This is Ms Hoa.",
        "trKey": "ms"
      },
      {
        "en": "this",
        "ipa": "/ðɪs/",
        "vi": "đây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is Nam.",
        "trVi": "Đây là Nam.",
        "trAnswer": "This is Nam.",
        "trKey": "this"
      },
      {
        "en": "that",
        "ipa": "/ðæt/",
        "vi": "kia",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "That is Lucy.",
        "trVi": "Kia là Lucy.",
        "trAnswer": "That is Lucy.",
        "trKey": "that"
      },
      {
        "en": "yes",
        "ipa": "/jes/",
        "vi": "vâng; có",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Yes, it is.",
        "trVi": "Vâng, đúng vậy.",
        "trAnswer": "Yes, it is.",
        "trKey": "yes"
      },
      {
        "en": "no",
        "ipa": "/nəʊ/",
        "vi": "không",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "No, it is not.",
        "trVi": "Không, không phải.",
        "trAnswer": "No, it is not.",
        "trKey": "no"
      },
      {
        "en": "it",
        "ipa": "/aɪ ˈtiː/",
        "vi": "nó; cái đó",
        "img": "assets/vocab/grade4/u8/it.webp",
        "ex": "It is my book.",
        "trVi": "Đó là quyển sách của tôi.",
        "trAnswer": "It is my book.",
        "trKey": "it"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 3
    },
    "story": {
      "title": "Our Friends",
      "titleVi": "Bạn bè của chúng mình",
      "text": "This is my friend.<br>She is my teacher.<br>This is Mr Long.<br>This is Ms Hoa.<br>This is Nam.<br>That is Lucy.<br>Yes, it is.<br>No, it is not.<br>It is my book.",
      "textVi": "Đây là bạn của tôi.<br>Cô ấy là giáo viên của tôi.<br>Đây là thầy Long.<br>Đây là cô Hoa.<br>Đây là Nam.<br>Kia là Lucy.<br>Vâng, đúng vậy.<br>Không, không phải.<br>Đó là quyển sách của tôi.",
      "used": [
        "friend",
        "teacher",
        "Mr",
        "Ms",
        "this",
        "that",
        "yes",
        "no",
        "it"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "This is my <b>friend</b>. She is my <b>teacher</b>.",
        "keywords": [
          {
            "key": "friend",
            "meaningVi": "người bạn"
          },
          {
            "key": "teacher",
            "meaningVi": "giáo viên"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is <b>Mr</b> Long. This is <b>Ms</b> Hoa.",
        "keywords": [
          {
            "key": "mr",
            "meaningVi": "ông; thầy"
          },
          {
            "key": "ms",
            "meaningVi": "cô; bà"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>This</b> is Nam. <b>That</b> is Lucy.",
        "keywords": [
          {
            "key": "this",
            "meaningVi": "đây"
          },
          {
            "key": "that",
            "meaningVi": "kia"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Yes</b>, it is. <b>No</b>, it is not. <b>It</b> is my book.",
        "keywords": [
          {
            "key": "yes",
            "meaningVi": "vâng; có"
          },
          {
            "key": "no",
            "meaningVi": "không"
          },
          {
            "key": "it",
            "meaningVi": "nó; cái đó"
          }
        ]
      }
    ]
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🌳",
    "title": "OUR BODIES",
    "titleVi": "Cơ thể của chúng mình",
    "words": [
      {
        "en": "ear",
        "ipa": "/ɪə(r)/",
        "vi": "tai",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%82%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your ear.",
        "trVi": "Hãy chạm vào tai của bạn.",
        "trAnswer": "Touch your ear.",
        "trKey": "ear"
      },
      {
        "en": "eye",
        "ipa": "/aɪ/",
        "vi": "mắt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%81%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your eye.",
        "trVi": "Hãy chạm vào mắt của bạn.",
        "trAnswer": "Touch your eye.",
        "trKey": "eye"
      },
      {
        "en": "face",
        "ipa": "/feɪs/",
        "vi": "khuôn mặt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A4%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your face.",
        "trVi": "Hãy chạm vào khuôn mặt của bạn.",
        "trAnswer": "Touch your face.",
        "trKey": "face"
      },
      {
        "en": "hair",
        "ipa": "/heə(r)/",
        "vi": "tóc",
        "img": "assets/vocab/grade6/u3/hair.webp",
        "ex": "Touch your hair.",
        "trVi": "Hãy chạm vào tóc của bạn.",
        "trAnswer": "Touch your hair.",
        "trKey": "hair"
      },
      {
        "en": "hand",
        "ipa": "/hænd/",
        "vi": "bàn tay",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%9C%8B%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your hand.",
        "trVi": "Hãy chạm vào bàn tay của bạn.",
        "trAnswer": "Touch your hand.",
        "trKey": "hand"
      },
      {
        "en": "mouth",
        "ipa": "/maʊθ/",
        "vi": "miệng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%84%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your mouth.",
        "trVi": "Hãy chạm vào miệng của bạn.",
        "trAnswer": "Touch your mouth.",
        "trKey": "mouth"
      },
      {
        "en": "nose",
        "ipa": "/nəʊz/",
        "vi": "mũi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%83%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your nose.",
        "trVi": "Hãy chạm vào mũi của bạn.",
        "trAnswer": "Touch your nose.",
        "trKey": "nose"
      },
      {
        "en": "open",
        "ipa": "/ˈəʊpən/",
        "vi": "mở",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Open your mouth.",
        "trVi": "Hãy mở miệng.",
        "trAnswer": "Open your mouth.",
        "trKey": "open"
      },
      {
        "en": "touch",
        "ipa": "/tʌtʃ/",
        "vi": "chạm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Touch your nose.",
        "trVi": "Hãy chạm vào mũi.",
        "trAnswer": "Touch your nose.",
        "trKey": "touch"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 4
    },
    "story": {
      "title": "Our Bodies",
      "titleVi": "Cơ thể của chúng mình",
      "text": "Touch your ear.<br>Touch your eye.<br>Touch your face.<br>Touch your hair.<br>Touch your hand.<br>Touch your mouth.<br>Touch your nose.<br>Open your mouth.<br>Touch your nose.",
      "textVi": "Hãy chạm vào tai của bạn.<br>Hãy chạm vào mắt của bạn.<br>Hãy chạm vào khuôn mặt của bạn.<br>Hãy chạm vào tóc của bạn.<br>Hãy chạm vào bàn tay của bạn.<br>Hãy chạm vào miệng của bạn.<br>Hãy chạm vào mũi của bạn.<br>Hãy mở miệng.<br>Hãy chạm vào mũi.",
      "used": [
        "ear",
        "eye",
        "face",
        "hair",
        "hand",
        "mouth",
        "nose",
        "open",
        "touch"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Touch your <b>ear</b>. Touch your <b>eye</b>.",
        "keywords": [
          {
            "key": "ear",
            "meaningVi": "tai"
          },
          {
            "key": "eye",
            "meaningVi": "mắt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Touch your <b>face</b>. Touch your <b>hair</b>.",
        "keywords": [
          {
            "key": "face",
            "meaningVi": "khuôn mặt"
          },
          {
            "key": "hair",
            "meaningVi": "tóc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Touch your <b>hand</b>. Touch your <b>mouth</b>.",
        "keywords": [
          {
            "key": "hand",
            "meaningVi": "bàn tay"
          },
          {
            "key": "mouth",
            "meaningVi": "miệng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Touch your <b>nose</b>. <b>Open</b> your mouth. <b>Touch</b> your nose.",
        "keywords": [
          {
            "key": "nose",
            "meaningVi": "mũi"
          },
          {
            "key": "open",
            "meaningVi": "mở"
          },
          {
            "key": "touch",
            "meaningVi": "chạm"
          }
        ]
      }
    ]
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "⭐",
    "title": "MY HOBBIES",
    "titleVi": "Sở thích của em",
    "words": [
      {
        "en": "cooking",
        "ipa": "/ˈkʊkɪŋ/",
        "vi": "nấu ăn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%91%E2%80%8D%F0%9F%8D%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is cooking.",
        "trVi": "Sở thích của tôi là nấu ăn.",
        "trAnswer": "My hobby is cooking.",
        "trKey": "cooking"
      },
      {
        "en": "dancing",
        "ipa": "/ˈdɑːnsɪŋ/",
        "vi": "nhảy múa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is dancing.",
        "trVi": "Sở thích của tôi là nhảy múa.",
        "trAnswer": "My hobby is dancing.",
        "trKey": "dancing"
      },
      {
        "en": "drawing",
        "ipa": "/ˈdrɔːɪŋ/",
        "vi": "vẽ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is drawing.",
        "trVi": "Sở thích của tôi là vẽ.",
        "trAnswer": "My hobby is drawing.",
        "trKey": "drawing"
      },
      {
        "en": "painting",
        "ipa": "/ˈpeɪntɪŋ/",
        "vi": "vẽ tranh bằng màu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is painting.",
        "trVi": "Sở thích của tôi là vẽ tranh bằng màu.",
        "trAnswer": "My hobby is painting.",
        "trKey": "painting"
      },
      {
        "en": "running",
        "ipa": "/ˈrʌnɪŋ/",
        "vi": "chạy bộ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%83%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is running.",
        "trVi": "Sở thích của tôi là chạy bộ.",
        "trAnswer": "My hobby is running.",
        "trKey": "running"
      },
      {
        "en": "singing",
        "ipa": "/ˈsɪŋɪŋ/",
        "vi": "ca hát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A4%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is singing.",
        "trVi": "Sở thích của tôi là ca hát.",
        "trAnswer": "My hobby is singing.",
        "trKey": "singing"
      },
      {
        "en": "swimming",
        "ipa": "/ˈswɪmɪŋ/",
        "vi": "bơi lội",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%8A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is swimming.",
        "trVi": "Sở thích của tôi là bơi lội.",
        "trAnswer": "My hobby is swimming.",
        "trKey": "swimming"
      },
      {
        "en": "walking",
        "ipa": "/ˈwɔːkɪŋ/",
        "vi": "đi bộ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My hobby is walking.",
        "trVi": "Sở thích của tôi là đi bộ.",
        "trAnswer": "My hobby is walking.",
        "trKey": "walking"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 5
    },
    "story": {
      "title": "My Hobbies",
      "titleVi": "Sở thích của em",
      "text": "My hobby is cooking.<br>My hobby is dancing.<br>My hobby is drawing.<br>My hobby is painting.<br>My hobby is running.<br>My hobby is singing.<br>My hobby is swimming.<br>My hobby is walking.",
      "textVi": "Sở thích của tôi là nấu ăn.<br>Sở thích của tôi là nhảy múa.<br>Sở thích của tôi là vẽ.<br>Sở thích của tôi là vẽ tranh bằng màu.<br>Sở thích của tôi là chạy bộ.<br>Sở thích của tôi là ca hát.<br>Sở thích của tôi là bơi lội.<br>Sở thích của tôi là đi bộ.",
      "used": [
        "cooking",
        "dancing",
        "drawing",
        "painting",
        "running",
        "singing",
        "swimming",
        "walking"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My hobby is <b>cooking</b>. My hobby is <b>dancing</b>.",
        "keywords": [
          {
            "key": "cooking",
            "meaningVi": "nấu ăn"
          },
          {
            "key": "dancing",
            "meaningVi": "nhảy múa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My hobby is <b>drawing</b>. My hobby is <b>painting</b>.",
        "keywords": [
          {
            "key": "drawing",
            "meaningVi": "vẽ"
          },
          {
            "key": "painting",
            "meaningVi": "vẽ tranh bằng màu"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My hobby is <b>running</b>. My hobby is <b>singing</b>.",
        "keywords": [
          {
            "key": "running",
            "meaningVi": "chạy bộ"
          },
          {
            "key": "singing",
            "meaningVi": "ca hát"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My hobby is <b>swimming</b>. My hobby is <b>walking</b>.",
        "keywords": [
          {
            "key": "swimming",
            "meaningVi": "bơi lội"
          },
          {
            "key": "walking",
            "meaningVi": "đi bộ"
          }
        ]
      }
    ]
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "📘",
    "title": "OUR SCHOOL",
    "titleVi": "Trường của chúng mình",
    "words": [
      {
        "en": "art room",
        "ipa": "/ɑːt ruːm/",
        "vi": "phòng mĩ thuật",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our art room.",
        "trVi": "Đây là phòng mĩ thuật của chúng tôi.",
        "trAnswer": "This is our art room.",
        "trKey": "art room"
      },
      {
        "en": "classroom",
        "ipa": "/ˈklɑːsruːm/",
        "vi": "lớp học",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our classroom.",
        "trVi": "Đây là lớp học của chúng tôi.",
        "trAnswer": "This is our classroom.",
        "trKey": "classroom"
      },
      {
        "en": "computer room",
        "ipa": "/kəmˈpjuːtər ruːm/",
        "vi": "phòng máy tính",
        "img": "assets/vocab/grade7/u6/computer-room.webp",
        "ex": "This is our computer room.",
        "trVi": "Đây là phòng máy tính của chúng tôi.",
        "trAnswer": "This is our computer room.",
        "trKey": "computer room"
      },
      {
        "en": "gym",
        "ipa": "/dʒɪm/",
        "vi": "nhà thể chất",
        "img": "assets/vocab/grade7/u6/gym.webp",
        "ex": "This is our gym.",
        "trVi": "Đây là nhà thể chất của chúng tôi.",
        "trAnswer": "This is our gym.",
        "trKey": "gym"
      },
      {
        "en": "library",
        "ipa": "/ˈlaɪbrəri/",
        "vi": "thư viện",
        "img": "assets/vocab/grade7/u6/library.webp",
        "ex": "This is our library.",
        "trVi": "Đây là thư viện của chúng tôi.",
        "trAnswer": "This is our library.",
        "trKey": "library"
      },
      {
        "en": "music room",
        "ipa": "/ˈmjuːzɪk ruːm/",
        "vi": "phòng âm nhạc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%B5%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our music room.",
        "trVi": "Đây là phòng âm nhạc của chúng tôi.",
        "trAnswer": "This is our music room.",
        "trKey": "music room"
      },
      {
        "en": "playground",
        "ipa": "/ˈpleɪgraʊnd/",
        "vi": "sân chơi",
        "img": "assets/vocab/grade4/u6/playground.webp",
        "ex": "This is our playground.",
        "trVi": "Đây là sân chơi của chúng tôi.",
        "trAnswer": "This is our playground.",
        "trKey": "playground"
      },
      {
        "en": "school",
        "ipa": "/skuːl/",
        "vi": "trường học",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%92%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our school.",
        "trVi": "Đây là trường học của chúng tôi.",
        "trAnswer": "This is our school.",
        "trKey": "school"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 6
    },
    "story": {
      "title": "Our School",
      "titleVi": "Trường của chúng mình",
      "text": "This is our art room.<br>This is our classroom.<br>This is our computer room.<br>This is our gym.<br>This is our library.<br>This is our music room.<br>This is our playground.<br>This is our school.",
      "textVi": "Đây là phòng mĩ thuật của chúng tôi.<br>Đây là lớp học của chúng tôi.<br>Đây là phòng máy tính của chúng tôi.<br>Đây là nhà thể chất của chúng tôi.<br>Đây là thư viện của chúng tôi.<br>Đây là phòng âm nhạc của chúng tôi.<br>Đây là sân chơi của chúng tôi.<br>Đây là trường học của chúng tôi.",
      "used": [
        "art room",
        "classroom",
        "computer room",
        "gym",
        "library",
        "music room",
        "playground",
        "school"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "This is our <b>art room</b>. This is our <b>classroom</b>.",
        "keywords": [
          {
            "key": "art room",
            "meaningVi": "phòng mĩ thuật"
          },
          {
            "key": "classroom",
            "meaningVi": "lớp học"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is our <b>computer room</b>. This is our <b>gym</b>.",
        "keywords": [
          {
            "key": "computer room",
            "meaningVi": "phòng máy tính"
          },
          {
            "key": "gym",
            "meaningVi": "nhà thể chất"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is our <b>library</b>. This is our <b>music room</b>.",
        "keywords": [
          {
            "key": "library",
            "meaningVi": "thư viện"
          },
          {
            "key": "music room",
            "meaningVi": "phòng âm nhạc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is our <b>playground</b>. This is our <b>school</b>.",
        "keywords": [
          {
            "key": "playground",
            "meaningVi": "sân chơi"
          },
          {
            "key": "school",
            "meaningVi": "trường học"
          }
        ]
      }
    ]
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🏫",
    "title": "CLASSROOM INSTRUCTIONS",
    "titleVi": "Hướng dẫn trong lớp học",
    "words": [
      {
        "en": "close",
        "ipa": "/kləʊz/",
        "vi": "đóng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Close your book, please.",
        "trVi": "Xin hãy đóng sách lại.",
        "trAnswer": "Close your book, please.",
        "trKey": "close"
      },
      {
        "en": "come in",
        "ipa": "/kʌm ɪn/",
        "vi": "đi vào",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "May I come in?",
        "trVi": "Em có thể vào lớp không ạ?",
        "trAnswer": "May I come in?",
        "trKey": "come in"
      },
      {
        "en": "go out",
        "ipa": "/ɡəʊ aʊt/",
        "vi": "đi ra ngoài",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "May I go out?",
        "trVi": "Em có thể ra ngoài không ạ?",
        "trAnswer": "May I go out?",
        "trKey": "go out"
      },
      {
        "en": "sit down",
        "ipa": "/sɪt daʊn/",
        "vi": "ngồi xuống",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Sit down, please.",
        "trVi": "Xin hãy ngồi xuống.",
        "trAnswer": "Sit down, please.",
        "trKey": "sit down"
      },
      {
        "en": "speak",
        "ipa": "/spiːk/",
        "vi": "nói",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "May I speak English?",
        "trVi": "Em có thể nói tiếng Anh không ạ?",
        "trAnswer": "May I speak English?",
        "trKey": "speak"
      },
      {
        "en": "stand up",
        "ipa": "/stænd ʌp/",
        "vi": "đứng lên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Stand up, please.",
        "trVi": "Xin hãy đứng lên.",
        "trAnswer": "Stand up, please.",
        "trKey": "stand up"
      },
      {
        "en": "please",
        "ipa": "/pliːz/",
        "vi": "xin; vui lòng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Open your book, please.",
        "trVi": "Xin hãy mở sách ra.",
        "trAnswer": "Open your book, please.",
        "trKey": "please"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 7
    },
    "story": {
      "title": "Classroom Instructions",
      "titleVi": "Hướng dẫn trong lớp học",
      "text": "Close your book, please.<br>May I come in?<br>May I go out?<br>Sit down, please.<br>May I speak English?<br>Stand up, please.<br>Open your book, please.",
      "textVi": "Xin hãy đóng sách lại.<br>Em có thể vào lớp không ạ?<br>Em có thể ra ngoài không ạ?<br>Xin hãy ngồi xuống.<br>Em có thể nói tiếng Anh không ạ?<br>Xin hãy đứng lên.<br>Xin hãy mở sách ra.",
      "used": [
        "close",
        "come in",
        "go out",
        "sit down",
        "speak",
        "stand up",
        "please"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "<b>Close</b> your book, please.",
        "keywords": [
          {
            "key": "close",
            "meaningVi": "đóng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "May I <b>come in</b>? May I <b>go out</b>?",
        "keywords": [
          {
            "key": "come in",
            "meaningVi": "đi vào"
          },
          {
            "key": "go out",
            "meaningVi": "đi ra ngoài"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Sit down</b>, please. May I <b>speak</b> English?",
        "keywords": [
          {
            "key": "sit down",
            "meaningVi": "ngồi xuống"
          },
          {
            "key": "speak",
            "meaningVi": "nói"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "<b>Stand up</b>, please. Open your book, <b>please</b>.",
        "keywords": [
          {
            "key": "stand up",
            "meaningVi": "đứng lên"
          },
          {
            "key": "please",
            "meaningVi": "xin; vui lòng"
          }
        ]
      }
    ]
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🌈",
    "title": "MY SCHOOL THINGS",
    "titleVi": "Đồ dùng học tập của em",
    "words": [
      {
        "en": "book",
        "ipa": "/bʊk/",
        "vi": "quyển sách",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%96%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a book.",
        "trVi": "Tôi có một quyển sách.",
        "trAnswer": "I have a book.",
        "trKey": "book"
      },
      {
        "en": "eraser",
        "ipa": "/ɪˈreɪzə(r)/",
        "vi": "cục tẩy",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have an eraser.",
        "trVi": "Tôi có một cục tẩy.",
        "trAnswer": "I have an eraser.",
        "trKey": "eraser"
      },
      {
        "en": "notebook",
        "ipa": "/ˈnəʊtbʊk/",
        "vi": "quyển vở",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a notebook.",
        "trVi": "Tôi có một quyển vở.",
        "trAnswer": "I have a notebook.",
        "trKey": "notebook"
      },
      {
        "en": "pen",
        "ipa": "/pen/",
        "vi": "cái bút mực",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%96%8A%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a pen.",
        "trVi": "Tôi có một cái bút mực.",
        "trAnswer": "I have a pen.",
        "trKey": "pen"
      },
      {
        "en": "pencil",
        "ipa": "/ˈpensl/",
        "vi": "cái bút chì",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%9C%8F%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a pencil.",
        "trVi": "Tôi có một cái bút chì.",
        "trAnswer": "I have a pencil.",
        "trKey": "pencil"
      },
      {
        "en": "pencil case",
        "ipa": "/ˈpensl keɪs/",
        "vi": "hộp bút",
        "img": "assets/vocab/grade6/u1/pencil-case.webp",
        "ex": "I have a pencil case.",
        "trVi": "Tôi có một hộp bút.",
        "trAnswer": "I have a pencil case.",
        "trKey": "pencil case"
      },
      {
        "en": "ruler",
        "ipa": "/ˈruːlə(r)/",
        "vi": "cái thước kẻ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a ruler.",
        "trVi": "Tôi có một cái thước kẻ.",
        "trAnswer": "I have a ruler.",
        "trKey": "ruler"
      },
      {
        "en": "school bag",
        "ipa": "/ˈskuːl bæg/",
        "vi": "cái cặp sách",
        "img": "assets/vocab/grade6/u1/school-bag.webp",
        "ex": "I have a school bag.",
        "trVi": "Tôi có một cái cặp sách.",
        "trAnswer": "I have a school bag.",
        "trKey": "school bag"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 8
    },
    "story": {
      "title": "My School Things",
      "titleVi": "Đồ dùng học tập của em",
      "text": "I have a book.<br>I have an eraser.<br>I have a notebook.<br>I have a pen.<br>I have a pencil.<br>I have a pencil case.<br>I have a ruler.<br>I have a school bag.",
      "textVi": "Tôi có một quyển sách.<br>Tôi có một cục tẩy.<br>Tôi có một quyển vở.<br>Tôi có một cái bút mực.<br>Tôi có một cái bút chì.<br>Tôi có một hộp bút.<br>Tôi có một cái thước kẻ.<br>Tôi có một cái cặp sách.",
      "used": [
        "book",
        "eraser",
        "notebook",
        "pen",
        "pencil",
        "pencil case",
        "ruler",
        "school bag"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I have a <b>book</b>. I have an <b>eraser</b>.",
        "keywords": [
          {
            "key": "book",
            "meaningVi": "quyển sách"
          },
          {
            "key": "eraser",
            "meaningVi": "cục tẩy"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>notebook</b>. I have a <b>pen</b>.",
        "keywords": [
          {
            "key": "notebook",
            "meaningVi": "quyển vở"
          },
          {
            "key": "pen",
            "meaningVi": "cái bút mực"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>pencil</b>. I have a <b>pencil case</b>.",
        "keywords": [
          {
            "key": "pencil",
            "meaningVi": "cái bút chì"
          },
          {
            "key": "pencil case",
            "meaningVi": "hộp bút"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>ruler</b>. I have a <b>school bag</b>.",
        "keywords": [
          {
            "key": "ruler",
            "meaningVi": "cái thước kẻ"
          },
          {
            "key": "school bag",
            "meaningVi": "cái cặp sách"
          }
        ]
      }
    ]
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🌳",
    "title": "COLOURS",
    "titleVi": "Màu sắc",
    "words": [
      {
        "en": "black",
        "ipa": "/blæk/",
        "vi": "đen",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is black.",
        "trVi": "Bút của tôi màu đen.",
        "trAnswer": "My pen is black.",
        "trKey": "black"
      },
      {
        "en": "blue",
        "ipa": "/bluː/",
        "vi": "xanh da trời",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is blue.",
        "trVi": "Bút của tôi màu xanh da trời.",
        "trAnswer": "My pen is blue.",
        "trKey": "blue"
      },
      {
        "en": "brown",
        "ipa": "/braʊn/",
        "vi": "nâu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is brown.",
        "trVi": "Bút của tôi màu nâu.",
        "trAnswer": "My pen is brown.",
        "trKey": "brown"
      },
      {
        "en": "green",
        "ipa": "/ɡriːn/",
        "vi": "xanh lá cây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is green.",
        "trVi": "Bút của tôi màu xanh lá cây.",
        "trAnswer": "My pen is green.",
        "trKey": "green"
      },
      {
        "en": "orange",
        "ipa": "/ˈɔːrɪndʒ/",
        "vi": "cam",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is orange.",
        "trVi": "Bút của tôi màu cam.",
        "trAnswer": "My pen is orange.",
        "trKey": "orange"
      },
      {
        "en": "red",
        "ipa": "/red/",
        "vi": "đỏ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is red.",
        "trVi": "Bút của tôi màu đỏ.",
        "trAnswer": "My pen is red.",
        "trKey": "red"
      },
      {
        "en": "white",
        "ipa": "/waɪt/",
        "vi": "trắng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is white.",
        "trVi": "Bút của tôi màu trắng.",
        "trAnswer": "My pen is white.",
        "trKey": "white"
      },
      {
        "en": "yellow",
        "ipa": "/ˈjeləʊ/",
        "vi": "vàng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My pen is yellow.",
        "trVi": "Bút của tôi màu vàng.",
        "trAnswer": "My pen is yellow.",
        "trKey": "yellow"
      },
      {
        "en": "colour",
        "ipa": "/ˈkʌlə/",
        "vi": "màu sắc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What colour is your pen?",
        "trVi": "Bút của bạn màu gì?",
        "trAnswer": "What colour is your pen?",
        "trKey": "colour"
      },
      {
        "en": "they",
        "ipa": "/ðeɪ/",
        "vi": "chúng; họ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "They are blue.",
        "trVi": "Chúng màu xanh da trời.",
        "trAnswer": "They are blue.",
        "trKey": "they"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 9
    },
    "story": {
      "title": "Colours",
      "titleVi": "Màu sắc",
      "text": "My pen is black.<br>My pen is blue.<br>My pen is brown.<br>My pen is green.<br>My pen is orange.<br>My pen is red.<br>My pen is white.<br>My pen is yellow.<br>What colour is your pen?<br>They are blue.",
      "textVi": "Bút của tôi màu đen.<br>Bút của tôi màu xanh da trời.<br>Bút của tôi màu nâu.<br>Bút của tôi màu xanh lá cây.<br>Bút của tôi màu cam.<br>Bút của tôi màu đỏ.<br>Bút của tôi màu trắng.<br>Bút của tôi màu vàng.<br>Bút của bạn màu gì?<br>Chúng màu xanh da trời.",
      "used": [
        "black",
        "blue",
        "brown",
        "green",
        "orange",
        "red",
        "white",
        "yellow",
        "colour",
        "they"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My pen is <b>black</b>. My pen is <b>blue</b>.",
        "keywords": [
          {
            "key": "black",
            "meaningVi": "đen"
          },
          {
            "key": "blue",
            "meaningVi": "xanh da trời"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My pen is <b>brown</b>. My pen is <b>green</b>. My pen is <b>orange</b>.",
        "keywords": [
          {
            "key": "brown",
            "meaningVi": "nâu"
          },
          {
            "key": "green",
            "meaningVi": "xanh lá cây"
          },
          {
            "key": "orange",
            "meaningVi": "cam"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My pen is <b>red</b>. My pen is <b>white</b>.",
        "keywords": [
          {
            "key": "red",
            "meaningVi": "đỏ"
          },
          {
            "key": "white",
            "meaningVi": "trắng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My pen is <b>yellow</b>. What <b>colour</b> is your pen? <b>They</b> are blue.",
        "keywords": [
          {
            "key": "yellow",
            "meaningVi": "vàng"
          },
          {
            "key": "colour",
            "meaningVi": "màu sắc"
          },
          {
            "key": "they",
            "meaningVi": "chúng; họ"
          }
        ]
      }
    ]
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "⭐",
    "title": "BREAK TIME ACTIVITIES",
    "titleVi": "Hoạt động giờ ra chơi",
    "words": [
      {
        "en": "badminton",
        "ipa": "/ˈbædmɪntən/",
        "vi": "cầu lông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%B8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play badminton at break time.",
        "trVi": "Tôi chơi cầu lông vào giờ ra chơi.",
        "trAnswer": "I play badminton at break time.",
        "trKey": "badminton"
      },
      {
        "en": "basketball",
        "ipa": "/ˈbɑːskɪtbɔːl/",
        "vi": "bóng rổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%80%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play basketball at break time.",
        "trVi": "Tôi chơi bóng rổ vào giờ ra chơi.",
        "trAnswer": "I play basketball at break time.",
        "trKey": "basketball"
      },
      {
        "en": "chess",
        "ipa": "/tʃes/",
        "vi": "cờ vua",
        "img": "assets/vocab/grade6/u8/chess.webp",
        "ex": "I play chess at break time.",
        "trVi": "Tôi chơi cờ vua vào giờ ra chơi.",
        "trAnswer": "I play chess at break time.",
        "trKey": "chess"
      },
      {
        "en": "football",
        "ipa": "/ˈfʊtbɔːl/",
        "vi": "bóng đá",
        "img": "assets/vocab/grade6/u1/football.webp",
        "ex": "I play football at break time.",
        "trVi": "Tôi chơi bóng đá vào giờ ra chơi.",
        "trAnswer": "I play football at break time.",
        "trKey": "football"
      },
      {
        "en": "table tennis",
        "ipa": "/ˈteɪbl̩ ˈtenɪs/",
        "vi": "bóng bàn",
        "img": "assets/vocab/grade6/u8/table-tennis.webp",
        "ex": "I play table tennis at break time.",
        "trVi": "Tôi chơi bóng bàn vào giờ ra chơi.",
        "trAnswer": "I play table tennis at break time.",
        "trKey": "table tennis"
      },
      {
        "en": "volleyball",
        "ipa": "/ˈvɒl.i.bɔːl/",
        "vi": "bóng chuyền",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play volleyball at break time.",
        "trVi": "Tôi chơi bóng chuyền vào giờ ra chơi.",
        "trAnswer": "I play volleyball at break time.",
        "trKey": "volleyball"
      },
      {
        "en": "word puzzles",
        "ipa": "/wɜːd ˈpʌzəlz/",
        "vi": "trò chơi ô chữ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I do word puzzles at break time.",
        "trVi": "Tôi giải ô chữ vào giờ ra chơi.",
        "trAnswer": "I do word puzzles at break time.",
        "trKey": "word puzzles"
      },
      {
        "en": "chat",
        "ipa": "/tʃæt/",
        "vi": "trò chuyện",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I chat with my friends at break time.",
        "trVi": "Tôi trò chuyện với bạn vào giờ ra chơi.",
        "trAnswer": "I chat with my friends at break time.",
        "trKey": "chat"
      },
      {
        "en": "break time",
        "ipa": "/breɪk taɪm/",
        "vi": "giờ ra chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I play chess at break time.",
        "trVi": "Tôi chơi cờ vào giờ ra chơi.",
        "trAnswer": "I play chess at break time.",
        "trKey": "break time"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 1,
      "unit": 10
    },
    "story": {
      "title": "Break Time Activities",
      "titleVi": "Hoạt động giờ ra chơi",
      "text": "I play badminton at break time.<br>I play basketball at break time.<br>I play chess at break time.<br>I play football at break time.<br>I play table tennis at break time.<br>I play volleyball at break time.<br>I do word puzzles at break time.<br>I chat with my friends at break time.<br>I play chess at break time.",
      "textVi": "Tôi chơi cầu lông vào giờ ra chơi.<br>Tôi chơi bóng rổ vào giờ ra chơi.<br>Tôi chơi cờ vua vào giờ ra chơi.<br>Tôi chơi bóng đá vào giờ ra chơi.<br>Tôi chơi bóng bàn vào giờ ra chơi.<br>Tôi chơi bóng chuyền vào giờ ra chơi.<br>Tôi giải ô chữ vào giờ ra chơi.<br>Tôi trò chuyện với bạn vào giờ ra chơi.<br>Tôi chơi cờ vào giờ ra chơi.",
      "used": [
        "badminton",
        "basketball",
        "chess",
        "football",
        "table tennis",
        "volleyball",
        "word puzzles",
        "chat",
        "break time"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I play <b>badminton</b> at break time. I play <b>basketball</b> at break time.",
        "keywords": [
          {
            "key": "badminton",
            "meaningVi": "cầu lông"
          },
          {
            "key": "basketball",
            "meaningVi": "bóng rổ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I play <b>chess</b> at break time. I play <b>football</b> at break time.",
        "keywords": [
          {
            "key": "chess",
            "meaningVi": "cờ vua"
          },
          {
            "key": "football",
            "meaningVi": "bóng đá"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I play <b>table tennis</b> at break time. I play <b>volleyball</b> at break time.",
        "keywords": [
          {
            "key": "table tennis",
            "meaningVi": "bóng bàn"
          },
          {
            "key": "volleyball",
            "meaningVi": "bóng chuyền"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I do <b>word puzzles</b> at break time. I <b>chat</b> with my friends at break time. I play chess at <b>break time</b>.",
        "keywords": [
          {
            "key": "word puzzles",
            "meaningVi": "trò chơi ô chữ"
          },
          {
            "key": "chat",
            "meaningVi": "trò chuyện"
          },
          {
            "key": "break time",
            "meaningVi": "giờ ra chơi"
          }
        ]
      }
    ]
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "📘",
    "title": "MY FAMILY",
    "titleVi": "Gia đình của em",
    "words": [
      {
        "en": "brother",
        "ipa": "/ˈbrʌðə/",
        "vi": "anh hoặc em trai",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my brother.",
        "trVi": "Đây là anh hoặc em trai của tôi.",
        "trAnswer": "This is my brother.",
        "trKey": "brother"
      },
      {
        "en": "father",
        "ipa": "/ˈfɑːðə(r)/",
        "vi": "bố",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my father.",
        "trVi": "Đây là bố của tôi.",
        "trAnswer": "This is my father.",
        "trKey": "father"
      },
      {
        "en": "mother",
        "ipa": "/ˈmʌðə(r)/",
        "vi": "mẹ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A9%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my mother.",
        "trVi": "Đây là mẹ của tôi.",
        "trAnswer": "This is my mother.",
        "trKey": "mother"
      },
      {
        "en": "sister",
        "ipa": "/ˈsɪstə/",
        "vi": "chị hoặc em gái",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%91%A7%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my sister.",
        "trVi": "Đây là chị hoặc em gái của tôi.",
        "trAnswer": "This is my sister.",
        "trKey": "sister"
      },
      {
        "en": "sure",
        "ipa": "/ʃʊə/",
        "vi": "chắc chắn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "Yes, sure.",
        "trVi": "Vâng, chắc chắn rồi.",
        "trAnswer": "Yes, sure.",
        "trKey": "sure"
      },
      {
        "en": "eleven",
        "ipa": "/ɪˈlevən/",
        "vi": "mười một",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother is eleven.",
        "trVi": "Anh trai tôi mười một tuổi.",
        "trAnswer": "My brother is eleven.",
        "trKey": "eleven"
      },
      {
        "en": "twelve",
        "ipa": "/twelv/",
        "vi": "mười hai",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is twelve.",
        "trVi": "Chị gái tôi mười hai tuổi.",
        "trAnswer": "My sister is twelve.",
        "trKey": "twelve"
      },
      {
        "en": "thirteen",
        "ipa": "/ˌθɜːˈtiːn/",
        "vi": "mười ba",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother is thirteen.",
        "trVi": "Anh trai tôi mười ba tuổi.",
        "trAnswer": "My brother is thirteen.",
        "trKey": "thirteen"
      },
      {
        "en": "fourteen",
        "ipa": "/ˌfɔːˈtiːn/",
        "vi": "mười bốn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is fourteen.",
        "trVi": "Chị gái tôi mười bốn tuổi.",
        "trAnswer": "My sister is fourteen.",
        "trKey": "fourteen"
      },
      {
        "en": "fifteen",
        "ipa": "/ˌfɪfˈtiːn/",
        "vi": "mười lăm",
        "img": "assets/vocab/grade4/u2/fifteen.webp",
        "ex": "My brother is fifteen.",
        "trVi": "Anh trai tôi mười lăm tuổi.",
        "trAnswer": "My brother is fifteen.",
        "trKey": "fifteen"
      },
      {
        "en": "sixteen",
        "ipa": "/ˌsɪksˈtiːn/",
        "vi": "mười sáu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is sixteen.",
        "trVi": "Chị gái tôi mười sáu tuổi.",
        "trAnswer": "My sister is sixteen.",
        "trKey": "sixteen"
      },
      {
        "en": "seventeen",
        "ipa": "/ˌsevənˈtiːn/",
        "vi": "mười bảy",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother is seventeen.",
        "trVi": "Anh trai tôi mười bảy tuổi.",
        "trAnswer": "My brother is seventeen.",
        "trKey": "seventeen"
      },
      {
        "en": "eighteen",
        "ipa": "/ˌeɪˈtiːn/",
        "vi": "mười tám",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is eighteen.",
        "trVi": "Chị gái tôi mười tám tuổi.",
        "trAnswer": "My sister is eighteen.",
        "trKey": "eighteen"
      },
      {
        "en": "nineteen",
        "ipa": "/ˌnaɪnˈtiːn/",
        "vi": "mười chín",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My brother is nineteen.",
        "trVi": "Anh trai tôi mười chín tuổi.",
        "trAnswer": "My brother is nineteen.",
        "trKey": "nineteen"
      },
      {
        "en": "twenty",
        "ipa": "/ˈtwenti/",
        "vi": "hai mươi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My sister is twenty.",
        "trVi": "Chị gái tôi hai mươi tuổi.",
        "trAnswer": "My sister is twenty.",
        "trKey": "twenty"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 11
    },
    "story": {
      "title": "My Family",
      "titleVi": "Gia đình của em",
      "text": "This is my brother.<br>This is my father.<br>This is my mother.<br>This is my sister.<br>Yes, sure.<br>My brother is eleven.<br>My sister is twelve.<br>My brother is thirteen.<br>My sister is fourteen.<br>My brother is fifteen.<br>My sister is sixteen.<br>My brother is seventeen.<br>My sister is eighteen.<br>My brother is nineteen.<br>My sister is twenty.",
      "textVi": "Đây là anh hoặc em trai của tôi.<br>Đây là bố của tôi.<br>Đây là mẹ của tôi.<br>Đây là chị hoặc em gái của tôi.<br>Vâng, chắc chắn rồi.<br>Anh trai tôi mười một tuổi.<br>Chị gái tôi mười hai tuổi.<br>Anh trai tôi mười ba tuổi.<br>Chị gái tôi mười bốn tuổi.<br>Anh trai tôi mười lăm tuổi.<br>Chị gái tôi mười sáu tuổi.<br>Anh trai tôi mười bảy tuổi.<br>Chị gái tôi mười tám tuổi.<br>Anh trai tôi mười chín tuổi.<br>Chị gái tôi hai mươi tuổi.",
      "used": [
        "brother",
        "father",
        "mother",
        "sister",
        "sure",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
        "twenty"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "This is my <b>brother</b>. This is my <b>father</b>. This is my <b>mother</b>.",
        "keywords": [
          {
            "key": "brother",
            "meaningVi": "anh hoặc em trai"
          },
          {
            "key": "father",
            "meaningVi": "bố"
          },
          {
            "key": "mother",
            "meaningVi": "mẹ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is my <b>sister</b>. Yes, <b>sure</b>. My brother is <b>eleven</b>. My sister is <b>twelve</b>.",
        "keywords": [
          {
            "key": "sister",
            "meaningVi": "chị hoặc em gái"
          },
          {
            "key": "sure",
            "meaningVi": "chắc chắn"
          },
          {
            "key": "eleven",
            "meaningVi": "mười một"
          },
          {
            "key": "twelve",
            "meaningVi": "mười hai"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My brother is <b>thirteen</b>. My sister is <b>fourteen</b>. My brother is <b>fifteen</b>. My sister is <b>sixteen</b>.",
        "keywords": [
          {
            "key": "thirteen",
            "meaningVi": "mười ba"
          },
          {
            "key": "fourteen",
            "meaningVi": "mười bốn"
          },
          {
            "key": "fifteen",
            "meaningVi": "mười lăm"
          },
          {
            "key": "sixteen",
            "meaningVi": "mười sáu"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My brother is <b>seventeen</b>. My sister is <b>eighteen</b>. My brother is <b>nineteen</b>. My sister is <b>twenty</b>.",
        "keywords": [
          {
            "key": "seventeen",
            "meaningVi": "mười bảy"
          },
          {
            "key": "eighteen",
            "meaningVi": "mười tám"
          },
          {
            "key": "nineteen",
            "meaningVi": "mười chín"
          },
          {
            "key": "twenty",
            "meaningVi": "hai mươi"
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
        "en": "cook",
        "ipa": "/kʊk/",
        "vi": "đầu bếp",
        "img": "assets/vocab/grade4/u5/cook.webp",
        "ex": "My mother is a cook.",
        "trVi": "Mẹ tôi là đầu bếp.",
        "trAnswer": "My mother is a cook.",
        "trKey": "cook"
      },
      {
        "en": "doctor",
        "ipa": "/ˈdɒktə(r)/",
        "vi": "bác sĩ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%91%E2%80%8D%E2%9A%95%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a doctor.",
        "trVi": "Mẹ tôi là bác sĩ.",
        "trAnswer": "My mother is a doctor.",
        "trKey": "doctor"
      },
      {
        "en": "driver",
        "ipa": "/ˈdraɪvə(r)/",
        "vi": "tài xế",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a driver.",
        "trVi": "Mẹ tôi là tài xế.",
        "trAnswer": "My mother is a driver.",
        "trKey": "driver"
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
        "en": "singer",
        "ipa": "/ˈsɪŋə(r)/",
        "vi": "ca sĩ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A4%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a singer.",
        "trVi": "Mẹ tôi là ca sĩ.",
        "trAnswer": "My mother is a singer.",
        "trKey": "singer"
      },
      {
        "en": "teacher",
        "ipa": "/ˈtiːtʃə(r)/",
        "vi": "giáo viên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a teacher.",
        "trVi": "Mẹ tôi là giáo viên.",
        "trAnswer": "My mother is a teacher.",
        "trKey": "teacher"
      },
      {
        "en": "worker",
        "ipa": "/ˈwɜːkə/",
        "vi": "công nhân",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My mother is a worker.",
        "trVi": "Mẹ tôi là công nhân.",
        "trAnswer": "My mother is a worker.",
        "trKey": "worker"
      },
      {
        "en": "job",
        "ipa": "/dʒɒb/",
        "vi": "nghề nghiệp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "What is her job?",
        "trVi": "Nghề nghiệp của cô ấy là gì?",
        "trAnswer": "What is her job?",
        "trKey": "job"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 12
    },
    "story": {
      "title": "Jobs",
      "titleVi": "Nghề nghiệp",
      "text": "My mother is a cook.<br>My mother is a doctor.<br>My mother is a driver.<br>My mother is a farmer.<br>My mother is a nurse.<br>My mother is a singer.<br>My mother is a teacher.<br>My mother is a worker.<br>What is her job?",
      "textVi": "Mẹ tôi là đầu bếp.<br>Mẹ tôi là bác sĩ.<br>Mẹ tôi là tài xế.<br>Mẹ tôi là nông dân.<br>Mẹ tôi là y tá.<br>Mẹ tôi là ca sĩ.<br>Mẹ tôi là giáo viên.<br>Mẹ tôi là công nhân.<br>Nghề nghiệp của cô ấy là gì?",
      "used": [
        "cook",
        "doctor",
        "driver",
        "farmer",
        "nurse",
        "singer",
        "teacher",
        "worker",
        "job"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "My mother is a <b>cook</b>. My mother is a <b>doctor</b>.",
        "keywords": [
          {
            "key": "cook",
            "meaningVi": "đầu bếp"
          },
          {
            "key": "doctor",
            "meaningVi": "bác sĩ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My mother is a <b>driver</b>. My mother is a <b>farmer</b>.",
        "keywords": [
          {
            "key": "driver",
            "meaningVi": "tài xế"
          },
          {
            "key": "farmer",
            "meaningVi": "nông dân"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My mother is a <b>nurse</b>. My mother is a <b>singer</b>.",
        "keywords": [
          {
            "key": "nurse",
            "meaningVi": "y tá"
          },
          {
            "key": "singer",
            "meaningVi": "ca sĩ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My mother is a <b>teacher</b>. My mother is a <b>worker</b>. What is her <b>job</b>?",
        "keywords": [
          {
            "key": "teacher",
            "meaningVi": "giáo viên"
          },
          {
            "key": "worker",
            "meaningVi": "công nhân"
          },
          {
            "key": "job",
            "meaningVi": "nghề nghiệp"
          }
        ]
      }
    ]
  },
  {
    "id": "u13",
    "number": 13,
    "icon": "🌈",
    "title": "MY HOUSE",
    "titleVi": "Ngôi nhà của em",
    "words": [
      {
        "en": "bathroom",
        "ipa": "/ˈbɑːθruːm/",
        "vi": "phòng tắm",
        "img": "assets/vocab/grade6/u2/bathroom.webp",
        "ex": "This is our bathroom.",
        "trVi": "Đây là phòng tắm của chúng tôi.",
        "trAnswer": "This is our bathroom.",
        "trKey": "bathroom"
      },
      {
        "en": "bedroom",
        "ipa": "/ˈbedruːm/",
        "vi": "phòng ngủ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9B%8F%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our bedroom.",
        "trVi": "Đây là phòng ngủ của chúng tôi.",
        "trAnswer": "This is our bedroom.",
        "trKey": "bedroom"
      },
      {
        "en": "kitchen",
        "ipa": "/ˈkɪtʃɪn/",
        "vi": "nhà bếp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is our kitchen.",
        "trVi": "Đây là nhà bếp của chúng tôi.",
        "trAnswer": "This is our kitchen.",
        "trKey": "kitchen"
      },
      {
        "en": "living room",
        "ipa": "/ˈlɪvɪŋ ruːm/",
        "vi": "phòng khách",
        "img": "assets/vocab/grade6/u2/living-room.webp",
        "ex": "This is our living room.",
        "trVi": "Đây là phòng khách của chúng tôi.",
        "trAnswer": "This is our living room.",
        "trKey": "living room"
      },
      {
        "en": "house",
        "ipa": "/haʊs/",
        "vi": "ngôi nhà",
        "img": "assets/vocab/grade12/u8/house.webp",
        "ex": "This is my house.",
        "trVi": "Đây là nhà của tôi.",
        "trAnswer": "This is my house.",
        "trKey": "house"
      },
      {
        "en": "chair",
        "ipa": "/tʃeə(r)/",
        "vi": "cái ghế",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AA%91%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The chair is in the kitchen.",
        "trVi": "Cái ghế ở trong bếp.",
        "trAnswer": "The chair is in the kitchen.",
        "trKey": "chair"
      },
      {
        "en": "lamp",
        "ipa": "/læmp/",
        "vi": "cái đèn",
        "img": "assets/vocab/grade6/u2/lamp.webp",
        "ex": "The lamp is on the table.",
        "trVi": "Cái đèn ở trên bàn.",
        "trAnswer": "The lamp is on the table.",
        "trKey": "lamp"
      },
      {
        "en": "table",
        "ipa": "/ˈteɪbl/",
        "vi": "cái bàn",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AA%91%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The table is in the living room.",
        "trVi": "Cái bàn ở trong phòng khách.",
        "trAnswer": "The table is in the living room.",
        "trKey": "table"
      },
      {
        "en": "here",
        "ipa": "/hɪə/",
        "vi": "ở đây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The kitchen is here.",
        "trVi": "Nhà bếp ở đây.",
        "trAnswer": "The kitchen is here.",
        "trKey": "here"
      },
      {
        "en": "there",
        "ipa": "/ðeə/",
        "vi": "ở kia",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The bathroom is there.",
        "trVi": "Phòng tắm ở kia.",
        "trAnswer": "The bathroom is there.",
        "trKey": "there"
      },
      {
        "en": "in",
        "ipa": "/ɪn/",
        "vi": "ở trong",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The chair is in the bedroom.",
        "trVi": "Cái ghế ở trong phòng ngủ.",
        "trAnswer": "The chair is in the bedroom.",
        "trKey": "in"
      },
      {
        "en": "on",
        "ipa": "/ɒn/",
        "vi": "ở trên",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The lamp is on the desk.",
        "trVi": "Cái đèn ở trên bàn học.",
        "trAnswer": "The lamp is on the desk.",
        "trKey": "on"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 13
    },
    "story": {
      "title": "My House",
      "titleVi": "Ngôi nhà của em",
      "text": "This is our bathroom.<br>This is our bedroom.<br>This is our kitchen.<br>This is our living room.<br>This is my house.<br>The chair is in the kitchen.<br>The lamp is on the table.<br>The table is in the living room.<br>The kitchen is here.<br>The bathroom is there.<br>The chair is in the bedroom.<br>The lamp is on the desk.",
      "textVi": "Đây là phòng tắm của chúng tôi.<br>Đây là phòng ngủ của chúng tôi.<br>Đây là nhà bếp của chúng tôi.<br>Đây là phòng khách của chúng tôi.<br>Đây là nhà của tôi.<br>Cái ghế ở trong bếp.<br>Cái đèn ở trên bàn.<br>Cái bàn ở trong phòng khách.<br>Nhà bếp ở đây.<br>Phòng tắm ở kia.<br>Cái ghế ở trong phòng ngủ.<br>Cái đèn ở trên bàn học.",
      "used": [
        "bathroom",
        "bedroom",
        "kitchen",
        "living room",
        "house",
        "chair",
        "lamp",
        "table",
        "here",
        "there",
        "in",
        "on"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "This is our <b>bathroom</b>. This is our <b>bedroom</b>. This is our <b>kitchen</b>.",
        "keywords": [
          {
            "key": "bathroom",
            "meaningVi": "phòng tắm"
          },
          {
            "key": "bedroom",
            "meaningVi": "phòng ngủ"
          },
          {
            "key": "kitchen",
            "meaningVi": "nhà bếp"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is our <b>living room</b>. This is my <b>house</b>. The <b>chair</b> is in the kitchen.",
        "keywords": [
          {
            "key": "living room",
            "meaningVi": "phòng khách"
          },
          {
            "key": "house",
            "meaningVi": "ngôi nhà"
          },
          {
            "key": "chair",
            "meaningVi": "cái ghế"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The <b>lamp</b> is on the table. The <b>table</b> is in the living room. The kitchen is <b>here</b>.",
        "keywords": [
          {
            "key": "lamp",
            "meaningVi": "cái đèn"
          },
          {
            "key": "table",
            "meaningVi": "cái bàn"
          },
          {
            "key": "here",
            "meaningVi": "ở đây"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The bathroom is <b>there</b>. The chair is <b>in</b> the bedroom. The lamp is <b>on</b> the desk.",
        "keywords": [
          {
            "key": "there",
            "meaningVi": "ở kia"
          },
          {
            "key": "in",
            "meaningVi": "ở trong"
          },
          {
            "key": "on",
            "meaningVi": "ở trên"
          }
        ]
      }
    ]
  },
  {
    "id": "u14",
    "number": 14,
    "icon": "🌳",
    "title": "MY BEDROOM",
    "titleVi": "Phòng ngủ của em",
    "words": [
      {
        "en": "bed",
        "ipa": "/bed/",
        "vi": "cái giường",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9B%8F%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a bed.",
        "trVi": "Tôi có thể nhìn thấy một cái giường.",
        "trAnswer": "I can see a bed.",
        "trKey": "bed"
      },
      {
        "en": "desk",
        "ipa": "/desk/",
        "vi": "cái bàn học",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AA%91%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a desk.",
        "trVi": "Tôi có thể nhìn thấy một cái bàn học.",
        "trAnswer": "I can see a desk.",
        "trKey": "desk"
      },
      {
        "en": "door",
        "ipa": "/dɔː(r)/",
        "vi": "cánh cửa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%AA%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a door.",
        "trVi": "Tôi có thể nhìn thấy một cánh cửa.",
        "trAnswer": "I can see a door.",
        "trKey": "door"
      },
      {
        "en": "window",
        "ipa": "/ˈwɪndəʊ/",
        "vi": "cửa sổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AA%9F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a window.",
        "trVi": "Tôi có thể nhìn thấy một cửa sổ.",
        "trAnswer": "I can see a window.",
        "trKey": "window"
      },
      {
        "en": "room",
        "ipa": "/ruːm/",
        "vi": "căn phòng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%92%BB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "This is my room.",
        "trVi": "Đây là phòng của tôi.",
        "trAnswer": "This is my room.",
        "trKey": "room"
      },
      {
        "en": "big",
        "ipa": "/bɪɡ/",
        "vi": "to",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My bed is big.",
        "trVi": "Giường của tôi to.",
        "trAnswer": "My bed is big.",
        "trKey": "big"
      },
      {
        "en": "small",
        "ipa": "/smɔːl/",
        "vi": "nhỏ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My room is small.",
        "trVi": "Phòng của tôi nhỏ.",
        "trAnswer": "My room is small.",
        "trKey": "small"
      },
      {
        "en": "new",
        "ipa": "/njuː/",
        "vi": "mới",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My desk is new.",
        "trVi": "Bàn học của tôi mới.",
        "trAnswer": "My desk is new.",
        "trKey": "new"
      },
      {
        "en": "old",
        "ipa": "/əʊld/",
        "vi": "cũ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "My chair is old.",
        "trVi": "Ghế của tôi cũ.",
        "trAnswer": "My chair is old.",
        "trKey": "old"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 14
    },
    "story": {
      "title": "My Bedroom",
      "titleVi": "Phòng ngủ của em",
      "text": "I can see a bed.<br>I can see a desk.<br>I can see a door.<br>I can see a window.<br>This is my room.<br>My bed is big.<br>My room is small.<br>My desk is new.<br>My chair is old.",
      "textVi": "Tôi có thể nhìn thấy một cái giường.<br>Tôi có thể nhìn thấy một cái bàn học.<br>Tôi có thể nhìn thấy một cánh cửa.<br>Tôi có thể nhìn thấy một cửa sổ.<br>Đây là phòng của tôi.<br>Giường của tôi to.<br>Phòng của tôi nhỏ.<br>Bàn học của tôi mới.<br>Ghế của tôi cũ.",
      "used": [
        "bed",
        "desk",
        "door",
        "window",
        "room",
        "big",
        "small",
        "new",
        "old"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I can see a <b>bed</b>. I can see a <b>desk</b>.",
        "keywords": [
          {
            "key": "bed",
            "meaningVi": "cái giường"
          },
          {
            "key": "desk",
            "meaningVi": "cái bàn học"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I can see a <b>door</b>. I can see a <b>window</b>.",
        "keywords": [
          {
            "key": "door",
            "meaningVi": "cánh cửa"
          },
          {
            "key": "window",
            "meaningVi": "cửa sổ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "This is my <b>room</b>. My bed is <b>big</b>.",
        "keywords": [
          {
            "key": "room",
            "meaningVi": "căn phòng"
          },
          {
            "key": "big",
            "meaningVi": "to"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "My room is <b>small</b>. My desk is <b>new</b>. My chair is <b>old</b>.",
        "keywords": [
          {
            "key": "small",
            "meaningVi": "nhỏ"
          },
          {
            "key": "new",
            "meaningVi": "mới"
          },
          {
            "key": "old",
            "meaningVi": "cũ"
          }
        ]
      }
    ]
  },
  {
    "id": "u15",
    "number": 15,
    "icon": "⭐",
    "title": "AT THE DINING TABLE",
    "titleVi": "Ở bàn ăn",
    "words": [
      {
        "en": "beans",
        "ipa": "/biːnz/",
        "vi": "đậu",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AB%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some beans.",
        "trVi": "Tôi muốn một ít đậu.",
        "trAnswer": "I would like some beans.",
        "trKey": "beans"
      },
      {
        "en": "bread",
        "ipa": "/bred/",
        "vi": "bánh mì",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A5%96%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some bread.",
        "trVi": "Tôi muốn một ít bánh mì.",
        "trAnswer": "I would like some bread.",
        "trKey": "bread"
      },
      {
        "en": "chicken",
        "ipa": "/ˈtʃɪkɪn/",
        "vi": "thịt gà",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8D%97%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some chicken.",
        "trVi": "Tôi muốn một ít thịt gà.",
        "trAnswer": "I would like some chicken.",
        "trKey": "chicken"
      },
      {
        "en": "eggs",
        "ipa": "/eɡz/",
        "vi": "trứng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A5%9A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some eggs.",
        "trVi": "Tôi muốn một ít trứng.",
        "trAnswer": "I would like some eggs.",
        "trKey": "eggs"
      },
      {
        "en": "fish",
        "ipa": "/fɪʃ/",
        "vi": "cá",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%9F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some fish.",
        "trVi": "Tôi muốn một ít cá.",
        "trAnswer": "I would like some fish.",
        "trKey": "fish"
      },
      {
        "en": "juice",
        "ipa": "/dʒuːs/",
        "vi": "nước ép",
        "img": "assets/vocab/grade4/u4/juice.webp",
        "ex": "I would like some juice.",
        "trVi": "Tôi muốn một ít nước ép.",
        "trAnswer": "I would like some juice.",
        "trKey": "juice"
      },
      {
        "en": "meat",
        "ipa": "/miːt/",
        "vi": "thịt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some meat.",
        "trVi": "Tôi muốn một ít thịt.",
        "trAnswer": "I would like some meat.",
        "trKey": "meat"
      },
      {
        "en": "milk",
        "ipa": "/mɪlk/",
        "vi": "sữa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A5%9B%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some milk.",
        "trVi": "Tôi muốn một ít sữa.",
        "trAnswer": "I would like some milk.",
        "trKey": "milk"
      },
      {
        "en": "rice",
        "ipa": "/raɪs/",
        "vi": "cơm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8D%9A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I would like some rice.",
        "trVi": "Tôi muốn một ít cơm.",
        "trAnswer": "I would like some rice.",
        "trKey": "rice"
      },
      {
        "en": "water",
        "ipa": "/ˈwɔːtə(r)/",
        "vi": "nước",
        "img": "assets/vocab/grade4/u4/water.webp",
        "ex": "I would like some water.",
        "trVi": "Tôi muốn một ít nước.",
        "trAnswer": "I would like some water.",
        "trKey": "water"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 15
    },
    "story": {
      "title": "At The Dining Table",
      "titleVi": "Ở bàn ăn",
      "text": "I would like some beans.<br>I would like some bread.<br>I would like some chicken.<br>I would like some eggs.<br>I would like some fish.<br>I would like some juice.<br>I would like some meat.<br>I would like some milk.<br>I would like some rice.<br>I would like some water.",
      "textVi": "Tôi muốn một ít đậu.<br>Tôi muốn một ít bánh mì.<br>Tôi muốn một ít thịt gà.<br>Tôi muốn một ít trứng.<br>Tôi muốn một ít cá.<br>Tôi muốn một ít nước ép.<br>Tôi muốn một ít thịt.<br>Tôi muốn một ít sữa.<br>Tôi muốn một ít cơm.<br>Tôi muốn một ít nước.",
      "used": [
        "beans",
        "bread",
        "chicken",
        "eggs",
        "fish",
        "juice",
        "meat",
        "milk",
        "rice",
        "water"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I would like some <b>beans</b>. I would like some <b>bread</b>.",
        "keywords": [
          {
            "key": "beans",
            "meaningVi": "đậu"
          },
          {
            "key": "bread",
            "meaningVi": "bánh mì"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like some <b>chicken</b>. I would like some <b>eggs</b>. I would like some <b>fish</b>.",
        "keywords": [
          {
            "key": "chicken",
            "meaningVi": "thịt gà"
          },
          {
            "key": "eggs",
            "meaningVi": "trứng"
          },
          {
            "key": "fish",
            "meaningVi": "cá"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like some <b>juice</b>. I would like some <b>meat</b>.",
        "keywords": [
          {
            "key": "juice",
            "meaningVi": "nước ép"
          },
          {
            "key": "meat",
            "meaningVi": "thịt"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I would like some <b>milk</b>. I would like some <b>rice</b>. I would like some <b>water</b>.",
        "keywords": [
          {
            "key": "milk",
            "meaningVi": "sữa"
          },
          {
            "key": "rice",
            "meaningVi": "cơm"
          },
          {
            "key": "water",
            "meaningVi": "nước"
          }
        ]
      }
    ]
  },
  {
    "id": "u16",
    "number": 16,
    "icon": "📘",
    "title": "MY PETS",
    "titleVi": "Thú cưng của em",
    "words": [
      {
        "en": "bird",
        "ipa": "/bɜːd/",
        "vi": "con chim",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%A6%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a bird.",
        "trVi": "Tôi có một con chim.",
        "trAnswer": "I have a bird.",
        "trKey": "bird"
      },
      {
        "en": "cat",
        "ipa": "/kæt/",
        "vi": "con mèo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a cat.",
        "trVi": "Tôi có một con mèo.",
        "trAnswer": "I have a cat.",
        "trKey": "cat"
      },
      {
        "en": "dog",
        "ipa": "/dɒɡ/",
        "vi": "con chó",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%95%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a dog.",
        "trVi": "Tôi có một con chó.",
        "trAnswer": "I have a dog.",
        "trKey": "dog"
      },
      {
        "en": "goldfish",
        "ipa": "/ˈɡəʊldfɪʃ/",
        "vi": "con cá vàng",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%A0%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a goldfish.",
        "trVi": "Tôi có một con cá vàng.",
        "trAnswer": "I have a goldfish.",
        "trKey": "goldfish"
      },
      {
        "en": "parrot",
        "ipa": "/ˈpærət/",
        "vi": "con vẹt",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%9C%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a parrot.",
        "trVi": "Tôi có một con vẹt.",
        "trAnswer": "I have a parrot.",
        "trKey": "parrot"
      },
      {
        "en": "rabbit",
        "ipa": "/ˈræbɪt/",
        "vi": "con thỏ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%87%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a rabbit.",
        "trVi": "Tôi có một con thỏ.",
        "trAnswer": "I have a rabbit.",
        "trKey": "rabbit"
      },
      {
        "en": "many",
        "ipa": "/ˈmeni/",
        "vi": "nhiều",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "How many cats do you have?",
        "trVi": "Bạn có bao nhiêu con mèo?",
        "trAnswer": "How many cats do you have?",
        "trKey": "many"
      },
      {
        "en": "some",
        "ipa": "/sʌm/",
        "vi": "một vài",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have some birds.",
        "trVi": "Tôi có một vài con chim.",
        "trAnswer": "I have some birds.",
        "trKey": "some"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 16
    },
    "story": {
      "title": "My Pets",
      "titleVi": "Thú cưng của em",
      "text": "I have a bird.<br>I have a cat.<br>I have a dog.<br>I have a goldfish.<br>I have a parrot.<br>I have a rabbit.<br>How many cats do you have?<br>I have some birds.",
      "textVi": "Tôi có một con chim.<br>Tôi có một con mèo.<br>Tôi có một con chó.<br>Tôi có một con cá vàng.<br>Tôi có một con vẹt.<br>Tôi có một con thỏ.<br>Bạn có bao nhiêu con mèo?<br>Tôi có một vài con chim.",
      "used": [
        "bird",
        "cat",
        "dog",
        "goldfish",
        "parrot",
        "rabbit",
        "many",
        "some"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I have a <b>bird</b>. I have a <b>cat</b>.",
        "keywords": [
          {
            "key": "bird",
            "meaningVi": "con chim"
          },
          {
            "key": "cat",
            "meaningVi": "con mèo"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>dog</b>. I have a <b>goldfish</b>.",
        "keywords": [
          {
            "key": "dog",
            "meaningVi": "con chó"
          },
          {
            "key": "goldfish",
            "meaningVi": "con cá vàng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>parrot</b>. I have a <b>rabbit</b>.",
        "keywords": [
          {
            "key": "parrot",
            "meaningVi": "con vẹt"
          },
          {
            "key": "rabbit",
            "meaningVi": "con thỏ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "How <b>many</b> cats do you have? I have <b>some</b> birds.",
        "keywords": [
          {
            "key": "many",
            "meaningVi": "nhiều"
          },
          {
            "key": "some",
            "meaningVi": "một vài"
          }
        ]
      }
    ]
  },
  {
    "id": "u17",
    "number": 17,
    "icon": "🏫",
    "title": "OUR TOYS",
    "titleVi": "Đồ chơi của chúng mình",
    "words": [
      {
        "en": "bus",
        "ipa": "/bʌs/",
        "vi": "xe buýt đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%8C%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a bus.",
        "trVi": "Tôi có một xe buýt đồ chơi.",
        "trAnswer": "I have a bus.",
        "trKey": "bus"
      },
      {
        "en": "car",
        "ipa": "/kɑː(r)/",
        "vi": "xe ô tô đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%97%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a car.",
        "trVi": "Tôi có một xe ô tô đồ chơi.",
        "trAnswer": "I have a car.",
        "trKey": "car"
      },
      {
        "en": "kite",
        "ipa": "/kaɪt/",
        "vi": "cái diều",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%AA%81%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a kite.",
        "trVi": "Tôi có một cái diều.",
        "trAnswer": "I have a kite.",
        "trKey": "kite"
      },
      {
        "en": "plane",
        "ipa": "/pleɪn/",
        "vi": "máy bay đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%9C%88%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a plane.",
        "trVi": "Tôi có một máy bay đồ chơi.",
        "trAnswer": "I have a plane.",
        "trKey": "plane"
      },
      {
        "en": "ship",
        "ipa": "/ʃɪp/",
        "vi": "tàu thủy đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%A2%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a ship.",
        "trVi": "Tôi có một tàu thủy đồ chơi.",
        "trAnswer": "I have a ship.",
        "trKey": "ship"
      },
      {
        "en": "teddy bear",
        "ipa": "/ˈtedi beə(r)/",
        "vi": "con gấu bông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A7%B8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a teddy bear.",
        "trVi": "Tôi có một con gấu bông.",
        "trAnswer": "I have a teddy bear.",
        "trKey": "teddy bear"
      },
      {
        "en": "toy",
        "ipa": "/tɔɪ/",
        "vi": "món đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%AB%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a toy.",
        "trVi": "Tôi có một món đồ chơi.",
        "trAnswer": "I have a toy.",
        "trKey": "toy"
      },
      {
        "en": "train",
        "ipa": "/treɪn/",
        "vi": "tàu hỏa đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%82%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a train.",
        "trVi": "Tôi có một tàu hỏa đồ chơi.",
        "trAnswer": "I have a train.",
        "trKey": "train"
      },
      {
        "en": "truck",
        "ipa": "/trʌk/",
        "vi": "xe tải đồ chơi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%9B%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I have a truck.",
        "trVi": "Tôi có một xe tải đồ chơi.",
        "trAnswer": "I have a truck.",
        "trKey": "truck"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 17
    },
    "story": {
      "title": "Our Toys",
      "titleVi": "Đồ chơi của chúng mình",
      "text": "I have a bus.<br>I have a car.<br>I have a kite.<br>I have a plane.<br>I have a ship.<br>I have a teddy bear.<br>I have a toy.<br>I have a train.<br>I have a truck.",
      "textVi": "Tôi có một xe buýt đồ chơi.<br>Tôi có một xe ô tô đồ chơi.<br>Tôi có một cái diều.<br>Tôi có một máy bay đồ chơi.<br>Tôi có một tàu thủy đồ chơi.<br>Tôi có một con gấu bông.<br>Tôi có một món đồ chơi.<br>Tôi có một tàu hỏa đồ chơi.<br>Tôi có một xe tải đồ chơi.",
      "used": [
        "bus",
        "car",
        "kite",
        "plane",
        "ship",
        "teddy bear",
        "toy",
        "train",
        "truck"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I have a <b>bus</b>. I have a <b>car</b>.",
        "keywords": [
          {
            "key": "bus",
            "meaningVi": "xe buýt đồ chơi"
          },
          {
            "key": "car",
            "meaningVi": "xe ô tô đồ chơi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>kite</b>. I have a <b>plane</b>.",
        "keywords": [
          {
            "key": "kite",
            "meaningVi": "cái diều"
          },
          {
            "key": "plane",
            "meaningVi": "máy bay đồ chơi"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>ship</b>. I have a <b>teddy bear</b>.",
        "keywords": [
          {
            "key": "ship",
            "meaningVi": "tàu thủy đồ chơi"
          },
          {
            "key": "teddy bear",
            "meaningVi": "con gấu bông"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I have a <b>toy</b>. I have a <b>train</b>. I have a <b>truck</b>.",
        "keywords": [
          {
            "key": "toy",
            "meaningVi": "món đồ chơi"
          },
          {
            "key": "train",
            "meaningVi": "tàu hỏa đồ chơi"
          },
          {
            "key": "truck",
            "meaningVi": "xe tải đồ chơi"
          }
        ]
      }
    ]
  },
  {
    "id": "u18",
    "number": 18,
    "icon": "🌈",
    "title": "PLAYING AND DOING",
    "titleVi": "Chơi và hoạt động",
    "words": [
      {
        "en": "dancing",
        "ipa": "/ˈdɑːnsɪŋ/",
        "vi": "nhảy múa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am dancing.",
        "trVi": "Tôi đang nhảy múa.",
        "trAnswer": "I am dancing.",
        "trKey": "dancing"
      },
      {
        "en": "drawing a picture",
        "ipa": "/ˈdrɔːɪŋ ə ˈpɪktʃər/",
        "vi": "vẽ một bức tranh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am drawing a picture.",
        "trVi": "Tôi đang vẽ một bức tranh.",
        "trAnswer": "I am drawing a picture.",
        "trKey": "drawing a picture"
      },
      {
        "en": "listening to music",
        "ipa": "/ˈlɪsənɪŋ tə ˈmjuːzɪk/",
        "vi": "nghe nhạc",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am listening to music.",
        "trVi": "Tôi đang nghe nhạc.",
        "trAnswer": "I am listening to music.",
        "trKey": "listening to music"
      },
      {
        "en": "playing basketball",
        "ipa": "/ˈpleɪɪŋ ˈbɑːskɪtbɔːl/",
        "vi": "chơi bóng rổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am playing basketball.",
        "trVi": "Tôi đang chơi bóng rổ.",
        "trAnswer": "I am playing basketball.",
        "trKey": "playing basketball"
      },
      {
        "en": "reading",
        "ipa": "/ˈriːdɪŋ/",
        "vi": "đọc sách",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%93%96%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am reading.",
        "trVi": "Tôi đang đọc sách.",
        "trAnswer": "I am reading.",
        "trKey": "reading"
      },
      {
        "en": "singing",
        "ipa": "/ˈsɪŋɪŋ/",
        "vi": "ca hát",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A4%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am singing.",
        "trVi": "Tôi đang ca hát.",
        "trAnswer": "I am singing.",
        "trKey": "singing"
      },
      {
        "en": "watching TV",
        "ipa": "/ˈwɒtʃɪŋ ˌtiː ˈviː/",
        "vi": "xem ti vi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am watching TV.",
        "trVi": "Tôi đang xem ti vi.",
        "trAnswer": "I am watching TV.",
        "trKey": "watching tv"
      },
      {
        "en": "writing",
        "ipa": "/ˈraɪtɪŋ/",
        "vi": "viết",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%88%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am writing.",
        "trVi": "Tôi đang viết.",
        "trAnswer": "I am writing.",
        "trKey": "writing"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 18
    },
    "story": {
      "title": "Playing And Doing",
      "titleVi": "Chơi và hoạt động",
      "text": "I am dancing.<br>I am drawing a picture.<br>I am listening to music.<br>I am playing basketball.<br>I am reading.<br>I am singing.<br>I am watching TV.<br>I am writing.",
      "textVi": "Tôi đang nhảy múa.<br>Tôi đang vẽ một bức tranh.<br>Tôi đang nghe nhạc.<br>Tôi đang chơi bóng rổ.<br>Tôi đang đọc sách.<br>Tôi đang ca hát.<br>Tôi đang xem ti vi.<br>Tôi đang viết.",
      "used": [
        "dancing",
        "drawing a picture",
        "listening to music",
        "playing basketball",
        "reading",
        "singing",
        "watching TV",
        "writing"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I am <b>dancing</b>. I am <b>drawing a picture</b>.",
        "keywords": [
          {
            "key": "dancing",
            "meaningVi": "nhảy múa"
          },
          {
            "key": "drawing a picture",
            "meaningVi": "vẽ một bức tranh"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>listening to music</b>. I am <b>playing basketball</b>.",
        "keywords": [
          {
            "key": "listening to music",
            "meaningVi": "nghe nhạc"
          },
          {
            "key": "playing basketball",
            "meaningVi": "chơi bóng rổ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>reading</b>. I am <b>singing</b>.",
        "keywords": [
          {
            "key": "reading",
            "meaningVi": "đọc sách"
          },
          {
            "key": "singing",
            "meaningVi": "ca hát"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>watching TV</b>. I am <b>writing</b>.",
        "keywords": [
          {
            "key": "watching tv",
            "meaningVi": "xem ti vi"
          },
          {
            "key": "writing",
            "meaningVi": "viết"
          }
        ]
      }
    ]
  },
  {
    "id": "u19",
    "number": 19,
    "icon": "🌳",
    "title": "OUTDOOR ACTIVITIES",
    "titleVi": "Hoạt động ngoài trời",
    "words": [
      {
        "en": "cycling",
        "ipa": "/ˈsaɪklɪŋ/",
        "vi": "đi xe đạp",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%9A%B2%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am cycling.",
        "trVi": "Tôi đang đi xe đạp.",
        "trAnswer": "I am cycling.",
        "trKey": "cycling"
      },
      {
        "en": "flying a kite",
        "ipa": "/ˈflaɪɪŋ ə kaɪt/",
        "vi": "thả diều",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am flying a kite.",
        "trVi": "Tôi đang thả diều.",
        "trAnswer": "I am flying a kite.",
        "trKey": "flying a kite"
      },
      {
        "en": "painting",
        "ipa": "/ˈpeɪntɪŋ/",
        "vi": "vẽ tranh",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8E%A8%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am painting.",
        "trVi": "Tôi đang vẽ tranh.",
        "trAnswer": "I am painting.",
        "trKey": "painting"
      },
      {
        "en": "playing badminton",
        "ipa": "/ˈpleɪɪŋ ˈbædmɪntən/",
        "vi": "chơi cầu lông",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am playing badminton.",
        "trVi": "Tôi đang chơi cầu lông.",
        "trAnswer": "I am playing badminton.",
        "trKey": "playing badminton"
      },
      {
        "en": "running",
        "ipa": "/ˈrʌnɪŋ/",
        "vi": "chạy bộ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8F%83%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am running.",
        "trVi": "Tôi đang chạy bộ.",
        "trAnswer": "I am running.",
        "trKey": "running"
      },
      {
        "en": "skating",
        "ipa": "/ˈskeɪtɪŋ/",
        "vi": "trượt patin",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am skating.",
        "trVi": "Tôi đang trượt patin.",
        "trAnswer": "I am skating.",
        "trKey": "skating"
      },
      {
        "en": "skipping",
        "ipa": "/ˈskɪpɪŋ/",
        "vi": "nhảy dây",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am skipping.",
        "trVi": "Tôi đang nhảy dây.",
        "trAnswer": "I am skipping.",
        "trKey": "skipping"
      },
      {
        "en": "walking",
        "ipa": "/ˈwɔːkɪŋ/",
        "vi": "đi bộ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%8C%B3%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I am walking.",
        "trVi": "Tôi đang đi bộ.",
        "trAnswer": "I am walking.",
        "trKey": "walking"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 19
    },
    "story": {
      "title": "Outdoor Activities",
      "titleVi": "Hoạt động ngoài trời",
      "text": "I am cycling.<br>I am flying a kite.<br>I am painting.<br>I am playing badminton.<br>I am running.<br>I am skating.<br>I am skipping.<br>I am walking.",
      "textVi": "Tôi đang đi xe đạp.<br>Tôi đang thả diều.<br>Tôi đang vẽ tranh.<br>Tôi đang chơi cầu lông.<br>Tôi đang chạy bộ.<br>Tôi đang trượt patin.<br>Tôi đang nhảy dây.<br>Tôi đang đi bộ.",
      "used": [
        "cycling",
        "flying a kite",
        "painting",
        "playing badminton",
        "running",
        "skating",
        "skipping",
        "walking"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I am <b>cycling</b>. I am <b>flying a kite</b>.",
        "keywords": [
          {
            "key": "cycling",
            "meaningVi": "đi xe đạp"
          },
          {
            "key": "flying a kite",
            "meaningVi": "thả diều"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>painting</b>. I am <b>playing badminton</b>.",
        "keywords": [
          {
            "key": "painting",
            "meaningVi": "vẽ tranh"
          },
          {
            "key": "playing badminton",
            "meaningVi": "chơi cầu lông"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>running</b>. I am <b>skating</b>.",
        "keywords": [
          {
            "key": "running",
            "meaningVi": "chạy bộ"
          },
          {
            "key": "skating",
            "meaningVi": "trượt patin"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I am <b>skipping</b>. I am <b>walking</b>.",
        "keywords": [
          {
            "key": "skipping",
            "meaningVi": "nhảy dây"
          },
          {
            "key": "walking",
            "meaningVi": "đi bộ"
          }
        ]
      }
    ]
  },
  {
    "id": "u20",
    "number": 20,
    "icon": "⭐",
    "title": "AT THE ZOO",
    "titleVi": "Ở sở thú",
    "words": [
      {
        "en": "elephant",
        "ipa": "/ˈelɪfənt/",
        "vi": "con voi",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%98%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see an elephant.",
        "trVi": "Tôi có thể nhìn thấy một con voi.",
        "trAnswer": "I can see an elephant.",
        "trKey": "elephant"
      },
      {
        "en": "horse",
        "ipa": "/hɔːs/",
        "vi": "con ngựa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%8E%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a horse.",
        "trVi": "Tôi có thể nhìn thấy một con ngựa.",
        "trAnswer": "I can see a horse.",
        "trKey": "horse"
      },
      {
        "en": "monkey",
        "ipa": "/ˈmʌŋki/",
        "vi": "con khỉ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%92%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a monkey.",
        "trVi": "Tôi có thể nhìn thấy một con khỉ.",
        "trAnswer": "I can see a monkey.",
        "trKey": "monkey"
      },
      {
        "en": "peacock",
        "ipa": "/ˈpiːkɒk/",
        "vi": "con công",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%A6%9A%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a peacock.",
        "trVi": "Tôi có thể nhìn thấy một con công.",
        "trAnswer": "I can see a peacock.",
        "trKey": "peacock"
      },
      {
        "en": "tiger",
        "ipa": "/ˈtaɪɡə(r)/",
        "vi": "con hổ",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%F0%9F%90%85%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "I can see a tiger.",
        "trVi": "Tôi có thể nhìn thấy một con hổ.",
        "trAnswer": "I can see a tiger.",
        "trKey": "tiger"
      },
      {
        "en": "climbing",
        "ipa": "/ˈklaɪmɪŋ/",
        "vi": "leo trèo",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The monkey is climbing.",
        "trVi": "Con khỉ đang leo trèo.",
        "trAnswer": "The monkey is climbing.",
        "trKey": "climbing"
      },
      {
        "en": "counting",
        "ipa": "/ˈkaʊntɪŋ/",
        "vi": "đếm",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The parrot is counting.",
        "trVi": "Con vẹt đang đếm.",
        "trAnswer": "The parrot is counting.",
        "trKey": "counting"
      },
      {
        "en": "dancing",
        "ipa": "/ˈdɑːnsɪŋ/",
        "vi": "nhảy múa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The peacock is dancing.",
        "trVi": "Con công đang múa.",
        "trAnswer": "The peacock is dancing.",
        "trKey": "dancing"
      },
      {
        "en": "swinging",
        "ipa": "/ˈswɪŋɪŋ/",
        "vi": "đu đưa",
        "img": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22480%22%20height%3D%22320%22%20viewBox%3D%220%200%20480%20320%22%3E%3Crect%20width%3D%22480%22%20height%3D%22320%22%20rx%3D%2224%22%20fill%3D%22%23edf7ff%22%2F%3E%3Ccircle%20cx%3D%22240%22%20cy%3D%22155%22%20r%3D%22115%22%20fill%3D%22%23fff%22%2F%3E%3Ctext%20x%3D%22240%22%20y%3D%22205%22%20text-anchor%3D%22middle%22%20font-size%3D%22132%22%20font-family%3D%22Apple%20Color%20Emoji%2CSegoe%20UI%20Emoji%2CNoto%20Color%20Emoji%2Csans-serif%22%3E%E2%AD%90%3C%2Ftext%3E%3C%2Fsvg%3E",
        "ex": "The monkey is swinging.",
        "trVi": "Con khỉ đang đu đưa.",
        "trAnswer": "The monkey is swinging.",
        "trKey": "swinging"
      }
    ],
    "source": {
      "series": "Global Success",
      "grade": 3,
      "volume": 2,
      "unit": 20
    },
    "story": {
      "title": "At The Zoo",
      "titleVi": "Ở sở thú",
      "text": "I can see an elephant.<br>I can see a horse.<br>I can see a monkey.<br>I can see a peacock.<br>I can see a tiger.<br>The monkey is climbing.<br>The parrot is counting.<br>The peacock is dancing.<br>The monkey is swinging.",
      "textVi": "Tôi có thể nhìn thấy một con voi.<br>Tôi có thể nhìn thấy một con ngựa.<br>Tôi có thể nhìn thấy một con khỉ.<br>Tôi có thể nhìn thấy một con công.<br>Tôi có thể nhìn thấy một con hổ.<br>Con khỉ đang leo trèo.<br>Con vẹt đang đếm.<br>Con công đang múa.<br>Con khỉ đang đu đưa.",
      "used": [
        "elephant",
        "horse",
        "monkey",
        "peacock",
        "tiger",
        "climbing",
        "counting",
        "dancing",
        "swinging"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "I can see an <b>elephant</b>. I can see a <b>horse</b>.",
        "keywords": [
          {
            "key": "elephant",
            "meaningVi": "con voi"
          },
          {
            "key": "horse",
            "meaningVi": "con ngựa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I can see a <b>monkey</b>. I can see a <b>peacock</b>.",
        "keywords": [
          {
            "key": "monkey",
            "meaningVi": "con khỉ"
          },
          {
            "key": "peacock",
            "meaningVi": "con công"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "I can see a <b>tiger</b>. The monkey is <b>climbing</b>.",
        "keywords": [
          {
            "key": "tiger",
            "meaningVi": "con hổ"
          },
          {
            "key": "climbing",
            "meaningVi": "leo trèo"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The parrot is <b>counting</b>. The peacock is <b>dancing</b>. The monkey is <b>swinging</b>.",
        "keywords": [
          {
            "key": "counting",
            "meaningVi": "đếm"
          },
          {
            "key": "dancing",
            "meaningVi": "nhảy múa"
          },
          {
            "key": "swinging",
            "meaningVi": "đu đưa"
          }
        ]
      }
    ]
  }
];
