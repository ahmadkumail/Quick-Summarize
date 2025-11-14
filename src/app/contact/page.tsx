import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Contact Us - Quick Summarize',
  description: 'Get in touch with the Quick Summarize team. We welcome your questions, feedback, and support inquiries. Fill out our contact form to reach us.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Quick Summarize',
    description: 'Get in touch with the Quick Summarize team for support, questions, or feedback.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'url': 'https://quick-summarize.app/contact',
    'name': 'Contact Us',
    'description': 'Get in touch with the Quick Summarize team.',
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="my-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We'd love to hear from you. Fill out the form below to get in touch.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
