import { inject, injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

import { AppError } from '@shared/infra/http/errors/AppError';

interface IPayload {
    sub: string;
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
class ValidateTokenUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(token: string): Promise<IResponse> {
        const isAToken = this.usersRepository.validateToken(token);

        if (!isAToken) {
            throw new AppError('Token not provided');
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET) as IPayload;

            const user = await this.usersRepository.findById(decoded.sub);

            if (!user) {
                // eslint-disable-next-line quotes
                throw new AppError("User doesn't exist");
            }

            const userInfoResponse: IResponse = {
                user,
                token,
            };

            return userInfoResponse;
        } catch (err) {
            throw new AppError('Invalid token');
        }
    }
}

export { ValidateTokenUseCase };
