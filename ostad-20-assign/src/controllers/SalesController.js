const SalesModel = require("../models/SalesModel");

exports.readProducts = async (req, res) => {
  try {
    let result = await SalesModel.find({});
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ message: "faild" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await SalesModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ message: "faild" });
  }
};

exports.TotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await SalesModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res
      .status(200)
      .json({ status: "success", totalRevenue: totalRevenue[0].totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.QuantityByProduct = async (req, res) => {
  try {
    let quantitybyProduct = await SalesModel.aggregate([
      { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
    ]);
    res.status(200).json({ status: "success", quantitybyProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.TopProducts = async (req, res) => {
  try {
    let topProduct = await SalesModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({ status: "success", data: topProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.AveragePrice = async (req, res) => {
  try {
    let averagePrice = await SalesModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalProducts: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          averagePrice: { $divide: ["$totalRevenue", "$totalProducts"] },
        },
      },
    ]);
    res
      .status(200)
      .json({ status: "success", averagePrice: averagePrice[0].averagePrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.RevenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await SalesModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.json(revenueByMonth);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.HighestQuantitySold = async (req, res) => {
  try {
    let highestQuantitySold = await SalesModel.aggregate([
      {
        $group: {
          _id: {
            product: "$product",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);
    res.status(200).json({
      status: "success",
      highestQuantitySold: highestQuantitySold[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
