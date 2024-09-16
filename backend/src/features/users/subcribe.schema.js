import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscribe',
        required: true
    }
})

export const subscribeModel = new mongoose.model('Subscribe', subscribeSchema);