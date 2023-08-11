import { Router } from 'express';

import { CreateUserController } from '../../../../modules/account/useCase/createUser/CreateUserController';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';
import { UpdateUserController } from '@modules/account/useCase/UpdateUser/UpdateUserController';
import { ValidateTokenController } from '@modules/account/useCase/validateToken/ValidateTokenController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const validateTokenController = new ValidateTokenController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/', authenticationMiddleware, updateUserController.handle);
usersRoutes.post('/validate', validateTokenController.handle);

export { usersRoutes };
