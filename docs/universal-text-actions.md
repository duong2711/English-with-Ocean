# Quy tắc chung: Dịch · Highlight · Ghi chú

Áp dụng cho mọi khu vực học tiếng Anh có thao tác **bấm một từ** hoặc **quét/chọn đoạn văn bản**. Không tạo popup tra từ chỉ có một lựa chọn trong các tính năng mới.

## Hợp đồng tích hợp

- **Từ được chạm:** Dùng `<span class="tappable-word" data-word="example">example</span>` hoặc `<span data-ldd-lookup-word="example">example</span>`. Module `ldd-text-actions.js` tự điều phối một menu duy nhất bằng sự kiện ở cấp cửa sổ, trên PC lẫn điện thoại.
- **Đoạn văn bản chưa bọc từ:** Thêm `data-ldd-text-actions` lên vùng chứa văn bản tiếng Anh. Nên đặt thêm `data-vocab-context` và `data-vocab-source` để tra đúng ngữ cảnh và tên bài. Học viên có thể chạm từ hoặc chọn nhiều từ qua các thẻ inline/đoạn.
- **Tính năng có click handler riêng:** Gọi `window.LDDTextActions.presentWordElement(element)`. Nếu hàm trả `true`, không gọi tiếp popup từ điển cũ. `presentSelection()` dùng cho thao tác quét văn bản. Tránh gọi trực tiếp `vocabTap.handleTap()` hoặc `lddExamLookupWord()` từ sự kiện chạm khi menu chung đã sẵn sàng.
- **Không mở tra từ ở nơi cấm:** Vẫn giữ quy tắc không tra từ ở bài kiểm tra tắt từ điển, và không nhận click trên nút bấm, biểu mẫu, editor, đoạn mã, các popup và giao diện trò chơi.

## Ba lựa chọn

1. **Dịch:** Từ đơn sử dụng popup từ điển hiện có; cụm từ ngắn dùng công cụ collocation; câu/đoạn/bài báo dài được dịch qua AI proxy đã xác thực. Cụm từ không bắt phát âm.
2. **Highlight:** Đánh dấu đúng đoạn được quét.
3. **Ghi chú:** Cho phép viết lại suy nghĩ gắn với đoạn được chọn.

Đối với bài báo và bài kiểm tra được hỗ trợ, Highlight/Ghi chú lưu theo tài khoản vào `student_test_annotations` với khóa bài và vị trí văn bản, sau đó khôi phục khi mở lại bài. Ngoài những vùng có annotation scope ổn định, ghi chú hiện có fallback **trên thiết bị** và phân tách theo tài khoản; highlight fallback hiện chỉ tồn tại trong phiên làm việc. Khi thêm một loại bài mới cần **đồng bộ highlight/ghi chú giữa thiết bị**, phải mở rộng `ldd-test-annotations.js` bằng một root/key ổn định, không chỉ bật ba nút.

## Kiểm thử trước khi phát hành

- Bấm từ đã bọc và từ thường trong bài báo.
- Kéo chọn cụm từ, câu, nhiều đoạn và cả phần thân bài; cả chuột và giữ/chọn trên điện thoại.
- Kiểm tra ba lựa chọn, lưu lại, tải lại bằng cùng tài khoản và thử tài khoản khác.
- Thử trong bài kiểm tra được phép tra, bài bị cấm tra, trình đọc truyện dạng `dialog` và khu vực trò chơi.
- Chạy `node --test tests/text-actions.test.cjs` và các bài kiểm thử liên quan.
