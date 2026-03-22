$logos = @{
    "dicoding" = "https://www.dicoding.com/images/default/logo/dicoding-logo.png"
    "mikrotik" = "https://mikrotik.com/img/logo_m_64.png"
    "alibaba" = "https://img.alicdn.com/tfs/TB1_uT8n7L0gK0jSZFAXXcA7pXa-477-121.png"
    "codepolitan" = "https://www.codepolitan.com/assets/img/logo.png"
    "microsoft" = "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/image/RW4ESm"
    "dicoding-dart" = "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/certificate/EYX4KK286PDL/certificate.jpg"
}

if (-not (Test-Path "public/logos")) { mkdir "public/logos" }

foreach ($name in $logos.Keys) {
    $url = $logos[$name]
    $ext = if ($url -like "*jpg*" -or $url -like "*jpeg*") { "jpg" } else { "png" }
    $outFile = "public/logos/$name.$ext"
    Write-Host "Downloading $url to $outFile"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -ErrorAction Stop
    } catch {
        Write-Warning "Failed to download $name: $_"
    }
}
