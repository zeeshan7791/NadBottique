//  created token and saving in cookie
const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
    path: "/",
    sameSite: "None", // Only use with HTTPS
    secure: true, // Only use with HTTPS
  };
  const { password: pass, ...rest } = user._doc;

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    rest,
    token,
  });
};

module.exports = sendToken;
