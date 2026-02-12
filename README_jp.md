# ボタンカウンターアプリ

SvelteKitを使って、作られるレトロテーマ的にボタンカウンターアプリです。ボタンを押して、カウンターを1ずつに増やすことができます（ショートカットは　SPACE）。

## Live URL

アプリを使ってみよう→ **[https://stingray-app-3b4go.ondigitalocean.app/](https://stingray-app-3b4go.ondigitalocean.app/)**

リンクの有効期限：**2026/02/13**

## 特色

- **レトロテーマ**:　描いたレトロピクセルのカスタムアートと共に"Press Start 2P"というフォントを使っています。

- **永続ストレージ**: カウンターデータがTurso/LibSQLで保存されます。

- **キーボードショートカットの互換性**: SPACEBAR　を押して、ボタンが同じに押すいって、カウンターが増やさせます。

- **リアルタイムUI同期**: 別のデバイスでも、カウンターが同時に同期で表示します。

- **テスト**: このプロジェクトが単体テストや結合テストがさせられました。

- **デプロイ**: このプロジェクトはテスト後に、“Digital　Ocean”というクラウドツールを使って、デプロイ済みです。

## 使った技術

- **フロントエンド**: [Svelte](https://svelte.dev/) 5.x with TypeScript
- **フレイムワーク**: [SvelteKit](https://kit.svelte.dev/) 2.x
- **Build ツール**: [Vite](https://vitejs.dev/) 7.x
- **DB**: [LibSQL](https://github.com/tursodatabase/libsql) (compatible with SQLite)
- **テストキング**: [Vitest](https://vitest.dev/) 4.x, [Playwright](https://playwright.dev/) 1.x
- **スタイリング**: CSS　＋　カスタムアート

## 始め方

### 前提条件

- Node.js 18+
- npm

### インストール

1. リポジトリをクローン/ダウンロードしてください
2. 必要パッケージインストール:

```bash
npm install
```

### 開発

開発サーバーを起動：

```bash
npm run dev
```

その後、ブラウザで [http://localhost:5173](http://localhost:5173)
を開いてください。

アプリをブラウザで自動で開く方法：

```bash
npm run dev -- --open
```

### 本番ビルド

最適化された本番ビルドを作成する方法：

```bash
npm run build
```

本番ビルドをローカルでプレビューする方法：

```bash
npm run preview
```

## プロジェクト構成

```
src/
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── +page.server.ts
├── lib/
│   ├── components/
│   │   ├── ArcadeFrame.svelte
│   │   ├── CounterDisplay.svelte
│   │   ├── IncrementButton.svelte
│   │   └── schema.sql
│   ├── server/
│   │   ├── db.ts
│   │   ├── db_controllers.ts
│   │   └── db_dev.ts
│   ├── assets/
│   └── index.ts
tests/
├── integration_tests/
└── unit_tests/
```

## 使用可能なコマンド

| コマンド                         | 説明                                         |
| -------------------------------- | -------------------------------------------- |
| `npm run dev`                    | 開発サーバーを起動                           |
| `npm run build`                  | 本番用ビルドを作成                           |
| `npm run preview`                | 本番ビルドをローカルでプレビュー             |
| `npm run test:unit`              | Vitestで単体テストを実行                     |
| `npm run test:unit:watch`        | Vitestのウォッチモードで単体テストを実行     |
| `npm run test:integration`       | Playwrightで統合テストを実行                 |
| `npm run test:integration:watch` | Playwrightのウォッチモードで統合テストを実行 |
| `npm run reset-db`               | 開発者用：DBリセット                         |

## データベース

このアプリでは LibSQL（SQLite互換）を使用してカウンターの値を保持します。

### テーブル

Tこのプロジェクトには "button_counters" という単一のテーブルがあります。
| カラム | 型 | 説明 |
|---------|-------------|-----------|
| **id** | INTEGER | 自動増分の主キー |
| **counter** | BIGINT | 現在のカウント値（デフォルト: 0） |
| **last_clicked** | TIMESTAMP | 最後にカウントが増えた日時の記録 |

### データベースをリセット

カウンターをリセットしてデータベースを再作成するには（開発者向け）：

```bash
npm run reset-db
```

## ライセンス

オープンソースです。自由に使用・改変してご利用ください。
