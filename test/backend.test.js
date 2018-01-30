const test = require('tape');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('./../src/app');

require('env2')('./config.env');

const TOKEN = jwt.sign({ userId: 1, email: 'sam@gmail.com' }, process.env.JWT_SECRET);

test('/login POST with valid input', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .expect(200)
    .end((err, res) => {
      t.equal(res.status, 200, 'Responds with 400 status');
      t.ok(res.body.success, 'Response with object containing truthy \'success\' value');
      t.ok(res.body.token, 'Response with object containing truthy \'token\' value');
      t.end();
    });
});

test('/login POST with invalid input', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: '', password: 'hihi' })
    .expect(400)
    .end((err, res) => {
      const message = 'Email is required';
      t.equal(res.status, 400, 'Responds with 400 status');
      t.equal(res.body.message, message, 'Page contains validation error message');
      t.end();
    });
});

test('/login POST user doesnt exist', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'dsalfhasldf@gmail.com', password: 'hihi' })
    .expect(400)
    .end((err, res) => {
      const message = 'Incorrect email or password';
      t.equal(res.status, 400, 'Responds with 400 status');
      t.equal(res.body.message, message, `Page contains message ${message}`);
      t.end();
    });
});

test('/login POST incorrect password', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'hihi' })
    .expect(400)
    .end((err, res) => {
      const message = 'Incorrect email or password';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.body.message, `Page contains message ${message}`);
      t.end();
    });
});

test('/register POST with valid input', (t) => {
  supertest(app)
    .post('/register')
    .type('form')
    .send({
      name: 'bill',
      email: 'bill98347983247@gmail.com',
      password: 'hi',
      confirmPassword: 'hi',
    })
    .expect(200)
    .end((err, res) => {
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.body.success, 'Response with object containing truthy \'success\' value');
      t.ok(res.body.token, 'Response with object containing truthy \'token\' value');
      t.end();
    });
});

test('/register POST with invalid data', (t) => {
  supertest(app)
    .post('/register')
    .type('form')
    .send({
      name: '',
      email: 'd@z.vom',
      password: 'hi',
      confirmPassword: 'hid',
    })
    .expect(400)
    .end((err, res) => {
      const message = 'Name is required';
      t.equal(res.status, 400, 'Responds with 400 status');
      t.ok(res.body.message, `Responds with error message '${message}'`);
      t.end();
    });
});

test('/register POST with existing user', (t) => {
  supertest(app)
    .post('/register')
    .type('form')
    .send({
      name: 'sam',
      email: 'sam@gmail.com',
      password: 'hi',
      confirmPassword: 'hi',
    })
    .expect(400)
    .end((err, res) => {
      const message = 'Account already exists';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.body.message.includes(message), `Responds with error message '${message}'`);
      t.end();
    });
});

test('GET /groups without authentication', (t) => {
  supertest(app)
    .get('/groups')
    .expect(401)
    .end((err, res) => {
      const message = 'Please log in to continue';
      t.equal(res.status, 401, 'Responds with 401 status');
      t.equal(res.body.message, message, `Responds with message ${message}`);
      t.end();
    });
});

test('GET /groups with authentication', (t) => {
  supertest(app)
    .get('/groups')
    .set('Authorization', `bearer ${TOKEN}`)
    .expect(200)
    .end((err, res) => {
      t.equal(res.status, 200, 'Responds with 200 status');
      t.equal(typeof res.body, 'object', 'Responds with object');
      t.end();
    });
});

test('GET /create-group without authentication', (t) => {
  supertest(app)
    .get('/create-group')
    .expect(401)
    .end((err, res) => {
      const message = 'Please log in to continue';
      t.equal(res.status, 401, 'Responds with 401 status');
      t.equal(res.body.message, message, `Responds with message ${message}`);
      t.end();
    });
});

test('/create-group POST with authentication and valid data', (t) => {
  const input = {
    name: 'superxmas',
    description: 'best xmas ever',
    budget: 10,
    deadline: '2999-12-25',
  };
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

test('/create-group POST with authentication and invalid data', (t) => {
  const input = {
    name: 'superxmas',
    description: 'best xmas ever',
    budget: 10,
    deadline: '2000-12-25',
  };
  supertest(app)
    .post('/create-group')
    .set('Authorization', `bearer ${TOKEN}`)
    .type('form')
    .send(input)
    .expect(400)
    .end((err, res) => {
      const message = 'Date must be in the future';
      t.equal(res.status, 400, 'Responds with status 400');
      t.equal(res.body.message, message, 'Responds with validation error message');
      t.end();
    });
});
