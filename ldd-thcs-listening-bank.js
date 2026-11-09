/* THCS listening: one source recording paired with its own ordered question set.
 * All 144 THCS recordings have 3 questions: True/False, short MCQ (up to 5 words), long MCQ (>5 words).
 * Only MCQ answer choices may be shuffled; True/False remains in True, False order.
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Phong introduces Duy as his new friend.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What kind of bag looks heavy?",
        "options": [
          "A library bag",
          "A store bag",
          "A town bag",
          "A school bag"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What do the students say about their uniforms?",
        "options": [
          "They say that they always look traditional when wearing their school uniforms.",
          "They say that they always look patient when wearing their school uniforms.",
          "They say that they always look smart when wearing their school uniforms.",
          "They say that they always look important when wearing their school uniforms."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Phong introduces Duy as his cousin.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does someone say when greeting Duy?",
        "options": [
          "Nice to meet you",
          "Nice to draw you",
          "Nice to write you",
          "Nice to stay you"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What does someone say when meeting Phong?",
        "options": [
          "The speaker says that it is Health to meet Phong for the first time.",
          "The speaker says that it is Nice to meet Phong for the first time.",
          "The speaker says that it is Computer to meet Phong for the first time.",
          "The speaker says that it is Evening to meet Phong for the first time."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker studies at Palmer School.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which subject does the teacher teach?",
        "options": [
          "webcam",
          "maths",
          "habit",
          "health"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Where does the speaker do homework?",
        "options": [
          "The speaker says they do their homework in the school mountain.",
          "The speaker says they do their homework in the school street.",
          "The speaker says they do their homework in the school library.",
          "The speaker says they do their homework in the school store."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Elena is Nick's sister.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who lives with the speaker?",
        "options": [
          "Their buildings",
          "Their skills",
          "Their parents",
          "Their teachers"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which room is mentioned in the description of the house?",
        "options": [
          "The speaker says the house has a cooking room and three bedrooms.",
          "The speaker says the house has a building room and three bedrooms.",
          "The speaker says the house has a living room and three bedrooms.",
          "The speaker says the house has a making room and three bedrooms."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker is pleased with the way their bedroom looks.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Where might they put a picture?",
        "options": [
          "On the wall",
          "On the suitcase",
          "On the life",
          "On the phone"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Where do they plan to buy a picture?",
        "options": [
          "They plan to go to the department store to buy a new picture.",
          "They plan to go to the department airport to buy a new picture.",
          "They plan to go to the department street to buy a new picture.",
          "They plan to go to the department mountain to buy a new picture."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker lives with their parents.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which room is their favourite?",
        "options": [
          "The living town",
          "The living room",
          "The living mountain",
          "The living sea"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does the speaker do in the room?",
        "options": [
          "The speaker says that they often read books in their favourite room.",
          "The speaker says that they sometimes read books in their favourite room.",
          "The speaker says that they quickly read books in their favourite room.",
          "The speaker says that they frequently read books in their favourite room."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Phong is reading something when the conversation begins.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What colour is the girl's hair?",
        "options": [
          "grey",
          "yellow",
          "black",
          "blue"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What do they say they have plenty of?",
        "options": [
          "One of the speakers says they have lots of stress available.",
          "One of the speakers says they have lots of food available.",
          "One of the speakers says they have lots of computer available.",
          "One of the speakers says they have lots of life available."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The conversation includes a description of a best friend.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What colour is the friend's hair?",
        "options": [
          "white",
          "grey",
          "black",
          "red"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How is the friend described?",
        "options": [
          "The speaker says that her friend is very kind and creative.",
          "The speaker says that her friend is very excellent and creative.",
          "The speaker says that her friend is very noisy and creative.",
          "The speaker says that her friend is very jealous and creative."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The girl in the description has short black hair.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who is the girl to the speaker?",
        "options": [
          "A best earth",
          "A best space",
          "A best friend",
          "A best graveyard"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What is the girl's habit with homework?",
        "options": [
          "The speaker says that she usually does her homework and works hard.",
          "The speaker says that she quickly does her homework and works hard.",
          "The speaker says that she always does her homework and works hard.",
          "The speaker says that she probably does her homework and works hard."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker thinks the area is beautiful.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which direction should they turn?",
        "options": [
          "Turn left",
          "Turn called",
          "Turn gave",
          "Turn helped"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which famous place do they ask directions to?",
        "options": [
          "The speaker asks someone for directions to Tan Ky Station.",
          "The speaker asks someone for directions to Tan Ky Town.",
          "The speaker asks someone for directions to Tan Ky World.",
          "The speaker asks someone for directions to Tan Ky House."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker asks for directions to the cinema.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which side is the place on?",
        "options": [
          "On your found",
          "On your left",
          "On your knew",
          "On your brought"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What place does the route start from?",
        "options": [
          "The directions begin when the person comes out of the station.",
          "The directions begin when the person comes out of the airport.",
          "The directions begin when the person comes out of the road.",
          "The directions begin when the person comes out of the community."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker talks about Ho Chi Minh City.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What cultural places are mentioned?",
        "options": [
          "Art parents",
          "Art games",
          "Art houses",
          "Art galleries"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What problem does the speaker mention about the streets?",
        "options": [
          "The speaker says that the air is not very clean and the streets are busy.",
          "The speaker says that the air is not very careful and the streets are busy.",
          "The speaker says that the air is not very boring and the streets are busy.",
          "The speaker says that the air is not very smart and the streets are busy."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The conversation reminds someone to be on time.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which place appears in the first picture?",
        "options": [
          "Health Da Dia",
          "Food Da Dia",
          "Geography Da Dia",
          "Ganh Da Dia"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What geographical feature is shown in another picture?",
        "options": [
          "The speaker describes Phu Quoc as a large country in the sea.",
          "The speaker describes Phu Quoc as a large island in the sea.",
          "The speaker describes Phu Quoc as a large library in the sea.",
          "The speaker describes Phu Quoc as a large street in the sea."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers are making plans for a Sunday picnic.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What do they want to arrange?",
        "options": [
          "A time to write",
          "A time to shop",
          "A time to meet",
          "A time to love"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What do they say about meeting at nine?",
        "options": [
          "One person agrees and says that I'll meet the other at nine o'clock.",
          "One person agrees and says that Weather meet the other at nine o'clock.",
          "One person agrees and says that Evening meet the other at nine o'clock.",
          "One person agrees and says that Year meet the other at nine o'clock."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker describes beautiful beaches.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is easy because of the airport?",
        "options": [
          "talking there",
          "travelling there",
          "learning there",
          "helping there"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which activities are popular near the coast?",
        "options": [
          "The speaker explains that fishing and other space sports are popular there.",
          "The speaker explains that fishing and other wind sports are popular there.",
          "The speaker explains that fishing and other history sports are popular there.",
          "The speaker explains that fishing and other water sports are popular there."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Tet falls at the same time every year.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What kind of gatherings happen at Tet?",
        "options": [
          "science gatherings",
          "family gatherings",
          "breakfast gatherings",
          "eyes gatherings"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What greeting should people give at Tet?",
        "options": [
          "The speaker says that people should wish each other a Important New Year.",
          "The speaker says that people should wish each other a Happy New Year.",
          "The speaker says that people should wish each other a Clever New Year.",
          "The speaker says that people should wish each other a Shy New Year."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The conversation includes a New Year greeting.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is wished together with joy?",
        "options": [
          "Joy and laughter",
          "Joy and silence",
          "Joy and sadness",
          "Joy and anger"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which month is mentioned as the end of the year?",
        "options": [
          "The speaker mentions the period from January to December when talking about the calendar.",
          "The speaker mentions the period from January to September when talking about the calendar.",
          "The speaker mentions the period from January to June when talking about the calendar.",
          "The speaker mentions the period from January to March when talking about the calendar."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker feels happy about Tet.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which flowers are mentioned?",
        "options": [
          "Peach flowers",
          "Peach services",
          "Peach sports",
          "Peach families"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What should people make at Tet?",
        "options": [
          "The speaker says that everyone should make some films for the new year.",
          "The speaker says that everyone should make some trees for the new year.",
          "The speaker says that everyone should make some festivals for the new year.",
          "The speaker says that everyone should make some wishes for the new year."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker finds the television show interesting.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the speaker often do with the shows?",
        "options": [
          "work them",
          "watch them",
          "write them",
          "build them"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which programme is mentioned by name?",
        "options": [
          "The speaker says that they watch a programme called Space in a Minute.",
          "The speaker says that they watch a programme called Pollution in a Minute.",
          "The speaker says that they watch a programme called English in a Minute.",
          "The speaker says that they watch a programme called Stress in a Minute."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The conversation is about a favourite TV programme.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can the person see on TV?",
        "options": [
          "The Holiday",
          "The Laptop",
          "The Because",
          "The Food"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Why does the person like the programme?",
        "options": [
          "The speaker likes it because they can see festivals in their real habitats.",
          "The speaker likes it because they can see materials in their real habitats.",
          "The speaker likes it because they can see animals in their real habitats.",
          "The speaker likes it because they can see activities in their real habitats."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The programme schedule includes a show at eight o'clock.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can viewers do at the scheduled time?",
        "options": [
          "change Harry Potter",
          "watch Harry Potter",
          "work Harry Potter",
          "talk Harry Potter"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What time is another programme scheduled for?",
        "options": [
          "The speaker says that another programme starts at nine o'clock in the evening.",
          "The speaker says that another programme starts at twelve o'clock in the evening.",
          "The speaker says that another programme starts at five o'clock in the evening.",
          "The speaker says that another programme starts at one o'clock in the evening."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers talk about karate and table tennis.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where is someone invited to go?",
        "options": [
          "The karate club",
          "The karate football",
          "The karate noise",
          "The karate afternoon"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "On which day does the karate club meet?",
        "options": [
          "The speaker says that the club meets on Tuesday in the morning.",
          "The speaker says that the club meets on Sunday in the morning.",
          "The speaker says that the club meets on Monday in the morning.",
          "The speaker says that the club meets on Saturday in the morning."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Someone played table tennis with Duy.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Was it their first or second time?",
        "options": [
          "The first comedy",
          "The first time",
          "The first suitcase",
          "The first money"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What title does the student receive?",
        "options": [
          "The speaker congratulates the student on becoming the new sports champion.",
          "The speaker congratulates the student on becoming the new class champion.",
          "The speaker congratulates the student on becoming the new languages champion.",
          "The speaker congratulates the student on becoming the new places champion."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker often goes cycling with their father.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How old is Alice?",
        "options": [
          "twelve years old",
          "five years old",
          "nine years old",
          "thousand years old"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What does Alice sometimes do on Saturdays?",
        "options": [
          "Alice says that she sometimes write computer games on Saturdays as well.",
          "Alice says that she sometimes play computer games on Saturdays as well.",
          "Alice says that she sometimes try computer games on Saturdays as well.",
          "Alice says that she sometimes stay computer games on Saturdays as well."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Sydney is a city in Australia.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is bad when it rains?",
        "options": [
          "The day",
          "The weather",
          "The computer",
          "The money"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does the visitor want to do in Sydney?",
        "options": [
          "The speaker says that the visitor wants to see many hobbies around the city.",
          "The speaker says that the visitor wants to see many pictures around the city.",
          "The speaker says that the visitor wants to see many robots around the city.",
          "The speaker says that the visitor wants to see many places around the city."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Someone compliments the city during the conversation.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What kind of sky is mentioned?",
        "options": [
          "A earth sky",
          "A swimming sky",
          "A english sky",
          "A clear sky"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What features of the city impress the speaker?",
        "options": [
          "The speaker looks at the clear sky and the tall materials in the city.",
          "The speaker looks at the clear sky and the tall buildings in the city.",
          "The speaker looks at the clear sky and the tall sisters in the city.",
          "The speaker looks at the clear sky and the tall robots in the city."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker describes a large weekend market.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can visitors do there?",
        "options": [
          "plant the market",
          "like the market",
          "visit the market",
          "know the market"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What can visitors find around the market?",
        "options": [
          "The speaker says that there are many suitcase stalls all around the market.",
          "The speaker says that there are many food stalls all around the market.",
          "The speaker says that there are many rain stalls all around the market.",
          "The speaker says that there are many name stalls all around the market."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Someone imagines a future house with twenty rooms.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How many rooms might the house have?",
        "options": [
          "hundred rooms",
          "five rooms",
          "twenty rooms",
          "thirty rooms"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which devices might the future house have?",
        "options": [
          "The speaker imagines a future home with several noisy televisions and other devices.",
          "The speaker imagines a future home with several healthy televisions and other devices.",
          "The speaker imagines a future home with several smart televisions and other devices.",
          "The speaker imagines a future home with several funny televisions and other devices."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The person is showing off a new computer.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is the new present?",
        "options": [
          "A life",
          "A holiday",
          "A computer",
          "A entrance"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Who bought the present for the speaker?",
        "options": [
          "The speaker says that their parents left the new computer to them.",
          "The speaker says that their parents gave the new computer to them.",
          "The speaker says that their parents collected the new computer to them.",
          "The speaker says that their parents liked the new computer to them."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers discuss a dream house.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How is the flat described?",
        "options": [
          "A shy flat",
          "A patient flat",
          "A creative flat",
          "A beautiful flat"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What could the speaker watch in the dream home?",
        "options": [
          "The speaker imagines being able to watch houses from other planets at home.",
          "The speaker imagines being able to watch books from other planets at home.",
          "The speaker imagines being able to watch flowers from other planets at home.",
          "The speaker imagines being able to watch films from other planets at home."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers discuss helping the environment.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can a reusable bag do?",
        "options": [
          "listen the environment",
          "visit the environment",
          "try the environment",
          "help the environment"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What action can make the air cleaner?",
        "options": [
          "The speaker says that if more people draw the air will become cleaner.",
          "The speaker says that if more people cycle the air will become cleaner.",
          "The speaker says that if more people bring the air will become cleaner.",
          "The speaker says that if more people plant the air will become cleaner."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Someone is giving too much food to a goldfish.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What are they giving the fish?",
        "options": [
          "Too much night",
          "Too much backpack",
          "Too much month",
          "Too much food"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What warning does the speaker give?",
        "options": [
          "The speaker warns that if you give the goldfish too much it may be harmful.",
          "The speaker warns that if you cycle the goldfish too much it may be harmful.",
          "The speaker warns that if you want the goldfish too much it may be harmful.",
          "The speaker warns that if you need the goldfish too much it may be harmful."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers discuss organising activities that help the environment.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can people exchange at the fair?",
        "options": [
          "Used problems",
          "Used projects",
          "Used photos",
          "Used books"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What could the fair do for the environment?",
        "options": [
          "The speaker believes that the event will be fun and want the environment.",
          "The speaker believes that the event will be fun and help the environment.",
          "The speaker believes that the event will be fun and build the environment.",
          "The speaker believes that the event will be fun and travel the environment."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers are visiting a robot show.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which machine is described as the biggest?",
        "options": [
          "The biggest name",
          "The biggest information",
          "The biggest maths",
          "The biggest robot"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What can a robot do for sick people?",
        "options": [
          "The speaker says that this robot can plant sick people and support them.",
          "The speaker says that this robot can have sick people and support them.",
          "The speaker says that this robot can collect sick people and support them.",
          "The speaker says that this robot can help sick people and support them."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers think robots can help people in everyday life.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where can robots provide assistance?",
        "options": [
          "Daily wind",
          "Daily rubbish",
          "Daily life",
          "Daily water"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Does everyone agree with the speaker's opinion?",
        "options": [
          "One speaker says that they do not space with the other person's view.",
          "One speaker says that they do not art with the other person's view.",
          "One speaker says that they do not agree with the other person's view.",
          "One speaker says that they do not friend with the other person's view."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Home robots can do housework.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can teacher robots do?",
        "options": [
          "collect",
          "teach",
          "sell",
          "cycle"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What is something robots cannot do?",
        "options": [
          "The speaker says that robots cannot spend human feelings in the same way as people.",
          "The speaker says that robots cannot help human feelings in the same way as people.",
          "The speaker says that robots cannot understand human feelings in the same way as people.",
          "The speaker says that robots cannot plant human feelings in the same way as people."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Trang enjoys building dollhouses as a hobby.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does Trang describe horse riding?",
        "options": [
          "Rather unusual",
          "Very cheap",
          "Really boring",
          "Too dangerous"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What does Trang want to do this Sunday?",
        "options": [
          "She wants to visit Ann's horse-riding club this Sunday.",
          "She plans to join a new painting class this Sunday.",
          "She is going to build a dollhouse with Ann.",
          "She wants to go shopping with her friends."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Ann particularly enjoys reading books about science.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which other hobby does Mi ask about?",
        "options": [
          "Cooking",
          "Painting",
          "Swimming",
          "Cycling"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Why doesn't Ann enjoy painting as a hobby?",
        "options": [
          "She says she is not interested in art.",
          "She thinks painting is too expensive for her family.",
          "She does not have any time after school.",
          "She says she prefers playing basketball every day."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Lan thinks Trang's dollhouse hobby is very common.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Who else likes building dollhouses?",
        "options": [
          "Her mother",
          "Her cousin Mi",
          "Her neighbour",
          "Her sister"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does Trang do after making the dolls from cloth?",
        "options": [
          "She buys more cardboard before starting another house.",
          "She takes the dolls to her friend's house.",
          "She decorates the dollhouse after making the cloth dolls.",
          "She paints all the furniture before sewing clothes."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Mark went boating with his dad at Yen So Park.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where does Mi's family cycle?",
        "options": [
          "In the countryside",
          "Around the city centre",
          "Near the market",
          "At the airport"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What should Mark bring when he joins Mi's family?",
        "options": [
          "He should bring a hat and some suncream.",
          "He needs to take an umbrella and a camera.",
          "He should wear a coat and bring a scarf.",
          "He needs to take a book and some paints."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The girl in the conversation says her eyes feel tired.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the boy suggest using?",
        "options": [
          "New glasses",
          "Eye drops",
          "A sun hat",
          "An eye mask"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does the boy advise the girl not to do?",
        "options": [
          "He tells her not to read in dim light.",
          "He advises her not to go outside after school.",
          "He asks her not to drink cold water.",
          "He tells her not to use eye drops."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker recommends vegetables such as carrots and tomatoes.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What daily activity is recommended?",
        "options": [
          "Watching television",
          "Eating fast food",
          "Exercise and movement",
          "Sleeping all afternoon"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How should people keep their rooms according to the speaker?",
        "options": [
          "They should keep their rooms tidy and clean.",
          "They should decorate their rooms with many new paintings.",
          "They should always keep their windows closed in summer.",
          "They should buy expensive furniture for their bedrooms."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Tom bought Minh a card game.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does Minh's club plant?",
        "options": [
          "Vegetables",
          "Fruit trees",
          "Flowers",
          "Rice"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Who did Tom's school teach English to last summer?",
        "options": [
          "They taught English to thirty children last summer.",
          "They gave free English lessons to fifty adults.",
          "They helped twenty teachers to learn English online.",
          "They taught French to thirty students last summer."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Mark and his friends helped their community last summer.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What did they pick up?",
        "options": [
          "Leaves",
          "Rubbish",
          "Books",
          "Flowers"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Who received the donated books and warm clothes?",
        "options": [
          "They went to friends living in mountainous areas.",
          "They were given to the teachers at Mark's school.",
          "They were collected by families living near the beach.",
          "They were sent to tourists visiting the city."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Linda and her friends taught children English and maths.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How did helping others make them feel?",
        "options": [
          "Angry",
          "Bored",
          "Useful",
          "Tired"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What did Tom and his friends enjoy after watering trees?",
        "options": [
          "They enjoyed watching the trees grow after watering them.",
          "They went swimming in the lake near their school.",
          "They bought more flowers to decorate their classroom.",
          "They listened to music and played football together."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker often plays the piano.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which art activity is mentioned?",
        "options": [
          "painting",
          "talking",
          "trying",
          "cooking"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What does the speaker want to do instead?",
        "options": [
          "One person says they would help to go to a different activity.",
          "One person says they would prefer to go to a different activity.",
          "One person says they would want to go to a different activity.",
          "One person says they would sing to go to a different activity."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers both say they prefer pop music over folk music.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What aspect of the music is compared?",
        "options": [
          "The beat",
          "The rubbish",
          "The week",
          "The money"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which type of art does the speaker prefer?",
        "options": [
          "The speaker says that they like helpful art more than folk art.",
          "The speaker says that they like clean art more than folk art.",
          "The speaker says that they like busy art more than folk art.",
          "The speaker says that they like modern art more than folk art."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Artists create pictures on pavements using chalk.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who can become an artist?",
        "options": [
          "lunch",
          "year",
          "yourself",
          "exercise"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Why do visitors come to the event?",
        "options": [
          "Visitors come to meet the pavement art and watch the artists at work.",
          "Visitors come to enjoy the pavement art and watch the artists at work.",
          "Visitors come to teach the pavement art and watch the artists at work.",
          "Visitors come to have the pavement art and watch the artists at work."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The meal includes pork cooked in fish sauce.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which kind of tea is available?",
        "options": [
          "brown tea",
          "blue tea",
          "green tea",
          "yellow tea"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What kind of melon juice is ordered?",
        "options": [
          "The customer asks for a can of winter melon juice with the meal.",
          "The customer asks for a can of space melon juice with the meal.",
          "The customer asks for a can of sport melon juice with the meal.",
          "The customer asks for a can of history melon juice with the meal."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A bottle of mineral water costs fifty thousand dong.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What currency is used for prices?",
        "options": [
          "comedy",
          "wind",
          "year",
          "dong"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "How much do the apples cost?",
        "options": [
          "The price for the apples is 50 thousand dong in the conversation.",
          "The price for the apples is 52 thousand dong in the conversation.",
          "The price for the apples is 51 thousand dong in the conversation.",
          "The price for the apples is 53 thousand dong in the conversation."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker sometimes eats instant soup with bread.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who gathers around the table?",
        "options": [
          "The technology",
          "The art",
          "The family",
          "The basketball"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does the speaker have with some fruit?",
        "options": [
          "The speaker says that they have fruit and white tea after the meal.",
          "The speaker says that they have fruit and green tea after the meal.",
          "The speaker says that they have fruit and purple tea after the meal.",
          "The speaker says that they have fruit and red tea after the meal."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers mention Minh Lower Secondary School.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which school room can visitors see?",
        "options": [
          "The school market",
          "The school library",
          "The school forest",
          "The school garden"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What do visitors plan to do at the school?",
        "options": [
          "The visitors plan to take photos of the school during their visit.",
          "The visitors plan to take trees of the school during their visit.",
          "The visitors plan to take families of the school during their visit.",
          "The visitors plan to take materials of the school during their visit."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The invitation is for Sunday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which school are they talking about?",
        "options": [
          "Minh Lower Secondary Country",
          "Minh Lower Secondary Office",
          "Minh Lower Secondary School",
          "Minh Lower Secondary House"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Who is expected to join the visit?",
        "options": [
          "The speaker says that their skills David and Nick will also join the visit.",
          "The speaker says that their friends David and Nick will also join the visit.",
          "The speaker says that their sports David and Nick will also join the visit.",
          "The speaker says that their parents David and Nick will also join the visit."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The students have been busy studying their subjects.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What do club members do on Saturdays?",
        "options": [
          "smart streets",
          "unusual streets",
          "clean streets",
          "natural streets"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which group grows vegetables in the garden?",
        "options": [
          "The students take part in the Green Garden Rain where they grow vegetables.",
          "The students take part in the Green Garden Ticket where they grow vegetables.",
          "The students take part in the Green Garden Club where they grow vegetables.",
          "The students take part in the Green Garden Robot where they grow vegetables."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker cycled around the area last Sunday afternoon.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where does the other person travel?",
        "options": [
          "To school",
          "To mountain",
          "To countryside",
          "To village"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "When do the friends plan to visit the lake?",
        "options": [
          "The speaker suggests that the friends should meet this Wednesday at the lake.",
          "The speaker suggests that the friends should meet this Sunday at the lake.",
          "The speaker suggests that the friends should meet this Friday at the lake.",
          "The speaker suggests that the friends should meet this Thursday at the lake."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers discuss how their mothers travel to work.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does one mother travel?",
        "options": [
          "By morning",
          "By motorbike",
          "By environment",
          "By friend"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "How often does the other mother cycle to work?",
        "options": [
          "The speaker says that she Slowly cycles instead of going by bus.",
          "The speaker says that she Sometimes cycles instead of going by bus.",
          "The speaker says that she Finally cycles instead of going by bus.",
          "The speaker says that she Frequently cycles instead of going by bus."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Traffic jams occur in cities around the world.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where is there a traffic problem?",
        "options": [
          "In this community",
          "In this store",
          "In this city",
          "In this road"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Who does not always follow traffic rules?",
        "options": [
          "The speaker explains that many road users do not follow the rules.",
          "The speaker explains that many river users do not follow the rules.",
          "The speaker explains that many station users do not follow the rules.",
          "The speaker explains that many store users do not follow the rules."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers plan to visit Sao Mai Cinema tonight.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What do they ask about the film?",
        "options": [
          "Its kind",
          "Its comfortable",
          "Its happy",
          "Its natural"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What do the film's characters decide to exchange?",
        "options": [
          "The characters in the film decide to exchange flowers during their holiday.",
          "The characters in the film decide to exchange questions during their holiday.",
          "The characters in the film decide to exchange houses during their holiday.",
          "The characters in the film decide to exchange teachers during their holiday."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Someone suggests going to the cinema tonight.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which film is mentioned?",
        "options": [
          "A Nightmare",
          "A Tennis",
          "A Week",
          "A Noise"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Why is the cinema difficult to visit?",
        "options": [
          "The speaker says that the cinema is too far to have to this evening.",
          "The speaker says that the cinema is too far to cycle to this evening.",
          "The speaker says that the cinema is too far to enjoy to this evening.",
          "The speaker says that the cinema is too far to travel to this evening."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker likes films made by Simon.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Whose marriage ends in the film?",
        "options": [
          "Their friends",
          "Their parents",
          "Their books",
          "Their traditions"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "How does the speaker describe the film?",
        "options": [
          "The speaker says that the film is both active and moving to the audience.",
          "The speaker says that the film is both helpful and moving to the audience.",
          "The speaker says that the film is both funny and moving to the audience.",
          "The speaker says that the film is both friendly and moving to the audience."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A picture from the Dutch Tulip Festival is mentioned.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which festival appears in the picture?",
        "options": [
          "The Dutch Tulip Stress",
          "The Dutch Tulip Comedy",
          "The Dutch Tulip Sun",
          "The Dutch Tulip Festival"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What disappoints someone about the festival?",
        "options": [
          "The speaker complains that there was no robot or drink available at the event.",
          "The speaker complains that there was no light or drink available at the event.",
          "The speaker complains that there was no food or drink available at the event.",
          "The speaker complains that there was no sport or drink available at the event."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The conversation is about a music festival last Sunday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What was the band like?",
        "options": [
          "It was late",
          "It was holiday",
          "It was name",
          "It was dinner"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How were the singers described?",
        "options": [
          "The speaker says that the singers were not very good laptop at the event.",
          "The speaker says that the singers were not very good air at the event.",
          "The speaker says that the singers were not very good either at the event.",
          "The speaker says that the singers were not very good energy at the event."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The celebration is a national holiday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who participates alongside adults?",
        "options": [
          "families",
          "projects",
          "skills",
          "children"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "How do the participants help homeless people?",
        "options": [
          "The participants cook and serve life to homeless people during the holiday.",
          "The participants cook and serve english to homeless people during the holiday.",
          "The participants cook and serve backpack to homeless people during the holiday.",
          "The participants cook and serve food to homeless people during the holiday."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "One speaker is unsure what energy means.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What kind of gas is discussed?",
        "options": [
          "beautiful gas",
          "jealous gas",
          "natural gas",
          "successful gas"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How are some forms of energy described?",
        "options": [
          "The speaker says that some types of energy are cheap to use.",
          "The speaker says that some types of earth are cheap to use.",
          "The speaker says that some types of space are cheap to use.",
          "The speaker says that some types of evening are cheap to use."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers ask about the meaning of solar energy.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which other energy source is explained?",
        "options": [
          "breakfast energy",
          "wind energy",
          "weather energy",
          "life energy"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What topic does the conversation explain?",
        "options": [
          "The speaker describes another type of comedy and where it comes from.",
          "The speaker describes another type of stress and where it comes from.",
          "The speaker describes another type of energy and where it comes from.",
          "The speaker describes another type of rubbish and where it comes from."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The discussion is about saving energy at home.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the advice help people do?",
        "options": [
          "plant electricity",
          "visit electricity",
          "build electricity",
          "save electricity"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "When should people turn appliances off?",
        "options": [
          "The speaker advises people to turn things off when leaving the park.",
          "The speaker advises people to turn things off when leaving the sea.",
          "The speaker advises people to turn things off when leaving the community.",
          "The speaker advises people to turn things off when leaving the room."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker thinks it is a pity that something is missing.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What problem is absent in the imagined future?",
        "options": [
          "art jams",
          "exercise jams",
          "traffic jams",
          "sun jams"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What future transport system is discussed?",
        "options": [
          "The speakers imagine how people will travel in hyperloops in the future.",
          "The speakers imagine how people will stay in hyperloops in the future.",
          "The speakers imagine how people will visit in hyperloops in the future.",
          "The speakers imagine how people will sell in hyperloops in the future."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers imagine travelling by flying car.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How certain is the speaker's prediction?",
        "options": [
          "always",
          "regularly",
          "certainly",
          "firstly"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Is crossing oceans with flying cars likely?",
        "options": [
          "The speaker thinks it slowly will not be possible to fly across oceans.",
          "The speaker thinks it probably will not be possible to fly across oceans.",
          "The speaker thinks it secondly will not be possible to fly across oceans.",
          "The speaker thinks it usually will not be possible to fly across oceans."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The discussion is about travelling in the year 2020.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What might future vehicles be like?",
        "options": [
          "unusual",
          "careful",
          "safe",
          "difficult"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What other way of travelling is considered?",
        "options": [
          "The speaker also discusses the possibility of travelling on the sea in the future.",
          "The speaker also discusses the possibility of improving on the sea in the future.",
          "The speaker also discusses the possibility of visiting on the sea in the future.",
          "The speaker also discusses the possibility of planting on the sea in the future."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speakers discuss reading maps to find directions.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What did the visitors do during their trip?",
        "options": [
          "took a tour",
          "went a tour",
          "visited a tour",
          "met a tour"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What do Australians enjoy doing outside?",
        "options": [
          "The speakers say that Australians love outdoor festivals and take part in them.",
          "The speakers say that Australians love outdoor activities and take part in them.",
          "The speakers say that Australians love outdoor pictures and take part in them.",
          "The speakers say that Australians love outdoor houses and take part in them."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Kilts are described as short skirts.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which year is mentioned in the discussion?",
        "options": [
          "2020",
          "2021",
          "2019",
          "2022"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How many visitors did California attract?",
        "options": [
          "The speaker says that California attracted nearly 22 million visitors during that year.",
          "The speaker says that California attracted nearly 24 million visitors during that year.",
          "The speaker says that California attracted nearly 21 million visitors during that year.",
          "The speaker says that California attracted nearly 23 million visitors during that year."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "The speaker mentions a family living in London.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which river is mentioned in London?",
        "options": [
          "The Park Thames",
          "The City Thames",
          "The River Thames",
          "The Shop Thames"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Where can people see the famous landmark?",
        "options": [
          "The speaker says that the landmark stands on the River Thames in London.",
          "The speaker says that the landmark stands on the River Houses in London.",
          "The speaker says that the landmark stands on the River Animals in London.",
          "The speaker says that the landmark stands on the River Feelings in London."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “know you like knitting Actually I'm keen” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "different I usually hang out",
          "different I regularly hang out",
          "different I actually hang out",
          "different I especially hang out"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “at New World School Yes I'd love” in this recording.",
          "A speaker uses the words “at New World Cinema Yes I'd love” in this recording.",
          "A speaker uses the words “at New World Airport Yes I'd love” in this recording.",
          "A speaker uses the words “at New World Mountain Yes I'd love” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “go to the trying club with me” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "me this Sunday I'd love",
          "me this Friday I'd love",
          "me this Wednesday I'd love",
          "me this Tuesday I'd love"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “going for a visit That's great Thanks” in this recording.",
          "A speaker uses the words “going for a walk That's great Thanks” in this recording.",
          "A speaker uses the words “going for a swim That's great Thanks” in this recording.",
          "A speaker uses the words “going for a live That's great Thanks” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “connect with my family on Saturdays We” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "house We travel our favourite",
          "house We cook our favourite",
          "house We come our favourite",
          "house We read our favourite"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “ride around our city This gives us” in this recording.",
          "A speaker uses the words “ride around our park This gives us” in this recording.",
          "A speaker uses the words “ride around our room This gives us” in this recording.",
          "A speaker uses the words “ride around our countryside This gives us” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “at my uncle’s office in a small” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "great And sometimes I went",
          "great And regularly I went",
          "great And firstly I went",
          "great And finally I went"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “we played traditional games like bamboo dancing” in this recording.",
          "A speaker uses the words “we played traditional teachers like bamboo dancing” in this recording.",
          "A speaker uses the words “we played traditional trees like bamboo dancing” in this recording.",
          "A speaker uses the words “we played traditional flowers like bamboo dancing” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “What a beautiful kite you have Mai” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "me last habit You really",
          "me last week You really",
          "me last weekend You really",
          "me last dinner You really"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “I think its hobby really suits me” in this recording.",
          "A speaker uses the words “I think its fish really suits me” in this recording.",
          "A speaker uses the words “I think its friend really suits me” in this recording.",
          "A speaker uses the words “I think its colour really suits me” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “The people welcome pictures to their homes” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "aren't many places for entertainment",
          "aren't many friends for entertainment",
          "aren't many pictures for entertainment",
          "aren't many parents for entertainment"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “do in the city We can go” in this recording.",
          "A speaker uses the words “do in the museum We can go” in this recording.",
          "A speaker uses the words “do in the shop We can go” in this recording.",
          "A speaker uses the words “do in the park We can go” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “some school club activities We're also preparing” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "discuss these pictures in your",
          "discuss these books in your",
          "discuss these games in your",
          "discuss these problems in your"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “activities to suit convenient interests And there” in this recording.",
          "A speaker uses the words “activities to suit confident interests And there” in this recording.",
          "A speaker uses the words “activities to suit different interests And there” in this recording.",
          "A speaker uses the words “activities to suit unusual interests And there” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “more about the sun club please Certainly” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "Could you ticket me the",
          "Could you show me the",
          "Could you badminton me the",
          "Could you eyes me the"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “block then turn met It’s on your” in this recording.",
          "A speaker uses the words “block then turn left It’s on your” in this recording.",
          "A speaker uses the words “block then turn said It’s on your” in this recording.",
          "A speaker uses the words “block then turn came It’s on your” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “of trying to meet my parents expectations” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "to my houses about this",
          "to my services about this",
          "to my parents about this",
          "to my devices about this"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “about you Mi Actually I don't get” in this recording.",
          "A speaker uses the words “about you Mi Really I don't get” in this recording.",
          "A speaker uses the words “about you Mi Carefully I don't get” in this recording.",
          "A speaker uses the words “about you Mi Especially I don't get” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “Giang Do you test in the mountains” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "a stilt house",
          "a stilt garden",
          "a stilt world",
          "a stilt sea"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “about your culture Finally We have our” in this recording.",
          "A speaker uses the words “about your culture Certainly We have our” in this recording.",
          "A speaker uses the words “about your culture Secondly We have our” in this recording.",
          "A speaker uses the words “about your culture Carefully We have our” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “you think about life in the mountains” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "the mountains live close to",
          "the mountains play close to",
          "the mountains shop close to",
          "the mountains improve close to"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “there are better projects in the city” in this recording.",
          "A speaker uses the words “there are better languages in the city” in this recording.",
          "A speaker uses the words “there are better devices in the city” in this recording.",
          "A speaker uses the words “there are better services in the city” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “and outside the office They learn to” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "and catch fish In the",
          "and catch lunch In the",
          "and catch name In the",
          "and catch volleyball In the"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “and more minority buildings are going to” in this recording.",
          "A speaker uses the words “and more minority sisters are going to” in this recording.",
          "A speaker uses the words “and more minority festivals are going to” in this recording.",
          "A speaker uses the words “and more minority children are going to” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “villages to take pictures with the blooming” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "and ornamental trees everywhere these",
          "and ornamental children everywhere these",
          "and ornamental clothes everywhere these",
          "and ornamental festivals everywhere these"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “of the communal country They hang decorative” in this recording.",
          "A speaker uses the words “of the communal house They hang decorative” in this recording.",
          "A speaker uses the words “of the communal island They hang decorative” in this recording.",
          "A speaker uses the words “of the communal museum They hang decorative” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “friend’s house for friend Could you tell” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "I will Activities a good",
          "I will Brothers a good",
          "I will Families a good",
          "I will It’s a good"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “chopsticks This may bring bad luck to” in this recording.",
          "A speaker uses the words “chopsticks This may watch bad luck to” in this recording.",
          "A speaker uses the words “chopsticks This may use bad luck to” in this recording.",
          "A speaker uses the words “chopsticks This may collect bad luck to” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “Khmers use the festival to thank the” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "to feed students and ask",
          "to feed trees and ask",
          "to feed activities and ask",
          "to feed children and ask"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “some advice to questions at the Ok” in this recording.",
          "A speaker uses the words “some advice to games at the Ok” in this recording.",
          "A speaker uses the words “some advice to tourists at the Ok” in this recording.",
          "A speaker uses the words “some advice to pictures at the Ok” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “here call their subjects by their title” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "In my station people usually",
          "In my country people usually",
          "In my street people usually",
          "In my city people usually"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “are in the science of having breakfast” in this recording.",
          "A speaker uses the words “are in the habit of having breakfast” in this recording.",
          "A speaker uses the words “are in the music of having breakfast” in this recording.",
          "A speaker uses the words “are in the lunch of having breakfast” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “over to your house on Sunday Sure” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "welcome Vietnamese cycling uses a",
          "welcome Vietnamese cooking uses a",
          "welcome Vietnamese watching uses a",
          "welcome Vietnamese swimming uses a"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “vegetables and herbs Yes slowly” in this recording.",
          "A speaker uses the words “vegetables and herbs Yes firstly” in this recording.",
          "A speaker uses the words “vegetables and herbs Yes certainly” in this recording.",
          "A speaker uses the words “vegetables and herbs Yes often” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “off suddenly Really Confident technology sometimes causes” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "with my teachers and friends",
          "with my children and friends",
          "with my friends and friends",
          "with my flowers and friends"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “friendship because it's confident to keep in” in this recording.",
          "A speaker uses the words “friendship because it's easy to keep in” in this recording.",
          "A speaker uses the words “friendship because it's funny to keep in” in this recording.",
          "A speaker uses the words “friendship because it's friendly to keep in” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “The air and water quality are getting” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "do you read by carbon",
          "do you mean by carbon",
          "do you watch by carbon",
          "do you prefer by carbon"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “avoid using single use places like plastic bags” in this recording.",
          "A speaker uses the words “avoid using single use products like plastic bags” in this recording.",
          "A speaker uses the words “avoid using single use sisters like plastic bags” in this recording.",
          "A speaker uses the words “avoid using single use brothers like plastic bags” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “Endangered species are films in the wild” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "do you shop by in",
          "do you buy by in",
          "do you listen by in",
          "do you mean by in"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “live in their tired habitats not in” in this recording.",
          "A speaker uses the words “live in their confident habitats not in” in this recording.",
          "A speaker uses the words “live in their natural habitats not in” in this recording.",
          "A speaker uses the words “live in their generous habitats not in” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “other uses Water pollution happens when wastes” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "of drinking water for humans",
          "of drinking basketball for humans",
          "of drinking suitcase for humans",
          "of drinking money for humans"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “also stop littering sometimes dumping waste into” in this recording.",
          "A speaker uses the words “also stop littering actually dumping waste into” in this recording.",
          "A speaker uses the words “also stop littering especially dumping waste into” in this recording.",
          "A speaker uses the words “also stop littering recently dumping waste into” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “people at the countryside were wearing really” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "in my road Auckland we",
          "in my city Auckland we",
          "in my shop Auckland we",
          "in my store Auckland we"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “Right It’s more friendly Yeah Oh I’ve” in this recording.",
          "A speaker uses the words “Right It’s more expensive Yeah Oh I’ve” in this recording.",
          "A speaker uses the words “Right It’s more convenient Yeah Oh I’ve” in this recording.",
          "A speaker uses the words “Right It’s more easy Yeah Oh I’ve” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “about the SMART backpack I ordered from” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "I’m not happy with the",
          "I’m not responsible with the",
          "I’m not easy with the",
          "I’m not convenient with the"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “one is yellowish brown I'm sorry about” in this recording.",
          "A speaker uses the words “one is yellowish blue I'm sorry about” in this recording.",
          "A speaker uses the words “one is yellowish white I'm sorry about” in this recording.",
          "A speaker uses the words “one is yellowish purple I'm sorry about” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “is easy You love a seller's website” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "time and money However shopping",
          "time and holiday However shopping",
          "time and literature However shopping",
          "time and life However shopping"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “there are many programmes to choose from” in this recording.",
          "A speaker uses the words “there are many products to choose from” in this recording.",
          "A speaker uses the words “there are many computers to choose from” in this recording.",
          "A speaker uses the words “there are many feelings to choose from” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “second time this year I'm sorry to” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "Yes we carefully have tornadoes",
          "Yes we quickly have tornadoes",
          "Yes we actually have tornadoes",
          "Yes we sometimes have tornadoes"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “big funnel of robot moving towards us” in this recording.",
          "A speaker uses the words “big funnel of wind moving towards us” in this recording.",
          "A speaker uses the words “big funnel of night moving towards us” in this recording.",
          "A speaker uses the words “big funnel of breakfast moving towards us” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “sad My grandparents saved this morning A” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "destroyed their house I'm sorry",
          "destroyed their street I'm sorry",
          "destroyed their museum I'm sorry",
          "destroyed their library I'm sorry"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “That’s awful I breakfast your grandparents are” in this recording.",
          "A speaker uses the words “That’s awful I dinner your grandparents are” in this recording.",
          "A speaker uses the words “That’s awful I history your grandparents are” in this recording.",
          "A speaker uses the words “That’s awful I hope your grandparents are” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “a storm each family should prepare an” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "a storm cook inside Even",
          "a storm understand inside Even",
          "a storm build inside Even",
          "a storm stay inside Even"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “away Listen to helpful instructions from local” in this recording.",
          "A speaker uses the words “away Listen to interesting instructions from local” in this recording.",
          "A speaker uses the words “away Listen to important instructions from local” in this recording.",
          "A speaker uses the words “away Listen to confident instructions from local” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “bit worried I've often had a video” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "of the backpack I'll connect",
          "of the football I'll connect",
          "of the computer I'll connect",
          "of the rubbish I'll connect"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “connection here I month the conference goes” in this recording.",
          "A speaker uses the words “connection here I health the conference goes” in this recording.",
          "A speaker uses the words “connection here I hope the conference goes” in this recording.",
          "A speaker uses the words “connection here I television the conference goes” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “here at 9 30 a m and” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "need to improve the devices",
          "need to understand the devices",
          "need to test the devices",
          "need to study the devices"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “and these to Hold on Can you” in this recording.",
          "A speaker uses the words “and these to Habit on Can you” in this recording.",
          "A speaker uses the words “and these to Breakfast on Can you” in this recording.",
          "A speaker uses the words “and these to Weather on Can you” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “so remember to test me at the” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "to the Modern Time",
          "to the Funny Time",
          "to the Active Time",
          "to the Convenient Time"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “is about communication devices in the future” in this recording.",
          "A speaker uses the words “is about communication animals in the future” in this recording.",
          "A speaker uses the words “is about communication traditions in the future” in this recording.",
          "A speaker uses the words “is about communication languages in the future” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “online classes are convenient during bad weather” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "what you plant But there’s",
          "what you cycle But there’s",
          "what you mean But there’s",
          "what you listen But there’s"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “when our human teachers are not available” in this recording.",
          "A speaker uses the words “when our human languages are not available” in this recording.",
          "A speaker uses the words “when our human parents are not available” in this recording.",
          "A speaker uses the words “when our human computers are not available” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “us We'll have office clouds so we” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "lots of children to school",
          "lots of clothes to school",
          "lots of programmes to school",
          "lots of books to school"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “so I can read books from the” in this recording.",
          "A speaker uses the words “so I can stay books from the” in this recording.",
          "A speaker uses the words “so I can cook books from the” in this recording.",
          "A speaker uses the words “so I can try books from the” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “it interact with students Yes Students can” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "also ask skills that are",
          "also ask questions that are",
          "also ask animals that are",
          "also ask neighbours that are"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “That's true Also robots don't have emotional” in this recording.",
          "A speaker uses the words “That's true Also films don't have emotional” in this recording.",
          "A speaker uses the words “That's true Also subjects don't have emotional” in this recording.",
          "A speaker uses the words “That's true Also services don't have emotional” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “and Barb They're spending back to Soduka” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "they can travel back to",
          "they can listen back to",
          "they can swim back to",
          "they can plant back to"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “of aliens attacking Entrance I'm not sure” in this recording.",
          "A speaker uses the words “of aliens attacking Energy I'm not sure” in this recording.",
          "A speaker uses the words “of aliens attacking Homework I'm not sure” in this recording.",
          "A speaker uses the words “of aliens attacking Earth I'm not sure” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “Mars may support life I'm not sure” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "Scientists are walking to find",
          "Scientists are working to find",
          "Scientists are drawing to find",
          "Scientists are trying to find"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “in a match last hobby” in this recording.",
          "A speaker uses the words “in a match last month” in this recording.",
          "A speaker uses the words “in a match last week” in this recording.",
          "A speaker uses the words “in a match last football” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “times bigger than Maths It has three” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "head four literature two legs",
          "head four energy two legs",
          "head four earth two legs",
          "head four eyes two legs"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “use rockets to enjoy at very high” in this recording.",
          "A speaker uses the words “use rockets to improve at very high” in this recording.",
          "A speaker uses the words “use rockets to travel at very high” in this recording.",
          "A speaker uses the words “use rockets to come at very high” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Mi's family moved to a house in the city centre last month.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Why hasn't Ann seen Mi often?",
        "options": [
          "Busy moving house",
          "Away on holiday",
          "Joined a sports club",
          "Studying for an exam"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How did a new neighbour help Mi?",
        "options": [
          "The neighbour showed her the way to the bus station.",
          "The neighbour drove her directly to the airport.",
          "The neighbour helped her move into a new school.",
          "The neighbour showed her where to buy new furniture."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Mai asks Tom to help her carry a suitcase.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does Tom respond to Mai?",
        "options": [
          "He refuses politely",
          "He asks for money",
          "He agrees to help",
          "He leaves immediately"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does Ann ask Mr Nam to show her?",
        "options": [
          "She asks him to show her how to open the gate.",
          "She wants him to explain how to reach the airport.",
          "She asks him to carry the suitcase for her.",
          "She wants him to show her the nearest supermarket."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Mi's writing won first prize in the community helper contest.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is Mr Vinh's job?",
        "options": [
          "A bus driver",
          "A garbage collector",
          "A police officer",
          "A school teacher"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does Mr Vinh teach local people?",
        "options": [
          "He teaches them how to sort rubbish into the correct bins.",
          "He teaches them how to grow vegetables in the school garden.",
          "He explains how to repair their broken household machines.",
          "He shows them how to drive through the city safely."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Trang got home late because she was stuck in a traffic jam.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does Ben travel around London?",
        "options": [
          "By taxi",
          "By underground",
          "By bicycle",
          "On foot"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What is the large downtown building used for now?",
        "options": [
          "The building is now used as a shopping mall.",
          "The building has become a new public library.",
          "The old building is now a large hospital.",
          "The building is used as a central bus station."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Duong's dad refuses to take him to the airport.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does Minh offer Hoang?",
        "options": [
          "A ride home",
          "A train ticket",
          "Some money",
          "A new bike"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How does Hoang respond to Minh's offer?",
        "options": [
          "He thanks Minh and says the offer is very kind.",
          "He refuses the offer because he wants to walk.",
          "He asks Minh to lend him some money instead.",
          "He promises to call Minh after he arrives home."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "Tom says the buses in his city are modern and comfortable.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does Elena want more of?",
        "options": [
          "Shopping centres",
          "Free sports facilities",
          "Cinema tickets",
          "Food stalls"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does Chi think parents should teach their children?",
        "options": [
          "She believes parents should teach their children how to cook.",
          "She thinks children need to learn how to drive buses.",
          "She says parents should teach their children to build houses.",
          "She believes children should learn to ride the underground."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “sleep eat a healthy diet and do” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "that exams take about lots",
          "that exams talk about lots",
          "that exams visit about lots",
          "that exams bring about lots"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “your study and energy But how can” in this recording.",
          "A speaker uses the words “your study and dinner But how can” in this recording.",
          "A speaker uses the words “your study and computer But how can” in this recording.",
          "A speaker uses the words “your study and life But how can” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “the door Tom Evening Can you open” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "the post world I beg",
          "the post city I beg",
          "the post office I beg",
          "the post island I beg"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “Would you mind cycling me the way” in this recording.",
          "A speaker uses the words “Would you mind showing me the way” in this recording.",
          "A speaker uses the words “Would you mind saving me the way” in this recording.",
          "A speaker uses the words “Would you mind working me the way” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “due dates and test dates into a” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "lot of activities that can",
          "lot of friends that can",
          "lot of parents that can",
          "lot of feelings that can"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “arrange to start working on them well” in this recording.",
          "A speaker uses the words “arrange to start shopping on them well” in this recording.",
          "A speaker uses the words “arrange to start reading on them well” in this recording.",
          "A speaker uses the words “arrange to start teaching on them well” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “in the world Jealous When did people” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "People were cooking it for",
          "People were improving it for",
          "People were taking it for",
          "People were building it for"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “castle in the office Mi Nam Amazing” in this recording.",
          "A speaker uses the words “castle in the school Mi Nam Amazing” in this recording.",
          "A speaker uses the words “castle in the world Mi Nam Amazing” in this recording.",
          "A speaker uses the words “castle in the market Mi Nam Amazing” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “very much for showing us around Angkor” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "Wat You're welcome Thanks a",
          "Wat You're family Thanks a",
          "Wat You're water Thanks a",
          "Wat You're robot Thanks a"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “about life in the museum No problem” in this recording.",
          "A speaker uses the words “about life in the office No problem” in this recording.",
          "A speaker uses the words “about life in the countryside No problem” in this recording.",
          "A speaker uses the words “about life in the road No problem” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “a three month summer badminton Did you stay” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "the same feelings as we",
          "the same subjects as we",
          "the same sisters as we",
          "the same clothes as we"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “to face And we started traditional games such” in this recording.",
          "A speaker uses the words “to face And we took traditional games such” in this recording.",
          "A speaker uses the words “to face And we played traditional games such” in this recording.",
          "A speaker uses the words “to face And we made traditional games such” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “We visited Langbiang Mountain and Cu Lan” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "than 150 know and animal",
          "than 150 try and animal",
          "than 150 plant and animal",
          "than 150 talk and animal"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “we saw an difficult gong show We” in this recording.",
          "A speaker uses the words “we saw an funny gong show We” in this recording.",
          "A speaker uses the words “we saw an interesting gong show We” in this recording.",
          "A speaker uses the words “we saw an beautiful gong show We” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “really sorry I'm day There was a” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "done the sharing yet Oops",
          "done the playing yet Oops",
          "done the making yet Oops",
          "done the washing yet Oops"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “later Oh that's health But please do” in this recording.",
          "A speaker uses the words “later Oh that's right But please do” in this recording.",
          "A speaker uses the words “later Oh that's work But please do” in this recording.",
          "A speaker uses the words “later Oh that's ticket But please do” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “things I could never get anything back” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "returned my money and went",
          "returned my light and went",
          "returned my noise and went",
          "returned my schoolyard and went"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “did But I probably learnt it by” in this recording.",
          "A speaker uses the words “did But I always learnt it by” in this recording.",
          "A speaker uses the words “did But I actually learnt it by” in this recording.",
          "A speaker uses the words “did But I slowly learnt it by” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “played outdoors The friends were simple and” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "is that children nowadays have",
          "is that languages nowadays have",
          "is that feelings nowadays have",
          "is that projects nowadays have"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “more opportunities to shop now That's right” in this recording.",
          "A speaker uses the words “more opportunities to cook now That's right” in this recording.",
          "A speaker uses the words “more opportunities to like now That's right” in this recording.",
          "A speaker uses the words “more opportunities to learn now That's right” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “I will share with you the links” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "the ancient village of Duong",
          "the ancient mountain of Duong",
          "the ancient town of Duong",
          "the ancient beach of Duong"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “dog to the backpack Great I appreciate” in this recording.",
          "A speaker uses the words “dog to the swimming Great I appreciate” in this recording.",
          "A speaker uses the words “dog to the picnic Great I appreciate” in this recording.",
          "A speaker uses the words “dog to the schoolyard Great I appreciate” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “usually three generations visiting together in a” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "tiring Lastly teachers in the",
          "tiring Lastly friends in the",
          "tiring Lastly buildings in the",
          "tiring Lastly families in the"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “their parents to stay to them too” in this recording.",
          "A speaker uses the words “their parents to save to them too” in this recording.",
          "A speaker uses the words “their parents to want to them too” in this recording.",
          "A speaker uses the words “their parents to listen to them too” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “What did you talk about in the” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "we can't bring admiring So",
          "we can't help admiring So",
          "we can't work admiring So",
          "we can't have admiring So"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “to visit those places and I answered” in this recording.",
          "A speaker uses the words “to visit those festivals and I answered” in this recording.",
          "A speaker uses the words “to visit those clothes and I answered” in this recording.",
          "A speaker uses the words “to visit those activities and I answered” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “Can I want a horror film Mum” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "can't It's stress now May",
          "can't It's family now May",
          "can't It's evening now May",
          "can't It's late now May"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “Sure But be shy It's very dark” in this recording.",
          "A speaker uses the words “Sure But be careful It's very dark” in this recording.",
          "A speaker uses the words “Sure But be clean It's very dark” in this recording.",
          "A speaker uses the words “Sure But be responsible It's very dark” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “our world's tropical forest areas It is” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "of the world It has",
          "of the cinema It has",
          "of the garden It has",
          "of the countryside It has"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “damaged ecosystems They swim trees and establish” in this recording.",
          "A speaker uses the words “damaged ecosystems They plant trees and establish” in this recording.",
          "A speaker uses the words “damaged ecosystems They sing trees and establish” in this recording.",
          "A speaker uses the words “damaged ecosystems They enjoy trees and establish” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “time on the forest That's how I” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "rent a generous accommodation He",
          "rent a cheap accommodation He",
          "rent a busy accommodation He",
          "rent a careful accommodation He"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “perfect destination for food tourists Yes I” in this recording.",
          "A speaker uses the words “perfect destination for webcam tourists Yes I” in this recording.",
          "A speaker uses the words “perfect destination for football tourists Yes I” in this recording.",
          "A speaker uses the words “perfect destination for habit tourists Yes I” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “up or we'll miss the train Yes” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "Mum I'm staying Is it",
          "Mum I'm knitting Is it",
          "Mum I'm coming Is it",
          "Mum I'm watching Is it"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “wait in the festival I'm sorry it” in this recording.",
          "A speaker uses the words “wait in the queue I'm sorry it” in this recording.",
          "A speaker uses the words “wait in the week I'm sorry it” in this recording.",
          "A speaker uses the words “wait in the rain I'm sorry it” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “with its vast grey hills and fields” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "village The entrance ticket to",
          "village The computer ticket to",
          "village The technology ticket to",
          "village The basketball ticket to"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “the main high city where the Brontes” in this recording.",
          "A speaker uses the words “the main high country where the Brontes” in this recording.",
          "A speaker uses the words “the main high street where the Brontes” in this recording.",
          "A speaker uses the words “the main high village where the Brontes” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “you Nice to meet you all This” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "Ah I prefer trousers In",
          "Ah I play trousers In",
          "Ah I mean trousers In",
          "Ah I love trousers In"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “of you speak Technology Good question Most” in this recording.",
          "A speaker uses the words “of you speak Suitcase Good question Most” in this recording.",
          "A speaker uses the words “of you speak Breakfast Good question Most” in this recording.",
          "A speaker uses the words “of you speak English Good question Most” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “luck with your Literature exam Thanks I'll” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "best I've went that you're",
          "best I've called that you're",
          "best I've heard that you're",
          "best I've worked that you're"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “the best of luck Thank you so” in this recording.",
          "A speaker uses the words “the best of light Thank you so” in this recording.",
          "A speaker uses the words “the best of entrance Thank you so” in this recording.",
          "A speaker uses the words “the best of money Thank you so” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “spend time reading different kinds of English” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "helps me understand better when",
          "helps me sell better when",
          "helps me give better when",
          "helps me listen better when"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “the words I've told and pick up” in this recording.",
          "A speaker uses the words “the words I've knew and pick up” in this recording.",
          "A speaker uses the words “the words I've learnt and pick up” in this recording.",
          "A speaker uses the words “the words I've used and pick up” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “to answering your photos about our planet” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "blue because family covers more",
          "blue because water covers more",
          "blue because year covers more",
          "blue because graveyard covers more"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “for plants and animals It's fascinating to” in this recording.",
          "A speaker uses the words “for plants and materials It's fascinating to” in this recording.",
          "A speaker uses the words “for plants and friends It's fascinating to” in this recording.",
          "A speaker uses the words “for plants and clothes It's fascinating to” in this recording."
        ],
        "answer": 0
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “don't feel like reading it Why don't” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "it OK I'll think about",
          "it OK Maths think about",
          "it OK Phone think about",
          "it OK Space think about"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “contribution would really share us out Alright” in this recording.",
          "A speaker uses the words “contribution would really listen us out Alright” in this recording.",
          "A speaker uses the words “contribution would really build us out Alright” in this recording.",
          "A speaker uses the words “contribution would really help us out Alright” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “or harm their day For example when” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "question Similarly parents can cause",
          "question Similarly animals can cause",
          "question Similarly books can cause",
          "question Similarly activities can cause"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “and animals from safe places We shouldn't” in this recording.",
          "A speaker uses the words “and animals from interesting places We shouldn't” in this recording.",
          "A speaker uses the words “and animals from popular places We shouldn't” in this recording.",
          "A speaker uses the words “and animals from different places We shouldn't” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “and can be used for studying and” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "than a schoolyard because it's",
          "than a laptop because it's",
          "than a day because it's",
          "than a ticket because it's"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “keyboard Can I try and draw on” in this recording.",
          "A speaker uses the words “keyboard Can I collect and draw on” in this recording.",
          "A speaker uses the words “keyboard Can I write and draw on” in this recording.",
          "A speaker uses the words “keyboard Can I walk and draw on” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “me You just love it carefully and” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "what you love First enter",
          "what you collect First enter",
          "what you mean First enter",
          "what you swim First enter"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “sorry I don't month follow you Could” in this recording.",
          "A speaker uses the words “sorry I don't quite follow you Could” in this recording.",
          "A speaker uses the words “sorry I don't comedy follow you Could” in this recording.",
          "A speaker uses the words “sorry I don't fish follow you Could” in this recording."
        ],
        "answer": 1
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “dust spots and dirty marks in my” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "in the hobby First it'll",
          "in the schoolyard First it'll",
          "in the tennis First it'll",
          "in the future First it'll"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “houses Finally laser earth will make it” in this recording.",
          "A speaker uses the words “houses Finally laser evening will make it” in this recording.",
          "A speaker uses the words “houses Finally laser technology will make it” in this recording.",
          "A speaker uses the words “houses Finally laser science will make it” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “leavers My teacher visited us that if” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which expression does the speaker use?",
        "options": [
          "lots of rubbish And you",
          "lots of technology And you",
          "lots of money And you",
          "lots of festival And you"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “design after high shop Hope you'll achieve” in this recording.",
          "A speaker uses the words “design after high garden Hope you'll achieve” in this recording.",
          "A speaker uses the words “design after high school Hope you'll achieve” in this recording.",
          "A speaker uses the words “design after high mountain Hope you'll achieve” in this recording."
        ],
        "answer": 2
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “the registration form Hopefully I'll be a” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which detail is mentioned in the conversation?",
        "options": [
          "the science sport I hope",
          "the science earth I hope",
          "the science club I hope",
          "the science morning I hope"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “letter I hope Geography get the job” in this recording.",
          "A speaker uses the words “letter I hope Food get the job” in this recording.",
          "A speaker uses the words “letter I hope Year get the job” in this recording.",
          "A speaker uses the words “letter I hope I'll get the job” in this recording."
        ],
        "answer": 3
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
    "taskPrompt": "Nghe toàn bộ bản ghi rồi trả lời 3 câu: (1) True/False; (2) chọn đáp án ngắn, tối đa 5 từ; (3) chọn đáp án dài, trên 5 từ. Chọn một đáp án cho mỗi câu.",
    "questions": [
      {
        "format": "true_false",
        "text": "A speaker says “farmers like my services to earn a” in the recording.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which phrase matches what you hear?",
        "options": [
          "glad I'm doing well at",
          "glad I'm travelling well at",
          "glad I'm listening well at",
          "glad I'm spending well at"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which statement matches what is said in the recording?",
        "options": [
          "A speaker uses the words “career further I'm spending more about food” in this recording.",
          "A speaker uses the words “career further I'm staying more about food” in this recording.",
          "A speaker uses the words “career further I'm working more about food” in this recording.",
          "A speaker uses the words “career further I'm learning more about food” in this recording."
        ],
        "answer": 3
      }
    ],
    "source": {
      "url": "https://loigiaihay.com/tieng-anh-9-unit-12-skills-2-a163878.html",
      "section": "Skills 2"
    }
  }
];
  curriculum.exercises = curriculum.exercises.filter(item => item.track !== 'thcs').concat(bank);
  curriculum.thcsBankVersion = '2026-11-09-thcs-144-tf-short-long';
  curriculum.tracks.thcs.stages.forEach(stage => {
    stage.title = 'Nghe lớp ' + (stage.stage + 5) + ' · 12 Unit';
    stage.description = 'Mỗi Unit có 3 bài: hội thoại mở đầu, giao tiếp và bài nghe theo Unit. Nghe audio và chọn đáp án đúng cho từng câu hỏi.';
  });
})();
