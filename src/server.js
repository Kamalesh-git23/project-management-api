import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import attachmentRoutes from "./routes/attachmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

import AppError from "./utils/AppError.js";
import errorHandler from "./middleware/errorHandler.js";
import { success } from "zod";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project Management API Running"
    });
});

app.use((req, res, next) => {
    next(
        new AppError(`Route ${req.originalUrl} not found`, 404)
    );
});

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

