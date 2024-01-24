const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('../middlewares/errorMiddlewares');
const Student = require('../models/studentModal');
const router = express.Router();
const handler = require('express-async-handler');
const authMid = require('../middlewares/authMiddleware');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { generateToken, forgotPasswordToken, verifyToken } = require('../utils/generateToken');
dotenv.config();


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
        const studentId = req.user.id;
        console.log(formData);

        const existingProfile = await Student.findById(studentId);

        if (!existingProfile) {
            console.log(error)
            return next(errorHandler(404, "Profile not found, please try again!"));
        }

        if (formData.password) {
            console.log(formData.password)
            const salt = await bcrypt.genSalt(10);
            formData.password = await bcrypt.hash(formData.password, salt);
        }

        const updatedProfile = await Student.findByIdAndUpdate(studentId, formData, { new: true });

        console.log(updatedProfile);
        res.json({
            updatedProfile,
            "update": true,
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}));


router.post("/forgotPassword", handler(async (req, res, next) => {
    try {

        const { email } = req.body;
        console.log(email);
        const oldStudent = await Student.findOne({ email });

        if (!oldStudent) {
            next(errorHandler(404, "User not exit , please create your new account !"));
        }

        else if (oldStudent) {


            const tokenReturn = forgotPasswordToken(oldStudent)
            const link = `http://localhost:5173/api/student/newPassword/${oldStudent._id}/${tokenReturn}`;
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.MAILPASS,
                },
            });

            var mailOptions = {
                from: process.env.EMAIL,
                to: "adiparmar107@gmail.com",
                subject: "Password Reset Link",
                text: `${link}\n\n**Note: The link will be active only for 5 minutes**.`,
            };

            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
            });

            // console.log("link ==> ", link);

            res.status(201).json({
                msg: "You should receive an email"
            });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}));



//for verification
router.get("/resetPassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    // console.log(req.params);
    const oldStudent = await Student.findById(id);
    if (!oldStudent) {
        next(errorHandler(404, "User not found !"))
    }

    try {
        console.log("Found student: ", oldStudent);
        const verify = verifyToken(oldStudent, token);
        console.log("VerifyToken result: ", verify);

        if (verify.id === id) {
            res.status(201).json({
                email: verify.email,
                status: "Verified"
            });
        } else {
            res.status(201).json({
                status: "Can not Verify"
            });
        }

    } catch (error) {
        // console.log(error);
        res.status(201).json({
            status: "Not Verified"
        });
    }
});


router.post("/newPassword/:id/:token", handler(async (req, res, next) => {
    const { id, token } = req.params;

    const { password } = req.body;

    console.log(password, " ", id, " ", token);

    try {
        const oldStudent = await Student.findById(id);

        console.log("Found student: ", oldStudent);
        const verify = verifyToken(oldStudent, token);
        console.log("VerifyToken result: ", verify);

        if (oldStudent) {

            if (verify.id === id) {
                const salt = await bcrypt.genSalt(10);
                const newpassword = await bcrypt.hash(password, salt);

                const setNewPass = await Student.findByIdAndUpdate({ _id: id }, { password: newpassword });

                await setNewPass.save();
                res.status(201).json({ "change": true })
            } else {
                res.status(201).json({ "change": false })
            }

        } else {
            next(errorHandler(404, "User not found !"));
        }
    } catch (error) {
        console.log("Changing new reset password ", error);
        next(error)
    }
}));





module.exports = router;
