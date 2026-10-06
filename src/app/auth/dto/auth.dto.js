import { z } from "zod";

export const registerDTO = z.object({
    name: z.string().min(2).max(20).trim(),
    email: z.email().toLowerCase().trim(),
    password: z.string().min(8).max(16).trim(),
    provider: z.enum(["local", "google", "github"]).default("local"),
    birthDate: z.date().optional(),
    gender: z.enum(["male", "female"]).default("male").optional(),
});

export const verifyAccountDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(6).trim(),
});

export const loginDTO = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(8).max(16).trim(),
});

export const sendOtpDTO = z.object({
    email: z.email().toLowerCase().trim(),
});

export const resetPasswordDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(6).trim(),
    newPassword: z.string().min(8).max(16).trim(),
});
