import express from "express";

import { register, login, getProfile } from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { registerSchema, loginSchema } from "../validations/authValidation.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/profile", authMiddleware, getProfile);

export default router;
