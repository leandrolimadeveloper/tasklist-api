import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    create({ id, name, email, password }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
