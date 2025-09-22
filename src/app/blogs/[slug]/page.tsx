import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getPostBySlug, getAllPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blogs/${params.slug}`,
      type: 'article',
      // You can add more article-specific properties here
      // publishedTime: post.publishedDate,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://quick-summarize.app/blogs/${post.slug}`,
    },
    // Add author, publisher, datePublished etc. when available
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="my-8">
          <Link href="/blogs" className="inline-flex items-center text-primary font-semibold hover:underline mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
        <article className="prose prose-lg max-w-none bg-background p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
