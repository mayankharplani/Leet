import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import {  toast } from "react-toastify";

export const useExecutionStore = create((set) => ({
  submission: null,
  isExecuting: false,
  runningCode: null,
  isRunning: false,

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
      console.log("Submission data: ", res.data);
      set({ submission: res.data.submission });
      toast(res.data.message || "Code Executed");
    } catch (error) {
      console.log("Error Executing Code", error);
      toast("Error Executing Code");
    } finally {
      set({ isExecuting: false });
    }
  },


  runCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isRunning: true });
      console.log(
        "Running Code: ",
        JSON.stringify(
          source_code,
          language_id,
          stdin,
          expected_outputs,
          problemId
        )
      );
      const res = await axiosInstance.post("/code/run-code",{
        source_code,
          language_id,
          stdin,
          expected_outputs,
          problemId
      })
      console.log("submission data:" ,res.data.testCaseResults)
      set({runningCode: res.data.testCaseResults});
    } catch (error) {
      console.log("Error Executing Code", error);
      toast("Error Running Code");
    }finally{
      set({isRunning: false})
    }
  },

}));
