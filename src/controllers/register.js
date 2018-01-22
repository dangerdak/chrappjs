const getUser = require('../../queries/getUser');
const createUser = require('../lib/createUser');

const { validateRegistration } = require('../lib/validate');

exports.get = (req, res) => {
  res.render('register', { pageTitle: 'Register' });
};

exports.post = (req, res) => {
  const formData = req.body;
  const validatedRegistration = validateRegistration(formData);
  if (!validatedRegistration.isValid) {
    // invalid input
    res.status(400).render('register', {
      pageTitle: 'Register',
      messages: [{ content: validatedRegistration.message, error: true }],
      formData,
    });
  } else {
    getUser(formData.email)
      .then((existingUser) => {
        if (!existingUser) {
          return createUser(formData.name, formData.email, formData.password)
            .then((userId) => {
              req.session.user_id = userId;
              res.redirect('groups');
            });
        }
        // email already in db
        return res.status(400).render('register', {
          pageTitle: 'Register',
          messages: [{ content: `Account already exists for ${formData.email}`, error: true }],
          formData,
        });
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
