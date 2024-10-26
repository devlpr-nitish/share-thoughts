import ApplicationError from "../../ErrorHandler/errorHandler.js";
import { LikeModel } from "./likes.schema.js";
import { thoughtModel } from "./toughts.schema.js";
import { ObjectId } from "mongodb";

export default class ThoughtRepository {

    async add(thought) {
        try {
            return await thought.save();
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(userID) {
        try {
            return await thoughtModel.find({ user: userID });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async like(userID, thoughtID, like) {
        try {
            // check if thought exists
            const thought = await thoughtModel.find({ _id: new ObjectId(thoughtID) });
            if (!thought) {
                throw new Error("Thought not found");
            }

            const userLike = await thoughtModel.findOne({ _id: new ObjectId(thoughtID), likes: { $in: [userID] } })

            if(userLike){
                await thoughtModel.findOneAndUpdate(
                    { _id: new ObjectId(thoughtID), likes: { $in: [userID] } }, // Check if the user exists in the likes array
                    { $pull: { likes: userID } }, // Remove the user from the likes array
                    { new: true } // Return the updated thought after the user is removed
                )
            }else{
                await thoughtModel.findOneAndUpdate(
                    { _id: new ObjectId(thoughtID) }, // Check if the user exists in the likes array
                    { $addToSet: { likes: userID } }, // Remove the user from the likes array
                    { new: true } // Return the updated thought after the user is removed
                )
            }
                

            // check for liked or not
            const getLiked = await LikeModel.findOne({ user: new ObjectId(userID), thought: new ObjectId(thoughtID) });
            if (getLiked) {
                // delete like from likes collection if like exists
                await getLiked.deleteOne({ user: new ObjectId(userID), thought: new ObjectId(thoughtID) });

            } else {
                const newLike = new LikeModel({
                    user: new ObjectId(userID),
                    thought: new ObjectId(thoughtID),
                });
                await newLike.save();
                return !like;
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}