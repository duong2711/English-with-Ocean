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
echo [LDD] Tu dong tim/cai FFmpeg va eSpeak NG bang WinGet...
".venv\Scripts\python.exe" windows_audio_tools.py --install
if errorlevel 1 goto :fail
echo Dang chuan bi PyTorch ban CPU de tranh tai cac thu vien CUDA qua lon.
".venv\Scripts\python.exe" -m pip install torch --index-url https://download.pytorch.org/whl/cpu
if errorlevel 1 goto :fail
echo.
echo Dang cai OpenPronounce 0.3.0. Can bo nho va model lon.
".venv\Scripts\python.exe" -m pip install "openpronounce==0.3.0"
if errorlevel 1 goto :fail
echo.
echo [LDD] Co dinh PyAV 18.1.0 de tranh loi metadata_errors.
".venv\Scripts\python.exe" -m pip install "av==18.1.0"
if errorlevel 1 goto :fail
".venv\Scripts\python.exe" enable_openpronounce.py
if errorlevel 1 goto :fail
echo.
echo DA XONG. Chay stop.bat roi start.bat de tai cau hinh.
echo Lan cham dau tien can tai 2 model (~2.4 GB) va khoi dong cham.
if not defined LDD_OFFLINE_TEST pause
exit /b 0
:fail
echo.
echo [LOI] Chua bat tinh nang. Xem thong bao ben tren.
if not defined LDD_OFFLINE_TEST pause
exit /b 1
