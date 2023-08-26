import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link'; 
import styles from '@/styles/Portfolio/Portfolio.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import Slide from '@/components/slide';
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);
gsap.config({
    nullTargetWarn: false,
});
const Portfolio: React.FC = () => {
    const pinRef = useRef(null);
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
    return (
        <>
            <Head>
                <title>PORTFOLIO</title>
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
                <main className={styles.main}>
                    <div className={styles.titleBox}>
                        <h1 className="title">PORTFOLIO</h1>
                    </div>
                    <div className={styles.slide}> 
                        <Slide/>
                    </div>
                    <section className={styles.sectionLast}>
                        <Link href="/profile" scroll={false}>
                            Profile
                        </Link>
                    </section>
                </main>
            </div>
            </motion.div>
        </>
    );
};
export default Portfolio;