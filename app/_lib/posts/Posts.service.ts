import connectDB from '../connect-db';
import { Post } from './Post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostsService {
  static async getPosts() {
    await connectDB();
    return Post.find().lean().exec();
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
  }: CreatePostDto) {
    await connectDB();
    return Post.create({ title, content, spoiler, isPrivate, tags });
  }

  static async deletePost(id: string) {
    await connectDB();
    return Post.findByIdAndDelete(id);
  }

  static async updatePost(
    id: string,
    { title, content, spoiler, isPrivate, tags }: UpdatePostDto,
  ) {
    await connectDB();

    return Post.findByIdAndUpdate(id, {
      title,
      content,
      spoiler,
      isPrivate,
      tags,
    })
      .lean()
      .exec();
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
