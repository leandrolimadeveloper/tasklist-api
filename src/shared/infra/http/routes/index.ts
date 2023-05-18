import { Router } from 'express';

const routes = Router();

import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);

export { routes };
