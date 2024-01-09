const database = "SalesAnalytics";

// Create a new database.
use(database);

// // Create a new collection.
db.createCollection("sales");

// db.sales.find({}).count("total");
/*
db.sales.insertMany([
  { product: "watch", quantity: 5, price: 200, date: new Date() },
  { product: "mobile", quantity: 1, price: 300, date: new Date() },
  { product: "laptop", quantity: 2, price: 400, date: new Date() },
  { product: "TV", quantity: 1, price: 70, date: new Date() },
  { product: "Fan", quantity: 3, price: 200, date: new Date() },
  { product: "Desktop", quantity: 2, price: 400, date: new Date() },
  { product: "watch", quantity: 4, price: 400, date: new Date() },
  { product: "mobile", quantity: 3, price: 600, date: new Date() },
  { product: "laptop", quantity: 1, price: 700, date: new Date() },
  { product: "TV", quantity: 2, price: 400, date: new Date() },
  { product: "Fan", quantity: 3, price: 400, date: new Date() },
  { product: "Desktop", quantity: 2, price: 2000, date: new Date() },
  { product: "Thermometer", quantity: 2, price: 30, date: new Date() },
  { product: "Face-wash", quantity: 20, price: 300, date: new Date() },
]);
*/
// db.sales.insertOne({
//   product: "Face-wash",
//   quantity: 20,
//   price: 300,
//   date: new Date(),
// });

db.sales.aggregate([
  {
    $group: {
      _id: { year: { $year: "$date" }, month: { $month: "$date" } },
      totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
    },
  },
]);
