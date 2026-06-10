import prisma from "../config/prisma.js";
import fs from "fs";
import path from "path";

export const uploadFile = async(req, res) => {
    const {taskId} = req.body;

    const attachment = await prisma.attachment.create({
        data:{
            fileName: req.file.filename,
            filePath: req.file.path,
            taskId: Number(taskId)
        }
    });

    res.status(201).json(attachment);
};

export const downloadFile = async(req, res) => {
    const attachment = await prisma.attachment.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });

    res.download(attachment.filePath);
};

export const deleteFile = async(req, res) => {
    const attachment = await prisma.attachment.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });

    fs.unlinkSync(attachment.filePath);

    await prisma.attachment.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.json({
        message: "File Deleted"
    });
};


