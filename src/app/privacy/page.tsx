import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - AI Daily News',
};

// 各セクションのデザインを統一するためのコンポーネント
const PolicySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">{title}</h2>
    <div className="space-y-4 text-slate-600">{children}</div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            プライバシーポリシー
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            お客様の個人情報の取り扱いについて説明します。
          </p>
        </div>

        <div className="space-y-10">
          <PolicySection title="第1条（個人情報）">
            <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>
          </PolicySection>

          <PolicySection title="第2条（個人情報の収集方法）">
            <p>本サービスでは、ユーザーが利用登録をする際に、メールアドレスをお尋ねします。決済情報については、決済代行会社であるStripe社がこれを管理し、当事業者はクレジットカード情報等を保持しません。</p>
          </PolicySection>
          
          <PolicySection title="第3条（個人情報を収集・利用する目的）">
            <p>当事業者が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>本サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>上記の利用目的に付随する目的</li>
            </ol>
          </PolicySection>

          <PolicySection title="第4条（第三者提供）">
            <p>当事業者は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
          </PolicySection>

          <PolicySection title="第5条（プライバシーポリシーの変更）">
            <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。当事業者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>
          </PolicySection>

          <PolicySection title="第6条（お問い合わせ窓口）">
            <p>事業者名: NextGen Solutions</p>
            <p>Eメールアドレス: biz-solution@nextgensolues.com</p>
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