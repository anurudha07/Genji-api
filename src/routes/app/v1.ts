import { Router } from "express";
import authRouter from "../../modules/app/auth/auth.routes";


const router = Router();

router.use('/auth',authRouter)
export default router;