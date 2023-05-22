import { Router } from 'express';

import { CreateTaskController } from '@modules/task/useCase/createTask/CreateTaskController';

const taskRoutes = Router();

const createTaskController = new CreateTaskController();

taskRoutes.post('/:id', createTaskController.handle);

export { taskRoutes };
