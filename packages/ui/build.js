#!/usr/bin/env node
import { build } from 'bun';

const isDev = process.env.NODE_ENV !== 'production';

const result = await build({
  entrypoints: ['./app/app.js'],
  outdir: './build',
  target: 'browser',
  format: 'esm',
  splitting: true,
  minify: !isDev,
  sourcemap: isDev ? 'inline' : 'external',
  naming: {
    entry: isDev ? '[name].js' : '[name].[hash].js',
    chunk: isDev ? '[name].chunk.js' : '[name].[hash].chunk.js',
    asset: isDev ? '[name][ext]' : '[name].[hash][ext]',
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
    'process.env.NODE_ENV': isDev ? 'development"' : 'production"',
  },
  publicPath: '/assets/',
  root: '.',
  resolve: {
    alias: {
      'containers': './app/containers',
      'images': './app/images',
      'utils': './src/utils',
      'com': './src/com',
    },
  },
});

if (!result.success) {
  console.error('Build failed');
  process.exit(1);
}

console.log('Build completed successfully');