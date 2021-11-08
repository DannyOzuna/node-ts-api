import { Router } from "express";
import { postController } from "../controllers/Post.controller";

class PostsRoutes {
  router = Router();
  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", postController.getPosts);
    this.router.get("/:url", postController.getPost);
    this.router.post("/", postController.createPost);
    this.router.put("/:url", postController.updatePost);
    this.router.delete("/:url", postController.deletePost);
  }
}

const postsRoutes = new PostsRoutes();
export default postsRoutes.router;
