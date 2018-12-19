import { Response, Request, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(402).send("Usuário não é administrador");
  }
};
