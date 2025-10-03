import { Request, Response } from "express";

import { FollowService } from "../services";
import { onError } from "../utils";

export class FollowersController {
  public async followUp(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { userId } = req.body;

      const service = new FollowService();

      await service.follow({
        followerId: authorId,
        followingId: userId,
      });

      res.status(201).json({
        success: true,
        message: "Following user successfully.",
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async unfollow(req: Request, res: Response) {
    try {
      const authorId = req.user.id;
      const { userId } = req.body;

      const service = new FollowService();

      await service.unfollow({
        followerId: authorId,
        followingId: userId,
      });

      res.status(200).json({
        success: true,
        message: "Unfollowed user successfully.",
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async getFollowers(req: Request, res: Response) {
    try {
      const authorId = req.user.id;

      const service = new FollowService();

      const result = await service.listFollowings(authorId);

      const data = {
        followers: result.followers.map((f) => f.toJSON()),
        followings: result.followings.map((f) => f.toJSON()),
      };

      res.status(200).json({
        success: true,
        message: "Followers retrieved successfully.",
        data,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
