import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import Head from 'next/head'
import Link from 'next/link'; 
import styles from '@/styles/Profile/Profile.module.scss'
import Image from 'next/image'

const Profile: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const scene = new THREE.Scene();
            const textureLoader = new THREE.TextureLoader();
            const bgTexture = textureLoader.load("space.jpg");
            scene.background = bgTexture;
            //サイズ
            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight,
            }
            //カメラ
            const camera = new THREE.PerspectiveCamera(
                55,
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
            renderer.setPixelRatio(window.devicePixelRatio);

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
    
    useEffect(() =>{
        let imagesItems = Array.from(document.querySelectorAll(".imgWrap"));
        let title = Array.from(document.querySelectorAll(".title"));
        let message = Array.from(document.querySelectorAll(".message"));
        console.log(imagesItems);
        console.log(title);

        //具体的にいつ発動させるのかを決めるオプション
        let options = {
            rootMargin: "0px", //デフォルトで０.marginとほぼ同じ。
            threshold: 0.5, // 閾値は0.2。これが１になると完全に画面におさまってから発動する
        };
        let setItemActive = (entries: IntersectionObserverEntry[]) =>{
            console.log(entries);
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        };
        let observer = new IntersectionObserver(setItemActive, options); //交差の監視して、閾値を過ぎたらコールバック関数が呼ばれる
        imagesItems.forEach((item) => {
            observer.observe(item);
        });
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
                <canvas className={styles.canvas} ref={canvasRef}></canvas>
                <main className={styles.main}>
                    <h1>PROFILE</h1>
                    <section className={styles.section}>
                        <h2 className='title'>ご覧いただきありがとうございます。</h2>
                        <p className='message'>
                            PYLORHYTHM 農添と申します。<br />
                        </p>
                    </section>
                    <section className={styles.section}>
                        <h2 className='title'>お仕事以上のお仕事を</h2>
                        <p className='message'>
                            テストテストテストテストテスト
                        </p>
                    </section>
                    <section className={styles.section}>
                        <h2 className='title'>WEB制作LIFE</h2>
                        <p className='message'>
                            2020年にオンラインスクールでHTML CSS javaScript PHPを学び、9月、フリーランスとして活動開始。<br />
                            まずは上記の経験を活かしWordPressメインのWEB制作メインで案件を受注していました。<br />
                        </p>
                        <div className='imgWrap'>
                            <Image
                                src="/space.jpg"
                                alt="スマホで行ける僕らの遊び場(メタバース)"
                                width={2998}
                                height={1640}
                            />
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h2 className='title'>WEB制作LIFE</h2>
                        <p className='message'>
                            2020年にオンラインスクールでHTML CSS javaScript PHPを学び、9月、フリーランスとして活動開始。<br />
                            まずは上記の経験を活かしWordPressメインのWEB制作メインで案件を受注していました。<br />
                        </p>
                        <div className='imgWrap'>
                            <Image
                                src="/space.jpg"
                                alt="スマホで行ける僕らの遊び場(メタバース)"
                                width={2998}
                                height={1640}
                            />
                        </div>
                    </section>
                    <section className={styles.sectionLast}>
                        <Link href="/">
                            Next
                        </Link>
                    </section>
                </main>
            </div>
        </>
    );
};
export default Profile;
