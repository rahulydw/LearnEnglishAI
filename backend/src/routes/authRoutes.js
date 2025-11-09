import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import loginController from "../controllers/Auth/loginController.js";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Google OAuth Start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/login/failed",
  }),
  (req, res) => {
    try {
      // Token Payload
      const payload = {
        id: req.user._id,
        googleId: req.user.googleId,
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        avatar: req.user.avatar,
      };

      // JWT Generate
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Cookie Set
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.redirect(`${CLIENT_URL}/chat`);
    } catch (error) {
      console.error("JWT Cookie Error:", error);
      return res.redirect(`${CLIENT_URL}/`);
    }
  }
);

// Normal Email Login
router.post("/login", loginController);

// Check Login Status
router.get(
  "/login/success",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect(`${CLIENT_URL}/`);
});

// Failure Route
router.get("/login/failed", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "Google Authentication Failed",
  });
});

export default router;
