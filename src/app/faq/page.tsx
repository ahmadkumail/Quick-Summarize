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
          'text': 'Quick Summarize is an AI-powered tool that helps you summarize long texts and documents into concise and easy-to-read summaries. It uses advanced natural language processing to understand the core message of your content and deliver accurate key points.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What file types are supported for document summarization?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We support the most common document formats, including .txt (plain text), .pdf (Portable Document Format), and .docx (Microsoft Word). The maximum file size for any uploaded document is 5MB.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is there a character limit for pasting text?',
        'acceptedAnswer': {
          '@type-': 'Answer',
          'text': 'Yes, for optimal performance and to ensure high-quality summaries, you can paste and summarize up to 15,000 characters at a time in the text input field.',
        },
      },
       {
        '@type': 'Question',
        'name': 'How does the AI work? Is it extractive or abstractive?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our tool primarily uses an advanced abstractive summarization model. This means that instead of just copying and pasting key sentences (extractive), our AI generates new, unique sentences that capture the essence of the original text, much like a human would. This results in more fluent, coherent, and readable summaries.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is my data secure? What about privacy?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We take your privacy and data security very seriously. The content you summarize is processed securely and is not stored on our servers or used for training our AI models. For more details, please refer to our full Privacy Policy.',
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
             Quick Summarize is an AI-powered tool that helps you summarize long texts and documents into concise and easy-to-read summaries. It uses advanced natural language processing to understand the core message of your content and deliver accurate key points.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What file types are supported for document summarization?</AccordionTrigger>
            <AccordionContent>
             We support the most common document formats, including .txt (plain text), .pdf (Portable Document Format), and .docx (Microsoft Word). The maximum file size for any uploaded document is 5MB.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a character limit for pasting text?</AccordionTrigger>
            <AccordionContent>
              Yes, for optimal performance and to ensure high-quality summaries, you can paste and summarize up to 15,000 characters at a time in the text input field.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger>How does the AI work? Is it extractive or abstractive?</AccordionTrigger>
            <AccordionContent>
              Our tool primarily uses an advanced abstractive summarization model. This means that instead of just copying and pasting key sentences (extractive), our AI generates new, unique sentences that capture the essence of the original text, much like a human would. This results in more fluent, coherent, and readable summaries.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-5">
            <AccordionTrigger>Is my data secure? What about privacy?</AccordionTrigger>
            <AccordionContent>
              We take your privacy and data security very seriously. The content you summarize is processed securely and is not stored on our servers or used for training our AI models. For more details, please refer to our full Privacy Policy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
