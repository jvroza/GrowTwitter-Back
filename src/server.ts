import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  FollowersRoutes,
  LikesRoutes,
  TweetsRoutes,
  UsersRoutes,
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    UsersRoutes.bind(),
    TweetsRoutes.bind(),
    LikesRoutes.bind(),
    FollowersRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
