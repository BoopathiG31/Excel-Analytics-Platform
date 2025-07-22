import dotenv from "dotenv";
dotenv.config();

import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import uploadRoute from "./routes/upload.route.js"
import statsRoute from "./routes/stats.route.js"
import aiInsightRoute from "./routes/ai.route.js"
import historyRoute from "./routes/history.route.js"

import connectDB from "./db/connectDB.js";

const app = express();

app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true 
})); 

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/excelrecord", uploadRoute);
app.use("/api/stats", statsRoute);
app.use("/api/excel", aiInsightRoute);
app.use("/api/history", historyRoute);
app.use("/uploads", express.static('uploads'));
 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB();
})