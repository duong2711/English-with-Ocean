/* Oci study recommendations – no mascot image or related image payload. */
(function () {
    'use strict';
    if (window.__LDDMascotOci) return;
    window.__LDDMascotOci = true;
    // Three grounded recommendations only: unread news, unplayed podcast, IPA.
    // The dashboard sends minimal authenticated progress via ldd:oci-candidates.
    const IPA = [
        { sounds: ['/ɪ/', '/iː/'], keys: ['i', 'i:'], words: ['live', 'leave'], hint: 'Cùng nghe sự khác nhau giữa âm ngắn và âm dài.' },
        { sounds: ['/ʊ/', '/uː/'], keys: ['u', 'u:'], words: ['put', 'pool'], hint: 'Hai âm này đều tròn môi, nhưng không giống nhau.' },
        { sounds: ['/e/', '/æ/'], keys: ['e', 'æ'], words: ['pen', 'pan'], hint: 'Bạn có mở miệng đủ rộng cho /æ/ không?' },
        { sounds: ['/s/', '/ʃ/'], keys: ['s', 'ʃ'], words: ['see', 'she'], hint: 'Đừng nhầm luồng hơi của hai âm này.' },
        { sounds: ['/θ/', '/ð/'], keys: ['θ', 'ð'], words: ['thin', 'this'], hint: 'Đặt lưỡi đúng vị trí và kiểm tra độ rung.' },
        { sounds: ['/tʃ/', '/dʒ/'], keys: ['tʃ', 'dʒ'], words: ['cheap', 'jeep'], hint: 'Chú ý độ rung của âm hữu thanh.' }
    ];
    // Vietnamese editorial teasers reviewed against the corresponding article text.
    // New articles must have a verified teaser here before Oci can recommend them.
    // Key: article ID; value: [source title, curiosity headline, factual Vietnamese hook].
    const NEWS_TEASERS = Object.freeze({
        71: ["Gen Z and money – level 1","Vì sao Gen Z thấy tiết kiệm tiền ngày càng khó?","Khi thấy hình ảnh người giàu trên mạng xã hội, nhiều bạn trẻ càng áp lực vì sợ mình không đủ tiền mua nhà hoặc lập gia đình."],
        70: ["Questions after a laboratory death in Russia – level 1","Một ca tử vong trong phòng thí nghiệm khiến người ta lo điều gì?","Một ca tử vong chưa rõ nguyên nhân trong phòng thí nghiệm không đồng nghĩa đã có dịch bệnh. Bài báo nhấn mạnh phải chờ kết quả xét nghiệm."],
        69: ["Indonesia’s vice president and school records – level 1","Vụ kiện đã kết thúc, vì sao hồ sơ học tập vẫn gây tranh cãi?","Tòa án Indonesia khép lại vụ kiện vì lý do thủ tục, nhưng quyết định đó chưa giải đáp hết những thắc mắc về hồ sơ học tập được nêu ra."],
        68: ["Lithuania and nuclear weapons – level 1","Vì sao Lithuania tranh luận về vũ khí hạt nhân?","Một số chính trị gia muốn hợp tác quốc phòng chặt chẽ hơn, trong khi những người khác lo thay đổi chính sách có thể làm căng thẳng leo thang."],
        67: ["2026 Chemistry Nobel Prize – level 1","Phân tử giống bàn tay trái và phải thì có gì khác?","Hai dạng phân tử có hình dạng như hai bàn tay đối xứng có thể tác động khác nhau trong cơ thể, điều rất quan trọng khi nghiên cứu thuốc."],
        66: ["Malaysian durians attract more buyers – level 1","Điều gì khiến sầu riêng Malaysia hấp dẫn người mua?","Nhiều nhà vườn để sầu riêng chín ngay trên cây rồi rụng tự nhiên; loại quả chín này thơm ngon nhưng khó bảo quản lâu."],
        65: ["Fake concert tickets in Canada – level 1","Mua vé xem Taylor Swift, vì sao hơn 100 người vỡ mộng?","Một cặp đôi tại Canada bị cáo buộc thu khoảng 265.000 đô la từ việc bán vé giả; hơn 100 người phát hiện mình không có vé hợp lệ."],
        64: ["A village for women in Syria – level 1","Ngôi làng đặc biệt ở Syria được xây cho ai?","Jinwar là cộng đồng nơi phụ nữ và trẻ em có thể sống an toàn hơn, cùng trồng trọt, học nghề và chăm sóc lẫn nhau."],
        63: ["Questions about Starlink in Ukraine – level 1","Khi mạng vệ tinh chậm đi giữa chiến tranh, điều gì xảy ra?","Starlink giúp duy trì liên lạc khi mạng mặt đất gặp sự cố, nhưng một báo cáo cho biết có thời điểm kết nối vệ tinh tại Ukraine lại chậm đi."],
        62: ["No more horses in New York streets – level 1","Vì sao xe ngựa có thể biến mất khỏi đường phố New York?","Lãnh đạo thành phố bỏ phiếu chấm dứt dịch vụ xe ngựa kéo, giữa những lo ngại về giao thông, tiếng ồn và sức khỏe của ngựa."],
        61: ["India’s big river project – level 1","Dự án dẫn nước giúp nông dân, vậy tại sao dân làng lo lắng?","Kế hoạch nối sông Ken và Betwa có thể đưa nước đến vùng khô hạn, nhưng một số nhà cửa, ruộng đất và đền thờ đã bị nước dâng ảnh hưởng."],
        60: ["The business of Roman Abramovich – level 1","Những giấy tờ kinh doanh nào đang bị đặt dấu hỏi?","Một số cố vấn của Roman Abramovich bị nghi đã sửa ngày trên giấy tờ công ty, có thể ảnh hưởng cách ghi nhận tài sản và thuế."],
        59: ["Young people and concussion – level 1","Chấn động não ở trẻ: nằm nghỉ thật lâu có phải tốt nhất?","Sau chấn động não, trẻ em thường không cần nằm nghỉ thật lâu như quan niệm cũ; bác sĩ khuyên nghỉ ngắn rồi trở lại sinh hoạt một cách thận trọng."],
        58: ["A politician is hurt in Australia – level 1","Một chính trị gia Australia bị xe đâm: điều gì đã xảy ra?","Bài báo kể rằng một chiếc xe đâm vào bà Helen Haines trước văn phòng và cảnh sát nghi ngờ tài xế cố ý gây ra vụ việc."],
        57: ["To buy or to rent? – level 1","Mua nhà hay thuê nhà: lựa chọn nào thật sự có lợi?","Ví dụ về hai chị em cho thấy người mua phải tự trả tiền sửa chữa, còn người thuê thường nhờ chủ nhà xử lý hỏng hóc."],
        56: ["Heineken sells less beer – level 1","Vì sao một hãng bia lớn lo doanh số sụt giảm?","Heineken bán bia ở nhiều thị trường, nhưng áp lực kinh tế khiến nhu cầu tại một số quốc gia suy yếu và doanh số không giống nhau ở từng nơi."],
        52: ["A robot makes fries – level 1","Robot có thể tự chiên khoai tây trong nhà hàng không?","Một robot bếp ở California có thể làm khoai tây chiên, hành chiên và các công việc nấu nướng khác nhờ cánh tay máy tính điều khiển."],
        51: ["Israel’s election and Iran – level 1","Xung đột với Iran đang chia rẽ tranh luận bầu cử ra sao?","Bài báo thuật lại các quan điểm khác nhau tại Israel: có người muốn tiếp tục hành động quân sự, người khác nghi ngờ hiệu quả của chiến lược hiện tại."],
        50: ["A religious leader in court – level 1","Vì sao một thủ lĩnh tôn giáo ở Kenya phải ra tòa?","Các điều tra viên cáo buộc một số tín đồ được yêu cầu ngừng ăn vì lý do tôn giáo; vụ án liên quan đến nhiều người tử vong."],
        49: ["Pumpkin festival – level 1","Một quả bí ngô nặng 772 kg trông sẽ ra sao?","Lễ hội gần Brussels trưng bày nhiều loại bí ngô khổng lồ; một quả được giới thiệu nặng khoảng 772 kg."],
        48: ["Kenya and plastics – level 1","Tại sao một chiếc túi nhựa có thể thành vấn đề nhiều năm?","Kenya đã có quy định nghiêm với túi nhựa, nhưng lượng rác ở bãi Dandora vẫn cho thấy đồ nhựa tồn tại rất lâu trong môi trường."],
        47: ["Space elevator – level 1","Đi lên vũ trụ bằng thang máy: ý tưởng có thật không?","Thay vì chỉ dùng tên lửa, các nhà khoa học từng nghiên cứu ý tưởng một sợi cáp rất dài để đưa vật thể từ Trái Đất lên không gian."],
        46: ["Bangladesh is fighting a dangerous disease – level 1","Điều gì khiến dịch sởi ở Bangladesh trở nên nghiêm trọng?","Bài báo cho biết tiêm chủng thường kỳ bị gián đoạn khi xảy ra bất ổn chính trị, khiến nhiều trẻ em không được bảo vệ đầy đủ."],
        45: ["Why does tech cost more? – level 1","Vì sao điện thoại đắt hơn dù chẳng nâng cấp được bao nhiêu?","Các công ty AI mua nhiều chip nhớ cho trung tâm dữ liệu, làm tăng cạnh tranh nguồn linh kiện vốn cũng dùng để sản xuất điện thoại và máy tính."],
        44: ["Farming in Iceland – level 1","Iceland lạnh giá mà vẫn trồng dâu tây dưới lòng đất?","Một dự án trồng dâu dưới đất, trong khi dự án khác tận dụng hơi ấm từ trung tâm dữ liệu để trồng rau trong container."],
        43: ["The best countries to retire – level 1","Quốc gia nào bất ngờ đứng đầu danh sách nơi nghỉ hưu?","Trong bảng xếp hạng nơi nghỉ hưu được bài báo giới thiệu, Uruguay đứng đầu còn Bồ Đào Nha từ vị trí đầu trước đó xuống hạng năm."],
        42: ["Hackers attack French supermarkets – level 1","Tin tặc có thể làm hỏng thực phẩm trong siêu thị thế nào?","Một cuộc tấn công mạng can thiệp hệ thống giữ lạnh tại các siêu thị Pháp, khiến một số thực phẩm không thể tiếp tục bán."],
        41: ["India’s luxury fashion industry – level 1","Một chiếc áo mất 2.000 giờ làm ở Ấn Độ, sao nhãn lại ghi nơi khác?","Bài báo mô tả một chiếc áo được thêu khoảng 2.000 giờ ở Ấn Độ, rồi hoàn thiện chưa tới 100 giờ tại châu Âu."],
        40: ["Are wind turbines safe for birds? – level 1","16 camera theo dõi tua-bin: có bao nhiêu con chim va phải?","Trong một năm quan sát bằng 16 camera, nhóm nghiên cứu xác nhận hai lần chim va chạm với tua-bin gió."],
        39: ["Disney Animal Kingdom – level 1","Vườn thú Disney chuẩn bị bao nhiêu thức ăn mỗi ngày?","Các loài vật tại Animal Kingdom ăn khoảng 4.500 kg thức ăn mỗi ngày, với khoảng 1.500 chế độ ăn khác nhau."],
        38: ["Is the internet dead? – level 1","Internet đang có quá nhiều nội dung do AI tạo ra?","Bot tự động chiếm một phần đáng kể lưu lượng Internet, còn các công cụ AI có thể trả lời ngay mà không cần dẫn người đọc tới trang báo gốc."],
        37: ["French students protest – level 1","Vì sao học sinh và giáo viên Pháp xuống đường phản đối?","Học sinh và giáo viên tại Pháp không chỉ phản đối lớp học quá đông: họ còn nêu tình trạng trường xuống cấp và thiếu giáo viên."],
        36: ["Fluffy the alligator snapping turtle (Level 1)","Một con rùa tên Fluffy xuất hiện ở Anh có gì đáng lo?","Fluffy thuộc loài rùa cá sấu bản địa Bắc Mỹ, có hàm rất khỏe và được chuyên gia cứu hộ đưa đến bác sĩ thú y."],
        35: ["FIFA makes people angry (Level 1)","Vì sao một kế hoạch của FIFA khiến nhiều đội bóng phản ứng?","Theo bài báo, một số đội bóng châu Âu từng đe dọa không tham dự World Cup 2030 nếu kế hoạch gây tranh cãi của FIFA tiếp tục."],
        34: ["World’s biggest gold bar (Level 1)","Thỏi vàng nặng hơn nửa tấn có giá bao nhiêu?","Một xưởng đúc tiền tại Australia làm thỏi vàng hơn 520 kg, được định giá trên 100 triệu USD trong bài báo."],
        33: ["Crabs wear plastic shells (Level 1)","Vì sao cua ẩn sĩ lại chọn nắp chai nhựa làm nhà?","Các nhà nghiên cứu phát hiện nhiều ảnh cua ẩn sĩ dùng vật thể nhân tạo, kể cả nắp chai nhựa, thay cho vỏ ốc tự nhiên."],
        32: ["European children are not strong anymore (Level 1)","Trẻ em châu Âu ngày nay có yếu hơn thế hệ trước?","Nghiên cứu trên hơn 417.000 trẻ ở 20 quốc gia ghi nhận sức cơ và độ dẻo dai giảm ở nhiều nhóm trẻ."],
        31: ["Why New Year’s resolutions don’t work (Level 1)","Vì sao lời hứa đầu năm thường thất bại rất nhanh?","Một lý do phổ biến là mục tiêu quá lớn hoặc mơ hồ; bài báo gợi ý đặt mục tiêu cụ thể và có thể đo lường."],
        30: ["Madona’s home (Level 1)","Trong nhà Madonna có món đồ nào gắn với gia đình?","Trong nhà Madonna không chỉ có tranh của Frida Kahlo mà còn có chiếc chăn do chính con gái bà làm trong thời kỳ dịch COVID."],
        29: ["Egypt’s pyramid restoration (Level 1)","Có nên gắn lại đá granite lên một kim tự tháp cổ?","Kế hoạch trùng tu kim tự tháp Menkaure gây tranh luận: người ủng hộ muốn tái hiện diện mạo xưa, còn một số chuyên gia lo tác động lên di tích."],
        28: ["Saving the Panama Canal (Level 1)","Một con kênh nổi tiếng có thể gặp khó chỉ vì thiếu mưa?","Kênh đào Panama cần nước ngọt để vận hành; khi mực nước thấp, tàu lớn có thể phải giảm hàng hoặc chờ lâu hơn."],
        27: ["People in Iceland say NO to the EU – level 1","Vì sao 52,5% cử tri Iceland nói không với EU?","Theo bài báo, nhiều người muốn giữ quyền tự chủ và bảo vệ nguồn cá cùng vùng biển của Iceland."],
        25: ["US pension system gets a bad rating – level 1","Vì sao hệ thống hưu trí Mỹ chỉ được điểm C+?","Bài báo chỉ ra hai vấn đề: không phải ai cũng tham gia kế hoạch hưu trí và nhiều người rút tiền tiết kiệm quá sớm."],
        24: ["Meta must pay and change its apps – level 1","Các ứng dụng mạng xã hội của Meta đang bị yêu cầu thay đổi gì?","Bài báo thuật lại tranh chấp tại Mỹ về tác động của Facebook và Instagram tới trẻ em, cùng những biện pháp giới hạn việc sử dụng ứng dụng."],
        22: ["World Humanoid Games – level 1","Robot hình người thi đấu thể thao sẽ trông như thế nào?","Các đội từ 16 quốc gia tham gia sự kiện ở Bắc Kinh, cho robot thử chạy, đá bóng, nhảy và đấu đối kháng."],
        21: ["Why people stutter – level 1","Vì sao có người bị nói lắp, và ai có thể gặp tình trạng này?","Theo bài báo, có những người lặp lại từ hoặc khó bắt đầu câu nói; nói lắp có thể xuất hiện ở cả trẻ em và người lớn."],
        20: ["How old is the Moon? (Level 1)","Một mẩu đá bé xíu có thể tiết lộ tuổi Mặt Trăng?","Các nhà khoa học nghiên cứu khoáng chất zircon trong đá Mặt Trăng do phi hành gia Apollo 17 mang về để ước tính tuổi của nó."],
        19: ["Scam centers – level 1","Bên trong các trung tâm lừa đảo trực tuyến có gì?","Không phải ai làm việc ở đó cũng tự nguyện; bài báo kể về những người bị giữ lại và ép tham gia lừa đảo."],
        18: ["Indonesia has too much waste – level 1","Một núi rác cao như tòa nhà có thể nguy hiểm thế nào?","Gần Jakarta có bãi rác rất lớn; bài báo kể về vụ rác đổ sập gây chết người và kế hoạch xử lý rác an toàn hơn."],
        17: ["Bubble tea may not be healthy – level 1","Trà sữa trân châu ngon nhưng điều gì khiến bác sĩ lo ngại?","Bài báo nhấn mạnh lượng đường cao trong nhiều đồ uống kiểu này có thể ảnh hưởng sức khỏe khi dùng quá thường xuyên."],
        16: ["US teenagers do not sleep enough – level 1","Vì sao 6 giờ sáng có thể quá sớm với tuổi teen?","Nhịp sinh học thay đổi khiến nhiều thanh thiếu niên buồn ngủ muộn hơn, trong khi trường học lại bắt đầu từ rất sớm."],
        15: ["People like music and nature festivals – level 1","Lễ hội nào kết hợp âm nhạc, yoga và thiên nhiên?","Medicine Festival ở Anh thu hút hơn 10.000 người tham gia các hoạt động như yoga, âm nhạc và nghi lễ truyền thống."],
        14: ["Reading changes our brain – level 1","Chỉ cần học đọc, bộ não của chúng ta thay đổi ra sao?","Việc đọc kết hợp hoạt động nhìn, nghe, nói và tập trung; các hệ chữ viết có thể huy động những cách xử lý khác nhau trong não."],
        13: ["The future of a steak","Protein làm từ vi sinh vật có thể được tạo ra trong một ngày?","Một công ty dùng sinh vật cực nhỏ trong hệ thống nuôi cấy kín và cho biết có thể tạo protein chỉ sau một ngày."],
        12: ["Too much electronic waste","Bạn đang giữ bao nhiêu món đồ điện tử không dùng đến?","Một báo cáo được bài viết nhắc tới cho biết số thiết bị điện tử bỏ không trung bình tăng từ khoảng 20 lên 30 món."],
        11: ["Dogs help travelers","Vì sao sân bay Istanbul lại có chó hỗ trợ hành khách?","Sân bay đưa chó trị liệu đến giúp những người căng thẳng trước chuyến bay cảm thấy thư giãn hơn."],
        10: ["Why people have hair","Tóc trên đầu chỉ để làm đẹp thôi sao?","Tóc giúp bảo vệ da đầu khỏi tia UV và góp phần điều hòa nhiệt độ khi trời nóng hoặc lạnh."],
        7: ["How Donald Trump makes money","Nguồn thu nào của Donald Trump đang gây chú ý?","Theo bài báo về báo cáo tài chính, các dự án tiền mã hóa mang về hơn 1,4 tỷ USD cho Donald Trump trong năm 2025."],
        2: ["Biodegradable tampons","Có thể làm sản phẩm vệ sinh phân hủy sinh học từ tảo?","Bài báo nói đến việc nghiên cứu sợi từ tảo để thay thế vật liệu nhựa trong một số sản phẩm vệ sinh."]
    });

    const PODCAST_HEADLINES = {
        "1": "Chuyện việc nhà: ai làm gì mới là công bằng?",
        "2": "Một ly cà phê có thể mở đầu bao nhiêu câu chuyện?",
        "3": "Muốn phàn nàn mà vẫn lịch sự: bạn sẽ nói sao?",
        "4": "Nếu được hỏi về du học, bạn sẽ trả lời thế nào?",
        "5": "Bạn có đủ kiên nhẫn trong những tình huống khó chịu?",
        "6": "Vì sao đang đọc sách bạn lại dễ mất tập trung?",
        "7": "Đồ ngọt hấp dẫn đến mức nào: bạn sẽ diễn đạt ra sao?",
        "8": "Chọn nhà riêng hay căn hộ: lý do của bạn là gì?",
        "9": "Chỉ một câu về thể thao liệu có đủ ghi điểm Speaking?",
        "10": "Đến khách sạn sau chuyến đi dài: nên nói gì trước?",
        "11": "Gọi cà phê bằng tiếng Anh sao cho tự nhiên?",
        "12": "Bị lạc ở một thành phố lạ: hỏi đường như thế nào?",
        "13": "Chuyến bay bị hủy: nói gì để được hỗ trợ?",
        "14": "Chuyến thang máy im lặng: làm sao bắt chuyện bớt ngượng?",
        "15": "Có ý tưởng hay trong cuộc họp nhưng không dám nói?"
    };
    const PODCAST_HOOKS = {
        1: 'Công việc nhà tưởng đơn giản, nhưng làm sao trao đổi bằng tiếng Anh cho tự nhiên?',
        2: 'Một cuộc trò chuyện về cà phê: bạn sẽ diễn tả thói quen của mình thế nào?',
        3: 'Không hài lòng về một việc? Thử nghe cách phàn nàn mà vẫn lịch sự.',
        4: 'Nếu được hỏi về chuyện ra nước ngoài trong IELTS Speaking, bạn sẽ trả lời ra sao?',
        5: 'Kiên nhẫn là dễ hay khó? Nghe cách người nói diễn đạt trải nghiệm của mình.',
        6: 'Đang đọc sách mà mất tập trung? Chủ đề rất quen thuộc này cũng là bài luyện IELTS.',
        7: 'Vì sao đồ ngọt hấp dẫn đến thế? Thử trả lời một câu hỏi Speaking về khẩu vị.',
        8: 'Thích nhà riêng hay căn hộ? Khám phá cách trình bày lựa chọn trong phần Speaking.',
        9: 'Nói về môn thể thao yêu thích mà không chỉ trả lời một câu ngắn: thử nghe xem!',
        10: 'Sau một hành trình dài, bạn cần nói gì để nhận phòng khách sạn bằng tiếng Anh?',
        11: 'Vào quán cà phê, gọi đúng thức uống mình muốn bằng tiếng Anh có dễ không?',
        12: 'Nếu bị lạc ở thành phố xa lạ, bạn sẽ hỏi đường như thế nào?',
        13: 'Chuyến bay bị hủy và phải tìm người hỗ trợ: bạn sẽ nói gì tại quầy hãng bay?',
        14: 'Một chuyến đi thang máy im lặng đến ngượng ngùng: bắt chuyện ở nơi làm việc thế nào?',
        15: 'Bạn có ý tưởng hay nhưng lại ngại lên tiếng? Học cách ngắt lời và phản biện lịch sự.'
    };
    const state = { uid:null, articles:[], podcasts:[], turn:0, podcastOffset:0, ipaOffset:0, request:0, current:null };
    let nodes = null;

    function el(tag, cls, text) {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    }
    function short(text, max) {
        const t = String(text || '').replace(/\s+/g, ' ').trim();
        return t.length <= max ? t : t.slice(0,max).replace(/\s+\S*$/, '').trimEnd() + '…';
    }
    function plain(html) {
        if (window.LDDNewsContent && typeof window.LDDNewsContent.toPlainText === 'function') {
            return window.LDDNewsContent.toPlainText(String(html || ''));
        }
        const node = document.createElement('div');
        node.innerHTML = String(html || '');
        node.querySelectorAll('script,style,figure,figcaption,footer,nav').forEach(x => x.remove());
        return String(node.textContent || '').replace(/\s+/g, ' ').trim();
    }
    function verifiedNewsTeaser(row) {
        const teaser = NEWS_TEASERS[String(row?.id)];
        if (!teaser) return null;
        // A changed/replaced article must never inherit a stale teaser from its ID.
        const normalize = value => String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
        return normalize(row.title) === normalize(teaser[0])
            ? { headline: teaser[1], fact: teaser[2] } : null;
    }
    function bookCover(label) {
        const cover = el('div','ldd-oci-illustration');
        const symbol = el('span','ldd-oci-cover-icon',label);
        symbol.setAttribute('aria-hidden','true');
        cover.appendChild(symbol);
        return cover;
    }
    function podcastCover(title) {
        const t = String(title || '').toLowerCase();
        const symbol = /coffee/.test(t) ? '☕' : /flight|abroad|hotel/.test(t) ? '✈️' :
            /city|directions/.test(t) ? '🗺️' : /work|meeting|complain/.test(t) ? '💬' :
            /sweet|food/.test(t) ? '🍰' : /sport/.test(t) ? '⚽' :
            /books?/.test(t) ? '📚' : /house|apartment/.test(t) ? '🏠' : '🎧';
        const cover=bookCover(symbol);
        cover.classList.add('ldd-oci-podcast-art');
        cover.setAttribute('role','img');
        cover.setAttribute('aria-label','Hình minh họa chủ đề podcast');
        return cover;
    }
    function newsCover(row) {
        const url=String(row?.thumb || '');
        if (!/^https:\/\//i.test(url)) return bookCover('📰');
        const pic=el('img','ldd-oci-news-img');
        pic.src=url; pic.alt='Hình minh họa bài báo';
        pic.loading='lazy'; pic.decoding='async';
        pic.referrerPolicy='no-referrer';
        pic.addEventListener('error',function () { pic.replaceWith(bookCover('📰')); },{once:true});
        return pic;
    }
    function mount() {
        const intro=document.querySelector('#tab-trang-chu .ldd-home-intro');
        if(!intro) return false;
        if(document.getElementById('ldd-oci-welcome')) return true;
        const welcome=el('section','ldd-oci-welcome');
        welcome.id='ldd-oci-welcome';
        const body=el('div','ldd-oci-content');
        const preview=el('div','ldd-oci-preview');
        const wrap=el('div','ldd-oci-preview-row');
        const artHost=el('div','ldd-oci-preview-art');
        const details=el('div','ldd-oci-preview-copy');
        const heading=el('strong','ldd-oci-name','Oci gợi ý cho bạn');
        const headline=el('strong','ldd-oci-headline');
        const summary=el('p','ldd-oci-tip');
        details.setAttribute('aria-live','polite');
        const controls=el('div','ldd-oci-controls');
        const primary=el('button','ldd-oci-go','');
        primary.type='button'; primary.disabled=true;
        const next=el('button','ldd-oci-next','Gợi ý khác');
        next.type='button';
        next.addEventListener('click',function(){void showNext();});
        primary.addEventListener('click',function(){void openCurrent();});
        controls.append(primary,next);
        // Mobile: move the same controls below both columns. Desktop keeps
        // the existing right-column layout. No duplicate buttons or handlers.
        details.append(heading,headline,summary,controls);
        wrap.append(artHost,details);
        const compact=window.matchMedia('(max-width: 600px)');
        function placeControls(){
            const target=compact.matches?wrap:details;
            if(controls.parentElement!==target)target.append(controls);
        }
        placeControls();
        if(compact.addEventListener)compact.addEventListener('change',placeControls);
        else if(compact.addListener)compact.addListener(placeControls);
        preview.append(wrap);
        body.append(preview);
        welcome.append(body);
        intro.appendChild(welcome);
        nodes={welcome,preview,artHost,headline,summary,primary,next};
        return true;
    }
    function paint(title,desc,art,action) {
        if (!nodes) return;
        nodes.artHost.replaceChildren(art);
        nodes.headline.textContent=short(title,110);
        nodes.summary.textContent=short(desc,218);
        nodes.primary.disabled=false;
        nodes.primary.textContent=action;
        nodes.preview.dataset.ociReady='1';
    }
    // Rotate randomly through unread, verified articles for each account.
    // Persist only article IDs locally, never content or student answers.
    const articleHistory = new Map();
    function randomNewsId(uid, ids) {
        const eligible = Array.from(new Set(ids.map(String)));
        if (!uid || !eligible.length) return null;
        const key = 'ldd-oci-news-cycle-v1:' + uid;
        let history = articleHistory.get(uid);
        if (!history) {
            try { history = JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) {}
            if (!history || !Array.isArray(history.seen)) history = { seen: [], last: null };
        }
        const available = new Set(eligible);
        let seen = new Set(history.seen.map(String).filter(id => available.has(id)));
        let choices = eligible.filter(id => !seen.has(id));
        if (!choices.length) {
            seen = new Set();
            choices = eligible.slice();
        }
        // Even at the boundary of a completed cycle, avoid the last article
        // whenever there is another eligible option.
        if (choices.length > 1 && choices.includes(String(history.last))) {
            choices = choices.filter(id => id !== String(history.last));
        } else if (choices.length === 1 && choices[0] === String(history.last) && eligible.length > 1 && !seen.size) {
            choices = eligible.filter(id => id !== String(history.last));
        }
        const id = choices[Math.floor(Math.random() * choices.length)];
        seen.add(id);
        history = { seen: Array.from(seen), last: id };
        articleHistory.set(uid, history);
        try { localStorage.setItem(key, JSON.stringify(history)); } catch (_) {}
        return id;
    }
    function choose() {
        const types=['news','podcast','ipa'];
        for(let tries=0;tries<3;tries++) {
            const type=types[(state.turn++) % types.length];
            if(type==='news' && state.articles.length) {
                // Only show articles with a vetted Vietnamese teaser.
                const eligible = state.articles.filter(id => NEWS_TEASERS[String(id)]);
                if (eligible.length) {
                    const id=randomNewsId(state.uid,eligible);
                    return {type:'news',id,uid:state.uid};
                }
            }
            if(type==='podcast' && state.podcasts.length) {
                const pod=state.podcasts[state.podcastOffset++ % state.podcasts.length];
                return {type:'podcast',pod,uid:state.uid};
            }
            if(type==='ipa') {
                return {type:'ipa',pair:IPA[state.ipaOffset++ % IPA.length],uid:state.uid};
            }
        }
        return {type:'ipa',pair:IPA[state.ipaOffset++ % IPA.length],uid:state.uid};
    }
    async function showNext() {
        if(!nodes)return;
        const seq=++state.request;
        const selected=choose();
        state.current=selected;
        nodes.primary.disabled=true;
        if(selected.type==='news') {
            nodes.headline.textContent='Đang tìm bài báo phù hợp…';
            nodes.summary.textContent='';
            nodes.preview.dataset.ociReady='0';
            const getter=window.LDDOciNewsPreview;
            const row=typeof getter==='function' && selected.uid
                ? await getter(selected.id,selected.uid) : null;
            if(seq!==state.request || selected.uid!==state.uid) return;
            if(!row) {
                // No fabricated source or broken CTA if data is temporarily unavailable.
                const pair=IPA[state.ipaOffset++ % IPA.length];
                state.current={type:'ipa',pair,uid:state.uid};
                showIpa(pair);
                return;
            }
            const teaser = verifiedNewsTeaser(row);
            if (!teaser) {
                // Never display a headline or fact that belongs to another article.
                const pair=IPA[state.ipaOffset++ % IPA.length];
                state.current={type:'ipa',pair,uid:state.uid};
                showIpa(pair);
                return;
            }
            selected.row=row;
            paint(teaser.headline,teaser.fact,
                newsCover(row),'Đọc bài này');
        } else if(selected.type==='podcast') {
            const p=selected.pod;
            const opening=Array.isArray(p.opening) ? p.opening : [];
            const excerpt=opening.map(x=>x.vi).find(x=>String(x||'').length>30);
            const description=PODCAST_HOOKS[Number(p.id)] ||
                (excerpt ? 'Nghe một cuộc hội thoại bắt đầu bằng: “'+short(excerpt,115)+'”' : 'Khám phá tình huống giao tiếp và thử nghe hiểu bằng tiếng Anh.');
            paint(PODCAST_HEADLINES[Number(p.id)] || 'Podcast này có điều gì đáng nghe?',description,podcastCover(p.title),'Nghe podcast này');
        } else {
            showIpa(selected.pair);
        }
    }
    function showIpa(pair) {
        const tile=el('div','ldd-oci-ipa-art');
        tile.setAttribute('aria-label','Cặp âm IPA cần phân biệt');
        pair.sounds.forEach(function(sound){
            tile.appendChild(el('span','ldd-oci-ipa-sound',sound));
        });
        paint('Bạn có nghe ra sự khác nhau giữa ' + pair.sounds.join(' và ') + '?',
            pair.words.join(' – ') + '. ' + pair.hint,tile,'Luyện âm này');
    }
    function visitMain(target) {
        if(window.LDDNavigation && typeof window.LDDNavigation.goToTab==='function') {
            window.LDDNavigation.goToTab(target);
        } else {
            const button=document.querySelector('.main-tab-btn[data-main-target="'+target+'"]');
            if(button) button.click();
        }
    }
    function visitVocabulary(cardId) {
        visitMain('tab-tu-vung');
        if(window.LDDVocabNavigation && typeof window.LDDVocabNavigation.openFolder==='function') {
            if(window.LDDVocabNavigation.openFolder(cardId))return;
        }
        document.getElementById(cardId)?.click();
    }
    function findCard(container,id,title,selector) {
        const root=document.getElementById(container);
        if(!root)return null;
        const wanted=String(id);
        const cards=Array.from(root.querySelectorAll(selector));
        return cards.find(c=>[c.dataset?.id,c.dataset?.articleId,c.getAttribute('data-news-id')].some(v=>String(v||'')===wanted)) ||
            cards.find(c=>String(c.querySelector('.news-card-title')?.textContent || c.textContent || '').trim().toLowerCase()===String(title||'').trim().toLowerCase()) || null;
    }
    function openWhenLoaded(container,id,title,selector) {
        const root=document.getElementById(container);
        if(!root)return;
        const open=()=>{
            const card=findCard(container,id,title,selector);
            if(!card)return false;
            card.click(); return true;
        };
        if(open())return;
        const observer=new MutationObserver(()=>{if(open())observer.disconnect();});
        observer.observe(root,{childList:true,subtree:true});
        setTimeout(()=>observer.disconnect(),10000);
    }
    async function openCurrent() {
        const current=state.current;
        if(!current)return;
        if(current.type==='news') {
            visitVocabulary('news-folder-card');
            openWhenLoaded('news-cards-grid',current.id,current.row?.title,'.news-card');
        } else if(current.type==='podcast') {
            visitVocabulary('podcast-folder-card');
            openWhenLoaded('podcast-grid',current.pod.id,current.pod.title,'.folder-card');
        } else {
            visitMain('tab-phien-am');
            const firstKey=current.pair.keys[0];
            setTimeout(function(){
                const tile=Array.from(document.querySelectorAll('#tab-phien-am .ipa-symbol'))
                    .find(x=>x.dataset.symbol===firstKey);
                if(!tile)return;
                const panel=tile.closest('.ipa-tab-content');
                if(panel)document.querySelector('.tab-button[data-target="'+panel.id+'"]')?.click();
                tile.click();
                tile.scrollIntoView({block:'center',behavior:'smooth'});
            },150);
        }
    }
    function onCandidates(event) {
        const input=event.detail;
        if(!input || !input.uid) {
            state.uid=null;state.articles=[];state.podcasts=[];
            state.current=null;state.turn=2;void showNext();
            return;
        }
        const changed=String(input.uid)!==state.uid;
        state.uid=String(input.uid);
        state.articles=Array.isArray(input.articles) ? input.articles.map(String) : [];
        state.podcasts=Array.isArray(input.podcasts) ? input.podcasts.filter(x=>x&&x.id&&x.title) : [];
        if(changed) {
            state.turn=0;state.podcastOffset=0;
            void showNext();
        } else {
            const shown=state.current;
            if(shown && ((shown.type==='news'&&!state.articles.includes(String(shown.id))) ||
                (shown.type==='podcast'&&!state.podcasts.some(p=>String(p.id)===String(shown.pod.id)))))void showNext();
        }
    }
    window.addEventListener('ldd:oci-candidates',onCandidates);
    function init() {
        const ready=()=> {
            if(!mount()) return false;
            if(window.LDDOciCandidateSnapshot?.uid) {
                const previousRequest=state.request;
                onCandidates({detail:window.LDDOciCandidateSnapshot});
                // Handle an event that arrived before Oci mounted, without
                // fetching a second suggestion if onCandidates already did so.
                if(state.request===previousRequest && nodes.preview.dataset.ociReady!=='1') void showNext();
            } else {
                void showNext();
            }
            return true;
        };
        if(ready())return;
        const observer=new MutationObserver(()=>{
            if(ready())observer.disconnect();
        });
        observer.observe(document.body,{childList:true,subtree:true});
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
})();
