const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!amount === "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "The amount must be a positive number" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(expense);
  // 最开始只有下面这行，当postman发出post请求时，terminal会显示该request.body
  //console.log(req.body);
};

exports.getExpenses = async (req, res) => {
  try {
    // .sort({ createdAt: -1 })是要求按照createAt时间倒序排列，也就是最晚最新添加者排最前
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
