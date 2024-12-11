// 出现 db connection errors时，可能是mongoDB没有同步上本机现在的IP地址，去官网添加即可

const { config } = require("dotenv");
const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  } catch (error) {
    console.log("db connection errors");
  }
};

module.exports = { db };
