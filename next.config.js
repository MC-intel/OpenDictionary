// next.config.js
module.exports = {
  output: 'export',
  // You may need to adjust these if your GitHub Pages site requires a specific basePath or assetPrefix
  basePath: '',
  assetPrefix: '',
  // Optionally, configure export path map if needed
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      // Add other routes here if you have them
    };
  },
};
