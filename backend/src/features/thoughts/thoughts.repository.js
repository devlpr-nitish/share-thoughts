import ApplicationError from "../../ErrorHandler/errorHandler.js";


export default class ThoughtRepository{

    async add(thought){
        try {
            return await thought.save();
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }   
}