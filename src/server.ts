import App from "./app";
import { envs } from "./envs";
import { AuthRoutes, UsersRoutes } from "./routes";

const app = new App([AuthRoutes.bind(), UsersRoutes.bind()], envs.PORT);

app.listen();
