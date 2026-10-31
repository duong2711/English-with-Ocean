# LDD Local Pronunciation Scorer

Máy chấm phát âm chạy nền trên máy tính Windows của giáo viên (máy mục tiêu thử nghiệm: i3-10100, GTX 1050 Ti, RAM 8 GB).

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

## Nếu gặp lỗi thiếu FFmpeg / eSpeak NG trên Windows

Bản cài Acer mới tự tìm ứng dụng trong WinGet và các thư mục phổ biến. Nếu chưa cài, `setup_acer_nitro.bat` sẽ gọi WinGet để cài chính thức và tìm lại đường dẫn ngay trong phiên chạy đó (không cần tự sửa PATH). Sau khi cập nhật mã nguồn mới, chạy lại **cùng một file** `setup_acer_nitro.bat`.

Nếu Windows thiếu WinGet hoặc trình cài yêu cầu quyền quản trị, dùng terminal trên máy của bạn (không nhập key Supabase) để chạy:

```powershell
winget install -e --id Gyan.FFmpeg --accept-package-agreements --accept-source-agreements
winget install -e --id eSpeak-NG.eSpeak-NG --accept-package-agreements --accept-source-agreements
```

Sau đó mở terminal mới hoặc chạy lại bản cài. Nếu trong log `espeak DLL: CHUA TIM THAY`, kiểm tra `C:\Program Files\eSpeak NG\libespeak-ng.dll`; phonemizer cần DLL ngoài file chạy eSpeak. Máy Acer dùng bản chạy offline không yêu cầu khóa Supabase: chỉ khi bạn muốn đưa bản chấm lên LDD English qua `start.bat` mới điền khóa vào `.env` **trên máy tính**, tuyệt đối không gửi khóa vào chat hoặc GitHub.

## Acer Nitro 5 / RTX 3050 — thử nghiệm trên laptop

Đây là cấu hình **riêng cho laptop Acer Nitro** của giáo viên. File `setup_acer_nitro.bat` **không đổi secret Supabase đã có** và không thay thế cấu hình desktop GTX 1050 Ti trong repo. Chỉ áp dụng lên máy cài đặt khi chạy file trên chính máy đó.

1. Tải/clone phiên bản repo mới nhất vào Acer Nitro. Cần Windows, Python, **FFmpeg** và **eSpeak NG** trong `PATH`.
2. Mở `local_pronunciation`, bấm `setup_acer_nitro.bat`. File tự gọi cài ban đầu nếu thiếu, cài PyTorch/OpenPronounce, chọn profile Acer, sau đó chạy một bài mô phỏng giọng đọc máy hoàn toàn tại laptop.
3. Lần đầu tải khoảng **2,4 GB checkpoint** cho OpenPronounce, cộng thêm Whisper và các thư viện nên cần không gian ổ đĩa, thời gian tải và RAM trống.
4. Nếu test thành công, bạn có thể chạy `start.bat` để phục vụ phòng thử nghiệm (cần khóa `SUPABASE_SERVICE_ROLE_KEY` trong `.env` riêng trên laptop). Không nhập khóa đó vào chat hoặc GitHub.
5. Trên web, chỉ giáo viên mở `https://lddenglish.page/ldd-speaking-pilot.html`, ghi âm và xem kết quả beta. Bài đọc thật của học viên vẫn cần kiểm chứng riêng.

Profile Acer chọn Whisper **tự thử RTX 3050**, tự chuyển về CPU `int8` khi CUDA/cuDNN không tương thích. OpenPronounce mặc định chạy trên CPU để tránh tranh 4 GB VRAM. Laptop có thể nóng và xử lý chậm với bài dài; chạy theo hàng chờ một bài/lần. Máy sẽ tạm nghỉ khi chạy pin hoặc quá tải.

**Giới hạn:** Bộ test tự sinh giọng đọc máy bằng eSpeak NG. Nó kiểm tra mô hình có chạy trên Acer không, **không chứng minh độ chính xác trên giọng học viên**. Chưa thể chạy phần kiểm tra này từ GitHub hoặc ChatGPT khi không có kết nối điều khiển Windows của Acer.

## Máy chấm i3-10100 / GTX 1050 Ti / RAM 8 GB

