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


// ++++++++++++++++++++++++++++++++Todo+++++++++++++++++++++++++++++++++++++++

// TODO: Create Todo
const createTodo = async (
    userId: number,
    title: string,
    description: string
) => {
    const todo = await prisma.todo.create({
        data: {
            userId,
            title,
            description
        }
    })
    console.log(`TODO`, todo)
}

// createTodo(1, "Code", "Code daily")


// TODO: get Todos
const getTodos = async (userId: number) => {
    const Todos = await prisma.todo.findMany({
        where: {
            userId
        }
    })
    console.log(`Todos: `,  Todos )
}

// getTodos(1);

// TODO: Write a function that gives you the todo details of a user along with the user details
const getTodosAndUserDetails = async (
    userId: number
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            firstname: true,
            lastname: true
        }
    })

    const todo = await prisma.todo.findMany({
        where: {
            userId
        }
    })

    console.log(`User: `, user)
    console.log(`Todo: `, todo)
}

// getTodosAndUserDetails(1);


// TODO: Better way : Using Join
const getTodosAndUser = async (userId: number) => {
    const Todos = await prisma.todo.findMany({
        where: {
            userId: userId
        },
        select: {
            // user: true,
            title: true,
            description: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })
    console.log(`Result: `, Todos)
}

getTodosAndUser(1)