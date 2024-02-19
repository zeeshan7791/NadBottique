const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const router = express.Router();
// admin routes
router.post("/create-product", upload.array("pictures"), createProduct);
router.post("/update-product/:id", upload.array("pictures"), updateProduct);
router.get("/all-products", getAllProducts);
router.get("/single-product/:id", getSingleProduct);
router.delete("/delete/:id", upload.array("pictures"), deleteProduct);
module.exports = router;
