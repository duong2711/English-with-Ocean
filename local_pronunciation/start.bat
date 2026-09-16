@echo off
setlocal
cd /d "%~dp0"
if exist "stop.flag" del /q "stop.flag" >nul 2>&1
if not exist ".venv\Scripts\python.exe" (
  echo Chua cai local scorer. Dang mo install_windows.bat...
  call install_windows.bat
  if errorlevel 1 exit /b 1
)
".venv\Scripts\python.exe" launcher.py
if errorlevel 1 (
  echo.
  echo Local scorer da dung do loi. Xem thong bao phia tren.
  pause
)
