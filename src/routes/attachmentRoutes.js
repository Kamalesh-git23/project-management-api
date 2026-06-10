import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { uploadFile, downloadFile, deleteFile } from "../controllers/attachmentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", upload.single("file"), uploadFile);

router.get("/download/:id", downloadFile);

router.delete("/:id", deleteFile);

export default router;