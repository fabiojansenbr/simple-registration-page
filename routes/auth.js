const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/authController');

/** Auth Router */
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/register/unique-check', authController.uniqueCheck);

module.exports = router;
