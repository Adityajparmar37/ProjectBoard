const express = require('express');
const errorHandler = require('../middlewares/errorMiddlewares');
const Student = require('../models/studentModal');
const router = express.Router();
const handler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const authMid = require('../middlewares/authMiddleware');


//login API
router.post("/login", handler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            next(errorHandler(401, "Plase fill all fields"));
        }

        const student = await Student.findOne({ email });

        if (!student) return next(errorHandler(404, 'User not found'));

        if (student && (await student.matchPassword(password))) {
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                InsitutionName: student.InsitutionName,
                token: generateToken(student._id, student.name, student.email, student.InsitutionName),
                success: true
            });
        } else {
            next(errorHandler(401, "Wrong Credentials"))
        }

    } catch (error) {
        next(error);
    }
}));


//signUp API
router.post("/signup", handler(async (req, res, next) => {
    try {
        const { name, email, InsitutionName, password, confirmPassword } = req.body;


        if (!name || !email || !password || !confirmPassword || !InsitutionName) {
            next(errorHandler(401, "Please fill the fields"))
        }

        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            next(errorHandler(400, "User Already exist"))
        }

        const student = await Student.create({
            name,
            email,
            password,
            InsitutionName
        });

        if (student) {
            res.status(201).json({
                _id: student._id,
                name: student.name,
                email: student.email,
                InsitutionName: student.InsitutionName,
                token: generateToken(student._id, student.name, student.email, student.InsitutionName),
                success: true
            });
        } else {
            next(errorHandler(400, "Something Went Wrong"));
        }
    } catch (error) {
        // console.error("SignUp error", error);
        next(error);
    }
}))


router.put("/profile/update", authMid, handler(async (req, res, next) => {
    try {
        const formData = req.body;
        console.log("Formdata ==> ", formData);
        const studentId = req.user.id

        const updatedProfile = await Student.findByIdAndUpdate(studentId, formData);

        if (!updatedProfile) {
            next(errorHandler(404, "Profile not found , please try again !"));
        }
        console.log(updatedProfile);
        res.json({
            updatedProfile,
            "update": true,
        });
    } catch (error) {
        next(error)
    }
}))



module.exports = router;
