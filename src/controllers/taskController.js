import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTask = asyncHandler(
    async(req, res) => {
        const {title, description, projectId} = req.body;

        const project = await prisma.project.findUnique({
            where:{
                id: projectId
            }
        });

        if(!project){
            throw new AppError("Project not found", 404);
        }

        const task = await prisma.task.create({
            data:{
                title,
                description,
                projectId
            }
        });

        res.status(201).json(task);
    }
);

export const getTaskById = asyncHandler(
    async(req, res) => {

        const task = await prisma.task.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include:{
                project:true
            }
        });

        if(!task){
            throw new AppError("Task not found", 404);
        }

        res.json(task);
    }
);

export const updateTask = asyncHandler(
    async(req, res) => {

        const task = await prisma.task.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        });
        res.json(task);
    }
);

export const deleteTask = asyncHandler(
    async(req, res) => {

        await prisma.task.delete({
            where:{
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "Task Deleted"
        });
    }
);

export const updateTaskStatus = asyncHandler(
    async(req, res) => {
        const {status} = req.body;

        const task = await prisma.task.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                status
            }
        });

        res.json(task);
    }
);