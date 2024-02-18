const express = require("express");
const app = express();
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is lisitng on PORT ${port}`);
});
