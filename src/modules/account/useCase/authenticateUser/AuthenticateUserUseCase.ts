import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

export interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        const token = sign({}, '950c7bfd9019ba9e54d85666866e1fe6', {
            subject: user.id,
            expiresIn: '1d',
        });

        const userInfoSession: IResponse = {
            user,
            token,
        };

        return userInfoSession;
    }
}

export { AuthenticateUserUseCase };
