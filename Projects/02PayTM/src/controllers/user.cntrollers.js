import { User } from "../models/user.models.js";
import { signupBody } from "../validator.js";

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
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Invalid inputs",
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username,
        });

        if (existingUser) {
            return res.status(411).json({
                message: "User already exist username",
            });
        }

        const user = await User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.lastname,
        });

        // TODO: once remove select and see output
        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while creating User",
            });
        }

        const accessToken = await generateAccessTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .json({
                data: {
                    user: createdUser,
                    accessToken: accessToken,
                },
                message: "User created successfully",
            });
    } catch (error) {
        return res.status(500).json({
            message: error?.message || "Something went wrong while signup User",
        });
    }
};

export { signupUser };
