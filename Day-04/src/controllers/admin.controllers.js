import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";

const generateAccessTokens = async (userId) => {
    try {
        const admin = await Admin.findById(userId);
        if (!admin) {
            throw new Error("admin with userId does not exist");
        }
        const accessToken = admin.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new Error("ERROR", error.message);
    }
};

const signupAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const existedAdmin = await Admin.findOne({ username: username });
        if (existedAdmin) {
            return res.status(409).json({
                message: "Admin already exist with username",
            });
        }

        const admin = await Admin.create({
            username,
            password,
        });

        const createdAdmin = await Admin.findById(admin._id).select(
            "-password"
        );
        if (!createdAdmin) {
            return res.status(500).json({
                message: "Something went wrong while creating admin",
            });
        }

        return res.status(201).json({
            data: createdAdmin,
            message: "Admin signup successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while registering Admin",
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // check if the admin registered
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({
                message: "You are no registered",
            });
        }

        // Match password
        const isPasswordValid = await admin.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credential",
            });
        }

        // generate Access token
        const accessToken = await generateAccessTokens(admin._id);

        const loggedInAdmin = await Admin.findById(admin._id).select(
            "-password"
        );

        if (!loggedInAdmin) {
            return res.status(400).json({
                message: "Admin after loggedIn not foound",
            });
        }

        const options = {
            httponly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                data: {
                    admin: loggedInAdmin,
                    accessToken: accessToken,
                },
                message: "admin loggedIn successfully",
            });
    } catch (error) {
        return res.status(500).json({
            message:
                error?.message || "Something went wrong while loggegIn Admin",
        });
    }
};

export { signupAdmin, loginAdmin };
