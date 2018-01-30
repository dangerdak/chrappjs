const jwt = require('jsonwebtoken');

const insertGroup = require('../../queries/insertGroup');
const { validateGroup } = require('../lib/validate.js');

require('env2')('./config.env');

exports.post = (req, res) => {
  const formData = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  if (!formData.is_assigned) formData.is_assigned = false;
  const validated = validateGroup(formData);
  let response = {};
  if (!validated.isValid) {
    // invalid input
    response = { success: false, message: validated.message };
    res.status(400).json(response);
  } else {
    insertGroup(userId, formData).then(() => res.sendStatus(200));
  }
};
