import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.libs.js";

export const createProblem = async (req, res) => {
  // get all the data from the body
  //.                                                            JSON                  JSON
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolution,
  } = req.body;
  // check the user role once again, it is admin or not

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to create a problem",
    });
  }
  // loop through each reference solutions for different languages
  /* referenceSolution = {
        JAVA: "ideal solution in java which a problem setter will provide while creating a problem ",
        CPP : "ideal solution in c++",
        PYTHON: "ideal solution in python"
    } */
  // What does entries method will do -> it will go to all the key value pairs of object
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      // console.log(Object.entries(referenceSolution));
      const languageId = getJudge0LanguageId(language); // this function will give you the judge0 id of that particular language of reference solution
      // console.log(languageId);
      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not Supported`,
        });
      }
      // console.log(testcases)
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      console.log(submissions);
      // now this submission variable is array of objects in which every object contains all fields
      // like source_code,language_id,stdin,expected_output for test cases

      // this function will create a submission batch which will hit the submission/batch url of judge0
      //  and provide us a array of object(tokens) for each test case in a queue
      //   console.log(submissions);
      const submissionResults = await submitBatch(submissions);

      // this tokens is array of tokens of test cases
      const tokens = submissionResults.map((res) => res.token);
      console.log(tokens);
      // this method will polling the result means it checks continously that all the test cases are accepted or failed
      const results = await pollBatchResults(tokens);
      // console.log(results);
      // from this we are checking that every test case is accepted or not
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result----", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `test case ${i + 1} failed for language ${language}`,
          });
        }
      }

      // save the problem to database
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolution,
          userId: req.user.id,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Problem Created Successfully",
        newProblem
      });
    }
  } catch (error) {
    console.log("Error in creating Problem", error);
    return res.status(500).json({
      error: "Error in creating Problem",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include:{
        solvedBy: {
          where:{
            userId: req.user.id
          }
        }
      }
    });

    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Problems Fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log("Error in Fetching Problem", error);
    return res.status(500).json({
      error: "Error in Fetching Problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await db.problem.findUnique({
      where: {
        id: id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Problem Fetched Successfully",
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while fetching problem by Id",
    });
  }
};


export const updateProblem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      error: "Problem not found",
    });
  }
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolution,
  } = req.body;
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not Allowed to Update a Problem",
    });
  }
  try {
    const existingProblem = await db.problem.findUnique({ where: {id} });
    if (!existingProblem) {
      return res.status(404).json({
        error: "Problem not Found",
      });
    }
    if (existingProblem.userId !== req.user.id) {
      return res.status(404).json({
        message: "You are not the owner of this problem",
      });
    }
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language); // this function will give you the judge0 id of that particular language of reference solution
      // console.log(languageId);
      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not Supported`,
        });
      }
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults = await submitBatch(submissions);
      
      const tokens = submissionResults.map((res) => res.token);
      
      const results = await pollBatchResults(tokens);
      
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result----", result);
        
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `test case ${i + 1} failed for language ${language}`,
          });
        }
      }
      
      // save the problem to database
      const updateProblem = await db.problem.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolution,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Problem Updated Successfully",
        updateProblem
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error in fetching Problems"
    })
  }
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await db.problem.findUnique({ where: { id } });
    if (!problem) {
      return res.status(404).json({
        error: "Problem not Found",
      });
    }
    await db.problem.delete({ where: { id } });
    return res.status(200).json({
      success: true,
      message: "Problem deleted Successfully"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error in deleting Problem"
    })
  }
};



export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some:{
            userId: req.user.id
          }
        }
      },
      include:{
        solvedBy:{
          where:{
            userId: req.user.id
          }
        }
      }
    })
    console.log(problems);
    res.status(200).json({
      success: true,
      message: "Problems fetched Successfully",
      problems
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error in updating Problem"
    })
  }
};