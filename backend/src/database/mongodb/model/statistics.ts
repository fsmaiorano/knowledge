import mongoose from "mongoose";

const statistics = new mongoose.Schema({
  users: Number,
  categories: Number,
  articles: Number,
  createdAt: Date
});

export interface IStatistics {
  users: Number;
  categories: Number;
  articles: Number;
  createdAt: Date;
}

export default mongoose.model("Statistics", statistics);
