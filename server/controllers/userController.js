const User = require("../Models/userModel");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// register user
const registerUser = async (req, res, next) => {
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
    sendToken(user, 201, "register successfully", res);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

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
    sendToken(user, 200, "login successfully", res);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(errorHandler(401, "User not found"));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/${resetToken}`;
  const message = `Your Password reset token is :- \n\n ${resetPasswordURL}\n\n if you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Nadboutique password recovery",
      message,
    });
    return res.status(200).json({
      success: true,
      message: `message sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        errorHandler(400, "reset password token is ivalid or has been expired")
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(errorHandler(400, "password does not match"));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
    return res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
};
