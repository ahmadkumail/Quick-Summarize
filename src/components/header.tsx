import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-background/95 backdrop-blur-sm shrink-0 sticky top-0 z-10">
      <Link href="/" className="flex items-center gap-3">
        <Logo />
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Quick Summarize
        </h1>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Home
        </Link>
        <Link
          href="/blogs"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Blogs
        </Link>
        <Link
          href="/faq"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          FAQs
        </Link>
        <Link
          href="/contact"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
