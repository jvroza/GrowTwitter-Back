import express from "express";

import { UsersController } from "../controllers";

export class UsersRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new UsersController();

    router.post("/users", controller.index);
    router.post("/users", controller.getById);

    return router;
  }
}
