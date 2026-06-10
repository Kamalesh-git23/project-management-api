import {z} from "zod";

export const taskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    projectId: z.number()
});

export const statusSchema = z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"])
});