const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/database");

const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute");
const paymentRoutes = require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.token;
//   if (cookie === undefined) {
//     // no: set a new cookie
//     var randomNumber = Math.random().toString();
//     randomNumber = randomNumber.substring(2, randomNumber.length);

//     res.cookie("token", randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log("cookie created successfully");
//   } else {
//     // yes, cookie was already present
//     console.log("cookie exists", cookie);
//   }
//   next(); // <-- important!
// });
app.use(express.static(__dirname + "/public"));
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 8000;
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
