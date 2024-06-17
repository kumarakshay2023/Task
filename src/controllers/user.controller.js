const { User } = require("../models");
const Book = require("../models/book");
const ApiError = require("../utils/ApiError");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const { Op } = require("sequelize");
const Order = require("../models/order");
const { sendBookOrderEmailToSuperAdmin } = require("../utils/sendGrid");

exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw ApiError("Email must be provided", 400);
  if (!password) throw ApiError("Password must be provided", 400);
  const user = await User.findOne({
    where: { email: email, role: "USER" },
    raw: true,
  });
  if (!user) throw new ApiError("User Does not exists", 400);
  const isValidPassword = await brcypt.compare(password, user.password);
  if (!isValidPassword) throw new ApiError("Ivalid user credentials", 400);
  const token = jwt.sign(
    {
      email: email,
      id: user.id,
    },
    process.env.JWT_SECRET
  );
  await User.update({ token: token }, { where: { id: user.id } });
  user.token = token;
  await UserLogs.create({activity:"User login ",userAgent:user.id,timestamp:Date.now()})

  return res.status(200).send({
    status: true,
    user,
    msg: "Login successfully",
  });
});

exports.bookListing = asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    where: { status: { [Op.ne]: "PENDING" } },
  });
  if (!books) throw new ApiError("Books does not exist", 400);
  return res.status(200).send({
    status: true,
    books,
  });
});

exports.orderBook = asyncHandler(async (req, res) => {
  const { bookId, qty } = req.body;
  const user = req.user;
  if (user?.role !== "USER")
    throw new ApiError(
      "Don't have permission to perform particular actions",
      400
    );
  if (!bookId) throw new ApiError("Book must be provided", 400);
  if (!qty) throw new ApiError("Qty is required", 400);
  const book = await Book.findOne({ where: { id: bookId } });
  if (!book) throw new ApiError("Book does not exist", 400);
  await Order.create({ bookId: bookId, qty: qty, orderByUserId: user.id });
  await sendBookOrderEmailToSuperAdmin(book.title, user.email);
  await UserLogs.create({activity:"Book Ordered by user",userAgent:user.id,timestamp:Date.now()})

  return res.status(200).send({
    status: true,
    msg: "Book Ordered successfully",
  });
});
