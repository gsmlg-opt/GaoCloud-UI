#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function fixMuiImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix withStyles imports
  if (content.includes('import withStyles from \'@mui/styles\'')) {
    content = content.replace(
      /import withStyles from '@mui\/styles';/g,
      'import { withStyles } from \'@mui/styles\';'
    );
  }
  
  if (content.includes('import withStyles from \'@mui/styles/withStyles\'')) {
    content = content.replace(
      /import withStyles from '@mui\/styles\/withStyles';/g,
      'import { withStyles } from \'@mui/styles\';'
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed MUI imports in ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'build') {
      walkDir(filePath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      fixMuiImports(filePath);
    }
  }
}

walkDir('app');