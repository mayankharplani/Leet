import { create } from  "zustand"
import {axiosInstance} from "../libs/axios.js"
import toast from "react-hot-toast"


export const useProblemStore = create((set) => ({
    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading:false,


    getAllProblems: async () => {
        try {
            set({isProblemsLoading: true})
            const res = await axiosInstance.get("/problem/get-all-problem")
            set({problems: res.data.problems})
        } catch (error) {
            console.log("Error Getting All Problems",error);
            toast.error("Error in getting Problems")
        }
        finally{
            set({isProblemsLoading: false})
        }
    },

    getProblemById: async (id) => {
        try {
            set({isProblemLoading: true});
            const res = await axiosInstance.get(`/problem/get-problem/${id}`);
            set({problem: res.data.problem})
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error in fetching Problem", error);
            toast.error("Error in Fetching Problem");
        }
        finally{
            set({isProblemLoading: false})
        }
    },

    getSolvedProblemByUser: async () => {
        try {
            const res = await axiosInstance.get("/problem/get-solved-problems")
            set({solvedProblems: res.data.problems})
        } catch (error) {
            console.log("Error in Getting Solved Problem", error);
            toast.error("Error in Fetching Problems");
        }
    }
}))