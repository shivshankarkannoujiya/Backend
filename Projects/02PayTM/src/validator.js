import { z } from "zod";

const signupBody = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(8),
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(8),
});

const updateBodySchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
});

const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(8),
});

export { signupBody, signinBody, updateBodySchema, changePasswordSchema };
