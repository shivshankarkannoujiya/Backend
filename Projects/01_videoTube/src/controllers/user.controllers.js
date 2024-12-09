import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    // Handle images
    const avatarLocalPath = req.files?.avatar?.[0].path;
    const coverImageLocalPath = req.files?.coverImage?.[0].path;
    // console.log(avatarLocalPath);
    // console.log(coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("Uploaded avatar: ", avatar);
    } catch (error) {
        console.log("Error uploading avater", error);
        throw new ApiError(500, "Failed to upload avatar");
    }

    let coverImage;
    if (coverImageLocalPath) {
        try {
            coverImage = await uploadOnCloudinary(coverImageLocalPath);
            console.log("Uploaded coverImage: ", coverImage);
        } catch (error) {
            console.log("Error uploading coverImage", error);
            throw new ApiError(500, "Failed to upload coverImage");
        }
    }

    // Create new User
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
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

export { registerUser };
