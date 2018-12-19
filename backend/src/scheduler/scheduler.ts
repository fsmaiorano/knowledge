import schedule from "node-schedule";
import db from "../database/postgres/db";
import Statistics, { IStatistics } from "../database/mongodb/model/statistics";
import { Document } from "mongoose";

class Scheduler {
  constructor() {}

  init() {
    //https://www.npmjs.com/package/node-schedule
    schedule.scheduleJob("*/1 * * * *", async () => {
      // 1 in 1 minute.
      const usersCount = await db("users")
        .count("id")
        .first();

      const categoriesCount = await db("categories")
        .count("id")
        .first();

      const articlesCount = await db("articles")
        .count("id")
        .first();

      //   const lastStat: Document = await Statistics.findOne(
      //     {},
      //     {},
      //     { sort: { createdAt: -1 } }
      //   );

      const stat: Document = new Statistics({
        users: usersCount.count,
        categories: categoriesCount.count,
        articles: articlesCount.count,
        createdAt: new Date()
      });

      //   const changeUsers = !lastStat || stat.users !== lastStat.users;
      //   const changeCategories = !lastStat || stat.categories !== lastStat.categories;
      //   const changeArticles = !lastStat || stat.articles !== lastStat.articles;

      //   if(changeUsers || changeCategories || changeArticles) {

      stat.save().then(() => console.log("[stats] Statistics updated"));

      //   }
    });
  }
}

export default new Scheduler();
