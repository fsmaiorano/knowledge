import mongoose from "mongoose";
class MongoDb {
  constructor() {}

  public init() {
    mongoose
      .connect(
        `mongodb://localhost/knowledge_stats`,
        { useNewUrlParser: true }
      )
      .catch(e => {
        const msg = "ERRO ao conectar com o mongodb";
        console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
      });
  }
}

export default new MongoDb();
