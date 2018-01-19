const test = require('tape');
const supertest = require('supertest');

const dbReset = require('../database/db_build');
const app = require('./../src/app');

test('/login GET', (t) => {
  supertest(app)
    .get('/login')
    .expect(200)
    .end((err, res) => {
      const title = '<h2>Login</h2>';
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('/login POST invalid data', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: '', password: 'hihi' })
    .expect(400)
    .end((err, res) => {
      const title = '<h2>Login</h2>';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes('Email is required'), 'Page contains correct error message');
      t.ok(res.text.includes(title), `Page contains string ${title}`);
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
      const title = '<h2>Login</h2>';
      const message = 'Incorrect email or password';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes('Incorrect email or password'), `Page contains message ${message}`);
      t.ok(res.text.includes(title), `Page contains string ${title}`);
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
      const title = '<h2>Login</h2>';
      const message = 'Incorrect email or password';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes('Incorrect email or password'), `Page contains message ${message}`);
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('/register get', (t) => {
  supertest(app)
    .get('/register')
    .expect(200)
    .end((err, res) => {
      const title = '<h2>Register</h2>';
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('POST to /register with invalid data', (t) => {
  supertest(app)
    .post('/register')
    .type('form')
    .send({ name: '', email: 'd@z.vom', password: 'hi', confirmPassword: 'hid' })
    .expect(400)
    .end((err, res) => {
      const title = '<h2>Register</h2>';
      const message = 'Name is required';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes(message), `Page contains error message '${message}'`);
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('POST to /register with existing user', (t) => {
  supertest(app)
    .post('/register')
    .type('form')
    .send({ name: 'sam', email: 'sam@gmail.com', password: 'hi', confirmPassword: 'hi' })
    .expect(400)
    .end((err, res) => {
      const title = '<h2>Register</h2>';
      const message = 'Account already exists';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes(message), `Page contains error message '${message}'`);
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('GET /groups without authentication', (t) => {
  supertest(app)
    .get('/groups')
    .expect(401)
    .end((err, res) => {
      const title = '<h2>Login</h2>';
      t.equals(res.status, 401, 'Responds with 401 status');
      t.ok(res.text.includes(title), `Renders page with title ${title}`);
      t.end();
    });
});

test('GET /create-group without authentication', (t) => {
  supertest(app)
    .get('/create-group')
    .expect(401)
    .end((err, res) => {
      const title = '<h2>Login</h2>';
      t.equals(res.status, 401, 'Responds with 401 status');
      t.ok(res.text.includes(title), `Renders page with title ${title}`);
      t.end();
    });
});

test('/create-group GET with authentication', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .then(response => {
      const cookies = response.headers['set-cookie'];
      supertest(app)
        .get('/create-group')
        .set('Cookie', cookies)
        .expect(200)
        .end((err, res) => {
          const title = '<h2>Create A Group</h2>';
          t.equals(res.status, 200, 'Responds with 200 status');
          t.ok(res.text.includes(title), `Page contains title ${title}`);
          t.end();
        })
    })
});

test('/create-group POST with valid data', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .then(response => {
      const cookies = response.headers['set-cookie'];
      const input = {
        name: 'superxmas',
        description: 'best xmas ever',
        budget: 10,
        deadline: '2999-12-25',
      };
      supertest(app)
        .post('/create-group')
        .type('form')
        .send(input)
        .set('Cookie', cookies)
        .redirects()
        .end((err, res) => {
          const title = '<h2>Your Groups</h2>';
          t.ok(res.text.includes(title), `Redirects to ${title}`);
          t.end();
        })
    })
});

test('/create-group POST with invalid data', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .then(response => {
      const cookies = response.headers['set-cookie'];
      const input = {
        name: 'superxmas',
        description: 'best xmas ever',
        budget: 10,
        deadline: '2000-12-25',
      };
      supertest(app)
        .post('/create-group')
        .type('form')
        .send(input)
        .set('Cookie', cookies)
        .end((err, res) => {
          const title = '<h2>Create A Group</h2>';
          t.equal(res.status, 400, 'Responds with status 400');
          t.ok(res.text.includes(title), `Renders page with ${title}`);
          t.ok(res.text.includes('Date must be in the future'), `Renders error message`);
          t.end();
        })
    })
});
