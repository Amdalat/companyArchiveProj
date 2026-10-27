const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{type: String, required: true},
    companyid:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
    pfp: {type:String},
    age: {type:String},
    role: {type:String, default:"staff", enum:["admin", "staff"]},
}, {timestamps: true});

const User = mongoose.model('User', userSchema)
module.exports = User