@echo off
setlocal enabledelayedexpansion
set "TEMP_DIR=%~dp0"
for %%I in ("%TEMP_DIR%..") do set "ROOT_DIR=%%~fI"
set "ENV_FILE=%ROOT_DIR%\.env"

echo Parsing %ENV_FILE%
if exist "%ENV_FILE%" (
    for /f "usebackq tokens=1,2 delims==" %%A in ("%ENV_FILE%") do (
        set "KEY_RAW=%%A"
        set "VAL_RAW=%%B"
        echo RAW: %%A = %%B
        if not "!KEY_RAW!"=="" (
            set "FIRSTCHAR=!KEY_RAW:~0,1!"
            echo FIRSTCHAR: !FIRSTCHAR!
        )
    )
)
echo Done.
