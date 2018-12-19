import { Response, Request, NextFunction } from "express";
import { authSecret } from "../config/auth";
import jwt from "jwt-simple";
import bcrypt from "bcryptjs";
import db from "../database/postgres/db";
import { User } from "models/user";

class AuthenticationController {
  signin = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Informe usuário e a senha");

    const user: User = await db("users")
      .where({ email: email })
      .first();

    if (!user) return res.status(400).send("Usuário não encontrado");

    const isMatch = await bcrypt.compareSync(
      password.toString(),
      user.password
    );

    if (!isMatch) return res.status(401).send("Email/Senha inválidos");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now,
      exp: now + 60 * 60 * 24 * 3 //3dias
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    });
  };

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const userData: User = req.body || null;
    try {
      if (userData) {
      }
      const token: any = jwt.decode(userData.token, authSecret);
      if (new Date(token.exp * 1000) > new Date()) {
        return res.send(true);
      }
    } catch (e) {}
    res.send(false);
  };
}

export default new AuthenticationController();
