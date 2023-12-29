const jwt = require("jsonwebtoken");

const generateToken = (id, name, email, InsitutionName) => {
    return jwt.sign({ id, name, email, InsitutionName }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};


module.exports = generateToken;