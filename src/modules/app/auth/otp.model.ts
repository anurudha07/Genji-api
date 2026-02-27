import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    phone: { 
        type: String, 
        required: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        required: true 
    },
  },
  { timestamps: true }
);

// auto delete when expiresAt passes
// expireAfterSeconds: 0 -->> delete the document exactly at expiredAt
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Otp", otpSchema);