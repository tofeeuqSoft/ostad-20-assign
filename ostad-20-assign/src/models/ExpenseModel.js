const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    department: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

const ExpenseModel = mongoose.model("employees", DataSchema);

module.exports = ExpenseModel;
