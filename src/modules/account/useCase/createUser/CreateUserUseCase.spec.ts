import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create a new user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to create a new user', async () => {
        const user = {
            name: 'User name test',
            email: 'email@email.com',
            password: 'pass',
        };

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

        expect(userCreated).toHaveProperty('email');
        expect(userCreated.email).toBe(user.email);
    });

    it('should not be able to create a new user if it already exists', async () => {
        const user = {
            name: 'User name test',
            email: 'email@test.com',
            password: 'pass',
        };

        await createUserUseCase.execute({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        await expect(
            createUserUseCase.execute({
                name: user.name,
                email: user.email,
                password: user.password,
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
