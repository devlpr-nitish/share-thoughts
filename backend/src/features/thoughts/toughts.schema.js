import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema({
    title:{
        type:String,
        maxLength: [15, 'Title can not be greater than 15 characters'],
    },
    content:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

export const thoughtModel = new mongoose.model('Thought', thoughtSchema);