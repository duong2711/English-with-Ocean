# LDD English — Giải trí / Truyện Dung–Dương

## Thiết kế được triển khai

Tab Giải trí có 4 mục: Trò chơi, Phim ảnh, Truyện tranh và Lồng tiếng (giữ nguyên).

Trò chơi gom Lô tô, Bắn từ vựng và Đua xe từ vựng. Cả 3 dùng lại game room, realtime, vòng đời và dữ liệu cũ; không đổi luật chơi.

Phim ảnh là danh mục video ngắn theo thumbnail, tên, mô tả và thời lượng. Chưa có video do người quản trị cung cấp, nên danh sách hiện trống, không có đường link giả. Media sẽ chỉ được nạp sau khi chọn phim.

Truyện tranh gồm bộ "Truyện học đường Dung và Dương" và các chương từ Unit lớp 6–12. Đã kiểm tra 84 Unit, 336 storyFrames trong các file tĩnh (lớp 6–9 có 12 Unit/lớp, lớp 10–12 có 10 Unit/lớp, mỗi Unit 4 khung). Toàn bộ image_url trong bản nháp tĩnh đều trống. Ảnh do giáo viên lưu trong bảng Supabase không được tính trong thống kê này.

Quan trọng: Khi chọn chương, website điều hướng sang đúng phần Từ vựng → THCS/THPT → Lớp → Unit → Câu chuyện hiện có, tuân thủ khóa Unit và dùng nội dung hình/thoại ưu tiên từ Supabase. Danh mục tĩnh không sao chép/ghi đè nội dung học.

## Schema metadata (không thêm bảng hoặc API mới)

Tệp ldd-entertainment-data.js lưu:
- movies[]: id (unique), title, description, thumbnail_url (HTTPS), video_url (HTTPS), duration, order.
- comics[]: id, title, description, thumbnail_url, grades, source.
- chapters: suy ra từ (grade, unit.id), với number, titleVi, storyFrames.length từ các gradeN-data.js. Nội dung đang học ưu tiên Supabase thcs_story_frames.

Ví dụ phần tử movies:
    { id: 'film-001', title: 'Phim mẫu', description: '...', thumbnail_url: 'https://.../thumb.webp', video_url: 'https://.../clip.mp4', duration: '01:30', order: 1 }

Tất cả video/ảnh lớn ưu tiên Backblaze B2, chỉ giữ URL trong manifest/Supabase. Không tạo thêm egress Supabase cho việc liệt kê thư viện.

## Character bible v1 (đề xuất ban đầu)

Đây là hình mẫu đề xuất; trước khi tạo hàng loạt phải đối chiếu với những khung ảnh giáo viên đã lưu trên Supabase để tránh thay đổi nhân vật.

Dương: Nam sinh Việt Nam; tóc đen ngắn hơi rối, mái lệch; mắt nâu đậm; mặt trái xoan, cằm hơi góc; thanh mảnh, cao hơn Dung một chút. Đồng phục: sơ mi trắng, quần xanh navy, ba lô xanh dương.

Dung: Nữ sinh Việt Nam; tóc đen nâu dài, buộc đuôi ngựa thấp, mái thưa, dây buộc tóc xanh; mắt nâu đậm, mặt trái xoan mềm; thấp hơn Dương một chút. Đồng phục: sơ mi trắng, váy xanh navy, cặp màu cam ấm.

Quy tắc: giữ nguyên hình dáng khuôn mặt, màu tóc/mắt/da và điểm nhận diện qua các khung; thay đổi quần áo khi cốt truyện yêu cầu. Nhân vật trưởng thành dần theo lớp 6 → 12, nhưng không đổi danh tính. Phong cách minh họa truyện học đường webtoon 2D, ánh sáng mềm, màu tươi dịu, nét rõ, bối cảnh đúng nội dung. Mỗi khung 16:9, không chèn thoại vào hình để website hiển thị văn bản và ô trống.

## Storyboard đầu tiên: Lớp 6, Unit 1 — Ngôi trường mới của em

1. Dương đến cổng trường mới cùng school bag, uniform; Dung chào cậu như người bạn classmate.
2. Trong lesson, cô giáo giới thiệu subjects; Dương thích history, Dung thích science.
3. Giờ giải lao, hai bạn chơi football và exercise ngoài sân.
4. Sau giờ học, hai bạn làm homework; Dung cho Dương mượn compass, Dương có pencil case.

Hình mẫu gợi ý: assets/comics/dung-duong/characters-v1.webp.
Bìa gợi ý: assets/comics/dung-duong/cover.webp.
Bốn khung Unit 1 gợi ý: assets/comics/dung-duong/g06/u01/p01.webp đến p04.webp.

Tình trạng triển khai: menu + thư viện + routing đã tích hợp mã nguồn. Hình hoàn chỉnh chưa được đưa vào nội dung từng Unit và chưa kiểm thử trực tiếp trên máy học viên.
