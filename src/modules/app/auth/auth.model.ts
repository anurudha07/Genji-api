import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    phone: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    email: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    name: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);