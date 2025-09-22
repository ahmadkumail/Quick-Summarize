import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Quick Summarize, including supported file types, summarization limits, and how our AI works.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Quick Summarize',
    description: 'Find answers to common questions about Quick Summarize.',
    url: '/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is Quick Summarize?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Quick Summarize is an AI-powered tool that helps you summarize long texts and documents into concise and easy-to-read summaries.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What file types are supported?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We support .txt, .pdf, and .docx file formats. The maximum file size is 5MB.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is there a character limit for text summarization?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, you can summarize up to 15,000 characters at a time.',
        },
      },
    ],
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
          <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We've got answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Quick Summarize?</AccordionTrigger>
            <AccordionContent>
              Quick Summarize is an AI-powered tool that helps you summarize long texts and documents into concise and easy-to-read summaries.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What file types are supported?</AccordionTrigger>
            <AccordionContent>
              We support .txt, .pdf, and .docx file formats. The maximum file size is 5MB.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a character limit for text summarization?</AccordionTrigger>
            <AccordionContent>
              Yes, you can summarize up to 15,000 characters at a time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
