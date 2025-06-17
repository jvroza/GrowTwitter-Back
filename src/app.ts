import express from "express";

class App {
  public app: express.Application;
  public port: number;

  constructor(routers: express.Router[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(routers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(routers: express.Router[]) {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
