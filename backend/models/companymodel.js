const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyname:{type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    logo: {type:String},
}, {timestamps: true});

const Company = mongoose.model('Company', companySchema)
module.exports = Company