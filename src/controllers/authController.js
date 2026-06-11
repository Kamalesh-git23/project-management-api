import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(
    async(req, res) => {

        const {name, email, password} = req.body;

        const existingUser = await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "User Registered"
        });
    }
);

export const login = asyncHandler(
    async(req, res) => {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            throw new AppError("Invalid Credentials", 401);
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new AppError("Invalid Credentials", 401);
        }

        const token = generateToken(user);

        res.json({token});
    }
);

export const getProfile = asyncHandler(
    async(req, res) => {
        const user = await prisma.user.findUnique({
            where:{
                id:req.user.id
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true
            }
        });

        if(!user){
            throw new AppError("User Not Found", 404);
        }

        res.json(user);
    }
);