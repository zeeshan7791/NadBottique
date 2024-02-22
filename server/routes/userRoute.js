const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const router = express.Router();
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
module.exports = router;
