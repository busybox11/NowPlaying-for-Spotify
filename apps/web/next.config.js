/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],

  async redirects() {
    // Remove .php extension
    return [
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};
