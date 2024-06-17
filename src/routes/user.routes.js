const express = require('express');

const { auth } = require('../middlewares/auth');
const { userLogin, bookListing, orderBook } = require('../controllers/user.controller');



const router = express.Router();

router.post('/login',userLogin);
router.get('/books',bookListing);
router.post('/book/order',auth,orderBook)

module.exports = router