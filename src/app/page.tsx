import { Logo } from '@/components/logo';
import { SummarizerForm } from '@/components/summarizer-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 pt-12 sm:p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-between text-center font-mono text-sm">
        <div className="flex flex-col items-center space-y-4 mb-12">
          <Logo />
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Quick Summarize
          </h1>
          <p className="max-w-xl text-lg text-foreground/80">
            Effortlessly condense long texts and documents into concise summaries
            with AI.
          </p>
        </div>
        <SummarizerForm />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/20" />
    </main>
  );
}
