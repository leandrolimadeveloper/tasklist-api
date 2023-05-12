import { Router } from 'express';

const routes = Router();

import { usersRoutes } from './users.routes';

routes.use('/users', usersRoutes);

export { routes };
