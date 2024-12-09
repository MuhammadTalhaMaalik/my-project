const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Generate sales report
router.get("/sales", async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $group: { _id: "$productId", totalSales: { $sum: "$amount" } } },
    ]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;