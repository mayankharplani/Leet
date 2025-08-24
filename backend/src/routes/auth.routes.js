import express from "express"
import { check, googleAuthFail, googleAuthSuccess, login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";

const authRoutes = express.Router();

authRoutes.post("/register",register)

authRoutes.post("/login",login)

authRoutes.post("/logout",authMiddleware,logout)

authRoutes.get("/check",authMiddleware,check)


authRoutes.get("/google",passport.authenticate("google", {scope: ["profile","email"]}))


authRoutes.get("/google/callback",passport.authenticate("google",{
    failureRedirect: "/api/v1/auth/google/failure",
    session: true
}), googleAuthSuccess
)

authRoutes.get("/google/failure", googleAuthFail)



export default authRoutes;