# Deployment Options for Bunny Spaces

This project can be deployed to either **Netlify** (recommended) or **GitHub Pages**.

## 🚀 Netlify (Recommended)
- **Auto-deploys** from GitHub
- **Form handling** built-in
- **Custom domain** easy setup
- **SSL** automatic
- **No workflow files** needed

## 📄 GitHub Pages (Optional)
- Free static hosting
- Available at: `https://[username].github.io/bunnyspaces-website`
- Requires GitHub Actions workflow
- No form handling (would need external service)

## To disable GitHub Pages:
1. Delete `.github/workflows/deploy.yml`
2. Go to Settings → Pages → Source → None