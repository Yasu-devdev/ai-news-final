import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 - AI Daily News',
  description: 'AI Daily Newsの特定商取引法に基づく表記ページです。',
};

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border-l-4 border-blue-500 pl-6">
    <h2 className="text-base font-bold text-slate-800">{title}</h2>
    <div className="mt-2 text-md text-slate-600">{children}</div>
  </section>
);

export default function TokushohoPage() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            特定商取引法に基づく表記
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            当サービスをご利用いただくにあたっての重要な情報です。
          </p>
        </div>

        <div className="space-y-10">
          <InfoSection title="事業者名"><p>NextGen Solutions</p></InfoSection>
          <InfoSection title="所在地"><p>請求があった場合、遅滞なく開示します。</p></InfoSection>
          <InfoSection title="お問い合わせ"><a href="mailto:biz-solution@nextgensolues.com" className="text-blue-600 hover:underline">biz-solution@nextgensolues.com</a></InfoSection>
          <InfoSection title="サービス名"><p>AI Daily News</p></InfoSection>
          <InfoSection title="販売価格"><ul className="list-disc list-inside"><li>月額プラン: 300円（税込）</li><li>年間プラン: 3,000円（税込）</li></ul></InfoSection>
          <InfoSection title="商品代金以外の料金"><p>インターネット接続料金、通信料金等はお客様のご負担となります。</p></InfoSection>
          <InfoSection title="お支払い方法"><p>クレジットカード決済 (Stripe)</p></InfoSection>
          <InfoSection title="提供時期"><p>決済完了後、直ちにサービス利用が開始され、翌日からメール配信が開始されます。</p></InfoSection>
          <InfoSection title="キャンセル・返金"><p>サービスの性質上、返金は受け付けておりません。サブスクリプションはいつでも解約可能です。</p></InfoSection>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-8 text-center">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">トップページに戻る</Link>
        </div>
      </main>
    </div>
  );
}