import dotenv from 'dotenv';

import { version } from '../../package.json';

import EnvironmentType from '../enums/state/environment-type';

dotenv.config();

const config = {
  version,
  environment: EnvironmentType.PRODUCTION, // PRODUCTION, DEVELOPMENT
  database: {
    prodUri: 'todoappcluster.i2bqm.mongodb.net',
    devUri: 'mongodb://127.0.0.1:27017',
    name: 'todo-app',
    user: 'admin',
    credentials: process.env.DB_CREDENTIALS,
  },
  authentication: {
    jwtSecret: process.env.JWT_AUTH_KEY,
    saltRounds: 10,
  },
  deployment: {
    host: '127.0.0.1', // DEMONSTRATION PURPOSES ONLY
    port: process.env.PORT || 3000,
  },
};

export default config;
