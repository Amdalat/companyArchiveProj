const path = require('path');
const multer = require('multer');

const pfpstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profiles')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const pfpupload = multer({ 
  storage: pfpstorage
});


const logostorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/logos')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const logoupload = multer({ 
    storage: logostorage
 });


module.exports = {pfpupload, logoupload}