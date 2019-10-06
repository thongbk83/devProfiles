const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    const hostServer = "http://localhost:5000";
    app.use(proxy("/api/*", { target: hostServer }));
};
