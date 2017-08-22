const { sign, validate } = require('./passwordModule')();
const getUser = require('../../queries/getUser');

exports.get = (req, res) => {
  res.render('login', { pageTitle: 'Login'});
}

exports.post = (req, res) => {
  const formData = req.body;
  if (!formData.email || !formData.password) {
    // field left blank
    res.status(400).render('login', {
      pageTitle: 'Login',
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
      else if (!userData || sign(formData.password) !== userData.password) {
        // user doesn't exist or incorrect password
        res.status(400).render('login', {
          pageTitle: 'Login',
          messages: [{content: 'Incorrect email or password', error: true}],
          formData,
        });
      }
      else {
        res.redirect('groups');
      }
    });
  }
};
