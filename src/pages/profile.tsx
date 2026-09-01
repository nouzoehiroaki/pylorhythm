import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import styles from '@/styles/Profile/Profile.module.scss';
gsap.registerPlugin(ScrollTrigger);
gsap.config({
    nullTargetWarn: false,
});
/**
 * 主要実績・職務経歴・強み。
 * 職務経歴書を更新したら、この 3 つの配列を書き換えるだけで表示に反映されます。
 * 取引先はNDAに配慮し、職務経歴書と同じ匿名表記で統一しています。
 */
const achievements = [
    {
        value: '100社超',
        label: 'コーポレートサイト／LP制作',
        note: 'WordPressフルスクラッチ開発を中心に、要件定義・情報設計から公開・運用保守・外注管理までワンストップで提供。',
    },
    {
        value: '98点',
        label: 'PageSpeed Insights（モバイル）',
        note: 'グランピング施設サイトで獲得。表示速度と体験UXの改善設計により、顧客から高い評価を得た。',
    },
    {
        value: '数万ユーザー',
        label: '規模の業務システムを担当',
        note: '東証プライム上場企業向け。Nuxt.js + TypeScript での新規開発とAWS上での運用保守を継続。',
    },
    {
        value: '仕様未確定から期日通りにローンチ',
        label: '新規事業の申込フォーム開発',
        note: '不完全な既存仕様を再整理し、バックエンドと連携して仕様策定そのものを推進。実装・リリースまで主導した。',
    },
    {
        value: 'Googleマップ検索1位',
        label: 'SEO内部施策による集客貢献',
        note: '「クラフトビール」での上位表示を実現。撮影を含む制作全体を1人で担当した案件。',
    },
    {
        value: '2年9カ月継続中',
        label: '本業と並行した副業でのサイト構築・運用',
        note: 'Next.js × Cloud Run。旧CMSからの移行で既存記事73件の301リダイレクトを設計し、SEOと流入を落とさず完遂。',
    },
    {
        value: '企画から本番リリースまで1人で完遂',
        label: 'Canvasゲーム型ECページ + LINE承認Bot',
        note: 'アーティスト公式サイトに、キャラクターを操作して店内を巡るインタラクティブEC体験と、承認フロー付きファンメッセージ基盤を新規構築。',
    },
];

