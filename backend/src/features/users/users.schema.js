import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLenght: [20, "name can not be greater than 25 characters"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, {timestamps: true})



export const UserModel = new mongoose.model('User', userSchema);