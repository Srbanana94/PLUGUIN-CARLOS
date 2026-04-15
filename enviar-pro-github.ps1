$ErrorActionPreference = "Stop"

$gitPath = "C:\Program Files\Git\cmd\git.exe"

if (-Not (Test-Path $gitPath)) {
    Write-Host "O Git ainda nao terminou de instalar! Aguarde uns instantes e tente novamente." -ForegroundColor Red
    pause
    exit
}

Write-Host "Iniciando processo do envio..." -ForegroundColor Cyan

if (Test-Path ".git") {
    Remove-Item -Path ".git" -Recurse -Force
}

& $gitPath init
& $gitPath config user.name "Srbanana94"
& $gitPath config user.email "seu_email_github@gmail.com"
& $gitPath add .
& $gitPath commit -m "Primeira versao: Plugin de Topologia"
& $gitPath branch -M main
& $gitPath remote add origin https://github.com/Srbanana94/PLUGUIN-CARLOS.git

Write-Host ""
Write-Host " ATENCAO " -BackgroundColor DarkRed -ForegroundColor White
Write-Host "O Git pode abrir uma janela agora pedindo suas credenciais ou mandar um codigo pro seu navegador." -ForegroundColor Yellow
Write-Host "Faca o login normalmente para autorizar o envio dos seus arquivos!" -ForegroundColor Yellow
Write-Host ""

& $gitPath push -u origin main

Write-Host "Tudo pronto! Seu codigo esta nas nuvens." -ForegroundColor Green
pause
