import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { User } from '@modules/account/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({ id, name, email, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            id,
            name,
            email,
            password,
        });

        this.users.push(user);
    }

    async update(id: string, name: string, email: string, password: string): Promise<User> {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return undefined;
        }

        const updateUser: User = {
            ...this.users[userIndex],
            name,
            email,
            password,
        };

        this.users[userIndex] = updateUser;

        return updateUser;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }

    async validateToken(token: string): Promise<string> {
        return token;
    }
}

export { UsersRepositoryInMemory };
