const test = require('tape');
const supertest = require('supertest');

const app = require('./../src/app');

test('tape running', (t) => {
  t.pass();
  t.end();
});

test('/login get', (t) => {
  supertest(app)
    .get('/login')
    .expect(200)
    .end((err, res) => {
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes('login'), 'Page contains string \'<h2>Login</h2>\'');
      t.end();
    });
});

test('/register get', (t) => {
  supertest(app)
    .get('/register')
    .expect(200)
    .end((err, res) => {
      t.equals(res.status, 200, 'Responds with 200 status');
      t.ok(res.text.includes('<h2>Register</h2>'), 'Page contains string \'<h2>Register</h2>\'');
      t.end();
    });
});
