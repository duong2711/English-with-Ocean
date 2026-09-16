@echo off
setlocal
set "TARGET=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\LDD-Pronunciation.cmd"
if exist "%TARGET%" del /q "%TARGET%"
echo Da tat tu khoi dong LDD Pronunciation Scorer.
pause
