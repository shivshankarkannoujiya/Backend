const User = {
    name: 'userOne',
    age: 12
}

// updating the const properties
// `it will not complain` even though the User is CONSTANT
//`IT DOES NOT HAPPEN WITH STRING`
User.name = 'userTwo'

// Also with the ARRAY
// updating the const properties
// `it will not complain` even though the `arr1` is CONSTANT
const arr1 = [1, 2, 3, 4, 5];
arr1[2] = 12;

/*
    BECAUSE,
        `We are not changing the arr1 we are only Changing the Value inside the arr1`
        We are not doing[ Reassigning ] : arr1 = [23,4,5,6,7,82]
*/

//TODO: WE can enforce the `js` and `ts` to complain for this also as well
//TODO: Use: ReadOnly

interface User {
    readonly name: string,
    readonly age: number
}

// const user: User = {
//     name: 'userOne',
//     age: 21
// }

// Now we can not change the inner value as well
// Now it will complain Cannot assign to 'name' because it is a read-only property
// user.name = 'usertwo'

// NOTE: if we do not want to write the `readonly` again and again
// Make whole Object `readonly`

type userOne = {
    name: string,
    age: number
}

const user: Readonly <userOne> = {
    name: 'UserOne',
    age: 21
}



/*
    UseCases: 
        config.apikey = 'newkey'; // Error: Cannot assign to 'apikey' because it
        is a read-only property.
    
    We do not want to alter the config eg: 
        Using openai api we do not to alter the apikey
*/


interface Config  {
    endpoint: string,
    apikey: string
}

const config: Readonly <Config> = {
    endpoint: `https://api.example.com`,
    apikey: `abc@123ahdjdk#$as`
}

// config.apikey = `something`
// Error: Cannot assign to 'apikey' because it
// is a read-only property.



