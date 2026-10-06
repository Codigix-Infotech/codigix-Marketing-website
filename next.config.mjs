// Legacy / alias URLs that used to render a duplicate copy of a service page.
// A permanent redirect consolidates their ranking signals onto one canonical URL.
const serviceAliases = {
  '/content-marketing': '/medical-content-marketing',
  '/services/content': '/medical-content-marketing',
  '/services/medical-content-marketing': '/medical-content-marketing',
  '/ecommerce-seo-services-in-pcmc': '/ecommerce-marketing',
  '/services/ecommerce': '/ecommerce-marketing',
  '/services/ecommerce-marketing': '/ecommerce-marketing',
  '/services/ppc': '/paid-advertisements-ppc',
  '/services/seo': '/best-seo-services-in-pcmc',
  '/services/social': '/social-media-marketing',
  '/services/social-media-marketing': '/social-media-marketing',
  '/website-design-development': '/web-design-development',
  '/services/web': '/web-design-development',
  '/services/web-design': '/web-design-development',
  '/services/web-design-development': '/web-design-development',
};

// Public site and API addresses come from the environment (see .env.production.example).
const siteUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://codigix.com');
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
const isLocalHost = (host) => /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(host);
const isLiveSite = siteUrl.protocol === 'https:' && !isLocalHost(siteUrl.hostname);

// www.example.com <-> example.com: serve the site on exactly one host.
const canonicalHost = siteUrl.hostname;
const alternateHost = canonicalHost.startsWith('www.') ? canonicalHost.slice(4) : `www.${canonicalHost}`;

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Tell browsers to always use HTTPS. Deliberately no includeSubDomains/preload: add those
  // only once every subdomain is served over HTTPS.
  ...(isLiveSite ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Lets a production build run alongside `next dev` without clobbering its .next folder.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    domains: ['localhost', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },
      // Uploaded media on the production API host.
      {
        protocol: apiUrl.protocol.replace(':', ''),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: '/uploads/**',
      },
    ],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Icons, logos and other files in /public: cache for a week (names can be reused on redesign).
      {
        source: '/:file*.:ext(png|jpg|jpeg|webp|avif|gif|svg|ico|webmanifest)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
  async rewrites() {
    const apiTarget = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/uploads/:path*',
        destination: `${apiTarget}/uploads/:path*`,
      },
      {
        source: '/api/public/:path*',
        destination: `${apiTarget}/api/public/:path*`,
      },
    ];
  },
  async redirects() {
    const hostRedirect = isLocalHost(canonicalHost)
      ? []
      : [
          {
            source: '/:path*',
            has: [{ type: 'host', value: alternateHost }],
            destination: `${siteUrl.origin}/:path*`,
            permanent: true,
          },
        ];
    return [
      ...hostRedirect,
      ...Object.entries(serviceAliases).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
