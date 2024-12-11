import { User } from "../models/user.models.js";

const generateAccessTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User with userId does not exist")
        }

        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new Error(error.message)
    }
};

const signupUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const existedUser = await User.findOne({ username });
        if (existedUser) {
            return res.status(409).json({
                message: "User already exist with username",
            });
        }

        const user = await User.create({
            username,
            password,
        });

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res
                .status(500)
                .json("Something went wrong while creating user");
        }

        return res.status(201).json({
            data: createdUser,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({
                message: "All fields are required",
            });
        }

        // Check if the User is register
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }

        // match password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credential",
            });
        }

        // generate access token
        const accessToken  = await generateAccessTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");

        if (!loggedInUser) {
            return res.status(404).json({
                message: "User not found in the database after login",
            });
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                data: {
                    user: loggedInUser,
                    accessToken: accessToken,
                },
                message: "User loggedIn successfully",
            });
    } catch (error) {
        return res.status(500).json({
            message: error?.message || "Error while logged In user",
        });
    }
};

export { signupUser, loginUser };
