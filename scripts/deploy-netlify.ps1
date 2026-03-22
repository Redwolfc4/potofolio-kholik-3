$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env"

function Import-EnvFile {
    param(
        [string]$Path
    )

    if (-not (Test-Path $Path)) {
        return
    }

    Get-Content $Path | ForEach-Object {
        $line = $_.Trim()

        if (-not $line -or $line.StartsWith("#")) {
            return
        }

        $parts = $line -split "=", 2
        if ($parts.Count -ne 2) {
            return
        }

        $key = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")

        if (-not [string]::IsNullOrWhiteSpace($key) -and -not [Environment]::GetEnvironmentVariable($key, "Process")) {
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

Import-EnvFile -Path $envFile

$requiredVars = @(
    "NETLIFY_SITE_ID",
    "NETLIFY_AUTH_TOKEN"
)

$missingVars = $requiredVars | Where-Object {
    [string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($_, "Process"))
}

if ($missingVars.Count -gt 0) {
    throw "Missing environment variable(s): $($missingVars -join ', '). Fill them in .env or your shell session first."
}

Write-Host "Deploying to Netlify production..."
pnpm --package=netlify-cli dlx netlify deploy --build --prod

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host "Netlify deploy completed."
