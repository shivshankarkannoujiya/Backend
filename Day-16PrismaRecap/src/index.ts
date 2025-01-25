import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const insertUser = async (
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string
) => {
    const response = await prisma.user.create({
        data: {
            username,
            password,
            firstname,
            lastname,
            email
        }
    })
    console.log('User added successfully: ', response)
}

// insertUser(
//     'user2',
//     '12345abc',
//     'firstName1',
//     'lastName1',
//     'useron1@gmail.com'
// )


// TODO: Update

interface updateParams  {
    firstname: string,
    lastname: string
}

const UpdateUserDetails = async (
    username: string,
    {
        firstname,
        lastname
    }: updateParams
) => {
    const response = await prisma.user.update({
        where: { username },
        data: {
            firstname,
            lastname
        }
    })
    console.log('User details updated successfully: ', response)
}

UpdateUserDetails(
    'user2', {
       firstname: 'updatedFirstName',
        lastname: 'UpdatedLastName'
    }
)