import { Router } from 'express';

import { CreateUserController } from '../../../../modules/account/useCase/createUser/CreateUserController';
import { ValidateTokenController } from '@modules/account/useCase/validateToken/ValidateTokenController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const validateTokenController = new ValidateTokenController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/validate', validateTokenController.handle);

export { usersRoutes };
