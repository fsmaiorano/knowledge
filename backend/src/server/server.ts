import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";
import MongoDb from "../database/mongodb/mongodb";
import Scheduler from "../scheduler/scheduler";

class Server {
  private app!: express.Application;
  private port!: string | number;
  public static readonly PORT: number = 3000;

  constructor() {
    this.config();
    this.mongodb();
    this.scheduler();
    this.middlewares();
    this.routes();
    this.listen();
  }

  private config(): void {
    this.app = express();
    this.port = process.env.PORT || Server.PORT;
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(bodyParser());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use("/", routes);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server online at port: ${this.port}`);
    });
  }

  private mongodb(): void {
    MongoDb.init();
  }

  private scheduler(): void {
    Scheduler.init();
  }

  public start(): express.Application {
    return this.app;
  }
}

export default new Server();
