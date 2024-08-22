// next.config.js
module.exports = {
  output: 'export',
  basePath: '',  // Adjust if needed
  assetPrefix: '',  // Adjust if needed
  async exportPathMap() {
    return {
      '/': { page: '/' },
      // Add other paths if necessary
    }
  },
}
