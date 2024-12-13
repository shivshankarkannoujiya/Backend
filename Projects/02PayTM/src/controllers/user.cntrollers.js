import { User } from "../models/user.models.js";
import { signinBody, signupBody } from "../validator.js";

const generateAccessTokens = async function (userId) {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User with the id not found",
        });
    }

    const accessToken = user.generateAccessToken();
    return accessToken;
};

const signupUser = async (req, res) => {
    try {
        const { success, data } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(401).json({
                message: "Invalid inputs",
            });
        }

        const { username, firstname, lastname, password } = data;

        const existingUser = await User.findOne({
            username: username,
        });

        if (existingUser) {
            return res.status(411).json({
                message: "User already exist username",
            });
        }

        const user = await User.create({
            username,
            firstname,
            lastname,
            password,
        });

        // TODO: once remove select and see output
        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while creating User",
            });
        }

        return res.status(201).json({
            data: {
                user: createdUser,
                accessToken: accessToken,
            },
            message: "User created successfully",
        });
    } catch (error) {
        console.log("Error while creating User: ", error);
        return res.status(500).json({
            message: error?.message || "Something went wrong while signup User",
        });
    }
};

const singinUser = async (req, res) => {
    try {
        const { success, data } = signinBody.safeParse(req.body);

        if (!success) {
            return res.status(401).json({
                message: "Invalid Input",
            });
        }

        const { username, password } = data;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User is not registered",
            });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "invalid Credentials",
            });
        }

        const accessToken = await generateAccessTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");
        if (!loggedInUser) {
            return res.status(404).json({
                message: "loggedIn User not found !",
            });
        }

        const options = {
            httpOnly: true,
            secure: req.secure || process.env.NODE_ENV === "production",
            sameSite: "Strict",
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
        console.log("Error logging in user: ", error);
        return res.status(500).json({
            message: error?.message || "An error occured while logging in user",
        });
    }
};
export { signupUser, singinUser };
