import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserId(user_id: string): Promise<UserToken>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
