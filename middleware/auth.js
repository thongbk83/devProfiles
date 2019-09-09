const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    //get token from header
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(400).json({ msg: "no token, authenticate denied" });
    }

    //verify token
    try {
        //decode token
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "server error" });
    }
};
