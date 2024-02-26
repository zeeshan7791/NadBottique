const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forget/password", forgetPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/details", isAuthenticatedUser, getUserDetails);
router.put("/change", isAuthenticatedUser, updatePassword);
module.exports = router;
