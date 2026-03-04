import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  getMyProfile,
  updateProfile,
} from "./profile.controller";

const profileRouter = Router();

// logged in user progile
profileRouter.get("/me", userAuth, getMyProfile);

// create or update profile
profileRouter.put("/me", userAuth, updateProfile);

// someone's full profile, premium locked
profileRouter.put("/:id", userAuth, updateProfile);

// simplified card for explore feed
profileRouter.put("/card/:id", userAuth, updateProfile);


export default profileRouter;