import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"


//getting the users for the side bar except the loggedin user 
export const getUserforSidebar=async(req,res)=>{
    try{
        const loggedInUser=req.user._id
        filteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password")
        res.status(200).json(filteredUser)
    }catch(error){
        console.log("Error in finding the filtered user",error)
        res.status(500).json({message:"Internal server Error"})
    }
}


export const getMessage=async(req,res)=>{

    try {
       const { id: UserToChatId }=req.params
       const myId=req.user._id
       const messages= await Message.find({
        $or:[
            {senderId:myId,recieverId:UserToChatId},
            {senderId:UserToChatId,recieverId:myId} 
        ]
       })
       res.status(200).json(messages)
    } catch (error) {
        console.log("Error in the getmessage block",error)
        res.status(500).json({message:"Inertnal Server Error"})
    }

}


export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const { id:recieverId }=req.params
        const senderId=req.user._id

        if(image){
            const uploadResonse=await cloudinary.uploader.upload(image)
            imageUrl=uploadResonse.secure_url;
        }
        
        const NewMessage= new Message({
                senderId,
                recieverId,
                text,
                image:imageUrl
        })
            await NewMessage.save()
            //realtime functionalty will be here
            res.status(201).json(NewMessage)

    } catch (error) {

        console.log("Error in the send message controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}