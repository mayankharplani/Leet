import {getAIHint} from "../libs/geminiService.js"



export const getHint = async (req,res) => {
    const {problem, code,query} = req.body;
    
    try {
        const hint = await getAIHint(problem,code,query);
        res.status(200).json({
            success: true,
            message: "Hint Fetched Successfully",
            hint
        })
    } catch (error) {
        console.log("Error in fetching hint", error);
        res.status(500).json({
            message: "Error Fetching Hint"
        })
    }
}