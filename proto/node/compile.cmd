@echo off
echo.
echo.
echo     Copiando arquivos...
echo.

xcopy /Q /Y /S /EXCLUDE:.\exclude.txt .\* ..\www\

cordova build
