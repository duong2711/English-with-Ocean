# C15 Game Boost

Ứng dụng 2 nút dành cho realme C15 Qualcomm Edition RMX2194 / Android 11.

## Chức năng

- **BẬT CHẾ ĐỘ LIÊN QUÂN**
  - Đặt animation = 0.
  - Tạm `pm suspend` + `am force-stop` các app phụ.
  - Không đụng Messenger, Zalo, Google Play Services, Liên Quân, launcher, Phone/SystemUI.
  - Tự mở Liên Quân sau khi tối ưu.
- **KHÔI PHỤC BÌNH THƯỜNG**
  - `pm unsuspend` lại toàn bộ danh sách.
  - Khôi phục đúng 3 animation scale đã có trước khi bật game mode.

## Yêu cầu

- Cài Shizuku.
- Trên máy không root, Shizuku phải ở trạng thái **Running**. Android 11 có thể start bằng Wireless debugging; sau reboot thường phải start Shizuku lại.
- Lần đầu mở app, cấp quyền cho C15 Game Boost trong Shizuku.

## Build APK

Mở thư mục này bằng Android Studio, chờ Gradle sync rồi chọn:

`Build > Build APK(s)`

APK debug nằm tại:

`app/build/outputs/apk/debug/app-debug.apk`

## Danh sách luôn được bảo vệ

- Messenger — `com.facebook.orca`
- Zalo — `com.zing.zalo`
- Google Play Services — `com.google.android.gms`
- Liên Quân — `com.garena.game.kgvn`
- Niagara — `bitpit.launcher`
- Lawnchair — `app.lawnchair.play`
- Realme System Launcher — `com.oppo.launcher`
- SystemUI / Phone

## Lưu ý

App dùng Shizuku UserService chạy với UID shell/root và chỉ dùng `pm suspend/unsuspend`, `am force-stop`, `settings put/get`. Không uninstall package.
