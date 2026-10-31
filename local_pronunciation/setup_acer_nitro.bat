@echo off
setlocal
cd /d "%~dp0"
title LDD Acer Nitro - OpenPronounce Setup
echo =================================================
echo  LDD ENGLISH - ACER NITRO RTX 3050 - THU NGHIEM
echo =================================================
echo.
if not exist ".venv\Scripts\python.exe" (
    echo Can cai may cham co ban lan dau.
    call install_windows.bat
    if errorlevel 1 goto :fail
)
echo.
echo [1/3] Cai OpenPronounce ban CPU, Whisper tu dong thu RTX 3050...
call enable_openpronounce.bat
if errorlevel 1 goto :fail
echo.
echo [2/3] Ap dung profile Acer Nitro...
".venv\Scripts\python.exe" configure_acer_nitro.py
if errorlevel 1 goto :fail
echo.
echo [3/3] Thu xu ly offline tren giong doc may (khong can key Supabase)...
".venv\Scripts\python.exe" test_acer_nitro.py --full
if errorlevel 1 goto :fail
echo.
echo =================================================
echo  TEST OFFLINE DA CHAY. KHONG PHAI TEST GIONG HOC SINH.
echo  De noi voi website, cai SUPABASE_SERVICE_ROLE_KEY
echo  trong .env, sau do chay start.bat.
echo =================================================
pause
exit /b 0
:fail
echo.
echo [CANH BAO] Thu nghiem chua hoan tat; xem thong bao phia tren.
echo Cac tinh nang speaking hien co khong bi thay doi.
pause
exit /b 1
