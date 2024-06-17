const ApiError = require("../utils/ApiError");
const brcypt = require("bcrypt");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendUserOrAdminAddEmail, sendRejectEmailOnBookAdd } = require("../utils/sendGrid");
const Book = require("../models/book");

exports.superAdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError("email must be provided", 400);
  if (!password) throw new ApiError("passowrd must be provided", 400);
  const superAdmin = await User.findOne({
    where: { email: email, role: "SUPER_ADMIN" },
    raw: true,
  });
  if (!superAdmin) throw new ApiError("Super Admin Does not exists", 400);
  const isValidPassword = await brcypt.compare(password, superAdmin.password);
  if (!isValidPassword) throw new ApiError("Ivalid user credentials", 400);
  const token = jwt.sign(
    {
      email: email,
      id: superAdmin.id,
    },
    process.env.JWT_SECRET
  );
  await User.update({ token: token }, { where: { id: superAdmin.id } });
  superAdmin.token = token;
  return res.status(200).send({
    status: true,
    superAdmin,
    msg: "Login successfully",
  });
});

exports.addAdminOrUser = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;
  const superAdmin = req.user;
  if (!email) throw new ApiError("Email must be provided", 400);
  if (!password) throw new ApiError("Password must be provided", 400);
  if (!name) throw new ApiError("Name must be provided", 400);
  if (!role) throw new ApiError("Role must be provided", 400);
  if (superAdmin.role !== "SUPER_ADMIN")
    throw new ApiError(
      "Don't have permission to perform particular actions",
      400
    );
  const hashPassword = await brcypt.hash(password, 10);
  const findUser = await User.findOne({ where: { email: email } });
  if (findUser) throw new ApiError("User already exists", 400);
  const data = await User.create({
    email,
    password: hashPassword,
    name: name,
    role: role,
  });
  await sendUserOrAdminAddEmail(data.email, name, password, email, role);
  return res.status(200).send({
    status: true,
    user: data,
    msg: `${role} added successfully`,
  });
});

exports.approveOrRejectBook = asyncHandler(async (req, res) => {
  const { bookId} = req.params;
  const {status} = req.body;
  const superAdmin = req.user;
  if (superAdmin.role !== "SUPER_ADMIN")
    throw new ApiError(
      "Don't have permission to perform particular actions",
      400
    );
 if(!status) throw new ApiError("Status must be provided either it should be APPROVED OR REJECTED",400)
  const book = await Book.findOne({ where: { id: bookId },include:{model:User,attributes:['email']} });
  if (!book) throw new ApiError("Book not found", 400);
  book.status = status === "approved" ? "APPROVED" : "REJECTED";
   await book.save();
  if(book.status == "REJECTED"){
    await sendRejectEmailOnBookAdd(book?.User?.email,book.title)
  }
  return res.status(200).send({
    status: true,
    msg: `Book ${status} successfully`,
  });
});
