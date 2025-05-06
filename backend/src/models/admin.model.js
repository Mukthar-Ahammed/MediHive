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
},
{timestamps:true}
);

const Admin=mongoose.model("Admin",userSchema)

export default Admin