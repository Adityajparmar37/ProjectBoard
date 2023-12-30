const jwt = require("jsonwebtoken");
const handler = require('express-async-handler');

const authMid = handler(async (req, res, next) => {
    const token = req.headers.access_token;

    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("AuthMiddleware backend ==> ", error);
        return res.status(401).send("Unauthorized");
    }
});

module.exports = authMid;
