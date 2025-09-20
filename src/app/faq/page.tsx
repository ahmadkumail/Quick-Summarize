import { Footer } from '@/components/footer';
import { Logo } from '@/components/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <header className="flex items-center h-16 px-6 border-b bg-background/95 backdrop-blur-sm shrink-0 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Quick Summarize
          </h1>
        </Link>
      </header>
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
