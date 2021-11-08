import { Request, Response } from "express";
import Post from "../models/Post.model";

class PostController {
  async getPosts(req: Request, res: Response) {
    const posts = await Post.find();
    res.json(posts);
  }

  public async getPost(req: Request, res: Response) {
    const post = await Post.findOne({ url: req.params.url });
    res.json(post);
  }

  public async createPost(req: Request, res: Response) {
    const { title, url, content, image } = req.body;
    const newPost = new Post({ title, url, content, image });
    await newPost.save();
    res.json({ data: newPost });
  }

  public async updatePost(req: Request, res: Response) {
    const { url } = req.params;
    const post = await Post.findOneAndUpdate({ url }, req.body, { new: true }); //El new: true es para que me devuelva el objecto nuevo
    res.json(post);
  }

  public async deletePost(req: Request, res: Response) {
    const { url } = req.params;
    await Post.findOneAndDelete({ url });
    res.json({ response: "Post Deleted Successfully" });
  }
}

export const postController = new PostController();
