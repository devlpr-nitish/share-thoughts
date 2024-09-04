import ApplicationError from "../../ErrorHandler/errorHandler.js";
import { thoughtModel } from "./toughts.schema.js";


export default class ThoughtRepository{

    async add(thought){
        try {
            return await thought.save();
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }   

    async get(userID){
        try {
            return await thoughtModel.find({user: userID});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }
}