import { create } from 'zustand';
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useLogStore = create((set) => ({

  isUploading: false,
  logs:[],

  logUpload: async (formData) => {
    set({ isUploading: true });

    try {
      const res = await axiosInstance.post("/api/clinicallog/clinicallogs", formData);
      toast.success("Uploaded Successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      set({ isUploading: false });
    }
  },

  logView:async()=>{
    try {
      const res=await axiosInstance.get("/api/clinicallog/clinicallogsview")
      set({logs:res.data})
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      toast.error("Failed to fetch logs")
    }
  },

  LogDelete:async(logId)=>{
    try {
      const res= await axiosInstance.delete(`/api/clinicallog/clinicallogsdelete/${logId}`)
      toast.success("Successfully deleted")
    } catch (error) {
      console.error("Failed to delete",error)
      toast.error("Unable to delete")
    }
  }

}));

