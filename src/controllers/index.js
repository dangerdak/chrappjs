const express = require('express');

const login = require('./login');
const register = require('./register');
const groups = require('./groups');
const createGroup = require('./createGroup');

const router = express.Router();

router.get('/groups', groups.get);

router.post('/register', register.post);
router.post('/login', login.post);
router.post('/create-group', createGroup.post);


module.exports = router;
