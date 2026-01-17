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
            translateX: 0
        }, {
            translateX: "-900vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "900% top",
                scrub: 0.6,
                pin: true,
                snap: {
                    snapTo: "labels",
                    duration: { min: 0.2, max: 0.3 },
                    delay: 0.2,
                    ease: "power1.inOut"
                }
            },
        });
        return () => {
            pin.kill()
        }
    }, []);

    useEffect(() => {
        const txt4 = document.querySelector('.spanFour');
        const img4 = document.querySelector('.imgFour');
        const txt5 = document.querySelector('.spanFive');
        const img5 = document.querySelector('.imgFive');

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

            .fromTo(txt4, { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto" })
            .fromTo(img4, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<")

            .to(txt4, { opacity: 0, delay: 600, pointerEvents: "none" })
            .to(img4, { opacity: 0, y: -20 }, "<")

            .from(txt5, { opacity: 0, pointerEvents: "none" })
            .from(img5, { opacity: 0, y: 20 }, "<")

            .to(txt5, { opacity: 1, duration: 600, pointerEvents: "auto" })
            .to(img5, { opacity: 1, y: 0 }, "<");
        return () => {
            pin02.kill()
        }
    }, []);
    return (
        <>
            <section className={styles.outer}>
                <div ref={triggerRef}>
                    <div ref={sectionRef} className={styles.inner}>
                        <div id='up-sider' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://corp.up-sider.com/" target='_blank' rel='noopener noreferrer'>
                                        株式会社UPSIDER
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    WordPress,JavaScript,SCSS / Shifter
                                </p>
                                <p className={styles.read}>
                                    Docker環境にてテーマを構築し、Shifterからデプロイ。レンダリングはSSGを採用しています（Shifterの方針）<br />
                                </p>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/upsider.webp" type="image/webp" />
                                            <Image
                                                src="/view/upsider.png"
                                                alt=""
                                                width={700}
                                                height={5335}
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
                        <div id='team44blox' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://team44blox.com/" target='_blank' rel='noopener noreferrer'>
                                        TEAM 44 BLOX OFFICIAL WEBSITE
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    Next.js,TypeScript,SCSS / Vercel
                                </p>
                                <p className={styles.read}>
                                    HIPHOP集団 TEAM 44 BLOXのWEB SITEを作成しました。MicroCMSを活用し、ヘッドレスCMSを実装しました。レンダリングはSSRを採用。<br />
                                    <Link href="https://github.com/nouzoehiroaki/team44blox" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/team44blox</Link>
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/44blox.webp" type="image/webp" />
                                            <Image
                                                src="/view/44blox.png"
                                                alt=""
                                                width={700}
                                                height={394}
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
                                    React,SCSS / microCMS / EmailJs
                                </p>
                                <p className={styles.read}>
                                    CSRを採用し、お問い合わせフォームはEmailJsを使用しました。(Figmaからのコーディング)
                                </p>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/theater1.webp" type="image/webp" />
                                            <Image
                                                src="/view/theater1.png"
                                                alt=""
                                                width={700}
                                                height={2974}
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
                        <div id='metabatch' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://metabatch.ninjametavelive.com/" target='_blank' rel='noopener noreferrer'>
                                        NINJAメタバライブ
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    Next.js,SCSS,TypeScript / Vercel
                                </p>
                                <p className={styles.read}>
                                    NFTマーケターのイケハヤ氏が立ち上げたNINJA DAO内のメタバース音楽ライブプロジェクトになります。SEO対策の一貫としてSSRを採用しました。(Figmaからのコーディング)<br />
                                    <Link href="https://github.com/nouzoehiroaki/metabach" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/metabach</Link>
                                </p>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/metabach.webp" type="image/webp" />
                                            <Image
                                                src="/view/metabach.png"
                                                alt=""
                                                width={700}
                                                height={1441}
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
                        <div id='ninja' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://ninjametavelive.com/" target='_blank' rel='noopener noreferrer'>
                                        NINJAメタバライブ
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,jQuery,PHP / WordPress
                                </p>
                                <p className={styles.read}>
                                    NFTマーケターのイケハヤ氏が立ち上げたNINJA DAO内のメタバース音楽ライブプロジェクトになります。
                                    全ページコーディングとWordPressへの組み込みを担当しました。
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/ninja.webp" type="image/webp" />
                                            <Image
                                                src="/view/ninja.png"
                                                alt=""
                                                width={700}
                                                height={394}
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
                                    Planning / Design / HTML,CSS,jQuery,PHP / WordPress
                                </p>
                                <p className={styles.read}>
                                    近所にあるクラフトビール屋さんのWEBサイトをリニューアルしました。その際、Jimdoで取得された独自ドメインをXドメインに移管しました。(デザインカンプなしのコーディング)
                                </p>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/tsumugi.webp" type="image/webp" />
                                            <Image
                                                src="/view/tsumugi.png"
                                                alt=""
                                                width={700}
                                                height={3655}
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
                        <div id='miraistyle' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://mirai-style.net/" target='_blank' rel='noopener noreferrer'>
                                        ミライスタイル
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,javaScript,PHP / WordPress
                                </p>
                                <p className={styles.read}>
                                    全ページのコーディング、下層ページのデザイン、そしてWordPressへの組み込みを担当しました。
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/mirai.webp" type="image/webp" />
                                            <Image
                                                src="/view/mirai.png"
                                                alt=""
                                                width={700}
                                                height={394}
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
                        <div id='okajimawood' className={styles.section}>
                            <div className={`${styles.box} ${styles.left}`}>
                                <h2>
                                    <Link href="https://www.okajimawood.co.jp/" target='_blank' rel='noopener noreferrer'>
                                        恩加島木材工業株式会社
                                    </Link>
                                </h2>
                                <p className={styles.skill}>
                                    HTML,CSS,jQuery,PHP / WordPress
                                </p>
                                <p className={styles.read}>
                                    TOPページのコーディング、Wordpressを担当しました。Luxyというjsプラグインを使用し、パララックスを実装しています。
                                </p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/okajimawood.webp" type="image/webp" />
                                            <Image
                                                src="/view/okajimawood.png"
                                                alt=""
                                                width={700}
                                                height={394}
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
                                    HTML,CSS,javaScript,PHP / WordPress
                                </p>
                                <p className={styles.read}>
                                    全ページのコーディング、下層ページのデザイン、そしてWordPressへの組み込みを担当しました。 お問い合わせページでは、ユーザーが簡単に操作できるよう、郵便番号検索機能や来場希望日時のカレンダー表示機能を実装しました。その他、プラグイン無しでの検索機能等、WPならでは機能を一通り導入したイメージです。(Photoshopからのコーディング)
                                </p>
                                <p className={styles.foreword}>パソコン画面の中でスクロールしてみてください</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.moc}>
                                    <div className={styles.view}>
                                        <picture>
                                            <source srcSet="/view/cando.webp" type="image/webp" />
                                            <Image
                                                src="/view/cando.png"
                                                alt=""
                                                width={700}
                                                height={1441}
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
                                <span className="spanFour">
                                    <h2>Artists Map</h2>
                                    <p className={styles.skill}>
                                        Next.js,TypeScript,SCSS / Vercel
                                    </p>
                                    <p>
                                        <Link href="https://artist-map.kgetheshadowmen.com/" target='_blank' rel='noopener noreferrer'>
                                            https://artist-map.kgetheshadowmen.com/
                                        </Link>
                                    </p>
                                </span>

                                <span className="spanFive">
                                    <h2>謎アプリ</h2>
                                    <p className={styles.skill}>
                                        Next.js,SCSS,TypeScript / Vercel / Firebase
                                    </p>
                                    <p>
                                        <Link href="https://login-app-sepia.vercel.app/" target='_blank' rel='noopener noreferrer'>
                                            https://login-app-sepia.vercel.app/
                                        </Link>
                                    </p>
                                </span>
                            </div>
                            <div className={styles.images}>
                                <picture>
                                    <source srcSet="/view/j-artistMap.webp" type="image/webp" />
                                    <Image
                                        src="/view/j-artistMap.png"
                                        alt=""
                                        width={700}
                                        height={394}
                                        className="imgFour"
                                    />
                                </picture>

                                <picture>
                                    <source srcSet="/view/login.webp" type="image/webp" />
                                    <Image
                                        src="/view/login.png"
                                        alt=""
                                        width={700}
                                        height={394}
                                        className="imgFive"
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