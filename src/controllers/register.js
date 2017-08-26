const { sign } = require('./passwordModule')();
const insertUser = require('../../queries/insertUser');
const getUser = require('../../queries/getUser');

const { validateRegistration } = require('./validate');

exports.get = (req, res) => {
  res.render('register', { pageTitle: 'Register'});
};

exports.post = (req, res) => {
  const formData = req.body;
  const validatedRegistration = validateRegistration(formData);
  if (!validatedRegistration.isValid) {
    // invalid input
    res.status(400).render('register', {
      pageTitle: 'Register',
      messages: [{content: validatedRegistration.message, error: true}],
      formData,
    });
  }
  else {
    getUser(formData.email)
      .then(existingUser => {
        if (!existingUser) {
          // insert user
          // TODO try/catch for use of sign function?
          const hashedPassword = sign(formData.password);
          insertUser(formData.name, formData.email, hashedPassword)
            .then(userId => {
              req.session.user_id = userId;
              res.redirect('groups');
            })
            .catch(err => {
              res.status(500).render('error', {
                layout: 'error',
                statusCode: 500,
                errorMessage: 'Internal server error',
              });
            });
        }
        else {
          // email already in db
          res.status(400).render('register', {
            pageTitle: 'Register',
            messages: [{content: `Account already exists for ${formData.email}`, error: true}],
            formData,
          });
        }
      })
      .catch(err => {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Internal server error',
        });
      });
  }
};
