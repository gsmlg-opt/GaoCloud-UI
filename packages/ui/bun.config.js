import { join } from 'path';

// Bun bundler configuration
export default {
  entrypoints: ['./app/app.js'],
  outdir: './build',
  target: 'browser',
  format: 'esm',
  splitting: true,
  minify: {
    identifiers: true,
    whitespace: true,
    syntax: true,
  },
  sourcemap: 'external',
  naming: {
    entry: '[name].[hash].js',
    chunk: '[name].[hash].chunk.js',
    asset: '[name].[hash][ext]',
  },
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
  define: {
    'process.env.NODE_ENV': 'production"',
  },
  external: [],
  publicPath: '/assets/',
  plugins: [],
  resolve: {
    alias: {
      'com': './src/com',
      'utils': './src/utils',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};