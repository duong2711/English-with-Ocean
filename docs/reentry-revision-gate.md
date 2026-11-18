# Cơ chế kiểm tra sau 3 ngày không học — LDD English

## Quy tắc

- **Điều kiện:** học viên không có thời gian học được ghi nhận quá **72 giờ** (không tính chỉ mở trang hoặc đăng nhập).
- **Bài bắt buộc:** 10 câu trắc nghiệm 4 lựa chọn; chọn ngẫu nhiên từ câu học viên **cùng lớp/nhóm học** từng làm sai trong các bài kiểm tra riêng đã nộp. Tự đa dạng nhóm kiến thức khi ngân hàng có đủ dữ liệu.
- **Đạt từ 6/10:** được vào học bình thường, ghi lại mốc hoạt động mới.
- **Dưới 6/10:** web chuyển sang trạng thái khóa, dịch vụ Auth chặn các lần đăng nhập tiếp theo, hiển thị hướng dẫn học viên **chủ động nhắn Zalo cho giáo viên**, hẹn dò bài và nhận một bài kiểm tra giấy.
- **Mở khóa:** chỉ email giáo viên đã cấu hình được gọi chức năng mở khóa từ nút `Quản lý kiểm tra 3 ngày`. Phải xác nhận đã dò bài/giao đề giấy trước khi thao tác.
- **Giáo viên:** luôn được miễn kiểm tra; có thể bật/tắt tính năng. **Mặc định tắt** để tránh khóa hàng loạt khi mới cập nhật.
- **Ngân hàng chưa đủ 10 câu phù hợp:** không khóa học viên; cần bổ sung kết quả các bài kiểm tra riêng.
- **Thiết bị mới:** xác thực/duyệt thiết bị hiện có hoàn tất trước khi mở bài kiểm tra bắt buộc.

## Triển khai đúng thứ tự

1. Kiểm tra, sao lưu và chạy `reentry_revision_gate_setup.sql` trên dự án Supabase **ywqbaksmmtvwbojcgsdd**. Script tạo bảng có RLS, lưu trạng thái và lịch sử bài ôn, RPC kiểm tra/chấm bài/mở khóa và trigger ghi nhận hoạt động học.
2. Triển khai Supabase Edge Function `supabase/functions/reentry-auth-lock/index.ts` với xác minh JWT **bật**, `SUPABASE_URL`, `SUPABASE_ANON_KEY` và `SUPABASE_SERVICE_ROLE_KEY` cấu hình phía máy chủ. **Không đưa service-role key vào web.**
3. Gộp nhánh frontend (CSS, JS và `index.html`). Kiểm tra đăng nhập Google, đăng nhập mật khẩu, duyệt thiết bị, bài kiểm tra và đăng xuất.
4. Giáo viên vào tài khoản → **Quản lý kiểm tra 3 ngày** → **Bật cơ chế kiểm tra** khi đã xác minh thử nghiệm.
5. Kiểm tra thử: dưới 72 giờ; đúng 72 giờ; vượt 72 giờ; thiếu 10 câu; đạt 6/10; không đạt 5/10; người dùng đang đăng nhập; học viên bị cấm đăng nhập mới; giáo viên mở khóa; email khác không có quyền mở khóa.

## Bảo mật và giới hạn

- Đáp án/điểm của bài thử được chấm trong Postgres, không gửi khóa đáp án ra trình duyệt. Các bảng kiểm tra riêng có RLS và không cấp quyền đọc trực tiếp cho người dùng cuối.
- Dữ liệu câu hỏi của học viên khác chỉ được dùng để tạo đề, **không hiển thị ai đã làm sai**, đáp án của học viên khác hay email của họ.
- Không thể tự mở khóa bằng đổi localStorage hay sửa điểm trong trình duyệt: RPC quyết định điểm và trạng thái tại máy chủ.
- Việc chặn đăng nhập bằng Supabase Auth chỉ bắt đầu sau khi Edge Function đã được triển khai. Nếu Edge Function lỗi, overlay phía web vẫn hạn chế truy cập và ghi nhận trạng thái khóa, nhưng **chưa có biện pháp chặn Auth đúng nghĩa**.
- **Supabase Auth ban không tự thu hồi mọi access token đang còn hạn**. Người đã đăng nhập sẵn bị giao diện web chặn; để chống truy cập API trực tiếp khi đang bị khóa phải bổ sung điều kiện trạng thái vào RLS của từng tài nguyên dữ liệu nhạy cảm hoặc cơ chế thu hồi phiên. Không tuyên bố khóa tuyệt đối ở tầng API nếu chưa làm bước này.
- Trường hợp mạng lỗi trước khi xác minh hoặc thiếu migration, frontend không khóa oan toàn bộ học viên.
- Bài chỉ tự chấm câu MCQ dạng văn bản, vì bài viết tự luận/nghe không thể chấm và tái sử dụng an toàn bằng quy trình này.

## Kiểm thử trong repo

```bash
node --test tests/reentry-revision-gate.cjs
```

CI được khai báo trong `.github/workflows/reentry-gate-check.yml` và chạy với pull request.
