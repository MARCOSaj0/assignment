const express = require('express');
const userController = require('../controller/userController');
const authCheck = require('../middleware/auth-check');
 
const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;