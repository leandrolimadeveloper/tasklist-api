import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

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

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email,
            },
        });

        return user;
    }
}

export { UsersRepository };
