import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmissions, getAllTheSubmissionsForProblem, getAttemptedProblems, getSubmissionsForProblem } from "../controllers/submission.controller.js";


const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions",authMiddleware,getAllSubmissions);

submissionRoutes.get("/get-submission/:problemId", authMiddleware, getSubmissionsForProblem);



submissionRoutes.get("/get-submission-count/:problemId",authMiddleware,getAllTheSubmissionsForProblem);

submissionRoutes.get("/get-attempted-problem", authMiddleware, getAttemptedProblems)

export default submissionRoutes;