'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { SummarizerForm } from '@/components/summarizer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, ClipboardCheck, Loader2, Zap, FileText, Scaling, Clock } from 'lucide-react';
import { Footer } from '@/components/footer';
import Script from 'next/script';

export default function Home() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    toast({
      title: 'Copied to clipboard!',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const summaryWordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Quick Summarize',
    'url': 'https://quick-summarize.app',
    'logo': 'https://quick-summarize.app/logo.png',
    'sameAs': [],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://quick-summarize.app',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://quick-summarize.app?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
       <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main className="flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12 items-start">
          <div id="summarizer-form" className="flex flex-col gap-6 md:sticky top-[80px]">
            <SummarizerForm
              setSummary={setSummary}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card className="rounded-xl shadow-lg border-border/50 flex-1 flex flex-col min-h-[576px]">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-secondary/50 rounded-t-xl border-b">
                <div className='flex items-center gap-4'>
                  <CardTitle className="text-lg font-semibold text-secondary-foreground">
                    AI Summary
                  </CardTitle>
                  {summaryWordCount > 0 && !isLoading && (
                    <span className="text-sm font-medium text-muted-foreground bg-secondary/80 px-2 py-1 rounded-md">
                      {summaryWordCount} {summaryWordCount === 1 ? 'word' : 'words'}
                    </span>
                  )}
                </div>
                {summary && !isLoading && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="text-primary hover:bg-primary/10 hover:text-primary rounded-full"
                  >
                    {isCopied ? (
                      <ClipboardCheck className="h-5 w-5" />
                    ) : (
                      <Clipboard className="h-5 w-5" />
                    )}
                    <span className="sr-only">Copy summary</span>
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-6 text-left flex-1">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center space-y-4 text-center h-full">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="font-semibold text-xl">
                      Generating summary...
                    </p>
                    <p className="text-muted-foreground">
                      Our AI is working its magic. This may take a moment.
                    </p>
                  </div>
                )}
                {!isLoading && !summary && (
                  <div className="flex flex-col items-center justify-center text-center h-full text-muted-foreground">
                    <p className="text-lg">Your generated AI summary will appear here.</p>
                  </div>
                )}
                {summary && !isLoading && (
                  <p className="text-base leading-relaxed text-foreground/90">
                    {summary}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">It’s as Easy as 1-2-3</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting to the point has never been simpler. Here’s how our tool transforms your content.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                   <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">1. Add Your Content</h3>
                <p className="mt-2 text-muted-foreground">
                  Simply paste your text directly, or upload a document. We support .txt, .pdf, and .docx files.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">2. Click Summarize</h3>
                <p className="mt-2 text-muted-foreground">
                   With one click, our powerful AI gets to work, analyzing your content to find the key points.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <ClipboardCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">3. Get Your Summary</h3>
                <p className="mt-2 text-muted-foreground">
                  Your clear, concise summary is ready. Copy it and get back to what you do best.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">A Smarter Way to Work and Study</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We built Quick Summarize with features designed to make your life genuinely easier.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Summarize Anything</h3>
                <p className="mt-2 text-muted-foreground">
                  From dense articles to lengthy reports, our AI handles it all. We support raw text and popular document formats.
                </p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <Scaling className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Control the Detail</h3>
                <p className="mt-2 text-muted-foreground">
                  You’re in charge. Choose between short, medium, or detailed summaries to get the perfect level of insight for your needs.
                </p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Reclaim Your Time</h3>
                <p className="mt-2 text-muted-foreground">
                  Why spend hours reading when you can get the key points in seconds? Boost your productivity and focus on what truly matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Built for Humans, by Humans</h2>
            <p className="mt-4 text-lg text-muted-foreground">
             We get it. The amount of information we face every day is overwhelming. Quick Summarize was created to be a simple, powerful tool to cut through the noise. We believe that understanding information should be fast, easy, and accessible to everyone.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're a student trying to keep up, a professional on a deadline, or just curious, we're here to help you learn more in less time.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href="#summarizer-form">Give it a try</a>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
