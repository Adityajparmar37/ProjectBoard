const express = require('express');
const errorHandler = require('../middlewares/errorMiddlewares');
const Student = require('../models/studentModal');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware');
const Friend = require('../models/friendModal');


//middleare for authorization
router.use(authMid);

///getting friend request from db
router.get("/request/allRequest", handler(async (req, res, next) => {
    try {
        const allRequests = await Friend.find({ receiver: req.user.id, isAccepted: false })
            .populate('sender', 'name email InsitutionName');


        if (allRequests.length > 0) {
            // console.log(allRequests)
            res.status(200).json(allRequests);
        } else {
            res.status(200).json({ message: "No requests found!" });
        }
    } catch (error) {
        next(error);
    }
}));


router.get("/request/accept/:requestId", handler(async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        console.log("requestId==>", requestId);

        // Update the friend request by setting isAccepted to true
        //_id is request Id genrate on creating req automatily by mongodb & store in db
        const updatedRequest = await Friend.updateOne(
            { _id: requestId, receiver: req.user.id, isAccepted: false },
            { $set: { isAccepted: true } }
        );

        if (updatedRequest.nModified > 0) {
            res.status(200).json({ message: "Friend request accepted successfully!" });
        } else {
            res.status(404).json({ message: "Friend request not found or already accepted!" });
        }
    } catch (error) {
        next(error);
    }
}));


//request deleting 
router.delete("/request/reject/:requestId", handler(async (req, res, next) => {
    try {
        const { requestId } = req.params;
        console.log("delete requestId ==>", requestId);

        await Friend.findByIdAndDelete(requestId); 

        res.status(200).json({ message: "Friend request rejected successfully!" });
    } catch (error) {
        next(error);
    }
}));


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
        next(error);
    }
}));



module.exports = router;