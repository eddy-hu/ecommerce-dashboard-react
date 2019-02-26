const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/manage', { 
        target: 'http://admintest.happymmall.com',
        changeOrigin: true,
    }));
    app.use(proxy('/user', { 
        target: 'http://admintest.happymmall.com',
        changeOrigin: true,
    }));

};

