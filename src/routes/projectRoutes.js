import express from "express";

import { createProject, getProjects, updateProject, deleteProject } from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { projectSchema } from "../validations/projectValidation.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get All Projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Projects
 */
router.get("/", getProjects);


/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create Project
 *     tags:
 *       - Projects
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Student Task Tracker
 *               description:
 *                 type: string
 *                 example: Internship Backend Project
 *     responses:
 *       201:
 *         description: Project Created Successfully
 */
router.post("/", validate(projectSchema), createProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update Project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
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
 *                 example: Updated Student Tracker
 *               description:
 *                 type: string
 *                 example: Updated Project Description
 *     responses:
 *       200:
 *         description: Project Updated Successfully
 *       404:
 *         description: Project Not Found
 */
router.put("/:id", updateProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete Project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Project Deleted Successfully
 *       404:
 *         description: Project Not Found
 */
router.delete("/:id", deleteProject);


export default router;