import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';

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
  openGraph: {
    title: 'Quick Summarize - AI-Powered Text and Document Summarizer',
    description: 'Summarize long texts, articles, and documents instantly with our advanced AI-powered summarization tool.',
    url: 'https://quick-summarize.app',
    siteName: 'Quick Summarize',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Summarize - AI-Powered Text and Document Summarizer',
    description: 'Summarize long texts, articles, and documents instantly with our advanced AI-powered summarization tool.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5530405178327113"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6J9SQV8X1M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6J9SQV8X1M');
          `}
        </Script>

        {/* Adsterra Script */}
        <Script
          src="//pl27767968.revenuecpmgate.com/84cc549c4e6a2c6893ef4066fb09e588/invoke.js"
          strategy="afterInteractive"
        />
        <div id="container-84cc549c4e6a2c6893ef4066fb09e588"></div>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
