import { createUser } from '../models/user.model';

export const signupUser = async (
    username: string,
    email: string,
    password: string,
) => {
    return createUser(username, email, password);
};


