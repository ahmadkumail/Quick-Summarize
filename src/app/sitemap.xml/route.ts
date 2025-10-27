import { getAllPosts } from '@/lib/blog-posts';

export async function GET() {
  const baseUrl = 'https://quick-summarize.app';
  const staticPages = [
    '/',
    '/blogs',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const posts = getAllPosts();
  const postUrls = posts.map(post => `${baseUrl}/blogs/${post.slug}`);

  const allUrls = [...staticPages.map(page => `${baseUrl}${page}`), ...postUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(url => `
    <url>
      <loc>${url}</loc>
    </url>
  `)
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
