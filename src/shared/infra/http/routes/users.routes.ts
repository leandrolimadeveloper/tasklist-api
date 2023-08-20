import { Router } from 'express';

import { CreateUserController } from '@modules/account/useCase/createUser/CreateUserController';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';
import { GetUserProfileController } from '@modules/account/useCase/getUserProfile/GetUserProfileController';
import { UpdateUserController } from '@modules/account/useCase/UpdateUser/UpdateUserController';
import { DeleteUserController } from '@modules/account/useCase/deleteUser/DeleteUserController';
import { ValidateTokenController } from '@modules/account/useCase/validateToken/ValidateTokenController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const validateTokenController = new ValidateTokenController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', authenticationMiddleware, getUserProfileController.handle);
usersRoutes.patch('/', authenticationMiddleware, updateUserController.handle);
usersRoutes.delete('/', authenticationMiddleware, deleteUserController.handle);
usersRoutes.post('/validate', validateTokenController.handle);

export { usersRoutes };
