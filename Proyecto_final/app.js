var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport')
 , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '2220215738197721',
    clientSecret:'75eb75eb925e9c8fa0460f201fa7797c',
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        'facebook.id': profile.id
    }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var multipart = require('connect-multiparty');
var flash = require('connect-flash');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//modelos
var models = require('./models');
models.sequelize.sync().then( () => {
    console.log('Se ha conectado la bd');
}).catch(err => {console.log(err, "Hubo un error");}) ;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
