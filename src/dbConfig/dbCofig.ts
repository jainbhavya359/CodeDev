import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
    }catch(err){
        console.log("Something went wrong with db connection");
        console.log(err);
    }
}