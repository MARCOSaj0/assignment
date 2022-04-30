const express = require('express');
const bookController = require('../controller/bookController');
const authCheck = require('../middleware/auth-check');
 
const router = express.Router();

router.post('/createBook', authCheck, bookController.createBook);

router.get('/getBooks', authCheck, bookController.getBooks);

router.delete('/delBook/:id', authCheck, bookController.deleteBook);

module.exports = router;