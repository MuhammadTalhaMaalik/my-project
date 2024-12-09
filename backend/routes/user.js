const express = require("express");
const User = require("../models/User");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const { logActivity } = require("./activity");

const router = express.Router();

// Get all users (Admin Only)
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new user
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Log activity
    await logActivity(req.user.id, `Created user ${email}`);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    // Log activity
    await logActivity(req.user.id, `Deleted user with ID ${req.params.id}`);

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;