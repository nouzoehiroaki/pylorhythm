import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Portfolio/Portfolio.module.scss';
import type { Work } from '@/data/works';

type Props = {
    work: Work;
};

/** 横スクロールスライダーの 1 枚ぶん。見た目の変更はこのファイルだけで完結します。 */
const WorkSlide: React.FC<Props> = ({ work }) => {
    const { id, title, url, skills, description, github, foreword, image } = work;
    return (
        <div id={id} className={styles.section}>
            <div className={`${styles.box} ${styles.left}`}>
                <h2>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </Link>
                </h2>
                <p className={styles.skill}>{skills}</p>
                <p className={styles.read}>
                    {description}
                    {github && (
                        <>
                            <br />
                            <Link href={github} target="_blank" rel="noopener noreferrer">
                                {github}
                            </Link>
                        </>
                    )}
                </p>
                {foreword && <p className={styles.foreword}>{foreword}</p>}
            </div>
            <div className={styles.box}>
                <div className={styles.moc}>
                    <div className={styles.view}>
                        <picture>
                            <source srcSet={`/view/${image.name}.webp`} type="image/webp" />
                            <Image
                                src={`/view/${image.name}.png`}
                                alt=""
                                width={image.width}
                                height={image.height}
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
    );
};

export default WorkSlide;
