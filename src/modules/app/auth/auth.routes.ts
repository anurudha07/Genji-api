import { Router } from "express";
import { googleLogin, sendOtp, verifyOtp } from "./auth.controller";


const authRouter = Router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/google", googleLogin);

export default authRouter;