const express = require('express');

const { auth } = require('../middlewares/auth');
const { superAdminLogin, addAdminOrUser, approveOrRejectBook } = require('../controllers/superAdmin.controller');


const router = express.Router();

router.post("/login",superAdminLogin);
router.post("/add-user-admin",auth,addAdminOrUser)
router.put("/approve/book/:bookId",auth,approveOrRejectBook)
router.put("/reject/book/:bookId",auth,approveOrRejectBook)
module.exports = router