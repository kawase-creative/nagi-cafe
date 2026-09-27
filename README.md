# nagi cafe

スマートフォンを中心にデザインした、ビルド不要の静的サイトです。

公開URL: https://kawase-creative.github.io/nagi-cafe/

## 公開

このフォルダー内の `index.html`、`style.css`、`script.js`、`assets/`、`.nojekyll` をGitHubリポジトリのルートに配置します。
GitHubの Settings → Pages → Deploy from a branch で `main` / `/ (root)` を選択して保存してください。
CSS、JavaScript、画像はすべて相対パスです。外部ライブラリ・外部フォント・APIへの依存はありません。

## ローカル表示

このフォルダーで `python3 -m http.server 8000` を実行し、 http://localhost:8000 を開きます。

## 構成

- index.html : 8セクション、ナビゲーション、お知らせ開閉、店舗案内
- style.css : 390〜430pxを中心に設計。PCでは中央430px表示
- script.js : スクロール出現、パララックス、メニュー開閉・キーボード対応
- assets/images/ : 高解像度の写真風イメージ9点（1024×1536 / 1536×1024px）、WebP形式

## 編集

店舗情報とニュース本文はデモ内容です。電話番号は架空の番号で、Google Mapボタンは七里ヶ浜周辺の検索を開きます。Instagramは写真ギャラリーで、外部アカウントとは接続していません。
公開用の実店舗情報が決まったら index.html 内の住所・電話・地図URLを置き換えてください。
写真は参考の世界観に合わせてAI生成した架空の店舗イメージです。生成ツールとプロンプトは assets/IMAGE-SOURCES.md に記録しています。キャッチコピーや装飾文字はすべてHTMLで表示しています。
端末で「視差効果を減らす」が有効な場合はアニメーションを停止します。
