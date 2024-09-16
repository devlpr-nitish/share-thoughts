
import { UserModel } from "./users.schema.js";
import ApplicationError from "../../ErrorHandler/errorHandler.js";
import { subscribeModel } from "./subcribe.schema.js";
import { Long, ObjectId } from "mongodb";


export default class UserRepository {

    async signup(user) {
        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }

    async findByEmail(email) {

        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }


    async subscribe(userID, user, subs) {
        try {
            // check if user exists
            const User = await UserModel.find({ _id: new ObjectId(userID) });
            if (!User) {
                throw new Error("user not found");
            }

            const userSubcribe = await UserModel.findOne({ _id: new ObjectId(user), subscribers: { $in: [userID] } })
            console.log(userSubcribe);

            if (userSubcribe) {
                await UserModel.findOneAndUpdate(
                    { _id: new ObjectId(user), subscribers: { $in: [userID] } },
                    { $pull: { subscriber: userID } },
                    { new: true }
                )
            } else {
                await UserModel.findOneAndUpdate(
                    { _id: new ObjectId(user) },
                    { $addToSet: { subscriber: userID } },
                    { new: true }
                )
            }


            // check for subscribed or not
            const getSubscribed = await subscribeModel.findOne({ user: new ObjectId(user), subscriber: userID });
            if (getSubscribed) {
                // delete subscribe from subscribers collection if subscription exists
                await getSubscribed.deleteOne({ user: new ObjectId(user), subscriber: userID });

            } else {
                const newSubscriber = new subscribeModel({
                    user: new ObjectId(user),
                    subscriber: userID,
                });
                await newSubscriber.save();
                return !subs;
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }

}