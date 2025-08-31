import express from "express";
import { createController, deleteTodoController, getAllController, updateTodoController } from "../controllers/todoControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create' ,authMiddleware, createController);
router.post('/getAll/:id' ,authMiddleware, getAllController);
router.delete('/delete/:id' ,authMiddleware, deleteTodoController);
router.patch('/update/:id' ,authMiddleware, updateTodoController);
export default router;