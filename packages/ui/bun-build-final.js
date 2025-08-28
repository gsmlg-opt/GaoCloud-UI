#!/usr/bin/env node
import { build } from 'bun';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const isDev = process.env.NODE_ENV !== 'production';

// Build with bun
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
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
  },
  publicPath: '/assets/',
  alias: {
    'containers': './app/containers',
    'images': './app/images',
    'ducks': './app/ducks',
    'utils': './src/utils/index.js',
    'components': './app/components',
    'hooks': './app/hooks',
    'global-styles': './app/global-styles.js',
    'theme': './app/theme.js',
    'configureStore': './app/configureStore.js',
    'store': './app/store.js',
    'i18n': './app/i18n.js',
    'appReducers': './app/appReducers.js',
    'persistentSubState': './app/persistentSubState.js',
    'com': './src/com/index.js',
    'jss': './app/jss',
    'jss/dialog': './app/jss/dialog.js',
    'jss/page': './app/jss/page.js'
  },
});

if (!result.success) {
  console.error('Build failed:', result.logs);
  process.exit(1);
}

console.log('Build completed successfully');

// Rename the output file
const files = fs.readdirSync('./build');
const appFile = files.find(f => f.startsWith('app.') || f.startsWith('app-build.'));
if (appFile) {
  fs.renameSync(`./build/${appFile}`, './build/main.js');
}

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

