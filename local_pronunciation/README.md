# LDD Local Pronunciation Scorer

Máy chấm phát âm chạy nền trên laptop Acer Nitro 5 Tiger của giáo viên.

## Mục tiêu

- Không dùng API chấm phát âm trả phí.
- Audio của các bài có câu chuẩn đi **thẳng từ trình duyệt học viên đến laptop**, không đi qua Supabase Storage khi chấm local thành công.
- Supabase chỉ giữ kết quả nhỏ: điểm, transcript và feedback.
- Một worker xử lý tuần tự để không tranh tài nguyên với công việc khác trên laptop.
- Tự nghỉ khi laptop chạy pin, CPU >= 85% hoặc RTX GPU >= 70%.
- Nếu laptop/tunnel offline, web vẫn dùng luồng cũ: upload bản ghi để giảng viên chấm.

## Hiện hỗ trợ auto-score

- `ls1_qa` — Giai đoạn 1: Hỏi-đáp.
- `ls1_opener` — Giai đoạn 1: Mở lời/tình huống.
- `ls2_shadow` — Giai đoạn 2: Shadowing.

`ls2_narrate` và `ls3_topic` vẫn chuyển giảng viên chấm vì không có một câu chuẩn cố định để đối chiếu an toàn.

> V1 là điểm beta dựa trên transcript match + completeness + fluency + Whisper word confidence. Nó chưa phải phoneme-level pronunciation assessment.

## Cài lần đầu trên Windows

1. Pull/download repo mới nhất.
2. Mở thư mục `local_pronunciation`.
3. Double-click `install_windows.bat`.
4. Installer tạo `.venv`, cài Python packages, cài `cloudflared` bằng winget nếu có, và tạo `.env`.
5. Trong `.env`, chỉ cần thay:

```env
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY_HERE
```

Lấy `service_role` key từ Supabase Dashboard của project. **Key này chỉ được nằm trong `.env` trên laptop. Tuyệt đối không đưa lên JS/web/GitHub.**

Anon key đã được điền sẵn vì đó là public client key mà website đang dùng.

## Chạy thử lần đầu

Double-click:

```text
start.bat
```

Khi hoạt động bình thường, launcher sẽ:

1. chạy FastAPI ở `127.0.0.1:8765`;
2. tạo Cloudflare Quick Tunnel HTTPS miễn phí;
3. tự ghi URL tunnel hiện tại vào `ldd_runtime_config.pronunciation_server_url`;
4. web học viên tự tìm URL đó, không cần sửa domain mỗi lần khởi động;
5. khi tắt server, URL runtime được xóa.

Kiểm tra local:

```text
http://127.0.0.1:8765/health
```

## Chạy ẩn

Double-click:

```text
start_hidden.vbs
```

Không hiện cửa sổ CMD. Log nằm ở `scorer.log`.

Dừng sạch:

```text
stop.bat
```

`stop.bat` tạo `stop.flag`; launcher tự xóa URL tunnel rồi đóng server/tunnel.

## Tự chạy khi đăng nhập Windows

Bật:

```text
install_autostart.bat
```

Tắt:

```text
remove_autostart.bat
```

Cơ chế này chỉ dùng Startup folder của user, không cần chạy server dưới quyền Administrator.

## GPU RTX 3050

Cấu hình mặc định:

```env
WHISPER_MODEL=small.en
WHISPER_DEVICE=auto
WHISPER_COMPUTE_TYPE=int8_float16
```

Server thử RTX 3050 trước. Nếu môi trường CUDA/cuDNN chưa sẵn sàng, nó tự fallback về CPU `int8` để hệ thống vẫn chạy.

Nếu log có dòng `CUDA chưa dùng được ... fallback CPU int8`, phần web vẫn hoạt động; chỉ tốc độ chấm chậm hơn. Có thể cấu hình CUDA 12 + cuDNN 9 sau để bật GPU đầy đủ.

## Cách chấm và bảo mật

Browser **không được quyền quyết định câu chuẩn**. Browser chỉ gửi:

- audio;
- `item_type`;
- `item_key`;
- JWT đăng nhập;
- `client_job_id` chống gửi trùng.

Laptop:

1. xác minh JWT với Supabase Auth;
2. dùng service-role đọc câu chuẩn trực tiếp từ ngân hàng câu hỏi;
3. chấm audio;
4. dùng service-role ghi kết quả vào `speaking_comments`;
5. xóa audio local sau khi chấm xong.

Do đó học viên sửa JavaScript để gửi câu chuẩn giả không thể tự tạo điểm 100.

## Egress

Khi local scoring thành công:

```text
Browser học viên -> Cloudflare Tunnel -> laptop
                                     -> Supabase: chỉ JSON kết quả nhỏ
```

Audio không được upload lên Supabase Storage. Các request Supabase cần thiết còn lại là xác thực user, lookup câu chuẩn (được cache trên laptop) và lưu kết quả.

## Queue

- Chỉ 1 job được chấm tại một thời điểm.
- Job được ghi xuống thư mục `queue/`, nên restart server không làm mất các job đang chờ.
- Khi chạy pin / CPU hoặc GPU bận, trạng thái job thành `paused` và tự tiếp tục khi máy rảnh.
- Model tự unload sau 15 phút không có việc để nhả RAM/VRAM.

## File không được commit

`.gitignore` chặn:

- `.env`
- `.venv/`
- `queue/`
- `scorer.log`
- `stop.flag`

Không commit service-role key dưới bất kỳ hình thức nào.
