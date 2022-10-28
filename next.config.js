/** @type {import('next').NextConfig} */
const nextConfig = {
  // serverRuntimeConfig: {
  //   SECRTE: "secret code",
  // },
  // publicRuntimeConfig: {
  //   SECRTE: "secret code public",
  // },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
