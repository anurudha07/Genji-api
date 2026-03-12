import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  sendFollowRequest,
  respondToFollowRequest,
  withdrawFollowRequest,
  unfollowUser,
  removeFollower,
  getPendingRequests,
  getFollowersList,
  getFollowingList,
  getFollowCounts,
} from "./follow.controller";

const followRouter = Router();


// get pending follow requests sent to me from others
followRouter.get("/pending-requests", userAuth, getPendingRequests);

// get my followers list
followRouter.get("/followers-list", userAuth, getFollowersList);

// get list of users I follow
followRouter.get("/following-list", userAuth, getFollowingList);

// get follower and following counts for user
followRouter.get("/counts/:userId", userAuth, getFollowCounts);

// send a follow request to another user
followRouter.post("/request/:targetUserId", userAuth, sendFollowRequest);

// accept or decline a follow request received from another user
followRouter.post("/response/:targetUserId", userAuth, respondToFollowRequest);

// cancel a follow request I previously sent
followRouter.patch("/withdrawal/:targetUserId", userAuth, withdrawFollowRequest);

// remove someone from my followers list — must be before /:targetUserId
followRouter.delete("/remove/:targetUserId", userAuth, removeFollower);

// unfollow a user I currently follow — must be last among delete routes
followRouter.delete("/:targetUserId", userAuth, unfollowUser);

export default followRouter;