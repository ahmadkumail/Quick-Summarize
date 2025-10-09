import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://aisummarize.online/</loc></url>
    <url><loc>https://aisummarize.online/blogs</loc></url>
    <url><loc>https://aisummarize.online/faq</loc></url>
    <url><loc>https://aisummarize.online/contact</loc></url>
    <url><loc>https://aisummarize.online/privacy</loc></url>
    <url><loc>https://aisummarize.online/terms</loc></url>
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
