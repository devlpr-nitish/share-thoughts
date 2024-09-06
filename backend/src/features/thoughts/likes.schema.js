import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    thought: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Thought',
        required: true
    }
});

export const LikeModel = new mongoose.model('Like', likeSchema);