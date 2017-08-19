const express = require('express');
const router = express.Router();

const login = require('./login');
const register = require('./register');
const groups = require('./groups');

router.get('/login', login.get);
router.get('/register', register.get);
router.get('/groups', groups.get);

module.exports = router;
