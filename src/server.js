import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Project Management API Running"
    });
});

async function testDB(){

    try{
        await prisma.$connect();
        console.log("Database Connected");
    }catch(error){
        console.error(" Database Connection Failed");
        console.error(error);        
    }
}


testDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});

