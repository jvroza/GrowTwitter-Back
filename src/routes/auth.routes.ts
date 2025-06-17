import express from "express";

import { AuthController } from "../controllers";

export class AuthRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new AuthController();

    router.post("/auth/login", controller.login);
    router.post("/auth/register", controller.register);

    return router;
  }
}
