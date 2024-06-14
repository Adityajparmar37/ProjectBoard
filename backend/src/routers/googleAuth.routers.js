const express = require("express");
const passport = require("passport");
const {
  generateToken,
} = require("../utils/generateToken");

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
      req.user.InsitutionName
    );

    // Send the response as JSON
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      InsitutionName: req.user.InsitutionName,
      token: token,
      success: true,
    });

    // res.redirect("http://localhost:5173/");
  }
);

router.get("/login/success", async (req, res) => {
  if (req.user) {
    console.log("user ==>", req.user);
    res.status(200).json({
      message: "user Login",
      user: req.user,
    });
  } else {
    res
      .status(400)
      .json({ message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

module.exports = router;
