import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.types";
import { ABOUT, FOOD_TYPES, GENDERS, INTERESTS, LOOKING_FOR, PRONOUNS, SEXUAL_ORIENTATIONS, SKIN_TONES, STAR_SIGNS } from "../../../constants/constants";

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
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      enum: GENDERS
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
      type: [String],
      enum: ABOUT,
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 12,
        message: "Maximum 12 about tags are allowed",
      },
    },
    foodType: {
      type: String,
      default: "",
      enum: FOOD_TYPES,
    },
    skinTone: {
      type: String,
      default: "",
      enum: SKIN_TONES,
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
    lookingFor: {
      type: [String],
      enum: LOOKING_FOR,
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 2,
        message: "Max 2 looking for",
      },
    },
    starSign: {
      type: String,
      default: "",
      enum: STAR_SIGNS
    },
    pronouns: {
      type: String,
      default: "",
      enum: PRONOUNS,
    },
    sexualOrientation: {
      type: String,
      default: "",
      enum: SEXUAL_ORIENTATIONS
    },
    interestedIn: {
      type: [String],
      enum: GENDERS,
      default: [],
    },
    photos: {
      type: [String],
      default: [],
      validate: { validator: (arr: string[]) => arr.length <= 4, message: "Max 4 photos" },
    },           // max 4 
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
    },
    bio: {
      type: String,
      default: "",
      maxlength: 120
    },

    interests: {
      type: [String],
      enum: INTERESTS,
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 5,
        message: "Max 5 interests allowed",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);