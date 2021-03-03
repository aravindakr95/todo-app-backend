import appRoot from 'app-root-path';
import { createLogger, transports, format } from 'winston';
import dailyRotateFile from 'winston-daily-rotate-file';

import config from './config';

import EnvironmentType from '../enums/state/environment-type';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/${config.environment.toLowerCase()}/%DATE%.log`,
    datePattern: 'MM-DD-YYYY-HH',
    handleExceptions: true,
    json: true,
    maxsize: '20m',
    maxFiles: '14d',
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const loglevel = createLogger({
  level: 'info',
  transports: [
    // eslint-disable-next-line new-cap
    new dailyRotateFile(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

loglevel.stream = {
  write: (message) => {
    loglevel.info(message);
  },
};

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

if (config.environment !== EnvironmentType.PRODUCTION) {
  loglevel.add(new transports.Console({
    format: format.simple(),
  }));
}

module.exports = loglevel;
