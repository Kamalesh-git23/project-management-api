import express from "express";

import { createTask, getTaskById, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { taskSchema, statusSchema } from "../validations/taskValidation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(authMiddleware);


/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create Task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build Login API
 *               description:
 *                 type: string
 *                 example: JWT Authentication
 *               projectId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task Created Successfully
 */
router.post("/", validate(taskSchema), createTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get Task Details
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Task Details Retrieved
 *       404:
 *         description: Task Not Found
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update Task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task
 *               description:
 *                 type: string
 *                 example: Updated Description
 *     responses:
 *       200:
 *         description: Task Updated Successfully
 *       404:
 *         description: Task Not Found
 */
router.put("/:id", updateTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete Task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Task Deleted Successfully
 *       404:
 *         description: Task Not Found
 */
router.delete("/:id", deleteTask);


/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update Task Status
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - DONE
 *                 example: DONE
 *     responses:
 *       200:
 *         description: Task Status Updated Successfully
 *       404:
 *         description: Task Not Found
 */
router.patch("/:id/status", validate(statusSchema), updateTaskStatus);

export default router;