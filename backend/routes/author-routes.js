const express = require('express');
const authorController = require('../controller/authorController');
const authCheck = require('../middleware/auth-check');
 
const router = express.Router();

router.post('/createAuthor', authCheck, authorController.createAuthor);

router.get('/getAuthors', authCheck, authorController.getAuthors);

module.exports = router;