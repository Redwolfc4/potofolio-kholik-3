param (
    [Parameter(Mandatory=$false)]
    [ValidateSet("local", "dev", "prod")]
    [string]$env = $null,

    [Parameter(Mandatory=$false)]
    [ValidateSet(10, 50, 100, 1000, 1500, 10000)]
    [int]$vus = 0,

    [Parameter(Mandatory=$false)]
    [string]$duration = "30s"
)

# Interactive Menu if parameters are missing
if ($null -eq $env) {
    Write-Host "--- k6 Load Test Environment Selection ---" -ForegroundColor Cyan
    Write-Host "1. Local (.env)"
    Write-Host "2. Development (.env.dev)"
    Write-Host "3. Production (.env.prod)"
    $envChoice = Read-Host "Select Environment (1-3)"
    $env = switch ($envChoice) {
        "1" { "local" }
        "2" { "dev" }
        "3" { "prod" }
        default { "dev" }
    }
}

if ($vus -eq 0) {
    Write-Host "`n--- k6 VU Concurrency Selection ---" -ForegroundColor Cyan
    Write-Host "1. 10 VUs"
    Write-Host "2. 50 VUs"
    Write-Host "3. 100 VUs"
    Write-Host "4. 1000 VUs"
    Write-Host "5. 1500 VUs"
    Write-Host "6. 10000 VUs"
    $vuChoice = Read-Host "Select VU Tier (1-6)"
    $vus = switch ($vuChoice) {
        "1" { 10 }
        "2" { 50 }
        "3" { 100 }
        "4" { 1000 }
        "5" { 1500 }
        "6" { 10000 }
        default { 10 }
    }
}

$envFile = switch ($env) {
    "local" { ".env" }
    "dev"   { ".env.dev" }
    "prod"  { ".env.prod" }
}

if (-not (Test-Path $envFile)) {
    Write-Error "Environment file $envFile not found in $(Get-Location)."
    exit 1
}

Write-Host "`n--- Starting k6 Load Test ---" -ForegroundColor Cyan
Write-Host "Environment : $env ($envFile)"
Write-Host "Virtual Users: $vus"
Write-Host "Duration     : $duration"

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

# Run k6
Write-Host "Target URL   : $baseUrl`n" -ForegroundColor Yellow

k6 run `
    -e BASE_URL=$baseUrl `
    -e VUS=$vus `
    -e DURATION=$duration `
    --vus $vus `
    --duration $duration `
    tests/k6/load-test.js

Write-Host "`n--- Load Test Completed ---" -ForegroundColor Green
