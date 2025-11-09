import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
// Import Routes:
import authRoutes from "./routes/authRoutes.js";
import openRoutes from "./routes/openRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "TalkOne Server Running Successfully",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/v1/landing-page", openRoutes);
app.use("/api/v1/translate", translateRoutes);

export default app;
