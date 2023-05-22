import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/account/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/account/infra/typeorm/repositories/UsersRepository';

import { ITasksRepository } from '@modules/task/repositores/ITasksRepository';
import { TasksRepository } from '@modules/task/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<ITasksRepository>('TasksRepository', TasksRepository);
