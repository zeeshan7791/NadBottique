const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
  adminAllProducts,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
// admin routes
router.post(
  "/create-product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array("pictures"),
  createProduct
);
router.post(
  "/update-product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array("pictures"),
  updateProduct
);
router.get(
  "/all-products",

  getAllProducts
);
router.get(
  "/admin-products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminAllProducts
);
router.get("/single-product/:id", getSingleProduct);
router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);
router.post(
  "/review",
  isAuthenticatedUser,

  createProductReview
);
router.get(
  "/all-reviews",
  getAllReviews
);
router.delete("/delete-review", deleteReview);
module.exports = router;
