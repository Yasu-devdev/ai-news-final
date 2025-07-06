import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約 - AI Daily News',
};

const PolicySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">{title}</h2>
    <div className="space-y-4 text-slate-600">{children}</div>
  </section>
);

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            利用規約
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            本サービスの利用に関するルールを定めています。
          </p>
        </div>

        <div className="space-y-10">
          <PolicySection title="第1条（適用）">
            <p>この利用規約（以下、「本規約」といいます。）は、NextGen Solutions（以下、「当事業者」といいます。）が提供するサービス「AI Daily News」（以下、「本サービス」といいます。）の利用条件を定めるものです。</p>
          </PolicySection>

          <PolicySection title="第2条（利用登録）">
            <p>本サービスにおいては、登録希望者が本規約に同意の上、当事業者の定める方法によって利用登録を申請し、当事業者がこれを承認することによって、利用登録が完了するものとします。</p>
          </PolicySection>

          <PolicySection title="第3条（料金および支払方法）">
            <p>ユーザーは、本サービスの対価として、当事業者が別途定め、本ウェブサイトに表示する利用料金を、当事業者が指定する方法により支払うものとします。</p>
          </PolicySection>

          <PolicySection title="第4条（キャンセル・返金）">
            <p>サービスの性質上、お支払いいただいた利用料金については、理由の如何を問わず、原則として返金には応じられません。サブスクリプションはいつでも解約でき、解約手続きが完了した場合、次回の請求期間から料金は発生しません。</p>
          </PolicySection>
          
          <PolicySection title="第5条（禁止事項）">
            <p>ユーザーは、本サービスの利用にあたり、配信されたコンテンツを許可なく第三者に再配布、転売、共有する行為など、当事業者の知的財産権を侵害する行為を行ってはなりません。</p>
          </PolicySection>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-8 text-center">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                トップページに戻る
            </Link>
        </div>
      </main>
    </div>
  );
}