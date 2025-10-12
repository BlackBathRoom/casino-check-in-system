# Casino Check-In System

モノレポ構成でバックエンド（Bun + Hono）とフロントエンド（Vite + React）をあわせて管理するプロジェクトです。現在は最小構成の API とフロントページのみが含まれており、カジノのチェックイン管理機能を拡張していくことを想定しています。

## 構成と技術スタック

- パッケージマネージャー: [Bun](https://bun.sh/) ワークスペース
- バックエンド: [Hono](https://hono.dev/)（`app/backend`）
- フロントエンド: [Vite](https://vite.dev/) + [React 19](https://react.dev/)（`app/frontend`）

```plaintext
.
├─ bun.lock
├─ package.json          # Bun ワークスペースのルート
├─ app
│  ├─ backend            # Hono ベースの API
│  └─ frontend           # Vite + React の SPA
└─ prettier.config.js
```

## 必要環境

- [Bun](https://bun.sh/) v1.1 以上（インストール手順: `curl -fsSL https://bun.sh/install | bash`）
- Node.js は不要ですが、既存環境でインストール済みでも問題ありません

## セットアップ

同じ依存関係をまとめて取得するため、リポジトリのルートで以下を実行します。

```bash
bun install
```

> 初回インストール後は、各パッケージに移動してコマンドを実行するだけで OK です。

## 開発サーバーの起動

### バックエンド（Hono）

```bash
bun run dev:back
```

- アプリは `http://localhost:3000/` で稼働します。

### フロントエンド（Vite + React）

```bash
bun run dev:front
```

- ブラウザで `http://localhost:5173/` を開きます。

### 両方を並行起動する場合

異なる端末で上記 2 つのコマンドを実行するか、プロセスマネージャーを使ってそれぞれ起動してください。

## コードスタイルとチェック

- フォーマット: `prettier.config.js` による安定したコードスタイルを採用しています。
- リンター: 各パッケージで ESLint 設定を持っています。例:

  ```bash
  cd app/frontend
  bun run lint
  ```

> バックエンドは Hono の ESLint 設定を利用しています（必要に応じて `bunx eslint src` などを追加してください）。

## テスト

現時点で自動テストは用意していません。仕様が固まり次第、ユニットテストや E2E テストの導入を検討してください。

## ディレクトリガイド

- `app/backend/src/index.ts`: Hono アプリケーションのエントリーポイント
- `app/frontend/src/App.tsx`: フロントエンドのメインコンポーネント
- `app/frontend/src/main.tsx`: React アプリのブートストラップ
- `prettier.config.js`: プロジェクト共通のフォーマット設定

## 今後の拡張アイデア

- バックエンド: チェックイン API、データストアとの連携、認証・認可の導入
- フロントエンド: チェックイン画面やダッシュボードの実装、UI コンポーネントライブラリ導入
- CI/CD: 変更時のテストとデプロイメントの自動化

## トラブルシューティング

- Bun のコマンドが見つからない場合は、インストール後にシェルを再起動するか、`~/.bun/bin` を `PATH` に追加してください。
- ポート競合が発生した場合は、バックエンド `src/index.ts` や Vite の設定でポート番号を変更してください。

---

この README はリポジトリ全体の概要を提供するためのものです。詳細は各パッケージ内の README やソースコードを参照してください。
