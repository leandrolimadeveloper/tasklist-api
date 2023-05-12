import 'reflect-metadata';
import express, { Request, Response } from 'express';

import createDatabaseConnection from '../typeorm';

createDatabaseConnection();

import '../../container';

import { routes } from './routes';

import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

const app = express();

app.use(express.json());

app.use(routes);

export { app };
