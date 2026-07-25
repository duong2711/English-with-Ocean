// Dữ liệu từ vựng lớp 9 (THCS/THPT) — trích từ SGK Tiếng Anh 9 Global Success, tập 1 và tập 2
// Mỗi unit gồm: từ vựng (words), bài đọc (story), và bản nháp "câu chuyện Dương & Dung" 4 khung (storyFrames).
// storyFrames: nội dung mẫu ban đầu cho tính năng "Câu chuyện" (mục THCS/THPT trong tab Từ vựng) — từ khóa
// (bọc trong <b>...</b>) sẽ bị ẩn thành ô trống cho học viên điền, ảnh minh họa (image_url) để trống, admin
// (giangvien@gmail.com) tải ảnh lên sau qua khung soạn thảo. Giảng viên vẫn có thể ghi đè bất kỳ khung nào
// qua khung soạn thảo đó — nội dung ghi đè sẽ được lưu trên Supabase và ưu tiên hơn bản nháp tĩnh này.
// Dùng chung cho Flashcard / Dịch câu / Câu chuyện / Trò chơi hứng từ.
const GRADE9_UNITS = [
  {
    "id": "u1",
    "number": 1,
    "icon": "🏘️",
    "title": "LOCAL COMMUNITY",
    "titleVi": "Cộng đồng địa phương",
    "words": [
      {
        "en": "Community",
        "ipa": "/kəˈmjuːnəti/",
        "vi": "Cộng đồng",
        "img": "https://img.invalid/community.jpg",
        "ex": "Everyone in our community helps each other during the flood.",
        "trVi": "Mọi người trong cộng đồng của chúng tôi giúp đỡ nhau trong trận lũ.",
        "trAnswer": "Everyone in our community helps each other during the flood.",
        "trKey": "community"
      },
      {
        "en": "Suburb",
        "ipa": "/ˈsʌbɜːb/",
        "vi": "Vùng ngoại ô",
        "img": "https://img.invalid/suburb.jpg",
        "ex": "We moved to a suburb because it is quieter than downtown.",
        "trVi": "Chúng tôi chuyển đến một vùng ngoại ô vì nó yên tĩnh hơn trung tâm thành phố.",
        "trAnswer": "We moved to a suburb because it is quieter than downtown.",
        "trKey": "suburb"
      },
      {
        "en": "Facilities",
        "ipa": "/fəˈsɪlətiz/",
        "vi": "Cơ sở vật chất, tiện ích",
        "img": "https://img.invalid/facilities.jpg",
        "ex": "Our neighbourhood has great facilities like parks and a library.",
        "trVi": "Khu phố của chúng tôi có những cơ sở vật chất tuyệt vời như công viên và thư viện.",
        "trAnswer": "Our neighbourhood has great facilities like parks and a library.",
        "trKey": "facilities"
      },
      {
        "en": "Garbage collector",
        "ipa": "/ˈɡɑːbɪdʒ kəˌlektər/",
        "vi": "Người thu gom rác",
        "img": "https://img.invalid/garbage-collector.jpg",
        "ex": "The garbage collector comes to our street every morning.",
        "trVi": "Người thu gom rác đến phố của chúng tôi mỗi buổi sáng.",
        "trAnswer": "The garbage collector comes to our street every morning.",
        "trKey": "garbage collector"
      },
      {
        "en": "Electrician",
        "ipa": "/ɪˌlekˈtrɪʃn/",
        "vi": "Thợ điện",
        "img": "https://img.invalid/electrician.jpg",
        "ex": "We called an electrician to fix the broken wires.",
        "trVi": "Chúng tôi đã gọi thợ điện đến sửa dây điện bị hỏng.",
        "trAnswer": "We called an electrician to fix the broken wires.",
        "trKey": "electrician"
      },
      {
        "en": "Firefighter",
        "ipa": "/ˈfaɪəfaɪtər/",
        "vi": "Lính cứu hỏa",
        "img": "https://img.invalid/firefighter.jpg",
        "ex": "The firefighter rescued a cat from the burning house.",
        "trVi": "Người lính cứu hỏa đã cứu một con mèo khỏi ngôi nhà đang cháy.",
        "trAnswer": "The firefighter rescued a cat from the burning house.",
        "trKey": "firefighter"
      },
      {
        "en": "Delivery person",
        "ipa": "/dɪˈlɪvəri ˌpɜːsn/",
        "vi": "Người giao hàng",
        "img": "https://img.invalid/delivery-person.jpg",
        "ex": "The delivery person brought my parcel this afternoon.",
        "trVi": "Người giao hàng đã mang bưu kiện của tôi đến chiều nay.",
        "trAnswer": "The delivery person brought my parcel this afternoon.",
        "trKey": "delivery person"
      },
      {
        "en": "Artisan",
        "ipa": "/ˈɑːtɪzæn/",
        "vi": "Nghệ nhân",
        "img": "https://img.invalid/artisan.jpg",
        "ex": "The artisan carves beautiful bamboo baskets by hand.",
        "trVi": "Người nghệ nhân chạm khắc những chiếc giỏ tre đẹp bằng tay.",
        "trAnswer": "The artisan carves beautiful bamboo baskets by hand.",
        "trKey": "artisan"
      },
      {
        "en": "Handicraft",
        "ipa": "/ˈhændikrɑːft/",
        "vi": "Đồ thủ công",
        "img": "https://img.invalid/handicraft.jpg",
        "ex": "Visitors love buying handicrafts from the craft village.",
        "trVi": "Du khách rất thích mua đồ thủ công từ làng nghề.",
        "trAnswer": "Visitors love buying handicrafts from the craft village.",
        "trKey": "handicraft"
      },
      {
        "en": "Speciality",
        "ipa": "/ˌspeʃiˈæləti/",
        "vi": "Đặc sản",
        "img": "https://img.invalid/speciality.jpg",
        "ex": "Pho is a speciality of Ha Noi.",
        "trVi": "Phở là một đặc sản của Hà Nội.",
        "trAnswer": "Pho is a speciality of Ha Noi.",
        "trKey": "speciality"
      },
      {
        "en": "Pottery",
        "ipa": "/ˈpɒtəri/",
        "vi": "Đồ gốm",
        "img": "https://img.invalid/pottery.jpg",
        "ex": "The artisan makes pottery using traditional methods.",
        "trVi": "Người nghệ nhân làm đồ gốm bằng phương pháp truyền thống.",
        "trAnswer": "The artisan makes pottery using traditional methods.",
        "trKey": "pottery"
      },
      {
        "en": "Get on with",
        "ipa": "/ˈɡet ɒn wɪð/",
        "vi": "Hòa thuận với",
        "img": "https://img.invalid/get-on-with.jpg",
        "ex": "I get on with my new neighbours very well.",
        "trVi": "Tôi hòa thuận rất tốt với những người hàng xóm mới.",
        "trAnswer": "I get on with my new neighbours very well.",
        "trKey": "get on with"
      }
    ],
    "story": {
      "title": "A Craft Village Near My New Home",
      "titleVi": "Một làng nghề gần ngôi nhà mới của tôi",
      "text": "Last month, Mi's family moved to a new suburb. At first, she missed her old friends, but she soon found that the new neighbourhood had wonderful facilities: a park, a library, and even a hospital.<br><br>Not far from her house, there was a small craft village. Every weekend, Mi visited the artisans there. She watched them make pottery and other handicrafts by hand, and she learned that each item takes many hours of careful work.<br><br>Mi also tried the local speciality: a bowl of sweet, warm che troi nuoc. She talked with the elderly seller, who told her many stories about the community. Little by little, Mi began to get on with her new neighbours, and she started to love her new home.",
      "textVi": "Tháng trước, gia đình Mi chuyển đến một vùng ngoại ô mới. Lúc đầu, cô bé nhớ những người bạn cũ, nhưng chẳng bao lâu sau cô phát hiện ra khu phố mới có những cơ sở vật chất tuyệt vời: một công viên, một thư viện, và thậm chí cả một bệnh viện.<br><br>Không xa nhà cô là một làng nghề thủ công nhỏ. Mỗi cuối tuần, Mi đều đến thăm các nghệ nhân ở đó. Cô xem họ làm đồ gốm và các sản phẩm thủ công khác bằng tay, và cô nhận ra rằng mỗi món đồ đều cần rất nhiều giờ làm việc tỉ mỉ.<br><br>Mi cũng thử món đặc sản của địa phương: một bát chè trôi nước ngọt, ấm nóng. Cô trò chuyện với bà cụ bán hàng, người đã kể cho cô nghe nhiều câu chuyện về cộng đồng nơi đây. Dần dần, Mi bắt đầu hòa thuận với những người hàng xóm mới, và cô bắt đầu yêu ngôi nhà mới của mình.",
      "used": [
        "Suburb",
        "Facilities",
        "Artisan",
        "Pottery",
        "Handicraft",
        "Speciality",
        "Get on with"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương and Dung live in the same <b>community</b>, though Dương lives downtown and Dung lives in the <b>suburb</b> nearby.",
        "keywords": [
          {
            "key": "community",
            "meaningVi": "Cộng đồng"
          },
          {
            "key": "suburb",
            "meaningVi": "Vùng ngoại ô"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Their neighbourhood has great <b>facilities</b>, and everyone tries to <b>get on with</b> each other like family.",
        "keywords": [
          {
            "key": "facilities",
            "meaningVi": "Cơ sở vật chất, tiện ích"
          },
          {
            "key": "get on with",
            "meaningVi": "Hòa thuận với"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Every morning, Dung waves to the <b>garbage collector</b>, and Dương often chats with the friendly <b>electrician</b> who fixes lights on their street, along with a brave <b>firefighter</b> who lives nearby.",
        "keywords": [
          {
            "key": "garbage collector",
            "meaningVi": "Người thu gom rác"
          },
          {
            "key": "electrician",
            "meaningVi": "Thợ điện"
          },
          {
            "key": "firefighter",
            "meaningVi": "Lính cứu hỏa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "There is also a kind <b>delivery person</b> who brings packages every day, and a skilled <b>artisan</b> who makes beautiful <b>pottery</b> and other <b>handicraft</b>, a local <b>speciality</b> everyone is proud of.",
        "keywords": [
          {
            "key": "delivery person",
            "meaningVi": "Người giao hàng"
          },
          {
            "key": "artisan",
            "meaningVi": "Nghệ nhân"
          },
          {
            "key": "pottery",
            "meaningVi": "Đồ gốm"
          },
          {
            "key": "handicraft",
            "meaningVi": "Đồ thủ công"
          },
          {
            "key": "speciality",
            "meaningVi": "Đặc sản"
          }
        ]
      }
    ]
  },
  {
    "id": "u2",
    "number": 2,
    "icon": "🌆",
    "title": "CITY LIFE",
    "titleVi": "Cuộc sống thành phố",
    "words": [
      {
        "en": "Downtown",
        "ipa": "/ˌdaʊnˈtaʊn/",
        "vi": "Trung tâm thành phố",
        "img": "https://img.invalid/downtown.jpg",
        "ex": "The office towers in downtown are lit up at night.",
        "trVi": "Các tòa nhà văn phòng ở trung tâm thành phố sáng đèn vào ban đêm.",
        "trAnswer": "The office towers in downtown are lit up at night.",
        "trKey": "downtown"
      },
      {
        "en": "Concrete jungle",
        "ipa": "/ˈkɒŋkriːt ˈdʒʌŋɡl/",
        "vi": "Rừng bê tông",
        "img": "https://img.invalid/concrete-jungle.jpg",
        "ex": "Some people call big cities a concrete jungle because there are so few trees.",
        "trVi": "Một số người gọi các thành phố lớn là rừng bê tông vì có quá ít cây xanh.",
        "trAnswer": "Some people call big cities a concrete jungle because there are so few trees.",
        "trKey": "concrete jungle"
      },
      {
        "en": "Public amenities",
        "ipa": "/ˈpʌblɪk əˈmiːnətiz/",
        "vi": "Tiện ích công cộng",
        "img": "https://img.invalid/public-amenities.jpg",
        "ex": "Parks and libraries are public amenities that everyone can use for free.",
        "trVi": "Công viên và thư viện là những tiện ích công cộng mà mọi người có thể sử dụng miễn phí.",
        "trAnswer": "Parks and libraries are public amenities that everyone can use for free.",
        "trKey": "public amenities"
      },
      {
        "en": "Metro",
        "ipa": "/ˈmetrəʊ/",
        "vi": "Tàu điện ngầm",
        "img": "https://img.invalid/metro.jpg",
        "ex": "I take the metro to school every day because it is fast.",
        "trVi": "Tôi đi tàu điện ngầm đến trường mỗi ngày vì nó nhanh.",
        "trAnswer": "I take the metro to school every day because it is fast.",
        "trKey": "metro"
      },
      {
        "en": "Liveable",
        "ipa": "/ˈlɪvəbl/",
        "vi": "Đáng sống",
        "img": "https://img.invalid/liveable.jpg",
        "ex": "A liveable city has clean air and green spaces.",
        "trVi": "Một thành phố đáng sống có không khí trong lành và không gian xanh.",
        "trAnswer": "A liveable city has clean air and green spaces.",
        "trKey": "liveable"
      },
      {
        "en": "Packed",
        "ipa": "/pækt/",
        "vi": "Đông đúc, chật kín",
        "img": "https://img.invalid/packed.jpg",
        "ex": "The bus was so packed that I had to stand the whole way.",
        "trVi": "Xe buýt chật kín người đến mức tôi phải đứng suốt cả chặng đường.",
        "trAnswer": "The bus was so packed that I had to stand the whole way.",
        "trKey": "packed"
      },
      {
        "en": "Congested",
        "ipa": "/kənˈdʒestɪd/",
        "vi": "Tắc nghẽn",
        "img": "https://img.invalid/congested.jpg",
        "ex": "The roads get congested every morning during rush hour.",
        "trVi": "Các con đường bị tắc nghẽn vào mỗi buổi sáng trong giờ cao điểm.",
        "trAnswer": "The roads get congested every morning during rush hour.",
        "trKey": "congested"
      },
      {
        "en": "Convenient",
        "ipa": "/kənˈviːniənt/",
        "vi": "Thuận tiện",
        "img": "https://img.invalid/convenient.jpg",
        "ex": "Living near the market is very convenient for my family.",
        "trVi": "Sống gần chợ rất thuận tiện cho gia đình tôi.",
        "trAnswer": "Living near the market is very convenient for my family.",
        "trKey": "convenient"
      },
      {
        "en": "Bustling",
        "ipa": "/ˈbʌslɪŋ/",
        "vi": "Nhộn nhịp",
        "img": "https://img.invalid/bustling.jpg",
        "ex": "The night market is always bustling with tourists and locals.",
        "trVi": "Chợ đêm luôn nhộn nhịp với du khách và người dân địa phương.",
        "trAnswer": "The night market is always bustling with tourists and locals.",
        "trKey": "bustling"
      },
      {
        "en": "Skyscraper",
        "ipa": "/ˈskaɪskreɪpər/",
        "vi": "Tòa nhà chọc trời",
        "img": "https://img.invalid/skyscraper.jpg",
        "ex": "You can see the whole city from the top of that skyscraper.",
        "trVi": "Bạn có thể nhìn thấy toàn bộ thành phố từ đỉnh tòa nhà chọc trời đó.",
        "trAnswer": "You can see the whole city from the top of that skyscraper.",
        "trKey": "skyscraper"
      },
      {
        "en": "Traffic jam",
        "ipa": "/ˈtræfɪk dʒæm/",
        "vi": "Kẹt xe",
        "img": "https://img.invalid/traffic-jam.jpg",
        "ex": "We were late because of a terrible traffic jam.",
        "trVi": "Chúng tôi đã đến muộn vì một vụ kẹt xe khủng khiếp.",
        "trAnswer": "We were late because of a terrible traffic jam.",
        "trKey": "traffic jam"
      },
      {
        "en": "Pavement",
        "ipa": "/ˈpeɪvmənt/",
        "vi": "Vỉa hè",
        "img": "https://img.invalid/pavement.jpg",
        "ex": "Please walk on the pavement, not on the road.",
        "trVi": "Hãy đi trên vỉa hè, không phải trên lòng đường.",
        "trAnswer": "Please walk on the pavement, not on the road.",
        "trKey": "pavement"
      }
    ],
    "story": {
      "title": "A City Made by Teens",
      "titleVi": "Một thành phố do các bạn tuổi teen thiết kế",
      "text": "Every year, students in Ben's city join a competition called Teenovator. Teams design ideas to make their hometown more liveable.<br><br>This year, Ben's team studied the traffic jam near their school. Every morning, the street was congested and packed with cars and motorbikes. The team suggested a new bicycle lane and more public amenities, such as covered bus stops, along the busy road.<br><br>Their teacher said the idea was convenient and easy to build. Ben was proud that his small idea could help turn a noisy, bustling street into a better place for everyone.",
      "textVi": "Hằng năm, học sinh ở thành phố của Ben tham gia một cuộc thi có tên là Teenovator. Các đội đưa ra ý tưởng để biến quê hương mình trở nên đáng sống hơn.<br><br>Năm nay, đội của Ben nghiên cứu về tình trạng kẹt xe gần trường học. Mỗi buổi sáng, con đường luôn tắc nghẽn và chật kín ô tô, xe máy. Đội của Ben đề xuất làm thêm một làn đường dành cho xe đạp và thêm các tiện ích công cộng, như trạm xe buýt có mái che, dọc theo con đường đông đúc đó.<br><br>Cô giáo nói rằng ý tưởng này rất thuận tiện và dễ thực hiện. Ben cảm thấy tự hào vì ý tưởng nhỏ bé của mình có thể giúp biến một con phố ồn ào, nhộn nhịp trở thành một nơi tốt đẹp hơn cho mọi người.",
      "used": [
        "Liveable",
        "Traffic jam",
        "Congested",
        "Packed",
        "Public amenities",
        "Convenient",
        "Bustling"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dung visits Dương in the <b>downtown</b> area. \"It feels like a <b>concrete jungle</b> here!\" she says, looking up at the tall buildings.",
        "keywords": [
          {
            "key": "downtown",
            "meaningVi": "Trung tâm thành phố"
          },
          {
            "key": "concrete jungle",
            "meaningVi": "Rừng bê tông"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương shows her the <b>public amenities</b> nearby and they take the <b>metro</b> to avoid the <b>traffic jam</b> on the road.",
        "keywords": [
          {
            "key": "public amenities",
            "meaningVi": "Tiện ích công cộng"
          },
          {
            "key": "metro",
            "meaningVi": "Tàu điện ngầm"
          },
          {
            "key": "traffic jam",
            "meaningVi": "Kẹt xe"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The streets are <b>packed</b> and <b>congested</b> at rush hour, but Dương still finds the city quite <b>convenient</b> for daily life.",
        "keywords": [
          {
            "key": "packed",
            "meaningVi": "Đông đúc, chật kín"
          },
          {
            "key": "congested",
            "meaningVi": "Tắc nghẽn"
          },
          {
            "key": "convenient",
            "meaningVi": "Thuận tiện"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "They walk along the busy <b>pavement</b> through the <b>bustling</b> streets, admiring a tall <b>skyscraper</b>. \"Do you think this city is really <b>liveable</b>?\" Dung asks.",
        "keywords": [
          {
            "key": "pavement",
            "meaningVi": "Vỉa hè"
          },
          {
            "key": "bustling",
            "meaningVi": "Nhộn nhịp"
          },
          {
            "key": "skyscraper",
            "meaningVi": "Tòa nhà chọc trời"
          },
          {
            "key": "liveable",
            "meaningVi": "Đáng sống"
          }
        ]
      }
    ]
  },
  {
    "id": "u3",
    "number": 3,
    "icon": "🥗",
    "title": "HEALTHY LIVING FOR TEENS",
    "titleVi": "Lối sống lành mạnh cho tuổi teen",
    "words": [
      {
        "en": "Priority",
        "ipa": "/praɪˈɒrəti/",
        "vi": "Ưu tiên",
        "img": "https://img.invalid/priority.jpg",
        "ex": "Getting enough sleep should be a priority for teenagers.",
        "trVi": "Ngủ đủ giấc nên là ưu tiên hàng đầu đối với thanh thiếu niên.",
        "trAnswer": "Getting enough sleep should be a priority for teenagers.",
        "trKey": "priority"
      },
      {
        "en": "Physical health",
        "ipa": "/ˈfɪzɪkl helθ/",
        "vi": "Sức khỏe thể chất",
        "img": "https://img.invalid/physical-health.jpg",
        "ex": "Regular exercise is good for your physical health.",
        "trVi": "Tập thể dục thường xuyên tốt cho sức khỏe thể chất của bạn.",
        "trAnswer": "Regular exercise is good for your physical health.",
        "trKey": "physical health"
      },
      {
        "en": "Mental health",
        "ipa": "/ˈmentl helθ/",
        "vi": "Sức khỏe tinh thần",
        "img": "https://img.invalid/mental-health.jpg",
        "ex": "Talking to friends can improve your mental health.",
        "trVi": "Trò chuyện với bạn bè có thể cải thiện sức khỏe tinh thần của bạn.",
        "trAnswer": "Talking to friends can improve your mental health.",
        "trKey": "mental health"
      },
      {
        "en": "Well-balanced",
        "ipa": "/ˌwel ˈbælənst/",
        "vi": "Cân bằng",
        "img": "https://img.invalid/well-balanced.jpg",
        "ex": "A well-balanced life includes time for study, rest, and fun.",
        "trVi": "Một cuộc sống cân bằng bao gồm thời gian cho học tập, nghỉ ngơi và vui chơi.",
        "trAnswer": "A well-balanced life includes time for study, rest, and fun.",
        "trKey": "well-balanced"
      },
      {
        "en": "Manage time",
        "ipa": "/ˈmænɪdʒ taɪm/",
        "vi": "Quản lý thời gian",
        "img": "https://img.invalid/manage-time.jpg",
        "ex": "Making a schedule helps me manage my time better.",
        "trVi": "Lập thời gian biểu giúp tôi quản lý thời gian tốt hơn.",
        "trAnswer": "Making a schedule helps me manage my time better.",
        "trKey": "manage time"
      },
      {
        "en": "Accomplish",
        "ipa": "/əˈkʌmplɪʃ/",
        "vi": "Hoàn thành, đạt được",
        "img": "https://img.invalid/accomplish.jpg",
        "ex": "She worked hard to accomplish her goal of running five kilometres.",
        "trVi": "Cô ấy đã cố gắng để đạt được mục tiêu chạy năm ki-lô-mét.",
        "trAnswer": "She worked hard to accomplish her goal of running five kilometres.",
        "trKey": "accomplish"
      },
      {
        "en": "Due date",
        "ipa": "/ˈdjuː deɪt/",
        "vi": "Hạn chót",
        "img": "https://img.invalid/due-date.jpg",
        "ex": "Please hand in your project before the due date.",
        "trVi": "Hãy nộp dự án của bạn trước hạn chót.",
        "trAnswer": "Please hand in your project before the due date.",
        "trKey": "due date"
      },
      {
        "en": "Optimistic",
        "ipa": "/ˌɒptɪˈmɪstɪk/",
        "vi": "Lạc quan",
        "img": "https://img.invalid/optimistic.jpg",
        "ex": "He stays optimistic even when things are difficult.",
        "trVi": "Anh ấy luôn lạc quan ngay cả khi mọi việc khó khăn.",
        "trAnswer": "He stays optimistic even when things are difficult.",
        "trKey": "optimistic"
      },
      {
        "en": "Distraction",
        "ipa": "/dɪˈstrækʃn/",
        "vi": "Sự sao nhãng",
        "img": "https://img.invalid/distraction.jpg",
        "ex": "Turn off your phone to avoid distractions while studying.",
        "trVi": "Hãy tắt điện thoại để tránh bị sao nhãng khi học.",
        "trAnswer": "Turn off your phone to avoid distractions while studying.",
        "trKey": "distraction"
      },
      {
        "en": "Procrastinate",
        "ipa": "/prəˈkræstɪneɪt/",
        "vi": "Trì hoãn",
        "img": "https://img.invalid/procrastinate.jpg",
        "ex": "Don't procrastinate; start your homework right after school.",
        "trVi": "Đừng trì hoãn; hãy bắt đầu làm bài tập ngay sau giờ học.",
        "trAnswer": "Don't procrastinate; start your homework right after school.",
        "trKey": "procrastinate"
      },
      {
        "en": "Exhausted",
        "ipa": "/ɪɡˈzɔːstɪd/",
        "vi": "Kiệt sức",
        "img": "https://img.invalid/exhausted.jpg",
        "ex": "I felt exhausted after the long exam.",
        "trVi": "Tôi cảm thấy kiệt sức sau kỳ thi dài.",
        "trAnswer": "I felt exhausted after the long exam.",
        "trKey": "exhausted"
      },
      {
        "en": "Relax",
        "ipa": "/rɪˈlæks/",
        "vi": "Thư giãn",
        "img": "https://img.invalid/relax.jpg",
        "ex": "It is important to relax after a stressful day.",
        "trVi": "Việc thư giãn sau một ngày căng thẳng là rất quan trọng.",
        "trAnswer": "It is important to relax after a stressful day.",
        "trKey": "relax"
      }
    ],
    "story": {
      "title": "Phong's New Timetable",
      "titleVi": "Thời gian biểu mới của Phong",
      "text": "Phong used to procrastinate. He often left his homework until the due date and felt exhausted every night.<br><br>One day, the school counsellor gave him some advice: make managing time a priority. Phong made a new timetable with time for study, sport, and relaxing. He put his phone away when he studied, so there were fewer distractions.<br><br>After two weeks, Phong felt more optimistic about school. He could accomplish his tasks early and still have time for his physical health and mental health. His life finally felt well-balanced.",
      "textVi": "Phong từng có thói quen trì hoãn. Cậu thường để bài tập đến sát hạn chót và cảm thấy kiệt sức mỗi tối.<br><br>Một ngày nọ, chuyên viên tư vấn của trường đã cho cậu một lời khuyên: hãy ưu tiên việc quản lý thời gian. Phong lập một thời gian biểu mới với thời gian cho học tập, thể thao và thư giãn. Cậu cất điện thoại đi khi học bài, nhờ đó ít bị sao nhãng hơn.<br><br>Sau hai tuần, Phong cảm thấy lạc quan hơn về việc học. Cậu có thể hoàn thành nhiệm vụ sớm và vẫn có thời gian cho sức khỏe thể chất và sức khỏe tinh thần. Cuộc sống của cậu cuối cùng cũng trở nên cân bằng.",
      "used": [
        "Procrastinate",
        "Due date",
        "Exhausted",
        "Priority",
        "Optimistic",
        "Accomplish",
        "Well-balanced"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dung tells Dương that her top <b>priority</b> this year is to take care of both her <b>physical health</b> and her <b>mental health</b>.",
        "keywords": [
          {
            "key": "priority",
            "meaningVi": "Ưu tiên"
          },
          {
            "key": "physical health",
            "meaningVi": "Sức khỏe thể chất"
          },
          {
            "key": "mental health",
            "meaningVi": "Sức khỏe tinh thần"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "She tries to eat a <b>well-balanced</b> diet and <b>manage time</b> carefully between studying and resting.",
        "keywords": [
          {
            "key": "well-balanced",
            "meaningVi": "Cân bằng"
          },
          {
            "key": "manage time",
            "meaningVi": "Quản lý thời gian"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương admits he often <b>procrastinates</b> and forgets the <b>due date</b> for his homework, feeling <b>exhausted</b> by the end of the week.",
        "keywords": [
          {
            "key": "procrastinates",
            "meaningVi": "Trì hoãn"
          },
          {
            "key": "due date",
            "meaningVi": "Hạn chót"
          },
          {
            "key": "exhausted",
            "meaningVi": "Kiệt sức"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung reminds him to stay <b>optimistic</b>, avoid <b>distractions</b>, and <b>relax</b> a little every day to <b>accomplish</b> his goals.",
        "keywords": [
          {
            "key": "optimistic",
            "meaningVi": "Lạc quan"
          },
          {
            "key": "distractions",
            "meaningVi": "Sự sao nhãng"
          },
          {
            "key": "relax",
            "meaningVi": "Thư giãn"
          },
          {
            "key": "accomplish",
            "meaningVi": "Hoàn thành, đạt được"
          }
        ]
      }
    ]
  },
  {
    "id": "u4",
    "number": 4,
    "icon": "🏛️",
    "title": "REMEMBERING THE PAST",
    "titleVi": "Nhớ về quá khứ",
    "words": [
      {
        "en": "Heritage",
        "ipa": "/ˈherɪtɪdʒ/",
        "vi": "Di sản",
        "img": "https://img.invalid/heritage.jpg",
        "ex": "Hoi An Ancient Town is an important part of our heritage.",
        "trVi": "Phố cổ Hội An là một phần quan trọng của di sản chúng ta.",
        "trAnswer": "Hoi An Ancient Town is an important part of our heritage.",
        "trKey": "heritage"
      },
      {
        "en": "Preserve",
        "ipa": "/prɪˈzɜːv/",
        "vi": "Bảo tồn",
        "img": "https://img.invalid/preserve.jpg",
        "ex": "We must preserve old buildings for future generations.",
        "trVi": "Chúng ta phải bảo tồn những công trình cổ cho các thế hệ tương lai.",
        "trAnswer": "We must preserve old buildings for future generations.",
        "trKey": "preserve"
      },
      {
        "en": "Monument",
        "ipa": "/ˈmɒnjumənt/",
        "vi": "Di tích, tượng đài",
        "img": "https://img.invalid/monument.jpg",
        "ex": "Tourists take photos in front of the famous monument.",
        "trVi": "Du khách chụp ảnh trước di tích nổi tiếng.",
        "trAnswer": "Tourists take photos in front of the famous monument.",
        "trKey": "monument"
      },
      {
        "en": "Magnificent",
        "ipa": "/mæɡˈnɪfɪsnt/",
        "vi": "Tráng lệ",
        "img": "https://img.invalid/magnificent.jpg",
        "ex": "The ancient temple looked magnificent in the sunset.",
        "trVi": "Ngôi đền cổ trông thật tráng lệ trong ánh hoàng hôn.",
        "trAnswer": "The ancient temple looked magnificent in the sunset.",
        "trKey": "magnificent"
      },
      {
        "en": "Generation",
        "ipa": "/ˌdʒenəˈreɪʃn/",
        "vi": "Thế hệ",
        "img": "https://img.invalid/generation.jpg",
        "ex": "This recipe has been passed down through many generations.",
        "trVi": "Công thức này đã được truyền qua nhiều thế hệ.",
        "trAnswer": "This recipe has been passed down through many generations.",
        "trKey": "generation"
      },
      {
        "en": "Custom",
        "ipa": "/ˈkʌstəm/",
        "vi": "Phong tục",
        "img": "https://img.invalid/custom.jpg",
        "ex": "Giving lucky money is a custom during Tet.",
        "trVi": "Mừng tuổi là một phong tục trong dịp Tết.",
        "trAnswer": "Giving lucky money is a custom during Tet.",
        "trKey": "custom"
      },
      {
        "en": "Tradition",
        "ipa": "/trəˈdɪʃn/",
        "vi": "Truyền thống",
        "img": "https://img.invalid/tradition.jpg",
        "ex": "Making banh chung is a tradition in Vietnamese families.",
        "trVi": "Gói bánh chưng là một truyền thống trong các gia đình Việt Nam.",
        "trAnswer": "Making banh chung is a tradition in Vietnamese families.",
        "trKey": "tradition"
      },
      {
        "en": "Occupy",
        "ipa": "/ˈɒkjupaɪ/",
        "vi": "Chiếm giữ, cư ngụ",
        "img": "https://img.invalid/occupy.jpg",
        "ex": "The old castle has been occupied for a thousand years.",
        "trVi": "Tòa lâu đài cổ đã được cư ngụ suốt một nghìn năm.",
        "trAnswer": "The old castle has been occupied for a thousand years.",
        "trKey": "occupy"
      },
      {
        "en": "Structure",
        "ipa": "/ˈstrʌktʃər/",
        "vi": "Công trình, kiến trúc",
        "img": "https://img.invalid/structure.jpg",
        "ex": "Angkor Wat is one of the largest religious structures in the world.",
        "trVi": "Angkor Wat là một trong những công trình tôn giáo lớn nhất thế giới.",
        "trAnswer": "Angkor Wat is one of the largest religious structures in the world.",
        "trKey": "structure"
      },
      {
        "en": "Recognise",
        "ipa": "/ˈrekəɡnaɪz/",
        "vi": "Công nhận",
        "img": "https://img.invalid/recognise.jpg",
        "ex": "UNESCO recognised the town as a World Heritage Site.",
        "trVi": "UNESCO đã công nhận thị trấn này là Di sản Thế giới.",
        "trAnswer": "UNESCO recognised the town as a World Heritage Site.",
        "trKey": "recognise"
      },
      {
        "en": "Promote",
        "ipa": "/prəˈməʊt/",
        "vi": "Quảng bá, thúc đẩy",
        "img": "https://img.invalid/promote.jpg",
        "ex": "The festival helps promote friendship between countries.",
        "trVi": "Lễ hội giúp thúc đẩy tình hữu nghị giữa các quốc gia.",
        "trAnswer": "The festival helps promote friendship between countries.",
        "trKey": "promote"
      },
      {
        "en": "Ancient",
        "ipa": "/ˈeɪnʃənt/",
        "vi": "Cổ xưa",
        "img": "https://img.invalid/ancient.jpg",
        "ex": "We visited an ancient village during our trip.",
        "trVi": "Chúng tôi đã ghé thăm một ngôi làng cổ trong chuyến đi.",
        "trAnswer": "We visited an ancient village during our trip.",
        "trKey": "ancient"
      }
    ],
    "story": {
      "title": "The Oldest Castle in the World",
      "titleVi": "Tòa lâu đài cổ nhất thế giới",
      "text": "In their history project, Mi and Nam researched Angkor Wat in Cambodia. It is a magnificent monument that has been occupied for hundreds of years.<br><br>Their teacher explained that many countries try to preserve such ancient structures because they are part of the world's heritage. Local people are proud of their customs and traditions, and they want future generations to enjoy them too.<br><br>After the project, the whole class agreed that everyone should help promote and protect old buildings, wherever they are.",
      "textVi": "Trong dự án lịch sử của mình, Mi và Nam đã nghiên cứu về Angkor Wat ở Campuchia. Đây là một di tích tráng lệ đã được cư ngụ suốt hàng trăm năm.<br><br>Cô giáo giải thích rằng nhiều quốc gia cố gắng bảo tồn những công trình cổ xưa như vậy vì chúng là một phần của di sản thế giới. Người dân địa phương tự hào về phong tục và truyền thống của họ, và họ muốn các thế hệ tương lai cũng được tận hưởng những điều đó.<br><br>Sau dự án, cả lớp đồng ý rằng mọi người nên giúp quảng bá và bảo vệ những công trình cổ, dù chúng ở đâu.",
      "used": [
        "Magnificent",
        "Monument",
        "Occupy",
        "Preserve",
        "Heritage",
        "Custom",
        "Tradition",
        "Generation",
        "Promote",
        "Ancient"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương and Dung visit an old <b>heritage</b> site in their hometown, hoping to learn how people <b>preserve</b> it for future generations.",
        "keywords": [
          {
            "key": "heritage",
            "meaningVi": "Di sản"
          },
          {
            "key": "preserve",
            "meaningVi": "Bảo tồn"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "They see a <b>magnificent</b> <b>monument</b> built many <b>generations</b> ago by the local people.",
        "keywords": [
          {
            "key": "magnificent",
            "meaningVi": "Tráng lệ"
          },
          {
            "key": "monument",
            "meaningVi": "Di tích, tượng đài"
          },
          {
            "key": "generations",
            "meaningVi": "Thế hệ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The guide explains an old <b>custom</b> and <b>tradition</b> connected to the site, and how the <b>ancient</b> kings once <b>occupied</b> this land.",
        "keywords": [
          {
            "key": "custom",
            "meaningVi": "Phong tục"
          },
          {
            "key": "tradition",
            "meaningVi": "Truyền thống"
          },
          {
            "key": "ancient",
            "meaningVi": "Cổ xưa"
          },
          {
            "key": "occupied",
            "meaningVi": "Chiếm giữ, cư ngụ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "UNESCO has <b>recognised</b> this <b>structure</b> as a World Heritage Site, and local people work hard to <b>promote</b> it to visitors from all over the world.",
        "keywords": [
          {
            "key": "recognised",
            "meaningVi": "Công nhận"
          },
          {
            "key": "structure",
            "meaningVi": "Công trình, kiến trúc"
          },
          {
            "key": "promote",
            "meaningVi": "Quảng bá, thúc đẩy"
          }
        ]
      }
    ]
  },
  {
    "id": "u5",
    "number": 5,
    "icon": "🎒",
    "title": "OUR EXPERIENCES",
    "titleVi": "Trải nghiệm của chúng ta",
    "words": [
      {
        "en": "Eco-tour",
        "ipa": "/ˈiːkəʊ tʊər/",
        "vi": "Tour du lịch sinh thái",
        "img": "https://img.invalid/eco-tour.jpg",
        "ex": "We went on an eco-tour to learn about the coral reef.",
        "trVi": "Chúng tôi đã tham gia một tour du lịch sinh thái để tìm hiểu về rạn san hô.",
        "trAnswer": "We went on an eco-tour to learn about the coral reef.",
        "trKey": "eco-tour"
      },
      {
        "en": "Put up a tent",
        "ipa": "/pʊt ʌp ə tent/",
        "vi": "Dựng lều",
        "img": "https://img.invalid/put-up-a-tent.jpg",
        "ex": "It took us an hour to put up our tent at the camp.",
        "trVi": "Chúng tôi mất một tiếng để dựng lều ở khu cắm trại.",
        "trAnswer": "It took us an hour to put up our tent at the camp.",
        "trKey": "put up a tent"
      },
      {
        "en": "Tour the campus",
        "ipa": "/tʊər ðə ˈkæmpəs/",
        "vi": "Tham quan khuôn viên trường",
        "img": "https://img.invalid/tour-the-campus.jpg",
        "ex": "We toured the campus before the summer course began.",
        "trVi": "Chúng tôi đã tham quan khuôn viên trường trước khi khóa học hè bắt đầu.",
        "trAnswer": "We toured the campus before the summer course began.",
        "trKey": "tour the campus"
      },
      {
        "en": "Go snorkelling",
        "ipa": "/ɡəʊ ˈsnɔːklɪŋ/",
        "vi": "Đi lặn ống thở",
        "img": "https://img.invalid/go-snorkelling.jpg",
        "ex": "We went snorkelling and saw many colourful fish.",
        "trVi": "Chúng tôi đã đi lặn ống thở và nhìn thấy nhiều loài cá đầy màu sắc.",
        "trAnswer": "We went snorkelling and saw many colourful fish.",
        "trKey": "go snorkelling"
      },
      {
        "en": "Give a performance",
        "ipa": "/ɡɪv ə pəˈfɔːməns/",
        "vi": "Biểu diễn",
        "img": "https://img.invalid/give-a-performance.jpg",
        "ex": "The students gave a performance on the last night of camp.",
        "trVi": "Các học sinh đã biểu diễn vào đêm cuối cùng của trại hè.",
        "trAnswer": "The students gave a performance on the last night of camp.",
        "trKey": "give a performance"
      },
      {
        "en": "Amazing",
        "ipa": "/əˈmeɪzɪŋ/",
        "vi": "Tuyệt vời",
        "img": "https://img.invalid/amazing.jpg",
        "ex": "Climbing the mountain was an amazing experience.",
        "trVi": "Leo núi là một trải nghiệm tuyệt vời.",
        "trAnswer": "Climbing the mountain was an amazing experience.",
        "trKey": "amazing"
      },
      {
        "en": "Exhilarating",
        "ipa": "/ɪɡˈzɪləreɪtɪŋ/",
        "vi": "Hào hứng, phấn khích",
        "img": "https://img.invalid/exhilarating.jpg",
        "ex": "The parachute jump was exhilarating.",
        "trVi": "Cú nhảy dù thật hào hứng.",
        "trAnswer": "The parachute jump was exhilarating.",
        "trKey": "exhilarating"
      },
      {
        "en": "Unpleasant",
        "ipa": "/ʌnˈpleznt/",
        "vi": "Khó chịu",
        "img": "https://img.invalid/unpleasant.jpg",
        "ex": "Getting lost in the forest was an unpleasant experience.",
        "trVi": "Bị lạc trong rừng là một trải nghiệm khó chịu.",
        "trAnswer": "Getting lost in the forest was an unpleasant experience.",
        "trKey": "unpleasant"
      },
      {
        "en": "Helpless",
        "ipa": "/ˈhelpləs/",
        "vi": "Bất lực",
        "img": "https://img.invalid/helpless.jpg",
        "ex": "I felt helpless when I couldn't find my way back to camp.",
        "trVi": "Tôi cảm thấy bất lực khi không thể tìm được đường về trại.",
        "trAnswer": "I felt helpless when I couldn't find my way back to camp.",
        "trKey": "helpless"
      },
      {
        "en": "Embarrassing",
        "ipa": "/ɪmˈbærəsɪŋ/",
        "vi": "Xấu hổ",
        "img": "https://img.invalid/embarrassing.jpg",
        "ex": "It was embarrassing when I fell off the canoe.",
        "trVi": "Thật xấu hổ khi tôi bị ngã khỏi thuyền ca-nô.",
        "trAnswer": "It was embarrassing when I fell off the canoe.",
        "trKey": "embarrassing"
      },
      {
        "en": "Learn by rote",
        "ipa": "/lɜːn baɪ rəʊt/",
        "vi": "Học vẹt",
        "img": "https://img.invalid/learn-by-rote.jpg",
        "ex": "He learned the poem by rote for the contest.",
        "trVi": "Cậu ấy học vẹt bài thơ cho cuộc thi.",
        "trAnswer": "He learned the poem by rote for the contest.",
        "trKey": "learn by rote"
      },
      {
        "en": "Local speciality",
        "ipa": "/ˈləʊkl ˌspeʃiˈæləti/",
        "vi": "Đặc sản địa phương",
        "img": "https://img.invalid/local-speciality.jpg",
        "ex": "Tom brought back some local specialities from Da Lat.",
        "trVi": "Tom đã mang về một số đặc sản địa phương từ Đà Lạt.",
        "trAnswer": "Tom brought back some local specialities from Da Lat.",
        "trKey": "local speciality"
      }
    ],
    "story": {
      "title": "My Summer Course",
      "titleVi": "Khóa học hè của tôi",
      "text": "Last summer, Tom joined a three-day course far from home. On the first day, he learned to put up a tent, which was harder than he expected.<br><br>On the second day, the group went on an eco-tour and went snorkelling near the coast. Tom said it was the most amazing and exhilarating experience of his life.<br><br>On the final night, every student had to give a performance. Tom felt embarrassed at first, but his friends cheered for him, and it turned out to be a wonderful memory.",
      "textVi": "Mùa hè năm ngoái, Tom đã tham gia một khóa học ba ngày xa nhà. Ngày đầu tiên, cậu học cách dựng lều, việc này khó hơn cậu tưởng.<br><br>Ngày thứ hai, cả nhóm tham gia một tour du lịch sinh thái và đi lặn ống thở gần bờ biển. Tom nói đó là trải nghiệm tuyệt vời và hào hứng nhất trong đời cậu.<br><br>Vào đêm cuối cùng, mỗi học sinh phải biểu diễn một tiết mục. Lúc đầu Tom cảm thấy xấu hổ, nhưng bạn bè đã cổ vũ cho cậu, và cuối cùng đó trở thành một kỷ niệm tuyệt vời.",
      "used": [
        "Put up a tent",
        "Eco-tour",
        "Go snorkelling",
        "Amazing",
        "Exhilarating",
        "Give a performance",
        "Embarrassing"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Last summer, Dương and Dung joined an <b>eco-tour</b> in the mountains. They had to <b>put up a tent</b> for the night.",
        "keywords": [
          {
            "key": "eco-tour",
            "meaningVi": "Tour du lịch sinh thái"
          },
          {
            "key": "put up a tent",
            "meaningVi": "Dựng lều"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Before the trip, they also got to <b>tour the campus</b> of a famous university, which Dung found truly <b>amazing</b>.",
        "keywords": [
          {
            "key": "tour the campus",
            "meaningVi": "Tham quan khuôn viên trường"
          },
          {
            "key": "amazing",
            "meaningVi": "Tuyệt vời"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The next day, they went to <b>go snorkelling</b> in the sea, an <b>exhilarating</b> experience, although the cold water felt a bit <b>unpleasant</b> at first.",
        "keywords": [
          {
            "key": "go snorkelling",
            "meaningVi": "Đi lặn ống thở"
          },
          {
            "key": "exhilarating",
            "meaningVi": "Hào hứng, phấn khích"
          },
          {
            "key": "unpleasant",
            "meaningVi": "Khó chịu"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "That evening, Dương had to <b>give a performance</b> on stage and felt <b>helpless</b> and <b>embarrassing</b> when he forgot his lines — he realised <b>learning by rote</b> doesn't always work, so they cooked a <b>local speciality</b> together to cheer him up instead.",
        "keywords": [
          {
            "key": "give a performance",
            "meaningVi": "Biểu diễn"
          },
          {
            "key": "helpless",
            "meaningVi": "Bất lực"
          },
          {
            "key": "embarrassing",
            "meaningVi": "Xấu hổ"
          },
          {
            "key": "learning by rote",
            "meaningVi": "Học vẹt"
          },
          {
            "key": "local speciality",
            "meaningVi": "Đặc sản địa phương"
          }
        ]
      }
    ]
  },
  {
    "id": "u6",
    "number": 6,
    "icon": "🕰️",
    "title": "VIETNAMESE LIFESTYLE: THEN AND NOW",
    "titleVi": "Lối sống người Việt: Xưa và nay",
    "words": [
      {
        "en": "Extended family",
        "ipa": "/ɪkˈstendɪd ˈfæməli/",
        "vi": "Gia đình nhiều thế hệ",
        "img": "https://img.invalid/extended-family.jpg",
        "ex": "In an extended family, grandparents often live with their children and grandchildren.",
        "trVi": "Trong một gia đình nhiều thế hệ, ông bà thường sống cùng con cháu.",
        "trAnswer": "In an extended family, grandparents often live with their children and grandchildren.",
        "trKey": "extended family"
      },
      {
        "en": "Family-oriented",
        "ipa": "/ˈfæməli ˈɔːrientɪd/",
        "vi": "Coi trọng gia đình",
        "img": "https://img.invalid/family-oriented.jpg",
        "ex": "My grandfather is very family-oriented and loves spending time with us.",
        "trVi": "Ông tôi rất coi trọng gia đình và thích dành thời gian bên chúng tôi.",
        "trAnswer": "My grandfather is very family-oriented and loves spending time with us.",
        "trKey": "family-oriented"
      },
      {
        "en": "Democratic",
        "ipa": "/ˌdeməˈkrætɪk/",
        "vi": "Dân chủ",
        "img": "https://img.invalid/democratic.jpg",
        "ex": "Our family has a democratic relationship; everyone can share their opinion.",
        "trVi": "Gia đình tôi có mối quan hệ dân chủ; ai cũng có thể nói lên ý kiến của mình.",
        "trAnswer": "Our family has a democratic relationship; everyone can share their opinion.",
        "trKey": "democratic"
      },
      {
        "en": "Independent",
        "ipa": "/ˌɪndɪˈpendənt/",
        "vi": "Độc lập",
        "img": "https://img.invalid/independent.jpg",
        "ex": "Young people today are more independent than their grandparents were.",
        "trVi": "Giới trẻ ngày nay độc lập hơn ông bà của họ ngày xưa.",
        "trAnswer": "Young people today are more independent than their grandparents were.",
        "trKey": "independent"
      },
      {
        "en": "Privacy",
        "ipa": "/ˈprɪvəsi/",
        "vi": "Sự riêng tư",
        "img": "https://img.invalid/privacy.jpg",
        "ex": "Teenagers today want more privacy than in the past.",
        "trVi": "Thanh thiếu niên ngày nay muốn có nhiều sự riêng tư hơn trước đây.",
        "trAnswer": "Teenagers today want more privacy than in the past.",
        "trKey": "privacy"
      },
      {
        "en": "Various",
        "ipa": "/ˈveəriəs/",
        "vi": "Đa dạng",
        "img": "https://img.invalid/various.jpg",
        "ex": "Children used to play various outdoor games like hide-and-seek.",
        "trVi": "Trẻ em trước đây thường chơi nhiều trò chơi ngoài trời đa dạng như trốn tìm.",
        "trAnswer": "Children used to play various outdoor games like hide-and-seek.",
        "trKey": "various"
      },
      {
        "en": "Take notes",
        "ipa": "/teɪk nəʊts/",
        "vi": "Ghi chép",
        "img": "https://img.invalid/take-notes.jpg",
        "ex": "Students take notes carefully during the lecture.",
        "trVi": "Học sinh ghi chép cẩn thận trong suốt buổi giảng.",
        "trAnswer": "Students take notes carefully during the lecture.",
        "trKey": "take notes"
      },
      {
        "en": "Memorise",
        "ipa": "/ˈmeməraɪz/",
        "vi": "Ghi nhớ",
        "img": "https://img.invalid/memorise.jpg",
        "ex": "In the past, students had to memorise long texts.",
        "trVi": "Trước đây, học sinh phải ghi nhớ những đoạn văn dài.",
        "trAnswer": "In the past, students had to memorise long texts.",
        "trKey": "memorise"
      },
      {
        "en": "Pursue",
        "ipa": "/pəˈsjuː/",
        "vi": "Theo đuổi",
        "img": "https://img.invalid/pursue.jpg",
        "ex": "She wants to pursue her interest in painting.",
        "trVi": "Cô ấy muốn theo đuổi niềm đam mê hội họa của mình.",
        "trAnswer": "She wants to pursue her interest in painting.",
        "trKey": "pursue"
      },
      {
        "en": "Replace",
        "ipa": "/rɪˈpleɪs/",
        "vi": "Thay thế",
        "img": "https://img.invalid/replace.jpg",
        "ex": "Smartphones have replaced old-fashioned telephones.",
        "trVi": "Điện thoại thông minh đã thay thế điện thoại kiểu cũ.",
        "trAnswer": "Smartphones have replaced old-fashioned telephones.",
        "trKey": "replace"
      },
      {
        "en": "Old-fashioned",
        "ipa": "/ˌəʊld ˈfæʃnd/",
        "vi": "Lỗi thời, cổ điển",
        "img": "https://img.invalid/old-fashioned.jpg",
        "ex": "My grandmother still uses some old-fashioned tools.",
        "trVi": "Bà tôi vẫn dùng một số dụng cụ lỗi thời.",
        "trAnswer": "My grandmother still uses some old-fashioned tools.",
        "trKey": "old-fashioned"
      },
      {
        "en": "Generation gap",
        "ipa": "/ˌdʒenəˈreɪʃn ɡæp/",
        "vi": "Khoảng cách thế hệ",
        "img": "https://img.invalid/generation-gap.jpg",
        "ex": "There is sometimes a generation gap between grandparents and grandchildren.",
        "trVi": "Đôi khi có một khoảng cách thế hệ giữa ông bà và cháu.",
        "trAnswer": "There is sometimes a generation gap between grandparents and grandchildren.",
        "trKey": "generation gap"
      }
    ],
    "story": {
      "title": "Grandpa's Stories",
      "titleVi": "Những câu chuyện của ông",
      "text": "Phong loves listening to his grandfather's stories about the past. In those days, families were usually extended families, with grandparents, parents, and children living under one roof.<br><br>Grandpa said that life then was more family-oriented, but people had less privacy. He also remembers using various old-fashioned tools that have now been replaced by modern machines.<br><br>Phong noticed a small generation gap between him and his grandfather, but he still enjoys learning about how much Vietnamese lifestyle has changed.",
      "textVi": "Phong rất thích nghe ông kể chuyện về ngày xưa. Thời đó, các gia đình thường là gia đình nhiều thế hệ, với ông bà, cha mẹ và con cái cùng sống chung một mái nhà.<br><br>Ông kể rằng cuộc sống ngày ấy coi trọng gia đình hơn, nhưng mọi người lại có ít sự riêng tư hơn. Ông cũng nhớ đã từng dùng nhiều dụng cụ lỗi thời mà nay đã được thay thế bằng máy móc hiện đại.<br><br>Phong nhận thấy có một khoảng cách thế hệ nhỏ giữa mình và ông, nhưng cậu vẫn rất thích tìm hiểu xem lối sống của người Việt đã thay đổi nhiều như thế nào.",
      "used": [
        "Extended family",
        "Family-oriented",
        "Privacy",
        "Various",
        "Old-fashioned",
        "Replace",
        "Generation gap"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dung's grandparents lived in a big <b>extended family</b>, while Dương's family today is smaller and more <b>independent</b>.",
        "keywords": [
          {
            "key": "extended family",
            "meaningVi": "Gia đình nhiều thế hệ"
          },
          {
            "key": "independent",
            "meaningVi": "Độc lập"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "In the past, families were very <b>family-oriented</b>, but young people today value <b>privacy</b> and a more <b>democratic</b> way of making decisions.",
        "keywords": [
          {
            "key": "family-oriented",
            "meaningVi": "Coi trọng gia đình"
          },
          {
            "key": "privacy",
            "meaningVi": "Sự riêng tư"
          },
          {
            "key": "democratic",
            "meaningVi": "Dân chủ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "In class, students used to just <b>take notes</b> and <b>memorise</b> everything, but now there are <b>various</b> new ways to learn.",
        "keywords": [
          {
            "key": "take notes",
            "meaningVi": "Ghi chép"
          },
          {
            "key": "memorise",
            "meaningVi": "Ghi nhớ"
          },
          {
            "key": "various",
            "meaningVi": "Đa dạng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung wants to <b>pursue</b> a modern lifestyle, but she doesn't want technology to completely <b>replace</b> old values. \"Even though our ideas seem <b>old-fashioned</b> to some, we shouldn't let the <b>generation gap</b> divide us,\" she says.",
        "keywords": [
          {
            "key": "pursue",
            "meaningVi": "Theo đuổi"
          },
          {
            "key": "replace",
            "meaningVi": "Thay thế"
          },
          {
            "key": "old-fashioned",
            "meaningVi": "Lỗi thời, cổ điển"
          },
          {
            "key": "generation gap",
            "meaningVi": "Khoảng cách thế hệ"
          }
        ]
      }
    ]
  },
  {
    "id": "u7",
    "number": 7,
    "icon": "🏞️",
    "title": "NATURAL WONDERS OF THE WORLD",
    "titleVi": "Kỳ quan thiên nhiên thế giới",
    "words": [
      {
        "en": "Natural wonder",
        "ipa": "/ˈnætʃrəl ˈwʌndər/",
        "vi": "Kỳ quan thiên nhiên",
        "img": "https://img.invalid/natural-wonder.jpg",
        "ex": "The Grand Canyon is a famous natural wonder.",
        "trVi": "Grand Canyon là một kỳ quan thiên nhiên nổi tiếng.",
        "trAnswer": "The Grand Canyon is a famous natural wonder.",
        "trKey": "natural wonder"
      },
      {
        "en": "Located",
        "ipa": "/ləʊˈkeɪtɪd/",
        "vi": "Nằm ở, tọa lạc",
        "img": "https://img.invalid/located.jpg",
        "ex": "The waterfall is located deep in the jungle.",
        "trVi": "Thác nước nằm sâu trong rừng rậm.",
        "trAnswer": "The waterfall is located deep in the jungle.",
        "trKey": "located"
      },
      {
        "en": "Diversity",
        "ipa": "/daɪˈvɜːsəti/",
        "vi": "Sự đa dạng",
        "img": "https://img.invalid/diversity.jpg",
        "ex": "The rainforest is known for its biological diversity.",
        "trVi": "Rừng nhiệt đới nổi tiếng với sự đa dạng sinh học.",
        "trAnswer": "The rainforest is known for its biological diversity.",
        "trKey": "diversity"
      },
      {
        "en": "Discover",
        "ipa": "/dɪˈskʌvər/",
        "vi": "Khám phá",
        "img": "https://img.invalid/discover.jpg",
        "ex": "Explorers discovered the hidden cave a century ago.",
        "trVi": "Các nhà thám hiểm đã khám phá ra hang động ẩn giấu này một thế kỷ trước.",
        "trAnswer": "Explorers discovered the hidden cave a century ago.",
        "trKey": "discover"
      },
      {
        "en": "Explore",
        "ipa": "/ɪkˈsplɔːr/",
        "vi": "Khám phá, thám hiểm",
        "img": "https://img.invalid/explore.jpg",
        "ex": "We explored the limestone caves with a local guide.",
        "trVi": "Chúng tôi đã khám phá các hang đá vôi cùng một hướng dẫn viên địa phương.",
        "trAnswer": "We explored the limestone caves with a local guide.",
        "trKey": "explore"
      },
      {
        "en": "Possess",
        "ipa": "/pəˈzes/",
        "vi": "Sở hữu",
        "img": "https://img.invalid/possess.jpg",
        "ex": "This island possesses some of the clearest water in the world.",
        "trVi": "Hòn đảo này sở hữu một trong những vùng nước trong xanh nhất thế giới.",
        "trAnswer": "This island possesses some of the clearest water in the world.",
        "trKey": "possess"
      },
      {
        "en": "Admire",
        "ipa": "/ədˈmaɪər/",
        "vi": "Ngưỡng mộ",
        "img": "https://img.invalid/admire.jpg",
        "ex": "Visitors admire the mountain's beauty every morning.",
        "trVi": "Du khách ngưỡng mộ vẻ đẹp của ngọn núi mỗi sáng.",
        "trAnswer": "Visitors admire the mountain's beauty every morning.",
        "trKey": "admire"
      },
      {
        "en": "Paradise",
        "ipa": "/ˈpærədaɪs/",
        "vi": "Thiên đường",
        "img": "https://img.invalid/paradise.jpg",
        "ex": "The beach looked like paradise, with white sand and blue water.",
        "trVi": "Bãi biển trông như thiên đường, với cát trắng và nước xanh.",
        "trAnswer": "The beach looked like paradise, with white sand and blue water.",
        "trKey": "paradise"
      },
      {
        "en": "Hesitation",
        "ipa": "/ˌhezɪˈteɪʃn/",
        "vi": "Sự do dự",
        "img": "https://img.invalid/hesitation.jpg",
        "ex": "Without hesitation, she jumped into the cool lake.",
        "trVi": "Không chút do dự, cô ấy nhảy xuống hồ nước mát lạnh.",
        "trAnswer": "Without hesitation, she jumped into the cool lake.",
        "trKey": "hesitation"
      },
      {
        "en": "Permit",
        "ipa": "/pəˈmɪt/",
        "vi": "Giấy phép; cho phép",
        "img": "https://img.invalid/permit.jpg",
        "ex": "You need a permit to enter the national park.",
        "trVi": "Bạn cần giấy phép để vào công viên quốc gia.",
        "trAnswer": "You need a permit to enter the national park.",
        "trKey": "permit"
      },
      {
        "en": "Urgent",
        "ipa": "/ˈɜːdʒənt/",
        "vi": "Khẩn cấp",
        "img": "https://img.invalid/urgent.jpg",
        "ex": "Protecting the coral reef is an urgent task.",
        "trVi": "Bảo vệ rạn san hô là một nhiệm vụ khẩn cấp.",
        "trAnswer": "Protecting the coral reef is an urgent task.",
        "trKey": "urgent"
      },
      {
        "en": "Landscape",
        "ipa": "/ˈlændskeɪp/",
        "vi": "Cảnh quan",
        "img": "https://img.invalid/landscape.jpg",
        "ex": "The mountain landscape looks magical at sunrise.",
        "trVi": "Cảnh quan núi non trông thật kỳ diệu lúc bình minh.",
        "trAnswer": "The mountain landscape looks magical at sunrise.",
        "trKey": "landscape"
      }
    ],
    "story": {
      "title": "Lan's Trip to Ha Long Bay",
      "titleVi": "Chuyến đi Hạ Long của Lan",
      "text": "Lan travelled to Ha Long Bay, a natural wonder located in the north of Vietnam. She could not stop admiring the thousands of limestone islands rising from the sea.<br><br>Her guide said the bay possesses an amazing diversity of sea life. Without any hesitation, Lan decided to explore a hidden cave by boat.<br><br>She said the whole trip felt like paradise, and she hoped that everyone would help protect this landscape for the future.",
      "textVi": "Lan đã đi du lịch đến Vịnh Hạ Long, một kỳ quan thiên nhiên nằm ở miền Bắc Việt Nam. Cô không thể ngừng ngưỡng mộ hàng ngàn hòn đảo đá vôi nhô lên từ mặt biển.<br><br>Hướng dẫn viên nói rằng vịnh sở hữu một sự đa dạng sinh vật biển đáng kinh ngạc. Không chút do dự, Lan quyết định khám phá một hang động ẩn giấu bằng thuyền.<br><br>Cô nói cả chuyến đi giống như một thiên đường, và cô hy vọng mọi người sẽ giúp bảo vệ cảnh quan này cho tương lai.",
      "used": [
        "Located",
        "Admire",
        "Diversity",
        "Hesitation",
        "Explore",
        "Paradise",
        "Landscape"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương and Dung are planning a trip to see a famous <b>natural wonder</b> <b>located</b> deep in the mountains.",
        "keywords": [
          {
            "key": "natural wonder",
            "meaningVi": "Kỳ quan thiên nhiên"
          },
          {
            "key": "located",
            "meaningVi": "Nằm ở, tọa lạc"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "They want to <b>explore</b> and <b>discover</b> the amazing <b>diversity</b> of plants and animals living there.",
        "keywords": [
          {
            "key": "explore",
            "meaningVi": "Khám phá, thám hiểm"
          },
          {
            "key": "discover",
            "meaningVi": "Khám phá"
          },
          {
            "key": "diversity",
            "meaningVi": "Sự đa dạng"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung says the place <b>possesses</b> a beautiful <b>landscape</b>, just like a hidden <b>paradise</b>, and she can't wait to <b>admire</b> it in person.",
        "keywords": [
          {
            "key": "possesses",
            "meaningVi": "Sở hữu"
          },
          {
            "key": "landscape",
            "meaningVi": "Cảnh quan"
          },
          {
            "key": "paradise",
            "meaningVi": "Thiên đường"
          },
          {
            "key": "admire",
            "meaningVi": "Ngưỡng mộ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Without any <b>hesitation</b>, they apply for a travel <b>permit</b>, since visiting during the <b>urgent</b> rainy season would be risky.",
        "keywords": [
          {
            "key": "hesitation",
            "meaningVi": "Sự do dự"
          },
          {
            "key": "permit",
            "meaningVi": "Giấy phép, cho phép"
          },
          {
            "key": "urgent",
            "meaningVi": "Khẩn cấp"
          }
        ]
      }
    ]
  },
  {
    "id": "u8",
    "number": 8,
    "icon": "✈️",
    "title": "TOURISM",
    "titleVi": "Du lịch",
    "words": [
      {
        "en": "Package holiday",
        "ipa": "/ˈpækɪdʒ ˈhɒlədeɪ/",
        "vi": "Kỳ nghỉ trọn gói",
        "img": "https://img.invalid/package-holiday.jpg",
        "ex": "We booked a package holiday to Da Nang for the summer.",
        "trVi": "Chúng tôi đã đặt một kỳ nghỉ trọn gói đến Đà Nẵng cho mùa hè.",
        "trAnswer": "We booked a package holiday to Da Nang for the summer.",
        "trKey": "package holiday"
      },
      {
        "en": "Self-guided tour",
        "ipa": "/ˌself ˈɡaɪdɪd tʊər/",
        "vi": "Tour tự khám phá",
        "img": "https://img.invalid/self-guided-tour.jpg",
        "ex": "A self-guided tour lets you explore the city at your own pace.",
        "trVi": "Một tour tự khám phá cho phép bạn tham quan thành phố theo nhịp độ của riêng mình.",
        "trAnswer": "A self-guided tour lets you explore the city at your own pace.",
        "trKey": "self-guided tour"
      },
      {
        "en": "Itinerary",
        "ipa": "/aɪˈtɪnərəri/",
        "vi": "Lịch trình",
        "img": "https://img.invalid/itinerary.jpg",
        "ex": "Our itinerary includes three days in Hoi An.",
        "trVi": "Lịch trình của chúng tôi bao gồm ba ngày ở Hội An.",
        "trAnswer": "Our itinerary includes three days in Hoi An.",
        "trKey": "itinerary"
      },
      {
        "en": "Homestay",
        "ipa": "/ˈhəʊmsteɪ/",
        "vi": "Ở nhà dân",
        "img": "https://img.invalid/homestay.jpg",
        "ex": "We stayed in a homestay with a local family in Sa Pa.",
        "trVi": "Chúng tôi đã ở nhà dân cùng một gia đình địa phương ở Sa Pa.",
        "trAnswer": "We stayed in a homestay with a local family in Sa Pa.",
        "trKey": "homestay"
      },
      {
        "en": "Entrance ticket",
        "ipa": "/ˈentrəns ˈtɪkɪt/",
        "vi": "Vé vào cửa",
        "img": "https://img.invalid/entrance-ticket.jpg",
        "ex": "Don't forget to keep your entrance ticket for the museum.",
        "trVi": "Đừng quên giữ vé vào cửa bảo tàng của bạn.",
        "trAnswer": "Don't forget to keep your entrance ticket for the museum.",
        "trKey": "entrance ticket"
      },
      {
        "en": "Historic",
        "ipa": "/hɪˈstɒrɪk/",
        "vi": "Có tính lịch sử",
        "img": "https://img.invalid/historic.jpg",
        "ex": "The old town is a historic site that attracts many tourists.",
        "trVi": "Phố cổ là một địa danh lịch sử thu hút nhiều du khách.",
        "trAnswer": "The old town is a historic site that attracts many tourists.",
        "trKey": "historic"
      },
      {
        "en": "Luxurious",
        "ipa": "/lʌɡˈʒʊəriəs/",
        "vi": "Sang trọng",
        "img": "https://img.invalid/luxurious.jpg",
        "ex": "We stayed in a luxurious hotel near the beach.",
        "trVi": "Chúng tôi đã nghỉ tại một khách sạn sang trọng gần biển.",
        "trAnswer": "We stayed in a luxurious hotel near the beach.",
        "trKey": "luxurious"
      },
      {
        "en": "Ambitious",
        "ipa": "/æmˈbɪʃəs/",
        "vi": "Đầy tham vọng",
        "img": "https://img.invalid/ambitious.jpg",
        "ex": "The travel agency has an ambitious plan for eco-tourism.",
        "trVi": "Công ty du lịch có một kế hoạch đầy tham vọng cho du lịch sinh thái.",
        "trAnswer": "The travel agency has an ambitious plan for eco-tourism.",
        "trKey": "ambitious"
      },
      {
        "en": "Curious",
        "ipa": "/ˈkjʊəriəs/",
        "vi": "Tò mò",
        "img": "https://img.invalid/curious.jpg",
        "ex": "The children were curious about the old temple's history.",
        "trVi": "Bọn trẻ tò mò về lịch sử của ngôi đền cổ.",
        "trAnswer": "The children were curious about the old temple's history.",
        "trKey": "curious"
      },
      {
        "en": "Ruinous",
        "ipa": "/ˈruːɪnəs/",
        "vi": "Đổ nát, hư hại",
        "img": "https://img.invalid/ruinous.jpg",
        "ex": "Some parts of the ancient wall are now ruinous.",
        "trVi": "Một số phần của bức tường cổ nay đã đổ nát.",
        "trAnswer": "Some parts of the ancient wall are now ruinous.",
        "trKey": "ruinous"
      },
      {
        "en": "Travel agency",
        "ipa": "/ˈtrævl ˈeɪdʒənsi/",
        "vi": "Đại lý du lịch",
        "img": "https://img.invalid/travel-agency.jpg",
        "ex": "A travel agency organised our whole trip.",
        "trVi": "Một đại lý du lịch đã tổ chức toàn bộ chuyến đi của chúng tôi.",
        "trAnswer": "A travel agency organised our whole trip.",
        "trKey": "travel agency"
      },
      {
        "en": "Domestic tourism",
        "ipa": "/dəˈmestɪk ˈtʊərɪzəm/",
        "vi": "Du lịch nội địa",
        "img": "https://img.invalid/domestic-tourism.jpg",
        "ex": "Domestic tourism has grown quickly in Vietnam.",
        "trVi": "Du lịch nội địa đã phát triển nhanh chóng ở Việt Nam.",
        "trAnswer": "Domestic tourism has grown quickly in Vietnam.",
        "trKey": "domestic tourism"
      }
    ],
    "story": {
      "title": "Planning Our Trip",
      "titleVi": "Lên kế hoạch cho chuyến đi",
      "text": "An's family decided to book a package holiday to Ninh Binh. Their travel agency prepared a detailed itinerary with visits to caves and rice fields.<br><br>Instead of a hotel, they chose a homestay so they could learn about local life. An was curious about the historic temples nearby, even though some old structures looked ruinous after hundreds of years.<br><br>On the last day, they kept their entrance tickets as souvenirs. An said it was more memorable than any luxurious resort.",
      "textVi": "Gia đình An quyết định đặt một kỳ nghỉ trọn gói đến Ninh Bình. Đại lý du lịch của họ đã chuẩn bị một lịch trình chi tiết với các điểm tham quan hang động và cánh đồng lúa.<br><br>Thay vì ở khách sạn, họ chọn ở nhà dân để có thể tìm hiểu về cuộc sống địa phương. An tò mò về những ngôi đền có tính lịch sử gần đó, mặc dù một số công trình cổ nay đã trông đổ nát sau hàng trăm năm.<br><br>Vào ngày cuối cùng, họ giữ lại những chiếc vé vào cửa làm kỷ niệm. An nói rằng chuyến đi này đáng nhớ hơn bất kỳ khu nghỉ dưỡng sang trọng nào.",
      "used": [
        "Package holiday",
        "Itinerary",
        "Homestay",
        "Curious",
        "Historic",
        "Ruinous",
        "Entrance ticket"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dung books a <b>package holiday</b> for their next trip, but Dương prefers a <b>self-guided tour</b> so they can explore freely.",
        "keywords": [
          {
            "key": "package holiday",
            "meaningVi": "Kỳ nghỉ trọn gói"
          },
          {
            "key": "self-guided tour",
            "meaningVi": "Tour tự khám phá"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "They plan a detailed <b>itinerary</b> together and decide to stay at a cosy <b>homestay</b> instead of a hotel.",
        "keywords": [
          {
            "key": "itinerary",
            "meaningVi": "Lịch trình"
          },
          {
            "key": "homestay",
            "meaningVi": "Ở nhà dân"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "At the <b>historic</b> old town, they buy an <b>entrance ticket</b> to see the <b>ruinous</b> ancient walls, which Dung finds fascinating rather than sad.",
        "keywords": [
          {
            "key": "historic",
            "meaningVi": "Có tính lịch sử"
          },
          {
            "key": "entrance ticket",
            "meaningVi": "Vé vào cửa"
          },
          {
            "key": "ruinous",
            "meaningVi": "Đổ nát, hư hại"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương is quite <b>ambitious</b> about visiting a <b>luxurious</b> resort too, while <b>curious</b> Dung prefers asking a local <b>travel agency</b> about cheaper <b>domestic tourism</b> options.",
        "keywords": [
          {
            "key": "ambitious",
            "meaningVi": "Đầy tham vọng"
          },
          {
            "key": "luxurious",
            "meaningVi": "Sang trọng"
          },
          {
            "key": "curious",
            "meaningVi": "Tò mò"
          },
          {
            "key": "travel agency",
            "meaningVi": "Đại lý du lịch"
          },
          {
            "key": "domestic tourism",
            "meaningVi": "Du lịch nội địa"
          }
        ]
      }
    ]
  },
  {
    "id": "u9",
    "number": 9,
    "icon": "🗣️",
    "title": "WORLD ENGLISHES",
    "titleVi": "Tiếng Anh trên thế giới",
    "words": [
      {
        "en": "Variety",
        "ipa": "/vəˈraɪəti/",
        "vi": "Sự đa dạng, biến thể",
        "img": "https://img.invalid/variety.jpg",
        "ex": "There are many varieties of English spoken around the world.",
        "trVi": "Có rất nhiều biến thể tiếng Anh được nói trên khắp thế giới.",
        "trAnswer": "There are many varieties of English spoken around the world.",
        "trKey": "variety"
      },
      {
        "en": "Bilingual",
        "ipa": "/ˌbaɪˈlɪŋɡwəl/",
        "vi": "Song ngữ",
        "img": "https://img.invalid/bilingual.jpg",
        "ex": "My cousin is bilingual; she speaks Vietnamese and English fluently.",
        "trVi": "Chị họ tôi song ngữ; chị ấy nói tiếng Việt và tiếng Anh trôi chảy.",
        "trAnswer": "My cousin is bilingual; she speaks Vietnamese and English fluently.",
        "trKey": "bilingual"
      },
      {
        "en": "Fluent",
        "ipa": "/ˈfluːənt/",
        "vi": "Trôi chảy, thành thạo",
        "img": "https://img.invalid/fluent.jpg",
        "ex": "After two years abroad, he became fluent in English.",
        "trVi": "Sau hai năm ở nước ngoài, anh ấy đã trở nên thành thạo tiếng Anh.",
        "trAnswer": "After two years abroad, he became fluent in English.",
        "trKey": "fluent"
      },
      {
        "en": "Official language",
        "ipa": "/əˈfɪʃl ˈlæŋɡwɪdʒ/",
        "vi": "Ngôn ngữ chính thức",
        "img": "https://img.invalid/official-language.jpg",
        "ex": "English is the official language of Singapore's schools.",
        "trVi": "Tiếng Anh là ngôn ngữ chính thức trong trường học ở Singapore.",
        "trAnswer": "English is the official language of Singapore's schools.",
        "trKey": "official language"
      },
      {
        "en": "Translate",
        "ipa": "/trænsˈleɪt/",
        "vi": "Dịch",
        "img": "https://img.invalid/translate.jpg",
        "ex": "Can you translate this sentence into Vietnamese?",
        "trVi": "Bạn có thể dịch câu này sang tiếng Việt không?",
        "trAnswer": "Can you translate this sentence into Vietnamese?",
        "trKey": "translate"
      },
      {
        "en": "Look up",
        "ipa": "/lʊk ʌp/",
        "vi": "Tra cứu",
        "img": "https://img.invalid/look-up.jpg",
        "ex": "I always look up new words in a dictionary.",
        "trVi": "Tôi luôn tra cứu từ mới trong từ điển.",
        "trAnswer": "I always look up new words in a dictionary.",
        "trKey": "look up"
      },
      {
        "en": "Borrow",
        "ipa": "/ˈbɒrəʊ/",
        "vi": "Vay mượn",
        "img": "https://img.invalid/borrow.jpg",
        "ex": "English has borrowed many words from other languages.",
        "trVi": "Tiếng Anh đã vay mượn nhiều từ từ các ngôn ngữ khác.",
        "trAnswer": "English has borrowed many words from other languages.",
        "trKey": "borrow"
      },
      {
        "en": "Pick up",
        "ipa": "/pɪk ʌp/",
        "vi": "Học được (một cách tự nhiên)",
        "img": "https://img.invalid/pick-up.jpg",
        "ex": "She picked up some French while travelling in Paris.",
        "trVi": "Cô ấy đã học được một chút tiếng Pháp khi đi du lịch ở Paris.",
        "trAnswer": "She picked up some French while travelling in Paris.",
        "trKey": "pick up"
      },
      {
        "en": "Accent",
        "ipa": "/ˈæksent/",
        "vi": "Giọng nói, trọng âm",
        "img": "https://img.invalid/accent.jpg",
        "ex": "He speaks English with a strong accent.",
        "trVi": "Anh ấy nói tiếng Anh với một giọng rất đặc trưng.",
        "trAnswer": "He speaks English with a strong accent.",
        "trKey": "accent"
      },
      {
        "en": "Vocabulary",
        "ipa": "/vəˈkæbjələri/",
        "vi": "Vốn từ vựng",
        "img": "https://img.invalid/vocabulary.jpg",
        "ex": "Reading books helps you build a wide vocabulary.",
        "trVi": "Đọc sách giúp bạn xây dựng vốn từ vựng phong phú.",
        "trAnswer": "Reading books helps you build a wide vocabulary.",
        "trKey": "vocabulary"
      },
      {
        "en": "Native speaker",
        "ipa": "/ˈneɪtɪv ˈspiːkər/",
        "vi": "Người bản ngữ",
        "img": "https://img.invalid/native-speaker.jpg",
        "ex": "I practise speaking with a native speaker every week.",
        "trVi": "Tôi luyện nói cùng một người bản ngữ mỗi tuần.",
        "trAnswer": "I practise speaking with a native speaker every week.",
        "trKey": "native speaker"
      },
      {
        "en": "Revision",
        "ipa": "/rɪˈvɪʒn/",
        "vi": "Ôn tập",
        "img": "https://img.invalid/revision.jpg",
        "ex": "We did a grammar revision before the English test.",
        "trVi": "Chúng tôi đã ôn tập ngữ pháp trước bài kiểm tra tiếng Anh.",
        "trAnswer": "We did a grammar revision before the English test.",
        "trKey": "revision"
      }
    ],
    "story": {
      "title": "Jack the Exchange Student",
      "titleVi": "Jack, cậu học sinh trao đổi",
      "text": "Jack is a new exchange student from New York. He is bilingual because his mother is Vietnamese, so he can speak both languages fluently.<br><br>In class, Jack explained that English is now an official language in many countries and has many varieties around the world. He also said that English has borrowed thousands of words from other languages.<br><br>Mi decided to look up some of these borrowed words after class. She hoped that one day she could speak English as fluently as Jack.",
      "textVi": "Jack là một học sinh trao đổi mới đến từ New York. Cậu song ngữ vì mẹ cậu là người Việt Nam, nên cậu có thể nói cả hai thứ tiếng một cách trôi chảy.<br><br>Trong lớp, Jack giải thích rằng tiếng Anh hiện là ngôn ngữ chính thức ở nhiều quốc gia và có nhiều biến thể khác nhau trên thế giới. Cậu cũng nói rằng tiếng Anh đã vay mượn hàng nghìn từ từ các ngôn ngữ khác.<br><br>Mi quyết định tra cứu một số từ vay mượn này sau giờ học. Cô hy vọng một ngày nào đó mình có thể nói tiếng Anh trôi chảy như Jack.",
      "used": [
        "Bilingual",
        "Fluent",
        "Official language",
        "Variety",
        "Borrow",
        "Look up"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dung is proud that she is <b>bilingual</b> and speaks English quite <b>fluently</b> now. \"There are so many <b>varieties</b> of English around the world,\" she tells Dương.",
        "keywords": [
          {
            "key": "bilingual",
            "meaningVi": "Song ngữ"
          },
          {
            "key": "fluently",
            "meaningVi": "Trôi chảy, thành thạo"
          },
          {
            "key": "varieties",
            "meaningVi": "Sự đa dạng, biến thể"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "In Singapore, English is an <b>official language</b>, so Dương wonders how people <b>translate</b> ideas between languages so easily there.",
        "keywords": [
          {
            "key": "official language",
            "meaningVi": "Ngôn ngữ chính thức"
          },
          {
            "key": "translate",
            "meaningVi": "Dịch"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "When Dung doesn't understand a word, she likes to <b>look up</b> its meaning, and she often <b>picks up</b> new words just by watching English videos, or asks a <b>native speaker</b> for help.",
        "keywords": [
          {
            "key": "look up",
            "meaningVi": "Tra cứu"
          },
          {
            "key": "picks up",
            "meaningVi": "Học được (một cách tự nhiên)"
          },
          {
            "key": "native speaker",
            "meaningVi": "Người bản ngữ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương notices that every country has its own <b>accent</b>, and Vietnamese has even <b>borrowed</b> some English <b>vocabulary</b>. Before their test, they agree to do some <b>revision</b> together tonight.",
        "keywords": [
          {
            "key": "accent",
            "meaningVi": "Giọng nói, trọng âm"
          },
          {
            "key": "borrowed",
            "meaningVi": "Vay mượn"
          },
          {
            "key": "vocabulary",
            "meaningVi": "Vốn từ vựng"
          },
          {
            "key": "revision",
            "meaningVi": "Ôn tập"
          }
        ]
      }
    ]
  },
  {
    "id": "u10",
    "number": 10,
    "icon": "🌍",
    "title": "PLANET EARTH",
    "titleVi": "Hành tinh Trái Đất",
    "words": [
      {
        "en": "Habitat",
        "ipa": "/ˈhæbɪtæt/",
        "vi": "Môi trường sống",
        "img": "https://img.invalid/habitat.jpg",
        "ex": "Rainforests are the habitat of millions of species.",
        "trVi": "Rừng nhiệt đới là môi trường sống của hàng triệu loài sinh vật.",
        "trAnswer": "Rainforests are the habitat of millions of species.",
        "trKey": "habitat"
      },
      {
        "en": "Flora and fauna",
        "ipa": "/ˈflɔːrə ənd ˈfɔːnə/",
        "vi": "Hệ thực vật và động vật",
        "img": "https://img.invalid/flora-and-fauna.jpg",
        "ex": "The national park protects the local flora and fauna.",
        "trVi": "Công viên quốc gia bảo vệ hệ thực vật và động vật địa phương.",
        "trAnswer": "The national park protects the local flora and fauna.",
        "trKey": "flora and fauna"
      },
      {
        "en": "Grassland",
        "ipa": "/ˈɡrɑːslænd/",
        "vi": "Đồng cỏ",
        "img": "https://img.invalid/grassland.jpg",
        "ex": "Zebras and lions live on the African grassland.",
        "trVi": "Ngựa vằn và sư tử sống trên đồng cỏ châu Phi.",
        "trAnswer": "Zebras and lions live on the African grassland.",
        "trKey": "grassland"
      },
      {
        "en": "Nature reserve",
        "ipa": "/ˈneɪtʃər rɪˈzɜːv/",
        "vi": "Khu bảo tồn thiên nhiên",
        "img": "https://img.invalid/nature-reserve.jpg",
        "ex": "The nature reserve is home to many rare birds.",
        "trVi": "Khu bảo tồn thiên nhiên là nơi sinh sống của nhiều loài chim quý hiếm.",
        "trAnswer": "The nature reserve is home to many rare birds.",
        "trKey": "nature reserve"
      },
      {
        "en": "Food chain",
        "ipa": "/fuːd tʃeɪn/",
        "vi": "Chuỗi thức ăn",
        "img": "https://img.invalid/food-chain.jpg",
        "ex": "Small fish are an important part of the ocean's food chain.",
        "trVi": "Cá nhỏ là một phần quan trọng của chuỗi thức ăn đại dương.",
        "trAnswer": "Small fish are an important part of the ocean's food chain.",
        "trKey": "food chain"
      },
      {
        "en": "Pole",
        "ipa": "/pəʊl/",
        "vi": "Địa cực",
        "img": "https://img.invalid/pole.jpg",
        "ex": "Polar bears live near the North Pole.",
        "trVi": "Gấu Bắc Cực sống gần Cực Bắc.",
        "trAnswer": "Polar bears live near the North Pole.",
        "trKey": "pole"
      },
      {
        "en": "Habitat loss",
        "ipa": "/ˈhæbɪtæt lɒs/",
        "vi": "Mất môi trường sống",
        "img": "https://img.invalid/habitat-loss.jpg",
        "ex": "Habitat loss is one of the biggest threats to wildlife.",
        "trVi": "Mất môi trường sống là một trong những mối đe dọa lớn nhất đối với động vật hoang dã.",
        "trAnswer": "Habitat loss is one of the biggest threats to wildlife.",
        "trKey": "habitat loss"
      },
      {
        "en": "Global warming",
        "ipa": "/ˌɡləʊbl ˈwɔːmɪŋ/",
        "vi": "Nóng lên toàn cầu",
        "img": "https://img.invalid/global-warming.jpg",
        "ex": "Global warming is causing ice at the poles to melt.",
        "trVi": "Nóng lên toàn cầu đang khiến băng ở các cực tan chảy.",
        "trAnswer": "Global warming is causing ice at the poles to melt.",
        "trKey": "global warming"
      },
      {
        "en": "Ecological balance",
        "ipa": "/ˌiːkəˈlɒdʒɪkl ˈbæləns/",
        "vi": "Cân bằng sinh thái",
        "img": "https://img.invalid/ecological-balance.jpg",
        "ex": "Planting trees helps to keep ecological balance.",
        "trVi": "Trồng cây giúp duy trì cân bằng sinh thái.",
        "trAnswer": "Planting trees helps to keep ecological balance.",
        "trKey": "ecological balance"
      },
      {
        "en": "Endangered species",
        "ipa": "/ɪnˈdeɪndʒəd ˈspiːʃiːz/",
        "vi": "Loài có nguy cơ tuyệt chủng",
        "img": "https://img.invalid/endangered-species.jpg",
        "ex": "Tigers are an endangered species in the wild.",
        "trVi": "Hổ là một loài có nguy cơ tuyệt chủng trong tự nhiên.",
        "trAnswer": "Tigers are an endangered species in the wild.",
        "trKey": "endangered species"
      },
      {
        "en": "Rainforest",
        "ipa": "/ˈreɪnfɒrɪst/",
        "vi": "Rừng nhiệt đới mưa",
        "img": "https://img.invalid/rainforest.jpg",
        "ex": "The Amazon rainforest produces a lot of the world's oxygen.",
        "trVi": "Rừng nhiệt đới Amazon tạo ra một lượng lớn oxy của thế giới.",
        "trAnswer": "The Amazon rainforest produces a lot of the world's oxygen.",
        "trKey": "rainforest"
      },
      {
        "en": "Ecosystem",
        "ipa": "/ˈiːkəʊsɪstəm/",
        "vi": "Hệ sinh thái",
        "img": "https://img.invalid/ecosystem.jpg",
        "ex": "Coral reefs are a rich and colourful ecosystem.",
        "trVi": "Rạn san hô là một hệ sinh thái phong phú và đầy màu sắc.",
        "trAnswer": "Coral reefs are a rich and colourful ecosystem.",
        "trKey": "ecosystem"
      }
    ],
    "story": {
      "title": "A Trip to the Nature Reserve",
      "titleVi": "Chuyến đi đến khu bảo tồn thiên nhiên",
      "text": "Nick's science club visited a nature reserve to study local flora and fauna. Their teacher explained how every habitat depends on a delicate food chain.<br><br>She warned that habitat loss and global warming are now the biggest threats to many endangered species. If people are not careful, the ecological balance of the whole ecosystem could be destroyed.<br><br>After the trip, Nick's club decided to plant more trees at school to help protect the environment, one small step at a time.",
      "textVi": "Câu lạc bộ khoa học của Nick đã đến thăm một khu bảo tồn thiên nhiên để tìm hiểu về hệ thực vật và động vật địa phương. Cô giáo giải thích rằng mỗi môi trường sống đều phụ thuộc vào một chuỗi thức ăn mong manh.<br><br>Cô cảnh báo rằng mất môi trường sống và nóng lên toàn cầu hiện là những mối đe dọa lớn nhất đối với nhiều loài có nguy cơ tuyệt chủng. Nếu con người không cẩn thận, cân bằng sinh thái của cả hệ sinh thái có thể bị phá hủy.<br><br>Sau chuyến đi, câu lạc bộ của Nick quyết định trồng thêm cây ở trường để giúp bảo vệ môi trường, từng bước nhỏ một.",
      "used": [
        "Nature reserve",
        "Flora and fauna",
        "Habitat",
        "Food chain",
        "Habitat loss",
        "Global warming",
        "Endangered species",
        "Ecological balance",
        "Ecosystem"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "In biology class, Dương and Dung learn about different <b>habitats</b> on Earth, from icy <b>poles</b> to warm <b>grasslands</b>.",
        "keywords": [
          {
            "key": "habitats",
            "meaningVi": "Môi trường sống"
          },
          {
            "key": "poles",
            "meaningVi": "Địa cực"
          },
          {
            "key": "grasslands",
            "meaningVi": "Đồng cỏ"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "The teacher shows a video of a <b>nature reserve</b> that protects rich <b>flora and fauna</b> in a tropical <b>rainforest</b>.",
        "keywords": [
          {
            "key": "nature reserve",
            "meaningVi": "Khu bảo tồn thiên nhiên"
          },
          {
            "key": "flora and fauna",
            "meaningVi": "Hệ thực vật và động vật"
          },
          {
            "key": "rainforest",
            "meaningVi": "Rừng nhiệt đới mưa"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "She explains how the <b>food chain</b> keeps the <b>ecosystem</b> balanced, but <b>global warming</b> is now threatening this <b>ecological balance</b>.",
        "keywords": [
          {
            "key": "food chain",
            "meaningVi": "Chuỗi thức ăn"
          },
          {
            "key": "ecosystem",
            "meaningVi": "Hệ sinh thái"
          },
          {
            "key": "global warming",
            "meaningVi": "Nóng lên toàn cầu"
          },
          {
            "key": "ecological balance",
            "meaningVi": "Cân bằng sinh thái"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "As a result, more <b>endangered species</b> are suffering from <b>habitat loss</b> every year, which worries both Dương and Dung deeply.",
        "keywords": [
          {
            "key": "endangered species",
            "meaningVi": "Loài có nguy cơ tuyệt chủng"
          },
          {
            "key": "habitat loss",
            "meaningVi": "Mất môi trường sống"
          }
        ]
      }
    ]
  },
  {
    "id": "u11",
    "number": 11,
    "icon": "📱",
    "title": "ELECTRONIC DEVICES",
    "titleVi": "Thiết bị điện tử",
    "words": [
      {
        "en": "Smartwatch",
        "ipa": "/ˈsmɑːtwɒtʃ/",
        "vi": "Đồng hồ thông minh",
        "img": "https://img.invalid/smartwatch.jpg",
        "ex": "My smartwatch can count my steps and check my heart rate.",
        "trVi": "Đồng hồ thông minh của tôi có thể đếm bước chân và kiểm tra nhịp tim.",
        "trAnswer": "My smartwatch can count my steps and check my heart rate.",
        "trKey": "smartwatch"
      },
      {
        "en": "E-reader",
        "ipa": "/ˈiː ˌriːdər/",
        "vi": "Máy đọc sách điện tử",
        "img": "https://img.invalid/e-reader.jpg",
        "ex": "I keep hundreds of books on my e-reader.",
        "trVi": "Tôi lưu hàng trăm cuốn sách trên máy đọc sách điện tử của mình.",
        "trAnswer": "I keep hundreds of books on my e-reader.",
        "trKey": "e-reader"
      },
      {
        "en": "Robotic vacuum cleaner",
        "ipa": "/rəʊˈbɒtɪk ˈvækjuːm ˈkliːnər/",
        "vi": "Máy hút bụi tự động",
        "img": "https://img.invalid/robotic-vacuum-cleaner.jpg",
        "ex": "The robotic vacuum cleaner cleans the floor while we are at school.",
        "trVi": "Máy hút bụi tự động dọn sàn nhà trong khi chúng tôi đi học.",
        "trAnswer": "The robotic vacuum cleaner cleans the floor while we are at school.",
        "trKey": "robotic vacuum cleaner"
      },
      {
        "en": "3D printer",
        "ipa": "/ˌθriː ˈdiː ˈprɪntər/",
        "vi": "Máy in 3D",
        "img": "https://img.invalid/3d-printer.jpg",
        "ex": "The engineer used a 3D printer to make a model of the bridge.",
        "trVi": "Kỹ sư đã dùng máy in 3D để làm mô hình cây cầu.",
        "trAnswer": "The engineer used a 3D printer to make a model of the bridge.",
        "trKey": "3d printer"
      },
      {
        "en": "Camcorder",
        "ipa": "/ˈkæmkɔːdər/",
        "vi": "Máy quay phim",
        "img": "https://img.invalid/camcorder.jpg",
        "ex": "We used a camcorder to record the school festival.",
        "trVi": "Chúng tôi đã dùng máy quay phim để ghi lại lễ hội của trường.",
        "trAnswer": "We used a camcorder to record the school festival.",
        "trKey": "camcorder"
      },
      {
        "en": "Portable music player",
        "ipa": "/ˈpɔːtəbl ˈmjuːzɪk ˈpleɪər/",
        "vi": "Máy nghe nhạc di động",
        "img": "https://img.invalid/portable-music-player.jpg",
        "ex": "He listens to songs on his portable music player every morning.",
        "trVi": "Cậu ấy nghe nhạc trên máy nghe nhạc di động mỗi buổi sáng.",
        "trAnswer": "He listens to songs on his portable music player every morning.",
        "trKey": "portable music player"
      },
      {
        "en": "Steel",
        "ipa": "/stiːl/",
        "vi": "Thép",
        "img": "https://img.invalid/steel.jpg",
        "ex": "The bridge is made of strong steel.",
        "trVi": "Cây cầu được làm bằng thép chắc chắn.",
        "trAnswer": "The bridge is made of strong steel.",
        "trKey": "steel"
      },
      {
        "en": "Plastic",
        "ipa": "/ˈplæstɪk/",
        "vi": "Nhựa",
        "img": "https://img.invalid/plastic.jpg",
        "ex": "Many electronic devices have a light plastic case.",
        "trVi": "Nhiều thiết bị điện tử có vỏ nhựa nhẹ.",
        "trAnswer": "Many electronic devices have a light plastic case.",
        "trKey": "plastic"
      },
      {
        "en": "Copper",
        "ipa": "/ˈkɒpər/",
        "vi": "Đồng (kim loại)",
        "img": "https://img.invalid/copper.jpg",
        "ex": "Copper wire is used to carry electricity.",
        "trVi": "Dây đồng được dùng để dẫn điện.",
        "trAnswer": "Copper wire is used to carry electricity.",
        "trKey": "copper"
      },
      {
        "en": "Rubber",
        "ipa": "/ˈrʌbər/",
        "vi": "Cao su",
        "img": "https://img.invalid/rubber.jpg",
        "ex": "The tyres of the car are made of rubber.",
        "trVi": "Lốp xe ô tô được làm bằng cao su.",
        "trAnswer": "The tyres of the car are made of rubber.",
        "trKey": "rubber"
      },
      {
        "en": "Cardboard",
        "ipa": "/ˈkɑːdbɔːd/",
        "vi": "Bìa các tông",
        "img": "https://img.invalid/cardboard.jpg",
        "ex": "The new phone came in a small cardboard box.",
        "trVi": "Chiếc điện thoại mới được đựng trong một hộp bìa các tông nhỏ.",
        "trAnswer": "The new phone came in a small cardboard box.",
        "trKey": "cardboard"
      },
      {
        "en": "Device",
        "ipa": "/dɪˈvaɪs/",
        "vi": "Thiết bị",
        "img": "https://img.invalid/device.jpg",
        "ex": "Which electronic device do you use the most?",
        "trVi": "Bạn dùng thiết bị điện tử nào nhiều nhất?",
        "trAnswer": "Which electronic device do you use the most?",
        "trKey": "device"
      }
    ],
    "story": {
      "title": "My Favourite Device",
      "titleVi": "Thiết bị yêu thích của tôi",
      "text": "In an electronic shop, Nam tried out many devices. He liked a smartwatch that could track his exercise and a small e-reader that could store a thousand books.<br><br>The shop assistant explained that most devices use a light plastic case, but some parts inside are made of copper and steel. Nam also saw a 3D printer making a tiny toy robot.<br><br>In the end, Nam chose the e-reader because he loves reading, and it fits easily in his school bag.",
      "textVi": "Trong một cửa hàng điện tử, Nam đã thử nhiều thiết bị. Cậu thích một chiếc đồng hồ thông minh có thể theo dõi việc tập luyện của mình và một chiếc máy đọc sách điện tử nhỏ có thể lưu trữ hàng nghìn cuốn sách.<br><br>Nhân viên cửa hàng giải thích rằng hầu hết các thiết bị đều dùng vỏ nhựa nhẹ, nhưng một số bộ phận bên trong được làm bằng đồng và thép. Nam cũng thấy một chiếc máy in 3D đang tạo ra một con robot đồ chơi nhỏ xíu.<br><br>Cuối cùng, Nam chọn chiếc máy đọc sách điện tử vì cậu yêu thích đọc sách, và nó vừa vặn gọn gàng trong cặp sách của cậu.",
      "used": [
        "Smartwatch",
        "E-reader",
        "Plastic",
        "Copper",
        "Steel",
        "3D printer"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "For his birthday, Dương receives a new <b>smartwatch</b> and an <b>e-reader</b> to enjoy digital books.",
        "keywords": [
          {
            "key": "smartwatch",
            "meaningVi": "Đồng hồ thông minh"
          },
          {
            "key": "e-reader",
            "meaningVi": "Máy đọc sách điện tử"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung's family just bought a <b>robotic vacuum cleaner</b> and a <b>3D printer</b> that can even make small toys at home.",
        "keywords": [
          {
            "key": "robotic vacuum cleaner",
            "meaningVi": "Máy hút bụi tự động"
          },
          {
            "key": "3D printer",
            "meaningVi": "Máy in 3D"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương also has a <b>camcorder</b> and a <b>portable music player</b> he uses every time they go travelling together.",
        "keywords": [
          {
            "key": "camcorder",
            "meaningVi": "Máy quay phim"
          },
          {
            "key": "portable music player",
            "meaningVi": "Máy nghe nhạc di động"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "In technology class, they learn that every <b>device</b> is made from materials like <b>steel</b>, <b>plastic</b>, <b>copper</b>, <b>rubber</b>, and <b>cardboard</b>.",
        "keywords": [
          {
            "key": "device",
            "meaningVi": "Thiết bị"
          },
          {
            "key": "steel",
            "meaningVi": "Thép"
          },
          {
            "key": "plastic",
            "meaningVi": "Nhựa"
          },
          {
            "key": "copper",
            "meaningVi": "Đồng (kim loại)"
          },
          {
            "key": "rubber",
            "meaningVi": "Cao su"
          },
          {
            "key": "cardboard",
            "meaningVi": "Bìa các tông"
          }
        ]
      }
    ]
  },
  {
    "id": "u12",
    "number": 12,
    "icon": "💼",
    "title": "CAREER CHOICES",
    "titleVi": "Lựa chọn nghề nghiệp",
    "words": [
      {
        "en": "Tailor",
        "ipa": "/ˈteɪlər/",
        "vi": "Thợ may",
        "img": "https://img.invalid/tailor.jpg",
        "ex": "The tailor made a beautiful ao dai for the festival.",
        "trVi": "Người thợ may đã may một chiếc áo dài đẹp cho lễ hội.",
        "trAnswer": "The tailor made a beautiful ao dai for the festival.",
        "trKey": "tailor"
      },
      {
        "en": "Surgeon",
        "ipa": "/ˈsɜːdʒən/",
        "vi": "Bác sĩ phẫu thuật",
        "img": "https://img.invalid/surgeon.jpg",
        "ex": "The surgeon worked for six hours during the operation.",
        "trVi": "Bác sĩ phẫu thuật đã làm việc suốt sáu tiếng trong ca mổ.",
        "trAnswer": "The surgeon worked for six hours during the operation.",
        "trKey": "surgeon"
      },
      {
        "en": "Assembly worker",
        "ipa": "/əˈsembli ˈwɜːkər/",
        "vi": "Công nhân lắp ráp",
        "img": "https://img.invalid/assembly-worker.jpg",
        "ex": "An assembly worker puts the parts of a phone together in the factory.",
        "trVi": "Một công nhân lắp ráp ghép các bộ phận của điện thoại lại với nhau trong nhà máy.",
        "trAnswer": "An assembly worker puts the parts of a phone together in the factory.",
        "trKey": "assembly worker"
      },
      {
        "en": "Cashier",
        "ipa": "/kæˈʃɪər/",
        "vi": "Thu ngân",
        "img": "https://img.invalid/cashier.jpg",
        "ex": "The cashier gave me the receipt after I paid.",
        "trVi": "Nhân viên thu ngân đưa cho tôi hóa đơn sau khi tôi thanh toán.",
        "trAnswer": "The cashier gave me the receipt after I paid.",
        "trKey": "cashier"
      },
      {
        "en": "Software engineer",
        "ipa": "/ˈsɒftweər ˌendʒɪˈnɪər/",
        "vi": "Kỹ sư phần mềm",
        "img": "https://img.invalid/software-engineer.jpg",
        "ex": "A software engineer designs computer programmes.",
        "trVi": "Kỹ sư phần mềm thiết kế các chương trình máy tính.",
        "trAnswer": "A software engineer designs computer programmes.",
        "trKey": "software engineer"
      },
      {
        "en": "Demanding",
        "ipa": "/dɪˈmɑːndɪŋ/",
        "vi": "Đòi hỏi cao, vất vả",
        "img": "https://img.invalid/demanding.jpg",
        "ex": "Being a doctor is a demanding job with long hours.",
        "trVi": "Làm bác sĩ là một công việc vất vả với thời gian làm việc dài.",
        "trAnswer": "Being a doctor is a demanding job with long hours.",
        "trKey": "demanding"
      },
      {
        "en": "Repetitive",
        "ipa": "/rɪˈpetətɪv/",
        "vi": "Lặp đi lặp lại",
        "img": "https://img.invalid/repetitive.jpg",
        "ex": "Some factory jobs can be quite repetitive.",
        "trVi": "Một số công việc trong nhà máy khá lặp đi lặp lại.",
        "trAnswer": "Some factory jobs can be quite repetitive.",
        "trKey": "repetitive"
      },
      {
        "en": "Well-paid",
        "ipa": "/ˌwel ˈpeɪd/",
        "vi": "Được trả lương cao",
        "img": "https://img.invalid/well-paid.jpg",
        "ex": "Software engineering is often a well-paid career.",
        "trVi": "Kỹ sư phần mềm thường là một nghề được trả lương cao.",
        "trAnswer": "Software engineering is often a well-paid career.",
        "trKey": "well-paid"
      },
      {
        "en": "Career",
        "ipa": "/kəˈrɪər/",
        "vi": "Sự nghiệp, nghề nghiệp",
        "img": "https://img.invalid/career.jpg",
        "ex": "She hopes to build a career as a fashion designer.",
        "trVi": "Cô ấy hy vọng xây dựng sự nghiệp là một nhà thiết kế thời trang.",
        "trAnswer": "She hopes to build a career as a fashion designer.",
        "trKey": "career"
      },
      {
        "en": "Vocational",
        "ipa": "/vəʊˈkeɪʃənl/",
        "vi": "Thuộc về dạy nghề",
        "img": "https://img.invalid/vocational.jpg",
        "ex": "He took a vocational test to find a suitable job.",
        "trVi": "Anh ấy đã làm một bài kiểm tra hướng nghiệp để tìm công việc phù hợp.",
        "trAnswer": "He took a vocational test to find a suitable job.",
        "trKey": "vocational"
      },
      {
        "en": "Rewarding",
        "ipa": "/rɪˈwɔːdɪŋ/",
        "vi": "Xứng đáng, bổ ích",
        "img": "https://img.invalid/rewarding.jpg",
        "ex": "Teaching can be a very rewarding career.",
        "trVi": "Dạy học có thể là một nghề nghiệp rất bổ ích.",
        "trAnswer": "Teaching can be a very rewarding career.",
        "trKey": "rewarding"
      },
      {
        "en": "Apply for",
        "ipa": "/əˈplaɪ fɔːr/",
        "vi": "Xin (việc)",
        "img": "https://img.invalid/apply-for.jpg",
        "ex": "My brother applied for a job at a software company.",
        "trVi": "Anh trai tôi đã xin việc tại một công ty phần mềm.",
        "trAnswer": "My brother applied for a job at a software company.",
        "trKey": "apply for"
      }
    ],
    "story": {
      "title": "Nick's Dream Job",
      "titleVi": "Công việc mơ ước của Nick",
      "text": "At the career orientation session, Mi learned about many different careers, such as surgeon, tailor, and software engineer.<br><br>Nick told her that he wants to apply for a place at a fashion design school. His art teacher says he has a good sense of style. Nick knows that being a fashion designer can be demanding and sometimes repetitive at first, but he believes it will be rewarding in the end.<br><br>Mi smiled and told Nick that whatever career he chooses, she hopes it will be well-paid and, most importantly, make him happy.",
      "textVi": "Tại buổi hướng nghiệp, Mi đã tìm hiểu về nhiều nghề nghiệp khác nhau, như bác sĩ phẫu thuật, thợ may và kỹ sư phần mềm.<br><br>Nick nói với cô rằng cậu muốn xin học tại một trường thiết kế thời trang. Giáo viên mỹ thuật của cậu nói rằng cậu có gu thẩm mỹ tốt. Nick biết rằng làm nhà thiết kế thời trang có thể vất vả và đôi khi lặp đi lặp lại lúc đầu, nhưng cậu tin rằng cuối cùng nó sẽ rất bổ ích.<br><br>Mi mỉm cười và nói với Nick rằng dù cậu chọn nghề nghiệp nào, cô cũng hy vọng nó sẽ được trả lương cao và, quan trọng nhất, khiến cậu hạnh phúc.",
      "used": [
        "Career",
        "Software engineer",
        "Apply for",
        "Demanding",
        "Repetitive",
        "Rewarding",
        "Well-paid"
      ]
    },
    "storyFrames": [
      {
        "image_url": "",
        "content_html": "Dương and Dung discuss future careers. \"I want to be a <b>software engineer</b>,\" says Dương, \"What about you?\" \"Maybe a <b>surgeon</b>,\" Dung replies.",
        "keywords": [
          {
            "key": "software engineer",
            "meaningVi": "Kỹ sư phần mềm"
          },
          {
            "key": "surgeon",
            "meaningVi": "Bác sĩ phẫu thuật"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "They also think about other jobs, like a <b>tailor</b>, an <b>assembly worker</b>, or a <b>cashier</b> at a shop.",
        "keywords": [
          {
            "key": "tailor",
            "meaningVi": "Thợ may"
          },
          {
            "key": "assembly worker",
            "meaningVi": "Công nhân lắp ráp"
          },
          {
            "key": "cashier",
            "meaningVi": "Thu ngân"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dung says some jobs are quite <b>demanding</b> and <b>repetitive</b>, but usually <b>well-paid</b>, so she wants a <b>career</b> that also makes her happy.",
        "keywords": [
          {
            "key": "demanding",
            "meaningVi": "Đòi hỏi cao, vất vả"
          },
          {
            "key": "repetitive",
            "meaningVi": "Lặp đi lặp lại"
          },
          {
            "key": "well-paid",
            "meaningVi": "Được trả lương cao"
          },
          {
            "key": "career",
            "meaningVi": "Sự nghiệp, nghề nghiệp"
          }
        ]
      },
      {
        "image_url": "",
        "content_html": "Dương decides to take a <b>vocational</b> course after school, believing it will be more <b>rewarding</b>. Dung plans to <b>apply for</b> a scholarship first.",
        "keywords": [
          {
            "key": "vocational",
            "meaningVi": "Thuộc về dạy nghề"
          },
          {
            "key": "rewarding",
            "meaningVi": "Xứng đáng, bổ ích"
          },
          {
            "key": "apply for",
            "meaningVi": "Xin (việc)"
          }
        ]
      }
    ]
  }
];
