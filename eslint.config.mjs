/**
 * ESLint フラット構成。
 *
 * Next.js 16 で `next lint` コマンドが削除されたため、ESLint CLI を直接使います。
 * あわせて ESLint 9 以降の既定である flat config 形式へ移行しました
 * （旧 .eslintrc.json は削除済み）。
 *
 * eslint-config-next@16 の各エントリは flat config の配列を返すので、
 * そのままスプレッドして使えます。
 */
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const config = [
    {
        ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
    },
    ...nextCoreWebVitals,
    ...nextTypeScript,
    {
        rules: {
            // Pages Router の静的リンクで誤検知するため従来どおり無効化
            '@next/next/no-html-link-for-pages': 'off',
        },
    },
]

export default config
