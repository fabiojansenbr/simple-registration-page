var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let middleware = require('./app/middleware/middleware');
let models = require('./app/models');

var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');

var app = express();

// sync database
async () => {
  await models.sequelize.drop();
  await models.sequelize.sync().then(() => console.log('Connection to the database has been established successfully'));
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');

// allow cors
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', middleware.checkToken, users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;