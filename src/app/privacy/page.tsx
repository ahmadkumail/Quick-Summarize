import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for Quick Summarize.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="my-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your privacy is important to us.
          </p>
        </div>
        <div className="space-y-6 text-muted-foreground">
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">Collecting and Using Your Personal Data</h2>
          <p>
            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name and last name, Usage Data.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
