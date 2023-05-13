import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
    create({ id, name, email, password }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User> | undefined;
}

export { IUsersRepository };