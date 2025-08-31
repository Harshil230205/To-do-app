import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/testRouter.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoutes.js";
import path from "path";

const app = express();
dotenv.config();
connectDB();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// API routes
app.use("/api/v1/test", router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// deployment setup
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  const currDirPath = path.resolve();
  // serve static files from frontend build
  app.use(express.static(path.join(currDirPath, "frontend", "dist")));

  // fallback for SPA routes
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(currDirPath, "frontend", "dist", "index.html"));
  });
} else {
  // dev mode root response
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to the To-Do App API (Dev Mode)");
  });
}

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
