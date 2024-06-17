const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const crypto = require("crypto");
const { sendForgotPasswordEmail } = require("../utils/sendGrid");
const { User } = require("../models");
const bcrypt = require("bcrypt");

function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new ApiError("user not found", 400);
  const token = generateResetToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  const link = `http://localhost:8080/reset-password/${token}`;
  await user.save();
  await sendForgotPasswordEmail(user.email, link, user.name);
  return res
    .status(200)
    .send({ status: true, msg: "Password reset email sent" });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, token } = req.body;
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user)
    throw new ApiError("Password reset token is invalid or has expired", 400);
  user.password = bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
  return res
    .status(200)
    .send({ status: true, msg: "Password updated succesfully" });
});
