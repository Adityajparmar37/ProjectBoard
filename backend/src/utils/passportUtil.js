const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const OAuth2Strategy =
  require("passport-google-oauth2").Strategy;
const Student = require("../models/studentModal");
const {
  generateToken,
} = require("./generateToken");
dotenv.config();

const passportUtil = (app) => {
  if (
    !process.env.SESSION_SECRET ||
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET
  ) {
    console.log(
      "Environment variables for session secret, Google client ID and client secret must be set"
    );
    return;
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:
          process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (
        accessToken,
        refreshToken,
        profile,
        done
      ) => {
        try {
          // console.log(profile);

          // Ensure profile and email are defined
          if (
            !profile ||
            !profile._json ||
            !profile._json.email
          ) {
            return done(
              new Error(
                "Email not found in profile"
              ),
              null
            );
          }

          // Check if student already exists
          let student = await Student.findOne({
            email: profile._json.email,
          });

          // If student does not exist, create a new one
          if (!student) {
            student = new Student({
              name: profile._json.name,
              email: profile._json.email,
              password: " ", // Default password, should be set later by the user
              InsitutionName: " ", // Default institution name, should be set later by the user
            });
            await student.save();
          }

          // Return the student
          return done(null, student);
        } catch (error) {
          console.log(error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportUtil;
