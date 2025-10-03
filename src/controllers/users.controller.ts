import { Request, Response } from "express";

import {
  FollowService,
  LikeService,
  TweetService,
  UserService,
} from "../services";
import { onError } from "../utils";

export class UsersController {
  public async index(_: Request, res: Response) {
    try {
      const service = new UserService(
        new TweetService(new LikeService()),
        new FollowService(),
      );

      const result = await service.listAll();

      res.status(200).json({
        success: true,
        message: "Records listed successfully.",
        data: result.map((u) => u.toJSON()),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const service = new UserService(
        new TweetService(new LikeService()),
        new FollowService(),
      );

      const result = await service.getById(userId);

      res.status(200).json({
        success: true,
        message: "Record found successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
