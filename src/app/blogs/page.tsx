import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getAllPosts } from '@/lib/blog-posts';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description: "Read our latest articles and updates on AI summarization, productivity, and more.",
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="my-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Welcome to our blog. Here you'll find articles and updates.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Link href={`/blogs/${post.slug}`} className="group">
                  <CardTitle className="text-2xl font-bold text-primary group-hover:underline">
                    {post.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
