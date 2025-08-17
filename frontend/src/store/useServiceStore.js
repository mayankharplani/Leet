import {create} from "zustand"
import { axiosInstance } from "../libs/axios.js"


export const useServiceStore = create((set) => ({
    isGenerating: false,
    hint: null,

    getHint: async (problem,code) => {
        try {
            set({isGenerating: true});
            const res = await axiosInstance.post("/service/hint",{
                problem,
                code
            })
            set({hint: res.data.hint})
        } catch (error) {
            console.log("Error fetching hint", error)
        }finally{
            set({isGenerating: false});
        }
    }
}))