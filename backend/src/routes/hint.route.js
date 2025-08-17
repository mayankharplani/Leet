import express from "express"
import { getHint } from "../controllers/hint.controller.js";

const hintRoute = express.Router();


hintRoute.post("/hint",getHint);

export default hintRoute;