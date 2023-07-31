import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { sign, verify } from 'jsonwebtoken';

import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import auth from 'config/auth';

import { AppError } from '@shared/infra/http/errors/AppError';

dayjs.extend(utc);
dayjs.extend(timezone);

const brazilianSPTimeZone = 'America/Sao_Paulo';
dayjs.tz.setDefault(brazilianSPTimeZone);

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token?: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub, email } = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError('Refresh token does not exist');
        }

        const newToken = sign({}, process.env.JWT_SECRET, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        const expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);

        const expires_date_day_js = dayjs(expires_date).tz(brazilianSPTimeZone);

        const expiresDateInTimestamp = expires_date_day_js.unix();

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(expiresDateInTimestamp));

        if (refreshTokenExpired) {
            await this.usersTokensRepository.deleteById(userToken.id);

            const refreshToken = sign({ email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
                subject: sub,
                expiresIn: auth.expires_in_refresh_token,
            });

            await this.usersTokensRepository.create({
                refresh_token: refreshToken,
                expires_date,
                user_id,
            });

            return {
                token: newToken,
                refresh_token: refreshToken,
            };
        }

        return { token: newToken };
    }
}

export { RefreshTokenUseCase };
