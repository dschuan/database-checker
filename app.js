const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const schemaRouter = require('./routes/create-schema');
const getSchemaRouter = require('./routes/get-schema');
const editSchemaRouter = require('./routes/edit-schema');
const checkDbRouter = require('./routes/check-database');
const checkMigrationRouter = require('./routes/check-migration');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', schemaRouter);
app.use('/api', getSchemaRouter);
app.use('/api', editSchemaRouter);
app.use('/api', checkDbRouter);
app.use('/api', checkMigrationRouter);

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
