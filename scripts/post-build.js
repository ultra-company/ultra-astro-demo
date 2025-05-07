#!/usr/bin/env node

/**
 * Post-build script to copy Cloudflare Pages configuration files to the build directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BUILD_DIR = path.join(__dirname, '..', 'dist');

// Cloudflare Pages config files
const CONFIG_FILES = [
  '_headers',
  '_redirects',
  '_routes.json',
  '_worker.js'
];

console.log('📝 Copying Cloudflare Pages configuration files to build directory...');

// Make sure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found!');
  process.exit(1);
}

// Copy each configuration file from public to dist
let filesCopied = 0;

for (const file of CONFIG_FILES) {
  const sourcePath = path.join(PUBLIC_DIR, file);
  const destPath = path.join(BUILD_DIR, file);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file} to build directory`);
      filesCopied++;
    } else {
      console.warn(`⚠️ Configuration file ${file} not found in public directory`);
    }
  } catch (error) {
    console.error(`❌ Failed to copy ${file}: ${error.message}`);
  }
}

// Copy functions directory if it exists
const FUNCTIONS_DIR = path.join(PUBLIC_DIR, 'functions');
const DEST_FUNCTIONS_DIR = path.join(BUILD_DIR, 'functions');

if (fs.existsSync(FUNCTIONS_DIR)) {
  try {
    // Create functions directory if it doesn't exist
    if (!fs.existsSync(DEST_FUNCTIONS_DIR)) {
      fs.mkdirSync(DEST_FUNCTIONS_DIR, { recursive: true });
    }
    
    // Copy all files from functions directory
    const functionFiles = fs.readdirSync(FUNCTIONS_DIR);
    for (const file of functionFiles) {
      const sourcePath = path.join(FUNCTIONS_DIR, file);
      const destPath = path.join(DEST_FUNCTIONS_DIR, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied functions/${file} to build directory`);
      }
    }
    
    console.log('✅ Functions directory copied successfully');
  } catch (error) {
    console.error(`❌ Failed to copy functions directory: ${error.message}`);
  }
} else {
  console.warn('⚠️ Functions directory not found in public directory');
}

console.log(`📋 Copied ${filesCopied} of ${CONFIG_FILES.length} configuration files`);

if (filesCopied === CONFIG_FILES.length) {
  console.log('✅ All configuration files copied successfully!');
} else {
  console.warn('⚠️ Some configuration files could not be copied');
}