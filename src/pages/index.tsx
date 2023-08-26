import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Head from 'next/head'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
//import Link from 'next/link'; 
import styles from '@/styles/Home/Home.module.scss'

const Home: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, []);
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
                35,
                sizes.width / sizes.height,
                0.1,
                100
            );
            camera.position.z = 6;
            scene.add(camera);
            //レンダー
            const renderer = new THREE.WebGL1Renderer({
                canvas:canvas,
                alpha:true
            });
            renderer.setSize(sizes.width,sizes.height);
            renderer.setPixelRatio(window.devicePixelRatio);
            //マテリアル
            const material = new THREE.MeshPhysicalMaterial({
                color:"#3c94d7",
                metalness:0.86,
                roughness:0.37,
                flatShading:true,
            });
            
            //メッシュ
            const mesh1 = new THREE.Mesh( new THREE.TorusGeometry(1,0.4,16,60),material);
            const mesh2 = new THREE.Mesh( new THREE.OctahedronGeometry(),material);
            const mesh3 = new THREE.Mesh( new THREE.TorusKnotGeometry(.8,.35,100,16),material);
            const mesh4 = new THREE.Mesh( new THREE.IcosahedronGeometry(),material);
            mesh1.position.set(2,0,0);
            mesh2.position.set(-1,0,0);
            mesh3.position.set(2,0,-6);
            mesh4.position.set(5,0,3);
            scene.add(mesh1,mesh2,mesh3,mesh4);
            const meshes = [mesh1,mesh2,mesh3,mesh4];

            //パーティクル
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 700;
            const positionArray = new Float32Array(particlesCount * 3);
            for(let i = 0; i < particlesCount * 3; i++){
                positionArray[i] = 10 * (Math.random() - 0.5);
            }
            particlesGeometry.setAttribute(
                "position", 
                new THREE.BufferAttribute(positionArray,3)
            );
            //マテリアル
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.025,
                color: "#ffffff",
            });
            const particles = new THREE.Points(particlesGeometry,particlesMaterial);
            scene.add(particles);

            //Fonts
            const fontLoader = new FontLoader();
            fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
                let textSize = 0.3;
                let textHeight = 0.2;
                if (window.innerWidth <= 768) {
                    textSize = 0.15;
                    textHeight = 0.1;
                }
                const textGeometry = new TextGeometry("PYLORHYTHM", {
                    font: font,
                    size: textSize,
                    height: textHeight,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.02,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4,
                });
                textGeometry.center();
                const textMaterial = new THREE.MeshNormalMaterial();
                const text = new THREE.Mesh(textGeometry, textMaterial);
                scene.add(text);
            });
           
            //ライト
            const directionalLight = new THREE.DirectionalLight("#ffffff",4);
            directionalLight.position.set(.5,1,0)
            scene.add(directionalLight);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

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

            let speed = 0;
            let rotation = 0;
            window.addEventListener("wheel", (event) =>{
                speed += event.deltaY * 0.0002;
            });
            
            const rot = () => {
                rotation += speed;
                speed *= 0.93;
                // ジオメトリ全体を回転
                mesh1.position.x = 2 + 3.8 * Math.cos(rotation);
                mesh1.position.z = -3 + 3.8 * Math.sin(rotation);
                mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI / 2);
                mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI / 2);
                mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI);
                mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI);
                mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 * (Math.PI / 2));
                mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 * (Math.PI / 2));
                window.requestAnimationFrame(rot);
            };
            rot();
            
            const cursor = {
                x: 0,
                y: 0,
            };
            cursor.x = 0;
            cursor.y = 0;
            window.addEventListener("mousemove",(event) =>{
                cursor.x = event.clientX / sizes.width - 0.5;
                cursor.y = event.clientY / sizes.height - 0.5;
            });
            
            const clock = new THREE.Clock();
            const animate = () =>{
                renderer.render(scene,camera);
                let getDeltaTime = clock.getDelta();
                //メッシュを回転
                for (const mesh of meshes) {
                    mesh.rotation.x += 0.1 * getDeltaTime;
                    mesh.rotation.y += 0.12 * getDeltaTime;
                    controls.enabled = false;
                }
                //カーソルの位置におけるカメラの制御
                camera.position.x += cursor.x * getDeltaTime * 1;
                camera.position.y += -cursor.y * getDeltaTime * 1;
                controls.update();
                window.requestAnimationFrame(animate);
            };
            animate();
        }
    }, []);

    return (
        <>
            <Head>
                <title>PYLORHYTHM</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            <div className={styles.body}>
                <canvas className="webgl" ref={canvasRef}></canvas>
                <main className={styles.main}>
                    <div className={styles.content}>
                        <a href="/portfolio" >
                            Portfolio
                        </a>
                    </div>
                </main>
            </div>
            </motion.div>
        </>
    );
};
export default Home;
