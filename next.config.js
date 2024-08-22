
// next.config.js
module.exports = {
  // Ensure the base path is correct for GitHub Pages if needed
  basePath: '',
  assetPrefix: '',

  // Configure to export static HTML files
  async exportPathMap() {
    return {
      '/': { page: '/' },
      // Add other pages here if needed
    }
  },
}
