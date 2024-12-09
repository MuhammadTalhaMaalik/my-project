const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/report");
const notificationRoutes = require("./routes/notification");
const configRoutes = require("./routes/config");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/admin_dashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/notifications", notificationRoutes);
app.use("/config", configRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));