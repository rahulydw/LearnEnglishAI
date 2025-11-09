// middlewares/verifyUser.js
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const verifyUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //  Token exist check
    if (!token) {
      return res.redirect("/");
    }

    //  Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  User fetch from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.redirect("/");
    }

    //  User attach to request
    req.user = user;
    next();
  } catch (err) {
    console.error("VerifyUser Error:", err.message);
    return res.redirect("/");
  }
};
