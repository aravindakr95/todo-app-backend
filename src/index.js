import express from 'express';
import bodyParser from 'body-parser';

import authRouter from './routes/auth';

import HttpResponseType from './enums/http/http-response-type';

import { errorResponse } from './helpers/http/response-dispatcher';

const app = express();

app.use(bodyParser.json());

app.use('/v1/todo/auth', authRouter);

app.all('*',
    (req, res) => {
        return errorResponse(res, {
            code: HttpResponseType.NOT_FOUND,
            message: 'Request URL not found'
        });
    });

app.listen(3000, () => {
    console.log('Server is up and running')
});


