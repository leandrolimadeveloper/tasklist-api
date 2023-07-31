import { Router } from 'express';

import { CreateUserController } from '../../../../modules/account/useCase/createUser/CreateUserController';
import { ValidateTokenController } from '@modules/account/useCase/validateToken/ValidateTokenController';
import { LogoutUserController } from '@modules/account/useCase/logoutUser/LogoutUserController';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const validateTokenController = new ValidateTokenController();
const logoutUserController = new LogoutUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/validate', validateTokenController.handle);
usersRoutes.delete('/logout', authenticationMiddleware, logoutUserController.handle);

export { usersRoutes };
