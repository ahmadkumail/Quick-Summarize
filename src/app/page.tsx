'use client';

import { useState } from 'react';
import { Logo } from '@/components/logo';
import { SummarizerForm } from '@/components/summarizer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, ClipboardCheck, Loader2 } from 'lucide-react';
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
      <header className="flex items-center h-16 px-6 border-b bg-background/95 backdrop-blur-sm shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Quick Summarize
          </h1>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid gap-8 grid-cols-1 md:grid-cols-2 md:gap-12 items-start">
        <div className="flex flex-col gap-6 sticky top-[80px]">
          <SummarizerForm
            setSummary={setSummary}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="rounded-xl shadow-lg border-border/50 flex-1 flex flex-col">
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
            <CardContent className="p-6 text-left flex-1 min-h-[400px]">
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
      </main>
      <Footer />
    </div>
  );
}
