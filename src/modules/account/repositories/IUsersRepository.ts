import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
    create({ id, name, email, password }: ICreateUserDTO): Promise<void>;
    update(id: string, name: string, email: string, password: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    validateToken(token: string): Promise<string>;
}

export { IUsersRepository };
