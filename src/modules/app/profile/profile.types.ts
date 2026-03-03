import { Request } from "express";
import mongoose from "mongoose";

export interface UpdateProfileBody {
  name: string;
  gender: string;
  dob: string;
  placeOfBirth?: string;
  height?: number;
  weight?: number;
  city?: string;
  state?: string;
  country?: string;
  currentAddress?: string;
  work?: string;
  occupationDetails?: string;
  about?: string;
  foodType?: string;
  skinTone?: string;
  drinkingHabit?: boolean;
  smokingHabit?: boolean;
  physicallyChallenged?: boolean;
  religion?: string;
  motherTongue?: string;
  isProfileVisibleForAll?: boolean;
  lookingFor?: string;
  starSign?: string;
  pronouns?: string;
  interestedIn?: string[];
  sexualOrientation?: string;

}

export interface UpdateProfileRequest extends Request {
  body: UpdateProfileBody;
  userId?: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}


export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  gender: string;
  dob: Date;
  placeOfBirth: string;
  height: number;
  weight: number;
  city: string;
  state: string;
  country: string;
  currentAddress: string;
  work: string;
  occupationDetails: string;
  about: string;
  foodType: string;
  skinTone: string;
  drinkingHabit: boolean;
  smokingHabit: boolean;
  physicallyChallenged: boolean;
  religion: string;
  motherTongue: string;
  isProfileVisibleForAll: boolean;
  lookingFor: string;
  starSign: string;
  photos: string[];           // max 3 — cloudinary URLs
  premiumPhotos: string[];    // creators only — cloudinary URLs
  profileCompletionPercentage: number;
  pronouns: string;
  sexualOrientation: string;
  interestedIn: string[];
  isCreator: boolean;
}