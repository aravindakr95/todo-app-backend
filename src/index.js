import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from './configs/config';
import loglevel from './configs/log-level';

import authRouter from './routes/auth';
import todoRouter from './routes/todo';
import apiDocsRouter from './routes/api-docs';

import HttpResponseType from './enums/http/http-response-type';

import initializeDB from './helpers/storage/database-handler';
import { errorResponse } from './helpers/http/response-dispatcher';

const app = express();

initializeDB();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: loglevel.stream }));

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/todos', todoRouter);

app.use('/api-docs', apiDocsRouter);

app.all('*',
  (req, res) => errorResponse(res, {
    code: HttpResponseType.NOT_FOUND,
    message: 'Request URL not found',
  }));

app.listen(config.deployment.port, () => {
  loglevel.info('Server is up and running');
});
