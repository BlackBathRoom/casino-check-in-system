# Casino Check-In System
学園祭カジノ用チェックイン管理支援アプリ（Monorepo）

本リポジトリは、モノレポ構成でバックエンド（Bun + Hono）とフロントエンド（Vite + React）を一元管理します。現在は最小構成の API とフロントエンドで、開発フローの確認を主目的とした状態です（プロダクション運用前）。

- 目的: 学園祭の「カジノ」企画における来場者のチェックイン管理を効率化
- 主言語: TypeScript
- 状態: WIP（仕様検討・基盤整備中）

---

## 技術スタックと構成

- パッケージマネージャー: [Bun](https://bun.sh/)（ワークスペース）
- バックエンド: [Hono](https://hono.dev/)（`app/backend`）
- フロントエンド: [Vite](https://vite.dev/) + [React 19](https://react.dev/)（`app/frontend`）
- コード品質: Prettier / ESLint

```plaintext
.
├─ bun.lock
├─ package.json          # Bun ワークスペースのルート
├─ app
│  ├─ backend            # Hono ベースの API
│  │  └─ src/index.ts    # エントリーポイント
│  └─ frontend           # Vite + React の SPA
│     └─ src/
└─ prettier.config.js
```

---

## 必要環境

- [Bun](https://bun.sh/) v1.1 以上
  - インストール例: `curl -fsSL https://bun.sh/install | bash`
- Node.js は不要（インストール済みでも問題ありません）

---

## セットアップ

リポジトリのルートで依存関係を一括取得します。

```bash
bun install
```

初回インストール後は、各パッケージに移動してコマンドを実行するだけで OK です。

---

## 開発サーバーの起動

- バックエンド（Hono）
  ```bash
  bun run dev:back
  ```
  - アプリは http://localhost:3000/ で稼働します

- フロントエンド（Vite + React）
  ```bash
  bun run dev:front
  ```
  - ブラウザで http://localhost:5173/ を開きます

- 両方を並行起動する場合
  - 異なる端末でそれぞれのコマンドを実行するか、プロセスマネージャー等を利用してください

---

## スクリプトとコード品質

- フォーマット: `prettier.config.js` による統一スタイル
- リンター:
  - フロントエンド例
    ```bash
    cd app/frontend
    bun run lint
    ```
  - バックエンドは Hono の ESLint 設定を利用（必要に応じて `bunx eslint src` などを追加）

---

## テスト

現時点で自動テストは未整備です。仕様確定後にユニットテストや E2E テストの導入を検討します。

---

## ディレクトリガイド

- `app/backend/src/index.ts`: Hono アプリケーションのエントリーポイント
- `app/frontend/src/App.tsx`: フロントエンドのメインコンポーネント
- `app/frontend/src/main.tsx`: React アプリのブートストラップ
- `prettier.config.js`: プロジェクト共通のフォーマット設定

---

## 今後の拡張（予定）

- バックエンド
  - チェックイン API の整備
  - データストア連携
  - 認証・認可の導入
- フロントエンド
  - チェックイン画面／ダッシュボードの実装
  - UI コンポーネントライブラリ導入
- CI/CD
  - 変更時のテストとデプロイの自動化

---

## トラブルシューティング

- Bun のコマンドが見つからない
  - インストール後にシェルを再起動するか、`~/.bun/bin` を `PATH` に追加してください
- ポート競合が発生する
  - バックエンド: `app/backend/src/index.ts` のポート設定を変更
  - フロントエンド: Vite の設定でポート番号を変更

---

## 貢献について

Issue や Pull Request は歓迎です。開発初期のため大きく変更される可能性がありますが、提案やフィードバックをお待ちしています。
