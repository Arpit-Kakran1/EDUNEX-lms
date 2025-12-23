import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.send("Hello this server is running this is lms project")
})
app.listen(process.env.PORT, () => {
  console.log("Server is started at port", process.env.PORT)
  connectDb();
})