import swaggerJsdoc from 'swagger-jsdoc';

import appRoot from 'app-root-path';
import config from './configs/config';

const swaggerDefinition = {
  basePath: '/',
  host: `${config.deployment.host}:${config.deployment.port}`,
  definition: {
    info: {
      title: 'API Documentation',
      description: 'API Documentation for Todo Application',
      version: '1.0.0',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [`${appRoot}/src/routes/*.js`],
};

export default swaggerJsdoc(options);
