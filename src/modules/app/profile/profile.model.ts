import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        unique: true, 
        index: true 
    },

    name: String,
    bio: String,
    gender: String,

    interests: [String],
    lookingFor: String,

    city: String,
    country: String,

    photos: {
      type: [String],
      validate: [(arr: string[]) => arr.length <= 4, 'Max 4 photos'],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);