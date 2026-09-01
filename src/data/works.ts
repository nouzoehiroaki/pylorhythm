/**
 * 横スクロールスライダーに並ぶ制作実績。
 *
 * ここに 1 オブジェクト追加するだけでスライドが 1 枚増えます。
 * スクロール距離 (translateX / end) と .inner の横幅は works.length から
 * 自動計算されるので、slide.tsx や SCSS を触る必要はありません。
 *
 * 画像は public/view/ に {name}.png と {name}.webp の 2 つを置いてください。
 */
export type Work = {
    /** アンカー用の id。URL のハッシュにもなるので半角英数で */
    id: string;
    /** 見出しに出るサイト名 */
    title: string;
    /** 見出しのリンク先 */
    url: string;
    /** 使用技術。'Next.js, TypeScript, SCSS / Vercel' のような表記 */
    skills: string;
    /** 紹介文 */
    description: string;
    /** GitHub リポジトリ。指定すると紹介文の下に URL が並びます */
    github?: string;
    /** 補足文。省略すると表示されません */
    foreword?: string;
    /** public/view/{name}.png + {name}.webp を参照します */
    image: {
        name: string;
        width: number;
        height: number;
    };
};

export const works: Work[] = [
    {
        id: 'team44blox',
        title: 'TEAM 44 BLOX OFFICIAL WEBSITE',
        url: 'https://team44blox.com/',
        skills: 'Next.js,TypeScript,SCSS / Vercel',
        description:
            'MicroCMSを活用し、ヘッドレスCMSを実装しました。STOREではドラクエのような挙動で店内を歩き商品を見ることができます。メッセージフォームから応援メッセージを送信すると、メンバーのグループLINEに送信できる仕様です。',
        github: 'https://github.com/nouzoehiroaki/team44blox',
        image: { name: '44blox', width: 700, height: 394 },
    },
    {
        id: 'iso',
        title: 'ISO株式会社',
        url: 'https://ng-iso.jp/',
        skills: 'html,JavaScript,CSS',
        description:
            '素のHTMLとJavaScriptで簡単なGame付きコーポレートサイトを作成しました。',
        image: { name: 'iso', width: 700, height: 350 },
    },
    {
        id: 'flavaplaya',
        title: 'FLAVA PLAYA',
        url: 'https://flavaplaya.com/',
        skills: 'HTML,CSS,javaScript,PHP / WordPress',
        description:
            '千葉・柏のHIPHOPイベント公式サイト。GSAPによるスクロール演出を軸に、JSフレームワークを使わず構築し、WordPressのクラシックテーマとして自作。開催履歴やレポートはカスタム投稿タイプで管理し、次回開催の告知が自動で切り替わるよう設計しています。',
        image: { name: 'flavaplaya', width: 700, height: 350 },
    },
    {
        id: 'nakasaki',
        title: '株式会社中崎工業',
        url: 'https://nakazaki-inds.jp/',
        skills: 'HTML,CSS,JavaScript,PHP / WordPress,GSAP,Docker',
        description:
            'サイトリニューアルの設計・デザイン・実装・本番移行まで一貫して担当しました。GSAP（ScrollTrigger / Flip）とLenisでスクロール演出とローディングアニメーションを実装し、WordPressテーマはオリジナルで新規制作しています。旧サーバーから新ドメインへの移行と、GitHub Actionsによる自動デプロイまで対応しました。',
        image: { name: 'nakasaki', width: 700, height: 349 },
    },
    {
        id: 'theater1',
        title: 'シアターワン(テストサイト)',
        url: 'https://test.pylorhythm.com/',
        skills: 'React,SCSS / microCMS / EmailJs',
        description:
            'CSRを採用し、お問い合わせフォームはEmailJsを使用しました。(Figmaからのコーディング)',
        foreword: 'パソコン画面の中でスクロールしてみてください',
        image: { name: 'theater1', width: 700, height: 2974 },
    },
    {
        id: 'metabatch',
        title: 'NINJAメタバライブ',
        url: 'https://metabatch.ninjametavelive.com/',
        skills: 'Next.js,SCSS,TypeScript / Vercel',
        description:
            'NFTマーケターのイケハヤ氏が立ち上げたNINJA DAO内のメタバース音楽ライブプロジェクトになります。SEO対策の一貫としてSSRを採用しました。(Figmaからのコーディング)',
        github: 'https://github.com/nouzoehiroaki/metabach',
        foreword: 'パソコン画面の中でスクロールしてみてください',
        image: { name: 'metabach', width: 700, height: 1441 },
    },
    {
        id: 'ninja',
        title: 'NINJAメタバライブ',
        url: 'https://ninjametavelive.com/',
        skills: 'HTML,CSS,jQuery,PHP / WordPress',
        description:
            'NFTマーケターのイケハヤ氏が立ち上げたNINJA DAO内のメタバース音楽ライブプロジェクトになります。全ページコーディングとWordPressへの組み込みを担当しました。',
        image: { name: 'ninja', width: 700, height: 394 },
    },
    {
        id: 'tsumugi',
        title: '2階のクラフトビール屋つむぎ',
        url: 'https://www.tsumugi-craftbeer-minamikashiwa.com/',
        skills: 'Planning / Design / HTML,CSS,jQuery,PHP / WordPress',
        description:
            '近所にあるクラフトビール屋さんのWEBサイトをリニューアルしました。その際、Jimdoで取得された独自ドメインをXドメインに移管しました。(デザインカンプなしのコーディング)',
        foreword: 'パソコン画面の中でスクロールしてみてください',
        image: { name: 'tsumugi', width: 700, height: 3655 },
    },
    {
        id: 'miraistyle',
        title: 'ミライスタイル',
        url: 'https://mirai-style.net/',
        skills: 'HTML,CSS,javaScript,PHP / WordPress',
        description:
            '全ページのコーディング、下層ページのデザイン、そしてWordPressへの組み込みを担当しました。',
        image: { name: 'mirai', width: 700, height: 394 },
    },
    {
        id: 'okajimawood',
        title: '恩加島木材工業株式会社',
        url: 'https://www.okajimawood.co.jp/',
        skills: 'HTML,CSS,jQuery,PHP / WordPress',
        description:
            'TOPページのコーディング、Wordpressを担当しました。Luxyというjsプラグインを使用し、パララックスを実装しています。',
        image: { name: 'okajimawood', width: 700, height: 394 },
    },
];
