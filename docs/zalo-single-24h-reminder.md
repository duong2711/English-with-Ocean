# LDD English — Nhắc học viên vắng truy cập 24 giờ bằng Zalo cá nhân

## Trạng thái mặc định

**Chưa gửi tin nhắn thật.** Hệ thống có các bảng và hàm chống gửi trùng,
một hàm Edge Function chỉ dùng cho n8n và một workflow n8n ở trạng thái
`active: false`. Mọi dòng liên hệ Zalo mặc định `enabled: false`.
Trước khi liên kết dịch vụ, không có ai nhận tin.

Nguồn Zalo:
https://github.com/congdinh2008/n8n-nodes-mochi-zalo

**Cảnh báo:** đây là API Zalo **cá nhân không chính thức** qua `mochi-zalo`.
Không được Zalo bảo đảm, có nguy cơ phiên hết hạn, hạn chế tài khoản hoặc thay đổi
giao thức. Nên dùng tài khoản dành riêng cho liên hệ học tập, không gửi spam.
Gói yêu cầu self-host n8n, Node.js >=22, thư viện n8n community node đã cài.
Không đưa Cookie/IMEI/User Agent, service_role key hay webhook secret vào GitHub.

## Cơ chế hoạt động

1. Trang web đang hiển thị, học viên đã đăng nhập -> gửi một dấu mốc truy cập
   tới RPC `ldd_touch_student_site_presence()`. Trình duyệt hạn chế tối đa
   1 lần/10 phút, không gửi khi tab ẩn.
2. Mỗi giờ (08:00–19:00, múi giờ TP.HCM), n8n hỏi Edge Function
   `ldd-inactivity-reminder` xin **tối đa một** học viên đủ điều kiện.
3. Điều kiện chọn: tài khoản có gán lớp/lộ trình, đã từng truy cập sau khi
   bật theo dõi, **không truy cập 24 giờ**, có Zalo UID đúng người và đã đồng ý
   nhận tin, `enabled=true`.
4. Postgres khóa chọn đồng thời và ghi "claimed" **trước** khi gửi. Nếu học viên
   không quay lại, đợt vắng học này không được nhắc lại, dù n8n chạy bao nhiêu lần.
   Chỉ khi có lần truy cập mới thì sau 24 giờ tiếp tục vắng mới có thể nhắc lần nữa.
5. Máy chủ áp dụng thêm giờ yên tĩnh 20:00–08:00 (Asia/Ho_Chi_Minh),
   và giãn cách **ít nhất 30 phút** giữa hai lượt gửi của toàn hệ thống.
6. Nút Zalo gửi 1 tin nhắn trực tiếp (`threadType=0`). N8n báo kết quả
   `sent` hoặc `failed` về Edge Function.

**Chính sách at-most-once:** Không tự động retry sau khi đã claim.
Nếu mạng lỗi và không xác nhận được việc gửi, lịch sử có thể ở trạng thái
`claimed` hoặc `failed` dù người nhận chưa thấy tin; cách này chủ động
ưu tiên *không làm phiền/tránh gửi trùng* hơn là đảm bảo 100% chuyển phát.

## Cấu hình lần đầu

1. Triển khai schema từ các migration đã áp dụng:
   - `ldd_zalo_inactivity_reminder_24h.sql`
   - `ldd_zalo_reminder_global_throttle.sql`
   - `ldd_zalo_reminder_unlinked_student_ids.sql`
2. Edge Function `supabase/functions/ldd-inactivity-reminder/index.ts` được
   triển khai với `verify_jwt=false` vì **tự xác thực header bí mật**.
3. Trong Supabase Dashboard -> Edge Functions -> Secrets, thêm
   `LDD_REMINDER_BRIDGE_SECRET` là chuỗi ngẫu nhiên khó đoán dài ít nhất
   32 ký tự. Không gửi giá trị này trong chat hoặc lưu trong mã nguồn.
4. Cài `n8n-nodes-mochi-zalo` từ Settings -> Community Nodes của một n8n
   đáng tin cậy. Tạo credential **Zalo Personal API** bằng QR theo repo upstream,
   chỉ lưu Cookie/IMEI/User Agent vào kho Credentials mã hóa của n8n.
