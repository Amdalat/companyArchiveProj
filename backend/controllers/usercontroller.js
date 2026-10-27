const Auth = require("../models/authmodel")
const Company = require("../models/companymodel")
const User = require("../models/usermodel")

const getuser = async (req, res) => {
    console.log(req.user.id)
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getusers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({Usercount: users.length, Users:users})
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getcompanyusers = async (req, res) => {
    const user = await User.findById(req.user.id)

    try {
        const users = await User.find({companyid: user.companyid})
        res.status(200).json({userCount: users.length, users})
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const updateuser = async(req, res) => {
    console.log(req.body)
    const { role, companyid} = req.body

    if(role || companyid ){
        return res.status(401).json({message:"You can't change these fields"})
    }

    const updateData = {
        ...req.body
    };

    if (req.file) {
        updateData.pfp = req.file.path;
    }
 
    try {
        const user = await User.findByIdAndUpdate(req.user.id, updateData, {new:true})
        await user.save()
        return res.status(200).json("User has been updated")
    } catch (err) {
        return res.status(401).json({message:"Error occurred while updating", err: err.message})
    }
}

const deleteuser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id)
        await Auth.findOneAndDelete({userid: req.user.id})

        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(401).json({message:"Error occurred while updating", err: err.message})
    }
}


module.exports = { getuser, getusers, getcompanyusers, updateuser, deleteuser }