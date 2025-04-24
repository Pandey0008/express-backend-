const multer = require('multer');
const storage = multer.memoryStorage();
const path = require('path');

const fileFilter = (req, file, cb) => {
    const extnames = ['.jpg','.jpeg','.png','.wepg','.svg'];
    let ext = path.extname(file.originalname);
    let include = extnames.includes(ext);
    if(include){
        cb(null, true);
    }else{
         cb(new Error('Only .jpg, .jpeg, .png, .wepg and .svg files are allowed!'), false);
    }
}

const upload = multer({ storage:storage , fileFilter:fileFilter });

module.exports = upload;