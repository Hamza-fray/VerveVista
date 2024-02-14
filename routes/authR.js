import express from "express";
import authController from "../controllers/authC.js"; // Assuming .mjs extension for ESM
import { verifyForgetPwd, verifyToken } from "../middlewares/verifyToken.js"; // Assuming .mjs extension for ESM
import multer from "multer";
import passport from "passport";
import Facebook from "passport-facebook";
const FacebookStrategy = Facebook.Strategy;
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/images/avatars"), // Define where to store files
  filename: (req, file, cb) => {
    cb(null, req.body["phoneNumber"] + Date.now() + ".jpeg");
  },
});
const upload = multer({
  storage: storage,
});

router.post("/registration", upload.single("img"), authController.register);
router.post("/login", authController.login);
router.post("/forgetPwd", authController.forgetPwd);
router.post("/otp", verifyToken, authController.otp);
router.post("/newPwd", verifyToken, authController.newPwd);

/********************************** */
/*
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: "http://localhost:9001/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // const user = await User.findOne({
      //   accountId: profile.id,
      //   provider: 'facebook',
      // });
      // if (!user) {
      //   console.log('Adding new facebook user to DB..');
      //   const user = new User({
      //     accountId: profile.id,
      //     name: profile.displayName,
      //     provider: profile.provider,
      //   });
      //   await user.save();
      //   // console.log(user);
      //   return cb(null, profile);
      // } else {
      //   console.log('Facebook User already exist in DB..');
      //   // console.log(profile);
      //   return cb(null, profile);
      // }
    }
  )
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect("/");
  }
);*/
export default router;
