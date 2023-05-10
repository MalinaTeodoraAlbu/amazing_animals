const { storage } = require('debug/src/browser');
const multer = require('multer');
const path = require('path');

var Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: Storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true)
        }else{
            console.log('only jpg & png files supported!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 24500000
    }
})

module.exports = upload;