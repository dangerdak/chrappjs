const { sign } = require('./passwordModule')();
const insertUser = require('../../queries/insertUser');

exports.get = (req, res) => {
  res.render('register', { pageTitle: 'Register'});
}
exports.post = (req, res) => {
  const formData = req.body;
  const hashedPassword = sign(formData.password);
  insertUser(formData.name, formData.email, hashedPassword, (err, result) => {
    if (err) {
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Internal server error',
      });
      return console.log(err);
    }
    res.redirect('groups');
  })
};
