
// TODO: Prerquisite
// interface User {
//     name: string,
//     age: number
// }

// function sumOfAge(user1: User, user2: User): number {
//     return user1.age + user2.age;
// }

// const resultOfAge = sumOfAge(
//     {
//         name: 'userone',
//         age: 12
//     },
//     {
//         name: 'usertwo',
//         age: 13
//     }
// )

// console.log(resultOfAge);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// TODO: Pick:
// Allow you to create a new type by selecting a set of properties(keys) from an existing type(Type) / interface

interface User {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
}

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

function updateUser(UpdatedProps: UpdateProps) {
    // hit the database to update the User
}


// TODO: Partial
/*
    Make all properties of a type optional, creating a type with the same properties,
    but each marked as optional
*/

interface User2 {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
}

// We can also make optional
/*
interface User2 {
    name?: string,
    age?: number,
    emai?: string
}

But if we change the Properties in the User2 then we have to also change in the other one al well 
*/

type updateprops = Pick<User2, 'name' | 'age' | 'email'>
type updatePropOptional = Partial<updateprops>

/*
    In the express server if we want to update the User2
    if we pass the `updateprops` and we want to update optionally it does not allow 
    TODO: FOR THAT USE: Partial `It make all properties Optional`
 */

function updateUser2(UpdatedProps: updatePropOptional){}