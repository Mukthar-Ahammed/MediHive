import mongoose from "mongoose"

export const connectDB= async ()=>{

    try{
        await mongoose.connect(process.env.mongodb_uri)
        console.log("Database is connected")
    }catch(error){
        console.log("Error occured during the db connection",error)
    }
}

