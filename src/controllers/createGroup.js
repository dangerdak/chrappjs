const insertGroup = require('../../queries/insertGroup');
const { validateGroup } = require('./validate.js');

exports.get = (req, res) => {
  res.render('createGroup', { pageTitle: 'Create A Group' });
}

exports.post = (req, res) => {
  const formData = req.body;
  if (!formData.is_assigned) formData.is_assigned = false;
  const validated = validateGroup(formData);

  if (!validated.isValid) {
    // invalid input
    res.status(400).render('createGroup', {
      pageTitle: 'Create A Group',
      messages: [{content: validated.message, error: true}],
      formData,
    });
  }
  else {
    insertGroup(req.session.user_id, formData)
      .then(idObj => {
        res.redirect(303, 'groups');
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
