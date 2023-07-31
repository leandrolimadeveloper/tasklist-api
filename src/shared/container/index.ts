import { container } from 'tsyringe';

import '@shared/container/providers';

import { IUsersRepository } from '../../modules/account/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/account/infra/typeorm/repositories/UsersRepository';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';
import { TasksRepository } from '@modules/task/infra/typeorm/repositories/TasksRepository';

import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/account/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UsersTokensRepository);

container.registerSingleton<ITasksRepository>('TasksRepository', TasksRepository);
