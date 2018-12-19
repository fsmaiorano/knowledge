import { authSecret } from "../../config/auth";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../../database/postgres/db";
import { User } from "models/user";

class Passport {
  private secretOrKey: string;
  private jwtFromRequest: any;

  constructor() {
    this.secretOrKey = authSecret;
    this.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  }

  authenticate = () => {
    const strategy = new Strategy(
      {
        secretOrKey: this.secretOrKey,
        jwtFromRequest: this.jwtFromRequest
      },
      (payload, done) => {
        db("users")
          .where({ id: payload.id })
          .first()
          .then((user: User) => {
            done(null, user ? { ...payload } : false);
          })
          .catch(err => done(err, false));
      }
    );

    passport.use(strategy);

    return passport.authenticate("jwt", { session: false });
  };
}

export default new Passport();
