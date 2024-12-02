const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
        // console.log("++++++++++++++++++++", file);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file,"<-----------------");
    
    const allowedFileTypes = /pdf|xlsx|xls|jpg|jpeg|png/;
    const allowedMimeTypes = [
        'application/pdf', // PDF
        'application/vnd.ms-excel', // Legacy Excel (.xls)
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Modern Excel (.xlsx)
        'image/jpeg', // JPEG images
        'image/png', // PNG images
      ];
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.includes(file.mimetype);


    if (extname && mimetype) {
        return cb(null, true);
    } else {
        const error = new Error('Invalid file type. Only PDF, Excel, and Images are allowed.');
        error.statusCode = 400;
        cb(error);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10 MB size limit
    fileFilter: fileFilter
}).single('file'); // Handle single file upload

module.exports = upload;
