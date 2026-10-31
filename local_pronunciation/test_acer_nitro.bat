@echo off
setlocal
cd /d "%~dp0"
title LDD Acer Nitro - Offline Diagnostic
if not exist ".venv\Scripts\python.exe" (
  echo [LOI] Chua co moi truong Python. Chay setup_acer_nitro.bat truoc.
  pause
  exit /b 1
)
".venv\Scripts\python.exe" test_acer_nitro.py --full
set "RESULT=%ERRORLEVEL%"
echo.
if "%RESULT%"=="0" (
  echo TEST MODEL HOAN TAT (GIONG MAY).
) else (
  echo TEST CHUA DAT - ma loi %RESULT%.
)
pause
exit /b %RESULT%
