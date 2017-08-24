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

//test('/login post for user who doesn\'t exist', (t) => {
  //// needs db setup/reset 
  //// as it depends on 'getUser' db query not erroring with code 500
  //dbReset(() => {
    //supertest(app)
      //.post('/login')
      //.type('form')
      //.send({ email: 'd@z', password: 'hihi' })
      //.expect(400)
      //.end((err, res) => {
        //const title = '<h2>Login</h2>';
        //t.equals(res.status, 400, 'Responds with 400 status');
        //t.ok(res.text.includes('Incorrect email or password'), 'Page contains correct error message');
        //t.ok(res.text.includes(title), `Page contains string ${title}`);
        //t.end();
      //});
  //});
//});

test('/login post invalid data', (t) => {
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
