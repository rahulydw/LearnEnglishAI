import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import loginController from "../controllers/Auth/loginController.js";
import ResponseHandler from "../utils/ResponseHandler.js";

const router = express.Router();

const CLIENT_URL = process.env.ORIGIN || "https://talkone.vercel.app";

//  Google OAuth Start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//  Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/login/failed",
  }),
  (req, res) => {
    try {
      const payload = {
        id: req.user._id,
        googleId: req.user.googleId,
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        avatar: req.user.avatar,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //  Vercel Compatible Cookie Settings
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true on vercel
        sameSite: "None", // IMPORTANT: Google OAuth + Cross domain
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.redirect(`${CLIENT_URL}/chat`);
    } catch (error) {
      console.error("JWT Cookie Error:", error.message);
      return res.redirect(`${CLIENT_URL}/`);
    }
  }
);

//  Normal Login (Email + Password)
router.post("/login", loginController);

//  Check Login Status (JWT Auth)
router.get(
  "/login/success",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return new ResponseHandler({
      success: true,
      statusCode: 200,
      message: "Login Success",
      data: req.user,
    }).send(res);
  }
);

//  Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  return res.redirect(`${CLIENT_URL}/`);
});

//  Google Auth Failed
router.get("/login/failed", (req, res) => {
  return new ResponseHandler({
    success: false,
    statusCode: 401,
    message: "Google Authentication Failed",
  }).send(res);
});

export default router;
