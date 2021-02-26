const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:8001/' });

module.exports = function(app) {
    app.use(apiProxy);
};