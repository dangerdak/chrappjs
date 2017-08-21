const crypto = require('crypto');
require('env2')('./config.env');

module.exports = () => {
  const secret = process.env.SECRET;
  if (!secret || typeof secret !== 'string') {
    throw new Error('Invalid secret');
  }
  const functions = {
    sign: (value) => {
      const hmac = crypto.createHmac('sha256', secret);
      return hmac.update(value).digest('hex');
    },
    validate: (value, hash) => {
      return functions.sign(value) === hash;
    }
  }
  return functions;
};
