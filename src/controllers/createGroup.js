const jwt = require('jsonwebtoken');
const insertGroup = require('../../queries/insertGroup');
const { validateGroup } = require('../lib/validate.js');

exports.post = (req, res) => {
  const formData = req.body;
  const decoded = jwt.decode(localStorage.getItem('token'));
  const { userId } = decoded.payload;
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
