/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'maps.googleapis.com',
                port: '',
                pathname: '/maps/api/place/**',
            },
        ],
    },
}

module.exports = nextConfig
