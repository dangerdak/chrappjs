const validateName = (name) => {
  if (!name) {
    throw new TypeError('Name is required');
  }
  if (typeof name !== 'string') {
    throw new TypeError('Name must be a string');
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
  if (password !== confirmPassword) {
    throw new TypeError('Passwords must match');
  }
};

const validateDescription = (description) => {
  if (description.length > 500) {
    throw new TypeError('Description must be less than 500 characters');
  }
};

const validateDeadline = (date) => {
  let currentDate = new Date();
  let inputDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new TypeError(`Date must have format yyyy-mm-dd but you entered ${date}`);
  }
  if (inputDate.getTime() < currentDate.getTime()) {
    throw new TypeError('Date must be in the future');
  }
};

const validateBudget = (budget) => {
  budget = +budget;
  if (budget < 0 || Math.floor(budget) !== budget) {
    throw new TypeError('Budget must be a positive integer');
  }
};

const validateRegistration = (input) => {
  try {
    validateName(input.name);
    validateEmail(input.email);
    validatePassword(input.password);
    validateConfirmPassword(input.password, input.confirmPassword);
    return { isValid: true };
  }
  catch (e) {
    return { isValid: false, message: e.message };
  }
};

const validateLogin = (input) => {
  try {
    validateEmail(input.email);
    validatePassword(input.password);
    return { isValid: true };
  }
  catch (e) {
    return { isValid: false, message: e.message };
  }
};

const validateGroup = (input) => {
  try {
    validateName(input.name);
    validateDescription(input.description);
    validateDeadline(input.deadline);
    validateBudget(input.budget);
    return { isValid: true };
  }
  catch (e) {
    return { isValid: false, message: e.message };
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateDescription,
  validateDeadline,
  validateBudget,
  validateRegistration,
  validateLogin,
  validateGroup,
};
