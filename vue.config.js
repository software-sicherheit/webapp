module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW'
  },
  devServer: {
    proxy: 'http://localhost:8080/'
  }
};
