import { th } from "zod/locales";
import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProject = asyncHandler(
    async(req, res) => {
        const {title, description} = req.body;

        const project = await prisma.project.create({
            data:{
                title,
                description,
                ownerId: req.user.id
            }
        });

        res.status(201).json(project);
    }
);

export const getProjects = asyncHandler(
    async(req, res) => {
        const projects = await prisma.project.findMany({
            where:{
                ownerId: req.user.id
            }
        });

        res.json(projects);
    }
);

export const updateProject = asyncHandler(

    async(req, res) => {
        const project = await prisma.project.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });

        if(!project){
            throw new AppError("Project not found", 404);
        }

        if(project.ownerId !== req.user.id){
            throw new AppError("Forbidden", 403);
        }

        const updatedProject = await prisma.project.update({
            where:{
                id:Number(req.params.id)
            },
            data:req.body
        });

    }
);

export const deleteProject = asyncHandler(
    async(req, res) => {

        const project = await prisma.project.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if(!project){
            throw new AppError("Project not found", 404);
        }

        if(project.ownerId !== req.user.id){
            throw new AppError("Forbidden", 403);
        }



        await prisma.project.delete({
            where:{
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "Project Deleted"
        });
    }
);