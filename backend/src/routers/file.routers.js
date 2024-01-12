const express = require('express');
const router = express.Router();
const { putObject, getObjectURl } = require('../utils/aws.js');
const Files = require('../models/filesModal');
const authMid = require('../middlewares/authMiddleware');
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const path = require('path');
const errorHandler = require('../middlewares/errorMiddlewares.js');

router.use(authMid);

router.post("/uploadFile", upload.array("files"), async (req, res, next) => {
    try {
        const projectname = req.body.projectName;

        const promises = req.files.map(async (file) => {
            const contentType = file.mimetype;
            const filename = `${file.originalname}`;
            const fileUrl = await putObject(projectname, filename, contentType, fs.createReadStream(file.path));

            return fileUrl;
        });

        const fileUrls = await Promise.all(promises);

        const projectName = req.body.projectName;
        const fileNames = req.files.map(file => file.filename);

        // Store file information in the database
        const filesData = {
            projectName: projectName,
            files: fileUrls.map((url, index) => ({
                fileName: fileNames[index],
                fileUrl: url,
            })),
        };

        await Files.create(filesData);

        // Delete files from server
        req.files.forEach(file => {
            const filePath = path.join("../backend/public/file", file.filename);
            fs.unlinkSync(filePath);
        });

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: fileUrls,
        });
    } catch (error) {
        // Delete files from server
        req.files.forEach(file => {
            const filePath = path.join("../backend/public/file", file.filename);
            fs.unlinkSync(filePath);
        });

        next(errorHandler(500, "Please try againg"));
    }
});

module.exports = router;
