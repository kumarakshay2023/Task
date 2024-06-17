const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { asyncHandler } = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
   
  if (!token) throw new ApiError("Token must be provided", 400);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new ApiError("Invalid token", 400);
  const user = await User.findOne({
    where: {
      id: decoded.id,
    },
  });
  if(user.token !== token){
    throw new ApiError("Token expires please login again", 400);
  }
  if (!user) throw new ApiError("Invalid user token", 400);
  req.user = user;
  next()
  } catch (error) {
     throw Error(error)
  }
  
});
