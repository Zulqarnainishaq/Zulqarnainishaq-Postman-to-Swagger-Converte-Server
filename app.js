var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var fs = require('fs');
var yaml = require('js-yaml');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple Express API application with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Add this for Swagger UI
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const collectionYaml = yaml.load(fs.readFileSync(path.join(__dirname, 'swagger', 'collection.yml'), 'utf8'));

function mergeSpecs(spec1, spec2) {
  return {
    ...spec1,
    ...spec2,
    paths: { ...spec1.paths, ...spec2.paths },
    components: { ...spec1.components, ...spec2.components }
  };
}

const mergedSpec = mergeSpecs(swaggerSpec, collectionYaml);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(mergedSpec));

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