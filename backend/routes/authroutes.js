const express = require("express")
const router = express.Router()

const {pfpupload, logoupload} = require('../middlewares/multer');

const { createCompany, signin, signup, logout } = require("../controllers/authcontroller");
const {verifytoken, verifyadmin} = require("../middlewares/validate");

router.post("/create", pfpupload.single("pfp"), logoupload.single("logo"), createCompany)
router.post("/signup", verifytoken, verifyadmin, pfpupload.single("pfp"), signup)
router.post("/signin", signin)
router.post("/logout", logout)


module.exports = router