// next.config.js
module.exports = {
  output: 'export',
  basePath: '',  // Adjust this if you use a GitHub Pages subpath
  assetPrefix: '',  // Adjust this if you use a GitHub Pages subpath

  // Optionally configure exportPathMap if needed
  async exportPathMap() {
    return {
      '/': { page: '/' },
      // Add other pages if necessary
    }
  },
}
