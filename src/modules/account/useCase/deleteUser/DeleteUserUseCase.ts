import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(userId: string): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        await this.usersRepository.delete(userId);
    }
}

export { DeleteUserUseCase };
