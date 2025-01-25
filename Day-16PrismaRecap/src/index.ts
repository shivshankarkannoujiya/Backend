import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const insertUser = async (
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string
) => {
    const respnse = await prisma.user.create({
        data: {
            username,
            password,
            firstname,
            lastname,
            email
        }
    })
    console.log('User added successfully: ', respnse)
}

insertUser(
    'user2',
    '12345abc',
    'firstName1',
    'lastName1',
    'useron1@gmail.com'
)

// TODO: CRUD 