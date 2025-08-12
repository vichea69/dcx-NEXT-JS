import createNextIntlPlugin from 'next-intl/plugin';

// Build image remotePatterns dynamically without inserting undefined entries
const baseRemotePatterns = [
    { protocol: 'https', hostname: 'i.pravatar.cc' },
    { protocol: 'https', hostname: 'res.cloudinary.com' },
    { protocol: 'https', hostname: 'pub-5ad5f7c802a843e0a594defda4055bb9.r2.dev' },
];

if (process.env.R2_PUBLIC_BASE_HOSTNAME) {
    baseRemotePatterns.push({
        protocol: 'https',
        hostname: process.env.R2_PUBLIC_BASE_HOSTNAME,
    });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: baseRemotePatterns,
    }
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
