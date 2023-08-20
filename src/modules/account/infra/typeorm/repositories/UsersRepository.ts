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

    async update(id: string, name: string, email: string, password: string): Promise<User> {
        const user = {
            id,
            name,
            email,
            password,
        };

        const userUpdated = await this.repository.save(user);

        return userUpdated;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                id,
            },
            // relations: ['task'],
        });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    async validateToken(token: string): Promise<string> {
        return token;
    }
}

export { UsersRepository };
