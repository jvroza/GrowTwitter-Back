import { Request, Response } from "express";

import { BcryptAdapter } from "../adapters";
import {
  UserService,
  AuthService,
  TweetService,
  FollowService,
  LikeService,
} from "../services";
import { onError } from "../utils";

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { name, username, password, imageUrl } = req.body;

      const service = new AuthService(
        new UserService(
          new TweetService(new LikeService()),
          new FollowService(),
        ),
        new BcryptAdapter(),
      );

      const result = await service.register({
        name,
        username,
        password,
        imageUrl,
      });

      res.status(201).json({
        success: true,
        message: "Registration completed successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const service = new AuthService(
        new UserService(
          new TweetService(new LikeService()),
          new FollowService(),
        ),
        new BcryptAdapter(),
      );

      const result = await service.login({ username, password });

      res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
