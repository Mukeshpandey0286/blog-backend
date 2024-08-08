const jwt = require("jsonwebtoken");


const secretKey = process.env.JWT_SECRET;

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    // console.log(secretKey);
    

    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
      }

    const token = jwt.sign(payload, secretKey);
    return token;
}

const verifyToken = (token) => {
    if(!token) return null;
    
    try {
        return jwt.verify(token, secretKey);    
    } catch (error) {
        return null;
    }
}


module.exports = {createTokenForUser, verifyToken};