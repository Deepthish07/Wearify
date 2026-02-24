const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repository = process.env.GITHUB_REPOSITORY ?? '';
const [owner = '', repo = ''] = repository.split('/');

const isUserOrOrgSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = isGithubPages && repo && !isUserOrOrgSite ? `/${repo}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }]
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`
      }
    : {})
};

export default nextConfig;
