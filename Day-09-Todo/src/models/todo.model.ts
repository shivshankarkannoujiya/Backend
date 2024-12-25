import prisma from "../utils/prisma";

const createTodo = async (
    
    data: {
        title: string,
        description: string,
        userId: number
    }

) => {
    return await prisma.todo.create({ data });
}


const getTodoByUser = async (userId: number) => {
    return await prisma.todo.findMany({
        where: {
            userId
        }
    })
}

export {  createTodo, getTodoByUser }