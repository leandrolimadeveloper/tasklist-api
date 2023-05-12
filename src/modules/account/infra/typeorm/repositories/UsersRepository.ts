import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../data-source';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({ id, name, email, password }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            password,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
