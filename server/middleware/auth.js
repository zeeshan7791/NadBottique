const errorHandler = require("../utils/error");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
 
  if (!token) {
    return next(errorHandler(401, "Please login first"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(errorHandler(403, "unAuthorized access"));
    }
    next();
  };
};
module.exports = { isAuthenticatedUser, authorizeRoles };
