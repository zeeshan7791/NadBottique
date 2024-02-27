const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  deleteUser,
  allUsers,
  updateRole,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forget/password", forgetPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/details", isAuthenticatedUser, getUserDetails);
router.put("/change", isAuthenticatedUser, updatePassword);
router.post("/update/:id", isAuthenticatedUser, updateProfile);
router.get("/remove/:id", isAuthenticatedUser, deleteUser);
router.get(
  "/all-users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);
router.post(
  "/update-role/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateRole
);
module.exports = router;
