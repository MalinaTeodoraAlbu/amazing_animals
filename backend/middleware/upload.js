
import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ){
            callback(null, true)
        }else{
            console.log('only jpg & png files supported!')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 2097152
    }
})

export default upload;