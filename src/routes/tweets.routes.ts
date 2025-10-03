import express from "express";
import { body, param } from "express-validator";

import { TweetsController } from "../controllers";
import { authMiddleware, dataValidation } from "../middlewares";

export class TweetsRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new TweetsController();

    router.post(
      "/tweets",
      authMiddleware,
      dataValidation([body("content").isString().isLength({ min: 1 })]),
      controller.createTweet,
    );

    router.post(
      "/replies",
      authMiddleware,
      dataValidation([
        body("content").isString().isLength({ min: 1 }),
        body("replyTo").isString().isUUID(),
      ]),
      controller.createReply,
    );

    router.get(
      "/tweets/:id",
      authMiddleware,
      dataValidation([param("id").isUUID()]),
      controller.findTweet,
    );

    router.put(
      "/tweets/:id",
      authMiddleware,
      dataValidation([
        param("id").isUUID(),
        body("content").isString().isLength({ min: 1 }),
      ]),
      controller.updateTweet,
    );

    router.delete(
      "/tweets/:id",
      authMiddleware,
      dataValidation([param("id").isUUID()]),
      controller.deleteTweet,
    );

    router.get(
      "/users/:userId/tweets",
      authMiddleware,
      dataValidation([param("userId").isUUID()]),
      controller.listTweetsByUserId,
    );

    router.get("/feed", authMiddleware, controller.feed);

    return router;
  }
}
