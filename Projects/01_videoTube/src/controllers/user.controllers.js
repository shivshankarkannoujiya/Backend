import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt, { verify } from "jsonwebtoken";

const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User with userId does not exist");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    // validation
    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check for existing User
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exist with email or username");
    }

    // // Handle images
    // const avatarLocalPath = req.files?.avatar?.[0].path;
    // const coverImageLocalPath = req.files?.coverImage?.[0].path;
    // // console.log(avatarLocalPath);
    // // console.log(coverImageLocalPath);

    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "Avatar file is missing");
    // }

    // let avatar;
    // try {
    //     avatar = await uploadOnCloudinary(avatarLocalPath);
    //     console.log("Uploaded avatar: ", avatar);
    // } catch (error) {
    //     console.log("Error uploading avater", error);
    //     throw new ApiError(500, "Failed to upload avatar");
    // }

    // let coverImage;
    // if (coverImageLocalPath) {
    //     try {
    //         coverImage = await uploadOnCloudinary(coverImageLocalPath);
    //         console.log("Uploaded coverImage: ", coverImage);
    //     } catch (error) {
    //         console.log("Error uploading coverImage", error);
    //         throw new ApiError(500, "Failed to upload coverImage");
    //     }
    // }

    // Create new User
    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
    });

    // verify user is created or not || this user comming from the DB
    // it holds all the properties
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering User");
    }

    // if User created Send response
    return res
        .status(201)
        .json(
            new APiResponse(201, createdUser, "User registered Successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    // get data from body
    const { email, username, password } = req.body;

    // validation
    if (!(email && password)) {
        throw new ApiError(400, "email and password is required");
    }

    // check is User exist
    const user = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // validate Password: match saved password & entered password
    const isPasswordValid = await user.isPassworCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credential");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // TODO: Creaft better way
    if (!loggedInUser) {
        throw new ApiError(404, "loggedIn user not found");
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User loggedIn Successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // As we have set refreshToken in cookies during login
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (incommingRefreshToken) {
        throw new ApiError(401, "Refresh Token is required");
    }

    // During accessToken, refreshToken generation
    //  we have enter informations in payload: _id, email etc
    // we can take use of this to find the user

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh Toekn");
        }

        // verify
        // stored refreshToken and incommingRefreshToken
        if (incommingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid refresh Toekn");
        }

        // generate new refresh and accessToken and send to user
        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessAndRefereshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new APiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed Successfully"
                )
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Soomething went wrong while refreshing access token"
        );
    }
});

export { registerUser, loginUser, refreshAccessToken };
