const express = require('express');
const router = express.Router();

const login = require('./login');
const register = require('./register');

router.get('/login', login.get);
router.get('/register', register.get);

module.exports = router;
