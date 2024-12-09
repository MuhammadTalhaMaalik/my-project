const express = require("express");
const GlobalSettings = require("../models/GlobalSettings");

const router = express.Router();

// Get global settings
router.get("/", async (req, res) => {
  const settings = await GlobalSettings.findOne();
  res.json(settings);
});

// Update global settings
router.put("/", async (req, res) => {
  const { taxRate, currency, shippingPolicy } = req.body;

  try {
    let settings = await GlobalSettings.findOne();
    if (!settings) {
      settings = new GlobalSettings({ taxRate, currency, shippingPolicy });
    } else {
      settings.taxRate = taxRate;
      settings.currency = currency;
      settings.shippingPolicy = shippingPolicy;
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;