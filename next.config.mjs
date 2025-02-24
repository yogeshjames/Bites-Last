/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',   // if needed for local images
      'images.unsplash.com',
      'source.unsplash.com',
      'yourdomain.com',
      'res.cloudinary.com',
    ],
  },
};

export default nextConfig;
