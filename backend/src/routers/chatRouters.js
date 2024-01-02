const express = require('express');
const errorHandler = require('../middlewares/errorMiddlewares');
const Student = require('../models/studentModal');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware');


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


        if (findStudent) {
            res.status(201).json(findStudent);
        } else {
            next(errorHandler(404, "No such Student Found!"));
        }
    } catch (error) {
        next(error);
    }
}))


module.exports = router;