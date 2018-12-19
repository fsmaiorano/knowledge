import { Router } from "express";
import {
  UserController,
  CategoryController,
  ArticleController,
  AuthenticationController,
  StatisticsController
} from "../../api";
import passport from "../middlewares/passport";

import { isAdmin } from "../middlewares/middlewares";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public init() {
    //Auth
    this.router.post("/signup", UserController.save);
    this.router.post("/signin", AuthenticationController.signin);
    this.router.post("/validateToken", AuthenticationController.validateToken);

    this.router.use(passport.authenticate());

    //Users
    this.router.post("/users", isAdmin, UserController.save);
    this.router.get("/users", isAdmin, UserController.get);

    this.router.delete("/users/:id", isAdmin, UserController.remove);
    this.router.put("/users/:id", isAdmin, UserController.save);
    this.router.get("/users/:id", isAdmin, UserController.getById);

    //Categories
    this.router.get("/categories", isAdmin, CategoryController.get);
    this.router.post("/categories", isAdmin, CategoryController.save);

    this.router.get("/categories/tree", CategoryController.getTree);

    this.router.get("/categories/:id", CategoryController.getById);
    this.router.put("/categories/:id", isAdmin, CategoryController.save);
    this.router.delete("/categories/:id", isAdmin, CategoryController.remove);

    //Articles
    this.router.get("/articles", ArticleController.get);
    this.router.post("/articles", isAdmin, ArticleController.save);

    this.router.get("/articles/:id", ArticleController.getById);
    this.router.put("/articles/:id", isAdmin, ArticleController.save);
    this.router.delete("/articles/:id", isAdmin, ArticleController.remove);

    this.router.get(
      "/categories/:id/articles",
      ArticleController.getByCategory
    );

    //Statistics
    this.router.get("/stats", isAdmin, StatisticsController.get);
  }
}

export default new Routes().router;
