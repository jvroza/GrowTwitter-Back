import { Request, Response } from "express";

import { LikeService } from "../services";
import { onError } from "../utils";

export class LikesController {
  public async like(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { tweetId } = req.body;

      const service = new LikeService();

      await service.createLike({
        authorId,
        tweetId,
      });

      res.status(201).json({
        success: true,
        message: "Tweet has liked.",
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async dislike(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { tweetId } = req.body;

      const service = new LikeService();

      await service.removeLike({
        authorId,
        tweetId,
      });

      res.status(200).json({
        success: true,
        message: "Like in tweet has removed.",
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
