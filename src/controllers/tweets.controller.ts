import { Request, Response } from "express";

import { TweetService, LikeService } from "../services";
import { onError } from "../utils";

export class TweetsController {
  public async createTweet(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { content } = req.body;

      const service = new TweetService(new LikeService());

      const result = await service.createTweet({
        authorId,
        content,
      });

      res.status(201).json({
        success: true,
        message: "Tweet created successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async createReply(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { content, replyTo } = req.body;

      const service = new TweetService(new LikeService());

      const result = await service.createReply({ authorId, content, replyTo });

      res.status(201).json({
        success: true,
        message: "Reply published successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async findTweet(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = new TweetService(new LikeService());

      const result = await service.findTweet({
        tweetId: id,
      });

      res.status(200).json({
        success: true,
        message: "Record found successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async updateTweet(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { id } = req.params;
      const { content } = req.body;

      const service = new TweetService(new LikeService());

      const result = await service.updateTweet({
        authorId,
        tweetId: id,
        content,
      });

      res.status(200).json({
        success: true,
        message: "Record updated successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deleteTweet(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { id } = req.params;

      const service = new TweetService(new LikeService());

      const result = await service.deleteTweet({
        authorId,
        tweetId: id,
      });

      res.status(200).json({
        success: true,
        message: "Record deleted successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async listTweetsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const service = new TweetService(new LikeService());

      const result = await service.listTweetsByUserId(userId);

      res.status(200).json({
        success: true,
        message: "Records listed successfully.",
        data: result.map((t) => t.toJSON()),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async feed(req: Request, res: Response) {
    try {
      const { id } = req.user;

      const service = new TweetService(new LikeService());

      const result = await service.feed(id);

      res.status(200).json({
        success: true,
        message: "Records listed successfully.",
        data: result.map((t) => t.toJSON()),
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
