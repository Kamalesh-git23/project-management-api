import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { uploadFile, downloadFile, deleteFile } from "../controllers/attachmentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/attachments/upload:
 *   post:
 *     summary: Upload Attachment
 *     description: Upload a file and attach it to a task
 *     tags:
 *       - Attachments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - file
 *             properties:
 *               taskId:
 *                 type: integer
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File Uploaded Successfully
 *       400:
 *         description: Invalid Request
 *       401:
 *         description: Unauthorized
 */

router.post("/upload", upload.single("file"), uploadFile);


/**
 * @swagger
 * /api/attachments/download/{id}:
 *   get:
 *     summary: Download Attachment
 *     description: Download an uploaded attachment by ID
 *     tags:
 *       - Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Attachment ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: File Downloaded Successfully
 *       404:
 *         description: Attachment Not Found
 */
router.get("/download/:id", downloadFile);


/**
 * @swagger
 * /api/attachments/{id}:
 *   delete:
 *     summary: Delete Attachment
 *     description: Delete attachment and physical file
 *     tags:
 *       - Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Attachment ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Attachment Deleted Successfully
 *       404:
 *         description: Attachment Not Found
 */
router.delete("/:id", deleteFile);

export default router;