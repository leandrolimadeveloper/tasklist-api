import { Router } from 'express';

import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';

import { CreateTaskController } from '@modules/task/useCase/createTask/CreateTaskController';
import { ListTasksByUserIdController } from '@modules/task/useCase/listTasksByUserId/ListTasksByUserIdController';
import { MarkTaskAsDoneController } from '@modules/task/useCase/markTaskAsDone/MarkTaskAsDoneController';
import { AddTaskToMyDayController } from '@modules/task/useCase/addTaskToMyDay/AddTaskToMyDayController';
import { DeleteTaskController } from '@modules/task/useCase/deleteTask/DeleteTaskController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();
const listTasksByUserIdController = new ListTasksByUserIdController();
const deleteTaskController = new DeleteTaskController();
const markTaskAsDoneController = new MarkTaskAsDoneController();
const addTaskToMyDayController = new AddTaskToMyDayController();

taskRoutes.post('/', authenticationMiddleware, createTaskController.handle);
taskRoutes.get('/', authenticationMiddleware, listTasksByUserIdController.handle);
taskRoutes.delete('/:id', authenticationMiddleware, deleteTaskController.handle);
taskRoutes.put('/:id/done', authenticationMiddleware, markTaskAsDoneController.handle);
taskRoutes.put('/:id/myday', authenticationMiddleware, addTaskToMyDayController.handle);

export { taskRoutes };
