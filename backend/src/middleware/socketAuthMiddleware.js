import jwt from "jsonwebtoken";
import cookie from 'cookie'
import User from "../models/User.model.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // 1️⃣ Parse cookie from headers
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");

        const token = cookies.token;

        if (!token) return next(new Error("Auth token missing"));

        // 2️⃣ Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Find user from DB (optional but good for full user info)
        const user = await User.findById(decoded.id);
        if (!user) return next(new Error("User not found"));

        // 4️⃣ Attach user to socket
        socket.user = {
            googleId: user.googleId,
            username: user.username,
            email: user.email,
            name: user.name,
        };

        next();
    } catch (err) {
        console.error("Socket Auth Error:", err.message);
        next(new Error("Authentication error"));
    }
};
