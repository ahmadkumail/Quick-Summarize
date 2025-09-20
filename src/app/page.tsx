import { Logo } from '@/components/logo';
import { SummarizerForm } from '@/components/summarizer-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 pt-12 sm:p-24">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <Logo />
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          Quick Summarize
        </h1>
        <p className="max-w-xl font-body text-lg text-foreground/80">
          Effortlessly condense long texts and documents into concise summaries
          with AI.
        </p>
      </div>
      <SummarizerForm />
    </main>
  );
}
