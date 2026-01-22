import mongoose, { Schema, models } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    spoiler: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    likes: { type: [String], default: [] },
    tags: { type: [String], defualt: [] },
    createdAt: { type: Date },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const Post = models.Post
  ? mongoose.model<typeof postSchema>('Post')
  : mongoose.model('Post', postSchema);
