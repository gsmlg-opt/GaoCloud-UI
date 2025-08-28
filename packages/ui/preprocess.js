#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function preprocessFile(filePath, rootDir) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Calculate relative path from file to root
  const relativeToRoot = path.relative(path.dirname(filePath), rootDir);
  const prefix = relativeToRoot === '' ? './' : relativeToRoot + '/';
  
  // Ensure prefix ends with slash
  const normalizedPrefix = prefix.endsWith('/') ? prefix : prefix + '/';
  
  // Fix imports - comprehensive pattern matching
  const patterns = [
    // Remove file-loader imports
    { from: /import '!file-loader[^']*'[^;]*;/g, to: '' },
    { from: /import\s+[']!file-loader[^']*[']\s*;/g, to: '' },
    
    // Handle absolute imports with quotes
    { from: /from [']containers\/([^']*)[']/g, to: `from '${normalizedPrefix}app/containers/$1'` },
    { from: /from [']images\/([^']*)[']/g, to: `from '${normalizedPrefix}app/images/$1'` },
    { from: /from [']ducks\/([^']*)[']/g, to: `from '${normalizedPrefix}app/ducks/$1'` },
    { from: /from [']utils\/([^']*)[']/g, to: `from '${normalizedPrefix}src/utils/$1'` },
    { from: /from [']configureStore[']/g, to: `from '${normalizedPrefix}app/configureStore'` },
    { from: /from [']store[']/g, to: `from '${normalizedPrefix}app/store'` },
    { from: /from [']i18n[']/g, to: `from '${normalizedPrefix}app/i18n'` },
    { from: /from [']appReducers[']/g, to: `from '${normalizedPrefix}app/appReducers'` },
    { from: /from [']persistentSubState[']/g, to: `from '${normalizedPrefix}app/persistentSubState'` },
    { from: /from [']global-styles([^']*)[']/g, to: `from '${normalizedPrefix}app/global-styles$1'` },
    { from: /from [']theme([^']*)[']/g, to: `from '${normalizedPrefix}app/theme$1'` },
    
    // Handle import statements with quotes
    { from: /import\s+([^']*)\s+from\s+[']containers\/([^']*)[']/g, to: `import $1 from '${normalizedPrefix}app/containers/$2'` },
    { from: /import\s+([^']*)\s+from\s+[']images\/([^']*)[']/g, to: `import $1 from '${normalizedPrefix}app/images/$2'` },
    { from: /import\s+([^']*)\s+from\s+[']ducks\/([^']*)[']/g, to: `import $1 from '${normalizedPrefix}app/ducks/$2'` },
    { from: /import\s+([^']*)\s+from\s+[']utils\/([^']*)[']/g, to: `import $1 from '${normalizedPrefix}src/utils/$2'` },
    { from: /import\s+([^']*)\s+from\s+[']configureStore[']/g, to: `import $1 from '${normalizedPrefix}app/configureStore'` },
    { from: /import\s+([^']*)\s+from\s+[']store[']/g, to: `import $1 from '${normalizedPrefix}app/store'` },
    { from: /import\s+([^']*)\s+from\s+[']i18n[']/g, to: `import $1 from '${normalizedPrefix}app/i18n'` },
    { from: /import\s+([^']*)\s+from\s+[']appReducers[']/g, to: `import $1 from '${normalizedPrefix}app/appReducers'` },
    { from: /import\s+([^']*)\s+from\s+[']persistentSubState[']/g, to: `import $1 from '${normalizedPrefix}app/persistentSubState'` },
    { from: /import\s+([^']*)\s+from\s+[']global-styles([^']*)[']/g, to: `import $1 from '${normalizedPrefix}app/global-styles$2'` },
    { from: /import\s+([^']*)\s+from\s+[']theme([^']*)[']/g, to: `import $1 from '${normalizedPrefix}app/theme$2'` },
    
    // Handle require statements
    { from: /require\([']containers\/([^']*)[']\)/g, to: `require('${normalizedPrefix}app/containers/$1')` },
    { from: /require\([']images\/([^']*)[']\)/g, to: `require('${normalizedPrefix}app/images/$1')` },
    { from: /require\([']ducks\/([^']*)[']\)/g, to: `require('${normalizedPrefix}app/ducks/$1')` },
    { from: /require\([']utils\/([^']*)[']\)/g, to: `require('${normalizedPrefix}src/utils/$1')` },
  ];

  // Apply all patterns
  for (const { from, to } of patterns) {
    content = content.replace(from, to);
  }

  // Ensure .js extension for ESM - more targeted approach
  content = content.replace(/from\s+[']([^']*?)['](?![\w\s]*\.js[']|\.jsx['])/g, (match, importPath) => {
    // Skip if already has extension or is not a relative path
    if (importPath.includes('.') && !importPath.endsWith('/')) {
      return match;
    }
    
    // Skip absolute paths (starting with http, /, or package names)
    if (importPath.startsWith('http') || importPath.startsWith('/') || 
        !importPath.startsWith('.') && !importPath.includes('/')) {
      return match;
    }
    
    // Add .js extension for relative imports without extensions
    if (importPath.startsWith('./') || importPath.startsWith('../') || 
        importPath.includes('/')) {
      return match.replace(importPath, importPath + '.js');
    }
    
    return match;
  });

  // Handle dynamic imports
  content = content.replace(/import\([']([^']*)[']\)/g, (match, importPath) => {
    if (importPath.startsWith('containers/')) {
      return `import('${normalizedPrefix}app/${importPath}')`;
    }
    if (importPath.startsWith('images/')) {
      return `import('${normalizedPrefix}app/${importPath}')`;
    }
    if (importPath.startsWith('ducks/')) {
      return `import('${normalizedPrefix}app/${importPath}')`;
    }
    if (importPath.startsWith('utils/')) {
      return `import('${normalizedPrefix}src/${importPath}')`;
    }
    return match;
  });
  
  return content;
}

function processDirectory(srcDir, destDir, rootDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      processDirectory(srcPath, destPath, rootDir);
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      const processed = preprocessFile(srcPath, rootDir);
      fs.writeFileSync(destPath, processed);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const srcDir = './app';
const destDir = './app-build';
const rootDir = '.';

if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true });
}

processDirectory(srcDir, destDir, rootDir);
console.log('Preprocessing complete');