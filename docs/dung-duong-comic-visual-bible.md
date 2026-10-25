# LDD English — Quy chuẩn hình ảnh truyện Dung & Dương (bản thiết kế 01)

## Nguồn truyện
- Nguồn chuẩn: `grade6-data.js` → `grade12-data.js`, `storyFrames[].content_html`; khi hiển thị cần ưu tiên nội dung giáo viên đã ghi đè trong `thcs_story_frames`.
- Kiểm kê bản nháp tĩnh: lớp 6/7/8/9 có 48 khung/lớp; lớp 10/11/12 có 40 khung/lớp; tổng **312 khung**.
- Ở bảy tệp dữ liệu tĩnh, **chưa có image_url được điền** (không kết luận về ảnh ghi đè trên Supabase).
- Khung minh họa phải mô tả **đúng tình tiết thực tế** của content_html. Không tự đổi lời thoại, trường lớp, hoạt động hoặc quan hệ nhân vật.

## Thiết kế ngoại hình — đề xuất để khóa nhất quán
Đây là thiết kế nghệ thuật mới, chưa phải chi tiết xác nhận từ truyện.
- **Dung:** nữ sinh Việt Nam; tóc nâu đen dài, mái thưa; mắt nâu; khuôn mặt bầu dục, biểu cảm thân thiện; đồng phục áo sơ mi trắng, nơ xanh navy, chân váy xanh navy. Chỉ đổi trang phục nếu bối cảnh đòi hỏi.
- **Dương:** nam sinh Việt Nam; tóc đen hơi rối, mái lệch tự nhiên; mắt nâu sẫm; khuôn mặt hơi góc cạnh; đồng phục sơ mi trắng, cà vạt xanh navy, quần xanh navy; ba lô đen hoặc xám.
- **Khóa hình:** màu tóc, kiểu mái, dáng mắt, tỉ lệ khuôn mặt và sắc độ da luôn giống nhau. Không thay đổi ngẫu nhiên giữa ảnh bìa, lớp, unit và panel.
- **Khóa tuổi:** lớp 6 nhỏ tuổi hơn rõ rệt; tuổi tăng dần nhẹ nhàng qua lớp 7–12. Tránh dùng ngoại hình trưởng thành cho lớp 6.
- **Khóa phong cách:** truyện tranh học đường anime 2D, ánh sáng tự nhiên, bảng màu ấm, đường nét sạch, hậu cảnh Việt Nam hợp logic; khung ảnh 16:9 cho tranh ngang, thumbnail chương 4:3 và bìa series 3:4.
- **Khóa bối cảnh:** đồng phục, kiến trúc trường, bàn ghế, giờ trong ngày, nhân vật phụ phải phù hợp với nội dung từng khung.
- Chữ tiếng Anh/Việt và câu điền từ nên để HTML hiện hành hiển thị, **không nhúng chữ vào ảnh** (dễ sai và khó thay đổi).

## Quy trình ảnh từ nay
1. Đọc chính xác `content_html` của khung; ghi rõ nhân vật, địa điểm, hành động, đạo cụ, tâm trạng và thời gian.
2. Dùng cùng bộ ảnh tham chiếu Dung & Dương để tạo hình; kiểm tra lỗi mặt/tóc/màu đồng phục, số nhân vật và chi tiết đạo cụ.
3. Tạo một bản cho mỗi khung; xuất WebP tối ưu, định danh ổn định theo `grade/unit/frame`, lưu tệp nặng lên **Backblaze B2**.
4. Ghi đúng đường dẫn vào hình minh họa của unit, hoặc qua giao diện giáo viên lưu trên `thcs_story_frames`. Tránh ghi đè nội dung giáo viên đã sửa.
5. Xem trên desktop/mobile trước khi xuất bản; ảnh phải đúng diễn biến câu chuyện, không nặng và không nhấp nháy do tải lại.

## Storyboard khởi đầu: lớp 6 — Unit 1: MY NEW SCHOOL
Theo khung truyện gốc, đầu tiên Dương đến trường mới với cặp sách và đồng phục; Dung mỉm cười chào cậu tại cổng trường và tự giới thiệu là bạn cùng lớp.

**Prompt minh họa panel 1:** Vietnamese middle-school slice-of-life 2D anime illustration. Morning at a Vietnamese school gate, 11–12-year-old Vietnamese boy Duong in white short-sleeved school uniform with navy trousers, dark slightly tousled side-parted hair, dark backpack, carrying school books. Vietnamese girl Dung with consistent long dark-brown hair and wispy bangs, white uniform top with navy bow and navy skirt, smiles warmly and greets him. Natural and age-appropriate body proportions; cheerful first-day-at-school mood; school entrance clearly visible, cinematic wide landscape 16:9, clean line art, soft warm morning light. No text, no letters, no watermark. Both faces and wardrobes must match the approved series character reference sheet.

**Lưu ý:** hình ảnh hiện mới ở bước thiết kế mẫu/nhân vật. Không đánh dấu 312 panel là đã có ảnh trước khi thực sự xuất file và liên kết ảnh.
