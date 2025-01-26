import { Request, Response } from 'express';
import { signupUser } from '../services/user.services';
import { z } from 'zod';
import prisma from '../config/database';

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const parseResult = signupSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(400).json({
                message: 'Invalid inputs',
                error: parseResult.error.errors,
            });
            return;
        }

        const { username, email, password } = parseResult.data;
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existedUser) {
            res.status(409).json({
                message: 'User with this email or username already exists',
            });
        }

        const user = signupUser(username, email, password);

        res.status(201).json({
            message: 'User created successfully',
            userId: (await user).id,
        });
    } catch (error) {
        console.error('Error while registering User: ', error);
        res.status(500).json({
            message: 'Something went wrong while registering the User',
        });
    }
};
