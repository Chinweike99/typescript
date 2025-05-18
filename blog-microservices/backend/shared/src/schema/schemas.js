"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateSchema = exports.postCreateSchema = exports.loginSchema = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Password should not be less than 8 characters"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Password is not less than 8 characters"),
});
exports.postCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    content: zod_1.z.string().min(10)
});
exports.postUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100).optional(),
    content: zod_1.z.string().min(10).optional(),
});
