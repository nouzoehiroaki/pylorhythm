import React, { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'; 
import styles from '@/styles/Portfolio/Portfolio.module.scss'
import Image from 'next/image'

const Portfolio: React.FC = () => {
    
    useEffect(() =>{
        let imagesItems = Array.from(document.querySelectorAll(".imgWrap"));
        let title = Array.from(document.querySelectorAll(".title"));
        let message = Array.from(document.querySelectorAll(".message"));
        console.log(imagesItems);
        console.log(title);

        //具体的にいつ発動させるのかを決めるオプション
        let options = {
            rootMargin: "0px", //デフォルトで０.marginとほぼ同じ。
            threshold: 0.2, // 閾値は0.2。これが１になると完全に画面におさまってから発動する
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
                <title>Portfolio</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.body}>
                <main className={styles.main}>
                    <h1>Portfolio</h1>
                    <section className={styles.section}>
                        
                    </section>
                    <section className={styles.section}>
                        
                    </section>
                    <section className={styles.section}>
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
export default Portfolio;
