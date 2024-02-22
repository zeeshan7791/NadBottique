const express = require("express");
const app = express();
const connectDB = require("./config/database");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is lisitng on PORT ${port}`);
});
