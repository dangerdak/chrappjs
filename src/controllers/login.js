const { sign, validate } = require('./passwordModule')();
const getUser = require('../../queries/getUser');

exports.get = (req, res) => {
  res.render('login', { pageTitle: 'Login'});
}

exports.post = (req, res) => {
  const formData = req.body;
  getUser(formData.email, (err, userData) => {
    // TODO 500 error
    if (err) return console.log(err);
    if (!userData || sign(formData.password) !== userData.password) {
      // TODO incorrect email or password message
      return console.log('Incorrect email or password');
    }
    console.log(userData.id);
    res.redirect('groups');
  });
};
