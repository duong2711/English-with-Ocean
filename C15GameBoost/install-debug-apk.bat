@echo off
set APK=app\build\outputs\apk\debug\app-debug.apk
if not exist "%APK%" (
  echo Chua tim thay %APK%
  echo Hay Build APK trong Android Studio truoc.
  pause
  exit /b 1
)
adb install -r "%APK%"
pause
