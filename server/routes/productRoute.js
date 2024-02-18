const express = require("express");
const { createProduct } = require("../controllers/productController");
const upload = require("../middleware/upload");
const router = express.Router();
// admin routes
router.post("/create-product", upload.array("pictures"), createProduct);
module.exports = router;
