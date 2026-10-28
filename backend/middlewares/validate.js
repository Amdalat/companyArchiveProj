const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const verifytoken = async(req, res, next) => {
    const token = req.cookies?.access_token;    console.log(`token: ${token}`);

    if (!token) {
        return res.status(401).json({message: "Access denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTT);
        req.user = decoded;
        console.log(req.user);
        
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});   
    }
}

const verifyadmin = async(req, res, next) => {
    try {
        console.log(req.user);

        if (req.user.role != "admin") {
            return res.status(401).json({message: "Access denied. Not Admin."});
        }
        
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});   
    }
}


module.exports = {verifytoken, verifyadmin}