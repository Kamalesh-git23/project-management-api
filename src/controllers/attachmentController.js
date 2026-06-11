import prisma from "../config/prisma.js";
import fs from "fs";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const uploadFile = asyncHandler(
    async(req, res) => {
        const {taskId} = req.body;

        if(!req.file){
            throw new AppError("File is required", 400);
        }

        const attachment = await prisma.attachment.create({
            data:{
                fileName: req.file.filename,
                filePath: req.file.path,
                taskId: Number(taskId)
            }
        });

        res.status(201).json(attachment);
    }
);

export const downloadFile = asyncHandler(
    async(req, res) => {
        const attachment = await prisma.attachment.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });

        if(!attachment){
            throw new AppError("Attachment not found", 404);
        }

        res.download(attachment.filePath);
    }
);

export const deleteFile = asyncHandler(
    async(req, res) => {
        const attachment = await prisma.attachment.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });

        if(!attachment){
            throw new AppError("Attachment not found", 404);
        }

        fs.unlinkSync(attachment.filePath);

        await prisma.attachment.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "File Deleted"
        });
    }
);


