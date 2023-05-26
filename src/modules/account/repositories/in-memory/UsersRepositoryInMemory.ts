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

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }
}

export { UsersRepositoryInMemory };
