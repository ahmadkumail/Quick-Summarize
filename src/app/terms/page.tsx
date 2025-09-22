import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the Terms and Conditions for using Quick Summarize.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="my-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </div>
        <div className="space-y-6 text-muted-foreground">
          <p>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
          </p>
          <p>
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
