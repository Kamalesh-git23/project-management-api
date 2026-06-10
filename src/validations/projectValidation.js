import {z} from "zod";

export const projectSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().optional()
});