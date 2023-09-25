import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import styles from '@/styles/Profile/Profile.module.scss';
import { text } from 'stream/consumers';
gsap.registerPlugin(ScrollTrigger);
gsap.config({
    nullTargetWarn: false,
});
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
                canvas:canvas,
                alpha:true
            });
            renderer.setSize(sizes.width,sizes.height);
            //renderer.setPixelRatio(window.devicePixelRatio);
            const devicePixelRatio = Math.min(2, window.devicePixelRatio);
            renderer.setPixelRatio(devicePixelRatio);

            //ジオメトリ
            const boxGeometry = new THREE.BoxGeometry(5, 5, 5,10);
            const torusGeometry = new THREE.TorusGeometry(8,2,16,100);

            //マテリアル
            const boxMaterial = new THREE.MeshNormalMaterial();
            const box = new THREE.Mesh(boxGeometry,boxMaterial);
            box.position.set(0,.5,-15);
            box.rotation.set(1,1,0);

            const torusMaterial = new THREE.MeshNormalMaterial();
            const torus = new THREE.Mesh(torusGeometry,torusMaterial);
            torus.position.set(0,1,10);

            scene.add(box,torus);

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
                start:0,
                end:40,
                function(){
                    camera.lookAt(box.position);
                    camera.position.set(0,1,10);
                    box.position.z = lerp(-15,2,scalePercent(0,40));
                    torus.position.z = lerp(10,-20,scalePercent(0,40));
                },
            });
            animationScripts.push({
                start:40,
                end:60,
                function(){
                    camera.lookAt(box.position);
                    camera.position.set(0,1,10);
                    box.rotation.z = lerp(1,Math.PI,scalePercent(40,60));
                },
            });
            animationScripts.push({
                start:60,
                end:80,
                function(){
                    camera.lookAt(box.position);
                    camera.position.x = lerp(0,-15,scalePercent(60,80));
                    camera.position.y = lerp(1,15,scalePercent(60,80));
                    camera.position.z = lerp(10,25,scalePercent(60,80));
                },
            });
            animationScripts.push({
                start:80,
                end:100,
                loop: true,
                function(){
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
            document.body.onscroll = () =>{
                scrollParcent = 
                (document.documentElement.scrollTop / 
                (document.documentElement.scrollHeight - 
                document.documentElement.clientHeight)) * 100;
            }
            
            window.addEventListener("resize", ()=>{
                //サイズをアップデート
                sizes.width = window.innerWidth;
                sizes.height = window.innerHeight;
            
                //カメラをアップデート
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
            
                //レンダラーのアップデート
                renderer.setSize(sizes.width,sizes.height);
                renderer.setPixelRatio(window.devicePixelRatio);
            });

            

            
            const animate = () =>{
                window.requestAnimationFrame(animate);
                playScrollAnimation();
                
                
                renderer.render(scene,camera);
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
                <meta name="description" content="" />
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
                                <p className={styles.mini}>
                                    2019年、フリーランスとしてのキャリアをスタートしました。<br />
                                    これまで、WordPressを駆使したコーポレートサイトの構築を中心に事業を展開してまいりました。<br />
                                    フロントエンドをメインとしつつ、PHPやデータベースを活用し、動的コンテンツの実装にも深い経験を有します。<br />
                                    WordPressのレンダリング課題を解決するためのヘッドレス化にはNext.jsとTypescriptを使用しSPAを構築します。
                                </p>
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
                                        <dd>PYLORHYTHM(ピロリズム)</dd>
                                        <dt>所在地</dt>
                                        <dd>千葉県内</dd>
                                        <dt>お問い合わせ</dt>
                                        <dd>info@kgetheshadowmen.com</dd>
                                        <dt>業務内容</dt>
                                        <dd>
                                            要件定義、設計、開発、テスト、運用保守、進捗管理
                                        </dd>
                                        <dt>使用言語</dt>
                                        <dd>
                                            HTML / SCSS  / JavaScript / PHP / TypeScript / Solidity
                                        </dd>
                                        <dt>フレームワーク</dt>
                                        <dd>
                                            React (Next.js)  /  jQuery / Bootstrap / GSAP / Ether.js
                                        </dd>
                                        <dt>CMS</dt>
                                        <dd>WordPress / microCMS</dd>
                                        <dt>デザインカンプ</dt>
                                        <dd>Photoshop / Illustrator / XD / Figma</dd>
                                        <dt>テストツール</dt>
                                        <dd>Jest</dd>
                                        <dt>Linter</dt>
                                        <dd>ESlint</dd>
                                        <dt>formatter</dt>
                                        <dd>Prettier</dd>
                                        <dt>タスクランナー</dt>
                                        <dd>Gulp</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2 >お仕事以上のお仕事を</h2>
                        <div className='message'>
                            <p>
                                顧客からのご依頼の範囲をこえた付加価値を提供することにより信頼が確立されていくと思っています。<br />
                                つまり、要求された10のタスクに対し、15の価値を提供できるようなデベロップメントを心がけています。
                            </p>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>フリーランスとしての理念</h2>
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
                                React(Next.js),SCSS Modules,GSAP / vercel 
                            </p>
                            <p>
                                で構築されております。
                            </p>
                            <a className={styles.white} href="https://github.com/nouzoehiroaki/pylorhythm" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/pylorhythm</a>
                            <div className={styles.skillSheetDl}>
                                <a className={styles.white} href="/prof/skillsheet_.pdf" download='/prof/skillsheet_.pdf'>スキルシートのダウンロード</a>
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
