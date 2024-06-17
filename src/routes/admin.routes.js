const express = require('express');

const { auth } = require('../middlewares/auth');
const { adminLogin, addBooks, removeBook, updateBook, getBooks } = require('../controllers/admin.controller');


const router = express.Router();

router.post("/login",adminLogin);
router.post("/book",auth,addBooks);
router.put("/book/:bookId",auth,updateBook);
router.get("/books",auth,getBooks)
router.delete("/book/:bookId",auth,removeBook);



module.exports = router