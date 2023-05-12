import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/account/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/account/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
