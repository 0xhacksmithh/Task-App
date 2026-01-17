import mongoose from "mongoose";

/* ===============================
   Comment Subdocument Schema
================================ */
const commentSchema = new mongoose.Schema(
  {
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // comes from User service
      index: true,
    },

    readerName: {
      type: String,
      required: true, // snapshot to avoid cross-service calls
      trim: true,
    },

    text: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ===============================
   Blog Post Schema
================================ */
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // userId from User microservice
      index: true,
    },

    /* 👍 Likes */
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },

    /* 💬 Comments */
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/* ===============================
   Indexes (Performance)
================================ */
blogPostSchema.index({ authorId: 1, createdAt: -1 });
blogPostSchema.index({ title: "text", description: "text", content: "text" });

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
