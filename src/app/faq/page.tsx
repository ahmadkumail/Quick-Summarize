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
        'name': 'What is Quick Summarize and who is it for?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Quick Summarize is an AI-powered tool designed to help you instantly condense long texts and documents into short, easy-to-read summaries. It’s perfect for students, professionals, researchers, and anyone who feels overwhelmed by information and wants to save time reading.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What kind of documents can I upload?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can upload the most common document types, including .txt (plain text), .pdf (Portable Document Format), and .docx (Microsoft Word). The maximum file size is 5MB. This makes it ideal for summarizing articles, reports, and essays.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is there a limit to how much text I can paste?',
        'acceptedAnswer': {
          '@type-': 'Answer',
          'text': 'Yes. To ensure our servers can keep up and provide high-quality summaries for everyone, you can paste and summarize up to 15,000 characters at a time. This is long enough for most articles and book chapters.',
        },
      },
       {
        '@type': 'Question',
        'name': 'How does the AI work? Does it just copy sentences?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our tool uses an advanced "abstractive" summarization model. This means that instead of just finding and copying important sentences, our AI actually understands the core concepts and then generates new, unique sentences to explain them. The result is a much more natural and coherent summary, almost like a person wrote it.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is my data private and secure?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. We take your privacy very seriously. The content you summarize is processed securely, and we do not store it on our servers or use it to train our AI models. Your text and documents are your own.',
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
            Have questions? We've got answers. Here are some of the most common things people ask.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Quick Summarize and who is it for?</AccordionTrigger>
            <AccordionContent>
             Quick Summarize is an AI-powered tool designed to help you instantly condense long texts and documents into short, easy-to-read summaries. It’s perfect for students, professionals, researchers, and anyone who feels overwhelmed by information and wants to save time reading.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What kind of documents can I upload?</AccordionTrigger>
            <AccordionContent>
             You can upload the most common document types, including .txt (plain text), .pdf (Portable Document Format), and .docx (Microsoft Word). The maximum file size is 5MB. This makes it ideal for summarizing articles, reports, and essays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a limit to how much text I can paste?</AccordionTrigger>
            <AccordionContent>
            Yes. To ensure our servers can keep up and provide high-quality summaries for everyone, you can paste and summarize up to 15,000 characters at a time. This is long enough for most articles and book chapters.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How does the AI work? Does it just copy sentences?</AccordionTrigger>
            <AccordionContent>
            Our tool uses an advanced "abstractive" summarization model. This means that instead of just finding and copying important sentences, our AI actually understands the core concepts and then generates new, unique sentences to explain them. The result is a much more natural and coherent summary, almost like a person wrote it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is my data private and secure?</AccordionTrigger>
            <AccordionContent>
            Absolutely. We take your privacy very seriously. The content you summarize is processed securely, and we do not store it on our servers or use it to train our AI models. Your text and documents are your own.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
