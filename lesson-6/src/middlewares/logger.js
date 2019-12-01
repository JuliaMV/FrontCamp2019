const winston = require('winston');
const path = require('path');

const logFile = path.join(__dirname, '../logfile.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logFile, timestamp: true })
  ]
});

module.exports = { logger, logFile };
