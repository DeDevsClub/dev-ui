import { withLogtail } from '@logtail/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const sentryConfig = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  /*
   * For all available options, see:
   * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
   */

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  /*
   * Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
   * This can increase your server load as well as your hosting bill.
   * Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
   * side errors will fail.
   */
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  /*
   * Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
   * See the following for more information:
   * https://docs.sentry.io/product/crons/
   * https://vercel.com/docs/cron-jobs
   */
  automaticVercelMonitors: true,
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
    ],
  },
  staticPageGenerationTimeout: 180,
  // biome-ignore lint/suspicious/useAwait: "redirects is async"
  async redirects() {
    return [
      {
        source: '/',
        destination: '/components/announcement',
        permanent: false,
      },
      {
        source: '/components',
        destination: '/components/announcement',
        permanent: false,
      },
      { source: '/ai', destination: '/components/ai', permanent: true },
      {
        source: '/ai/:slug*',
        destination: '/components/ai/:slug*',
        permanent: true,
      },
      {
        source: '/bento',
        destination: '/components/bento',
        permanent: true,
      },
      {
        source: '/announcement',
        destination: '/components/announcement',
        permanent: true,
      },
      { source: '/banner', destination: '/components/banner', permanent: true },
      {
        source: '/code-block',
        destination: '/components/code-block',
        permanent: true,
      },
      {
        source: '/color-picker',
        destination: '/components/color-picker',
        permanent: true,
      },
      {
        source: '/dropzone',
        destination: '/components/dropzone',
        permanent: true,
      },
      { source: '/editor', destination: '/components/editor', permanent: true },
      { source: '/list', destination: '/components/list', permanent: true },
      {
        source: '/sandbox',
        destination: '/components/sandbox',
        permanent: true,
      },
      {
        source: '/snippet',
        destination: '/components/snippet',
        permanent: true,
      },
    ];
  },

  transpilePackages: ['@sentry/nextjs'],
};

let nextConfig = withMDX(withLogtail({ ...config }));

if (process.env.VERCEL) {
  nextConfig = withSentryConfig(nextConfig, sentryConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;
