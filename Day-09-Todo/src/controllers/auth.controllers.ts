import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => { 

    const { username, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createUser(
        {
            username,
            email,
            password: hashedPassword
        }
    )

    return res
        .status(201)
        .json({
            message: "User created successfully",
            user: createdUser
        })
};


export const loginUser = async (req: Request, res: Response) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(411)
            .json({
                message: "All fields are required"
            })
    }

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
            .status(401)
            .json({
                message: "Invalid username or password"
            })
    }

    const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            accessToken: accessToken,
            message: "User logged In sussessfully"
        })
        
};