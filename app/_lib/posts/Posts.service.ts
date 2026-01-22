import connectDB from '../connect-db';
import { Post } from './Post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostsService {
  static async getPosts() {
    await connectDB();
    return Post.find().sort({ createdAt: -1 }).lean().exec();
  }

  static async getPostById(id: string) {
    await connectDB();
    return Post.findById(id).lean().exec();
  }

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
    };
    if (createdAt) {
      postData.createdAt = createdAt;
    }
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

    const updateData: Record<string, unknown> = {
      title,
      content,
      spoiler,
      isPrivate,
      tags,
    };
    if (createdAt) {
      updateData.createdAt = createdAt;
    }

    return Post.findByIdAndUpdate(id, updateData).lean().exec();
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
