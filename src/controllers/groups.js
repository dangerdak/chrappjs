const getGroups = require('../../queries/getGroups');

exports.get = (req, res) => {
  getGroups(res.locals.userId)
    .then(groups => res.json(groups));
};
