const express = require('express');
const errorHandler = require('../middlewares/errorMiddlewares');
const Student = require('../models/studentModal');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware');
const Friend = require('../models/friendModal');


//middleare for authorization
router.use(authMid);

router.get("/find", handler(async (req, res, next) => {
    try {
        const { ...filters } = req.query;
        const { keywordSearch } = filters;

        let findStudent = await Student.find({});

        if (keywordSearch) {
            const keywordSearchRegex = new RegExp(keywordSearch, 'i');
            findStudent = findStudent.filter((student) => (
                (student.name && student.name.match(keywordSearchRegex)) ||
                (student.InsitutionName && student.InsitutionName.match(keywordSearchRegex)) ||
                (student.email && student.email.match(keywordSearchRegex))
            ));
        }

        // // Exclude the logged-in user
        findStudent = findStudent.filter((student) => student._id.toString() !== req.user.id);

        console.log("User loggedIn ==> ", req.user.id);

        if (findStudent.length > 0) {
            res.status(201).json(findStudent);
        } else {
            next(errorHandler(404, "No other students found!"));
        }
    } catch (error) {
        next(error);
    }
}));


router.get("/request/:friendId", handler(async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const senderRequestExist = await Friend.findOne({ sender: req.user.id, receiver: friendId });
        const receiverRequestExist = await Friend.findOne({ sender: friendId, receiver: req.user.id });

        if (senderRequestExist || receiverRequestExist) {
            res.status(200).json({ success: false, message: "Request is pending" });
        } else {
            const data = new Friend({
                sender: req.user.id,
                receiver: friendId
            });

            await data.save();

            res.status(201).json({ success: true, message: "Request sent successfully" });
        }
    } catch (error) {
        console.error("Error handling friend request:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}));

module.exports = router;