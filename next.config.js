/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
    ];
  },
};

export default nextConfig;
