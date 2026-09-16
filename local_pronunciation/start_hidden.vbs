Option Explicit
Dim shell, fso, base, cmd
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
base = fso.GetParentFolderName(WScript.ScriptFullName)
cmd = "cmd /c """ & base & "\start.bat"" >> """ & base & "\scorer.log"" 2>&1"
shell.Run cmd, 0, False
