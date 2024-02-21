const User = require("../Models/userModel");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
// register user
const registerUser = async (req, res, next) => {
  console.log("hello");
  const { email, phone, password } = req.body;
  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) {
    return next(errorHandler(404, "user already exist"));
  }
  const pic = req.file ? req.file.filename : "";
  if (pic) {
    req.body.profilePic = pic;
  }
  const count = await User.countDocuments();
  let userId = count + 1;
  req.body.userId = userId;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    const token = await user.getJWTToken();
    return res.status(200).json({
      success: true,
      message: "user register successfully",
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  console.log("hello");
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return next(errorHandler(400, "Please enter email and password"));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(errorHandler(401, "invalid email or password"));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(errorHandler(401, "invalid email or password"));
    }
    return res.status(200).json({
      success: true,
      message: "user login successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { registerUser, loginUser };
