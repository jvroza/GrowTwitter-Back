import App from "./app";
import { envs } from "./envs";
import { AuthRoutes, TweetsRoutes, UsersRoutes } from "./routes";

const app = new App(
  [AuthRoutes.bind(), UsersRoutes.bind(), TweetsRoutes.bind()],
  envs.PORT,
);

app.listen();
