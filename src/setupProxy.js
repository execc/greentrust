const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://icore.weintegrator.com/easychain',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );
};