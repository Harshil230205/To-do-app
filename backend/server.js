import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/testRouter.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoutes.js";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the To-Do App API");
});
app.use("/api/v1/test", router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
