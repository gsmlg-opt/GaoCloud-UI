#!/usr/bin/env node
import { build } from 'bun';
import fs from 'fs';
import path from 'path';

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
});

if (!result.success) {
  console.error('Build failed:', result.logs);
  process.exit(1);
}

console.log('Build completed successfully');

// Create HTML template
const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="minimum-scale=1,initial-scale=1,width=device-width,shrink-to-fit=no">
    <meta name="mobile-web-app-capable" content="yes">
    <title>GaoCloud</title>
    <link rel="icon" type="image/png" href="/assets/logo.svg">
  </head>
  <body>
    <noscript>If you're seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>, please <strong>enable JS</strong> to make this app work.</noscript>
    <div id="app"></div>
    <script type="module" src="/assets/main.js"></script>
  </body>
</html>`;

fs.writeFileSync('./build/index.html', htmlContent);