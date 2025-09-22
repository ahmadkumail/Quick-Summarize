import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  metadataBase: new URL('https://quick-summarize.app'),
  title: {
    default: 'Quick Summarize - AI-Powered Text and Document Summarizer',
    template: '%s | Quick Summarize',
  },
  description: 'Summarize long texts, articles, and documents instantly with our advanced AI-powered summarization tool. Get concise summaries in seconds.',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
