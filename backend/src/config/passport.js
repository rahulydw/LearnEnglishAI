import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
import User from "../models/User.model.js";
import generateUniqueUsername from "../utils/generateUniqueUsername.js";

// SANITIZE HELPER
const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject();
  const { password, createdAt, updatedAt, __v, ...safe } = user;
  return safe;
};

// Cookie Extractor (JWT)
function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies.token;
  return token;
}

/* ==========================================================
     GOOGLE STRATEGY
========================================================== */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL, // must match Google Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // If new user → create
        if (!user) {
          const username = await generateUniqueUsername(profile.displayName);

          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: "Chat45@", // default or random
          });

          await user.save();
        }

        return done(null, sanitizeUser(user));
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* ==========================================================
     JWT STRATEGY (Protected Routes)
========================================================== */
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);

        if (!user) return done(null, false);

        return done(null, sanitizeUser(user)); // always sanitized
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
