# Ultra Business - Accounting Automation Website

## Project Overview

This is an Astro project for Ultra Business, an accounting automation software solution for restaurants, commerce, hotels and fitness centers.

## Development Setup

### Prerequisites

- **Node.js**: Version 18.0.0 or higher required
- **npm**: Should be included with Node.js installation
- **Git**: For version control (optional)

### First-Time Setup

1. **Clone the repository** (if using Git):
   ```bash
   git clone [repository-url]
   cd ultra-astro-demo
   ```

   Or download and extract the project files.

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Local Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** at http://localhost:4321

3. **Development notes**:
   - Changes to files will automatically refresh the browser
   - The site uses Astro with React components
   - Blog posts are in Markdown format in `src/content/blog/`

## Building for Production

### Standard Build

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

The build output will be in the `dist` directory.

### Prepare for Deployment

To prepare files for Cloudflare Pages deployment (or any other CDN):

```bash
# Run complete build process with post-processing
npm run prepare-deploy
```

This command runs the following sequence:
1. `npm run build` - Builds the static site
2. `npm run post-build` - Copies Cloudflare configuration files
3. `npm run fix-routes` - Creates appropriate directory structure for routing
4. `npm run verify-deploy` - Checks if all required files are present

## Project Structure

- `src/`
  - `pages/` - Website pages (Astro routes)
  - `components/` - Reusable React and Astro components
  - `content/` - Blog posts and content collections
  - `layouts/` - Page layouts and templates
- `public/` - Static assets and Cloudflare configuration files
- `scripts/` - Build and deployment utilities
- `dist/` - Build output (generated)

## Configuration Files

- `_headers` - Controls security headers and caching
- `_redirects` - Manages URL redirects
- `_routes.json` - Cloudflare Pages routing configuration
- `astro.config.mjs` - Astro configuration
