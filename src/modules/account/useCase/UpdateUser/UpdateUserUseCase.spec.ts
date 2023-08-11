import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe('Update a user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to update a user', async () => {
        const user = {
            id: '123',
            name: 'User name',
            email: 'email@email.com',
            password: 'pass',
        };

        await createUserUseCase.execute(user);

        const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

        const userUpdated = await updateUserUseCase.execute({
            id: userCreated.id,
            name: 'User name changed',
            email: 'new-email@email.com',
            password: 'pass',
            newPassword: 'newpass123',
        });

        expect(userCreated).toBeDefined();
        expect(userCreated.email).toBe('new-email@email.com');
        expect(userCreated.password).toBe(userUpdated.password);
    });

    it('should not allow updating user password if incorrect current password is provided', async () => {
        const user = {
            id: '123',
            name: 'User name',
            email: 'email@email.com',
            password: 'pass',
        };

        await createUserUseCase.execute(user);

        const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

        await expect(
            updateUserUseCase.execute({
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                password: 'incorrect-current-pass',
                newPassword: 'new-pass',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
