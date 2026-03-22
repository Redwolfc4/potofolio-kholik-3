@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "ROOT_DIR=%%~fI"
set "ENV_FILE=%ROOT_DIR%\.env"

if exist "%ENV_FILE%" (
    for /f "usebackq tokens=1* delims==" %%A in ("%ENV_FILE%") do (
        set "k=%%A"
        set "v=%%B"
        for /f "tokens=1" %%i in ("!k!") do set "k=%%i"
        if not "!k!"=="" (
            set "FIRST=!k:~0,1!"
            if not "!FIRST!"=="#" (
                if defined v (
                    set "v=!v:"=!"
                    set "v=!v:'=!"
                )
                set "!k!=!v!"
            )
        )
    )
)

if "%NETLIFY_SITE_ID%"=="" (
    echo Error Missing NETLIFY_SITE_ID
    exit /b 1
)
if "%NETLIFY_AUTH_TOKEN%"=="" (
    echo Error Missing NETLIFY_AUTH_TOKEN
    exit /b 1
)

echo Deploying to Netlify...
call pnpm dlx netlify-cli deploy --build --prod
