import { Response, Request, NextFunction } from "express";
import bcrypt = require("bcryptjs");
import {
  existsOrError,
  notExistsOrError,
  equalsOrError
} from "../validations/validations";
import { User } from "models/user";
import db from "../database/postgres/db";

class UserController {
  constructor() {}

  save = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let user: User = req.body;

    if (req.params.id) user.id = req.params.id;

    //Administrators can be created only with a logged user (+token)
    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (!req.user || !req.user.admin) user.admin = false;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirma Senha não informada");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      const userFromDb = await db("users")
        .where({ email: user.email })
        .first();

      if (!user.id) {
        notExistsOrError(userFromDb, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = await this.encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      return db("users")
        .update(user)
        .where({ id: user.id })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      return db("users")
        .insert(user)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return db("users")
      .select("id", "name", "password", "email", "admin")
      .whereNull("deletedAt")
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err));
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let { id } = req.params;

    return db("users")
      .select("id", "name", "password", "email", "admin")
      .whereNull("deletedAt")
      .where({ id: id })
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err));
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      let { id } = req.params;
      const articles = await db("articles").where({ userId: id });

      notExistsOrError(articles, "Usuário possui artigos");

      const rowsUpdated = await db("users")
        .update({ deletedAt: new Date() })
        .where({ id: id });

      existsOrError(rowsUpdated, "Usuário não foi encontrado");
      return res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  async encryptPassword(password: any) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}

export default new UserController();
