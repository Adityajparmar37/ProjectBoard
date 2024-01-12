const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary.js");
const Files = require('../models/filesModal');
const authMid = require('../middlewares/authMiddleware');
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const path = require('path');

router.use(authMid);

router.post("/uploadFile", upload.array("files"), async (req, res) => {
    try {
        const promises = req.files.map(file =>
            new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    file.path,
                    {
                        resource_type: "auto"
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
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

        const projectName = req.body.projectName;
        const fileNames = req.files.map(file => file.filename);

        // Store file information in the database
        const filesData = fileUrls.map((url, index) => ({
            projectName: projectName,
            fileName: fileNames[index],
            fileUrl: url
        }));

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
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message
        });
    }
});

module.exports = router;
