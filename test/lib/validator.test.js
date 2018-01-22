const test = require('tape');

const validate = require('../src/lib/validate');

test('Registration validation', (t) => {
  const input = {
    name: 'bob',
    email: 'd@d.com',
    password: 'd',
    confirmPassword: 'd',
  };
  let actual = validate.validateRegistration(input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  input.name = 5;
  actual = validate.validateRegistration(input).message;
  t.equal(actual, 'Name must be a string', 'Responds with correct message if name is of wrong type');
  t.end();
});

test('Login validation', (t) => {
  const input = { email: 'bob@g.com', password: 'd' };
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

test('Date validation', (t) => {
  t.throws(() => validate.validateDeadline('01-05-2020'), /Date must have format yyyy-mm-dd/, 'Date in incorrect format throws error');
  t.throws(() => validate.validateDeadline('2000-01-01'), /Date must be in the future/, 'Entering a past date throws an error');
  t.end();
});

test('Budget validation', (t) => {
  t.throws(() => validate.validateBudget(-1), /Budget must be a positive integer/, 'Negative budget throws error');
  t.end();
});

test('validateGroup', (t) => {
  const input = {
    name: 'xmas',
    description: 'Christmas in London',
    deadline: '2900-01-01',
    budget: 50,
  };
  const actual = validate.validateGroup(input).isValid;
  t.ok(actual, 'Returns object with isValid set to true if input is valid');
  t.end();
});
