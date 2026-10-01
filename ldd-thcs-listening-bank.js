/* THCS listening: one source recording paired with its own ordered question set.
 * Only answer choices may be shuffled. Source transcripts stay out of the student UI.
 */
(function () {
  'use strict';
  const curriculum = window.LDD_LISTENING_CURRICULUM;
  if (!curriculum) return;
  const bank = [
  {
    "id": "g6-u01-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 1,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 1 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/u1-getting-started-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/u1-getting-started-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Duy, my new ____. Hi, Duy. Nice”.",
        "options": [
          "basketball",
          "rain",
          "friend",
          "club"
        ],
        "answer": 2,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “Good. Hmm, your ____ bag looks heavy”.",
        "options": [
          "library",
          "store",
          "town",
          "school"
        ],
        "answer": 3,
        "sourceWordIndex": 39
      },
      {
        "text": "Chọn từ nghe được: “We always look ____ in our uniforms”.",
        "options": [
          "traditional",
          "patient",
          "smart",
          "important"
        ],
        "answer": 2,
        "sourceWordIndex": 68
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-6-unit-1-sgk-tieng-anh-6-moi-c134a21998.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u01-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 1,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 1 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Duy, my new ____. Hi, Duy. Nice”.",
        "options": [
          "holiday",
          "friend",
          "stress",
          "television"
        ],
        "answer": 1,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “Duy. Nice to ____ you. Hi, Phong”.",
        "options": [
          "meet",
          "draw",
          "write",
          "stay"
        ],
        "answer": 0,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “you. Hi, Phong. ____ to meet you”.",
        "options": [
          "Health",
          "Nice",
          "Computer",
          "Evening"
        ],
        "answer": 1,
        "sourceWordIndex": 15
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-11-unit-1-sgk-tieng-anh-6-moi-c134a22001.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u01-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 1,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 1 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/ex1-1-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0607/ex1-1-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “6 at Palmer ____. I like it”.",
        "options": [
          "Island",
          "Office",
          "School",
          "World"
        ],
        "answer": 2,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “She teaches us ____. I have two”.",
        "options": [
          "webcam",
          "maths",
          "habit",
          "health"
        ],
        "answer": 1,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “homework in the ____. We wear our”.",
        "options": [
          "mountain",
          "street",
          "library",
          "store"
        ],
        "answer": 2,
        "sourceWordIndex": 61
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-13-unit-1-sgk-tieng-anh-6-moi-c134a22004.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u02-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 2,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 2 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Nick. It's Elena's ____. She's my sister”.",
        "options": [
          "room",
          "school",
          "shop",
          "island"
        ],
        "answer": 0,
        "sourceWordIndex": 9
      },
      {
        "text": "Chọn từ nghe được: “live with? My ____ and younger brother”.",
        "options": [
          "buildings",
          "skills",
          "parents",
          "teachers"
        ],
        "answer": 2,
        "sourceWordIndex": 49
      },
      {
        "text": "Chọn từ nghe được: “are. There's a ____ room, three bedrooms”.",
        "options": [
          "cooking",
          "building",
          "living",
          "making"
        ],
        "answer": 2,
        "sourceWordIndex": 88
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-16-unit-2-sgk-tieng-anh-6-moi-c134a22007.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u02-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 2,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 2 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act1-1-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act1-1-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “My bedroom isn't ____. How about putting”.",
        "options": [
          "club",
          "geography",
          "light",
          "nice"
        ],
        "answer": 3,
        "sourceWordIndex": 3
      },
      {
        "text": "Chọn từ nghe được: “picture on the ____? Great idea, Mum”.",
        "options": [
          "wall",
          "suitcase",
          "life",
          "phone"
        ],
        "answer": 0,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “to the department ____ to buy one”.",
        "options": [
          "store",
          "airport",
          "street",
          "mountain"
        ],
        "answer": 0,
        "sourceWordIndex": 20
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-20-unit-2-sgk-tieng-anh-6-moi-c134a22013.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u02-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 2,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 2 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act2.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0608/act2.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “live with my ____. There are six”.",
        "options": [
          "languages",
          "flowers",
          "parents",
          "questions"
        ],
        "answer": 2,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “love our living ____ the best because”.",
        "options": [
          "town",
          "room",
          "mountain",
          "sea"
        ],
        "answer": 1,
        "sourceWordIndex": 38
      },
      {
        "text": "Chọn từ nghe được: “the wall. I ____ read books in”.",
        "options": [
          "often",
          "sometimes",
          "quickly",
          "frequently"
        ],
        "answer": 0,
        "sourceWordIndex": 81
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-23-unit-2-sgk-tieng-anh-6-moi-c134a22015.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u03-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 3,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 3 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “What are you ____, Phong? 4Teen”.",
        "options": [
          "making",
          "reading",
          "doing",
          "building"
        ],
        "answer": 1,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “glasses and long ____ hair. I don't”.",
        "options": [
          "grey",
          "yellow",
          "black",
          "blue"
        ],
        "answer": 2,
        "sourceWordIndex": 46
      },
      {
        "text": "Chọn từ nghe được: “have lots of ____. Oh, sorry, we”.",
        "options": [
          "stress",
          "food",
          "computer",
          "life"
        ],
        "answer": 1,
        "sourceWordIndex": 84
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-26-unit-3-sgk-tieng-anh-6-moi-c134a22022.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u03-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 3,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 3 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-1-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-1-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “does your best ____ look like? She's”.",
        "options": [
          "entrance",
          "friend",
          "breakfast",
          "rain"
        ],
        "answer": 1,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “short with long ____ hair. She has”.",
        "options": [
          "white",
          "grey",
          "black",
          "red"
        ],
        "answer": 2,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “she like? She's very ____ and creative”.",
        "options": [
          "kind",
          "excellent",
          "noisy",
          "jealous"
        ],
        "answer": 0,
        "sourceWordIndex": 23
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-30-unit-3-sgk-tieng-anh-6-moi-c134a22025.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u03-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 3,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 3 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act2.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act2.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “She has short ____ hair and a”.",
        "options": [
          "black",
          "red",
          "blue",
          "purple"
        ],
        "answer": 0,
        "sourceWordIndex": 20
      },
      {
        "text": "Chọn từ nghe được: “is my best ____. We're in class”.",
        "options": [
          "earth",
          "space",
          "friend",
          "graveyard"
        ],
        "answer": 2,
        "sourceWordIndex": 49
      },
      {
        "text": "Chọn từ nghe được: “also hard-working. She ____ does her homework”.",
        "options": [
          "usually",
          "quickly",
          "always",
          "probably"
        ],
        "answer": 2,
        "sourceWordIndex": 83
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-33-unit-3-sgk-tieng-anh-6-moi-c134a22041.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u04-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 4,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 4 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0720/20201130-tienganh6-kntt-b1-23.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0720/20201130-tienganh6-kntt-b1-23.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “too. It's so ____. Where shall we”.",
        "options": [
          "confident",
          "clean",
          "beautiful",
          "difficult"
        ],
        "answer": 2,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “and then turn ____. Fine, let's go”.",
        "options": [
          "left",
          "called",
          "gave",
          "helped"
        ],
        "answer": 0,
        "sourceWordIndex": 46
      },
      {
        "text": "Chọn từ nghe được: “to Tan Ky ____? Sure. Go straight”.",
        "options": [
          "Station",
          "Town",
          "World",
          "House"
        ],
        "answer": 3,
        "sourceWordIndex": 76
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-38-unit-4-sgk-tieng-anh-6-moi-c134a22068.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u04-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 4,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 4 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-2-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-2-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “way to the ____, please? Go along”.",
        "options": [
          "cinema",
          "museum",
          "airport",
          "world"
        ],
        "answer": 0,
        "sourceWordIndex": 10
      },
      {
        "text": "Chọn từ nghe được: “It's on your ____. Excuse me. Where's”.",
        "options": [
          "found",
          "left",
          "knew",
          "brought"
        ],
        "answer": 1,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “out of the ____. Take the first”.",
        "options": [
          "station",
          "airport",
          "road",
          "community"
        ],
        "answer": 0,
        "sourceWordIndex": 32
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-43-unit-4-sgk-tieng-anh-6-moi-c134a22079.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u04-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 4,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 4 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-3-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0610/act1-3-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Ho Chi Minh ____. What do you”.",
        "options": [
          "Forest",
          "Street",
          "Village",
          "City"
        ],
        "answer": 3,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “restaurants and art ____ here. The streets”.",
        "options": [
          "parents",
          "games",
          "houses",
          "galleries"
        ],
        "answer": 3,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “air isn't very ____ and the streets”.",
        "options": [
          "clean",
          "careful",
          "boring",
          "smart"
        ],
        "answer": 0,
        "sourceWordIndex": 80
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-45-unit-4-sgk-tieng-anh-6-moi-c134a22090.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u05-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 5,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 5 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-4-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-4-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “remember you must ____ be on time”.",
        "options": [
          "recently",
          "usually",
          "always",
          "frequently"
        ],
        "answer": 2,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “first picture? It's ____ Da Dia in”.",
        "options": [
          "Health",
          "Food",
          "Geography",
          "Ganh"
        ],
        "answer": 3,
        "sourceWordIndex": 43
      },
      {
        "text": "Chọn từ nghe được: “Chau, a large ____. How about picture”.",
        "options": [
          "country",
          "island",
          "library",
          "street"
        ],
        "answer": 1,
        "sourceWordIndex": 82
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-48-unit-5-sgk-tieng-anh-6-moi-c134a22096.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u05-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 5,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 5 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-5-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-5-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “a picnic this ____. That's fine. What”.",
        "options": [
          "Monday",
          "Wednesday",
          "Tuesday",
          "Sunday"
        ],
        "answer": 3,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “time can we ____? How about 9”.",
        "options": [
          "write",
          "shop",
          "meet",
          "love"
        ],
        "answer": 2,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “9 o'clock? Sure. ____ meet you at”.",
        "options": [
          "I'll",
          "Weather",
          "Evening",
          "Year"
        ],
        "answer": 0,
        "sourceWordIndex": 20
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-53-unit-5-sgk-tieng-anh-6-moi-c134a22102.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u05-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 5,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 5 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-6-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-6-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Giang. It has ____ beaches and green”.",
        "options": [
          "expensive",
          "different",
          "clean",
          "beautiful"
        ],
        "answer": 3,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “international airport, and ____ there is easy”.",
        "options": [
          "talking",
          "travelling",
          "learning",
          "helping"
        ],
        "answer": 1,
        "sourceWordIndex": 41
      },
      {
        "text": "Chọn từ nghe được: “fishing are popular ____ sports. You can”.",
        "options": [
          "space",
          "wind",
          "history",
          "water"
        ],
        "answer": 3,
        "sourceWordIndex": 71
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-55-unit-5-sgk-tieng-anh-6-moi-c134a22106.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u06-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 6,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 6 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-7-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-7-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “is Tet? At ____ times. This year”.",
        "options": [
          "different",
          "friendly",
          "busy",
          "healthy"
        ],
        "answer": 0,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “a time for ____ gatherings? Yes. It's”.",
        "options": [
          "science",
          "family",
          "breakfast",
          "eyes"
        ],
        "answer": 1,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “We should say \"____ New Year\" when”.",
        "options": [
          "Important",
          "Happy",
          "Clever",
          "Shy"
        ],
        "answer": 1,
        "sourceWordIndex": 80
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-58-unit-6-sgk-tieng-anh-6-moi-c134a22118.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u06-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 6,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 6 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Happy ____”.",
        "options": [
          "New",
          "Old",
          "Small",
          "Long"
        ],
        "answer": 0,
        "sourceWordIndex": 0
      },
      {
        "text": "Chọn từ nghe được: “joy and ____”.",
        "options": [
          "laughter",
          "silence",
          "sadness",
          "anger"
        ],
        "answer": 0,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “January to ____”.",
        "options": [
          "December",
          "September",
          "June",
          "March"
        ],
        "answer": 0,
        "sourceWordIndex": 8
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-63-unit-6-sgk-tieng-anh-6-moi-c134a22133.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u06-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 6,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 6 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-1-.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/0611/act1-1-.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and I'm very ____. We do a”.",
        "options": [
          "popular",
          "beautiful",
          "happy",
          "responsible"
        ],
        "answer": 2,
        "sourceWordIndex": 8
      },
      {
        "text": "Chọn từ nghe được: “envelopes, and peach ____. She also buys”.",
        "options": [
          "flowers",
          "services",
          "sports",
          "families"
        ],
        "answer": 0,
        "sourceWordIndex": 40
      },
      {
        "text": "Chọn từ nghe được: “should make some ____ at Tet, and”.",
        "options": [
          "films",
          "trees",
          "festivals",
          "wishes"
        ],
        "answer": 3,
        "sourceWordIndex": 67
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-65-unit-6-sgk-tieng-anh-6-moi-c134a22137.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u07-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 7,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 7 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1111/u7-getting-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1111/u7-getting-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “show is very ____. It is. What”.",
        "options": [
          "interesting",
          "popular",
          "funny",
          "expensive"
        ],
        "answer": 0,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “wonderful. I often ____ them with my”.",
        "options": [
          "work",
          "watch",
          "write",
          "build"
        ],
        "answer": 1,
        "sourceWordIndex": 41
      },
      {
        "text": "Chọn từ nghe được: “Yes. I watch ____ in a Minute”.",
        "options": [
          "Space",
          "Pollution",
          "English",
          "Stress"
        ],
        "answer": 2,
        "sourceWordIndex": 77
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-6-unit-7-sgk-tieng-anh-6-moi-c134a22501.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u07-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 7,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 7 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u7-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u7-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “your favourite TV ____? The animal programme”.",
        "options": [
          "habit",
          "technology",
          "programme",
          "graveyard"
        ],
        "answer": 2,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “you like it? ____ I can see”.",
        "options": [
          "Holiday",
          "Laptop",
          "Because",
          "Food"
        ],
        "answer": 2,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “can see the ____ in their real”.",
        "options": [
          "festivals",
          "materials",
          "animals",
          "activities"
        ],
        "answer": 2,
        "sourceWordIndex": 18
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-11-unit-7-sgk-tieng-anh-6-moi-c134a22506.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u07-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 7,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 7 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u7-skills-2-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u7-skills-2-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “It starts at ____ o'clock. My Childhood”.",
        "options": [
          "thousand",
          "four",
          "two",
          "eight"
        ],
        "answer": 3,
        "sourceWordIndex": 20
      },
      {
        "text": "Chọn từ nghe được: “3, you will ____ Harry Potter at”.",
        "options": [
          "change",
          "watch",
          "work",
          "talk"
        ],
        "answer": 1,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “1. It's at ____ o'clock. We hope”.",
        "options": [
          "nine",
          "twelve",
          "five",
          "one"
        ],
        "answer": 0,
        "sourceWordIndex": 76
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-13-unit-7-sgk-tieng-anh-6-moi-c134a22508.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u08-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 8,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 8 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0427/tieng-anh-6-tap-2-global-success-unit-8-sports-and-games-getting-started-1-listen-and-read-sach-mem.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0427/tieng-anh-6-tap-2-global-success-unit-8-sports-and-games-getting-started-1-listen-and-read-sach-mem.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “karate, and I ____ table tennis. Yesterday”.",
        "options": [
          "improve",
          "play",
          "live",
          "mean"
        ],
        "answer": 1,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “to the karate ____ with me. No”.",
        "options": [
          "club",
          "football",
          "noise",
          "afternoon"
        ],
        "answer": 0,
        "sourceWordIndex": 52
      },
      {
        "text": "Chọn từ nghe được: “a.m. on ____. Where's the club”.",
        "options": [
          "Tuesday",
          "Sunday",
          "Monday",
          "Saturday"
        ],
        "answer": 1,
        "sourceWordIndex": 79
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-16-unit-8-sgk-tieng-anh-6-moi-c134a22514.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u08-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 8,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 8 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u8-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u8-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I played table ____ with Duy, and”.",
        "options": [
          "wind",
          "tennis",
          "schoolyard",
          "volleyball"
        ],
        "answer": 1,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “for the first ____. Congratulations! Thank you”.",
        "options": [
          "comedy",
          "time",
          "suitcase",
          "money"
        ],
        "answer": 1,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “Mai. So you're our ____ champion now”.",
        "options": [
          "sports",
          "class",
          "languages",
          "places"
        ],
        "answer": 1,
        "sourceWordIndex": 22
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-21-unit-8-sgk-tieng-anh-6-moi-c134a22517.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u08-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 8,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 8 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u8-skills2-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/u8-skills2-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I often go ____ with my dad”.",
        "options": [
          "writing",
          "cycling",
          "doing",
          "talking"
        ],
        "answer": 1,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “name's Alice. I'm ____ years old. I”.",
        "options": [
          "twelve",
          "five",
          "nine",
          "thousand"
        ],
        "answer": 0,
        "sourceWordIndex": 45
      },
      {
        "text": "Chọn từ nghe được: “Saturday. I sometimes ____ computer games, too”.",
        "options": [
          "write",
          "play",
          "try",
          "stay"
        ],
        "answer": 1,
        "sourceWordIndex": 77
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-23-unit-8-sgk-tieng-anh-6-moi-c134a22519.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u09-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 9,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 9 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/gs-u9-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1104/gs-u9-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “is Sydney, a ____ in Australia. What’s”.",
        "options": [
          "world",
          "city",
          "garden",
          "island"
        ],
        "answer": 1,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “raining? What bad ____! Yes, it rains”.",
        "options": [
          "day",
          "weather",
          "computer",
          "money"
        ],
        "answer": 1,
        "sourceWordIndex": 50
      },
      {
        "text": "Chọn từ nghe được: “to visit many ____. I am. What”.",
        "options": [
          "hobbies",
          "pictures",
          "robots",
          "places"
        ],
        "answer": 3,
        "sourceWordIndex": 90
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-26-unit-9-sgk-tieng-anh-6-moi-c134a22525.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u09-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 9,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 9 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u9-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u9-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “What a nice ____! What a clear”.",
        "options": [
          "world",
          "house",
          "shop",
          "city"
        ],
        "answer": 3,
        "sourceWordIndex": 3
      },
      {
        "text": "Chọn từ nghe được: “city! What a ____ sky! What tall”.",
        "options": [
          "earth",
          "swimming",
          "english",
          "clear"
        ],
        "answer": 3,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “What a clear sky! What tall ____”.",
        "options": [
          "materials",
          "buildings",
          "sisters",
          "robots"
        ],
        "answer": 1,
        "sourceWordIndex": 10
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-31-unit-9-sgk-tieng-anh-6-moi-c134a22528.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u09-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 9,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 9 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u9-skills2-ex2-1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u9-skills2-ex2-1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “the largest weekend ____ in the world”.",
        "options": [
          "countryside",
          "market",
          "library",
          "garden"
        ],
        "answer": 1,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “station. When you ____ this market, you”.",
        "options": [
          "plant",
          "like",
          "visit",
          "know"
        ],
        "answer": 2,
        "sourceWordIndex": 41
      },
      {
        "text": "Chọn từ nghe được: “easy to find ____ stalls all around”.",
        "options": [
          "suitcase",
          "food",
          "rain",
          "name"
        ],
        "answer": 1,
        "sourceWordIndex": 76
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-33-unit-9-sgk-tieng-anh-6-moi-c134a22532.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u10-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 10,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 10 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-getting-started-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-getting-started-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “my house. Your ____! That's a UFO”.",
        "options": [
          "park",
          "countryside",
          "house",
          "sea"
        ],
        "answer": 2,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “house. It'll have ____ rooms. Twenty rooms”.",
        "options": [
          "hundred",
          "five",
          "twenty",
          "thirty"
        ],
        "answer": 2,
        "sourceWordIndex": 50
      },
      {
        "text": "Chọn từ nghe được: “might have some ____ TVs and ten”.",
        "options": [
          "noisy",
          "healthy",
          "smart",
          "funny"
        ],
        "answer": 2,
        "sourceWordIndex": 82
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-38-unit-10-sgk-tieng-anh-6-moi-c134a22540.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u10-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 10,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 10 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Hello! Oh, hi, ____. Wow! Is that”.",
        "options": [
          "David",
          "Holiday",
          "Laptop",
          "Exercise"
        ],
        "answer": 0,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “it's my new ____. My parents gave”.",
        "options": [
          "life",
          "holiday",
          "computer",
          "entrance"
        ],
        "answer": 2,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “computer. My parents ____ it to me”.",
        "options": [
          "left",
          "gave",
          "collected",
          "liked"
        ],
        "answer": 1,
        "sourceWordIndex": 20
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-43-unit-10-sgk-tieng-anh-6-moi-c134a22543.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u10-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 10,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 10 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-skills1-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u10-skills1-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “about your dream ____, Linda? Well, it's”.",
        "options": [
          "house",
          "library",
          "garden",
          "shop"
        ],
        "answer": 0,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “like? It's a ____ flat in the”.",
        "options": [
          "shy",
          "patient",
          "creative",
          "beautiful"
        ],
        "answer": 3,
        "sourceWordIndex": 43
      },
      {
        "text": "Chọn từ nghe được: “I can watch ____ from other planets”.",
        "options": [
          "houses",
          "books",
          "flowers",
          "films"
        ],
        "answer": 3,
        "sourceWordIndex": 74
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-45-unit-10-sgk-tieng-anh-6-moi-c134a22545.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u11-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 11,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 11 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u11-getting-started-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u11-getting-started-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “What are you ____ at the supermarket”.",
        "options": [
          "knitting",
          "drawing",
          "doing",
          "sharing"
        ],
        "answer": 2,
        "sourceWordIndex": 23
      },
      {
        "text": "Chọn từ nghe được: “bag, we will ____ the environment. I”.",
        "options": [
          "listen",
          "visit",
          "try",
          "help"
        ],
        "answer": 3,
        "sourceWordIndex": 61
      },
      {
        "text": "Chọn từ nghe được: “If more people ____, the air will”.",
        "options": [
          "draw",
          "cycle",
          "bring",
          "plant"
        ],
        "answer": 1,
        "sourceWordIndex": 93
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-48-unit-11-sgk-tieng-anh-6-moi-c134a22550.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u11-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 11,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 11 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/ta6-u11-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/ta6-u11-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “You are ____ the goldfish too much”.",
        "options": [
          "living",
          "swimming",
          "giving",
          "reading"
        ],
        "answer": 2,
        "sourceWordIndex": 2
      },
      {
        "text": "Chọn từ nghe được: “goldfish too much ____. Don't do that”.",
        "options": [
          "night",
          "backpack",
          "month",
          "food"
        ],
        "answer": 3,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “Why? If you ____ them too much”.",
        "options": [
          "give",
          "cycle",
          "want",
          "need"
        ],
        "answer": 0,
        "sourceWordIndex": 14
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-53-unit-11-sgk-tieng-anh-6-moi-c134a22554.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u11-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 11,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 11 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u11-skills-2-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u11-skills-2-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “talk to my ____ about putting a”.",
        "options": [
          "families",
          "sports",
          "students",
          "friends"
        ],
        "answer": 3,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “exchange their used ____ at these fairs”.",
        "options": [
          "problems",
          "projects",
          "photos",
          "books"
        ],
        "answer": 3,
        "sourceWordIndex": 49
      },
      {
        "text": "Chọn từ nghe được: “be fun and ____ the enviroment. Next”.",
        "options": [
          "want",
          "help",
          "build",
          "travel"
        ],
        "answer": 1,
        "sourceWordIndex": 80
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-55-unit-11-sgk-tieng-anh-6-moi-c134a22556.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g6-u12-getting-started",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 12,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 12 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u12-getting-started-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u12-getting-started-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “us about the ____ in the show”.",
        "options": [
          "robots",
          "friends",
          "feelings",
          "trees"
        ],
        "answer": 0,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “That's the biggest ____ in the show”.",
        "options": [
          "name",
          "information",
          "maths",
          "robot"
        ],
        "answer": 3,
        "sourceWordIndex": 50
      },
      {
        "text": "Chọn từ nghe được: “robot. It can ____ sick people and”.",
        "options": [
          "plant",
          "have",
          "collect",
          "help"
        ],
        "answer": 3,
        "sourceWordIndex": 96
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/getting-started-trang-58-unit-12-sgk-tieng-anh-6-moi-c134a22561.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g6-u12-communication",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 12,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 12 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u12-communication-ex1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2021/1105/gs-u12-communication-ex1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “think robots can ____ us a lot”.",
        "options": [
          "help",
          "work",
          "enjoy",
          "know"
        ],
        "answer": 0,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “in our daily ____. I agree with”.",
        "options": [
          "wind",
          "rubbish",
          "life",
          "water"
        ],
        "answer": 2,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “like humans. I don't ____ with him”.",
        "options": [
          "space",
          "art",
          "agree",
          "friend"
        ],
        "answer": 2,
        "sourceWordIndex": 26
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/communication-trang-63-unit-12-sgk-tieng-anh-6-moi-c134a22565.html",
      "section": "Communication"
    }
  },
  {
    "id": "g6-u12-skills-2",
    "track": "thcs",
    "stage": 1,
    "grade": 6,
    "unit": 12,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 12 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0419/unit-12-skills-2-ex-1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0419/unit-12-skills-2-ex-1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “lot today. Home ____ can do housework”.",
        "options": [
          "places",
          "robots",
          "devices",
          "programmes"
        ],
        "answer": 1,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “buildings. Can they ____? Yes. Teacher robots”.",
        "options": [
          "collect",
          "teach",
          "sell",
          "cycle"
        ],
        "answer": 1,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “everything. They can't ____ our feelings or”.",
        "options": [
          "spend",
          "help",
          "understand",
          "plant"
        ],
        "answer": 2,
        "sourceWordIndex": 83
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/skills-2-trang-65-unit-12-sgk-tieng-anh-6-moi-c134a22567.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u01-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 1,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 1 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0704/002.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0704/002.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Yes. I like ____ dollhouses very much”.",
        "options": [
          "building",
          "taking",
          "improving",
          "trying"
        ],
        "answer": 0,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “riding. That’s rather ____. Not many people”.",
        "options": [
          "funny",
          "unusual",
          "beautiful",
          "friendly"
        ],
        "answer": 1,
        "sourceWordIndex": 71
      },
      {
        "text": "Chọn từ nghe được: “go to your ____ this Sunday. I”.",
        "options": [
          "geography",
          "earth",
          "club",
          "space"
        ],
        "answer": 2,
        "sourceWordIndex": 108
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-1-getting-started-a106464.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u01-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 1,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 1 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0704/006.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0704/006.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “you like reading ____? Yes, very much”.",
        "options": [
          "children",
          "projects",
          "books",
          "trees"
        ],
        "answer": 2,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “science. What about ____? Do you like”.",
        "options": [
          "painting",
          "travelling",
          "walking",
          "shopping"
        ],
        "answer": 0,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “I don't. I'm not ____ in art”.",
        "options": [
          "interested",
          "helped",
          "lived",
          "learnt"
        ],
        "answer": 0,
        "sourceWordIndex": 24
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-1-communication-a106490.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u01-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 1,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 1 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/007.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/007.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “dollhouses. It's quite ____, isn't it? Not”.",
        "options": [
          "boring",
          "unusual",
          "generous",
          "busy"
        ],
        "answer": 1,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “friends or relatives ____ dollhouses too? Yes”.",
        "options": [
          "write",
          "want",
          "teach",
          "build"
        ],
        "answer": 3,
        "sourceWordIndex": 55
      },
      {
        "text": "Chọn từ nghe được: “dolls from cloth. ____, I decorate the”.",
        "options": [
          "Finally",
          "Often",
          "Quickly",
          "Sometimes"
        ],
        "answer": 0,
        "sourceWordIndex": 96
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-1-skills-2-a106507.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u02-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 2,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 2 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/008.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/008.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “at Yen So ____. I also see”.",
        "options": [
          "World",
          "Mountain",
          "Store",
          "Park"
        ],
        "answer": 3,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “the countryside. It’s ____, and there's a”.",
        "options": [
          "smart",
          "popular",
          "jealous",
          "quiet"
        ],
        "answer": 3,
        "sourceWordIndex": 51
      },
      {
        "text": "Chọn từ nghe được: “next time. Sure. ____ along a hat”.",
        "options": [
          "Save",
          "Test",
          "Improve",
          "Bring"
        ],
        "answer": 3,
        "sourceWordIndex": 86
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-2-getting-started-a106562.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u02-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 2,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 2 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/011.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/011.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “My eyes are ____. You can use”.",
        "options": [
          "cheap",
          "tired",
          "difficult",
          "active"
        ],
        "answer": 1,
        "sourceWordIndex": 3
      },
      {
        "text": "Chọn từ nghe được: “And you shouldn't ____ in dim light”.",
        "options": [
          "read",
          "test",
          "paint",
          "cook"
        ],
        "answer": 0,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “shouldn't read in dim ____. Thank you”.",
        "options": [
          "light",
          "schoolyard",
          "energy",
          "sport"
        ],
        "answer": 0,
        "sourceWordIndex": 15
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-2-communication-a106573.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u02-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 2,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 2 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/012.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/012.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “fruit and vegetables, ____ coloured ones like”.",
        "options": [
          "secondly",
          "carefully",
          "especially",
          "always"
        ],
        "answer": 2,
        "sourceWordIndex": 18
      },
      {
        "text": "Chọn từ nghe được: “soft drinks. Be ____ and exercise every”.",
        "options": [
          "active",
          "beautiful",
          "convenient",
          "clean"
        ],
        "answer": 0,
        "sourceWordIndex": 53
      },
      {
        "text": "Chọn từ nghe được: “tired. Keep your ____ tidy and clean”.",
        "options": [
          "beach",
          "park",
          "room",
          "forest"
        ],
        "answer": 2,
        "sourceWordIndex": 91
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u03-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 3,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 3 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/014.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/014.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Sunday morning? I ____ you a board”.",
        "options": [
          "bought",
          "loved",
          "saw",
          "gave"
        ],
        "answer": 0,
        "sourceWordIndex": 21
      },
      {
        "text": "Chọn từ nghe được: “our school and ____ vegetables in our”.",
        "options": [
          "talk",
          "cycle",
          "plant",
          "sell"
        ],
        "answer": 2,
        "sourceWordIndex": 58
      },
      {
        "text": "Chọn từ nghe được: “summer, we taught ____ to 30 kids”.",
        "options": [
          "Tennis",
          "Morning",
          "Festival",
          "English"
        ],
        "answer": 3,
        "sourceWordIndex": 101
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-3-getting-started-a107618.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u03-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 3,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 3 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/017.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/017.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “to help your ____ last summer, Mark”.",
        "options": [
          "community",
          "shop",
          "street",
          "office"
        ],
        "answer": 0,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “a lot of ____ along the nearby”.",
        "options": [
          "rubbish",
          "space",
          "wind",
          "water"
        ],
        "answer": 0,
        "sourceWordIndex": 24
      },
      {
        "text": "Chọn từ nghe được: “clothes for our ____ in the mountainous”.",
        "options": [
          "feelings",
          "flowers",
          "friends",
          "parents"
        ],
        "answer": 2,
        "sourceWordIndex": 41
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-3-communication-a107636.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u03-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 3,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 3 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/018.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0705/018.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “tutor? We taught ____ and maths. Awesome”.",
        "options": [
          "Light",
          "Swimming",
          "Science",
          "English"
        ],
        "answer": 3,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “it. Thanks! It ____ us feel useful”.",
        "options": [
          "decided",
          "made",
          "knew",
          "called"
        ],
        "answer": 1,
        "sourceWordIndex": 66
      },
      {
        "text": "Chọn từ nghe được: “weeks and enjoyed ____ them grow. Glad”.",
        "options": [
          "meeting",
          "watching",
          "staying",
          "reading"
        ],
        "answer": 1,
        "sourceWordIndex": 106
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-3-skills-2-a107645.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u04-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 4,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 4 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/022.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/022.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and I often ____ the piano in”.",
        "options": [
          "play",
          "try",
          "need",
          "talk"
        ],
        "answer": 0,
        "sourceWordIndex": 18
      },
      {
        "text": "Chọn từ nghe được: “as fun as ____. Right. They seem”.",
        "options": [
          "painting",
          "talking",
          "trying",
          "cooking"
        ],
        "answer": 0,
        "sourceWordIndex": 61
      },
      {
        "text": "Chọn từ nghe được: “good, but I'd ____ to go to”.",
        "options": [
          "help",
          "prefer",
          "want",
          "sing"
        ],
        "answer": 1,
        "sourceWordIndex": 106
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-4-getting-started-a107675.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u04-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 4,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 4 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/027.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/027.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “pop or folk ____? I prefer folk”.",
        "options": [
          "year",
          "technology",
          "music",
          "food"
        ],
        "answer": 2,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “has a better ____. And which do”.",
        "options": [
          "beat",
          "rubbish",
          "week",
          "money"
        ],
        "answer": 0,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “folk art? I like ____ art better”.",
        "options": [
          "helpful",
          "clean",
          "busy",
          "modern"
        ],
        "answer": 3,
        "sourceWordIndex": 30
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-4-communication-a107734.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u04-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 4,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 4 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/028_1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0706/028_1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “on the pavement ____ chalk. Today, you”.",
        "options": [
          "building",
          "using",
          "collecting",
          "living"
        ],
        "answer": 1,
        "sourceWordIndex": 23
      },
      {
        "text": "Chọn từ nghe được: “become an artist ____! One of the”.",
        "options": [
          "lunch",
          "year",
          "yourself",
          "exercise"
        ],
        "answer": 2,
        "sourceWordIndex": 59
      },
      {
        "text": "Chọn từ nghe được: “visitors come to ____ it. About 600”.",
        "options": [
          "meet",
          "enjoy",
          "teach",
          "have"
        ],
        "answer": 1,
        "sourceWordIndex": 103
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-4-skills-2-a107771.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u05-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 5,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 5 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0707/030.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0707/030.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “pork cooked in ____ sauce. Oh, could”.",
        "options": [
          "noise",
          "fish",
          "sun",
          "week"
        ],
        "answer": 1,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “drinks: juice, lemonade, ____ tea, mineral water”.",
        "options": [
          "brown",
          "blue",
          "green",
          "yellow"
        ],
        "answer": 2,
        "sourceWordIndex": 91
      },
      {
        "text": "Chọn từ nghe được: “a can of ____ melon juice? The”.",
        "options": [
          "winter",
          "space",
          "sport",
          "history"
        ],
        "answer": 0,
        "sourceWordIndex": 147
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-5-getting-started-a107785.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u05-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 5,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 5 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0707/034.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0707/034.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “bottle of mineral ____? It's 5,000”.",
        "options": [
          "backpack",
          "volleyball",
          "water",
          "entrance"
        ],
        "answer": 2,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “It's 5,000 ____. And how much”.",
        "options": [
          "comedy",
          "wind",
          "year",
          "dong"
        ],
        "answer": 3,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “kilos of apples? They're ____,000 dong”.",
        "options": [
          "50",
          "52",
          "51",
          "53"
        ],
        "answer": 0,
        "sourceWordIndex": 21
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-5-communication-a107824.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u05-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 5,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 5 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0712/036.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0712/036.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “soup with bread. ____ we have instant”.",
        "options": [
          "Often",
          "Certainly",
          "Sometimes",
          "Firstly"
        ],
        "answer": 2,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “the time when ____ members gather at”.",
        "options": [
          "technology",
          "art",
          "family",
          "basketball"
        ],
        "answer": 2,
        "sourceWordIndex": 70
      },
      {
        "text": "Chọn từ nghe được: “some fruit and ____ tea. I think”.",
        "options": [
          "white",
          "green",
          "purple",
          "red"
        ],
        "answer": 1,
        "sourceWordIndex": 123
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-5-skills-2-a108575.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u06-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 6,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 6 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/038.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/038.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Minh Lower Secondary ____. Sounds great! I”.",
        "options": [
          "Countryside",
          "School",
          "Town",
          "Country"
        ],
        "answer": 1,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “visit the school ____, the computer room”.",
        "options": [
          "market",
          "library",
          "forest",
          "garden"
        ],
        "answer": 1,
        "sourceWordIndex": 58
      },
      {
        "text": "Chọn từ nghe được: “Club and take ____ of the school”.",
        "options": [
          "photos",
          "trees",
          "families",
          "materials"
        ],
        "answer": 0,
        "sourceWordIndex": 98
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-6-getting-started-a108578.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u06-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 6,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 6 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/041.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/041.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “doing anything this ____? Not really. Would”.",
        "options": [
          "Tuesday",
          "Saturday",
          "Sunday",
          "Thursday"
        ],
        "answer": 2,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “Minh Lower Secondary ____? Sounds great! Can”.",
        "options": [
          "Country",
          "Office",
          "School",
          "House"
        ],
        "answer": 2,
        "sourceWordIndex": 20
      },
      {
        "text": "Chọn từ nghe được: “a.m. My ____ David and Nick”.",
        "options": [
          "skills",
          "friends",
          "sports",
          "parents"
        ],
        "answer": 1,
        "sourceWordIndex": 35
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-6-communication-a108591.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u06-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 6,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 6 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/042.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0713/042.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “busy with our ____, but we really”.",
        "options": [
          "hobbies",
          "subjects",
          "photos",
          "animals"
        ],
        "answer": 1,
        "sourceWordIndex": 23
      },
      {
        "text": "Chọn từ nghe được: “Well, our members ____ streets on Saturday”.",
        "options": [
          "smart",
          "unusual",
          "clean",
          "natural"
        ],
        "answer": 2,
        "sourceWordIndex": 69
      },
      {
        "text": "Chọn từ nghe được: “the Green Garden ____. We grow vegetables”.",
        "options": [
          "Rain",
          "Ticket",
          "Club",
          "Robot"
        ],
        "answer": 2,
        "sourceWordIndex": 113
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-6-skills-2-a108593.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u07-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 7,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 7 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0111/047.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0111/047.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “fine. Last Sunday ____, I cycled round”.",
        "options": [
          "afternoon",
          "tennis",
          "laptop",
          "art"
        ],
        "answer": 0,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “your home to ____? It's about two”.",
        "options": [
          "school",
          "mountain",
          "countryside",
          "village"
        ],
        "answer": 0,
        "sourceWordIndex": 59
      },
      {
        "text": "Chọn từ nghe được: “the lake this ____? Great! Can you”.",
        "options": [
          "Wednesday",
          "Sunday",
          "Friday",
          "Thursday"
        ],
        "answer": 1,
        "sourceWordIndex": 110
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-7-getting-started-a108621.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u07-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 7,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 7 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/050.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/050.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “mum get to ____? She goes by”.",
        "options": [
          "work",
          "suitcase",
          "traffic",
          "television"
        ],
        "answer": 0,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “She goes by ____. What about your”.",
        "options": [
          "morning",
          "motorbike",
          "environment",
          "friend"
        ],
        "answer": 1,
        "sourceWordIndex": 10
      },
      {
        "text": "Chọn từ nghe được: “usually goes by bus. ____ she cycles”.",
        "options": [
          "Slowly",
          "Sometimes",
          "Finally",
          "Frequently"
        ],
        "answer": 1,
        "sourceWordIndex": 20
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-7-communication-a108660.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u07-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 7,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 7 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/052.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/052.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “cities in the ____. Traffic jams happen”.",
        "options": [
          "road",
          "world",
          "street",
          "park"
        ],
        "answer": 1,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “jams in this ____. One reason is”.",
        "options": [
          "community",
          "store",
          "city",
          "road"
        ],
        "answer": 2,
        "sourceWordIndex": 53
      },
      {
        "text": "Chọn từ nghe được: “condition. Also, many ____ users do not”.",
        "options": [
          "road",
          "river",
          "station",
          "store"
        ],
        "answer": 0,
        "sourceWordIndex": 92
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u08-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 8,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 8 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/054.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/054.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “at Sao Mai ____ tonight. Is it”.",
        "options": [
          "Office",
          "Cinema",
          "Park",
          "Museum"
        ],
        "answer": 1,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “Our Holiday? What ____ of film is”.",
        "options": [
          "kind",
          "comfortable",
          "happy",
          "natural"
        ],
        "answer": 0,
        "sourceWordIndex": 60
      },
      {
        "text": "Chọn từ nghe được: “decide to exchange ____. What are the”.",
        "options": [
          "flowers",
          "questions",
          "houses",
          "teachers"
        ],
        "answer": 2,
        "sourceWordIndex": 98
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-8-getting-started-a108693.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u08-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 8,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 8 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/056_1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/056_1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “going to the ____ tonight? That's a”.",
        "options": [
          "airport",
          "cinema",
          "market",
          "forest"
        ],
        "answer": 1,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “to see A ____ at Sao Mai”.",
        "options": [
          "Nightmare",
          "Tennis",
          "Week",
          "Noise"
        ],
        "answer": 0,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “that's too far for me to ____”.",
        "options": [
          "have",
          "cycle",
          "enjoy",
          "travel"
        ],
        "answer": 3,
        "sourceWordIndex": 32
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-8-communication-a108700.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u08-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 8,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 8 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/059.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/059.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I like Simon's ____. Who stars in”.",
        "options": [
          "brothers",
          "materials",
          "families",
          "films"
        ],
        "answer": 3,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “together after their ____' marriage ends. What”.",
        "options": [
          "friends",
          "parents",
          "books",
          "traditions"
        ],
        "answer": 1,
        "sourceWordIndex": 55
      },
      {
        "text": "Chọn từ nghe được: “people because it's ____ and moving. The”.",
        "options": [
          "active",
          "helpful",
          "funny",
          "friendly"
        ],
        "answer": 2,
        "sourceWordIndex": 107
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-8-skills-2-a108730.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u09-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 9,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 9 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/061.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/061.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I like the ____ on the wall”.",
        "options": [
          "parents",
          "buildings",
          "photos",
          "devices"
        ],
        "answer": 2,
        "sourceWordIndex": 20
      },
      {
        "text": "Chọn từ nghe được: “the Dutch Tulip ____. What did you”.",
        "options": [
          "Stress",
          "Comedy",
          "Sun",
          "Festival"
        ],
        "answer": 3,
        "sourceWordIndex": 70
      },
      {
        "text": "Chọn từ nghe được: “there wasn't any ____ or drinks. I”.",
        "options": [
          "robot",
          "light",
          "food",
          "sport"
        ],
        "answer": 2,
        "sourceWordIndex": 116
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-9-getting-started-a108742.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u09-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 9,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 9 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/064.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/064.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “was the music ____ last Sunday? It”.",
        "options": [
          "information",
          "afternoon",
          "tennis",
          "festival"
        ],
        "answer": 3,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “The band was ____. And the singers”.",
        "options": [
          "late",
          "holiday",
          "name",
          "dinner"
        ],
        "answer": 0,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “weren't very good ____. It was a”.",
        "options": [
          "laptop",
          "air",
          "either",
          "energy"
        ],
        "answer": 2,
        "sourceWordIndex": 21
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-9-communication-a108755.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u09-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 9,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 9 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/066.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0815/066.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “It's a national ____. People from Canada”.",
        "options": [
          "laptop",
          "transport",
          "badminton",
          "holiday"
        ],
        "answer": 3,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “Both adults and ____ take part in”.",
        "options": [
          "families",
          "projects",
          "skills",
          "children"
        ],
        "answer": 3,
        "sourceWordIndex": 58
      },
      {
        "text": "Chọn từ nghe được: “cook and serve ____ to homeless people”.",
        "options": [
          "life",
          "english",
          "backpack",
          "food"
        ],
        "answer": 3,
        "sourceWordIndex": 100
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-9-skills-2-a108762.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u10-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 10,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 10 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/069.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/069.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I don't quite ____ what energy is”.",
        "options": [
          "go",
          "meet",
          "understand",
          "write"
        ],
        "answer": 2,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “like coal, oil, ____ gas.... We call”.",
        "options": [
          "beautiful",
          "jealous",
          "natural",
          "successful"
        ],
        "answer": 2,
        "sourceWordIndex": 57
      },
      {
        "text": "Chọn từ nghe được: “some types of ____ are cheap and”.",
        "options": [
          "energy",
          "earth",
          "space",
          "evening"
        ],
        "answer": 0,
        "sourceWordIndex": 108
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-10-getting-started-a108819.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u10-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 10,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 10 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/072.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/072.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “does “solar energy\" ____? Well, it's energy”.",
        "options": [
          "mean",
          "teach",
          "paint",
          "want"
        ],
        "answer": 0,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “And what does \"____ energy” mean? It's”.",
        "options": [
          "breakfast",
          "wind",
          "weather",
          "life"
        ],
        "answer": 1,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “another type of ____ and it comes”.",
        "options": [
          "comedy",
          "stress",
          "energy",
          "rubbish"
        ],
        "answer": 2,
        "sourceWordIndex": 23
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-10-communication-a108825.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u10-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 10,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 10 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/073.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/073.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “can we save ____ at home? Linh”.",
        "options": [
          "hobby",
          "television",
          "energy",
          "backpack"
        ],
        "answer": 2,
        "sourceWordIndex": 20
      },
      {
        "text": "Chọn từ nghe được: “it helps us ____ electricity. You're right”.",
        "options": [
          "plant",
          "visit",
          "build",
          "save"
        ],
        "answer": 3,
        "sourceWordIndex": 68
      },
      {
        "text": "Chọn từ nghe được: “when leaving the ____. We use solar”.",
        "options": [
          "park",
          "sea",
          "community",
          "room"
        ],
        "answer": 3,
        "sourceWordIndex": 94
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-10-skills-2-a108895.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u11-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 11,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 11 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/075.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/075.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “know. It's a ____ that we don't”.",
        "options": [
          "breakfast",
          "habit",
          "pity",
          "geography"
        ],
        "answer": 2,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “there are no ____ jams. Will it”.",
        "options": [
          "art",
          "exercise",
          "traffic",
          "sun"
        ],
        "answer": 2,
        "sourceWordIndex": 58
      },
      {
        "text": "Chọn từ nghe được: “So when we ____ in hyperloops, we”.",
        "options": [
          "travel",
          "stay",
          "visit",
          "sell"
        ],
        "answer": 0,
        "sourceWordIndex": 96
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-11-getting-started-a108897.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u11-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 11,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 11 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/079.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/079.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “think we will ____ by flying car”.",
        "options": [
          "help",
          "travel",
          "swim",
          "use"
        ],
        "answer": 1,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “the future? We ____ will. Will it”.",
        "options": [
          "always",
          "regularly",
          "certainly",
          "firstly"
        ],
        "answer": 2,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “to fly across oceans? It ____ won't”.",
        "options": [
          "slowly",
          "probably",
          "secondly",
          "usually"
        ],
        "answer": 1,
        "sourceWordIndex": 24
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-11-communication-a108901.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u11-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 11,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 11 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/080.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0816/080.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “think people will ____ in 2050, Tom”.",
        "options": [
          "play",
          "enjoy",
          "travel",
          "shop"
        ],
        "answer": 2,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “and will be ____ because they run”.",
        "options": [
          "unusual",
          "careful",
          "safe",
          "difficult"
        ],
        "answer": 2,
        "sourceWordIndex": 59
      },
      {
        "text": "Chọn từ nghe được: “interesting. How about ____ on sea? I”.",
        "options": [
          "travelling",
          "improving",
          "visiting",
          "planting"
        ],
        "answer": 0,
        "sourceWordIndex": 100
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-11-skills-2-a108904.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g7-u12-getting-started",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 12,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 12 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/082.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/082.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “asking for directions, ____ maps, talking to”.",
        "options": [
          "reading",
          "collecting",
          "walking",
          "cycling"
        ],
        "answer": 0,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “was great! We ____ a tour to”.",
        "options": [
          "took",
          "went",
          "visited",
          "met"
        ],
        "answer": 0,
        "sourceWordIndex": 63
      },
      {
        "text": "Chọn từ nghe được: “Australians love outdoor ____. Right. There were”.",
        "options": [
          "festivals",
          "activities",
          "pictures",
          "houses"
        ],
        "answer": 1,
        "sourceWordIndex": 92
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-12-getting-started-a108935.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g7-u12-communication",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 12,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 12 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/085.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/085.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “wear kilts, short ____ at their traditional”.",
        "options": [
          "brothers",
          "projects",
          "skirts",
          "animals"
        ],
        "answer": 2,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “know that! In ____, Walt Disney World”.",
        "options": [
          "2020",
          "2021",
          "2019",
          "2022"
        ],
        "answer": 2,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “California attracted nearly ____ million visitors. Amazing”.",
        "options": [
          "22",
          "24",
          "21",
          "23"
        ],
        "answer": 2,
        "sourceWordIndex": 24
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-12-communication-a109044.html",
      "section": "Communication"
    }
  },
  {
    "id": "g7-u12-skills-2",
    "track": "thcs",
    "stage": 2,
    "grade": 7,
    "unit": 12,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 12 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/086.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2022/0817/086.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and her family ____ there. You can”.",
        "options": [
          "live",
          "share",
          "love",
          "enjoy"
        ],
        "answer": 0,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “Tower on the ____ Thames. It is”.",
        "options": [
          "Park",
          "City",
          "River",
          "Shop"
        ],
        "answer": 2,
        "sourceWordIndex": 62
      },
      {
        "text": "Chọn từ nghe được: “on the River ____. You will see”.",
        "options": [
          "Thames",
          "Houses",
          "Animals",
          "Feelings"
        ],
        "answer": 0,
        "sourceWordIndex": 106
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-7-unit-12-skills-2-a109187.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u01-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 1,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 1 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “know you like ____. Actually, I'm keen”.",
        "options": [
          "using",
          "listening",
          "knitting",
          "swimming"
        ],
        "answer": 2,
        "sourceWordIndex": 27
      },
      {
        "text": "Chọn từ nghe được: “bit different. I ____ hang out with”.",
        "options": [
          "usually",
          "regularly",
          "actually",
          "especially"
        ],
        "answer": 0,
        "sourceWordIndex": 72
      },
      {
        "text": "Chọn từ nghe được: “at New World ____. Yes, I'd love”.",
        "options": [
          "School",
          "Cinema",
          "Airport",
          "Mountain"
        ],
        "answer": 1,
        "sourceWordIndex": 127
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-1-getting-started-a134902.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u01-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 1,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 1 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-4_1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-4_1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “go to the ____ club with me”.",
        "options": [
          "trying",
          "spending",
          "cooking",
          "painting"
        ],
        "answer": 2,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “with me this ____? I'd love to”.",
        "options": [
          "Sunday",
          "Friday",
          "Wednesday",
          "Tuesday"
        ],
        "answer": 0,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “going for a ____? That's great. Thanks”.",
        "options": [
          "visit",
          "walk",
          "swim",
          "live"
        ],
        "answer": 1,
        "sourceWordIndex": 23
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-1-communication-a134919.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u01-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 1,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 1 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-5.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-5.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “connect with my ____ on Saturdays. We”.",
        "options": [
          "homework",
          "energy",
          "family",
          "webcam"
        ],
        "answer": 2,
        "sourceWordIndex": 28
      },
      {
        "text": "Chọn từ nghe được: “my house. We ____ our favourite food”.",
        "options": [
          "travel",
          "cook",
          "come",
          "read"
        ],
        "answer": 1,
        "sourceWordIndex": 73
      },
      {
        "text": "Chọn từ nghe được: “ride around our ____. This gives us”.",
        "options": [
          "city",
          "park",
          "room",
          "countryside"
        ],
        "answer": 0,
        "sourceWordIndex": 127
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-1-skills-2-a134923.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u02-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 2,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 2 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-7.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-7.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “at my uncle’s ____ in a small”.",
        "options": [
          "office",
          "house",
          "garden",
          "sea"
        ],
        "answer": 1,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “Sounds great! And ____ I went with”.",
        "options": [
          "sometimes",
          "regularly",
          "firstly",
          "finally"
        ],
        "answer": 0,
        "sourceWordIndex": 80
      },
      {
        "text": "Chọn từ nghe được: “we played traditional ____ like bamboo dancing”.",
        "options": [
          "games",
          "teachers",
          "trees",
          "flowers"
        ],
        "answer": 0,
        "sourceWordIndex": 125
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-2-getting-started-a137235.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u02-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 2,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 2 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-10.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-10.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “What a ____ kite you have, Mai”.",
        "options": [
          "beautiful",
          "happy",
          "interesting",
          "confident"
        ],
        "answer": 0,
        "sourceWordIndex": 2
      },
      {
        "text": "Chọn từ nghe được: “for me last ____. You really have”.",
        "options": [
          "habit",
          "week",
          "weekend",
          "dinner"
        ],
        "answer": 2,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “I think its ____ really suits me”.",
        "options": [
          "hobby",
          "fish",
          "friend",
          "colour"
        ],
        "answer": 3,
        "sourceWordIndex": 34
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-2-communication-a137247.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u02-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 2,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 2 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0703/track-11.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0703/track-11.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “The people welcome ____ to their homes”.",
        "options": [
          "pictures",
          "materials",
          "neighbours",
          "programmes"
        ],
        "answer": 2,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “there aren't many ____ for entertainment like”.",
        "options": [
          "places",
          "friends",
          "pictures",
          "parents"
        ],
        "answer": 0,
        "sourceWordIndex": 76
      },
      {
        "text": "Chọn từ nghe được: “do in the ____. We can go”.",
        "options": [
          "city",
          "museum",
          "shop",
          "park"
        ],
        "answer": 0,
        "sourceWordIndex": 137
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-2-skills-2-a137295.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u03-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 3,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 3 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-13_1.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-13_1.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “some school club ____. We're also preparing”.",
        "options": [
          "activities",
          "feelings",
          "friends",
          "clothes"
        ],
        "answer": 0,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “Let's discuss these ____ in your new”.",
        "options": [
          "pictures",
          "books",
          "games",
          "problems"
        ],
        "answer": 3,
        "sourceWordIndex": 78
      },
      {
        "text": "Chọn từ nghe được: “activities to suit ____ interests. And there”.",
        "options": [
          "convenient",
          "confident",
          "different",
          "unusual"
        ],
        "answer": 2,
        "sourceWordIndex": 132
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-3-getting-started-a137312.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u03-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 3,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 3 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-16.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-16.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “more about the ____ club, please? Certainly”.",
        "options": [
          "sun",
          "night",
          "music",
          "life"
        ],
        "answer": 2,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “Thursdays. Could you ____ me the way”.",
        "options": [
          "ticket",
          "show",
          "badminton",
          "eyes"
        ],
        "answer": 1,
        "sourceWordIndex": 19
      },
      {
        "text": "Chọn từ nghe được: “block, then turn ____. It’s on your”.",
        "options": [
          "met",
          "left",
          "said",
          "came"
        ],
        "answer": 1,
        "sourceWordIndex": 34
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-3-communication-a137318.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u03-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 3,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 3 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-18.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-18.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “of trying to ____ my parents expectations”.",
        "options": [
          "help",
          "give",
          "meet",
          "sell"
        ],
        "answer": 2,
        "sourceWordIndex": 28
      },
      {
        "text": "Chọn từ nghe được: “talked to my ____ about this so”.",
        "options": [
          "houses",
          "services",
          "parents",
          "devices"
        ],
        "answer": 2,
        "sourceWordIndex": 71
      },
      {
        "text": "Chọn từ nghe được: “about you, Mi? ____, I don't get”.",
        "options": [
          "Actually",
          "Really",
          "Carefully",
          "Especially"
        ],
        "answer": 0,
        "sourceWordIndex": 126
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-3-skills-2-a137331.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u04-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 4,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 4 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-20.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-20.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Giang. Do you ____ in the mountains”.",
        "options": [
          "test",
          "paint",
          "love",
          "live"
        ],
        "answer": 3,
        "sourceWordIndex": 23
      },
      {
        "text": "Chọn từ nghe được: “it a “stilt ____”. Our house overlooks”.",
        "options": [
          "house",
          "garden",
          "world",
          "sea"
        ],
        "answer": 0,
        "sourceWordIndex": 77
      },
      {
        "text": "Chọn từ nghe được: “about your culture? ____. We have our”.",
        "options": [
          "Finally",
          "Certainly",
          "Secondly",
          "Carefully"
        ],
        "answer": 1,
        "sourceWordIndex": 117
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-4-getting-started-a137467.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u04-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 4,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 4 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-23.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-23.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “you think about ____ in the mountains”.",
        "options": [
          "family",
          "afternoon",
          "name",
          "life"
        ],
        "answer": 3,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “in the mountains ____ close to nature”.",
        "options": [
          "live",
          "play",
          "shop",
          "improve"
        ],
        "answer": 0,
        "sourceWordIndex": 18
      },
      {
        "text": "Chọn từ nghe được: “there are better ____ in the city”.",
        "options": [
          "projects",
          "languages",
          "devices",
          "services"
        ],
        "answer": 3,
        "sourceWordIndex": 38
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-4-communication-a137490.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u04-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 4,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 4 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-24.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-24.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and outside the ____. They learn to”.",
        "options": [
          "office",
          "community",
          "library",
          "house"
        ],
        "answer": 3,
        "sourceWordIndex": 27
      },
      {
        "text": "Chọn từ nghe được: “livestock, and catch ____. In the evening”.",
        "options": [
          "fish",
          "lunch",
          "name",
          "volleyball"
        ],
        "answer": 0,
        "sourceWordIndex": 71
      },
      {
        "text": "Chọn từ nghe được: “and more minority ____ are going to”.",
        "options": [
          "buildings",
          "sisters",
          "festivals",
          "children"
        ],
        "answer": 3,
        "sourceWordIndex": 121
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-4-skills-2-a137492.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u05-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 5,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 5 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-26.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-26.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “villages to take ____ with the blooming”.",
        "options": [
          "pictures",
          "films",
          "projects",
          "sisters"
        ],
        "answer": 0,
        "sourceWordIndex": 28
      },
      {
        "text": "Chọn từ nghe được: “flowers and ornamental ____ everywhere these days”.",
        "options": [
          "trees",
          "children",
          "clothes",
          "festivals"
        ],
        "answer": 0,
        "sourceWordIndex": 69
      },
      {
        "text": "Chọn từ nghe được: “of the communal ____. They hang decorative”.",
        "options": [
          "country",
          "house",
          "island",
          "museum"
        ],
        "answer": 1,
        "sourceWordIndex": 120
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-5-getting-started-a137503.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u05-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 5,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 5 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-29.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-29.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “friend’s house for ____. Could you tell”.",
        "options": [
          "friend",
          "year",
          "food",
          "dinner"
        ],
        "answer": 3,
        "sourceWordIndex": 10
      },
      {
        "text": "Chọn từ nghe được: “eating. I will. ____ a good idea”.",
        "options": [
          "Activities",
          "Brothers",
          "Families",
          "It’s"
        ],
        "answer": 3,
        "sourceWordIndex": 34
      },
      {
        "text": "Chọn từ nghe được: “chopsticks. This may ____ bad luck to”.",
        "options": [
          "bring",
          "watch",
          "use",
          "collect"
        ],
        "answer": 0,
        "sourceWordIndex": 59
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-5-communication-a137519.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u05-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 5,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 5 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-30.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-30.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Khmers use the ____ to thank the”.",
        "options": [
          "festival",
          "sun",
          "music",
          "holiday"
        ],
        "answer": 0,
        "sourceWordIndex": 35
      },
      {
        "text": "Chọn từ nghe được: “rice to feed ____ and ask them”.",
        "options": [
          "students",
          "trees",
          "activities",
          "children"
        ],
        "answer": 3,
        "sourceWordIndex": 100
      },
      {
        "text": "Chọn từ nghe được: “some advice to ____ at the Ok”.",
        "options": [
          "questions",
          "games",
          "tourists",
          "pictures"
        ],
        "answer": 2,
        "sourceWordIndex": 151
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-5-skills-2-a141799.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u06-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 6,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 6 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-32.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-32.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “here call their ____ by their title”.",
        "options": [
          "subjects",
          "neighbours",
          "teachers",
          "flowers"
        ],
        "answer": 2,
        "sourceWordIndex": 27
      },
      {
        "text": "Chọn từ nghe được: “here. In my ____, people usually buy”.",
        "options": [
          "station",
          "country",
          "street",
          "city"
        ],
        "answer": 1,
        "sourceWordIndex": 80
      },
      {
        "text": "Chọn từ nghe được: “are in the ____ of having breakfast”.",
        "options": [
          "science",
          "habit",
          "music",
          "lunch"
        ],
        "answer": 1,
        "sourceWordIndex": 134
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-6-getting-started-a137527.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u06-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 6,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 6 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-35.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-35.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “over to your ____ on Sunday? Sure”.",
        "options": [
          "mountain",
          "shop",
          "sea",
          "house"
        ],
        "answer": 3,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “You're welcome. Vietnamese ____ uses a lot”.",
        "options": [
          "cycling",
          "cooking",
          "watching",
          "swimming"
        ],
        "answer": 1,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “lot of vegetables and herbs. Yes, ____”.",
        "options": [
          "slowly",
          "firstly",
          "certainly",
          "often"
        ],
        "answer": 2,
        "sourceWordIndex": 22
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-6-communication-a137544.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u06-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 6,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 6 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-36.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-36.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “off suddenly. Really? ____ technology sometimes causes”.",
        "options": [
          "Confident",
          "Interesting",
          "Expensive",
          "Modern"
        ],
        "answer": 3,
        "sourceWordIndex": 26
      },
      {
        "text": "Chọn từ nghe được: “Interaction with my ____ and friends. Yeah”.",
        "options": [
          "teachers",
          "children",
          "friends",
          "flowers"
        ],
        "answer": 0,
        "sourceWordIndex": 78
      },
      {
        "text": "Chọn từ nghe được: “friendship because it's ____ to keep in”.",
        "options": [
          "confident",
          "easy",
          "funny",
          "friendly"
        ],
        "answer": 1,
        "sourceWordIndex": 123
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-6-skills-2-a137552.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u07-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 7,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 7 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-40.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-40.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “The air and ____ quality are getting”.",
        "options": [
          "noise",
          "year",
          "water",
          "laptop"
        ],
        "answer": 2,
        "sourceWordIndex": 30
      },
      {
        "text": "Chọn từ nghe được: “What do you ____ by 'carbon footprint”.",
        "options": [
          "read",
          "mean",
          "watch",
          "prefer"
        ],
        "answer": 1,
        "sourceWordIndex": 74
      },
      {
        "text": "Chọn từ nghe được: “avoid using single-use ____, like plastic bags”.",
        "options": [
          "places",
          "products",
          "sisters",
          "brothers"
        ],
        "answer": 1,
        "sourceWordIndex": 120
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-7-getting-started-a141320.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u07-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 7,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 7 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-43.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-43.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Endangered species are ____ in the wild”.",
        "options": [
          "films",
          "games",
          "friends",
          "animals"
        ],
        "answer": 3,
        "sourceWordIndex": 10
      },
      {
        "text": "Chọn từ nghe được: “what do you ____ by ‘in the”.",
        "options": [
          "shop",
          "buy",
          "listen",
          "mean"
        ],
        "answer": 3,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “live in their ____ habitats, not in”.",
        "options": [
          "tired",
          "confident",
          "natural",
          "generous"
        ],
        "answer": 2,
        "sourceWordIndex": 37
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-7-communication-a141332.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u07-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 7,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 7 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-44.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0613/track-44.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “other uses. Water ____ happens when wastes”.",
        "options": [
          "lunch",
          "rubbish",
          "pollution",
          "science"
        ],
        "answer": 2,
        "sourceWordIndex": 24
      },
      {
        "text": "Chọn từ nghe được: “source of drinking ____ for humans. Water”.",
        "options": [
          "water",
          "basketball",
          "suitcase",
          "money"
        ],
        "answer": 0,
        "sourceWordIndex": 81
      },
      {
        "text": "Chọn từ nghe được: “also stop littering, ____ dumping waste into”.",
        "options": [
          "sometimes",
          "actually",
          "especially",
          "recently"
        ],
        "answer": 2,
        "sourceWordIndex": 121
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-7-skills-2-a141336.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u08-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 8,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 8 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-46.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-46.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “people at the ____ were wearing really”.",
        "options": [
          "countryside",
          "market",
          "road",
          "museum"
        ],
        "answer": 1,
        "sourceWordIndex": 35
      },
      {
        "text": "Chọn từ nghe được: “Back in my ____, Auckland, we have”.",
        "options": [
          "road",
          "city",
          "shop",
          "store"
        ],
        "answer": 1,
        "sourceWordIndex": 81
      },
      {
        "text": "Chọn từ nghe được: “Right. It’s more ____. Yeah ... Oh, I’ve”.",
        "options": [
          "friendly",
          "expensive",
          "convenient",
          "easy"
        ],
        "answer": 2,
        "sourceWordIndex": 138
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-8-getting-started-a141846.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u08-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 8,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 8 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-49.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0616/track-49.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “about the SMART ____ I ordered from”.",
        "options": [
          "television",
          "backpack",
          "music",
          "year"
        ],
        "answer": 1,
        "sourceWordIndex": 9
      },
      {
        "text": "Chọn từ nghe được: “And I’m not ____ with the colour”.",
        "options": [
          "happy",
          "responsible",
          "easy",
          "convenient"
        ],
        "answer": 0,
        "sourceWordIndex": 38
      },
      {
        "text": "Chọn từ nghe được: “one is yellowish ____. I'm sorry about”.",
        "options": [
          "brown",
          "blue",
          "white",
          "purple"
        ],
        "answer": 0,
        "sourceWordIndex": 54
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-8-communication-a141870.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u08-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 8,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 8 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-51.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-51.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “is easy. You ____ a seller's website”.",
        "options": [
          "love",
          "write",
          "help",
          "visit"
        ],
        "answer": 3,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “travelling, time, and ____. However, shopping online”.",
        "options": [
          "money",
          "holiday",
          "literature",
          "life"
        ],
        "answer": 0,
        "sourceWordIndex": 79
      },
      {
        "text": "Chọn từ nghe được: “there are many ____ to choose from”.",
        "options": [
          "programmes",
          "products",
          "computers",
          "feelings"
        ],
        "answer": 1,
        "sourceWordIndex": 134
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-8-skills-2-a142616.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u09-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 9,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 9 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-53.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-53.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “second time this ____. I'm sorry to”.",
        "options": [
          "earth",
          "year",
          "weather",
          "music"
        ],
        "answer": 1,
        "sourceWordIndex": 27
      },
      {
        "text": "Chọn từ nghe được: “US? Yes, we ____ have tornadoes. Tornadoes”.",
        "options": [
          "carefully",
          "quickly",
          "actually",
          "sometimes"
        ],
        "answer": 3,
        "sourceWordIndex": 72
      },
      {
        "text": "Chọn từ nghe được: “big funnel of ____ moving towards us”.",
        "options": [
          "robot",
          "wind",
          "night",
          "breakfast"
        ],
        "answer": 1,
        "sourceWordIndex": 134
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-9-getting-started-a142630.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u09-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 9,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 9 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-57.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0803/track-57.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “sad? My grandparents ____ this morning. A”.",
        "options": [
          "saved",
          "lived",
          "thought",
          "called"
        ],
        "answer": 3,
        "sourceWordIndex": 8
      },
      {
        "text": "Chọn từ nghe được: “flood destroyed their ____. I'm sorry to”.",
        "options": [
          "house",
          "street",
          "museum",
          "library"
        ],
        "answer": 0,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “That’s awful. I ____ your grandparents are”.",
        "options": [
          "breakfast",
          "dinner",
          "history",
          "hope"
        ],
        "answer": 3,
        "sourceWordIndex": 31
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-9-communication-a142633.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u09-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 9,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 9 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-58.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-58.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “a storm, each ____ should prepare an”.",
        "options": [
          "volleyball",
          "light",
          "morning",
          "family"
        ],
        "answer": 3,
        "sourceWordIndex": 34
      },
      {
        "text": "Chọn từ nghe được: “During a storm, ____ inside. Even when”.",
        "options": [
          "cook",
          "understand",
          "build",
          "stay"
        ],
        "answer": 3,
        "sourceWordIndex": 79
      },
      {
        "text": "Chọn từ nghe được: “away. Listen to ____ instructions from local”.",
        "options": [
          "helpful",
          "interesting",
          "important",
          "confident"
        ],
        "answer": 2,
        "sourceWordIndex": 128
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-9-skills-2-a142642.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u10-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 10,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 10 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-62.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-62.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “bit worried. I've ____ had a video”.",
        "options": [
          "never",
          "often",
          "finally",
          "weekly"
        ],
        "answer": 0,
        "sourceWordIndex": 30
      },
      {
        "text": "Chọn từ nghe được: “front of the ____. I'll connect with”.",
        "options": [
          "backpack",
          "football",
          "computer",
          "rubbish"
        ],
        "answer": 2,
        "sourceWordIndex": 75
      },
      {
        "text": "Chọn từ nghe được: “connection here. I ____ the conference goes”.",
        "options": [
          "month",
          "health",
          "hope",
          "television"
        ],
        "answer": 2,
        "sourceWordIndex": 136
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-10-getting-started-a142709.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u10-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 10,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 10 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-65.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-65.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “here at 9:____ a.m., and”.",
        "options": [
          "32",
          "31",
          "33",
          "30"
        ],
        "answer": 3,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “We need to ____ the devices. This”.",
        "options": [
          "improve",
          "understand",
          "test",
          "study"
        ],
        "answer": 2,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “and these to ... ____ on. Can you”.",
        "options": [
          "Hold",
          "Habit",
          "Breakfast",
          "Weather"
        ],
        "answer": 0,
        "sourceWordIndex": 54
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-10-commmunication-a142717.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u10-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 10,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 10 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-66.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-66.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “so remember to ____ me at the”.",
        "options": [
          "test",
          "meet",
          "cycle",
          "spend"
        ],
        "answer": 1,
        "sourceWordIndex": 37
      },
      {
        "text": "Chọn từ nghe được: “move to the \"____ Time” section. It's”.",
        "options": [
          "Modern",
          "Funny",
          "Active",
          "Convenient"
        ],
        "answer": 0,
        "sourceWordIndex": 89
      },
      {
        "text": "Chọn từ nghe được: “is about communication ____ in the future”.",
        "options": [
          "devices",
          "animals",
          "traditions",
          "languages"
        ],
        "answer": 0,
        "sourceWordIndex": 144
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-10-skills-2-a142720.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u11-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 11,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 11 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-68.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-68.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “online classes are ____ during bad weather”.",
        "options": [
          "convenient",
          "helpful",
          "creative",
          "expensive"
        ],
        "answer": 0,
        "sourceWordIndex": 31
      },
      {
        "text": "Chọn từ nghe được: “know what you ____. But there’s some”.",
        "options": [
          "plant",
          "cycle",
          "mean",
          "listen"
        ],
        "answer": 2,
        "sourceWordIndex": 84
      },
      {
        "text": "Chọn từ nghe được: “when our human ____ are not available”.",
        "options": [
          "teachers",
          "languages",
          "parents",
          "computers"
        ],
        "answer": 0,
        "sourceWordIndex": 132
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-11-getting-started-a142738.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u11-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 11,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 11 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-71.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-71.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “us. We'll have ____ clouds so we”.",
        "options": [
          "office",
          "library",
          "school",
          "forest"
        ],
        "answer": 2,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “carry lots of ____ to school. Great”.",
        "options": [
          "children",
          "clothes",
          "programmes",
          "books"
        ],
        "answer": 3,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “so I can ____ books from the”.",
        "options": [
          "read",
          "stay",
          "cook",
          "try"
        ],
        "answer": 0,
        "sourceWordIndex": 36
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-11-commmunication-a142754.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u11-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 11,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 11 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-72.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-72.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “it interact with ____? Yes. Students can”.",
        "options": [
          "clothes",
          "computers",
          "friends",
          "students"
        ],
        "answer": 3,
        "sourceWordIndex": 30
      },
      {
        "text": "Chọn từ nghe được: “can also ask ____ that are suitable”.",
        "options": [
          "skills",
          "questions",
          "animals",
          "neighbours"
        ],
        "answer": 1,
        "sourceWordIndex": 80
      },
      {
        "text": "Chọn từ nghe được: “That's true. Also ____ don't have emotional”.",
        "options": [
          "robots",
          "films",
          "subjects",
          "services"
        ],
        "answer": 0,
        "sourceWordIndex": 134
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-11-skills-2-a142756.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g8-u12-getting-started",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 12,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 12 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-74.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-74.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and Barb. They're ____ back to Soduka”.",
        "options": [
          "spending",
          "travelling",
          "living",
          "giving"
        ],
        "answer": 1,
        "sourceWordIndex": 39
      },
      {
        "text": "Chọn từ nghe được: “so they can ____ back to their”.",
        "options": [
          "travel",
          "listen",
          "swim",
          "plant"
        ],
        "answer": 0,
        "sourceWordIndex": 83
      },
      {
        "text": "Chọn từ nghe được: “of aliens attacking ____? I'm not sure”.",
        "options": [
          "Entrance",
          "Energy",
          "Homework",
          "Earth"
        ],
        "answer": 3,
        "sourceWordIndex": 142
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-12-getting-started-a142767.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g8-u12-communication",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 12,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 12 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-77.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-77.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Mars may support ____? I'm not sure”.",
        "options": [
          "life",
          "music",
          "transport",
          "water"
        ],
        "answer": 0,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “it. Scientists are ____ to find life”.",
        "options": [
          "walking",
          "working",
          "drawing",
          "trying"
        ],
        "answer": 3,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “her arm in a match last ____”.",
        "options": [
          "hobby",
          "month",
          "week",
          "football"
        ],
        "answer": 2,
        "sourceWordIndex": 37
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-12-commmunication-a142771.html",
      "section": "Communication"
    }
  },
  {
    "id": "g8-u12-skills-2",
    "track": "thcs",
    "stage": 3,
    "grade": 8,
    "unit": 12,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 12 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-78.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2023/0804/track-78.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “times bigger than ____. It has three”.",
        "options": [
          "Maths",
          "Health",
          "Earth",
          "Night"
        ],
        "answer": 2,
        "sourceWordIndex": 31
      },
      {
        "text": "Chọn từ nghe được: “big head, four ____, two legs, and”.",
        "options": [
          "literature",
          "energy",
          "earth",
          "eyes"
        ],
        "answer": 3,
        "sourceWordIndex": 77
      },
      {
        "text": "Chọn từ nghe được: “use rockets to ____ at very high”.",
        "options": [
          "enjoy",
          "improve",
          "travel",
          "come"
        ],
        "answer": 2,
        "sourceWordIndex": 135
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-8-unit-12-skills-2-a142860.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u01-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 1,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 1 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u1-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u1-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “you in the ____ Club very often”.",
        "options": [
          "Making",
          "Reading",
          "Singing",
          "Saving"
        ],
        "answer": 1,
        "sourceWordIndex": 35
      },
      {
        "text": "Chọn từ nghe được: “there's a craft ____ near our house”.",
        "options": [
          "village",
          "river",
          "country",
          "museum"
        ],
        "answer": 0,
        "sourceWordIndex": 87
      },
      {
        "text": "Chọn từ nghe được: “stuff for our ____, and the new”.",
        "options": [
          "house",
          "airport",
          "street",
          "office"
        ],
        "answer": 0,
        "sourceWordIndex": 148
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-1-getting-started-a155966.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u01-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 1,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 1 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-communication-u1-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-communication-u1-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “mind carrying this ____ for me? Not”.",
        "options": [
          "suitcase",
          "breakfast",
          "dinner",
          "robot"
        ],
        "answer": 0,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “all. Could you ____ me how to”.",
        "options": [
          "comedy",
          "health",
          "show",
          "festival"
        ],
        "answer": 2,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “how to open this ____, please? Sure”.",
        "options": [
          "fish",
          "gate",
          "science",
          "day"
        ],
        "answer": 1,
        "sourceWordIndex": 19
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-1-communication-a156621.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u01-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 1,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 1 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-skills2-u1-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-skills2-u1-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “called \"My Favourite ____ Helper\". This was”.",
        "options": [
          "Park",
          "Island",
          "Store",
          "Community"
        ],
        "answer": 3,
        "sourceWordIndex": 31
      },
      {
        "text": "Chọn từ nghe được: “is hard-working and ____. Every day he”.",
        "options": [
          "peaceful",
          "responsible",
          "popular",
          "creative"
        ],
        "answer": 1,
        "sourceWordIndex": 82
      },
      {
        "text": "Chọn từ nghe được: “also friendly. He ____ keeps a smile”.",
        "options": [
          "usually",
          "certainly",
          "always",
          "finally"
        ],
        "answer": 0,
        "sourceWordIndex": 138
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-1-skills-2-a156628.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u02-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 2,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 2 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u2-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u2-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “traffic jam and ____ home late No”.",
        "options": [
          "stopped",
          "used",
          "came",
          "saved"
        ],
        "answer": 2,
        "sourceWordIndex": 16
      },
      {
        "text": "Chọn từ nghe được: “easily get itchy ____. It must be”.",
        "options": [
          "space",
          "eyes",
          "energy",
          "computer"
        ],
        "answer": 1,
        "sourceWordIndex": 101
      },
      {
        "text": "Chọn từ nghe được: “fun. Do you ____ go there? Sometimes”.",
        "options": [
          "slowly",
          "especially",
          "recently",
          "often"
        ],
        "answer": 3,
        "sourceWordIndex": 164
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-2-getting-started-a156653.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u02-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 2,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 2 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-communication-u2-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-communication-u2-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “you to the ____ if you like”.",
        "options": [
          "community",
          "city",
          "airport",
          "river"
        ],
        "answer": 2,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “like me to ____ you a ride”.",
        "options": [
          "watch",
          "build",
          "give",
          "talk"
        ],
        "answer": 2,
        "sourceWordIndex": 17
      },
      {
        "text": "Chọn từ nghe được: “Thank you. That's so ____ of you”.",
        "options": [
          "kind",
          "active",
          "convenient",
          "patient"
        ],
        "answer": 0,
        "sourceWordIndex": 26
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-2-communication-a156721.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u02-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 2,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 2 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex2-skills2-u2-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex2-skills2-u2-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I love my ____. It has good”.",
        "options": [
          "country",
          "countryside",
          "world",
          "city"
        ],
        "answer": 3,
        "sourceWordIndex": 37
      },
      {
        "text": "Chọn từ nghe được: “entertainment is a ____ mall but it's”.",
        "options": [
          "listening",
          "planting",
          "shopping",
          "building"
        ],
        "answer": 2,
        "sourceWordIndex": 92
      },
      {
        "text": "Chọn từ nghe được: “too lazy to ____ on their own”.",
        "options": [
          "cook",
          "read",
          "sing",
          "go"
        ],
        "answer": 0,
        "sourceWordIndex": 151
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-2-skills-2-a156636.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u03-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 3,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 3 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u3-ta9-global.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/ex1-getting-u3-ta9-global.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “sleep, eat a ____ diet, and do”.",
        "options": [
          "dirty",
          "friendly",
          "healthy",
          "shy"
        ],
        "answer": 2,
        "sourceWordIndex": 36
      },
      {
        "text": "Chọn từ nghe được: “understand that exams ____ about lots of”.",
        "options": [
          "take",
          "talk",
          "visit",
          "bring"
        ],
        "answer": 3,
        "sourceWordIndex": 90
      },
      {
        "text": "Chọn từ nghe được: “your study and ____. But how can”.",
        "options": [
          "energy",
          "dinner",
          "computer",
          "life"
        ],
        "answer": 3,
        "sourceWordIndex": 148
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-3-getting-started-a156735.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u03-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 3,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 3 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/17.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/17.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “the door, Tom? ____? Can you open”.",
        "options": [
          "Evening",
          "Sorry",
          "Water",
          "History"
        ],
        "answer": 1,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “to the post ____? I beg your”.",
        "options": [
          "world",
          "city",
          "office",
          "island"
        ],
        "answer": 2,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “Would you mind ____ me the way”.",
        "options": [
          "cycling",
          "showing",
          "saving",
          "working"
        ],
        "answer": 1,
        "sourceWordIndex": 33
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-3-communication-a156767.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u03-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 3,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 3 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/18.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/18.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “due dates and ____ dates into a”.",
        "options": [
          "test",
          "change",
          "sing",
          "mean"
        ],
        "answer": 0,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “a lot of ____ that can take”.",
        "options": [
          "activities",
          "friends",
          "parents",
          "feelings"
        ],
        "answer": 0,
        "sourceWordIndex": 69
      },
      {
        "text": "Chọn từ nghe được: “arrange to start ____ on them well”.",
        "options": [
          "working",
          "shopping",
          "reading",
          "teaching"
        ],
        "answer": 0,
        "sourceWordIndex": 126
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-3-skills-2-a156776.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u04-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 4,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 4 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/21.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/21.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “in the world. ____! When did people”.",
        "options": [
          "Fantastic",
          "Jealous",
          "Expensive",
          "Natural"
        ],
        "answer": 0,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “site. People were ____ it for 36”.",
        "options": [
          "cooking",
          "improving",
          "taking",
          "building"
        ],
        "answer": 3,
        "sourceWordIndex": 92
      },
      {
        "text": "Chọn từ nghe được: “castle in the ____. Mi & Nam: Amazing”.",
        "options": [
          "office",
          "school",
          "world",
          "market"
        ],
        "answer": 2,
        "sourceWordIndex": 147
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-4-getting-started-a156823.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u04-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 4,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 4 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/24.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/24.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “very much for ____ us around Angkor”.",
        "options": [
          "travelling",
          "listening",
          "showing",
          "talking"
        ],
        "answer": 2,
        "sourceWordIndex": 5
      },
      {
        "text": "Chọn từ nghe được: “Angkor Wat. You're ____. Thanks a lot”.",
        "options": [
          "welcome",
          "family",
          "water",
          "robot"
        ],
        "answer": 0,
        "sourceWordIndex": 11
      },
      {
        "text": "Chọn từ nghe được: “about life in the ____. No problem”.",
        "options": [
          "museum",
          "office",
          "countryside",
          "road"
        ],
        "answer": 2,
        "sourceWordIndex": 22
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-4-communication-a156832.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u04-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 4,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 4 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/25.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/25.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “a three-month summer ____! Did you stay”.",
        "options": [
          "badminton",
          "holiday",
          "music",
          "earth"
        ],
        "answer": 1,
        "sourceWordIndex": 34
      },
      {
        "text": "Chọn từ nghe được: “study the same ____ as we do”.",
        "options": [
          "feelings",
          "subjects",
          "sisters",
          "clothes"
        ],
        "answer": 1,
        "sourceWordIndex": 76
      },
      {
        "text": "Chọn từ nghe được: “face-to-face. And we ____ traditional games such”.",
        "options": [
          "started",
          "took",
          "played",
          "made"
        ],
        "answer": 2,
        "sourceWordIndex": 139
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-4-skills-2-a156835.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u05-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 5,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 5 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/27.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/27.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “We visited Langbiang ____ and Cu Lan”.",
        "options": [
          "Countryside",
          "Airport",
          "Island",
          "Mountain"
        ],
        "answer": 3,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “more than 150 ____ and animal species”.",
        "options": [
          "know",
          "try",
          "plant",
          "talk"
        ],
        "answer": 2,
        "sourceWordIndex": 89
      },
      {
        "text": "Chọn từ nghe được: “we saw an ____ gong show. We”.",
        "options": [
          "difficult",
          "funny",
          "interesting",
          "beautiful"
        ],
        "answer": 2,
        "sourceWordIndex": 152
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-5-getting-started-a156847.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u05-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 5,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 5 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/30.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/30.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “really sorry. I'm ____. There was a”.",
        "options": [
          "day",
          "rain",
          "late",
          "sport"
        ],
        "answer": 2,
        "sourceWordIndex": 8
      },
      {
        "text": "Chọn từ nghe được: “you done the ____ yet? Oops, my”.",
        "options": [
          "sharing",
          "playing",
          "making",
          "washing"
        ],
        "answer": 3,
        "sourceWordIndex": 22
      },
      {
        "text": "Chọn từ nghe được: “later. Oh, that's ____. But please do”.",
        "options": [
          "health",
          "right",
          "work",
          "ticket"
        ],
        "answer": 1,
        "sourceWordIndex": 37
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-5-a-communication-a156862.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u05-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 5,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 5 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/31.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/31.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “things. I could ____ get anything back”.",
        "options": [
          "slowly",
          "certainly",
          "never",
          "often"
        ],
        "answer": 2,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “he returned my ____ and went away”.",
        "options": [
          "money",
          "light",
          "noise",
          "schoolyard"
        ],
        "answer": 0,
        "sourceWordIndex": 79
      },
      {
        "text": "Chọn từ nghe được: “did. But I ____ learnt it by”.",
        "options": [
          "probably",
          "always",
          "actually",
          "slowly"
        ],
        "answer": 2,
        "sourceWordIndex": 144
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-5-skills-2-a156887.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u06-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 6,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 6 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/33.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/33.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “played outdoors. The ____ were simple and”.",
        "options": [
          "friends",
          "languages",
          "games",
          "buildings"
        ],
        "answer": 2,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “thing is that ____ nowadays have more”.",
        "options": [
          "children",
          "languages",
          "feelings",
          "projects"
        ],
        "answer": 0,
        "sourceWordIndex": 79
      },
      {
        "text": "Chọn từ nghe được: “more opportunities to ____ now? That's right”.",
        "options": [
          "shop",
          "cook",
          "like",
          "learn"
        ],
        "answer": 3,
        "sourceWordIndex": 135
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-6-getting-started-a156899.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u06-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 6,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 6 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/36.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/36.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “I will ____ with you the links”.",
        "options": [
          "help",
          "share",
          "plant",
          "cycle"
        ],
        "answer": 1,
        "sourceWordIndex": 2
      },
      {
        "text": "Chọn từ nghe được: “about the ancient ____ of Duong Lam”.",
        "options": [
          "village",
          "mountain",
          "town",
          "beach"
        ],
        "answer": 0,
        "sourceWordIndex": 10
      },
      {
        "text": "Chọn từ nghe được: “dog to the ____. Great! I appreciate”.",
        "options": [
          "backpack",
          "swimming",
          "picnic",
          "schoolyard"
        ],
        "answer": 2,
        "sourceWordIndex": 25
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-6-communication-a156907.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u06-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 6,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 6 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/37.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/37.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “usually three generations ____ together in a”.",
        "options": [
          "visiting",
          "living",
          "staying",
          "knitting"
        ],
        "answer": 1,
        "sourceWordIndex": 26
      },
      {
        "text": "Chọn từ nghe được: “less tiring. Lastly, ____ in the past”.",
        "options": [
          "teachers",
          "friends",
          "buildings",
          "families"
        ],
        "answer": 3,
        "sourceWordIndex": 78
      },
      {
        "text": "Chọn từ nghe được: “their parents to ____ to them, too”.",
        "options": [
          "stay",
          "save",
          "want",
          "listen"
        ],
        "answer": 3,
        "sourceWordIndex": 135
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-6-skills-2-a156909.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u07-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 7,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 7 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/41.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/41.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “What did you ____ about in the”.",
        "options": [
          "understand",
          "try",
          "know",
          "talk"
        ],
        "answer": 3,
        "sourceWordIndex": 31
      },
      {
        "text": "Chọn từ nghe được: “that we can't ____ admiring. So that's”.",
        "options": [
          "bring",
          "help",
          "work",
          "have"
        ],
        "answer": 1,
        "sourceWordIndex": 83
      },
      {
        "text": "Chọn từ nghe được: “to visit those ____, and I answered”.",
        "options": [
          "places",
          "festivals",
          "clothes",
          "activities"
        ],
        "answer": 0,
        "sourceWordIndex": 143
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-7-getting-started-a163685.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u07-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 7,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 7 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/44.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/44.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “Can I ____ a horror film, Mum”.",
        "options": [
          "want",
          "improve",
          "study",
          "watch"
        ],
        "answer": 3,
        "sourceWordIndex": 2
      },
      {
        "text": "Chọn từ nghe được: “you can't. It's ____ now. May we”.",
        "options": [
          "stress",
          "family",
          "evening",
          "late"
        ],
        "answer": 3,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “Sure. But be ____. It's very dark”.",
        "options": [
          "shy",
          "careful",
          "clean",
          "responsible"
        ],
        "answer": 1,
        "sourceWordIndex": 28
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-7-communication-a163688.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u07-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 7,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 7 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2025/0212/listen-to-the-passage-and-tick-the-things-you-hear-hc-liu.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2025/0212/listen-to-the-passage-and-tick-the-things-you-hear-hc-liu.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “our world's tropical ____ areas. It is”.",
        "options": [
          "cinema",
          "mountain",
          "forest",
          "countryside"
        ],
        "answer": 2,
        "sourceWordIndex": 25
      },
      {
        "text": "Chọn từ nghe được: “wonders of the ____. It has so”.",
        "options": [
          "world",
          "cinema",
          "garden",
          "countryside"
        ],
        "answer": 0,
        "sourceWordIndex": 86
      },
      {
        "text": "Chọn từ nghe được: “damaged ecosystems. They ____ trees and establish”.",
        "options": [
          "swim",
          "plant",
          "sing",
          "enjoy"
        ],
        "answer": 1,
        "sourceWordIndex": 154
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-7-skills-2-a163690.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u08-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 8,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 8 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/47.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/47.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “time on the ____. That's how I”.",
        "options": [
          "forest",
          "beach",
          "market",
          "museum"
        ],
        "answer": 1,
        "sourceWordIndex": 39
      },
      {
        "text": "Chọn từ nghe được: “and rent a ____ accommodation. He usually”.",
        "options": [
          "generous",
          "cheap",
          "busy",
          "careful"
        ],
        "answer": 1,
        "sourceWordIndex": 101
      },
      {
        "text": "Chọn từ nghe được: “perfect destination for ____ tourists. Yes, I”.",
        "options": [
          "food",
          "webcam",
          "football",
          "habit"
        ],
        "answer": 0,
        "sourceWordIndex": 170
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-8-getting-started-a163693.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u08-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 8,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 8 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/50.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/50.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “up or we'll ____ the train. Yes”.",
        "options": [
          "games",
          "miss",
          "sports",
          "languages"
        ],
        "answer": 1,
        "sourceWordIndex": 7
      },
      {
        "text": "Chọn từ nghe được: “Yes, Mum. I'm ____. Is it necessary”.",
        "options": [
          "staying",
          "knitting",
          "coming",
          "watching"
        ],
        "answer": 2,
        "sourceWordIndex": 13
      },
      {
        "text": "Chọn từ nghe được: “wait in the ____? I'm sorry, it”.",
        "options": [
          "festival",
          "queue",
          "week",
          "rain"
        ],
        "answer": 1,
        "sourceWordIndex": 23
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-8-communication-a163696.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u08-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 8,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 8 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/51.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/51.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “with its vast ____ hills and fields”.",
        "options": [
          "grey",
          "green",
          "red",
          "yellow"
        ],
        "answer": 1,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “the village. The ____ ticket to the”.",
        "options": [
          "entrance",
          "computer",
          "technology",
          "basketball"
        ],
        "answer": 0,
        "sourceWordIndex": 89
      },
      {
        "text": "Chọn từ nghe được: “the main high ____ where the Brontes”.",
        "options": [
          "city",
          "country",
          "street",
          "village"
        ],
        "answer": 2,
        "sourceWordIndex": 148
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-8-skills-2-a163698.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u09-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 9,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 9 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/53.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/53.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “you. Nice to ____ you all. This”.",
        "options": [
          "listen",
          "collect",
          "meet",
          "share"
        ],
        "answer": 2,
        "sourceWordIndex": 24
      },
      {
        "text": "Chọn từ nghe được: “Jack? Ah, I ____ trousers. In American”.",
        "options": [
          "prefer",
          "play",
          "mean",
          "love"
        ],
        "answer": 2,
        "sourceWordIndex": 82
      },
      {
        "text": "Chọn từ nghe được: “of you speak ____? Good question. Most”.",
        "options": [
          "Technology",
          "Suitcase",
          "Breakfast",
          "English"
        ],
        "answer": 3,
        "sourceWordIndex": 132
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-9-getting-started-a163701.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u09-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 9,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 9 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/56.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/56.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “luck with your ____ exam. Thanks. I'll”.",
        "options": [
          "Literature",
          "Month",
          "English",
          "Suitcase"
        ],
        "answer": 2,
        "sourceWordIndex": 4
      },
      {
        "text": "Chọn từ nghe được: “my best. I've ____ that you're moving”.",
        "options": [
          "went",
          "called",
          "heard",
          "worked"
        ],
        "answer": 2,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “the best of ____. Thank you so”.",
        "options": [
          "luck",
          "light",
          "entrance",
          "money"
        ],
        "answer": 0,
        "sourceWordIndex": 26
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-9-communication-a163729.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u09-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 9,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 9 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/57.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0515/57.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “spend time reading ____ kinds of English”.",
        "options": [
          "different",
          "interesting",
          "dangerous",
          "natural"
        ],
        "answer": 0,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “also helps me ____ better when to”.",
        "options": [
          "understand",
          "sell",
          "give",
          "listen"
        ],
        "answer": 0,
        "sourceWordIndex": 100
      },
      {
        "text": "Chọn từ nghe được: “the words I've ____ and pick up”.",
        "options": [
          "told",
          "knew",
          "learnt",
          "used"
        ],
        "answer": 2,
        "sourceWordIndex": 160
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-9-skills-2-a163737.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u10-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 10,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 10 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/61.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/61.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “to answering your ____ about our planet”.",
        "options": [
          "photos",
          "films",
          "computers",
          "questions"
        ],
        "answer": 3,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “looks blue because ____ covers more than”.",
        "options": [
          "family",
          "water",
          "year",
          "graveyard"
        ],
        "answer": 1,
        "sourceWordIndex": 88
      },
      {
        "text": "Chọn từ nghe được: “for plants and ____. It's fascinating to”.",
        "options": [
          "animals",
          "materials",
          "friends",
          "clothes"
        ],
        "answer": 0,
        "sourceWordIndex": 161
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-10-getting-started-a163750.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u10-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 10,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 10 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/64.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/64.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “don't feel like ____ it. Why don't”.",
        "options": [
          "shopping",
          "walking",
          "listening",
          "reading"
        ],
        "answer": 3,
        "sourceWordIndex": 15
      },
      {
        "text": "Chọn từ nghe được: “like it. OK, ____ think about that”.",
        "options": [
          "I'll",
          "Maths",
          "Phone",
          "Space"
        ],
        "answer": 0,
        "sourceWordIndex": 29
      },
      {
        "text": "Chọn từ nghe được: “contribution would really ____ us out. Alright”.",
        "options": [
          "share",
          "listen",
          "build",
          "help"
        ],
        "answer": 3,
        "sourceWordIndex": 55
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-10-communication-a163765.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u10-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 10,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 10 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/65.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/65.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “or harm their ____. For example, when”.",
        "options": [
          "day",
          "computer",
          "literature",
          "environment"
        ],
        "answer": 3,
        "sourceWordIndex": 32
      },
      {
        "text": "Chọn từ nghe được: “good question. Similarly, ____ can cause harm”.",
        "options": [
          "parents",
          "animals",
          "books",
          "activities"
        ],
        "answer": 1,
        "sourceWordIndex": 93
      },
      {
        "text": "Chọn từ nghe được: “and animals from ____ places. We shouldn't”.",
        "options": [
          "safe",
          "interesting",
          "popular",
          "different"
        ],
        "answer": 3,
        "sourceWordIndex": 155
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-10-skills-2-a163773.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u11-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 11,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 11 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/67.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/67.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “and can be ____ for studying and”.",
        "options": [
          "loved",
          "called",
          "came",
          "used"
        ],
        "answer": 3,
        "sourceWordIndex": 45
      },
      {
        "text": "Chọn từ nghe được: “lighter than a ____ because it's smaller”.",
        "options": [
          "schoolyard",
          "laptop",
          "day",
          "ticket"
        ],
        "answer": 1,
        "sourceWordIndex": 87
      },
      {
        "text": "Chọn từ nghe được: “keyboard. Can I ____ and draw on”.",
        "options": [
          "try",
          "collect",
          "write",
          "walk"
        ],
        "answer": 2,
        "sourceWordIndex": 155
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-11-getting-started-a163833.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u11-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 11,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 11 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/70.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/70.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “me? You just ____ it carefully and”.",
        "options": [
          "love",
          "test",
          "stay",
          "read"
        ],
        "answer": 3,
        "sourceWordIndex": 12
      },
      {
        "text": "Chọn từ nghe được: “got what you ____. First, enter the”.",
        "options": [
          "love",
          "collect",
          "mean",
          "swim"
        ],
        "answer": 2,
        "sourceWordIndex": 30
      },
      {
        "text": "Chọn từ nghe được: “sorry. I don't ____ follow you. Could”.",
        "options": [
          "month",
          "quite",
          "comedy",
          "fish"
        ],
        "answer": 1,
        "sourceWordIndex": 56
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-11-communication-a163858.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u11-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 11,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 11 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/71.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/71.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “dust, spots, and ____ marks in my”.",
        "options": [
          "dirty",
          "confident",
          "helpful",
          "careful"
        ],
        "answer": 0,
        "sourceWordIndex": 31
      },
      {
        "text": "Chọn từ nghe được: “do in the ____. First, it'll be”.",
        "options": [
          "hobby",
          "schoolyard",
          "tennis",
          "future"
        ],
        "answer": 3,
        "sourceWordIndex": 89
      },
      {
        "text": "Chọn từ nghe được: “houses. Finally, laser ____ will make it”.",
        "options": [
          "earth",
          "evening",
          "technology",
          "science"
        ],
        "answer": 2,
        "sourceWordIndex": 146
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-11-skills-2-a163861.html",
      "section": "Skills 2"
    }
  },
  {
    "id": "g9-u12-getting-started",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 12,
    "lesson": 1,
    "section": "Getting Started",
    "type": "mcq_set",
    "title": "Unit 12 · Hội thoại mở đầu",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/73.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/73.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “leavers. My teacher ____ us that if”.",
        "options": [
          "visited",
          "said",
          "called",
          "told"
        ],
        "answer": 3,
        "sourceWordIndex": 44
      },
      {
        "text": "Chọn từ nghe được: “makes lots of ____. And you? What”.",
        "options": [
          "rubbish",
          "technology",
          "money",
          "festival"
        ],
        "answer": 2,
        "sourceWordIndex": 103
      },
      {
        "text": "Chọn từ nghe được: “design after high ____. Hope you'll achieve”.",
        "options": [
          "shop",
          "garden",
          "school",
          "mountain"
        ],
        "answer": 2,
        "sourceWordIndex": 170
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-12-getting-started-a163866.html",
      "section": "Getting Started"
    }
  },
  {
    "id": "g9-u12-communication",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 12,
    "lesson": 2,
    "section": "Communication",
    "type": "mcq_set",
    "title": "Unit 12 · Giao tiếp",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/75.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/75.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “the registration form. ____, I'll be a”.",
        "options": [
          "Hopefully",
          "Weekly",
          "Really",
          "Probably"
        ],
        "answer": 0,
        "sourceWordIndex": 6
      },
      {
        "text": "Chọn từ nghe được: “of the science ____. I hope so”.",
        "options": [
          "sport",
          "earth",
          "club",
          "morning"
        ],
        "answer": 2,
        "sourceWordIndex": 14
      },
      {
        "text": "Chọn từ nghe được: “letter. I hope ____ get the job”.",
        "options": [
          "Geography",
          "Food",
          "Year",
          "I'll"
        ],
        "answer": 3,
        "sourceWordIndex": 26
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-12-communication-a163873.html",
      "section": "Communication"
    }
  },
  {
    "id": "g9-u12-skills-2",
    "track": "thcs",
    "stage": 4,
    "grade": 9,
    "unit": 12,
    "lesson": 3,
    "section": "Skills 2",
    "type": "mcq_set",
    "title": "Unit 12 · Bài nghe theo Unit",
    "audioUrl": "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/76.mp3",
    "referenceAudioUrls": [
      "https://f005.backblazeb2.com/file/lddenglish/listening/loigiaihay/2024/0516/76.mp3"
    ],
    "taskPrompt": "Nghe từ đầu đến cuối. Chọn từ còn thiếu trong các cụm dưới đây; câu hỏi giữ đúng thứ tự trong bản ghi âm.",
    "questions": [
      {
        "text": "Chọn từ nghe được: “farmers like my ____ to earn a”.",
        "options": [
          "services",
          "pictures",
          "parents",
          "robots"
        ],
        "answer": 2,
        "sourceWordIndex": 33
      },
      {
        "text": "Chọn từ nghe được: “I'm glad I'm ____ well at it”.",
        "options": [
          "doing",
          "travelling",
          "listening",
          "spending"
        ],
        "answer": 0,
        "sourceWordIndex": 87
      },
      {
        "text": "Chọn từ nghe được: “career further. I'm ____ more about food”.",
        "options": [
          "spending",
          "staying",
          "working",
          "learning"
        ],
        "answer": 3,
        "sourceWordIndex": 164
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-12-skills-2-a163878.html",
      "section": "Skills 2"
    }
  }
];
  curriculum.exercises = curriculum.exercises.filter(item => item.track !== 'thcs').concat(bank);
  curriculum.thcsBankVersion = '2026-10-01-unit-bank-v1';
  curriculum.tracks.thcs.stages.forEach(stage => {
    stage.title = 'Nghe lớp ' + (stage.stage + 5) + ' · 12 Unit';
    stage.description = 'Mỗi Unit có 3 bài: hội thoại mở đầu, giao tiếp và bài nghe theo Unit. Chọn từ/cụm từ đúng theo thứ tự MP3.';
  });
})();
