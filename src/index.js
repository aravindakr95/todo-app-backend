import express from 'express';
import bodyParser from 'body-parser';

import config from './configs/config';

import authRouter from './routes/auth';
import todoRouter from './routes/todo';

import HttpResponseType from './enums/http/http-response-type';

import { errorResponse } from './helpers/http/response-dispatcher';
import initializeDB from './helpers/storage/database-handler';

const app = express();

app.use(bodyParser.json());

initializeDB();

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/todos', todoRouter);

app.all('*',
  (req, res) => errorResponse(res, {
    code: HttpResponseType.NOT_FOUND,
    message: 'Request URL not found',
  }));

app.listen(config.deployment.port, () => {
  console.log('Server is up and running');
});
