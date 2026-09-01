/**
 * 横スクロールの後ろ、ピン留めされてクロスフェードするセクションの実績。
 *
 * ここに 1 オブジェクト追加するだけでフェードの段数が 1 つ増えます。
 * タイムラインもスクロール距離も featured.length から自動計算されます。
 *
 * 画像は public/view/ に {name}.png と {name}.webp の 2 つを置いてください。
 */
export type Featured = {
    id: string;
    title: string;
    url: string;
    skills: string;
    image: {
        name: string;
        width: number;
        height: number;
    };
};

export const featured: Featured[] = [
    {
        id: 'artist-map',
        title: 'Artists Map',
        url: 'https://artist-map.kgetheshadowmen.com/',
        skills: 'Next.js,TypeScript,SCSS / Vercel',
        image: { name: 'j-artistMap', width: 700, height: 394 },
    },
    {
        id: 'nazo-app',
        title: '謎アプリ',
        url: 'https://login-app-sepia.vercel.app/',
        skills: 'Next.js,SCSS,TypeScript / Vercel / Firebase',
        image: { name: 'login', width: 700, height: 394 },
    },
];
