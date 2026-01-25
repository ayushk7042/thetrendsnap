const express = require("express");
const cors = require("cors");

const app = express();
const errorHandler = require("./middlewares/error.middleware");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/homepage", require("./routes/homepage.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

app.use("/api/auto-news", require("./routes/autoNews.routes"));
// Error handler (LAST)
app.use(errorHandler);

module.exports = app;
