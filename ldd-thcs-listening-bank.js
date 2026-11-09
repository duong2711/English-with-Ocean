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
        "text": "Duy is introduced as a stranger rather than a friend.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
          "The speaker says that it is nice to meet Phong for the first time.",
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
        "text": "Elena is Nick's teacher, not his sister.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says they live alone.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "Phong is writing rather than reading.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The friend is described as having long blonde hair.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speakers describe the place as ugly.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker is describing Hanoi rather than Ho Chi Minh City.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says the beaches are dirty and unattractive.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker is unhappy about Tet.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker finds the television show boring.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says they never play table tennis.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "Sydney is described as a city in England.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The imagined future house has only two rooms.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speakers say reusable bags are harmful to the environment.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says robots can completely understand human feelings.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says they never play the piano.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The dish is cooked without fish sauce.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says family members never eat together.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The school has no library for visitors.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker went cycling on Monday morning.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speakers are not planning to visit a cinema.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "Only adults can take part in this holiday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker fully understands energy at the beginning.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speakers predict there will be more traffic jams in hyperloops.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "Australians dislike outdoor activities.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
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
        "text": "The speaker says knitting is one activity they hate.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "How often does the speaker hang out?",
        "options": [
          "usually",
          "regularly",
          "actually",
          "especially"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Where do they agree to meet?",
        "options": [
          "They agree to meet at New World School later in the day.",
          "They agree to meet at New World Cinema later in the day.",
          "They agree to meet at New World Airport later in the day.",
          "They agree to meet at New World Mountain later in the day."
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
        "text": "Someone invites a friend to the cooking club.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "On which day is the invitation?",
        "options": [
          "This Sunday",
          "This Friday",
          "This Wednesday",
          "This Tuesday"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What other leisure activity is suggested?",
        "options": [
          "The friend also suggests going for a visit together during their free time.",
          "The friend also suggests going for a walk together during their free time.",
          "The friend also suggests going for a swim together during their free time.",
          "The friend also suggests going for a live together during their free time."
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
        "text": "The speaker spends Saturdays without seeing family.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What do family members do with their favourite food?",
        "options": [
          "They travel it",
          "They cook it",
          "They come it",
          "They read it"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Where do they ride together?",
        "options": [
          "The family members ride around their city to have fun and spend time together.",
          "The family members ride around their park to have fun and spend time together.",
          "The family members ride around their room to have fun and spend time together.",
          "The family members ride around their countryside to have fun and spend time together."
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
        "text": "The speaker never visits relatives outside the city.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "How often does the speaker go?",
        "options": [
          "sometimes",
          "regularly",
          "firstly",
          "finally"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which traditional activities do they try?",
        "options": [
          "The speaker says that they played traditional games including bamboo dancing.",
          "The speaker says that they played traditional teachers including bamboo dancing.",
          "The speaker says that they played traditional trees including bamboo dancing.",
          "The speaker says that they played traditional flowers including bamboo dancing."
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
        "text": "Mai has a beautiful kite.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "When did someone make the kite?",
        "options": [
          "Last habit",
          "Last week",
          "Last weekend",
          "Last dinner"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does Mai like about her kite?",
        "options": [
          "She says that its hobby suits her very well when she flies it.",
          "She says that its fish suits her very well when she flies it.",
          "She says that its friend suits her very well when she flies it.",
          "She says that its colour suits her very well when she flies it."
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
        "text": "People in the village welcome neighbours into their homes.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What is missing for entertainment?",
        "options": [
          "Many places",
          "Many friends",
          "Many pictures",
          "Many parents"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Where can people find more entertainment options?",
        "options": [
          "The speaker says there are more things to do in the city than the village.",
          "The speaker says there are more things to do in the museum than the village.",
          "The speaker says there are more things to do in the shop than the village.",
          "The speaker says there are more things to do in the park than the village."
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
        "text": "The school is cancelling every club activity.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What do the students discuss?",
        "options": [
          "Their pictures",
          "Their books",
          "Their games",
          "Their problems"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Why do they propose different activities?",
        "options": [
          "They want the new activities to suit convenient interests among the students.",
          "They want the new activities to suit confident interests among the students.",
          "They want the new activities to suit different interests among the students.",
          "They want the new activities to suit unusual interests among the students."
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
        "text": "Someone asks for more information about the music club.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the student ask for?",
        "options": [
          "ticket the way",
          "show the way",
          "badminton the way",
          "eyes the way"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which direction should the student turn?",
        "options": [
          "The directions tell the student to go to the next block and turn met.",
          "The directions tell the student to go to the next block and turn left.",
          "The directions tell the student to go to the next block and turn said.",
          "The directions tell the student to go to the next block and turn came."
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
        "text": "The student has no worries about their parents' expectations.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Who did the student speak to?",
        "options": [
          "Their houses",
          "Their services",
          "Their parents",
          "Their devices"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How does the other student begin their response?",
        "options": [
          "The other student starts by saying Actually before explaining the situation.",
          "The other student starts by saying Really before explaining the situation.",
          "The other student starts by saying Carefully before explaining the situation.",
          "The other student starts by saying Especially before explaining the situation."
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
        "text": "The speaker lives in a tower block in the city centre.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What kind of home do they have?",
        "options": [
          "A stilt house",
          "A stilt garden",
          "A stilt world",
          "A stilt sea"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How does the speaker respond to the question about culture?",
        "options": [
          "The speaker answers Finally and begins describing local customs and culture.",
          "The speaker answers Certainly and begins describing local customs and culture.",
          "The speaker answers Secondly and begins describing local customs and culture.",
          "The speaker answers Carefully and begins describing local customs and culture."
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
        "text": "The speakers compare life in the mountains and the city.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How do mountain residents stay close to nature?",
        "options": [
          "They live nearby",
          "They play nearby",
          "They shop nearby",
          "They improve nearby"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What is one advantage of the city?",
        "options": [
          "The speaker thinks that the city offers better projects for its residents.",
          "The speaker thinks that the city offers better languages for its residents.",
          "The speaker thinks that the city offers better devices for its residents.",
          "The speaker thinks that the city offers better services for its residents."
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
        "text": "Children are not taught any practical skills outside their homes.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What can residents catch?",
        "options": [
          "fish",
          "lunch",
          "name",
          "volleyball"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What is changing for ethnic minority families?",
        "options": [
          "The speaker says that more ethnic minority buildings are attending school today.",
          "The speaker says that more ethnic minority sisters are attending school today.",
          "The speaker says that more ethnic minority festivals are attending school today.",
          "The speaker says that more ethnic minority children are attending school today."
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
        "text": "There are no flowers or ornamental trees in the villages.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What other plants decorate the area?",
        "options": [
          "Ornamental trees",
          "Ornamental children",
          "Ornamental clothes",
          "Ornamental festivals"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which public place is decorated for the celebration?",
        "options": [
          "People hang decorations around the communal country during the annual celebration.",
          "People hang decorations around the communal house during the annual celebration.",
          "People hang decorations around the communal island during the annual celebration.",
          "People hang decorations around the communal museum during the annual celebration."
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
        "text": "A person asks for etiquette advice before dinner at a friend's home.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does the person react to the advice?",
        "options": [
          "Activities a good idea",
          "Brothers a good idea",
          "Families a good idea",
          "It’s a good idea"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What is the warning about chopsticks?",
        "options": [
          "The speaker explains that using chopsticks in that way may bring bad luck.",
          "The speaker explains that using chopsticks in that way may watch bad luck.",
          "The speaker explains that using chopsticks in that way may use bad luck.",
          "The speaker explains that using chopsticks in that way may collect bad luck."
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
        "text": "The Khmer community does not celebrate the festival.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Who receives rice during the festival?",
        "options": [
          "students",
          "trees",
          "activities",
          "children"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Who is given advice about the festival?",
        "options": [
          "The speaker gives some advice to questions visiting the Ok Om Bok festival.",
          "The speaker gives some advice to games visiting the Ok Om Bok festival.",
          "The speaker gives some advice to tourists visiting the Ok Om Bok festival.",
          "The speaker gives some advice to pictures visiting the Ok Om Bok festival."
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
        "text": "People in the place address teachers by their title.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What place does the other speaker mention?",
        "options": [
          "Their station",
          "Their country",
          "Their street",
          "Their city"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which meal habit is discussed?",
        "options": [
          "The speaker describes people being in the science of eating breakfast together.",
          "The speaker describes people being in the habit of eating breakfast together.",
          "The speaker describes people being in the music of eating breakfast together.",
          "The speaker describes people being in the lunch of eating breakfast together."
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
        "text": "Someone invites a friend to their house on Sunday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What kind of food is mentioned?",
        "options": [
          "Vietnamese cycling",
          "Vietnamese cooking",
          "Vietnamese watching",
          "Vietnamese swimming"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "How does someone respond to the comment about food?",
        "options": [
          "The speaker agrees and answers slowly while talking about Vietnamese cuisine.",
          "The speaker agrees and answers firstly while talking about Vietnamese cuisine.",
          "The speaker agrees and answers certainly while talking about Vietnamese cuisine.",
          "The speaker agrees and answers often while talking about Vietnamese cuisine."
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
        "text": "Technology makes it impossible for friends to keep in touch.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Who does the speaker interact with?",
        "options": [
          "Their teachers",
          "Their children",
          "Their friends",
          "Their flowers"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Why is technology useful for relationships?",
        "options": [
          "Technology supports friendship because it is confident to keep in touch with others.",
          "Technology supports friendship because it is easy to keep in touch with others.",
          "Technology supports friendship because it is funny to keep in touch with others.",
          "Technology supports friendship because it is friendly to keep in touch with others."
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
        "text": "The speakers say air and water quality are improving.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What word is used to ask for a definition?",
        "options": [
          "What do you read",
          "What do you mean",
          "What do you watch",
          "What do you prefer"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What should people avoid to protect nature?",
        "options": [
          "The speaker advises everyone to avoid single-use places such as plastic bags.",
          "The speaker advises everyone to avoid single-use products such as plastic bags.",
          "The speaker advises everyone to avoid single-use sisters such as plastic bags.",
          "The speaker advises everyone to avoid single-use brothers such as plastic bags."
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
        "text": "The speakers discuss endangered animals in the wild.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What word is used to ask for an explanation?",
        "options": [
          "What do you shop",
          "What do you buy",
          "What do you listen",
          "What do you mean"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "Where should endangered animals live?",
        "options": [
          "The speaker explains that wild animals should live in their tired habitats.",
          "The speaker explains that wild animals should live in their confident habitats.",
          "The speaker explains that wild animals should live in their natural habitats.",
          "The speaker explains that wild animals should live in their generous habitats."
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
        "text": "The speaker says waste does not cause water pollution.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What is needed for drinking?",
        "options": [
          "Clean water",
          "Clean basketball",
          "Clean suitcase",
          "Clean money"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What should people stop doing to protect water?",
        "options": [
          "The speaker says people should stop littering and sometimes dumping waste into rivers.",
          "The speaker says people should stop littering and actually dumping waste into rivers.",
          "The speaker says people should stop littering and especially dumping waste into rivers.",
          "The speaker says people should stop littering and recently dumping waste into rivers."
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
        "text": "Someone sees people at a market wearing unusual clothes.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Where is Auckland described as?",
        "options": [
          "Their road",
          "Their city",
          "Their shop",
          "Their store"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "How does the speaker describe the service?",
        "options": [
          "The speaker agrees that it is more friendly than the other option.",
          "The speaker agrees that it is more expensive than the other option.",
          "The speaker agrees that it is more convenient than the other option.",
          "The speaker agrees that it is more easy than the other option."
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
        "text": "The customer complains about a smart backpack.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How does the customer feel about the colour?",
        "options": [
          "Not happy",
          "Not responsible",
          "Not easy",
          "Not convenient"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What colour is the backpack that was received?",
        "options": [
          "The customer says that the backpack is a yellowish brown instead of the expected colour.",
          "The customer says that the backpack is a yellowish blue instead of the expected colour.",
          "The customer says that the backpack is a yellowish white instead of the expected colour.",
          "The customer says that the backpack is a yellowish purple instead of the expected colour."
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
        "text": "The speaker claims online shopping offers very few choices.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What can shopping online save?",
        "options": [
          "Time and money",
          "Time and holiday",
          "Time and literature",
          "Time and life"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What is available on shopping websites?",
        "options": [
          "The speaker says that there are many programmes to choose from on shopping websites.",
          "The speaker says that there are many products to choose from on shopping websites.",
          "The speaker says that there are many computers to choose from on shopping websites.",
          "The speaker says that there are many feelings to choose from on shopping websites."
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
        "text": "The person says tornadoes occur more than once.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "How often can tornadoes happen?",
        "options": [
          "carefully",
          "quickly",
          "actually",
          "sometimes"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What moves towards the people during a tornado?",
        "options": [
          "The speaker describes a big funnel of robot moving towards the people.",
          "The speaker describes a big funnel of wind moving towards the people.",
          "The speaker describes a big funnel of night moving towards the people.",
          "The speaker describes a big funnel of breakfast moving towards the people."
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
        "text": "Someone's grandparents call because of a flood.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What did the flood destroy?",
        "options": [
          "Their house",
          "Their street",
          "Their museum",
          "Their library"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What does the listener wish for the grandparents?",
        "options": [
          "The speaker says they breakfast the grandparents are safe after the flood.",
          "The speaker says they dinner the grandparents are safe after the flood.",
          "The speaker says they history the grandparents are safe after the flood.",
          "The speaker says they hope the grandparents are safe after the flood."
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
        "text": "People should go outside during a storm.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What should people do during a storm?",
        "options": [
          "cook inside",
          "understand inside",
          "build inside",
          "stay inside"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What should people pay attention to in an emergency?",
        "options": [
          "The speaker says to listen to helpful instructions from the local authorities.",
          "The speaker says to listen to interesting instructions from the local authorities.",
          "The speaker says to listen to important instructions from the local authorities.",
          "The speaker says to listen to confident instructions from the local authorities."
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
        "text": "The speaker has already attended many video conferences.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What device will the student sit in front of?",
        "options": [
          "A backpack",
          "A football",
          "A computer",
          "A rubbish"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does the speaker hope about the conference?",
        "options": [
          "The speaker says that they month the conference will go well.",
          "The speaker says that they health the conference will go well.",
          "The speaker says that they hope the conference will go well.",
          "The speaker says that they television the conference will go well."
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
        "text": "The meeting is scheduled for nine thirty in the morning.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What must they do to the devices?",
        "options": [
          "improve the devices",
          "understand the devices",
          "test the devices",
          "study the devices"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does someone say when adjusting the equipment?",
        "options": [
          "The speaker asks the others to Hold on while they make changes.",
          "The speaker asks the others to Habit on while they make changes.",
          "The speaker asks the others to Breakfast on while they make changes.",
          "The speaker asks the others to Weather on while they make changes."
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
        "text": "The speaker arranges to meet someone at an event.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which period of history has a special section?",
        "options": [
          "Modern Time",
          "Funny Time",
          "Active Time",
          "Convenient Time"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What is the exhibition section about?",
        "options": [
          "The section is about communication devices that people may use in the future.",
          "The section is about communication animals that people may use in the future.",
          "The section is about communication traditions that people may use in the future.",
          "The section is about communication languages that people may use in the future."
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
        "text": "Online classes are convenient during bad weather.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does someone ask the other person to explain?",
        "options": [
          "What they plant",
          "What they cycle",
          "What they mean",
          "What they listen"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "When could robots help students in class?",
        "options": [
          "The speaker says robots could help when human teachers are not available.",
          "The speaker says robots could help when human languages are not available.",
          "The speaker says robots could help when human parents are not available.",
          "The speaker says robots could help when human computers are not available."
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
        "text": "The speakers imagine using school clouds.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What could students avoid carrying?",
        "options": [
          "Lots of children",
          "Lots of clothes",
          "Lots of programmes",
          "Lots of books"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What could students do with digital books?",
        "options": [
          "The speaker says that students could read books directly from the school cloud.",
          "The speaker says that students could stay books directly from the school cloud.",
          "The speaker says that students could cook books directly from the school cloud.",
          "The speaker says that students could try books directly from the school cloud."
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
        "text": "The speakers believe robots have all the emotional skills of human teachers.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What can students ask a robot?",
        "options": [
          "skills",
          "questions",
          "animals",
          "neighbours"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What is one important limitation of robots?",
        "options": [
          "The speaker says that robots do not have the emotional intelligence of people.",
          "The speaker says that films do not have the emotional intelligence of people.",
          "The speaker says that subjects do not have the emotional intelligence of people.",
          "The speaker says that services do not have the emotional intelligence of people."
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
        "text": "The characters are travelling back to Soduka.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What can they do to get home?",
        "options": [
          "travel back",
          "listen back",
          "swim back",
          "plant back"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Which planet might aliens attack in the story?",
        "options": [
          "The speakers discuss the possibility of aliens attacking Entrance in the future.",
          "The speakers discuss the possibility of aliens attacking Energy in the future.",
          "The speakers discuss the possibility of aliens attacking Homework in the future.",
          "The speakers discuss the possibility of aliens attacking Earth in the future."
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
        "text": "The speakers discuss whether Mars can support life.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What are scientists doing to find life?",
        "options": [
          "walking to find life",
          "working to find life",
          "drawing to find life",
          "trying to find life"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "When did a player hurt her arm?",
        "options": [
          "The speaker says that she injured her arm in a match last hobby.",
          "The speaker says that she injured her arm in a match last month.",
          "The speaker says that she injured her arm in a match last week.",
          "The speaker says that she injured her arm in a match last football."
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
        "text": "The object described is larger than Earth.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the creature have four of?",
        "options": [
          "Four literature",
          "Four energy",
          "Four earth",
          "Four eyes"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "How do the travellers move so quickly?",
        "options": [
          "The speaker says they can use rockets to enjoy at very high speeds.",
          "The speaker says they can use rockets to improve at very high speeds.",
          "The speaker says they can use rockets to travel at very high speeds.",
          "The speaker says they can use rockets to come at very high speeds."
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
        "text": "The speaker advises students to avoid sleeping before exams.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What do exams sometimes do?",
        "options": [
          "They take stress",
          "They talk stress",
          "They visit stress",
          "They bring stress"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What should students balance during exam time?",
        "options": [
          "The speaker tells students to balance their study and energy during exams.",
          "The speaker tells students to balance their study and dinner during exams.",
          "The speaker tells students to balance their study and computer during exams.",
          "The speaker tells students to balance their study and life during exams."
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
        "text": "Tom asks someone to repeat a request.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which place does someone ask directions to?",
        "options": [
          "The post world",
          "The post city",
          "The post office",
          "The post island"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What polite question does the person ask?",
        "options": [
          "The speaker politely asks whether the listener would mind cycling the way.",
          "The speaker politely asks whether the listener would mind showing the way.",
          "The speaker politely asks whether the listener would mind saving the way.",
          "The speaker politely asks whether the listener would mind working the way."
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
        "text": "The speaker suggests ignoring homework and test deadlines.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What can take up a lot of free time?",
        "options": [
          "Other activities",
          "Other friends",
          "Other parents",
          "Other feelings"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "When should students begin their assignments?",
        "options": [
          "The speaker advises students to start working on their tasks well before the due date.",
          "The speaker advises students to start shopping on their tasks well before the due date.",
          "The speaker advises students to start reading on their tasks well before the due date.",
          "The speaker advises students to start teaching on their tasks well before the due date."
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
        "text": "The speakers find the historic site completely ordinary.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What were workers doing for many years?",
        "options": [
          "cooking the site",
          "improving the site",
          "taking the site",
          "building the site"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "How does the speaker describe the castle?",
        "options": [
          "The speaker explains that the castle is famous around the office.",
          "The speaker explains that the castle is famous around the school.",
          "The speaker explains that the castle is famous around the world.",
          "The speaker explains that the castle is famous around the market."
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
        "text": "The visitors do not thank their guide.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "How does the guide respond to the thanks?",
        "options": [
          "You're welcome",
          "You're family",
          "You're water",
          "You're robot"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What aspect of local life interests the visitor?",
        "options": [
          "The visitor wants to find out more about life in the museum.",
          "The visitor wants to find out more about life in the office.",
          "The visitor wants to find out more about life in the countryside.",
          "The visitor wants to find out more about life in the road."
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
        "text": "The speakers remember a three-month summer holiday.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What did students study?",
        "options": [
          "The same feelings",
          "The same subjects",
          "The same sisters",
          "The same clothes"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What games did children play in the past?",
        "options": [
          "The speaker says that they started traditional games with their friends.",
          "The speaker says that they took traditional games with their friends.",
          "The speaker says that they played traditional games with their friends.",
          "The speaker says that they made traditional games with their friends."
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
        "text": "The travellers did not visit any mountains.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What kinds of species are mentioned?",
        "options": [
          "know and animals",
          "try and animals",
          "plant and animals",
          "talk and animals"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What kind of gong show did the visitors see?",
        "options": [
          "The travellers describe the gong show as difficult during their trip.",
          "The travellers describe the gong show as funny during their trip.",
          "The travellers describe the gong show as interesting during their trip.",
          "The travellers describe the gong show as beautiful during their trip."
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
        "text": "The speaker apologises for arriving early.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which household task is mentioned?",
        "options": [
          "The sharing",
          "The playing",
          "The making",
          "The washing"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "How does someone respond to the explanation?",
        "options": [
          "The listener says that the explanation is all health but gives a reminder.",
          "The listener says that the explanation is all right but gives a reminder.",
          "The listener says that the explanation is all work but gives a reminder.",
          "The listener says that the explanation is all ticket but gives a reminder."
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
        "text": "The speaker says the lost money was never returned.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does the man return to the speaker?",
        "options": [
          "The money",
          "The light",
          "The noise",
          "The schoolyard"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How does the speaker describe learning the lesson?",
        "options": [
          "The speaker says they probably learnt the lesson through their own experience.",
          "The speaker says they always learnt the lesson through their own experience.",
          "The speaker says they actually learnt the lesson through their own experience.",
          "The speaker says they slowly learnt the lesson through their own experience."
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
        "text": "Children today have fewer opportunities to learn than before.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Who has more opportunities today?",
        "options": [
          "children",
          "languages",
          "feelings",
          "projects"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What can children now have more opportunities to do?",
        "options": [
          "The speaker says that children now have more opportunities to shop than before.",
          "The speaker says that children now have more opportunities to cook than before.",
          "The speaker says that children now have more opportunities to like than before.",
          "The speaker says that children now have more opportunities to learn than before."
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
        "text": "The person refuses to share any useful links.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which ancient place is mentioned?",
        "options": [
          "Duong Lam village",
          "Duong Lam mountain",
          "Duong Lam town",
          "Duong Lam beach"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Where does someone want to take the dog?",
        "options": [
          "The speaker asks about taking the dog to the backpack with everyone.",
          "The speaker asks about taking the dog to the swimming with everyone.",
          "The speaker asks about taking the dog to the picnic with everyone.",
          "The speaker asks about taking the dog to the schoolyard with everyone."
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
        "text": "Three generations often lived together in the past.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Who found some things less tiring?",
        "options": [
          "teachers",
          "friends",
          "buildings",
          "families"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What do children want their parents to do?",
        "options": [
          "The speaker says that children also want their parents to stay to them.",
          "The speaker says that children also want their parents to save to them.",
          "The speaker says that children also want their parents to want to them.",
          "The speaker says that children also want their parents to listen to them."
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
        "text": "No one is interested in visiting the places discussed.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What can the people not stop doing?",
        "options": [
          "bring admiring",
          "help admiring",
          "work admiring",
          "have admiring"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What does the listener hope to visit?",
        "options": [
          "The speaker wants to visit those places and has answered some questions about them.",
          "The speaker wants to visit those festivals and has answered some questions about them.",
          "The speaker wants to visit those clothes and has answered some questions about them.",
          "The speaker wants to visit those activities and has answered some questions about them."
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
        "text": "The parent encourages watching a horror film late at night.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Why does the parent say no?",
        "options": [
          "It is stress",
          "It is family",
          "It is evening",
          "It is late"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What warning does the parent give the children?",
        "options": [
          "The parent tells the children to be shy because it is very dark.",
          "The parent tells the children to be careful because it is very dark.",
          "The parent tells the children to be clean because it is very dark.",
          "The parent tells the children to be responsible because it is very dark."
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
        "text": "Conservation workers cut down trees to restore damaged ecosystems.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What is the place called a wonder of?",
        "options": [
          "The world",
          "The cinema",
          "The garden",
          "The countryside"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "What do conservation workers do in damaged ecosystems?",
        "options": [
          "The workers swim trees and establish ways to help restore damaged ecosystems.",
          "The workers plant trees and establish ways to help restore damaged ecosystems.",
          "The workers sing trees and establish ways to help restore damaged ecosystems.",
          "The workers enjoy trees and establish ways to help restore damaged ecosystems."
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
        "text": "The speakers discuss spending time on the beach.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What accommodation does the person rent?",
        "options": [
          "generous accommodation",
          "cheap accommodation",
          "busy accommodation",
          "careful accommodation"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which travellers might enjoy the place most?",
        "options": [
          "The speaker describes the location as a perfect destination for food tourists.",
          "The speaker describes the location as a perfect destination for webcam tourists.",
          "The speaker describes the location as a perfect destination for football tourists.",
          "The speaker describes the location as a perfect destination for habit tourists."
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
        "text": "The mother says there is plenty of time before the train.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "How does the child reply to Mum?",
        "options": [
          "I'm staying",
          "I'm knitting",
          "I'm coming",
          "I'm watching"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Where does the passenger need to wait?",
        "options": [
          "The speaker asks whether they must wait in the festival before boarding.",
          "The speaker asks whether they must wait in the queue before boarding.",
          "The speaker asks whether they must wait in the week before boarding.",
          "The speaker asks whether they must wait in the rain before boarding."
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
        "text": "The destination has vast green hills and fields.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What type of ticket is mentioned?",
        "options": [
          "An entrance ticket",
          "An computer ticket",
          "An technology ticket",
          "An basketball ticket"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Where is the high street mentioned?",
        "options": [
          "The speaker refers to the main high city associated with the Brontës.",
          "The speaker refers to the main high country associated with the Brontës.",
          "The speaker refers to the main high street associated with the Brontës.",
          "The speaker refers to the main high village associated with the Brontës."
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
        "text": "The speakers greet people and discuss English usage.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does Jack say to clarify his meaning?",
        "options": [
          "I prefer trousers",
          "I play trousers",
          "I mean trousers",
          "I love trousers"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "Which language is being discussed?",
        "options": [
          "The speaker asks whether most of the people speak Technology in that place.",
          "The speaker asks whether most of the people speak Suitcase in that place.",
          "The speaker asks whether most of the people speak Breakfast in that place.",
          "The speaker asks whether most of the people speak English in that place."
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
        "text": "Someone wishes another person bad luck on an English exam.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What news has been received?",
        "options": [
          "I've went you're moving",
          "I've called you're moving",
          "I've heard you're moving",
          "I've worked you're moving"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does the speaker wish for the other person?",
        "options": [
          "The speaker wishes the other person the best of luck during the move.",
          "The speaker wishes the other person the best of light during the move.",
          "The speaker wishes the other person the best of entrance during the move.",
          "The speaker wishes the other person the best of money during the move."
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
        "text": "The speaker avoids reading English texts.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "What does reading help the student do?",
        "options": [
          "understand better",
          "sell better",
          "give better",
          "listen better"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How does the student develop vocabulary?",
        "options": [
          "The speaker reviews words they have told and picks up new expressions.",
          "The speaker reviews words they have knew and picks up new expressions.",
          "The speaker reviews words they have learnt and picks up new expressions.",
          "The speaker reviews words they have used and picks up new expressions."
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
        "text": "The speaker says that Earth has no water.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Why does Earth look blue?",
        "options": [
          "Because of family",
          "Because of water",
          "Because of year",
          "Because of graveyard"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Which living things depend on the planet?",
        "options": [
          "The speaker says that the planet provides resources for plants and animals to survive.",
          "The speaker says that the planet provides resources for plants and materials to survive.",
          "The speaker says that the planet provides resources for plants and friends to survive.",
          "The speaker says that the planet provides resources for plants and clothes to survive."
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
        "text": "Someone does not feel like reading something.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does the speaker say after the suggestion?",
        "options": [
          "I'll think about it",
          "Maths think about it",
          "Phone think about it",
          "Space think about it"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "Why is someone's contribution important?",
        "options": [
          "The speaker says that the contribution would really share the group out.",
          "The speaker says that the contribution would really listen the group out.",
          "The speaker says that the contribution would really build the group out.",
          "The speaker says that the contribution would really help the group out."
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
        "text": "The speaker says humans are unable to harm the environment.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which living things can also cause harm?",
        "options": [
          "parents",
          "animals",
          "books",
          "activities"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "Where do the plants and animals come from?",
        "options": [
          "The speaker talks about plants and animals from safe places around the world.",
          "The speaker talks about plants and animals from interesting places around the world.",
          "The speaker talks about plants and animals from popular places around the world.",
          "The speaker talks about plants and animals from different places around the world."
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
        "text": "The speaker says the tablet is heavier than a laptop.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "Which device is used for comparison?",
        "options": [
          "A schoolyard",
          "A laptop",
          "A day",
          "A ticket"
        ],
        "answer": 1
      },
      {
        "format": "long_answer",
        "text": "What can the user do on the screen?",
        "options": [
          "The speaker asks whether they can try and draw on the device.",
          "The speaker asks whether they can collect and draw on the device.",
          "The speaker asks whether they can write and draw on the device.",
          "The speaker asks whether they can walk and draw on the device."
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
        "text": "The speakers discuss following instructions carefully.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does someone say they understand?",
        "options": [
          "What you love",
          "What you collect",
          "What you mean",
          "What you swim"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "How does the listener express confusion?",
        "options": [
          "The listener apologises and says they do not month follow the explanation.",
          "The listener apologises and says they do not quite follow the explanation.",
          "The listener apologises and says they do not comedy follow the explanation.",
          "The listener apologises and says they do not fish follow the explanation."
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
        "text": "The speaker says future homes will never use laser technology.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "When will the technology be useful?",
        "options": [
          "In the hobby",
          "In the schoolyard",
          "In the tennis",
          "In the future"
        ],
        "answer": 3
      },
      {
        "format": "long_answer",
        "text": "What will make housework easier?",
        "options": [
          "The speaker predicts that laser earth will make cleaning easier in future homes.",
          "The speaker predicts that laser evening will make cleaning easier in future homes.",
          "The speaker predicts that laser technology will make cleaning easier in future homes.",
          "The speaker predicts that laser science will make cleaning easier in future homes."
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
        "text": "A teacher gives students some career advice.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "What does someone hope to make?",
        "options": [
          "Lots of rubbish",
          "Lots of technology",
          "Lots of money",
          "Lots of festival"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does the student plan after high school?",
        "options": [
          "The speaker mentions studying design after high shop and hoping for success.",
          "The speaker mentions studying design after high garden and hoping for success.",
          "The speaker mentions studying design after high school and hoping for success.",
          "The speaker mentions studying design after high mountain and hoping for success."
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
        "text": "The speakers discuss registering for a club and getting a job.",
        "options": [
          "True",
          "False"
        ],
        "answer": 0
      },
      {
        "format": "short_answer",
        "text": "Which club does someone hope to join?",
        "options": [
          "The science sport",
          "The science earth",
          "The science club",
          "The science morning"
        ],
        "answer": 2
      },
      {
        "format": "long_answer",
        "text": "What does the applicant hope after sending a letter?",
        "options": [
          "The applicant says they hope Geography get the job they applied for.",
          "The applicant says they hope Food get the job they applied for.",
          "The applicant says they hope Year get the job they applied for.",
          "The applicant says they hope I'll get the job they applied for."
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
        "text": "The speaker is not interested in learning more about food.",
        "options": [
          "True",
          "False"
        ],
        "answer": 1
      },
      {
        "format": "short_answer",
        "text": "How is the student progressing?",
        "options": [
          "doing well",
          "travelling well",
          "listening well",
          "spending well"
        ],
        "answer": 0
      },
      {
        "format": "long_answer",
        "text": "How does the speaker develop their career?",
        "options": [
          "The speaker says they are spending more about food to further their career.",
          "The speaker says they are staying more about food to further their career.",
          "The speaker says they are working more about food to further their career.",
          "The speaker says they are learning more about food to further their career."
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
