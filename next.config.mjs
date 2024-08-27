/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/signin',
          permanent: true,
        },
      ]
    },
    reactStrictMode:false,
    typescript: {
      ignoreBuildErrors: true,
    },
  }

export default nextConfig;
