#!/bin/bash

# System Design Learning Platform - Deployment Script
# This script helps deploy the application to GitHub Pages

set -e

echo "🚀 System Design Learning Platform - Deployment Script"
echo "=================================================="

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled"
        exit 1
    fi
fi

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    echo "⚠️  Warning: You're not on main/master branch (current: $current_branch)"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled"
        exit 1
    fi
fi

echo "📦 Building application for GitHub Pages..."
npm run build:gh-pages

echo "✅ Build completed successfully"

echo "🔍 Verifying build output..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: dist/index.html not found"
    exit 1
fi

if [ ! -f "dist/.nojekyll" ]; then
    echo "❌ Error: dist/.nojekyll not found"
    exit 1
fi

echo "✅ Build verification passed"

echo "📝 Committing and pushing to GitHub..."
git add .
git commit -m "Deploy to GitHub Pages: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin $current_branch

echo "✅ Deployment initiated!"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://[your-username].github.io/system-design/"
echo ""
echo "📊 Monitor deployment progress:"
echo "   https://github.com/[your-username]/system-design/actions"
echo ""
echo "⏱️  Deployment typically takes 2-5 minutes"
