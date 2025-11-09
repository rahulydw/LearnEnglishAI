import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.model.js';
import generateRandomPassword from '../utils/generateRandomPassword.js';
import generateUniqueUsername from '../utils/generateUniqueUsername.js';

// Cookie Extract:
function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

// Passport Strategy Setup :
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      //  Password aur Username Generate
      let passwd = 'Chat45@'; // Or generateRandomPassword();
      let uniqueUsername = await generateUniqueUsername(profile.displayName);

      //  New User Create
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        username: uniqueUsername,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        password: passwd
      });

      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Jwt Strategy for Verify :
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor, 
  secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));


export default passport;