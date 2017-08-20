# Chrappy [![Build Status](https://travis-ci.org/dangerdak/chrappjs.svg?branch=master)](https://travis-ci.org/dangerdak/chrappjs)[![codecov](https://codecov.io/gh/dangerdak/chrappjs/branch/master/graph/badge.svg)](https://codecov.io/gh/dangerdak/chrappjs)
_A Secret Santa App_

## Why
## What
## How
### Stages of development
1. Serve a few pages.  
   Write tests for status code and title string for each
2. Add ability to have users  
   Also write tests for database queries

## Things I Learnt
* travis 'install' stage is where npm install happens - so be careful if
  you override this in `.travis.yml`
* To stop database connections from hanging, use pg pool's `end` method to close the connection [see docs](https://node-postgres.com/api/pool#pool-end)
* To be able to [run
  a module](http://coding.pstodulka.com/2014/10/22/node-modules-as-cli/) from the command line:  
  ```
  if(require.main == module)
    yourFunction();
  ```
