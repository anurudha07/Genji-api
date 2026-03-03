import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.types";

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: [
        "male",
        "female",
        "trans man",
        "trans woman",
        "non-binary",
        "genderqueer",
        "genderfluid",
        "agender",
        "queer",
        "other",
      ],
    },
    dob: {
      type: Date,
      required: true
    },
    placeOfBirth: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },        // cm
    weight: {
      type: Number,
      default: 0
    },        // kg
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    currentAddress: {
      type: String,
      default: ""
    },
    work: {
      type: String,
      default: ""
    },
    occupationDetails: {
      type: String,
      default: ""
    },
    about: {
      type: String,
      default: ""
    },
    foodType: {
      type: String,
      default: "",
      enum: ["", "vegetarian", "non-vegetarian", "vegan", "eggetarian"],
    },
    skinTone: {
      type: String,
      default: "",
      enum: ["", "fair", "wheatish", "dusky", "dark"],
    },
    drinkingHabit: {
      type: Boolean,
      default: false
    },
    smokingHabit: {
      type: Boolean,
      default: false
    },
    physicallyChallenged: {
      type: Boolean,
      default: false
    },
    religion: {
      type: String,
      default: ""
    },
    motherTongue: {
      type: String,
      default: ""
    },
    isProfileVisibleForAll: {
      type: Boolean,
      default: true
    },
    lookingFor: {
      type: String,
      default: "",
      enum: [
        "",
        "friendship",
        "dating",
        "long-term relationship",
        "casual",
        "networking",
        "other",
      ],
    },
    starSign: {
      type: String,
      default: "",
      enum: [
        "",
        "aries", "taurus", "gemini", "cancer",
        "leo", "virgo", "libra", "scorpio",
        "sagittarius", "capricorn", "aquarius", "pisces",
      ],
    },
    pronouns: {
      type: String,
      default: "",
      enum: ["", "he/him", "she/her", "they/them", "he/they", "she/they", "any", "other"],
    },
    sexualOrientation: {
      type: String,
      default: "",
      enum: ["", "gay", "lesbian", "bisexual", "pansexual", "asexual", "queer", "straight", "other"],
    },
    interestedIn: {
      type: [String],
      default: [],
    },
    photos: { 
      type: [String], 
      default: [] 
    },           // max 3
    premiumPhotos: { 
      type: [String], 
      default: [] 
    },
    profileCompletionPercentage: { 
      type: Number, 
      default: 0 
    },
    isCreator: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);