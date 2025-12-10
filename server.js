const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

// MongoDB Connection
const connectDB = require("./config/mongo");
connectDB(); // connect to MongoDB

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const mainRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");

app.use("/", mainRoutes);
app.use("/admin", adminRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).render("index", { title: "404 Not Found" });
});

// PORT for Vercel or Localhost
const port = process.env.PORT || 3000;

// Start server (needed for localhost only)
if (process.env.VERCEL === "1") {
    module.exports = app;    // Vercel uses exported app
} else {
    app.listen(port, () => console.log("Server running on port", port));
}
