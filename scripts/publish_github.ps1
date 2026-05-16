<#
PowerShell script to create a private GitHub repo, push current folder, and trigger GitHub Actions deploy.

Prerequisites:
- Install Git: https://git-scm.com/
- Install GitHub CLI (`gh`): https://cli.github.com/
- Authenticate: run `gh auth login` and follow prompts.

Usage:
1. Open PowerShell in this project folder.
2. Run: `.
elease\publish_github.ps1` or `.	emplates\publish_github.ps1` if moved.
3. Enter the repository name when prompted (e.g. recanto-website).

The script will create a private repo under your GitHub account, push the current `main` branch,
and the existing GitHub Actions workflow will deploy the site to GitHub Pages.
#>

Set-StrictMode -Version Latest

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI 'gh' is not installed. Install from https://cli.github.com/ and run 'gh auth login' first."
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed. Install Git from https://git-scm.com/."
    exit 1
}

$repoName = Read-Host "Digite o nome do repositório que será criado no GitHub (ex: recanto-website)"
if ([string]::IsNullOrWhiteSpace($repoName)) { Write-Error "Nome do repositório inválido"; exit 1 }

Write-Host "Criando repositório privado '$repoName' no GitHub..."
gh repo create $repoName --private --confirm | Write-Host

Write-Host "Configurando remote 'origin' e enviando branch 'main'..."
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    git init
}

git branch -M main
git remote remove origin 2>$null | Out-Null
git remote add origin "https://github.com/$(gh api user --jq .login)/$repoName.git"

git add --all
git commit -m "Initial commit" 2>$null | Out-Null
git push -u origin main

Write-Host "Push concluído. A workflow de GitHub Actions (.github/workflows/deploy.yml) irá rodar e publicar o site."
Write-Host "Aguarde alguns minutos e acesse: https://$(gh api user --jq .login).github.io/$repoName/"
