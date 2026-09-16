@echo off
setlocal
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET=%STARTUP%\LDD-Pronunciation.cmd"
>"%TARGET%" echo @wscript.exe "%~dp0start_hidden.vbs"
echo Da bat tu khoi dong LDD Pronunciation Scorer khi dang nhap Windows.
echo File: %TARGET%
pause
