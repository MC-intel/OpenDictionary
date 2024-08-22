/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: '/OpenDictionary', 
  assetPrefix: '/OpenDictionary', 
  async rewrites() {
    return [
      {
        source: '/data/:path*',
        destination: '/public/data/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

