import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  submission: null,
  isExecuting: false,

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      console.log(
        "Submission",
        JSON.stringify({
          source_code,
          language_id,
          stdin,
          expected_outputs,
          problemId,
        })
      );

      const res = await axiosInstance.post("/code/submit-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });
      console.log("Submission data: ",res.data)
      set({ submission: res.data.submission });
      toast.success(res.data.message || "Code Executed");
    } catch (error) {
      console.log("Error Executing Code", error);
      toast.error("Error Executing Code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
