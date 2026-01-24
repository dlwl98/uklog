const path = require('path');
const stylexPlugin = require('@stylexjs/nextjs-plugin');
const removeImports = require('next-remove-imports')();

module.exports = stylexPlugin({
  aliases: {
    '@': [__dirname],
  },
  rootDir: __dirname,
})(removeImports({}));
