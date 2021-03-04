import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerJsDoc from '../swagger';

const apiDocsRouter = express.Router();

apiDocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

export default apiDocsRouter;
