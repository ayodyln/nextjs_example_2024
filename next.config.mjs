/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.waifu.pics",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
