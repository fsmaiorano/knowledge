import { Response, Request, NextFunction } from "express";
import Statistics from "../database/mongodb/model/statistics";

class StatisticsController {
  constructor() {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    Statistics.findOne({}, {}, { sort: { createdAt: -1 } }).then(stat =>
      res.json(stat || "Sem estatísticas")
    );
  };
}

export default new StatisticsController();
