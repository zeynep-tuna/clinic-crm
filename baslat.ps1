Write-Host ""
Write-Host "====================================="
Write-Host "      ClinicCRM Baslatiliyor..."
Write-Host "====================================="
Write-Host ""

Write-Host "Docker kontrol ediliyor..."

do {
    try {
        docker info *> $null
        $ready = $true
    }
    catch {
        $ready = $false

        Write-Host ""
        Write-Host "Docker Desktop calismiyor."
        Write-Host "Lutfen Docker Desktop'i acin..."
        Write-Host ""

        Start-Sleep -Seconds 5
    }

} until ($ready)

Write-Host "Docker hazir."

Write-Host ""
Write-Host "PostgreSQL baslatiliyor..."
docker compose up -d

Write-Host ""
Write-Host "Backend baslatiliyor..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd backend; npm run start:dev"

Write-Host ""
Write-Host "Frontend baslatiliyor..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; npm run dev"

Write-Host ""
Write-Host "Tarayici aciliyor..."

Start-Sleep -Seconds 5

Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "ClinicCRM hazir!"