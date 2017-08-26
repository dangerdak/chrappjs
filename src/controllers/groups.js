const getGroups = require('../../queries/getGroups');

exports.get = (req, res) => {
  getGroups(req.session.user_id)
  .then(groups => {
    res.render('groups', {pageTitle: 'Your Groups', groups});
  })
  .catch(err => {
    res.status(500).render('error', {
      layout: 'error',
      statusCode: 500,
      errorMessage: 'Internal server error',
    });
  });
}
