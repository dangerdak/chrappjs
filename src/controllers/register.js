const { sign } = require('./passwordModule')();
const insertUser = require('../../queries/insertUser');

exports.get = (req, res) => {
  res.render('register', { pageTitle: 'Register'});
}
exports.post = (req, res) => {
  const formData = req.body;
  // TODO validate form data, check if email already exists
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
};
