import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { ICreateUserTokenDTO } from '@modules/account/dtos/ICreateUserTokenDTO';
import { UserToken } from '../entities/UserToken';
import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserToken);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserId(user_id: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
            },
        });

        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token,
            },
        });

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { UsersTokensRepository };
