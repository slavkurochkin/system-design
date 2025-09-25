# ✅ GitHub Pages Deployment Checklist

Use this checklist to deploy your System Design Learning Platform to GitHub Pages.

## Pre-Deployment Setup

- [ ] **GitHub Repository Created**

  - [ ] Repository is public (required for free GitHub Pages)
  - [ ] Repository name: `system-design` (or update base URL in `vite.config.ts`)

- [ ] **Local Environment Ready**
  - [ ] Node.js 20+ installed
  - [ ] Git configured with your GitHub credentials
  - [ ] All dependencies installed (`npm ci`)

## Configuration Files ✅ (Already Created)

- [x] **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- [x] **Vite Configuration** (Updated `vite.config.ts` with base URL)
- [x] **Package.json Scripts** (Added deployment scripts)
- [x] **No Jekyll File** (`public/.nojekyll`)
- [x] **Deployment Script** (`scripts/deploy.sh`)
- [x] **Git Ignore** (`.gitignore` with proper exclusions)

## GitHub Pages Setup

- [ ] **Enable GitHub Pages**

  1. Go to repository Settings
  2. Scroll to "Pages" section
  3. Set Source to "GitHub Actions"

- [ ] **Verify Workflow Permissions**
  - [ ] Repository has Actions enabled
  - [ ] Workflow can write to Pages (automatic)

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

- [ ] **Push to Main Branch**

  ```bash
  git add .
  git commit -m "Initial deployment setup"
  git push origin main
  ```

- [ ] **Monitor Deployment**
  - [ ] Check Actions tab for build progress
  - [ ] Wait for deployment to complete (2-5 minutes)
  - [ ] Verify site is accessible

### Option 2: Using Deployment Script

- [ ] **Run Deployment Script**
  ```bash
  npm run deploy:script
  ```
  - [ ] Follow prompts
  - [ ] Confirm deployment

### Option 3: Manual Deployment

- [ ] **Build Locally**

  ```bash
  npm run build:gh-pages
  ```

- [ ] **Test Build**

  ```bash
  npm run preview
  # Visit http://localhost:3000/system-design/
  ```

- [ ] **Commit and Push**
  ```bash
  git add .
  git commit -m "Deploy to GitHub Pages"
  git push origin main
  ```

## Post-Deployment Verification

- [ ] **Site Accessibility**

  - [ ] Visit: `https://[your-username].github.io/system-design/`
  - [ ] Site loads without errors
  - [ ] All assets (CSS, JS, images) load correctly
  - [ ] Navigation works properly
  - [ ] Responsive design works on mobile

- [ ] **Functionality Testing**

  - [ ] Sidebar navigation works
  - [ ] All sections load correctly
  - [ ] Interactive elements function
  - [ ] No console errors

- [ ] **Performance Check**
  - [ ] Page loads quickly
  - [ ] Assets are optimized
  - [ ] No 404 errors in network tab

## Troubleshooting

If deployment fails:

- [ ] **Check Build Logs**

  - [ ] Go to Actions tab
  - [ ] Review build step logs
  - [ ] Fix any TypeScript errors

- [ ] **Verify Configuration**

  - [ ] Base URL matches repository name
  - [ ] All files committed to repository
  - [ ] No syntax errors in config files

- [ ] **Local Testing**
  - [ ] Run `npm run build:gh-pages` locally
  - [ ] Check `dist/` folder contents
  - [ ] Test with `npm run preview`

## Custom Domain (Optional)

If using custom domain:

- [ ] **Add CNAME File**

  ```bash
  echo "your-domain.com" > public/CNAME
  ```

- [ ] **Configure DNS**
  - [ ] Point domain to GitHub Pages
  - [ ] Enable custom domain in Pages settings

## Security & Best Practices

- [ ] **Repository Security**

  - [ ] No sensitive data in repository
  - [ ] Use environment variables for secrets
  - [ ] Review public repository settings

- [ ] **Performance Optimization**
  - [ ] Enable GitHub Pages compression
  - [ ] Monitor bundle sizes
  - [ ] Use lazy loading where appropriate

## Success Indicators

✅ **Deployment Successful When:**

- GitHub Actions shows green checkmark
- Site is accessible at GitHub Pages URL
- All functionality works as expected
- No console errors
- Fast loading times

## Support

If you encounter issues:

1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review GitHub Actions logs
3. Test build locally first
4. Verify all prerequisites are met

---

**Deployment URL Format**: `https://[your-username].github.io/system-design/`

**Example**: If your username is `johndoe`, your site will be at:
`https://johndoe.github.io/system-design/`
