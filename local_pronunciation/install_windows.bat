@echo off
setlocal
cd /d "%~dp0"
title LDD Pronunciation - Install

echo ================================================
echo   LDD LOCAL PRONUNCIATION - WINDOWS INSTALLER
echo ================================================
echo.

where py >nul 2>&1
if errorlevel 1 (
  echo [LOI] Chua co Python Launcher ^(py^). Cai Python 3.11 hoac 3.12 tu python.org, tick "Add Python to PATH", roi chay lai.
  pause
  exit /b 1
)

set "PY=py -3.11"
%PY% -c "import sys" >nul 2>&1
if errorlevel 1 set "PY=py -3"

if not exist ".venv\Scripts\python.exe" (
  echo [1/4] Tao moi truong Python...
  %PY% -m venv .venv
  if errorlevel 1 goto :fail
) else (
  echo [1/4] .venv da ton tai.
)

echo [2/4] Cai cac goi cham phat am...
".venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 goto :fail
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto :fail

echo [3/4] Kiem tra Cloudflare Tunnel...
where cloudflared >nul 2>&1
if errorlevel 1 (
  where winget >nul 2>&1
  if errorlevel 1 (
    echo [CANH BAO] Khong co winget. Hay cai cloudflared thu cong tu Cloudflare roi them vao PATH.
  ) else (
    winget install --id Cloudflare.cloudflared --exact --accept-package-agreements --accept-source-agreements
  )
) else (
  echo cloudflared da san sang.
)

if not exist ".env" (
  copy /Y ".env.example" ".env" >nul
  echo [4/4] Da tao .env.
) else (
  echo [4/4] .env da ton tai, khong ghi de.
)

echo.
echo =============================================================
echo CON 1 VIEC BAT BUOC:
echo Mo file .env va thay PASTE_SERVICE_ROLE_KEY_HERE bang service_role key cua Supabase.
echo TUYET DOI KHONG dua service_role key len GitHub hoac JS cua web.
echo =============================================================
echo.
start "" notepad "%~dp0.env"
echo Sau khi dien key, double-click start.bat de test lan dau.
pause
exit /b 0

:fail
echo.
echo [LOI] Cai dat that bai. Xem thong bao phia tren.
pause
exit /b 1
