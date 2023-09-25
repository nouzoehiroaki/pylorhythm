import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/Portfolio/Portfolio.module.scss';
import Image from 'next/image';
import Link from 'next/link'; 
const Slide: React.FC = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const pinRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
        nullTargetWarn: false,
    });
    ScrollTrigger.config({
        ignoreMobileResize: true
    });
    useEffect(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX:0
        },{
            translateX:"-600vw",
            ease:"none",
            duration:1,
            scrollTrigger:{
                trigger:triggerRef.current,
                start:"top top",
                end:"2000 top",
                scrub:0.6,
                pin:true
            }

        });
        return () =>{
            pin.kill()
        }
    }, []);

    useEffect(() => {
        const txt1 = document.querySelector('.spanOne');
        const img1 = document.querySelector('.imgOne');
        const txt2 = document.querySelector('.spanTwo');
        const img2 = document.querySelector('.imgTwo');
        const txt3 = document.querySelector('.spanThree');
        const img3 = document.querySelector('.imgThree');
        const txt4 = document.querySelector('.spanFour');
        const img4 = document.querySelector('.imgFour');
        
        let startValue;
        if (window.innerWidth <= 767) {
            startValue = '-=100';
        } else {
            startValue = '-=300';
        }
        let endValue;
        if (window.innerWidth <= 767) {
            endValue = '+=2000';
        } else {
            endValue = '+=3000';
        }
        const pin02 = gsap.timeline({
            defaults: {
                duration: 300
            },
            scrollTrigger: {
                trigger: pinRef.current,
                scrub: true, 
                start: startValue,
                end: endValue,
                pinSpacing: false,
                pin: true
            }
        })
        .to(txt1, { opacity: 0, delay: 600, pointerEvents: "none"  })
        .to(img1, { opacity: 0, y: -20 }, "<")

        .fromTo(txt2, { opacity: 0, pointerEvents: "none" },{ opacity: 1, pointerEvents: "auto" })
        .fromTo(img2, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<")
        
        .to(txt2, { opacity: 0, delay: 600 , pointerEvents: "none"})
        .to(img2, { opacity: 0, y: -20 }, "<")
        

        .fromTo(txt3, { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto" })
        .fromTo(img3, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<")
        
        .to(txt3, { opacity: 0, delay: 600, pointerEvents: "none" })
        .to(img3, { opacity: 0, y: -20 }, "<")
        
        .from(txt4, { opacity: 0, pointerEvents: "none" })
        .from(img4, { opacity: 0, y: 20 }, "<")
        
        .to(txt4, { opacity: 1, duration: 600, pointerEvents: "auto" })
        .to(img4, { opacity: 1, y: 0 }, "<");
        return () =>{
            pin02.kill()
        }
    }, []);
    return (
        <>
            <section className={styles.outer}>
                <div ref={triggerRef}>
                    <div ref={sectionRef} className={styles.inner}>
                        <div id='crypto' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://send-transaction-xi.vercel.app/" target='_blank' rel='noopener noreferrer'>
                                        仮想通貨送金アプリ
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,React,Solidity / Vercel / ethers.js / hardhat
                                </p>
                                <p className={styles.read}>
                                    ウォレットアプリのメタマスクを繋ぎ、仮想通貨を簡単に送金できるアプリです。フロントエンドはReactでバックエンドはSolidityを使用しています。使用ライブラリはethers.jsで開発環境はhardhatを使用しイーサリアムチェーンへデプロイしました。<br />
                                    <a href="https://github.com/nouzoehiroaki/sendTransaction_smartContract" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/sendTransaction_smartContract</a>
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/crypto.webp" type="image/webp" />
                                            <Image
                                                src="/view/crypto.png"
                                                alt=""
                                                width={2000}
                                                height={1011}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='login' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://login-app-sepia.vercel.app/" target='_blank' rel='noopener noreferrer'>
                                        サインアップとサインイン
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    React(Next.js),SCSS Modules,TypeScript / Vercel / Firebase
                                </p>
                                <p className={styles.read}>
                                    登録とログイン機能付きサイトを作成しました。DBはFirebaseを使用しています。「test@test.com」「testtestAAA」でぜひログインしてみてください。僕の裏の顔がわかります。
                                    <br />
                                    <a href="https://github.com/nouzoehiroaki/login-app" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/login-app</a>
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/login.webp" type="image/webp" />
                                            <Image
                                                src="/view/login.png"
                                                alt=""
                                                width={2000}
                                                height={1011}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='ikeuch' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://ikeuchiproducts.com/" target='_blank' rel='noopener noreferrer'>
                                        IKEUCHI PRODUCTS
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,jQuery,PHP / WordPress /
                                </p>
                                <p className={styles.read}>
                                    クリックイベントによる文字出現のアニメーションを駆使し、サイト内のコンテンツを魅力的かつ簡単に更新可能な仕様としました。全てのコンテンツは、WordPressのカスタムフィールドによるテキスト入力と画像挿入に対応しており、手軽に管理できるのが特徴です。
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/ikeuchi.webp" type="image/webp" />
                                            <Image
                                                src="/view/ikeuchi.png"
                                                alt=""
                                                width={2000}
                                                height={6574}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                        </div>
                        <div id='metabatch' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://metabatch.ninjametavelive.com/" target='_blank' rel='noopener noreferrer'>
                                        NINJAメタバライブ
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    React(Next.js),SCSS Modules,TypeScript / Vercel
                                </p>
                                <p className={styles.read}>
                                    NFTマーケターのイケハヤ氏が立ち上げたNINJA DAO内のメタバース音楽ライブプロジェクトになります。Next.jsを使用し、SPAサイトを実装しました。(Figmaからのコーディング)<br />
                                    <a href="https://github.com/nouzoehiroaki/metabach" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/metabach</a>
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/metabach.webp" type="image/webp" />
                                            <Image
                                                src="/view/metabach.png"
                                                alt=""
                                                width={2000}
                                                height={4117}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='tsumugi' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://www.tsumugi-craftbeer-minamikashiwa.com/" target='_blank' rel='noopener noreferrer'>
                                        2階のクラフトビール屋つむぎ
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    Planning / Design / HTML,CSS,jQuery,PHP / WordPress /
                                </p>
                                <p className={styles.read}>
                                    近所にあるクラフトビール屋さんのWEBサイトをリニューアルしました。その際、Jimdoで取得された独自ドメインをXドメインに移管しました。
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/tsumugi.webp" type="image/webp" />
                                            <Image
                                                src="/view/tsumugi.png"
                                                alt=""
                                                width={1500}
                                                height={7832}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='cando-house' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://cando-house.co.jp/" target='_blank' rel='noopener noreferrer'>
                                        感動ハウス
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,javaScript,PHP / WordPress /
                                </p>
                                <p className={styles.read}>
                                    全ページのコーディング、下層ページのデザイン、そしてWordPressへの組み込みを担当しました。 特に、お問い合わせページでは、ユーザーが簡単に操作できるよう、郵便番号検索機能や来場希望日時のカレンダー表示機能を実装しました。その他、WordPressで使える機能を一通り導入したイメージです。(Photoshopからのコーディング)
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/cando.webp" type="image/webp" />
                                            <Image
                                                src="/view/cando.png"
                                                alt=""
                                                width={2000}
                                                height={4118}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='theater1' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://test.pylorhythm.com/" target='_blank' rel='noopener noreferrer'>
                                        シアターワン
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    React,SCSS Modules / microCMS / EmailJs
                                </p>
                                <p className={styles.read}>
                                    microCMSを使用し、ヘッドレスCMSを実現しました。
                                    脱WordPress、脱jQueryを目指し、すべてのアニメーションをReactで実装しています。お問い合わせフォームはEmailJsを使用しました。(Figmaからのコーディング)
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/theater1.webp" type="image/webp" />
                                            <Image
                                                src="/view/theater1.png"
                                                alt=""
                                                width={2000}
                                                height={8498}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                        <div id='matsuyan' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://mattyan.site/" target='_blank' rel='noopener noreferrer'>
                                        松本＠障害者雇用でも人生逆転
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    Planning / Direction / Design / HTML,CSS,jQuery /  WordPress
                                </p>
                                <p className={styles.read}>
                                    ランディングページ制作の構成構築からデザイン、コーディングまで全て担当しました。(XDからのコーディング)
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/matsuyan.webp" type="image/webp" />
                                            <Image
                                                src="/view/matsuyan.png"
                                                alt=""
                                                width={1500}
                                                height={10457}
                                            />
                                        </picture>
                                    </div>
                                </div>
                                <picture>
                                    <source srcSet="/view/bg_sp_moc.webp" type="image/webp" />
                                    <Image
                                        src="/view/bg_sp_moc.png"
                                        alt=""
                                        width={600}
                                        height={144}
                                        className={styles.plate}
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${styles.outer02} ${styles.bg02}`}>
                <div ref={pinRef}>
                    <div className={styles.inner02}>
                        <div className={styles.section}>
                            <div className={styles.title02}>
                                <span className="spanOne">
                                    <h2>Image Map</h2>
                                    <p className={styles.skill}>
                                        HTML,CSS,jQuery / WordPress /
                                    </p>
                                    <p className={styles.read}>
                                        イメージマップとモーダルウィンドウの組み合わせ
                                    </p>
                                    <p>
                                        <Link href="http://nisseid.com/company/#02" target='_blank' rel='noopener noreferrer'>
                                            株式会社 日誠電工
                                        </Link>
                                    </p>
                                </span>
                                <span className="spanTwo">
                                    <h2>SIMULATION</h2>
                                    <p className={styles.skill}>
                                        HTML,CSS,jQuery / WordPress /
                                    </p>
                                    <p className={styles.read}>
                                        価格シミュレーションアプリ
                                    </p>
                                    <p>
                                        <Link href="https://shuken-product.jp/logsauna#custom" target='_blank' rel='noopener noreferrer'>
                                            LOG SAUNA
                                        </Link>
                                    </p>
                                </span>
                                <span className="spanThree">
                                    <h2>TIME TABLE</h2>
                                    <p className={styles.skill}>
                                        HTML,CSS,javaScript,PHP / WordPress /
                                    </p>
                                    <p className={styles.read}>
                                        ラジオ番組タイムテーブル
                                    </p>
                                    <p>
                                        <Link href="https://radio-f.jp/timetable/" target='_blank' rel='noopener noreferrer'>
                                            RADIO-F 静岡
                                        </Link>
                                    </p>
                                </span>
                                <span className="spanFour">
                                    <h2>TODO LIST</h2>
                                    <p className={styles.skill}>
                                        React,CSS
                                    </p>
                                    <p className={styles.read}>
                                        TODO LISTアプリ
                                    </p>
                                    <p>
                                        <Link href="https://template.pylorhythm.com/todo/" target='_blank' rel='noopener noreferrer'>
                                            やる事リストアプリ
                                        </Link>
                                    </p>
                                </span>
                            </div>
                            <div className={styles.images}>
                                <picture>
                                    <source srcSet="/view/imgmap.webp" type="image/webp" />
                                    <Image
                                        src="/view/imgmap.png"
                                        alt=""
                                        width={2000}
                                        height={1011}
                                        className="imgOne"
                                    />
                                </picture>
                                <picture>
                                    <source srcSet="/view/sim.webp" type="image/webp" />
                                    <Image
                                        src="/view/sim.png"
                                        alt=""
                                        width={2000}
                                        height={1011}
                                        className="imgTwo"
                                    />
                                </picture>
                                <picture>
                                    <source srcSet="/view/time-table.webp" type="image/webp" />
                                    <Image
                                        src="/view/time-table.png"
                                        alt=""
                                        width={2000}
                                        height={1011}
                                        className="imgThree"
                                    />
                                </picture>
                                <picture>
                                    <source srcSet="/view/todo.webp" type="image/webp" />
                                    <Image
                                        src="/view/todo.png"
                                        alt=""
                                        width={2000}
                                        height={1011}
                                        className="imgFour"
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Slide;