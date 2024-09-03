import mongoose from "mongoose";

const url = process.env.DB_URL;

export const connectToDB = async() => {
    try {
        await mongoose.connect(url);
        console.log("successfully connected to database");        
    } catch (error) {
        console.log("Error while connecting to database");   
        console.log(error);        
    }
}