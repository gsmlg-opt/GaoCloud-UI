import { join } from 'path';

// Bun bundler configuration for development
export default {
  entrypoints: ['./app/app.js'],
  outdir: './build',
  target: 'browser',
  format: 'esm',
  splitting: true,
  minify: false,
  sourcemap: 'inline',
  naming: {
    entry: '[name].js',
    chunk: '[name].chunk.js',
    asset: '[name][ext]',
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
    'process.env.NODE_ENV': 'development"',
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