@echo off
setlocal
cd /d "%~dp0"
title LDD OpenPronounce Beta Setup
echo =============================================
echo  CAI OPENPRONOUNCE - CHAM DOAN DOC DAI (BETA)
echo =============================================
echo.
if not exist ".venv\Scripts\python.exe" (
  echo [LOI] Chay install_windows.bat de cai may cham ban dau.
  pause
  exit /b 1
)
where ffmpeg >nul 2>&1
if errorlevel 1 (
  echo [LOI] Chua co ffmpeg trong PATH.
  echo Cai FFmpeg tu https://ffmpeg.org/download.html roi mo lai file nay.
  pause
  exit /b 1
)
where espeak-ng >nul 2>&1
if errorlevel 1 (
  echo [LOI] Chua co espeak-ng trong PATH.
  echo Cai eSpeak NG tu https://github.com/espeak-ng/espeak-ng/releases roi mo lai file nay.
  pause
  exit /b 1
)
echo Dang cai OpenPronounce 0.3.0. Can bo nho va model lon.
".venv\Scripts\python.exe" -m pip install "openpronounce==0.3.0"
if errorlevel 1 goto :fail
".venv\Scripts\python.exe" enable_openpronounce.py
if errorlevel 1 goto :fail
echo.
echo DA XONG. Chay stop.bat roi start.bat de tai cau hinh.
echo Lan cham dau tien can tai 2 model (~2.4 GB) va khoi dong cham.
pause
exit /b 0
:fail
echo.
echo [LOI] Chua bat tinh nang. Xem thong bao ben tren.
pause
exit /b 1
