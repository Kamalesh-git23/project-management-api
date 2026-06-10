import express from "express";

import { createProject, getProjects, updateProject, deleteProject } from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { projectSchema } from "../validations/projectValidation.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(projectSchema), createProject);

router.get("/", getProjects);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);


export default router;