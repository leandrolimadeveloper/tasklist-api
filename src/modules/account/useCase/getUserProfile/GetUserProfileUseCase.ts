import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IUser {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

@injectable()
class GetUserProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(userId: string): Promise<IUser> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        const userProfile: IUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return userProfile;
    }
}

export { GetUserProfileUseCase };
