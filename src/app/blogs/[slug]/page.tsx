import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getPostBySlug } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
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
  const { getAllPosts } = await import('@/lib/blog-posts');
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
