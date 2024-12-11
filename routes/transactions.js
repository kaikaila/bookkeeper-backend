const { Router } = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.send("hello world from transaction router");
// });
// addIncome comes from controller
// user reach endpoint '/add-in' will trigger a post
router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpenses)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
