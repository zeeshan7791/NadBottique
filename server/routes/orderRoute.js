const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReviews,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createNewOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  getAllorders,
  deleteOrder,
} = require("../controllers/orderController");
const { deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/create-order",
  isAuthenticatedUser,
  upload.array("pictures"),
  createNewOrder
);
router.get(
  "/order-details/:id",
  isAuthenticatedUser,

  getSingleOrder
);
router.get("/my-orders", isAuthenticatedUser, myOrders);
router.post(
  "/update-order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);
router.get(
  "/all-orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllorders
);
router.delete(
  "/delete-order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
