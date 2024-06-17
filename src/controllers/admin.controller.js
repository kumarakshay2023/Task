const { asyncHandler } = require("../utils/asyncHandler");
const brcypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const ApiError = require("../utils/ApiError");
const {  sendSuperAdminEmailOnBookAdd, sendSuperAdminEmailOnBookUpdate } = require("../utils/sendGrid");

exports.adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError("email must be provided", 400);
  if (!password) throw new ApiError("passowrd must be provided", 400);
  const admin = await User.findOne({
    where: { email: email, role: "ADMIN" },
    raw: true,
  });
  if (!admin) throw new ApiError(" Admin Does not exists", 400);
  const isValidPassword = await brcypt.compare(password, admin.password);
  if (!isValidPassword) throw new ApiError("Ivalid user credentials", 400);
  const token = jwt.sign(
    {
      email: email,
      id: admin.id,
    },
    process.env.JWT_SECRET
  );
  await User.update({ token: token }, { where: { id: admin.id } });
  admin.token = token;
  return res.status(200).send({
    status: true,
    admin,
    msg: "Login successfully",
  });
});

exports.addBooks = asyncHandler(async (req, res) => {
  const { title, author, description,price } = req.body;
  if (!title) throw new ApiError("title must be provided", 400);
  if (!author) throw new ApiError("author must be provided", 400);
  if(!price) throw new ApiError("price must be provided", 400);
  const admin = req.user;
  if (admin?.role !== "ADMIN")
    throw new ApiError(
      "Don't have permission to perform particular actions",
      400
    );
  const findBook = await Book.findOne({ where: { title: title } });
  if (findBook) throw new ApiError("Book with title already exists", 400);
  await Book.create({ title, author, description, price,addedByAdminId: admin.id });
  await sendSuperAdminEmailOnBookAdd(admin.email);
  return res.status(200).send({
    status: true,
    msg: "Book Added Successfully",
  });
});

exports.removeBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const admin = req.user;
  if (admin?.role !== "ADMIN")
  throw new ApiError(
    "Don't have permission to perform particular actions",
    400
  );
  if (!bookId) throw new ApiError("Book id must be provided", 400);
  const book = await Book.findOne({
    where: { id: bookId, addedByAdminId: admin.id },
  });
  if (!book) throw new ApiError("Book not found", 400);
  await Book.destroy({ where: { id: bookId } });
  return res.status(200).send({
    status: true,
    msg: "Book Removed Successfully",
  });
});

exports.updateBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { title, author, description,price } = req.body;
  const admin = req.user;
  if (admin?.role !== "ADMIN")
  throw new ApiError(
    "Don't have permission to perform particular actions",
    400
  );
  if (!bookId) throw new ApiError("Book id must be provided", 400);
  const book = await Book.findOne({
    where: { id: bookId, addedByAdminId: admin.id },
  });
  if (!book) throw new ApiError("Book not found", 400);
  await Book.update({ title, description, author,price }, { where: { id: bookId } });
  sendSuperAdminEmailOnBookUpdate(admin.email);
  return res.status(200).send({
    status: true,
    msg: "Book Updated Successfully",
  });
});

exports.getBooks = asyncHandler(async (req, res) => {
  const admin = req.user;
  if (admin?.role !== "ADMIN")
  throw new ApiError(
    "Don't have permission to perform particular actions",
    400
  );
  const books = await Book.findAll({ where: { addedByAdminId: admin.id },include:{model:User,attributes:['id','name']} });
  if (!books) throw new ApiError("No book found", 400);
  return res.status(200).send({
    status: true,
    data: books,
  });
});
