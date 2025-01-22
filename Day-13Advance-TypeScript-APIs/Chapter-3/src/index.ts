// TODO: Record: let you give a cleaner type of Object

// ugly Syntax 
interface User {
    id: string,
    name: string
}

type Users = { [key: string]: User }

const users: Users = {
    'abc123': {
        id: 'abc123',
        name: 'john'
    },

    'xyz123': {
        id: 'xyz123',
        name: 'Doe'
    }
}


// CLEANER SYNTAX USING THE: Record
interface UserOne  {
    id: string,
    name: string
}

type Userss = Record<string, UserOne>

const userss: Userss = {
    'abc123': {
        id: 'abc123',
        name: 'john'
    },

    'xyz123': {
        id: 'xyz123',
        name: 'Doe'
    }
}