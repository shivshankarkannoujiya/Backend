import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    lastname: {
        type: String,
        trim: true,
        maxLength: 50
    },

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },

    password: {
        type: String,
        required: true
    }

}, { timestamps: true })


export const User = mongoose.model("User", userSchema)