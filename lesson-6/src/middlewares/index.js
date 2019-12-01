const { logger } = require('./logger');

const loggerHandler = (req, res, next) => {
  const { url } = req;
  logger.log('info', url);
  next();
}

const errorHandler = (error, req, res, next) => {
  res.render('index', { title: 'Error', message: `${error.message}` });
  res.status(500).send('Something went wrong!');
};

module.exports = {
  loggerHandler, errorHandler,
};

