import { Router } from 'express';

import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';

import { CreateTaskController } from '@modules/task/useCase/createTask/CreateTaskController';
import { MarkTaskAsDoneController } from '@modules/task/useCase/markTaskAsDone/MarkTaskAsDoneController';
import { AddTaskToMyDayController } from '@modules/task/useCase/addTaskToMyDay/AddTaskToMyDayController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();
const markTaskAsDoneController = new MarkTaskAsDoneController();
const addTaskToMyDayController = new AddTaskToMyDayController();

taskRoutes.post('/', authenticationMiddleware, createTaskController.handle);
taskRoutes.put('/:id/done', authenticationMiddleware, markTaskAsDoneController.handle);
taskRoutes.put('/:id/myday', authenticationMiddleware, addTaskToMyDayController.handle);

export { taskRoutes };
