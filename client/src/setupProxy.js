const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    if (process.env.NODE_ENV !== "production") {
        app.use(proxy("/api/*", { target: "http://localhost:5000" }));
    } else {
        app.use(
            proxy("/api/*", {
                target: "https://thong-dev-profiles.herokuapp.com"
            })
        );
    }
};
