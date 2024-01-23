const jwt = require("jsonwebtoken");

const generateToken = (id, name, email, InsitutionName) => {
    return jwt.sign({ id, name, email, InsitutionName }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const forgotPasswordToken = (oldStudent) => {
    const secret = process.env.JWT_SECRET + oldStudent.password;
    const token = jwt.sign({ email: oldStudent.email, id: oldStudent._id }, secret, {
        expiresIn: "5m",
    });
    return token;
}


const verifyToken = (oldStudent, token) => {
    const secret = process.env.JWT_SECRET + oldStudent.password;
    const verify = jwt.verify(token, secret);

    return verify;

}

module.exports = { generateToken, forgotPasswordToken, verifyToken };
