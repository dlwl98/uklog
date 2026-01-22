const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
};

module.exports = removeImports(nextConfig);
