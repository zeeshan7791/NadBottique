const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const router = express.Router();
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forget/password", forgetPassword);
router.put("/password/reset/:token", resetPassword);
module.exports = router;
