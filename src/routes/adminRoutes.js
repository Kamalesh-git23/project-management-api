import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Admin Dashboard
 *     description: Accessible only by ADMIN users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin Access Granted
 *       403:
 *         description: Access Denied
 */

router.get("/dashboard", 
    authMiddleware,
    authorize("ADMIN"),
    (req, res)=>{
        res.json({
            message: "Welcome Admin"
        });
    }
);

export default router;