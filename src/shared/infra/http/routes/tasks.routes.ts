import { Router } from 'express';

import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';

import { CreateTaskController } from '@modules/task/useCase/createTask/CreateTaskController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();

taskRoutes.post('/:id', authenticationMiddleware, createTaskController.handle);

export { taskRoutes };
