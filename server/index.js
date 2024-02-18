const express = require("express");
const app = express();
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoute");
dotenv.config();
connectDB();

app.use("/api/product", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is lisitng on PORT ${port}`);
});
