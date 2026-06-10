import prisma from "../config/prisma.js";

export const createTask = async(req, res) => {
    const {title, description, projectId} = req.body;

    const task = await prisma.task.create({
        data:{
            title,
            description,
            projectId
        }
    });

    res.status(201).json(task);
};

export const getTaskById = async(req, res) => {

    const task = await prisma.task.findUnique({
        where:{
            id: Number(req.params.id)
        },
        include:{
            project:true
        }
    });

    res.json(task);
};

export const updateTask = async(req, res) => {
    const {title, description} = req.body;

    const task = await prisma.task.update({
        where:{
            id: Number(req.params.id)
        },
        data:{
            title,
            description
        }
    });

    res.json(task);
};

export const deleteTask = async(req, res) => {

    await prisma.task.delete({
        where:{
            id: Number(req.params.id)
        }
    });

    res.json({
        message: "Task Deleted"
    });
};

export const updateTaskStatus = async(req, res) => {
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
};