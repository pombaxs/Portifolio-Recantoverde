#!/usr/bin/env bash
# Bash script to create a private GitHub repo, push current folder, and trigger GitHub Actions deploy.
# Prerequisites:
# - git installed
# - gh (GitHub CLI) installed and authenticated: run `gh auth login`
# Usage: from project root run `bash scripts/publish_github.sh`

set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI 'gh' is not installed. Install from https://cli.github.com/ and run 'gh auth login' first."
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Git is not installed. Install from https://git-scm.com/."
  exit 1
fi

read -p "Digite o nome do repositório que será criado no GitHub (ex: recanto-website): " REPO
if [ -z "$REPO" ]; then
  echo "Nome do repositório inválido"
  exit 1
fi

echo "Criando repositório privado '$REPO'..."
gh repo create "$REPO" --private --confirm

echo "Configurando remote 'origin' e enviando branch 'main'..."
if [ ! -d .git ]; then
  git init
fi

git branch -M main || true
git remote remove origin 2>/dev/null || true
OWNER=$(gh api user --jq .login)
git remote add origin "https://github.com/$OWNER/$REPO.git"

git add --all
git commit -m "Initial commit" || true
git push -u origin main

echo "Push concluído. A workflow de GitHub Actions (.github/workflows/deploy.yml) irá rodar e publicar o site."
echo "Aguarde alguns minutos e acesse: https://$OWNER.github.io/$REPO/"
