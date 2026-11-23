# Quy tắc chung: Dịch · Highlight · Ghi chú

Chỉ áp dụng trong **nội dung học thực tế đã có quyền tra từ trước đó**: bài báo, câu luyện dịch, nội dung bài đọc/bài kiểm tra được phép tra, lời thoại và từ đã được bọc để tra trong truyện, podcast, video. Không áp dụng cho mọi chữ tiếng Anh trên website. **Folder card, thẻ giới thiệu bài, catalog, tiêu đề/điều hướng, thông tin giao diện, nút bấm** không phải là nội dung tra từ. Không tạo popup tra từ chỉ có một lựa chọn trong các tính năng mới.

## Hợp đồng tích hợp

- **Từ được chạm:** Dùng `<span class="tappable-word" data-word="example">example</span>` hoặc `<span data-ldd-lookup-word="example">example</span>`. Module `ldd-text-actions.js` tự điều phối một menu duy nhất bằng sự kiện ở cấp cửa sổ, trên PC lẫn điện thoại.
- **Đoạn văn bản học chưa bọc từ:** Chỉ thêm `data-ldd-text-actions` lên vùng chứa văn bản bài học mà học viên được phép dịch từ trước; không gắn vào toàn bộ trang, folder card hay thẻ giới thiệu. Nên đặt thêm `data-vocab-context` và `data-vocab-source` để tra đúng ngữ cảnh và tên bài. Học viên có thể chạm từ hoặc chọn nhiều từ qua các thẻ inline/đoạn.
- **Tính năng có click handler riêng:** Gọi `window.LDDTextActions.presentWordElement(element)`. Nếu hàm trả `true`, không gọi tiếp popup từ điển cũ. `presentSelection()` dùng cho thao tác quét văn bản. Tránh gọi trực tiếp `vocabTap.handleTap()` hoặc `lddExamLookupWord()` từ sự kiện chạm khi menu chung đã sẵn sàng.
- **Không mở tra từ ở nơi cấm:** Vẫn giữ quy tắc không tra từ ở bài kiểm tra tắt từ điển, và không nhận click trên folder card, menu, tiêu đề, phần mô tả danh mục, nút bấm, biểu mẫu, editor, đoạn mã, các popup và giao diện trò chơi. Không dùng `#inside` hoặc `.main-tab-content` làm vùng tra từ chung.

## Ba lựa chọn

1. **Dịch:** Từ đơn sử dụng popup từ điển hiện có; cụm từ ngắn dùng công cụ collocation; câu/đoạn/bài báo dài được dịch qua AI proxy đã xác thực. Cụm từ không bắt phát âm.
2. **Highlight:** Đánh dấu đúng đoạn được quét. Nếu phần được chọn đã được highlight, cùng vị trí nút này chuyển thành **Bỏ highlight**; thao tác bỏ chỉ xóa đánh dấu ở phần được chọn (giữ các từ bên cạnh nếu chúng vẫn còn được highlight). Đối với bài báo và bài kiểm tra, việc bỏ đánh dấu phải được lưu vào Supabase và vẫn có hiệu lực sau khi mở lại bài.
3. **Ghi chú:** Cho phép viết lại suy nghĩ gắn với đoạn được chọn.

Đối với bài báo và bài kiểm tra được hỗ trợ, Highlight/Ghi chú lưu theo tài khoản vào `student_test_annotations` với khóa bài và vị trí văn bản, sau đó khôi phục khi mở lại bài. Ngoài những vùng có annotation scope ổn định, ghi chú hiện có fallback **trên thiết bị** và phân tách theo tài khoản; highlight fallback hiện chỉ tồn tại trong phiên làm việc. Khi thêm một loại bài mới cần **đồng bộ highlight/ghi chú giữa thiết bị**, phải mở rộng `ldd-test-annotations.js` bằng một root/key ổn định, không chỉ bật ba nút.

## Kiểm thử trước khi phát hành

- Bấm từ đã bọc và từ thường trong bài báo.
- Kéo chọn cụm từ, câu, nhiều đoạn và cả phần thân bài; cả chuột và giữ/chọn trên điện thoại.
- Kiểm tra ba lựa chọn, lưu lại, tải lại bằng cùng tài khoản và thử tài khoản khác.
- Thử trong bài kiểm tra được phép tra, bài bị cấm tra, trình đọc truyện dạng `dialog` và khu vực trò chơi.
- Thử bấm và quét tiếng Anh trong **folder card, mô tả folder, tiêu đề, menu điều hướng và thẻ bài**: không được hiện ba lựa chọn, không được chặn việc mở thẻ.
- Chạy `node --test tests/text-actions.test.cjs` và các bài kiểm thử liên quan.
