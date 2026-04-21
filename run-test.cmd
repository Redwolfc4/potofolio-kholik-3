@echo off
setlocal

:: This script is a wrapper for run-test.ps1
:: It allows running the load tests from CMD or by double-clicking.

powershell -ExecutionPolicy Bypass -File "%~dp0run-test.ps1" %*

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Load test failed or was cancelled.
    pause
)