5. Import `n8n/ldd-zalo-once-after-24h.workflow.json`.
6. Tạo **Header Auth** credential trong n8n:
   - Name: `x-reminder-secret`
   - Value: trùng với `LDD_REMINDER_BRIDGE_SECRET`
   - Gắn credential vào cả 3 nút HTTP Request.
7. Gắn **Zalo Personal API** credential vào nút "Send One Zalo Message".
8. Chọn một học viên test **đã đồng ý nhận nhắc nhở**, xác minh chính xác
   **Zalo UID** (không phải số điện thoại). Thêm vào bảng contact bằng SQL bên dưới.
9. Chạy thử khi chưa có người đủ điều kiện: nhánh IF phải dừng, không gửi gì.
   Khi kiểm tra n8n xong mới bật workflow (trạng thái import mặc định OFF).

### Cấp quyền cho một người nhận đã đồng ý

Chỉ thực hiện trong Supabase SQL Editor (quyền quản trị). Thay giá trị ví dụ,
tuyệt đối không công bố UID của người nhận:

```sql
insert into public.ldd_zalo_reminder_contacts
  (user_id, recipient_uid, recipient_kind, consent_at, enabled)
select u.id, 'UID_ZALO_DA_XAC_MINH', 'student', now(), true
from auth.users as u
where lower(u.email)=lower('hocvien@example.com')
on conflict (user_id) do update
set recipient_uid=excluded.recipient_uid,
    recipient_kind=excluded.recipient_kind,
    consent_at=excluded.consent_at,
    enabled=excluded.enabled,
    updated_at=now();
```

**Lưu ý:** câu SQL sẽ báo lỗi nếu UID không phải chuỗi số hợp lệ, theo
constraint. UID phải do Zalo User node xác minh là đúng tài khoản nhận.
Học viên dưới tuổi phù hợp nên gửi cho phụ huynh có đồng ý và đặt
`recipient_kind='guardian'`. Tuyệt đối không nhầm UID với số điện thoại.

Tắt nhắc nhở bất cứ lúc nào:

```sql
update public.ldd_zalo_reminder_contacts
set enabled=false, updated_at=now()
where user_id=(select id from auth.users
               where lower(email)=lower('hocvien@example.com')
               limit 1);
```

## API cho n8n

Endpoint POST:
`https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/ldd-inactivity-reminder`

Bắt buộc Header Auth `x-reminder-secret` chứa secret của Edge Function.

- Body `{"action":"claim"}` trả `{"ready":false}` hoặc một bản ghi:
  `{"ready":true,"reminder_id":"...","recipient_uid":"...","message_text":"..."}`.
- Sau gửi: `{"action":"report","reminder_id":"...","state":"sent"}`
  hoặc `"state":"failed"`.
- Không cho n8n tùy ý chọn học viên hay soạn nội dung, mọi quyết định lấy từ DB.
- Không lưu nội dung tin, UID, Cookie, IMEI trong lịch sử n8n lâu dài.
  Workflow đặt `saveDataSuccessExecution=none` và `saveDataErrorExecution=none`.

## Theo dõi trạng thái an toàn

```sql
select state, count(*) from public.ldd_zalo_reminder_attempts group by state;
select count(*) as enabled_recipients
from public.ldd_zalo_reminder_contacts where enabled;
```

Sự kiện "vắng 24 giờ" ở đây nghĩa là **không mở/hiện web trong 24 giờ**,
không có nghĩa là không làm bài hoặc chưa nộp bài. Độc lập với cơ chế
kiểm tra quay lại sau hơn 3 ngày vắng học.

## Hạn chế cần biết

- Tính năng chỉ hoạt động khi n8n có máy chủ chạy theo lịch,
  và phiên Zalo còn hiệu lực.
- Bản mã nguồn và schema không tự cấu hình được Zalo cá nhân cho giáo viên.
- Nếu học viên chưa từng truy cập sau khi triển khai, chưa có dấu mốc để nhắc.
- Độ chính xác của thời điểm truy cập được làm tròn khoảng 10 phút để giảm request.
- Workflow n8n được dựng dựa trên giao diện node upstream tại thời điểm kiểm tra;
  cần xác nhận thử trong giao diện n8n thực tế trước khi bật.
