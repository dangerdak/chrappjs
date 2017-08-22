const validateName = (name) => {
  if (!name) {
    throw new TypeError('Name is required');
  }
  if (typeof name !== 'string') {
    throw new TypeError('Name must be a string');
  }
  if (/\W/.test(name)) {
    throw new TypeError('Name must contain only alphanumeric characters');
  }
};

const validateEmail = (email) => {
  if (!email) {
    throw new TypeError('Email is required');
  }
  if (typeof email !== 'string') {
    throw new TypeError('Email must be a string');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new TypeError('Password is required');
  }
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    throw new TypeError('Password confirmation is required');
  }
  if (typeof confirmPassword !== 'string') {
    throw new TypeError('Password confirmation must be a string');
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords must match');
  }
};

const registration = (name, email, password, confirmPassword) => {
  try {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);
    return { isValid: true };
  }
  catch (e) {
    return { isValid: false, message: e.message };
    
  }
};

const login = (email, password) => {
  try {
    validateEmail(email);
    validatePassword(password);
    return { isValid: true };
  }
  catch (e) {
    return {isValid: false, message: e.message };
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  registration,
  login,
};
