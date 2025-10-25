'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { SummarizerForm } from '@/components/summarizer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, ClipboardCheck, Loader2, Zap, FileText, Scaling, Clock } from 'lucide-react';
import { Footer } from '@/components/footer';

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

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-12 items-start">
          <div className="flex flex-col gap-6 md:sticky top-[80px]">
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
                      Please wait, this may take a moment.
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
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Summarizing your text or documents is as easy as 1-2-3.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                   <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">1. Paste or Upload</h3>
                <p className="mt-2 text-muted-foreground">
                  Easily paste your text into the text area or upload a supported document (.txt, .pdf, .docx).
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">2. Summarize</h3>
                <p className="mt-2 text-muted-foreground">
                  Click the "Summarize" button and let our advanced AI process and condense your content in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-secondary/40 rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <ClipboardCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">3. Get Your Summary</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive a concise and accurate summary. Copy it to your clipboard or use it as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to make your life easier and more productive.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Text & Document Summarization</h3>
                <p className="mt-2 text-muted-foreground">
                  Whether it's raw text or a document file, our AI can handle it. We support .txt, .pdf, and .docx files.
                </p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <Scaling className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Adjustable Summary Length</h3>
                <p className="mt-2 text-muted-foreground">
                  Choose from short, medium, or detailed summaries to get the level of detail that fits your needs perfectly.
                </p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-lg border border-border/50">
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Fast and Efficient</h3>
                <p className="mt-2 text-muted-foreground">
                  Save valuable time. Our powerful AI delivers high-quality summaries in just a few seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Quick Summarize?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                In a world of information overload, Quick Summarize is your essential tool for clarity and focus. We are dedicated to providing a fast, accurate, and user-friendly summarization experience. Our advanced AI is designed to understand the core message of your content, delivering high-quality summaries you can trust.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you're a student, a professional, or a lifelong learner, our tool helps you save time, increase productivity, and absorb information more effectively.
              </p>
              <Button asChild size="lg" className="mt-8">
                <a href="#summarizer-form">Try It Now</a>
              </Button>
            </div>
            <div className="flex items-center justify-center">
                <img src="https://picsum.photos/seed/rocket/500/500" alt="Illustration of a person working efficiently" data-ai-hint="productivity efficiency" className="rounded-xl shadow-2xl"/>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
