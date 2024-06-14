const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); // Make sure to import jsonwebtoken
const errorHandler = require("../middlewares/errorMiddlewares");
const {
  generateToken,
} = require("../utils/generateToken");
const Student = require("../models/studentModal");
dotenv.config();

const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "http://localhost:5173/login",
  }),
  (req, res) => {
    // Generate token for the authenticated user
    const token = generateToken(
      req.user._id,
      req.user.name,
      req.user.email,
      req.user.InstitutionName
    );

    // Redirect to the frontend with the token as a URL parameter
    res.redirect(
      `http://localhost:5173/auth/google/success/${token}`
    );
  }
);

// Route to handle successful login
router.post(
  "/google/login/success",
  async (req, res, next) => {
    const token = req.body.token;
    console.log("Token received:", token);

    try {
      // Decode the token to get user info
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      console.log("Decoded Token:", decodedToken);

      const student = await Student.findById({ _id: decodedToken.id });

      console.log(student);

      res.status(200).json({
        _id: student.id,
        name: student.name,
        email: student.email,
        InsitutionName: student.InsitutionName,
        token: token,
        success: true,
      });

    } catch (error) {
      console.error(
        "Token verification failed:",
        error
      );
      next(
        new Error("Token verification failed!")
      );
    }
  }
);

// Route to handle login failure
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

module.exports = router;
