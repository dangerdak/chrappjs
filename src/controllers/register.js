const { sign } = require('./passwordModule')();
const insertUser = require('../../queries/insertUser');
const getUser = require('../../queries/getUser');

exports.get = (req, res) => {
  res.render('register', { pageTitle: 'Register'});
};

exports.post = (req, res) => {
  const formData = req.body;
  if (!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
    // field left blank
    res.status(400).render('register', {
      pageTitle: 'Register',
      messages: [{content: 'All fields are required', error: true}],
      formData,
    });
  }
  else {
    getUser(formData.email, (err, userData) => {
      if (err) {
        console.log(err);
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Internal server error',
        });
      }
      else if (userData) {
        // email already in db
        res.status(400).render('register', {
          pageTitle: 'Register',
          messages: [{content: `Account already exists for ${formData.email}`, error: true}],
          formData,
        });
      }
      else if (formData.password !== formData.confirmPassword) {
        // passwords dont match
        res.status(400).render('register', {
          pageTitle: 'Register',
          messages: [{content: 'Passwords do not match', error: true}],
          formData,
        });
      }
      else {
        // TODO try/catch for use of sign function?
        const hashedPassword = sign(formData.password);
        insertUser(formData.name, formData.email, hashedPassword, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).render('error', {
              layout: 'error',
              statusCode: 500,
              errorMessage: 'Internal server error',
            });
          }
          else {
            res.redirect('groups');
          }
        })
      }
    });
  }
};
