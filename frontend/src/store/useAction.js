import {create} from "zustand"
import {axiosInstance} from "../libs/axios.js"
import {toast} from "react-toastify"





export const useActions = create((set) => ({
    isDeletingProblem: false,


    onDeleteProblem: async (id) => {
        try {
            set({isDeletingProblem: true});
            const res = await axiosInstance.delete(`/problem/delete-problem/${id}`)
            toast("Problem Deleted Successfully");
        } catch (error) {
            console.log("Error deleting Problem",error);
            toast("Error Deleting Problem")
        }
        finally{
            set({isDeletingProblem: false})
        }
    }
}))