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
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        },
    ],
},
{timestamps:true}
);

const User=mongoose.model("User",userSchema)

export default User