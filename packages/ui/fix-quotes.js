#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function fixQuotesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix Menubar imports
  content = content.replace(/import Menubar from "\.\.\/\.\.\/components\/Menubar\/index\.js"'/g, 'import Menubar from "../../components/Menubar/index.js");
  
  // Fix parseCmd.js brackets
  content = content.replace(/const brackets = \['', ""\];/g, "const brackets = ['', ''];");
  
  // Fix any remaining malformed string literals
  content = content.replace(/"/g, '"');
  content = content.replace(/'/g, "'");
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'build') {
      walkDir(filePath);
    } else if (stat.isFile() && file.endsWith('.js')) {
      fixQuotesInFile(filePath);
    }
  }
}

walkDir('.');