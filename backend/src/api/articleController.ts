import { Response, Request, NextFunction } from "express";
import {
  existsOrError,
  notExistsOrError,
  equalsOrError
} from "../validations/validations";
import { categoryWithChildren } from "../database/postgres/queries";
import db from "../database/postgres/db";
import { Article } from "models/article";

class ArticleController {
  private limit: number = 3;
  constructor() {}

  save = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const article: Article = req.body;

    if (req.params.id) article.id = req.params.id;

    try {
      existsOrError(article.name, "Nome não informado");
      existsOrError(article.description, "Descrição não informada");
      existsOrError(article.categoryId, "Categoria não informada");
      existsOrError(article.userId, "Autor não informado");
      existsOrError(article.content, "Conteúdo não informado");
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (article.id) {
      return db("articles")
        .update(article)
        .where({ id: article.id })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      return db("articles")
        .insert(article)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let { id } = req.params;
    try {
      const rowsDeleted = await db("articles")
        .where({ id: id })
        .del();

      notExistsOrError(rowsDeleted, "Artigo não foi encontrado");
      return res.status(204).send();
    } catch (msg) {
      return res.status(500).send(msg);
    }
  };

  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const page = req.query.page || 1;

    const result = await db("articles")
      .count("id")
      .first();
    const count = parseInt(result.count);

    return db("articles")
      .select("id", "name", "description")
      .limit(this.limit)
      .offset(page * this.limit - this.limit)
      .then(articles =>
        res.json({ data: articles, count: count, limit: this.limit })
      )
      .catch(err => res.status(500).send(err));
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let { id } = req.params;

    const result = await db("articles")
      .count("id")
      .first();
    const count = parseInt(result.count);

    const article: Article = await db("articles")
      .where({ id: id })
      .first()
      .catch(err => res.status(500).send(err));

    if (article) {
      article.content = article.content.toString();
      res.json(article);
    }

    return res.status(500).send();
  };

  getByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let categoryId = req.params.id;
    const page = req.query.page || 1;
    const categories = await db.raw(categoryWithChildren, categoryId);
    const ids = categories.rows.map((c: any) => c.id);

    //join
    return db({ a: "articles", u: "users" })
      .select("a.id", "a.name", "a.description", "a.imageUrl", {
        author: "u.name"
      })
      .limit(this.limit)
      .offset(page * this.limit - this.limit)
      .whereRaw("?? = ??", ["u.id", "a.userId"])
      .whereIn("categoryId", ids)
      .orderBy("a.id", "desc")
      .then(articles => res.json(articles))
      .catch(err => res.status(500).send(err));
  };
}

export default new ArticleController();
