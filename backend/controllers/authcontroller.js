const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Auth = require("../models/authmodel")
const User = require("../models/usermodel")
const Company = require("../models/companymodel")

const createCompany = async (req, res) => {
    //use transaction
    const {companyname, companyemail, fullname, useremail, password} = req.body    
    
    if (!companyname || !companyemail || !fullname || !useremail || !password) {
        return res.status(401).json("Fill in the details") 
    }

    if (companyemail == useremail) {
        return res.status(401).json("Emails can't be the same.") 
    }

    const saveduseremail = await Auth.findOne({email: useremail})
    const savedcompanyemail = await Company.findOne({email: companyemail})
    
    if (saveduseremail) {
        return res.status(401).json("Admin Email exists") 
    } else if (savedcompanyemail) {
        return res.status(401).json("Company Email exists") 
    }

    const company = new Company({
        companyname,
        email: companyemail,
        logo: req.file ? req.file.path : '',
    })

    try {
        const newcompany = await company.save()

        const user = new User({
            fullname,
            companyid: newcompany._id,
            role: "admin",
            pfp: req.file ? req.file.path : '',
        })

        const newuser = await user.save()

        const auth = new Auth({
            userid: newuser._id, 
            email: useremail, 
            password
        })
        await auth.save()
        
        return res.status(201).json("Company created successfully")
    } catch (err) {
        console.error("Company registration failed:", err);
        return res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const signup = async (req, res) => {
    const user= req.user
    if (user.role != "admin") {
        return res.status(401).json("You can't add employees") 
    }

    const admin = await User.findById(user.id)

    const { fullname, age, email, password} = req.body    
    
    if ( !fullname || !email || !password) {
        return res.status(401).json("Fill in the details") 
    }

    const saveduseremail = await Auth.findOne({email})
    
    if (saveduseremail) {
        return res.status(401).json("Email exists") 
    }

    try {
        const user = new User({
            fullname,
            companyid: admin.companyid,
            age, 
            pfp: req.file ? req.file.path : '',
        })

        const newuser = await user.save()

        const auth = new Auth({
            userid: newuser._id, 
            email, 
            password
        })
        await auth.save()
        
        return res.status(201).json("Employee created successfully")
    } catch (err) {
        return res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        res.status(401).json("Fill in the details") 
    }

    const authuser = await Auth.findOne({email})

    if (!authuser) {
        return res.status(401).json("Invalid credentialss") 
    }

    const user = await User.findById(authuser.userid)
    if (!user) {
        return res.status(401).json("Invalid credentialssss") 
    }

    const validpassword = await authuser.comparePassword(password)

    if (!validpassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }    

    try {
        // const token = jwt.sign({ id: authuser.userid}, process.env.JWTT, {expiresIn: "1h"});
        const token = jwt.sign({ id: authuser.userid, role: user.role}, process.env.JWTT, {expiresIn: "1h"});

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            // secure: true,
            // sameSite: 'none',
            path: '/',
            maxAge: 60 * 60 * 1000,

            // expires: new Date(Date.now() + 60*60*1000),
        })

        return res.status(200).json({ message: "Signin Successful", token });
    } catch (err) {
        return res.status(401).json({message:"Error logging in", err: err.message})
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        path: "/"
    });

    res.status(200).json({
        message: "Logged out successfully"
    });
};


module.exports = { createCompany, signin, signup, logout }