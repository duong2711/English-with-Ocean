// Dữ liệu từ vựng lớp 7 (THCS/THPT) — trích từ SGK Tiếng Anh 7 Global Success
// Mỗi unit gồm: từ vựng (words), bài đọc (story). Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE7_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🎨",
    "title": "HOBBIES",
    "titleVi": "Sở thích",
    "words": [
      {
        "en": "Hobby",
        "ipa": "/ˈhɒbi/",
        "vi": "Sở thích",
        "img": "https://img.invalid/hobby.jpg",
        "ex": "My hobby is building dollhouses.",
        "trVi": "Sở thích của tôi là làm nhà búp bê.",
        "trAnswer": "My hobby is building dollhouses.",
        "trKey": "hobby"
      },
      {
        "en": "Collect",
        "ipa": "/kəˈlekt/",
        "vi": "Sưu tầm",
        "img": "https://img.invalid/collect.jpg",
        "ex": "My friend Mi's favourite hobby is collecting stamps.",
        "trVi": "Sở thích yêu thích của bạn Mi là sưu tầm tem.",
        "trAnswer": "My friend Mi's favourite hobby is collecting stamps.",
        "trKey": "collect"
      },
      {
        "en": "Gardening",
        "ipa": "/ˈɡɑːdnɪŋ/",
        "vi": "Làm vườn",
        "img": "https://img.invalid/gardening.jpg",
        "ex": "My mum and I love gardening. We usually spend an hour a day in our garden.",
        "trVi": "Mẹ và tôi rất thích làm vườn. Chúng tôi thường dành một giờ mỗi ngày trong khu vườn.",
        "trAnswer": "My mum and I love gardening. We usually spend an hour a day in our garden.",
        "trKey": "gardening"
      },
      {
        "en": "Horse riding",
        "ipa": "/hɔːs ˈraɪdɪŋ/",
        "vi": "Cưỡi ngựa",
        "img": "https://img.invalid/horse-riding.jpg",
        "ex": "I like horse riding.",
        "trVi": "Tôi thích cưỡi ngựa.",
        "trAnswer": "I like horse riding.",
        "trKey": "horse riding"
      },
      {
        "en": "Making models",
        "ipa": "/ˈmeɪkɪŋ ˈmɒdlz/",
        "vi": "Làm mô hình",
        "img": "https://img.invalid/making-models.jpg",
        "ex": "Does your brother like making models?",
        "trVi": "Anh trai của bạn có thích làm mô hình không?",
        "trAnswer": "Does your brother like making models?",
        "trKey": "making models"
      },
      {
        "en": "Judo",
        "ipa": "/ˈdʒuːdəʊ/",
        "vi": "Võ judo",
        "img": "https://img.invalid/judo.jpg",
        "ex": "Mark enjoys playing sport. He does judo every Tuesday.",
        "trVi": "Mark thích chơi thể thao. Cậu ấy tập judo vào mỗi thứ Ba.",
        "trAnswer": "Mark enjoys playing sport. He does judo every Tuesday.",
        "trKey": "judo"
      },
      {
        "en": "Enjoy",
        "ipa": "/ɪnˈdʒɔɪ/",
        "vi": "Thích, tận hưởng",
        "img": "https://img.invalid/enjoy.jpg",
        "ex": "My dad enjoys gardening.",
        "trVi": "Bố tôi thích làm vườn.",
        "trAnswer": "My dad enjoys gardening.",
        "trKey": "enjoy"
      },
      {
        "en": "Hate",
        "ipa": "/heɪt/",
        "vi": "Ghét",
        "img": "https://img.invalid/hate.jpg",
        "ex": "My best friend hates playing computer games.",
        "trVi": "Bạn thân của tôi ghét chơi trò chơi điện tử.",
        "trAnswer": "My best friend hates playing computer games.",
        "trKey": "hate"
      },
      {
        "en": "Patient",
        "ipa": "/ˈpeɪʃnt/",
        "vi": "Kiên nhẫn",
        "img": "https://img.invalid/patient.jpg",
        "ex": "Gardening teaches children to be patient.",
        "trVi": "Làm vườn dạy trẻ em biết kiên nhẫn.",
        "trAnswer": "Gardening teaches children to be patient.",
        "trKey": "patient"
      },
      {
        "en": "Responsibility",
        "ipa": "/rɪˌspɒnsəˈbɪləti/",
        "vi": "Trách nhiệm",
        "img": "https://img.invalid/responsibility.jpg",
        "ex": "Children learn about responsibility when they take care of their plants.",
        "trVi": "Trẻ em học về trách nhiệm khi chăm sóc cây cối của mình.",
        "trAnswer": "Children learn about responsibility when they take care of their plants.",
        "trKey": "responsibility"
      },
      {
        "en": "Creativity",
        "ipa": "/ˌkriːeɪˈtɪvəti/",
        "vi": "Sự sáng tạo",
        "img": "https://img.invalid/creativity.jpg",
        "ex": "Building a dollhouse just needs some cardboard, glue, and a bit of creativity.",
        "trVi": "Làm nhà búp bê chỉ cần một ít bìa cứng, keo dán và một chút sáng tạo.",
        "trAnswer": "Building a dollhouse just needs some cardboard, glue, and a bit of creativity.",
        "trKey": "creativity"
      },
      {
        "en": "Free time",
        "ipa": "/friː taɪm/",
        "vi": "Thời gian rảnh",
        "img": "https://img.invalid/free-time.jpg",
        "ex": "What do you do in your free time?",
        "trVi": "Bạn làm gì trong thời gian rảnh?",
        "trAnswer": "What do you do in your free time?",
        "trKey": "free time"
      }
    ],
    "story": {
      "title": "Gardening",
      "titleVi": "Làm vườn",
      "text": "People divide hobbies into four big groups: doing things, making things, collecting things, and learning things. Gardening belongs to the most popular group - doing things.<br><br>Gardening is one of the oldest outdoor activities. It has something for everyone, even for children. Gardening teaches children about flowers, fruits, and vegetables. They can also learn about insects and bugs. When gardening, children learn to be patient and take on responsibility. They learn to wait for the plants to grow to maturity. And if they don't water their plants, their plants will die. This teaches them valuable lessons about responsibility.<br><br>Gardening is also good because everyone in the family can join in and do something together. My mum and I love gardening. We usually spend an hour a day in our garden. It really makes us happy, and we love spending time together.",
      "textVi": "Người ta chia sở thích thành bốn nhóm lớn: làm việc gì đó, tạo ra đồ vật, sưu tầm đồ vật, và học hỏi điều gì đó. Làm vườn thuộc nhóm phổ biến nhất - làm việc gì đó.<br><br>Làm vườn là một trong những hoạt động ngoài trời lâu đời nhất. Nó mang lại điều gì đó cho tất cả mọi người, kể cả trẻ em. Làm vườn dạy trẻ em về hoa, trái cây và rau củ. Các em cũng có thể học về côn trùng và sâu bọ. Khi làm vườn, trẻ em học cách kiên nhẫn và biết nhận trách nhiệm. Các em học cách chờ đợi cây cối lớn lên. Và nếu không tưới nước cho cây, cây sẽ chết. Điều này dạy các em những bài học quý giá về trách nhiệm.<br><br>Làm vườn còn tốt vì mọi người trong gia đình đều có thể cùng tham gia và làm việc gì đó cùng nhau. Mẹ và tôi rất thích làm vườn. Chúng tôi thường dành một giờ mỗi ngày trong khu vườn. Điều đó thực sự khiến chúng tôi hạnh phúc, và chúng tôi thích được ở bên nhau.",
      "used": [
        "Gardening",
        "Patient",
        "Responsibility"
      ]
    }
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "💪",
    "title": "HEALTHY LIVING",
    "titleVi": "Sống khỏe mạnh",
    "words": [
      {
        "en": "Boating",
        "ipa": "/ˈbəʊtɪŋ/",
        "vi": "Chèo thuyền",
        "img": "https://img.invalid/boating.jpg",
        "ex": "That's my dad and I boating at Yen So Park.",
        "trVi": "Đó là bố tôi và tôi đang chèo thuyền ở công viên Yên Sở.",
        "trAnswer": "That's my dad and I boating at Yen So Park.",
        "trKey": "boating"
      },
      {
        "en": "Suncream",
        "ipa": "/ˈsʌnkriːm/",
        "vi": "Kem chống nắng",
        "img": "https://img.invalid/suncream.jpg",
        "ex": "Bring along a hat and suncream.",
        "trVi": "Hãy mang theo một chiếc mũ và kem chống nắng.",
        "trAnswer": "Bring along a hat and suncream.",
        "trKey": "suncream"
      },
      {
        "en": "Sunburn",
        "ipa": "/ˈsʌnbɜːn/",
        "vi": "Cháy nắng",
        "img": "https://img.invalid/sunburn.jpg",
        "ex": "You might get sunburn if you spend a long time in the sun.",
        "trVi": "Bạn có thể bị cháy nắng nếu ở ngoài nắng quá lâu.",
        "trAnswer": "You might get sunburn if you spend a long time in the sun.",
        "trKey": "sunburn"
      },
      {
        "en": "Chapped lips",
        "ipa": "/tʃæpt lɪps/",
        "vi": "Môi nứt nẻ",
        "img": "https://img.invalid/chapped-lips.jpg",
        "ex": "Use lip balm to avoid chapped lips.",
        "trVi": "Hãy dùng son dưỡng môi để tránh môi bị nứt nẻ.",
        "trAnswer": "Use lip balm to avoid chapped lips.",
        "trKey": "chapped lips"
      },
      {
        "en": "Acne",
        "ipa": "/ˈækni/",
        "vi": "Mụn trứng cá",
        "img": "https://img.invalid/acne.jpg",
        "ex": "Acne is a skin condition. It causes small, red spots on the face and the back.",
        "trVi": "Mụn trứng cá là một tình trạng da. Nó gây ra các nốt đỏ nhỏ trên mặt và lưng.",
        "trAnswer": "Acne is a skin condition. It causes small, red spots on the face and the back.",
        "trKey": "acne"
      },
      {
        "en": "Skin condition",
        "ipa": "/skɪn kənˈdɪʃn/",
        "vi": "Tình trạng da",
        "img": "https://img.invalid/skin-condition.jpg",
        "ex": "Acne is a skin condition that affects many young people.",
        "trVi": "Mụn trứng cá là một tình trạng da ảnh hưởng đến nhiều người trẻ.",
        "trAnswer": "Acne is a skin condition that affects many young people.",
        "trKey": "skin condition"
      },
      {
        "en": "Fit",
        "ipa": "/fɪt/",
        "vi": "Khỏe mạnh, cân đối",
        "img": "https://img.invalid/fit.jpg",
        "ex": "Healthy food and exercise help people keep fit.",
        "trVi": "Thức ăn lành mạnh và tập thể dục giúp mọi người giữ dáng khỏe mạnh.",
        "trAnswer": "Healthy food and exercise help people keep fit.",
        "trKey": "fit"
      },
      {
        "en": "Soft drinks",
        "ipa": "/sɒft drɪŋks/",
        "vi": "Nước ngọt có ga",
        "img": "https://img.invalid/soft-drinks.jpg",
        "ex": "Children should avoid fast food and soft drinks.",
        "trVi": "Trẻ em nên tránh đồ ăn nhanh và nước ngọt có ga.",
        "trAnswer": "Children should avoid fast food and soft drinks.",
        "trKey": "soft drinks"
      },
      {
        "en": "Tofu",
        "ipa": "/ˈtəʊfuː/",
        "vi": "Đậu phụ",
        "img": "https://img.invalid/tofu.jpg",
        "ex": "The Japanese eat a lot of tofu, a product from soybeans.",
        "trVi": "Người Nhật ăn rất nhiều đậu phụ, một sản phẩm từ đậu nành.",
        "trAnswer": "The Japanese eat a lot of tofu, a product from soybeans.",
        "trKey": "tofu"
      },
      {
        "en": "Coloured vegetables",
        "ipa": "/ˈkʌləd ˈvedʒtəblz/",
        "vi": "Rau củ nhiều màu sắc",
        "img": "https://img.invalid/coloured-vegetables.jpg",
        "ex": "Coloured vegetables are good food.",
        "trVi": "Rau củ nhiều màu sắc là thực phẩm tốt.",
        "trAnswer": "Coloured vegetables are good food.",
        "trKey": "coloured vegetables"
      },
      {
        "en": "Avoid",
        "ipa": "/əˈvɔɪd/",
        "vi": "Tránh",
        "img": "https://img.invalid/avoid.jpg",
        "ex": "We avoid sweetened food and soft drinks.",
        "trVi": "Chúng tôi tránh đồ ngọt và nước ngọt có ga.",
        "trAnswer": "We avoid sweetened food and soft drinks.",
        "trKey": "avoid"
      }
    ],
    "story": {
      "title": "Acne",
      "titleVi": "Mụn trứng cá",
      "text": "Acne is a skin condition. It causes small, red spots on the face and the back. It affects 70-80% of young people between 12 and 30. More girls have acne than boys. It's not a serious disease but young people want to avoid it.<br><br>Here are some tips for taking care of a person with acne:<br>Go to bed early and get enough sleep. Eat more fruit and vegetables, and less fast food. Wash your face with special soap for acne, but no more than twice a day. Don't touch or pop spots, especially when your hands are dirty. If it gets serious, see a doctor.",
      "textVi": "Mụn trứng cá là một tình trạng da. Nó gây ra các nốt đỏ nhỏ trên mặt và lưng. Nó ảnh hưởng đến 70-80% người trẻ trong độ tuổi từ 12 đến 30. Con gái bị mụn nhiều hơn con trai. Đây không phải là một căn bệnh nghiêm trọng nhưng người trẻ vẫn muốn tránh nó.<br><br>Dưới đây là một số lời khuyên để chăm sóc người bị mụn:<br>Hãy đi ngủ sớm và ngủ đủ giấc. Ăn nhiều trái cây và rau củ hơn, và ít đồ ăn nhanh hơn. Rửa mặt bằng loại xà phòng dành riêng cho da mụn, nhưng không quá hai lần một ngày. Đừng chạm vào hoặc nặn mụn, đặc biệt là khi tay bẩn. Nếu tình trạng trở nên nghiêm trọng, hãy đến gặp bác sĩ.",
      "used": [
        "Acne",
        "Skin condition"
      ]
    }
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🤝",
    "title": "COMMUNITY SERVICE",
    "titleVi": "Hoạt động cộng đồng",
    "words": [
      {
        "en": "Donate",
        "ipa": "/dəʊˈneɪt/",
        "vi": "Quyên góp",
        "img": "https://img.invalid/donate.jpg",
        "ex": "We donate the vegetables to a nursing home.",
        "trVi": "Chúng tôi quyên góp rau củ cho một viện dưỡng lão.",
        "trAnswer": "We donate the vegetables to a nursing home.",
        "trKey": "donate"
      },
      {
        "en": "Pick up litter",
        "ipa": "/pɪk ʌp ˈlɪtər/",
        "vi": "Nhặt rác",
        "img": "https://img.invalid/pick-up-litter.jpg",
        "ex": "We pick up litter around our school and plant vegetables in our school garden.",
        "trVi": "Chúng tôi nhặt rác quanh trường và trồng rau trong vườn trường.",
        "trAnswer": "We pick up litter around our school and plant vegetables in our school garden.",
        "trKey": "pick up litter"
      },
      {
        "en": "Homeless children",
        "ipa": "/ˈhəʊmləs ˈtʃɪldrən/",
        "vi": "Trẻ em vô gia cư",
        "img": "https://img.invalid/homeless-children.jpg",
        "ex": "We donate books to homeless children.",
        "trVi": "Chúng tôi quyên góp sách cho trẻ em vô gia cư.",
        "trAnswer": "We donate books to homeless children.",
        "trKey": "homeless children"
      },
      {
        "en": "Nursing home",
        "ipa": "/ˈnɜːsɪŋ həʊm/",
        "vi": "Viện dưỡng lão",
        "img": "https://img.invalid/nursing-home.jpg",
        "ex": "We helped lonely elderly people at a nursing home.",
        "trVi": "Chúng tôi giúp đỡ người già cô đơn tại viện dưỡng lão.",
        "trAnswer": "We helped lonely elderly people at a nursing home.",
        "trKey": "nursing home"
      },
      {
        "en": "Exchange",
        "ipa": "/ɪksˈtʃeɪndʒ/",
        "vi": "Trao đổi",
        "img": "https://img.invalid/exchange.jpg",
        "ex": "Children in our village exchange used paper for notebooks every school year.",
        "trVi": "Trẻ em ở làng chúng tôi trao đổi giấy đã dùng để lấy vở mỗi năm học.",
        "trAnswer": "Children in our village exchange used paper for notebooks every school year.",
        "trKey": "exchange"
      },
      {
        "en": "Tutor",
        "ipa": "/ˈtjuːtər/",
        "vi": "Dạy kèm",
        "img": "https://img.invalid/tutor.jpg",
        "ex": "Minh and his friends often tutor small children in their village.",
        "trVi": "Minh và các bạn của cậu ấy thường dạy kèm cho các em nhỏ trong làng.",
        "trAnswer": "Minh and his friends often tutor small children in their village.",
        "trKey": "tutor"
      },
      {
        "en": "Volunteer",
        "ipa": "/ˌvɒlənˈtɪər/",
        "vi": "Tình nguyện",
        "img": "https://img.invalid/volunteer.jpg",
        "ex": "Tom volunteered to teach English in our village last winter.",
        "trVi": "Tom đã tình nguyện dạy tiếng Anh ở làng chúng tôi vào mùa đông trước.",
        "trAnswer": "Tom volunteered to teach English in our village last winter.",
        "trKey": "volunteer"
      },
      {
        "en": "Elderly",
        "ipa": "/ˈeldəli/",
        "vi": "Người cao tuổi",
        "img": "https://img.invalid/elderly.jpg",
        "ex": "We helped the elderly in a village last summer.",
        "trVi": "Chúng tôi đã giúp đỡ người cao tuổi ở một ngôi làng vào mùa hè trước.",
        "trAnswer": "We helped the elderly in a village last summer.",
        "trKey": "elderly"
      },
      {
        "en": "Community service",
        "ipa": "/kəˈmjuːnəti ˈsɜːvɪs/",
        "vi": "Hoạt động cộng đồng",
        "img": "https://img.invalid/community-service.jpg",
        "ex": "Bright Future School has many community activities for students.",
        "trVi": "Trường Bright Future có rất nhiều hoạt động cộng đồng dành cho học sinh.",
        "trAnswer": "Bright Future School has many community activities for students.",
        "trKey": "community service"
      },
      {
        "en": "Orphanage",
        "ipa": "/ˈɔːfənɪdʒ/",
        "vi": "Trại trẻ mồ côi",
        "img": "https://img.invalid/orphanage.jpg",
        "ex": "Green School grew vegetables for an orphanage last spring.",
        "trVi": "Trường Green School đã trồng rau cho một trại trẻ mồ côi vào mùa xuân trước.",
        "trAnswer": "Green School grew vegetables for an orphanage last spring.",
        "trKey": "orphanage"
      }
    ],
    "story": {
      "title": "Community activities at Bright Future School",
      "titleVi": "Hoạt động cộng đồng ở trường Bright Future",
      "text": "Bright Future School has many community activities for students. The school believes that a good way for students to develop themselves is through community service. All students can join any of these different projects:<br>- Tutoring: Upper grade students tutor younger students.<br>- Postcard-to-Help: Students make and sell postcards to raise money for local children.<br>- Visit-to-Read: Students visit a nursing home and read to the elderly.<br>- Garden-to-Give: Students grow vegetables and donate them to local schools.<br>- Paper-Plant-Exchange: Students collect paper and exchange it for plants. They then look after the plants in their school garden.<br><br>Students learn that they can help people and the world around them when they do community service. They feel useful and proud because they do good things.",
      "textVi": "Trường Bright Future có rất nhiều hoạt động cộng đồng dành cho học sinh. Nhà trường tin rằng một cách tốt để học sinh phát triển bản thân là thông qua hoạt động cộng đồng. Tất cả học sinh có thể tham gia bất kỳ dự án nào sau đây:<br>- Tutoring (Dạy kèm): Học sinh khối lớn dạy kèm cho học sinh khối nhỏ hơn.<br>- Postcard-to-Help (Bưu thiếp giúp đỡ): Học sinh làm và bán bưu thiếp để gây quỹ cho trẻ em địa phương.<br>- Visit-to-Read (Thăm và đọc sách): Học sinh đến thăm viện dưỡng lão và đọc sách cho người già nghe.<br>- Garden-to-Give (Vườn rau sẻ chia): Học sinh trồng rau và quyên góp cho các trường học địa phương.<br>- Paper-Plant-Exchange (Đổi giấy lấy cây): Học sinh thu gom giấy và đổi lấy cây trồng, sau đó chăm sóc cây trong vườn trường.<br><br>Học sinh học được rằng các em có thể giúp đỡ mọi người và thế giới xung quanh khi tham gia hoạt động cộng đồng. Các em cảm thấy có ích và tự hào vì đã làm những việc tốt.",
      "used": [
        "Tutor",
        "Nursing home",
        "Donate"
      ]
    }
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🎭",
    "title": "MUSIC AND ARTS",
    "titleVi": "Âm nhạc và nghệ thuật",
    "words": [
      {
        "en": "Art gallery",
        "ipa": "/ɑːt ˈɡæləri/",
        "vi": "Phòng trưng bày nghệ thuật",
        "img": "https://img.invalid/art-gallery.jpg",
        "ex": "Nick wants to go to an art gallery next weekend.",
        "trVi": "Nick muốn đến một phòng trưng bày nghệ thuật vào cuối tuần sau.",
        "trAnswer": "Nick wants to go to an art gallery next weekend.",
        "trKey": "art gallery"
      },
      {
        "en": "Composer",
        "ipa": "/kəmˈpəʊzər/",
        "vi": "Nhạc sĩ sáng tác",
        "img": "https://img.invalid/composer.jpg",
        "ex": "Van Cao was a great Vietnamese composer. He was also a painter and poet.",
        "trVi": "Văn Cao là một nhạc sĩ vĩ đại của Việt Nam. Ông cũng là một họa sĩ và nhà thơ.",
        "trAnswer": "Van Cao was a great Vietnamese composer. He was also a painter and poet.",
        "trKey": "composer"
      },
      {
        "en": "Musician",
        "ipa": "/mjuˈzɪʃn/",
        "vi": "Nhạc công",
        "img": "https://img.invalid/musician.jpg",
        "ex": "It was a pleasure to listen to the musicians performing yesterday.",
        "trVi": "Thật là một niềm vui khi được nghe các nhạc công biểu diễn hôm qua.",
        "trAnswer": "It was a pleasure to listen to the musicians performing yesterday.",
        "trKey": "musician"
      },
      {
        "en": "Concert hall",
        "ipa": "/ˈkɒnsət hɔːl/",
        "vi": "Phòng hòa nhạc",
        "img": "https://img.invalid/concert-hall.jpg",
        "ex": "The orchestra will perform its final concert of the season at the concert hall tomorrow.",
        "trVi": "Dàn nhạc sẽ biểu diễn buổi hòa nhạc cuối cùng của mùa tại phòng hòa nhạc vào ngày mai.",
        "trAnswer": "The orchestra will perform its final concert of the season at the concert hall tomorrow.",
        "trKey": "concert hall"
      },
      {
        "en": "Puppet theatre",
        "ipa": "/ˈpʌpɪt ˈθɪətər/",
        "vi": "Nhà hát múa rối",
        "img": "https://img.invalid/puppet-theatre.jpg",
        "ex": "Water puppetry is a special traditional art form.",
        "trVi": "Múa rối nước là một loại hình nghệ thuật truyền thống đặc biệt.",
        "trAnswer": "Water puppetry is a special traditional art form.",
        "trKey": "puppet theatre"
      },
      {
        "en": "Landscape",
        "ipa": "/ˈlændskeɪp/",
        "vi": "Tranh phong cảnh",
        "img": "https://img.invalid/landscape.jpg",
        "ex": "I like painting landscapes and animals, just for pleasure.",
        "trVi": "Tôi thích vẽ tranh phong cảnh và động vật, chỉ để giải trí thôi.",
        "trAnswer": "I like painting landscapes and animals, just for pleasure.",
        "trKey": "landscape"
      },
      {
        "en": "Portrait",
        "ipa": "/ˈpɔːtreɪt/",
        "vi": "Tranh chân dung",
        "img": "https://img.invalid/portrait.jpg",
        "ex": "Painting portraits is different from painting landscapes.",
        "trVi": "Vẽ tranh chân dung khác với vẽ tranh phong cảnh.",
        "trAnswer": "Painting portraits is different from painting landscapes.",
        "trKey": "portrait"
      },
      {
        "en": "Perform",
        "ipa": "/pəˈfɔːm/",
        "vi": "Biểu diễn",
        "img": "https://img.invalid/perform.jpg",
        "ex": "The artists performed the show in a pool.",
        "trVi": "Các nghệ sĩ đã biểu diễn buổi diễn trong một bể nước.",
        "trAnswer": "The artists performed the show in a pool.",
        "trKey": "perform"
      },
      {
        "en": "Exhibition",
        "ipa": "/ˌeksɪˈbɪʃn/",
        "vi": "Buổi triển lãm",
        "img": "https://img.invalid/exhibition.jpg",
        "ex": "The Louvre Museum opened with an exhibition of 537 paintings.",
        "trVi": "Bảo tàng Louvre khai trương với một buổi triển lãm gồm 537 bức tranh.",
        "trAnswer": "The Louvre Museum opened with an exhibition of 537 paintings.",
        "trKey": "exhibition"
      },
      {
        "en": "Compose",
        "ipa": "/kəmˈpəʊz/",
        "vi": "Sáng tác nhạc",
        "img": "https://img.invalid/compose.jpg",
        "ex": "Who composed Viet Nam's national anthem 'Tien Quan Ca'?",
        "trVi": "Ai đã sáng tác quốc ca Việt Nam 'Tiến Quân Ca'?",
        "trAnswer": "Who composed Viet Nam's national anthem 'Tien Quan Ca'?",
        "trKey": "compose"
      }
    ],
    "story": {
      "title": "A water puppet show",
      "titleVi": "Một buổi biểu diễn múa rối nước",
      "text": "How are things with you? I arrived in Viet Nam three days ago, and everything is perfect.<br><br>Yesterday I went to see a puppet show at a theatre in the centre of Ha Noi. The show was fascinating. The artists performed the show in a pool. They stood behind a screen. They used strings under the water to control the puppets and make them move on the water! The show was about rice farming and a festival in a village. People say that these shows are normally about everyday life in the countryside of Viet Nam. Water puppetry is a special traditional art form. People love it, and most tourists coming to Viet Nam love to see it.<br><br>I wish you were here with me. See you next week.",
      "textVi": "Mọi thứ với bạn thế nào rồi? Mình đã đến Việt Nam ba ngày trước, và mọi thứ thật hoàn hảo.<br><br>Hôm qua mình đã đi xem một buổi biểu diễn múa rối tại một nhà hát ở trung tâm Hà Nội. Buổi biểu diễn thật hấp dẫn. Các nghệ sĩ biểu diễn trong một bể nước. Họ đứng phía sau một tấm màn. Họ dùng dây dưới nước để điều khiển những con rối và làm chúng di chuyển trên mặt nước! Buổi diễn kể về việc trồng lúa và một lễ hội trong một ngôi làng. Người ta nói rằng những buổi diễn này thường kể về cuộc sống thường ngày ở vùng nông thôn Việt Nam. Múa rối nước là một loại hình nghệ thuật truyền thống đặc biệt. Mọi người đều yêu thích nó, và hầu hết khách du lịch đến Việt Nam đều muốn xem nó.<br><br>Mình ước gì bạn ở đây cùng mình. Hẹn gặp lại vào tuần sau.",
      "used": []
    }
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🍜",
    "title": "FOOD AND DRINK",
    "titleVi": "Đồ ăn và thức uống",
    "words": [
      {
        "en": "Spring rolls",
        "ipa": "/sprɪŋ rəʊlz/",
        "vi": "Nem cuốn",
        "img": "https://img.invalid/spring-rolls.jpg",
        "ex": "I'd like some fried tofu and spring rolls too.",
        "trVi": "Tôi cũng muốn ít đậu phụ chiên và nem cuốn nữa.",
        "trAnswer": "I'd like some fried tofu and spring rolls too.",
        "trKey": "spring rolls"
      },
      {
        "en": "Fish sauce",
        "ipa": "/fɪʃ sɔːs/",
        "vi": "Nước mắm",
        "img": "https://img.invalid/fish-sauce.jpg",
        "ex": "We'd like rice with some pork cooked in fish sauce.",
        "trVi": "Chúng tôi muốn cơm với thịt lợn nấu nước mắm.",
        "trAnswer": "We'd like rice with some pork cooked in fish sauce.",
        "trKey": "fish sauce"
      },
      {
        "en": "Ingredient",
        "ipa": "/ɪnˈɡriːdiənt/",
        "vi": "Nguyên liệu",
        "img": "https://img.invalid/ingredient.jpg",
        "ex": "What are the main ingredients of pho?",
        "trVi": "Nguyên liệu chính của phở là gì?",
        "trAnswer": "What are the main ingredients of pho?",
        "trKey": "ingredient"
      },
      {
        "en": "Broth",
        "ipa": "/brɒθ/",
        "vi": "Nước dùng",
        "img": "https://img.invalid/broth.jpg",
        "ex": "The broth for pho is made by stewing beef or chicken bones for a long time.",
        "trVi": "Nước dùng của phở được làm bằng cách hầm xương bò hoặc gà trong thời gian dài.",
        "trAnswer": "The broth for pho is made by stewing beef or chicken bones for a long time.",
        "trKey": "broth"
      },
      {
        "en": "Rice noodles",
        "ipa": "/raɪs ˈnuːdlz/",
        "vi": "Bánh phở",
        "img": "https://img.invalid/rice-noodles.jpg",
        "ex": "Pho's main ingredients are rice noodles and slices of beef or chicken.",
        "trVi": "Nguyên liệu chính của phở là bánh phở và thịt bò hoặc gà thái lát.",
        "trAnswer": "Pho's main ingredients are rice noodles and slices of beef or chicken.",
        "trKey": "rice noodles"
      },
      {
        "en": "Boneless",
        "ipa": "/ˈbəʊnləs/",
        "vi": "Lọc xương",
        "img": "https://img.invalid/boneless.jpg",
        "ex": "The meat served with pho is boneless and cut into thin slices.",
        "trVi": "Thịt ăn kèm với phở được lọc xương và thái thành từng lát mỏng.",
        "trAnswer": "The meat served with pho is boneless and cut into thin slices.",
        "trKey": "boneless"
      },
      {
        "en": "Snack",
        "ipa": "/snæk/",
        "vi": "Bữa ăn nhẹ",
        "img": "https://img.invalid/snack.jpg",
        "ex": "People enjoy pho at all times of the day, even for a late night snack.",
        "trVi": "Mọi người thưởng thức phở vào bất kỳ thời điểm nào trong ngày, thậm chí là bữa ăn nhẹ khuya.",
        "trAnswer": "People enjoy pho at all times of the day, even for a late night snack.",
        "trKey": "snack"
      },
      {
        "en": "Recipe",
        "ipa": "/ˈresəpi/",
        "vi": "Công thức nấu ăn",
        "img": "https://img.invalid/recipe.jpg",
        "ex": "Read the recipe and write sentences as in the example.",
        "trVi": "Hãy đọc công thức nấu ăn và viết câu như trong ví dụ.",
        "trAnswer": "Read the recipe and write sentences as in the example.",
        "trKey": "recipe"
      },
      {
        "en": "Mineral water",
        "ipa": "/ˈmɪnərəl ˈwɔːtər/",
        "vi": "Nước khoáng",
        "img": "https://img.invalid/mineral-water.jpg",
        "ex": "How much is a bottle of mineral water?",
        "trVi": "Một chai nước khoáng giá bao nhiêu?",
        "trAnswer": "How much is a bottle of mineral water?",
        "trKey": "mineral water"
      },
      {
        "en": "Traditional dish",
        "ipa": "/trəˈdɪʃənl dɪʃ/",
        "vi": "Món ăn truyền thống",
        "img": "https://img.invalid/traditional-dish.jpg",
        "ex": "Pho is a special kind of traditional Vietnamese dish.",
        "trVi": "Phở là một loại món ăn truyền thống đặc biệt của Việt Nam.",
        "trAnswer": "Pho is a special kind of traditional Vietnamese dish.",
        "trKey": "traditional dish"
      }
    ],
    "story": {
      "title": "Pho - a traditional Vietnamese dish",
      "titleVi": "Phở - món ăn truyền thống của Việt Nam",
      "text": "Pho is a special kind of traditional Vietnamese dish. Its main ingredients are rice noodles and slices of beef or chicken. It is one of the most common dishes you will find in Viet Nam. People enjoy pho at all times of the day, even for a late night snack. Pho has a very special taste. The rice noodles are made from the best kind of rice. There are two main kinds of pho: pho bo (beef noodle soup) and pho ga (chicken noodle soup). The broth for pho is made by stewing beef or chicken bones for a long time in a big pot. The meat (beef and chicken) served with pho is boneless and cut into thin slices ... It's really delicious!<br><br>Tell me about a popular dish in your area!",
      "textVi": "Phở là một loại món ăn truyền thống đặc biệt của Việt Nam. Nguyên liệu chính của phở là bánh phở và thịt bò hoặc gà thái lát. Đây là một trong những món ăn phổ biến nhất mà bạn có thể tìm thấy ở Việt Nam. Mọi người thưởng thức phở vào bất kỳ thời điểm nào trong ngày, thậm chí là ăn nhẹ vào đêm khuya. Phở có một hương vị rất đặc biệt. Bánh phở được làm từ loại gạo ngon nhất. Có hai loại phở chính: phở bò và phở gà. Nước dùng của phở được làm bằng cách hầm xương bò hoặc xương gà trong một thời gian dài trong một nồi lớn. Thịt (bò và gà) ăn kèm với phở được lọc xương và thái thành từng lát mỏng... Thật sự rất ngon!<br><br>Hãy kể cho mình nghe về một món ăn phổ biến ở khu vực của bạn nhé!",
      "used": [
        "Broth",
        "Rice noodles",
        "Boneless"
      ]
    }
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🏫",
    "title": "A VISIT TO A SCHOOL",
    "titleVi": "Một chuyến thăm trường học",
    "words": [
      {
        "en": "Computer room",
        "ipa": "/kəmˈpjuːtər ruːm/",
        "vi": "Phòng máy tính",
        "img": "https://img.invalid/computer-room.jpg",
        "ex": "We think we'll visit the school library, the computer room, and the gym.",
        "trVi": "Chúng tôi nghĩ sẽ ghé thăm thư viện trường, phòng máy tính và phòng tập thể dục.",
        "trAnswer": "We think we'll visit the school library, the computer room, and the gym.",
        "trKey": "computer room"
      },
      {
        "en": "Gym",
        "ipa": "/dʒɪm/",
        "vi": "Phòng tập thể dục",
        "img": "https://img.invalid/gym.jpg",
        "ex": "We'll visit the school library, the computer room, and the gym.",
        "trVi": "Chúng tôi sẽ ghé thăm thư viện trường, phòng máy tính và phòng tập thể dục.",
        "trAnswer": "We'll visit the school library, the computer room, and the gym.",
        "trKey": "gym"
      },
      {
        "en": "School garden",
        "ipa": "/skuːl ˈɡɑːdn/",
        "vi": "Vườn trường",
        "img": "https://img.invalid/school-garden.jpg",
        "ex": "Our class usually waters the vegetables in the school garden on Friday afternoons.",
        "trVi": "Lớp chúng tôi thường tưới rau trong vườn trường vào chiều thứ Sáu.",
        "trAnswer": "Our class usually waters the vegetables in the school garden on Friday afternoons.",
        "trKey": "school garden"
      },
      {
        "en": "Entrance exam",
        "ipa": "/ˈentrəns ɪɡˈzæm/",
        "vi": "Kỳ thi tuyển sinh",
        "img": "https://img.invalid/entrance-exam.jpg",
        "ex": "In order to study at Quoc Hoc - Hue, you have to pass an entrance exam.",
        "trVi": "Để học tại trường Quốc Học - Huế, bạn phải vượt qua kỳ thi tuyển sinh.",
        "trAnswer": "In order to study at Quoc Hoc - Hue, you have to pass an entrance exam.",
        "trKey": "entrance exam"
      },
      {
        "en": "Gifted student",
        "ipa": "/ˈɡɪftɪd ˈstjuːdnt/",
        "vi": "Học sinh năng khiếu",
        "img": "https://img.invalid/gifted-student.jpg",
        "ex": "Nowadays, the school is for gifted students.",
        "trVi": "Ngày nay, ngôi trường này dành cho học sinh năng khiếu.",
        "trAnswer": "Nowadays, the school is for gifted students.",
        "trKey": "gifted student"
      },
      {
        "en": "Facilities",
        "ipa": "/fəˈsɪlətiz/",
        "vi": "Cơ sở vật chất",
        "img": "https://img.invalid/facilities.jpg",
        "ex": "What kind of facilities does your school have?",
        "trVi": "Trường của bạn có những loại cơ sở vật chất nào?",
        "trAnswer": "What kind of facilities does your school have?",
        "trKey": "facilities"
      },
      {
        "en": "Outdoor activity",
        "ipa": "/aʊtˈdɔːr ækˈtɪvəti/",
        "vi": "Hoạt động ngoài trời",
        "img": "https://img.invalid/outdoor-activity.jpg",
        "ex": "What types of outdoor activities do you like to take part in?",
        "trVi": "Bạn thích tham gia những loại hoạt động ngoài trời nào?",
        "trAnswer": "What types of outdoor activities do you like to take part in?",
        "trKey": "outdoor activity"
      },
      {
        "en": "Timetable",
        "ipa": "/ˈtaɪmteɪbl/",
        "vi": "Thời khóa biểu",
        "img": "https://img.invalid/timetable.jpg",
        "ex": "When does Nick have maths, according to his timetable?",
        "trVi": "Theo thời khóa biểu, khi nào Nick có tiết toán?",
        "trAnswer": "When does Nick have maths, according to his timetable?",
        "trKey": "timetable"
      },
      {
        "en": "Library",
        "ipa": "/ˈlaɪbrəri/",
        "vi": "Thư viện",
        "img": "https://img.invalid/library.jpg",
        "ex": "There are a lot of books, magazines, and newspapers in the library.",
        "trVi": "Có rất nhiều sách, tạp chí và báo trong thư viện.",
        "trAnswer": "There are a lot of books, magazines, and newspapers in the library.",
        "trKey": "library"
      },
      {
        "en": "Swimming pool",
        "ipa": "/ˈswɪmɪŋ puːl/",
        "vi": "Hồ bơi",
        "img": "https://img.invalid/swimming-pool.jpg",
        "ex": "The school has over 50 classrooms, a swimming pool, and a library.",
        "trVi": "Trường có hơn 50 phòng học, một hồ bơi và một thư viện.",
        "trAnswer": "The school has over 50 classrooms, a swimming pool, and a library.",
        "trKey": "swimming pool"
      }
    ],
    "story": {
      "title": "Quoc Hoc - Hue",
      "titleVi": "Trường Quốc Học - Huế",
      "text": "Quoc Hoc - Hue is one of the oldest schools in Viet Nam. It's on the bank of the Huong River, in Hue. It was founded in 1896. It used to be a school for children from rich and royal families. Well-known people such as Ho Chi Minh, Vo Nguyen Giap, Xuan Dieu studied there.<br><br>Nowadays, the school is for gifted students. They are intelligent and study hard. They have to pass an entrance exam to enter the school. The school has over 50 classrooms with TVs, projectors, and computers. It also has a swimming pool, a library, two English labs, four computer rooms, and many other modern facilities. The school is one of the largest and most beautiful schools in Viet Nam.",
      "textVi": "Quốc Học - Huế là một trong những ngôi trường lâu đời nhất ở Việt Nam. Trường nằm bên bờ sông Hương, ở Huế. Trường được thành lập vào năm 1896. Trước đây trường dành cho con em các gia đình giàu có và hoàng tộc. Những nhân vật nổi tiếng như Hồ Chí Minh, Võ Nguyên Giáp, Xuân Diệu đã từng học tại đây.<br><br>Ngày nay, trường dành cho học sinh năng khiếu. Các em thông minh và học tập chăm chỉ. Các em phải vượt qua kỳ thi tuyển sinh để được nhận vào trường. Trường có hơn 50 phòng học với ti vi, máy chiếu và máy tính. Trường cũng có một hồ bơi, một thư viện, hai phòng thực hành tiếng Anh, bốn phòng máy tính và nhiều cơ sở vật chất hiện đại khác. Đây là một trong những ngôi trường lớn nhất và đẹp nhất Việt Nam.",
      "used": [
        "Entrance exam",
        "Gifted student",
        "Swimming pool",
        "Library"
      ]
    }
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🚦",
    "title": "TRAFFIC",
    "titleVi": "Giao thông",
    "words": [
      {
        "en": "Traffic jam",
        "ipa": "/ˈtræfɪk dʒæm/",
        "vi": "Tắc đường",
        "img": "https://img.invalid/traffic-jam.jpg",
        "ex": "Sometimes, when there are traffic jams, it takes longer to cycle to school.",
        "trVi": "Đôi khi, khi có tắc đường, việc đạp xe đến trường sẽ mất nhiều thời gian hơn.",
        "trAnswer": "Sometimes, when there are traffic jams, it takes longer to cycle to school.",
        "trKey": "traffic jam"
      },
      {
        "en": "Pedestrian",
        "ipa": "/pəˈdestriən/",
        "vi": "Người đi bộ",
        "img": "https://img.invalid/pedestrian.jpg",
        "ex": "Pedestrians should walk on the pavement.",
        "trVi": "Người đi bộ nên đi trên vỉa hè.",
        "trAnswer": "Pedestrians should walk on the pavement.",
        "trKey": "pedestrian"
      },
      {
        "en": "Cyclist",
        "ipa": "/ˈsaɪklɪst/",
        "vi": "Người đi xe đạp",
        "img": "https://img.invalid/cyclist.jpg",
        "ex": "Cyclists should always keep both hands on the handlebars.",
        "trVi": "Người đi xe đạp nên luôn giữ cả hai tay trên tay lái.",
        "trAnswer": "Cyclists should always keep both hands on the handlebars.",
        "trKey": "cyclist"
      },
      {
        "en": "Traffic rules",
        "ipa": "/ˈtræfɪk ruːlz/",
        "vi": "Luật giao thông",
        "img": "https://img.invalid/traffic-rules.jpg",
        "ex": "It is important to obey traffic rules when you are a road user.",
        "trVi": "Việc tuân thủ luật giao thông rất quan trọng khi bạn tham gia giao thông.",
        "trAnswer": "It is important to obey traffic rules when you are a road user.",
        "trKey": "traffic rules"
      },
      {
        "en": "Helmet",
        "ipa": "/ˈhelmɪt/",
        "vi": "Mũ bảo hiểm",
        "img": "https://img.invalid/helmet.jpg",
        "ex": "Cyclists should wear helmets, and always use the cycle lane.",
        "trVi": "Người đi xe đạp nên đội mũ bảo hiểm và luôn đi trong làn đường dành cho xe đạp.",
        "trAnswer": "Cyclists should wear helmets, and always use the cycle lane.",
        "trKey": "helmet"
      },
      {
        "en": "Pavement",
        "ipa": "/ˈpeɪvmənt/",
        "vi": "Vỉa hè",
        "img": "https://img.invalid/pavement.jpg",
        "ex": "You mustn't ride your bike dangerously on the pavement.",
        "trVi": "Bạn không được đi xe đạp nguy hiểm trên vỉa hè.",
        "trAnswer": "You mustn't ride your bike dangerously on the pavement.",
        "trKey": "pavement"
      },
      {
        "en": "Zebra crossing",
        "ipa": "/ˈzebrə ˈkrɒsɪŋ/",
        "vi": "Vạch qua đường",
        "img": "https://img.invalid/zebra-crossing.jpg",
        "ex": "Pedestrians should walk across the street at the zebra crossing.",
        "trVi": "Người đi bộ nên đi qua đường tại vạch qua đường dành cho người đi bộ.",
        "trAnswer": "Pedestrians should walk across the street at the zebra crossing.",
        "trKey": "zebra crossing"
      },
      {
        "en": "Road sign",
        "ipa": "/rəʊd saɪn/",
        "vi": "Biển báo giao thông",
        "img": "https://img.invalid/road-sign.jpg",
        "ex": "A 'red light' sign means you have to stop.",
        "trVi": "Biển báo 'đèn đỏ' có nghĩa là bạn phải dừng lại.",
        "trAnswer": "A 'red light' sign means you have to stop.",
        "trKey": "road sign"
      },
      {
        "en": "Passenger",
        "ipa": "/ˈpæsɪndʒər/",
        "vi": "Hành khách",
        "img": "https://img.invalid/passenger.jpg",
        "ex": "A passenger is a person travelling in a car, bus, or train, but not driving.",
        "trVi": "Hành khách là người đi trên ô tô, xe buýt, hoặc tàu hỏa, nhưng không lái xe.",
        "trAnswer": "A passenger is a person travelling in a car, bus, or train, but not driving.",
        "trKey": "passenger"
      },
      {
        "en": "Seatbelt",
        "ipa": "/ˈsiːtbelt/",
        "vi": "Dây an toàn",
        "img": "https://img.invalid/seatbelt.jpg",
        "ex": "Fasten your seatbelt when you are in a car.",
        "trVi": "Hãy thắt dây an toàn khi bạn ở trong ô tô.",
        "trAnswer": "Fasten your seatbelt when you are in a car.",
        "trKey": "seatbelt"
      }
    ],
    "story": {
      "title": "Rules about road safety",
      "titleVi": "Các quy tắc về an toàn giao thông",
      "text": "These are some rules about road safety. It is important to obey these rules when you are a road user.<br><br>Pedestrians: Look both ways before crossing the street. Walk on the pavement, if there is one. Walk across the street at the zebra crossing. Don't cross the road on a red light.<br><br>Cyclists: Always keep both hands on the handlebars. Wear helmets, and always use the cycle lane. Give a signal before you turn. Don't carry more than one passenger.<br><br>Passengers: Fasten your seatbelt when you are in a car. Get on and off a bus carefully. Don't talk to the driver when he or she is driving. Don't stick any body parts out of the window of a moving vehicle.",
      "textVi": "Đây là một số quy tắc về an toàn giao thông. Việc tuân thủ những quy tắc này rất quan trọng khi bạn tham gia giao thông.<br><br>Người đi bộ: Nhìn cả hai hướng trước khi qua đường. Đi trên vỉa hè, nếu có. Qua đường tại vạch dành cho người đi bộ. Không qua đường khi đèn đỏ.<br><br>Người đi xe đạp: Luôn giữ cả hai tay trên tay lái. Đội mũ bảo hiểm và luôn đi trong làn đường dành cho xe đạp. Ra tín hiệu trước khi rẽ. Không chở quá một người.<br><br>Hành khách: Thắt dây an toàn khi ở trong ô tô. Lên và xuống xe buýt cẩn thận. Không nói chuyện với người lái xe khi họ đang lái. Không thò bất kỳ bộ phận cơ thể nào ra ngoài cửa sổ của phương tiện đang di chuyển.",
      "used": [
        "Pedestrian",
        "Cyclist",
        "Passenger",
        "Seatbelt"
      ]
    }
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "🎬",
    "title": "FILMS",
    "titleVi": "Phim ảnh",
    "words": [
      {
        "en": "Comedy",
        "ipa": "/ˈkɒmədi/",
        "vi": "Phim hài",
        "img": "https://img.invalid/comedy.jpg",
        "ex": "A film that tries to make the audience laugh is a comedy.",
        "trVi": "Một bộ phim cố gắng làm khán giả cười là phim hài.",
        "trAnswer": "A film that tries to make the audience laugh is a comedy.",
        "trKey": "comedy"
      },
      {
        "en": "Documentary",
        "ipa": "/ˌdɒkjuˈmentri/",
        "vi": "Phim tài liệu",
        "img": "https://img.invalid/documentary.jpg",
        "ex": "A film that shows real life events or stories is a documentary.",
        "trVi": "Một bộ phim ghi lại các sự kiện hoặc câu chuyện có thật là phim tài liệu.",
        "trAnswer": "A film that shows real life events or stories is a documentary.",
        "trKey": "documentary"
      },
      {
        "en": "Fantasy",
        "ipa": "/ˈfæntəsi/",
        "vi": "Phim giả tưởng",
        "img": "https://img.invalid/fantasy.jpg",
        "ex": "A film that is based only on imagination, not on real facts, is a fantasy.",
        "trVi": "Một bộ phim chỉ dựa trên trí tưởng tượng, không dựa trên sự thật, là phim giả tưởng.",
        "trAnswer": "A film that is based only on imagination, not on real facts, is a fantasy.",
        "trKey": "fantasy"
      },
      {
        "en": "Horror film",
        "ipa": "/ˈhɒrər fɪlm/",
        "vi": "Phim kinh dị",
        "img": "https://img.invalid/horror-film.jpg",
        "ex": "A film in which strange and frightening things happen is a horror film.",
        "trVi": "Một bộ phim mà những điều kỳ lạ và đáng sợ xảy ra là phim kinh dị.",
        "trAnswer": "A film in which strange and frightening things happen is a horror film.",
        "trKey": "horror film"
      },
      {
        "en": "Science fiction film",
        "ipa": "/ˈsaɪəns ˈfɪkʃn fɪlm/",
        "vi": "Phim khoa học viễn tưởng",
        "img": "https://img.invalid/science-fiction-film.jpg",
        "ex": "A film that is set in the future, often about science, is a science fiction film.",
        "trVi": "Một bộ phim lấy bối cảnh tương lai, thường về khoa học, là phim khoa học viễn tưởng.",
        "trAnswer": "A film that is set in the future, often about science, is a science fiction film.",
        "trKey": "science fiction film"
      },
      {
        "en": "Boring",
        "ipa": "/ˈbɔːrɪŋ/",
        "vi": "Nhàm chán",
        "img": "https://img.invalid/boring.jpg",
        "ex": "The film last night was so boring that we fell asleep.",
        "trVi": "Bộ phim tối qua nhàm chán đến mức chúng tôi đã ngủ quên.",
        "trAnswer": "The film last night was so boring that we fell asleep.",
        "trKey": "boring"
      },
      {
        "en": "Frightening",
        "ipa": "/ˈfraɪtnɪŋ/",
        "vi": "Đáng sợ",
        "img": "https://img.invalid/frightening.jpg",
        "ex": "Going to the hospital can be frightening for a child.",
        "trVi": "Việc đến bệnh viện có thể đáng sợ đối với một đứa trẻ.",
        "trAnswer": "Going to the hospital can be frightening for a child.",
        "trKey": "frightening"
      },
      {
        "en": "Moving",
        "ipa": "/ˈmuːvɪŋ/",
        "vi": "Cảm động",
        "img": "https://img.invalid/moving.jpg",
        "ex": "Many people cried when they saw the moving scenes of the film.",
        "trVi": "Nhiều người đã khóc khi xem những cảnh phim cảm động.",
        "trAnswer": "Many people cried when they saw the moving scenes of the film.",
        "trKey": "moving"
      },
      {
        "en": "Star",
        "ipa": "/stɑːr/",
        "vi": "Đóng vai chính",
        "img": "https://img.invalid/star.jpg",
        "ex": "Who stars in the film Naughty Twins?",
        "trVi": "Ai đóng vai chính trong bộ phim Naughty Twins?",
        "trAnswer": "Who stars in the film Naughty Twins?",
        "trKey": "star"
      },
      {
        "en": "Director",
        "ipa": "/dəˈrektər/",
        "vi": "Đạo diễn",
        "img": "https://img.invalid/director.jpg",
        "ex": "John Stevenson is the director of the film Kungfu Boy.",
        "trVi": "John Stevenson là đạo diễn của bộ phim Kungfu Boy.",
        "trAnswer": "John Stevenson is the director of the film Kungfu Boy.",
        "trKey": "director"
      }
    ],
    "story": {
      "title": "Kungfu Boy",
      "titleVi": "Kungfu Boy",
      "text": "Kungfu Boy is on now at Ngoc Khanh Cinema, showing daily at 4.30 p.m. and 8.30 p.m. The director is John Stevenson.<br><br>The film tells the story of a very big boy who saves his town and becomes a hero. Although the boy looks a little clumsy at first, he learns kung fu and uses it to protect his neighbours.<br><br>People say the film is funny and interesting. It's a great choice for a family trip to the cinema this weekend.",
      "textVi": "Kungfu Boy hiện đang chiếu tại rạp Ngọc Khánh, chiếu hàng ngày lúc 4:30 chiều và 8:30 tối. Đạo diễn của phim là John Stevenson.<br><br>Bộ phim kể về một cậu bé to lớn đã cứu thị trấn của mình và trở thành người hùng. Dù lúc đầu cậu bé trông có vẻ hơi vụng về, cậu đã học võ kungfu và dùng nó để bảo vệ hàng xóm của mình.<br><br>Mọi người nói rằng bộ phim này vừa vui nhộn vừa thú vị. Đây là một lựa chọn tuyệt vời cho một buổi đi xem phim cùng gia đình vào cuối tuần này.",
      "used": [
        "Director"
      ]
    }
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🎉",
    "title": "FESTIVALS AROUND THE WORLD",
    "titleVi": "Lễ hội trên thế giới",
    "words": [
      {
        "en": "Costume",
        "ipa": "/ˈkɒstjuːm/",
        "vi": "Trang phục",
        "img": "https://img.invalid/costume.jpg",
        "ex": "The dancers wore traditional costumes at the Tulip Festival.",
        "trVi": "Các vũ công mặc trang phục truyền thống tại Lễ hội Hoa Tulip.",
        "trAnswer": "The dancers wore traditional costumes at the Tulip Festival.",
        "trKey": "costume"
      },
      {
        "en": "Fireworks display",
        "ipa": "/ˈfaɪəwɜːks dɪˈspleɪ/",
        "vi": "Màn trình diễn pháo hoa",
        "img": "https://img.invalid/fireworks-display.jpg",
        "ex": "On New Year's Eve, we went to Hoan Kiem Lake to watch the fireworks display.",
        "trVi": "Vào đêm giao thừa, chúng tôi đến Hồ Hoàn Kiếm để xem màn trình diễn pháo hoa.",
        "trAnswer": "On New Year's Eve, we went to Hoan Kiem Lake to watch the fireworks display.",
        "trKey": "fireworks display"
      },
      {
        "en": "Float",
        "ipa": "/fləʊt/",
        "vi": "Xe hoa diễu hành",
        "img": "https://img.invalid/float.jpg",
        "ex": "I saw beautiful tulip floats at a parade.",
        "trVi": "Tôi đã thấy những chiếc xe hoa tulip xinh đẹp trong một cuộc diễu hành.",
        "trAnswer": "I saw beautiful tulip floats at a parade.",
        "trKey": "float"
      },
      {
        "en": "Lion dance",
        "ipa": "/ˈlaɪən dɑːns/",
        "vi": "Múa lân",
        "img": "https://img.invalid/lion-dance.jpg",
        "ex": "Performing lion dances is one of the activities at the Mid-Autumn Festival.",
        "trVi": "Múa lân là một trong những hoạt động của Tết Trung Thu.",
        "trAnswer": "Performing lion dances is one of the activities at the Mid-Autumn Festival.",
        "trKey": "lion dance"
      },
      {
        "en": "Moon cakes",
        "ipa": "/muːn keɪks/",
        "vi": "Bánh trung thu",
        "img": "https://img.invalid/moon-cakes.jpg",
        "ex": "At this festival, people eat moon cakes.",
        "trVi": "Vào lễ hội này, mọi người ăn bánh trung thu.",
        "trAnswer": "At this festival, people eat moon cakes.",
        "trKey": "moon cakes"
      },
      {
        "en": "Gathering",
        "ipa": "/ˈɡæðərɪŋ/",
        "vi": "Buổi tụ họp",
        "img": "https://img.invalid/gathering.jpg",
        "ex": "The Twins Day Festival is the largest gathering for twins in the world.",
        "trVi": "Lễ hội Ngày Song Sinh là buổi tụ họp lớn nhất thế giới dành cho các cặp song sinh.",
        "trAnswer": "The Twins Day Festival is the largest gathering for twins in the world.",
        "trKey": "gathering"
      },
      {
        "en": "Parade",
        "ipa": "/pəˈreɪd/",
        "vi": "Cuộc diễu hành",
        "img": "https://img.invalid/parade.jpg",
        "ex": "My twin sister and I joined the Double Take Parade, a parade of twins.",
        "trVi": "Chị em sinh đôi của tôi và tôi đã tham gia cuộc diễu hành Double Take, một cuộc diễu hành của các cặp song sinh.",
        "trAnswer": "My twin sister and I joined the Double Take Parade, a parade of twins.",
        "trKey": "parade"
      },
      {
        "en": "Symbol",
        "ipa": "/ˈsɪmbl/",
        "vi": "Biểu tượng",
        "img": "https://img.invalid/symbol.jpg",
        "ex": "The Christmas tree is the symbol of a long life.",
        "trVi": "Cây thông Noel là biểu tượng của sự trường thọ.",
        "trAnswer": "The Christmas tree is the symbol of a long life.",
        "trKey": "symbol"
      },
      {
        "en": "Talent show",
        "ipa": "/ˈtælənt ʃəʊ/",
        "vi": "Buổi biểu diễn tài năng",
        "img": "https://img.invalid/talent-show.jpg",
        "ex": "We saw a Talent Show. It featured singing, dancing, comedy, and other things.",
        "trVi": "Chúng tôi đã xem một buổi biểu diễn tài năng. Nó có tiết mục hát, nhảy, hài kịch và nhiều tiết mục khác.",
        "trAnswer": "We saw a Talent Show. It featured singing, dancing, comedy, and other things.",
        "trKey": "talent show"
      },
      {
        "en": "Disappointing",
        "ipa": "/ˌdɪsəˈpɔɪntɪŋ/",
        "vi": "Đáng thất vọng",
        "img": "https://img.invalid/disappointing.jpg",
        "ex": "The music festival was disappointing! The band was late.",
        "trVi": "Lễ hội âm nhạc thật đáng thất vọng! Ban nhạc đã đến trễ.",
        "trAnswer": "The music festival was disappointing! The band was late.",
        "trKey": "disappointing"
      }
    ],
    "story": {
      "title": "The Twins Day Festival",
      "titleVi": "Lễ hội Ngày Song Sinh",
      "text": "How are you? My family and I arrived in Twinsburg, Ohio two days ago. People here hold the Twins Day Festival every year. It happens on the first weekend in August. It's the largest gathering for twins in the world. Thousands of twins come from different countries.<br><br>Yesterday morning my twin sister and I joined the Double Take Parade, a parade of twins. We wore uniforms and walked together. Then we saw a Talent Show. It featured singing, dancing, comedy, and other things. I loved the performance by the twins from Korea the most.<br><br>This morning we ran in the Fun Run. We didn't win but had a lot of fun. This afternoon we took photos with twins from other countries.<br><br>This is one of the most exciting festivals I've been to.",
      "textVi": "Cậu khỏe không? Gia đình mình đã đến Twinsburg, bang Ohio hai ngày trước. Người dân ở đây tổ chức Lễ hội Ngày Song Sinh hằng năm. Lễ hội diễn ra vào cuối tuần đầu tiên của tháng Tám. Đây là buổi tụ họp lớn nhất thế giới dành cho các cặp song sinh. Hàng nghìn cặp song sinh đến từ nhiều quốc gia khác nhau.<br><br>Sáng hôm qua, chị em sinh đôi của mình và mình đã tham gia cuộc diễu hành Double Take, một cuộc diễu hành của các cặp song sinh. Bọn mình mặc đồng phục và đi cùng nhau. Sau đó bọn mình xem một buổi biểu diễn tài năng. Buổi diễn có các tiết mục hát, nhảy, hài kịch và nhiều tiết mục khác. Mình thích nhất là phần biểu diễn của cặp song sinh đến từ Hàn Quốc.<br><br>Sáng nay bọn mình đã tham gia cuộc thi chạy vui. Bọn mình không thắng nhưng rất vui. Chiều nay bọn mình đã chụp ảnh cùng các cặp song sinh đến từ những quốc gia khác.<br><br>Đây là một trong những lễ hội thú vị nhất mà mình từng tham gia.",
      "used": [
        "Gathering",
        "Parade",
        "Talent show"
      ]
    }
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "⚡",
    "title": "ENERGY SOURCES",
    "titleVi": "Nguồn năng lượng",
    "words": [
      {
        "en": "Non-renewable source",
        "ipa": "/nɒn rɪˈnjuːəbl sɔːs/",
        "vi": "Nguồn năng lượng không tái tạo",
        "img": "https://img.invalid/non-renewable-source.jpg",
        "ex": "Non-renewable sources are coal, oil and natural gas.",
        "trVi": "Nguồn năng lượng không tái tạo là than đá, dầu mỏ và khí tự nhiên.",
        "trAnswer": "Non-renewable sources are coal, oil and natural gas.",
        "trKey": "non-renewable source"
      },
      {
        "en": "Renewable source",
        "ipa": "/rɪˈnjuːəbl sɔːs/",
        "vi": "Nguồn năng lượng tái tạo",
        "img": "https://img.invalid/renewable-source.jpg",
        "ex": "Renewable sources come from the sun, wind or water.",
        "trVi": "Nguồn năng lượng tái tạo đến từ mặt trời, gió hoặc nước.",
        "trAnswer": "Renewable sources come from the sun, wind or water.",
        "trKey": "renewable source"
      },
      {
        "en": "Solar energy",
        "ipa": "/ˈsəʊlər ˈenədʒi/",
        "vi": "Năng lượng mặt trời",
        "img": "https://img.invalid/solar-energy.jpg",
        "ex": "When energy comes from the sun, we call it solar energy.",
        "trVi": "Khi năng lượng đến từ mặt trời, chúng ta gọi đó là năng lượng mặt trời.",
        "trAnswer": "When energy comes from the sun, we call it solar energy.",
        "trKey": "solar energy"
      },
      {
        "en": "Wind energy",
        "ipa": "/wɪnd ˈenədʒi/",
        "vi": "Năng lượng gió",
        "img": "https://img.invalid/wind-energy.jpg",
        "ex": "Wind energy comes from the wind.",
        "trVi": "Năng lượng gió đến từ gió.",
        "trAnswer": "Wind energy comes from the wind.",
        "trKey": "wind energy"
      },
      {
        "en": "Hydro energy",
        "ipa": "/ˈhaɪdrəʊ ˈenədʒi/",
        "vi": "Năng lượng thủy điện",
        "img": "https://img.invalid/hydro-energy.jpg",
        "ex": "Hydro energy comes from water.",
        "trVi": "Năng lượng thủy điện đến từ nước.",
        "trAnswer": "Hydro energy comes from water.",
        "trKey": "hydro energy"
      },
      {
        "en": "Natural gas",
        "ipa": "/ˈnætʃrəl ɡæs/",
        "vi": "Khí tự nhiên",
        "img": "https://img.invalid/natural-gas.jpg",
        "ex": "It comes from many different sources like coal, oil, and natural gas.",
        "trVi": "Nó đến từ nhiều nguồn khác nhau như than đá, dầu mỏ và khí tự nhiên.",
        "trAnswer": "It comes from many different sources like coal, oil, and natural gas.",
        "trKey": "natural gas"
      },
      {
        "en": "Nuclear energy",
        "ipa": "/ˈnjuːkliər ˈenədʒi/",
        "vi": "Năng lượng hạt nhân",
        "img": "https://img.invalid/nuclear-energy.jpg",
        "ex": "Nuclear energy is dangerous and expensive.",
        "trVi": "Năng lượng hạt nhân rất nguy hiểm và đắt đỏ.",
        "trAnswer": "Nuclear energy is dangerous and expensive.",
        "trKey": "nuclear energy"
      },
      {
        "en": "Low energy light bulb",
        "ipa": "/ləʊ ˈenədʒi laɪt bʌlb/",
        "vi": "Bóng đèn tiết kiệm năng lượng",
        "img": "https://img.invalid/low-energy-light-bulb.jpg",
        "ex": "We should use low energy light bulbs in our homes to save energy.",
        "trVi": "Chúng ta nên dùng bóng đèn tiết kiệm năng lượng trong nhà để tiết kiệm điện.",
        "trAnswer": "We should use low energy light bulbs in our homes to save energy.",
        "trKey": "low energy light bulb"
      },
      {
        "en": "Solar panel",
        "ipa": "/ˈsəʊlər ˈpænl/",
        "vi": "Tấm pin năng lượng mặt trời",
        "img": "https://img.invalid/solar-panel.jpg",
        "ex": "They are putting solar panels on the roof of our building to produce electricity.",
        "trVi": "Họ đang lắp đặt các tấm pin năng lượng mặt trời trên mái tòa nhà để tạo ra điện.",
        "trAnswer": "They are putting solar panels on the roof of our building to produce electricity.",
        "trKey": "solar panel"
      },
      {
        "en": "Save energy",
        "ipa": "/seɪv ˈenədʒi/",
        "vi": "Tiết kiệm năng lượng",
        "img": "https://img.invalid/save-energy.jpg",
        "ex": "What do you usually do to save energy?",
        "trVi": "Bạn thường làm gì để tiết kiệm năng lượng?",
        "trAnswer": "What do you usually do to save energy?",
        "trKey": "save energy"
      }
    ],
    "story": {
      "title": "Two types of energy sources",
      "titleVi": "Hai loại nguồn năng lượng",
      "text": "Hello, class. Today I'd like to tell you about two energy sources. They are non-renewable sources and renewable sources.<br><br>Non-renewable sources are coal, oil and natural gas. We can use these sources to produce energy. They are cheap and easy to use. People use them a lot. But they are very limited and will run out soon.<br><br>Renewable sources come from the sun, wind or water. When energy comes from the sun, we call it solar energy. Wind energy comes from the wind, and hydro energy comes from water. Renewable sources are clean and safe to use. But they are expensive to produce.<br><br>In the future we will rely more on renewable energy sources. They are better for the environment and they will not run out.",
      "textVi": "Chào cả lớp. Hôm nay thầy muốn nói với các em về hai nguồn năng lượng. Đó là nguồn năng lượng không tái tạo và nguồn năng lượng tái tạo.<br><br>Nguồn năng lượng không tái tạo là than đá, dầu mỏ và khí tự nhiên. Chúng ta có thể dùng những nguồn này để tạo ra năng lượng. Chúng rẻ và dễ sử dụng. Mọi người dùng chúng rất nhiều. Nhưng chúng có hạn và sẽ sớm cạn kiệt.<br><br>Nguồn năng lượng tái tạo đến từ mặt trời, gió hoặc nước. Khi năng lượng đến từ mặt trời, chúng ta gọi đó là năng lượng mặt trời. Năng lượng gió đến từ gió, và năng lượng thủy điện đến từ nước. Nguồn năng lượng tái tạo sạch và an toàn khi sử dụng. Nhưng chúng lại đắt đỏ để sản xuất.<br><br>Trong tương lai chúng ta sẽ phụ thuộc nhiều hơn vào các nguồn năng lượng tái tạo. Chúng tốt hơn cho môi trường và sẽ không bao giờ cạn kiệt.",
      "used": [
        "Non-renewable source",
        "Renewable source",
        "Solar energy",
        "Wind energy",
        "Hydro energy"
      ]
    }
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "🚗",
    "title": "TRAVELLING IN THE FUTURE",
    "titleVi": "Du hành trong tương lai",
    "words": [
      {
        "en": "Hyperloop",
        "ipa": "/ˈhaɪpəluːp/",
        "vi": "Hệ thống tàu siêu tốc",
        "img": "https://img.invalid/hyperloop.jpg",
        "ex": "It's a pity that we don't have a hyperloop now!",
        "trVi": "Thật tiếc là bây giờ chúng ta chưa có hyperloop!",
        "trAnswer": "It's a pity that we don't have a hyperloop now!",
        "trKey": "hyperloop"
      },
      {
        "en": "Teleporter",
        "ipa": "/ˈtelɪpɔːtər/",
        "vi": "Máy dịch chuyển tức thời",
        "img": "https://img.invalid/teleporter.jpg",
        "ex": "A teleporter is also fast, safe and eco-friendly.",
        "trVi": "Máy dịch chuyển tức thời cũng nhanh, an toàn và thân thiện với môi trường.",
        "trAnswer": "A teleporter is also fast, safe and eco-friendly.",
        "trKey": "teleporter"
      },
      {
        "en": "Driverless car",
        "ipa": "/ˈdraɪvələs kɑːr/",
        "vi": "Xe tự lái",
        "img": "https://img.invalid/driverless-car.jpg",
        "ex": "We'll have driverless cars in the future.",
        "trVi": "Chúng ta sẽ có xe tự lái trong tương lai.",
        "trAnswer": "We'll have driverless cars in the future.",
        "trKey": "driverless car"
      },
      {
        "en": "Eco-friendly",
        "ipa": "/ˌiːkəʊ ˈfrendli/",
        "vi": "Thân thiện với môi trường",
        "img": "https://img.invalid/eco-friendly.jpg",
        "ex": "Petrol-powered cars are not eco-friendly, so they won't be popular.",
        "trVi": "Xe chạy bằng xăng không thân thiện với môi trường, vì vậy chúng sẽ không còn phổ biến.",
        "trAnswer": "Petrol-powered cars are not eco-friendly, so they won't be popular.",
        "trKey": "eco-friendly"
      },
      {
        "en": "Solar-powered ship",
        "ipa": "/ˈsəʊlər ˈpaʊəd ʃɪp/",
        "vi": "Tàu chạy bằng năng lượng mặt trời",
        "img": "https://img.invalid/solar-powered-ship.jpg",
        "ex": "Solar-powered ships are eco-friendly. They will not cause pollution.",
        "trVi": "Tàu chạy bằng năng lượng mặt trời thân thiện với môi trường. Chúng sẽ không gây ô nhiễm.",
        "trAnswer": "Solar-powered ships are eco-friendly. They will not cause pollution.",
        "trKey": "solar-powered ship"
      },
      {
        "en": "Bullet train",
        "ipa": "/ˈbʊlɪt treɪn/",
        "vi": "Tàu cao tốc",
        "img": "https://img.invalid/bullet-train.jpg",
        "ex": "Bullet trains will be faster, safer, and riders can avoid traffic jams.",
        "trVi": "Tàu cao tốc sẽ nhanh hơn, an toàn hơn, và hành khách có thể tránh được tắc đường.",
        "trAnswer": "Bullet trains will be faster, safer, and riders can avoid traffic jams.",
        "trKey": "bullet train"
      },
      {
        "en": "Autopilot",
        "ipa": "/ˈɔːtəʊpaɪlət/",
        "vi": "Chế độ lái tự động",
        "img": "https://img.invalid/autopilot.jpg",
        "ex": "Both models have an autopilot function, so they are driverless.",
        "trVi": "Cả hai mẫu xe đều có chức năng lái tự động, vì vậy chúng là xe tự lái.",
        "trAnswer": "Both models have an autopilot function, so they are driverless.",
        "trKey": "autopilot"
      },
      {
        "en": "Flying car",
        "ipa": "/ˈflaɪɪŋ kɑːr/",
        "vi": "Ô tô bay",
        "img": "https://img.invalid/flying-car.jpg",
        "ex": "A hyperloop is even faster than a flying car!",
        "trVi": "Hyperloop thậm chí còn nhanh hơn cả ô tô bay!",
        "trAnswer": "A hyperloop is even faster than a flying car!",
        "trKey": "flying car"
      },
      {
        "en": "Self-balancing",
        "ipa": "/self ˈbæləns ɪŋ/",
        "vi": "Tự cân bằng",
        "img": "https://img.invalid/self-balancing.jpg",
        "ex": "A solowheel is self-balancing and runs on electricity.",
        "trVi": "Bánh xe solowheel có khả năng tự cân bằng và chạy bằng điện.",
        "trAnswer": "A solowheel is self-balancing and runs on electricity.",
        "trKey": "self-balancing"
      },
      {
        "en": "Charge the battery",
        "ipa": "/tʃɑːdʒ ðə ˈbætri/",
        "vi": "Sạc pin",
        "img": "https://img.invalid/charge-the-battery.jpg",
        "ex": "You only have to charge the battery every 700 kilometres.",
        "trVi": "Bạn chỉ cần sạc pin sau mỗi 700 km.",
        "trAnswer": "You only have to charge the battery every 700 kilometres.",
        "trKey": "charge the battery"
      }
    ],
    "story": {
      "title": "Roadrunner - a car company",
      "titleVi": "Roadrunner - một công ty ô tô",
      "text": "Roadrunner is a car company that makes electric cars. The company introduced the first model in 2015 and they named it Speed. Speed soon became a success. Speed is safe, fast, comfortable, and not very expensive. It has four seats. The car can travel over 350 kilometres per hour. You only have to charge the battery every 700 kilometres. It even has a gaming screen inside.<br><br>The company will introduce a new model next year called Safety. This model will become the largest and safest electric car you can buy. It will be able to carry seven passengers. The new model will also be more economical.<br><br>Both models have an autopilot function, so they are driverless. Passengers can read, play games, or even sleep while they travel.",
      "textVi": "Roadrunner là một công ty sản xuất ô tô điện. Công ty đã ra mắt mẫu xe đầu tiên vào năm 2015 và đặt tên là Speed. Speed nhanh chóng trở thành một sản phẩm thành công. Speed an toàn, nhanh, thoải mái và không quá đắt. Xe có bốn chỗ ngồi. Xe có thể di chuyển với tốc độ hơn 350 km một giờ. Bạn chỉ cần sạc pin sau mỗi 700 km. Xe thậm chí còn có một màn hình chơi game bên trong.<br><br>Công ty sẽ ra mắt một mẫu xe mới vào năm sau có tên Safety. Mẫu xe này sẽ trở thành chiếc ô tô điện lớn nhất và an toàn nhất mà bạn có thể mua. Nó có thể chở được bảy hành khách. Mẫu xe mới cũng sẽ tiết kiệm nhiên liệu hơn.<br><br>Cả hai mẫu xe đều có chức năng lái tự động, vì vậy chúng là xe tự lái. Hành khách có thể đọc sách, chơi trò chơi, hoặc thậm chí ngủ trong khi di chuyển.",
      "used": [
        "Autopilot",
        "Charge the battery"
      ]
    }
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "🌍",
    "title": "ENGLISH-SPEAKING COUNTRIES",
    "titleVi": "Các quốc gia nói tiếng Anh",
    "words": [
      {
        "en": "Landscape",
        "ipa": "/ˈlændskeɪp/",
        "vi": "Phong cảnh",
        "img": "https://img.invalid/landscape.jpg",
        "ex": "Everywhere you go in New Zealand, you can see amazing natural landscapes.",
        "trVi": "Ở bất cứ đâu tại New Zealand, bạn cũng có thể thấy những phong cảnh thiên nhiên tuyệt đẹp.",
        "trAnswer": "Everywhere you go in New Zealand, you can see amazing natural landscapes.",
        "trKey": "landscape"
      },
      {
        "en": "Ancient",
        "ipa": "/ˈeɪnʃənt/",
        "vi": "Cổ xưa",
        "img": "https://img.invalid/ancient.jpg",
        "ex": "You can visit ancient forests in New Zealand.",
        "trVi": "Bạn có thể ghé thăm những khu rừng cổ xưa ở New Zealand.",
        "trAnswer": "You can visit ancient forests in New Zealand.",
        "trKey": "ancient"
      },
      {
        "en": "Unique",
        "ipa": "/juˈniːk/",
        "vi": "Độc đáo",
        "img": "https://img.invalid/unique.jpg",
        "ex": "Most visitors to New Zealand love its unique Maori culture.",
        "trVi": "Hầu hết du khách đến New Zealand đều yêu thích nền văn hóa Maori độc đáo của nơi này.",
        "trAnswer": "Most visitors to New Zealand love its unique Maori culture.",
        "trKey": "unique"
      },
      {
        "en": "Native",
        "ipa": "/ˈneɪtɪv/",
        "vi": "Bản địa",
        "img": "https://img.invalid/native.jpg",
        "ex": "Kangaroos are native to Australia. It is their home.",
        "trVi": "Chuột túi là loài bản địa của Úc. Đó là quê hương của chúng.",
        "trAnswer": "Kangaroos are native to Australia. It is their home.",
        "trKey": "native"
      },
      {
        "en": "Attraction",
        "ipa": "/əˈtrækʃn/",
        "vi": "Điểm tham quan",
        "img": "https://img.invalid/attraction.jpg",
        "ex": "A great attraction of Scotland is the ancient castle.",
        "trVi": "Một điểm tham quan tuyệt vời của Scotland là lâu đài cổ.",
        "trAnswer": "A great attraction of Scotland is the ancient castle.",
        "trKey": "attraction"
      },
      {
        "en": "Capital",
        "ipa": "/ˈkæpɪtl/",
        "vi": "Thủ đô",
        "img": "https://img.invalid/capital.jpg",
        "ex": "Is Washington D.C. the capital of the USA?",
        "trVi": "Washington D.C. có phải là thủ đô của Mỹ không?",
        "trAnswer": "Is Washington D.C. the capital of the USA?",
        "trKey": "capital"
      },
      {
        "en": "Kilt",
        "ipa": "/kɪlt/",
        "vi": "Váy truyền thống Scotland",
        "img": "https://img.invalid/kilt.jpg",
        "ex": "Scottish men wear kilts, short skirts, at their traditional festivals.",
        "trVi": "Đàn ông Scotland mặc kilt, một loại váy ngắn, trong các lễ hội truyền thống.",
        "trAnswer": "Scottish men wear kilts, short skirts, at their traditional festivals.",
        "trKey": "kilt"
      },
      {
        "en": "Coastline",
        "ipa": "/ˈkəʊstlaɪn/",
        "vi": "Đường bờ biển",
        "img": "https://img.invalid/coastline.jpg",
        "ex": "Canada has the longest coastline in the world.",
        "trVi": "Canada có đường bờ biển dài nhất thế giới.",
        "trAnswer": "Canada has the longest coastline in the world.",
        "trKey": "coastline"
      },
      {
        "en": "Haka dance",
        "ipa": "/ˈhɑːkə dɑːns/",
        "vi": "Điệu múa haka",
        "img": "https://img.invalid/haka-dance.jpg",
        "ex": "The haka dance is an example of Maori culture.",
        "trVi": "Điệu múa haka là một ví dụ của văn hóa Maori.",
        "trAnswer": "The haka dance is an example of Maori culture.",
        "trKey": "haka dance"
      },
      {
        "en": "Tour guide",
        "ipa": "/ˈtʊər ɡaɪd/",
        "vi": "Hướng dẫn viên du lịch",
        "img": "https://img.invalid/tour-guide.jpg",
        "ex": "A tour guide is talking about the schedule for a day trip in London.",
        "trVi": "Một hướng dẫn viên du lịch đang nói về lịch trình cho chuyến tham quan trong ngày ở London.",
        "trAnswer": "A tour guide is talking about the schedule for a day trip in London.",
        "trKey": "tour guide"
      }
    ],
    "story": {
      "title": "New Zealand",
      "titleVi": "New Zealand",
      "text": "New Zealand is an island country in the Pacific Ocean. It is one of the most interesting countries in the world. Everywhere you go, you can see amazing natural landscapes: green mountains, shining beaches, and ancient forests. You can visit the beautiful place where they filmed The Lord of the Rings, or historic Queenstown. This is also a great country for lovers of outdoor activities. You can always find something to do here: skiing, boating, bushwalking.<br><br>New Zealand is rich in culture. Most visitors to New Zealand love its unique Maori culture. The Maori are famous for their unique tattoos and haka dance. A visit to this beautiful country will be an experience you will never forget.",
      "textVi": "New Zealand là một quốc gia đảo nằm ở Thái Bình Dương. Đây là một trong những quốc gia thú vị nhất trên thế giới. Dù đi đến đâu, bạn cũng có thể ngắm nhìn những phong cảnh thiên nhiên tuyệt đẹp: núi xanh, bãi biển lấp lánh, và những khu rừng cổ xưa. Bạn có thể ghé thăm nơi quay bộ phim The Lord of the Rings, hoặc thị trấn lịch sử Queenstown. Đây cũng là một đất nước tuyệt vời dành cho những ai yêu thích các hoạt động ngoài trời. Bạn luôn có thể tìm thấy điều gì đó để làm ở đây: trượt tuyết, chèo thuyền, đi bộ đường rừng.<br><br>New Zealand giàu bản sắc văn hóa. Hầu hết du khách đến New Zealand đều yêu thích nền văn hóa Maori độc đáo của nơi này. Người Maori nổi tiếng với những hình xăm độc đáo và điệu múa haka. Một chuyến thăm đất nước xinh đẹp này sẽ là một trải nghiệm bạn sẽ không bao giờ quên.",
      "used": [
        "Ancient",
        "Unique",
        "Landscape"
      ]
    }
  }
];
