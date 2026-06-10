import express from "express";

import { createTask, getTaskById, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", updateTaskStatus);

export default router;