#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * This script checks that all required files for Cloudflare Pages deployment
 * are present in your build directory before upload.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build directory is one level up from scripts folder, then into dist
const BUILD_DIR = path.join(__dirname, '..', 'dist');
const REQUIRED_FILES = [
  'index.html',
  '_headers',
  '_redirects',
  '_routes.json'
];

console.log('🔍 Checking build directory for Cloudflare Pages deployment...');

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found! Run npm run build first.');
  process.exit(1);
}

// Check for required files
let missingFiles = [];

for (const file of REQUIRED_FILES) {
  const filePath = path.join(BUILD_DIR, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error(`❌ Missing required files: ${missingFiles.join(', ')}`);
  console.log('These files are important for proper Cloudflare Pages configuration.');
  process.exit(1);
}

// Check for assets directory
if (!fs.existsSync(path.join(BUILD_DIR, '_astro'))) {
  console.warn('⚠️ No _astro directory found. Assets might not be built correctly.');
}

// Count HTML files to ensure all pages are built
let htmlCount = 0;
function countHtmlFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    if (file.isDirectory()) {
      countHtmlFiles(fullPath);
    } else if (file.name.endsWith('.html')) {
      htmlCount++;
    }
  }
}

countHtmlFiles(BUILD_DIR);
console.log(`📄 Found ${htmlCount} HTML files in the build directory.`);

// Success message
console.log('✅ Build directory looks good for Cloudflare Pages deployment.');
console.log('📦 You can now upload the contents of the dist directory to Cloudflare Pages.');