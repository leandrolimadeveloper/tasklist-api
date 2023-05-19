import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';

import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate an user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            id: '123',
            name: 'User',
            email: 'email@test.com',
            password: 'pass',
        };

        await createUserUseCase.execute(user);

        const userLogged = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(userLogged).toHaveProperty('token');
    });

    // eslint-disable-next-line quotes
    it("should not be able to authenticate an user if it doesn't exists", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'email@email.com',
                password: 'pass',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate an user with password incorrect', async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                id: 'abc',
                name: 'Username',
                email: 'email@test.com',
                password: 'pass1',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'pass2',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
