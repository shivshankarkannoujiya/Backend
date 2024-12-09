import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        // avatar: {
        //     type: String, // cloudinary url
        //     required: true,
        // },

        // coverImage: {
        //     type: String, // cloudinary url
        //     required: true,
        // },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],

        password: {
            type: String,
            required: [true, "password is required"],
        },

        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

//TODO: Hash password before Saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// TODO: Compare `user password` and `saved password`: return true/false
userSchema.methods.isPassworCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

// TODO: generateAccessToken
userSchema.methods.generateAccessToken = function () {
    // short lived Token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// TODO: generateRefreshToken
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
};
export const User = mongoose.model("User", userSchema);
