import { Router } from 'express';

import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';

import { CreateTaskController } from '@modules/task/useCase/createTask/CreateTaskController';
import { MarkTaskAsDoneController } from '@modules/task/useCase/markTaskAsDone/MarkTaskAsDoneController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();
const markTaskAsDoneController = new MarkTaskAsDoneController();

taskRoutes.post('/:id', authenticationMiddleware, createTaskController.handle);
taskRoutes.put('/:id', authenticationMiddleware, markTaskAsDoneController.handle);

export { taskRoutes };
