import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpecification from '../swagger';

const apiDocsRouter = express.Router();

apiDocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

export default apiDocsRouter;
