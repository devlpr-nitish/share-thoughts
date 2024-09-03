
import { UserModel } from "./users.schema.js";
import ApplicationError from "../../ErrorHandler/errorHandler.js";



export default class UserRepository{

    async signup(user){
        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database", 500);
        }
    }

    async findByEmail(email){

        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Somethin went wrong with database" ,500);
        }
    }
    

}