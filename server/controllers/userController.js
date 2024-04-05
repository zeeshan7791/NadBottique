const User = require("../Models/userModel");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// register user
const registerUser = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(errorHandler(404, "user already exist"));
  }
  const pic = req.file ? req.file.filename : "";
  if (pic) {
    req.body.avatar = pic;
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
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    return next(errorHandler(400, "Please enter email and password"));
  }

  try {
    const user = await User.findOne({ email: loginEmail }).select("+password");
    if (!user) {
      return next(errorHandler(401, "user not found", res));
    }
    const isPasswordMatch = await user.comparePassword(loginPassword);

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
  console.log("hello");
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(errorHandler(401, "User not found"));
  }
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken, "reset0--------");
  console.log(user);
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `http://127.0.0.1:5173/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

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
const allUsers = async (req, res, next) => {
  const users = await User.find();
  if (users.length === 0) {
    return next(errorHandler(401, "not found"));
  }

  try {
    return res.status(200).json({
      success: true,
      message: "user detailed fetched successfully",
      users,
    });
  } catch (error) {
    return next(error);
  }
};
const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(errorHandler(401, "user not found"));
  }

  try {
    return res.status(200).json({
      success: true,
      message: "user detailed fetched successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
};
const updatePassword = async (req, res, next) => {
  try {
    console.log("hello");
    const user = await User.findById(req.user.id).select("+password"); // Corrected method from findByIdAndUpdate to findById

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(errorHandler(400, "Old password is incorrect"));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(errorHandler(400, "Passwords do not match")); // Corrected error message
    }
    const hashedPassword = await bcryptjs.hash(req.body.newPassword, 10); // Corrected to await bcryptjs.hash
    console.log(hashedPassword, "value in HashPassword");
    user.password = hashedPassword;

    await user.save();

    sendToken(user, 200, "password updated successfully", res);
  } catch (error) {
    return next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    // console.log(req.body, "value in req");
    const user = await User.findById(req.params.id); // Corrected req.parmas.id to req.params.id
    // console.log(req.params.id);
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const pic = req.file ? req.file.filename : "";

    const update = {
      name,
      email,
    };
    if (pic) {
      update.avatar = pic;
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      updateUser,
    });
  } catch (error) {
    return next(error);
  }
};
const updateRole = async (req, res, next) => {
  try {
    
    const { name, email, role } = req.body;
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const update = {
      name,
      email,
      role,
    };
    const updateUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      updateUser,
    });
  } catch (error) {
    return next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
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
  getUserDetails,
  updatePassword,
  updateProfile,
  deleteUser,
  allUsers,
  updateRole,
};
