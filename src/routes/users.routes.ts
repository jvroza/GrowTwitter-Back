import express from "express";
import { param } from "express-validator";

import { UsersController } from "../controllers";
import { authMiddleware, dataValidation } from "../middlewares";

export class UsersRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new UsersController();

    router.get("/users", controller.index);

    router.get(
      "/users/:userId",
      authMiddleware,
      dataValidation([param("userId").isUUID()]),
      controller.getById,
    );

    return router;
  }
}
