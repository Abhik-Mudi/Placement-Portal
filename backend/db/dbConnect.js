import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error connecting to database:", error.message);
    }
}

export default dbConnect;