Ưu tiên profile **CPU + int8** để tránh GPU GTX 1050 Ti 4 GB bị thiếu VRAM. Chạy một bài tại một thời điểm theo queue sẵn có. OpenPronounce cần 2 model Wav2Vec2 lớn; nếu RAM còn trống dưới 3,5 GB, phần chấm âm sẽ báo chưa đủ RAM, không trả điểm giả. Nâng RAM lên 16 GB sẽ hữu ích nếu muốn chạy ổn định hơn.

```env
WHISPER_MODEL=small.en
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8
OPENPRONOUNCE_ENABLED=0
OPENPRONOUNCE_DEVICE=cpu
OMP_NUM_THREADS=2
MKL_NUM_THREADS=2
```

Chạy `enable_openpronounce.bat` để tự chọn profile này khi bật bản thử nghiệm. GPU có thể thử lại sau khi kiểm chứng CUDA/VRAM và tốc độ trên máy thật.

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

## Bản thử nghiệm OpenPronounce — đọc đoạn dài (giáo viên)

- Đường dẫn khi website triển khai: `https://lddenglish.page/ldd-speaking-pilot.html`.
- Chỉ email giáo viên trong `PILOT_TEACHER_EMAILS` được gửi bản ghi; máy chấm xác minh email qua Supabase Auth.
- Dán văn bản 20–360 từ, ghi âm hoặc chọn file rồi bấm **Chấm thử**.
- Phân tích từng đoạn nhỏ căn cứ vào từ khóa đã nhận diện. Phần nào không khớp đủ an toàn sẽ **không** bị kết luận là phát âm sai.
- Điểm OpenPronounce là thử nghiệm; điểm nhận diện nội dung Whisper **không** được coi là điểm phát âm. Không ghi điểm, audio hay nhận xét vào `speaking_comments`/Supabase Storage.
- Khi chưa cài hoặc chưa bật OpenPronounce, giao diện báo chưa có chấm âm; không tự tạo điểm.
- Chưa hỗ trợ chấm chuẩn âm cho bài **nói tự do** (IELTS Speaking) vì không có câu chuẩn. Giai đoạn này chỉ phục vụ **đọc theo văn bản có sẵn**.

### Cài thêm OpenPronounce trên laptop

1. Cài máy chấm hiện có với `install_windows.bat` và cấu hình `.env`.
2. Đảm bảo Windows có `ffmpeg` và `espeak-ng` trong `PATH`. Chúng là phụ thuộc của OpenPronounce.
3. Chạy `enable_openpronounce.bat` để cài `openpronounce==0.3.0`, kiểm tra phụ thuộc và tự ghi `OPENPRONOUNCE_ENABLED=1` vào `.env`.
4. Dừng bằng `stop.bat`, sau đó bật bằng `start.bat`. Chương trình tự đưa URL Cloudflare Tunnel vào `ldd_runtime_config` cho website.
5. Mở URL phòng thử nghiệm, đăng nhập bằng tài khoản giảng viên. Có thể kiểm tra trạng thái laptop tại `/health` qua đường dẫn tunnel.

**Chi phí/giới hạn:** Không có phí API OpenPronounce, nhưng máy giáo viên phải bật, có CPU/RAM đủ lớn và cần tải khoảng 2,4 GB trọng số mô hình Wav2Vec2 vào bộ nhớ đĩa ở lần đầu. Giai đoạn đầu không ép cài các model nặng cho toàn bộ học viên. Kết quả từng âm có thể báo nhầm với trẻ nhỏ, giọng địa phương hoặc tiếng ồn. Cần kiểm chứng trên mẫu giọng học viên thật trước khi mở rộng.

### Cấu hình tùy chọn

```env
OPENPRONOUNCE_ENABLED=0
PILOT_TEACHER_EMAILS=lddbaiu@gmail.com
MAX_PILOT_AUDIO_BYTES=12582912
```

Vì mô hình lớn và yêu cầu CPU/RAM, OpenPronounce chỉ được chạy trong job **pilot_reading**. Mọi bài Speaking bình thường vẫn giữ cơ chế chấm hiện tại / giáo viên chấm. Không cần FreeLLMAPI cho giai đoạn thử nghiệm này; FreeLLMAPI có thể bổ sung sau để tạo nhận xét nhưng không thay thế đánh giá âm vị.
