param (
    [Parameter(Mandatory = $false)]
    [ValidateSet("local", "dev", "prod")]
    [string]$env = $null
)

# Interactive Menu if environment is missing
if ([string]::IsNullOrWhiteSpace($env)) {
    Write-Host "--- k6 Ramping Load Test Environment Selection ---" -ForegroundColor Cyan
    Write-Host "1. Local (.env)"
    Write-Host "2. Development (.env.dev)"
    Write-Host "3. Production (.env.prod)"
    try {
        $envChoice = Read-Host "Select Environment (1-3, Default is 1)"
        if ([string]::IsNullOrWhiteSpace($envChoice)) { $envChoice = "1" }
        $env = switch ($envChoice) {
            "1" { "local" }
            "2" { "dev" }
            "3" { "prod" }
            default { "local" }
        }
    }
    catch {
        Write-Warning "Interactive mode failed. Defaulting to 'local'."
        $env = "local"
    }
}

$envFile = switch ($env) {
    "local" { ".env" }
    "dev" { ".env.dev" }
    "prod" { ".env.prod" }
    default { ".env" }
}

if ([string]::IsNullOrWhiteSpace($envFile) -or -not (Test-Path $envFile)) {
    Write-Error "Environment file '$envFile' not found in $(Get-Location)."
    exit 1
}

Write-Host "`n--- Starting k6 Ramping Load Test ---" -ForegroundColor Cyan
Write-Host "Environment : $env ($envFile)"
Write-Host "Mode        : Ramping (10 -> 10000 -> 0 VUs)"

# Robustly load variables from .env file
$envVars = @{}
Get-Content $envFile | Where-Object { $_ -match '^[^#].*=' } | ForEach-Object {
    $parts = $_ -split '=', 2
    if ($parts.Count -eq 2) {
        $name = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")
        $envVars[$name] = $value
    }
}

$baseUrl = $envVars["BASE_URL"]
if (-not $baseUrl) {
    Write-Warning "BASE_URL not found in $envFile. Using default: http://localhost:3000"
    $baseUrl = "http://localhost:3000"
}

# --- Pre-flight Server Check ---
Write-Host "Checking if server is reachable at $baseUrl..." -NoNewline
try {
    $check = Invoke-WebRequest -Uri $baseUrl -Method Head -TimeoutSec 5 -ErrorAction Stop
    Write-Host " [OK]" -ForegroundColor Green
} catch {
    Write-Host " [FAILED]" -ForegroundColor Red
    Write-Error "Could not connect to $baseUrl. Please make sure your server is running before starting the load test."
    exit 1
}

# --- High Load Warning ---
Write-Host "`nWARNING: You are about to run a test that ramps up to 10,000 VUs." -ForegroundColor Yellow
Write-Host "This may crash your local server or consume significant system resources." -ForegroundColor Yellow
Write-Host "Press any key to continue or Ctrl+C to cancel..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Run k6
Write-Host "`nTarget URL   : $baseUrl`n" -ForegroundColor Yellow

# Note: VUs and Duration are now controlled by stages in load-test.js
k6 run `
    -e BASE_URL=$baseUrl `
    tests/k6/load-test.js

Write-Host "`n--- Load Test Completed ---" -ForegroundColor Green
