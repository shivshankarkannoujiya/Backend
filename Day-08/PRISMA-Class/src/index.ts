import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// TODO: Create User
const createUser = async (
    username: string,
    firstname: string,
    lastname: string,
    password: string,
) =>  {
    const user = await prisma.user.create({
        data: {
            username,
            firstname,
            lastname,
            password
        },
        select: { // select what data we want to return to User
            id: true,
            username: true,
            firstname: true,
            lastname: true
        },
    })
    console.log(`User created: `, user)
}

// createUser("ab@gmail.com", "Abhi", "Kumar", "ab_password");



// TODO: update User
interface updateParams {
    firstname: string,
    lastname: string
}

const updateUser = async (
    username: string,
    {
        firstname,
        lastname
    }: updateParams
) => {
    const updatedUser = await prisma.user.update({
        where: { username },
        data: {
            firstname,
            lastname
        },
        select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
        }
    })
    console.log(`User updated: `, updatedUser)
}

// updateUser("ab@gmail.com", {
//     firstname: "Abhi1111",
//     lastname: "Ji"
// })



// TODO: get User
const getUser = async (username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            username: true
        }
    })
    console.log(`User is: `, user)
}

// getUser("ab@gmail.com")



// TODO: delete User
const deleteUser = async (username: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
        }
    })
    console.log(`Deleted User: `, deletedUser)
}

// deleteUser("ab@gmail.com")