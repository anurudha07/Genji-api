import mongoose, { Schema } from "mongoose";
import { IFollow } from "./follow.types";

const followSchema = new Schema<IFollow>(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// one user can only have one follow relationship with another user at a time
// in order to prevent duplicacy
followSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export default mongoose.model<IFollow>("Follow", followSchema);