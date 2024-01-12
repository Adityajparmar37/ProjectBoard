const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary.js");
const Files = require('../models/filesModal');
const authMid = require('../middlewares/authMiddleware');
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const path = require('path');
const errorHandler = require('../middlewares/errorMiddlewares.js');

router.use(authMid);

router.post("/uploadFile", upload.array("files"), async (req, res, next) => {
    try {
        const promises = req.files.map(file =>
            new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.path,
                    {
                        resource_type: "raw"
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            next(errorHandler(400, "Error in file uploading , please try agian"))
                            reject(err);
                        } else {
                            resolve(result.secure_url);
                            console.log(result.secure_url);
                        }
                    }
                );
            })
        );

        const fileUrls = await Promise.all(promises);
        // console.log("fileUrls == > ", fileUrls);

        const projectName = req.body.projectName;
        const fileNames = req.files.map(file => file.filename);

        // Store file information in the database
        const filesData = {
            projectName: projectName,
            files: fileUrls.map((url, index) => ({
                fileName: fileNames[index],
                fileUrl: url
            }))
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
            data: fileUrls
        });
    } catch (error) {

        // Delete files from server
        req.files.forEach(file => {
            const filePath = path.join("../backend/public/file", file.filename);
            fs.unlinkSync(filePath);
        });
        // console.error(error);
        // res.status(500).json({
        //     success: false,
        //     message: "Error",
        //     error: error.message
        // });
        next(error);
    }
});

module.exports = router;
