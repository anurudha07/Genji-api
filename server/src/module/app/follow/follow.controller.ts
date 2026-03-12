import { AuthRequest } from "../../../type/v1.type";
import { Response } from "express";
import { sendFollowRequestService } from "./follow.service";


//  send follow request

export const sendFollowRequest = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const fromUserId = req.userId as string;
    const { targetUserId } = req.params;
 
    const request = await sendFollowRequestService(fromUserId, targetUserId as string);
 
    res.status(201).json({ 
        success: true, 
        message: "Follow request sent successfully", 
        request 
    });
  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
        success: false, 
        message: `Failed to send request. ${errorMessage}`
    });

  }
};



//  respond to follow request 

export const respondToFollowRequest = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const currentUserId = req.userId as string;
    const { targetUserId } = req.params;
    const { action } = req.body; // "accept" or "decline"
 
    if (action !== "accept" && action !== "decline") {
      res.status(400).json({ 
        success: false, 
        message: "Action must be 'accept' or 'decline'" 
      });
      return;
    }
 
    const request = await respondToFollowRequestService(currentUserId, targetUserId, action);
 
    res.status(200).json({
      success: true,
      message: action === "accept" ? "Follow request accepted" : "Follow request declined",
      request,
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to respond to request. ${errorMessage}` 
    });

  }
};