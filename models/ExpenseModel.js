const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema(
  {
    //mongoose.Schema 是 Mongoose 用来定义数据模式（schema）的工具。
    // 一个模式是对 MongoDB 集合中文档结构的抽象定义，包括字段的名称、类型、默认值、验证规则等。
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
  },
  // 第二个参数 { timestamps: true } 是全局配置选项，影响模式的整体行为。
  // 下文这句话的意思是
  // •	自动添加两个字段到文档中：
  // •	createdAt: 文档创建时间。
  // •	updatedAt: 文档最近更新时间。
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
