import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import 'express-async-errors';

import createDatabaseConnection from '../typeorm';

createDatabaseConnection();

import '@shared/container';

import { routes } from './routes';

import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

const app = express();

app.use(express.json());

app.use(routes);
app.use(errorHandlingMiddleware);

export { app };
