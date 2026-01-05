import express from 'express';
import { login, logout, resetPassword, sendOTP, signUp, verifyOtp } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/sendOtp", sendOTP);
authRouter.post("/verifyOtp",verifyOtp)
authRouter.post("/resetPassword", resetPassword);

export default authRouter;