# HOLOS — push fix script
# Run this in PowerShell from anywhere. Double-click or right-click → Run with PowerShell.

$repo = "C:\Users\evgen\Claude\Projects\HOLOS Integrative Wellness Intelligence"
$app  = "$repo\holos-app"

Set-Location $repo

# Remove stale git lock files (safe — these are leftover from a crashed process)
$locks = @(
  ".git\index.lock",
  ".git\HEAD.lock",
  ".git\refs\heads\main.lock",
  ".git\objects\maintenance.lock"
)
foreach ($lock in $locks) {
  $path = Join-Path $repo $lock
  if (Test-Path $path) {
    Remove-Item -Force $path
    Write-Host "Removed $lock"
  }
}

# Push
Set-Location $app
git push origin main

Write-Host ""
Write-Host "Done! If git asked for credentials, use your GitHub username + a Personal Access Token."
Write-Host "Generate one at: https://github.com/settings/tokens (scopes: repo)"
