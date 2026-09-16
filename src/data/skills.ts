/**
 * スキルマップ（レーダーチャート＋レベルメーター）のデータ。
 *
 * ここに 1 オブジェクト追加／削除するだけで、レーダーの頂点数と
 * 下の一覧が自動で追従します（SkillRadar.tsx 側は items.length から計算）。
 *
 * level は 1〜5。定義は SKILL_LEVEL_LEGEND を参照。
 * note には「なぜそのレベルなのか」の根拠となる実務を書きます。
 * 自己評価である以上、根拠が添えられていないと数字が信用されないため、
 * note は必須項目としています。
 */
export type Skill = {
    /** 一覧に出す正式名称 */
    name: string;
    /** レーダーの頂点ラベル。長い名称は省略形にする（8文字以内推奨） */
    short: string;
    /** 1〜5 */
    level: number;
    /** そのレベルの根拠にあたる実務 */
    note: string;
};

/** レーダーの最大値 */
export const SKILL_MAX = 5;

/** レベルの定義。チャートの上に凡例として出す */
export const SKILL_LEVEL_LEGEND: { level: number; label: string }[] = [
    { level: 5, label: '設計判断まで担い、他者に説明・レビューできる' },
    { level: 4, label: '単独で設計・実装し、本番運用まで回せる' },
    { level: 3, label: '実務で継続的に担当している' },
    { level: 2, label: '実務での使用経験がある' },
    { level: 1, label: '学習・検証段階' },
];

export const skills: Skill[] = [
    {
        name: 'フロントエンド実装',
        short: 'フロントエンド',
        level: 5,
        note: '11年、全案件の主務。Nuxt.js / Next.js / React / Vue と TypeScript。実装だけでなく、コンポーネント設計指針やレビュー観点の策定まで担当してきた領域です。',
    },
    {
        name: '生成AI活用開発',
        short: '生成AI活用',
        level: 5,
        note: '実装補助ではなく、専門外の領域を本番品質まで持っていくための道具として使用。Claude Code を設計の壁打ち相手に CI/CD 基盤を構築し、2年9カ月稼働しています。',
    },
    {
        name: 'CI/CD・デプロイ基盤',
        short: 'CI/CD基盤',
        level: 4,
        note: '「作ったものを届ける」ために自分で手を広げた領域。OIDC によるキーレスデプロイをゼロから構築し、単独で運用を継続しています。',
    },
    {
        name: '要件定義・推進',
        short: '要件定義・推進',
        level: 4,
        note: '仕様書が未確定の状態から仕様策定そのものを引き取り、期日通りにローンチ。受託100社超でも、顧客折衝から運用までを一貫して担当しました。',
    },
    {
        name: '制作ディレクション・外注管理',
        short: 'ディレクション',
        level: 4,
        note: '個人事業として100社超を並行運営。外部パートナーの調達、発注単価・納期の設定、進捗と予算の管理、品質チェックまでを担当。受注側の経験も長く、発注・受注双方の視点を持っています。',
    },
    {
        name: 'クラウド・運用',
        short: 'クラウド運用',
        level: 3,
        note: 'AWS・Google Cloud・Kubernetes 上でアプリケーションを運用。監視と障害の一次対応は担当しますが、インフラ専任としての設計・チューニングは範囲外です。',
    },
    {
        name: 'サーバーサイド／API',
        short: 'サーバー／API',
        level: 3,
        note: 'PHP 6年4カ月。Route Handler での API 実装、Webhook の署名検証や冪等性の設計まで担当。RDB のスキーマ設計は、これから広げたい領域です。',
    },
];
