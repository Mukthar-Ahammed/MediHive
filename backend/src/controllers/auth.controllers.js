import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup Controller
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should have at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
        });
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,
        });
    } catch (error) {
        console.log("Error in the login controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Logout Controller
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Logout error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update Profile Controller
export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const cloudResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic: cloudResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in the update profile controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Check Auth Controller
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check auth controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//to get all the user for search bar 

export const SearchUser= async (req,res)=>{
    const {email}=req.body
    try {
        const SearchedUser=await User.findOne({email})
        if(SearchedUser)
            return res.json(SearchedUser)
        else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch user"})
    }
}



export const AddFriends=async(req,res)=>{
    const {userId,friendId}=req.body
    try {
        if(userId==friendId){
            return res.status(400).json({message:"you cannot add yourself as friend"})
        }
        if(!userId||!friendId){
            return res.status(400).json({ message: "Missing userId or friendId" });
        }
        const currentUser=await User.findById(userId)
        const friend=await User.findById(friendId)

        if(!currentUser||!friend){
            return res.status(400).json({message:"User not found"})
        }

        if (currentUser.friends.includes(friendId)) {
            return res.status(400).json({ message: "Already friends" });
          }

        currentUser.friends.push(friendId)
        friend.friends.push(userId)

        await currentUser.save()
        await friend.save()

        res.status(200).json({message:"User added successfully"})

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}