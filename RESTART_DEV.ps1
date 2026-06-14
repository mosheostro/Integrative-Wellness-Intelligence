# HOLOS — Fix & Restart Script
# Double-click or run in PowerShell to: clear git locks, commit changes, push, and restart dev server

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$appDir     = Join-Path $projectDir "holos-app"

Write-Host ""
Write-Host "  ◈ HOLOS Restart & Fix Script" -ForegroundColor Cyan
Write-Host "  ─────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# 1. Clear git lock files
Write-Host "  [1/4] Clearing git locks..." -ForegroundColor Yellow
$locks = @(".git\index.lock", ".git\index.lock.lock")
foreach ($lock in $locks) {
    $p = Join-Path $projectDir $lock
    if (Test-Path $p) { Remove-Item $p -Force; Write-Host "       Removed $lock" -ForegroundColor Green }
}

# 2. Stage & commit
Write-Host ""
Write-Host "  [2/4] Committing changes..." -ForegroundColor Yellow
Set-Location $projectDir
git add -A 2>&1
git commit -m "fix: assessment route truncation, middleware guard, env template, restart script" 2>&1
git push 2>&1
Write-Host "       Done" -ForegroundColor Green

# 3. Kill stale :3000
Write-Host ""
Write-Host "  [3/4] Stopping any process on port 3000..." -ForegroundColor Yellow
$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($conn) {
    Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    Write-Host "       Killed PID $($conn.OwningProcess)" -ForegroundColor Green
} else {
    Write-Host "       No process on :3000" -ForegroundColor Gray
}

Start-Sleep -Seconds 2

# 4. Start dev server
Write-Host ""
Write-Host "  [4/4] Starting Next.js dev server..." -ForegroundColor Yellow
Write-Host "        Visit http://localhost:3000 once you see 'Ready'" -ForegroundColor DarkGray
Write-Host ""
Set-Location $appDir
npm run dev
