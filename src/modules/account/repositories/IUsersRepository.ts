import { JwtPayload } from 'jsonwebtoken';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
    create({ id, name, email, password }: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    validateToken(token: string): Promise<string>;
}

export { IUsersRepository };
