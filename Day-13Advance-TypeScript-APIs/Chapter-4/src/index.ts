// TODO: map: This is javascript concept

const Users = new Map();
Users.set("abc@123", { name: "Raman", age: 23 });
Users.set("xyz@123", { name: "Naman", age: 21 });

const user = Users.get("abc@123");
console.log(user);

//TODO: Specify the types of `key` and `value` during generating the Map

type UserOne = {
    name: string;
    age: number;
    email: string;
};

const userOne = new Map<string, UserOne>();
userOne.set("ab@123", { name: "Abhi", age: 23, email: "ab@gmail.com" });
