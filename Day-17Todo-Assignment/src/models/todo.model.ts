import prisma from '../config/database';

export const createTodo = async (
    title: string,
    description: string,
    userId: number,
) => {
    return await prisma.todo.create({
        data: {
            title: title,
            description: description,
            userId: userId,
        },
    });
};

export const getTodoByUserId = async (userId: number) => {
    await prisma.todo.findMany({
        where: {
            userId: userId,
        },
    });
};
