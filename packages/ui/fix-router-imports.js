#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function fixRouterImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Fix import statements
  if (content.includes('Switch') || content.includes('Redirect') || content.includes('withRouter')) {
    // Import replacements
    content = content.replace(
      /import\s+{\s*Switch\s*,?\s*Route\s*,?\s*Redirect\s*,?\s*Link\s*}\s+from\s+['"]react-router-dom['"];?/g,
      'import { Routes, Route, Navigate, Link } from \'react-router-dom\';'
    );
    
    content = content.replace(
      /import\s+{\s*Switch\s*,?\s*Route\s*,?\s*Link\s*}\s+from\s+['"]react-router-dom['"];?/g,
      'import { Routes, Route, Link } from \'react-router-dom\';'
    );
    
    content = content.replace(
      /import\s+{\s*Switch\s*}\s+from\s+['"]react-router-dom['"];?/g,
      'import { Routes } from \'react-router-dom\';'
    );
    
    content = content.replace(
      /import\s+{\s*Redirect\s*}\s+from\s+['"]react-router-dom['"];?/g,
      'import { Navigate } from \'react-router-dom\';'
    );
    
    content = content.replace(
      /import\s+{\s*withRouter\s*}\s+from\s+['"]react-router['"];?/g,
      ''
    );
    
    content = content.replace(
      /import\s+{\s*withRouter\s*}\s+from\s+['"]react-router-dom['"];?/g,
      ''
    );
    
    // Specific patterns
    content = content.replace(
      /import\s+withRouter\s+from\s+['"]react-router['"];?/g,
      ''
    );
    
    content = content.replace(
      /import\s+withRouter\s+from\s+['"]react-router-dom['"];?/g,
      ''
    );
    
    // JSX replacements
    content = content.replace(/<Switch>/g, '<Routes>');
    content = content.replace(/<\/Switch>/g, '</Routes>');
    content = content.replace(/<Redirect/g, '<Navigate');
    content = content.replace(/<\/Redirect>/g, '</Navigate>');
    
    // HOC replacements - remove withRouter from compose
    content = content.replace(/compose\([^)]*withRouter,?\s*/g, 'compose(');
    content = content.replace(/,\s*withRouter\)/g, ')');
    content = content.replace(/withRouter\([^)]*\)/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed router imports in ${filePath}`);
    changed = true;
  }
  
  return changed;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'build') {
      walkDir(filePath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      fixRouterImports(filePath);
    }
  }
}

walkDir('app');