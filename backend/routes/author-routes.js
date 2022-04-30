const express = require('express');
const authorController = require('../controller/authorController');
const authCheck = require('../middleware/auth-check');
 
const router = express.Router();

router.post('/createAuthor', authCheck, authorController.createAuthor);

module.exports = router;