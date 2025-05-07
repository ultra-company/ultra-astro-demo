// This script will run after the normal post-build process
// It creates direct HTML files for blog and solutions pages to fix Cloudflare Pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, '..', 'dist');

const fixRoutes = async () => {
  console.log('🔧 Fixing routes for Cloudflare Pages...');
  
  // Create /blog/index.html to fix the blog route
  const blogDir = path.join(BUILD_DIR, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    console.log('✅ Created blog directory');
  }
  
  // Copy blog.html to blog/index.html
  const blogSourcePath = path.join(BUILD_DIR, 'blog.html');
  const blogDestPath = path.join(blogDir, 'index.html');
  
  if (fs.existsSync(blogSourcePath)) {
    fs.copyFileSync(blogSourcePath, blogDestPath);
    console.log('✅ Created blog/index.html');
  } else {
    console.error('❌ blog.html not found!');
  }
  
  // Create /solutions/index.html to fix the solutions route
  const solutionsDir = path.join(BUILD_DIR, 'solutions');
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
    console.log('✅ Created solutions directory');
  }
  
  // Copy solutions.html to solutions/index.html
  const solutionsSourcePath = path.join(BUILD_DIR, 'solutions.html');
  const solutionsDestPath = path.join(solutionsDir, 'index.html');
  
  if (fs.existsSync(solutionsSourcePath)) {
    fs.copyFileSync(solutionsSourcePath, solutionsDestPath);
    console.log('✅ Created solutions/index.html');
  } else {
    console.error('❌ solutions.html not found!');
  }
  
  console.log('🎉 Route fixing complete!');
};

fixRoutes().catch(err => {
  console.error('❌ Error fixing routes:', err);
  process.exit(1);
});