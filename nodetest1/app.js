var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Powershell
var shell = require('node-powershell');

var ps = new shell({
  executionPolicy: 'bypass',
  noProfile: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/getip", function (req, res) {
  ps.addCommand('.././Get-PublicIPAddress.ps1');
  ps.invoke()
  .then(output => {
    //console.log(output);
    console.log(JSON.parse(output))
    var ipv4 = JSON.parse(output)
    res.send(ipv4)
  })
  .catch(err => {
    console.log(err);
    ps.dispose()
  });
})

app.get("/tv", function (req, res) {
  ps.addCommand('.././samsung.ps1');
  ps.invoke()
  .then(output => {
    //console.log(output);
    console.log(output)
    res.send()
  })
  .catch(err => {
    console.log(err);
    ps.dispose()
  });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