const careers = [
    {
        term: '2025.10 – 現在',
        role: 'フリーランス',
        title: 'スマホ完結型カードローンサービス／フロントエンド開発・申込基盤構築',
        meta: 'クライアント：大手通信事業者の個人向け金融事業　／　体制：約9名（フロントエンド担当）　／　開発手法：アジャイル（スクラム）',
        results: [
            'TSVを用いたランディングページ動的生成システムを設計・実装。非エンジニアでもページ内容を更新できる運用体制を整備した',
            'TSVデータのバリデーションスクリプトを開発し、入稿ミスに起因する公開事故を未然に防ぐ仕組みを用意',
            'Claude Code を業務に導入し、実装補助と定型作業の自動化により開発フローを最適化',
        ],
        stack: 'Nuxt.js (Vue 3) / TypeScript / Kubernetes / ArgoCD / GitHub / AEM / Datadog / Claude Code',
    },
    {
        term: '2023.12 – 現在',
        role: '副業・並行',
        title: 'コーポレート／採用サイトの新規構築・運用（Next.js × Cloud Run）',
        meta: 'クライアント：法人向け金融サービスを提供するフィンテック企業　／　形態：業務委託（本業と並行）　／　体制：社内エンジニア・デザイナー・Platformチームとの協働',
        results: [
            '旧CMSからのドメイン移行を、既存記事73件の301リダイレクト設計により完遂。SEO評価と既存流入を落とさずに切り替えた',
            '長期キーを持たないキーレスデプロイ（OIDC / Workload Identity Federation）を構築。staging / production の2環境を同一イメージで運用',
            '外部6ソースからの日次コンテンツ同期を冪等な追記処理として実装し、更新の人手作業を撤廃',
            '脆弱性対応を本番影響の有無で切り分けて実施。overrides による patched 版固定でダウングレードを伴わず、影響あるHIGHをゼロにした',
            'シークレットをリポジトリに置かず Secret Manager 管理に一本化。閲覧制限・reCAPTCHA Enterprise のサーバー検証も実装',
        ],
        stack: 'Next.js 16 (App Router / SSG) / React 19 / TypeScript (strict) / Tailwind CSS v4 / Google Cloud (Cloud Run・Artifact Registry・Secret Manager・WIF) / GitHub Actions / Docker / Vitest / Cloudflare',
    },
    {
        term: '2026.07 – 現在',
        role: '自主プロジェクト',
        title: '音楽アーティスト公式サイト／インタラクティブECページ・LINE連携メッセージ基盤の新規開発',
        meta: '対象：HIPHOPグループ公式サイト（Next.js製・稼働中）　／　形態：企画・開発・運用を単独担当　／　体制：1名（生成AIを開発パートナーとして活用）',
        results: [
            'PixiJS（WebGL）で2Dゲームエンジンを実装。シーン管理・スプライトアニメーション・当たり判定・Y軸深度ソートに加え、ドット絵調のゲームUIもWebで自作し、購入導線を外部ECへ接続した',
            'LINE Messaging API 連携で、Webhook署名検証（HMAC-SHA256）とpostbackアクションによる承認・却下フローを設計・実装。管理者のLINE上で承認が完結する運用とした',
            '投稿フォームに多層防御を設計。ワンタイムトークン・送信時間チェック・ハニーポット・Cloudflare Turnstile・レート制限・重複排除・キルスイッチを実装',
            'デザイナー不在の環境で、Python（OpenCV / Pillow）による人物切り抜き・背景再構築を行い、提供素材のみからゲーム用アセットを自作',
        ],
        stack: 'Next.js 16 (App Router) / React 19 / PixiJS (WebGL) / TypeScript / Python (OpenCV・Pillow) / Redis (Redis Cloud) / LINE Messaging API / Cloudflare Turnstile / microCMS / Vercel',
    },
    {
        term: '2023.11 – 2025.09',
        role: '正社員（SES契約）',
        title: '顧客業務システムのフロントエンド開発・運用保守',
        meta: '所属：IT企業（東証グロース市場・従業員1,819名）　／　参画先：東証プライム上場企業　／　体制：約10名のスクラムチーム',
        results: [
            '新規事業立ち上げに伴う申込フォームのフロントエンド開発を主導。仕様書が未確定の状態から、不完全な既存仕様を再整理し、バックエンドと連携しながら仕様策定を推進。スケジュール通りのローンチを実現した',
            'フロントエンド設計指針（コンポーネント設計ルール）を策定し、チーム内の実装品質のばらつきを解消',
            'コードレビューテンプレート／テスト観点チェックリストを整備し、レビュー品質の標準化に貢献',
            'AWS CLI を用いたデータ一括更新のShell Scriptを作成し、手作業による更新負荷を削減',
            'ワークフロー自動化基盤「JP1 Ops Automation」のモックアップ開発と、再現可能な状態での手順書作成',
        ],
        stack: 'Nuxt.js (Vue 3) / TypeScript / JavaScript / Sass / Python / YAML / AWS (EC2・S3・CloudFront・Lambda・CloudWatch) / Docker / Vagrant / GitLab CI/CD',
    },
    {
        term: '2019.08 – 2023.10',
        role: '個人事業主・代表',
        title: 'Web制作事業「ピロリズム（PYLORHYTHM）」／受託開発・ディレクション',
        meta: '事業内容：Webサービス開発・運営　／　案件規模：100社超（コーポレートサイト・LP・リニューアル・ヘッドレスCMS化）',
        results: [
            'PageSpeed Insights モバイル98点を獲得（グランピング施設サイト）。表示速度とUXで顧客から定評を得た',
            '着手から2日で特設サイト、3日でフルサイトを公開。短納期案件での実行力を証明',
            'ローカルラジオ局サイトで、PHP・JavaScript による日替わり番組表と「Now On Air」ナビゲーター情報の自動表示を実装',
            'React + microCMS によるヘッドレスCMS化で、既存サイトのパフォーマンスを大幅に改善。Next.js によるSSR実装も多数担当',
            'SEOキーワードでの上位表示、Googleマップ検索1位獲得など、集客面でも成果を創出',
            'デザインカンプがない案件でも、顧客と対話を重ねながらコーディングのみでデザインまで完結させて納品',
        ],
        stack: 'HTML5 / CSS3 / Sass / JavaScript / TypeScript / PHP / Solidity / WordPress（テーマ自作）/ React.js / Next.js / Vue.js / Nuxt.js / microCMS / GSAP / Three.js / MySQL / Firebase / AWS / Vercel / Shifter / GitHub Actions',
    },
];

