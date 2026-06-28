# scripts/setup_dev.ps1

Write-Host "Setting up Python development environment..." -ForegroundColor Cyan

uv sync

uv add --dev ruff pytest pre-commit

uv run pre-commit install

Write-Host "`nChecking tools..." -ForegroundColor Cyan
uv run python --version
uv run ruff --version
uv run pytest --version
uv run pre-commit --version

Write-Host "`nRunning checks..." -ForegroundColor Cyan
uv run ruff check .
uv run pytest

Write-Host "`nSetup complete." -ForegroundColor Green