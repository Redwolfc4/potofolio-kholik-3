$ErrorActionPreference = "Stop"

# Define project root and env paths
$root = Split-Path -Parent $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($root)) { $root = $PWD }
$envFile = Join-Path $root ".env"

# Function to load .env variables into Process scope
function Import-EnvFile {
    param([string]$Path)
    if (-not (Test-Path $Path)) { 
        Write-Host "Warning: .env file not found at $Path" -ForegroundColor Yellow
        return 
    }
    
    Write-Host "Loading environment variables from .env..." -ForegroundColor Cyan
    Get-Content $Path | ForEach-Object {
        $line = $_.Trim()
        if (-not $line -or $line.StartsWith("#")) { return }
        
        $parts = $line -split "=", 2
        if ($parts.Count -ne 2) { return }
        
        $key = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")
        
        if (-not [string]::IsNullOrWhiteSpace($key)) {
            # Set for current process
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

Import-EnvFile -Path $envFile

# Configuration Check
$token = [Environment]::GetEnvironmentVariable("NETLIFY_AUTH_TOKEN", "Process")
$siteId = [Environment]::GetEnvironmentVariable("NETLIFY_SITE_ID", "Process")

# Function to check if authenticated
function Verify-NetlifyAuth {
    Write-Host "Verifying Netlify authentication..." -ForegroundColor Cyan
    
    # 1. CI/CD Token check
    if (-not [string]::IsNullOrWhiteSpace($token)) {
        Write-Host "[OK] Found NETLIFY_AUTH_TOKEN in environment." -ForegroundColor Green
        return $true
    }

    # 2. Local CLI session check
    try {
        # Redirect error to null to avoid cluttering if not logged in
        $whoami = pnpm --package=netlify-cli dlx netlify whoami --json 2>$null | ConvertFrom-Json
        if ($whoami.name -or $whoami.email) {
            Write-Host "[OK] Authenticated as: $($whoami.email)" -ForegroundColor Green
            return $true
        }
    } catch {
        # Fallback if JSON parsing fails or command fails
    }
    
    return $false
}

# --- Main Execution ---

if (-not (Verify-NetlifyAuth)) {
    Write-Host ""
    Write-Host "Error: Not authenticated with Netlify!" -ForegroundColor Red
    Write-Host "Please follow one of these steps:" -ForegroundColor Yellow
    Write-Host "  1. Add a valid 'NETLIFY_AUTH_TOKEN' to your .env file."
    Write-Host "  2. Run 'pnpm dlx netlify login' to authorize your local CLI."
    exit 1
}

if ([string]::IsNullOrWhiteSpace($siteId)) {
    Write-Host ""
    Write-Host "Error: NETLIFY_SITE_ID is missing!" -ForegroundColor Red
    Write-Host "Please set it in your .env file." -ForegroundColor Yellow
    Write-Host "Note: You can find your API ID in Netlify Site Settings > General > Site information."
    exit 1
}

Write-Host "Starting deployment for Site ID: $siteId..." -ForegroundColor Cyan

try {
    # Execute deploy
    # We use --site flag explicitly to avoid "retrieve project" issues if not linked
    pnpm --package=netlify-cli dlx netlify deploy --build --prod --site $siteId
    
    if ($LASTEXITCODE -ne 0) {
        throw "Netlify CLI exited with code $LASTEXITCODE"
    }
} catch {
    Write-Host ""
    Write-Host "Deployment failed!" -ForegroundColor Red
    
    $err = $_.Exception.Message
    if ($err -like "*Unauthorized*" -or $err -like "*retrieve project*") {
        Write-Host "Potential causes:" -ForegroundColor Yellow
        Write-Host "  - Invalid NETLIFY_AUTH_TOKEN."
        Write-Host "  - The NETLIFY_SITE_ID ($siteId) is incorrect or you don't have access to it."
        Write-Host "  - Pro-tip: Ensure NETLIFY_SITE_ID is the 'API ID' (UUID format) from Netlify settings."
    } else {
        Write-Host "Error details: $err" -ForegroundColor Red
    }
    
    exit 1
}

Write-Host ""
Write-Host "[OK] Netlify deployment completed successfully!" -ForegroundColor Green
