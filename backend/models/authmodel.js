const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: {type: String, required: true, unique: true},
    password: { type: String, required: [true, "Password should be a string"], minlength: 3},
  }, { timestamps: true });

authSchema.methods.comparePassword = async function (userPassword) {
  const isPasswordCorrect = await bcrypt.compare(userPassword, this.password);
  return isPasswordCorrect;
};

authSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log(this.username);
    const date = new Date();
    console.log(date.getTime());
});

authSchema.post("save", async function () {
  console.log(this.email);
  const date = new Date();
  console.log(date.getTime());
});

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;