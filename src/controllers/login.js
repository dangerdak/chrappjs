const { validateLogin } = require('../lib/validate');
const checkLogin = require('../lib/checkLogin');

exports.get = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};

exports.post = (req, res) => {
  const formData = req.body;
  const validatedLogin = validateLogin(formData);
  if (!validatedLogin.isValid) {
    res.status(400).render('login', {
      pageTitle: 'Login',
      messages: [{ content: validatedLogin.message, error: true }],
      formData,
    });
  } else {
    checkLogin(formData.email, formData.password)
      .then((userData) => {
        if (userData) {
          // login successful
          req.session.user_id = userData.id;
          res.redirect(req.session.destination || 'groups');
        } else {
          // user doesn't exist or incorrect password
          res.status(400).render('login', {
            pageTitle: 'Login',
            messages: [{ content: 'Incorrect email or password', error: true }],
            formData,
          });
        }
      })
      .catch(() => {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Internal server error',
        });
      });
  }
};
