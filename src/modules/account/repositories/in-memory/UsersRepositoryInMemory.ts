import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';
import { User } from '@modules/account/infra/typeorm/entities/User';

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

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }
}

export { UsersRepositoryInMemory };
