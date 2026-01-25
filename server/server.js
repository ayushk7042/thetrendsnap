const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

const dailyAutoUpdateJob = require("./jobs/dailyAutoUpdate.job");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Start cron jobs
dailyAutoUpdateJob();
