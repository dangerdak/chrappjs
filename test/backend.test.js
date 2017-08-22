const test = require('tape');
const supertest = require('supertest');

const dbReset = require('../database/db_build');
const app = require('./../src/app');

test('/login get', (t) => {
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

test('/groups get', (t) => {
  supertest(app)
    .get('/groups')
    .expect(200)
    .end((err, res) => {
      const title = '<h2>Login</h2>';
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes(title), `Page redirects to ${title} when not logged in`);
      t.end();
    });
});
