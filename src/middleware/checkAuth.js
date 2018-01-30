const jwt = require('jsonwebtoken');

require('env2')('./config.env');

const checkAuth = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    res.locals.userId = decoded.userId;
  } catch (err) {
    return res.json(401, { success: false, message: 'Please log in to continue' });
  }
  next();
};

module.exports = checkAuth;
