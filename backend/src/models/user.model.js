import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilepic:{
        type:String,
        default:""
    },
},
{timestamps:true}
);

const User=mongoose.model("User",userSchema)

export default User