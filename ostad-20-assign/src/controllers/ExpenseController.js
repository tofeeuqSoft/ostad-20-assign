const ExpenseModel = require("../models/ExpenseModel");

exports.expense = async (req, res) => {
  try {
    let result = await ExpenseModel.find({});
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await ExpenseModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.DepartmentSalaryExpense = async (req, res) => {
  try {
    let departmentWiseExpense = await ExpenseModel.aggregate([
      { $group: { _id: "$department", totalSalary: { $sum: "$salary" } } },
    ]);
    res.status(200).json({ status: "success", data: departmentWiseExpense });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
