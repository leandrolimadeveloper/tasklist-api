import { Router } from 'express';

const routes = Router();

import { usersRoutes } from './users.routes';
import { taskRoutes } from './tasks.routes';
import { authenticateRoutes } from './authenticate.routes';

routes.use('/users', usersRoutes);
routes.use('/tasks', taskRoutes);
routes.use(authenticateRoutes);

export { routes };