const strengths = [
    {
        title: '決まっていないものを、決めながら進められる',
        body: '新規事業の申込フォーム開発は、仕様書が未確定のまま着手する状況でした。不完全な既存仕様を自分で洗い直し、バックエンド担当と議論しながら仕様策定そのものを引き取り、設計・実装・リリースまで走り切って期日を守りました。',
    },
    {
        title: '依頼の外側まで手を伸ばす',
        body: 'デザインカンプのない案件では対話を重ねてコーディングだけでデザインまで仕上げ、素材が足りない案件ではトップページ用の写真を自ら撮影して制作まで担当しました。案件によっては価格シミュレーターや日替わり番組表など、「あると効く」機能を提案して自作しています。',
    },
    {
        title: '自分がいなくても回る形にして渡す',
        body: 'フロントエンド設計指針、コードレビューテンプレート、テスト観点チェックリスト、リリース運用手順書、環境構築ドキュメント。参画したチームには必ず「次の人が再現できる資料」を残してきました。属人化させないことは、受託100社を1人で回してきた経験から身についた習慣です。',
    },
    {
        title: '技術のキャッチアップを止めない',
        body: '業務外でも Claude Code・GitHub Copilot を取り入れた個人開発を継続しています。直近では音楽アーティストの公式サイトに、PixiJSによるゲーム型ECページとLINE Messaging APIを用いた承認フロー付きメッセージ基盤を新規構築し、企画から本番リリースまで一人で完遂しました。学んだ内容は自身のブログで継続的にアウトプットしています。',
    },
];

