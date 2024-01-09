const express = require("express");

const {
  TotalRevenue,
  QuantityByProduct,
  TopProducts,
  AveragePrice,
  RevenueByMonth,
  HighestQuantitySold,
  createProduct,
  readProducts,
} = require("../controllers/SalesController");
const {
  expense,
  createExpense,
  DepartmentSalaryExpense,
} = require("../controllers/ExpenseController");
const router = express.Router();

//Api endpoint:
router.get("/products", readProducts);

router.post("/createProduct", createProduct);

//revenue-calculation api

router.get("/total-revenue", TotalRevenue);
router.get("/quantity-by-product", QuantityByProduct);
router.get("/top-products", TopProducts);
router.get("/average-price", AveragePrice);
router.get("/revenue-by-month", RevenueByMonth);
router.get("/highest-quantity-sold", HighestQuantitySold);

//expense Api
router.get("/expense", expense);
router.post("/createExpense", createExpense);
router.get("/department-salary-expense", DepartmentSalaryExpense);

module.exports = router;
