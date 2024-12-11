const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(income);
  // 最开始只有下面这行，当postman发出post请求时，terminal会显示该request.body
  //console.log(req.body);
};

exports.getIncomes = async (req, res) => {
  try {
    // .sort({ createdAt: -1 })是要求按照createAt时间倒序排列，也就是最晚最新添加者排最前
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
