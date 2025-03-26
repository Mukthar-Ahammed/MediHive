import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from "socket.io-client"
const BASE_URL="http://localhost:5001"


export const useAuthStore=create((set,get)=>({
    
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isChecking:true,
    unAuthUser:null,
    socket:null,

    checkAuth: async()=>{
        try {
        const res = await axiosInstance.get("/api/auth/check");
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in check auth",error)
            set({authUser:null})
        }finally{
            set({isChecking:false})
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true})
        try {
        
           const res= await axiosInstance.post("/api/auth/Signup",data)
           toast.success("Account created successfully")
           set({authUser:res.data})
           get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message)
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res= await axiosInstance.post("/api/auth/Login",data)
            set({authUser:res.data})
            toast.success("Logged in Successfully")
            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message)
            set({isLoggingIn:false})
        }
    },


    logout:async()=>{
        try {
            const res=await axiosInstance.post("/api/auth/Logout")
                set({authUser:null})
                toast.success("Logged Out Successfully")
                get().disconnectSocket()

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    UpdateProfile:async(data)=>{
        set({isUpdatingProfile:true})
            try {
                const res=await axiosInstance.put("/api/auth/update-profile", data);
                set({authUser:res.data})
                toast.success("Profile Updated Successfully")
            } catch (error) {
                console.log("Error in updating profile",error)
                toast.error(error.response.data.message)
            }finally{
                set({isUpdatingProfile:false})
            }
        
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const Socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
    
        Socket.connect();
        set({ socket: Socket });
    
        // Listen for all online users
        Socket.on("getOnlineUsers", (userIds) => {
            // Filter friends who are online
            const onlineFriends = authUser.friends.filter(friendId => userIds.includes(friendId));
            set({ onlineUsers: userIds, onlineFriends });
        });
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) 
            get().socket.disconnect()
    },
}))
