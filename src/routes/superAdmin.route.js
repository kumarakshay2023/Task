const express = require('express');

const { auth } = require('../middlewares/auth');
const { superAdminLogin, addAdminOrUser } = require('../controllers/superAdmin.controller');


const router = express.Router();

router.post("/login",superAdminLogin);
router.post("/add-user-admin",auth,addAdminOrUser)

module.exports = router