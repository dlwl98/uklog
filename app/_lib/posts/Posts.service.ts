import { cache } from 'react';
import connectDB from '../connect-db';
import { Post } from './Post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostsService {
  static async getPosts() {
    await connectDB();
    return Post.find().sort({ createdAt: -1 }).lean().exec();
  }

  static getPostById = cache(async (id: string) => {
    await connectDB();
    return Post.findById(id).lean().exec();
  });

  static async createPost({
    title,
    content,
    isPrivate,
    spoiler,
    tags = [],
    createdAt,
  }: CreatePostDto) {
    await connectDB();
    const postData: Record<string, unknown> = {
      title,
      content,
      spoiler,
      isPrivate,
      tags,
      createdAt: createdAt ?? new Date(),
    };
    return Post.create(postData);
  }

  static async deletePost(id: string) {
    await connectDB();
    return Post.findByIdAndDelete(id);
  }

  static async updatePost(
    id: string,
    { title, content, spoiler, isPrivate, tags, createdAt }: UpdatePostDto,
  ) {
    await connectDB();

    const post = await Post.findById(id);
    if (!post) return null;

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.spoiler = spoiler ?? post.spoiler;
    post.isPrivate = isPrivate ?? post.isPrivate;
    post.tags = tags ?? post.tags;
    if (createdAt) {
      post.createdAt = createdAt;
    }

    await post.save({ timestamps: !createdAt });
    return post.toObject();
  }

  static async createLike(postId: string, liked: string) {
    await connectDB();

    return Post.findByIdAndUpdate(
      postId,
      { $push: { likes: liked } },
      { new: true },
    )
      .lean()
      .exec();
  }

  static async deleteLike(postId: string, liked: string) {
    await connectDB();

    return Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: liked } },
      { new: true },
    )
      .lean()
      .exec();
  }
}
