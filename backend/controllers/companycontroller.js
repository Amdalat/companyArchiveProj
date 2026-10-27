const Auth = require("../models/authmodel")
const Company = require("../models/companymodel")
const User = require("../models/usermodel")

const getcompany = async (req, res) => {
    // console.log(req.user.id)
    const user = await User.findById(req.user.id)
    try {
        const company = await Company.findById(user.companyid)
        res.status(200).json(company)
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const getcompanies = async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json({companycount: companies.length, companies})
    } catch (err) {
        res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const updatecompany = async(req, res) => {
    //function to change admin of company
    const admin = await User.findById(req.user.id)

    const {companyname, email} = req.body
    const companyexist = await Company.findOne({companyname})
    if(companyexist){
        return res.status(401).json({message:"Company name exists"})
    }

    if(email){
        return res.status(401).json({message:"You can't change email"})
    }
    
    const updateData = {
        ...req.body
    };

    if (req.file) {
        updateData.logo = req.file.path;
    }
 
    try {
        const company = await Company.findByIdAndUpdate(admin.companyid, updateData, {new:true})
        await company.save()
        return res.status(200).json("Company has been updated")
    } catch (err) {
        return res.status(401).json({message:"Error occurred while updating", err: err.message})
    }
}

const deletecompany = async (req, res) => {
    const admin = await User.findById(req.user.id)

    const company = await Company.findById(admin.companyid)
    const users = await User.find({companyid: admin.companyid})
    
    console.log(company, users)

    try {
        users.forEach(async(i) => {
            await User.findByIdAndDelete(i.id)
            await Auth.findOneAndDelete({userid: i.id})
        })
        await Company.findByIdAndDelete(admin.companyid)

        res.status(200).json("Company and associated users have been deleted")
    } catch (err) {
        res.status(401).json({message:"Error occurred while deleting", err: err.message})
    }
}


module.exports = { getcompany, getcompanies, updatecompany, deletecompany }