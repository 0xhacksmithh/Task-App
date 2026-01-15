import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    type: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const userModel = mongoose.model("User", UserSchema);
