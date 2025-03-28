import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  unAuthUser: null,

  Searchuser: async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/Search-user", data);
      set({ unAuthUser: res.data });
      toast.success("User found");
    } catch (error) {
      set({ unAuthUser: null });
      toast.error(error.response?.data?.message || "User not found");
    }
  },

  AddFriend: async () => {
    const { unAuthUser } = get();
    const authUser = useAuthStore.getState().authUser;
    if (!authUser || !unAuthUser) {
      return toast.error("User not found!");
    }

    try {
      await axiosInstance.post("/api/auth/Add-Friend", {
        userId: authUser._id,
        friendId: unAuthUser._id,
      });

      toast.success("New friend added!");
      set({ unAuthUser: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add friend");
    }
  },

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/api/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      return toast.error("No user selected");
    }
    try {
      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Failed to send the message");
    }
  },

  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/api/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  subscribetoMessages:()=>{
    const {selectedUser}=get()
    if(!selectedUser) return

    const Socket=useAuthStore.getState().socket

    Socket.on("NewMessage",(NewMessage)=>{
      if(NewMessage.senderId!=selectedUser._id) return
      set({
        messages:[...get().messages,NewMessage]
      })
    })
  },

  unsubscribefromMessages:()=>{
    const Socket=useAuthStore.getState().socket
    Socket.off("NewMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
