import { Response, Request, NextFunction } from "express";
import {
  existsOrError,
  notExistsOrError,
  equalsOrError
} from "../validations/validations";
import db from "../database/postgres/db";
import { Category } from "models/category";

class CategoryController {
  constructor() {}

  save = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let category: Category = {
      id: req.body.id,
      name: req.body.name,
      parentId: req.body.parentId
    }

    if (req.params.id) category.id = req.params.id;

    try {
      existsOrError(category.name, "Nome não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (category.id) {
      db("categories")
        .update(category)
        .where({ id: category.id })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      db("categories")
        .insert(category)
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
      existsOrError(id, "Código da categoria não informado");

      const subcategory = await db("categories").where({ parentId: id });
      notExistsOrError(subcategory, "Categoria possui subcategorias");

      const articles = await db("articles").where({ categoryId: id });
      notExistsOrError(articles, "Categoria possui artigos");

      const rowsDeleted = await db("categories")
        .where({ id: id })
        .del();
      existsOrError(rowsDeleted, "Categoria não foi encontrada");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return db("categories")
      .then(categories => res.json(this.withPath(categories)))
      .catch(err => res.status(500).send(err));
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let { id } = req.params;
    return db("categories")
      .where({ id: id })
      .then(categories => res.json(this.withPath(categories)))
      .catch(err => res.status(500).send(err));
  };

  getTree = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return db("categories")
      .then(categories => res.json(this.toTree(this.withPath(categories))))
      .catch(err => res.status(500).send(err));
  };

  //utils
  private withPath = (categories: Category[]) => {
    const getParent = (categories: Category[], parentId: number) => {
      const parent = categories.filter(p => p.id === parentId);
      return parent.length ? parent[0] : null;
    };

    const categoriesWithPath = categories.map(category => {
      let path = category.name;
      let parent = getParent(categories, category.parentId);

      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parentId);
      }
      return { ...category, path };
    });

    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    return categoriesWithPath;
  };

  private toTree = (categories: Category[], tree?: Category[]) => {
    if (!tree) tree = categories.filter(c => !c.parentId);
    tree = tree.map((parentNode: any) => {
      const isChild = (node: Category) => node.parentId == parentNode.id;
      parentNode.children = this.toTree(categories, categories.filter(isChild));
      return parentNode;
    });

    return tree;
  };
}

export default new CategoryController();
