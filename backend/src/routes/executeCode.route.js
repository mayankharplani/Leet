import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import {  runCode, submitCode } from "../controllers/executeCode.controller.js";


const executionRoute = express.Router()

executionRoute.post("/submit-code",authMiddleware, submitCode);

executionRoute.post("/run-code",authMiddleware,runCode);


export default executionRoute;