const test = require('tape');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('./../src/app');
const dbReset = require('../database/db_build').seed;

const TOKEN = jwt.sign({ userId: 1, email: 'sam@gmail.com' }, process.env.JWT_SECRET);

test('GET private endpoints with authentication', (t) => {
  const endpoints = [
    { url: '/groups' },
  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    dbReset().then(() => {
      supertest(app)
        .get(endpoint.url)
        .set('Authorization', `bearer ${TOKEN}`)
        .expect(200)
        .end((err, res) => {
          t.equal(res.status, 200, `${endpoint.url} responds with 200 status`);
          t.equal(typeof res.body, 'object', `${endpoint.url} responds with object`);
        });
    });
  });
});

test('GET private endpoints without authentication', (t) => {
  const endpoints = [
    { url: '/create-group' },
    { url: '/groups' },
  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    supertest(app)
      .get(endpoint.url)
      .expect(401)
      .end((err, res) => {
        const message = 'Please log in to continue';
        t.equal(res.status, 401, `${endpoint.url} responds with 401 status`);
        t.equal(res.body.message, message, `${endpoint.url} responds with message ${message}`);
      });
  });
});

test('POST public endpoints with invalid data', (t) => {
  const endpoints = [{
    issue: 'email is missing',
    url: '/login',
    payload: { email: '', password: 'hihi' },
    expected: { errorMessage: 'Email is required' },
  },
  {
    issue: 'password is incorrect',
    url: '/login',
    payload: { email: 'sam@gmail.com', password: 'hihi' },
    expected: { errorMessage: 'Incorrect email or password' },
  },
  {
    issue: 'email is incorrect',
    url: '/login',
    payload: { email: 'samaslkjhdslfm@gmail.com', password: 'password' },
    expected: { errorMessage: 'Incorrect email or password' },
  },
  {
    url: '/register',
    issue: 'name is missing',
    payload: {
      name: '',
      email: 'd@z.vom',
      password: 'hi',
      confirmPassword: 'hid',
    },
    expected: { errorMessage: 'Name is required' },
  },
  {
    url: '/register',
    issue: 'user already exists',
    payload: {
      name: 'sam',
      email: 'sam@gmail.com',
      password: 'hi',
      confirmPassword: 'hi',
    },
    expected: { errorMessage: 'Account already exists for sam@gmail.com' },
  },
  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    supertest(app)
      .post(endpoint.url)
      .type('form')
      .send(endpoint.payload)
      .expect(400)
      .end((err, res) => {
        const { errorMessage } = endpoint.expected;
        t.equal(res.status, 400, `${endpoint.url} responds with 400 status when ${endpoint.issue}`);
        t.equal(res.body.message, errorMessage, `${endpoint.url} responds with  message '${errorMessage}' when ${endpoint.issue}`);
      });
  });
});

test('POST public endpoints with valid input', (t) => {
  const endpoints = [
    {
      url: '/login',
      payload: { email: 'sam@gmail.com', password: 'password' },
    },
    {
      url: '/register',
      payload: {
        name: 'bill',
        email: 'bill98347983247@gmail.com',
        password: 'hi',
        confirmPassword: 'hi',
      },
    },
  ];
  t.plan(endpoints.length * 3);
  endpoints.forEach((endpoint) => {
    dbReset().then(() => {
      supertest(app)
        .post(endpoint.url)
        .type('form')
        .send(endpoint.payload)
        .expect(200)
        .end((err, res) => {
          t.equal(res.status, 200, 'Responds with 400 status');
          t.ok(res.body.success, 'Response with object containing truthy \'success\' value');
          t.ok(res.body.token, 'Response with object containing truthy \'token\' value');
        });
    });
  });
});

test('POST private endpoints with authentication and invalid data', (t) => {
  const endpoints = [
    {
      issue: 'date is in the past',
      url: '/create-group',
      input: {
        name: 'superxmas',
        description: 'best xmas ever',
        budget: 10,
        deadline: '2000-12-25',
      },
      expected: { errorMessage: 'Date must be in the future' },
    },
  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    dbReset().then(() => {
      supertest(app)
        .post(endpoint.url)
        .set('Authorization', `bearer ${TOKEN}`)
        .type('form')
        .send(endpoint.input)
        .expect(400)
        .end((err, res) => {
          const message = endpoint.expected.errorMessage;
          t.equal(res.status, 400, `Responds with status 400 when ${endpoint.issue}`);
          t.equal(res.body.message, message, `${endpoint.url} responds with message ${message} when ${endpoint.issue}`);
        });
    });
  });
});

test('/create-group POST with authentication and valid data', (t) => {
  const input = {
    name: 'superxmas',
    description: 'best xmas ever',
    budget: 10,
    deadline: '2999-12-25',
  };
  dbReset().then(() => {
    supertest(app)
      .post('/create-group')
      .set('Authorization', `bearer ${TOKEN}`)
      .type('form')
      .send(input)
      .expect(200)
      .end((err, res) => {
        t.equal(res.status, 200, 'Reponds with 200 status');
        t.end();
      });
  });
});
