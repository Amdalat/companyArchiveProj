const express = require("express");
const router = express.Router();

const {logoupload} = require("../middlewares/multer")
const {verifytoken, verifyadmin} = require("../middlewares/validate")
const { getcompany, getcompanies, updatecompany, deletecompany } = require("../controllers/companycontroller")

router.get("/", getcompanies)
router.get("/company", verifytoken, getcompany)
router.put("/company", verifytoken, verifyadmin, logoupload.single("logo"), updatecompany)
router.delete("/company", verifytoken, verifyadmin, deletecompany)

module.exports = router