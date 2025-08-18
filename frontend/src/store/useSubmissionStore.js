import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from "react-toastify";




export const useSubmissionStore = create((set) => ({
  isLoading: false,
  submissions: [],
  submissionProblem: null,
  submissionCount: null,
  attempted: [],

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");
      set({ submissions: res.data.submissions });
      // toast("Submissions Fetched Successfully");
    } catch (error) {
      console.log("Error getting all submissions", error);
      toast("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );
      set({ submissionProblem: res.data.submission });
    } catch (error) {
      console.log("Error getting problem submissions", error);
    }
  },
  
  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission-count/${problemId}`
      );
      set({ submissionCount: res.data.count });
    } catch (error) {
      console.log("Error getting submissions count ", error);
    }
  },



  getAttemptedProblems: async () => {
    try {
      const res = await axiosInstance.get("/submission/get-attempted-problem");
      set({attempted: res.data.attemptedProblems})
    } catch (error) {
      console.log("Error getting attempted problems", error);
    }
  }
}));
