/* LDD English Listening Curriculum v2
 * Rebuilt for two separate tracks:
 * - Foundation/new learner: 5 stages mapped to primary grades 1–5
 * - THCS: 4 stages mapped to grades 6–9
 * Scripts are original LDD English material. Loigiaihay URLs are references for topic/task type/difficulty.
 */
(function () {
  'use strict';
  window.LDD_LISTENING_CURRICULUM = {
  "version": "2026-09-25",
  "tracks": {
    "foundation": {
      "id": "foundation",
      "label": "Mất gốc / người mới",
      "note": "Dành cho người chưa có nền tảng từ lớp 1–5. Học sinh THCS bị mất gốc cũng học track này, không dùng chung bài THCS.",
      "stages": [
        {
          "stage": 1,
          "grade": "Nền tảng lớp 1",
          "title": "Nghe đánh vần",
          "description": "Giữ đúng thang Dễ → Trung bình → Khá → Khó → Địa ngục của bài cũ.",
          "exerciseType": "spelling"
        },
        {
          "stage": 2,
          "grade": "Nền tảng lớp 2",
          "title": "Nhận diện câu hỏi & câu trả lời",
          "description": "Nghe một cặp hỏi–đáp rồi gõ lại chính xác câu hỏi và câu trả lời.",
          "exerciseType": "qa_transcribe"
        },
        {
          "stage": 3,
          "grade": "Nền tảng lớp 3",
          "title": "Nghe hiểu câu hỏi & câu trả lời",
          "description": "Gõ lại cặp hỏi–đáp, sau đó chọn câu tiếp theo phù hợp để hoàn thành hội thoại.",
          "exerciseType": "qa_choice"
        },
        {
          "stage": 4,
          "grade": "Nền tảng lớp 4",
          "title": "Nhận diện hội thoại ngắn",
          "description": "Nghe hội thoại dưới 30 giây và điền chính xác 2 câu bị khuyết.",
          "exerciseType": "dialogue_gap"
        },
        {
          "stage": 5,
          "grade": "Nền tảng lớp 5",
          "title": "Hiểu hội thoại ngắn",
          "description": "Nghe hội thoại ngắn rồi trả lời các câu hỏi trắc nghiệm về nội dung.",
          "exerciseType": "mcq_set"
        }
      ]
    },
    "thcs": {
      "id": "thcs",
      "label": "THCS",
      "note": "Bài riêng cho học sinh có nền tảng tiểu học. Không dùng chung với track Mất gốc.",
      "stages": [
        {
          "stage": 1,
          "grade": "Lớp 6",
          "title": "Nghe thông tin trực tiếp",
          "description": "Nghe đoạn nói/hội thoại ngắn và xác định thông tin cụ thể, đúng/sai, người/vật/địa điểm.",
          "exerciseType": "mcq_set"
        },
        {
          "stage": 2,
          "grade": "Lớp 7",
          "title": "Nghe ý chính & chi tiết",
          "description": "Nghe bài nói dài hơn, lọc thói quen, số liệu, nguyên nhân và câu trả lời ngắn.",
          "exerciseType": "mcq_set"
        },
        {
          "stage": 3,
          "grade": "Lớp 8",
          "title": "Nghe hội thoại/phỏng vấn",
          "description": "Theo dõi nhiều lượt nói, quan điểm người nói, điền thông tin và hiểu quan hệ nguyên nhân–kết quả.",
          "exerciseType": "mcq_set"
        },
        {
          "stage": 4,
          "grade": "Lớp 9",
          "title": "Nghe tổng hợp & suy luận",
          "description": "Nghe nhiều người nói hoặc đoạn thông tin dài, tổng hợp ý, suy luận và chọn đáp án gần nghĩa.",
          "exerciseType": "mcq_set"
        }
      ]
    }
  },
  "exercises": [
    {
      "id": "f1-01",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-01.mp3",
      "type": "spelling",
      "difficulty": "Dễ",
      "mode": "spell_single",
      "title": "Dễ 1 · CAT",
      "script": "C, A, T.",
      "expected": "cat",
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-02",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-02.mp3",
      "type": "spelling",
      "difficulty": "Dễ",
      "mode": "spell_single",
      "title": "Dễ 2 · BOOK",
      "script": "B, O, O, K.",
      "expected": "book",
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-03",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-03.mp3",
      "type": "spelling",
      "difficulty": "Trung bình",
      "mode": "spell_order",
      "title": "Trung bình 1 · Xếp 3 từ",
      "script": "C, A, T. B, O, O, K. S, U, N.",
      "words": [
        "cat",
        "book",
        "sun"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-04",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-04.mp3",
      "type": "spelling",
      "difficulty": "Trung bình",
      "mode": "spell_order",
      "title": "Trung bình 2 · Xếp 4 từ",
      "script": "P, E, N. D, O, G. R, E, D. M, I, L, K.",
      "words": [
        "pen",
        "dog",
        "red",
        "milk"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-05",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-05.mp3",
      "type": "spelling",
      "difficulty": "Khá",
      "mode": "spell_numbered",
      "title": "Khá 1 · Điền theo số",
      "script": "A, P, P, L, E. F, I, S, H. B, L, U, E.",
      "words": [
        "apple",
        "fish",
        "blue"
      ],
      "bank": [
        "apple",
        "blue",
        "fish"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-06",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-06.mp3",
      "type": "spelling",
      "difficulty": "Khá",
      "mode": "spell_numbered",
      "title": "Khá 2 · Điền theo số",
      "script": "T, A, B, L, E. G, R, E, E, N. W, A, T, E, R.",
      "words": [
        "table",
        "green",
        "water"
      ],
      "bank": [
        "water",
        "table",
        "green"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-07",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-07.mp3",
      "type": "spelling",
      "difficulty": "Khó",
      "mode": "spell_tick",
      "title": "Khó 1 · Tick từ đã nghe",
      "script": "B, O, O, K. C, A, K, E. F, I, S, H.",
      "heard": [
        "book",
        "cake",
        "fish"
      ],
      "options": [
        "book",
        "bike",
        "cake",
        "cat",
        "fish",
        "five"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-08",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-08.mp3",
      "type": "spelling",
      "difficulty": "Khó",
      "mode": "spell_tick",
      "title": "Khó 2 · Tick từ đã nghe",
      "script": "S, C, H, O, O, L. C, H, A, I, R. J, U, I, C, E.",
      "heard": [
        "school",
        "chair",
        "juice"
      ],
      "options": [
        "school",
        "shop",
        "chair",
        "child",
        "juice",
        "June"
      ],
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-09",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-09.mp3",
      "type": "spelling",
      "difficulty": "Địa ngục",
      "mode": "whole_word",
      "title": "Địa ngục 1 · Nghe nguyên từ",
      "script": "school",
      "expected": "school",
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f1-10",
      "track": "foundation",
      "stage": 1,
      "grade": 1,
      "audioUrl": "assets/audio/listening/foundation/stage-1/f1-10.mp3",
      "type": "spelling",
      "difficulty": "Địa ngục",
      "mode": "whole_word",
      "title": "Địa ngục 2 · Nghe nguyên từ",
      "script": "window",
      "expected": "window",
      "source": {
        "url": "https://loigiaihay.com/lop-1.html",
        "section": "Nền tảng lớp 1: alphabet / phonics. Cơ chế Dễ → Địa ngục kế thừa bài đánh vần cũ của lddenglish."
      }
    },
    {
      "id": "f2-01",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-01.mp3",
      "type": "qa_transcribe",
      "title": "Sinh nhật",
      "recordingScript": "A: What number is it? B: It is thirteen.",
      "expectedQuestion": "What number is it?",
      "expectedAnswer": "It is thirteen.",
      "source": {
        "url": "https://loigiaihay.com/de-thi-hoc-ki-2-tieng-anh-2-global-success-de-so-2-a137158.html",
        "section": "Listen and circle; Listen and tick."
      }
    },
    {
      "id": "f2-02",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-02.mp3",
      "type": "qa_transcribe",
      "title": "Tuổi",
      "recordingScript": "A: How old is your sister? B: She is eight.",
      "expectedQuestion": "How old is your sister?",
      "expectedAnswer": "She is eight.",
      "source": {
        "url": "https://loigiaihay.com/de-thi-hoc-ki-2-tieng-anh-2-global-success-de-so-2-a137158.html",
        "section": "Listen and circle; Listen and tick."
      }
    },
    {
      "id": "f2-03",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-03.mp3",
      "type": "qa_transcribe",
      "title": "Đồ vật",
      "recordingScript": "A: Where is my red ball? B: It is under the table.",
      "expectedQuestion": "Where is my red ball?",
      "expectedAnswer": "It is under the table.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-04",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-04.mp3",
      "type": "qa_transcribe",
      "title": "Con vật",
      "recordingScript": "A: Is the goat on the farm? B: Yes, it is.",
      "expectedQuestion": "Is the goat on the farm?",
      "expectedAnswer": "Yes, it is.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-05",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-05.mp3",
      "type": "qa_transcribe",
      "title": "Đồ ăn",
      "recordingScript": "A: What do you want? B: I want some cake, please.",
      "expectedQuestion": "What do you want?",
      "expectedAnswer": "I want some cake, please.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-06",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-06.mp3",
      "type": "qa_transcribe",
      "title": "Lớp học",
      "recordingScript": "A: Can I open the window? B: Yes, you can.",
      "expectedQuestion": "Can I open the window?",
      "expectedAnswer": "Yes, you can.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-07",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-07.mp3",
      "type": "qa_transcribe",
      "title": "Sở thích",
      "recordingScript": "A: Do you like kites? B: Yes, I do. I have two kites.",
      "expectedQuestion": "Do you like kites?",
      "expectedAnswer": "Yes, I do. I have two kites.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-08",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-08.mp3",
      "type": "qa_transcribe",
      "title": "Thời tiết",
      "recordingScript": "A: Is it sunny outside? B: No, it is cloudy today.",
      "expectedQuestion": "Is it sunny outside?",
      "expectedAnswer": "No, it is cloudy today.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-09",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-09.mp3",
      "type": "qa_transcribe",
      "title": "Gia đình",
      "recordingScript": "A: Who is that woman? B: She is my mother.",
      "expectedQuestion": "Who is that woman?",
      "expectedAnswer": "She is my mother.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f2-10",
      "track": "foundation",
      "stage": 2,
      "grade": 2,
      "audioUrl": "assets/audio/listening/foundation/stage-2/f2-10.mp3",
      "type": "qa_transcribe",
      "title": "Lý do đơn giản",
      "recordingScript": "A: Why are you happy? B: Because it is my birthday.",
      "expectedQuestion": "Why are you happy?",
      "expectedAnswer": "Because it is my birthday.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-2-ket-noi-tri-thuc-voi-cuoc-song-c622.html",
        "section": "Tiếng Anh 2 Global Success: Listen / Repeat / Tick / Circle theo các Unit."
      }
    },
    {
      "id": "f3-01",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-01.mp3",
      "type": "qa_choice",
      "title": "Chào hỏi",
      "recordingScript": "A: How are you today? B: I am fine, thank you.",
      "expectedQuestion": "How are you today?",
      "expectedAnswer": "I am fine, thank you.",
      "options": [
        "Goodbye!",
        "And you?",
        "It is a pen."
      ],
      "answer": 1,
      "source": {
        "url": "https://loigiaihay.com/unit-1-hello-e25423.html",
        "section": "Lesson 1–3: Look, listen and repeat; Listen and circle/number."
      }
    },
    {
      "id": "f3-02",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-02.mp3",
      "type": "qa_choice",
      "title": "Bạn bè",
      "recordingScript": "A: Who is this? B: This is my friend, Lucy.",
      "expectedQuestion": "Who is this?",
      "expectedAnswer": "This is my friend, Lucy.",
      "options": [
        "Nice to meet you, Lucy.",
        "I have three cats.",
        "It is Monday."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-review-3-trang-36-global-success-a108132.html",
        "section": "Listen and tick; Listen and number."
      }
    },
    {
      "id": "f3-03",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-03.mp3",
      "type": "qa_choice",
      "title": "Nghề nghiệp",
      "recordingScript": "A: What is your father's job? B: He is a doctor.",
      "expectedQuestion": "What is your father's job?",
      "expectedAnswer": "He is a doctor.",
      "options": [
        "Where is the doctor?",
        "Does he work in a hospital?",
        "How many doctors?"
      ],
      "answer": 1,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-review-3-trang-36-global-success-a108132.html",
        "section": "Listen and tick; Listen and number."
      }
    },
    {
      "id": "f3-04",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-04.mp3",
      "type": "qa_choice",
      "title": "Thú cưng",
      "recordingScript": "A: How many rabbits do you have? B: I have two rabbits.",
      "expectedQuestion": "How many rabbits do you have?",
      "expectedAnswer": "I have two rabbits.",
      "options": [
        "What colour are they?",
        "I am ten years old.",
        "Good morning."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-unit-16-lesson-2-trang-42-global-success-a108135.html",
        "section": "Look, listen and repeat; Listen and number."
      }
    },
    {
      "id": "f3-05",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-05.mp3",
      "type": "qa_choice",
      "title": "Hoạt động",
      "recordingScript": "A: What is Ben doing? B: He is skating in the park.",
      "expectedQuestion": "What is Ben doing?",
      "expectedAnswer": "He is skating in the park.",
      "options": [
        "Can he skate well?",
        "Where is your book?",
        "I like milk."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-unit-19-lesson-2-trang-60-global-success-a108223.html",
        "section": "Look, listen and repeat; Listen and number."
      }
    },
    {
      "id": "f3-06",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-06.mp3",
      "type": "qa_choice",
      "title": "Đồ uống",
      "recordingScript": "A: What would you like to drink? B: I would like some milk, please.",
      "expectedQuestion": "What would you like to drink?",
      "expectedAnswer": "I would like some milk, please.",
      "options": [
        "Here you are.",
        "She is my teacher.",
        "It is seven."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-review-3-trang-36-global-success-a108132.html",
        "section": "Listen and tick; Listen and number."
      }
    },
    {
      "id": "f3-07",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-07.mp3",
      "type": "qa_choice",
      "title": "Vị trí",
      "recordingScript": "A: Where is your brother? B: He is in the living room.",
      "expectedQuestion": "Where is your brother?",
      "expectedAnswer": "He is in the living room.",
      "options": [
        "What is he doing?",
        "How old is the room?",
        "Do you like blue?"
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-review-3-trang-36-global-success-a108132.html",
        "section": "Listen and tick; Listen and number."
      }
    },
    {
      "id": "f3-08",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-08.mp3",
      "type": "qa_choice",
      "title": "Đồ chơi",
      "recordingScript": "A: Do you have any planes? B: Yes, I have three planes.",
      "expectedQuestion": "Do you have any planes?",
      "expectedAnswer": "Yes, I have three planes.",
      "options": [
        "What colour are they?",
        "She has a doll.",
        "This is my school."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-unit-19-lesson-2-trang-60-global-success-a108223.html",
        "section": "Look, listen and repeat; Listen and number."
      }
    },
    {
      "id": "f3-09",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-09.mp3",
      "type": "qa_choice",
      "title": "Khả năng",
      "recordingScript": "A: Can your sister swim? B: Yes, she can swim very well.",
      "expectedQuestion": "Can your sister swim?",
      "expectedAnswer": "Yes, she can swim very well.",
      "options": [
        "Does she go swimming on Sunday?",
        "It is a big fish.",
        "Where is the desk?"
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/unit-1-hello-e25423.html",
        "section": "Lesson 1–3: Look, listen and repeat; Listen and circle/number."
      }
    },
    {
      "id": "f3-10",
      "track": "foundation",
      "stage": 3,
      "grade": 3,
      "audioUrl": "assets/audio/listening/foundation/stage-3/f3-10.mp3",
      "type": "qa_choice",
      "title": "Thời gian",
      "recordingScript": "A: What time do you go to school? B: I go to school at seven o'clock.",
      "expectedQuestion": "What time do you go to school?",
      "expectedAnswer": "I go to school at seven o'clock.",
      "options": [
        "How do you go there?",
        "It is my school bag.",
        "I can sing."
      ],
      "answer": 0,
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-3-review-3-trang-36-global-success-a108132.html",
        "section": "Listen and tick; Listen and number."
      }
    },
    {
      "id": "f4-01",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-01.mp3",
      "type": "dialogue_gap",
      "title": "Bạn mới",
      "dialogue": [
        "A: Who's that?",
        "B: It's my new friend, Hana.",
        "A: Where's she from?",
        "B: She's from Japan."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "It's my new friend, Hana.",
        "She's from Japan."
      ],
      "recordingScript": "A: Who's that? B: It's my new friend, Hana. A: Where's she from? B: She's from Japan.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-unit-1-lesson-2-trang-12-13-global-success-a134621.html",
        "section": "Look, listen and repeat; Listen and tick."
      }
    },
    {
      "id": "f4-02",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-02.mp3",
      "type": "dialogue_gap",
      "title": "Bữa sáng",
      "dialogue": [
        "A: What time do you have breakfast?",
        "B: I have breakfast at six forty-five.",
        "A: What do you have after breakfast?",
        "B: I go to school at seven fifteen."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "I have breakfast at six forty-five.",
        "I go to school at seven fifteen."
      ],
      "recordingScript": "A: What time do you have breakfast? B: I have breakfast at six forty-five. A: What do you have after breakfast? B: I go to school at seven fifteen.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-1-trang-40-41-global-success-a136098.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-03",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-03.mp3",
      "type": "dialogue_gap",
      "title": "Sinh nhật",
      "dialogue": [
        "A: Happy birthday, Ben!",
        "B: Thank you.",
        "A: What do you want to drink?",
        "B: I want some lemonade, please."
      ],
      "blankIndices": [
        0,
        3
      ],
      "expectedBlanks": [
        "Happy birthday, Ben!",
        "I want some lemonade, please."
      ],
      "recordingScript": "A: Happy birthday, Ben! B: Thank you. A: What do you want to drink? B: I want some lemonade, please.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-unit-4-lesson-2-trang-30-31-global-success-a135717.html",
        "section": "Look, listen and repeat; Listen and tick."
      }
    },
    {
      "id": "f4-04",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-04.mp3",
      "type": "dialogue_gap",
      "title": "Môn học",
      "dialogue": [
        "A: When do you have music?",
        "B: I have it on Thursdays.",
        "A: What's your favourite subject?",
        "B: It's English."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "I have it on Thursdays.",
        "It's English."
      ],
      "recordingScript": "A: When do you have music? B: I have it on Thursdays. A: What's your favourite subject? B: It's English.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-2-trang-74-75-global-success-a138084.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-05",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-05.mp3",
      "type": "dialogue_gap",
      "title": "Khả năng",
      "dialogue": [
        "A: Can your brother roller skate?",
        "B: Yes, he can.",
        "A: Can he ride a bike too?",
        "B: No, he can't."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "Yes, he can.",
        "No, he can't."
      ],
      "recordingScript": "A: Can your brother roller skate? B: Yes, he can. A: Can he ride a bike too? B: No, he can't.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-1-trang-40-41-global-success-a136098.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-06",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-06.mp3",
      "type": "dialogue_gap",
      "title": "Thời tiết",
      "dialogue": [
        "A: What was the weather like yesterday?",
        "B: It was sunny and hot.",
        "A: Did you go outside?",
        "B: Yes, I played badminton."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "It was sunny and hot.",
        "Yes, I played badminton."
      ],
      "recordingScript": "A: What was the weather like yesterday? B: It was sunny and hot. A: Did you go outside? B: Yes, I played badminton.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-4-trang-70-global-success-a139728.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-07",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-07.mp3",
      "type": "dialogue_gap",
      "title": "Mua sắm",
      "dialogue": [
        "A: How much is the notebook?",
        "B: It's fifteen thousand dong.",
        "A: Can I have two, please?",
        "B: Yes. Here you are."
      ],
      "blankIndices": [
        0,
        2
      ],
      "expectedBlanks": [
        "How much is the notebook?",
        "Can I have two, please?"
      ],
      "recordingScript": "A: How much is the notebook? B: It's fifteen thousand dong. A: Can I have two, please? B: Yes. Here you are.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-4-trang-70-global-success-a139728.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-08",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-08.mp3",
      "type": "dialogue_gap",
      "title": "Thể thao",
      "dialogue": [
        "A: What are they doing?",
        "B: They're playing football.",
        "A: Is today your sports day?",
        "B: Yes, it is."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "They're playing football.",
        "Yes, it is."
      ],
      "recordingScript": "A: What are they doing? B: They're playing football. A: Is today your sports day? B: Yes, it is.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-4-trang-70-global-success-a139728.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-09",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-09.mp3",
      "type": "dialogue_gap",
      "title": "Trường học",
      "dialogue": [
        "A: Where's your school?",
        "B: It's in the mountains.",
        "A: Is it big?",
        "B: No, but it has a new library."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "It's in the mountains.",
        "No, but it has a new library."
      ],
      "recordingScript": "A: Where's your school? B: It's in the mountains. A: Is it big? B: No, but it has a new library.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-2-trang-74-75-global-success-a138084.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f4-10",
      "track": "foundation",
      "stage": 4,
      "grade": 4,
      "audioUrl": "assets/audio/listening/foundation/stage-4/f4-10.mp3",
      "type": "dialogue_gap",
      "title": "Cuối tuần",
      "dialogue": [
        "A: What do you do on Saturday morning?",
        "B: I help my mother at home.",
        "A: What do you do in the afternoon?",
        "B: I play with my friends."
      ],
      "blankIndices": [
        1,
        3
      ],
      "expectedBlanks": [
        "I help my mother at home.",
        "I play with my friends."
      ],
      "recordingScript": "A: What do you do on Saturday morning? B: I help my mother at home. A: What do you do in the afternoon? B: I play with my friends.",
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-lop-4-review-1-trang-40-41-global-success-a136098.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-01",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-01.mp3",
      "type": "mcq_set",
      "title": "Nghề nghiệp tương lai",
      "recordingScript": "A: What would you like to be in the future? B: I'd like to be a firefighter because I want to help people. A: That's a brave job. B: Yes, and I know I need to be strong and healthy.",
      "questions": [
        {
          "text": "What job does the speaker want?",
          "options": [
            "Doctor",
            "Firefighter",
            "Teacher",
            "Pilot"
          ],
          "answer": 1
        },
        {
          "text": "Why?",
          "options": [
            "To travel",
            "To help people",
            "To teach children",
            "To work at home"
          ],
          "answer": 1
        },
        {
          "text": "What does the speaker need to be?",
          "options": [
            "Strong and healthy",
            "Rich",
            "Quiet",
            "Famous"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/unit-5-my-future-job-e35294.html",
        "section": "Lesson 1–3: Look and listen; Listen and tick."
      }
    },
    {
      "id": "f5-02",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-02.mp3",
      "type": "mcq_set",
      "title": "Kỳ nghỉ hè",
      "recordingScript": "A: Where are you going this summer? B: I'm going to Da Nang with my family. A: How will you get there? B: We'll go by train because my little brother loves trains.",
      "questions": [
        {
          "text": "Where are they going?",
          "options": [
            "Hue",
            "Da Nang",
            "Ha Noi",
            "Da Lat"
          ],
          "answer": 1
        },
        {
          "text": "Who is going?",
          "options": [
            "Only the speaker",
            "The family",
            "School friends",
            "A teacher"
          ],
          "answer": 1
        },
        {
          "text": "Why travel by train?",
          "options": [
            "It is cheapest",
            "The brother loves trains",
            "There is no bus",
            "It is fastest"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/giai-review-4-tieng-anh-5-global-success-co-dap-a162201.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-03",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-03.mp3",
      "type": "mcq_set",
      "title": "Thời tiết",
      "recordingScript": "A: What's the weather like in Hai Duong in summer? B: It's usually sunny and hot. A: What do you do on very hot days? B: I stay inside in the afternoon and go cycling in the evening.",
      "questions": [
        {
          "text": "What is summer like?",
          "options": [
            "Cold",
            "Sunny and hot",
            "Rainy all day",
            "Windy"
          ],
          "answer": 1
        },
        {
          "text": "When does the speaker stay inside?",
          "options": [
            "Morning",
            "Afternoon",
            "Evening",
            "Night"
          ],
          "answer": 1
        },
        {
          "text": "What does the speaker do in the evening?",
          "options": [
            "Swims",
            "Cycles",
            "Reads",
            "Cooks"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/giai-review-4-tieng-anh-5-global-success-co-dap-a162201.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-04",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-04.mp3",
      "type": "mcq_set",
      "title": "Câu chuyện",
      "recordingScript": "A: What are you reading? B: A story about a fox and a crow. A: Which character do you like? B: The crow, but I think the fox is more interesting.",
      "questions": [
        {
          "text": "What is the story about?",
          "options": [
            "Two children",
            "A fox and a crow",
            "A school",
            "A trip"
          ],
          "answer": 1
        },
        {
          "text": "Which character is liked?",
          "options": [
            "The fox",
            "The crow",
            "Both equally",
            "Neither"
          ],
          "answer": 1
        },
        {
          "text": "Who is more interesting?",
          "options": [
            "The fox",
            "The crow",
            "The teacher",
            "The reader"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/giai-review-4-tieng-anh-5-global-success-co-dap-a162201.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-05",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-05.mp3",
      "type": "mcq_set",
      "title": "Địa điểm tham quan",
      "recordingScript": "A: It's sunny today. Let's visit somewhere in Ha Noi. B: Good idea. How about Hoan Kiem Lake? A: Great. We can walk around the lake and take some photos.",
      "questions": [
        {
          "text": "Where are they?",
          "options": [
            "Da Nang",
            "Ha Noi",
            "Hue",
            "Hai Duong"
          ],
          "answer": 1
        },
        {
          "text": "Where will they go?",
          "options": [
            "West Lake",
            "Hoan Kiem Lake",
            "A museum",
            "The zoo"
          ],
          "answer": 1
        },
        {
          "text": "What will they do there?",
          "options": [
            "Go fishing",
            "Walk and take photos",
            "Go shopping",
            "Study"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/giai-review-4-tieng-anh-5-global-success-co-dap-a162201.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-06",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-06.mp3",
      "type": "mcq_set",
      "title": "Ngôi nhà",
      "recordingScript": "A: Which room do you like best in your house? B: My bedroom. It has a big window and a small desk. A: What do you do there? B: I read books and do my homework.",
      "questions": [
        {
          "text": "Which room is preferred?",
          "options": [
            "Kitchen",
            "Bedroom",
            "Living room",
            "Bathroom"
          ],
          "answer": 1
        },
        {
          "text": "What is big?",
          "options": [
            "Desk",
            "Window",
            "Bed",
            "Door"
          ],
          "answer": 1
        },
        {
          "text": "What does the speaker do there?",
          "options": [
            "Cook",
            "Read and study",
            "Watch TV only",
            "Play football"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-5-global-success-c1762.html",
        "section": "Tiếng Anh 5 Global Success: các bài Listening trong Lesson/Review."
      }
    },
    {
      "id": "f5-07",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-07.mp3",
      "type": "mcq_set",
      "title": "Bạn nước ngoài",
      "recordingScript": "A: Tell me about your new friend. B: His name is Leo and he's from Australia. A: What does he like? B: He likes football and drawing animals.",
      "questions": [
        {
          "text": "What is the friend's name?",
          "options": [
            "Leo",
            "Tom",
            "Ben",
            "Sam"
          ],
          "answer": 0
        },
        {
          "text": "Where is he from?",
          "options": [
            "Canada",
            "Australia",
            "Japan",
            "Singapore"
          ],
          "answer": 1
        },
        {
          "text": "What does he like?",
          "options": [
            "Swimming only",
            "Football and drawing",
            "Cooking",
            "Reading comics"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-5-global-success-c1762.html",
        "section": "Tiếng Anh 5 Global Success: các bài Listening trong Lesson/Review."
      }
    },
    {
      "id": "f5-08",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-08.mp3",
      "type": "mcq_set",
      "title": "Sức khỏe",
      "recordingScript": "A: You look tired today. B: I went to bed late last night. A: Try to sleep earlier and don't use your phone in bed. B: You're right. I'll do that tonight.",
      "questions": [
        {
          "text": "Why is the speaker tired?",
          "options": [
            "Was sick",
            "Went to bed late",
            "Ran a race",
            "Skipped lunch"
          ],
          "answer": 1
        },
        {
          "text": "What advice is given?",
          "options": [
            "Exercise more",
            "Sleep earlier",
            "Drink juice",
            "Study later"
          ],
          "answer": 1
        },
        {
          "text": "What should not be used in bed?",
          "options": [
            "A book",
            "A phone",
            "A lamp",
            "A clock"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-5-global-success-c1762.html",
        "section": "Tiếng Anh 5 Global Success: các bài Listening trong Lesson/Review."
      }
    },
    {
      "id": "f5-09",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-09.mp3",
      "type": "mcq_set",
      "title": "Phương tiện",
      "recordingScript": "A: How far is it from Hue to Da Nang? B: About one hundred kilometres. A: Are you going by car? B: No, my family is taking the train.",
      "questions": [
        {
          "text": "What two places are mentioned?",
          "options": [
            "Hue and Da Nang",
            "Ha Noi and Hue",
            "Da Nang and HCMC",
            "Hue and Da Lat"
          ],
          "answer": 0
        },
        {
          "text": "About how far?",
          "options": [
            "50 km",
            "100 km",
            "200 km",
            "300 km"
          ],
          "answer": 1
        },
        {
          "text": "How will they travel?",
          "options": [
            "Car",
            "Bus",
            "Train",
            "Plane"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/giai-review-4-tieng-anh-5-global-success-co-dap-a162201.html",
        "section": "Listen and tick."
      }
    },
    {
      "id": "f5-10",
      "track": "foundation",
      "stage": 5,
      "grade": 5,
      "audioUrl": "assets/audio/listening/foundation/stage-5/f5-10.mp3",
      "type": "mcq_set",
      "title": "Hoạt động hè",
      "recordingScript": "A: What are you going to do at summer camp? B: I'm going to swim, play games, and learn how to put up a tent. A: What are you most excited about? B: Sleeping in a tent with my friends.",
      "questions": [
        {
          "text": "Where is the speaker going?",
          "options": [
            "School",
            "Summer camp",
            "A hospital",
            "A city tour"
          ],
          "answer": 1
        },
        {
          "text": "What will the speaker learn?",
          "options": [
            "How to cook rice",
            "How to put up a tent",
            "How to drive",
            "How to fish"
          ],
          "answer": 1
        },
        {
          "text": "What is most exciting?",
          "options": [
            "Swimming",
            "Games",
            "Sleeping in a tent with friends",
            "Going home"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-5-global-success-c1762.html",
        "section": "Tiếng Anh 5 Global Success: các bài Listening trong Lesson/Review."
      }
    },
    {
      "id": "m1-01",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-01.mp3",
      "type": "mcq_set",
      "title": "My new school",
      "recordingScript": "Hi, I'm Alex. My school starts at eight o'clock. We wear blue uniforms on Mondays and Fridays. My favourite subject is science because we do experiments.",
      "questions": [
        {
          "text": "When does school start?",
          "options": [
            "7:30",
            "8:00",
            "8:30",
            "9:00"
          ],
          "answer": 1
        },
        {
          "text": "What is Alex's favourite subject?",
          "options": [
            "Maths",
            "Science",
            "English",
            "Art"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-13-unit-1-sgk-tieng-anh-6-moi-c134a22004.html",
        "section": "Skills 2 – Unit 1 My New School: listen to a student talking about school."
      }
    },
    {
      "id": "m1-02",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-02.mp3",
      "type": "mcq_set",
      "title": "My house",
      "recordingScript": "There are five rooms in my flat. My bedroom is next to the living room. There is a desk by the window, and I usually read there after dinner.",
      "questions": [
        {
          "text": "How many rooms are there?",
          "options": [
            "Four",
            "Five",
            "Six",
            "Seven"
          ],
          "answer": 1
        },
        {
          "text": "Where is the desk?",
          "options": [
            "By the window",
            "Near the door",
            "In the kitchen",
            "Under the bed"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-23-unit-2-sgk-tieng-anh-6-moi-c134a22015.html",
        "section": "Skills 2 – Unit 2 My House: identify items; True/False."
      }
    },
    {
      "id": "m1-03",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-03.mp3",
      "type": "mcq_set",
      "title": "Best friend",
      "recordingScript": "My best friend is Mai. She has long black hair and wears glasses. She is very kind, and she always helps me with maths homework.",
      "questions": [
        {
          "text": "What does Mai wear?",
          "options": [
            "A hat",
            "Glasses",
            "A uniform",
            "A scarf"
          ],
          "answer": 1
        },
        {
          "text": "What does she help with?",
          "options": [
            "English",
            "Science",
            "Maths",
            "Music"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-33-unit-3-sgk-tieng-anh-6-moi-c134a22041.html",
        "section": "Skills 2 – Unit 3 My Friends: listen to students talking about friends."
      }
    },
    {
      "id": "m1-04",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-04.mp3",
      "type": "mcq_set",
      "title": "Neighbourhood",
      "recordingScript": "I live near a big market. The streets are wide, and there are many small cafés. I like the people because they are friendly, but the traffic is noisy in the evening.",
      "questions": [
        {
          "text": "What is near the home?",
          "options": [
            "A stadium",
            "A market",
            "A lake",
            "A factory"
          ],
          "answer": 1
        },
        {
          "text": "What is disliked?",
          "options": [
            "People",
            "Cafés",
            "Evening traffic",
            "Wide streets"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-45-unit-4-sgk-tieng-anh-6-moi-c134a22090.html",
        "section": "Skills 2 – Unit 4 My Neighbourhood: conversation + True/False."
      }
    },
    {
      "id": "m1-05",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-05.mp3",
      "type": "mcq_set",
      "title": "Phu Quoc",
      "recordingScript": "Phu Quoc is an island in southern Viet Nam. Visitors enjoy its beaches and seafood. Many people also visit fishing villages and national parks.",
      "questions": [
        {
          "text": "What is Phu Quoc?",
          "options": [
            "A mountain",
            "An island",
            "A river",
            "A city district"
          ],
          "answer": 1
        },
        {
          "text": "What food is mentioned?",
          "options": [
            "Noodles",
            "Seafood",
            "Pizza",
            "Cake"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-55-unit-5-sgk-tieng-anh-6-moi-c134a22106.html",
        "section": "Skills 2 – Unit 5 Natural Wonders: listen to a talk and check details."
      }
    },
    {
      "id": "m1-06",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-06.mp3",
      "type": "mcq_set",
      "title": "School club",
      "recordingScript": "Our English club meets every Wednesday at four fifteen in room twelve. This week we are practising a short play for the school festival.",
      "questions": [
        {
          "text": "When does the club meet?",
          "options": [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "answer": 1
        },
        {
          "text": "What are they practising?",
          "options": [
            "A song",
            "A play",
            "A speech",
            "A game"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-13-unit-1-sgk-tieng-anh-6-moi-c134a22004.html",
        "section": "Skills 2 – Unit 1 My New School: listen to a student talking about school."
      }
    },
    {
      "id": "m1-07",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-07.mp3",
      "type": "mcq_set",
      "title": "Bedroom",
      "recordingScript": "My room is small but bright. I have a bed, a bookshelf and a desk. The bookshelf is opposite the bed, and my school bag is under the desk.",
      "questions": [
        {
          "text": "What is opposite the bed?",
          "options": [
            "Desk",
            "Bookshelf",
            "Window",
            "Chair"
          ],
          "answer": 1
        },
        {
          "text": "Where is the school bag?",
          "options": [
            "On the bed",
            "Under the desk",
            "By the door",
            "On the shelf"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-23-unit-2-sgk-tieng-anh-6-moi-c134a22015.html",
        "section": "Skills 2 – Unit 2 My House: identify items; True/False."
      }
    },
    {
      "id": "m1-08",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-08.mp3",
      "type": "mcq_set",
      "title": "Friend's hobby",
      "recordingScript": "Nam is tall and sporty. He plays badminton twice a week and collects football cards. At weekends, he often rides his bike with his cousin.",
      "questions": [
        {
          "text": "How often does Nam play badminton?",
          "options": [
            "Every day",
            "Twice a week",
            "Once a month",
            "At weekends only"
          ],
          "answer": 1
        },
        {
          "text": "What does he collect?",
          "options": [
            "Stamps",
            "Books",
            "Football cards",
            "Coins"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-33-unit-3-sgk-tieng-anh-6-moi-c134a22041.html",
        "section": "Skills 2 – Unit 3 My Friends: listen to students talking about friends."
      }
    },
    {
      "id": "m1-09",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-09.mp3",
      "type": "mcq_set",
      "title": "Getting around",
      "recordingScript": "The bakery is beside the post office. To get there from school, walk straight for two blocks and turn left at the traffic lights.",
      "questions": [
        {
          "text": "What is beside the post office?",
          "options": [
            "School",
            "Bakery",
            "Bank",
            "Park"
          ],
          "answer": 1
        },
        {
          "text": "Where should you turn?",
          "options": [
            "Right at the bank",
            "Left at the traffic lights",
            "Right after one block",
            "Left at school"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-45-unit-4-sgk-tieng-anh-6-moi-c134a22090.html",
        "section": "Skills 2 – Unit 4 My Neighbourhood: conversation + True/False."
      }
    },
    {
      "id": "m1-10",
      "track": "thcs",
      "stage": 1,
      "grade": 6,
      "audioUrl": "assets/audio/listening/thcs/stage-1/m1-10.mp3",
      "type": "mcq_set",
      "title": "Weekend trip",
      "recordingScript": "Our class is visiting a national park on Saturday. We will leave school at six thirty in the morning. Everyone should bring water, a hat and comfortable shoes.",
      "questions": [
        {
          "text": "When will they leave?",
          "options": [
            "6:00",
            "6:30",
            "7:00",
            "7:30"
          ],
          "answer": 1
        },
        {
          "text": "What should students bring?",
          "options": [
            "Umbrella only",
            "Water, hat and comfortable shoes",
            "Uniform",
            "Books"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/skills-2-trang-55-unit-5-sgk-tieng-anh-6-moi-c134a22106.html",
        "section": "Skills 2 – Unit 5 Natural Wonders: listen to a talk and check details."
      }
    },
    {
      "id": "m2-01",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-01.mp3",
      "type": "mcq_set",
      "title": "Healthy breakfast",
      "recordingScript": "A healthy breakfast gives you energy for school. Try to include fruit, whole grains and some protein. Avoid having only sugary drinks because you may feel tired later.",
      "questions": [
        {
          "text": "What does breakfast give you?",
          "options": [
            "Sleep",
            "Energy",
            "Homework",
            "Stress"
          ],
          "answer": 1
        },
        {
          "text": "What should be avoided as the only breakfast?",
          "options": [
            "Fruit",
            "Whole grains",
            "Sugary drinks",
            "Protein"
          ],
          "answer": 2
        },
        {
          "text": "Why?",
          "options": [
            "You may feel tired later",
            "It is too hot",
            "It is expensive",
            "It has no water"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
        "section": "Skills 2 – Unit 2 Healthy Living: tick information + short answers."
      }
    },
    {
      "id": "m2-02",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-02.mp3",
      "type": "mcq_set",
      "title": "Sleep habits",
      "recordingScript": "Teenagers need enough sleep to stay focused. Lan turns off her phone at nine thirty and usually sleeps before ten. She says this helps her feel more active in the morning.",
      "questions": [
        {
          "text": "When is the phone turned off?",
          "options": [
            "9:00",
            "9:30",
            "10:00",
            "10:30"
          ],
          "answer": 1
        },
        {
          "text": "Why does Lan sleep early?",
          "options": [
            "To wake at noon",
            "To feel more active",
            "To watch TV",
            "To exercise at night"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
        "section": "Skills 2 – Unit 2 Healthy Living: tick information + short answers."
      }
    },
    {
      "id": "m2-03",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-03.mp3",
      "type": "mcq_set",
      "title": "Cycling safely",
      "recordingScript": "When you cycle to school, always wear a helmet and use the cycle lane when possible. At busy crossings, slow down and look carefully before you turn.",
      "questions": [
        {
          "text": "What should cyclists always wear?",
          "options": [
            "A cap",
            "A helmet",
            "Gloves",
            "A jacket"
          ],
          "answer": 1
        },
        {
          "text": "What should they do at busy crossings?",
          "options": [
            "Speed up",
            "Stop listening",
            "Slow down and look",
            "Ride on the pavement"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
        "section": "Skills 2 – Unit 7 Traffic: multiple choice + one-word/number gaps."
      }
    },
    {
      "id": "m2-04",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-04.mp3",
      "type": "mcq_set",
      "title": "Traffic jam",
      "recordingScript": "The city centre is busiest from seven to eight in the morning. Buses often move slowly because many parents drive their children to school at the same time.",
      "questions": [
        {
          "text": "When is traffic busiest?",
          "options": [
            "6–7",
            "7–8",
            "8–9",
            "9–10"
          ],
          "answer": 1
        },
        {
          "text": "What contributes to the jam?",
          "options": [
            "School buses only",
            "Parents driving children",
            "Road workers",
            "Tourists"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
        "section": "Skills 2 – Unit 7 Traffic: multiple choice + one-word/number gaps."
      }
    },
    {
      "id": "m2-05",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-05.mp3",
      "type": "mcq_set",
      "title": "Exercise routine",
      "recordingScript": "Minh used to sit at his computer after school, but now he walks for thirty minutes every afternoon and plays basketball on Sundays. He says he sleeps better now.",
      "questions": [
        {
          "text": "What changed?",
          "options": [
            "He stopped school",
            "He exercises more",
            "He eats less",
            "He studies at night"
          ],
          "answer": 1
        },
        {
          "text": "What happens on Sundays?",
          "options": [
            "Walking only",
            "Basketball",
            "Swimming",
            "Cycling"
          ],
          "answer": 1
        },
        {
          "text": "What improved?",
          "options": [
            "Sleep",
            "Grades",
            "Cooking",
            "Travel"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
        "section": "Skills 2 – Unit 2 Healthy Living: tick information + short answers."
      }
    },
    {
      "id": "m2-06",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-06.mp3",
      "type": "mcq_set",
      "title": "Road safety poster",
      "recordingScript": "Our class made a road-safety poster. It tells students not to cross between parked cars and to wait for the green light. We will put it near the school gate tomorrow.",
      "questions": [
        {
          "text": "What is the poster about?",
          "options": [
            "Healthy food",
            "Road safety",
            "School clubs",
            "Recycling"
          ],
          "answer": 1
        },
        {
          "text": "Where will it be placed?",
          "options": [
            "Library",
            "School gate",
            "Bus station",
            "Canteen"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
        "section": "Skills 2 – Unit 7 Traffic: multiple choice + one-word/number gaps."
      }
    },
    {
      "id": "m2-07",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-07.mp3",
      "type": "mcq_set",
      "title": "Healthy lunch",
      "recordingScript": "For lunch, Mai usually brings rice, vegetables and chicken from home. On Fridays she buys noodles at school. She rarely drinks soft drinks.",
      "questions": [
        {
          "text": "What does Mai usually bring?",
          "options": [
            "Rice, vegetables and chicken",
            "Bread only",
            "Noodles",
            "Pizza"
          ],
          "answer": 0
        },
        {
          "text": "When does she buy noodles?",
          "options": [
            "Monday",
            "Wednesday",
            "Friday",
            "Sunday"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
        "section": "Skills 2 – Unit 2 Healthy Living: tick information + short answers."
      }
    },
    {
      "id": "m2-08",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-08.mp3",
      "type": "mcq_set",
      "title": "Bus timetable",
      "recordingScript": "Bus number twenty-one arrives every fifteen minutes during the morning. The first bus is at six, and the last morning bus leaves at nine forty-five.",
      "questions": [
        {
          "text": "How often does the bus arrive?",
          "options": [
            "Every 10 min",
            "Every 15 min",
            "Every 20 min",
            "Every 30 min"
          ],
          "answer": 1
        },
        {
          "text": "When is the first bus?",
          "options": [
            "5:45",
            "6:00",
            "6:15",
            "6:30"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
        "section": "Skills 2 – Unit 7 Traffic: multiple choice + one-word/number gaps."
      }
    },
    {
      "id": "m2-09",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-09.mp3",
      "type": "mcq_set",
      "title": "School health campaign",
      "recordingScript": "Next month our school will run a healthy-living week. Students can join morning exercise, a fruit challenge and a talk about sleep. The talk will be on Thursday afternoon.",
      "questions": [
        {
          "text": "What event is next month?",
          "options": [
            "Sports day",
            "Healthy-living week",
            "Music festival",
            "Exam week"
          ],
          "answer": 1
        },
        {
          "text": "When is the sleep talk?",
          "options": [
            "Tuesday morning",
            "Thursday afternoon",
            "Friday evening",
            "Saturday"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-2-skills-2-a106605.html",
        "section": "Skills 2 – Unit 2 Healthy Living: tick information + short answers."
      }
    },
    {
      "id": "m2-10",
      "track": "thcs",
      "stage": 2,
      "grade": 7,
      "audioUrl": "assets/audio/listening/thcs/stage-2/m2-10.mp3",
      "type": "mcq_set",
      "title": "Crossing the road",
      "recordingScript": "Tom: Can we cross here? Mai: Not yet. The light is red. Let's wait by the crossing. Tom: Good idea. I can see a motorbike coming quickly.",
      "questions": [
        {
          "text": "Why do they wait?",
          "options": [
            "The road is closed",
            "The light is red",
            "They are lost",
            "A bus is late"
          ],
          "answer": 1
        },
        {
          "text": "What vehicle is coming?",
          "options": [
            "Car",
            "Bus",
            "Motorbike",
            "Bicycle"
          ],
          "answer": 2
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-7-unit-7-skills-2-a108662.html",
        "section": "Skills 2 – Unit 7 Traffic: multiple choice + one-word/number gaps."
      }
    },
    {
      "id": "m3-01",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-01.mp3",
      "type": "mcq_set",
      "title": "Leisure interview",
      "recordingScript": "Interviewer: What do you do after school, Mark? Mark: I usually play chess online with my cousin. Twice a week, I also go running with friends. Interviewer: Which activity do you prefer? Mark: Running, because I can talk to my friends at the same time.",
      "questions": [
        {
          "text": "What does Mark usually play online?",
          "options": [
            "Football",
            "Chess",
            "Cards",
            "Games"
          ],
          "answer": 1
        },
        {
          "text": "How often does he run?",
          "options": [
            "Daily",
            "Twice a week",
            "Weekly",
            "Monthly"
          ],
          "answer": 1
        },
        {
          "text": "Why does he prefer running?",
          "options": [
            "It is easier",
            "He can talk to friends",
            "It is indoors",
            "It is cheaper"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-1-skills-2-a134923.html",
        "section": "Skills 2 – Unit 1 Leisure time: interview + table completion."
      }
    },
    {
      "id": "m3-02",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-02.mp3",
      "type": "mcq_set",
      "title": "Countryside opinions",
      "recordingScript": "Speaker 1 likes the countryside because the air is clean and the roads are quiet. Speaker 2 enjoys the open space but misses shops and entertainment. Speaker 3 says the best thing is knowing most people in the village.",
      "questions": [
        {
          "text": "Who mentions clean air?",
          "options": [
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "All"
          ],
          "answer": 0
        },
        {
          "text": "Who misses entertainment?",
          "options": [
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "Nobody"
          ],
          "answer": 1
        },
        {
          "text": "What does Speaker 3 value?",
          "options": [
            "Shopping",
            "Knowing local people",
            "Fast transport",
            "Nightlife"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-2-skills-2-a137295.html",
        "section": "Skills 2 – Unit 2 Countryside: match speakers' opinions + MCQ."
      }
    },
    {
      "id": "m3-03",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-03.mp3",
      "type": "mcq_set",
      "title": "Teen stress",
      "recordingScript": "Lan: I have three tests this week and I also need to finish a group project. Minh: That sounds stressful. Why don't you make a plan and do the most urgent task first? Lan: Good idea. I'll start with the science project tonight.",
      "questions": [
        {
          "text": "Why is Lan stressed?",
          "options": [
            "Sports",
            "Tests and project",
            "Family trip",
            "Job"
          ],
          "answer": 1
        },
        {
          "text": "What advice is given?",
          "options": [
            "Skip the project",
            "Make a plan",
            "Sleep less",
            "Ask for new tests"
          ],
          "answer": 1
        },
        {
          "text": "What will Lan start with?",
          "options": [
            "Maths",
            "Science project",
            "English test",
            "Club"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-3-skills-2-a137331.html",
        "section": "Skills 2 – Unit 3 Teenagers: conversation MCQ + one-word gaps."
      }
    },
    {
      "id": "m3-04",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-04.mp3",
      "type": "mcq_set",
      "title": "Online shopping",
      "recordingScript": "Online shopping is convenient because people can compare prices quickly. However, customers cannot touch the product before buying it, and returning an item may take several days.",
      "questions": [
        {
          "text": "What is one advantage?",
          "options": [
            "Touch products",
            "Compare prices quickly",
            "No delivery",
            "Always cheaper"
          ],
          "answer": 1
        },
        {
          "text": "What is one disadvantage?",
          "options": [
            "Returns may take days",
            "No choice",
            "Shops close early",
            "No internet needed"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-8-skills-2-a142616.html",
        "section": "Skills 2 – Unit 8 Shopping: gap fill + MCQ."
      }
    },
    {
      "id": "m3-05",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-05.mp3",
      "type": "mcq_set",
      "title": "Water pollution",
      "recordingScript": "The river became dirtier after heavy rain carried rubbish from streets into drains. The town is installing filters near the main drains and asking residents to reduce plastic waste.",
      "questions": [
        {
          "text": "What carried rubbish into drains?",
          "options": [
            "Wind",
            "Heavy rain",
            "Cars",
            "Factories"
          ],
          "answer": 1
        },
        {
          "text": "What is the town installing?",
          "options": [
            "Bridges",
            "Filters",
            "Lights",
            "Bins only"
          ],
          "answer": 1
        },
        {
          "text": "What are residents asked to reduce?",
          "options": [
            "Water",
            "Plastic waste",
            "Food",
            "Traffic"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-7-skills-2-a141336.html",
        "section": "Skills 2 – Unit 7 Environmental protection: listen for causes/effects/details."
      }
    },
    {
      "id": "m3-06",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-06.mp3",
      "type": "mcq_set",
      "title": "Club pressure",
      "recordingScript": "Three students are planning the school festival. Nam wants a bigger music show, Hoa worries about the budget, and Linh thinks they need more volunteers before adding new activities.",
      "questions": [
        {
          "text": "Who worries about money?",
          "options": [
            "Nam",
            "Hoa",
            "Linh",
            "All"
          ],
          "answer": 1
        },
        {
          "text": "What does Linh think they need?",
          "options": [
            "More music",
            "More volunteers",
            "A bigger hall",
            "More food"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-3-skills-2-a137331.html",
        "section": "Skills 2 – Unit 3 Teenagers: conversation MCQ + one-word gaps."
      }
    },
    {
      "id": "m3-07",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-07.mp3",
      "type": "mcq_set",
      "title": "Free-time balance",
      "recordingScript": "I enjoy social media, but I try not to use it while doing homework. I put my phone in another room for forty minutes, finish one task, and then take a short break.",
      "questions": [
        {
          "text": "What is moved to another room?",
          "options": [
            "Laptop",
            "Phone",
            "Book",
            "Clock"
          ],
          "answer": 1
        },
        {
          "text": "How long is one focus period?",
          "options": [
            "20 min",
            "30 min",
            "40 min",
            "60 min"
          ],
          "answer": 2
        },
        {
          "text": "Why?",
          "options": [
            "To avoid distraction",
            "To charge phone",
            "To listen to music",
            "To call friends"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-1-skills-2-a134923.html",
        "section": "Skills 2 – Unit 1 Leisure time: interview + table completion."
      }
    },
    {
      "id": "m3-08",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-08.mp3",
      "type": "mcq_set",
      "title": "Village change",
      "recordingScript": "Ten years ago, our village had one small shop and no bus service. Now there are three shops and a bus to town every hour. Some people like the convenience, while others miss the quieter roads.",
      "questions": [
        {
          "text": "What did the village lack?",
          "options": [
            "A school",
            "A bus service",
            "A river",
            "A market"
          ],
          "answer": 1
        },
        {
          "text": "How often is the bus now?",
          "options": [
            "Every 30 min",
            "Every hour",
            "Twice a day",
            "Weekly"
          ],
          "answer": 1
        },
        {
          "text": "What do some people miss?",
          "options": [
            "Shops",
            "Quiet roads",
            "Jobs",
            "School"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-2-skills-2-a137295.html",
        "section": "Skills 2 – Unit 2 Countryside: match speakers' opinions + MCQ."
      }
    },
    {
      "id": "m3-09",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-09.mp3",
      "type": "mcq_set",
      "title": "Return policy",
      "recordingScript": "Customer: I'd like to return these shoes. Assistant: Of course. Do you have the receipt? Customer: Yes, but I bought them online. Assistant: That's fine. We can refund the money to your card within three working days.",
      "questions": [
        {
          "text": "What is being returned?",
          "options": [
            "Shirt",
            "Shoes",
            "Phone",
            "Bag"
          ],
          "answer": 1
        },
        {
          "text": "Was it bought online?",
          "options": [
            "Yes",
            "No",
            "Not stated",
            "Only partly"
          ],
          "answer": 0
        },
        {
          "text": "How long for refund?",
          "options": [
            "Same day",
            "Three working days",
            "One week",
            "One month"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-8-skills-2-a142616.html",
        "section": "Skills 2 – Unit 8 Shopping: gap fill + MCQ."
      }
    },
    {
      "id": "m3-10",
      "track": "thcs",
      "stage": 3,
      "grade": 8,
      "audioUrl": "assets/audio/listening/thcs/stage-3/m3-10.mp3",
      "type": "mcq_set",
      "title": "School environment",
      "recordingScript": "The eco club measured rubbish for one week and found that plastic cups were the biggest problem. They suggested reusable bottles and a water station. After a month, the number of plastic cups dropped by more than half.",
      "questions": [
        {
          "text": "What was the biggest problem?",
          "options": [
            "Paper",
            "Plastic cups",
            "Food",
            "Cans"
          ],
          "answer": 1
        },
        {
          "text": "What was suggested?",
          "options": [
            "More bins only",
            "Reusable bottles and water station",
            "No drinks",
            "New canteen"
          ],
          "answer": 1
        },
        {
          "text": "What happened after a month?",
          "options": [
            "Waste doubled",
            "Plastic cups fell by over half",
            "Nothing changed",
            "Water station closed"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-8-unit-7-skills-2-a141336.html",
        "section": "Skills 2 – Unit 7 Environmental protection: listen for causes/effects/details."
      }
    },
    {
      "id": "m4-01",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-01.mp3",
      "type": "mcq_set",
      "title": "City views",
      "recordingScript": "Presenter: Three students describe city life. Minh values late buses because he studies in the evening. Mai wants more public parks instead of another mall. Khoa likes the facilities but says cycling feels unsafe on roads without protected lanes.",
      "questions": [
        {
          "text": "Who needs late buses?",
          "options": [
            "Minh",
            "Mai",
            "Khoa",
            "Presenter"
          ],
          "answer": 0
        },
        {
          "text": "What does Mai want?",
          "options": [
            "More malls",
            "More parks",
            "More buses",
            "More roads"
          ],
          "answer": 1
        },
        {
          "text": "What concerns Khoa?",
          "options": [
            "Prices",
            "Cycling safety",
            "Schools",
            "Noise"
          ],
          "answer": 1
        },
        {
          "text": "What is the common topic?",
          "options": [
            "Rural jobs",
            "City improvements",
            "Foreign travel",
            "School rules"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-2-skills-2-a156636.html",
        "section": "Skills 2 – Unit 2 City life: three teenagers + T/F + MCQ."
      }
    },
    {
      "id": "m4-02",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-02.mp3",
      "type": "mcq_set",
      "title": "Time management",
      "recordingScript": "Trang plans her week every Sunday and puts the hardest school tasks first. Phong uses a timer and studies in short focused blocks. Tom does not make a detailed plan; instead, he writes three important tasks each morning.",
      "questions": [
        {
          "text": "Who plans weekly?",
          "options": [
            "Trang",
            "Phong",
            "Tom",
            "All"
          ],
          "answer": 0
        },
        {
          "text": "Who uses a timer?",
          "options": [
            "Trang",
            "Phong",
            "Tom",
            "Nobody"
          ],
          "answer": 1
        },
        {
          "text": "How many important tasks does Tom write?",
          "options": [
            "Two",
            "Three",
            "Four",
            "Five"
          ],
          "answer": 1
        },
        {
          "text": "What do all methods try to improve?",
          "options": [
            "Travel",
            "Time management",
            "Cooking",
            "Exercise"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-3-skills-2-a156776.html",
        "section": "Skills 2 – Unit 3: multiple speakers on time management + MCQ."
      }
    },
    {
      "id": "m4-03",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-03.mp3",
      "type": "mcq_set",
      "title": "Learning vocabulary",
      "recordingScript": "When Trang meets a new word, she first guesses its meaning from the sentence. Then she checks a learner's dictionary and writes one example of her own. At the weekend she reviews only words that appeared more than once.",
      "questions": [
        {
          "text": "What does Trang do first?",
          "options": [
            "Translate immediately",
            "Guess from context",
            "Ask a friend",
            "Ignore it"
          ],
          "answer": 1
        },
        {
          "text": "What dictionary does she use?",
          "options": [
            "Picture",
            "Learner's",
            "Bilingual only",
            "No dictionary"
          ],
          "answer": 1
        },
        {
          "text": "What does she write?",
          "options": [
            "A translation only",
            "Her own example",
            "A poem",
            "A test"
          ],
          "answer": 1
        },
        {
          "text": "Which words are reviewed?",
          "options": [
            "Every word",
            "Words seen more than once",
            "Only verbs",
            "Only easy words"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-9-skills-2-a163737.html",
        "section": "Skills 2 – Unit 9 World Englishes: T/F + no-more-than-two-word gaps."
      }
    },
    {
      "id": "m4-04",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-04.mp3",
      "type": "mcq_set",
      "title": "Community helper",
      "recordingScript": "Mr Long volunteers at a community centre three evenings a week. He teaches children how to repair simple bicycles and helps elderly residents with small household problems. He says the best part is seeing people become more confident.",
      "questions": [
        {
          "text": "Where does he volunteer?",
          "options": [
            "Hospital",
            "Community centre",
            "School",
            "Shop"
          ],
          "answer": 1
        },
        {
          "text": "How often?",
          "options": [
            "Daily",
            "Three evenings a week",
            "Weekends only",
            "Monthly"
          ],
          "answer": 1
        },
        {
          "text": "Who receives household help?",
          "options": [
            "Children",
            "Elderly residents",
            "Tourists",
            "Teachers"
          ],
          "answer": 1
        },
        {
          "text": "What does he enjoy most?",
          "options": [
            "Money",
            "People becoming confident",
            "Free food",
            "Travel"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-1-skills-2-a156628.html",
        "section": "Skills 2 – Unit 1 Local community: listening for specific information."
      }
    },
    {
      "id": "m4-05",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-05.mp3",
      "type": "mcq_set",
      "title": "City transport proposal",
      "recordingScript": "The council wants to reduce traffic near schools. One proposal adds bus-only lanes on two main roads. Another creates safe bicycle routes. Some shop owners worry about fewer parking spaces, but parents strongly support safer crossings.",
      "questions": [
        {
          "text": "What is the goal?",
          "options": [
            "More parking",
            "Reduce traffic near schools",
            "Build malls",
            "Close schools"
          ],
          "answer": 1
        },
        {
          "text": "What lanes are proposed?",
          "options": [
            "Taxi-only",
            "Bus-only",
            "Car-only",
            "Walking-only"
          ],
          "answer": 1
        },
        {
          "text": "Who worries about parking?",
          "options": [
            "Parents",
            "Students",
            "Shop owners",
            "Bus drivers"
          ],
          "answer": 2
        },
        {
          "text": "What do parents support?",
          "options": [
            "Safer crossings",
            "More shops",
            "Longer roads",
            "Fewer buses"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-2-skills-2-a156636.html",
        "section": "Skills 2 – Unit 2 City life: three teenagers + T/F + MCQ."
      }
    },
    {
      "id": "m4-06",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-06.mp3",
      "type": "mcq_set",
      "title": "Study distractions",
      "recordingScript": "Linh used to study with several messaging apps open. She noticed that a twenty-minute homework task sometimes took almost twice as long. Now she silences notifications and checks messages only during planned breaks.",
      "questions": [
        {
          "text": "What distracted Linh?",
          "options": [
            "Music",
            "Messaging apps",
            "Books",
            "Exercise"
          ],
          "answer": 1
        },
        {
          "text": "What happened to a 20-minute task?",
          "options": [
            "It became shorter",
            "It sometimes took nearly twice as long",
            "It was cancelled",
            "It took five minutes"
          ],
          "answer": 1
        },
        {
          "text": "What does she do now?",
          "options": [
            "Deletes all apps",
            "Silences notifications",
            "Never checks messages",
            "Studies outside"
          ],
          "answer": 1
        },
        {
          "text": "When does she check messages?",
          "options": [
            "During planned breaks",
            "During every task",
            "Only at midnight",
            "Before school only"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-3-skills-2-a156776.html",
        "section": "Skills 2 – Unit 3: multiple speakers on time management + MCQ."
      }
    },
    {
      "id": "m4-07",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-07.mp3",
      "type": "mcq_set",
      "title": "English exposure",
      "recordingScript": "Four students describe how they practise English. One watches short science videos, another plays online games with international friends, the third listens to podcasts while travelling, and the fourth joins a weekly speaking club. All say regular contact with English matters.",
      "questions": [
        {
          "text": "How many students?",
          "options": [
            "Two",
            "Three",
            "Four",
            "Five"
          ],
          "answer": 2
        },
        {
          "text": "Who listens while travelling?",
          "options": [
            "First",
            "Second",
            "Third",
            "Fourth"
          ],
          "answer": 2
        },
        {
          "text": "How often is the speaking club?",
          "options": [
            "Daily",
            "Weekly",
            "Monthly",
            "Yearly"
          ],
          "answer": 1
        },
        {
          "text": "What do they agree on?",
          "options": [
            "Grammar only",
            "Regular exposure matters",
            "Travel is necessary",
            "Games are best"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-9-skills-2-a163737.html",
        "section": "Skills 2 – Unit 9 World Englishes: T/F + no-more-than-two-word gaps."
      }
    },
    {
      "id": "m4-08",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-08.mp3",
      "type": "mcq_set",
      "title": "Local craft",
      "recordingScript": "A pottery workshop in our area used to sell mainly to tourists. This year it began offering weekend classes for local teenagers. The owner says the classes create extra income, but more importantly they help young people understand the craft.",
      "questions": [
        {
          "text": "What did the workshop mainly do before?",
          "options": [
            "Teach teens",
            "Sell to tourists",
            "Make food",
            "Repair bikes"
          ],
          "answer": 1
        },
        {
          "text": "What is new?",
          "options": [
            "Night market",
            "Weekend classes",
            "Online exams",
            "Free buses"
          ],
          "answer": 1
        },
        {
          "text": "What benefit is mentioned first?",
          "options": [
            "Extra income",
            "Less work",
            "More parking",
            "Cheaper clay"
          ],
          "answer": 0
        },
        {
          "text": "What deeper benefit does the owner value?",
          "options": [
            "Young people understand the craft",
            "Tourists stay longer",
            "Products are larger",
            "Teachers travel"
          ],
          "answer": 0
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-1-skills-2-a156628.html",
        "section": "Skills 2 – Unit 1 Local community: listening for specific information."
      }
    },
    {
      "id": "m4-09",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-09.mp3",
      "type": "mcq_set",
      "title": "Balanced schedule",
      "recordingScript": "Mai has basketball practice on Tuesday and Thursday, so she does not plan heavy homework for those evenings. She finishes major assignments on Monday and Wednesday and keeps Friday night free for family time.",
      "questions": [
        {
          "text": "Which days have basketball?",
          "options": [
            "Mon/Wed",
            "Tue/Thu",
            "Thu/Fri",
            "Sat/Sun"
          ],
          "answer": 1
        },
        {
          "text": "When are major assignments done?",
          "options": [
            "Mon/Wed",
            "Tue/Thu",
            "Friday",
            "Weekend"
          ],
          "answer": 0
        },
        {
          "text": "What is Friday night for?",
          "options": [
            "Extra school",
            "Family time",
            "Basketball",
            "Shopping"
          ],
          "answer": 1
        },
        {
          "text": "What strategy is Mai using?",
          "options": [
            "Ignoring deadlines",
            "Planning around fixed activities",
            "Studying only weekends",
            "Doing everything Tuesday"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-3-skills-2-a156776.html",
        "section": "Skills 2 – Unit 3: multiple speakers on time management + MCQ."
      }
    },
    {
      "id": "m4-10",
      "track": "thcs",
      "stage": 4,
      "grade": 9,
      "audioUrl": "assets/audio/listening/thcs/stage-4/m4-10.mp3",
      "type": "mcq_set",
      "title": "City air quality",
      "recordingScript": "A school survey found that students walking along the main road reported more unpleasant air than students using the riverside path. The survey cannot prove the road caused every symptom, but it suggests the school should study safer, cleaner routes.",
      "questions": [
        {
          "text": "Who reported worse air?",
          "options": [
            "Riverside walkers",
            "Main-road walkers",
            "Bus users",
            "Teachers"
          ],
          "answer": 1
        },
        {
          "text": "What can the survey NOT prove?",
          "options": [
            "The road caused every symptom",
            "Students walk to school",
            "There is a river",
            "Routes differ"
          ],
          "answer": 0
        },
        {
          "text": "What does it suggest?",
          "options": [
            "Cancel school",
            "Study cleaner routes",
            "Build shops",
            "Ban walking"
          ],
          "answer": 1
        },
        {
          "text": "What kind of conclusion is this?",
          "options": [
            "Certain proof",
            "A cautious inference",
            "A joke",
            "An advertisement"
          ],
          "answer": 1
        }
      ],
      "source": {
        "url": "https://loigiaihay.com/tieng-anh-9-unit-2-skills-2-a156636.html",
        "section": "Skills 2 – Unit 2 City life: three teenagers + T/F + MCQ."
      }
    }
  ]
};
})();
