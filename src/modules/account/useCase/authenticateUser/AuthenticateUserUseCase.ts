import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import auth from 'config/auth';

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
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        const { expires_in_token, expires_in_refresh_token, expires_in_refresh_token_days } = auth;

        if (!user) {
            throw new AppError('Email or password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const userToken = await this.usersTokensRepository.findByUserId(user.id);

        if (userToken) {
            await this.usersTokensRepository.deleteById(userToken.id);
        }

        const refresh_token = sign({ email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refreshTokenExpiresDays = this.dateProvider.addDays(expires_in_refresh_token_days);

        await this.usersTokensRepository.create({
            refresh_token,
            expires_date: refreshTokenExpiresDays,
            user_id: user.id,
        });

        const userInfoSession: IResponse = {
            user,
            token,
            refresh_token,
        };

        return userInfoSession;
    }
}

export { AuthenticateUserUseCase };
