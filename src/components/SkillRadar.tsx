import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { skills, SKILL_MAX, SKILL_LEVEL_LEGEND } from '@/data/skills';
import styles from '@/styles/Profile/Profile.module.scss';

gsap.registerPlugin(ScrollTrigger);

/** viewBox。横長にしてラベル用の余白を左右に確保する */
const VIEW_W = 620;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = 252;
const R = 142;
/** ラベルを置く半径（R からの倍率） */
const LABEL_R = R * 1.17;

const angleOf = (index: number, total: number) =>
    -Math.PI / 2 + (Math.PI * 2 * index) / total;

const pointOf = (index: number, value: number, total: number) => {
    const a = angleOf(index, total);
    const r = (R * value) / SKILL_MAX;
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
};

const polygonPoints = (values: number[]) =>
    values
        .map((v, i) => {
            const p = pointOf(i, v, values.length);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        })
        .join(' ');

/** 長いラベルを 2 行に折り返す（・ か ／ を優先的に改行位置にする） */
const wrapLabel = (label: string): string[] => {
    if (label.length <= 8) return [label];
    const breaks = ['・', '／', '/'];
    for (const b of breaks) {
        const at = label.indexOf(b);
        if (at > 0 && at < label.length - 1) {
            return [label.slice(0, at + 1), label.slice(at + 1)];
        }
    }
    const half = Math.ceil(label.length / 2);
    return [label.slice(0, half), label.slice(half)];
};

const SkillRadar: React.FC = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const areaRef = useRef<SVGPolygonElement>(null);

    const total = skills.length;
    const values = skills.map((s) => s.level);

    useEffect(() => {
        const wrap = wrapRef.current;
        const area = areaRef.current;
        if (!wrap || !area) return;

        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const length = area.getTotalLength();
        const dots = wrap.querySelectorAll<SVGCircleElement>('[data-radar-dot]');
        const bars = wrap.querySelectorAll<HTMLElement>('[data-skill-bar]');

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: { trigger: wrap, start: 'top 75%', once: true },
            });
            tl.fromTo(
                area,
                { strokeDasharray: length, strokeDashoffset: length, fillOpacity: 0 },
                { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
            )
                .to(area, { fillOpacity: 0.18, duration: 0.6 }, '-=0.4')
                .fromTo(
                    dots,
                    { scale: 0, transformOrigin: 'center' },
                    { scale: 1, duration: 0.35, stagger: 0.06, ease: 'back.out(2)' },
                    '-=0.5'
                )
                .fromTo(
                    bars,
                    { scaleX: 0, transformOrigin: 'left center' },
                    { scaleX: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
                    '-=0.6'
                );
        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.skillMap} ref={wrapRef}>
            <p className={styles.skillLegend}>
                {SKILL_LEVEL_LEGEND.map((l) => (
                    <span key={l.level}>
                        <b>{l.level}</b>
                        {l.label}
                    </span>
                ))}
            </p>

            <div className={styles.skillBody}>
                <div className={styles.skillChart}>
                    <svg
                        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                        role="img"
                        aria-label="スキルレベルのレーダーチャート"
                    >
                        {Array.from({ length: SKILL_MAX }, (_, i) => i + 1).map((lv) => (
                            <polygon
                                key={lv}
                                points={polygonPoints(new Array(total).fill(lv))}
                                className={styles.radarGrid}
                            />
                        ))}
                        {skills.map((s, i) => {
                            const p = pointOf(i, SKILL_MAX, total);
                            return (
                                <line
                                    key={s.name}
                                    x1={CX}
                                    y1={CY}
                                    x2={p.x}
                                    y2={p.y}
                                    className={styles.radarAxis}
                                />
                            );
                        })}

                        <polygon
                            ref={areaRef}
                            points={polygonPoints(values)}
                            className={styles.radarArea}
                        />

                        {skills.map((s, i) => {
                            const p = pointOf(i, s.level, total);
                            return (
                                <circle
                                    key={s.name}
                                    data-radar-dot
                                    cx={p.x}
                                    cy={p.y}
                                    r={6}
                                    className={styles.radarDot}
                                />
                            );
                        })}

                        {skills.map((s, i) => {
                            const a = angleOf(i, total);
                            const x = CX + LABEL_R * Math.cos(a);
                            const y = CY + LABEL_R * Math.sin(a);
                            const dx = x - CX;
                            const dy = y - CY;
                            const anchor =
                                Math.abs(dx) < 20 ? 'middle' : dx > 0 ? 'start' : 'end';
                            const lines = wrapLabel(s.short);
                            const baseY = y + (dy > 20 ? 14 : dy < -20 ? -8 : 5);
                            return (
                                <text
                                    key={s.name}
                                    x={x}
                                    y={baseY}
                                    textAnchor={anchor}
                                    className={styles.radarLabel}
                                >
                                    {lines.map((line, li) => (
                                        <tspan key={line} x={x} dy={li === 0 ? 0 : 17}>
                                            {line}
                                        </tspan>
                                    ))}
                                    <tspan
                                        x={x}
                                        dy={18}
                                        className={styles.radarLevel}
                                    >{`Lv.${s.level}`}</tspan>
                                </text>
                            );
                        })}
                    </svg>
                </div>

                <ul className={styles.skillList}>
                    {skills.map((s) => (
                        <li key={s.name}>
                            <div className={styles.skillHead}>
                                <span className={styles.skillName}>{s.name}</span>
                                <span className={styles.skillLv}>{`Lv.${s.level}`}</span>
                            </div>
                            <div className={styles.skillMeter} aria-hidden="true">
                                {Array.from({ length: SKILL_MAX }, (_, i) => (
                                    <i
                                        key={i}
                                        data-skill-bar={i < s.level ? '' : undefined}
                                        className={i < s.level ? styles.on : undefined}
                                    />
                                ))}
                            </div>
                            <p className={styles.skillNote}>{s.note}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <p className={styles.skillFoot}>
                ※ レベルは自己評価です。各項目の説明が、その評価の根拠にあたる実務です。
            </p>
        </div>
    );
};

export default SkillRadar;
