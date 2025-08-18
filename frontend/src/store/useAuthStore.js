import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignInUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  userData: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("Checkauth response", res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.error("Error in Check Auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSignInUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user });
      toast(res.data.message || "Registered Successfuly");
    } catch (error) {
      console.error("Error in Signing Up", error);
      toast("Error Signing Up");
    } finally {
      set({ isSignInUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      set({userData: res.data.user })
      toast(res.data.message);
    } catch (error) {
      console.error("Error in Logging In", error);
      toast("Error Logging In");
    }
    finally{
        set({isLoggingIn: false});
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout")
      set({authUser: null})
      toast("Logged Out Successfully",{
        position: "top-center"
      })
    } catch (error) {
      console.log("Error logging out", error);
      toast("Logout Failed",{
        position: "top-center"
      });
    }
  }

  
}));
