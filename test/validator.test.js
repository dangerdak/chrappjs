const test = require('tape');

const validate = require('../src/controllers/validate');

test('Registration validation', (t) => {
  let input = { name: 'bob', email: 'd@d.com', password: 'd', confirmPassword: 'd' };
  let actual = validate.validateRegistration(input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input.name = 5;
  actual = validate.validateRegistration(input).message;
  t.equal(actual, 'Name must be a string', 'Responds with correct message if name is of wrong type');
  t.end();
});

test('Login validation', (t) => {
  let input = { email: 'bob@g.com', password: 'd' };
  let actual = validate.validateLogin(input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input.email = 5;
  actual = validate.validateLogin(input).message;
  t.equal(actual, 'Email must be a string', 'Responds with correct message if email is of wrong type');
  t.end();
});

test('Name validation', (t) => {
  t.throws(() => validate.validateName(''), /Name is required/, 'Falsey name has correct error message');
  t.throws(() => validate.validateName(5), /Name must be a string/, 'Number value has correct error message');
  t.throws(() => validate.validateName('5332*$'), /Name must contain only alphanumeric characters/, 'Special characters in provides correct error message');
  t.end();
});

test('Email validation', (t) => {
  t.throws(() => validate.validateEmail(''), /Email is required/, 'Falsey email has correct error message');
  t.throws(() => validate.validateEmail(5), /Email must be a string/, 'Number value has correct error message');
  t.end();
});

test('Password validation', (t) => {
  t.throws(() => validate.validatePassword(''), /Password is required/, 'Falsey password has correct error message');
  t.throws(() => validate.validatePassword(5), /Password must be a string/, 'Number value has correct error message');
  t.end();
});

test('Password confirmation validation', (t) => {
  t.throws(() => validate.validateConfirmPassword('', ''), /Password confirmation is required/, 'Missing password confirmation has correct error message');
  t.throws(() => validate.validateConfirmPassword('hi', 'he'), /Passwords must match/, 'Confirmation different to password provides correct error message');
  t.end();
});
