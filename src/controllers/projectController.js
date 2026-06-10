import prisma from "../config/prisma.js";

export const createProject = async(req, res) => {
    const {title, description} = req.body;

    const project = await prisma.project.create({
        data:{
            title,
            description,
            ownerId: req.user.id
        }
    });

    res.status(201).json(project);
};

export const getProjects = async(req, res) => {
    const projects = await prisma.project.findMany({
        where:{
            ownerId: req.user.id
        }
    });

    res.json(projects);
};

export const updateProject = async(req, res) => {
    const {title, description} = req.body;

    const project = await prisma.project.update({
        where:{
            id:Number(req.params.id)
        },
        data:{
            title,
            description
        }
    });

    res.json(project);
};

export const deleteProject = async(req, res) => {
    await prisma.project.delete({
        where:{
            id: Number(req.params.id)
        }
    });

    res.json({
        message: "Project Deleted"
    });
};