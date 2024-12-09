
module.exports = router;
const express = require("express");
const router = express.Router();

// Send bulk notifications
router.post("/send", (req, res) => {
  const { message, recipients } = req.body;

  // Example: Send notifications via email or push
  console.log(`Sending message: "${message}" to recipients: ${recipients}`);
  res.json({ message: "Notifications sent" });
});

module.exports = router;