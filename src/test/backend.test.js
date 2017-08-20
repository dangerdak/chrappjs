const test = require('tape');
const supertest = require('supertest');

const app = require('./../app');

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
      const title = '<h2>Your Groups</h2>';
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});