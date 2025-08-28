#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function fixFileImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix webpack-style absolute imports - handle existing extensions
  // Calculate relative paths based on the file location
  const fileDir = path.dirname(filePath);
  const appDir = './app';
  const srcDir = './src';
  
  const replacements = [
    { from: /from\s+[']containers\/([^']*?)\.js[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'containers', p1))}.js'` },
    { from: /from\s+[']containers\/([^']*?)(?!\.js)[']/g, to: (match, p1) => {
        const indexPath = path.join(appDir, 'containers', p1, 'index.js');
        const filePath = path.join(appDir, 'containers', `${p1}.js`);
        if (fs.existsSync(indexPath)) {
          return `from '${path.relative(fileDir, indexPath)}'`;
        } else {
          return `from '${path.relative(fileDir, filePath)}'`;
        }
      } 
    },
    { from: /from\s+[']images\/([^']*?\.(?:png|jpg|jpeg|gif|svg))[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'images', p1))}'` },
    { from: /from\s+[']images\/([^']*?)(?!\.js|\.jsx|\.json|\.png|\.jpg|\.jpeg|\.gif|\.svg)[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'images', p1))}.js'` },
    { from: /from\s+[']ducks\/([^']*?)\.js[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'ducks', p1))}'` },
    { from: /from\s+[']ducks\/([^']*?)(?!\.js)[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'ducks', p1))}.js'` },
    { from: /from\s+[']utils\/([^']*?)\.js[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(srcDir, 'utils', p1))}.js'` },
    { from: /from\s+[']utils\/([^']*?)(?!\.js)[']/g, to: (match, p1) => {
        const indexPath = path.join(srcDir, 'utils', p1, 'index.js');
        const filePath = path.join(srcDir, 'utils', `${p1}.js`);
        if (fs.existsSync(indexPath)) {
          return `from '${path.relative(fileDir, indexPath)}'`;
        } else {
          return `from '${path.relative(fileDir, filePath)}'`;
        }
      }
    },
    { from: /from\s+[']components\/([^']*?)\.js[']/g, to: (match, p1) => {
        const indexPath = path.join(appDir, 'components', p1, 'index.js');
        const filePath = path.join(appDir, 'components', `${p1}.js`);
        if (fs.existsSync(indexPath)) {
          return `from '${path.relative(fileDir, indexPath)}'`;
        } else {
          return `from '${path.relative(fileDir, filePath)}'`;
        }
      }
    },
    { from: /from\s+[']components\/([^']*?)(?!\.js)[']/g, to: (match, p1) => {
        const indexPath = path.join(appDir, 'components', p1, 'index.js');
        const filePath = path.join(appDir, 'components', `${p1}.js`);
        if (fs.existsSync(indexPath)) {
          return `from '${path.relative(fileDir, indexPath)}'`;
        } else {
          return `from '${path.relative(fileDir, filePath)}'`;
        }
      }
    },
    { from: /from\s+[']global-styles[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'global-styles.js'))}'` },
    { from: /from\s+[']theme[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'theme.js'))}'` },
    { from: /from\s+[']configureStore[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'configureStore.js'))}'` },
    { from: /from\s+[']store[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'store.js'))}'` },
    { from: /from\s+[']i18n[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'i18n.js'))}'` },
    { from: /from\s+[']appReducers[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'appReducers.js'))}'` },
    { from: /from\s+[']persistentSubState[']/g, to: `from '${path.relative(fileDir, path.join(appDir, 'persistentSubState.js'))}'` },
    { from: /from\s+[']com[']/g, to: `from '${path.relative(fileDir, path.join(srcDir, 'com', 'index.js'))}'` },
    { from: /from\s+[']utils[']/g, to: `from '${path.relative(fileDir, path.join(srcDir, 'utils', 'index.js'))}'` },
    { from: /from\s+[']jss\/([^']*?)\.js[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'jss', `${p1}.js`))}'` },
    { from: /from\s+[']jss\/([^']*?)(?!\.js)[']/g, to: (match, p1) => `from '${path.relative(fileDir, path.join(appDir, 'jss', `${p1}.js`))}'` }
  ];
  
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  
  // Handle dynamic imports
  content = content.replace(/import\([']([^']*?)[']\)/g, (match, importPath) => {
    const fileDir = path.dirname(filePath);
    
    if (importPath.startsWith('containers/')) {
      const p1 = importPath.replace('containers/', '');
      const indexPath = path.join(appDir, 'containers', p1, 'index.js');
      const filePath = path.join(appDir, 'containers', `${p1}.js`);
      if (fs.existsSync(indexPath)) {
        return `import('${path.relative(fileDir, indexPath)}')`;
      } else {
        return `import('${path.relative(fileDir, filePath)}')`;
      }
    }
    if (importPath.startsWith('ducks/')) {
      const p1 = importPath.replace('ducks/', '');
      const filePath = path.join(appDir, 'ducks', `${p1}.js`);
      return `import('${path.relative(fileDir, filePath)}')`;
    }
    if (importPath.startsWith('utils/')) {
      const p1 = importPath.replace('utils/', '');
      const filePath = path.join(srcDir, 'utils', `${p1}.js`);
      return `import('${path.relative(fileDir, filePath)}')`;
    }
    if (importPath.startsWith('components/')) {
      const p1 = importPath.replace('components/', '');
      const indexPath = path.join(appDir, 'components', p1, 'index.js');
      const filePath = path.join(appDir, 'components', `${p1}.js`);
      if (fs.existsSync(indexPath)) {
        return `import('${path.relative(fileDir, indexPath)}')`;
      } else {
        return `import('${path.relative(fileDir, filePath)}')`;
      }
    }
    if (importPath === 'com') {
      return `import('${path.relative(fileDir, path.join(srcDir, 'com', 'index.js'))}')`;
    }
    if (importPath === 'utils') {
      return `import('${path.relative(fileDir, path.join(srcDir, 'utils', 'index.js'))}')`;
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content);
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      fixFileImports(fullPath);
    }
  }
}

// Process the app directory
processDirectory('./app');
console.log('Import fixes applied');