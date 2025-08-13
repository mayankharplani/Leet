import {create} from "zustand"
import {axiosInstance} from "../libs/axios.js"
import {toast} from "react-hot-toast"


export const useAuthStore = create((set) => ({
    // create variables and methods you want to use globally in project
    authUser: null, // variable to store user data
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("check auth response", res.data);
            set({authUser: res.data.user})
        } catch (error) {
            console.log("Error checking auth: ",error);
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigninUp: true})
        try {
            const res = await axiosInstance.post("/auth/register",data);

            set({authUser: res.data.user})
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error Signing Up");
            
        }
        finally{
            set({isSigninUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error Logging in", error);
            toast.error("Error Logging in");
        }
        finally{
            set({isLoggingIn: false});
        }
    },


    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logout Successfully");
        } catch (error) {
            console.log("Error Logging out", error);
            toast.error("Error logging out");
            
        }
    }

}))
