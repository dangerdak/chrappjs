const { validateLogin } = require('../lib/validate');
const checkLogin = require('../lib/checkLogin');

exports.post = (req, res) => {
  const formData = req.body;
  const validatedLogin = validateLogin(formData);
  let response = {};
  if (!validatedLogin.isValid) {
    response = { success: false, errorMessage: validatedLogin.message };
    res.json(response);
  } else {
    checkLogin(formData.email, formData.password)
      .then((userData) => {
        if (userData) {
          // login successful
          req.session.id = userData.id;
          response = { success: true };
        } else {
          // user doesn't exist or incorrect password
          response = { success: false, errorMessage: 'Incorrect email or password' };
        }
        res.json(response);
      });
  }
};
