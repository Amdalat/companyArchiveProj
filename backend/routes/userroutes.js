const express = require("express");
const router = express.Router();

const {pfpupload} = require("../middlewares/multer")
const {verifytoken} = require("../middlewares/validate")
const { getuser, getusers, getcompanyusers, updateuser, deleteuser } = require("../controllers/usercontroller")

router.get("/", getusers)
router.get("/company", verifytoken, getcompanyusers)
router.get("/user", verifytoken, getuser)
// router.get("/user", getuser)
router.put("/user", verifytoken, pfpupload.single("pfp"), updateuser)
router.delete("/user", verifytoken, deleteuser)

module.exports = router