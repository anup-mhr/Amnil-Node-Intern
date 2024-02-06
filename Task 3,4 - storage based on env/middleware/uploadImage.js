const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dev-data/img');
    },
    filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // check if the file type is allowed
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file Type'));
    }
};

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: fileFilter
})

// const uploadMultiple = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
//     },
//     fileFilter: fileFilter
// }).array('image', 5); // Accept up to 5 images

// const uploadSingle = multer({
//     storage: storage,
//     fileFilter: fileFilter
//   }).single('coverImage'); 
  
module.exports = uploadImage