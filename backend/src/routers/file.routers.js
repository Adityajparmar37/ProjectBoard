const express = require('express');
const router = express.Router();
const multer = require('multer');
const Files = require('../models/filesModal');
const authMid = require('../middlewares/authMiddleware');
const path = require('path');

router.use(authMid);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("../backend/public/file"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/uploadFile", upload.array("files"), async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const projectName = req.body.projectName;
    const fileNames = req.files.map(file => file.filename);

    try {
        await Files.create({ projectName: projectName, files: fileNames });
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

module.exports = router;