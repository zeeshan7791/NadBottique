const express = require("express");
const {
  createProduct,
  updateProduct,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const router = express.Router();
// admin routes
router.post("/create-product", upload.array("pictures"), createProduct);
router.post("/update-product/:id", upload.array("pictures"), updateProduct);
module.exports = router;
