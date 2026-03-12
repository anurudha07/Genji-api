import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  respondToFollowRequest,
  sendFollowRequest,

} from "./follow.controller";

const followRouter = Router();



// send a follow request to another user
followRouter.post("/request/:targetUserId", userAuth, sendFollowRequest);

// accept or decline a follow request received from another user
followRouter.post("/response/:targetUserId", userAuth, respondToFollowRequest);



export default followRouter;