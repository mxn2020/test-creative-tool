#!/bin/bash
cd /Users/mehdinabhani/Dropbox/git/ai-coder/geenius-template-vite-react-mongo

# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/mxn2020/geenius-template-vite-react-mongo.git

# Stage all files
git add .

# Commit with message
git commit -m "Initial commit: Geenius Template - Vite + React + MongoDB

Features:
- ⚡ Vite for fast development with HMR
- ⚛️ React 18 with modern hooks
- 🗄️ MongoDB with Prisma ORM
- 🎨 Tailwind CSS with custom animations
- 📦 TypeScript with strict configuration
- 🔧 ESLint and development tools
- 🚀 Beautiful responsive landing page
- 📋 Comprehensive documentation and setup

Tech Stack:
- Vite + React + TypeScript
- MongoDB + Prisma
- Tailwind CSS + Lucide Icons
- ESLint + PostCSS + Autoprefixer

🤖 Generated with Geenius AI Development Agent

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push -u origin main

echo "Repository setup complete!"
echo "Template available at: https://github.com/mxn2020/geenius-template-vite-react-mongo"