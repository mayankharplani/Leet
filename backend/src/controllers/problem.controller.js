import {db} from "../libs/db.js"
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.libs.js";

export const createProblem = async (req,res) => {
    // get all the data from the body
    const {title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution} = req.body;
    // check the user role once again, it is admin or not

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            message: "You are not allowed to create a problem"
        })
    }
    // loop through each reference solutions for different languages
    try {
        for(const [language,solutionCode] of Object.entries(referenceSolution)){
            const languageId = getJudge0LanguageId(language);

            if(!languageId){
                return res.status(400).json({
                    error: `Language ${language} is not Supported`
                })
            }
            const submissions = testcases.map(({input,output}) => ({
                source_code:solutionCode,
                language_id:languageId,
                stdin: input,
                expected_output: output

            }))
            const submissionResults = await submitBatch(submissions);

            const tokens = submissionResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);
            for(let i = 0;i < results.length;i++){
                const result = results[i];

                if(result.status.id !== 3){
                    return res.status(400).json({
                        error: `test case ${i+1} failed for language ${language}`
                    })
                } 
            }

            // save the problem to database
            const newProblem = await db.problem.create({
                data: {
                    title,description,difficulty,tags,examples,constraints,testcases,codeSnippets,referenceSolution,userId: req.user.id
                },
            })
            return res.status(201).json(newProblem)
        }
    } catch (error) {
        
    }

}


export const getAllProblems = async (req,res) => {

}

export const getAllProblemsSolvedByUser = async (req,res) => {

}


export const getProblemById = async (req,res) => {

}

export const updateProblem = async (req,res) => {

}

export const deleteProblem = async (req,res) => {

}