const Profile: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //three.js
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const scene = new THREE.Scene();
            //サイズ
            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight,
            }
            //カメラ
            const camera = new THREE.PerspectiveCamera(
                50,
                sizes.width / sizes.height,
                0.1,
                100
            );

            //レンダー
            const renderer = new THREE.WebGL1Renderer({
                canvas: canvas,
                alpha: true
            });
            renderer.setSize(sizes.width, sizes.height);
            //renderer.setPixelRatio(window.devicePixelRatio);
            const devicePixelRatio = Math.min(2, window.devicePixelRatio);
            renderer.setPixelRatio(devicePixelRatio);

            //ジオメトリ
            const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
            const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);

            //マテリアル
            const boxMaterial = new THREE.MeshNormalMaterial();
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            box.position.set(0, .5, -15);
            box.rotation.set(1, 1, 0);

            const torusMaterial = new THREE.MeshNormalMaterial();
            const torus = new THREE.Mesh(torusGeometry, torusMaterial);
            torus.position.set(0, 1, 10);

            scene.add(box, torus);

            //線型補完で滑らかに

            const lerp = (x: number, y: number, a: number): number => {
                return (1 - a) * x + a * y;
            };
            const scalePercent = (start: number, end: number) => {
                return (scrollParcent - start) / (end - start);
            };
            //スクロールアニメーション
            const animationScripts: Array<{
                start: number;
                end: number;
                loop?: boolean;
                function: () => void;
            }> = [];
            animationScripts.push({
                start: 0,
                end: 40,
                function() {
                    camera.lookAt(box.position);
                    camera.position.set(0, 1, 10);
                    box.position.z = lerp(-15, 2, scalePercent(0, 40));
                    torus.position.z = lerp(10, -20, scalePercent(0, 40));
                },
            });
            animationScripts.push({
                start: 40,
                end: 60,
                function() {
                    camera.lookAt(box.position);
                    camera.position.set(0, 1, 10);
                    box.rotation.z = lerp(1, Math.PI, scalePercent(40, 60));
                },
            });
            animationScripts.push({
                start: 60,
                end: 80,
                function() {
                    camera.lookAt(box.position);
                    camera.position.x = lerp(0, -15, scalePercent(60, 80));
                    camera.position.y = lerp(1, 15, scalePercent(60, 80));
                    camera.position.z = lerp(10, 25, scalePercent(60, 80));
                },
            });
            animationScripts.push({
                start: 80,
                end: 100,
                loop: true,
                function() {
                    camera.lookAt(box.position);
                    box.rotation.x += 0.02;
                    box.rotation.y += 0.02;
                },
            });
            //アニメーションを開始
            const playScrollAnimation = () => {
                animationScripts.forEach(animation => {
                    if (
                        (scrollParcent >= animation.start &&
                            scrollParcent <= animation.end) ||
                        (animation.loop && scrollParcent >= animation.start)
                    ) {
                        animation.function();
                    }
                });
            }
            //スクロール率を取得
            let scrollParcent = 0;
            document.body.onscroll = () => {
                scrollParcent =
                    (document.documentElement.scrollTop /
                        (document.documentElement.scrollHeight -
                            document.documentElement.clientHeight)) * 100;
            }

            window.addEventListener("resize", () => {
                //サイズをアップデート
                sizes.width = window.innerWidth;
                sizes.height = window.innerHeight;

                //カメラをアップデート
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();

                //レンダラーのアップデート
                renderer.setSize(sizes.width, sizes.height);
                renderer.setPixelRatio(window.devicePixelRatio);
            });




            const animate = () => {
                window.requestAnimationFrame(animate);
                playScrollAnimation();


                renderer.render(scene, camera);
            };
            animate();
        }
    }, []);
    //見出し h1 出現
    useEffect(() => {
        const text = SplitType.create('.title');
        gsap.from(text.chars, {
            opacity: 0,
            y: 100,
            ease: "back",
            duration: 1,
            stagger: 0.1
        });
    }, []);
    //h2 p スクロールアニメ
    useEffect(() => {
        const setAnimation = () => {
            const h2Elements = document.querySelectorAll('h2');
            h2Elements.forEach((element) => {
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        y: 10,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 2,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 60%',
                            end: 'bottom 40%',
                        },
                    }
                );
            });

            const pElements = document.querySelectorAll('.message');
            pElements.forEach((element) => {
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        y: 10,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 2,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top center',
                            end: 'bottom center',
                            // onEnter: () => {},
                            // onEnterBack: () => {},
                        },
                    }
                );
            });
        }
        setAnimation();
    }, []);
    return (
        <>
            <Head>
                <title>PROFILE</title>
                <meta name="description" content="フロントエンドエンジニアのプロフィール。受託100社超のWeb制作から、東証プライム上場企業の業務システム、大手通信キャリアの金融サービス基盤まで。" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.body}>
                <canvas className={styles.canvas} ref={canvasRef}>
                </canvas>
                <main className={styles.main}>
                    <div className={styles.titleBox}>
                        <h1 className="title">PROFILE</h1>
                    </div>
                    <section className={styles.section}>
                        <h2 className='h2'>
                            ご覧いただきありがとうございます。
                        </h2>
                        <div className={`${styles.box} message`}>
                            <div className={styles.textBox}>
                                <p className={styles.lead}>
                                    要件が固まっていない状態から、リリースまで一人で走り切れるフロントエンドエンジニアです。
                                </p>
                                <p className={styles.mini}>
                                    2019年8月にWeb制作事業「ピロリズム（PYLORHYTHM）」を立ち上げ、WordPressのフルスクラッチ開発で100社超のコーポレートサイト・LPを制作しました。要件定義から公開・運用保守・外注管理までをワンストップで担い、表示速度とSEOで具体的な成果を出しています。
                                </p>
                                <p className={styles.mini}>
                                    2021年以降はTypeScriptによるReact / Next.js・Nuxt.js開発へ軸足を移し、2023年11月からは東証グロース上場のIT企業に所属してSES契約で参画。ユーザー数万規模の顧客業務システムのフロントエンド新規開発・運用保守を担当し、仕様が固まっていない新規事業の申込フォームでは要整理から仕様策定・実装・リリースまでを主導しました。
                                </p>
                                <p className={styles.mini}>
                                    2025年10月からはフリーランスとして、大手通信事業者が提供するスマホ完結型カードローンサービスのフロントエンド開発および申込基盤構築に従事しています。Kubernetes / ArgoCD による環境運用、AEMでのコンテンツ管理、Datadogでのログ監視まで踏み込みつつ、Claude Codeを用いた開発・運用の自動化にも取り組んでいます。
                                </p>
                                <p className={styles.mini}>
                                    また2023年12月からは本業と並行する副業として、フィンテック企業のコーポレート・採用サイトをNext.js × Google Cloud Runで新規構築。旧CMSからのドメイン移行、OIDCによるキーレスなデプロイ基盤の整備、外部コンテンツ同期の自動化までを担い、2年9カ月にわたり現在も継続しています。
                                </p>
                                <p className={styles.subhead}>現在の主な取り組み</p>
                                <ul>
                                    <li>Nuxt.js + TypeScript によるフロントエンド実装（大手通信事業者の個人向け金融事業）</li>
                                    <li>Kubernetes / ArgoCD を用いた環境構築・GitOpsデプロイ運用</li>
                                    <li>Adobe Experience Manager（AEM）でのコンテンツ管理・フロントエンド連携</li>
                                    <li>Datadog を用いたログ監視・エラー調査・障害対応</li>
                                    <li>Next.js（App Router）× Google Cloud Run でのサイト新規構築・運用改善（副業）</li>
                                    <li>Claude Code を前提とした開発フローの最適化・定型作業の自動化</li>
                                </ul>
                            </div>
                            <div className={styles.flex}>
                                <div className={styles.imgBox}>
                                    <picture>
                                        <source srcSet="/prof/prof.webp" type="image/webp" />
                                        <Image
                                            src="/prof/prof.jpg"
                                            alt=""
                                            width={640}
                                            height={427}
                                            className={styles.prof}
                                        />
                                    </picture>
                                </div>
                                <div className={styles.listBox}>
                                    <dl>
                                        <dt>名称</dt>
                                        <dd>N.HIROAKI</dd>
                                        <dt>所在地</dt>
                                        <dd>千葉県内</dd>
                                        <dt>お問い合わせ</dt>
                                        <dd>info@pylorhythm.com</dd>
                                        <dt>業務内容</dt>
                                        <dd>
                                            要件定義、設計、実装、テスト、リリース、運用保守、進捗管理、外注管理
                                        </dd>
                                        <dt>使用言語</dt>
                                        <dd>
                                            HTML5 / CSS3 / Sass (SCSS) / JavaScript (ES6+) / TypeScript / PHP / Python / YAML / Shell Script / Solidity
                                        </dd>
                                        <dt>フレームワーク</dt>
                                        <dd>
                                            Next.js (App Router / SSG / SSR) / React / Nuxt.js (Vue 3) / Vue.js / jQuery / Bootstrap / Tailwind CSS
                                        </dd>
                                        <dt>UI・表現</dt>
                                        <dd>
                                            GSAP / Three.js / PixiJS (WebGL) / Swiper.js / framer-motion / Motion / react-transition-group / Luxy.js
                                        </dd>
                                        <dt>CMS</dt>
                                        <dd>WordPress（テーマ自作・カスタム投稿・REST API拡張・会員機能）/ microCMS / Shifter / Adobe Experience Manager</dd>
                                        <dt>ノーコードツール</dt>
                                        <dd>Webflow</dd>
                                        <dt>デザインカンプ</dt>
                                        <dd>Photoshop / Illustrator / XD / Figma</dd>
                                        <dt>ビルド・タスクランナー</dt>
                                        <dd>Vite / Gulp / Volta / Homebrew</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <div className={styles.listBox}>
                                    <dl>
                                        <dt>バージョン管理</dt>
                                        <dd>Git / GitHub / GitHub Actions / GitLab CI/CD</dd>
                                        <dt>クラウド（AWS）</dt>
                                        <dd>EC2 / S3（静的ホスティング）/ CloudFront + WAF / Lambda / CloudWatch / AWS CLI</dd>
                                        <dt>クラウド（Google Cloud）</dt>
                                        <dd>Cloud Run / Artifact Registry / Secret Manager / Workload Identity Federation</dd>
                                        <dt>ホスティング</dt>
                                        <dd>Vercel / Shifter / Cloudflare</dd>
                                        <dt>CI/CD・デプロイ</dt>
                                        <dd>GitHub Actions（OIDCキーレスデプロイ・アクションのSHAピン留め・Dependabot運用）/ Docker (standalone ビルド) / stg・prod 2環境の運用設計</dd>
                                        <dt>コンテナ・基盤</dt>
                                        <dd>Kubernetes / ArgoCD（GitOpsデプロイ）/ Docker / Vagrant</dd>
                                        <dt>監視・運用</dt>
                                        <dd>Datadog（ログ監視・エラー調査・障害対応）/ CloudWatch / JP1 Ops Automation</dd>
                                        <dt>DB・BaaS・KVS</dt>
                                        <dd>MySQL / phpMyAdmin / Redis (Redis Cloud) / Firebase（Authentication・Realtime Database・Firestore）</dd>
                                        <dt>外部API連携</dt>
                                        <dd>LINE Messaging API（Webhook署名検証・push・reply・postback）/ Google Maps API / AtHome API / EmailJS</dd>
                                        <dt>セキュリティ</dt>
                                        <dd>Secret Manager によるシークレット管理 / reCAPTCHA Enterprise / Cloudflare Turnstile / 依存脆弱性のトリアージ / 公開フォームの多層スパム対策</dd>
                                        <dt>テスト</dt>
                                        <dd>Vitest / 単体テスト・テスト観点チェックリストの整備</dd>
                                        <dt>パフォーマンス・SEO</dt>
                                        <dd>PageSpeed Insights / Lighthouse / 構造化マークアップ・内部リンク設計 / 301リダイレクト設計・ドメイン移行</dd>
                                        <dt>画像処理</dt>
                                        <dd>Python（OpenCV / Pillow）による被写体切り抜き・背景再構築・アセット一括最適化</dd>
                                        <dt>AIツール</dt>
                                        <dd>Claude Code / Claude (Cowork) / GitHub Copilot / ChatGPT / Codex / Antigravity / nano banana pro</dd>
                                        <dt>開発プロセス</dt>
                                        <dd>アジャイル・スクラム（1週間スプリント）/ 要件定義・設計書作成 / テスト仕様書作成 / リリース手順書・バックアウト対応</dd>
                                        <dt>OS</dt>
                                        <dd>macOS（11年）/ Windows（3年）</dd>
                                        <dt>保有資格</dt>
                                        <dd>普通自動車運転免許 / ヘルパー2級 / 福祉用具専門相談員</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>主要実績<span className={styles.en}>KEY ACHIEVEMENTS</span></h2>
                        <div className={`${styles.cards} message`}>
                            {achievements.map((item) => (
                                <div key={item.label} className={styles.card}>
                                    <p className={styles.cardValue}>{item.value}</p>
                                    <p className={styles.cardLabel}>{item.label}</p>
                                    <p className={styles.cardNote}>{item.note}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>職務経歴<span className={styles.en}>WORK EXPERIENCE</span></h2>
                        <div className={`${styles.works} message`}>
                            {careers.map((career) => (
                                <div key={career.title + career.term} className={styles.work}>
                                    <div className={styles.workHead}>
                                        <p className={styles.term}>{career.term}</p>
                                        <p className={styles.role}>{career.role}</p>
                                    </div>
                                    <h3 className={styles.workTitle}>{career.title}</h3>
                                    <p className={styles.meta}>{career.meta}</p>
                                    <ul>
                                        {career.results.map((result) => (
                                            <li key={result}>{result}</li>
                                        ))}
                                    </ul>
                                    <p className={styles.stack}>{career.stack}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>お仕事以上のお仕事を</h2>
                        <div className='message'>
                            <p>
                                顧客からのご依頼の範囲をこえた付加価値を提供することにより信頼が確立されていくと思っています。<br />
                                つまり、要求された10のタスクに対し、15の価値を提供できるようなサービスを心がけています。
                            </p>
                        </div>
                        <div className={`${styles.cards} message`}>
                            {strengths.map((item) => (
                                <div key={item.title} className={styles.card}>
                                    <p className={styles.cardLabel}>{item.title}</p>
                                    <p className={styles.cardNote}>{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>仕事に対する理念</h2>
                        <div className='message'>
                            <p>
                                徹底的な取り組みを通じ、大きな価値を提供したいという気持ちを持っています。<br />
                                この姿勢を通じ、信頼を積み重ね、いつしか「敬意」となり返ってくる事こそ、最大のリターンであると思っています。
                            </p>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>
                            最後までお読みいただきありがとうございました。
                            <span>是非一緒にお仕事できれば幸いです。</span>
                        </h2>
                        <div className='message'>
                            <p>
                                このポートフォリオサイトは
                            </p>
                            <p className={styles.skill}>
                                Next.js,SCSS,GSAP / vercel
                            </p>
                            <p>
                                で構築されております。
                            </p>
                            <a className={styles.white} href="https://github.com/nouzoehiroaki/pylorhythm" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/pylorhythm</a>
                            <div className={styles.skillSheetDl}>
                                <a className={styles.white} href="/prof/skillsheet.pdf" download="skillsheet.pdf">職務経歴書のダウンロード（2026年9月版・PDF）</a>
                            </div>
                        </div>
                    </section>
                    <section className={styles.sectionLast}>
                        <Link href="/">
                            Thank You!
                        </Link>
                    </section>
                </main>
            </div>
        </>
    );
};
export default Profile;
