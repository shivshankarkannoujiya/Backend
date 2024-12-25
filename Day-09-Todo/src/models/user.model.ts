import prisma from "../utils/prisma";

const createUser = async (

    data: {
        username: string,
        email: string,
        password: string
    }

) => {
    return await prisma.user.create({ data });
}


const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export { createUser, findUserByEmail }