@echo off
setlocal
cd /d "%~dp0"
title LDD English - Acer Nitro microphone test
echo ==================================================
echo   LDD ENGLISH - THU PHAT AM BANG GIONG NOI THAT
echo ==================================================
echo Trang se tu mo: http://127.0.0.1:8766/
echo KHONG CAN SUPABASE KEY. KHONG DAY DIEM LEN WEBSITE.
echo.
if not exist ".venv\Scripts\python.exe" (
  echo [LOI] Chua cai moi truong Python.
  echo Hay chay setup_acer_nitro.bat truoc.
  pause
  exit /b 1
)
".venv\Scripts\python.exe" windows_audio_tools.py
if errorlevel 1 (
  echo [LOI] Chua tim thay FFmpeg / eSpeak NG. Chay setup_acer_nitro.bat truoc.
  pause
  exit /b 1
)
".venv\Scripts\python.exe" live_test.py
if errorlevel 1 (
  echo [LOI] Khong mo duoc trang thu nghiem. Xem thong bao phia tren.
  pause
  exit /b 1
)
