/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};

const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 6000000,
  },
});
