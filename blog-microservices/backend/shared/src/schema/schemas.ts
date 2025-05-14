import {z} from 'zod';

export const registrationSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password should not be less than 8 characters"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password is not less than 8 characters"),
});

export const postCreateSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10)
});


export const postUpdateSchema =  z.object({
    title: z.string().min(3).max(100).optional(),
    content: z.string().min(10).optional(),
});

