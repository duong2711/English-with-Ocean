@echo off
setlocal
cd /d "%~dp0"
title LDD Acer - Fix Whisper PyAV metadata_errors
echo ==================================================
echo  SUA LOI WHISPER: metadata_errors / PyAV
echo ==================================================
echo.
if not exist ".venv\Scripts\python.exe" (
  echo [LOI] Khong tim thay .venv. Hay chep file bat nay vao thu muc local_pronunciation CU.
  pause
  exit /b 1
)
echo [1/2] Cai PyAV 18.1.0 tu PyPI (tuong thich faster-whisper 1.2.1).
".venv\Scripts\python.exe" -m pip install --disable-pip-version-check --force-reinstall "av==18.1.0"
if errorlevel 1 goto :fail
echo.
echo [2/2] Kiem tra phien ban PyAV va Whisper...
".venv\Scripts\python.exe" -c "import av; from faster_whisper import WhisperModel; print('PyAV version:', av.__version__); print('Faster-Whisper: OK'); assert av.__version__.split('.')[0] == '18'"
if errorlevel 1 goto :fail
echo.
echo [OK] Da sua loi metadata_errors.
echo Hay dong cua so test cu va chay lai test_live_acer_nitro.bat.
echo KHONG CAN CAI LAI MODEL HAY NHAP SUPABASE KEY.
pause
exit /b 0
:fail
echo.
echo [LOI] Sua chua hoan tat. Hay gui dong loi hien o tren.
pause
exit /b 1
