const ApiError = require("../utils/ApiError");
const brcypt = require("bcrypt");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendUserOrAdminAddEmail } = require("../utils/sendGrid");

exports.superAdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new ApiError("email must be provided", 400);
  if (!password) throw new ApiError("passowrd must be provided", 400);
  const superAdmin = await User.findOne({ where: { email: email,role:"SUPER_ADMIN" }, raw: true });
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


exports.addAdminOrUser = asyncHandler(async(req,res)=>{
    const {email,password,name,role} = req.body;
    const user = req.user;
    if(!email) throw new ApiError("Email must be provided",400);
    if(!password) throw new ApiError("Password must be provided",400);
    if(!name) throw new ApiError("Name must be provided",400);
    if(!role) throw new ApiError("Role must be provided",400);
    if(user.role!=='SUPER_ADMIN') throw new ApiError("Don't have permission to perform particular actions",400);
    const hashPassword = await brcypt.hash(password,10);
    const findUser = await User.findOne({where:{email:email}});
    if(findUser) throw new ApiError("User already exists",400);
    const data = await User.create({email,password:hashPassword,name:name,role:role});
   await sendUserOrAdminAddEmail(data.email,name,password,email,role)
    return res.status(200).send({
        status: true,
        user:data,
        msg: `${role} added successfully`,
      
    })

})
