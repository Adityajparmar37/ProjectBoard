const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("../backend/public/file"));
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now();
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


module.exports = upload;