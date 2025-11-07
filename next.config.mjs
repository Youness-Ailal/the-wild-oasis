/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://vinwfvxphsnsohpfmqle.supabase.co/storage/v1/object/public/**"
      ),
    ],
  },
};

export default nextConfig;
