/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "startupfa.me",
      },
      {
        protocol: "https",
        hostname: "qpeurykzbspfuxfsjlra.supabase.co",
      },
    ],
  },
};

export default nextConfig;
