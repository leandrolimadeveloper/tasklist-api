import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';

import { User } from '@modules/account/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    newPassword: string;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id, name, email, password, newPassword }: IRequest): Promise<User | undefined> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        user.name = name;
        user.email = email;

        if (password) {
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new AppError('Password is incorrect');
            }

            const passwordHash = await hash(newPassword, 8);

            newPassword = passwordHash;
            user.password = newPassword;
        }

        await this.usersRepository.update(id, name, email, newPassword);

        return user;
    }
}

export { UpdateUserUseCase };
