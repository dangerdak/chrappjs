const test = require('tape');

const validate = require('../src/controllers/validate');

test('Registration validation', (t) => {
  let input = ['bob', 'd@d.com', 'd', 'd'];
  let actual = validate.registration(...input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input[0] = 5;
  actual = validate.registration(...input).message;
  t.equal(actual, 'Name must be a string', 'Responds with correct message if name is of wrong type');
  t.end();
});

test('Login validation', (t) => {
  let input = ['bob@g.com', 'd'];
  let actual = validate.login(...input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input[0] = 5;
  actual = validate.registration(...input).message;
  t.equal(actual, 'Name must be a string', 'Responds with correct message if name is of wrong type');
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
