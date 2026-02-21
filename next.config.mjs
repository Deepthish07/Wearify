const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'Wearify';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }]
  },
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`
      }
    : {})
};

export default nextConfig;
