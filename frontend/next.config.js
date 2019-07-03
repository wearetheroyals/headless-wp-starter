const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

const nextConfig = {};

module.exports = withPlugins([withTypescript, withSass], nextConfig);
