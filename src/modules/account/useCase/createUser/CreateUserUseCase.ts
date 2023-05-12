import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            email,
            password,
        });
    }
}

export { CreateUserUseCase };
