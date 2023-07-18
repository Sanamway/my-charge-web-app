/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "parsefiles.back4app.com",
        port: "",
        pathname: "/*/*",
      },
    ],
  },
};

module.exports = nextConfig;
