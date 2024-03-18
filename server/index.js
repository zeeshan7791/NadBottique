const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.listen(port, () => {
  console.log(`server is lisitng on PORT ${port}`);
});
