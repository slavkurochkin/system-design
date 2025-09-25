# 🚀 Deployment Guide

This guide will help you deploy the System Design Learning Platform to GitHub Pages.

## Prerequisites

- GitHub repository (public or with GitHub Pages enabled)
- Node.js 20+ installed locally
- Git configured

## Step-by-Step Deployment

### 1. Repository Setup

1. **Create a new GitHub repository** (if not already created)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: System Design Learning Platform"
   git branch -M main
   git remote add origin https://github.com/[your-username]/system-design.git
   git push -u origin main
   ```

### 2. GitHub Pages Configuration

1. **Go to repository settings**:

   - Navigate to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section

2. **Configure Pages source**:
   - Source: "GitHub Actions"
   - This enables automatic deployment via the workflow

### 3. Enable GitHub Actions

1. **Check Actions tab**:

   - Go to "Actions" tab in your repository
   - The deployment workflow should appear after the first push

2. **Workflow permissions**:
   - The workflow automatically requests necessary permissions
   - No manual configuration needed

### 4. Deploy

1. **Push to main branch**:

   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Monitor deployment**:

   - Go to "Actions" tab to watch the deployment progress
   - Deployment typically takes 2-5 minutes

3. **Access your site**:
   - URL: `https://[your-username].github.io/system-design/`
   - GitHub will show the URL in the Pages settings once deployed

## Local Testing

Before deploying, test the production build locally:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Preview the build
npm run preview

# Open http://localhost:3000 to test
```

## Troubleshooting

### Common Issues

1. **404 Error on GitHub Pages**:

   - Ensure the base URL is set correctly in `vite.config.ts`
   - Check that `.nojekyll` file is present in the dist folder

2. **Assets not loading**:

   - Verify the base URL configuration
   - Check browser console for 404 errors

3. **Build fails**:
   - Ensure Node.js 20+ is installed
   - Run `npm ci` to install dependencies
   - Check for TypeScript errors with `npm run type-check`

### Debugging

1. **Check build output**:

   ```bash
   npm run build:gh-pages
   ls -la dist/
   ```

2. **Verify file structure**:

   - `dist/index.html` should exist
   - `dist/.nojekyll` should exist
   - `dist/assets/` should contain JS/CSS files

3. **Test locally**:
   ```bash
   npm run preview
   # Visit http://localhost:3000/system-design/
   ```

## Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `public/` directory:

   ```
   your-domain.com
   ```

2. Configure DNS records with your domain provider

3. Enable custom domain in GitHub Pages settings

## Environment Variables

For production-specific configurations:

1. Create `.env.production`:

   ```
   VITE_APP_TITLE=System Design Learning Platform
   VITE_APP_DESCRIPTION=Master system design concepts
   ```

2. Access in code:
   ```typescript
   const title = import.meta.env.VITE_APP_TITLE;
   ```

## Security

- Repository is public by default for GitHub Pages
- No sensitive data should be in the repository
- Use environment variables for any configuration secrets

## Performance

The deployment includes:

- ✅ Code splitting and lazy loading
- ✅ Asset optimization and minification
- ✅ Source maps for debugging
- ✅ Gzip compression (handled by GitHub Pages)

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify the build works locally
3. Ensure all prerequisites are met
4. Review the troubleshooting section above
