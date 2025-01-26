import prisma from '../config/database';

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    return await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password,
        },
    });
};

export const getUser = async (userId: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
};
