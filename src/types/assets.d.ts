/**
 * Next.js 13.4 が同梱する型定義（next/types/global.d.ts）は
 * `*.module.css` / `*.module.sass` / `*.module.scss` しか宣言していないため、
 * `import '@/styles/globals.css'` のような素の CSS の副作用インポートに
 * 型宣言が存在しない状態になります。
 *
 * TypeScript 5.6 以降で追加された副作用インポートのチェックが働く環境
 * （エディタ側の TS が新しい場合など）では、これが
 * 「副作用インポートに対するモジュールまたは型宣言が見つかりません」
 * として報告されるため、ここで補っています。
 */
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
