const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const session = require('express-session');

const controllers = require('./controllers/index');
const requireLogin = require('./controllers/requireLogin');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  })
);

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({
  store: new (require('connect-pg-simple')(session))(),
  secret: 'keyboard cat',
  // node-connect-pg-simple implements the 'touch' method presumably
  // (as this is set to false in docs)
  resave: false,
  // false recommended for login sessions
  saveUninitialized: false,
  name: 'id',
  cookie: {
    httpOnly: true,
  }
}));
app.use(['/groups', '/create-group'], requireLogin);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(controllers);

module.exports = app;
