#!/usr/bin/env node
import { build } from 'bun';
import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

// Create a temporary directory for processed files
const tempDir = './app-temp';
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Copy and process app directory
function copyAndProcessDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyAndProcessDir(srcPath, destPath);
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Fix import paths - handle different relative path depths
      const depth = destPath.split('/').length - tempDir.split('/').length;
      const relativePath = depth === 0 ? './' : '../'.repeat(depth);
      
      content = content
        .replace(/import '!file-loader[^']*'[^;]*;/g, '')
        .replace(/from 'containers\//g, `from ${relativePath}containers/`)
        .replace(/from 'images\//g, `from ${relativePath}images/`)
        .replace(/from 'ducks\//g, `from ${relativePath}ducks/`)
        .replace(/from 'global-styles/g, `from ${relativePath}global-styles`)
        .replace(/from 'theme/g, `from ${relativePath}theme`)
        .replace(/from 'utils\//g, `from ${relativePath}../src/utils/`)
        .replace(/from 'configureStore/g, `from ${relativePath}configureStore`)
        .replace(/from 'store/g, `from ${relativePath}store`)
        .replace(/from 'i18n/g, `from ${relativePath}i18n`)
        .replace(/from 'appReducers/g, `from ${relativePath}appReducers`)
        .replace(/from 'persistentSubState/g, `from ${relativePath}persistentSubState`)
        .replace(/import\s+(.*?)\s+from\s+[']containers\//g, `import $1 from ${relativePath}containers/`)
        .replace(/import\s+(.*?)\s+from\s+[']ducks\//g, `import $1 from ${relativePath}ducks/`)
        .replace(/import\s+(.*?)\s+from\s+[']utils\//g, `import $1 from ${relativePath}../src/utils/`);
      
      fs.writeFileSync(destPath, content);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy app directory to temp location
copyAndProcessDir('./app', tempDir);

const tempAppPath = path.join(tempDir, 'app.js');

try {
  const result = await build({
    entrypoints: [tempAppPath],
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
    console.error('Build failed');
    process.exit(1);
  }

  // Rename the output file
  const files = fs.readdirSync('./build');
  const appFile = files.find(f => f.startsWith('app-temp'));
  if (appFile) {
    fs.renameSync(`./build/${appFile}`, './build/main.js');
  }

  console.log('Build completed successfully');

} finally {
  // Clean up temporary directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
}

// Copy HTML template
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