import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import styles from '@/styles/Profile/Profile.module.scss';
import { motion } from 'framer-motion';
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
            <motion.div
                initial={{ opacity: 0 }} // 初期状態
                animate={{ opacity: 1 }} // マウント時
                exit={{ opacity: 0 }}    // アンマウント時
            >
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
                                    オンラインスクールでHTML、CSS、JavaScript、PHPを学び、<br />
                                    その後フリーランスとしてのキャリアをスタートしました。<br />
                                    これまで主に、WordPressサイトの構築とコーディングを専門に、様々なプロジェクトに携わってまいりました。
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
                                        <dt>使用言語</dt>
                                        <dd>HTML,CSS,SCSS,javaScript,PHP,TypeScript</dd>
                                        <dt>使用フレームワーク</dt>
                                        <dd>Bootstrap,jQuery,React,Next.js</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2 >お仕事以上のお仕事を</h2>
                        <div className='message'>
                            <p>
                                真の信頼は、顧客からのご依頼の範囲を超えて、付加価値を提供することによって確立されると考えます。<br />
                                つまり、提供された10のタスクに対し、15の価値を提供することで差別化を図り、信頼を積み重ねていくことが仕事の本質であると捉えています。
                            </p>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>フリーランスとしての理念</h2>
                        <div className='message'>
                            <p>
                                どんな仕事でも、徹底的な取り組みを通じて組織に大きな価値を提供したいという意欲を持っています。<br />
                                この姿勢を通じ、信頼を積み重ね、いつしか「敬意」となり返ってくる事こそ、僕にとっての最大のリターンであると考えます。
                            </p>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2>最後までお読みいただきありがとうございました。</h2>
                        <div className='message'>
                            <p>
                                このポートフォリオサイトは
                            </p>
                            <p className={styles.skill}>
                                JSX,SCSS,CSSMODULE,GSAP,Next.js / vercel 
                            </p>
                            <p>
                                で構築されております。
                            </p>
                            <a className={styles.white} href="https://github.com/nouzoehiroaki/pylorhythm" target='_blank' rel='noopener noreferrer'>https://github.com/nouzoehiroaki/pylorhythm</a>
                        </div>
                    </section>
                    <section className={styles.sectionLast}>
                        <Link href="/" scroll={false}>
                            Thank You!
                        </Link>
                    </section>
                </main>
            </div>
            </motion.div>
        </>
    );
};
export default Profile;
