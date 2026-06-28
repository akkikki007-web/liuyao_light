# 新プロジェクト開始チェックリスト

## 初期確認

- [ ] GitHubリポジトリを作成した
- [ ] private repository にした
- [ ] `.gitignore` を確認した
- [ ] `.env` がGit管理対象外になっている
- [ ] SQLite DBや画像ファイルがGit管理対象外になっている

## uv / Python

- [ ] `uv sync` を実行した
- [ ] `uv run python --version` を確認した
- [ ] `uv run ruff --version` を確認した
- [ ] `uv run pytest --version` を確認した
- [ ] `uv run pre-commit --version` を確認した

## pre-commit

- [ ] `uv run pre-commit install` を実行した
- [ ] `uv run pre-commit run --all-files` が通った

## テスト

- [ ] `uv run pytest` が通った
- [ ] `uv run ruff check .` が通った

## GitHub

- [ ] GitHub Actions workflow がある
- [ ] push後にActionsが成功した
- [ ] READMEに起動方法を書いた
- [ ] Issueを作った