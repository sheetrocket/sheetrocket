/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/spreadsheets",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
