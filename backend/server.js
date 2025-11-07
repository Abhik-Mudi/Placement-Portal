import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken"

import dbConnect from "./db/dbConnect.js";

import jobRouter from "./routes/jobs.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(passport.initialize())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to placement API' });
});

app.use('/api/auth', authRouter)
app.use('/api/job', jobRouter);

app.listen(PORT, ()=>{
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
})