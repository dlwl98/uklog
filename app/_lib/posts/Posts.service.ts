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

    const oldPost = await Post.findById(id);
    if (!oldPost) {
      throw new Error(`cannot find post-id: ${id}`);
    }

    const newPost = {
      title: title || oldPost.title,
      content: content || oldPost.content,
      spoiler: spoiler || oldPost.spoiler,
      isPrivate: isPrivate,
      tags: tags || oldPost.tags,
    };
    return Post.findByIdAndUpdate(id, newPost).lean().exec();
  }

  static async createLike(postId: string, liked: string) {
    await connectDB();

    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      throw new Error(`cannot find post-id: ${postId}`);
    }

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

    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      throw new Error(`cannot find post-id: ${postId}`);
    }

    return Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: liked } },
      { new: true },
    )
      .lean()
      .exec();
  }
}
