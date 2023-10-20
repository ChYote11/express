var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var express = require('express');
var app = express();
var http = require('http').createServer(app);

var db = require('./db/mysql.config')
db
  .initialize()
  .then((x) => {
    console.log("DB Connected")
  })
  .catch((err) => {
    console.log("DB Connection failed", err)
  })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
var aboutRouter = require('./routes/about');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/books', require('./routes/books.route'))
app.use('/images', require('./routes/images.route'))
app.use('/', function (req, res, next) {
  res.json({ status: 'success' })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

http.listen(3000, () => {
  console.log(`listening to port 3000`)
})

module.exports = app;
