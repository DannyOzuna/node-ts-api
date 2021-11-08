import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import IndexRoutes from "../src/routes/Index.routes";
import PostsRoutes from "../src/routes/Posts.routes";

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    //Database connection
    const MONGO_URI = "mongodb://localhost/resapits";
    mongoose
      .connect(MONGO_URI || process.env.MONGODB_URL)
      .catch((error) => console.error(error))
      .then((db) => console.log("DB is connected"));

    //Settings
    this.app.set("port", process.env.PORT || 3000);

    //Middleware
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use(IndexRoutes);
    this.app.use("/api/posts", PostsRoutes);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
