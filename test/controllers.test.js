const test = require('tape');
const supertest = require('supertest');

const app = require('./../src/app');

test('GET unrestricted endpoints', (t) => {
  const endpoints = [
    { url: '/login', expected: { title: 'Login' } },
    { url: '/register', expected: { title: 'Register' } },

  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    supertest(app)
      .get(endpoint.url)
      .end((err, res) => {
        const title = `<h2>${endpoint.expected.title}</h2>`;
        t.equals(res.status, 200, `${endpoint.url} responds with 200 status`);
        t.ok(res.text.includes(title), `${endpoint.url} responds with page containing title ${title}`);
      });
  });
});

test('GET restricted endpoints with authentication', (t) => {
  const endpoints = [
    { url: '/create-group', expected: { title: 'Create A Group' } },
    { url: '/groups', expected: { title: 'Your Groups' } },
  ];
  t.plan(endpoints.length * 2);
  endpoints.forEach((endpoint) => {
    supertest(app)
      .post('/login')
      .type('form')
      .send({ email: 'sam@gmail.com', password: 'password' })
      .then((response) => {
        const cookies = response.headers['set-cookie'];
        supertest(app)
          .get(endpoint.url)
          .set('Cookie', cookies)
          .expect(200)
          .end((err, res) => {
            const title = `<h2>${endpoint.expected.title}</h2>`;
            t.equals(res.status, 200, `${endpoint.url} responds with 200 status`);
            t.ok(res.text.includes(title), `${endpoint.url} responds with page containing title ${title}`);
          });
      });
  });
});

test('GET restricted endpoints without authentication', (t) => {
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
        const title = '<h2>Login</h2>';
        t.equals(res.status, 401, `${endpoint.url} responds with 401 status`);
        t.ok(res.text.includes(title), `${endpoint.url} renders page with title ${title}`);
      });
  });
});

test('POST unrestricted endpoints with invalid data', (t) => {
  const endpoints = [{
    url: '/login',
    payload: { email: '', password: 'hihi' },
    expected: { errorMessage: 'Email is required', title: 'Login' },
  },
  {
    url: '/register',
    payload: {
      name: '',
      email: 'd@z.vom',
      password: 'hi',
      confirmPassword: 'hid',
    },
    expected: { errorMessage: 'Name is required', title: 'Register' },
  },
  ];
  t.plan(endpoints.length * 3);
  endpoints.forEach((endpoint) => {
    supertest(app)
      .post(endpoint.url)
      .type('form')
      .send(endpoint.payload)
      .expect(400)
      .end((err, res) => {
        const title = `<h2>${endpoint.expected.title}</h2>`;
        const { errorMessage } = endpoint.expected;
        t.equals(res.status, 400, `${endpoint.url} responds with 400 status`);
        t.ok(res.text.includes(errorMessage), `${endpoint.url} responds with page containing error message '${errorMessage}'`);
        t.ok(res.text.includes(title), `${endpoint.url} responds with page containing title ${title}`);
      });
  });
});

//test('POST /login incorrect email or password', (t) => {
  //const payloads = [
    //{ email: 'dsalfhasldf@gmail.com', password: 'hihi' },
    //{ email: 'sam@gmail.com', password: 'hihi' },
  //];
  //t.plan(payloads.length * 3);
  //payloads.forEach((payload) => {
    //supertest(app)
      //.post('/login')
      //.type('form')
      //.send(payload)
      //.expect(400)
      //.end((err, res) => {
        //const title = '<h2>Login</h2>';
        //const message = 'Incorrect email or password';
        //t.equals(res.status, 400, 'Responds with 400 status');
        //t.ok(res.text.includes('Incorrect email or password'), `Page contains message ${message}`);
        //t.ok(res.text.includes(title), `Page contains string ${title}`);
      //});
  //});
//});

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

test('POST to /register with existing user', (t) => {
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
      const title = '<h2>Register</h2>';
      const message = 'Account already exists';
      t.equals(res.status, 400, 'Responds with 400 status');
      t.ok(res.text.includes(message), `Page contains error message '${message}'`);
      t.ok(res.text.includes(title), `Page contains string ${title}`);
      t.end();
    });
});

test('/create-group POST with valid data', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .then((response) => {
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
        });
    });
});

test('/create-group POST with invalid data', (t) => {
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'sam@gmail.com', password: 'password' })
    .then((response) => {
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
          t.ok(res.text.includes('Date must be in the future'), 'Renders error message');
          t.end();
        });
    });
});
