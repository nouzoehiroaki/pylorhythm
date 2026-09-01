import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/Portfolio/Portfolio.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import WorkSlide from '@/components/WorkSlide';
import { works } from '@/data/works';
import { featured } from '@/data/featured';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
ScrollTrigger.config({ ignoreMobileResize: true });

/** 横スクロールで動かす距離。スライド枚数から自動計算 (9枚なら 800) */
const SCROLL_SPAN = (works.length - 1) * 100;
/** クロスフェード 1 段あたりのスクロール量 (px) */
const FADE_SPAN_PC = 3000;
const FADE_SPAN_SP = 2000;

const Slide: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    // 横スクロール
    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
                translateX: `-${SCROLL_SPAN}vw`,
                ease: 'none',
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: `${SCROLL_SPAN}% top`,
                    scrub: 0.6,
                    pin: true,
                    // 1 スライドごとにスナップ。不要ならこの snap ブロックごと削除
                    snap: {
                        snapTo: 1 / (works.length - 1),
                        duration: { min: 0.2, max: 0.3 },
                        delay: 0.2,
                        ease: 'power1.inOut',
                    },
                },
            }
        );
        return () => {
            pin.kill();
        };
    }, []);

    // ピン留めセクションのクロスフェード
    useEffect(() => {
        const steps = featured.length;
        const fadeSpan = window.innerWidth <= 800 ? FADE_SPAN_SP : FADE_SPAN_PC;
        const timeline = gsap.timeline({
            defaults: { duration: 300 },
            scrollTrigger: {
                trigger: pinRef.current,
                scrub: true,
                start: 'top top',
                end: `+=${fadeSpan * Math.max(steps - 1, 1)}`,
                pinSpacing: false,
                pin: true,
            },
        });

        featured.forEach((_, index) => {
            const text = textRefs.current[index];
            const image = imageRefs.current[index];

            timeline
                .fromTo(
                    text,
                    { opacity: 0, pointerEvents: 'none' },
                    { opacity: 1, pointerEvents: 'auto' }
                )
                .fromTo(image, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '<');

            // 最後の 1 枚は出したままにする
            if (index < steps - 1) {
                timeline
                    .to(text, { opacity: 0, delay: 600, pointerEvents: 'none' })
                    .to(image, { opacity: 0, y: -20 }, '<');
            }
        });

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <>
            <section className={styles.outer}>
                <div ref={triggerRef}>
                    <div
                        ref={sectionRef}
                        className={styles.inner}
                        style={{ '--slide-count': works.length } as React.CSSProperties}
                    >
                        {works.map((work) => (
                            <WorkSlide key={work.id} work={work} />
                        ))}
                    </div>
                </div>
            </section>
            <section className={`${styles.outer02} ${styles.bg02}`}>
                <div ref={pinRef}>
                    <div className={styles.inner02}>
                        <div className={styles.section}>
                            <div className={styles.title02}>
                                {featured.map((item, index) => (
                                    <span
                                        key={item.id}
                                        ref={(el) => {
                                            textRefs.current[index] = el;
                                        }}
                                    >
                                        <h2>{item.title}</h2>
                                        <p className={styles.skill}>{item.skills}</p>
                                        <p>
                                            <Link
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.url}
                                            </Link>
                                        </p>
                                    </span>
                                ))}
                            </div>
                            <div className={styles.images}>
                                {featured.map((item, index) => (
                                    <picture key={item.id}>
                                        <source
                                            srcSet={`/view/${item.image.name}.webp`}
                                            type="image/webp"
                                        />
                                        <Image
                                            src={`/view/${item.image.name}.png`}
                                            alt=""
                                            width={item.image.width}
                                            height={item.image.height}
                                            ref={(el) => {
                                                imageRefs.current[index] = el;
                                            }}
                                        />
                                    </picture>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Slide;
