import { Footer } from '@/components/footer';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function BlogsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Welcome to our blog. Here you'll find articles and updates.
          </p>
        </div>
        {/* Placeholder for blog posts */}
        <div className="text-center text-muted-foreground">
          <p>No blog posts yet. Check back later!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
