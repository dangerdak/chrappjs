const jwt = require('jsonwebtoken');

const { validateLogin } = require('../lib/validate');
const checkLogin = require('../lib/checkLogin');

require('env2')('./config.env');

exports.post = (req, res) => {
  const formData = req.body;
  const validatedLogin = validateLogin(formData);
  let response = {};
  if (!validatedLogin.isValid) {
    response = { success: false, message: validatedLogin.message };
    res.status(400);
    res.json(response);
  } else {
    checkLogin(formData.email, formData.password)
      .then((userData) => {
        if (userData) {
          // login successful
          const jwtInfo = {
            userId: userData.id,
            email: userData.email,
          };
          const token = jwt.sign(jwtInfo, process.env.JWT_SECRET);
          response = { success: true, token };
        } else {
          // user doesn't exist or incorrect password
          response = { success: false, message: 'Incorrect email or password' };
          res.status(400);
        }
        res.json(response);
      });
  }
};
