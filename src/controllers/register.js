const jwt = require('jsonwebtoken');

const getUser = require('../../queries/getUser');
const createUser = require('../lib/createUser');

const { validateRegistration } = require('../lib/validate');

require('env2')('./config.env');

exports.post = (req, res) => {
  const formData = req.body;
  const validatedRegistration = validateRegistration(formData);
  let response = {};
  if (!validatedRegistration.isValid) {
    // invalid input
    response = { success: false, message: validatedRegistration.message };
    res.status(400).json(response);
  } else {
    getUser(formData.email)
      .then((existingUser) => {
        if (!existingUser) {
          return createUser(formData.name, formData.email, formData.password)
            .then((userId) => {
              // registration successful
              const jwtInfo = {
                userId,
                email: formData.email,
              };
              const token = jwt.sign(jwtInfo, process.env.JWT_SECRET);
              response = { success: true, token };
              return res.status(200).json(response);
            });
        }
        // email already in db
        response = { success: false, message: `Account already exists for ${formData.email}` };
        return res.status(400).json(response);
      });
  }
};
