import express from "express";

import { createTask, getTaskById, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { taskSchema, statusSchema } from "../validations/taskValidation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(taskSchema), createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", validate(statusSchema), updateTaskStatus);

export default router;