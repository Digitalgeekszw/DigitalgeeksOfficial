/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['nodemailer'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
