import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.route.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import hintRoute from "./routes/hint.route.js";


dotenv.config();

const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: "http://localhost:5173",
     credentials: true
}));



app.get('/',(req,res) => {
     res.send("Welcome to LeetBox");
})




app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problem",problemRoutes);
app.use("/api/v1/code",executionRoute)
app.use("/api/v1/submission", submissionRoutes)
app.use("/api/v1/playlist", playlistRoutes)

app.use("/api/v1/service", hintRoute)


app.listen(process.env.PORT,() => {
     console.log('server running');  
})