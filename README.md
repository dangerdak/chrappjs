# Chrappy [![Build Status](https://travis-ci.org/dangerdak/chrappjs.svg?branch=master)](https://travis-ci.org/dangerdak/chrappjs)[![codecov](https://codecov.io/gh/dangerdak/chrappjs/branch/master/graph/badge.svg)](https://codecov.io/gh/dangerdak/chrappjs)
_A Secret Santa App_

## Why
## What
## How
### Stages of development
1. Serve a few pages.  
   Write tests for status code and title string for each
2. Add users to database
   * Create database build files
   * Database queries (insert user, get user)
   * Also write tests for database queries
3. Link login and registration pages to database
4. Add groups to database
   - [ ] Display groups on groups page
   - [ ] Ability to create groups
   - [ ] " edit groups
   - [ ] Invite people

## Things I Learnt
* travis 'install' stage is where npm install happens - so be careful if
  you override this in `.travis.yml`
* To stop database connections from hanging, use pg pool's `end` method to close the connection [see docs](https://node-postgres.com/api/pool#pool-end)  
  (there are restrictions on when you can do this - maybe not more than once
  for a given pool?)
* To be able to [run
  a module](http://coding.pstodulka.com/2014/10/22/node-modules-as-cli/) from the command line:  
  ```
  if(require.main == module)
    yourFunction();
  ```
* When using supertest for post requests, use the `.send` method to include
  form data, and
  [`.type('form')`](https://github.com/visionmedia/supertest/issues/168#issuecomment-73205931) to populate req.body with that data (you also
  need to be using `body-parser` for this to work) e.g.:
  ```
  supertest(app)
    .post('/login')
    .type('form')
    .send({ email: 'my@email.com', password: 'top secret' })
    .end(blah blah blah);
  ```
* When hashing passwords, use the `bcrypt` module rather than inbuilt `crypto`.
  `bcrypt` is designed for hashing passwords and is more computationally
  expensive (harder to brute force), and a work factor can be provided so it can be made more expensive
  as computers get faster.
## Resources
* [Promise Anti-Patterns](http://taoofcode.net/promise-anti-patterns/)
* [Using pg-promises](https://stackoverflow.com/a/44737312/3652070)
* [Mistakes with
  promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
* [Bcrypt for password
  storage](https://drive.google.com/file/d/0BxXF_LZcFnS5ODM0dElWYmtmMWc/view)
* [Many to many relationships in PostgreSQL](https://stackoverflow.com/questions/9789736/how-to-implement-a-many-to-many-relationship-in-postgresql)
