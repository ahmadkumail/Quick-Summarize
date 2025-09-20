'use client';

import { useState } from 'react';
import { Logo } from '@/components/logo';
import { SummarizerForm } from '@/components/summarizer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Clipboard, ClipboardCheck, Loader2 } from 'lucide-react';

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

  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <header className="flex items-center h-16 px-6 border-b bg-background shrink-0">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Quick Summarize
          </h1>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SummarizerForm
            setSummary={setSummary}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="rounded-xl shadow-sm border-border/50 flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between p-4 bg-secondary/50 rounded-t-xl border-b">
              <CardTitle className="text-lg font-semibold text-secondary-foreground">
                Your Summary
              </CardTitle>
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
                  <p className="text-lg">Your generated summary will appear here.</p>
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
    </div>
  );
}
