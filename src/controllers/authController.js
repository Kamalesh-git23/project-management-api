import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

export const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
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


    }catch(error){
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user);

        res.json({token});

    }catch(error){
        res.status(500).json({
            message:"Server Error"
        });
    }
};

export const getProfile = async(req,res) => {
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

    res.json(user);
};