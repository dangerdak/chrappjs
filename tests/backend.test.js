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
      t.ok(res.text.includes('login'), 'Page contains string \'login\'');
      t.end();
    });
});
